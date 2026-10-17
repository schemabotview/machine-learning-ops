import type { Scene, PlotPoint } from '@graphlearning/flow'
import { trials, bestSoFar, minutesPerTrial, workers, wallHours } from './numbers'

// §5 — a bounded random search: 40 trials of 6 minutes on 4 workers, best validation log loss so
// far. COMPUTED from seeded trials.
const pts = (ys: number[]): PlotPoint[] => ys.map((y, i) => [i + 1, y])
const bestAt = bestSoFar.indexOf(bestSoFar[bestSoFar.length - 1]) + 1

export const budget: Scene = {
  id: 'budget',
  title: 'Resources and bounded trial budgets',
  flow: 'TB',
  nodes: [
    {
      id: 'search',
      kind: 'plot',
      label: '40 trials, validation log loss · validation evidence',
      sub: `best ${bestSoFar[39].toFixed(4)}, found at trial ${bestAt} · ${minutesPerTrial} min per trial, ${workers} workers`,
      plot: {
        x: { min: 0, max: 40, step: 5, label: 'trial' },
        y: { min: 0.385, max: 0.44, step: 0.01, label: 'val log loss' },
        axes: 'corner',
        series: [
          { kind: 'scatter', points: pts(trials), color: '#6b7280', size: 4, label: 'each trial', labelAt: [26, 0.432] },
          { kind: 'line', points: pts(bestSoFar), color: 'service', label: 'best so far', labelAt: [26, 0.389] },
        ],
      },
    },
    {
      id: 'estimate',
      kind: 'table',
      label: 'The budget, estimated before running',
      headers: ['trials', 'CPU time', 'wall time (4 workers)', 'best so far'],
      values: [5, 10, 20, 40].map((k) => [String(k), `${(k * minutesPerTrial) / 60} h`, `${wallHours(k).toFixed(1)} h`, bestSoFar[k - 1].toFixed(4)]),
    },
  ],
  edges: [{ source: 'search', target: 'estimate', label: 'what each budget buys' }],
}
