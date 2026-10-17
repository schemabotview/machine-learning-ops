import { requirements } from './requirements'
import { dataContracts } from './data-contracts'
import { runs } from './runs'
import { pipelines } from './pipelines'
import { releaseEvidence } from './release-evidence'
import { delivery } from './delivery'
import { serving } from './serving'
import { observability } from './observability'
import { retraining } from './retraining'
import { governance } from './governance'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [requirements.id]: requirements,
  [dataContracts.id]: dataContracts,
  [runs.id]: runs,
  [pipelines.id]: pipelines,
  [releaseEvidence.id]: releaseEvidence,
  [delivery.id]: delivery,
  [serving.id]: serving,
  [observability.id]: observability,
  [retraining.id]: retraining,
  [governance.id]: governance,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
