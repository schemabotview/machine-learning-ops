import type { Section } from '../types'

export const aliases: Section = {
  id: 'aliases',
  title: 'Immutable versions, mutable aliases, and registry lineage',
  scene: 'aliases',
  focus: 'timeline',
  slide: `## Registering, aliasing, serving

Three different things happen when a model is promoted, and they happen at **different times**.

### Promoting v14
- 10:00 **register** v14: a new immutable version, nothing serves it
- 10:30 **move the alias** champion to v14: the registry changes
- Pods still serve **v12** until they poll the alias and reload
- 10:36 all six pods serve v14

### Rolling back
- 11:10 the alias goes back to v12
- Pods keep serving v14 **until they reload**

### Three states, kept apart
- **Version**: immutable, v14 means one bundle forever
- **Alias**: a mutable pointer; **runtime**: what is loaded now
- Every response carries model_version: the only **proof** of what is live`,
  narration:
    "When a model is promoted, three different things happen, and they happen at different times. Confusing them is a common source of incidents. At ten o'clock, version fourteen is registered. That creates a new, immutable version in the registry, but nothing serves it yet. At ten thirty, the champion alias is moved to point at version fourteen. The registry has now changed, but the serving pods are still running version twelve, because they only load a new model when they next check the alias. From ten thirty-one they start reloading, and by ten thirty-six all six pods serve version fourteen. Rollback has the same lag. At ten past eleven the alias is moved back to version twelve, yet the pods keep serving version fourteen until they reload again. So keep three states apart. A version is immutable: version fourteen always means exactly one bundle. An alias is a mutable pointer, which says what should be serving. The runtime is what is actually loaded, right now, in each pod. The registry can only tell you the first two. The only proof of what is live is the model version that every response carries, which is why the prediction contract in chapter one included it.",
}
