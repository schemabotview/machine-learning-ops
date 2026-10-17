import type { Scene } from '@graphlearning/flow'
import { fingerprint } from '../runs/numbers'

// §4 — cache keys are hashes of a step's code and declared inputs (COMPUTED). A step that also reads
// something undeclared gets a cache hit when its real input has changed.
const k = (...parts: string[]) => fingerprint(parts).slice(0, 8)

export const caching: Scene = {
  id: 'caching',
  title: 'Caching and hidden dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Re-running the April pipeline after a fix to zone_lookup',
      headers: ['step', 'declared inputs', 'cache key', 'cache', 'correct?'],
      values: [
        ['take_snapshot', 'snapshot_date', k('snap@1', '2026-04-01'), 'hit', 'yes'],
        ['validate_data', 'dataset', k('valid@3', 'ds-04'), 'hit', 'yes'],
        ['build_features', 'dataset', k('feat@5', 'ds-04'), 'hit', 'no: also reads zone_lookup'],
        ['train', 'features, config', k('train@2', 'ft-04', 'cfg-7'), 'hit', 'no: stale features in'],
        ['evaluate', 'model, split', k('eval@2', 'm-04', 'sp-3'), 'hit', 'no: stale model in'],
      ],
    },
    {
      id: 'hidden',
      label: 'Undeclared inputs that break caching',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-table', label: '"latest" table', sub: 'zone_lookup, mutable', pattern: 'warn', icon: 'database' },
        { id: 'h-time', label: 'Current time', sub: 'datetime.now()', pattern: 'warn', icon: 'clock' },
        { id: 'h-env', label: 'Environment', sub: 'unpinned library', pattern: 'warn', icon: 'package' },
        { id: 'h-fix', label: 'Declare it', sub: 'zone_lookup@v12 as input', pattern: 'service', icon: 'key' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'hidden', label: 'why the hit was wrong' }],
}
