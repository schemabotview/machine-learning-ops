import type { Section } from '../types'

export const dag: Section = {
  id: 'dag',
  title: 'Typed components, DAG dependencies, and artefacts',
  scene: 'dag',
  focus: 'graph',
  slide: `## A pipeline of typed components

A pipeline is a graph of **components**. Each one declares typed inputs and outputs, and the graph's edges are the **artefacts** passed between them.

### The retraining pipeline, v4
- **take_snapshot** produces a Dataset
- **validate_data** checks it against the contract
- **build_features** runs only **after** the check passes
- **train** turns a FeatureTable into a Model; **evaluate** scores it

### What typing buys
- A component reads **only** its inputs and writes **only** its output
- The orchestrator can see every dependency, so it knows what can run in parallel
- Each component runs in a **digest-pinned** image

### The artefact is the interface
- Components never share memory or a working directory`,
  narration:
    "A pipeline is a directed graph of components. Each component declares its inputs and outputs with types, and the edges of the graph are the artefacts passed between them. Here is the retraining pipeline for the late-risk model, version four. Take snapshot produces a dataset. Validate data checks that dataset against the contract from chapter two, and produces a report. Build features runs only after the check passes, which is an explicit dependency in the graph, not an assumption about timing. Train turns the feature table into a model, and evaluate scores the model on the split, producing metrics. Typing each component buys several things. A component reads only its declared inputs and writes only its declared output, so the orchestrator can see every dependency, and knows which steps can run in parallel and which must wait. Each component runs in a container image pinned by digest, the same environment identity recorded for training runs in chapter three. And the artefact is the interface. Components never share memory or a working directory, so any one of them can be rerun, replaced or tested in isolation. The code card shows the same graph declared in a pipeline language, with each step wired to the outputs of the steps it depends on.",
}
