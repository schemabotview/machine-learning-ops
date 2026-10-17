import type { Section } from '../types'

export const tracking: Section = {
  id: 'tracking',
  title: 'Tracking metrics, artefacts, and dataset/split fingerprints',
  scene: 'tracking',
  focus: 'runs',
  slide: `## Tracking runs so they can be compared

An experiment tracker records parameters, metrics and artefacts per run. **Fingerprints** decide which of those runs can be compared at all.

### Three runs (validation evidence)
- A, the baseline: log loss **0.3941**, split cf1d81d1
- B adds weather_risk on the **same** split: **0.3902**
- C, same change, scores **0.3815**, but its split is 99c25f68
- C's validation set differs by **one** order id: not comparable

### What to log
- **Every** parameter, not only the tuned ones
- Metrics per split, and per step for training curves
- Artefacts: the model, its report, its plots
- Data and split **fingerprints** as tags

### The fingerprint
- A hash of the split's id list: one change gives a new value`,
  narration:
    "An experiment tracker records each run's parameters, metrics and artefacts, so runs can be compared later. Fingerprints decide which of those runs can be compared at all. Take three runs, all validation evidence. Run A, the baseline gradient-boosted model, scores a log loss of nought point three nine four one, on a split whose fingerprint is c f 1 d 8 1 d 1. Run B adds a weather risk feature and is evaluated on the same split, with the same fingerprint, scoring nought point three nine nought two, a fair improvement. Run C makes the same change and scores better still, nought point three eight one five. But its split fingerprint is different. Its validation set differs from A's by a single order identifier, enough to make the comparison invalid, and a difference that would be invisible without the fingerprint. So log every parameter, not only the ones being tuned, because a default that changes between library versions is still a parameter. Log metrics per split, and per step when training curves matter. Log the artefacts: the model, its evaluation report and its plots. And tag every run with the data and split fingerprints. A fingerprint is a hash of the split's identifier list, so any change at all produces a new value.",
}
