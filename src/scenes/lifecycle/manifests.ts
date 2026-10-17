import type { Scene } from '@graphlearning/flow'

// §2 — the chain of identities behind what serves, for each system.
export const manifests: Scene = {
  id: 'manifests',
  title: 'Dataset, feature, run and artefact manifests',
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      kind: 'table',
      label: 'From data to what serves',
      headers: ['link', 'checkout predictor', 'daily planning job'],
      values: [
        ['snapshot', 'orders_snapshot@v3/2026-04-01', 'orders_open@ nightly 01:00'],
        ['split manifest', 'split_2026-04-01 · fp 3a90c1d2', '— (scores, no labels)'],
        ['features', 'checkout_features@6', 'planning_features@3'],
        ['run', 'late-risk-0401-0300', 'duration-0315-0300'],
        ['bundle', 'late-risk@14 · sha256 7d1e…', 'duration@9 · sha256 b4f0…'],
        ['release', 'releases/late-risk-14.yaml', 'releases/duration-9.yaml'],
        ['evidence', 'gate pass; canary held', 'gate pass; 7-night shadow'],
      ],
    },
    {
      id: 'check',
      kind: 'code',
      filename: 'lifecycle/verify_chain.py',
      label: `release = load_release("late-risk-14")
bundle  = registry.get("late-risk", release.model_version)
run     = tracker.get_run(bundle.run_id)
assert sha256(bundle.files) == release.bundle_sha256          # what was approved is what serves
assert run.tags["split_fp"] == load_split(run.split).fingerprint
assert snapshot_exists(run.snapshot)                          # still re-runnable (ch 3)`,
    },
    {
      id: 'gaps',
      label: 'Without each link',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'g-fp', label: 'No fingerprint', sub: 'comparisons invalid', pattern: 'warn', icon: 'hash' },
        { id: 'g-hash', label: 'No bundle hash', sub: 'unknown what is live', pattern: 'warn', icon: 'package' },
        { id: 'g-snap', label: 'No snapshot', sub: 'cannot rebuild', pattern: 'warn', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'chain', target: 'check', label: 'checked end to end' },
    { source: 'check', target: 'gaps', label: 'what each check protects' },
  ],
}
