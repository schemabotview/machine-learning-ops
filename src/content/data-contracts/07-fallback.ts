import type { Section } from '../types'

export const fallback: Section = {
  id: 'fallback',
  title: 'Missing/stale features and fallback semantics',
  scene: 'fallback',
  focus: 'policies',
  slide: `## When a feature is missing or stale

Decide, per feature, what the model receives when a value is missing or too old, and whether it ever saw that case in **training**.

### The checkout predictor's policy
- zone_delay_3h, older than 30 min: zone median **plus a flag**
- customer_late_rate: missing for new customers, so an **indicator**
- distance_km missing: **refuse**, answer with the rule-based window
- weather_risk stale: sends 0, a value the model reads as **normal**

### Four semantics
- **Impute** a training statistic; add an **indicator** the model learned
- **Refuse**, and say so in the response
- A **silent default** looks like real data: the dangerous one`,
  narration:
    "Every feature will sometimes be missing or too old, so the policy has to be decided per feature, and it has to match what the model saw in training. For the zone delay feature, a value older than thirty minutes is replaced by the zone's weekly median, and an indicator flag is set. Two percent of training rows were imputed the same way, so the model has learned how much to trust that value. The customer late rate is missing for every new customer, so the model receives a missing indicator, again a case it saw many times in training. Distance is essential: without it the service refuses to predict and answers with the rule-based delivery window. The fourth row is the problem. A stale weather risk is replaced by zero, which the model reads as normal weather, and it never saw substituted values in training. That is a silent default. It looks like real data, nothing records that it happened, and on a stormy day it quietly removes the model's most useful signal. So there are four semantics: impute a training statistic, add an indicator the model learned, refuse openly, or the silent default, which should be avoided. Whichever is used, stale features are named in the response and in the logs.",
}
