import type { Scene } from '@graphlearning/flow'
import { slo } from './slo'
import { opsSignals } from './signals'
import { telemetry } from './telemetry'
import { privacy } from './privacy'
import { change } from './change'
import { drift } from './drift'
import { outcomes } from './outcomes'
import { triage } from './triage'

// Chapter 8 — Observability, Quality, and Drift. Spread into src/scenes/index.ts.
export const observabilityScenes: Scene[] = [slo, opsSignals, telemetry, privacy, change, drift, outcomes, triage]
