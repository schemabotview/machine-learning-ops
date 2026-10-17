import type { Section } from '../types'

export const proportion: Section = {
  id: 'proportion',
  title: 'Minimal viable lifecycle versus justified platform expansion',
  scene: 'proportion',
  focus: 'table',
  slide: `## Enough lifecycle, and when to add more

The design is deliberately **small**. Each larger capability waits for a signal that would justify its upkeep.

### Today, and the signal for more
- **Feature store**: one online store; expand when teams share features
- **Orchestration**: one pipeline per model; expand at many models
- **Serving**: a managed endpoint; review at five models
- **Experiments**: planned by hand; tooling once tests run monthly
- **Streaming**: not built; only for sub-minute freshness

### The habits that carry over
- Contracts with owners; identities for everything that changes a result
- Gates and rollouts that can stop; fallbacks that say so
- Evidence labelled for what it is`,
  narration:
    "The design in this course is deliberately small, and the last question is when it should grow. The answer is that each larger capability waits for a signal that would justify the cost of running it. Today there is one online feature store with two feature views. A full shared feature platform becomes worth it when several teams start sharing features. There is one pipeline per model, and a shared orchestration layer becomes worth it with many models that share steps. Serving uses a managed endpoint, to be reviewed if the number of models reaches five. Experiments are planned and analysed by hand, and dedicated tooling makes sense once tests run every month. Streaming features are not built at all, and should only be built if a use appears that needs freshness under a minute, which the late-risk model does not. What carries over to any system, at any size, is a set of habits. Contracts, each with an owner. Identities for everything that can change a result. Gates and rollouts that are allowed to stop. Fallbacks that say they are fallbacks. And evidence labelled for exactly what it is. For more depth, the companion courses take over: Machine Learning for models and evaluation, Deep Learning for neural training, Probability and Statistics for experiment theory, and the cloud and security courses for infrastructure.",
}
