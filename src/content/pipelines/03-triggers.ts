import type { Section } from '../types'

export const triggers: Section = {
  id: 'triggers',
  title: 'Parameters, schedules, events, and run identity',
  scene: 'triggers',
  focus: 'keys',
  slide: `## What a run is, whatever started it

A run can be started by a **schedule**, a **data event** or a **person**. Its identity should come from what it computes, not from what started it.

### The run key
- Pipeline version + parameters: retrain-v4-2026-04-01-c7bbca
- The 03:00 schedule and the 03:04 snapshot event give the **same** key
- So the second is **deduplicated**, not run twice
- A manual rerun of March, or pipeline v5, gets a **new** key

### Parameters, not "now"
- snapshot_date comes from the **data interval**, never from today's clock
- A rerun next week must compute **exactly** the same thing

### Concurrency
- One active run per key: skip if one is already running`,
  narration:
    "A pipeline run can be started by a schedule, by a data event such as a new snapshot being published, or by a person. Its identity, though, should come from what it computes, not from whatever started it. The run key here combines the pipeline version with its parameters, giving something like retrain, version four, first of April, plus a short hash. The table shows why that matters. At three o'clock on the first of April the monthly schedule fires. At four minutes past, the snapshot-published event fires for the same snapshot. Both resolve to the same pipeline version and the same snapshot date, so they produce the same run key, and the second is deduplicated instead of running the whole pipeline twice. A manual rerun of March gets a different key, because its snapshot date differs, and so does a run of pipeline version five, because the code changed. The parameters themselves must come from the data interval being processed, never from the current clock. A step that asks for today's date computes something different every time it is rerun, so a rerun next week would no longer mean the same run. Finally, the orchestrator allows one active run per key, and skips a trigger for a key that is already running.",
}
