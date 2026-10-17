import type { Scene, PlotPoint } from '@graphlearning/flow'
import { hourly, avg, peak, surge, perReplicaCap, usable, replicasFor } from './numbers'

// §1 — demand envelope against capacity, from stated assumptions. COMPUTED.
const pts: PlotPoint[] = hourly.flatMap((v, h) => [[h, v], [h + 1, v]] as PlotPoint[])
const normal = replicasFor(peak), sale = replicasFor(peak * surge)

export const capacityScene: Scene = {
  id: 'capacity',
  title: 'Demand, resources and autoscaling',
  flow: 'TB',
  nodes: [
    {
      id: 'day',
      kind: 'plot',
      label: 'Checkout predictor demand by hour · production observation',
      sub: `mean ${avg.toFixed(0)} rps · peak ${peak} rps at 19:00 · one replica runs ${usable.toFixed(0)} rps at 50%`,
      plot: {
        x: { min: 0, max: 24, step: 3, label: 'hour of day' },
        y: { min: 0, max: 140, step: 20, label: 'requests / s' },
        axes: 'corner',
        series: [
          { kind: 'area', points: pts, color: 'service' },
          { kind: 'segment', from: [0, usable], to: [24, usable], color: 'warn', dashed: true, label: '1 replica at 50%', labelAt: [0.5, usable + 5] },
          { kind: 'segment', from: [0, peak * surge], to: [24, peak * surge], color: '#e5e7eb', dashed: true, label: `sale-day peak ×${surge}`, labelAt: [0.5, peak * surge + 5] },
        ],
      },
    },
    {
      id: 'estimate',
      kind: 'table',
      label: 'Replicas, under stated assumptions',
      headers: ['scenario', 'peak rps', 'replicas at 50%', 'survive losing a zone'],
      values: [
        ['normal day', String(peak), String(normal.needed), String(normal.zoneSafe)],
        [`sale day (×${surge}, assumed)`, String(peak * surge), String(sale.needed), String(sale.zoneSafe)],
        ['assumption', `${perReplicaCap.toFixed(0)} rps per replica (ch 7)`, 'target 50%', 'two zones'],
      ],
    },
  ],
  edges: [{ source: 'day', target: 'estimate', label: 'sized from' }],
}
