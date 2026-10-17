import type { Scene } from '@graphlearning/flow'

// §3 — a data inventory: each field is kept only because a named use needs it.
export const minimise: Scene = {
  id: 'minimise',
  title: 'Minimisation, retention, sensitive logging',
  flow: 'TB',
  nodes: [
    {
      id: 'inventory',
      kind: 'table',
      label: 'Fields in the late-risk lifecycle',
      headers: ['field', 'needed for', 'stored as', 'kept'],
      values: [
        ['delivery address', 'nothing the model uses', 'not copied: zone only', '—'],
        ['customer id', 'joins, repeat-customer features', 'keyed hash', '13 months'],
        ['order history', 'customer_late_rate', 'aggregates only', 'rolling 12 months'],
        ['phone, email', 'nothing', 'never enters ML systems', '—'],
        ['prediction logs', 'quality joins, audits', 'hashed ids', '13 months'],
        ['support transcripts', 'proposed feature: rejected', '—', '—'],
      ],
    },
    {
      id: 'rules',
      label: 'Tests a new field must pass',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-use', label: 'A named use', sub: 'feature, join or audit', pattern: 'service', icon: 'tag' },
        { id: 'm-less', label: 'Least detail', sub: 'zone, not address', pattern: 'network', icon: 'scissors' },
        { id: 'm-end', label: 'An end date', sub: 'retention set at entry', pattern: 'warn', icon: 'calendar' },
      ],
    },
    {
      id: 'policy',
      kind: 'code',
      filename: 'data/retention.yaml',
      label: `prediction_log:   {keep: 13 months, ids: keyed_hash, then: delete}
feature_values:   {keep: 90 days,  then: delete}
order_aggregates: {window: rolling 12 months}
training_snapshots: {keep: while_any_model_live, then: 1 year}`,
    },
  ],
  edges: [
    { source: 'inventory', target: 'rules', label: 'every row passed' },
    { source: 'rules', target: 'policy', label: 'enforced by' },
  ],
}
