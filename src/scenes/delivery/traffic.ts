import type { Scene } from '@graphlearning/flow'
import { bucket, canaryShare, mixedShare } from './numbers'

// §5 — sticky assignment by customer hash, and the guardrails watched during the canary. Bucket
// values and shares COMPUTED.
const ids = ['c104211', 'c104212', 'c104213', 'c104239', 'c112004']

export const traffic: Scene = {
  id: 'traffic',
  title: 'Traffic allocation, sticky units, guardrails',
  flow: 'TB',
  nodes: [
    {
      id: 'assign',
      kind: 'table',
      label: `hash(salt, customer_id) mod 100 < 5 → canary · ${(canaryShare * 100).toFixed(1)}% of 20,000 customers`,
      headers: ['customer', 'bucket', 'serves', 'every later checkout'],
      values: ids.map((c) => [c, String(bucket(c)), bucket(c) < 5 ? 'v14 canary' : 'v12', 'same arm']),
    },
    {
      id: 'units',
      label: 'Why the unit is the customer',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'u-req', label: 'Per request', sub: `${Math.round(mixedShare * 100)}% of 6-order customers mixed`, pattern: 'warn', icon: 'swap' },
        { id: 'u-cust', label: 'Per customer', sub: 'one window policy each', pattern: 'service', icon: 'user' },
      ],
    },
    {
      id: 'guards',
      kind: 'table',
      label: 'Guardrails, checked every 5 minutes on the canary arm',
      headers: ['guardrail', 'abort if'],
      values: [
        ['error rate', '> 0.5% for 10 min'],
        ['p99 latency', '> 150 ms for 10 min'],
        ['fallback rate', '> 2× stable arm'],
        ['mean late_risk', 'shifts > 0.05 from stable arm'],
      ],
    },
  ],
  edges: [
    { source: 'assign', target: 'units', label: 'sticky by' },
    { source: 'units', target: 'guards', label: 'watched by' },
  ],
}
