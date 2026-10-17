import type { Section } from '../types'

export const policies: Section = {
  id: 'policies',
  title: 'Monitoring/feedback/maintenance policies',
  scene: 'policies',
  focus: 'table',
  slide: `## Operating policies, per system

The two systems run under **different** policies, written down side by side so the differences are deliberate.

### Checkout predictor
- **99.9%** of requests good within 150 ms, over 30 days
- Weekly log loss ≤ 0.40 on matured labels
- A 5% **holdout** for unbiased feedback
- Monthly gated retrain; approval and a 48-hour canary

### Daily planning job
- Published by 05:00 on **99%** of nights
- Weekly duration error ≤ 0.6 hours
- Quarterly gated retrain; approval and a **7-night shadow**

### Why they differ
- Labels: 7 days for risk, **1 day** for duration
- Who is harmed: **customers**, or planners
- A canary would split one night's plan, hence **shadow**`,
  narration:
    "The two systems run under different policies, and writing them side by side makes the differences deliberate rather than accidental. The checkout predictor's service objective is ninety-nine point nine percent of requests answered well within a hundred and fifty milliseconds, over thirty days. Its quality check is a weekly log loss of at most nought point four, on matured labels. Drift is watched with stability scores and range rules against a seasonal reference. Feedback is kept honest by the five percent holdout of flagged orders that are never expedited. It produces a gated candidate every month, and promotion needs an approval and a forty-eight hour canary. The daily planning job's objective is different in kind: scores published by five in the morning on ninety-nine percent of nights. Its quality check is a weekly mean absolute error in predicted duration of at most nought point six hours. It retrains quarterly, and promotion needs an approval and a seven-night shadow run, since a canary would split one night's routing plan in two. The differences have reasons. Risk labels take seven days to mature, while duration is known the day after delivery. A bad checkout prediction harms customers directly, while a bad plan is seen first by planners. And the checkout model changes monthly, the planning model quarterly.",
}
