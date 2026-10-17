import type { Scene } from '@graphlearning/flow'

// §3 — lineage links each artefact to what produced it; it records, it does not restore.
export const lineage: Scene = {
  id: 'lineage',
  title: 'Lineage and repeatability limits',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'Lineage of model late-risk v12, in order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'g-snap', label: '1 · Snapshot', sub: 'orders@v3', pattern: 'storage', icon: 'database' },
        { id: 'g-feat', label: '2 · Features', sub: 'view v5', pattern: 'network', icon: 'boxes' },
        { id: 'g-run', label: '3 · Run', sub: '0302-0915', pattern: 'service', icon: 'cpu' },
        { id: 'g-model', label: '4 · Model v12', sub: 'in the registry', pattern: 'external', icon: 'package' },
      ],
    },
    {
      id: 'record',
      kind: 'code',
      filename: 'registry: late-risk v12 · lineage',
      label: `model: late-risk v12
run_id: late-risk-0302-0915
inputs: {snapshot: orders@v3, features: checkout_features@5, split_fp: cf1d81d1}
retention: {snapshot: 90 days, image: kept while live}`,
    },
    {
      id: 'limits',
      kind: 'table',
      label: 'Re-running v12 from its record, six months later',
      headers: ['recorded', 'still true?', 'consequence'],
      values: [
        ['snapshot path s3://…/v3', 'deleted by retention', 'cannot rebuild the data'],
        ['seed = 17', 'yes', 'threads still reorder sums'],
        ['image digest e04c…', 'image kept', 'libraries match'],
        ['feature view v5', 'source table rewritten', 'same name, different values'],
        ['val log loss 0.3941', 'rerun gives 0.3924', 'close, not identical'],
      ],
    },
    {
      id: 'kinds',
      label: 'Three different promises',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'k-trace', label: 'Traceable', sub: 'we know what ran', pattern: 'service', icon: 'search' },
        { id: 'k-rerun', label: 'Re-runnable', sub: 'inputs still exist', pattern: 'network', icon: 'repeat' },
        { id: 'k-det', label: 'Deterministic', sub: 'bit-identical output', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'graph', target: 'record', label: 'stored as' },
    { source: 'record', target: 'limits', label: 'try to repeat it' },
    { source: 'limits', target: 'kinds', label: 'so name the promise' },
  ],
}
