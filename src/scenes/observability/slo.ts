import type { Scene, PlotPoint } from '@graphlearning/flow'
import { monthly, budget, incidents, spent } from './numbers'

// §1 — April's error budget for the checkout predictor, spent incident by incident. COMPUTED.
const n = (v: number) => v.toLocaleString('en-GB')
const cum: PlotPoint[] = [[0, 0]]
let acc = 0
for (const i of incidents) {
  cum.push([i.day, acc / budget])
  acc += i.bad
  cum.push([i.day, acc / budget])
}
cum.push([30, acc / budget])

export const slo: Scene = {
  id: 'slo',
  title: 'SLIs, SLOs, windows, error budgets',
  flow: 'TB',
  nodes: [
    {
      id: 'burn',
      kind: 'plot',
      label: 'April error budget spent · production observation',
      sub: `SLO 99.9% good requests over 30 days · ${n(monthly)} requests → budget ${n(budget)} bad`,
      plot: {
        x: { min: 0, max: 30, step: 5, label: 'day of month' },
        y: { min: 0, max: 1.2, step: 0.25, label: 'share of budget spent' },
        axes: 'corner',
        series: [
          { kind: 'line', points: cum, color: 'warn', label: `${Math.round((spent / budget) * 100)}% spent by day 23`, labelAt: [23.5, 0.82] },
          { kind: 'segment', from: [0, 1], to: [30, 1], color: '#e5e7eb', dashed: true, label: 'budget', labelAt: [26.5, 1.06] },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Where it went',
      headers: ['day', 'incident', 'bad requests', 'of budget'],
      values: [
        ...incidents.map((i) => [String(i.day), i.what, n(i.bad), `${((100 * i.bad) / budget).toFixed(0)}%`]),
        ['', 'total', n(spent), `${((100 * spent) / budget).toFixed(0)}%`],
      ],
    },
  ],
  edges: [{ source: 'burn', target: 'table', label: 'by incident' }],
}
