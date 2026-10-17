import type { Section } from '../types'

export const failure: Section = {
  id: 'failure',
  title: 'Failure handling and safe loading boundaries',
  scene: 'failure',
  focus: 'cases',
  slide: `## Declared failure behaviour

Every dependency fails sometimes. The system's behaviour in each case should be **decided in advance**, written down, and visible in the response.

### The checkout predictor
- Malformed request: reject with **422** and name the field
- Feature store slower than 40 ms: use the **rule-based** window
- One stale feature: predict, but **flag** it
- Prediction outside 0–1: fall back and **alert**
- Every fallback response says **source = "fallback"**
- The 40 ms timeout sits **inside** the 150 ms budget
- Fallbacks are counted, so a rising rate is **visible**

### Safe loading
- A model file that fails its **hash** check is never loaded
- The service stays **unready**, so no traffic reaches it
- Avoid formats that run arbitrary code on load, such as raw pickle`,
  narration:
    "Every dependency fails sometimes, so the system's behaviour in each failure case should be decided in advance, written down, and visible in the response. For the checkout predictor, a malformed request is rejected with a four twenty-two error that names the failing field. If the feature store takes longer than forty milliseconds, the service answers with a simple rule-based delivery window instead of waiting and breaking the latency contract. If one feature is stale, the service still predicts, but flags which feature was old. If the model produces a value outside nought to one, something is badly wrong, so it falls back and raises an alert. And every fallback response says so explicitly, with its source set to fallback, so nothing downstream mistakes a rule for the model. Loading the model is its own boundary. The service checks the file's hash against the manifest before loading it, and if the check fails, it refuses to start. It stays unready, so the load balancer sends it no traffic, which is far better than serving an unverified model. It also avoids formats such as raw pickle, which can run arbitrary code when loaded, and checks that the model's expected input schema matches what it will receive.",
}
