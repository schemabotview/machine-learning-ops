import type { Scene } from '@graphlearning/flow'

// §5 — a complete inference bundle: everything the serving runtime needs to reproduce validation.
export const bundle: Scene = {
  id: 'bundle',
  title: 'Complete inference bundles and signatures',
  flow: 'TB',
  nodes: [
    {
      id: 'files',
      kind: 'table',
      label: 'late-risk v13 · bundle contents',
      headers: ['file', 'holds', 'without it'],
      values: [
        ['model.skops', 'fitted estimator', 'nothing to serve'],
        ['preprocess.skops', 'encoders, imputers, scalers', 'different inputs, silently'],
        ['signature.json', 'input fields, types; output', 'no request validation'],
        ['features.lock', 'checkout_features@5', 'wrong feature version'],
        ['requirements.lock', 'exact library versions', 'unpickling or numeric drift'],
        ['eval_report.json', 'the evidence it passed', 'no audit, no rollback basis'],
        ['SHA256SUMS', 'a hash of every file', 'no integrity check'],
      ],
    },
    {
      id: 'sig',
      kind: 'code',
      filename: 'signature.json',
      label: `{"inputs": [
   {"name": "distance_km", "type": "float", "unit": "km"},
   {"name": "zone", "type": "string"},
   {"name": "zone_delay_3h", "type": "float", "nullable": true},
   … 11 more],
 "outputs": [{"name": "late_risk", "type": "float", "range": [0, 1]},
             {"name": "duration_p50_h", "type": "float"}],
 "features": "checkout_features@5"}`,
    },
  ],
  edges: [{ source: 'files', target: 'sig', label: 'the signature' }],
}
