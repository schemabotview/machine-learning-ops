import type { Course } from '../types'
import { instrumentation } from './01-instrumentation'
import { experiment } from './02-experiment'
import { feedback } from './03-feedback'
import { triggers } from './04-triggers'
import { window } from './05-window'
import { promotion } from './06-promotion'
import { races } from './07-races'
import { retire } from './08-retire'

// Chapter 9 — deployment evidence, feedback bias, and a controlled maintenance loop.
export const retraining: Course = {
  id: 'retraining',
  title: 'Feedback, Experiments, and Controlled Retraining',
  sections: [instrumentation, experiment, feedback, triggers, window, promotion, races, retire],
}
