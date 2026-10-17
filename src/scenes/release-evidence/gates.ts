import type { Scene } from '@graphlearning/flow'
import { ciLo, ciHi, liteLo, liteHi, margin } from './numbers'

// §4 — the gate policy and its verdicts. The quality interval rule uses the COMPUTED bootstrap
// intervals; any failed hard criterion blocks regardless.
const iv = (a: number, b: number) => `[${a.toFixed(4)}, ${b.toFixed(4)}]`
const quality = (lo: number, hi: number) => (hi <= margin ? 'pass' : lo > 0 ? 'fail' : 'inconclusive')

export const gates: Scene = {
  id: 'gates',
  title: 'Pass, fail, inconclusive',
  flow: 'TB',
  nodes: [
    {
      id: 'verdicts',
      kind: 'table',
      label: `Quality rule: pass if the whole 95% interval is ≤ ${margin}`,
      headers: ['candidate', 'Δ log loss interval', 'quality', 'hard criteria', 'verdict'],
      values: [
        ['v13', iv(ciLo, ciHi), quality(ciLo, ciHi), 'p99, rural recall fail', 'fail'],
        ['v13-lite', iv(liteLo, liteHi), quality(liteLo, liteHi), 'all pass', 'inconclusive'],
      ],
    },
    {
      id: 'meaning',
      label: 'What each verdict leads to',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-pass', label: 'Pass', sub: 'eligible for rollout', pattern: 'service', icon: 'circlecheck' },
        { id: 'm-fail', label: 'Fail', sub: 'blocked, with reasons', pattern: 'warn', icon: 'ban' },
        { id: 'm-inc', label: 'Inconclusive', sub: 'more data or a test', pattern: 'network', icon: 'clock' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'gates/late_risk.yaml',
      label: `hard:                                  # any failure blocks
  - {metric: p99_latency_ms,     max: 150}
  - {metric: rural_late_recall,  min: 0.70}
  - {metric: ece,                max: 0.03}
quality:
  metric: log_loss_delta_vs_champion
  pass_if: "ci95_upper <= -0.002"
  fail_if: "ci95_lower > 0"
  otherwise: inconclusive               # never silently "pass"`,
    },
  ],
  edges: [
    { source: 'verdicts', target: 'meaning', label: 'leads to' },
    { source: 'meaning', target: 'code', label: 'declared in advance' },
  ],
}
