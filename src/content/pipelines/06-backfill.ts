import type { Section } from '../types'

export const backfill: Section = {
  id: 'backfill',
  title: 'Parallel branches, quotas, backfills, and metadata',
  scene: 'backfill',
  focus: 'plan',
  slide: `## Backfills under a quota

A **backfill** reruns past partitions: here 30 nights of planning scores, after a fix.

### Planning the backfill
- Each night: 40 min on 4 CPUs
- The team quota is 16 CPUs, so at most 4 nights at once
- One at a time: 20 h, overlapping the nightly run
- Four in parallel: 5.3 h, with capacity kept for tonight
- The nightly run has priority: tonight still lands by 05:00
- Backfill waits in a low-priority pool

### What each backfilled night records
- The same run key a normal night would have
- The **reason**, the versions used, and the run key it **replaces**
- Backfilled nights pass the **same** gates as normal ones
- Routing is told which plan dates changed`,
  narration:
    "A backfill reruns a pipeline over past partitions, usually because something upstream was fixed. Here the zone lookup fix means thirty nights of planning scores should be recomputed. Planning it starts with arithmetic. Each night takes about forty minutes on four CPUs. The team's quota is sixteen CPUs, so at most four nights can run at once. Run one at a time, the backfill would take twenty hours and overlap with the normal nightly run. Run four in parallel, it takes about five and a third hours, eight rounds of forty minutes, and still leaves room for tonight's run. Priorities matter as much as parallelism. The regular nightly run has priority over the backfill, so tonight's scores still land by five in the morning, while the backfill runs in a separate low-priority pool and waits when capacity is needed. And each backfilled night records the same run key a normal run for that night would have, so it can be found and compared, plus the reason for the backfill, the pipeline and feature versions it used, and the run key of the output it replaces. Without that record, nobody can later tell an original night from a recomputed one, or work out which model saw which version of the data.",
}
