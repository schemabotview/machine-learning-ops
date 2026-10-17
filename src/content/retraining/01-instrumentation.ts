import type { Section } from '../types'

export const instrumentation: Section = {
  id: 'instrumentation',
  title: 'Prediction/action/outcome and exposure instrumentation',
  scene: 'instrumentation',
  focus: 'events',
  slide: `## Recording what happened, in order

Learning from deployment needs four events per order, joined by one **prediction_id**: what was predicted, shown, done, and what followed.

### The four events
- **Prediction**: risk 0.64 from v14, with its features
- **Exposure**: the window "3–5 days" shown, and the experiment arm
- **Action**: operations expedited the order at 15:40
- **Outcome**: delivered on day 2, on time

### Why the action event matters
- Without it, the on-time delivery looks like the model was **wrong**

### The action record
- Which action, decided by which rule or person, and when
- Whether the order was in the **holdout** that is never acted on`,
  narration:
    "A deployed model generates evidence, but only if the system records what happened, in order, for every prediction. That takes four events per order, joined by one prediction identifier. The prediction event records what the model said: a risk of nought point six four from version fourteen, with the features it used. The exposure event records what the customer actually saw, a delivery window of three to five days, and which experiment arm they were in. The action event records what was done because of the prediction: here, operations expedited the order at twenty to four. And the outcome event records what followed: the parcel was delivered on day two, on time. The action event is the one most often missing, and it matters most. Without it, an on-time delivery for a high-risk order looks as though the model was simply wrong, and the next model learns that such orders are safe. With it, the outcome is read correctly, as the result of an intervention. So the action record says which action was taken, whether it was decided by a rule or a person, and when. It also says whether the order was in a small holdout group that is deliberately never acted on, which the next sections rely on.",
}
