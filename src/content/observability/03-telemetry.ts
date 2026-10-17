import type { Section } from '../types'

export const telemetry: Section = {
  id: 'telemetry',
  title: 'Logs/metrics/traces with model/data attribution',
  scene: 'telemetry',
  focus: 'event',
  slide: `## Telemetry that says which model

Logs, metrics and traces answer different questions. All three must carry the **model and data identity**, or diagnosis stalls.

### Three kinds
- **Prediction log**: one event per request, every input and output
- **Metrics**: counts, latencies and rates, cheap to aggregate
- **Traces**: one request's spans across services

### The prediction event
- request_id, model_version and features_version
- The feature **values** used, any stale ones, and the source
- Latency split into features, model and total

### Metric labels
- model_version, source and zone: **few** values, so labels
- order_id: millions of values, so it belongs in the **log**`,
  narration:
    "Logs, metrics and traces answer different questions, and all three must carry the identity of the model and the data, or diagnosis stalls at the first step. The prediction log records one event per request, with every input and output, so a single prediction can be reconstructed or replayed. Metrics are counts, latencies and rates, cheap to store and aggregate, and they drive dashboards and alerts. Traces follow one request across services, as spans, showing for example that the feature fetch took twenty-one of a request's forty-seven milliseconds. Look at one prediction event. It has a request identifier and a timestamp. It carries the customer as a keyed hash, not the raw identifier. It names the model version and the feature version. It records the feature values actually used, which stale features there were, and whether the answer came from the model or a fallback, followed by the risk, the window shown, and the latency split. Metric labels need a different discipline. Model version, source and zone have only a few values each, so they can be labels, letting every metric be broken down by model version during a canary. Order identifiers have millions of values, and as labels they would overwhelm the metrics system, so they belong in the log.",
}
