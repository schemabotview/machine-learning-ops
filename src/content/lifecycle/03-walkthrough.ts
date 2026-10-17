import type { Section } from '../types'

export const walkthrough: Section = {
  id: 'walkthrough',
  title: 'Pipeline/gate/promotion/serving walkthrough',
  scene: 'walkthrough',
  focus: 'steps',
  slide: `## One change, end to end

Follow late-risk v14 from new data to full traffic. Each step leaves **evidence**, and each could have **stopped** it.

### The path
- 1 April 03:00: retrain from a **matured** window
- 04:10 gates pass; 04:15 register v14, immutable
- 2 April: staging load test, p99 **121 ms**
- 3 April 09:12: **approval**, recorded
- 3–5 April: shadow, then a **5% canary** by customer
- 5 April 09:30: the alias moves; responses say **v14**
- From 12 April: quality on matured labels, weekly

### Exits
- A **gate** could fail or be inconclusive
- **Staging** could reveal latency or loading problems
- The **canary** could breach a guardrail

### Evidence
- Every step leaves a record a reviewer can **check**`,
  narration:
    "The clearest test of a lifecycle design is to follow one change all the way through it. Here is the late-risk model, version fourteen, from new data to full traffic. At three in the morning on the first of April, the monthly pipeline retrains from a window that ends where labels are matured. By ten past four, the data and evaluation gates have passed, and at quarter past, version fourteen is registered as an immutable version with its lineage. On the second, staging loads it against the staging feature store, the signature is validated, and a load test shows a ninety-ninth percentile of a hundred and twenty-one milliseconds. On the third, at twelve minutes past nine, a release approver signs it off, and the approval is recorded. From the third to the fifth, it runs first in shadow and then as a five percent canary assigned by customer, and every guardrail holds. At half past nine on the fifth the champion alias moves, the pods reload, and responses start carrying version fourteen. From the twelfth onwards, once labels mature, weekly quality reports follow. Just as important are the exits. A gate could have failed or been inconclusive. Staging could have revealed a latency or loading problem. And the canary could have breached a guardrail. Each exit is a normal outcome, not a failure of the process.",
}
