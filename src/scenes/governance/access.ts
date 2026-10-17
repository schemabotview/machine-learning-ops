import type { Scene } from '@graphlearning/flow'

// §1 — who may do what across the lifecycle; machine identities do the routine steps.
const Y = '●', N = '·'
export const access: Scene = {
  id: 'access',
  title: 'Identities and least privilege',
  flow: 'TB',
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'Access by identity (● allowed)',
      headers: ['identity', 'read labels', 'read raw PII', 'train', 'register', 'move alias', 'deploy'],
      values: [
        ['ML engineer (person)', Y, N, 'dev only', N, N, N],
        ['training pipeline (service)', Y, N, Y, Y, N, N],
        ['release approver (person)', N, N, N, N, Y, N],
        ['CD system (service)', N, N, N, N, N, Y],
        ['serving pods (service)', N, N, N, N, N, N],
        ['analyst (person)', 'aggregates', N, N, N, N, N],
      ],
    },
    {
      id: 'rules',
      label: 'Principles behind the grid',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-least', label: 'Least privilege', sub: 'only what the step needs', pattern: 'service', icon: 'lock' },
        { id: 'r-split', label: 'Separation', sub: 'trainer ≠ deployer', pattern: 'network', icon: 'scissors' },
        { id: 'r-machine', label: 'Machines do routine', sub: 'people approve', pattern: 'user', icon: 'cpu' },
        { id: 'r-env', label: 'Per environment', sub: 'staging ≠ production', pattern: 'warn', icon: 'layers' },
      ],
    },
  ],
  edges: [{ source: 'matrix', target: 'rules', label: 'because' }],
}
