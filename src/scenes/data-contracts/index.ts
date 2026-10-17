import type { Scene } from '@graphlearning/flow'
import { schema } from './schema'
import { quality } from './quality'
import { labels } from './labels'
import { times } from './times'
import { asof } from './asof'
import { parityScene } from './parity'
import { fallback } from './fallback'
import { evolution } from './evolution'

// Chapter 2 — Data and Feature Contracts. Spread into src/scenes/index.ts.
export const dataContractsScenes: Scene[] = [schema, quality, labels, times, asof, parityScene, fallback, evolution]
