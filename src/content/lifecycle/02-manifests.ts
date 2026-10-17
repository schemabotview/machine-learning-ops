import type { Section } from '../types'

export const manifests: Section = {
  id: 'manifests',
  title: 'Dataset/feature/run/artefact manifests',
  scene: 'manifests',
  focus: 'chain',
  slide: `## The chain behind what serves

For each serving model there is an unbroken chain of **identities**, from the data it learned from to the release that put it live.

### late-risk@14
- Snapshot orders_snapshot@v3, split fingerprint 3a90c1d2
- checkout_features@6; run late-risk-0401-0300
- Bundle hash 7d1e…; release record late-risk-14
- Evidence: gate **pass**, canary **held**

### duration@9
- The nightly 01:00 snapshot; planning_features@3
- Evidence: gate pass, then a **7-night shadow**

### Checked, not assumed
- The bundle's hash matches the **approved** release
- The run's split fingerprint matches its manifest
- The training snapshot **still exists**, so it can be re-run`,
  narration:
    "Behind each serving model there should be an unbroken chain of identities, running from the data it learned from to the release record that put it live. For the late-risk model, version fourteen, the chain runs from the orders snapshot, version three, through a split manifest with its fingerprint, the checkout features at version six, and the training run with its own identifier, to a bundle with a recorded hash, and finally to the release record. The evidence attached is the gate report, which passed, and the canary, whose guardrails held. The duration model, version nine, has the same chain with different links. It is trained from the nightly one o'clock snapshot and the planning features at version three, and has no labelled split in the same sense, since its evaluation uses completed routes. Its evidence is a gate pass, followed by a seven-night shadow run alongside the previous version. The chain is only useful if it is checked rather than assumed. A short script walks it end to end. It checks that the hash of the bundle being served matches the hash in the approved release. It checks that the run's split fingerprint matches the split manifest it names. And it checks that the training snapshot still exists, so the model could still be rebuilt, which chapter three showed can quietly stop being true.",
}
