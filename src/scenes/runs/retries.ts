import type { Scene } from '@graphlearning/flow'
import { reruns } from './numbers'

// §7 — retry by failure kind, and the numerical spread of five identical reruns (COMPUTED, seeded):
// a candidate must beat the champion by more than this to count.
const spread = Math.max(...reruns) - Math.min(...reruns)

export const retries: Scene = {
  id: 'retries',
  title: 'Retries, variation and recovery',
  flow: 'TB',
  nodes: [
    {
      id: 'policy',
      kind: 'table',
      label: 'Retry by failure kind',
      headers: ['failure', 'kind', 'action'],
      values: [
        ['spot preemption', 'transient', 'retry from checkpoint, up to 3 times'],
        ['object store 503', 'transient', 'retry with backoff'],
        ['out of memory', 'resource', 'fail; resize once, by hand'],
        ['schema check fails', 'deterministic', 'fail at once: a retry gives the same result'],
        ['loss becomes NaN', 'deterministic', 'fail, keep logs and the last checkpoint'],
      ],
    },
    {
      id: 'reruns',
      kind: 'table',
      label: `Five reruns, same config and seed, 8 threads · spread ${spread.toFixed(4)}`,
      headers: ['rerun', '1', '2', '3', '4', '5'],
      values: [['val log loss', ...reruns.map((v) => v.toFixed(4))]],
    },
    {
      id: 'meaning',
      label: 'Reading a difference',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-noise', label: 'Below the spread', sub: `< ${spread.toFixed(4)}: noise`, pattern: 'warn', icon: 'waves' },
        { id: 'm-tol', label: 'Declared tolerance', sub: 'set before comparing', pattern: 'service', icon: 'ruler' },
        { id: 'm-seeds', label: 'Several seeds', sub: 'for close calls', pattern: 'network', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'policy', target: 'reruns', label: 'and when it succeeds' },
    { source: 'reruns', target: 'meaning' },
  ],
}
