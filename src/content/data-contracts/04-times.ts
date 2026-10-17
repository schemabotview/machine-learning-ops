import type { Section } from '../types'

export const times: Section = {
  id: 'times',
  title: 'Event time versus ingestion/availability time',
  scene: 'times',
  focus: 'scans',
  slide: `## When it happened, and when it was known

Every record has more than one clock. A feature may only use what was **available** at prediction time, not merely what had **happened**.

### Three clocks
- **Event time**: when the parcel was delivered
- **Ingestion time**: when the scan arrived in the pipeline
- **Availability time**: when the feature could actually read it

### Zone N7, checkout at 14:00
- Most scans stream in about **15 minutes** after delivery
- Scan s5, delivered 13:35, arrived in a carrier **batch** at 14:50
- Scan s6, delivered 13:50, became readable at **14:05**
- Both had happened by 14:00; **neither** was known

### The consequence
- Training on event time alone gives the model information it **never** has live`,
  narration:
    "Every record in this system has more than one clock, and the difference between them is where many leaks come from. The event time is when something happened, here when a parcel was delivered. The ingestion time is when the record arrived in the data pipeline. And the availability time is when a feature computation could actually read it, which can be later still. A feature used at prediction time may only use what was available then, not merely what had already happened. Look at delivery zone N7 for a checkout at two in the afternoon. Most delivery scans stream in from the carrier about fifteen minutes after the delivery itself. But scan s5, a parcel delivered at thirteen thirty-five, arrived as part of a carrier batch upload at fourteen fifty, seventy-five minutes late. And scan s6, delivered at thirteen fifty, became readable at five past two. Both deliveries had happened before the checkout, yet neither was known to the live service when it made its prediction. The consequence is direct. A training set that filters only on event time gives the model information it will never have in production, and its offline evaluation will look better than anything it can achieve live.",
}
