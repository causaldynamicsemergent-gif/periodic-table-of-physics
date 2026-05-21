# Tracks after Phase A — handoff and routing

**Purpose of this file.** Resume point for the project after the Predictive Layer's Phase A shipped (Step 8 deployed, MCP server live on v40/v16). Records what's complete, the tracks queued for the next builds, the dependencies and starting moves for each, the operational norms that carry forward, and the maintainer's call on ordering. Standing reference for the project maintainer, AI assistants in fresh sessions, and physicist collaborators reading the repo.

Location: `/methodology/TRACKS_AFTER_PHASE_A.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_HANDOFF.md` (explorer build, active) and `PREDICTIVE_LAYER_HANDOFF.md` (Predictive Layer Phase A, now closed). When a track below activates, it gets its own scoped handoff modeled on those two.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live MCP server: `https://map-of-physics.eddie-8e5.workers.dev` — **now serving v40 / v16, 28 tools** (since Step 8 deployment).
The canonical data: `data/Map_v34_consolidated.json`, internal version `v40`. Server-verified counts: 71 nodes, 191 edges, 30 formal-classifications, 484 cells (376 realized + 22 forbidden-by-pattern + 86 indeterminate; 0 conjectured-by-pattern), 22 glossary entries, 7 experimental programs, 102 cross-classification edges (97 cross-FC + 5 closure-constraint self-edges), 10 edges with `axis_mapping` populated.
The live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html` — Update C in progress, forward-compatible with v16 (does not yet *surface* the new fields visually).
The schema: `Map_v16_schema.json` (current); `Map_v15_3_schema.json` retained for reference.
The validator: implements Rules 1–23 (Rules 19–23 added in Phase A Step 3); CI gates PRs to data + schema files.

### What Phase A delivered

Eight steps (0 → 8), four shipped content authoring passes (Steps 4, 5, 6b/no-op, 7, 7b), and the worker rebuild (Step 8). The dataset moved from v34 to v40; the schema from v15.3 to v16. The MCP surface gained three new tools (`find_forced_cells`, `get_forcing_constraint`, `get_axis_mapping`) and one extended tool (`find_cells` accepts `constructiveStatus` and `hasForcedBy` filters and projects `constructive_status` + `forced_by` fields). Three of the four Predictive Layer mechanisms (forcing of cells; structurally-excluded cells made first-class; axis-mapping declarations) are now machine-queryable. The fourth (`if_real_implies`) is Phase B and not yet specced.

The detailed shipped milestones, lessons, and decisions are in the now-closed `PREDICTIVE_LAYER_HANDOFF.md`.

### Where Phase A leaves the project

Phase A is *usable AI infrastructure*: Claude can query forced cells, structurally-excluded cells, axis-mappings, and the full v15.3 substrate through the MCP, with citations attached. That meets the AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2 in its first concrete instance.

Phase A is *not yet the full Mendeleev-style predictive demonstration the project promises*. The forbidden-by-pattern cells reproduce textbook QFT (gauge bosons don't have generations, etc.) — no physicist will be surprised. The 10 axis-mappings are real but technical. The forward-looking conditional consequences ("if frontier X resolves this way, then structural consequence Y must follow") that would actually look Mendeleev-style live in `if_real_implies` (Phase B). The energy/length-scale bounds that say where each structural claim applies live in `quantitative_scale` (Phase C). Without those, the layer is closer to "queryable structural backbone with explicit closure constraints" than to "predictive table that demonstrates which empty cells must be filled and what would fill them."

The maintainer's call (recorded in this document): **complete the Predictive Layer in full before opening the review pathway.** Reviewers will not know in advance which subfield reaches them; a full layer gives each subfield specific structural claims they can prove or disprove. A partial layer makes them evaluate scaffolding plus promises. The build queue is correspondingly longer — see "Recommended ordering" below.

---

## Tracks queued

Five units of work are queued. Each gets its own scoped handoff when it activates. The ordering recommendation is at the end of this section.

### Track 1 — Explorer v16 surfacing

**What.** Make the three v16 fields (`constructive_status`, `forced_by`, `axis_mapping`) visible in the explorer UI. The data is live; the explorer fetches `Map_v34_consolidated.json` at runtime, so it already *has* the new fields — it just doesn't render them.

**Why it's well-scoped.** No new schema design needed. No physics-content authoring needed. The dataset is the binding spec. Each new field maps onto a concrete UI element whose design pattern already exists in the explorer (tile annotations, edge-card chrome, sidebar sections).

**Sketch of the work.**
- Tile-level: add a small marker to FC tiles whose cells include forbidden-by-pattern entries (currently `sm-rep-content` and `su5-gut-rep-content`, 22 cells total). Mirror the existing ⚠N falsification badge pattern.
- Cell-level (in the cell drill-down sidebar): show `constructive_status` as a status pill alongside the cell's existing prediction status; show `forced_by` as a "Forced by" section listing the constraint edges with click-through to the edge card.
- Edge-level (in the edge card chrome built by Update C clickable-edges): when an edge has `axis_mapping`, render a small "Axis correspondence" subsection showing the mapping entries (`from_axis → to_axis`, `correspondence`, `description`).
- Sidebar legend addition: explain the four `constructive_status` values, mirroring the existing closure-level legend's style.

**Dependencies.** None blocking. Builds on Update C's clickable-edges card chrome. Touch the help-overlay text in the same pass (currently says "8 phenomenon-to-phenomenon edges" — live data has 7, per the EXPLORER_HANDOFF outstanding-follow-up note).

**Diff-shape estimate.** Modest. Probably 80–150 lines added across two or three of the existing explorer JS modules + ~30 lines of CSS. No HTML skeleton changes. No new fetches.

**Risk notes.** Low. All v16 fields are optional everywhere; absence renders nothing (graceful degradation). A separate analogous pass will be needed later for Phase B and Phase C fields (call it "Track 1' — Phase B/C surfacing"); Track 1 doesn't pre-commit any of that work, but the rendering patterns it lands set the precedent.

### Track 2 — Predictive Layer Phase B (`if_real_implies`)

**What.** The fourth Predictive Layer mechanism from `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2.4. Records what *would follow* if a frontier node's open question received a particular answer. Targets `open-frontier` and `totality-approach` discourse-layer nodes, not cells. Examples (illustrative, not committed): "if the hierarchy problem resolves via SUSY at the EW scale, then `sm-rep-content` extends with superpartners"; "if quantum gravity is unitary, then black-hole information recovery implies a specific structure on the QG-frontier." The mechanism is conditional structural claims attached to discourse-layer nodes.

**Why it's the centerpiece.** The Mendeleev-style demonstration the project promises lives here. Phase A made existing structure machine-explicit; Phase B is the forward-looking conditional move — the one that gives reviewers specific subfield claims they can prove or disprove. Whichever physicist eventually engages with the project finds `if_real_implies` entries in their subfield and the structural consequences each entry projects. Phase A alone gives reviewers little to engage with beyond "yes, this is well-organized." Phase B gives them claims.

**Sketch of the build.** Same arc as Phase A: scope memo → v17 spec extension → schema JSON → validator update → authoring passes → MCP worker rebuild. Each of those is a named step. Mirroring Phase A's 8-step structure, expect roughly 6–10 numbered steps depending on how many authoring sweeps the frontier set requires.

The shape questions the scope memo must answer before any schema work:
- Which discourse-node types can carry `if_real_implies` (open-frontier? totality-approach? candidate-foundational-program targeted-at?)
- What edge-like cross-references do conditional consequences make to FCs (new cells? new predictions? new bears-on edges? a new edge subtype?)
- How does the firewall distinguish "this is what would follow" from "this is what we expect to find" — Phase A's firewall test ("is this making existing structure explicit?") doesn't apply directly; Phase B needs its own criterion
- How does `if_real_implies` interact with the existing `predictive_yield` mechanism on FCs (these are different — predictive_yield is structural-consequence-of-the-FC; if_real_implies is structural-consequence-of-a-frontier-resolution)
- Plurality: does a frontier carry multiple if_real_implies entries for mutually-exclusive resolutions (likely yes; e.g., hierarchy-problem can resolve via SUSY, via composite Higgs, via anthropics, via something else, each with different structural consequences)

**Dependencies.** Scope memo first; everything else after. No external dependencies on Track 1 or any other work.

**Diff-shape estimate.** Scope memo (~3–5 KB), spec extension (~150–250 lines), schema JSON (~150–250 lines net addition over v16), validator update (~3–6 new rule functions), authoring is the variable — depends on how many frontiers get annotated and how many conditional resolutions per frontier. The dataset has 8 open-frontier nodes and 6 totality-approach nodes (verifiable via MCP `list_nodes`), so the upper bound on authored entries is on the order of dozens, not hundreds.

**Risk notes.** Highest firewall risk of any track. `if_real_implies` is the mechanism where pattern-finding can most easily slide into pattern-asserting. The mitigation under the maintainer's "ship complete before review" call is to write the firewall test for Phase B *as part of the spec*, in a way that lets the scope memo's chat (and every authoring-pass chat) self-check before adding entries. A reasonable starting form: an `if_real_implies` entry is admissible only if (a) the resolution being conditioned on is a known position in the subfield literature, (b) the structural consequence claimed is one a working subfield specialist would endorse as structural rather than speculative, and (c) the entry cites the literature where both halves are recorded. The exact form is for the scope memo to fix. Until the firewall test is locked in, authoring should not start.

### Track 3 — Predictive Layer Phase C (`quantitative_scale`, `resolves` edge type)

**What.** Two mechanisms from `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2.5 and §2.6. `quantitative_scale` records numerical scales (energies, distances, dimensionless ratios) that bound where a structural claim applies. `resolves` is a new edge subtype connecting an open-frontier to a candidate-foundational program that, if the program succeeds, would resolve the frontier.

**Why both belong to Phase C.** Both quantitative-scale-bounded and resolution-pathway claims are about the *applicability and discharge* of structural content, not about the structural content itself. They're naturally a single bump.

**Sketch of the build.** Same arc as Phase B: scope memo → v18 spec extension → schema JSON → validator update → authoring passes → MCP worker rebuild. Probably 6–8 numbered steps.

The shape questions for the scope memo:
- Where does `quantitative_scale` attach — on cells? on FCs as a whole? on bears-on edges (where the constraint is scale-dependent)? on all three?
- Units / format: how is a scale recorded so it's machine-comparable? (string-with-unit-prefix? structured object with magnitude + unit + log-bracket?)
- How does `quantitative_scale` interact with `if_real_implies`'s conditional consequences (do the consequences also carry scale bounds?)
- For `resolves`: how does it differ from the existing `bears-on` edge with `nature: partially-solves`? Is `resolves` a strengthening of that nature, or a separate edge type? If separate, what's the migration of existing partially-solves edges?

**Dependencies.** Phase B scope-memo decisions inform Phase C's design (the scale-bounding of `if_real_implies` consequences, the relationship between `resolves` and `if_real_implies` entries on the same frontier). Phase C should not start authoring until Phase B has at least landed its spec.

**Diff-shape estimate.** Similar to Phase B at the spec stage. Authoring is more bounded because `quantitative_scale` can be left field-absent (most structural claims aren't scale-dependent in a way the map needs to record), and `resolves` edges are a subset of the existing bears-on graph.

**Risk notes.** Quantitative claims are closer to empirical physics than Phase A or B. The firewall criterion is sharper: a `quantitative_scale` value is a numerical claim that is checkable against experiment. Citation discipline matters more. The mitigation is the same as Phase B: write the firewall test into the spec.

### Track 4 — Open the review pathway

**What.** The fifth step of the original `PROJECT_INFRASTRUCTURE.md` plan, deferred until the Predictive Layer is complete. GitHub Issues templates for cell errata / new-FC proposals / cross-class edge proposals / Phase-B if_real_implies disputes / Phase-C scale disputes; `/methodology/EDITORIAL.md` describing the editorial process and the firewall constraints on what counts as a valid contribution; outreach copy plus the live explorer link sent to 2–3 working physicists in different subfields.

**Why it's last.** The maintainer's call: a complete Predictive Layer gives subfield reviewers specific claims to engage with. Going to them with Phase A alone offers little for their subfield to bite on; going to them with Phase A + B + C offers `if_real_implies` entries in their subfield with conditional consequences and scale bounds they can verify, refute, or refine. The review pathway shouldn't open until the substrate it points to is in a state worth pointing at.

**Sketch of the work.** Largely unchanged from how the review pathway was described in `EXPLORER_HANDOFF.md`:
- `/.github/ISSUE_TEMPLATE/cell-erratum.md` — short form for "this cell is wrong / incomplete / needs a citation"
- `/.github/ISSUE_TEMPLATE/new-fc-proposal.md` — for proposed new formal classifications
- `/.github/ISSUE_TEMPLATE/new-edge-proposal.md` — for proposed new cross-classification edges
- `/.github/ISSUE_TEMPLATE/if-real-implies-dispute.md` — Phase B specific; for disputing a conditional consequence claim
- `/.github/ISSUE_TEMPLATE/scale-dispute.md` — Phase C specific; for disputing a `quantitative_scale` value
- `/methodology/EDITORIAL.md` — the operating manual for reviewers
- Outreach copy plus the live explorer link sent to physicists across subfields

**Dependencies.** Tracks 2 and 3 complete (Phase B and Phase C both shipped through worker rebuild). Track 1 (explorer surfacing) for Phase A and the analogous Phase B/C surfacing should both be shipped first so reviewers have a navigable UI. Track 5 (housekeeping) ideally cleared.

**Diff-shape estimate.** Modest. Five issue templates (~50 lines each), one EDITORIAL.md (~3–5 KB), an outreach drafting pass that doesn't touch the repo.

**Risk notes.** The risk shifts from technical to social. Picking reviewers whose feedback will be substantive; framing the project so they engage with the structural claims rather than dismissing it. The user-stated principle "use physics vocabulary as much as possible" applies especially to outreach copy. Spread reviewer subfields wide (condensed-matter / hep-ph / quantum-gravity / mathematical-physics is a reasonable quadruple); each finds different Phase B + C entries to engage with.

### Track 5 — Housekeeping (parallel, non-blocking)

Listed in the closed `PREDICTIVE_LAYER_HANDOFF.md` and `EXPLORER_HANDOFF.md`:

- `PROJECT_GOAL (1).md`, `PROJECT_GOAL_PHENOMENON_LAYER (1).md`, `PROJECT_PATTERN_FINDING_METHODOLOGY (1).md`, `DEPLOYMENT_step4 (1).md` — `(1)` suffixes from upload collisions. Confirm canonical, delete or rename the copies.
- `PROJECT_GOAL_SUPPLEMENT.md` — in project knowledge, not in `/methodology/` of the repo. Upload to make it fetchable.
- The v15.3 schema's `description` field references a `MAP_v15_3_schema_spec_extension.md` that doesn't exist. Pre-existing loose end; v16 supersedes, leave or delete.
- The explorer help-overlay says "8 phenomenon-to-phenomenon edges" — live data has 7. Worth checking the MCP `GET` endpoint banner too after the Step 8 deploy in case the drift was inherited.
- `_meta._schema` field in the data file currently reads `"Map_v16_schema.json"` (correctly, post-Step-2). No action.

Any pass touching these is welcome; none gate any substantive track.

---

## Recommended ordering

The maintainer's call: **complete the Predictive Layer in full, then open review.** Reviewers cannot be pre-selected by subfield; the full layer gives each subfield specific claims to engage with. The trade-off — that this is a substantially longer build queue before review feedback arrives — is accepted in exchange for review that engages with predictions rather than scaffolding.

Recommended sequence:

1. **Track 1 — Explorer v16 surfacing.** Quick win (~150-line UI pass). Makes Phase A visible to the maintainer for ongoing sanity-check during the Phase B/C build, and lands the rendering precedents that Phase B/C surfacing will inherit. Ship this in parallel with starting Track 2's scope memo if you want; they touch independent files.
2. **Track 2 — Predictive Layer Phase B (`if_real_implies`).** Full build, scope memo through MCP rebuild. Expect roughly 6–10 numbered steps.
3. **Track 3 — Predictive Layer Phase C (`quantitative_scale`, `resolves`).** Full build. Expect roughly 6–8 numbered steps. Can start scoping in parallel with Phase B's later authoring passes; should not start spec or authoring until Phase B's spec lands (per the dependency note in the Track 3 sketch).
4. **Track 1' (implicit) — Explorer Phase B/C surfacing.** Render the new fields. Modelled on Track 1's rendering patterns.
5. **Track 5 — Housekeeping.** Clear the loose ends before reviewers see the repo.
6. **Track 4 — Open the review pathway.** Issue templates + EDITORIAL.md + outreach. This is when physicists are invited in.

**Realistic time horizon.** Phase A took 8 numbered steps across multiple chat sessions. Phase B + Phase C will combined be on the order of 12–18 numbered steps. Each numbered step is roughly one focused chat session of authoring + a maintainer paste-and-deploy cycle. Total build queue between this handoff and Track 4 opening: substantial, not a couple of weeks. Worth knowing up front.

**Parallelism opportunities.** Track 1 (explorer surfacing) doesn't touch the data layer; it can ship at any point. Track 5 (housekeeping) is decoupled from everything. Within Phase B, the scope memo and spec must be sequential, but authoring passes against the spec can split by subfield (one chat takes hep-ph frontiers, another takes condensed-matter, etc.) if a maintainer-orchestration pattern emerges.

---

## Working norms (carry forward)

These carry forward unchanged from the closed and active handoffs:

- **Non-developer maintenance.** All deployment via GitHub web UI and Cloudflare web editor. No git CLI, no local dev environment, no `npm` or `wrangler`.
- **Project files are for stable reference material.** Handoffs, methodology docs, goal docs go in project knowledge. Don't attach large schemas or datasets (the explorer, the worker source, the data file) — fetch via `web_fetch` instead.
- **CI gates PRs to data + schema.** Methodology docs and explorer files commit directly to `main` without CI gating. Data and schema PRs must pass `scripts/validate.py` (currently Rules 1–23, with 4 legacy `constrains` edges tolerated per `PROJECT_INFRASTRUCTURE.md` §2).
- **The firewall is binding.** `META_v21_1_methodology_firewall.md` constrains what counts as a valid structural claim. Pattern-finding can surface candidates; only the firewall criteria decide what becomes content. Phase B's elevated firewall risk is the reason the spec must include its own admissibility test before any authoring starts.
- **MCP is the inspection surface.** When a chat needs to inspect dataset state, the MCP server's read-only tools are the fast path. The data file is 1.49 MB which exceeds the github.com blob fallback size limit; raw CDN or MCP for inspection.
- **Existing content is load-bearing.** Cell content, axis labels, citation text, edge descriptions, status fields are not paraphrased in commits or code. New fields are added explicitly; existing ones are not rewritten without an authoring decision recorded in a handoff.
- **Use physics vocabulary.** User-stated principle. Don't coin presentation terms when the data already names a thing.

---

## How to start a new chat on this work

Project files auto-attach when a fresh chat opens in the Claude project. To resume:

1. Open a fresh chat.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, `EXPLORER_HANDOFF.md`, `PREDICTIVE_LAYER_HANDOFF.md` (closed but kept for reference), `PROJECT_GOAL.md`, `PROJECT_GOAL_SUPPLEMENT.md`, `PROJECT_GOAL_PHENOMENON_LAYER.md`, `PROJECT_GOAL_PREDICTIVE_LAYER.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, `MAP_v16_schema_spec_extension.md`.
3. Tell it which track to pick up — e.g., *"Pick up Track 2 from TRACKS_AFTER_PHASE_A.md: Predictive Layer Phase B. Start with the scope memo addressing the five shape questions in the Track 2 sketch."*
4. The chat fetches code and data from GitHub via `web_fetch`. Raw URLs in the Quick reference below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats. If the assistant doesn't see them, ask it to call `tool_search` with keyword `"map of physics"`. The connector now serves **v40 / v16, 28 tools** — the three new tools (`find_forced_cells`, `get_forcing_constraint`, `get_axis_mapping`) plus the extended `find_cells` are the inspection surface for v16-specific queries.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev` (v40 / v16)
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- This handoff: `/methodology/TRACKS_AFTER_PHASE_A.md`
- Closed: `/methodology/PREDICTIVE_LAYER_HANDOFF.md`
- Active: `/methodology/EXPLORER_HANDOFF.md`
- Goals: `/methodology/PROJECT_GOAL.md`, `/methodology/PROJECT_GOAL_SUPPLEMENT.md`, `/methodology/PROJECT_GOAL_PHENOMENON_LAYER.md`, `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Infrastructure: `/methodology/PROJECT_INFRASTRUCTURE.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- v16 schema: `/schema/Map_v16_schema.json`
- v16 spec: `/methodology/MAP_v16_schema_spec_extension.md`

### Raw URLs for `web_fetch`

- v16 schema: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v16_schema.json`
- v16 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v16_schema_spec_extension.md`
- Predictive layer goal: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- v40 data (1.49 MB — exceeds github.com blob fallback size limit, use raw CDN or MCP): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
- Validator: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/scripts/validate.py`
- CI workflow: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/.github/workflows/validate.yml`
- MCP worker source (Step 8): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker.js`

---

*End of TRACKS_AFTER_PHASE_A.md, v1 (post-Step-8: Phase A complete, MCP serving v40 / v16 / 28 tools; build queue committed to completing the Predictive Layer through Phase C before opening review; ordering is Track 1 → Track 2 (Phase B) → Track 3 (Phase C) → Track 1' (UI surfacing) → Track 5 (housekeeping) → Track 4 (review)). Update when a track activates or completes.*
