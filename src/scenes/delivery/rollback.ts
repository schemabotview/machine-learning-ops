import type { Scene } from '@graphlearning/flow'

// §7 — rolling v14 back to v12 is only safe if everything v12 depends on still exists.
export const rollback: Scene = {
  id: 'rollback',
  title: 'Compatible rollback',
  flow: 'TB',
  nodes: [
    {
      id: 'deps',
      kind: 'table',
      label: 'Rolling back v14 → v12: what else must roll back',
      headers: ['item', 'v14 uses', 'v12 needs', 'still available?'],
      values: [
        ['model bundle', 'late-risk@14', 'late-risk@12', 'yes: retained'],
        ['feature view', 'checkout_features@6', 'checkout_features@5', 'yes: still materialised'],
        ['zone_delay', 'median_v2', 'mean (v1)', 'only if v1 not retired'],
        ['request schema', 'adds basket_value', 'ignores it', 'yes: extra field tolerated'],
        ['risk threshold', '0.35', '0.30', 'config rolls back with it'],
      ],
    },
    {
      id: 'order',
      label: 'Roll back as one unit',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-check', label: 'Check deps', sub: 'v5 features are live', pattern: 'service', icon: 'search' },
        { id: 'o-alias', label: 'Move alias', sub: 'with its config', pattern: 'network', icon: 'tag' },
        { id: 'o-verify', label: 'Verify runtime', sub: 'model_version = 12', pattern: 'user', icon: 'circlecheck' },
        { id: 'o-not', label: 'Not undone', sub: 'windows already shown', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [{ source: 'deps', target: 'order', label: 'so' }],
}
