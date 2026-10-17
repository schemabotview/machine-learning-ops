import type { Section } from '../types'

export const review: Section = {
  id: 'review',
  title: 'Risk review, documentation, exceptions, and access audits',
  scene: 'review',
  focus: 'record',
  slide: `## Records that stay true

Governance records decisions and limits, and is **reviewed** on a schedule. It is evidence for judgement, not a certificate.

### The risk record
- **Intended use**: the delivery window at checkout; not pricing, not refusing orders
- **Known limits**: rural recall 0.74, new stations, storm weeks
- **Open exception**: zone logs kept 120 days, not 90, **expiring** 30 June, with an owner
- **Next review**: quarterly, or on any material change

### The Q2 access review
- 42 grants: **30** used and scoped, kept
- **7** unused for 90 days: revoked
- **5** broader than the role needs: narrowed

### What it is not
- A **compliance certificate**`,
  narration:
    "Governance documentation is useful only if it stays true, so it records decisions and limits, and it is reviewed on a schedule. It is evidence that supports judgement, not a certificate. The risk record for the late-risk model starts with its intended use: setting the delivery window at checkout. It also says what it must not be used for: not pricing, and not refusing orders. Its known limits are listed plainly: rural recall of nought point seven four, weaker performance for new delivery stations, and storm weeks. Exceptions are recorded with an expiry date and an owner. Here, raw zone delay logs are being kept for a hundred and twenty days instead of ninety, while an investigation finishes, and that exception expires on the thirtieth of June. The record is reviewed quarterly, or whenever something material changes. Access is reviewed on the same cycle. The second-quarter review covered forty-two grants. Thirty were used within the last ninety days and correctly scoped, so they stay. Seven had not been used for ninety days, so they are revoked. Five were broader than the role needs, so they are narrowed. And it is worth saying plainly what all of this is not. A risk record and an access review are not a compliance certificate.",
}
