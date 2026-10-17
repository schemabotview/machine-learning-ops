import type { Section } from '../types'

export const interfaces: Section = {
  id: 'interfaces',
  title: 'Training/preprocessing/inference software interfaces',
  scene: 'interfaces',
  focus: 'parts',
  slide: `## From a notebook to components

A notebook mixes loading, features, training and scoring in one place. Production needs **components** with stated inputs and outputs.

### Five components
- **load_orders**: a named snapshot in, a frame out
- **build_features**: one pure function, used by **all three** callers
- **train** and **evaluate**: model and report as explicit outputs
- **score_batch** for the nightly job; **predict** for one request

### Why one feature function
- Training, batch and online all call **the same** build_features
- Two copies drift apart, and the model sees different inputs live
- as_of makes the time boundary part of the **signature**

### The output says who made it
- Every Prediction carries its **model_version**`,
  narration:
    "A modelling notebook usually does everything in one place: it loads data, builds features, trains, evaluates and scores, with state passed between cells. A production system needs those steps as components with stated inputs and outputs. Here the notebook becomes five. Load orders takes a named snapshot and returns a frame. Build features is a single pure function. Train and evaluate return a model and a report as explicit outputs, rather than leaving them in memory. And there are two scoring entry points: score batch for the nightly planning job, and predict for one checkout request. The most important choice is that training, the batch job and the online service all call the same build features function. If each has its own copy, the copies drift apart over time, and the model starts receiving different inputs in production from the ones it was trained on. Passing an as-of time into the function makes the time boundary part of its signature, so it is hard to use a column that would not have been known yet. Finally, the prediction type carries the model version that produced it. Every output in the system should say which model made it, or nothing downstream can be traced.",
}
