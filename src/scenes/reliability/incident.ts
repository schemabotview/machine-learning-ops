import type { Scene } from '@graphlearning/flow'

// §6 — a silent quality incident: every operational signal green while predictions were wrong.
export const incident: Scene = {
  id: 'incident',
  title: 'Severity, runbooks, containment, evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'INC-0610 · zone_delay off by one hour · production observation',
      headers: ['time', 'event'],
      values: [
        ['Mon 02:00', 'carrier feed switches delivered_at to local time (+1 h)'],
        ['Mon 02:15', 'zone_delay_3h rises ≈ 60 min everywhere; all services green'],
        ['Mon–Wed', 'risk inflated: wider windows shown to ~40% more customers'],
        ['Wed 10:30', 'conversion guardrail: −1.4% vs last week → ticket'],
        ['Wed 11:10', 'triage: feature shift with no seasonal match → SEV-2'],
        ['Wed 11:25', 'contain: pin zone_delay to Sunday medians (labelled)'],
        ['Wed 14:00', 'fix: convert to UTC at ingest; replay since Monday'],
      ],
    },
    {
      id: 'roles',
      label: 'During the incident',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-lead', label: 'Incident lead', sub: 'decides, communicates', pattern: 'user', icon: 'user' },
        { id: 'r-sev', label: 'Severity', sub: 'SEV-2: customers affected', pattern: 'warn', icon: 'zap' },
        { id: 'r-contain', label: 'Contain first', sub: 'then root cause', pattern: 'service', icon: 'lock' },
        { id: 'r-evid', label: 'Keep evidence', sub: 'logs, snapshots, timeline', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'roles', label: 'run by' }],
}
