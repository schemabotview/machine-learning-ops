import type { Scene } from '@graphlearning/flow'
import { requirementsScenes } from './requirements'
import { dataContractsScenes } from './data-contracts'
import { runsScenes } from './runs'
import { pipelinesScenes } from './pipelines'
import { releaseEvidenceScenes } from './release-evidence'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...requirementsScenes, ...dataContractsScenes, ...runsScenes, ...pipelinesScenes, ...releaseEvidenceScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
