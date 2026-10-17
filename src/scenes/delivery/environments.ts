import type { Scene } from '@graphlearning/flow'

// §3 — three environments, what separates them, and the evidence each promotion needs.
export const environments: Scene = {
  id: 'environments',
  title: 'Environment separation and promotion evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'envs',
      kind: 'table',
      label: 'Three environments',
      headers: ['', 'development', 'staging', 'production'],
      values: [
        ['data', 'synthetic, 1% sample', 'masked copy of production', 'real orders'],
        ['credentials', 'developer', 'staging service identity', 'production identity only'],
        ['who deploys', 'anyone', 'CI', 'CD, after approval'],
        ['dependencies', 'mocked', 'staging feature store', 'production feature store'],
      ],
    },
    {
      id: 'evidence',
      kind: 'table',
      label: 'Evidence required to promote',
      headers: ['promotion', 'needs'],
      values: [
        ['dev → staging', 'tests pass; image built; bundle signature valid'],
        ['staging → production', 'loads with staging features; load test p99 ≤ 150 ms; gate verdict pass'],
        ['production canary → 100%', 'guardrails held for the full canary window'],
      ],
    },
    {
      id: 'never',
      label: 'Separation rules',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-cred', label: 'No shared creds', sub: 'staging ≠ production', pattern: 'warn', icon: 'lock' },
        { id: 'n-data', label: 'No raw PII', sub: 'outside production', pattern: 'warn', icon: 'ban' },
        { id: 'n-same', label: 'Same artefact', sub: 'all the way up', pattern: 'service', icon: 'package' },
      ],
    },
  ],
  edges: [
    { source: 'envs', target: 'evidence', label: 'moving up needs' },
    { source: 'evidence', target: 'never' },
  ],
}
