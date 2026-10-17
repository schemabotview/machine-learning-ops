import type { Section } from '../types'

export const latency: Section = {
  id: 'latency',
  title: 'Feature path and end-to-end latency',
  scene: 'latency',
  focus: 'budget',
  slide: `## Spending a 150 ms budget

The latency contract covers the **whole** path, not just the model. Give each step a p99 allocation, and leave room for queueing.

### One request, in order
- Checkout API → validate → **online features** → model → log → respond

### The p99 allocations
- Network in and TLS: 12 ms; parse and validate: 3 ms
- Feature fetch: **40 ms**, enforced as a timeout
- Model predict: **25 ms**, in-process
- Post-process and log: 5 ms; network out: 10 ms
- Allocated: **95 ms**, leaving **55 ms** for queueing and the tail

### Where it usually goes wrong
- The **feature fetch**, not the model, dominates the tail
- Log writes are **asynchronous**, never on the request path`,
  narration:
    "The latency contract from chapter one covers the whole path of a request, not just the model, so each step needs a ninety-ninth percentile allocation, and the allocations need to leave room for queueing. One checkout request goes in order: the checkout API calls the predictor, the request is validated against the signature, the online features for the order's zone and customer are fetched, the model predicts in-process, the prediction is logged, and the response returns to checkout, which shows the delivery window. The allocations are: twelve milliseconds for the network in, including TLS. Three for parsing and validation. Forty for the feature fetch, which is enforced as a timeout rather than merely hoped for. Twenty-five for the model's prediction. Five for post-processing and logging, and ten for the network out. Those add up to ninety-five milliseconds, leaving fifty-five for queueing and the unpredictable tail. Two lessons usually hold. The feature fetch, a network call to another system, dominates the tail far more often than the model does, which is why it has a hard deadline and a fallback. And log writes happen asynchronously, never on the request path, so a slow logging system cannot slow down checkout.",
}
