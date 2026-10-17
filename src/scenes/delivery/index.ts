import type { Scene } from '@graphlearning/flow'
import { distinctions } from './distinctions'
import { buildOnce } from './build-once'
import { environments } from './environments'
import { rolloutPatterns } from './patterns'
import { traffic } from './traffic'
import { delayed } from './delayed'
import { rollback } from './rollback'
import { audit } from './audit'

// Chapter 6 — CI/CD, Rollouts, and Rollback. Spread into src/scenes/index.ts.
export const deliveryScenes: Scene[] = [distinctions, buildOnce, environments, rolloutPatterns, traffic, delayed, rollback, audit]
