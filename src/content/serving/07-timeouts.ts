import type { Section } from '../types'

export const timeouts: Section = {
  id: 'timeouts',
  title: 'Timeout/retry/cancellation and documented fallback',
  scene: 'timeouts',
  focus: 'compare',
  slide: `## Same failure, opposite answers

A feature-store timeout means different things in the nightly job and in a checkout request, because their **time budgets** differ.

### Nightly partition
- Hours to spare: **retry** the partition, up to twice
- Nothing is waiting, so no answer is needed meanwhile

### Checkout request
- 40 ms already spent: **no** time for a retry
- **Cancel** the feature call at its deadline
- Answer with the rule-based window at 44 ms; respond at **47 ms**

### Rules for a fallback
- **Documented**: what it computes, from which inputs
- **Labelled**: source = "fallback", model_version = null
- **Counted**: a rate with its own alert
- Retries belong in batch, not in a **spent** request`,
  narration:
    "The same failure, a feature-store timeout, calls for opposite responses in the nightly job and in a checkout request, because their time budgets are completely different. In the nightly job there are hours until the five o'clock deadline, and nobody is waiting for an individual answer. So the right response is to retry the failed partition, up to twice, and drop its staging output if it is finally given up. In a checkout request, the customer is waiting, and the feature fetch has already used its forty millisecond deadline. There is no time for a retry. Instead, the request cancels the feature call when its deadline passes, so the work does not continue uselessly in the background, computes the rule-based delivery window from the distance and zone two milliseconds later, and responds at forty-seven milliseconds, well within the contract. That answer is a fallback, and three rules apply to it. It is documented: what it computes, and from which inputs. It is labelled, with the source set to fallback and no model version, so nothing downstream, from the logs to a monitoring dashboard to an analysis of model quality, mistakes it for the model's prediction. And it is counted, with its own rate and alert, because a rising fallback rate is a failure in progress.",
}
