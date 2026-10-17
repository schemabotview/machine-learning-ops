import type { Section } from '../types'

export const rollback: Section = {
  id: 'rollback',
  title: 'Compatible rollback of model/features/configuration',
  scene: 'rollback',
  focus: 'deps',
  slide: `## Rolling back is more than old weights

Reverting the model works only if everything the old model **depends on** still exists and still means the same thing.

### Rolling v14 back to v12
- The v12 **bundle** is retained: fine
- v12 needs **checkout_features@5**: still materialised, so fine
- v12 reads the old zone_delay mean: fine **only** if v1 was not retired
- v14 added basket_value to requests; v12 **ignores** it: fine
- v12 used a risk threshold of **0.30**, not 0.35: the config must roll back too

### Do it as one unit
- Check the dependencies, then move the alias **with** its config
- Verify the runtime: responses say model_version = 12

### What it cannot undo
- Delivery windows **already shown** to customers`,
  narration:
    "Rolling back a model is more than putting the old weights back. It only works if everything the old model depends on still exists, and still means the same thing. Take a rollback from version fourteen to version twelve. Version twelve's bundle was retained, as chapter five required, so that part is fine. Version twelve reads checkout features version five, which is still materialised alongside version six, so that is fine too. It reads the original zone delay mean, which is fine only if that feature was not retired when version fourteen moved to the median. Version fourteen added a basket value field to requests. Version twelve simply ignores the extra field, so that is fine. And version twelve was used with a risk threshold of nought point three, not version fourteen's nought point three five, so the configuration must roll back together with the model, or the old model runs with the new threshold. So a rollback should be done as one unit. Check the dependencies first. Move the alias together with its configuration. Then verify the runtime, by checking that responses now carry model version twelve. And be clear about what a rollback cannot undo: the delivery windows already shown to customers by version fourteen stay shown.",
}
