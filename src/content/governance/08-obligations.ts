import type { Section } from '../types'

export const obligations: Section = {
  id: 'obligations',
  title: 'Domain/jurisdiction-specific obligation boundaries',
  scene: 'obligations',
  focus: 'kinds',
  slide: `## Where the team's job ends

Legal and regulatory obligations depend on **where** and **how** a model is used. The team prepares evidence; specialists judge what applies.

### Kinds of obligation
- **Data protection**: lawful basis, access and deletion rights
- **Automated decisions**: does the model decide something significant?
- **Consumer law**: is the delivery promise fair and accurate?
- **Sector or AI rules**: does a regime apply here?

### What the team prepares
- Inventory, lineage, deletion traces; intended use, overrides
- Calibration and the broken-promise rate, as evidence

### The boundary
- Specialists decide **per jurisdiction**
- A new use of the model means a **new** review
- This course gives orientation, not legal advice`,
  narration:
    "Legal and regulatory obligations depend on where a model is used and how it is used, so the team's job has a clear boundary. The team prepares accurate, current evidence. Specialists in privacy, legal and compliance judge what applies. Four kinds of obligation are common. Data protection raises questions about the lawful basis for processing, and about customers' rights to access and delete their data. Rules on automated decisions ask whether a model decides something significant about a person without human involvement. Consumer law asks whether what the customer is promised, here a delivery window, is fair and accurate. And sector-specific or AI-specific rules may impose their own requirements, depending on the jurisdiction and the domain. For each, the team prepares the evidence that the specialists will need. That means the data inventory, the lineage and the deletion traces. It means the intended use, written down, along with any human override, such as operations staff who can change a window. And it means the quality evidence, such as calibration and the broken-promise rate. The specialists then decide, jurisdiction by jurisdiction. A new use of the model, such as feeding its risk into pricing, means a new review. And this course offers orientation, not legal advice.",
}
