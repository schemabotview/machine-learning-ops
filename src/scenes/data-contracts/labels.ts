import type { Scene } from '@graphlearning/flow'

// §3 — label maturity and missing outcomes at the 1 March snapshot, and the split manifest that
// pins exactly which orders train, validate and test. Shares illustrative; counts COMPUTED.
const total = 52_000
export const outcomes = [
  { status: 'delivered, label set', share: 0.941, use: 'train / evaluate' },
  { status: 'cancelled before dispatch', share: 0.032, use: 'excluded: no delivery' },
  { status: 'lost in transit', share: 0.004, use: 'excluded, reported separately' },
  { status: 'not yet matured', share: 0.023, use: 'excluded until matured' },
]
const n = (v: number) => Math.round(v).toLocaleString('en-GB')

export const labels: Scene = {
  id: 'labels',
  title: 'Label maturity, split manifests, missing outcomes',
  flow: 'TB',
  nodes: [
    {
      id: 'status',
      kind: 'table',
      label: `${n(total)} orders, 1 Jan – 28 Feb · label = late, set promised + 3 days`,
      headers: ['outcome at snapshot', 'orders', 'share', 'use'],
      values: outcomes.map((o) => [o.status, n(o.share * total), `${(o.share * 100).toFixed(1)}%`, o.use]),
    },
    {
      id: 'rules',
      label: 'Rules the manifest records',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-mature', label: 'Maturity', sub: 'promised date + 3 days', pattern: 'service', icon: 'clock' },
        { id: 'r-time', label: 'Split by time', sub: 'test = last 2 weeks', pattern: 'network', icon: 'calendar' },
        { id: 'r-miss', label: 'Missing outcomes', sub: 'excluded, counted', pattern: 'warn', icon: 'ban' },
        { id: 'r-frozen', label: 'Frozen ids', sub: 'not a re-run query', pattern: 'storage', icon: 'lock' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'manifests/split_2026-03-01.yaml',
      label: `snapshot: orders_snapshot@v3/2026-03-01T01:00Z
label: {name: late, matures: promised_at + 3d}
train: {checkout_from: 2026-01-01, checkout_to: 2026-02-07, ids: train_ids.parquet, sha256: 41ab…}
val:   {checkout_from: 2026-02-08, checkout_to: 2026-02-14, ids: val_ids.parquet,   sha256: c07e…}
test:  {checkout_from: 2026-02-15, checkout_to: 2026-02-25, ids: test_ids.parquet,  sha256: 9d13…}
excluded: {cancelled: 1664, lost: 208, immature: 1196}`,
    },
  ],
  edges: [
    { source: 'status', target: 'rules' },
    { source: 'rules', target: 'code', label: 'pinned' },
  ],
}
