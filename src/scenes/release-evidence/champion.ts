import type { Scene, PlotPoint } from '@graphlearning/flow'
import { boot, ciLo, ciHi, diffMean, champMean, candMean, margin } from './numbers'

// §2 — candidate v13 against champion v12 on the protected test set: a paired bootstrap of the mean
// log-loss difference. COMPUTED from seeded per-order losses.
const lo = -0.008, hi = 0.002, w = 0.0004
const bins = Array.from({ length: Math.round((hi - lo) / w) }, (_, i) => lo + i * w)
const hist: PlotPoint[] = bins.map((b) => [b + w / 2, boot.filter((v) => v >= b && v < b + w).length / boot.length])

export const champion: Scene = {
  id: 'champion',
  title: 'Champion, baseline, uncertainty',
  flow: 'TB',
  nodes: [
    {
      id: 'boot',
      kind: 'plot',
      label: 'v13 − v12, mean log loss over 2,400 protected test orders',
      sub: `1,000 paired bootstrap resamples · 95% interval ${ciLo.toFixed(4)} to ${ciHi.toFixed(4)}`,
      plot: {
        x: { min: lo, max: hi, step: 0.002, label: 'difference in log loss (negative = v13 better)' },
        y: { min: 0, max: 0.3, step: 0.1, label: 'share of resamples' },
        axes: 'corner',
        series: [
          { kind: 'area', points: hist, color: 'service' },
          { kind: 'segment', from: [margin, 0], to: [margin, 0.26], color: 'warn', dashed: true, label: `margin ${margin}`, labelAt: [margin + 0.0002, 0.27] },
          { kind: 'segment', from: [0, 0], to: [0, 0.26], color: '#e5e7eb', dashed: true, label: 'no change', labelAt: [0.0002, 0.22] },
          { kind: 'segment', from: [ciLo, 0.01], to: [ciHi, 0.01], color: 'network', label: '95% interval', labelAt: [-0.0078, 0.03] },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'The comparison, on one protected set · final-test results',
      headers: ['model', 'role', 'mean log loss'],
      values: [
        ['zone-average baseline', 'floor any model must beat', '0.4410'],
        ['v12', 'champion, now serving', champMean.toFixed(4)],
        ['v13', 'candidate', candMean.toFixed(4)],
        ['v13 − v12', 'paired difference', diffMean.toFixed(4)],
      ],
    },
  ],
  edges: [{ source: 'boot', target: 'table', label: 'from' }],
}
