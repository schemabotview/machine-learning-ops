import type { Section } from '../types'

export const publication: Section = {
  id: 'publication',
  title: 'Output identity, duplicate handling, and atomic visibility',
  scene: 'publication',
  focus: 'storage',
  slide: `## Making a night visible all at once

Each output row needs an **identity**, and the whole night should become visible in **one step**. Whether that is possible depends on the storage.

### Identity on every row
- Row key (plan_date, order_id), the run key, the model version

### By storage type
- **Warehouse table**: one transaction or a partition overwrite
- **Table formats** (Delta, Iceberg): one log commit
- **Object store folder**: files appear one by one: a **partial** night
- **Object store + pointer**: write files, then swap a _LATEST pointer

### Duplicates
- One order in two partitions: a uniqueness check before publishing
- A retried write: MERGE on the row key, as in chapter 4`,
  narration:
    "Every output row needs an identity, and the whole night of scores should become visible to readers in one step. Whether that is actually possible depends on the storage being written to. Each row carries a key, the plan date and the order identifier. It also carries the run key of the night that produced it, and the model version. Visibility then depends on the storage. A warehouse table can publish a night in one transaction, or by overwriting one partition atomically, so a reader sees either the old night or the new one, never both. Table formats such as Delta or Iceberg commit a whole set of files with a single entry in their log, which gives the same guarantee. A plain folder in an object store has no such step. Files appear one by one, so a reader that lists the folder mid-publish sees part of a night and may treat it as complete. The usual workaround is to write all the files first, and then swap a small pointer file naming the latest complete night, which only works if every reader follows the pointer. Duplicates need their own handling. The same order appearing in two partitions is caught by a uniqueness check before publishing, and a retried write is made safe by merging on the row key.",
}
