import type { Section } from '../types'

export const access: Section = {
  id: 'access',
  title: 'Identities, least privilege, and environment isolation',
  scene: 'access',
  focus: 'matrix',
  slide: `## Who may do what

Every step of the lifecycle runs as an **identity**. Each identity gets only what its step needs, and no single one can train **and** deploy.

### The grid
- **ML engineers** read labels and train in dev; they cannot register or deploy
- The **training pipeline** reads labels, trains and registers
- A **release approver** moves the champion alias
- The **CD system** deploys; **serving pods** only read what serving needs
- **Analysts** see aggregates, never raw labels per customer

### The principles
- **Least privilege**: only what the step needs
- **Separation**: whoever trains cannot also deploy
- **Machines** do routine steps; **people** approve them
- Separate identities per **environment**
- Every grant is **reviewed** quarterly (§ 7)`,
  narration:
    "Every step of the ML lifecycle runs as some identity, a person or a service, and access control starts by deciding what each identity may do. Each one gets only what its step needs, and no single identity can both train a model and deploy it. In the grid, ML engineers can read labels and train models, but only in the development environment. They cannot register a production model, move an alias or deploy. The training pipeline, a service identity, reads labels, trains and registers candidate versions. A release approver, a person, can move the champion alias, and does nothing else in this list. The continuous delivery system deploys. The serving pods themselves can do none of these things: they only read the model and features they need to answer requests. Analysts see aggregates, never the raw labels of individual customers. Four principles sit behind the grid. Least privilege: each identity holds only what its step requires, so a leaked credential can do limited harm. Separation of duties: whoever trains cannot also deploy, so no single mistake or bad actor can push a model to customers alone. Machines do the routine steps and people approve them, which keeps approvals meaningful. And every environment has its own identities, so staging credentials never work in production.",
}
