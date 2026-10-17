import type { Course } from '../types'
import { layers } from './01-layers'
import { champion } from './02-champion'
import { checks } from './03-checks'
import { gates } from './04-gates'
import { bundle } from './05-bundle'
import { aliases } from './06-aliases'
import { serialisation } from './07-serialisation'
import { retained } from './08-retained'

// Chapter 5 — layered candidate checks, gate verdicts, complete bundles and registry semantics.
export const releaseEvidence: Course = {
  id: 'release-evidence',
  title: 'Validation, Artefacts, and Release Evidence',
  sections: [layers, champion, checks, gates, bundle, aliases, serialisation, retained],
}
