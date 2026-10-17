// Chapter 11 numerics, COMPUTED from stated assumptions (illustrative, not benchmarks).
import { capacity } from '../serving/numbers'

// §1 — a day's demand (requests/s) by hour: overnight trough, lunchtime and evening peaks.
export const hourly = [1, 1, 1, 1, 1, 2, 4, 8, 11, 13, 15, 19, 20, 19, 15, 13, 15, 19, 26, 40, 24, 12, 6, 2]
export const avg = hourly.reduce((a, b) => a + b, 0) / hourly.length
export const peak = Math.max(...hourly)
export const surge = 3 // a sale day, assumed
export const perReplicaCap = capacity // 133 rps (chapter 7)
export const target = 0.5 // utilisation target
export const usable = perReplicaCap * target
/** Replicas so that the peak fits at the target utilisation even with one zone (half the fleet) lost. */
export const replicasFor = (rps: number) => {
  const needed = Math.ceil(rps / usable)
  return { needed, zoneSafe: 2 * needed }
}

// §3 — cost per 1,000 calls for two models at the same p99 (v13 needs twice the replicas to meet it), assuming £0.18 per replica-hour.
export const perHour = 0.18
export const monthlyCalls = Math.round(avg * 3600 * 24 * 30)
export const models = [
  { name: 'v14 (GBM, 300 trees)', replicas: 4, logLoss: 0.3941 },
  { name: 'v13 (ensemble, 1,800 trees)', replicas: 8, logLoss: 0.3936 },
]
export const costPer1k = (replicas: number) => (replicas * perHour * 24 * 30) / (monthlyCalls / 1000)
