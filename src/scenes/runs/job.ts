import type { Scene } from '@graphlearning/flow'

// §4 — the training job as a contract: what it reads, what it writes, and when its output counts.
export const job: Scene = {
  id: 'job',
  title: 'Training job contract',
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: 'Inputs are read-only; outputs are published last',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'j-in', label: 'Read manifests', sub: 'snapshot, split, config', pattern: 'storage', icon: 'database' },
        { id: 'j-train', label: 'Train', sub: 'into a staging path', pattern: 'service', icon: 'cpu' },
        { id: 'j-eval', label: 'Evaluate', sub: 'report next to model', pattern: 'network', icon: 'barchart' },
        { id: 'j-check', label: 'Self-check', sub: 'files, schema, hash', pattern: 'warn', icon: 'circlecheck' },
        { id: 'j-pub', label: 'Publish', sub: 'one atomic step', pattern: 'external', icon: 'share' },
        { id: 'j-done', label: 'Exit 0', sub: 'only after publish', pattern: 'user', icon: 'star' },
      ],
    },
    {
      id: 'spec',
      kind: 'code',
      filename: 'jobs/train_late_risk.yaml',
      label: `inputs:
  snapshot: orders_snapshot@v3/2026-03-01T01:00Z    # read-only
  split:    manifests/split_2026-03-01.yaml
  config:   configs/late_risk.yaml
outputs:
  staging:  s3://models/staging/{run_id}/            # never read by anyone else
  publish:  s3://models/candidates/{run_id}/         # written by one rename, last
  contents: [model.skops, signature.json, eval_report.json, run.yaml, SHA256SUMS]
resources: {cpu: 8, memory: 16Gi, timeout: 2h}`,
    },
  ],
  edges: [{ source: 'flow', target: 'spec', label: 'as a job spec' }],
}
