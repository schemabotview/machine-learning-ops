import type { Scene } from '@graphlearning/flow'

// §7 — a retried partition against a timed-out request: same word, opposite budgets.
export const timeouts: Scene = {
  id: 'timeouts',
  title: 'Timeouts, retries, cancellation, fallback',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'One retry, two systems',
      headers: ['', 'nightly partition', 'checkout request'],
      values: [
        ['time budget', 'hours, until 05:00', '150 ms, while a customer waits'],
        ['on a feature timeout', 'retry the partition, twice', 'no retry: 40 ms used, none left'],
        ['the answer meanwhile', 'none needed', 'rule-based window now'],
        ['work after giving up', 'cancelled, staging dropped', 'cancel the feature call'],
        ['says it fell back', 'run status: retried', 'source = "fallback" in response'],
      ],
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'One request at peak, feature store slow',
      headers: ['ms', 'event'],
      values: [
        ['0', 'request arrives; validate (2 ms)'],
        ['2', 'feature fetch starts, deadline 40 ms'],
        ['42', 'deadline passes: cancel the call'],
        ['44', 'rule-based window from distance and zone'],
        ['47', 'respond, source = "fallback", model_version = null'],
      ],
    },
    {
      id: 'rules',
      label: 'Rules for a fallback',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-doc', label: 'Documented', sub: 'what it computes', pattern: 'service', icon: 'pencil' },
        { id: 'r-label', label: 'Labelled', sub: 'never claims the model', pattern: 'warn', icon: 'tag' },
        { id: 'r-count', label: 'Counted', sub: 'a rate with an alert', pattern: 'network', icon: 'barchart' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'trace', label: 'the request side' },
    { source: 'trace', target: 'rules' },
  ],
}
