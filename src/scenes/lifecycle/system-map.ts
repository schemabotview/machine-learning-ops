import type { Scene } from '@graphlearning/flow'

// §1 — both systems, their shared dependencies, and who owns each part.
const part = (id: string, label: string, sub: string, pattern: 'service' | 'network' | 'storage' | 'external' | 'user' | 'warn', icon: string) => ({ id, label, sub, pattern, icon })

export const systemMap: Scene = {
  id: 'system-map',
  title: 'System, dependency and ownership map',
  flow: 'TB',
  nodes: [
    {
      id: 'map',
      label: 'Two systems, one platform',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'online',
          label: 'Checkout predictor',
          pattern: 'group',
          flow: 'TB',
          children: [
            part('o-api', 'Checkout API', 'checkout team', 'user', 'globe'),
            part('o-serve', 'late-risk@14', 'ML team', 'network', 'cpu'),
            part('o-feat', 'Online features', 'data platform', 'storage', 'database'),
          ],
          edges: [{ source: 'o-api', target: 'o-serve' }, { source: 'o-serve', target: 'o-feat' }],
        },
        {
          id: 'shared',
          label: 'Shared',
          pattern: 'group',
          flow: 'TB',
          children: [
            part('s-reg', 'Model registry', 'ML platform', 'external', 'package'),
            part('s-pipe', 'Retrain pipeline', 'ML team', 'service', 'repeat'),
            part('s-scan', 'Carrier scans', 'carrier + data eng', 'external', 'clock'),
          ],
          edges: [{ source: 's-scan', target: 's-pipe' }, { source: 's-pipe', target: 's-reg' }],
        },
        {
          id: 'batch',
          label: 'Daily planning job',
          pattern: 'group',
          flow: 'TB',
          children: [
            part('b-snap', '01:00 snapshot', 'data eng', 'storage', 'calendar'),
            part('b-score', 'duration@9', 'ML team', 'network', 'cpu'),
            part('b-route', 'Routing', 'logistics', 'user', 'share'),
          ],
          edges: [{ source: 'b-snap', target: 'b-score' }, { source: 'b-score', target: 'b-route' }],
        },
      ],
    },
    {
      id: 'contracts',
      kind: 'table',
      label: 'Each arrow is a contract with an owner',
      headers: ['contract', 'between', 'defined in'],
      values: [
        ['request / response, p99 ≤ 150 ms', 'checkout ↔ predictor', 'ch 1, ch 7'],
        ['feature freshness ≤ 15 min', 'predictor ↔ feature store', 'ch 2'],
        ['scores by 05:00, all zones', 'planning job ↔ routing', 'ch 7'],
        ['scan feed with UTC offsets', 'carrier ↔ data engineering', 'ch 11 action'],
      ],
    },
  ],
  edges: [{ source: 'map', target: 'contracts', label: 'held together by' }],
}
