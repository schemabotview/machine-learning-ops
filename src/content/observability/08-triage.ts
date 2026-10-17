import type { Section } from '../types'

export const triage: Section = {
  id: 'triage',
  title: 'Triage and responses matched to the diagnosed change',
  scene: 'triage',
  focus: 'cases',
  slide: `## Two alerts, two responses

Both alerts look alike at first: a healthy service and a drift alert. Triage separates them before anyone **retrains** anything.

### Week 15
- Uptime, errors and p99 all **healthy**
- distance_km PSI 0.46; **30%** of distances over 80 km
- No such shift last year; matured log loss **0.394 → 0.471**
- Diagnosis: **skew**, one source sends metres
- Response: fix the source, quarantine, replay

### December
- Also healthy; weight_kg PSI 0.59, no rule broken
- The **same** shift last year; log loss unchanged
- Diagnosis: a seasonal population shift
- Response: note it, **no** retraining

### Triage order
- Real? Where from? Does it hurt? Then match the fix`,
  narration:
    "Here the chapter's two examples meet. Both alerts look alike at first: a service that is perfectly healthy by every operational measure, and a drift alert on one feature. Triage separates them before anyone retrains anything. In week fifteen, uptime, errors and latency are all healthy. The distance feature has a stability index of nought point four six, and the range rule shows thirty percent of distances above eighty kilometres. The same week last year shows no such shift, and once labels mature, log loss has risen from nought point three nine four to nought point four seven one. The diagnosis is training-serving skew: one source is sending metres. The response is a data fix: correct the source, quarantine the affected rows, and replay them. Retraining on the corrupt data would make things worse. In December the service is also healthy. The weight feature scores nought point five nine, but no rule is broken, the same shift happened last December, and quality is unchanged. The diagnosis is a seasonal population shift, and the response is to note it and do nothing more. The order of questions generalises. Is the change real, or a logging artefact? Where does it come from, one source or everyone? Does it hurt quality, by labels, slices and seasons? Only then, match the fix.",
}
