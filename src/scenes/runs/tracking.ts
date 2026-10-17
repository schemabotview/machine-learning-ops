import type { Scene } from '@graphlearning/flow'
import { splitV3, splitV3b, splitV4 } from './numbers'

// §2 — three tracked runs. Fingerprints are COMPUTED from their split id lists: run C changed one
// validation id, so its score is not comparable with A and B.
export const tracking: Scene = {
  id: 'tracking',
  title: 'Metrics, artefacts and fingerprints',
  flow: 'TB',
  nodes: [
    {
      id: 'runs',
      kind: 'table',
      label: 'Three tracked runs · validation evidence',
      headers: ['run', 'split fingerprint', 'features', 'val log loss', 'comparable with A?'],
      values: [
        ['A · baseline GBM', splitV3, 'v5', '0.3941', '—'],
        ['B · + weather_risk', splitV3b, 'v5 + 1', '0.3902', 'yes: same split'],
        ['C · + weather_risk', splitV4, 'v5 + 1', '0.3815', 'no: one id differs'],
      ],
    },
    {
      id: 'logged',
      label: 'What each run logs',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-params', label: 'Parameters', sub: 'every config value', pattern: 'user', icon: 'pencil' },
        { id: 'l-metrics', label: 'Metrics', sub: 'by split, by step', pattern: 'network', icon: 'barchart' },
        { id: 'l-art', label: 'Artefacts', sub: 'model, report, plots', pattern: 'storage', icon: 'package' },
        { id: 'l-fp', label: 'Fingerprints', sub: 'data and split', pattern: 'warn', icon: 'hash' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'train.py',
      label: `with mlflow.start_run(run_name=run_id):
    mlflow.log_params(config.flat())                       # every value, not just the tuned ones
    mlflow.set_tags({"split_fp": split.fingerprint, "snapshot": snapshot.id, "commit": git_sha()})
    model = train(features(split.train), config)
    mlflow.log_metric("val_log_loss", evaluate(model, split.val).log_loss)
    mlflow.log_artifact("reports/eval.html")`,
    },
  ],
  edges: [
    { source: 'runs', target: 'logged', label: 'needs' },
    { source: 'logged', target: 'code', label: 'with a tracker' },
  ],
}
