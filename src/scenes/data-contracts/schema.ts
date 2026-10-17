import type { Scene } from '@graphlearning/flow'

// §1 — the training dataset's contract: what each column is, in which unit, keyed how, from where.
export const schema: Scene = {
  id: 'schema',
  title: 'Schemas, units, keys, snapshots, provenance',
  flow: 'TB',
  nodes: [
    {
      id: 'columns',
      kind: 'table',
      label: 'orders_snapshot · contract v3',
      headers: ['column', 'type', 'unit', 'rule', 'source'],
      values: [
        ['order_id', 'string', '—', 'unique key', 'checkout API'],
        ['checkout_at', 'timestamp', 'UTC', 'not null', 'checkout API'],
        ['zone', 'string', '—', 'in zone list v12', 'geo service'],
        ['distance_km', 'float', 'km', '0 < x ≤ 80', 'geo service'],
        ['weight_kg', 'float', 'kg', '0 < x ≤ 50', 'warehouse'],
        ['late', 'bool', '—', 'set only when matured', 'carrier scans'],
      ],
    },
    {
      id: 'identity',
      label: 'What makes a dataset reproducible',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'i-snap', label: 'Snapshot id', sub: 'as of 2026-03-01 01:00', pattern: 'storage', icon: 'calendar' },
        { id: 'i-key', label: 'Primary key', sub: 'one row per order_id', pattern: 'service', icon: 'key' },
        { id: 'i-unit', label: 'Units', sub: 'stated, not assumed', pattern: 'warn', icon: 'ruler' },
        { id: 'i-prov', label: 'Provenance', sub: 'source and query hash', pattern: 'network', icon: 'gitbranch' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'contracts/orders_snapshot.yaml',
      label: `name: orders_snapshot
version: 3
key: [order_id]
snapshot: {as_of: "2026-03-01T01:00Z", query_sha256: 9f2c…, rows: 52000}
columns:
  distance_km: {type: float, unit: km, min_exclusive: 0, max: 80}
  weight_kg:   {type: float, unit: kg, min_exclusive: 0, max: 50}`,
    },
  ],
  edges: [
    { source: 'columns', target: 'identity', label: 'plus' },
    { source: 'identity', target: 'code', label: 'written down' },
  ],
}
