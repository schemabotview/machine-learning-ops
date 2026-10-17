import type { Section } from '../types'

export const feedback: Section = {
  id: 'feedback',
  title: 'Selective labels, interventions, and feedback bias',
  scene: 'feedback',
  focus: 'numbers',
  slide: `## When the model's actions change its labels

Operations expedite orders the model flags as high-risk. That **changes** the outcomes the next model will learn from.

### The numbers, for orders with predicted risk above 0.6
- Left alone, **60%** would be late
- Expedited, only **15%** are late
- 80% are expedited, so training sees a late rate of **24%**
- The next model learns these orders are **low** risk, and stops flagging them

### Keeping the labels honest
- A random **5% holdout** is never expedited: 200 orders a week
- It shows the true rate, **≈ 60%**
- **Log the action**, and train on orders that were not acted on
- Or change the **target**: risk if not expedited`,
  narration:
    "Here the system's own success creates a problem. Operations expedite the orders that the model flags as high risk, and that changes the outcomes the next model will learn from. Consider the orders with a predicted risk above nought point six. Left alone, sixty percent of them would arrive late. Expedited, only fifteen percent do. Eighty percent of these orders are expedited, so in the training data the late rate for this group is twenty-four percent, not sixty. A model retrained on those labels learns that these orders are fairly safe, predicts lower risk, and stops flagging them, after which they stop being expedited, and the late rate climbs back. The model has undermined its own signal. Several fixes keep the labels honest. A small random holdout, five percent of flagged orders, about two hundred a week out of four thousand, is never expedited, so its late rate shows the true risk, around sixty percent. Logging the action, as in section one, lets training use only the orders that were not acted on, or include the action as a feature. Or the target can be redefined as the risk of lateness if not expedited. The general point holds for any deployed model: an action taken on a prediction biases the labels that follow.",
}
