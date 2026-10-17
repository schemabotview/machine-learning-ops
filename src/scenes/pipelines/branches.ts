import type { Scene } from '@graphlearning/flow'

// §2 — gates turn the pipeline into branches; three runs show the paths they take.
export const branches: Scene = {
  id: 'branches',
  title: 'Validation, training and evaluation branches',
  flow: 'TB',
  nodes: [
    {
      id: 'paths',
      label: 'Two gates, three ways a run can end',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-data', label: 'Data gate', sub: 'contract rules pass?', pattern: 'warn', icon: 'circlecheck' },
        { id: 'b-train', label: 'Train two', sub: 'GBM and logistic, parallel', pattern: 'network', icon: 'cpu' },
        { id: 'b-eval', label: 'Evaluation gate', sub: 'beats champion?', pattern: 'warn', icon: 'scale' },
        { id: 'b-stop', label: 'Stop: data', sub: 'alert the data owner', pattern: 'user', icon: 'ban' },
        { id: 'b-keep', label: 'Stop: no gain', sub: 'champion stays', pattern: 'service', icon: 'history' },
        { id: 'b-cand', label: 'Candidate', sub: 'to release review', pattern: 'external', icon: 'package' },
      ],
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Three monthly runs',
      headers: ['run', 'data gate', 'trained', 'evaluation gate', 'ends as'],
      values: [
        ['2026-01', 'pass', 'GBM, logistic', 'GBM 0.3941 < 0.3990', 'candidate'],
        ['2026-02', 'fail: 1.2% metres', '—', '—', 'stop: data'],
        ['2026-03', 'pass', 'GBM, logistic', '0.3951 vs 0.3941: no gain', 'stop: no gain'],
      ],
    },
  ],
  edges: [{ source: 'paths', target: 'runs', label: 'in practice' }],
}
