// Chapter 2's worked join, COMPUTED. Feature: zone_delay_3h — mean delivery delay (minutes) in the
// order's delivery zone over the 3 hours before checkout. Order 88412 checks out in zone N7 at 14:00.
// Each delivery scan has an event time (when the parcel was delivered) and an availability time
// (when the scan landed in the warehouse the feature reads from). One scan is later corrected.
export type Scan = { id: string; event: number; avail: number; delay: number; corrected?: { at: number; delay: number } }
const t = (hh: number, mm: number) => hh * 60 + mm
export const fmtT = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
export const checkout = t(14, 0)
export const windowMin = 180
export const scans: Scan[] = [
  { id: 's1', event: t(11, 20), avail: t(11, 35), delay: 12 },
  { id: 's2', event: t(12, 5), avail: t(12, 20), delay: 30 },
  { id: 's3', event: t(12, 40), avail: t(12, 55), delay: 95, corrected: { at: t(15, 30), delay: 25 } },
  { id: 's4', event: t(13, 10), avail: t(13, 25), delay: 18 },
  { id: 's5', event: t(13, 35), avail: t(14, 50), delay: 140 }, // a late-arriving scan: carrier batch upload
  { id: 's6', event: t(13, 50), avail: t(14, 5), delay: 22 },
]
const inWindow = (s: Scan) => s.event > checkout - windowMin && s.event <= checkout
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
const valueAt = (s: Scan, asOf: number) => (s.corrected && s.corrected.at <= asOf ? s.corrected.delay : s.delay)

/** What the live service could have computed at checkout: available by 14:00, values as of 14:00. */
export const live = (() => {
  const used = scans.filter((s) => inWindow(s) && s.avail <= checkout)
  return { used: used.map((s) => s.id), value: avg(used.map((s) => valueAt(s, checkout))) }
})()
/** A naive event-time join run next day: includes the late scan and the corrected value. */
export const eventTimeJoin = (() => {
  const used = scans.filter(inWindow)
  return { used: used.map((s) => s.id), value: avg(used.map((s) => valueAt(s, Infinity))) }
})()
/** Availability-aware as-of join run next day, reading values as they stood at checkout. */
export const asOfJoin = (() => {
  const used = scans.filter((s) => inWindow(s) && s.avail <= checkout)
  return { used: used.map((s) => s.id), value: avg(used.map((s) => valueAt(s, checkout))) }
})()
/** Availability-aware, but reading the corrected value (a current-state table, not a history). */
export const asOfCurrent = (() => {
  const used = scans.filter((s) => inWindow(s) && s.avail <= checkout)
  return { used: used.map((s) => s.id), value: avg(used.map((s) => valueAt(s, Infinity))) }
})()
