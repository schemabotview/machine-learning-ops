import type { Scene, PlotPoint } from '@graphlearning/flow'
import { maturedBy } from './numbers'

// §6 — during a canary the labels lag: share of canary orders with a matured late label by day
// after checkout (COMPUTED from a seeded delay distribution), and what can be claimed when.
const pts: PlotPoint[] = Array.from({ length: 41 }, (_, i) => [i / 4, maturedBy(i / 4)])

export const delayed: Scene = {
  id: 'delayed',
  title: 'Delayed outcomes and what can be claimed',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Canary orders with a matured late label',
      sub: `day 2: ${(maturedBy(2) * 100).toFixed(0)}% · day 4: ${(maturedBy(4) * 100).toFixed(0)}% · day 7: ${(maturedBy(7) * 100).toFixed(0)}%`,
      plot: {
        x: { min: 0, max: 10, step: 1, label: 'days after checkout' },
        y: { min: 0, max: 1, step: 0.25, label: 'share matured' },
        axes: 'corner',
        series: [
          { kind: 'line', points: pts, color: 'service' },
          { kind: 'segment', from: [2, 0], to: [2, 0.9], color: 'warn', dashed: true, label: 'canary ends?', labelAt: [2.2, 0.92] },
        ],
      },
    },
    {
      id: 'claims',
      kind: 'table',
      label: 'What the canary supports, by when',
      headers: ['claim', 'evidence', 'available'],
      values: [
        ['v14 runs safely', 'errors, latency, fallbacks', 'within hours'],
        ['v14 scores like offline', 'live vs offline score distribution', 'day 1'],
        ['v14 predicts better live', 'log loss on matured labels', 'day 7 onward'],
        ['v14 improves the product', 'randomised comparison of the objective', 'an experiment (ch 9)'],
        ['shadow v15 is "better"', 'none: no action was taken', 'never, from shadow'],
      ],
    },
  ],
  edges: [{ source: 'curve', target: 'claims', label: 'so' }],
}
