import type { Section } from '../types'

export const schema: Section = {
  id: 'schema',
  title: 'Schemas, units, keys, snapshots, and provenance',
  scene: 'schema',
  focus: 'columns',
  slide: `## A dataset contract

A training set is only reproducible if its columns, units, keys and origin are **written down** and checked, not remembered.

### Each column states
- A **type** and a **unit**: distance_km is kilometres, weight_kg is kilograms
- A **rule**: 0 < distance_km ≤ 80
- Its **source** and owner: geo service, warehouse, carrier scans
- The label late is set **only** once it has matured

### The dataset as a whole
- A **key**: one row per order_id
- A **snapshot**: as of 2026-03-01 01:00, 52,000 rows
- **Provenance**: the source query's hash, so it can be rebuilt

### What a schema cannot catch
- A source that switches to metres still sends a **valid float**`,
  narration:
    "A training dataset is only reproducible if its columns, units, keys and origin are written down and checked, rather than remembered by whoever built it. That written description is the dataset contract. Each column states a type and a unit. Distance is in kilometres, weight is in kilograms. Each has a rule, such as distance greater than nought and at most eighty kilometres, which covers every delivery zone. Each names its source and owner: the checkout API, the geo service, the warehouse, or the carrier's delivery scans. And the label, whether a delivery was late, is only set once it has matured. The dataset as a whole has three more properties. A key, one row per order identifier, so duplicates are detectable. A snapshot, here taken as of one o'clock on the first of March, with fifty-two thousand rows, so the same training set can be named and rebuilt. And provenance, including a hash of the query that produced it. Notice what a schema alone cannot catch. If a source starts sending distances in metres, every value is still a perfectly valid floating-point number. Only a range rule, or a comparison with past data, notices that a three-kilometre trip has become three thousand.",
}
