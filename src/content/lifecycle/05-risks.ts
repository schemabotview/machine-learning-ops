import type { Section } from '../types'

export const risks: Section = {
  id: 'risks',
  title: 'Security/recovery evidence and unresolved risks',
  scene: 'risks',
  focus: 'open',
  slide: `## Evidence, and what is still open

A good review shows the evidence that controls work, and names the risks that **remain**, each with an owner and a next step.

### Evidence on file
- The Q2 access review: 7 grants revoked, 5 narrowed
- The restore drill: 2 of 4 failed, both fixed, a re-drill due
- A rollback to v12, restored in staging on 2 April

### Still open
- **Feedback bias**: the holdout is small, 200 orders a week
- **Rural recall** 0.74, close to its 0.70 floor
- **Feed contracts**: the INC-0610 offset fix is not yet live
- **Labels are blind** for 7 days after any change
- **Carrier windows** may make the model unnecessary

### Not a deployment
- This is a design review, not evidence of operating it`,
  narration:
    "A good lifecycle review does two things. It shows the evidence that the controls actually work, and it names plainly the risks that remain, each with an owner and a next step. On file is the second-quarter access review, which revoked seven grants and narrowed five. The restore drill, in which two of four restores failed, both now fixed, with a repeat drill due next quarter. A rollback to version twelve, restored and tested in staging on the second of April. And continuous enforcement that only signed images are admitted to the cluster. Five risks remain open. Feedback bias: the unexpedited holdout is small, about two hundred orders a week, so estimates for the riskiest orders are noisy, and its size will be reviewed. Rural recall is nought point seven four, close to its floor of nought point seven, and needs more rural data. The feed-contract fix from the incident, timestamps with explicit offsets, is not live yet and is due at the end of June. Labels remain blind for seven days after any change, which the new daily score checks only partly cover. And the carrier's own delivery windows may make the model unnecessary, a retirement decision for product. Finally, an honest note: this is a design review, built from supplied traces, not evidence of having operated the system.",
}
