import type { Section } from '../types'

export const supply: Section = {
  id: 'supply',
  title: 'Trusted artefacts/dependencies and unsafe deserialisation',
  scene: 'supply',
  focus: 'controls',
  slide: `## Trusting what you build and load

Every package, image and model file is an input you did not write. Check each is **exactly** what you expect.

### Artefacts and their controls
- **Packages**: pinned with hashes, from an internal mirror
- **Base images**: from an allow-listed registry, signature verified
- **Serving image**: signed in CI and **verified** at deploy
- **Model files**: a safe format, a hash; never an unknown pickle
- **Pretrained weights**: source, licence and hash recorded

### In CI
- Install with --require-hashes: any changed file **fails**
- The cluster admits only images **signed** by the CI key

### Deserialisation
- Loading a pickle runs its **author's** code`,
  narration:
    "Every package, container image and model file in an ML system is an input that someone else wrote or built, so each one needs a check that it is exactly what you think it is. Python packages are pinned with hashes and installed from an internal mirror, so a typo-squatted name or a hijacked release cannot slip in. Base images come only from an allow-listed registry, with their signatures verified. The serving image is signed by CI after it is built and tested, and the signature is verified again at deploy time, so an image swapped after testing is refused. Model files use a safe format, and their hash is recorded in the manifest, as chapter five required. Pretrained weights, which come from outside entirely, have their source, licence and hash recorded before use. In CI, installing with required hashes means that any package file that differs from the recorded hash fails the install. A software bill of materials records what is inside every image, so a newly announced vulnerability can be traced to the images that contain it. And the cluster's admission policy accepts only images signed with the CI key. Unsafe deserialisation deserves one rule of its own: never load a pickle file you did not build, because loading it can run any code its author chose.",
}
