import type { Section } from '../types'

export const automation: Section = {
  id: 'automation',
  title: 'Proportionate automation and platform choices',
  scene: 'automation',
  focus: 'levels',
  slide: `## Automation in proportion

More automation is not automatically better. Each tool is another system to run, so match the level to how the model is **used**.

### Four levels
- **Manual**: a notebook, hand-run; fine for a one-off analysis
- **Scripted**: package, tests, a scheduled job, versioned models
- **Pipeline**: orchestrated retraining, gates and a registry
- **Platform**: shared features, serving and monitoring for many models

### What justifies a step up
- How often the model **changes**, and what a bad one **breaks**
- Who is woken when it fails

### This retailer, today
- Checkout predictor: scripted, moving to a **pipeline**
- Planning job: **scripted** is enough`,
  narration:
    "More automation is not automatically better. Every tool added to an ML system is another system that has to be run, upgraded and understood, so the level of automation should match how the model is actually used. Four levels are a useful guide. Manual means a notebook run by hand, with the model file copied somewhere, which is fine for a one-off analysis and nothing more. Scripted means a package with tests, a scheduled job and versioned models, the minimum for any model someone depends on. A pipeline adds orchestrated retraining, validation gates and a model registry. A platform adds shared feature, serving and monitoring infrastructure used by many models and teams. Moving up a level is justified by a few questions. How often does the model change? What does a bad model break, and how quickly? Who owns it, and who is woken at three in the morning when it fails? And what will the new tool cost to keep running? For this retailer today, the checkout predictor sits in every checkout and retrains monthly, so it is moving from scripted to a pipeline. The daily planning job is one nightly job with one owner, and scripted is enough. The rest of the course builds these pieces only where they are justified.",
}
