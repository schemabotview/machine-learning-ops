import type { Scene } from '@graphlearning/flow'

// §5 — the planning job publishes scores to routing's table. The write succeeds, the step times out
// before acknowledging, and the orchestrator retries. COMPUTED row counts for both write styles.
export const rows = 180_000
const n = (v: number) => v.toLocaleString('en-GB')

export const idempotency: Scene = {
  id: 'idempotency',
  title: 'Retries, idempotency, output commits',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: 'Nightly planning run 2026-04-02 · publish step',
      headers: ['time', 'event', 'rows in routing (append)', 'rows (upsert by key)'],
      values: [
        ['03:41', 'publish starts', '0', '0'],
        ['03:44', `INSERT of ${n(rows)} rows commits`, n(rows), n(rows)],
        ['03:45', 'step times out before ack', n(rows), n(rows)],
        ['03:46', 'orchestrator retries the step', n(2 * rows), n(rows)],
        ['04:10', 'routing plans drivers', `${n(2 * rows)}: every order twice`, `${n(rows)}: correct`],
      ],
    },
    {
      id: 'ideas',
      label: 'At-least-once execution, made safe',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'i-once', label: 'Steps may rerun', sub: 'the engine retries', pattern: 'warn', icon: 'repeat' },
        { id: 'i-key', label: 'Idempotency key', sub: '(run_key, order_id)', pattern: 'service', icon: 'key' },
        { id: 'i-stage', label: 'Stage, then swap', sub: 'one visible commit', pattern: 'network', icon: 'swap' },
        { id: 'i-ext', label: 'External effects', sub: 'need their own dedupe', pattern: 'warn', icon: 'share' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'pipeline/publish.sql',
      label: `MERGE INTO routing.planned_durations t
USING staging.scores_{{ run_key }} s
   ON t.plan_date = s.plan_date AND t.order_id = s.order_id     -- the idempotency key
WHEN MATCHED THEN UPDATE SET duration_p50_h = s.duration_p50_h, run_key = s.run_key
WHEN NOT MATCHED THEN INSERT (plan_date, order_id, duration_p50_h, run_key)
                      VALUES (s.plan_date, s.order_id, s.duration_p50_h, s.run_key);`,
    },
  ],
  edges: [
    { source: 'trace', target: 'ideas', label: 'the fix' },
    { source: 'ideas', target: 'code', label: 'one of them' },
  ],
}
