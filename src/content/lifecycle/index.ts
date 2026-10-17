import type { Course } from '../types'
import { systemMap } from './01-system-map'
import { manifests } from './02-manifests'
import { walkthrough } from './03-walkthrough'
import { policies } from './04-policies'
import { risks } from './05-risks'
import { proportion } from './06-proportion'

// Chapter 12 — one reviewable lifecycle design, its evidence and its unresolved risks.
export const lifecycle: Course = {
  id: 'lifecycle',
  title: 'Integrated Lifecycle and Evolution',
  sections: [systemMap, manifests, walkthrough, policies, risks, proportion],
}
