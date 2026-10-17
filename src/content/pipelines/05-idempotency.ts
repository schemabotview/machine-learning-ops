import type { Section } from '../types'

export const idempotency: Section = {
  id: 'idempotency',
  title: 'Retries, idempotency, and output commits',
  scene: 'idempotency',
  focus: 'trace',
  slide: `## Retries assume the step can run twice

Orchestrators run steps **at least once**. A step that writes outside the pipeline must be safe to repeat, because sometimes it will be.

### The planning job's publish step
- The INSERT of **180,000** rows into routing's table commits at 03:44
- The step times out **before** acknowledging success
- The orchestrator retries: an append writes them **again**
- Routing plans drivers from **360,000** rows: every order twice

### Making it safe
- An **idempotency key**: (plan_date, order_id)
- MERGE on that key: the retry updates, giving **180,000** rows
- Or stage it, then **swap** it in with one commit

### Not exactly-once
- The engine cannot undo an external write`,
  narration:
    "Orchestrators guarantee that a step runs at least once, not exactly once. A step that writes outside the pipeline must therefore be safe to run twice, because sometimes it will be. Here is the daily planning job's publish step, which writes tomorrow's predicted delivery durations into a table owned by the routing system. At three forty-four, an insert of a hundred and eighty thousand rows commits successfully. But the step times out before it can report success back to the orchestrator. From the orchestrator's point of view the step failed, so at three forty-six it retries, and an append-style insert writes all hundred and eighty thousand rows again. At ten past four, routing plans drivers from three hundred and sixty thousand rows, with every order appearing twice. The fix is to make the write idempotent, so that running it twice has the same effect as running it once. Give each row an idempotency key, here the plan date and the order identifier, and use a merge on that key. The retry then updates the same rows, and the table still holds a hundred and eighty thousand. Alternatively, write to a staging table and swap it in with a single commit. Either way, the workflow engine cannot undo an external write for you; the step itself must allow for being repeated.",
}
