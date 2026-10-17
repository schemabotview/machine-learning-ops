import type { Section } from '../types'

export const gates: Section = {
  id: 'gates',
  title: 'Pass/fail/inconclusive gate policies',
  scene: 'gates',
  focus: 'verdicts',
  slide: `## Three verdicts, declared in advance

A gate policy, written **before** the results are seen, turns the evidence into one of three verdicts. "Inconclusive" is a real answer.

### The policy
- **Hard** criteria: p99 latency, rural recall, calibration; any failure blocks
- **Quality**: pass if the whole 95% interval is ≤ −0.002
- Fail if the interval is entirely **worse** than the champion
- Otherwise **inconclusive**

### The verdicts
- v13: quality passes, but two hard criteria fail: **fail**
- v13-lite: all hard criteria pass; interval **−0.0018 to +0.0010**
- Slightly better or slightly worse: **inconclusive**

### What follows
- More data or an online test, never a quiet pass`,
  narration:
    "A gate policy turns the evidence into a verdict, and it must be written before anyone sees the results, or the thresholds drift towards whatever the candidate achieved. This policy has two parts. First, hard criteria: ninety-ninth percentile latency, rural recall and calibration. Any failure blocks the release, however good the rest looks. Second, a quality rule on the bootstrap interval of the log-loss difference. The candidate passes if the whole ninety-five percent interval is at or below minus nought point nought nought two. It fails if the whole interval shows it to be worse than the champion. Anything else is inconclusive. Version thirteen passes the quality rule, but fails two hard criteria, so the verdict is fail, with the reasons recorded. A lighter variant, thirteen lite, was built to meet the latency limit, and passes every hard criterion. But its interval runs from minus nought point nought nought one eight to plus nought point nought nought one, so it might be slightly better than the champion, or slightly worse. That is inconclusive. Inconclusive is a real answer, not a soft pass. It leads to more data, such as waiting for another month of matured labels, or to a controlled online test, and the champion keeps serving meanwhile.",
}
