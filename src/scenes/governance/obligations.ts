import type { Scene } from '@graphlearning/flow'

// §8 — kinds of external obligation, what the team can prepare, and where specialist review takes
// over. Orientation only; not legal advice for any jurisdiction.
export const obligations: Scene = {
  id: 'obligations',
  title: 'Obligation boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Kinds of obligation, and who decides',
      headers: ['area', 'question it raises', 'team prepares', 'decided by'],
      values: [
        ['data protection', 'lawful basis, access and deletion rights', 'inventory, lineage, deletion trace', 'privacy / legal'],
        ['automated decisions', 'does a model decide something significant?', 'intended use, human override', 'legal'],
        ['consumer law', 'is the delivery promise fair and accurate?', 'calibration, broken-promise rate', 'legal / product'],
        ['sector or AI rules', 'does a specific regime apply here?', 'risk record, documentation', 'legal / compliance'],
      ],
    },
    {
      id: 'boundary',
      label: 'The boundary',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-evidence', label: 'Team: evidence', sub: 'accurate, current', pattern: 'service', icon: 'barchart' },
        { id: 'b-judge', label: 'Specialists: judgement', sub: 'per jurisdiction', pattern: 'network', icon: 'scale' },
        { id: 'b-change', label: 'On change', sub: 'new use → review again', pattern: 'warn', icon: 'repeat' },
      ],
    },
    {
      id: 'triggers',
      label: 'Each of these needs a new review',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-use', label: 'A new use', sub: 'risk feeds pricing', pattern: 'warn', icon: 'scale' },
        { id: 't-market', label: 'A new market', sub: 'another country', pattern: 'warn', icon: 'globe' },
        { id: 't-data', label: 'A new data source', sub: 'support transcripts', pattern: 'warn', icon: 'database' },
        { id: 't-auto', label: 'Less human review', sub: 'overrides removed', pattern: 'warn', icon: 'user' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'boundary', label: 'so' },
    { source: 'boundary', target: 'triggers', label: 'review again on' },
  ],
}
