import type { Scene } from '@graphlearning/flow'

// §1 — four loops that are often called "CI/CD", each with its own trigger and output.
export const distinctions: Scene = {
  id: 'distinctions',
  title: 'Integration, delivery, deployment, training',
  flow: 'TB',
  nodes: [
    {
      id: 'loops',
      kind: 'table',
      label: 'Four different automated loops',
      headers: ['loop', 'triggered by', 'produces', 'does not'],
      values: [
        ['continuous integration', 'a code change', 'a tested, built image', 'train or deploy'],
        ['continuous training', 'new data or a schedule', 'a candidate model + evidence', 'deploy it'],
        ['continuous delivery', 'a passing candidate', 'a release ready to deploy', 'send traffic'],
        ['deployment', 'an approved release', 'traffic on the new version', 'prove it helps'],
      ],
    },
    {
      id: 'flow',
      label: 'Where a change enters, and where it stops',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-code', label: 'Code change', sub: 'CI: test, build once', pattern: 'service', icon: 'gitbranch' },
        { id: 'f-data', label: 'New data', sub: 'CT: train, gate', pattern: 'storage', icon: 'database' },
        { id: 'f-rel', label: 'Release', sub: 'CD: bundle + image', pattern: 'network', icon: 'package' },
        { id: 'f-dep', label: 'Rollout', sub: 'staged, abortable', pattern: 'warn', icon: 'share' },
      ],
    },
    {
      id: 'independent',
      label: 'Each loop fails and recovers on its own',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'x-train', label: 'Training broken', sub: 'a patch still ships', pattern: 'warn', icon: 'bug' },
        { id: 'x-patch', label: 'A patch ships', sub: 'no new model with it', pattern: 'service', icon: 'lock' },
        { id: 'x-roll', label: 'A rollback', sub: 'training carries on', pattern: 'network', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'loops', target: 'flow', label: 'in this system' },
    { source: 'flow', target: 'independent', label: 'kept apart' },
  ],
}
