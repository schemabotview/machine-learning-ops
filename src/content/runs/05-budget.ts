import type { Section } from '../types'

export const budget: Section = {
  id: 'budget',
  title: 'Resource estimates, scheduling, and bounded trial budgets',
  scene: 'budget',
  focus: 'search',
  slide: `## Estimate first, then bound the search

Estimate a job's cost **before** running it, and give tuning a fixed budget, declared in advance and the same for every candidate.

### The estimate
- One trial: **6 minutes** on 8 CPUs, 16 GB
- 40 trials: **4 CPU-hours**; on 4 workers, **1 hour** of wall time
- Ten trials take 0.3 hours; the budget is a **choice**, not a guess

### What the search found (validation evidence)
- The best, **0.3941**, came at trial **6**
- The other 34 trials found nothing better
- The best of many trials is **optimistic**: it was selected on validation

### Scheduling
- Fixed resources per trial, so trials can share a queue
- A **declared** budget makes comparisons between candidates fair`,
  narration:
    "Every training job costs time and compute, so estimate the cost before running it, and give hyperparameter tuning a fixed budget that is declared in advance and the same for every candidate. The estimate here is simple. One trial of the gradient-boosted model takes about six minutes on eight CPUs with sixteen gigabytes of memory. Forty trials are therefore four CPU-hours, and on four parallel workers about one hour of wall time. Ten trials would take a fifth of an hour. The budget is a choice to make deliberately, not something to discover afterwards. The plot shows what this search actually found, as validation evidence. The best log loss, nought point three nine four one, appeared at trial six. The remaining thirty-four trials found nothing better, so in hindsight most of the budget bought confirmation rather than improvement. There is a subtler point too: the best of many trials is optimistic, because it was selected using the very validation set it is scored on, so its true performance is likely a little worse. On the scheduling side, giving every trial the same fixed resources lets trials share one queue. And a declared budget is what makes comparisons between candidates fair: a model tuned for ten times longer has not proved a better design.",
}
