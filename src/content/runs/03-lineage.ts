import type { Section } from '../types'

export const lineage: Section = {
  id: 'lineage',
  title: 'Lineage and repeatability limits',
  scene: 'lineage',
  focus: 'limits',
  slide: `## Lineage records; it does not restore

Lineage links each artefact to what produced it. It tells you what **ran**. It cannot bring back inputs that are gone, or force identical output.

### Re-running model v12, six months later
- The snapshot path was **deleted** by retention: the data cannot be rebuilt
- The image was kept, so the **libraries** match
- Feature view v5 still exists, but its source was **rewritten**
- Seed 17 is logged, yet threads still reorder floating-point sums
- The rerun scores **0.3924** against the recorded 0.3941

### Three different promises
- **Traceable**: we know what ran
- **Re-runnable**: every input still exists
- **Deterministic**: bit-identical output, which is rarely promised`,
  narration:
    "Lineage links each artefact to what produced it: this model came from this run, which used this feature view, built from this snapshot. It tells you exactly what ran. What it cannot do is bring back inputs that no longer exist, or force a rerun to produce identical output. Try re-running model version twelve from its record six months later. The snapshot path is recorded, but the snapshot itself was deleted by the retention policy, so the training data cannot be rebuilt. The container image was kept, so at least the library versions match. Feature view version five still exists by name, but its source table has since been rewritten, so the same name now gives different values. The seed, seventeen, was logged, yet multithreaded training still adds floating-point numbers in a varying order. And the rerun scores nought point three nine two four against the recorded nought point three nine four one: close, but not the same. So be precise about which promise is being made. Traceable means we know what ran. Re-runnable means every input still exists, which requires retention policies to protect the inputs of any model still in use. Deterministic means bit-identical output, which is rarely promised, and should never be assumed from a logged seed.",
}
