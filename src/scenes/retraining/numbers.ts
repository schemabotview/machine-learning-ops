// Chapter 9 numerics, COMPUTED.

// §2 — orders per arm to detect a fall in the broken-promise rate from 8% to 7% (two-sided α = 0.05,
// power 0.8), normal approximation for two proportions.
export const p1 = 0.08, p2 = 0.07, zA = 1.96, zB = 0.8416
export const perArm = Math.ceil(((zA + zB) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))) / (p1 - p2) ** 2)
export const ordersPerDay = 180_000 // the planning job's nightly volume; split 50/50 by customer
// Customers place several orders, so the effective sample is smaller: design effect for clustering.
export const ordersPerCustomer = 2.5, icc = 0.05
export const designEffect = 1 + (ordersPerCustomer - 1) * icc
export const hoursNeeded = (2 * perArm * designEffect) / (ordersPerDay / 24)
// The calendar, not the sample size, sets the length: two full weekly cycles, then label maturity.
export const runDays = 14, maturityDays = 7

// §3 — operations expedite orders with predicted risk > 0.6. Among those orders the true late rate
// without expediting is 60%; expediting brings it to 15%. 80% of eligible orders get expedited.
export const trueLate = 0.6, expeditedLate = 0.15, expediteShare = 0.8
export const observedLate = expediteShare * expeditedLate + (1 - expediteShare) * trueLate
// A 5% random holdout is never expedited: it keeps an unbiased view of the high-risk group.
export const holdoutShare = 0.05
export const highRiskPerWeek = 4_000
export const holdoutPerWeek = Math.round(highRiskPerWeek * holdoutShare)
