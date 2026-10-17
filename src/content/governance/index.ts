import type { Course } from '../types'
import { access } from './01-access'
import { secrets } from './02-secrets'
import { minimise } from './03-minimise'
import { deletion } from './04-deletion'
import { supply } from './05-supply'
import { threats } from './06-threats'
import { review } from './07-review'
import { obligations } from './08-obligations'

// Chapter 10 — proportionate lifecycle controls, traceability, and where specialist review begins.
export const governance: Course = {
  id: 'governance',
  title: 'Security, Privacy, and Governance',
  sections: [access, secrets, minimise, deletion, supply, threats, review, obligations],
}
