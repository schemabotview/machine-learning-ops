import type { Scene } from '@graphlearning/flow'
import { access } from './access'
import { secrets } from './secrets'
import { minimise } from './minimise'
import { deletion } from './deletion'
import { supply } from './supply'
import { threats } from './threats'
import { review } from './review'
import { obligations } from './obligations'

// Chapter 10 — Security, Privacy, and Governance. Spread into src/scenes/index.ts.
export const governanceScenes: Scene[] = [access, secrets, minimise, deletion, supply, threats, review, obligations]
