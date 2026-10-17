import type { Section } from '../types'

export const modes: Section = {
  id: 'modes',
  title: 'Batch/online requirements, owners, and dependencies',
  scene: 'modes',
  focus: 'reqs',
  slide: `## Batch and online requirements

The same model can sit inside very different systems. Write down each system's requirements **before** choosing any architecture.

### Two sets of requirements
- Checkout: ≈ 40 requests/s at peak, **p99 ≤ 150 ms** inside the request
- Planning: ≈ 180,000 orders per run, finished within a **3-hour** window
- Checkout features exist only at checkout; planning reads a **01:00 snapshot**
- If checkout's model fails, **checkout must still work**
- If the planning job fails, routing uses yesterday's plan plus rules

### Dependencies have owners
- Checkout API, feature service, model registry
- Orders warehouse, routing system, carrier delivery scans
- Each one is a **contract** with another team, not an implementation detail`,
  narration:
    "The same model can sit inside very different systems, so the first engineering step is to write down each system's requirements before choosing any architecture. The checkout predictor is called inside every checkout request, at around forty requests a second at peak, and it must answer within a hundred and fifty milliseconds at the ninety-ninth percentile, because the customer is waiting. The daily planning job scores around a hundred and eighty thousand orders in one run, starting at two in the morning, and has until five to finish, a three-hour window. The inputs differ too. Checkout features must be known at the moment of checkout, while the planning job reads a snapshot of the order tables taken at one o'clock. And so do the failure requirements. If the checkout model fails, checkout itself must keep working, so there has to be a fallback. If the planning job fails, routing falls back to yesterday's plan plus simple rules. Each system also depends on things other teams own: the checkout API, the feature service, the model registry, the orders warehouse, the routing system and the carrier's delivery scans, which supply the labels. Each dependency is a contract with an owner, not an implementation detail.",
}
