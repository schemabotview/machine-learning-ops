import type { Scene } from '@graphlearning/flow'

// §5 — the training window must end where labels are complete, and the candidate must be rebuildable.
export const labelWindow: Scene = {
  id: 'label-window',
  title: 'Label-eligible windows and reproducible candidates',
  flow: 'TB',
  nodes: [
    {
      id: 'window',
      kind: 'table',
      label: 'The May retrain, run on 1 May',
      headers: ['boundary', 'date', 'why'],
      values: [
        ['training starts', '2025-11-01', '6 months, includes December'],
        ['training ends', '2026-04-17', '1 May − 14 days'],
        ['validation', '2026-04-18 – 04-24', 'the latest matured week'],
        ['excluded', '2026-04-25 – 04-30', 'labels not mature yet'],
        ['holdout orders', 'all, flagged', 'unbiased high-risk labels'],
      ],
    },
    {
      id: 'why',
      label: 'If the window ran to yesterday',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'y-late', label: 'Recent orders', sub: 'mostly "on time" so far', pattern: 'warn', icon: 'clock' },
        { id: 'y-bias', label: 'Biased model', sub: 'risk learned too low', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'retrain/window.py',
      label: `def training_window(run_date: date) -> Window:
    end = run_date - timedelta(days=14)        # label matures at promised + 3 d; promises run to ~10 d
    return Window(start=end - relativedelta(months=6), end=end,
                  snapshot=f"orders_snapshot@{run_date:%Y-%m-%d}T01:00Z")   # named, rebuildable`,
    },
  ],
  edges: [
    { source: 'window', target: 'why', label: 'not' },
    { source: 'why', target: 'code', label: 'enforced' },
  ],
}
