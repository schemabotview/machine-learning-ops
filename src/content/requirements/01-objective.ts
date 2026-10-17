import type { Section } from '../types'

export const objective: Section = {
  id: 'objective',
  title: 'Prediction, action, outcome, and product objective',
  scene: 'objective',
  focus: 'systems',
  slide: `## From a model score to a system

A model produces a **prediction**. The system around it takes an **action**, an **outcome** follows, and the product is judged on an **objective**.

### The retailer's two systems
- **Checkout predictor**: P(late) = 0.31 → show a wider delivery window
- Outcome: on time or late, known only **days** later
- **Daily planning job**: tomorrow's durations → assign drivers overnight
- Objective: cost per delivery, not prediction error

### Four claims, kept apart
- **Software correctness**: tests and contract checks
- **Model quality**: validation and test metrics
- **Business utility**: a controlled experiment on the objective
- **Operational health**: latency, errors, freshness
- A healthy, correct service can still **hurt** the objective`,
  narration:
    "A machine learning model on its own only produces a prediction. An operational system wraps that prediction in an action, an outcome follows from the action, and the product is judged on an objective that may be several steps away from the model's own score. This course follows the retailer from the Machine Learning course, which now runs two separate systems. The checkout predictor scores each order as it is placed. A late-delivery risk of nought point three one leads the checkout page to show a wider delivery window, and whether the parcel actually arrives on time is only known days later. The daily planning job runs overnight, predicts tomorrow's delivery durations, and the logistics team uses them to assign drivers, so its objective is cost per delivery, not prediction error. Throughout the course, four kinds of claim are kept apart, because each needs different evidence. Software correctness is shown by tests and contract checks. Model quality is shown by validation and test metrics. Business utility needs a controlled experiment on the objective itself. And operational health is shown by latency, errors and freshness. Evidence for one never establishes another: a healthy, correct service can still serve a model that makes the product worse.",
}
