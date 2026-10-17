import type { Section } from '../types'

export const distinctions: Section = {
  id: 'distinctions',
  title: 'Integration, delivery, deployment, and training distinctions',
  scene: 'distinctions',
  focus: 'loops',
  slide: `## Four loops, not one

"CI/CD" in an ML system covers four separate loops. Each has its own **trigger**, its own **output**, and things it must not do.

### The four loops
- **Integration**: a code change → a tested image, built once
- **Training**: new data or a schedule → a candidate with its evidence
- **Delivery**: a passing candidate → a release ready to deploy
- **Deployment**: an approved release → traffic on the new version

### Keeping them separate
- Continuous training produces candidates; it does **not** deploy them
- A code change rebuilds the image; it does **not** retrain the model
- Deployment changes what serves; it does **not** prove the model helps`,
  narration:
    "In an ML system, the phrase CI CD covers four separate automated loops, each with its own trigger, its own output, and things it must not do. Continuous integration is triggered by a code change. It runs the tests and builds the serving image, once, producing a tested artefact. Continuous training is triggered by new data or a schedule, the retraining pipeline from chapter four, and produces a candidate model together with its evidence. Continuous delivery takes a candidate that passed its gates and turns it into a release: a specific bundle with a specific image, ready to deploy. And deployment takes an approved release and actually moves traffic onto it. Keeping them separate matters. Continuous training produces candidates, but must not deploy them automatically: a model that passes its offline gates still needs a controlled rollout. A code change rebuilds the image, but does not retrain the model, so a refactor cannot silently change predictions. And deployment changes what is serving, but does not, on its own, prove that the new model helps the product. Each loop can then fail, be paused or roll back on its own. A broken training run does not block a security patch, and a security patch does not slip a new model into production.",
}
