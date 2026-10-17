import type { Scene } from '@graphlearning/flow'

// §5 — kinds of change, each with a retailer example and what it does to quality; and the choice
// of reference window.
export const change: Scene = {
  id: 'change',
  title: 'Skew, population, label and concept change',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Kinds of change, and whether they hurt',
      headers: ['change', 'example', 'quality affected?'],
      values: [
        ['training–serving skew', 'live distance in metres, trained in km', 'yes, at once'],
        ['population shift', 'December: lighter gift parcels', 'often not'],
        ['label shift', 'storm week: late rate 9% → 22%', 'calibration, yes'],
        ['concept change', 'new carrier: same features, new delays', 'yes, slowly'],
        ['selection change', 'expedited orders now skip the label', 'labels mislead (ch 9)'],
      ],
    },
    {
      id: 'reference',
      label: 'Compared with what?',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ref-train', label: 'Training data', sub: 'old, but what it learned', pattern: 'storage', icon: 'database' },
        { id: 'ref-week', label: 'Last 4 weeks', sub: 'recent, but seasonal', pattern: 'network', icon: 'calendar' },
        { id: 'ref-year', label: 'Same week last year', sub: 'seasonal match', pattern: 'service', icon: 'history' },
      ],
    },
    {
      id: 'which',
      kind: 'table',
      label: 'Which reference for which check',
      headers: ['check', 'reference', 'because'],
      values: [
        ['skew', 'training data', 'the model learned that'],
        ['population shift', 'same week last year', 'seasons repeat'],
        ['label shift', 'last 4 weeks of matured labels', 'recent base rate'],
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'reference', label: 'measured against' },
    { source: 'reference', target: 'which', label: 'chosen per check' },
  ],
}
