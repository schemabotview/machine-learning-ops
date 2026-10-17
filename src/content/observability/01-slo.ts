import type { Section } from '../types'

export const slo: Section = {
  id: 'slo',
  title: 'SLIs/SLOs, windows, error budgets, and ownership',
  scene: 'slo',
  focus: 'burn',
  slide: `## Objectives and error budgets

An **SLI** measures something users feel; an **SLO** sets its target over a window. What the target allows to fail is the **error budget**.

### The checkout predictor in April
- SLI: the share of requests answered well, within 150 ms
- SLO: **99.9%** over 30 days
- 31,104,000 requests, so the budget is **31,104** bad ones

### Where it went (production observation)
- Day 6, a feature-store failover: 16,200, **52%** of the budget
- Day 14, a bad config push: 9,600, **31%**
- Day 23, a node drain: 3,168, **10%**
- **93%** spent by day 23

### Using it
- With budget left, ship; with it **spent**, freeze risky changes`,
  narration:
    "Observability starts with deciding what matters to users and how much failure is acceptable. A service level indicator, or SLI, measures something users actually feel. For the checkout predictor it is the share of requests answered well, meaning successfully and within a hundred and fifty milliseconds. A service level objective, or SLO, sets a target for that indicator over a window, here ninety-nine point nine percent over thirty days. Whatever the target allows to fail is the error budget. At an average of twelve requests a second, April has thirty-one million one hundred and four thousand requests, so the budget is thirty-one thousand one hundred and four bad ones. The plot shows how April spent it, all production observation. On day six, a nine-minute feature-store failover cost sixteen thousand two hundred bad requests, fifty-two percent of the budget in one go. On day fourteen, a bad configuration push cost nine thousand six hundred, another thirty-one percent. On day twenty-three, draining a node pool degraded a fifth of requests for twenty-two minutes, ten percent more. By day twenty-three, ninety-three percent is gone. The budget then guides decisions. While budget remains, the team can ship changes. Once it is spent, risky changes wait until reliability is restored, and each SLO has a named owning team.",
}
