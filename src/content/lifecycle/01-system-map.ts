import type { Section } from '../types'

export const systemMap: Section = {
  id: 'system-map',
  title: 'System/dependency/ownership map',
  scene: 'system-map',
  focus: 'map',
  slide: `## The whole system, on one page

A lifecycle review starts with a map: what exists, what depends on what, and **who owns** each piece.

### Two systems, kept apart
- **Checkout predictor**: checkout API → late-risk@14 → online features
- **Daily planning job**: 01:00 snapshot → duration@9 → routing
- **Shared**: carrier scans → retrain pipeline → model registry

### Every arrow is a contract
- Request and response within **150 ms** p99
- Features no more than **15 minutes** old
- Scores for every zone by **05:00**
- Scan feed timestamps with a **UTC offset**, after INC-0610

### Why separate contracts
- The two systems fail, change and are judged **differently**`,
  narration:
    "This final chapter reviews the whole lifecycle as one design, and that review starts with a map: what exists, what depends on what, and who owns each piece. The retailer runs two systems, kept deliberately apart. The checkout predictor runs inside every checkout: the checkout team's API calls the late-risk model, version fourteen, owned by the ML team, which reads online features maintained by the data platform team. The daily planning job runs overnight: data engineering's one o'clock snapshot feeds the duration model, version nine, whose scores the logistics team's routing system reads. Between them sit shared pieces: the carrier's delivery scans, which supply the labels, the retraining pipeline, and the model registry run by the ML platform. Every arrow on that map is a contract with an owner. A request and response within a hundred and fifty milliseconds at the ninety-ninth percentile. Features no more than fifteen minutes old. Scores for every zone published by five in the morning. And, since the incident in chapter eleven, a scan feed whose timestamps carry an explicit offset from universal time. Keeping separate contracts for the two systems matters, because they fail differently, change at different rates and are judged by different people, so one shared, blurred contract would fit neither.",
}
