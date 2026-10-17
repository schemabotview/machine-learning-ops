import type { Scene, PlotPoint } from '@graphlearning/flow'
import { rng, percentile } from '../points'

// §3 — one week of checkout-predictor latencies (seeded, illustrative), its percentiles against the
// contract, and the error budget a 99.9% availability target leaves. COMPUTED.
const r = rng(31)
export const lat = Array.from({ length: 2000 }, () => {
  const base = 38 + (r() + r() + r() - 1.5) * 18
  return Math.round(r() < 0.02 ? base + 90 + r() * 120 : base) // a slow tail: cold feature-cache reads
})
export const meanMs = lat.reduce((a, b) => a + b, 0) / lat.length
export const p50 = percentile(lat, 50), p95 = percentile(lat, 95), p99 = percentile(lat, 99)
export const budgetMin = (target: number, days = 30) => (1 - target) * days * 24 * 60
const bins = Array.from({ length: 28 }, (_, i) => i * 10)
const hist: PlotPoint[] = bins.map((b) => [b + 5, lat.filter((v) => v >= b && v < b + 10).length / lat.length])

export const contracts: Scene = {
  id: 'contracts',
  title: 'Quality, latency, freshness, availability, cost',
  flow: 'TB',
  nodes: [
    {
      id: 'latency',
      kind: 'plot',
      label: '2,000 checkout requests, one week · production observation',
      sub: `mean ${meanMs.toFixed(1)} ms · p50 ${p50} ms · p95 ${p95} ms · p99 ${p99} ms · contract p99 ≤ 150 ms`,
      plot: {
        x: { min: 0, max: 280, step: 40, label: 'latency (ms)' },
        y: { min: 0, max: 0.45, step: 0.15, label: 'share of requests' },
        axes: 'corner',
        series: [
          { kind: 'area', points: hist, color: 'service' },
          { kind: 'segment', from: [p99, 0], to: [p99, 0.36], color: 'warn', dashed: true, label: `p99 = ${p99} ms`, labelAt: [p99 + 6, 0.38] },
          { kind: 'segment', from: [150, 0], to: [150, 0.36], color: '#e5e7eb', dashed: true, label: 'contract 150 ms', labelAt: [156, 0.3] },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'The checkout predictor\'s contract',
      headers: ['dimension', 'target', 'how it is measured'],
      values: [
        ['quality', 'late-risk log loss ≤ 0.40', 'matured labels, weekly'],
        ['latency', 'p99 ≤ 150 ms', `per request; now ${p99} ms`],
        ['freshness', 'features ≤ 15 min old', 'feature timestamp at request'],
        ['availability', '99.9% / 30 days', `budget ${budgetMin(0.999).toFixed(1)} min of failure`],
        ['cost', '≤ £0.20 per 1,000 calls', 'compute bill / request count'],
      ],
    },
  ],
  edges: [{ source: 'latency', target: 'table', label: 'one row of five' }],
}
