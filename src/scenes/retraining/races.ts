import type { Scene } from '@graphlearning/flow'

// §7 — two pipelines race to move the same alias; a compare-and-set stops the stale one.
export const races: Scene = {
  id: 'races',
  title: 'Warm starts, duplicate triggers, races',
  flow: 'TB',
  nodes: [
    {
      id: 'race',
      kind: 'table',
      label: 'Two promotions at once',
      headers: ['time', 'pipeline A (May retrain)', 'pipeline B (hotfix rebuild)', 'champion'],
      values: [
        ['10:00', 'reads champion = v14', '', 'v14'],
        ['10:01', '', 'reads champion = v14', 'v14'],
        ['10:20', 'gate passes v15 vs v14', '', 'v14'],
        ['10:22', '', 'sets champion = v14.1', 'v14.1'],
        ['10:25', 'sets champion = v15 (blind)', '', 'v15: hotfix lost'],
        ['10:25', 'with compare-and-set: expected v14, found v14.1', '', 'v14.1: A re-gates'],
      ],
    },
    {
      id: 'state',
      label: 'Other state to be careful with',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-warm', label: 'Warm start', sub: 'inherits old biases', pattern: 'warn', icon: 'history' },
        { id: 's-dup', label: 'Duplicate trigger', sub: 'run key dedupes it', pattern: 'service', icon: 'key' },
        { id: 's-inc', label: 'Incremental fit', sub: 'state is now an input', pattern: 'network', icon: 'layers' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'promote.py',
      label: `def promote(candidate: int, compared_against: int):
    current = registry.get_alias("late-risk", "champion")
    if current != compared_against:
        raise StaleComparison(f"gated against v{compared_against}, champion is now v{current}")
    registry.set_alias("late-risk", "champion", candidate, expected=current)   # atomic CAS`,
    },
  ],
  edges: [
    { source: 'race', target: 'state', label: 'and also' },
    { source: 'state', target: 'code', label: 'the guard' },
  ],
}
