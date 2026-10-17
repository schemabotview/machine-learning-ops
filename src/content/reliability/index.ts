import type { Course } from '../types'
import { capacity } from './01-capacity'
import { domains } from './02-domains'
import { cost } from './03-cost'
import { platforms } from './04-platforms'
import { restore } from './05-restore'
import { incident } from './06-incident'
import { repair } from './07-repair'
import { postmortem } from './08-postmortem'

// Chapter 11 — proportionate capacity and platform choices, and recovering and learning from failure.
export const reliability: Course = {
  id: 'reliability',
  title: 'Capacity, Reliability, and Incident Learning',
  sections: [capacity, domains, cost, platforms, restore, incident, repair, postmortem],
}
