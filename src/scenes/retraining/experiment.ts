import type { Scene } from '@graphlearning/flow'
import { p1, p2, perArm, designEffect, hoursNeeded, runDays, maturityDays } from './numbers'

// §2 — an experiment plan fixed before it starts. Sample size COMPUTED (two proportions, α 0.05,
// power 0.8, design effect for repeat customers); the calendar then sets the duration.
const n = (v: number) => v.toLocaleString('en-GB')

export const experiment: Scene = {
  id: 'experiment',
  title: 'Assignment units, stopping plans, guardrails',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'table',
      label: 'Does v14\'s window policy reduce broken promises?',
      headers: ['plan item', 'value'],
      values: [
        ['unit', 'customer (hashed), 50 / 50'],
        ['primary metric', `broken-promise rate: ${Math.round(p1 * 100)}% → ${Math.round(p2 * 100)}% to detect`],
        ['sample size', `${n(perArm)} orders per arm × design effect ${designEffect.toFixed(3)}`],
        ['traffic needed', `${hoursNeeded.toFixed(1)} hours of orders`],
        ['run length', `${runDays} days: two full weekly cycles`],
        ['read-out', `day ${runDays + maturityDays}, once the last labels mature`],
        ['guardrails', 'checkout conversion, support contacts, p99'],
      ],
    },
    {
      id: 'rules',
      label: 'Fixed before the first order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-unit', label: 'Unit', sub: 'customer, not request', pattern: 'user', icon: 'user' },
        { id: 'r-stop', label: 'Stopping', sub: 'no peeking at day 3', pattern: 'warn', icon: 'ban' },
        { id: 'r-metric', label: 'One primary', sub: 'others are secondary', pattern: 'service', icon: 'star' },
        { id: 'r-guard', label: 'Guardrails', sub: 'abort on harm', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'plan', target: 'rules', label: 'with' }],
}
