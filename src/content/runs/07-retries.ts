import type { Section } from '../types'

export const retries: Section = {
  id: 'retries',
  title: 'Retries, numerical variation, and recovery',
  scene: 'retries',
  focus: 'policy',
  slide: `## Retry what is transient, nothing else

A retry helps only when the failure might not happen again. Decide by **failure kind**, and know how much a successful rerun varies.

### Retry by kind
- Preemption, a storage 503: **transient**, so retry with backoff
- Out of memory: a **resource** problem; resize once, by hand
- A schema failure or a NaN loss: **deterministic**; a retry fails again

### Numerical variation
- Five reruns, same config and seed, 8 threads
- Log loss from **0.3922** to **0.3928**: a spread of **0.0005**
- A candidate that wins by less is indistinguishable from **noise**

### Comparing fairly
- Declare a **tolerance** first; use several seeds when close`,
  narration:
    "A retry only helps when the failure might not happen again, so the retry policy should depend on the kind of failure. A spot preemption, or a temporary five-oh-three error from the object store, is transient: retry, with backoff, from the latest checkpoint, up to a small limit. Running out of memory is a resource problem. Retrying on the same machine fails the same way, so fail, and resize once, deliberately. A failed schema check or a loss that becomes not-a-number is deterministic. A retry will produce exactly the same failure, so fail immediately, and keep the logs and the last checkpoint for diagnosis, rather than burning three retries' worth of compute. Even a successful run varies. Five reruns of the same configuration, with the same seed, on eight threads, give validation log losses from nought point three nine two two to nought point three nine two eight, a spread of about five ten-thousandths, because parallel floating-point sums are not added in a fixed order. A candidate that beats the current model by less than that is indistinguishable from noise. So declare a tolerance before comparing candidates, not after seeing the numbers, and for close calls compare across several seeds rather than a single run each.",
}
