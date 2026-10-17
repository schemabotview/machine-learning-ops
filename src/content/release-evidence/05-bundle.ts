import type { Section } from '../types'

export const bundle: Section = {
  id: 'bundle',
  title: 'Complete inference bundles and signatures',
  scene: 'bundle',
  focus: 'files',
  slide: `## A complete inference bundle

A model file alone cannot reproduce its validation scores. The **bundle** holds everything the runtime needs to compute exactly what was evaluated.

### What is inside
- The fitted model **and** its preprocessing: encoders, imputers, scalers
- A **signature**: every input field, type and unit, and the outputs
- The **feature version** it was trained on: checkout_features@5
- The exact **library** versions
- The **evaluation report**, the evidence it passed
- A **hash** of every file

### The signature in use
- The server validates each request against it
- late_risk is declared in the range [0, 1]

### Missing one piece
- Without the preprocessing, inputs change **silently**`,
  narration:
    "A model file on its own cannot reproduce the scores it was validated with. What gets released is a bundle, holding everything the serving runtime needs to compute exactly what was evaluated. Inside the bundle is the fitted model, and alongside it the preprocessing it was trained with, the category encoders, imputers and scalers, because a model fed differently encoded inputs produces different predictions with no error at all. There is a signature, listing every input field with its type and unit, and every output, so the server can validate each request before predicting, and callers know that late risk will lie between nought and one. There is the feature version the model was trained on, checkout features version five, so the runtime reads the right features. There are the exact library versions, because some formats cannot be loaded across versions and some numerical results drift. There is the evaluation report, the evidence it passed its gates, which an audit or a later rollback will need. And there is a hash of every file, so integrity can be checked before anything is loaded. Each missing piece fails in its own way, and the worst ones fail silently. Without the preprocessing, inputs change without any error.",
}
