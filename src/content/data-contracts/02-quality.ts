import type { Section } from '../types'

export const quality: Section = {
  id: 'quality',
  title: 'Quality rules, quarantine, corrections, and replay',
  scene: 'quality',
  focus: 'rules',
  slide: `## Quality rules and quarantine

Rows that break the contract are **held**, not deleted and not silently accepted. The source fixes them, and the batch is replayed.

### One day's batch
- 10,000 rows in; **9,812** accepted
- 42 rows with no zone, 17 impossible weights: **quarantined**
- 9 duplicate order_ids: keep the latest, log the rest
- **120** distances over 80 km: one source sent **metres**

### Why quarantine, not drop
- Dropped rows vanish, and the bias they cause is invisible
- Quarantined rows are **counted**, so a rising rate raises an alert
- The raw batch stays **append-only**, so nothing is lost

### Correction and replay
- The source re-sends in kilometres
- The **same** rules run again, producing a **new** snapshot`,
  narration:
    "Rows that break the dataset contract should be held, not deleted and not silently accepted. The source fixes them, and the batch is replayed. Here is one day's batch of ten thousand incoming order rows. Forty-two have no delivery zone and seventeen have impossible weights, so they go to quarantine. Nine are duplicate order identifiers, which is common when a client retries, so the latest version is kept and the others logged. And a hundred and twenty have distances over eighty kilometres. They all come from one source, which has started sending metres instead of kilometres, the failure a schema check alone would have missed. Nine thousand eight hundred and twelve rows are accepted. Quarantine is better than dropping for two reasons. Dropped rows simply vanish, and if they share a cause, such as one region or one carrier, the bias they introduce is invisible. Quarantined rows are counted, so a rising quarantine rate can raise an alert. The raw batch itself stays append-only, so nothing is ever lost. When the source re-sends the corrected distances, the same rules run again over the replayed batch, and the result is a new snapshot with a new identity, rather than a quiet edit to the old one.",
}
