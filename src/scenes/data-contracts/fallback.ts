import type { Scene } from '@graphlearning/flow'

// §7 — what the model receives when a feature is missing or stale, declared per feature. Each
// choice is a statement about what the model saw in training.
export const fallback: Scene = {
  id: 'fallback',
  title: 'Missing and stale features',
  flow: 'TB',
  nodes: [
    {
      id: 'policies',
      kind: 'table',
      label: 'Per-feature policy · checkout predictor',
      headers: ['feature', 'stale after', 'if missing or stale', 'seen in training?'],
      values: [
        ['zone_delay_3h', '30 min', 'zone weekly median + flag', 'yes: 2% of rows imputed'],
        ['customer_late_rate', '1 day', 'missing indicator = 1', 'yes: new customers'],
        ['distance_km', 'never', 'reject: cannot predict', '—'],
        ['weather_risk', '2 h', 'value 0 ("normal")', 'no: silent shift'],
      ],
    },
    {
      id: 'kinds',
      label: 'Four fallback semantics',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-impute', label: 'Impute', sub: 'a training statistic', pattern: 'service', icon: 'sigma' },
        { id: 'k-flag', label: 'Indicator', sub: 'model learns "missing"', pattern: 'network', icon: 'tag' },
        { id: 'k-refuse', label: 'Refuse', sub: 'rule-based answer', pattern: 'warn', icon: 'ban' },
        { id: 'k-default', label: 'Silent default', sub: 'looks like real data', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'serve/features.py',
      label: `v = store.get("zone_delay_3h", zone)
if v is None or now - v.updated_at > timedelta(minutes=30):
    feats["zone_delay_3h"], feats["zone_delay_missing"] = ZONE_MEDIAN[zone], 1
    stale.append("zone_delay_3h")          # reported in the response and the logs
else:
    feats["zone_delay_3h"], feats["zone_delay_missing"] = v.value, 0`,
    },
  ],
  edges: [
    { source: 'policies', target: 'kinds', label: 'the choices' },
    { source: 'kinds', target: 'code', label: 'one of them' },
  ],
}
