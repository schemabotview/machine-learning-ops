import type { Scene } from '@graphlearning/flow'

// §7 — the same pipeline run locally and on the remote orchestrator: what changes, and what a
// "portable" definition can and cannot hide.
export const portability: Scene = {
  id: 'portability',
  title: 'Local and remote execution',
  flow: 'TB',
  nodes: [
    {
      id: 'diffs',
      kind: 'table',
      label: 'One pipeline, two places to run it',
      headers: ['', 'local runner', 'remote orchestrator'],
      values: [
        ['steps run as', 'processes on a laptop', 'containers on a cluster'],
        ['data', '1% sample, local files', 'full snapshot, object store'],
        ['credentials', 'the developer\'s own', 'a service identity per step'],
        ['resources', 'whatever the laptop has', 'declared per step'],
        ['metadata', 'a local store', 'shared, with lineage'],
        ['failures seen', 'logic, shapes, schemas', 'memory, timeouts, permissions'],
      ],
    },
    {
      id: 'limits',
      label: 'What portability covers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-def', label: 'Same definition', sub: 'graph and parameters', pattern: 'service', icon: 'copy' },
        { id: 'l-img', label: 'Same images', sub: 'digest-pinned', pattern: 'network', icon: 'package' },
        { id: 'l-scale', label: 'Not scale', sub: '1% hides memory limits', pattern: 'warn', icon: 'gauge' },
        { id: 'l-perm', label: 'Not permissions', sub: 'local creds hide them', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'diffs', target: 'limits', label: 'so' }],
}
