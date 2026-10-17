import type { Scene } from '@graphlearning/flow'

// §4 — the notebook refactored into components with explicit interfaces; the one feature function
// is shared by training, the nightly job and the online service.
export const interfaces: Scene = {
  id: 'interfaces',
  title: 'Training, preprocessing, inference interfaces',
  flow: 'TB',
  nodes: [
    {
      id: 'parts',
      label: 'From one notebook to five components',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-load', label: 'load_orders', sub: 'snapshot → frame', pattern: 'storage', icon: 'database' },
        { id: 'p-feat', label: 'build_features', sub: 'shared, pure', pattern: 'service', icon: 'boxes' },
        { id: 'p-train', label: 'train', sub: 'frame → model', pattern: 'network', icon: 'cpu' },
        { id: 'p-eval', label: 'evaluate', sub: 'model → report', pattern: 'network', icon: 'barchart' },
        { id: 'p-batch', label: 'score_batch', sub: 'nightly job', pattern: 'external', icon: 'calendar' },
        { id: 'p-online', label: 'predict', sub: 'one request', pattern: 'external', icon: 'zap' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'delivery_model/interfaces.py',
      label: `def build_features(orders: pd.DataFrame, as_of: datetime) -> pd.DataFrame:
    """Same code for training, batch and online. Uses only columns known at as_of."""

def train(features: pd.DataFrame, labels: pd.Series, config: TrainConfig) -> Model: ...
def evaluate(model: Model, split: Split) -> EvalReport: ...

@dataclass(frozen=True)
class Prediction:
    order_id: str
    late_risk: float          # 0–1
    duration_p50_h: float
    model_version: str        # every output says which model made it

def predict(request: CheckoutRequest, model: Model, store: FeatureStore) -> Prediction: ...`,
    },
  ],
  edges: [{ source: 'parts', target: 'code', label: 'the contracts between them' }],
}
