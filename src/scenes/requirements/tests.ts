import type { Scene } from '@graphlearning/flow'

// §5 — what each kind of check can establish. A green test suite says the software does what it
// was specified to do; it does not say the model is good.
export const tests: Scene = {
  id: 'tests',
  title: 'Configuration, dependencies, tests',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Checks and what each one shows',
      headers: ['check', 'example', 'shows', 'cannot show'],
      values: [
        ['unit test', 'distance feature is non-negative', 'the function meets its spec', 'the spec is useful'],
        ['schema test', 'request has all 14 fields, typed', 'inputs are well formed', 'values are right'],
        ['contract test', 'predict() returns 0 ≤ risk ≤ 1', 'callers can rely on the shape', 'risk is calibrated'],
        ['smoke test', 'package loads, one prediction', 'it installs and runs', 'it is accurate'],
        ['model evaluation', 'log loss on matured labels', 'offline quality', 'business value'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'pyproject.toml · tests/test_features.py',
      label: `[project]
name = "delivery-model"
dependencies = ["pandas==2.2.*", "scikit-learn==1.5.*"]   # pinned: the model was fit with these

def test_features_use_only_checkout_time_columns():
    feats = build_features(sample_orders(), as_of=CHECKOUT)
    assert "delivered_at" not in feats.columns          # an outcome must never be a feature

def test_prediction_contract():
    p = predict(sample_request(), model, fake_store)
    assert 0.0 <= p.late_risk <= 1.0 and p.model_version`,
    },
    {
      id: 'beyond',
      label: 'Where the other claims get their evidence',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-eval', label: 'Model quality', sub: 'evaluation · ch 5', pattern: 'network', icon: 'barchart' },
        { id: 'b-exp', label: 'Business value', sub: 'experiments · ch 9', pattern: 'service', icon: 'scale' },
        { id: 'b-ops', label: 'Health', sub: 'monitoring · ch 8', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'code', label: 'two of them, written down' },
    { source: 'code', target: 'beyond', label: 'and beyond tests' },
  ],
}
