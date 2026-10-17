import type { Scene } from '@graphlearning/flow'
import { parts, totalOrders, largest, ordersPerMin, workers, wallMin } from './numbers'

// §1 — the nightly scoring job: one snapshot, 64 zone partitions, a manifest. COMPUTED sizes and
// wall time (greedy longest-first over 4 workers).
const n = (v: number) => v.toLocaleString('en-GB')
const sorted = [...parts].sort((a, b) => b - a)

export const batch: Scene = {
  id: 'batch',
  title: 'Batch snapshots, partitions, manifests',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'table',
      label: `planning-daily · ${n(totalOrders)} orders in 64 zone partitions`,
      headers: ['quantity', 'value'],
      values: [
        ['input', 'orders_open@2026-04-02T01:00Z, one snapshot'],
        ['largest partition', `${n(largest)} orders · ${(largest / ordersPerMin).toFixed(1)} min`],
        ['median partition', `${n(sorted[32])} orders`],
        ['smallest partition', `${n(sorted[63])} orders`],
        ['throughput', `${n(ordersPerMin)} orders / min per worker`],
        [`wall time, ${workers} workers`, `${wallMin.toFixed(1)} min`],
      ],
    },
    {
      id: 'why',
      label: 'Why partition, and by what',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-one', label: 'One snapshot', sub: 'every partition, same time', pattern: 'storage', icon: 'calendar' },
        { id: 'w-zone', label: 'By zone', sub: 'routing reads by zone', pattern: 'network', icon: 'globe' },
        { id: 'w-retry', label: 'Retry a part', sub: 'not the whole night', pattern: 'service', icon: 'repeat' },
      ],
    },
    {
      id: 'manifest',
      kind: 'code',
      filename: 'runs/planning-2026-04-02/manifest.json',
      label: `{"run_key": "planning-v7-2026-04-02", "model": "duration@9",
 "input": "orders_open@2026-04-02T01:00Z", "partitions": 64,
 "expected_rows": 180000, "status": {"done": 64, "failed": 0},
 "output": "scores/plan_date=2026-04-03/", "published": "04:52Z"}`,
    },
  ],
  edges: [
    { source: 'plan', target: 'why', label: 'partitioned' },
    { source: 'why', target: 'manifest', label: 'recorded' },
  ],
}
