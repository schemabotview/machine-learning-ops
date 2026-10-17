import type { Scene } from '@graphlearning/flow'

// §8 — what a feature store does and does not do, and a version-compatible change to one feature.
export const evolution: Scene = {
  id: 'evolution',
  title: 'Feature-store limits and evolution',
  flow: 'TB',
  nodes: [
    {
      id: 'does',
      kind: 'table',
      label: 'A feature store, by responsibility',
      headers: ['it can', 'it cannot'],
      values: [
        ['register one definition per feature', 'decide the definition is correct'],
        ['run point-in-time joins for training', 'know when data was really available'],
        ['materialise values to an online store', 'make a stale value fresh'],
        ['record versions and owners', 'make a breaking change safe'],
      ],
    },
    {
      id: 'change',
      kind: 'table',
      label: 'Changing zone_delay from a 3 h mean to a 3 h median',
      headers: ['step', 'what happens', 'who is affected'],
      values: [
        ['1 · add zone_delay_3h_median_v2', 'new name; v1 untouched', 'nobody yet'],
        ['2 · backfill v2 history', 'as-of values for training', 'the next training run'],
        ['3 · train and validate on v2', 'a new model version', 'the candidate only'],
        ['4 · serve v1 and v2 side by side', 'old and new models both work', 'rollback stays possible'],
        ['5 · retire v1', 'after no model reads it', 'checked, not assumed'],
      ],
    },
    {
      id: 'rule',
      label: 'Compatible evolution',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-name', label: 'New meaning', sub: 'new name', pattern: 'service', icon: 'tag' },
        { id: 'e-unit', label: 'Units fixed', sub: 'never changed in place', pattern: 'warn', icon: 'ruler' },
        { id: 'e-readers', label: 'Readers known', sub: 'before retiring', pattern: 'network', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'does', target: 'change', label: 'so changes are explicit' },
    { source: 'change', target: 'rule' },
  ],
}
