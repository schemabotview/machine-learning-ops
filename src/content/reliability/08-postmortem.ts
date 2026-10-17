import type { Section } from '../types'

export const postmortem: Section = {
  id: 'postmortem',
  title: 'Postmortems and prevention/detection improvements',
  scene: 'postmortem',
  focus: 'actions',
  slide: `## Turning an incident into changes

A **blameless** postmortem finds what made the failure possible and slow to see, then turns each finding into an owned, dated change.

### Contributing factors
- The feed contract had **no** timezone field: the change was valid
- No rule on **jumps** in zone_delay: +60 minutes passed silently
- Quality needs matured labels: **7 days** blind
- The guardrail took **2 days**: conversion is noisy

### Actions
- **Prevent**: timestamps carry an offset in the feed contract
- **Detect**: alert on a 20-minute step in zone_delay
- **Detect**: a daily score-distribution check against last week
- **Contain**: a runbook step to pin a feature to its medians
- Each action tracked to **done**`,
  narration:
    "A postmortem turns an incident into changes. Written blamelessly, it asks what made the failure possible and what made it slow to see, rather than who made a mistake, and it turns each finding into a change with an owner and a date. Four factors contributed here. The carrier feed's contract had no timezone field, so switching to local time was a perfectly valid change by the contract's own terms. There was no rule on sudden jumps in the zone delay feature, so a sixty-minute step everywhere passed silently. Model quality metrics depend on matured labels, which leaves seven days in which they cannot see anything. And the conversion guardrail took two days to fire, because conversion is noisy from day to day. Each becomes an action. To prevent it, timestamps in the feed contract must carry an explicit offset, owned by data engineering, due at the end of June. To detect it sooner, an alert on any step of more than twenty minutes in the zone delay medians, and a daily check of the model's score distribution against the previous week, both owned by the ML team. To contain it next time, a runbook step for pinning a feature to its medians, already done. And the actions are tracked until they are done, not just written down.",
}
