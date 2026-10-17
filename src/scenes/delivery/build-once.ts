import type { Scene } from '@graphlearning/flow'

// §2 — build once, promote the same digest; rebuilding per environment ships something untested.
export const buildOnce: Scene = {
  id: 'build-once',
  title: 'Versioned definitions, build-once artefacts',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Serving image for late-risk v14, two ways',
      headers: ['environment', 'build once, promote', 'rebuild per environment'],
      values: [
        ['CI', 'sha256:91c0… built and tested', 'sha256:91c0…'],
        ['staging', 'sha256:91c0…', 'sha256:4d7a…: pandas 2.2.3'],
        ['production', 'sha256:91c0…', 'sha256:e2f8…: pandas 2.2.4, untested'],
      ],
    },
    {
      id: 'versioned',
      label: 'Everything that defines a release is in version control',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'v-pipe', label: 'Pipeline', sub: 'ci.yaml, retrain v4', pattern: 'service', icon: 'gitbranch' },
        { id: 'v-infra', label: 'Infrastructure', sub: 'replicas, limits', pattern: 'network', icon: 'layers' },
        { id: 'v-conf', label: 'Config', sub: 'per environment, small', pattern: 'user', icon: 'pencil' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: '.ci/release.yaml',
      label: `build:
  image: serve-late-risk
  tag: "{{ git_sha }}"                  # built once, here
promote:
  - {to: staging,    image: "serve-late-risk@{{ digest }}", model: "late-risk@14"}
  - {to: production, image: "serve-late-risk@{{ digest }}", model: "late-risk@14",
     requires: [staging_checks_passed, approval]}`,
    },
  ],
  edges: [
    { source: 'compare', target: 'versioned', label: 'and the rest' },
    { source: 'versioned', target: 'code' },
  ],
}
