import type { Scene } from '@graphlearning/flow'
import { models, costPer1k, perHour, monthlyCalls } from './numbers'

// §3 — cost per call attributed to the model, and a measured quality–latency–cost comparison.
// COMPUTED from stated replica costs.
const n = (v: number) => v.toLocaleString('en-GB')
const [a, b] = models

export const cost: Scene = {
  id: 'cost',
  title: 'Cost attribution and trade-offs',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: `${n(monthlyCalls)} calls a month · £${perHour} per replica-hour (assumed)`,
      headers: ['model', 'replicas for p99 ≤ 150 ms', '£ / month', '£ per 1,000 calls', 'log loss'],
      values: models.map((m) => [m.name, String(m.replicas), (m.replicas * perHour * 24 * 30).toFixed(0), costPer1k(m.replicas).toFixed(4), m.logLoss.toFixed(4)]),
    },
    {
      id: 'reading',
      label: 'Reading the trade-off',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-cost', label: '2× the cost', sub: `+£${((b.replicas - a.replicas) * perHour * 720).toFixed(0)} a month`, pattern: 'warn', icon: 'scale' },
        { id: 'r-gain', label: 'Tiny gain', sub: `${(b.logLoss - a.logLoss).toFixed(4)} log loss`, pattern: 'network', icon: 'barchart' },
        { id: 'r-value', label: 'Worth it?', sub: 'only if it moves the objective', pattern: 'user', icon: 'star' },
      ],
    },
    {
      id: 'attrib',
      kind: 'table',
      label: 'Attributing the bill',
      headers: ['cost', 'charged to'],
      values: [
        ['serving replicas', 'late-risk model, per environment'],
        ['feature store reads', 'each model, by read count'],
        ['training runs', 'the pipeline run key'],
        ['logs and storage', 'the owning model, by volume'],
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'reading', label: 'so' },
    { source: 'reading', target: 'attrib', label: 'tracked by' },
  ],
}
