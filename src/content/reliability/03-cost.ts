import type { Section } from '../types'

export const cost: Section = {
  id: 'cost',
  title: 'Cost attribution and measured quality–latency–cost trade-offs',
  scene: 'cost',
  focus: 'compare',
  slide: `## What a better model costs

Put a price on each option, at the **same** latency contract, and attribute the bill to the model that causes it.

### Two models, both meeting p99 ≤ 150 ms
- 31,104,000 calls a month; £0.18 per replica-hour, **assumed**
- v14: 4 replicas, **£518** a month, £0.0167 per 1,000 calls
- v13: **8** replicas for the same p99, £1,037 a month
- v13 is better by **0.0005** log loss

### Reading it
- **Twice** the cost for a gain inside run-to-run noise (ch 3)
- Worth it only if it moves the **objective**, shown by an experiment

### Attribution
- Serving, feature reads, training and storage, each charged to its **owner**
- Unattributed, a **doubled** bill goes unseen`,
  narration:
    "A more accurate model usually costs more to run, so put a price on each option, at the same latency contract, and attribute the bill to the model that causes it. The checkout predictor handles thirty-one million one hundred and four thousand calls a month, and a replica is assumed to cost eighteen pence an hour. Version fourteen, a gradient-boosted model of three hundred trees, meets the ninety-ninth percentile contract on four replicas, about five hundred and eighteen pounds a month, or under two pence per thousand calls. Version thirteen, the larger ensemble from chapter five, needs eight replicas to meet the same latency, about one thousand and thirty-seven pounds a month. And it is better by just five ten-thousandths of log loss. Read together, that is twice the cost for a gain that sits inside the run-to-run noise measured in chapter three. It would only be worth paying if the gain moved the product objective, fewer broken delivery promises, and that can only be shown by an experiment, not by the offline score. Making these trade-offs visible needs cost attribution. Serving replicas are charged to the late-risk model in each environment, feature-store reads to each model by read count, training runs to the pipeline's run key, and logs and storage to their owning model by volume.",
}
