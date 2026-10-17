import type { Scene } from '@graphlearning/flow'

// §4 — the operating policies, side by side, kept separate for the two systems.
export const policies: Scene = {
  id: 'policies',
  title: 'Monitoring, feedback and maintenance policies',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Operating policies',
      headers: ['policy', 'checkout predictor', 'daily planning job'],
      values: [
        ['service objective', '99.9% good within 150 ms / 30 d', 'published by 05:00, 99% of nights'],
        ['quality check', 'weekly log loss ≤ 0.40, matured', 'weekly duration MAE ≤ 0.6 h'],
        ['drift', 'PSI + range rules, seasonal reference', 'row counts, snapshot age'],
        ['feedback', '5% unexpedited holdout', 'routes completed vs planned'],
        ['retrain', 'monthly candidate, gated', 'quarterly, gated'],
        ['promotion', 'approval + 48 h canary', 'approval + 7-night shadow'],
        ['owner', 'ML team; on-call rota', 'ML team; logistics informed'],
      ],
    },
    {
      id: 'why',
      label: 'Why they differ',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-label', label: 'Labels', sub: 'risk: 7 d; duration: 1 d', pattern: 'storage', icon: 'clock' },
        { id: 'w-harm', label: 'Harm', sub: 'customers vs planners', pattern: 'warn', icon: 'user' },
        { id: 'w-change', label: 'Change rate', sub: 'monthly vs quarterly', pattern: 'network', icon: 'repeat' },
      ],
    },
    {
      id: 'shared',
      label: 'Shared by both',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-gates', label: 'Same gates', sub: 'registry, approval', pattern: 'service', icon: 'scale' },
        { id: 's-inc', label: 'Same incidents', sub: 'one process, one rota', pattern: 'warn', icon: 'zap' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'why', label: 'because' },
    { source: 'why', target: 'shared', label: 'but' },
  ],
}
