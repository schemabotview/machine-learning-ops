import type { Scene } from '@graphlearning/flow'

// §5 — evidence that controls work, and the risks that remain open, each with an owner.
export const risks: Scene = {
  id: 'risks',
  title: 'Security and recovery evidence, unresolved risks',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'table',
      label: 'Evidence on file',
      headers: ['control', 'evidence', 'date'],
      values: [
        ['least privilege', 'Q2 access review: 7 revoked, 5 narrowed', 'Q2'],
        ['restore', 'drill: 2 of 4 failed, fixed, re-drill due', 'Q2 → Q3'],
        ['rollback', 'v12 restored in staging', '2 Apr'],
        ['supply chain', 'signed images only admitted', 'continuous'],
      ],
    },
    {
      id: 'open',
      kind: 'table',
      label: 'Unresolved risks',
      headers: ['risk', 'why open', 'owner', 'next step'],
      values: [
        ['feedback bias', 'holdout is small: 200 / week', 'ML team', 'review size in Q3'],
        ['rural recall', '0.74, close to the 0.70 floor', 'ML team', 'more rural data'],
        ['feed contracts', 'INC-0610 offset fix not yet live', 'data eng', 'due 30 Jun'],
        ['labels blind 7 days', 'quality lags any change', 'ML team', 'daily score checks'],
        ['carrier windows', 'may replace the model', 'product', 'decide retirement'],
      ],
    },
    {
      id: 'cadence',
      label: 'When this is reviewed',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-q', label: 'Quarterly', sub: 'every risk, every owner', pattern: 'service', icon: 'calendar' },
        { id: 'c-inc', label: 'After incidents', sub: 'new risks added', pattern: 'warn', icon: 'zap' },
        { id: 'c-use', label: 'Before a new use', sub: 'e.g. pricing', pattern: 'user', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'open', label: 'and still open' },
    { source: 'open', target: 'cadence', label: 'reviewed' },
  ],
}
