### Sparse Kernels

Defining sparsity at the block level introduces complex scheduling problems—like a factory line where some parts are heavy and some are light. Simple sequential schedules lead to load imbalance and poor GPU utilization as threads stall waiting for others to finish dense blocks.

### Schedules

I implemented block-sparse matrix multiplication support in Triton using K-dimension block iteration. To solve the load balancing issue, I developed a decoupled dual-program scheduling strategy. This approach launches distinct programs that specialize threads for either sparse or dense blocks, optimizing instruction cache usage and keeping execution units saturated.

### Autotuning API

I built a robust user-facing API featuring an automated tuning engine. The system automates the search for optimal kernel configurations, caches results to amortize tuning costs, and enforces a strict verification pipeline. This pipeline validates results against reference implementations on smaller matrices before scaling up, ensuring mathematical precision. The autotuning subsystem contributed an additional 8% performance boost by discovering non-obvious optimal configurations, providing a 'fast path' to high performance that users could trust for production workloads.

![Inspector](/triton/inspector.png)
