import type { Section } from '../types'

export const caching: Section = {
  id: 'caching',
  title: 'Caching and hidden dependency invalidation',
  scene: 'caching',
  focus: 'steps',
  slide: `## A cache hit is only as good as its key

An orchestrator caches a step by hashing its code and **declared** inputs. Anything the step reads without declaring it is invisible to the cache.

### Rerunning April after a fix to zone_lookup
- Every step's key is unchanged, so every step is a cache **hit**
- build_features also reads zone_lookup, which it never **declared**
- Its cached output is stale, and so are the model and metrics after it
- The rerun "succeeds" in seconds and **changes nothing**

### Undeclared inputs to look for
- A "latest" table that is updated in place
- The current time, from datetime.now()
- An unpinned library in the environment

### The fix
- Declare zone_lookup@v12 as an **input**, so a new version changes the key`,
  narration:
    "Orchestrators cache steps to avoid repeating work. A step's cache key is a hash of its code and its declared inputs, and if the key has been seen before, the stored output is reused. A cache hit is therefore only as good as its key, because anything a step reads without declaring it is invisible to the cache. Here the April pipeline is rerun after a fix to the zone lookup table, which maps postcodes to delivery zones. Every step's code is unchanged and every declared input is unchanged, so every step is a cache hit. But build features also reads the zone lookup table, and never declared it as an input. Its cached output was computed with the old zones and is now stale, and so are the model trained from it and the metrics computed from that model. The rerun reports success within seconds, and changes nothing at all. There are three common kinds of undeclared input to look for: a latest table that is updated in place, the current time read from the clock, and an unpinned library in the environment. The fix is to declare the zone lookup table, at a specific version, as an input of build features. Then a new version of the table changes the cache key, and the step reruns.",
}
