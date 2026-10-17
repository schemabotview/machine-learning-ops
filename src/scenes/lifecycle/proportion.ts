import type { Scene } from '@graphlearning/flow'

// §6 — what the minimal lifecycle needs now, and the signal that would justify each expansion.
export const proportion: Scene = {
  id: 'proportion',
  title: 'Minimal lifecycle versus platform expansion',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Have now, and what would justify more',
      headers: ['capability', 'today', 'expand when'],
      values: [
        ['feature store', 'one online store, two feature views', 'several teams share features'],
        ['orchestration', 'one pipeline per model', 'many models, shared steps'],
        ['serving', 'managed endpoint', 'five or more models'],
        ['experiments', 'hand-run, planned per test', 'tests every month'],
        ['monitoring', 'shared dashboards + 12 alerts', 'on-call load grows'],
        ['streaming features', 'not built', 'freshness < 1 min is needed'],
      ],
    },
    {
      id: 'next',
      label: 'Beyond this course',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-ml', label: 'Machine Learning', sub: 'models and evaluation', pattern: 'network', icon: 'barchart' },
        { id: 'n-dl', label: 'Deep Learning', sub: 'neural training state', pattern: 'network', icon: 'brain' },
        { id: 'n-stats', label: 'Probability & Stats', sub: 'experiment theory', pattern: 'service', icon: 'sigma' },
        { id: 'n-infra', label: 'Cloud, security', sub: 'infrastructure depth', pattern: 'external', icon: 'layers' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'next', label: 'and for depth' }],
}
