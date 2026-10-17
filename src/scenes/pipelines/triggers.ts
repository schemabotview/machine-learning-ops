import type { Scene } from '@graphlearning/flow'
import { fingerprint } from '../runs/numbers'

// §3 — a run's identity comes from the pipeline version and its parameters, not from the trigger
// that started it. Two triggers for the same partition give the same run key (COMPUTED).
const key = (version: string, date: string) => `retrain-v${version}-${date}-${fingerprint([version, date]).slice(0, 6)}`

export const triggers: Scene = {
  id: 'triggers',
  title: 'Parameters, schedules, events, identity',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Ways a run can start',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-cron', label: 'Schedule', sub: '1st of month, 03:00', pattern: 'service', icon: 'calendar' },
        { id: 't-event', label: 'Data event', sub: 'snapshot published', pattern: 'storage', icon: 'database' },
        { id: 't-manual', label: 'Manual', sub: 'with a reason', pattern: 'user', icon: 'pencil' },
      ],
    },
    {
      id: 'keys',
      kind: 'table',
      label: 'Run key = pipeline version + parameters',
      headers: ['trigger', 'pipeline', 'snapshot_date', 'run key', 'result'],
      values: [
        ['schedule, 03:00', '4', '2026-04-01', key('4', '2026-04-01'), 'runs'],
        ['snapshot event, 03:04', '4', '2026-04-01', key('4', '2026-04-01'), 'deduplicated'],
        ['manual rerun', '4', '2026-03-01', key('4', '2026-03-01'), 'runs'],
        ['after a code change', '5', '2026-04-01', key('5', '2026-04-01'), 'runs'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'pipeline/schedule.yaml',
      label: `pipeline: late-risk-retrain@4
parameters: {snapshot_date: "{{ interval_start }}"}   # never "today"
triggers:
  - cron: "0 3 1 * *"
  - on_event: {topic: snapshots.published, filter: {table: orders_snapshot}}
concurrency: {key: "{{ run_key }}", policy: skip_if_running}`,
    },
  ],
  edges: [
    { source: 'kinds', target: 'keys', label: 'all resolve to' },
    { source: 'keys', target: 'code' },
  ],
}
