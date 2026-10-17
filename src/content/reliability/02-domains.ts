import type { Section } from '../types'

export const domains: Section = {
  id: 'domains',
  title: 'Cold starts, timeouts, failure domains, and degradation',
  scene: 'domains',
  focus: 'table',
  slide: `## Failure domains and graceful degradation

Each component that can fail takes a different **share** of the system with it. Plan for each, and decide the order in which to degrade.

### Failure domains
- **A pod** or **a node**: readiness and spreading absorb it
- **A zone**: half the fleet, covered by zone-safe sizing
- **The feature store**: every prediction, so the labelled fallback
- **The registry**: new pods cannot load; cache the bundle

### Cold starts under a surge
- Load rises from 40 to 120 requests/s in two minutes
- New capacity takes about **2 minutes**: 90 s for a node, 14 s for a pod
- Until it arrives, shed load above 70% to the fallback

### Degrade in order
- Skip optional features, then shed the excess, then rules only`,
  narration:
    "Every component that can fail takes a different share of the system with it, so reliability planning goes domain by domain, and decides in advance the order in which the service degrades. A single pod failing takes out one replica of four, and readiness probes simply route around it while it restarts. A node failing takes out the pods on it, which is why pods are spread across nodes. A zone failing takes out half the fleet, covered by the zone-safe sizing from the previous section. The feature store failing affects every single prediction, which is why the labelled fallback window exists. And the model registry failing means new pods cannot load a model, so each node caches the current bundle, and pods that are already running keep serving. Cold starts matter most during a surge. If load rises from forty to a hundred and twenty requests a second in two minutes, the autoscaler asks for more replicas within about thirty seconds, but a new node takes around ninety seconds to provision, and a pod fourteen more to become ready. Until that capacity arrives, the service sheds load above seventy percent utilisation to the fallback window, rather than letting every request slow down. The degradation order is fixed: first skip optional features, then shed the excess load, and only as a last resort answer every request with rules.",
}
