import type { Scene } from '@graphlearning/flow'

// §6 — backfilling 30 nights of planning scores after a feature fix, under a CPU quota. Each night
// takes 40 min on 4 CPUs; the team quota is 16 CPUs, so at most 4 run at once. COMPUTED.
export const nights = 30, minEach = 40, cpuEach = 4, quota = 16
export const parallel = Math.floor(quota / cpuEach)
export const wallH = (Math.ceil(nights / parallel) * minEach) / 60
export const serialH = (nights * minEach) / 60

export const backfill: Scene = {
  id: 'backfill',
  title: 'Parallel branches, quotas, backfills',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'table',
      label: `Backfill: ${nights} nights after the zone_lookup fix`,
      headers: ['setting', 'value', 'consequence'],
      values: [
        ['per night', `${minEach} min on ${cpuEach} CPUs`, '—'],
        ['team quota', `${quota} CPUs`, `at most ${parallel} nights at once`],
        ['one at a time', `${serialH.toFixed(0)} h`, 'overlaps the nightly run'],
        [`${parallel} in parallel`, `${wallH.toFixed(1)} h`, 'fits, with the nightly run reserved'],
        ['nightly run', 'priority over backfill', 'tonight still lands by 05:00'],
      ],
    },
    {
      id: 'meta',
      label: 'Each backfilled night records',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm-key', label: 'Run key', sub: 'same as a normal night', pattern: 'service', icon: 'key' },
        { id: 'm-why', label: 'Reason', sub: 'backfill: zone fix', pattern: 'user', icon: 'pencil' },
        { id: 'm-ver', label: 'Versions', sub: 'pipeline, features', pattern: 'network', icon: 'gitbranch' },
        { id: 'm-old', label: 'Replaces', sub: 'the old run key', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'backfill.sh',
      label: `orchestrator backfill planning-daily@7 \\
  --from 2026-03-03 --to 2026-04-01 \\
  --max-active-runs 4 --pool backfill-cpu --priority low \\
  --reason "zone_lookup v12 fix" --replace-existing`,
    },
  ],
  edges: [
    { source: 'plan', target: 'meta', label: 'and the record' },
    { source: 'meta', target: 'code' },
  ],
}
