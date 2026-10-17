import type { Scene, PlotPoint } from '@graphlearning/flow'
import { buckets } from './numbers'

// §7 — one week of matured predictions joined to labels: reliability by predicted-risk bucket
// (COMPUTED from seeded outcomes). Only delivered orders get labels.
const pts: PlotPoint[] = buckets.map((b) => [b.p, b.observed])

export const outcomes: Scene = {
  id: 'outcomes',
  title: 'Delayed outcome joins and calibration slices',
  flow: 'TB',
  nodes: [
    {
      id: 'reliability',
      kind: 'plot',
      label: 'Week 14: observed late rate by predicted risk',
      sub: `${buckets.reduce((a, b) => a + b.n, 0).toLocaleString('en-GB')} delivered orders · joined 7 days after checkout`,
      plot: {
        x: { min: 0, max: 1, step: 0.2, label: 'predicted late risk' },
        y: { min: 0, max: 1, step: 0.2, label: 'observed late rate' },
        axes: 'corner',
        equal: true,
        series: [
          { kind: 'segment', from: [0, 0], to: [1, 1], color: '#4b5563', dashed: true, label: 'calibrated', labelAt: [0.72, 0.62] },
          { kind: 'line', points: pts, color: 'service' },
          { kind: 'scatter', points: pts, color: 'service', size: 7 },
          { kind: 'marker', at: pts[5], label: `0.70 → ${buckets[5].observed.toFixed(2)}`, color: 'warn' },
        ],
      },
    },
    {
      id: 'join',
      kind: 'table',
      label: 'What the join can and cannot include',
      headers: ['orders', 'label', 'in the quality metric?'],
      values: [
        ['delivered, matured', 'late or on time', 'yes'],
        ['checked out < 7 days ago', 'not yet', 'later'],
        ['cancelled', 'none', 'no: counted separately'],
        ['expedited by ops', 'changed by the action', 'flagged: biased (ch 9)'],
      ],
    },
  ],
  edges: [{ source: 'reliability', target: 'join', label: 'built from' }],
}
