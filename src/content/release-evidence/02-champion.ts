import type { Section } from '../types'

export const champion: Section = {
  id: 'champion',
  title: 'Protected data, champion/baseline, and uncertainty',
  scene: 'champion',
  focus: 'boot',
  slide: `## Candidate against champion

Compare the candidate with the model **now serving**, on a protected test set used for nothing else, and measure the uncertainty in the difference.

### The comparison (final-test results)
- 2,400 matured orders, never used to train, tune or select
- Baseline: zone average, log loss **0.4410**
- Champion v12: **0.3974**; candidate v13: **0.3936**
- Paired difference: **−0.0038**

### How sure is that?
- 1,000 paired bootstrap resamples of the per-order differences
- 95% interval **−0.0053 to −0.0023**
- The whole interval is **beyond** the −0.002 margin

### Why paired
- Both models score the **same** orders, so order difficulty cancels`,
  narration:
    "A candidate is compared with the model that is serving now, the champion, on a protected test set that is used for nothing else. The comparison needs an estimate of uncertainty, not just two numbers. The protected set here is two thousand four hundred matured orders, never used to train, tune or select any model. As a floor, a simple zone-average baseline scores a log loss of nought point four four one. The champion, version twelve, scores nought point three nine seven four, and the candidate, version thirteen, nought point three nine three six. The paired difference is minus nought point nought nought three eight. How sure can we be that this is a real improvement? Resampling the two thousand four hundred per-order differences a thousand times, with replacement, gives the distribution in the plot, and a ninety-five percent interval from minus nought point nought nought five three to minus nought point nought nought two three. The whole interval lies beyond the declared margin of minus nought point nought nought two, so on overall log loss the candidate passes. The comparison is paired, which matters. Both models are scored on exactly the same orders, so how hard each order is cancels out, leaving a much tighter interval than comparing two separate averages would.",
}
