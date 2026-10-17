import type { Course } from '../types'
import { distinctions } from './01-distinctions'
import { buildOnce } from './02-build-once'
import { environments } from './03-environments'
import { patterns } from './04-patterns'
import { traffic } from './05-traffic'
import { delayed } from './06-delayed'
import { rollback } from './07-rollback'
import { audit } from './08-audit'

// Chapter 6 — separate delivery loops, build-once promotion, rollouts, delayed evidence and rollback.
export const delivery: Course = {
  id: 'delivery',
  title: 'CI/CD, Rollouts, and Rollback',
  sections: [distinctions, buildOnce, environments, patterns, traffic, delayed, rollback, audit],
}
