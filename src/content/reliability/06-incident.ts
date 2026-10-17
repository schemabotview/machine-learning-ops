import type { Section } from '../types'

export const incident: Section = {
  id: 'incident',
  title: 'Incident severity, runbooks, containment, and evidence',
  scene: 'incident',
  focus: 'timeline',
  slide: `## A silent quality incident

Every service was green for **three days** while the model's predictions were wrong. Incidents in ML systems often look like this.

### INC-0610
- Monday 02:00: the carrier feed switches delivered_at to **local time**
- zone_delay_3h rises by about **60 minutes** everywhere
- Risk is inflated; ~40% more customers see **wider** windows
- Wednesday 10:30: the conversion guardrail drops **1.4%**
- 11:10: triage finds a shift with no seasonal match: **SEV-2**
- 11:25: **contain**, by pinning zone_delay to Sunday medians, labelled
- 14:00: **fix**, converting to UTC at ingest, and replay since Monday

### During it
- One lead; **contain first**; keep the evidence`,
  narration:
    "Here is an incident of the kind ML systems are prone to. Every service was green for three days while the model's predictions were wrong. At two in the morning on Monday, the carrier's feed switched its delivered-at timestamps from universal time to local time, an hour ahead. Every timestamp still parsed, so nothing failed. But the zone delay feature, the average delay over the last three hours, rose by about sixty minutes in every zone. Predicted late risk was inflated across the board, and around forty percent more customers were shown wider delivery windows. Latency, errors and uptime stayed perfect. Model quality could not see it either, because labels take seven days to mature. On Wednesday at half past ten, the checkout conversion guardrail showed a drop of one point four percent against the previous week, and opened a ticket. By ten past eleven, triage had found a large shift in zone delay with no seasonal match, and the incident was declared severity two, because customers were affected. At twenty-five past, the team contained it by pinning zone delay to Sunday's medians, labelled as such. And by two o'clock the fix was in: converting to universal time at ingest, and replaying every feature since Monday. Throughout, one incident lead decided and communicated, containment came before root cause, and the evidence was kept.",
}
