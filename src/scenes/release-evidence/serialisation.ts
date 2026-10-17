import type { Scene } from '@graphlearning/flow'

// §7 — formats by what loading them can do, and an environment compatibility check.
export const serialisation: Scene = {
  id: 'serialisation',
  title: 'Safe serialisation and compatibility',
  flow: 'TB',
  nodes: [
    {
      id: 'formats',
      kind: 'table',
      label: 'What loading a file can do',
      headers: ['format', 'on load', 'trust needed'],
      values: [
        ['pickle / joblib', 'can run any Python code', 'full: only from trusted builds'],
        ['skops', 'allows listed types only', 'review unknown types'],
        ['ONNX', 'a graph of known operators', 'operator set version'],
        ['JSON / text trees', 'data only', 'schema check'],
      ],
    },
    {
      id: 'compat',
      kind: 'table',
      label: 'Built with vs serving with',
      headers: ['library', 'trained', 'runtime', 'result'],
      values: [
        ['scikit-learn', '1.5.2', '1.5.2', 'ok'],
        ['scikit-learn', '1.5.2', '1.4.0', 'refuse: older than built'],
        ['numpy', '2.1', '2.1', 'ok'],
        ['lightgbm', '4.5', '4.3', 'refuse: tree format changed'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'serve/compat.py',
      label: `built = parse_lock(bundle / "requirements.lock")
for pkg, want in built.items():
    have = importlib.metadata.version(pkg)
    if Version(have).release[:2] != Version(want).release[:2]:
        raise IncompatibleRuntime(pkg, want, have)    # fail before loading, not after`,
    },
  ],
  edges: [
    { source: 'formats', target: 'compat', label: 'and where' },
    { source: 'compat', target: 'code', label: 'checked at startup' },
  ],
}
