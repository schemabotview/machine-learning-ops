import type { Section } from '../types'

export const environments: Section = {
  id: 'environments',
  title: 'Environment separation and promotion evidence',
  scene: 'environments',
  focus: 'evidence',
  slide: `## Separate environments, explicit evidence

Development, staging and production differ in **data**, **credentials** and **who can deploy**. Moving up a level needs stated evidence.

### What separates them
- Data: synthetic in dev, a **masked** copy in staging, real orders in production
- Each has its **own** service identity; none is shared
- Anyone deploys to dev, CI to staging, CD to production **after approval**

### Evidence to promote
- **Dev → staging**: tests pass, image built, bundle signature valid
- **Staging → production**: loads against staging features; load-test p99 ≤ 150 ms; gate verdict pass
- **Canary → 100%**: guardrails held for the whole canary window

### Rules
- The **same** artefact moves all the way up`,
  narration:
    "Development, staging and production should differ in three ways: the data they hold, the credentials they use, and who is allowed to deploy to them. Development uses synthetic data or a small sample. Staging uses a masked copy of production data, so realistic volumes and distributions without raw personal details. Production uses real orders. Each environment has its own service identity, and no credential is shared between them, so a mistake in staging cannot write to production. Anyone can deploy to development, only CI deploys to staging, and only continuous delivery deploys to production, after an approval. Moving a release up a level then needs stated evidence. From development to staging: the tests pass, the image is built, and the bundle's signature is valid. From staging to production: the bundle loads and answers against the staging feature store, a load test shows a ninety-ninth percentile latency within a hundred and fifty milliseconds, and the gate verdict from chapter five is pass. And from a canary to full traffic: the guardrails held for the whole canary window. Throughout, the same artefact moves all the way up, so the evidence gathered at each level applies to exactly what runs at the next one.",
}
