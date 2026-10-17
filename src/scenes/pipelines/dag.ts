import type { Scene } from '@graphlearning/flow'

// §1 — the retraining pipeline as typed components joined by artefacts.
export const dag: Scene = {
  id: 'dag',
  title: 'Components, dependencies, artefacts',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'late-risk retraining pipeline · v4',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'prep',
          label: '1 · prepare',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'c-snap', label: 'take_snapshot', sub: '→ Dataset', pattern: 'storage', icon: 'database' },
            { id: 'c-valid', label: 'validate_data', sub: 'Dataset → Report', pattern: 'warn', icon: 'circlecheck' },
            { id: 'c-feat', label: 'build_features', sub: '→ FeatureTable', pattern: 'service', icon: 'boxes' },
          ],
          edges: [
            { source: 'c-snap', target: 'c-valid', label: 'Dataset' },
            { source: 'c-valid', target: 'c-feat', label: 'passed' },
          ],
        },
        {
          id: 'model',
          label: '2 · model',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'c-train', label: 'train', sub: 'FeatureTable → Model', pattern: 'network', icon: 'cpu' },
            { id: 'c-eval', label: 'evaluate', sub: 'Model → Metrics', pattern: 'network', icon: 'barchart' },
          ],
          edges: [{ source: 'c-train', target: 'c-eval', label: 'Model' }],
        },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'pipeline/components.py',
      label: `@component(image=TRAIN_IMAGE)              # digest-pinned
def train(features: Input[FeatureTable], model: Output[Model]): ...

@pipeline(name="late-risk-retrain", version="4")
def retrain(snapshot_date: str):
    snap  = take_snapshot(as_of=snapshot_date)
    check = validate_data(dataset=snap.out)
    feats = build_features(dataset=snap.out).after(check)
    model = train(features=feats.out)
    evaluate(model=model.out, split=SPLIT)`,
    },
  ],
  edges: [{ source: 'graph', target: 'code', label: 'declared as' }],
}
