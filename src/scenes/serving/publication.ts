import type { Scene } from '@graphlearning/flow'

// §2 — output identity and how it becomes visible; atomicity depends on the storage you write to.
export const publication: Scene = {
  id: 'publication',
  title: 'Output identity and atomic visibility',
  flow: 'TB',
  nodes: [
    {
      id: 'identity',
      label: 'Every output row is identified',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'i-key', label: 'Row key', sub: 'plan_date, order_id', pattern: 'service', icon: 'key' },
        { id: 'i-run', label: 'Run key', sub: 'which night made it', pattern: 'network', icon: 'hash' },
        { id: 'i-model', label: 'Model version', sub: 'duration@9', pattern: 'external', icon: 'package' },
      ],
    },
    {
      id: 'storage',
      kind: 'table',
      label: 'Publishing one night, by storage type',
      headers: ['storage', 'atomic step', 'a reader mid-publish sees'],
      values: [
        ['warehouse table', 'one transaction, or partition overwrite', 'old or new, never both'],
        ['table format (Delta, Iceberg)', 'one commit to the log', 'old or new'],
        ['object store folder', 'none: files appear one by one', 'a partial night'],
        ['object store + pointer', 'write files, then swap _LATEST', 'old or new, if readers follow the pointer'],
      ],
    },
    {
      id: 'dups',
      kind: 'table',
      label: 'Duplicates',
      headers: ['cause', 'handled by'],
      values: [
        ['the same order in two partitions', 'a uniqueness check before publish'],
        ['a retried write', 'MERGE on the row key (chapter 4)'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'planning/publish.py',
      label: `night = f"scores/plan_date={plan_date}/run={run_key}/"
write_all_partitions(night)                       # invisible: nothing points here yet
assert count_rows(night) == manifest.expected_rows and no_duplicate_keys(night)
put_object("scores/_LATEST", night)               # one small write: the switch`,
    },
  ],
  edges: [
    { source: 'identity', target: 'storage', label: 'made visible' },
    { source: 'storage', target: 'dups' },
    { source: 'dups', target: 'code', label: 'the pointer swap' },
  ],
}
