import type { Section } from '../types'

export const branches: Section = {
  id: 'branches',
  title: 'Validation/preparation/training/evaluation branches',
  scene: 'branches',
  focus: 'runs',
  slide: `## Gates make branches

Gates turn a straight pipeline into **branches**. A run can end as a candidate, or stop early for a stated reason, and both are normal outcomes.

### Two gates
- **Data gate**: does the snapshot meet its contract?
- **Evaluation gate**: does a new model beat the champion by the declared margin?
- Between them, GBM and logistic train **in parallel**

### Three monthly runs (validation evidence)
- January: both gates pass; GBM 0.3941 beats 0.3990, a **candidate**
- February: **1.2%** of distances in metres, so it stops at the data gate
- March: 0.3951 against 0.3941, **no gain**; the champion stays

### A stop is not a failure
- Each stop names its reason and its owner`,
  narration:
    "Gates turn a straight pipeline into branches. A run can end as a candidate model, or it can stop early for a stated reason, and both are normal outcomes of a healthy pipeline. This pipeline has two gates. The data gate asks whether the new snapshot meets its contract. The evaluation gate asks whether a newly trained model beats the current champion by a declared margin. Between the two, a gradient-boosted model and a logistic regression train in parallel, since neither depends on the other. Three monthly runs show the branches in use. In January both gates pass. The gradient-boosted model scores a validation log loss of nought point three nine four one, against the champion's nought point three nine nine, so the run ends with a candidate for release review. In February, one point two percent of distances arrive in metres, the source error from chapter two, so the run stops at the data gate and alerts the data owner, before any compute is spent on training. In March both models train, but the best scores nought point three nine five one against the new champion's nought point three nine four one, so there is no gain and the champion stays. None of these is a failure. Each stop names its reason and its owner.",
}
