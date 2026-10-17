import { rng, percentile } from '../points'

// Chapter 5 numerics, COMPUTED. Champion v12 and candidate v13 are scored on the same protected
// test set of 2,400 matured orders. Per-order log losses are seeded; the candidate is slightly better
// on average, with a lot of per-order noise.
const r = rng(505)
const N = 2400
const g = () => (r() + r() + r() + r() - 2) * 1.22
export const champ = Array.from({ length: N }, () => Math.max(0.02, 0.394 + 0.32 * g()))
export const cand = champ.map((c) => Math.max(0.02, c - 0.006 + 0.05 * g()))
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
export const champMean = mean(champ), candMean = mean(cand)
export const diffs = cand.map((c, i) => c - champ[i])
export const diffMean = mean(diffs)

// Paired bootstrap of the mean difference (candidate − champion): 1,000 resamples.
const rb = rng(506)
export const boot = Array.from({ length: 1000 }, () => {
  let s = 0
  for (let i = 0; i < N; i++) s += diffs[Math.floor(rb() * N)]
  return s / N
})
export const ciLo = percentile(boot, 2.5), ciHi = percentile(boot, 97.5)
export const margin = -0.002 // the gate: candidate must improve log loss by at least 0.002

// A second, lighter candidate (v13-lite): smaller gain, same protocol.
export const lite = champ.map((c) => Math.max(0.02, c - 0.0015 + 0.05 * g()))
const dl = lite.map((c, i) => c - champ[i])
export const liteMean = mean(dl)
const rl = rng(507)
const bootL = Array.from({ length: 1000 }, () => {
  let s = 0
  for (let i = 0; i < N; i++) s += dl[Math.floor(rl() * N)]
  return s / N
})
export const liteLo = percentile(bootL, 2.5), liteHi = percentile(bootL, 97.5)
