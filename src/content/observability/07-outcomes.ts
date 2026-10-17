import type { Section } from '../types'

export const outcomes: Section = {
  id: 'outcomes',
  title: 'Delayed/selective outcome joins and quality/calibration slices',
  scene: 'outcomes',
  focus: 'reliability',
  slide: `## Quality, once the labels arrive

Model quality is measured by **joining** predictions to outcomes after the labels mature, and only for the orders that **have** a fair label.

### Week 14, joined seven days later
- 8,600 delivered orders, grouped by predicted risk
- Predicted 0.05 → observed **0.048**; 0.25 → **0.251**
- Predicted 0.35 → **0.362**; 0.50 → **0.516**
- Predicted 0.70 → observed **0.805**: the riskiest orders are **under**-predicted

### What the join includes
- Delivered and matured: **yes**
- Checked out under 7 days ago: **later**
- Cancelled: no, counted separately
- Expedited by ops: **flagged**, because the action changed the label

### Slices
- Calibration by bucket, zone and new customers, not one average`,
  narration:
    "Model quality in production is measured by joining predictions to their outcomes once the labels mature, and only for the orders that have a fair label. For week fourteen, the join runs seven days after checkout, covering eight thousand six hundred delivered orders, grouped by their predicted late risk. Where the model predicted five percent, four point eight percent were late. Where it predicted a quarter, twenty-five point one percent were late. At thirty-five percent predicted, thirty-six point two observed. At a half, fifty-one point six. These are well calibrated. But in the riskiest bucket, where the model predicted seventy percent, eighty point five percent were actually late. The riskiest orders are under-predicted, which matters because those are exactly the orders where the delivery window should widen most. The join's rules matter as much as its results. Delivered, matured orders are included. Orders checked out less than seven days ago are included later, once mature. Cancelled orders have no label and are counted separately. Orders that operations expedited are flagged, because that action changed the outcome the label records, a bias the next chapter examines. And quality is reported in slices, by risk bucket, zone and new customers, not as one average.",
}
