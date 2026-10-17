import type { Section } from '../types'

export const partial: Section = {
  id: 'partial',
  title: 'Partial failure, backfill, freshness, and downstream contracts',
  scene: 'partial',
  focus: 'night',
  slide: `## When part of the night fails

Partitions fail on their own. What happens next is decided by the **downstream contract**, not by whatever is convenient at 3 a.m.

### The night of 3 April
- 61 of 64 partitions done by 02:40: **96.2%** scored
- Zones 17, 42 and 58 failed: a feature-store timeout
- Retry **only** those three: 6,928 orders
- 02:52 all 64 done and checked; published at 02:53

### The contract with routing
- Published by **05:00**, all 64 zones or **nothing**
- If missed: yesterday's plan plus rules, and routing **says so**
- Freshness: scores from the 01:00 snapshot

### If the retry had failed too
- **Hold** the night, as the contract says; backfill the three zones later`,
  narration:
    "Partitions fail on their own, and what happens next should be decided by the downstream contract, not by whatever seems convenient at three in the morning. On the night of the third of April, sixty-one of the sixty-four partitions finished by two forty, ninety-six point two percent of orders. Zones seventeen, forty-two and fifty-eight failed, all with the same feature-store timeout. Because the work is partitioned, only those three are retried, six thousand nine hundred and twenty-eight orders, rather than the whole night. By two fifty-two all sixty-four partitions are done, the checks pass, and a minute later the night is published, comfortably before the deadline. The contract with routing is explicit. Scores must be published by five o'clock. A night is complete only with all sixty-four zones, so it is all or nothing. If the deadline is missed, routing uses yesterday's plan plus simple rules, and says that it did. And the scores are built from the one o'clock snapshot, which is their freshness. So if the retry had failed as well, the right action would be to hold the whole night, as the contract says, let routing use its fallback, and backfill the three zones afterwards. Publishing sixty-one zones would be an option only if routing's contract allowed partial nights.",
}
