import type { Scene } from '@graphlearning/flow'

// §4 — what may start a retraining run, and what each trigger should actually do.
export const updateTriggers: Scene = {
  id: 'update-triggers',
  title: 'Update triggers',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Four triggers for the late-risk model',
      headers: ['trigger', 'fires when', 'then'],
      values: [
        ['schedule', '1st of each month', 'train a candidate; gates decide'],
        ['data', 'a new month of matured labels', 'same as schedule'],
        ['drift alert', 'PSI > 0.25 on a feature', 'investigate first (ch 8 § 8)'],
        ['performance', 'weekly log loss > 0.40', 'diagnose; retrain only if the cause is the model'],
      ],
    },
    {
      id: 'week15',
      label: 'Week 15: why "retrain on drift" would have been wrong',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-alert', label: 'Drift alert', sub: 'distance_km PSI 0.46', pattern: 'warn', icon: 'gauge' },
        { id: 'w-cause', label: 'Cause', sub: 'metres from one source', pattern: 'storage', icon: 'database' },
        { id: 'w-retrain', label: 'If retrained', sub: 'learns the bug', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'ct',
      kind: 'table',
      label: 'Continuous training is not continuous deployment',
      headers: ['step', 'automatic?'],
      values: [
        ['train a candidate', 'yes'],
        ['run the gates (ch 5)', 'yes'],
        ['roll out (ch 6)', 'no: approval, then a canary'],
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'week15', label: 'one example' },
    { source: 'week15', target: 'ct' },
  ],
}
