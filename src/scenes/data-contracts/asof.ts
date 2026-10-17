import type { Scene } from '@graphlearning/flow'
import { live, eventTimeJoin, asOfJoin, asOfCurrent } from './join'

// §5 — the same feature for order 88412 computed four ways. Only the availability-aware join over
// historical values reproduces what the live service saw. COMPUTED from join.ts.
const row = (name: string, r: { used: string[]; value: number }, verdict: string) => [name, r.used.join(', '), r.value.toFixed(2), verdict]

export const asof: Scene = {
  id: 'asof',
  title: 'Historical joins without leakage',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'zone_delay_3h for order 88412, checkout 14:00',
      headers: ['computed by', 'scans used', 'minutes', 'verdict'],
      values: [
        row('live service at 14:00', live, 'the value the model saw'),
        row('event-time join, next day', eventTimeJoin, 'leaks s5, s6 and the fix'),
        row('as-of join, current table', asOfCurrent, 'leaks the 15:30 correction'),
        row('as-of join, value history', asOfJoin, 'matches live'),
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'features/zone_delay_3h.sql',
      label: `SELECT o.order_id, AVG(v.delay_min) AS zone_delay_3h
FROM orders o
JOIN scan_versions v                       -- every version of every scan, with valid_from
  ON v.zone = o.zone
 AND v.delivered_at >  o.checkout_at - INTERVAL '3 hours'
 AND v.delivered_at <= o.checkout_at
 AND v.available_at <= o.checkout_at       -- availability, not just event time
 AND v.valid_from   <= o.checkout_at       -- the value as it stood then
 AND (v.valid_to IS NULL OR v.valid_to > o.checkout_at)
GROUP BY o.order_id`,
    },
    {
      id: 'conditions',
      label: 'What the correct row needs',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-avail', label: 'Availability', sub: 'available_at ≤ checkout', pattern: 'service', icon: 'lock' },
        { id: 'c-hist', label: 'Value history', sub: 'valid_from, valid_to', pattern: 'network', icon: 'history' },
        { id: 'c-schema', label: 'Schema check', sub: 'passes all four rows', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'conditions', label: 'the difference' },
    { source: 'conditions', target: 'code', label: 'in SQL' },
  ],
}
