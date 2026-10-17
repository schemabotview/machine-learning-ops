import type { Section } from '../types'

export const evolution: Section = {
  id: 'evolution',
  title: 'Feature-store limits and version-compatible evolution',
  scene: 'evolution',
  focus: 'change',
  slide: `## Feature stores, and changing a feature

A feature store organises definitions, joins and serving. It does not make a change safe.

### What it can and cannot do
- Register one definition per feature, but not judge it **correct**
- Run point-in-time joins, but only on the times it is **given**
- Materialise online values, but not make a stale one **fresh**

### Changing mean to median, compatibly
- New name, zone_delay_3h_median_v2; v1 untouched
- **Backfill** v2's history so the next training run can use it
- Serve v1 and v2 **side by side**, so rollback still works
- Retire v1 only after **no** model reads it

### The rule
- A new meaning gets a new name; a unit is **never** changed in place`,
  narration:
    "A feature store gathers several of this chapter's responsibilities in one tool. It registers one definition per feature, runs point-in-time joins for training, materialises values into a low-latency online store, and records versions and owners. It is useful, but it has limits worth stating. It can store a definition, but cannot judge whether that definition is correct. It runs point-in-time joins, but only on the timestamps it is given, so if availability time was never recorded, it cannot know when data was really available. And it can materialise values, but cannot make a stale value fresh. Changing a feature shows why evolution has to be explicit. Suppose the zone delay should become a three-hour median instead of a mean, to resist outliers. The change is made under a new name, version two, and version one is left untouched. Version two's history is backfilled, so the next training run can use as-of values. A new model version is trained and validated on it. The old and new features are served side by side, so the current model keeps working and rollback remains possible. Version one is retired only once it has been checked that no model still reads it. The rule is simple: a new meaning gets a new name, and a unit is never changed in place.",
}
