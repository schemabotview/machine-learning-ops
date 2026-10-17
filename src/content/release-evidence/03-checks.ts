import type { Section } from '../types'

export const checks: Section = {
  id: 'checks',
  title: 'Subgroup/robustness/calibration and resource checks',
  scene: 'checks',
  focus: 'table',
  slide: `## Better on average is not enough

v13 wins on overall log loss. The release review checks what the average **hides**, and what the serving contract **requires**.

### The review (final-test results and a load test)
- Overall log loss: v13 better by 0.0038: **pass**
- Late recall in rural zones: 0.66 against a floor of 0.70: **fail**
- Calibration error 0.019, under 0.03: pass
- New customers 0.449, within v12 + 0.01: pass
- p99 latency at 40 requests/s: **182 ms** against 150: **fail**
- Memory per replica 760 MB, under 1 GB: pass

### Why these checks
- **Subgroups**: an average can improve while one group gets worse
- **Calibration**: the risk value itself sets the delivery window
- **Resources**: a better model that breaks the latency contract is not deployable`,
  narration:
    "Version thirteen wins on overall log loss, but better on average is not enough. The release review checks what the average hides, and what the serving contract requires. Overall log loss improves by nought point nought nought three eight, a pass. But late-delivery recall in rural zones falls to nought point six six, below the declared floor of nought point seven, a fail. Rural orders are a minority, so the average improved while one group of customers got worse. Calibration error is nought point nought one nine, under the limit of nought point nought three, which matters because the predicted risk itself sets the delivery window shown at checkout. On orders from new customers, a robustness check for people the model has not seen before, log loss is within the allowed tolerance, so that passes. Then the resource checks, from a load test at forty requests a second. The candidate's ninety-ninth percentile latency is a hundred and eighty-two milliseconds, against a limit of a hundred and fifty, because it is a much larger ensemble. That is a fail. The champion, after the feature-cache fix from chapter one, runs at a hundred and twenty-one. Memory is seven hundred and sixty megabytes, under the limit. A more accurate model that breaks the latency contract is simply not deployable.",
}
