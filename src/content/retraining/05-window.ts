import type { Section } from '../types'

export const window: Section = {
  id: 'window',
  title: 'Label-eligible windows and reproducible candidates',
  scene: 'label-window',
  focus: 'window',
  slide: `## The training window ends where labels are complete

A retrain run today cannot use today's orders. Their labels have not **matured**, and including them biases the model.

### The May retrain, run on 1 May
- Training: 1 November to **17 April**, six months including December
- Validation: 18–24 April, the latest week with **matured** labels
- 25–30 April: **excluded**, labels not mature yet
- Holdout orders included and flagged

### If the window ran to yesterday
- Recent orders are mostly **"on time" so far**
- The model learns a risk that is too **low**

### Reproducible
- The window is a function of the run date, read from a **named** snapshot
- A rebuild gives the **same** rows`,
  narration:
    "A retrain run today cannot use today's orders, because their labels have not matured yet, and including them would bias the model. So the training window must end where the labels are complete. For the May retrain, run on the first of May, training covers six months, from the first of November to the seventeenth of April. Six months includes a December, so the seasonal shift from chapter eight is represented. Validation uses the eighteenth to the twenty-fourth of April, the most recent week whose labels have all matured. The last six days of April are excluded entirely, because many of those orders have not yet reached their promised date plus three days. The holdout orders from section three are included, and flagged. It is worth seeing what goes wrong otherwise. If the window ran up to yesterday, the most recent orders would mostly appear on time, simply because their late deliveries have not happened yet. The model would learn a risk that is systematically too low, and look fine on any validation set built the same way. Finally, the window is computed from the run date by a function, and reads a named snapshot, so the candidate can be rebuilt exactly, as chapter three requires.",
}
