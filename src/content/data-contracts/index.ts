import type { Course } from '../types'
import { schema } from './01-schema'
import { quality } from './02-quality'
import { labels } from './03-labels'
import { times } from './04-times'
import { asof } from './05-asof'
import { parity } from './06-parity'
import { fallback } from './07-fallback'
import { evolution } from './08-evolution'

// Chapter 2 — dataset contracts, time-correct features, parity, fallbacks and feature evolution.
export const dataContracts: Course = {
  id: 'data-contracts',
  title: 'Data and Feature Contracts',
  sections: [schema, quality, labels, times, asof, parity, fallback, evolution],
}
