import type { Scene } from '@graphlearning/flow'

// §1 — the five identities that together name a training run, and the manifest that records them.
export const identity: Scene = {
  id: 'run-identity',
  title: 'Run identity',
  flow: 'TB',
  nodes: [
    {
      id: 'parts',
      label: 'A run is named by five identities',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'i-code', label: 'Code', sub: 'git commit 7c41e2a', pattern: 'service', icon: 'gitbranch' },
        { id: 'i-data', label: 'Data', sub: 'orders_snapshot@v3', pattern: 'storage', icon: 'database' },
        { id: 'i-feat', label: 'Features', sub: 'feature view v5', pattern: 'network', icon: 'boxes' },
        { id: 'i-conf', label: 'Configuration', sub: 'train.yaml sha', pattern: 'user', icon: 'pencil' },
        { id: 'i-env', label: 'Environment', sub: 'image digest', pattern: 'external', icon: 'package' },
        { id: 'i-split', label: 'Split', sub: 'manifest fingerprint', pattern: 'warn', icon: 'scissors' },
      ],
    },
    {
      id: 'manifest',
      kind: 'code',
      filename: 'runs/2026-03-02T0915_late-risk/run.yaml',
      label: `run_id: late-risk-0302-0915
code:     {repo: delivery-model, commit: 7c41e2a, dirty: false}
data:     {snapshot: orders_snapshot@v3/2026-03-01T01:00Z}
features: {view: checkout_features, version: 5}
split:    {manifest: split_2026-03-01.yaml, fingerprint: cf1d81d1}
config:   {file: train.yaml, sha256: 2b9e…, seed: 17}
env:      {image: registry/train@sha256:e04c…, lock: uv.lock sha256 77fa…}`,
    },
    {
      id: 'gaps',
      kind: 'table',
      label: 'If one is missing',
      headers: ['missing', 'what you lose'],
      values: [
        ['commit, or dirty: true', 'the exact code that ran'],
        ['snapshot id', 'which rows were used'],
        ['image digest', 'library versions that change results'],
      ],
    },
  ],
  edges: [
    { source: 'parts', target: 'manifest', label: 'recorded as' },
    { source: 'manifest', target: 'gaps' },
  ],
}
