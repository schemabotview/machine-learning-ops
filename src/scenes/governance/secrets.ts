import type { Scene } from '@graphlearning/flow'

// §2 — where secrets live, what is encrypted, and which network paths exist at all.
export const secrets: Scene = {
  id: 'secrets',
  title: 'Secrets, encryption, network boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'net',
      label: 'Network paths that exist',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-api', label: 'Checkout API', sub: 'the only caller', pattern: 'user', icon: 'globe' },
        { id: 'n-serve', label: 'Predictor', sub: 'private subnet', pattern: 'service', icon: 'cpu' },
        { id: 'n-feat', label: 'Feature store', sub: 'read-only for serving', pattern: 'storage', icon: 'database' },
        { id: 'n-reg', label: 'Model registry', sub: 'read at startup', pattern: 'network', icon: 'package' },
        { id: 'n-log', label: 'Log sink', sub: 'write-only', pattern: 'storage', icon: 'pencil' },
        { id: 'n-out', label: 'Internet', sub: 'egress denied', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Secrets and encryption',
      headers: ['item', 'where', 'rotation'],
      values: [
        ['feature-store token', 'secret manager, mounted at start', '30 days, automatic'],
        ['registry credentials', 'workload identity: no stored secret', '—'],
        ['data at rest', 'encrypted, keys in KMS', 'yearly'],
        ['in transit', 'TLS inside the cluster too', '—'],
        ['secrets in code or images', 'never: scanned in CI', '—'],
      ],
    },
  ],
  edges: [{ source: 'net', target: 'table', label: 'and credentials' }],
}
