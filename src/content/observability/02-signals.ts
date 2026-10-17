import type { Section } from '../types'

export const signals: Section = {
  id: 'signals',
  title: 'Latency/errors/saturation and batch/feature freshness',
  scene: 'ops-signals',
  focus: 'online',
  slide: `## Operational signals

Each system gets a small set of signals, each alerting on a condition it **catches**. Online and batch need different ones.

### Checkout predictor
- **p99 latency** and **error rate**: slow features, overload, bad deploys
- **Saturation**: CPU over 70% or a queue over 20, before the knee
- **Fallback rate** over 2%: a dependency failing quietly
- **Feature age**: a stuck materialisation job

### Daily planning job
- Not published by **04:30**: a late or stuck run
- Rows published off by more than 2%: missing zones or duplicates
- An input snapshot older than **26 hours**: yesterday's data, again

### What none of these see
- A service that is fast, valid and **wrong**`,
  narration:
    "Each system needs a small set of operational signals, and each signal should alert on a condition it is there to catch. Online and batch systems need different ones. For the checkout predictor, ninety-ninth percentile latency and the error rate catch slow features, overload and bad deployments. Saturation, CPU above seventy percent or a queue longer than twenty, warns before the replica reaches the knee of its latency curve from chapter seven. The fallback rate, alerting above two percent for fifteen minutes, catches a dependency that is failing quietly, while the service itself looks healthy. And feature age catches a stuck materialisation job, when the zone delay feature has not been refreshed for over thirty minutes. The daily planning job has no latency in this sense. Its signals are whether the night is published by half past four, giving half an hour before the deadline. Whether the number of rows published is within two percent of the number expected, which catches missing zones and duplicates. And whether the input snapshot is more than twenty-six hours old, which would mean the job has scored yesterday's data again. What none of these signals can see is a service that is fast, valid and wrong. That needs the data and quality monitoring later in this chapter.",
}
