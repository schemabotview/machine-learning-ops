import type { Scene } from '@graphlearning/flow'
import { identity } from './identity'
import { tracking } from './tracking'
import { lineage } from './lineage'
import { job } from './job'
import { budget } from './budget'
import { resume } from './resume'
import { retries } from './retries'

// Chapter 3 — Reproducible Runs and Training Jobs. Spread into src/scenes/index.ts.
export const runsScenes: Scene[] = [identity, tracking, lineage, job, budget, resume, retries]
