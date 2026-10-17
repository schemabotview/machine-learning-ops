import type { Scene } from '@graphlearning/flow'

// §4 — three ways to run the serving layer, compared by what the team must own.
export const platforms: Scene = {
  id: 'platforms',
  title: 'Managed or owned platforms',
  flow: 'TB',
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'Three ways to serve the checkout predictor',
      headers: ['', 'managed endpoint', 'own cluster', 'serverless function'],
      values: [
        ['team owns', 'the model and config', 'nodes, scaling, upgrades too', 'the code'],
        ['cold start', 'none if min replicas set', 'pod start, 14 s', 'per instance, seconds'],
        ['isolation', 'per endpoint', 'namespaces, policies', 'per invocation'],
        ['fits when', 'a small team, few models', 'many models, a platform team', 'spiky, latency-tolerant'],
        ['this retailer', 'chosen today', 'if models multiply', 'not for checkout p99'],
      ],
    },
    {
      id: 'ask',
      label: 'Questions before choosing',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'q-who', label: 'Who runs it?', sub: 'at 3 a.m., by name', pattern: 'user', icon: 'user' },
        { id: 'q-lock', label: 'How hard to leave?', sub: 'bundle stays portable', pattern: 'warn', icon: 'lock' },
        { id: 'q-meet', label: 'Meets the contract?', sub: 'p99, isolation, cost', pattern: 'service', icon: 'circlecheck' },
        { id: 'q-many', label: 'How many models?', sub: 'now and next year', pattern: 'network', icon: 'layers' },
      ],
    },
    {
      id: 'choice',
      label: 'Chosen today',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ch-managed', label: 'Managed endpoint', sub: 'min 2 replicas, 2 zones', pattern: 'service', icon: 'circlecheck' },
        { id: 'ch-review', label: 'Review again', sub: 'at five models', pattern: 'network', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'options', target: 'ask', label: 'decided by' },
    { source: 'ask', target: 'choice', label: 'so' },
  ],
}
