import type { Scene } from '@graphlearning/flow'
import { objective } from './objective'
import { modes } from './modes'
import { contracts } from './contracts'
import { interfaces } from './interfaces'
import { tests } from './tests'
import { failure } from './failure'
import { automation } from './automation'

// Chapter 1 — System Requirements and Engineering Boundaries. Spread into src/scenes/index.ts.
export const requirementsScenes: Scene[] = [objective, modes, contracts, interfaces, tests, failure, automation]
