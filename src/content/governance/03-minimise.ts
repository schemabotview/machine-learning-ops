import type { Section } from '../types'

export const minimise: Section = {
  id: 'minimise',
  title: 'Data minimisation, retention, and sensitive logging',
  scene: 'minimise',
  focus: 'inventory',
  slide: `## Keep only what has a use

Every field in an ML system is kept because a **named use** needs it, in the least detail that use requires, with an end date set when it enters.

### The inventory
- **Delivery address**: the model needs the zone, so only the zone is copied
- **Customer id**: kept as a keyed hash, for joins and repeat-customer features
- **Order history**: aggregates only, over a rolling 12 months
- **Phone and email**: never enter the ML systems
- **Prediction logs**: hashed ids, 13 months

### A rejected proposal
- Support transcripts as a feature: no use that justified the **risk**

### Three tests for a new field
- A named use, the least detail, an end date
- A keyed hash is **pseudonymous**, not anonymous`,
  narration:
    "Data minimisation means every field in an ML system is kept because a named use needs it, in the least detail that use requires, and with an end date set when it first enters the system. The data inventory for the late-risk lifecycle makes this concrete. The delivery address is not needed by the model, which uses the delivery zone, so only the zone is copied into ML systems, and the address stays in the order system that owns it. The customer identifier is needed for joins and for repeat-customer features, so it is kept, but as a keyed hash. Order history is needed for the customer late rate feature, so only aggregates are kept, over a rolling twelve months. Phone numbers and email addresses have no use in modelling at all, so they never enter the ML systems. Prediction logs keep hashed identifiers for thirteen months, for quality joins and audits. The inventory also records decisions not to collect. A proposal to use customer support transcripts as a feature was rejected, because no expected gain justified bringing free-text personal conversations into the training data. So any new field has to pass three tests: a named use, the least detail that serves it, and an end date.",
}
