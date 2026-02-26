### Minimizing Data Movement

Often, data movement is the most significant constraint on computation performance as opposed to the raw compute capabilities. In a deep learning model, data is moved to and from shared memory many times in each layer. For example for one MLP layer, we need to load the input matrix, the weights and the biases. We may then have some activation function that operates on the dot product. After the activation function, the output is sparse and we want to compress the data into 2:4 sparsity. The current workflow looks like this:

![Reference compression workflow](/triton/ref_compress.png#responsive)

If we can performance the pruning and compression step directly within the Triton kernel, we can avoid the costly step of moving data.

![Compress kernel](/triton/compress_kernel.png#responsive)

### Kernel Implementation

```python
@triton.jit
def compress_kernel(
    dense_ptr,
    sparse_ptr,
    meta_ptr,
    M, K,
    stride_dm, stride_dk,
    stride_sm, stride_sk,
    BLOCK_M: tl.constexpr,
    BLOCK_N: tl.constexpr,
):
    """Compression kernel using 2D grid to tile over M and K.

    Simplified assuming M == BLOCK_M and K == BLOCK_N.
    """
    k_start = 0
    offs_m = tl.arange(0, BLOCK_M)
    quad_offs = tl.arange(0, BLOCK_N // 4)

    # Dense column offsets for each position within quads
    offs_v0 = k_start + quad_offs * 4 + 0
    offs_v1 = k_start + quad_offs * 4 + 1
    offs_v2 = k_start + quad_offs * 4 + 2
    offs_v3 = k_start + quad_offs * 4 + 3

    ptrs_v0 = dense_ptr + offs_m[:, None] * stride_dm + offs_v0[None, :] * stride_dk
    ptrs_v1 = dense_ptr + offs_m[:, None] * stride_dm + offs_v1[None, :] * stride_dk
    ptrs_v2 = dense_ptr + offs_m[:, None] * stride_dm + offs_v2[None, :] * stride_dk
    ptrs_v3 = dense_ptr + offs_m[:, None] * stride_dm + offs_v3[None, :] * stride_dk

    v0 = tl.load(ptrs_v0)
    v1 = tl.load(ptrs_v1)
    v2 = tl.load(ptrs_v2)
    v3 = tl.load(ptrs_v3)

    compress_store_block(
        v0, v1, v2, v3,
        sparse_ptr, meta_ptr,
        stride_sm, stride_sk,
        M, K,
        BLOCK_M, BLOCK_N,
        0, 0 # Single block kernel, pid (0, 0)
    )
```
