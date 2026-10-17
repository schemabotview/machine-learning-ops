import type { Scene } from '@graphlearning/flow'

// §6 — a threat-model orientation: who might attack what, the baseline control, and when to bring in
// a specialist.
export const threats: Scene = {
  id: 'threats',
  title: 'Threat-model orientation',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Threats to the late-risk system',
      headers: ['threat', 'example', 'baseline control', 'specialist?'],
      values: [
        ['credential theft', 'a leaked registry token', 'workload identity, rotation', 'no'],
        ['data poisoning', 'fake orders to shift a zone\'s risk', 'source checks, quarantine, holdout', 'if targeted'],
        ['model extraction', 'scraping windows to copy the model', 'rate limits, coarse outputs', 'if valuable'],
        ['membership inference', 'was this customer in training?', 'aggregate features, no raw ids', 'yes'],
        ['insider misuse', 'reading raw labels for one customer', 'access audit, least privilege', 'no'],
      ],
    },
    {
      id: 'steps',
      label: 'The orientation questions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-what', label: 'What is valuable?', sub: 'data, model, decisions', pattern: 'storage', icon: 'key' },
        { id: 's-who', label: 'Who would attack?', sub: 'and through which input', pattern: 'user', icon: 'user' },
        { id: 's-harm', label: 'What would it cost?', sub: 'customers, money, trust', pattern: 'warn', icon: 'scale' },
        { id: 's-refer', label: 'Beyond baseline?', sub: 'security specialists', pattern: 'network', icon: 'search' },
      ],
    },
    {
      id: 'limits',
      kind: 'code',
      filename: 'gateway/predictor.yaml',
      label: `rate_limit: {per_customer: 30/min, per_ip: 120/min}
response:
  window: "2–4 days"            # coarse output: no raw probability leaves
  late_risk: internal_only
alerts: [{on: per_customer_calls > 500/day, to: security}]`,
    },
  ],
  edges: [
    { source: 'table', target: 'steps', label: 'from asking' },
    { source: 'steps', target: 'limits', label: 'one control, as config' },
  ],
}
