import type { Scene } from '@graphlearning/flow'
import { capacityScene } from './capacity'
import { domains } from './domains'
import { cost } from './cost'
import { platforms } from './platforms'
import { restore } from './restore'
import { incident } from './incident'
import { repair } from './repair'
import { postmortem } from './postmortem'

// Chapter 11 — Capacity, Reliability, and Incident Learning. Spread into src/scenes/index.ts.
export const reliabilityScenes: Scene[] = [capacityScene, domains, cost, platforms, restore, incident, repair, postmortem]
