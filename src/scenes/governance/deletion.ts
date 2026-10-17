import type { Scene } from '@graphlearning/flow'

// §4 — a deletion request traced through lineage. Deleting the rows does not delete their influence
// on models already trained.
export const deletion: Scene = {
  id: 'deletion',
  title: 'Deletion lineage and unlearning limits',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: 'Customer h:9c2e… asks to be deleted, 12 May',
      headers: ['where', 'found by', 'action', 'done'],
      values: [
        ['orders warehouse', 'customer key', 'delete 14 orders', '12 May'],
        ['online feature store', 'customer key', 'delete customer_late_rate row', '12 May'],
        ['prediction logs', 'hashed key', 'delete 31 events', '13 May'],
        ['training snapshots', 'lineage: 3 snapshots', 'rewrite without them', '20 May'],
        ['models v12, v14', 'lineage: trained on those snapshots', 'influence remains', 'next retrain'],
      ],
    },
    {
      id: 'options',
      label: 'For the models already trained',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'o-retrain', label: 'Retrain', sub: 'without the rows: June', pattern: 'service', icon: 'repeat' },
        { id: 'o-unlearn', label: '"Unlearning"', sub: 'approximate, specialist', pattern: 'warn', icon: 'scissors' },
        { id: 'o-record', label: 'Record it', sub: 'which models, until when', pattern: 'network', icon: 'pencil' },
      ],
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'lineage/find_customer.sql',
      label: `SELECT s.snapshot_id, m.model_version
FROM snapshot_members s
JOIN model_lineage m ON m.snapshot_id = s.snapshot_id
WHERE s.customer_key = 'h:9c2e…'           -- 3 snapshots, 2 live models
  AND m.status IN ('champion', 'rollback')`,
    },
  ],
  edges: [
    { source: 'trace', target: 'options', label: 'and the models' },
    { source: 'options', target: 'query', label: 'found with' },
  ],
}
