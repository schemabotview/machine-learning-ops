import type { Scene } from '@graphlearning/flow'

// §8 — the release record, the abort criteria decided before starting, and retiring a version.
export const audit: Scene = {
  id: 'audit',
  title: 'Audit records, abort criteria, retirement',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'code',
      filename: 'releases/late-risk-14.yaml',
      label: `release: late-risk@14 with serve-late-risk@sha256:91c0…
gate_report: gates/late-risk-14.json      # verdict: pass
approved_by: m.okafor  at 2026-04-03T09:12Z
rollout: {pattern: canary, unit: customer_id, share: 5%, window: 48h}
abort_if: [error_rate > 0.5%, p99_ms > 150, fallback_rate > 2x_stable]
rollback_to: late-risk@12 + checkout_features@5 + config@41
events:
  - {at: 2026-04-03T09:30Z, canary: 5%}
  - {at: 2026-04-05T09:30Z, full: 100%, guardrails: held}`,
    },
    {
      id: 'retire',
      kind: 'table',
      label: 'Retiring v12, after v14 has been stable for 30 days',
      headers: ['step', 'check first'],
      values: [
        ['remove the rollback alias', 'no rollback planned in the next window'],
        ['stop materialising features@5', 'no live model reads it'],
        ['archive the bundle', 'retention period from chapter 5'],
        ['close the release record', 'retired-at and by whom'],
      ],
    },
  ],
  edges: [{ source: 'record', target: 'retire', label: 'and eventually' }],
}
