import type { Scene } from '@graphlearning/flow'

// §1 — four events, joined by prediction_id, so every outcome can be traced to what was predicted,
// shown and done.
export const instrumentation: Scene = {
  id: 'instrumentation',
  title: 'Prediction, action, outcome, exposure',
  flow: 'TB',
  nodes: [
    {
      id: 'events',
      label: 'Four events, one key',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'e-pred', label: 'Prediction', sub: 'risk 0.64, v14, 13:02', pattern: 'network', icon: 'sigma' },
        { id: 'e-expo', label: 'Exposure', sub: 'window "3–5 days" shown', pattern: 'user', icon: 'globe' },
        { id: 'e-act', label: 'Action', sub: 'ops expedited, 15:40', pattern: 'warn', icon: 'zap' },
        { id: 'e-out', label: 'Outcome', sub: 'delivered day 2: on time', pattern: 'storage', icon: 'clock' },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'What each event must record',
      headers: ['event', 'key fields', 'why'],
      values: [
        ['prediction', 'prediction_id, model_version, features, risk', 'what the model said'],
        ['exposure', 'prediction_id, window shown, arm', 'what the customer saw'],
        ['action', 'prediction_id, action, by whom, when', 'what changed the outcome'],
        ['outcome', 'order_id, delivered_at, promised_at', 'the label, once matured'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'events/action.avsc',
      label: `{"name": "OrderAction", "fields": [
  {"name": "prediction_id", "type": "string"},
  {"name": "action", "type": {"type": "enum", "symbols": ["NONE", "EXPEDITE", "REROUTE"]}},
  {"name": "decided_by", "type": "string"},      // rule id or operator
  {"name": "in_holdout", "type": "boolean"},     // see § 3
  {"name": "at", "type": "long", "logicalType": "timestamp-millis"}]}`,
    },
  ],
  edges: [
    { source: 'events', target: 'table', label: 'recorded as' },
    { source: 'table', target: 'code', label: 'one schema' },
  ],
}
