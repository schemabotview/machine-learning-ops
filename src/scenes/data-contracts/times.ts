import type { Scene } from '@graphlearning/flow'
import { scans, checkout, fmtT } from './join'

// §4 — each delivery scan's event time against the time it became available to read. COMPUTED
// lags; the checkout at 14:00 can only use what was available by then.
export const times: Scene = {
  id: 'times',
  title: 'Event time and availability time',
  flow: 'TB',
  nodes: [
    {
      id: 'scans',
      kind: 'table',
      label: `Zone N7 delivery scans · checkout at ${fmtT(checkout)}`,
      headers: ['scan', 'delivered (event)', 'available', 'lag', 'known at 14:00?'],
      values: scans.map((s) => [s.id, fmtT(s.event), fmtT(s.avail), `${s.avail - s.event} min`, s.avail <= checkout ? 'yes' : 'no']),
    },
    {
      id: 'clocks',
      label: 'Three clocks on every record',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-event', label: 'Event time', sub: 'when it happened', pattern: 'service', icon: 'clock' },
        { id: 'c-ingest', label: 'Ingestion time', sub: 'when it arrived', pattern: 'network', icon: 'database' },
        { id: 'c-avail', label: 'Availability', sub: 'when it could be read', pattern: 'warn', icon: 'lock' },
      ],
    },
    {
      id: 'note',
      kind: 'table',
      label: 'Why the lag varies',
      headers: ['scan', 'cause'],
      values: [
        ['s1–s4, s6', 'streamed by the carrier, ≈ 15 min to the warehouse'],
        ['s5', 'a carrier batch upload: 75 min late'],
      ],
    },
  ],
  edges: [
    { source: 'scans', target: 'clocks', label: 'event ≠ available' },
    { source: 'clocks', target: 'note' },
  ],
}
