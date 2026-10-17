import type { Scene } from '@graphlearning/flow'

// §1 — three layers of verification, each answering a different question with a different kind of
// result.
export const layers: Scene = {
  id: 'layers',
  title: 'Software contracts versus statistical evaluation',
  flow: 'TB',
  nodes: [
    {
      id: 'stack',
      label: 'Three layers, checked in order',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-soft', label: 'Software', sub: 'does it run correctly?', pattern: 'service', icon: 'circlecheck' },
        { id: 'l-data', label: 'Data', sub: 'is the input valid?', pattern: 'storage', icon: 'database' },
        { id: 'l-model', label: 'Model', sub: 'is it good enough?', pattern: 'network', icon: 'barchart' },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'What each layer produces',
      headers: ['layer', 'example check', 'result', 'repeat it and'],
      values: [
        ['software', 'predict() returns 0 ≤ risk ≤ 1', 'pass / fail', 'the same answer'],
        ['software', 'bundle loads in the serving image', 'pass / fail', 'the same answer'],
        ['data', 'test set meets contract v3', 'pass / fail', 'the same answer'],
        ['model', 'log loss vs champion', 'an estimate ± interval', 'a slightly different number'],
        ['model', 'late recall, rural zones', 'an estimate ± interval', 'a different number'],
      ],
    },
    {
      id: 'note',
      label: 'So the gate needs both',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-det', label: 'Deterministic', sub: 'any failure blocks', pattern: 'warn', icon: 'lock' },
        { id: 'n-stat', label: 'Statistical', sub: 'margin and uncertainty', pattern: 'network', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'stack', target: 'table', label: 'each produces' },
    { source: 'table', target: 'note' },
  ],
}
