import type { Section } from '../types'

export const triggers: Section = {
  id: 'triggers',
  title: 'Scheduled/data/drift/performance update triggers',
  scene: 'update-triggers',
  focus: 'kinds',
  slide: `## What should start a retrain

Retraining can be triggered several ways. Each trigger should lead to a **specific** next step, and some should lead to investigation first.

### Four triggers
- **Schedule**: the 1st of each month; train a candidate, let the gates decide
- **Data**: a new month of matured labels; the same
- **Drift alert**: a PSI over 0.25; **investigate** first
- **Performance**: weekly log loss over 0.40; diagnose the cause

### Week 15, again
- Retraining on the distance drift would have taught the model the **bug**

### Continuous training is not continuous deployment
- Training a candidate and running the gates: automatic
- Rolling out: an **approval**, then a canary`,
  narration:
    "Retraining can be triggered in several ways, and each trigger should lead to a specific next step. Some should lead to investigation rather than to training. A schedule, the first of each month, trains a candidate and lets the gates from chapter five decide whether it is any better. A data trigger, a new month of matured labels arriving, does exactly the same. A drift alert, a stability index above nought point two five on some feature, should not start a retrain directly. It should start the triage from chapter eight, because a drift alert is often a data problem, not a model problem. A performance alert, weekly log loss above nought point four, should start a diagnosis too: retrain only if the cause turns out to be the model itself, for example concept change, rather than broken inputs. Week fifteen shows why. Retraining automatically on the distance drift would have produced a model trained on distances in metres, teaching it the bug, and making the eventual data fix break the model. And whatever starts it, continuous training is not continuous deployment. Training a candidate and running its gates can be fully automatic. Rolling it out still needs an approval and a canary, exactly as for any other change.",
}
