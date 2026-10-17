import type { Section } from '../types'

export const parity: Section = {
  id: 'parity',
  title: 'Offline/online parity, materialisation, and freshness',
  scene: 'parity',
  focus: 'scatter',
  slide: `## Offline and online parity

Even with one feature definition, the value **served** and the value **recomputed** offline can differ. Measure parity on logged requests.

### 400 logged checkout requests
- The online store is **materialised** every 15 minutes
- A request reads the last refresh; the offline join recomputes at the request time
- **79.8%** agree within ±2 minutes
- **28** differ by more than 10: a burst of late deliveries since the refresh

### What parity depends on
- **One** definition, used by both paths
- A **refresh rate** matched to how fast the value moves
- **Logging** the value actually served, with its timestamp

### Which value to train on
- Train on the **served** values if live keeps the 15-minute lag`,
  narration:
    "Even with one feature definition shared by both paths, the value served to the model online and the value recomputed offline for training can differ. The way to know by how much is to measure parity on logged requests. In this example the online feature store is materialised every fifteen minutes, so a checkout request reads the value from the last refresh, while the offline as-of join recomputes the feature at the exact request time. Across four hundred logged checkout requests, seventy-nine point eight percent agree within two minutes. Twenty-eight differ by more than ten minutes, almost all of them requests that arrived shortly after a burst of late deliveries in their zone, which the online store had not yet picked up. Parity depends on three things. One feature definition, used by both paths, so the code cannot drift. A refresh rate matched to how quickly the value actually changes. And logging the value that was actually served, with its timestamp, so the comparison can be made at all. It also raises a design choice. If production will keep reading values up to fifteen minutes old, training on the served values, lag included, matches what the model will see. Training on perfectly fresh values teaches it a precision it never gets.",
}
