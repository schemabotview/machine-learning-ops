import type { Section } from '../types'

export const drift: Section = {
  id: 'drift',
  title: 'Drift statistics, effect sizes, and monitoring limits',
  scene: 'drift',
  focus: 'compare',
  slide: `## A drift score is not a quality score

A drift statistic measures how much a distribution **moved**. It says nothing about whether the move **hurts**.

### Two changes, scored by PSI
- Week 15: 30% of distances arrive in **metres**: PSI **0.463**
- December: lighter parcels: PSI **0.587**, the **larger** score
- Both cross the usual 0.25 alert line

### What they did to quality (production observation)
- Metres: weekly log loss **0.394 → 0.471**
- December: **0.394 → 0.396**, no real change
- The harmless shift scored higher than the harmful one

### Monitoring limits
- Stable marginals do not prove stable **quality**
- A range rule caught the metres directly: values **over 80 km**
- Check the effect on **quality** before acting`,
  narration:
    "A drift statistic measures how much a distribution moved. It says nothing at all about whether the move hurts the model. This section compares two changes using the population stability index, a common drift score computed over ten bins of the reference distribution, where values above nought point two five are usually treated as a significant shift. In week fifteen, one source starts sending distances in metres, affecting thirty percent of orders. The service stays up and predicts on nonsense distances, and the distance feature scores a stability index of nought point four six three. In December, parcels become lighter because of gift shopping, and the weight feature scores nought point five eight seven, the larger of the two. Both cross the alert line. Now look at quality, as production observation on matured labels. The metres problem raised the weekly log loss from nought point three nine four to nought point four seven one, breaching the quality contract. The December shift moved it from nought point three nine four to nought point three nine six, no real change. So the harmless shift scored higher than the harmful one. Two limits follow. A stable distribution of each feature does not prove stable quality, since concept change can leave every marginal unchanged. And the metres problem was caught most directly by a simple range rule.",
}
