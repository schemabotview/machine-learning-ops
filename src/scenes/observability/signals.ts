import type { Scene } from '@graphlearning/flow'

// §2 — the operational signals for each system, with what each one catches.
export const opsSignals: Scene = {
  id: 'ops-signals',
  title: 'Latency, errors, saturation, freshness',
  flow: 'TB',
  nodes: [
    {
      id: 'online',
      kind: 'table',
      label: 'Checkout predictor',
      headers: ['signal', 'alert when', 'catches'],
      values: [
        ['p99 latency', '> 150 ms for 10 min', 'slow features, overload'],
        ['error rate', '> 0.5% for 5 min', 'crashes, bad deploys'],
        ['saturation', 'CPU > 70% or queue > 20', 'the knee, before it hurts'],
        ['fallback rate', '> 2% for 15 min', 'a dependency failing quietly'],
        ['feature age', 'zone_delay > 30 min old', 'a stuck materialisation job'],
      ],
    },
    {
      id: 'batch',
      kind: 'table',
      label: 'Daily planning job',
      headers: ['signal', 'alert when', 'catches'],
      values: [
        ['published by', 'not done at 04:30', 'a late or stuck run'],
        ['rows published', '≠ expected ± 2%', 'missing zones, duplicates'],
        ['input snapshot age', 'older than 26 h', 'yesterday\'s data, again'],
      ],
    },
    {
      id: 'gap',
      label: 'What none of these see',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'g-values', label: 'Wrong values', sub: 'fast, valid, wrong', pattern: 'warn', icon: 'bug' },
        { id: 'g-quality', label: 'Model quality', sub: 'needs labels: § 7', pattern: 'network', icon: 'barchart' },
      ],
    },
  ],
  edges: [
    { source: 'online', target: 'batch', label: 'and' },
    { source: 'batch', target: 'gap', label: 'but' },
  ],
}
