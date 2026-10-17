import type { Scene } from '@graphlearning/flow'

// §6 — what the online predictor does when something it depends on fails, and a loading boundary
// that refuses an artefact it cannot verify.
export const failure: Scene = {
  id: 'failure',
  title: 'Failure handling and safe loading',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'Declared behaviour per failure · checkout predictor',
      headers: ['failure', 'behaviour', 'response says'],
      values: [
        ['malformed request', 'reject, HTTP 422', 'which field failed'],
        ['feature store timeout (> 40 ms)', 'rule-based window', 'source = "fallback"'],
        ['one feature stale (> 15 min)', 'predict, flag it', 'stale = ["recent_delays"]'],
        ['model file fails its hash', 'refuse to start; stay unready', 'nothing: no traffic routed'],
        ['prediction outside 0–1', 'fallback, raise an alert', 'source = "fallback"'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'serve/load.py',
      label: `def load_model(path: Path, manifest: Manifest) -> Model:
    blob = path.read_bytes()
    if hashlib.sha256(blob).hexdigest() != manifest.sha256:
        raise ModelIntegrityError(path)          # fail closed: never serve an unverified file
    model = skops.io.loads(blob, trusted=manifest.trusted_types)  # no arbitrary pickle code
    check_signature(model, manifest.input_schema)  # columns and dtypes it was trained with
    return model`,
    },
    {
      id: 'modes',
      label: 'Four responses, chosen per failure',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm-closed', label: 'Fail closed', sub: 'integrity: bad model file', pattern: 'warn', icon: 'lock' },
        { id: 'm-fallback', label: 'Fall back', sub: 'a slow dependency', pattern: 'service', icon: 'swap' },
        { id: 'm-flag', label: 'Flag', sub: 'one stale feature', pattern: 'network', icon: 'tag' },
        { id: 'm-alert', label: 'Alert', sub: 'an impossible output', pattern: 'warn', icon: 'zap' },
      ],
    },
  ],
  edges: [
    { source: 'cases', target: 'modes', label: 'grouped' },
    { source: 'modes', target: 'code', label: 'fail closed, enforced' },
  ],
}
