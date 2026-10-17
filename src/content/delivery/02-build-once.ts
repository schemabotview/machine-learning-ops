import type { Section } from '../types'

export const buildOnce: Section = {
  id: 'build-once',
  title: 'Versioned pipeline/infrastructure definitions and build-once artefacts',
  scene: 'build-once',
  focus: 'compare',
  slide: `## Build once, promote the same thing

The image that reaches production should be **byte for byte** the one that was tested. Build it once, then promote it by **digest**.

### Two ways to ship v14's server
- **Build once**: the same digest 91c0… in CI, staging and production
- **Rebuild per environment**: staging resolves pandas 2.2.3
- Production resolves 2.2.4 a day later: an image **nobody** tested

### What is versioned
- The **pipeline** definitions: CI and the retraining pipeline
- The **infrastructure**: replicas, resource limits, autoscaling
- The **config**, kept small and per environment

### Promotion
- Each step names the image digest and the model version`,
  narration:
    "The image that reaches production should be byte for byte the image that was tested. The way to guarantee that is to build it once, and then promote that exact artefact, by its digest, through each environment. Compare two ways of shipping the server for version fourteen. Built once, the image with digest nine one c nought is created and tested in CI, then the same digest runs in staging and the same digest runs in production. Rebuilt per environment, the CI image is fine, but the staging build resolves its dependencies on a different day and picks up a newer pandas release, and the production build a day later picks up another. Production now runs an image that nobody has tested. Everything that defines a release should be in version control. That includes the pipeline definitions themselves, the CI configuration and the retraining pipeline. It includes the infrastructure: the number of replicas, resource limits and autoscaling. And it includes the configuration, which should be small, and should differ between environments only where it must, such as endpoints and credentials. Promotion then becomes a recorded step that names the image digest and the model version. The production step also requires the staging checks to have passed, and an approval.",
}
