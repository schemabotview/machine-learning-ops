import type { Scene } from '@graphlearning/flow'

// §7 — the risk record, exceptions with expiry dates, and a quarterly access review (counts COMPUTED).
const grants = [
  ...Array.from({ length: 30 }, () => ({ used: true })),
  ...Array.from({ length: 7 }, () => ({ used: false })),
  ...Array.from({ length: 5 }, () => ({ used: true, broad: true })),
]
const unused = grants.filter((g) => !g.used).length
const broad = grants.filter((g) => 'broad' in g).length

export const review: Scene = {
  id: 'review',
  title: 'Risk review, documentation, exceptions, audits',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'table',
      label: 'Risk record · late-risk model',
      headers: ['item', 'entry'],
      values: [
        ['intended use', 'delivery window at checkout; not pricing, not refusing orders'],
        ['known limits', 'rural recall 0.74; new stations; storm weeks'],
        ['affected people', 'all checkout customers; ops staff who expedite'],
        ['open exception', 'raw zone_delay logs kept 120 d, not 90: expires 30 Jun, owner ML lead'],
        ['next review', 'quarterly, or on any material change'],
      ],
    },
    {
      id: 'audit',
      kind: 'table',
      label: `Q2 access review: ${grants.length} grants`,
      headers: ['finding', 'grants', 'action'],
      values: [
        ['used in the last 90 days, scoped', String(grants.length - unused - broad), 'keep'],
        ['not used in 90 days', String(unused), 'revoke'],
        ['broader than the role needs', String(broad), 'narrow'],
      ],
    },
    {
      id: 'note',
      label: 'What these documents are',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-is', label: 'A record', sub: 'of decisions and limits', pattern: 'service', icon: 'pencil' },
        { id: 'd-not', label: 'Not a certificate', sub: 'of compliance', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'record', target: 'audit', label: 'checked by' },
    { source: 'audit', target: 'note' },
  ],
}
