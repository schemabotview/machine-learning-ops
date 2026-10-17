import type { Section } from '../types'

export const identity: Section = {
  id: 'identity',
  title: 'Code/data/feature/configuration/environment identity',
  scene: 'run-identity',
  focus: 'parts',
  slide: `## What names a run

A training run is defined by everything that could change its result. Record each one as an **identity**, not a description.

### Five identities, plus the split
- **Code**: a git commit, and whether the tree was dirty
- **Data**: a named snapshot, not "the orders table"
- **Features**: the feature view and its version
- **Configuration**: the file, its hash and the seed
- **Environment**: the container image digest and the lock file
- **Split**: the manifest and its fingerprint

### If one is missing
- No commit, or a dirty tree: the code that ran is **unknown**
- No snapshot id: **which rows** were used is unknown
- No image digest: library versions that change results are **lost**
- A score without them is a **result** with no recipe`,
  narration:
    "A training run is defined by everything that could change its result, and each of those things should be recorded as an identity, something that names one exact version, rather than as a description. There are five, plus the split. The code is identified by a git commit, together with a flag saying whether the working tree had uncommitted changes, because a dirty tree means the commit does not describe what ran. The data is a named snapshot, such as the orders snapshot version three as of the first of March, never just the orders table, which changes every day. The features are a feature view and its version. The configuration is the file, its hash and the random seed. The environment is the container image digest and the dependency lock file, since library versions can change results. And the split is its manifest and a fingerprint of its identifiers. The run manifest on the left records all of them in a few lines. The cost of missing one is concrete. Without the commit, or with a dirty tree, nobody knows what code ran. Without the snapshot identifier, nobody knows which rows were used. And without the image digest, the library versions that produced the model are lost.",
}
