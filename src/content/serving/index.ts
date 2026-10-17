import type { Course } from '../types'
import { batch } from './01-batch'
import { publication } from './02-publication'
import { partial } from './03-partial'
import { startup } from './04-startup'
import { latency } from './05-latency'
import { overload } from './06-overload'
import { timeouts } from './07-timeouts'
import { caching } from './08-caching'

// Chapter 7 — recoverable batch scoring and a bounded, attributed online request path.
export const serving: Course = {
  id: 'serving',
  title: 'Batch and Online Prediction',
  sections: [batch, publication, partial, startup, latency, overload, timeouts, caching],
}
