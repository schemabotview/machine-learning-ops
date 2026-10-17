import type { Section } from '../types'

export const secrets: Section = {
  id: 'secrets',
  title: 'Secrets, encryption, and network boundaries',
  scene: 'secrets',
  focus: 'net',
  slide: `## Secrets, encryption and network paths

Decide which network paths **exist** at all, keep secrets out of code, and encrypt data wherever it rests or moves.

### Network paths
- Only the **checkout API** can call the predictor, in a private subnet
- Serving reads the feature store **read-only**, and the registry at startup
- Logs go to a **write-only** sink
- Outbound internet access is **denied**

### Secrets
- The feature-store token is mounted at start, rotated every **30 days**
- Registry access uses **workload identity**: no stored secret at all
- CI **scans** code and images for secrets

### Encryption
- At rest with keys in a KMS; in transit with **TLS**, inside the cluster too`,
  narration:
    "Security controls for an ML service start with three questions: which network paths exist at all, where secrets live, and what is encrypted. On the network side, only the checkout API can call the predictor, which runs in a private subnet with no public address. The serving pods can read the online feature store, read-only, and read the model registry when they start. They write logs to a sink they can write to but not read from. And outbound access to the internet is denied entirely, so even a compromised pod cannot send data out or download anything. On secrets, the feature-store token lives in a secret manager, is mounted into the pod when it starts, and is rotated automatically every thirty days. Access to the registry needs no stored secret at all, because it uses workload identity: the platform vouches for the pod's identity directly. And CI scans both code and images, so a secret that slips into either fails the build. On encryption, data at rest is encrypted with keys held in a key management service, and data in transit uses TLS, including traffic inside the cluster, rather than trusting the internal network. None of this is specific to ML. That is the point: an ML service gets the same controls as any other service.",
}
