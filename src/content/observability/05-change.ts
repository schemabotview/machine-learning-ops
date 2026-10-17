import type { Section } from '../types'

export const change: Section = {
  id: 'change',
  title: 'Skew, population/label/concept change, and seasonal references',
  scene: 'change',
  focus: 'kinds',
  slide: `## Kinds of change

"Drift" covers several different changes. They have different causes, and they do **different** things to model quality.

### Five kinds, at the retailer
- **Training–serving skew**: live distances in metres; hurts at **once**
- **Population shift**: lighter gift parcels in December; often **harmless**
- **Label shift**: a storm week, late rate 9% → 22%; hurts calibration
- **Concept change**: a new carrier, same features, new delays; hurts slowly
- **Selection change**: expedited orders skip the label; labels mislead

### Compared with what?
- **Training data**: what the model learned, but old
- **The last 4 weeks**: recent, but seasonal
- **The same week last year**: the seasonal match`,
  narration:
    "The word drift covers several different kinds of change. They have different causes, and they do different things to model quality, so it helps to name them. Training-serving skew means the live inputs differ from training because of a bug or a contract break, like distances arriving in metres. It hurts immediately. A population shift means the mix of inputs changes while the relationship stays the same, like the lighter gift parcels of December. It is often harmless, because the model has seen such parcels before. A label shift means the outcome rate itself changes, as in a storm week where the late rate rises from nine to twenty-two percent. The ranking may still be fine, but the predicted risks are too low, so calibration suffers. A concept change means the same inputs now lead to different outcomes, as when a new carrier with different delays takes over some zones. It hurts slowly, as the old relationship stops holding. And a selection change means which outcomes are observed changes, for example when expedited orders stop producing a normal label. Then the labels themselves mislead, which chapter nine returns to. Every comparison also needs a reference. Training data shows what the model learned, but is old. The last four weeks are recent, but seasonal. The same week last year is the seasonal match.",
}
