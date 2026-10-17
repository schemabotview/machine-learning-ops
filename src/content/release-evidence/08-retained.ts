import type { Section } from '../types'

export const retained: Section = {
  id: 'retained',
  title: 'Retained evidence, ownership, and rollback bundles',
  scene: 'retained',
  focus: 'keep',
  slide: `## Keep the evidence, and a working way back

Each release leaves evidence that someone will need later, for an audit, an incident or a rollback. Decide what is kept, how long, and by whom.

### Kept for every released version
- The bundle and its hashes: while live, then a year
- The gate report and its verdict: two years
- The split manifest and test ids, and the approval record
- The training **snapshot**, while any model built on it is live

### A rollback bundle is more than the old model
- Model v12's **complete** bundle, intact
- Feature view v5 still **being served**, so v12 has its inputs
- The **config** and thresholds v12 used

### Proven, not assumed
- Restore it in staging **before** it is needed
- An untested rollback is a **hope**, not a plan`,
  narration:
    "Every release leaves evidence that someone will need later, for an audit, for an incident investigation, or for a rollback. So decide in advance what is kept, for how long, and who owns it. For each released version, the bundle and its hashes are kept while the version is live and for a year afterwards. The gate report and its verdict are kept for two years, as is the approval record that says who released it. The split manifest and test identifiers are kept so the evaluation can be checked. And the training snapshot is kept for as long as any model built on it is still live, which is exactly the retention gap that made the rerun in chapter three impossible. A rollback bundle needs more than the old model file. It needs version twelve's complete bundle, intact. It needs feature view version five to still be served, because if that view was retired when version fourteen moved to view six, the old model has no inputs to read. And it needs the configuration and thresholds that version twelve was used with. The last requirement is that the rollback is proven, not assumed. Restore the previous bundle in staging and confirm it loads and answers, before the day it is actually needed.",
}
