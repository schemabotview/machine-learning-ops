import type { Course } from '../types'
import { identity } from './01-identity'
import { tracking } from './02-tracking'
import { lineage } from './03-lineage'
import { job } from './04-job'
import { budget } from './05-budget'
import { resume } from './06-resume'
import { retries } from './07-retries'

// Chapter 3 — run identity and evidence, and the execution and recovery contract of training jobs.
export const runs: Course = {
  id: 'runs',
  title: 'Reproducible Runs and Training Jobs',
  sections: [identity, tracking, lineage, job, budget, resume, retries],
}
