import type { Section } from '../types'

export const experiment: Section = {
  id: 'experiment',
  title: 'Assignment units, stopping plans, and guardrails',
  scene: 'experiment',
  focus: 'plan',
  slide: `## An experiment, planned before it starts

To claim the new window policy **helps**, run a randomised comparison. Fix the unit, the metric, the length and the guardrails first.

### The plan
- Unit: the **customer**, hashed, 50/50
- Primary metric: broken promises, **8% → 7%** to detect
- **10,887** orders per arm, ×1.075 for repeat customers
- That is only **3.1 hours** of orders

### The calendar decides
- Run **14 days**: two full weekly cycles
- Read out on **day 21**, once the last labels mature
- Guardrails: checkout conversion, support contacts, p99

### Rules
- **No peeking**: stopping at day 3 on a good number inflates false wins
- One primary metric; the rest are secondary`,
  narration:
    "A canary shows that a new version runs safely. To claim that the new delivery-window policy actually helps, reducing broken promises, needs a randomised comparison, planned before it starts. The unit is the customer, hashed and split fifty-fifty, so each customer sees one policy throughout. The primary metric is the broken-promise rate, and the experiment is sized to detect a fall from eight percent to seven. At the usual significance and power, that needs ten thousand eight hundred and eighty-seven orders per arm, inflated slightly, by a factor of one point nought seven five, because a customer's repeat orders are correlated. With a hundred and eighty thousand orders a day, that is only about three hours of traffic. But the calendar, not the sample size, decides how long to run. Order mix and delivery performance follow a weekly cycle, so the experiment runs for fourteen days, two full cycles, and is read out on day twenty-one, once the last orders' labels have matured. Guardrails, checkout conversion, support contacts and latency, can stop it early for harm. Two rules protect the conclusion. No peeking: stopping at day three because the number looks good greatly inflates false wins. And there is one primary metric; everything else is secondary.",
}
