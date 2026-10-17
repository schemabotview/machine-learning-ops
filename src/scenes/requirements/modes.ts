import type { Scene } from '@graphlearning/flow'

// §2 — the two systems' requirements side by side, and who owns what each depends on.
export const modes: Scene = {
  id: 'modes',
  title: 'Batch and online requirements',
  flow: 'TB',
  nodes: [
    {
      id: 'reqs',
      kind: 'table',
      label: 'Requirements, stated before any architecture',
      headers: ['', 'checkout predictor', 'daily planning job'],
      values: [
        ['trigger', 'each checkout request', '02:00 every night'],
        ['volume', '≈ 40 requests / s at peak', '≈ 180,000 orders / run'],
        ['latency', 'p99 ≤ 150 ms, in the request', 'done by 05:00 (3 h window)'],
        ['features', 'known at checkout only', 'as of 01:00 snapshot'],
        ['output', 'one response, then gone', 'a table read by routing'],
        ['if it fails', 'checkout must still work', 'routing uses yesterday + rules'],
      ],
    },
    {
      id: 'deps',
      label: 'Dependencies and their owners',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-api', label: 'Checkout API', sub: 'checkout team', pattern: 'user', icon: 'globe' },
        { id: 'd-feat', label: 'Feature service', sub: 'data platform', pattern: 'storage', icon: 'database' },
        { id: 'd-model', label: 'Model registry', sub: 'ML team', pattern: 'network', icon: 'package' },
        { id: 'd-orders', label: 'Orders warehouse', sub: 'data engineering', pattern: 'storage', icon: 'database' },
        { id: 'd-route', label: 'Routing system', sub: 'logistics team', pattern: 'external', icon: 'share' },
        { id: 'd-labels', label: 'Delivery scans', sub: 'carrier feed', pattern: 'external', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'reqs', target: 'deps', label: 'depends on' }],
}
