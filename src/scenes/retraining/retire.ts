import type { Scene } from '@graphlearning/flow'

// §8 — not updating, and retiring, are decisions with their own evidence and cleanup.
export const retire: Scene = {
  id: 'retire',
  title: 'No-update and retirement choices',
  flow: 'TB',
  nodes: [
    {
      id: 'choices',
      kind: 'table',
      label: 'Four outcomes of a maintenance review',
      headers: ['decision', 'when', 'example'],
      values: [
        ['update', 'a candidate passes every gate', 'April: v14'],
        ['wait', 'inconclusive, or labels too few', 'May: keep v14, gather a month'],
        ['no change', 'the shift is harmless', 'December parcels'],
        ['retire', 'the decision no longer needs a model', 'a carrier now gives windows itself'],
      ],
    },
    {
      id: 'cleanup',
      label: 'Retiring the late-risk model',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-callers', label: 'Callers moved', sub: 'checkout uses carrier', pattern: 'user', icon: 'globe' },
        { id: 'c-feat', label: 'Features', sub: 'stop if no reader', pattern: 'network', icon: 'boxes' },
        { id: 'c-sched', label: 'Schedules off', sub: 'retrain, monitoring', pattern: 'service', icon: 'calendar' },
        { id: 'c-data', label: 'Data retention', sub: 'logs, snapshots expire', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [{ source: 'choices', target: 'cleanup', label: 'and if retired' }],
}
