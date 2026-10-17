import type { Section } from '../types'

export const startup: Section = {
  id: 'startup',
  title: 'Request schemas, model loading, readiness, and liveness',
  scene: 'startup',
  focus: 'timeline',
  slide: `## From start to ready

A serving pod should receive traffic only when it can answer **well**. Liveness and readiness are two different questions.

### A new pod
- 0–2 s: start, check the runtime against the lock file
- 2–10 s: verify hashes and **load** the model
- 10–14 s: warm the feature cache for the busiest zones
- 14 s: a self-test of 20 known requests passes, so it becomes **ready**

### Two probes
- **Liveness**: is the process stuck? If not answering, **restart** it
- **Readiness**: can it answer well now? If not, no traffic
- Feature store unreachable: still live, **not ready**
- A needless restart costs a 14 s cold start
- Every request is checked against the **signature**`,
  narration:
    "A serving pod should only receive traffic once it can answer well, and the platform finds that out through two different questions, liveness and readiness. Follow a new pod for the checkout predictor. At nought seconds the container starts. At one second it compares the installed libraries with the bundle's lock file. From two seconds it verifies the file hashes and loads the model, which takes about eight seconds. From ten seconds it warms its feature cache for the two hundred busiest zones, to avoid the cold-read tail from chapter one. At fourteen seconds it runs a self-test, twenty known requests whose answers must match, and only then reports ready and starts receiving traffic. Liveness asks whether the process is stuck. If the liveness endpoint stops answering, the platform restarts the pod. Readiness asks whether the pod can answer well right now. If not, the platform stops sending it requests, but leaves it running. The difference matters later in the pod's life. If the feature store becomes unreachable, the pod is still alive, so restarting it would only add a cold start, but it is not ready. It is taken out of rotation until the store returns. Meanwhile, every request it does receive is validated against the bundle's signature.",
}
