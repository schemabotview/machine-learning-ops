import type { Scene } from '@graphlearning/flow'
import { instrumentation } from './instrumentation'
import { experiment } from './experiment'
import { feedback } from './feedback'
import { updateTriggers } from './triggers'
import { labelWindow } from './window'
import { promotion } from './promotion'
import { races } from './races'
import { retire } from './retire'

// Chapter 9 — Feedback, Experiments, and Controlled Retraining. Spread into src/scenes/index.ts.
export const retrainingScenes: Scene[] = [instrumentation, experiment, feedback, updateTriggers, labelWindow, promotion, races, retire]
