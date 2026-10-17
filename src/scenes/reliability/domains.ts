import type { Scene } from '@graphlearning/flow'

// §2 — failure domains, what each takes down, and the degradation order when capacity runs short.
export const domains: Scene = {
  id: 'domains',
  title: 'Cold starts, failure domains, degradation',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Failure domains for the checkout predictor',
      headers: ['domain', 'if it fails', 'mitigation'],
      values: [
        ['one pod', '1 of 4 replicas', 'readiness removes it; restart'],
        ['one node', 'pods on it', 'spread pods across nodes'],
        ['one zone', 'half the fleet', 'zone-safe sizing (§ 1)'],
        ['feature store', 'every prediction', 'fallback window, labelled'],
        ['model registry', 'new pods cannot load', 'cache the bundle; pods keep serving'],
      ],
    },
    {
      id: 'scale',
      kind: 'table',
      label: 'A surge from 40 to 120 rps in two minutes',
      headers: ['t', 'event'],
      values: [
        ['0 s', 'load rises; queue grows on 4 replicas'],
        ['30 s', 'autoscaler asks for 4 more'],
        ['30–120 s', 'new nodes provision (90 s), pods start (14 s)'],
        ['until then', 'shed above 70%: fallback window for the excess'],
      ],
    },
    {
      id: 'degrade',
      label: 'Degrade in this order',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-1', label: '1 · Skip extras', sub: 'customer features', pattern: 'service', icon: 'scissors' },
        { id: 'd-2', label: '2 · Shed excess', sub: '429 → rule window', pattern: 'warn', icon: 'ban' },
        { id: 'd-3', label: '3 · All rules', sub: 'checkout still works', pattern: 'user', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'scale', label: 'and under load' },
    { source: 'scale', target: 'degrade' },
  ],
}
