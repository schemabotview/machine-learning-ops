import type { Scene } from '@graphlearning/flow'

// §2 — one day's 10,000 incoming order rows against the contract's rules. Counts are illustrative;
// the accepted total and shares are COMPUTED. Rules are assumed disjoint for this batch.
const total = 10_000
export const rules = [
  { rule: 'zone missing', count: 42, action: 'quarantine' },
  { rule: 'weight_kg ≤ 0 or > 50', count: 17, action: 'quarantine' },
  { rule: 'duplicate order_id', count: 9, action: 'keep latest, log' },
  { rule: 'distance_km > 80', count: 120, action: 'quarantine: source sent metres' },
]
const quarantined = rules.filter((r) => r.action.startsWith('quarantine')).reduce((a, r) => a + r.count, 0)
export const accepted = total - quarantined - rules[2].count
const pct = (v: number) => `${((100 * v) / total).toFixed(2)}%`

export const quality: Scene = {
  id: 'quality',
  title: 'Quality rules, quarantine, corrections, replay',
  flow: 'TB',
  nodes: [
    {
      id: 'rules',
      kind: 'table',
      label: `One day, ${total.toLocaleString('en-GB')} rows → ${accepted.toLocaleString('en-GB')} accepted`,
      headers: ['rule', 'rows', 'share', 'action'],
      values: rules.map((r) => [r.rule, String(r.count), pct(r.count), r.action]),
    },
    {
      id: 'flow',
      label: 'Bad rows are held, fixed at the source, then replayed',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-raw', label: 'Raw batch', sub: 'append-only', pattern: 'storage', icon: 'database' },
        { id: 'f-check', label: 'Validate', sub: 'contract v3 rules', pattern: 'service', icon: 'circlecheck' },
        { id: 'f-ok', label: 'Accepted', sub: 'into the snapshot', pattern: 'network', icon: 'boxes' },
        { id: 'f-q', label: 'Quarantine', sub: 'kept, never dropped', pattern: 'warn', icon: 'lock' },
        { id: 'f-fix', label: 'Correction', sub: 'source re-sends in km', pattern: 'user', icon: 'pencil' },
        { id: 'f-replay', label: 'Replay', sub: 'same rules, new snapshot', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'rules', target: 'flow', label: 'and then' }],
}
