import type { Scene } from '@graphlearning/flow'

// §5 — trusted inputs to every build and load: dependencies, images, model files.
export const supply: Scene = {
  id: 'supply',
  title: 'Trusted artefacts and dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'controls',
      kind: 'table',
      label: 'What must be trusted, and how it is checked',
      headers: ['artefact', 'risk', 'control'],
      values: [
        ['Python packages', 'a typo-squatted or hijacked package', 'pinned with hashes; internal mirror'],
        ['base image', 'unpatched or tampered', 'allow-listed registry; signature verified'],
        ['serving image', 'swapped after testing', 'signed in CI; verified at deploy'],
        ['model file', 'code run on load', 'safe format; hash in manifest (ch 5)'],
        ['pretrained weights', 'unknown provenance', 'recorded source, licence, hash'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'ci/supply-chain.sh',
      label: `pip install --require-hashes -r requirements.lock      # any changed file fails the install
syft serve-late-risk:$GIT_SHA -o spdx-json > sbom.json   # what is inside, recorded
cosign sign --key $KMS_KEY registry/serve-late-risk@$DIGEST
# at deploy time, the cluster admits only images signed by this key
cosign verify --key $KMS_PUB registry/serve-late-risk@$DIGEST`,
    },
    {
      id: 'fails',
      label: 'When a check fails',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'x-install', label: 'Install fails', sub: 'a hash differs', pattern: 'warn', icon: 'ban' },
        { id: 'x-deploy', label: 'Deploy refused', sub: 'unsigned image', pattern: 'warn', icon: 'lock' },
        { id: 'x-load', label: 'Load refused', sub: 'model hash mismatch', pattern: 'warn', icon: 'package' },
        { id: 'x-weights', label: 'Not used', sub: 'weights of unknown source', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'controls', target: 'code', label: 'in CI' },
    { source: 'code', target: 'fails', label: 'and if one fails' },
  ],
}
