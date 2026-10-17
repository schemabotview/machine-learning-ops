import type { Scene } from '@graphlearning/flow'
import { systemMap } from './system-map'
import { manifests } from './manifests'
import { walkthrough } from './walkthrough'
import { policies } from './policies'
import { risks } from './risks'
import { proportion } from './proportion'

// Chapter 12 — Integrated Lifecycle and Evolution. Spread into src/scenes/index.ts.
export const lifecycleScenes: Scene[] = [systemMap, manifests, walkthrough, policies, risks, proportion]
