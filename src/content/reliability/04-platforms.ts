import type { Section } from '../types'

export const platforms: Section = {
  id: 'platforms',
  title: 'Managed/owned platforms, isolation, and ownership',
  scene: 'platforms',
  focus: 'options',
  slide: `## Managed or owned

The choice of serving platform is mostly a choice of **what the team must own**. Pick the smallest one that meets the contract.

### Three options
- **Managed endpoint**: the team owns the model and config, little more
- **Own cluster**: nodes, scaling and upgrades too; suits many models
- **Serverless**: cold starts per instance; poor for a strict p99

### For this retailer, today
- A managed endpoint, with minimum replicas set: **no** cold starts
- An own cluster becomes worth it if models **multiply**

### Questions before choosing
- **Who** runs it at 3 a.m., by name?
- Does it meet the **contract**: p99, isolation, cost?
- How hard is it to **leave**? Keep the bundle portable`,
  narration:
    "The choice of serving platform is mostly a choice about what the team must own and operate itself. The guide is to pick the smallest one that meets the contract. A managed endpoint, run by a cloud provider, leaves the team owning the model and its configuration and little more. With a minimum number of replicas set, it has no cold starts, and each endpoint is isolated from the others. An own cluster gives full control, but the team then owns the nodes, the autoscaling and every upgrade as well, and that only pays off with many models and a platform team to run them. A serverless function owns the least of all, but starts new instances on demand, with cold starts of seconds, which is a poor fit for a strict ninety-ninth percentile at checkout, though fine for spiky, latency-tolerant work. For this retailer today, with one or two models and a small team, a managed endpoint is the sensible choice, and an own cluster becomes worth considering if the number of models multiplies. A few questions decide it. Who will run it at three in the morning, by name? Does it meet the contract on latency, isolation and cost? And how hard would it be to leave? Keeping the bundle itself portable, as chapter five required, keeps that option open.",
}
