import type { Section } from '../types'

export const caching: Section = {
  id: 'caching',
  title: 'Caching, version attribution, and resource placement',
  scene: 'serving-cache',
  focus: 'response',
  slide: `## Caches, attribution, placement

A cache is only safe if its key includes **everything** that changes the answer. Every response says exactly what produced it.

### What can be cached
- Zone features: 60 s, keyed by zone **and** feature version
- Customer features: 10 minutes
- A whole prediction: rarely, since every input and the model version must be in the key
- The model itself: in memory, keyed by bundle hash

### Every response attributes itself
- model_version, the feature version and **source**
- Any **stale** features, and a request id that joins it to the logs

### Placement
- A gradient-boosted model at 25 ms needs **CPU** pods, not GPUs
- Run it in the **same region** as the online feature store`,
  narration:
    "Caching can remove a lot of latency, but a cache is only safe if its key includes everything that changes the answer. Zone features can be cached for sixty seconds, keyed by zone and by feature version, so that rolling out a new feature version can never serve old cached values. Customer features change slowly and can be cached for ten minutes. A whole prediction can rarely be cached, because its key would have to include every input and the model version, and inputs such as the zone's recent delays change constantly. The model itself is cached in memory in each pod, keyed by the bundle hash. Every response then attributes itself. It carries the model version and the feature version that produced it, its source, model or fallback, any features that were stale, and a request identifier that joins it to the logs. That attribution is what makes the monitoring in the next chapter possible, and it is the only reliable record of what was actually served. Finally, placement. A gradient-boosted model that predicts in twenty-five milliseconds on a CPU gains nothing from a GPU, so it runs on CPU pods. And it runs in the same region as the online feature store, because the feature fetch is the largest share of the latency budget.",
}
