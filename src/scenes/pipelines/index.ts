import type { Scene } from '@graphlearning/flow'
import { dag } from './dag'
import { branches } from './branches'
import { triggers } from './triggers'
import { caching } from './caching'
import { idempotency } from './idempotency'
import { backfill } from './backfill'
import { portability } from './portability'

// Chapter 4 — Orchestration and Automated Pipelines. Spread into src/scenes/index.ts.
export const pipelinesScenes: Scene[] = [dag, branches, triggers, caching, idempotency, backfill, portability]
