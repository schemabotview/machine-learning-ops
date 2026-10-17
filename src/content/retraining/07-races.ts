import type { Section } from '../types'

export const races: Section = {
  id: 'races',
  title: 'Warm starts, incremental state, duplicate triggers, and races',
  scene: 'races',
  focus: 'race',
  slide: `## When two updates collide

Automated retraining adds **state** and **concurrency**: two runs can act on the same model at once.

### A race on the champion alias
- Pipeline A gates v15 against **v14**
- Meanwhile pipeline B sets the champion to hotfix **v14.1**
- A then sets champion = v15 **blind**: the hotfix is lost
- With **compare-and-set**: A expected v14, found v14.1, so it must re-gate

### Other state
- **Warm starts** inherit the old model's biases
- **Duplicate triggers** are deduplicated by the run key
- **Incremental fits** make the previous model an input to the next

### The guard
- Promote only if the champion is still the version you **compared against**`,
  narration:
    "Automated retraining adds state and concurrency, and with them, the possibility that two runs act on the same model at once. Here is a race on the champion alias. At ten o'clock pipeline A, the monthly retrain, reads the champion as version fourteen. A minute later pipeline B, a hotfix rebuild, also reads version fourteen. At ten twenty, A's candidate, version fifteen, passes its gates against fourteen. At ten twenty-two, B sets the champion to the hotfix, version fourteen point one. At ten twenty-five, A sets the champion to fifteen, blindly overwriting the alias, so the hotfix is silently lost, and fifteen was never compared against what it replaced. With a compare-and-set, A's update says it expects the champion to be fourteen. It finds fourteen point one instead, so the update is refused, and A must re-gate against the new champion. Other kinds of state need the same care. A warm start, training from the previous model's weights, saves time but inherits that model's biases. Duplicate triggers are absorbed by the run key from chapter four. And an incremental fit makes the previous model an input to the next, so it needs to be versioned like any other input. The guard is simple: promote only if the champion is still the version you compared against.",
}
