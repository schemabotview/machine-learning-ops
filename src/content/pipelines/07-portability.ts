import type { Section } from '../types'

export const portability: Section = {
  id: 'portability',
  title: 'Local/remote execution and portability limits',
  scene: 'portability',
  focus: 'diffs',
  slide: `## Local and remote runs

The same pipeline definition can run on a laptop and on a cluster. What it cannot do is make the two **environments** the same.

### What changes between them
- Processes on a laptop against **containers** on a cluster
- A 1% local sample against the **full** snapshot
- The developer's own credentials against a **service identity** per step
- Local runs catch logic, shape and schema errors
- Remote runs reveal **memory**, **timeouts** and **permissions**

### What portability covers
- The same **graph**, parameters and digest-pinned images

### What it does not
- **Scale**: a 1% sample hides memory limits
- **Permissions**: local credentials hide missing grants
- A local pass is a **first** check, not evidence`,
  narration:
    "The same pipeline definition can usually run both locally, on a developer's laptop, and remotely, on the shared orchestrator. That portability is valuable, but it does not make the two environments the same. Locally, steps run as processes, against a small sample of the data in local files, using the developer's own credentials and whatever resources the laptop has, with metadata kept in a local store. Remotely, steps run as containers on a cluster, against the full snapshot in the object store, each with its own service identity and declared resources, recording shared metadata with lineage. So each place catches different failures. Local runs are good at catching logic errors, shape mismatches and schema problems, quickly. Remote runs reveal memory limits, timeouts and permission errors, which only appear at full scale or under a real identity. Portability covers the definition itself: the same graph, the same parameters, and the same digest-pinned images. It does not cover scale, because a one percent sample hides the memory a full run needs. And it does not cover permissions, because a developer's broad credentials hide grants that the pipeline's service identity is missing. Treat a local run as a fast first check, not as evidence that the remote run will succeed.",
}
