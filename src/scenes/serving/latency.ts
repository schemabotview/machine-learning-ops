import type { Scene } from '@graphlearning/flow'
import { budget, budgetSum } from './numbers'

// §5 — where a checkout request spends its 150 ms p99 budget. Allocations illustrative; the total
// and the headroom are COMPUTED.
export const latency: Scene = {
  id: 'latency',
  title: 'Feature path and end-to-end latency',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'One checkout request, in order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-in', label: 'Checkout API', sub: 'calls the predictor', pattern: 'user', icon: 'globe' },
        { id: 'l-val', label: 'Validate', sub: 'against signature', pattern: 'service', icon: 'circlecheck' },
        { id: 'l-feat', label: 'Online features', sub: 'zone, customer', pattern: 'storage', icon: 'database' },
        { id: 'l-model', label: 'Model', sub: 'in-process', pattern: 'network', icon: 'cpu' },
        { id: 'l-log', label: 'Log + respond', sub: 'async log write', pattern: 'service', icon: 'pencil' },
        { id: 'l-out', label: 'Back to checkout', sub: 'window shown', pattern: 'user', icon: 'clock' },
      ],
    },
    {
      id: 'budget',
      kind: 'table',
      label: `p99 allocations: ${budgetSum} ms of 150 · ${150 - budgetSum} ms for queueing and the tail`,
      headers: ['step', 'p99 allocation'],
      values: [...budget.map((b) => [b.step, `${b.ms} ms`]), ['total allocated', `${budgetSum} ms`]],
    },
  ],
  edges: [{ source: 'path', target: 'budget', label: 'costs' }],
}
