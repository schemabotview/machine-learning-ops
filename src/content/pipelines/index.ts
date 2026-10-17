import type { Course } from '../types'
import { dag } from './01-dag'
import { branches } from './02-branches'
import { triggers } from './03-triggers'
import { caching } from './04-caching'
import { idempotency } from './05-idempotency'
import { backfill } from './06-backfill'
import { portability } from './07-portability'

// Chapter 4 — dependency-aware execution, run identity, caching, idempotent outputs and backfills.
export const pipelines: Course = {
  id: 'pipelines',
  title: 'Orchestration and Automated Pipelines',
  sections: [dag, branches, triggers, caching, idempotency, backfill, portability],
}
