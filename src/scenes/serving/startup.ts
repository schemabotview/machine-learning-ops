import type { Scene } from '@graphlearning/flow'

// §4 — one serving pod from start to ready; liveness and readiness answer different questions.
export const startup: Scene = {
  id: 'startup',
  title: 'Request schemas, loading, readiness, liveness',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'A new checkout-predictor pod',
      headers: ['t', 'step', 'live?', 'ready?'],
      values: [
        ['0 s', 'container starts', 'yes', 'no'],
        ['1 s', 'check runtime vs bundle lock file', 'yes', 'no'],
        ['2 s', 'verify hashes, load model (8 s)', 'yes', 'no'],
        ['10 s', 'warm feature cache for top 200 zones', 'yes', 'no'],
        ['14 s', 'self-test: 20 known requests match', 'yes', 'yes: receives traffic'],
        ['later', 'feature store unreachable', 'yes', 'no: taken out of rotation'],
      ],
    },
    {
      id: 'probes',
      label: 'Two probes, two questions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-live', label: 'Liveness', sub: 'is the process stuck?', pattern: 'warn', icon: 'zap' },
        { id: 'p-ready', label: 'Readiness', sub: 'can it answer well now?', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'serve/app.py',
      label: `@app.get("/livez")
def livez(): return {"ok": True}                  # restart only if this stops answering

@app.get("/readyz")
def readyz():
    ok = model_loaded and self_test_passed and feature_store.healthy(timeout_ms=20)
    return JSONResponse({"model_version": MODEL.version}, status_code=200 if ok else 503)`,
    },
  ],
  edges: [
    { source: 'timeline', target: 'probes', label: 'reported by' },
    { source: 'probes', target: 'code' },
  ],
}
