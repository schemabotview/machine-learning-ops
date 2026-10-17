import type { Scene } from '@graphlearning/flow'

// §6 — a retrained candidate meets the same evidence as any other change.
export const promotion: Scene = {
  id: 'promotion',
  title: 'Champion comparison and promotion separation',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'One path for every candidate',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-train', label: 'Retrain', sub: 'pipeline, monthly', pattern: 'network', icon: 'cpu' },
        { id: 'p-gate', label: 'Gates', sub: 'vs current champion', pattern: 'warn', icon: 'scale' },
        { id: 'p-reg', label: 'Register', sub: 'immutable version', pattern: 'storage', icon: 'package' },
        { id: 'p-approve', label: 'Approve', sub: 'a person, recorded', pattern: 'user', icon: 'user' },
        { id: 'p-canary', label: 'Canary', sub: '5% of customers', pattern: 'warn', icon: 'gauge' },
        { id: 'p-alias', label: 'Alias moves', sub: 'champion = new', pattern: 'service', icon: 'tag' },
      ],
    },
    {
      id: 'months',
      kind: 'table',
      label: 'Six monthly retrains',
      headers: ['month', 'gate verdict', 'promoted?'],
      values: [
        ['Jan', 'pass', 'yes: v12'],
        ['Feb', 'stopped at data gate', 'no'],
        ['Mar', 'no gain', 'no'],
        ['Apr', 'v13 fail (latency, rural recall)', 'no'],
        ['Apr', 'v14, retuned: pass', 'yes, after a 48 h canary'],
        ['May', 'inconclusive', 'no: champion stays, more data'],
      ],
    },
  ],
  edges: [{ source: 'path', target: 'months', label: 'in practice' }],
}
