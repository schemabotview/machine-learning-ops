import type { Scene } from '@graphlearning/flow'
import { failed, failedOrders, parts, totalOrders } from './numbers'

// §3 — three partitions fail on the first attempt. COMPUTED counts; what the downstream contract
// says decides what happens next.
const n = (v: number) => v.toLocaleString('en-GB')
const share = failedOrders / totalOrders

export const partial: Scene = {
  id: 'partial',
  title: 'Partial failure, freshness, downstream contracts',
  flow: 'TB',
  nodes: [
    {
      id: 'night',
      kind: 'table',
      label: `2026-04-03 · 3 of 64 partitions fail at first attempt`,
      headers: ['time', 'event', 'scored'],
      values: [
        ['02:00', 'job starts', '0'],
        ['02:40', `61 partitions done; zones ${failed.join(', ')} failed (feature timeout)`, `${n(totalOrders - failedOrders)} (${((1 - share) * 100).toFixed(1)}%)`],
        ['02:45', `retry the 3 partitions only: ${failed.map((i) => n(parts[i])).join(' + ')} orders`, '…'],
        ['02:52', 'all 64 done; checks pass', n(totalOrders)],
        ['02:53', 'publish the night', 'routing reads by 05:00'],
      ],
    },
    {
      id: 'contract',
      kind: 'table',
      label: 'The downstream contract with routing',
      headers: ['term', 'value'],
      values: [
        ['deadline', 'published by 05:00'],
        ['completeness', 'all 64 zones, or nothing'],
        ['if missed', 'routing uses yesterday + rules, and says so'],
        ['freshness', 'scores built from the 01:00 snapshot'],
      ],
    },
    {
      id: 'choices',
      label: 'If the retry had failed too',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-hold', label: 'Hold the night', sub: 'contract: all or none', pattern: 'service', icon: 'lock' },
        { id: 'c-partial', label: 'Publish 61', sub: 'only if routing allows', pattern: 'warn', icon: 'ban' },
        { id: 'c-fill', label: 'Backfill later', sub: 'zones 17, 42, 58', pattern: 'network', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'night', target: 'contract', label: 'decided by' },
    { source: 'contract', target: 'choices' },
  ],
}
