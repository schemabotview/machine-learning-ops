import type { Section } from '../types'

export const audit: Section = {
  id: 'audit',
  title: 'Audit records, abort criteria, and release retirement',
  scene: 'audit',
  focus: 'record',
  slide: `## The release record

Every release leaves one record: what was released, on what evidence, approved by whom, how it rolled out, and how to undo it.

### What it holds
- The model version **and** the image digest
- The gate report and its verdict
- Who **approved** it, and when
- The rollout plan, and the **abort criteria** fixed before starting
- The **rollback target**: model, feature view and config together
- Each rollout event as it happened

### Retiring the old version
- After 30 stable days, remove the rollback alias
- Stop materialising features@5, once **no** live model reads it
- Archive the bundle for its retention period
- Close the record: retired when, and by whom`,
  narration:
    "Every release should leave one record that answers the questions someone will ask later: what was released, on what evidence, approved by whom, how it rolled out, and how to undo it. The record for version fourteen names the model version and the image digest together, since either alone is ambiguous. It links the gate report and its verdict. It records who approved the release, and when. It holds the rollout plan, a five percent canary by customer for forty-eight hours, and the abort criteria, which were fixed before the rollout started, not adjusted once the numbers came in. It names the rollback target as a unit: model version twelve, with feature view five and configuration forty-one. And it lists each rollout event as it happened, here the canary starting, and two days later the expansion to all traffic with every guardrail held. Eventually the old version is retired, deliberately. After thirty stable days, the rollback alias is removed. Feature view five stops being materialised, but only once it has been checked that no live model reads it. The bundle is archived for the retention period set in chapter five. And the record is closed, saying when the version was retired and by whom. That closes the delivery loop for this release.",
}
