import { rng } from '../points'

// Chapter 7 numerics, COMPUTED.

// §1/§3 — the nightly planning job: 180,000 orders in 64 zone partitions of uneven size (seeded).
const r = rng(71)
const raw = Array.from({ length: 64 }, (_, i) => (i < 4 ? 4 + r() * 2 : 0.6 + r() * 1.2)) // 4 city zones are big
const tot = raw.reduce((a, b) => a + b, 0)
const rounded = raw.map((v) => Math.round((v / tot) * 180_000))
rounded[63] += 180_000 - rounded.reduce((a, b) => a + b, 0) // make the total exact
export const parts = rounded
export const totalOrders = parts.reduce((a, b) => a + b, 0)
export const ordersPerMin = 1125 // per worker (4 CPUs, chapter 4: 40 min a night)
export const workers = 4
export const partMin = parts.map((p) => p / ordersPerMin)
export const largest = Math.max(...parts)
/** Greedy longest-first assignment of partitions to workers; wall time = busiest worker. */
export const wallMin = (() => {
  const load = Array(workers).fill(0)
  for (const m of [...partMin].sort((a, b) => b - a)) load[load.indexOf(Math.min(...load))] += m
  return Math.max(...load)
})()
export const failed = [17, 42, 58] // partitions that failed on the first attempt
export const failedOrders = failed.reduce((a, i) => a + parts[i], 0)

// §5 — the p99 latency budget for one checkout request.
export const budget = [
  { step: 'network in + TLS', ms: 12 },
  { step: 'parse + validate schema', ms: 3 },
  { step: 'feature fetch (timeout)', ms: 40 },
  { step: 'model predict', ms: 25 },
  { step: 'post-process + log', ms: 5 },
  { step: 'network out', ms: 10 },
]
export const budgetSum = budget.reduce((a, b) => a + b.ms, 0)

// §6 — one replica: 4 workers, 30 ms service time each → capacity 133 rps. Mean time in system for
// a simple queue, W = S / (1 − ρ), against offered load.
export const svcMs = 30, perReplica = 4
export const capacity = (perReplica * 1000) / svcMs
export const wait = (rps: number) => {
  const rho = rps / capacity
  return rho >= 1 ? Infinity : svcMs / (1 - rho)
}
