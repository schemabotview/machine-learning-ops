import type { Section } from '../types'

export const threats: Section = {
  id: 'threats',
  title: 'Threat-model orientation and specialised controls',
  scene: 'threats',
  focus: 'table',
  slide: `## Who might attack, and how

A threat model asks what is valuable, who might attack it, and through which **input**. Baseline controls cover most cases; some need specialists.

### Threats to the late-risk system
- **Credential theft**: workload identity and rotation
- **Data poisoning**: fake orders to shift a zone's risk; source checks, quarantine, the holdout
- **Model extraction**: scraping windows to copy the model; rate limits, coarse outputs
- **Membership inference**: was a customer in training? A **specialist** review
- **Insider misuse**: access audits and least privilege

### The orientation questions
- What is valuable: data, the model, or the **decisions** it drives?
- Who would attack, through which input, and what would it cost?
- When does it go beyond baseline controls?`,
  narration:
    "A threat model asks three things: what is valuable, who might want to attack it, and through which input. For most ML services, baseline controls cover most cases, and a few need security specialists. Five threats to the late-risk system illustrate the range. Credential theft, such as a leaked registry token, is handled by workload identity and rotation, ordinary security hygiene. Data poisoning means feeding in fake orders to shift a zone's predicted risk, perhaps to manipulate delivery windows. The source checks, quarantine rules and the random holdout from earlier chapters all make that harder, and a targeted attack would need specialist analysis. Model extraction means scraping many delivery windows to reconstruct the model, which rate limits and deliberately coarse outputs, a window rather than a precise probability, make expensive. Membership inference asks whether a particular customer was in the training data. Using aggregate features rather than raw identifiers helps, but assessing it properly is a specialist question. Insider misuse, such as reading one customer's raw labels, is handled by access audits and least privilege. The orientation questions generalise: what is valuable, the data, the model or the decisions it drives? Who would attack, through which input, and at what cost? And when does the risk go beyond baseline controls?",
}
