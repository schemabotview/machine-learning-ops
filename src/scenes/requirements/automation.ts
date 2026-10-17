import type { Scene } from '@graphlearning/flow'

// §7 — automation in proportion to how often things change and what a failure costs.
export const automation: Scene = {
  id: 'automation',
  title: 'Proportionate automation',
  flow: 'TB',
  nodes: [
    {
      id: 'levels',
      kind: 'table',
      label: 'Four levels, and when each is justified',
      headers: ['level', 'what exists', 'justified when'],
      values: [
        ['manual', 'notebook, hand-run, file copied to the server', 'a one-off analysis'],
        ['scripted', 'package, tests, scheduled job, versioned model', 'a model someone depends on'],
        ['pipeline', 'orchestrated retraining, gates, registry', 'monthly updates, several owners'],
        ['platform', 'shared features, serving, monitoring for many models', 'many teams, many models'],
      ],
    },
    {
      id: 'weigh',
      label: 'Weighing a step up',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-change', label: 'Change rate', sub: 'how often it retrains', pattern: 'network', icon: 'repeat' },
        { id: 'w-cost', label: 'Failure cost', sub: 'what a bad model breaks', pattern: 'warn', icon: 'zap' },
        { id: 'w-team', label: 'Team and owners', sub: 'who runs it at 3 am', pattern: 'user', icon: 'building' },
        { id: 'w-burden', label: 'Upkeep', sub: 'every tool is a system', pattern: 'warn', icon: 'layers' },
      ],
    },
    {
      id: 'choice',
      kind: 'table',
      label: 'This retailer, today',
      headers: ['system', 'level', 'because'],
      values: [
        ['checkout predictor', 'scripted → pipeline', 'in every checkout; monthly retrains'],
        ['daily planning job', 'scripted', 'one nightly job; one owner'],
      ],
    },
  ],
  edges: [
    { source: 'levels', target: 'weigh', label: 'choose by' },
    { source: 'weigh', target: 'choice' },
  ],
}
