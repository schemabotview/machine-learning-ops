import type { Section } from '../types'

export const repair: Section = {
  id: 'repair',
  title: 'Repair/replay/rollback and irreversible external actions',
  scene: 'repair',
  focus: 'steps',
  slide: `## What recovery can and cannot restore

Recovery repairs the cause and **replays** what it touched. It cannot undo what the system already **did** in the world.

### Recovering from INC-0610
- Convert delivered_at to UTC at ingest: correct from now on
- **Replay** feature history since Monday: correct training data
- Roll back the model? **No**: the model was fine; its input was wrong
- **Re-score** open orders: correct windows from now on

### What cannot be undone
- Windows shown Monday to Wednesday **stay shown**
- Orders lost to wide windows are **not** recovered
- Any compensation is a **product** decision

### For the next retrain
- Monday–Wednesday rows are **excluded** or flagged`,
  narration:
    "Recovery has three parts: repair the cause, replay whatever the cause touched, and accept what has already happened in the world. For this incident, the repair converts delivered-at to universal time at ingest, so new features are correct from now on. The replay recomputes the feature history since Monday, so training data built from that period is correct too. It is worth asking whether to roll the model back, and the answer here is no. The model was fine; its input was wrong, so rolling back to version twelve would have fed the same wrong input to an older model. Open orders that have not been delivered yet are re-scored, so their windows are correct from now on. Then the parts that cannot be undone. The windows shown to customers from Monday to Wednesday stay shown. Some of those customers abandoned checkout because of a wider window, and those orders are not recovered. Whether to contact or compensate anyone is a product decision, not an engineering one, and it should be made deliberately rather than ignored. One more decision falls to the postmortem: what to do with the Monday to Wednesday rows in the next retrain. Their features have been replayed, but their outcomes were shaped by the wrong windows, so they are excluded or flagged.",
}
