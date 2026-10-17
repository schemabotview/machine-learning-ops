import type { Section } from '../types'

export const resume: Section = {
  id: 'resume',
  title: 'Checkpoint/resume state and incomplete outputs',
  scene: 'resume',
  focus: 'trace',
  slide: `## Interrupted, then resumed

Long jobs on cheap, interruptible machines will be stopped. A checkpoint must hold **all** the state needed to continue as if nothing happened.

### The trace
- 1,000 boosting rounds, 2.4 s each, checkpoint every **100**
- Checkpoint at round **700**, at 09:43
- The spot instance is **preempted** at round 730
- The retry resumes from 700: **30** rounds redone, 1.2 minutes
- Round 1,000 at 10:00: evaluate, then publish

### What the checkpoint holds
- The model so far: trees 1 to 700
- The **RNG state**, so sampling continues the same sequence
- The **data position**, so no batch is skipped or repeated

### The partial model
- Left in staging, and **never** published`,
  narration:
    "Long training jobs on cheap, interruptible machines will sometimes be stopped part-way, so a checkpoint must hold all of the state needed to continue as though nothing had happened. Here is one interrupted job. It trains a thousand boosting rounds at about two point four seconds each, saving a checkpoint every hundred rounds. The checkpoint at round seven hundred is written at nine forty-three. At round seven hundred and thirty, the spot instance is reclaimed, and the job dies. The orchestrator's retry finds the latest checkpoint and resumes from round seven hundred, so only thirty rounds, about a minute of work, are repeated. Round one thousand finishes at ten o'clock, and only then is the model evaluated and published. A checkpoint that holds only the model so far is not enough. It must also hold the random number generator's state, so that row and column sampling continue the same sequence, and the position in the data, so no batch is skipped or seen twice. Without those, the resumed model differs from one that ran uninterrupted, with no error to show it. And the checkpoint itself is written to a temporary file and then renamed, so a crash mid-write cannot corrupt it. The partial model left in staging by the interruption is never published.",
}
