import type { Section } from '../types'

export const overload: Section = {
  id: 'overload',
  title: 'Concurrency, batching, queues, and overload',
  scene: 'overload',
  focus: 'curve',
  slide: `## The knee of the queue

Waiting time does not grow steadily with load. It stays flat, then **climbs steeply** as a replica approaches its capacity.

### One replica
- 4 workers × 30 ms per request: capacity **133** requests/s
- Mean time in system, W = S / (1 − ρ)
- At 40 requests/s: **43 ms**; at 100: **120 ms**
- At 120 requests/s: **300 ms**, twice the contract

### Staying left of the knee
- A **bounded** queue: reject rather than wait forever
- **Shed** load above 70% with a 429, and serve the fallback window
- **Scale** on load, targeting about 50% utilisation
- **Micro-batching** helps GPU models; this CPU model gains nothing

### Reading the curve
- The knee comes **before** capacity: plan for 50–70%`,
  narration:
    "Waiting time in a serving system does not grow steadily with load. It stays nearly flat, and then climbs steeply as a replica approaches its capacity. That shape is the most important thing to know about overload. One replica of the checkout predictor has four workers, and each request takes about thirty milliseconds of work, so its capacity is about a hundred and thirty-three requests a second. A simple queueing model gives the mean time a request spends in the system as the service time divided by one minus the utilisation. At forty requests a second, the retailer's peak, that is forty-three milliseconds. At a hundred requests a second it is a hundred and twenty. At a hundred and twenty requests a second it is three hundred milliseconds, twice the contract, even though the replica is still below its theoretical capacity. So the policies aim to stay to the left of the knee. Keep the queue bounded, so that excess requests are rejected quickly instead of waiting forever. Shed load above seventy percent utilisation with a too-many-requests response, which checkout turns into the fallback window. Autoscale on load, targeting around fifty percent utilisation. Micro-batching, grouping requests into one model call, helps models on GPUs, but this CPU model gains nothing from it.",
}
