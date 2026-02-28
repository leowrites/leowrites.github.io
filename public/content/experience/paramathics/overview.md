### Overview

Matrix multiplication is one of the most expensive operations in machine learning. While GPUs are
optimized for dense data, the new [Nvidia Sparse Tensor Cores](https://developer.nvidia.com/blog/structured-sparsity-in-the-nvidia-ampere-architecture-and-applications-in-search-engines/)
exploits sparsity (zeros) can lead to massive speedups. As an undergraduate research assistant, I worked on
extending the [Triton compiler](https://github.com/openai/triton "A ML compiler for deep learning")
to support these sparse operations efficiently.

Our matmul kernels takes in a sparse A matrix and a dense B matrix. In our parallelism model, we divide
the output matrix into blocks and distribute the tiles to warps. This is similar to [Triton's matmul tutorial](https://triton-lang.org/main/getting-started/tutorials/03-matrix-multiplication.html)
as it maximizes data reuse.

The following figure shows how we take a sparse matrix, split it into sparse and dense blocks, and
format the result in [BCSR](https://en.wikipedia.org/wiki/Sparse_matrix "Blocked compressed sparse row") before
feeding it into our kernels.

![Matrix Decomposition](/triton/matrix_decomposition.png)

My contribution to the project is mainly on the frontend of the compiler.
This includes experimenting with [new matmul kernels](#kernels-paramathics-lab-university-of-toronto)
to optimize performance, implementing clean APIs for [autotuning](#autotuning-paramathics-lab-university-of-toronto),
building a [fused matmul-compress kernel](#fused-matmul-compress-kernel-paramathics-lab-university-of-toronto),
developing [sparse matrix multiplication support](#sparse-matrix-multiplication-support-paramathics-lab-university-of-toronto),
and improving [pipelining](#pipelining-paramathics-lab-university-of-toronto) while benchmarking the speedup.
