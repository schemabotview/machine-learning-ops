import type { Section } from '../types'

export const privacy: Section = {
  id: 'privacy',
  title: 'Privacy, retention, and actionable alerts',
  scene: 'privacy',
  focus: 'logging',
  slide: `## Log what diagnosis needs, alert on what can be acted on

Telemetry is **data about customers**. Keep what diagnosis needs, for as long as it needs it, and nothing more.

### The prediction log
- Customer id as a **keyed hash**: joins and slices still work
- No delivery address, only the **zone**; no raw request body
- Feature values for **90 days**: enough for skew checks and replay
- Predictions and versions for 13 months, for quality joins

### Alerts
- **Page** on-call: p99 over 150 ms, fallbacks over 2%
- **Ticket** the ML team: a PSI over 0.25, weekly log loss over 0.40

### Every alert has
- An **owner**, a runbook **action** and an **urgency**
- An alert nobody acts on is **deleted**`,
  narration:
    "Telemetry is data about customers, so it falls under the same care as any other personal data. The rule is to keep what diagnosis needs, for as long as it needs it, and nothing more. In the prediction log, the customer identifier is stored as a keyed hash, so predictions can still be joined to outcomes and sliced by customer group, without storing the identifier itself. The delivery address is never logged, only the delivery zone, which is what the model uses, and the raw request body is not logged at all. Feature values are kept for ninety days, long enough for training-serving skew checks and for replaying requests during an investigation. Predictions and model versions are kept for thirteen months, so a year of quality can be joined to matured labels and compared with the same season. Alerts are divided by what should happen when they fire. A ninety-ninth percentile above a hundred and fifty milliseconds, or a fallback rate above two percent, pages the on-call engineer, because customers are affected now. A drift score above nought point two five, or a weekly log loss above nought point four, opens a ticket for the ML team, because it needs investigation, not a three a.m. response. And every alert has an owner, a runbook action, and an urgency.",
}
