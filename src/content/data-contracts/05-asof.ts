import type { Section } from '../types'

export const asof: Section = {
  id: 'asof',
  title: 'Historical joins and leakage-free aggregates',
  scene: 'asof',
  focus: 'compare',
  slide: `## A time-correct join

The training value of a feature must be the value the live service **could** have computed at that moment. Four ways of computing one feature show why.

### zone_delay_3h for one order, checkout 14:00
- **Live at 14:00**: s1–s4, scan s3 then read 95 → **38.75** min
- **Event-time join** next day: adds late scans s5, s6 and the fix → **41.17**
- **As-of join on the current table**: s3 now reads 25 → **21.25**
- **As-of join on value history**: **38.75**, matching live

### What makes it correct
- Filter on **availability**, not only event time
- Read each value **as it stood** then: keep versions with valid_from / valid_to
- A correction at 15:30 is real, but it was **not known** at 14:00
- Schema checks pass on all four rows`,
  narration:
    "The value of a feature in a training row must be the value the live service could have computed at that moment. The chapter's worked example shows four ways of computing one feature, the average delivery delay in an order's zone over the three hours before checkout. The live service, at two in the afternoon, could read scans s1 to s4, and scan s3 still showed its original delay of ninety-five minutes. The average was thirty-eight point seven five minutes, and that is what the model saw. A naive join on event time, run the next day, also picks up the late scans s5 and s6, plus a correction made to s3 at half past three, and gets forty-one point one seven. An as-of join that filters on availability, but reads from a table holding only the current, corrected values, gets twenty-one point two five, because s3 now reads twenty-five. Only an as-of join over the history of values reproduces thirty-eight point seven five. Two conditions make it correct: filtering on availability time, not just event time, and reading each value as it stood at that moment, which requires keeping every version with its validity window. The correction is real, but it was not known at two o'clock. All four results pass a schema check.",
}
