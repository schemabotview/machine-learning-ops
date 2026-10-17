import { rng } from '../points'
import { fingerprint } from '../runs/numbers'

// Chapter 6 numerics, COMPUTED.

// §5 — sticky assignment: hash(customer_id, salt) → bucket 0–99; buckets 0–4 get the canary (5%).
export const bucket = (id: string, salt = 'late-risk-v14-canary') => parseInt(fingerprint([salt, id]), 16) % 100
const customers = Array.from({ length: 20000 }, (_, i) => `c${100000 + i}`)
export const canaryShare = customers.filter((c) => bucket(c) < 5).length / customers.length
// Per-request random assignment, for contrast: a customer with 6 checkouts sees both models.
const r = rng(61)
export const mixedShare = (() => {
  let mixed = 0
  for (let c = 0; c < 2000; c++) {
    const arms = new Set(Array.from({ length: 6 }, () => (r() < 0.05 ? 'canary' : 'stable')))
    if (arms.size > 1) mixed++
  }
  return mixed / 2000
})()

// §6 — label maturity after exposure: delivery happens 1–5 days after checkout, and the label is
// final at promised date + 3 days. Share of canary orders with a matured label by day d.
const r6 = rng(62)
const matureDay = Array.from({ length: 5000 }, () => 3 + Math.floor(r6() * 3) + Math.floor(r6() * 3)) // promised (1–3 d) … + 3 d buffer
export const maturedBy = (d: number) => matureDay.filter((m) => m <= d).length / matureDay.length
