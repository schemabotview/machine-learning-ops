import type { Scene } from '@graphlearning/flow'
import { trueLate, expeditedLate, expediteShare, observedLate, holdoutShare, holdoutPerWeek, highRiskPerWeek } from './numbers'

// §3 — the model's own action changes the labels it will learn from. COMPUTED shares.
const pct = (v: number) => `${Math.round(v * 100)}%`

export const feedback: Scene = {
  id: 'feedback',
  title: 'Selective labels and feedback bias',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      label: 'The loop',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-pred', label: 'Risk > 0.6', sub: 'the model flags it', pattern: 'network', icon: 'sigma' },
        { id: 'l-act', label: 'Expedited', sub: `${pct(expediteShare)} of flagged`, pattern: 'warn', icon: 'zap' },
        { id: 'l-out', label: 'Mostly on time', sub: `late ${pct(expeditedLate)}, not ${pct(trueLate)}`, pattern: 'storage', icon: 'clock' },
        { id: 'l-learn', label: 'Next model', sub: `learns ${pct(observedLate)} for these`, pattern: 'warn', icon: 'repeat' },
      ],
    },
    {
      id: 'numbers',
      kind: 'table',
      label: 'High-risk orders (predicted > 0.6) · what the labels say',
      headers: ['group', 'late rate'],
      values: [
        ['if nobody expedited (true risk)', pct(trueLate)],
        ['expedited orders', pct(expeditedLate)],
        [`all flagged orders, ${pct(expediteShare)} expedited: what training sees`, pct(observedLate)],
        [`random ${pct(holdoutShare)} holdout, never expedited: ${holdoutPerWeek} / week of ${highRiskPerWeek.toLocaleString('en-GB')}`, `≈ ${pct(trueLate)}`],
      ],
    },
    {
      id: 'fixes',
      label: 'Ways to keep learning the right thing',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-hold', label: 'Holdout', sub: 'small, random, no action', pattern: 'service', icon: 'scale' },
        { id: 'f-feat', label: 'Log the action', sub: 'train on unexpedited', pattern: 'network', icon: 'tag' },
        { id: 'f-target', label: 'Change the target', sub: 'risk if not expedited', pattern: 'user', icon: 'pencil' },
      ],
    },
  ],
  edges: [
    { source: 'loop', target: 'numbers', label: 'in numbers' },
    { source: 'numbers', target: 'fixes', label: 'so' },
  ],
}
