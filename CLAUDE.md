# CLAUDE.md — machine-learning-ops

The GraphL concept app for **ML Engineering and MLOps**, served at `graphl.in/machine-learning-ops/`.
Scaffolded from `schemabotview/content-repo-template`, with the density tooling and authoring lessons
carried over from `schemabotview/machine-learning` and `schemabotview/deep-learning`. The
workspace-level `CLAUDE.md` holds the invariants that span every repo; this file is only what is
true *here*.

## What this repo is

One concept, 12 courses, 91 sections. A **section** is `(scene, slide, narration)` and is one segment
of the course video. One section = one slide. The syllabus is `ML-ENGINEERING-AND-MLOPS-COURSE-PLAN.md`
— the source of scope, ordering and ownership.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract and course ids

Routes are `#/<courseId>-<sectionId>`; `#/` is the catalog. Course ids are fixed — they are route
prefixes, audio folders (`public/audio/<courseId>/`) and `scripts/titles.json` keys:

| ch | course id | title | sections |
| --- | --- | --- | --- |
| 1 | `requirements` | System Requirements and Engineering Boundaries | 7 |
| 2 | `data-contracts` | Data and Feature Contracts | 8 |
| 3 | `runs` | Reproducible Runs and Training Jobs | 7 |
| 4 | `pipelines` | Orchestration and Automated Pipelines | 7 |
| 5 | `release-evidence` | Validation, Artefacts, and Release Evidence | 8 |
| 6 | `delivery` | CI/CD, Rollouts, and Rollback | 8 |
| 7 | `serving` | Batch and Online Prediction | 8 |
| 8 | `observability` | Observability, Quality, and Drift | 8 |
| 9 | `retraining` | Feedback, Experiments, and Controlled Retraining | 8 |
| 10 | `governance` | Security, Privacy, and Governance | 8 |
| 11 | `reliability` | Capacity, Reliability, and Incident Learning | 8 |
| 12 | `lifecycle` | Integrated Lifecycle and Evolution | 6 |

## Course conventions

- **Recurring example**: the fictional retailer from Machine Learning runs two systems — an
  **online checkout predictor** (delivery duration and late-delivery risk, per request) and a
  separate **daily planning job** (batch scores for tomorrow's orders). Keep their contracts apart.
  State prediction ids, label maturity, feature availability time, dependency owners, and whether a
  claim is about software correctness, model quality, business value or operational health.
- **Illustrative numbers, computed consistently**: budgets, capacities, latencies and incident
  figures are stated assumptions, not benchmarks. Derived numbers on screen (percentiles, error
  budgets, joins, capacity, drift statistics) are COMPUTED in the scene file from the stated inputs
  or seeded data, so the slide and the frame cannot disagree.
- **Label the evidence**: training observation, validation evidence, final-test result, or
  production observation — the slide says which.
- **Tools illustrate responsibilities**: Python/pseudocode, SQL as-of joins, YAML manifests, with
  MLflow, DVC, Feast, Kubeflow, TFX or KServe only as examples of a responsibility, never a required
  stack. No version-specific feature is essential.
- **Ownership**: algorithms and offline evaluation defer to Machine Learning; neural training state
  to Deep Learning; experiment theory to Probability and Statistics; infrastructure depth to the
  cloud/security courses. A local refresher is fine; a second full treatment is not.

## Scene inventory

Each course adds a `src/scenes/<courseId>/` bundle; list its scenes here as it lands.

| course | scene id | shape | used by |
| --- | --- | --- | --- |
| `requirements` | `objective` | 2 nested TB chain containers → claims table | §1 |
|  | `modes` | requirements table → 2×3 owner container | §2 |
|  | `contracts` | plot (latency histogram + p99) → contract table | §3 |
|  | `interfaces` | 3×2 component container → code card | §4 |
|  | `tests` | checks table → code card → 3-leaf container | §5 |
|  | `failure` | failure table → 2×2 container → code card | §6 |
|  | `automation` | levels table → 2×2 container → table | §7 |
| `data-contracts` | `schema` | contract table → 2×2 container → manifest card | §1 |
|  | `quality` | computed rule table → 3×2 flow container | §2 |
|  | `labels` | computed outcome table → 2×2 container → manifest card | §3 |
|  | `times` | computed scan-clock table → 3-leaf container → table | §4 |
|  | `asof` | computed four-join table → 3-leaf container → SQL card | §5 |
|  | `parity` | equal-axis served-vs-recomputed scatter (seeded) → 2×2 container | §6 |
|  | `fallback` | policy table → 2×2 container → code card | §7 |
|  | `evolution` | responsibility table → change table → 3-leaf container | §8 |
| `runs` | `run-identity` | 3×2 identity container → run manifest card → table | §1 |
|  | `tracking` | computed-fingerprint run table → 2×2 container → code card | §2 |
|  | `lineage` | 2×2 lineage container → record card → rerun table → 3-leaf container | §3 |
|  | `job` | 3×2 job-step container → job spec card | §4 |
|  | `budget` | plot (seeded search, best so far) → computed budget table | §5 |
|  | `resume` | computed preemption trace → 2×2 container → code card | §6 |
|  | `retries` | retry table → computed rerun table → 3-leaf container | §7 |
| `pipelines` | `dag` | 2 nested TB stage containers → component code card | §1 |
|  | `branches` | 3×2 gate container → run table | §2 |
|  | `triggers` | 3-leaf trigger container → computed run-key table → schedule card | §3 |
|  | `caching` | computed cache-key table → 2×2 container | §4 |
|  | `idempotency` | computed duplicate-write trace → 2×2 container → MERGE card | §5 |
|  | `backfill` | computed backfill table → 2×2 container → command card | §6 |
|  | `portability` | local-vs-remote table → 2×2 container | §7 |
| `release-evidence` | `layers` | 3-leaf container → layer table → 2-leaf container | §1 |
|  | `champion` | plot (paired bootstrap of Δ log loss, seeded) → computed table | §2 |
|  | `checks` | candidate review table → 2×2 container | §3 |
|  | `gates` | computed verdict table → 3-leaf container → gate policy card | §4 |
|  | `bundle` | bundle contents table → signature card | §5 |
|  | `aliases` | registry vs runtime timeline → 3-leaf container → code card | §6 |
|  | `serialisation` | format table → compatibility table → code card | §7 |
|  | `retained` | retention table → 2×2 rollback container | §8 |
| `delivery` | `distinctions` | loop table → 2×2 container → 3-leaf container | §1 |
|  | `build-once` | digest table → 3-leaf container → release card | §2 |
|  | `environments` | environment table → evidence table → 3-leaf container | §3 |
|  | `rollout-patterns` | 2×2 pattern container → evidence table → 2-leaf container | §4 |
|  | `traffic` | computed hash-bucket table → 2-leaf container → guardrail table | §5 |
|  | `delayed` | plot (seeded label maturity) → claims table | §6 |
|  | `rollback` | dependency table → 2×2 container | §7 |
|  | `audit` | release record card → retirement table | §8 |
| `serving` | `batch` | computed partition table → 3-leaf container → manifest card | §1 |
|  | `publication` | 3-leaf identity container → storage table → table → publish card | §2 |
|  | `partial` | computed partial-failure trace → contract table → 3-leaf container | §3 |
|  | `startup` | pod timeline → 2-leaf probe container → code card | §4 |
|  | `latency` | 2×3 request-path container → computed budget table | §5 |
|  | `overload` | plot (W = S/(1−ρ) vs load) → 2×2 container | §6 |
|  | `timeouts` | batch-vs-request table → request trace → 3-leaf container | §7 |
|  | `serving-cache` | cache-key table → response card → 3-leaf container | §8 |
| `observability` | `slo` | plot (computed error-budget burn) → incident table | §1 |
|  | `ops-signals` | online signal table → batch signal table → 2-leaf container | §2 |
|  | `telemetry` | 3-leaf container → prediction-event card → label table | §3 |
|  | `privacy` | logging table → alert table → 3-leaf container | §4 |
|  | `change` | change-kind table → 3-leaf reference container → table | §5 |
|  | `drift` | plot (seeded reference vs corrupted distance) → computed PSI table | §6 |
|  | `outcomes` | equal-axis reliability plot (seeded) → join table | §7 |
|  | `triage` | two-alert comparison table → 2×2 container | §8 |
| `retraining` | `instrumentation` | 2×2 event container → table → schema card | §1 |
|  | `experiment` | computed experiment-plan table → 2×2 container | §2 |
|  | `feedback` | 2×2 loop container → computed label table → 3-leaf container | §3 |
|  | `update-triggers` | trigger table → 3-leaf container → table | §4 |
|  | `label-window` | window table → 2-leaf container → code card | §5 |
|  | `promotion` | 3×2 path container → monthly table | §6 |
|  | `races` | alias race trace → 3-leaf container → CAS card | §7 |
|  | `retire` | decision table → 2×2 container | §8 |
| `governance` | `access` | identity × permission table → 2×2 container | §1 |
|  | `secrets` | 3×2 network container → secrets table | §2 |
|  | `minimise` | inventory table → 3-leaf container → retention card | §3 |
|  | `deletion` | deletion-lineage trace → 3-leaf container → lineage SQL card | §4 |
|  | `supply` | artefact-control table → CI card → 2×2 container | §5 |
|  | `threats` | threat table → 2×2 container → gateway config card | §6 |
|  | `review` | risk-record table → computed access-review table → 2-leaf container | §7 |
|  | `obligations` | obligation table → 3-leaf container → 2×2 container | §8 |

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

**Measure it**: with `npm run dev` running, `npm run density [-- <courseId>] [--strict]` drives every
route in capture mode at 1920×1080 and prints slide / binding-axis / area ratios with flags, plus a
screenshot per route in `.tmp/density/`. `npm run check` also *warns* (does not fail) on a slide
modelled under 865px. Rendered slide height runs ~0.95–1.0× the modelled figure — author to
~920–990 modelled to land at 85–92 % on screen.

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it for tall boards that touch the eyebrow —
the engine default is already ~0.12, so 0.12 is a no-op here; 0.17 is the value that moves a board.

Learned in the machine-learning repo: an edge into a nested container's *card* is drawn across that container's
header — target the container instead. A wide board (one long LR row) loses area; restack it into
columns. Tables render small, so give them a companion node rather than standing alone.

Learned in the machine-learning repo: author slides to ~950–990 modelled from the first draft — rendered height
runs 0.88–1.0× the model (lower for bold- and symbol-heavy slides), and the 1000 cap is a hard
failure, so trim with one-line bullets rather than dropping a block. Prefer TB stacks: a code card or
table beside a tall stack shrinks to illegible. For an equal-axis plot that binds on height, widen its
x-range rather than lowering padding (lower padding pushes it under the eyebrow). Plot geometry that
a slide quotes (neighbours, support vectors, tube violations) is COMPUTED in the scene file from the
seeded points in `src/scenes/points.ts`, never typed in, so slide and frame cannot disagree.

Learned in the deep-learning repo: a slide that fits is about **14 content lines** — a lead
sentence, three `###` blocks, ~10 one-line bullets; first drafts of 18+ lines overflowed every time.
The height model pads **bold** (~10 %), so a bold-heavy bullet models a wrapped line it may not render;
unbold before cutting content. A container whose children have **edges** ignores `cols` and flows —
for a grid, drop the inner edges or put TB sub-containers inside a `cols` group. Leaf `pattern` keys
are `service`, `network`, `storage`, `external`, `user`, `warn` (and `group` for containers); a wrong
one fails `tsc`, unlike a wrong `icon`.

These are read off the rendered route by eye — `check` models no density at all. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
