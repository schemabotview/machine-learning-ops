import type { Section } from '../types'

export const promotion: Section = {
  id: 'promotion',
  title: 'Champion comparisons and promotion separation',
  scene: 'promotion',
  focus: 'months',
  slide: `## A retrained model is just another candidate

Retraining produces a **candidate**. It meets the same gates, the same approval and the same rollout as any other change.

### One path
- Retrain → gates against the **current** champion → register
- A person **approves**; a 5% canary; then the alias moves

### Six months of retrains
- January: pass, v12 promoted
- February: stopped at the data gate
- March: no gain; the champion stays
- April: v13 fails on latency and rural recall; retuned v14 **passes**
- May: **inconclusive**; v14 stays and more data is gathered

### What this shows
- Most retrains do **not** change what serves, and that is healthy`,
  narration:
    "A retrained model is just another candidate. It goes through the same gates, the same approval and the same rollout as any other change to what serves. The path is the same every time. The pipeline retrains. The candidate is gated against the current champion, not against whichever model happened to be champion when the pipeline was written. It is registered as an immutable version. A person approves it, and that approval is recorded. A five percent canary runs. Only then does the champion alias move. Look at six months of monthly retrains. In January the candidate passed and became version twelve. In February the run stopped at the data gate, because of the metres problem in one source. In March the candidate showed no gain, so the champion stayed. In April, version thirteen failed on latency and rural recall, as chapter five showed, and a retuned version fourteen passed every gate and was promoted after a forty-eight hour canary. In May the comparison was inconclusive, so version fourteen stayed, and the team waited for another month of labels. Most of these retrains did not change what serves at all, and that is a healthy sign. A pipeline that promotes every month would be promoting noise.",
}
