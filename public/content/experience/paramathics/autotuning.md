### The Problem

Kernel performance is highly sensitive to configuration—block sizes, warp counts, pipeline stages, and reduction strategies all interact in non-obvious ways. The optimal parameters vary based on matrix dimensions, sparsity patterns, and even the specific GPU hardware. Manually searching this space is impractical, especially with the number of kernel variants we developed (sequential, concurrent, variable tile, split-K, persistent).

### Composable Grid Configurations

I designed a composable configuration system that lets us declaratively build search spaces for each kernel variant. Base parameters (block sizes, group sizes, warp counts) can be extended with schedule-specific parameters like split-K factors or reduction strategies. Each `Schedule` bundles a kernel launcher, its compression function, and the configuration grid to search over.

```python
@dataclass
class Schedule:
    launcher: Callable
    compressor: Callable
    configs: Dict[str, List[int]]
    compressor_param_map: Callable

# Composable grid helpers
def grid(**kwargs) -> Grid:
    return {k: _seq(v) for k, v in kwargs.items()}

def compose(base: Grid, **overrides) -> Grid:
    g = {**base}
    for k, v in overrides.items():
        g[k] = _seq(v)
    return g

# Example: extending a base config for concurrent kernels
BASE_P = grid(
    BLOCK_SIZE_K=[64, 128],
    GROUP_SIZE_M=[4, 8],
    num_stages=3,
    num_warps=[4, 8],
)

def concurrent_grid(BLOCK_SIZE_M, BLOCK_SIZE_N, BLOCK_SIZE_K):
    return compose(
        base_grid(BLOCK_SIZE_M, BLOCK_SIZE_N, BLOCK_SIZE_K),
        REDUCTION=[ConcurrentReductionStrategy.ATOMIC,
                   ConcurrentReductionStrategy.SEMAPHORE],
    )
```

The `build_schedules` function assembles the full set of schedules for a given kernel family, making it easy to filter to a subset or add new variants without touching the autotuner itself.

### The Inspector — Autotuning Engine

The core `Inspector` class performs an exhaustive grid search across all schedule-config combinations. For each candidate, it compresses the matrix with the appropriate block sizes, benchmarks the kernel using Triton's `do_bench`, and tracks the fastest configuration.

```python
class Inspector:
    def inspect(self, a_matrix, b_matrix, isASparse=False, ...) -> Dict:
        key = self._get_cache_key(a_matrix, b_matrix, isASparse)
        if key in self.best_configs:
            return self.best_configs[key]

        # Enumerate all valid schedule-config combinations
        all_configs = []
        for name, schedule in self.schedules.items():
            configs = expand(schedule.configs)
            valid = self._prune_configs(configs, M, N, K)
            all_configs.extend((name, schedule, cfg) for cfg in valid)

        # Benchmark each configuration
        for name, schedule, config in all_configs:
            compressed_data = schedule.compressor(pruned_matrix, ...)
            time = bench_fct(
                lambda: schedule.launcher(
                    input_matrix, *compressed_data, M=M, N=N, K=K, **config
                )
            )
            runs.append((name, config, time))

        best_schedule, best_cfg, best_time = min(runs, key=lambda x: x[2])
        self._save_cache(key, {"schedule": best_schedule, "config": best_cfg})
        return best_config
```

Key design decisions:

- **Hardware-aware cache keys** — results are keyed by `M:N:K:sparsity:dtype:device`, so tuning results transfer across runs on the same GPU but re-tune automatically when hardware changes.
- **Config pruning** — invalid configurations (e.g., block sizes larger than the matrix dimension) are filtered before benchmarking.
- **Verification pipeline** — a `test_correctness` mode validates each configuration against `torch.mm` before committing to a full benchmark pass, catching numerical issues early.

The autotuning subsystem contributed an additional 8% performance boost by discovering non-obvious optimal configurations.

![Inspector](/triton/inspector.png)
