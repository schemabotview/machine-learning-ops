import type { Scene } from '@graphlearning/flow'

// §6 — three different events: registering a version, moving an alias, and a runtime loading it.
export const aliases: Scene = {
  id: 'aliases',
  title: 'Versions, aliases, runtime',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'Promoting v14 · registry state against what is serving',
      headers: ['time', 'event', 'registry', 'alias champion', 'serving pods'],
      values: [
        ['10:00', 'register v14', 'v12, v13, v14', 'v12', 'v12'],
        ['10:30', 'set alias champion → v14', 'unchanged', 'v14', 'v12'],
        ['10:31', 'pods poll the alias', 'unchanged', 'v14', '2 of 6 reloading'],
        ['10:36', 'reload complete', 'unchanged', 'v14', 'v14 (6 of 6)'],
        ['11:10', 'roll back: alias → v12', 'unchanged', 'v12', 'v14 until reload'],
      ],
    },
    {
      id: 'three',
      label: 'Three things that are easy to conflate',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-ver', label: 'Version', sub: 'immutable: v14', pattern: 'storage', icon: 'lock' },
        { id: 't-alias', label: 'Alias', sub: 'mutable pointer', pattern: 'network', icon: 'tag' },
        { id: 't-run', label: 'Runtime', sub: 'what is loaded now', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'promote.py',
      label: `# registering creates v14: immutable
client.create_model_version("late-risk", source=bundle_uri)
# aliasing moves a pointer; nothing reloads yet
client.set_registered_model_alias("late-risk", "champion", "14")
# proof of what is live: model_version on each response`,
    },
  ],
  edges: [
    { source: 'timeline', target: 'three', label: 'three different states' },
    { source: 'three', target: 'code' },
  ],
}
