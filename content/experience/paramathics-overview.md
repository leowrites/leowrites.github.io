### Overview

Matrix multiplication is one of the most expensive operations in machine learning. While GPUs are optimized for dense data, exploiting sparsity (zeros) can lead to massive speedups. I worked on extending the [Triton compiler](https://github.com/openai/triton "A ML compiler for deep learning") to support these sparse operations efficiently.

![Matrix Decomposition](/triton/matrix_decomposition.png)
