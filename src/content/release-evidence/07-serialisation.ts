import type { Section } from '../types'

export const serialisation: Section = {
  id: 'serialisation',
  title: 'Safe serialisation, provenance, and environment compatibility',
  scene: 'serialisation',
  focus: 'formats',
  slide: `## Loading is executing

Loading a model file can **run code**. Choose formats by what loading them can do, and check the environment before you load.

### Formats by what loading can do
- **pickle / joblib**: can run any Python code; only from trusted builds
- **skops**: allows listed types; review any unknown type
- **ONNX**: a graph of known operators
- **JSON** trees and text: data only

### Environment compatibility
- Trained with scikit-learn 1.5.2, serving with 1.5.2: ok
- Serving with 1.4.0: **refuse**, older than the build
- lightgbm 4.5 against 4.3: **refuse**, the tree format changed

### Fail early
- Compare the bundle's lock file with the runtime **before** loading`,
  narration:
    "Loading a model file can run code. A pickle or joblib file can execute arbitrary Python as it is loaded, so loading one from an untrusted source is equivalent to running a stranger's program on the serving machine. Formats should therefore be chosen by what loading them can do. Pickle and joblib can do anything, so they should only ever come from your own trusted, verified builds. Skops loads only types on an allowed list, and asks for review of any unknown type. ONNX is a graph of known operators, so loading it runs no arbitrary code, though it ties you to an operator-set version. Plain JSON trees and text formats are data only, and need only a schema check. The environment matters as well. The bundle records the library versions it was built with. Serving with the same scikit-learn version is fine. Serving with an older version should be refused, because the file may depend on newer internals. And a gradient-boosting library whose tree format changed between versions should be refused too, rather than loaded and trusted. The check belongs at startup, before anything is loaded. Compare the bundle's lock file with the runtime's installed versions, and fail with a clear message, rather than failing later, or worse, not failing at all.",
}
