import type { Scene } from '@graphlearning/flow'
import { rounds, every, preemptedAt, resumeFrom, lostRounds, secPerRound } from './numbers'

// §6 — an interrupted 1,000-round job, checkpointed every 100 rounds. COMPUTED trace.
export const resume: Scene = {
  id: 'resume',
  title: 'Checkpoint, resume, incomplete outputs',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: `${rounds} boosting rounds on a spot instance, checkpoint every ${every}`,
      headers: ['time', 'event', 'state on disk'],
      values: [
        ['09:15', 'job starts, round 0', 'staging/ empty'],
        ['09:43', `checkpoint at round ${resumeFrom}`, `ckpt-${resumeFrom}: trees + RNG + iterator`],
        [`${'09:44'}`, `instance preempted at round ${preemptedAt}`, 'staging/ has a partial model'],
        ['09:46', `retry resumes from ${resumeFrom}`, `${lostRounds} rounds redone (${((lostRounds * secPerRound) / 60).toFixed(1)} min)`],
        ['10:00', `round ${rounds}, evaluate, publish`, 'candidates/ gets the full set'],
      ],
    },
    {
      id: 'state',
      label: 'What a checkpoint must hold',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-model', label: 'Model so far', sub: `trees 1 … ${resumeFrom}`, pattern: 'service', icon: 'layers' },
        { id: 's-rng', label: 'RNG state', sub: 'row/column sampling', pattern: 'network', icon: 'repeat' },
        { id: 's-data', label: 'Data position', sub: 'which batch is next', pattern: 'storage', icon: 'database' },
        { id: 's-partial', label: 'Partial output', sub: 'never published', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'train.py',
      label: `ckpt = latest_checkpoint(staging)                 # None on a fresh start
booster, rng = (load(ckpt) if ckpt else (None, np.random.default_rng(cfg.seed)))
for rnd in range(start_round(ckpt), cfg.rounds):
    booster = boost_one_round(booster, data, rng)
    if (rnd + 1) % 100 == 0:
        save_checkpoint(staging, booster, rng, rnd + 1)   # write to tmp, then rename`,
    },
  ],
  edges: [
    { source: 'trace', target: 'state', label: 'resume needs' },
    { source: 'state', target: 'code' },
  ],
}
