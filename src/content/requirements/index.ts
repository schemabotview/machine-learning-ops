import type { Course } from '../types'
import { objective } from './01-objective'
import { modes } from './02-modes'
import { contracts } from './03-contracts'
import { interfaces } from './04-interfaces'
import { tests } from './05-tests'
import { failure } from './06-failure'
import { automation } from './07-automation'

// Chapter 1 — an ML system's purpose, contracts, software boundaries and proportionate automation.
export const requirements: Course = {
  id: 'requirements',
  title: 'System Requirements and Engineering Boundaries',
  sections: [objective, modes, contracts, interfaces, tests, failure, automation],
}
