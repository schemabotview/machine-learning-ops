import type { Section } from '../types'

export const contracts: Section = {
  id: 'contracts',
  title: 'Quality/latency/freshness/availability/cost contracts',
  scene: 'contracts',
  focus: 'latency',
  slide: `## Five contracts, each measurable

A requirement only helps if it says **what** is measured, **how**, and against which target.

### The checkout predictor's contract
- **Quality**: late-risk log loss ≤ 0.40 on matured labels
- **Latency**: p99 ≤ 150 ms; **freshness**: features ≤ 15 min old
- **Availability**: 99.9% over 30 days leaves **43.2 minutes** of failure
- **Cost**: ≤ £0.20 per 1,000 calls

### Reading one week (production observation)
- p50 **38 ms** and p95 **54 ms** look healthy
- p99 is **189 ms**: the contract is **broken**
- 32 of 2,000 requests exceed 150 ms: a slow tail from cold feature reads
- The mean, **40.6 ms**, would have hidden it entirely
- The fix targets the tail: **warm** the feature cache
- Each contract names an **owner** who acts on a breach`,
  narration:
    "A requirement only helps if it says what is measured, how it is measured, and against which target. The checkout predictor has five such contracts. Quality: a late-risk log loss no higher than nought point four, measured weekly on orders whose labels have matured. Latency: the ninety-ninth percentile at or under a hundred and fifty milliseconds, per request. Freshness: features no more than fifteen minutes old at request time. Availability: ninety-nine point nine percent over thirty days, which leaves an error budget of forty-three point two minutes of failure a month. And cost: no more than twenty pence per thousand calls. Now read one week of production observations, two thousand checkout requests. The median is thirty-eight milliseconds and the ninety-fifth percentile fifty-four, both comfortably inside the target. But the ninety-ninth percentile is a hundred and eighty-nine milliseconds, so the latency contract is broken. Thirty-two of the two thousand requests take more than a hundred and fifty milliseconds, a slow tail caused by cold reads from the feature store. An average latency would have hidden this entirely, which is why latency contracts are written against percentiles, and why each contract names its measurement as well as its target.",
}
