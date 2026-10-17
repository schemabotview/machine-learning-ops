import type { Scene, PlotPoint } from '@graphlearning/flow'
import { refDist, curDist, psiDistance, psiWeight } from './numbers'

// §6 — PSI for two changes (COMPUTED from seeded samples), against what each did to quality.
// The harmless seasonal shift scores HIGHER than the corrupting unit change.
const bins = Array.from({ length: 20 }, (_, i) => i)
const hist = (xs: number[]): PlotPoint[] => bins.map((b) => [b + 0.5, xs.filter((x) => x >= b && x < b + 1).length / xs.length])
const over80 = curDist.filter((d) => d > 80).length / curDist.length

export const drift: Scene = {
  id: 'drift',
  title: 'Drift statistics and their limits',
  flow: 'TB',
  nodes: [
    {
      id: 'hist',
      kind: 'plot',
      label: 'distance_km, reference vs week 15 · production observation',
      sub: `${(over80 * 100).toFixed(0)}% of week-15 values are > 80 km (off the axis): one source sends metres`,
      plot: {
        x: { min: 0, max: 20, step: 4, label: 'distance_km' },
        y: { min: 0, max: 0.15, step: 0.05, label: 'share of orders' },
        axes: 'corner',
        series: [
          { kind: 'line', points: hist(refDist), color: 'service', label: 'reference', labelAt: [12, 0.12] },
          { kind: 'line', points: hist(curDist), color: 'warn', label: 'week 15', labelAt: [12, 0.06] },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Two changes, measured two ways',
      headers: ['change', 'PSI', 'weekly log loss', 'action'],
      values: [
        ['distance in metres, week 15', psiDistance.toFixed(3), '0.394 → 0.471', 'fix the source, now'],
        ['lighter parcels, December', psiWeight.toFixed(3), '0.394 → 0.396', 'none: expected'],
      ],
    },
  ],
  edges: [{ source: 'hist', target: 'compare', label: 'and the effect' }],
}
