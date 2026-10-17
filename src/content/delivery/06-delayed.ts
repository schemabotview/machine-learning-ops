import type { Section } from '../types'

export const delayed: Section = {
  id: 'delayed',
  title: 'Delayed outcomes and deployment-versus-experiment claims',
  scene: 'delayed',
  focus: 'claims',
  slide: `## What a canary can and cannot show

Late-delivery labels arrive **days** after checkout. A canary that ends after two days has seen almost none of them.

### Label maturity for canary orders
- Day 2: **0%** of labels matured
- Day 4: **34%**; day 7: **100%**
- A 48-hour canary sees operational evidence only

### Claims, and when the evidence exists
- **Runs safely**: errors, latency, fallbacks, within hours
- **Scores like offline**: live score distribution, day 1
- **Predicts better live**: log loss on matured labels, from day 7
- **Improves the product**: needs a randomised experiment

### Shadow
- A shadow model's "better" scores show **nothing** about outcomes`,
  narration:
    "Late-delivery labels arrive days after checkout, because the delivery has to happen, and the label is only final three days after the promised date. A canary that ends after two days has therefore seen almost none of its own outcomes. For canary orders, the plot shows the share with a matured label by day after checkout. By day two it is zero. By day four it is thirty-four percent, and by day seven it is complete. So a forty-eight-hour canary gathers operational evidence only. It is worth being exact about which claims each kind of evidence supports, and when. That version fourteen runs safely is shown by errors, latency and fallback rates, within hours. That it scores live traffic the way it scored offline data is shown by comparing live and offline score distributions, from the first day. That it predicts better on live traffic needs log loss on matured labels, which exists only from about day seven. And that it improves the product, fewer broken delivery promises, needs a randomised comparison on the objective itself, which is an experiment, covered in chapter nine. Shadow deployments are the extreme case. A shadow model never acts, so however good its scores look, they show nothing about the outcomes its actions would have caused.",
}
