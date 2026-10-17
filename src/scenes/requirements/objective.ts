import type { Scene } from '@graphlearning/flow'

// §1 — prediction → action → outcome → objective, for the retailer's two systems, and the four
// kinds of claim a team can make about them.
const chain = (id: string, label: string, steps: [string, string, string][]) => ({
  id,
  label,
  pattern: 'group' as const,
  flow: 'TB' as const,
  children: steps.map(([k, l, s], i) => ({ id: `${id}-${k}`, label: l, sub: s, pattern: (['network', 'service', 'storage', 'warn'] as const)[i], icon: ['sigma', 'zap', 'clock', 'star'][i] })),
  edges: steps.slice(1).map(([k], i) => ({ source: `${id}-${steps[i][0]}`, target: `${id}-${k}` })),
})

export const objective: Scene = {
  id: 'objective',
  title: 'Prediction, action, outcome, objective',
  flow: 'TB',
  nodes: [
    {
      id: 'systems',
      label: 'Two systems, two chains',
      pattern: 'group',
      cols: 2,
      children: [
        chain('co', 'Checkout predictor · per request', [
          ['pred', 'Prediction', 'P(late) = 0.31'],
          ['act', 'Action', 'show a wider window'],
          ['out', 'Outcome', 'on time? days later'],
          ['obj', 'Objective', 'fewer broken promises'],
        ]),
        chain('pl', 'Daily planning job · per night', [
          ['pred', 'Prediction', 'durations, tomorrow'],
          ['act', 'Action', 'assign drivers'],
          ['out', 'Outcome', 'routes completed'],
          ['obj', 'Objective', 'cost per delivery'],
        ]),
      ],
    },
    {
      id: 'claims',
      kind: 'table',
      label: 'Four different claims, four kinds of evidence',
      headers: ['claim', 'evidence that supports it', 'does not show'],
      values: [
        ['software is correct', 'tests, type checks, contract tests', 'that predictions are good'],
        ['model quality', 'validation and test metrics', 'that the action helps'],
        ['business utility', 'a controlled experiment on the objective', 'that the system is healthy'],
        ['operational health', 'latency, errors, freshness', 'that predictions are right'],
      ],
    },
  ],
  edges: [{ source: 'systems', target: 'claims', label: 'what can be claimed' }],
}
