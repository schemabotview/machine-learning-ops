import type { Section } from '../types'

export const layers: Section = {
  id: 'layers',
  title: 'Software contracts versus statistical evaluation',
  scene: 'layers',
  focus: 'table',
  slide: `## Layers of verification

A candidate is checked in three layers. They answer **different** questions, and they produce different **kinds** of result.

### Software and data: pass or fail
- predict() returns a risk between 0 and 1; the bundle loads in the serving image
- The test set meets contract v3
- Run them again and you get the **same** answer

### Model: an estimate with uncertainty
- Log loss against the champion; late recall in rural zones
- Run them on other data and you get a **different** number
- The result is an estimate **±** an interval, not a yes or no

### So a gate needs both
- **Deterministic** checks: any failure blocks
- **Statistical** checks: a declared margin, read against uncertainty`,
  narration:
    "Before a candidate model can be released, it is checked in three layers, and those layers answer different questions and produce different kinds of result. The software layer asks whether the code runs correctly. Does predict return a risk between nought and one? Does the bundle load in the serving image? The data layer asks whether the inputs are valid: does the protected test set meet the dataset contract? Both of these give a pass or a fail, and running them again gives the same answer. The model layer asks whether the candidate is good enough: its log loss compared with the current champion, or its recall of late deliveries in rural zones. These results are estimates. Computed on a different sample of orders, they would give a slightly different number, so each one is an estimate with an interval around it, not a yes or no. A release gate therefore needs both kinds of rule. Deterministic checks are simple: any failure blocks the release. Statistical checks need more care. They need a declared margin, the improvement that would actually matter, and they have to be read against the uncertainty in the estimate. The next sections build both, using the late-risk candidate, version thirteen.",
}
