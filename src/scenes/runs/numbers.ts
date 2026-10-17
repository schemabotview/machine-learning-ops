import { rng } from '../points'

// Chapter 3 numerics, COMPUTED.

/** FNV-1a over a list of ids: a short, stable fingerprint for a split. */
export function fingerprint(ids: string[]) {
  let h = 0x811c9dc5
  for (const c of ids.join('\n')) {
    h ^= c.charCodeAt(0)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}
const ids = (from: number, to: number) => Array.from({ length: to - from }, (_, i) => `o${from + i}`)
export const splitV3 = fingerprint(ids(0, 1200))
export const splitV3b = fingerprint(ids(0, 1200)) // the same ids → the same fingerprint
export const splitV4 = fingerprint([...ids(0, 1199), 'o5000']) // one id changed

// §5 — a 40-trial random search on validation log loss (seeded); best-so-far curve.
const r = rng(53)
export const trials = Array.from({ length: 40 }, () => 0.392 + Math.abs((r() + r() + r() - 1.5) * 0.03) + r() * 0.01)
export const bestSoFar = trials.map((_, i) => Math.min(...trials.slice(0, i + 1)))
export const minutesPerTrial = 6, workers = 4
export const wallHours = (k: number) => (Math.ceil(k / workers) * minutesPerTrial) / 60

// §6 — a 1,000-round boosting job on a spot instance, checkpointed every 100 rounds, preempted.
export const rounds = 1000, every = 100, preemptedAt = 730, secPerRound = 2.4
export const resumeFrom = Math.floor(preemptedAt / every) * every
export const lostRounds = preemptedAt - resumeFrom

// §7 — five reruns of the same configuration, same seed, multi-threaded: tiny numerical variation.
const r7 = rng(71)
export const reruns = Array.from({ length: 5 }, () => 0.3925 + (r7() - 0.5) * 0.0012)
