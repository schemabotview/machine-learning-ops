import type { Scene } from '@graphlearning/flow'

// §4 — log what diagnosis needs and no more; alert only on what someone can act on.
export const privacy: Scene = {
  id: 'privacy',
  title: 'Privacy, retention, actionable alerts',
  flow: 'TB',
  nodes: [
    {
      id: 'logging',
      kind: 'table',
      label: 'What the prediction log keeps',
      headers: ['field', 'kept as', 'for', 'retention'],
      values: [
        ['customer id', 'keyed hash', 'joins, slices', '13 months'],
        ['delivery address', 'not logged: zone only', '—', '—'],
        ['features used', 'values', 'skew, replay', '90 days'],
        ['prediction + version', 'values', 'quality joins', '13 months'],
        ['request body', 'not logged', '—', '—'],
      ],
    },
    {
      id: 'alerts',
      kind: 'table',
      label: 'Alerts, by what happens when they fire',
      headers: ['alert', 'goes to', 'runbook'],
      values: [
        ['p99 > 150 ms for 10 min', 'page: on-call', 'scale, check features'],
        ['fallback > 2% for 15 min', 'page: on-call', 'feature store status'],
        ['PSI > 0.25 on a feature', 'ticket: ML team', 'triage, § 8'],
        ['weekly log loss > 0.40', 'ticket: ML team', 'slice analysis'],
      ],
    },
    {
      id: 'rules',
      label: 'An alert must have',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-owner', label: 'An owner', sub: 'one team, named', pattern: 'user', icon: 'user' },
        { id: 'r-action', label: 'An action', sub: 'a runbook step', pattern: 'service', icon: 'pencil' },
        { id: 'r-urgency', label: 'An urgency', sub: 'page or ticket', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'logging', target: 'alerts', label: 'and alert on' },
    { source: 'alerts', target: 'rules' },
  ],
}
