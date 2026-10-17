import type { Section } from '../types'

export const batch: Section = {
  id: 'batch',
  title: 'Batch snapshots, partitioning, and manifests',
  scene: 'batch',
  focus: 'plan',
  slide: `## Scoring a night in partitions

The planning job scores tomorrow's orders from **one snapshot**, split into partitions so the work can run in parallel and fail in pieces.

### The night's numbers
- 180,000 orders from the **01:00** snapshot, in 64 zone partitions
- Four city zones are large: the biggest has **10,650** orders
- At 1,125 orders/min per worker it takes **9.5 min**
- On 4 workers the night takes **40.2 min**: longest partitions first

### Why partition, and by what
- **One snapshot** for every partition, so all scores share a moment
- **By zone**, because routing reads by zone
- A failure **retries one partition**, not the whole night
- A manifest records each partition's **status**`,
  narration:
    "The daily planning job scores tomorrow's orders in one batch, read from a single snapshot, and split into partitions so the work can run in parallel and can fail in pieces rather than all at once. Tonight there are a hundred and eighty thousand orders, read from the one o'clock snapshot and split into sixty-four partitions by delivery zone. The zones are uneven. Four large city zones dominate, and the biggest holds ten thousand six hundred and fifty orders. At about eleven hundred orders a minute per worker, that partition alone takes nine and a half minutes. With four workers, assigning the longest partitions first, the whole night takes forty minutes, consistent with the backfill arithmetic in chapter four. There are three reasons for these choices. Every partition reads the same snapshot, so all of tonight's scores describe the same moment, rather than a mixture of states as orders change during the run. The partitions follow delivery zones, because that is how routing reads the output. And a failure only needs one partition retried, not the whole night. The run writes a manifest: its run key, the model version, the input snapshot, the number of rows it expects to produce, and the status of every partition, so a reader can tell a complete night from a partial one.",
}
