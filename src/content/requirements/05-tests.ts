import type { Section } from '../types'

export const tests: Section = {
  id: 'tests',
  title: 'Configuration, dependencies, packaging, and meaningful tests',
  scene: 'tests',
  focus: 'kinds',
  slide: `## Tests that mean something

Package the code, pin what it depends on, and test the **contracts** between components. Then be clear about what a passing suite shows.

### Packaging and configuration
- A package with **pinned** dependencies: the model was fit with those versions
- Settings live in config, not code literals

### Checks, and what each shows
- **Unit**: a feature function meets its spec
- **Schema**: requests are well formed
- **Contract**: predict() returns 0 ≤ risk ≤ 1 with a model_version
- **Smoke**: the package installs, loads and returns one prediction
- A test can assert an outcome column is **never** a feature

### What it cannot show
- A green suite says nothing about **accuracy** or business value`,
  narration:
    "Turning modelling code into maintainable software means packaging it, pinning what it depends on, and testing the contracts between its components. Pinning matters more than usual, because the model was fitted with particular library versions, and a different version of a preprocessing library can change its outputs without any error. Settings such as feature lists and thresholds belong in a configuration file, not as literals buried in the code. Then the tests, and what each one can show. A unit test shows that a feature function meets its specification, for example that a distance is never negative. A schema test shows that requests are well formed, with all fourteen fields present and typed. A contract test shows that predict returns a risk between nought and one, along with a model version, so callers can rely on the shape. A smoke test shows the package installs, loads and returns one prediction. Some tests guard modelling assumptions directly, such as asserting that an outcome column like delivered at never appears among the features. But be clear about what a passing suite cannot show. It says nothing about whether the predictions are accurate, and nothing about business value. That needs model evaluation and experiments.",
}
