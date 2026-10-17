import type { Scene } from '@graphlearning/flow'

// §7 — what each recovery step can restore, and what was already done in the world.
export const repair: Scene = {
  id: 'repair',
  title: 'Repair, replay, rollback, irreversible actions',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Recovering from INC-0610',
      headers: ['step', 'restores', 'reversible?'],
      values: [
        ['convert delivered_at to UTC at ingest', 'correct new features', 'yes'],
        ['replay feature history since Monday', 'correct training data', 'yes'],
        ['roll the model back to v12?', 'nothing: the model was fine', 'not needed'],
        ['re-score open orders', 'correct windows from now on', 'yes'],
        ['windows shown Mon–Wed', 'cannot be unshown', 'no'],
        ['orders lost to wide windows', 'cannot be recovered', 'no'],
        ['Mon–Wed labels in next retrain', 'exclude or flag them', 'decided in postmortem'],
      ],
    },
    {
      id: 'kinds',
      label: 'Three kinds of recovery',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'k-repair', label: 'Repair', sub: 'fix the cause', pattern: 'service', icon: 'pencil' },
        { id: 'k-replay', label: 'Replay', sub: 'recompute what it touched', pattern: 'network', icon: 'repeat' },
        { id: 'k-world', label: 'The world', sub: 'already happened', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'replay',
      kind: 'code',
      filename: 'incident/INC-0610/replay.sh',
      label: `features replay zone_delay_3h \\
  --from 2026-06-08T02:00Z --reason INC-0610
planning backfill --from 2026-06-09 --to 2026-06-11
training-data flag --from 2026-06-08 \\
  --to 2026-06-10 --tag INC-0610      # windows were wrong`,
    },
  ],
  edges: [
    { source: 'steps', target: 'kinds', label: 'three kinds' },
    { source: 'kinds', target: 'replay', label: 'the replay' },
  ],
}
