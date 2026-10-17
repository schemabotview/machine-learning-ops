import { rng } from '../points'

// Chapter 8 numerics, COMPUTED.

// §1 — availability SLO 99.9% over 30 days at an average 12 requests/s; three incidents in April.
export const monthly = 12 * 86400 * 30
export const budget = Math.round(monthly * 0.001)
export const incidents = [
  { day: 6, what: 'feature store failover, 9 min', bad: 9 * 60 * 30 },
  { day: 14, what: 'bad config push, 4 min', bad: 4 * 60 * 40 },
  { day: 23, what: 'node pool drain, 22 min at 20%', bad: Math.round(22 * 60 * 12 * 0.2) },
]
export const spent = incidents.reduce((a, i) => a + i.bad, 0)

// §6 — Population Stability Index over 10 reference-quantile bins.
export function psi(ref: number[], cur: number[], bins = 10) {
  const s = [...ref].sort((a, b) => a - b)
  const edges = Array.from({ length: bins - 1 }, (_, i) => s[Math.floor(((i + 1) / bins) * s.length)])
  const share = (xs: number[]) => {
    const c = Array(bins).fill(0)
    for (const x of xs) c[edges.filter((e) => x > e).length]++
    return c.map((v) => Math.max(v / xs.length, 1e-4))
  }
  const p = share(ref), q = share(cur)
  return p.reduce((a, pi, i) => a + (q[i] - pi) * Math.log(q[i] / pi), 0)
}
const r = rng(808)
const g = () => (r() + r() + r() + r() - 2) * 1.22
const distance = (n: number) => Array.from({ length: n }, () => Math.max(0.3, 6 + 4 * g()))
export const refDist = distance(5000)
// Week 15: one source (30% of orders) sends metres; the service stays up and predicts on garbage.
export const curDist = distance(5000).map((d) => (r() < 0.3 ? d * 1000 : d))
// December: more small, light parcels (gifts). Shift in weight, same delivery behaviour.
const weight = (n: number, m: number) => Array.from({ length: n }, () => Math.max(0.1, m + 1.4 * g()))
export const refWeight = weight(5000, 3.2)
export const decWeight = weight(5000, 2.4)
export const psiDistance = psi(refDist, curDist)
export const psiWeight = psi(refWeight, decWeight)

// §7 — one week of matured predictions, reliability by predicted-risk bucket (seeded, calibrated
// except in the top bucket, which under-predicts).
const r7 = rng(707)
export const buckets = [0.05, 0.15, 0.25, 0.35, 0.5, 0.7].map((p, i) => {
  const n = [3100, 2400, 1500, 900, 500, 200][i]
  const truth = i === 5 ? p + 0.12 : p
  let late = 0
  for (let k = 0; k < n; k++) if (r7() < truth) late++
  return { p, n, observed: late / n }
})
