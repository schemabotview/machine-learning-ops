import type { Scene } from '@graphlearning/flow'

// §3 — one change, from new data to full traffic, with the evidence produced at each step.
export const walkthrough: Scene = {
  id: 'walkthrough',
  title: 'Pipeline, gate, promotion and serving walkthrough',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'late-risk v14, end to end',
      headers: ['when', 'step', 'evidence produced', 'chapter'],
      values: [
        ['1 Apr 03:00', 'retrain from a matured window', 'run manifest, fingerprints', '3, 4, 9'],
        ['1 Apr 04:10', 'data and evaluation gates', 'gate report: pass', '4, 5'],
        ['1 Apr 04:15', 'register v14', 'immutable version, lineage', '5'],
        ['2 Apr', 'staging: load + load test', 'p99 121 ms; signature valid', '6'],
        ['3 Apr 09:12', 'approval', 'release record', '6, 10'],
        ['3–5 Apr', 'shadow, then 5% canary by customer', 'guardrails held', '6'],
        ['5 Apr 09:30', 'alias → v14; pods reload', 'model_version on responses', '5, 7'],
        ['12 Apr on', 'matured-label quality, drift', 'weekly reports', '8'],
      ],
    },
    {
      id: 'stops',
      label: 'Where it could have stopped',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'st-gate', label: 'A gate', sub: 'fail or inconclusive', pattern: 'warn', icon: 'ban' },
        { id: 'st-stage', label: 'Staging', sub: 'latency or loading', pattern: 'warn', icon: 'gauge' },
        { id: 'st-canary', label: 'The canary', sub: 'a guardrail breached', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'who',
      label: 'Who did what',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-pipe', label: 'Pipeline', sub: 'retrain, gate, register', pattern: 'service', icon: 'cpu' },
        { id: 'w-person', label: 'Approver', sub: 'signed the release', pattern: 'user', icon: 'user' },
        { id: 'w-oncall', label: 'On-call', sub: 'watched the canary', pattern: 'network', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'steps', target: 'stops', label: 'with exits at' },
    { source: 'stops', target: 'who', label: 'carried out by' },
  ],
}
