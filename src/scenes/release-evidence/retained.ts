import type { Scene } from '@graphlearning/flow'

// §8 — what is kept for each release, for how long, owned by whom; and the rollback bundle.
export const retained: Scene = {
  id: 'retained',
  title: 'Retained evidence and rollback bundles',
  flow: 'TB',
  nodes: [
    {
      id: 'keep',
      kind: 'table',
      label: 'Kept for every released version',
      headers: ['evidence', 'kept for', 'owner'],
      values: [
        ['bundle + hashes', 'while live, then 1 year', 'ML team'],
        ['gate report and verdict', '2 years', 'ML team'],
        ['split manifest + test ids', 'while live, then 1 year', 'ML team'],
        ['approval record', '2 years', 'release approver'],
        ['training snapshot', 'while any version using it is live', 'data platform'],
      ],
    },
    {
      id: 'rollback',
      label: 'A rollback bundle is more than the old model',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-model', label: 'Model v12', sub: 'its bundle, intact', pattern: 'storage', icon: 'package' },
        { id: 'r-feat', label: 'Features v5', sub: 'still being served', pattern: 'network', icon: 'boxes' },
        { id: 'r-conf', label: 'Config', sub: 'thresholds it used', pattern: 'user', icon: 'pencil' },
        { id: 'r-test', label: 'Tested restore', sub: 'loaded in staging', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'keep', target: 'rollback', label: 'so rollback works' }],
}
