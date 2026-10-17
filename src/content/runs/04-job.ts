import type { Section } from '../types'

export const job: Section = {
  id: 'job',
  title: 'Training input/output and publication contracts',
  scene: 'job',
  focus: 'flow',
  slide: `## The training job as a contract

A training job reads named inputs, writes its outputs somewhere private, and **publishes** them in one final step. Anything else can leave half a model visible.

### Inputs
- Snapshot, split manifest and config, all **read-only**
- Named by identity, so a rerun reads the same things

### Outputs
- Written to a **staging** path that nothing else reads
- A self-check: every file present, the schema and hashes verified
- Then **published** by one atomic rename to candidates/
- Exit 0 only **after** publishing

### What gets published together
- Model, input signature, evaluation report, run manifest, checksums
- A candidate without its report or signature is **incomplete**`,
  narration:
    "A training job is easier to trust when it is treated as a contract: it reads named inputs, writes its outputs somewhere private, and publishes them in one final step. Anything looser can leave half a model where something else will find it. The inputs are the snapshot, the split manifest and the configuration, all read-only, and all named by identity, so a rerun reads exactly the same things. The outputs are written first to a staging path that no other system reads. Before publishing, the job checks itself: every expected file is present, the model's input schema matches the feature view, and the checksums are correct. Then it publishes the whole set to the candidates location with a single atomic step, such as a rename, so a reader sees either nothing or everything. Only after that does it exit successfully, so the orchestrator never records success for a job whose outputs are not there. What gets published together matters too: the model, its input signature, its evaluation report, its run manifest and a checksum file. A candidate without its report or signature is incomplete, and should never be published, because every later step, validation, registration and serving, depends on all of them arriving together.",
}
