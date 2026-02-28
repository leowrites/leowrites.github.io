### Kernel Experiments

Each row of our decomposed matrix can contain a mix of [2:4 sparse](https://developer.nvidia.com/blog/structured-sparsity-in-the-nvidia-ampere-architecture-and-applications-in-search-engines/) and dense blocks. The baseline approach processes them sequentially within a single program, but this leaves performance on the table. I developed and benchmarked a few kernel strategies to better exploit the structure of mixed-sparsity rows.

### Shared Primitives

Both kernels share a common `mac_loop` (multiply-accumulate loop) that iterates over K-dimension blocks for a given row using our [BCSR](https://en.wikipedia.org/wiki/Sparse_matrix "Blocked compressed sparse row") format. It uses `make_block_ptr` for efficient tile loads and advances through each row's non-zero blocks using the column index array.

```python
@triton.jit
def mac_loop(
        pid_row, pid_col,
        accumulator,
        a_row, a_col, a_ptr,
        b_ptr,
        N, K, LEN,
        stride_am, stride_ak,
        stride_bn, stride_bk,
        BLOCK_SIZE_M: tl.constexpr,
        BLOCK_SIZE_N: tl.constexpr,
        BLOCK_SIZE_K: tl.constexpr,
        i: tl.constexpr,
):
    a_row += pid_row

    row_start = tl.load(a_row)
    row_end = tl.load(a_row + 1)

    if row_end > row_start:
        a_col += pid_row * tl.cdiv(K, BLOCK_SIZE_K)
        current_b = tl.load(a_col)
        a_col += 1

        a_ptrs = tl.make_block_ptr(
            a_ptr,
            shape=(LEN, BLOCK_SIZE_K),
            strides=(stride_am, stride_ak),
            offsets=(row_start * BLOCK_SIZE_M, 0),
            block_shape=(BLOCK_SIZE_M, BLOCK_SIZE_K),
            order=(1, 0),
        )

        b_ptrs = tl.make_block_ptr(
            b_ptr,
            shape=(K, N),
            strides=(stride_bk, stride_bn),
            offsets=(current_b * BLOCK_SIZE_K, pid_col * BLOCK_SIZE_N),
            block_shape=(BLOCK_SIZE_K, BLOCK_SIZE_N),
            order=(1, 0),
        )

        for _ in range(row_end - row_start):
            accumulator = tl.dot(
                tl.load(a_ptrs, boundary_check=[1], padding_option="zero"),
                tl.load(b_ptrs, boundary_check=[1], padding_option="zero"),
                accumulator,
            )
            a_ptrs = tl.advance(a_ptrs, [BLOCK_SIZE_M, 0])
            new_b = tl.load(a_col)
            b_ptrs = tl.advance(b_ptrs, [(new_b - current_b) * BLOCK_SIZE_K, 0])
            current_b = new_b
            a_col += 1

    return accumulator
```

### Concurrent Kernel — Parallel Sparse + Dense Programs

For a row with both sparse and dense blocks, the sequential kernel processes them one after the other within a single program. The concurrent kernel instead launches **two programs per output tile** along the K-axis (`pid_k ∈ {0, 1}`)—one handles the sparse blocks means while the other handles the dense blocks simultaneously. The two partial results are then reduced into the final output.

The reduction step uses a simple `tl.atomic_add` with relaxed semantics for a fast but non-deterministic option.

```python
@triton.jit
def concurrent_kernel(
    a_sparse_ptr, a_dense_ptr,
    a_sparse_row, a_dense_row,
    a_sparse_col, a_dense_col,
    b_ptr, c_ptr,
    acq_flags, rel_flags,
    M, N, K, SL, DL,
    stride_asm, stride_ask,
    stride_adm, stride_adk,
    stride_bk, stride_bn,
    stride_cm, stride_cn,
    BLOCK_SIZE_M: tl.constexpr,
    BLOCK_SIZE_N: tl.constexpr,
    BLOCK_SIZE_K: tl.constexpr,
    GROUP_SIZE_M: tl.constexpr,
    USE_ATOMICS: tl.constexpr,
):
    pid = tl.program_id(axis=0)
    pid_row, pid_col, num_pid_n = calculate_output_coord(
        pid, M, N, BLOCK_SIZE_M, BLOCK_SIZE_N, GROUP_SIZE_M
    )
    pid_k = tl.program_id(axis=1)

    acc = tl.zeros((BLOCK_SIZE_M, BLOCK_SIZE_N), dtype=tl.float32)

    # Sparse program
    if pid_k == 0:
        acc = mac_loop(
            pid_row, pid_col, acc,
            a_sparse_row, a_sparse_col, a_sparse_ptr,
            b_ptr, N, K, SL,
            stride_asm, stride_ask, stride_bn, stride_bk,
            BLOCK_SIZE_M, BLOCK_SIZE_N, BLOCK_SIZE_K, 0,
        )

    # Dense program
    if pid_k == 1:
        acc = mac_loop(
            pid_row, pid_col, acc,
            a_dense_row, a_dense_col, a_dense_ptr,
            b_ptr, N, K, DL,
            stride_asm, stride_ask, stride_bn, stride_bk,
            BLOCK_SIZE_M, BLOCK_SIZE_N, BLOCK_SIZE_K, 1,
        )

    c = acc.to(tl.float16)

    # --- Reduction ---
    if USE_ATOMICS:
        _m = pid_row * BLOCK_SIZE_M + tl.arange(0, BLOCK_SIZE_M)
        _n = pid_col * BLOCK_SIZE_N + tl.arange(0, BLOCK_SIZE_N)
        c_ptrs = c_ptr + (_m[:, None] * N + _n[None, :])
        tl.atomic_add(c_ptrs, c, sem="relaxed")
    else:
        acq_flags += pid_row * num_pid_n + pid_col
        rel_flags += pid_row * num_pid_n + pid_col

        c_ptrs = tl.make_block_ptr(
            c_ptr,
            shape=(M, N),
            strides=(stride_cm, stride_cn),
            offsets=(pid_row * BLOCK_SIZE_M, pid_col * BLOCK_SIZE_N),
            block_shape=(BLOCK_SIZE_M, BLOCK_SIZE_N),
            order=(1, 0),
        )

        if tl.atomic_add(acq_flags, 1, sem="relaxed") == 0:
            tl.store(c_ptrs, c)
            tl.atomic_xchg(rel_flags, 1, sem="release")
        else:
            while tl.atomic_and(rel_flags, 1, sem="acquire") == 0:
                pass
            tl.store(c_ptrs, tl.load(c_ptrs) + c)
```

The grid launches with shape `(num_output_tiles, 2)`, so each output tile gets exactly one sparse and one dense program. The launcher selects the reduction strategy and allocates the appropriate flag buffers:

```python
def concurrent_launcher(
    b_ptr, a_sparse_ptr, a_dense_ptr,
    a_sparse_col, a_dense_col, a_sparse_row, a_dense_row,
    M, N, K,
    BLOCK_SIZE_M, BLOCK_SIZE_N, BLOCK_SIZE_K, GROUP_SIZE_M,
    REDUCTION, num_stages, num_warps,
):
    grid = lambda META: (
        triton.cdiv(M, META["BLOCK_SIZE_M"]) * triton.cdiv(N, META["BLOCK_SIZE_N"]),
        2,
    )

    if REDUCTION is ConcurrentReductionStrategy.SEMAPHORE.value:
        c = torch.empty((M, N), device=b_ptr.device, dtype=torch.float16)
        f_acq = torch.zeros(
            (M // BLOCK_SIZE_M, N // BLOCK_SIZE_N), device=b_ptr.device, dtype=torch.int32
        )
        f_rel = torch.zeros(
            (M // BLOCK_SIZE_M, N // BLOCK_SIZE_N), device=b_ptr.device, dtype=torch.int32
        )
    else:
        c = torch.zeros((M, N), device=b_ptr.device, dtype=torch.float16)
        f_acq = f_rel = torch.zeros(0, device=b_ptr.device, dtype=torch.int32)

    concurrent_kernel[grid](
        a_sparse_ptr=a_sparse_ptr, a_dense_ptr=a_dense_ptr,
        a_sparse_row=a_sparse_row, a_dense_row=a_dense_row,
        a_sparse_col=a_sparse_col, a_dense_col=a_dense_col,
        b_ptr=b_ptr, c_ptr=c, acq_flags=f_acq, rel_flags=f_rel,
        M=M, N=N, K=K,
        SL=a_sparse_ptr.shape[0], DL=a_dense_ptr.shape[0],
        stride_asm=a_sparse_ptr.stride(0), stride_ask=a_sparse_ptr.stride(1),
        stride_adm=a_dense_ptr.stride(0),  stride_adk=a_dense_ptr.stride(1),
        stride_bk=b_ptr.stride(0),         stride_bn=b_ptr.stride(1),
        stride_cm=c.stride(0),             stride_cn=c.stride(1),
        BLOCK_SIZE_M=BLOCK_SIZE_M, BLOCK_SIZE_K=BLOCK_SIZE_K,
        BLOCK_SIZE_N=BLOCK_SIZE_N, USE_ATOMICS=REDUCTION,
        GROUP_SIZE_M=GROUP_SIZE_M, num_stages=num_stages, num_warps=num_warps,
    )
    return c
```

### Variable Tile Size Kernel — Decoupled Block Dimensions

Sparse and dense blocks have fundamentally different compute characteristics. Sparse blocks benefit from larger tiles (more data per instruction, amortizing 2:4 decoding overhead), while dense blocks benefit from smaller tiles that fit tightly in shared memory and improve cache utilization.

This kernel decouples the tile sizes: the sparse path uses `SPARSE_BLOCK_SIZE_M` while the dense path uses `DENSE_BLOCK_SIZE_M = SPARSE_BLOCK_SIZE_M / 2`. The dense path runs two separate `mac_loop` calls—one for each half of the M-dimension—then joins the results using `tl.join` and `tl.reshape` before feeding the combined accumulator into the sparse path.

```python
@triton.jit
def vary_tile_size_sequential_kernel(
        a_sparse_ptr, a_dense_ptr,
        a_sparse_col, a_dense_col,
        a_sparse_row, a_dense_row,
        b_ptr, c_ptr,
        M, N, K, SL, DL,
        stride_asm, stride_ask,
        stride_adm, stride_adk,
        stride_bk, stride_bn,
        stride_cm, stride_cn,
        SPARSE_BLOCK_SIZE_M: tl.constexpr,
        SPARSE_BLOCK_SIZE_N: tl.constexpr,
        SPARSE_BLOCK_SIZE_K: tl.constexpr,
        DENSE_BLOCK_SIZE_M: tl.constexpr,
        DENSE_BLOCK_SIZE_N: tl.constexpr,
        DENSE_BLOCK_SIZE_K: tl.constexpr,
        GROUP_SIZE_M: tl.constexpr,
):
    tl.static_assert(SPARSE_BLOCK_SIZE_K == DENSE_BLOCK_SIZE_K)
    tl.static_assert(SPARSE_BLOCK_SIZE_N == DENSE_BLOCK_SIZE_N)
    tl.static_assert(SPARSE_BLOCK_SIZE_M == 2 * DENSE_BLOCK_SIZE_M)
    FACTOR = SPARSE_BLOCK_SIZE_M // DENSE_BLOCK_SIZE_M

    pid = tl.program_id(axis=0)
    pid_row, pid_col = calculate_output_coord(
        pid, M, N, SPARSE_BLOCK_SIZE_M, SPARSE_BLOCK_SIZE_N, GROUP_SIZE_M
    )

    # Dense: two half-size accumulations
    acc_1 = tl.zeros((DENSE_BLOCK_SIZE_M, DENSE_BLOCK_SIZE_N), dtype=tl.float32)
    acc_2 = tl.zeros((DENSE_BLOCK_SIZE_M, DENSE_BLOCK_SIZE_N), dtype=tl.float32)

    acc_1 = mac_loop(
        pid_row, pid_col, acc_1,
        a_dense_row, a_dense_col, a_dense_ptr,
        b_ptr, N, K, DL,
        stride_adm, stride_adk, stride_bn, stride_bk,
        DENSE_BLOCK_SIZE_M, DENSE_BLOCK_SIZE_N, DENSE_BLOCK_SIZE_K,
        FACTOR, i=0
    )

    acc_2 = mac_loop(
        pid_row, pid_col, acc_2,
        a_dense_row, a_dense_col, a_dense_ptr,
        b_ptr, N, K, DL,
        stride_adm, stride_adk, stride_bn, stride_bk,
        DENSE_BLOCK_SIZE_M, DENSE_BLOCK_SIZE_N, DENSE_BLOCK_SIZE_K,
        FACTOR, i=1
    )

    # Merge the two halves into a full-size tile
    joined = tl.permute(tl.join(acc_1, acc_2), (2, 0, 1))
    c = tl.reshape(joined, (SPARSE_BLOCK_SIZE_M, SPARSE_BLOCK_SIZE_N))

    # Sparse: accumulate on top of the merged dense result
    c = mac_loop(
        pid_row, pid_col, c,
        a_sparse_row, a_sparse_col, a_sparse_ptr,
        b_ptr, N, K, SL,
        stride_asm, stride_ask, stride_bn, stride_bk,
        SPARSE_BLOCK_SIZE_M, SPARSE_BLOCK_SIZE_N, SPARSE_BLOCK_SIZE_K,
        1, i=0
    )

    c_ptrs = tl.make_block_ptr(
        c_ptr,
        shape=(M, N),
        strides=(stride_cm, stride_cn),
        offsets=(pid_row * SPARSE_BLOCK_SIZE_M, pid_col * SPARSE_BLOCK_SIZE_N),
        block_shape=(SPARSE_BLOCK_SIZE_M, SPARSE_BLOCK_SIZE_N),
        order=(1, 0),
    )

    tl.store(c_ptrs, c.to(tl.float16), boundary_check=(1, 0))
```
