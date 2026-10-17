import type { Section } from '../types'

export const retire: Section = {
  id: 'retire',
  title: 'No-update/retirement choices and dependency cleanup',
  scene: 'retire',
  focus: 'choices',
  slide: `## Updating is one option of four

A maintenance review can end in four ways. Not updating, and retiring, are **decisions** with their own evidence.

### The four outcomes
- **Update**: a candidate passes every gate; April, v14
- **Wait**: inconclusive or too few labels; May, keep v14
- **No change**: the shift is harmless, such as December parcels
- **Retire**: the decision no longer needs a model

### Retiring the late-risk model
- A carrier starts providing delivery windows itself
- Move **every caller** first: checkout uses the carrier's window
- Stop its features once **no** reader remains
- Turn off retraining and monitoring schedules
- Let logs and snapshots **expire** under their retention rules
- Record **why** it was retired, and who decided`,
  narration:
    "A maintenance review does not have to end in an update. It can end in one of four ways, and not updating, or retiring, are decisions with their own evidence. Update, when a candidate passes every gate, as version fourteen did in April. Wait, when the comparison is inconclusive or there are too few matured labels to decide, as in May, when version fourteen stayed and the team gathered another month. No change, when the investigated shift is harmless, like the December parcels: recording that decision is part of the work. And retire, when the decision no longer needs a model at all. Suppose the main carrier starts providing its own delivery windows, which are more accurate because the carrier sees its own network. Retiring the late-risk model then has an order to it. First move every caller, so checkout uses the carrier's window, and confirm nothing else still calls the predictor. Then stop materialising its features, but only once no other model reads them. Turn off the retraining pipeline's schedule and the monitoring jobs, so they do not page anyone about a model nobody uses. And let the prediction logs and training snapshots expire under their retention rules from chapters five and eight, rather than keeping them forever by default.",
}
