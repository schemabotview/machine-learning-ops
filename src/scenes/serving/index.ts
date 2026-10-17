import type { Scene } from '@graphlearning/flow'
import { batch } from './batch'
import { publication } from './publication'
import { partial } from './partial'
import { startup } from './startup'
import { latency } from './latency'
import { overload } from './overload'
import { timeouts } from './timeouts'
import { servingCache } from './caching'

// Chapter 7 — Batch and Online Prediction. Spread into src/scenes/index.ts.
export const servingScenes: Scene[] = [batch, publication, partial, startup, latency, overload, timeouts, servingCache]
