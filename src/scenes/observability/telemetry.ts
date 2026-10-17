import type { Scene } from '@graphlearning/flow'

// §3 — logs, metrics and traces, each carrying the model and data identity.
export const telemetry: Scene = {
  id: 'telemetry',
  title: 'Logs, metrics, traces with attribution',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Three kinds of telemetry',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'k-log', label: 'Prediction log', sub: 'one event per request', pattern: 'storage', icon: 'database' },
        { id: 'k-metric', label: 'Metrics', sub: 'counts, latencies, rates', pattern: 'network', icon: 'barchart' },
        { id: 'k-trace', label: 'Traces', sub: 'spans across services', pattern: 'service', icon: 'share' },
      ],
    },
    {
      id: 'event',
      kind: 'code',
      filename: 'prediction_log · one event',
      label: `{"request_id": "req-7f21…", "ts": "2026-04-14T13:02:11.481Z",
 "order_id": "88412", "customer_key": "h:9c2e…",          // hashed, not raw
 "model_version": "late-risk@14", "features_version": "checkout_features@6",
 "features": {"distance_km": 6.2, "zone": "N7", "zone_delay_3h": 38.75, …},
 "stale": [], "source": "model", "late_risk": 0.31, "window": "2–4 days",
 "latency_ms": {"features": 21, "model": 14, "total": 47}}`,
    },
    {
      id: 'labels',
      kind: 'table',
      label: 'Metric labels: attribution without exploding cardinality',
      headers: ['label', 'values', 'use as a label?'],
      values: [
        ['model_version', '2–3 live at once', 'yes'],
        ['source', 'model / fallback', 'yes'],
        ['zone', '64', 'yes, for a few metrics'],
        ['order_id', 'millions', 'no: put it in the log'],
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'event', label: 'the log event' },
    { source: 'event', target: 'labels', label: 'the metric side' },
  ],
}
