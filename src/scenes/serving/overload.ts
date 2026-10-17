import type { Scene, PlotPoint } from '@graphlearning/flow'
import { capacity, wait, svcMs, perReplica } from './numbers'

// §6 — one replica's mean time in system against offered load, W = S / (1 − ρ). COMPUTED.
const pts: PlotPoint[] = Array.from({ length: 60 }, (_, i) => i * 2.2).map((x) => [x, Math.min(wait(x), 400)])

export const overload: Scene = {
  id: 'overload',
  title: 'Concurrency, queues and overload',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: `One replica: ${perReplica} workers × ${svcMs} ms → capacity ${capacity.toFixed(0)} requests/s`,
      sub: `mean time in system: ${wait(40).toFixed(0)} ms at 40 rps · ${wait(100).toFixed(0)} ms at 100 · ${wait(120).toFixed(0)} ms at 120`,
      plot: {
        x: { min: 0, max: 140, step: 20, label: 'offered load (requests/s)' },
        y: { min: 0, max: 400, step: 100, label: 'mean time in system (ms)' },
        axes: 'corner',
        series: [
          { kind: 'line', points: pts, color: 'service' },
          { kind: 'segment', from: [0, 150], to: [140, 150], color: 'warn', dashed: true, label: 'contract 150 ms', labelAt: [4, 165] },
          { kind: 'segment', from: [capacity * 0.7, 0], to: [capacity * 0.7, 380], color: '#e5e7eb', dashed: true, label: 'shed above 70%', labelAt: [capacity * 0.7 - 30, 390] },
        ],
      },
    },
    {
      id: 'policy',
      label: 'Staying left of the knee',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-bound', label: 'Bounded queue', sub: 'reject, never wait forever', pattern: 'warn', icon: 'ban' },
        { id: 'o-shed', label: 'Shed early', sub: '429 → fallback window', pattern: 'service', icon: 'scissors' },
        { id: 'o-scale', label: 'Scale on load', sub: 'target 50% utilisation', pattern: 'network', icon: 'layers' },
        { id: 'o-batch', label: 'Micro-batching', sub: 'for GPU models only', pattern: 'external', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ source: 'curve', target: 'policy', label: 'so' }],
}
