import type { Scene } from '@graphlearning/flow'

// §4 — four rollout patterns and the evidence each one supplies.
export const rolloutPatterns: Scene = {
  id: 'rollout-patterns',
  title: 'Blue–green, rolling, canary, shadow',
  flow: 'TB',
  nodes: [
    {
      id: 'patterns',
      label: 'Four ways to change what serves',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-bg', label: 'Blue–green', sub: 'switch all, switch back', pattern: 'service', icon: 'swap' },
        { id: 'p-roll', label: 'Rolling', sub: 'replace pods in turn', pattern: 'network', icon: 'repeat' },
        { id: 'p-canary', label: 'Canary', sub: '5% of customers first', pattern: 'warn', icon: 'gauge' },
        { id: 'p-shadow', label: 'Shadow', sub: 'scores, never answers', pattern: 'external', icon: 'copy' },
      ],
    },
    {
      id: 'evidence',
      kind: 'table',
      label: 'What each pattern tells you, and what it costs',
      headers: ['pattern', 'evidence before full traffic', 'exposure if bad', 'cost'],
      values: [
        ['blue–green', 'none on live traffic', 'everyone, until switched back', '2× capacity briefly'],
        ['rolling', 'little: mixed versions', 'a growing share', 'none extra'],
        ['canary', 'live errors, latency, effects on 5%', '5% of customers', 'a split to manage'],
        ['shadow', 'live latency and score differences', 'nobody', 'double compute; no effect data'],
      ],
    },
    {
      id: 'plan',
      label: 'For the checkout predictor, in order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'pl-shadow', label: '1 · Shadow', sub: 'live latency, 24 h', pattern: 'external', icon: 'copy' },
        { id: 'pl-canary', label: '2 · Canary', sub: '5% of customers, 48 h', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'patterns', target: 'evidence', label: 'compared' },
    { source: 'evidence', target: 'plan', label: 'chosen' },
  ],
}
