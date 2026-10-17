import type { Section } from '../types'

export const labels: Section = {
  id: 'labels',
  title: 'Label maturity, split manifests, and missing outcomes',
  scene: 'labels',
  focus: 'status',
  slide: `## Labels, outcomes and the split manifest

A label exists only once the outcome is **known**. The orders without one must be counted, explained and kept out of the split on purpose.

### At the 1 March snapshot
- 52,000 orders; label = late, set at promised date **+ 3 days**
- **94.1%** delivered with a label: 48,932 orders
- **3.2%** cancelled before dispatch: no delivery, no label
- **0.4%** lost in transit: excluded, reported separately
- **2.3%** not yet matured: excluded until they are

### The split manifest
- Train, validation and test by **checkout date**, test the latest
- **Frozen** id lists with hashes, not a query re-run later
- Exclusion counts recorded: 1,664 cancelled, 208 lost, 1,196 immature`,
  narration:
    "A label only exists once the outcome is known, and the orders that do not have one must be counted, explained and kept out of the split on purpose. At the first of March snapshot there are fifty-two thousand orders from January and February. The label, late or not, is set three days after the promised delivery date, which gives delayed scans time to arrive. Ninety-four point one percent of orders were delivered and have a label, forty-eight thousand nine hundred and thirty-two orders. Three point two percent were cancelled before dispatch, so there was no delivery to be late. Nought point four percent were lost in transit. They are excluded from training, but reported separately, because a lost parcel is arguably the worst kind of late. And two point three percent, the most recent orders, have not matured yet. Including them would label them all on time by default. The split manifest then pins the exact training, validation and test orders, split by checkout date with the test set the latest. It stores frozen lists of order identifiers with their hashes, rather than a query that could return different rows if re-run later. And it records the exclusion counts, so anyone can check what was left out, and why.",
}
