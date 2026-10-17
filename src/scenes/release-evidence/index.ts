import type { Scene } from '@graphlearning/flow'
import { layers } from './layers'
import { champion } from './champion'
import { checks } from './checks'
import { gates } from './gates'
import { bundle } from './bundle'
import { aliases } from './aliases'
import { serialisation } from './serialisation'
import { retained } from './retained'

// Chapter 5 — Validation, Artefacts, and Release Evidence. Spread into src/scenes/index.ts.
export const releaseEvidenceScenes: Scene[] = [layers, champion, checks, gates, bundle, aliases, serialisation, retained]
