import type { Scene } from '@graphlearning/flow'
import { psiDistance, psiWeight } from './numbers'

// §8 — two alerts in the same month, triaged to two different responses.
export const triage: Scene = {
  id: 'triage',
  title: 'Triage and matched responses',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'Two alerts, read signal by signal',
      headers: ['signal', 'week 15', 'December'],
      values: [
        ['uptime, errors, p99', 'all healthy', 'all healthy'],
        ['drift alert', `distance_km, PSI ${psiDistance.toFixed(2)}`, `weight_kg, PSI ${psiWeight.toFixed(2)}`],
        ['range rule', '30% of distances > 80 km', 'none broken'],
        ['same week last year', 'no such shift', 'the same shift'],
        ['matured log loss', '0.394 → 0.471', 'unchanged'],
        ['diagnosis', 'skew: a source sends metres', 'seasonal population shift'],
        ['response', 'fix source, quarantine, replay', 'note it; no retraining'],
      ],
    },
    {
      id: 'steps',
      label: 'Triage order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-1', label: '1 · Is it real?', sub: 'not a logging change', pattern: 'service', icon: 'search' },
        { id: 's-2', label: '2 · Where from?', sub: 'one source, or everyone', pattern: 'network', icon: 'database' },
        { id: 's-3', label: '3 · Does it hurt?', sub: 'labels, slices, seasons', pattern: 'warn', icon: 'scale' },
        { id: 's-4', label: '4 · Match the fix', sub: 'data, model, or nothing', pattern: 'user', icon: 'pencil' },
      ],
    },
  ],
  edges: [{ source: 'cases', target: 'steps', label: 'by asking' }],
}
