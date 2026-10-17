import type { Scene } from '@graphlearning/flow'
import { candMean, champMean } from './numbers'

// §3 — v13 wins on overall log loss and fails two other declared criteria. Overall figures COMPUTED
// (numbers.ts); slice, calibration and resource figures illustrative.
export const checks: Scene = {
  id: 'checks',
  title: 'Subgroup, robustness, calibration, resources',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Candidate review · protected test set and load test',
      headers: ['criterion', 'threshold', 'v12 champion', 'v13 candidate', 'v13'],
      values: [
        ['log loss, overall', 'beat by 0.002', champMean.toFixed(4), candMean.toFixed(4), 'pass'],
        ['late recall, rural zones', '≥ 0.70', '0.74', '0.66', 'fail'],
        ['calibration error (ECE)', '≤ 0.03', '0.021', '0.019', 'pass'],
        ['log loss, new customers', '≤ v12 + 0.01', '0.452', '0.449', 'pass'],
        ['p99 latency at 40 rps', '≤ 150 ms', '121 ms', '182 ms', 'fail'],
        ['memory per replica', '≤ 1 GB', '410 MB', '760 MB', 'pass'],
      ],
    },
    {
      id: 'why',
      label: 'Why each check is there',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-slice', label: 'Subgroups', sub: 'averages hide them', pattern: 'warn', icon: 'search' },
        { id: 'w-calib', label: 'Calibration', sub: 'risk drives the window', pattern: 'network', icon: 'ruler' },
        { id: 'w-robust', label: 'Robustness', sub: 'unseen customers', pattern: 'user', icon: 'globe' },
        { id: 'w-res', label: 'Resources', sub: 'the serving contract', pattern: 'service', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'why', label: 'six checks, four reasons' }],
}
