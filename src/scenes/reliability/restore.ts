import type { Scene } from '@graphlearning/flow'

// §5 — what is backed up, the recovery objectives, and what the last restore drill found.
export const restore: Scene = {
  id: 'restore',
  title: 'Backups, restore validation, recovery objectives',
  flow: 'TB',
  nodes: [
    {
      id: 'drill',
      kind: 'table',
      label: 'Q2 restore drill, into an empty staging account',
      headers: ['store', 'RPO target', 'RTO target', 'drill result'],
      values: [
        ['model registry + bundles', '24 h', '1 h', 'restored in 25 min: pass'],
        ['offline feature store', '24 h', '4 h', 'failed: restore role lacked decrypt'],
        ['prediction logs', '1 h', '24 h', 'restored in 6 h: pass'],
        ['split manifests', '24 h', '4 h', 'restored; 2 ids files missing: fail'],
      ],
    },
    {
      id: 'terms',
      label: 'Two objectives per store',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-rpo', label: 'RPO', sub: 'how much may be lost', pattern: 'storage', icon: 'database' },
        { id: 't-rto', label: 'RTO', sub: 'how long to restore', pattern: 'service', icon: 'clock' },
      ],
    },
    {
      id: 'lesson',
      label: 'What the drill showed',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-untested', label: 'Untested', sub: 'two of four failed', pattern: 'warn', icon: 'bug' },
        { id: 'l-perm', label: 'Permissions', sub: 'part of the backup', pattern: 'warn', icon: 'key' },
        { id: 'l-fix', label: 'Fixed, re-drilled', sub: 'next quarter', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'drill', target: 'terms', label: 'against' },
    { source: 'terms', target: 'lesson' },
  ],
}
