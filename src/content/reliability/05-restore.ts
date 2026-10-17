import type { Section } from '../types'

export const restore: Section = {
  id: 'restore',
  title: 'Backups, restore validation, and recovery objectives',
  scene: 'restore',
  focus: 'drill',
  slide: `## A backup is a restore you have tested

Each store gets two objectives, and a drill that **proves** them. A backup that has never been restored is a hope.

### Two objectives
- **RPO**: how much data may be lost; **RTO**: how long a restore may take

### The Q2 drill, into an empty account
- Registry and bundles: restored in **25 min** against 1 h: pass
- Offline feature store: **failed**, the restore role could not decrypt
- Prediction logs: 6 h against 24 h: pass
- Split manifests: restored, but **2** id files missing: fail

### What it showed
- **Two of four** restores failed, and neither had been noticed
- **Permissions** and keys are part of the backup
- Fixed, then **drilled again** next quarter`,
  narration:
    "A backup only counts once it has been restored. Each store gets two objectives, and a drill that proves them. The recovery point objective says how much data may be lost, how old the latest usable backup may be. The recovery time objective says how long a restore may take before the system must be working again. The second-quarter drill restored each store into an empty staging account, as though the original were gone. The model registry and its bundles were restored in twenty-five minutes, against a target of one hour, a pass. The offline feature store failed entirely: the role used for restoring could not decrypt the backup, because the key permissions had never been granted to it. Prediction logs were restored in six hours, inside their twenty-four hour target. And the split manifests were restored, but two of the identifier files they referenced were missing, so a model could not have been rebuilt from them, which counts as a fail. So two of four restores failed, and neither failure had been noticed before the drill, because the backups themselves had been running and reporting success every night. The lesson is that permissions and keys are part of the backup. Both failures were fixed, and will be drilled again next quarter.",
}
