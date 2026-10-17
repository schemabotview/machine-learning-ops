import type { Course } from '../types'
import { slo } from './01-slo'
import { signals } from './02-signals'
import { telemetry } from './03-telemetry'
import { privacy } from './04-privacy'
import { change } from './05-change'
import { drift } from './06-drift'
import { outcomes } from './07-outcomes'
import { triage } from './08-triage'

// Chapter 8 — service objectives, attributed telemetry, and drift and quality read under their limits.
export const observability: Course = {
  id: 'observability',
  title: 'Observability, Quality, and Drift',
  sections: [slo, signals, telemetry, privacy, change, drift, outcomes, triage],
}
