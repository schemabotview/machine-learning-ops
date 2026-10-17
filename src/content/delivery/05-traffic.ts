import type { Section } from '../types'

export const traffic: Section = {
  id: 'traffic',
  title: 'Traffic allocation, sticky units, and guardrails',
  scene: 'traffic',
  focus: 'assign',
  slide: `## Who gets the canary, and when to stop

Assign the canary by a **stable unit**, here the customer, and decide in advance the **guardrails** that abort it.

### Sticky assignment
- hash(salt, customer_id) mod 100; buckets 0–4 get v14
- Over 20,000 customers that gives **4.9%**
- A customer stays in the **same** arm for every checkout
- Per-request assignment would put **26%** of six-order customers in both

### Why the customer
- One customer should see **one** delivery-window policy
- Mixed exposure makes any later comparison hard to read

### Guardrails, every 5 minutes
- Error rate over 0.5%, or p99 over 150 ms, for 10 minutes
- A fallback rate over **twice** the stable arm's
- Mean predicted risk shifting by more than 0.05`,
  narration:
    "A canary should be assigned by a stable unit, and its abort conditions should be decided before it starts. Here the unit is the customer. Each customer identifier is hashed together with a salt for this rollout, and the result taken modulo a hundred. Customers in buckets nought to four get version fourteen. Across twenty thousand customers that gives four point nine percent, close to the intended five, and because the hash never changes, a customer stays in the same arm for every checkout during the canary. Assigning by request instead, with a five percent coin flip each time, would put twenty-six percent of customers with six checkouts into both arms. The customer is the right unit because one customer should see one delivery-window policy. Seeing a narrow window on Monday and a wide one on Tuesday is confusing for them, and mixed exposure makes any later comparison between the arms hard to interpret. Then the guardrails, checked every five minutes on the canary arm. Abort if the error rate exceeds half a percent, or the ninety-ninth percentile latency exceeds a hundred and fifty milliseconds, for ten minutes. Abort if the fallback rate is more than twice the stable arm's. And abort if the mean predicted risk shifts by more than nought point nought five.",
}
