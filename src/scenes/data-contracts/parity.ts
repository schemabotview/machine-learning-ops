import type { Scene, PlotPoint } from '@graphlearning/flow'
import { rng } from '../points'

// §6 — offline/online parity for zone_delay_3h on 400 logged checkout requests. The online store is
// materialised every 15 minutes, so a request reads the value from the last refresh; the offline
// as-of join recomputes it at the request time. A zone's value drifts slowly and sometimes jumps.
// COMPUTED from a seeded simulation.
const r = rng(26)
const refresh = 15
export const reqs = Array.from({ length: 400 }, () => {
  const minute = Math.floor(r() * 600)
  const sinceRefresh = minute % refresh
  const level = 20 + r() * 40
  const drift = (r() - 0.5) * 0.6 * sinceRefresh // slow change since the refresh
  const jump = r() < 0.06 ? 25 + r() * 30 : 0 // a burst of late deliveries since the refresh
  return { offline: level + drift + jump, online: level, sinceRefresh }
})
export const tol = 2 // minutes
export const parity = reqs.filter((q) => Math.abs(q.offline - q.online) <= tol).length / reqs.length
export const bigGaps = reqs.filter((q) => Math.abs(q.offline - q.online) > 10).length
const pts = (f: (q: (typeof reqs)[number]) => boolean): PlotPoint[] => reqs.filter(f).map((q) => [q.online, q.offline])

export const parityScene: Scene = {
  id: 'parity',
  title: 'Offline/online parity and freshness',
  flow: 'TB',
  nodes: [
    {
      id: 'scatter',
      kind: 'plot',
      label: '400 logged requests: served value against offline recompute',
      sub: `within ±${tol} min: ${(parity * 100).toFixed(1)}% · gaps over 10 min: ${bigGaps}`,
      plot: {
        x: { min: 0, max: 180, step: 20, label: 'online value served (min)' },
        y: { min: 0, max: 120, step: 20, label: 'offline as-of value (min)' },
        axes: 'corner',
        equal: true,
        series: [
          { kind: 'scatter', points: pts((q) => Math.abs(q.offline - q.online) <= tol), color: 'service', size: 3, label: 'agree', labelAt: [80, 40] },
          { kind: 'scatter', points: pts((q) => Math.abs(q.offline - q.online) > tol), color: 'warn', size: 4, label: 'differ: changed since refresh', labelAt: [4, 112] },
          { kind: 'segment', from: [0, 0], to: [120, 120], color: '#4b5563', dashed: true },
        ],
      },
    },
    {
      id: 'policy',
      label: 'What parity depends on',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-code', label: 'Same code', sub: 'one feature definition', pattern: 'service', icon: 'copy' },
        { id: 'p-fresh', label: 'Refresh rate', sub: 'every 15 min here', pattern: 'warn', icon: 'clock' },
        { id: 'p-log', label: 'Log served values', sub: 'with request time', pattern: 'network', icon: 'database' },
        { id: 'p-train', label: 'Train on served?', sub: 'or on recomputed', pattern: 'user', icon: 'scale' },
      ],
    },
  ],
  edges: [{ source: 'scatter', target: 'policy', label: 'why they differ' }],
}
