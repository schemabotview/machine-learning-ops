import type { Scene } from '@graphlearning/flow'

// §8 — what may be cached, how every response attributes itself, and where the model runs.
export const servingCache: Scene = {
  id: 'serving-cache',
  title: 'Caching, attribution, placement',
  flow: 'TB',
  nodes: [
    {
      id: 'cache',
      kind: 'table',
      label: 'What can be cached, and with what key',
      headers: ['item', 'cache?', 'key must include'],
      values: [
        ['zone features', 'yes, 60 s', 'zone, feature version'],
        ['customer features', 'yes, 10 min', 'customer, feature version'],
        ['a prediction', 'rarely: inputs change', 'every input + model version'],
        ['the model', 'in memory, per pod', 'bundle hash'],
      ],
    },
    {
      id: 'response',
      kind: 'code',
      filename: 'response.json',
      label: `{"order_id": "88412", "late_risk": 0.31, "window": "2–4 days",
 "model_version": "late-risk@14", "features": "checkout_features@6",
 "source": "model", "stale": [], "request_id": "req-7f21…"}`,
    },
    {
      id: 'place',
      label: 'Where it runs',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'pl-cpu', label: 'CPU pods', sub: 'GBM: 25 ms, cheap', pattern: 'service', icon: 'cpu' },
        { id: 'pl-gpu', label: 'GPU', sub: 'not needed here', pattern: 'warn', icon: 'zap' },
        { id: 'pl-near', label: 'Near features', sub: 'same region', pattern: 'network', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'cache', target: 'response', label: 'every answer says' },
    { source: 'response', target: 'place' },
  ],
}
