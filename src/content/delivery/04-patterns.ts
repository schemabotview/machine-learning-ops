import type { Section } from '../types'

export const patterns: Section = {
  id: 'patterns',
  title: 'Blue–green/rolling/canary and shadow patterns',
  scene: 'rollout-patterns',
  focus: 'evidence',
  slide: `## Four rollout patterns

Rollout patterns differ in **who** sees the new version first and **what evidence** you get before everyone does.

### The patterns
- **Blue–green**: switch all traffic at once; switching back is quick
- **Rolling**: replace pods in turn; versions mix along the way
- **Canary**: 5% of customers first, watched, then everyone
- **Shadow**: the new model scores live requests, but **never answers**

### What each one supplies
- Blue–green: no live evidence before everyone is exposed
- Canary: live errors, latency and effects on **5%**
- Shadow: live latency and score differences, with **nobody** exposed
- Shadow never acts, so it gives **no** evidence about outcomes`,
  narration:
    "Rollout patterns differ in who sees the new version first, and in what evidence you get before everyone does. Blue-green deployment runs the new version alongside the old one and switches all traffic at once. Switching back is quick, but nobody is exposed to the new version before everyone is, so it supplies no live evidence in advance. A rolling deployment replaces pods one by one. It needs no extra capacity, but for a while some requests go to the old version and some to the new, and the evidence is hard to read. A canary sends a small share of traffic, here five percent of customers, to the new version first, watches it, and only then expands. It supplies live errors, latency and early effects, while limiting exposure to that five percent. Shadow deployment sends a copy of live requests to the new model, records its scores, and never uses them in a response. It shows live latency and how the scores differ, with nobody exposed at all, at the cost of double compute. But a shadow model never acts, so it supplies no evidence about outcomes. For the checkout predictor, a sensible sequence is shadow first, to check latency under real traffic, and then a canary assigned by customer.",
}
