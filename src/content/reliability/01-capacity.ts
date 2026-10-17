import type { Section } from '../types'

export const capacity: Section = {
  id: 'capacity',
  title: 'Demand/resource envelopes, queues, and autoscaling',
  scene: 'capacity',
  focus: 'estimate',
  slide: `## Sizing from the demand envelope

Capacity is estimated from the **shape** of demand and stated assumptions, then checked against what is measured.

### The demand
- Mean **12** requests/s; a peak of **40** at 19:00
- A sale day is **assumed** to triple the peak: 120 requests/s

### The assumptions
- One replica: **133** requests/s (ch 7), run at **50%**: 67
- The fleet must survive losing **one of two zones**

### The estimate
- Normal day: 1 replica at 50%, so **2** to survive a zone
- Sale day: 2 at 50%, so **4** to survive a zone
- Autoscaling follows the day; the **minimum** covers a zone

### What it is not
- A benchmark: re-measure when the model changes`,
  narration:
    "Capacity is estimated from the shape of demand and a few stated assumptions, and then checked against what is actually measured. The checkout predictor's demand follows the shopping day. It averages twelve requests a second, falls almost to nothing overnight, and peaks at forty requests a second at seven in the evening. A sale day is assumed to triple that peak, to a hundred and twenty. That is an assumption, written down, not a forecast anyone has proved. One replica can handle about a hundred and thirty-three requests a second, from the queueing analysis in chapter seven, but it is run at fifty percent utilisation, about sixty-seven requests a second, to stay well left of the latency knee. And the fleet must survive losing one of its two availability zones, which means each zone must be able to carry the whole peak alone. On a normal day the peak fits on one replica at fifty percent, so two replicas, one per zone, survive a zone loss. On a sale day the peak needs two replicas, so four are needed to survive a zone loss. Autoscaling then follows the daily curve, while the minimum replica count covers the zone loss. None of this is a benchmark. When the model or its features change, the per-replica capacity is measured again.",
}
