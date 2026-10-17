# ML Engineering and MLOps — From Offline Models to Reliable Operational Systems

## Audience and prerequisites

For learners who understand [Machine Learning](MACHINE-LEARNING-COURSE-PLAN.md) foundations: tasks, feature pipelines, leakage, training/evaluation boundaries, metrics, and model-selection limitations. Basic Python modules, environments, testing, files, and logging from the [Python plan](PYTHON-COURSE-PLAN.md), plus basic SQL, Git, command-line, HTTP, and process concepts are expected. Refresh lifecycle-specific interfaces and infrastructure notation locally; this is not a complete software, networking, or cloud course.

[Probability and Statistics](PROBABILITY-AND-STATISTICS-COURSE-PLAN.md) supplies uncertainty and experiment-design reasoning. [Neural Networks and Deep Learning](NEURAL-NETWORKS-AND-DEEP-LEARNING-COURSE-PLAN.md) is relevant for neural workloads but not required for classical models. Containers, workflow engines, feature stores, registries, and observability tools are explained by their responsibilities before specific products.

Scope: Requirements/software contracts, valid data/time-correct features, reproducible training/orchestration, evidence and artefacts, controlled delivery, batch/online inference, observations/feedback/retraining, security, reliability/incidents, and lifecycle evolution. Platform-specific implementation remains separately scoped.

Target capability: explain and design a coherent ML lifecycle, express illustrative component/pipeline/serving contracts, assess release/monitoring evidence, reason through failures, and justify platform and automation choices. Worked demonstrations support understanding and design capability without claiming assessed implementation mastery or operational experience.

Structure: **12 chapters, 91 sections**, distributed **7, 8, 7, 7, 8, 8, 8, 8, 8, 8, 8, 6**. Counts reflect coherent learning milestones, not equal duration.

Reference approach: platform-neutral architecture with Python/pseudocode, SQL/as-of joins, sample manifests/configuration, and selected MLflow, DVC, Feast, Kubeflow, TFX, and serving-tool illustrations. These tools exemplify separate responsibilities, not a mandatory stack or a requirement to combine every product. Sources checked on **2026-10-14**; live documentation was inspected without pinning or executing a software environment. Verify exact product versions, defaults, adapters/backends, permissions, and compatibility when developing executable lessons.

## Learning spine

System Requirements and Engineering Boundaries → Data and Feature Contracts → Reproducible Runs and Training Jobs → Orchestration and Automated Pipelines → Validation, Artefacts, and Release Evidence → CI/CD, Rollouts, and Rollback → Batch and Online Prediction → Observability, Quality, and Drift → Feedback, Experiments, and Controlled Retraining → Security, Privacy, and Governance → Capacity, Reliability, and Incident Learning → Integrated Lifecycle and Evolution.

Progression rationale: Data/features share a correctness boundary; run/job evidence precedes orchestration. Validation and complete artefacts define a releasable candidate. CI/CD and rollout form one change process. Serving modes contrast contracts, service/model monitoring share diagnosis, and feedback precedes controlled retraining in the same maintenance milestone.

Recurring example: the fictional retailer from ML operates a checkout delivery-duration/late-risk predictor and a distinct daily planning job. Specify prediction IDs, label maturity, feature availability, population/decision changes, dependency owners, and serving/batch requirements. Use synthetic manifests, architecture/sequence diagrams, supplied logs/metrics, and incident timelines. Numeric budgets and capacities are explicitly illustrative assumptions, not measured benchmarks.

Teaching method: requirement and boundary → contract/architecture → illustrative code/configuration/data flow → successful execution trace → failure/recovery contrast → evidence/trade-off → outcome → bridge. Explain why controls work and what they cannot guarantee. Preserve distinctions among software correctness, model quality, business utility, and operational health. No submitted exercises, assessments, learner monitoring, executable lessons, real pipelines/services, deployments, external messages, or infrastructure changes are delivered by this course plan.

Course ownership: Mathematical derivations belong to the relevant mathematics plan; probability/inference and experiment theory to Probability and Statistics; general predictive/discovery evaluation to Machine Learning; neural computations and training-state behaviour to Neural Networks and Deep Learning; operational contracts, delivery, monitoring, and retraining to ML Engineering and MLOps. A local refresher or domain-specific failure case is intentional overlap, not a second full treatment.

## Chapter 1 — System Requirements and Engineering Boundaries

Objective: Translate an offline modelling result into an operational system with explicit goals and responsibilities. Explain how to package and test modelling code as maintainable software.

1. Prediction, action, outcome, and product objective
2. Batch/online requirements, owners, and dependencies
3. Quality/latency/freshness/availability/cost contracts
4. Training/preprocessing/inference software interfaces
5. Configuration, dependencies, packaging, and meaningful tests
6. Failure handling and safe loading boundaries
7. Proportionate automation and platform choices

Worked illustrations: Refactor a notebook into components around the checkout service and daily planning job. A passing software test does not establish predictive quality or product value.

Outcome: Specify an ML system's purpose, constraints, boundaries, and ownership without equating a model score with product value. Interpret an ML project structure, explain interface/test choices, and identify hidden configuration or dependency assumptions.

Bridge: Software boundaries must be matched by explicit data and feature contracts.

## Chapter 2 — Data and Feature Contracts

Objective: Build a trustworthy training-data boundary and reason about evolving upstream sources. Explain consistent feature computation across historical training and live prediction.

1. Schemas, units, keys, snapshots, and provenance
2. Quality rules, quarantine, corrections, and replay
3. Label maturity, split manifests, and missing outcomes
4. Event time versus ingestion/availability time
5. Historical joins and leakage-free aggregates
6. Offline/online parity, materialisation, and freshness
7. Missing/stale features and fallback semantics
8. Feature-store limits and version-compatible evolution

Worked illustrations: Trace a corrected checkout record through an availability-aware as-of join and compare offline/live feature values. Event-time-only joins and schema checks can both miss semantic errors.

Outcome: Specify a dataset contract and validation/recovery policy and explain how late/corrected data affect reproducibility. Explain a time-correct feature join and justify consistency/freshness policies across training and inference.

Bridge: Stable data/feature identities make runs and jobs reproducible.

## Chapter 3 — Reproducible Runs and Training Jobs

Objective: Explain what evidence is needed to reconstruct and compare a modelling run. Explain the execution and recovery requirements of a repeatable training workload.

1. Code/data/feature/configuration/environment identity
2. Tracking metrics, artefacts, and dataset/split fingerprints
3. Lineage and repeatability limits
4. Training input/output and publication contracts
5. Resource estimates, scheduling, and bounded trial budgets
6. Checkpoint/resume state and incomplete outputs
7. Retries, numerical variation, and recovery

Worked illustrations: Inspect a run manifest and interrupted training trace; a logged seed, path, or registry lineage cannot restore missing dependencies or prove deterministic execution.

Outcome: Specify a useful experiment record and identify missing dependencies or invalid comparisons. Explain a training-job contract and choose a reasonable resource/recovery strategy.

Bridge: Repeatable jobs can now be coordinated through dependency-aware pipelines.

## Chapter 4 — Orchestration and Automated Pipelines

Objective: Explain dependency-aware execution, state, and failure recovery in an ML workflow.

1. Typed components, DAG dependencies, and artefacts
2. Validation/preparation/training/evaluation branches
3. Parameters, schedules, events, and run identity
4. Caching and hidden dependency invalidation
5. Retries, idempotency, and output commits
6. Parallel branches, quotas, backfills, and metadata
7. Local/remote execution and portability limits

Worked illustrations: Trace a failed data gate and retry that would duplicate an external write; a workflow engine does not automatically deliver exactly-once side effects.

Outcome: Explain pipeline execution and recovery and identify unsafe caching or retry assumptions.

Bridge: Pipeline outputs need candidate evidence and complete inference artefacts.

## Chapter 5 — Validation, Artefacts, and Release Evidence

Objective: Design layered verification that addresses software correctness, data validity, and model behaviour. Explain model identity and package a complete inference dependency set.

1. Software contracts versus statistical evaluation
2. Protected data, champion/baseline, and uncertainty
3. Subgroup/robustness/calibration and resource checks
4. Pass/fail/inconclusive gate policies
5. Complete inference bundles and signatures
6. Immutable versions, mutable aliases, and registry lineage
7. Safe serialisation, provenance, and environment compatibility
8. Retained evidence, ownership, and rollback bundles

Worked illustrations: Review a candidate that improves accuracy but fails tail latency or subgroup criteria. Distinguish registering a candidate, changing an alias, and updating a loaded runtime.

Outcome: Specify meaningful candidate checks and explain pass/fail/inconclusive decisions under stated evidence. Explain a complete model artefact and distinguish registry identity, mutable references, and runtime deployment.

Bridge: A releasable candidate enters a controlled delivery and rollback process.

## Chapter 6 — CI/CD, Rollouts, and Rollback

Objective: Explain automated software/model delivery while separating builds, training, registration, and deployment. Explain controlled deployment changes and the evidence each rollout pattern supplies.

1. Integration, delivery, deployment, and training distinctions
2. Versioned pipeline/infrastructure definitions and build-once artefacts
3. Environment separation and promotion evidence
4. Blue–green/rolling/canary and shadow patterns
5. Traffic allocation, sticky units, and guardrails
6. Delayed outcomes and deployment-versus-experiment claims
7. Compatible rollback of model/features/configuration
8. Audit records, abort criteria, and release retirement

Worked illustrations: Trace a versioned candidate through staging and a canary while labels are delayed; shadow success does not show causal lift and reverting weights may not restore a changed feature contract.

Outcome: Explain a CI/CD flow and its boundaries with training and model promotion. Choose and explain a rollout/rollback approach and distinguish operational evidence from causal or predictive-quality conclusions.

Bridge: Runtime behaviour depends on batch or online prediction contracts.

## Chapter 7 — Batch and Online Prediction

Objective: Explain correct, recoverable large-batch scoring and publication. Design a bounded request path with explicit resource, compatibility, and failure behaviour.

1. Batch snapshots, partitioning, and manifests
2. Output identity, duplicate handling, and atomic visibility
3. Partial failure, backfill, freshness, and downstream contracts
4. Request schemas, model loading, readiness, and liveness
5. Feature path and end-to-end latency
6. Concurrency, batching, queues, and overload
7. Timeout/retry/cancellation and documented fallback
8. Caching, version attribution, and resource placement

Worked illustrations: Compare a partitioned job retry with an interactive request timeout. Atomic publication depends on storage semantics; a fallback must not silently claim to be the normal predictor.

Outcome: Specify a batch-scoring/output contract and reason about retries, partial results, and downstream consistency. Explain an online serving path and justify latency, concurrency, and failure policies.

Bridge: Serving contracts determine what must be observed and diagnosed.

## Chapter 8 — Observability, Quality, and Drift

Objective: Specify useful system signals and alert policies without collecting unnecessary sensitive data. Assess deployed behaviour using appropriate reference data, labels, and uncertainty.

1. SLIs/SLOs, windows, error budgets, and ownership
2. Latency/errors/saturation and batch/feature freshness
3. Logs/metrics/traces with model/data attribution
4. Privacy, retention, and actionable alerts
5. Skew, population/label/concept change, and seasonal references
6. Drift statistics, effect sizes, and monitoring limits
7. Delayed/selective outcome joins and quality/calibration slices
8. Triage and responses matched to the diagnosed change

Worked illustrations: Trace a healthy-uptime service with corrupt feature units and a separate harmless seasonal shift. Drift is not proof of quality loss; stable monitored marginals do not prove stable quality.

Outcome: Specify service objectives and observability signals that support diagnosis and action. Explain a model-monitoring design and interpret drift/quality signals under their sampling and label limitations.

Bridge: Collected predictions/actions/outcomes support experiments and controlled updates.

## Chapter 9 — Feedback, Experiments, and Controlled Retraining

Objective: Explain how deployment generates evidence and biases future learning data. Design a controlled retraining lifecycle with reasons to update, wait, or retire.

1. Prediction/action/outcome and exposure instrumentation
2. Assignment units, stopping plans, and guardrails
3. Selective labels, interventions, and feedback bias
4. Scheduled/data/drift/performance update triggers
5. Label-eligible windows and reproducible candidates
6. Champion comparisons and promotion separation
7. Warm starts, incremental state, duplicate triggers, and races
8. No-update/retirement choices and dependency cleanup

Worked illustrations: Show how expediting orders changes the labels observed by a risk model. Investigate a drift alert before retraining; continuous training is not continuous automatic deployment.

Outcome: Explain an online experiment/feedback contract and identify when collected outcomes cannot support the intended claim. Specify a maintenance loop and its validation/coordination boundaries.

Bridge: The feedback lifecycle also needs explicit access, privacy, and accountability controls.

## Chapter 10 — Security, Privacy, and Governance

Objective: Explain lifecycle controls and evidence needed for accountable operation.

1. Identities, least privilege, and environment isolation
2. Secrets, encryption, and network boundaries
3. Data minimisation, retention, and sensitive logging
4. Deletion lineage and limits of model unlearning
5. Trusted artefacts/dependencies and unsafe deserialisation
6. Threat-model orientation and specialised controls
7. Risk review, documentation, exceptions, and access audits
8. Domain/jurisdiction-specific obligation boundaries

Worked illustrations: Trace who may read labels, train, register, and deploy; deleting a source row does not automatically remove its influence from a trained model. Risk documentation is not a compliance certificate.

Outcome: Explain proportionate controls and traceability for an ML lifecycle and identify obligations requiring specialised review.

Bridge: Reliability and cost decisions must honour those controls and lifecycle needs.

## Chapter 11 — Capacity, Reliability, and Incident Learning

Objective: Choose infrastructure capabilities proportionate to workload, reliability, and team needs. Explain how to contain, diagnose, recover from, and learn from ML-system failures.

1. Demand/resource envelopes, queues, and autoscaling
2. Cold starts, timeouts, failure domains, and degradation
3. Cost attribution and measured quality–latency–cost trade-offs
4. Managed/owned platforms, isolation, and ownership
5. Backups, restore validation, and recovery objectives
6. Incident severity, runbooks, containment, and evidence
7. Repair/replay/rollback and irreversible external actions
8. Postmortems and prevention/detection improvements

Worked illustrations: Estimate capacity under stated assumptions, then trace a silent quality incident. Backups need restore evidence, and a model rollback cannot undo prior customer actions.

Outcome: Justify capacity/platform choices and explain their failure and cost assumptions. Explain a response/recovery sequence and convert a failure into specific prevention and detection improvements.

Bridge: Synthesize the components and recovery evidence into one proportionate lifecycle.

## Chapter 12 — Integrated Lifecycle and Evolution

Objective: Justify a complete operational ML design with reviewable artefacts and explicit unresolved risks.

1. System/dependency/ownership map
2. Dataset/feature/run/artefact manifests
3. Pipeline/gate/promotion/serving walkthrough
4. Monitoring/feedback/maintenance policies
5. Security/recovery evidence and unresolved risks
6. Minimal viable lifecycle versus justified platform expansion

Worked illustrations: Review the checkout predictor and daily planning job using separate contracts, supplied traces and dashboards, and one incident. This remains a design demonstration rather than a deployment.

Outcome: Explain and assess a production-ML lifecycle, connect its evidence and controls, and justify a proportionate design.

Bridge: Continue with unfamiliar examples and reasoned implementation practice; use the companion courses for the named specialist and operational depth.

## Sources and scope

Google Cloud's [MLOps architecture guidance](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) supplies CI/CD/CT and lifecycle structure; its levels are reference patterns, not mandatory maturity grades. Chip Huyen's [Designing Machine Learning Systems (2022), author repository](https://github.com/chiphuyen/dmls-book) and Gift/Deza's [Practical MLOps (2021), publisher contents](https://www.oreilly.com/library/view/practical-mlops/9781098103002/) were inspected through descriptions/contents and selected author summaries, not full texts. Google's [SRE book](https://sre.google/sre-book/table-of-contents/) and selected objectives, monitoring, overload, and incident chapters inform operational reasoning.

Official [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/), [registry](https://mlflow.org/docs/latest/ml/model-registry/), [models](https://mlflow.org/docs/latest/ml/model/), [DVC pipelines](https://doc.dvc.org/user-guide/pipelines), [Feast point-in-time joins](https://docs.feast.dev/getting-started/concepts/point-in-time-joins), [Kubeflow Pipelines](https://www.kubeflow.org/docs/components/pipelines/overview/), [TFX validation](https://www.tensorflow.org/tfx/data_validation/get_started), and [KServe canary guidance](https://kserve.github.io/website/docs/model-serving/predictive-inference/rollout-strategies/canary) provide selected implementation contrasts. [Alibi Detect drift guidance](https://docs.seldon.ai/alibi-detect/cd) and [NIST AI RMF overview](https://www.nist.gov/itl/ai-risk-management-framework) inform bounded monitoring/risk coverage. Inspection is selective; detailed evidence, versions/limits, coverage, and review status remain in [README.md](../README.md).

Specialist exclusions: exhaustive cloud/Kubernetes/networking/security administration; detailed distributed/accelerator training internals; edge/embedded implementation; complex streaming semantics; advanced causal/off-policy experimentation; formal statistical monitoring/sequential inference; adversarial/privacy attack implementation; jurisdiction-specific legal advice/certification; and full LLM/agent/RAG/foundation-model operations. Model/feature/pipeline interfaces, system decisions, and feedback controls remain core even where tools differ.

Intentional overlap: ML owns algorithms and offline predictive evaluation; this course operationalises their contracts and evidence without repeating algorithm derivations. Data-engineering courses supply storage/processing internals; cloud/Linux/Terraform courses supply infrastructure depth. SRE/security/statistics concepts are used with explicit assumptions and bounded local introductions rather than claimed specialist completeness.


Scope refinement checked on **2026-10-14**: Repeated statistics/model-metric instruction, tool-installation tours, edge/distributed/streaming implementation surveys, advanced bandit/off-policy/sequential theory, and platform/security-administration catalogues are deferred. Keep point-in-time correctness, idempotency, alias/runtime distinctions, drift/quality limits, feedback bias, and irreversible-action reasoning. Earlier source inspections are retained as research evidence, including sources for topics now deferred; a retained citation does not imply core coverage.
