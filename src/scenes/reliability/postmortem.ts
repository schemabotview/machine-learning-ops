import type { Scene } from '@graphlearning/flow'

// §8 — a blameless postmortem that turns contributing factors into owned, dated changes.
export const postmortem: Scene = {
  id: 'postmortem',
  title: 'Postmortems and improvements',
  flow: 'TB',
  nodes: [
    {
      id: 'factors',
      kind: 'table',
      label: 'INC-0610 · contributing factors',
      headers: ['factor', 'why it mattered'],
      values: [
        ['feed contract had no timezone field', 'the change was valid by schema'],
        ['no rule on zone_delay jumps', 'a +60 min step passed silently'],
        ['quality needs labels: 7 days', 'model metrics could not see it'],
        ['guardrail took 2 days', 'conversion is noisy day to day'],
      ],
    },
    {
      id: 'actions',
      kind: 'table',
      label: 'Actions, each owned and dated',
      headers: ['action', 'type', 'owner', 'due'],
      values: [
        ['timestamps carry an offset in the feed contract', 'prevent', 'data eng', '30 Jun'],
        ['alert on a step > 20 min in zone_delay medians', 'detect', 'ML team', '15 Jun'],
        ['daily score-distribution check vs last week', 'detect', 'ML team', '15 Jun'],
        ['runbook: pin a feature to medians', 'contain', 'on-call', 'done'],
      ],
    },
    {
      id: 'culture',
      label: 'How it is written',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-blame', label: 'Blameless', sub: 'systems, not people', pattern: 'service', icon: 'user' },
        { id: 'c-time', label: 'Timeline first', sub: 'facts, then causes', pattern: 'network', icon: 'clock' },
        { id: 'c-follow', label: 'Followed up', sub: 'actions tracked to done', pattern: 'warn', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'factors', target: 'actions', label: 'become' },
    { source: 'actions', target: 'culture' },
  ],
}
