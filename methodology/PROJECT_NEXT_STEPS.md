# Project next steps — operational queue

**Date:** 2026-05-26 (initial draft); amended 2026-05-27 (E1 closure + file-delivery norm); amended 2026-05-27 (E2 closure, E4 promotion); amended 2026-05-27 (E4 closure, E3 promotion, §5.8 E3 template body drafted); amended 2026-05-27 (E3 closure, E5 promotion, §5.9 E5 template body drafted).
**Status:** Active. This document is the project-level operational queue. Every session reads it at start; every session updates it at close.
**Purpose:** Hold the operational state of all open workstreams so any fresh session can determine what action is currently eligible without consulting prior conversation history. Provide prompt templates so each session can generate the closing prompt that opens the next session.
**Position:** Lives in `/methodology/`. Attached to every fresh chat via project files. Companion to `META_v21_1_methodology_firewall.md`, the workstream-specific handoffs (`PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`, `EXPLORER_PHASE_BC_HANDOFF.md`, `TRACK_4_USE_SIDE_ARTIFACTS.md`, `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`), and the project goal documents.

---

## 0. Highest-priority eligible action right now

**Sub-PR E5 (tile / discourse-node decoration for Phase B+C coverage) — workstream 2.2.**

Prompt template at §5.9. Sub-PR E3 closed 2026-05-27 (the if_real_implies trees on all 14 carrier nodes now render via a new tenth JS module `explorer-implies.js` with companion stylesheet `update-e3.css` + two call-site additions in `explorer-discourse.js`; 14 carriers / 23 resolutions / 24 implications / 12 implication-level qs entries all surface — the explorer Phase B + Phase C content-surfacing gap is now closed). E5 is the last sub-PR before the surfacing pass closes; it adds the visual signal layer on tiles and discourse-node cards so a physicist at-a-glance sees which nodes carry Phase B / C content worth opening. After E5, every Phase B + Phase C content category is rendered AND signalled in the explorer; Track 4 use-side artifacts (essay, query recipes, example sessions per `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.1, §1.2, §1.4) move from pending to eligible.

---

## 1. The workflow

The project runs as a chain of sessions, each producing one deliverable and the prompt that opens the next session.

The maintainer is a non-physicist, non-developer coordinator. The chain holds without requiring maintainer memory or judgment about what state the project is in. The discipline is:

1. **Each session reads this document at start.** Identifies which workstream the pasted prompt is from, confirms the action is still eligible (substrate conditions may have changed since the prior session), runs any state-verification ritual the workstream handoff specifies.
2. **Each session executes one deliverable.** Substrate authoring (sub-PR), methodology authoring (scope memo, handoff update), discharge update, or other single coherent unit of work.
3. **Each session updates this document and the relevant workstream handoff** — *as complete files, not patches.* See §6 norm #1.
4. **Each session produces the closing prompt before terminating.** Self-contained instruction block in a clearly-marked code block, ready for copy-paste into the next chat. The closing prompt is mandatory; a session is not done until it has produced one.

The maintainer copies the closing prompt, opens a fresh chat in the project, pastes the prompt as the opening message. Project files attach automatically. The chain continues.

**Failure mode to guard against:** a session ships a deliverable but doesn't update this document or doesn't produce a closing prompt, or delivers updates as patches the maintainer has to splice. The next session then either misidentifies the project's state (drift), has no instruction (chain break), or the maintainer slows the chain manually applying edits. The discipline that prevents this is: *the deliverable is the substrate change PLUS the document updates as complete files PLUS the closing prompt.* All three must be visible before a session terminates.

---

## 2. Open workstreams

Four workstreams are currently in motion. Each has a workstream-internal handoff document that holds the detail; this document holds the cross-workstream view.

### 2.1 Phase C closure (Predictive Layer) — CLOSED

*Handoff:* `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` (marked closed at v95; preserved for reference).

*State:* All five Phase C authoring steps shipped (4.1, 4.2, 4.3, 4.4, 4.5). Sub-PR 57 (fcc, Step 4.4 closure) shipped 2026-05-26 as v94. Step 4.5 (quantitative_scale on 12 if_real_implies implications) shipped 2026-05-26 as v95. Consolidated MCP worker rebuilt and verified via `server_info` (data v95, schema v19, 33 tools, 38 resolves edges, 288 quantitative_scale entries). Worker rebuilds are Cloudflare deployment operations verified via `server_info` rather than via `_meta.changelog` entries — the changelog tracks substrate authoring, not deployment.

*Eligible action:* None remaining.

*Closure condition:* Met 2026-05-26.

### 2.2 Explorer Phase B+C surfacing

*Handoff:* `EXPLORER_PHASE_BC_HANDOFF.md`.

*State:* Eight sub-PRs (E1-E8) sequenced. E1 closed 2026-05-27 as a verification-only zero-diff sub-PR. E2 closed 2026-05-27 as a substantive code sub-PR — the 38 Phase C resolves edges now render across the program / cell / frontier / totality-approach cards via a new `explorer-resolves.js` module. E4 closed 2026-05-27 as a substantive code sub-PR — the reusable quantitative_scale callout component now lives in a new `explorer-qs.js` module + `update-e4.css` stylesheet; 276 of 288 qs entries render across the four dense surfaces plus the carrier-card prominent block; the E2 sensitivity surface migrated from its minimal-inline `formatQS` to the new component. E3 closed 2026-05-27 as a substantive code sub-PR — the if_real_implies trees on all 14 carrier nodes now render via a new `explorer-implies.js` module + `update-e3.css` stylesheet + two call-site additions in `explorer-discourse.js`; 23 resolutions / 24 implications / 12 implication-level qs entries all surface; the explorer Phase B + Phase C content-surfacing gap is now closed. E5 (decoration / signal-layer chips on tiles and discourse-node cards) is the last sub-PR before the surfacing pass closes — it doesn't add new content surfaces, it adds visual indicators on the existing tile and discourse-node chrome so a physicist at-a-glance sees which nodes carry Phase B / C content worth opening.

*Eligible action:* Sub-PR E5 (tile / discourse-node decoration for Phase B+C coverage). E6, E7, E8 are discretionary follow-ups.

*Closure condition:* Sub-PRs E1-E5 shipped (E6-E8 are discretionary polish, not required for closure).

### 2.3 Cross-FC pattern layer (the reading layer)

*Scope memo:* `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`.

*State:* Scope memo committed. Six provisional modes identified. First authoring sub-PR is *not* currently eligible — Phase C closure is one of the trigger conditions (now met), but schema v20 authoring, four-FCs-stable check, and validator clean status still gate. See scope memo §10.1 for the trigger conditions.

*Eligible action:* None currently. Watch for triggers.

*Closure condition:* The layer doesn't have a closure in the same sense as Phase C or the explorer pass. It runs continuously as the substrate matures, with each mode's sub-PRs accumulating over time. The "first sub-PR shipped" milestone is the next state transition; subsequent milestones are mode-specific.

### 2.4 Track 4 use-side artifacts

*Reference:* `TRACK_4_USE_SIDE_ARTIFACTS.md`.

*State:* Four artifacts named (essay, query recipes, chat entry point, example sessions). The chat entry point (§1.3) is mostly independent of explorer surfacing and can be drafted now. The other three depend on the explorer's final shape — that shape is one sub-PR (E5) away from being final.

*Eligible action:* Track 4 §1.3 (chat entry point). Lower priority than workstream 2.2 but available for sessions wanting to make independent progress. The other three Track 4 artifacts (essay, query recipes, example sessions) become eligible once E5 closes — see §4.

*Closure condition:* All four artifacts shipped, with the explorer surfacing closed so the artifacts can point at real explorer surfaces.

---

## 3. Currently eligible actions (priority-ordered)

1. **Sub-PR E5 (tile / discourse-node decoration for Phase B+C coverage)** — workstream 2.2. Highest priority: the last sub-PR before the explorer Phase B + C surfacing pass closes. Adds small chips / indicators on FC tiles, cell tiles, and discourse-node cards signalling which Phase B / Phase C content the node carries (qs on cells, qs on FCs via predictions, resolves on programs / cells / frontiers, if_real_implies on carriers). Touches `explorer-map.js` (tile decoration) and `explorer-discourse.js` (discourse-node card decoration) plus CSS. Template at §5.9.

2. **Track 4 §1.3 (chat entry point)** — workstream 2.4. Independent of explorer surfacing, lower physics-content demand. Suitable for sessions where the maintainer wants to advance the project without explorer authoring. Template at §5.4.

The default next session executes (1) unless the maintainer chooses otherwise.

---

## 4. Pending eligibility (blocked on triggers)

The following actions are *not* currently eligible. Each is listed with the trigger condition that would unblock it.

**Sub-PRs E6 (rank_by_scale overview panel) and E7 (find_discriminating_experiments view).** Discretionary net-new views beyond explorer Phase B+C surfacing closure. Eligible after E1-E5 ship if the maintainer chooses to extend the explorer further.

**Sub-PR E8 (explorer banner + About panel refresh).** Lightweight one-file touch; can ship alongside any earlier sub-PR as a stowaway or as a standalone closing step.

**Cross-FC pattern layer first authoring sub-PR (Mode D, anomaly-content virtual-FC).** Phase C closure trigger now met; remaining trigger conditions per `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.1 — schema v20 authored, four involved FCs stable, validator clean — still gate eligibility.

**Cross-FC layer first Mode E sub-PR.** Blocked on `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.2 triggers. Substantially downstream.

**Cross-FC layer first Mode F sub-PR.** Blocked on `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.3 triggers. Years out.

**Track 4 essay (§1.1), query recipes (§1.2), example sessions (§1.4).** Blocked on the explorer Phase B+C surfacing closing (sub-PRs E1-E5 shipped). The artifacts need to point at real explorer surfaces. One sub-PR (E5) away from eligibility.

**Track 1 / 1' explorer surfacing of v16+ fields, Track 5 housekeeping.** Per `TRACKS_AFTER_PHASE_A.md`, the Phase C closure gate is now met; deprioritised below the Phase B+C surfacing pass.

---

## 5. Prompt templates

Each template produces a self-contained instruction block. The session generating the closing prompt selects the template that matches the next-eligible action and instantiates it with current state.

**All templates assume the deliverable ships as complete files** (per §6 norm #1). The closing prompt that the next session pastes must contain that instruction explicitly so the next session does the same.

### 5.1 Sub-PR 57 (fcc resolves edges) — DISCHARGED 2026-05-26 as v94

```
Pick up Step 4.4 sub-PR 57 from `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §3: fcc resolves edges. This closes the last unattached forward-looking experimental-program node from sub-PR 0.5 and closes Step 4.4.

Run §0 state-verification first: call `server_info` on the MCP, fetch `data/Map_v34_consolidated.json` `_meta` block via raw CDN at https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json, confirm what's live. Note drift from the handoff's "Where things stand" section if present.

Then proceed:

1. Use `get_node("fcc")` to retrieve the existing description, citations, and `produced_classifications` field.

2. Identify the fcc-ee + fcc-hh science cases. Expected coverage per the fcc CDR and Snowmass 2022: Higgs-coupling precision (fcc-ee), electroweak precision at the Z pole (fcc-ee), top-quark mass precision (fcc-ee), direct BSM search reach at 100 TeV (fcc-hh), possibly precision auxiliaries. Mixed-exclusion-flavor sub-PR shape per the sub-PR 56 rubin-lsst precedent: PPP-populated edges where SM-side competing point predictions exist (Higgs couplings, EW observables), exclusion_only edges where program candidate predictions are parameter-class only (direct BSM searches).

3. For each science case, identify the target node (open-frontier, totality-approach, or cell) and edge subtype. Expected 4-7 resolves edges total.

4. For each edge, populate the sensitivity quantitative_scale (with bound_direction per v19), the timeline (forward-looking with FCC schedule), the predictions_per_program where applicable, the exclusion_only flag, and citations from the fcc CDR + recent fcc physics papers.

5. Propose the edge set as one sub-PR. Wait for maintainer confirmation before authoring the consolidated JSON update.

6. Once authored, update `_meta.changelog` with the sub-PR record. Sub-PR 57 should also document any T-convention additions if fcc's encoding requires them (likely none — rubin-lsst precedent should cover most cases).

7. Update `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §1 ("Where things stand"), §2 ("What's been shipped"), and §3 ("What's queued next") to reflect sub-PR 57 shipping. Step 4.4 is now closed; Step 4.5 becomes the next eligible action.

8. Update `PROJECT_NEXT_STEPS.md` §3 (remove sub-PR 57 from currently-eligible), §4 (promote Step 4.5 from pending to eligible).

9. Before closing this session, produce the next closing prompt — a self-contained instruction block for Step 4.5 — using the template in `PROJECT_NEXT_STEPS.md` §5.2. Output the prompt at the end of the conversation in a clearly-marked code block the maintainer can copy.

The vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` does not bind authoring work (per its §7) — schema field names and methodology vocabulary are appropriate in sub-PR commit messages and changelog entries.
```

### 5.2 Step 4.5 (if_real_implies quantitative_scale) — DISCHARGED 2026-05-26 as v95

```
Pick up Step 4.5 from `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §3: quantitative_scale on the if_real_implies implications. This closes Phase C.

Run §0 state-verification first: call `server_info` on the MCP, fetch the data file's `_meta` block, confirm sub-PR 57 shipped and the substrate is current.

Then proceed:

1. Use `find_signal_implications` to enumerate the 24 implications across the 14 if_real_implies carriers. Identify which carry quantitative content (expected ~12 — the Davidson-Ibarra leptogenesis M₁ ≳ 10⁹ GeV bound is the canonical example).

2. For each quantitative implication, draft a quantitative_scale entry on the implication itself: value, units, kind, log10, uncertainty, bound_direction (per v19), citations. Use the T-conventions established in Phase C surface sweeps.

3. Decide scoping: one sub-PR if the ~12 entries can be drafted together, or batch by carrier if cleaner. The handoff doesn't constrain this; the implementing session chooses.

4. Propose the change set. Wait for maintainer confirmation before authoring.

5. Once authored, update `_meta.changelog`. Step 4.5 closes Phase C — the consolidated worker rebuild is the next action.

6. Update `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §1, §2, §3 to reflect Step 4.5 shipping and Phase C closing. The worker rebuild becomes the next eligible action.

7. Update `PROJECT_NEXT_STEPS.md` §3 (remove Step 4.5), §4 (promote worker rebuild + sub-PR E2 to eligible since their triggers will be met when the rebuild verifies).

8. Before closing, produce the next closing prompt for the worker rebuild using the template in `PROJECT_NEXT_STEPS.md` §5.5.
```

### 5.3 Sub-PR E1 (12 experimental-program nodes in explorer) — DISCHARGED 2026-05-27 (verification-only)

```
Pick up sub-PR E1 from `EXPLORER_PHASE_BC_HANDOFF.md` §3: render the 12 forward-looking experimental-program nodes in the existing discourse layer.

Run §0 state-verification first: confirm the live explorer at https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html is current. Confirm the data fetched at runtime includes the 12 forward-looking programs (DUNE, Hyper-K, JUNO, gw-ground-network, LISA, CMB-S4, Rubin-LSST, DESI, axion-haloscope-network, EDM, muon-g-2-continuation, FCC).

Then proceed:

1. Fetch `explorer-discourse.js` from raw GitHub. Look at how it handles the existing 7 historical experimental-program nodes (PDG, ATLAS+CMS, UA1+UA2, CDF+D0, DONUT, BNL+SLAC, Fermilab-Upsilon).

2. Identify what the 12 new nodes need that the existing renderer may not handle: new subtype values (survey-program, accelerator-program), forward-looking timeline display (start_year without end_year), possibly a visual differentiation between historical and upcoming programs.

3. Propose a minimal diff to `explorer-discourse.js` (and possibly `explorer-data.js` for any index updates). Wait for maintainer confirmation before authoring.

4. Once authored, the maintainer uploads the updated files to GitHub via web UI (non-developer maintenance per `EXPLORER_HANDOFF.md`).

5. Update `EXPLORER_PHASE_BC_HANDOFF.md` §1 and §3 to reflect sub-PR E1 shipping. E2 (resolves edges) becomes the next eligible action *once Phase C worker rebuild is verified* (so MCP queries return current data).

6. Update `PROJECT_NEXT_STEPS.md` §3 (remove sub-PR E1), §4 (E2 stays pending on Phase C closure).

7. Before closing, produce the next closing prompt. If Phase C is closed by the time E1 ships, the next prompt is sub-PR E2 (template §5.6). If not, the next prompt picks up whichever workstream is the maintainer's preference per §3.

The vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` *does* bind explorer UI prose (per its §6). Tooltips, labels, sidebar headings, help-overlay text all use physicist-facing vocabulary, not schema field names.
```

### 5.4 Track 4 §1.3 (chat entry point)

```
Draft the guided chat entry point from `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.3. This is the least-blocked Track 4 artifact and is mostly orthogonal to explorer surfacing.

What this is: a landing page or button on the explorer that says something like "Ask the map a question" and opens a chat preloaded with project-system-prompt instructions, the MCP server already attached, and a few example questions as starter prompts. A physicist can ask the map directly without having to set up an MCP-enabled chat themselves.

Run §0 state-verification first: confirm the explorer is live, confirm the MCP server is accessible, identify the current hosting decision the maintainer wants (in-explorer page, Anthropic project-link, separate landing site).

Then proceed:

1. Draft the system prompt the chat should use. Should include: the vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md`, the MCP server URL, the project's orientation, instructions for citing the live data when answering.

2. Draft 3-5 starter prompt examples that demonstrate the project's distinctive queries. Suggested: "Which experimental programs address the strong-CP problem?", "What predictions does leptogenesis force if confirmed?", "What's the current tension landscape across physics?". Each starter should exercise a different MCP tool surface.

3. Propose the hosting mechanism. Three candidates: (a) Anthropic project-link the explorer button opens; (b) a custom landing page on GitHub Pages that hosts the chat interface; (c) a static page that explains how to set up the chat manually. Maintainer chooses.

4. Wait for maintainer confirmation on hosting, then author the deliverable: either the project link, the landing page HTML, or the setup-instructions page. **Deliver as complete files via the present_files tool, not as patches.**

5. Update `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.3 to mark the artifact shipped. **Deliver the full updated file**, not a §-level patch.

6. Update `PROJECT_NEXT_STEPS.md` §3 (remove Track 4 §1.3), keep other Track 4 artifacts in §4 pending explorer surfacing. **Deliver the full updated file.**

7. Before closing, produce the next closing prompt for whichever workstream is the maintainer's preference per §3.

The vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` binds this artifact (per its §6). Physicist-facing prose throughout.
```

### 5.5 Worker rebuild (after Phase C closes) — DISCHARGED 2026-05-26 (verified via server_info)

```
The Phase C consolidated worker rebuild. Phase C is closed (Step 4.4 + Step 4.5 both shipped). The deployed MCP worker on Cloudflare needs to be rebuilt against the canonical data file.

Run §0 state-verification first: call `server_info` on the live MCP. Note the data_version. Fetch the canonical data file's `_meta.version`. If they differ, the worker is data-lagging and needs rebuild.

Then proceed:

1. Open the Cloudflare web editor for the worker at the deployment URL. The worker source is at `/mcp/worker.js` in the repo; the build process is in `/mcp/build_worker.py`. Non-developer maintenance per `PROJECT_INFRASTRUCTURE.md` §3.

2. Edit the worker's embedded data to point at the current canonical version. The schema is current (v19); no code changes needed unless sub-PR 57 or Step 4.5 surfaced new tool surface needs.

3. Deploy and verify: call `server_info` again, confirm `data_version` matches the canonical version, confirm `find_resolvers` and `find_discriminating_experiments` return non-empty results for the cells they should now cover.

4. Update `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §1 to record the worker rebuild verified. Phase C is fully closed.

5. Update `PROJECT_NEXT_STEPS.md` §3 and §4 to reflect Phase C closure. Sub-PRs E2-E5 become eligible (their trigger condition is satisfied). The cross-FC pattern layer's first sub-PR trigger conditions move closer (Phase C closure is one of the conditions per scope memo §10.1).

6. Before closing, produce the next closing prompt. Default: sub-PR E2 (template §5.6). Maintainer may choose otherwise.
```

### 5.6 Sub-PR E2 (resolves edges in explorer) — DISCHARGED 2026-05-27

The 38 Phase C resolves edges now render in the explorer:

- **"Resolves" section** on the 12 forward-looking experimental-program cards (hyper-k 4, dune 4, juno 4, rubin-lsst 4, fcc 4, gw-ground-network 3, lisa 3, desi 3, axion-haloscope-network 3, cmb-s4 3, edm-program 2, muon-g-2-continuation 1). Empty for the 7 historical programs and the resolves-renderer returns '' when no edges exist.
- **"Targeted by" section** on the cell / open-frontier / totality-approach cards (29 cell targets, 8 open-frontier targets, 1 totality-approach target).
- Each row carries: arrow + target/program deep-link pill + timeline pill + bounds-setting pill (when `exclusion_only: true`) + sensitivity line with "Reach:" prefix and bound-direction symbol (≳ / ≲ / = / ~ when uncertainty is null per Rule 34) + description prose + inline competing-predictions block when `predictions_per_program` is populated (13 of 38 edges).

**Files shipped:**

- NEW `explorer/explorer-resolves.js` — ~270 lines; exports `renderResolvesFromProgram(programId)` and `renderTargetedByTarget(targetId)` plus local helpers `formatQS` (minimal-inline; E4 absorbs), `renderCompetingPredictions`, `renderResolvesTargetPill`, `renderResolvesProgramPill`, `renderResolvesRow`.
- `explorer/explorer-data.js` — adds `resolves_by_program`, `resolves_by_target`, `resolves_by_id` indexes and `cell_id_to_fc_id` reverse-lookup (484 cells, no collisions). Populates `_meta.counts.resolves_edges`.
- `explorer/explorer-discourse.js` — call-sites in `renderProgramCard` (after Produces classifications), `renderFrontierCard` (after Programs targeting this frontier), `renderTotalityCard` (after Architectures interfering here). Each guarded by `typeof ... === 'function'` so the discourse module degrades gracefully if resolves hasn't loaded.
- `explorer/explorer-sidebar.js` — call-site in `renderSidebarCell` after Predictions for this cell; pill-wiring (`[data-fc-cell-jump]`, `[data-disc-jump]`) replicated locally since `renderSidebarCell` doesn't go through `wireDiscourseCardLinks`.
- `explorer/update-c-edges.css` — appended ~155 lines for `.dc-resolves-*`, `.dx-timeline-pill`, `.dx-bound-pill`.
- `explorer/Map_v34_explorer.html` — `<script src="explorer-resolves.js"></script>` after the existing discourse script tag.
- `methodology/EXPLORER_PHASE_BC_HANDOFF.md` — §0 baseline updated to reflect twelve-file build; §1 gap-table row for resolves edges flipped to Yes (with PPP count corrected from 5 → 13); §1 render list extended with resolves edges; §2.2 design questions marked closed; §3 sub-PR E2 description replaced with closure block; §3 cadence arrow advanced to E4; §6 file list adds `explorer-resolves.js`; closing line annotated.
- `methodology/PROJECT_NEXT_STEPS.md` — this file: §0 advanced to E4, §3 reordered, §2.2 state updated, §5.6 marked DISCHARGED, §5.7 (E4) template body drafted, §5.8 placeholder bumped.

**Decisions taken** (per the authoring chat's design proposal):
- (1) New eighth JS file `explorer-resolves.js`.
- (2) Minimal inline qs rendering now; E4 absorbs.
- (3) Inline competing-predictions list (option (a)).
- (4) "Bounds-setting" pill (dashed border, italic, muted) when `exclusion_only: true`; no pill otherwise.
- (5–7) Section placements as confirmed: cell card after Predictions, frontier card after Programs targeting, totality card after Architectures interfering.

**Verified** (vm-context smoke test): all 38 edges indexed by program and by target; 484 cells mapped; `renderResolvesFromProgram` and `renderTargetedByTarget` render against real v95 data with expected row counts (cell-pd-Kplus-nubar-SUSY = 3, muon-g-2 = 1, cc-frontier = 2, hierarchy-problem = 3); all 4 modified/new JS files syntax-clean.

**Known follow-up surfaced and queued:** description-prose schema-name leaks (17 of 38 resolves descriptions contain "exclusion_only", 28 contain "bound_direction", 13 contain "predictions_per_program") — data-side rewrite, queued for the post-E5 vocabulary audit per `PHYSICIST_FACING_VOCABULARY.md` §9. Recorded in `EXPLORER_PHASE_BC_HANDOFF.md` §3 E2 closure block.

### 5.7 Sub-PR E4 (reusable quantitative_scale callout component in explorer) — DISCHARGED 2026-05-27

The reusable quantitative_scale callout component is in. The minimal-inline `formatQS` that E2 shipped inside `explorer-resolves.js` has been absorbed into a new ninth JS module `explorer-qs.js` and is now consumed by every dense qs surface plus a new prominent block form for the carrier surface. 276 of 288 quantitative_scale entries render. The remaining 12 (implication-level) light up when E3 ships.

**Surfaces now rendering quantitative_scale:**

- **Cell-direct (215 entries)** — inside each cell card's Description section, immediately below the description prose. Inline form via `renderQS`; citations rendered in compact mode via `renderQSCitations`. The Description section now also renders when a cell carries qs but no description prose (the rare case).
- **Prediction-level (48 entries: 35 FC + 13 cell)** — chip below `pred-text` in every `.dc-pred` block, in both `renderSidebarCell` cell-preds and `renderSidebarFC` FC-preds. Inline form via `renderQS`.
- **Resolves sensitivity + competing-prediction values (the E2 surfaces)** — migrated from the local `formatQS` helper in `explorer-resolves.js` to `renderQS` from the new module. Visual treatment preserved; class names migrated from `dc-resolves-prefix`/`-bd`/`-units` to generic `qs-prefix`/`-bd`/`-units`.
- **Bears-on edges (0 entries at v95, renderer ready)** — `renderEdgeRow` now calls `renderQS` when an edge carries `quantitative_scale`. The bears-on surface gains a wired call-site even though no entries exist today.
- **Frontier / totality-approach carriers (13 entries)** — new "Characteristic scale" sidebar section on each carrier card, between the About description and the rest of the card's sections. Block form via `renderQSCallout` with Crimson Pro 17px headline, bordered card, citations expanded. The 7 open-frontier carriers (qg-frontier 10¹⁹ GeV, cc-frontier 10¹²⁰, hierarchy-problem 10¹⁷ GeV, etc.) and the 6 totality-approach carriers (bh-thermodynamics 1/4, cosmological-models 5σ Hubble tension, turbulence -1.667 Kolmogorov exponent, etc.) all light up.

**Files shipped:**

- NEW `explorer/explorer-qs.js` (~200 lines) — exports `renderQS(qs, opts)`, `renderQSCallout(qs, opts)`, `renderQSCitations(citations, opts)`. Internal helper `renderTexInline(tex)` (KaTeX with graceful fallback). Two upgrades over E2's formatQS: (a) `units === "dimensionless"` suppressed regardless of `kind` (fixes the SU5 α_GUT case where `kind=coupling` carried `units="dimensionless"`); (b) class names generic.
- NEW `explorer/update-e4.css` (~165 lines) — generic `.qs-prefix`/`.qs-bd`/`.qs-units` atoms, citation chrome `.qs-citations`/`.qs-citation` with compact-mode variant, carrier-callout block `.qs-callout`/`.qs-callout-value`, per-surface wrappers `.cell-qs-inline`/`.dc-pred-qs`/`.dx-edge-qs`.
- `explorer/explorer-resolves.js` — local `formatQS` and `BD_SYMBOL` constant removed; two call-sites now invoke `renderQS` directly. Net -50 lines.
- `explorer/explorer-sidebar.js` — three insertions: Description section now renders cell-direct qs inline (with compact citations); cell-pred loop emits `dc-pred-qs` chip; FC-pred loop emits the same. Net +2 lines (1428 → 1430).
- `explorer/explorer-discourse.js` — three insertions: `renderEdgeRow` renders `dx-edge-qs` line when edge carries qs; `renderFrontierCard` and `renderTotalityCard` insert `renderQSCallout` between desc and sections. Net +17 lines (1033 → 1060).
- `explorer/update-c-edges.css` — three rules retired (`.dc-resolves-prefix`, `.dc-resolves-bd`, `.dc-resolves-units`); the atoms live in `update-e4.css` under generic names. Net -12 lines (394 → 382).
- `explorer/Map_v34_explorer.html` — `<link rel="stylesheet" href="update-e4.css">` after `update-c-typography.css`; `<script src="explorer-qs.js"></script>` between `explorer-data.js` and `explorer-map.js`. Net +3 lines (1396 → 1399).
- `methodology/EXPLORER_PHASE_BC_HANDOFF.md` — §0 baseline updated to fourteen-file build; §1 gap-table flips four rows to "Yes (since sub-PR E4)" with corrected counts (215 not ~185, 48 not ~78, 13 not ~13, 0 not <5); §1 render list extended with the qs callout; §3 sub-PR E4 description replaced with closure block; §3 sequencing constraints updated (E4 cadence arrow struck, E3 next); §6 file lists extended with `explorer-qs.js` + `update-e4.css`; closing line annotated.
- `methodology/PROJECT_NEXT_STEPS.md` — this file: §0 advanced to E3, §2.2 state updated, §3 reordered (E3 to priority 1), §5.7 marked DISCHARGED with closure block, §5.8 (E3) template body drafted, cross-FC placeholder bumped to §5.9.

**Decisions taken** (per the authoring chat's design proposal):
- (1) New ninth JS file `explorer-qs.js`; resolves becomes a consumer.
- (2) API shape — `renderQS` inline + `renderQSCallout` block + `renderQSCitations` helper.
- (3) Chrome — inline form (a) on the four dense surfaces; block form (c) on carrier surface. Cell-direct placement inside the Description section, not as its own section.
- (4) Carrier section heading: "Characteristic scale".
- (5) Old `dc-resolves-prefix`/`-bd`/`-units` rules removed in this PR (clean migration).

**Verified** (vm-context smoke test): nine canonical field combinations rendered correctly (qg-frontier `Reach: 10^{19} GeV` via KaTeX with no bd symbol, cc-frontier `10^{120}` alone, cosmological-models `≲ 5σ`, su5 α_GUT `0.04` alone — the dimensionless-units upgrade case, cell-A-d2 `1 e²/h`, top-quark m_t `177^{+21}_{-22} GeV` via KaTeX with no bd per Rule 34, su5 proton-decay τ `≳ 2.4e+34 yr`, turbulence `-1.667`, bh-thermodynamics `0.25`); `renderQSCallout` produces full sidebar-section with heading + bordered card + citations; null/undefined/`{}` all return empty string; all 4 modified JS files + 1 new JS file pass `node --check`.

**Known follow-up surfaced and queued:** scientific-notation values like `2.4e+34` render as the raw JS `String(value)` output rather than via KaTeX `2.4 × 10^{34}`. Cosmetic; flagged as Track 5 housekeeping. Authors of future qs entries can opt into log10 encoding to get the clean rendering.

### 5.8 Sub-PR E3 (render if_real_implies trees on frontier / totality-approach cards) — DISCHARGED 2026-05-27

The Phase B if_real_implies content is in. The 14 carrier nodes now render their full resolution → implication trees as a new "If real, implies…" sidebar section between the carrier qs callout and the rest of the discourse-edge sections. 23 resolutions, 24 implications, and the remaining 12 implication-level quantitative_scale entries all surface. The explorer Phase B + Phase C content-surfacing gap closes here; the remaining E5 sub-PR is the signal/decoration layer on the surfaces already shipped.

**Files shipped:**

- NEW `explorer/explorer-implies.js` (~275 lines) — exports one public function `renderIfRealImpliesSection(node)` returning a complete `<div class="sidebar-section">` or empty string when the node has no `if_real_implies`. Internal helpers: `renderImpliesCitations`, `renderImplicationTarget` (kind-specific dispatcher: null target for `new_FC`; `renderFCPill(target)` for `new_axis`; from-pill → subtype-label → to-pill triplet for `forced_edge`; `renderResolvesTargetPill(target)` from `explorer-resolves.js` for `promotes_subtype`; defensive guard for `new_cell` and unknown kinds), `renderImplicationRow`, `renderResolutionGroup`. Physicist-facing kind labels via `IMPLIES_KIND_LABELS`: "Forces new formal classification" / "Forces new axis" / "Forces relation" / "Promotes cell" / "Forces new cell".
- NEW `explorer/update-e3.css` (~190 lines) — chrome for the if_real_implies surface. Top-level `.dc-implies-list`. Resolution group `.dc-implies-resolution` (dashed top-border between consecutive resolutions). Italic condition prose `.dc-implies-condition` (Crimson Pro 14.5px). Citation chrome `.dc-implies-citations` / `.dc-implies-citation` matching `.dc-resolves-citations` weight. Implication rows `.dc-implies-imp` (bordered card on `var(--paper-2)`). Kind-label pill `.dc-implies-kind` with five color variants mapped to the project palette: `new_FC` → `--struct` (blue), `new_axis` → `--struct` italic, `forced_edge` → `--hybrid` (gold), `promotes_subtype` → `--phen` (green), `new_cell` → `--accent` (red). Forced-edge target triplet `.dc-implies-edge-triplet` + `.dc-implies-edge-subtype` (`[...]` bracket pill). qs block `.dc-implies-qs` + `.dc-implies-qs-value` consuming `renderQS` from E4 with left-accent border on `--struct`. Responsive rule at 540px.
- `explorer/explorer-discourse.js` — two call-site additions: in `renderFrontierCard` and in `renderTotalityCard`, each inserting `carrierImplies` between `carrierQS` and the first edge-section. Both gated by `typeof renderIfRealImpliesSection === 'function'`. Net +20 lines (1060 → 1080).
- `explorer/Map_v34_explorer.html` — added `<link rel="stylesheet" href="update-e3.css">` after `update-e4.css` (with corresponding entry in the file-list comment); added `<script src="explorer-implies.js"></script>` between `explorer-resolves.js` and `explorer-glossary.js` (load order: data → qs → map → sidebar → phenomena → discourse → resolves → **implies** → glossary; implies depends on `renderQS`/`renderQSCitations` from qs and `renderResolvesTargetPill` from resolves, both load earlier). Net +4 lines (1399 → 1403).
- `methodology/EXPLORER_PHASE_BC_HANDOFF.md` — §0 baseline updated to sixteen-file build; §1 gap-table flips three rows for if_real_implies surfaces to "Yes (since sub-PR E3)" plus the implication-level qs row to "Yes (since sub-PR E3 — rendered via renderQS from E4)"; total qs render-count moves to 288/288; §1 render list extended with the if_real_implies tree; §3 sub-PR E3 description replaced with closure block; §3 sequencing constraints updated (E3 cadence arrow struck, E5 next); §6 file lists extended with `explorer-implies.js` + `update-e3.css`; closing line annotated.
- `methodology/PROJECT_NEXT_STEPS.md` — this file: §0 advanced to E5, §2.2 + §2.4 state updated, §3 reordered (E5 to priority 1, E3 removed), §5.8 marked DISCHARGED with closure block, §5.9 E5 template body drafted, cross-FC placeholder bumped to §5.10.

**Decisions taken** (per the authoring chat's design proposal):
- (1) New tenth JS file `explorer-implies.js` per the "one new logical surface = one new module" precedent.
- (2) No new data index — `node.if_real_implies` already on each carrier via the `{...n}` spread in `discourse_by_id`.
- (3) Row chrome — two-level tree (option b): resolutions as groups, implications as bordered rows. The resolution → implications hierarchy is load-bearing.
- (4) Default expansion — both levels expanded; citations rendered inline.
- (5) Section heading — `If real, implies… · N` (count-pill convention matching resolves / discourse-edge sections).
- (6) Per-resolution group header — italic verbatim "If &lt;condition prose&gt;" — load-bearing per the no-paraphrase rule. The `resolution`-slug field is omitted from UI (schema-internal identifier).
- (7) Kind labels — physicist-natural phrases, not the schema enum values. Color-coded pills.
- (8) Target rendering per kind — `new_FC` no target pill (target null in all 17 v95 cases); `new_axis` FC pill; `forced_edge` three-pill triplet `from → [subtype] → to`; `promotes_subtype` cell pill via reused `renderResolvesTargetPill`.
- (9) Forced-edge subtype string ("derives-from", "specializes") rendered verbatim with `[...]` bracket pill — physicist-readable project edge-type names the reader already sees in the cross-classification edge list.
- (10) Vocabulary discipline — no schema field names in UI text.

**Verified** (vm-context smoke test): 14 carriers / 23 resolutions / 24 implications / 12 with qs — all counts confirmed against canonical v95. 4 of 5 schema kinds appear in v95 (`new_FC` 17, `forced_edge` 3, `new_axis` 2, `promotes_subtype` 2); `new_cell` absent — defensive guard present. Each kind renders with correct kind-class and correct target rendering. Full leptogenesis render (matter-antimatter-asymmetry): 2-implication "If real, implies…" section with condition prose + Fukugita-Yanagida / Davidson-Nardi-Nir / Buchmüller citations + Davidson-Ibarra qs block on the Dirac-vs-Majorana implication. Full dark-matter render: 3 forced-edge implications with correct from-pill / subtype-bracket / to-pill triplets. Full topological-phases-classification render: 4 resolution groups (the carrier with the most), 2 new_axis implications targeting `freed-hopkins-cobordism` as an FC pill. Empty / null inputs return `''` cleanly. `node --check` passes on the new module and the modified `explorer-discourse.js`.

**Known follow-up surfaced and queued:** the resolves-edge description-rewrite follow-up surfaced by E2 (curator-internal vocabulary in `description` fields rendered verbatim per the load-bearing rule) also applies to a small number of implication descriptions — they contain physicist-natural English words ("the anthropic resolution of the CC", "this kind of structure", "target nuclei") that overlap with schema enum values. These are load-bearing prose, not schema-name leaks, and render verbatim by design. The dedicated content-rewrite sub-PR queued for post-E5 covers both surfaces.

### 5.9 Sub-PR E5 (tile / discourse-node decoration for Phase B+C coverage)

```
Pick up sub-PR E5 from `EXPLORER_PHASE_BC_HANDOFF.md` §3: tile / discourse-node decoration for Phase B+C coverage. This is the last sub-PR before the explorer Phase B + C surfacing pass closes — after E5 the surfacing pass is done and the remaining Track 4 use-side artifacts (essay §1.1, query recipes §1.2, example sessions §1.4) become eligible.

Run §0 state-verification first: call `server_info` on the MCP (expected: data_version v95, schema_version v19, 83 nodes, 230 edges, 19 experimental_programs, 14 if_real_implies_carriers, 288 quantitative_scale_total, 38 resolves_edges, 33 tools). Fetch `data/Map_v34_consolidated.json` `_meta.version` via raw CDN at https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json and confirm it matches. If the live system has drifted further (counts higher), the session catching the drift updates the handoff at the end of its work.

DELIVERY DISCIPLINE (critical — read before authoring anything):
The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. EVERY deliverable in this session — explorer code files (JS, CSS), methodology document updates (.md), anything that ends up in the repo — ships as a COMPLETE FILE via the present_files tool. Do NOT produce "replace §3 with this" patches, do NOT produce per-line diff blocks for the maintainer to splice in. The maintainer downloads the full file and drops it in place. This norm is documented in `PROJECT_NEXT_STEPS.md` §6 norm #1, `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §4, and `EXPLORER_PHASE_BC_HANDOFF.md` §4. Violating it slows the project significantly. If a session is at risk of timing out partway through, ship in two rounds — code files first, methodology updates + closing prompt second — but ship complete files in each round, not patches.

Then proceed:

1. Read the current explorer architecture and the existing decoration precedent in the tile layer, since E5 extends it:
   - `explorer/explorer-map.js` — the FC-tile renderer. Existing decoration: 2-3 letter symbol, category stripe (left-edge color band), in-tile cell viz (Update C cell grid), ⚠N falsified flag (top-right), bottom yield bar (proportional segments by prediction status). E5 adds Phase B+C content chips — likely small dots or indicator pips in a corner that signal "this tile has qs / has if_real_implies / has resolves coverage".
   - `explorer/explorer-discourse.js` — the discourse-node card renderer (`renderArchitectureCard`, `renderFrontierCard`, `renderTotalityCard`, `renderRegimeContentCard`, `renderProgramCard`). The card-head section (`renderDiscourseCardHead`) currently emits a pills row with `subtype` / `stratum` / `structural_reason_category` / `empirical_status`. E5 adds Phase B+C content chips to discourse-node tile/list representations — open-frontier and totality-approach cards get an "if real, implies" badge when the node carries `if_real_implies`; experimental-program cards get a "resolves N targets" badge; cells / FCs / frontiers get a "targeted by N programs" badge when on the receiving side of resolves edges. (The chips signal availability; the actual content lives in the sections E2/E3/E4 already shipped.)
   - The Browse menu and overlay chips (rows-by / spotlight) — possibly add a "by Phase B/C coverage" overlay if the maintainer wants a quick "where's the curated content densest?" view, though that's discretionary.
   - MCP tools `find_signal_implications`, `find_resolvers`, `rank_by_scale` for confirming what's coverage-eligible per node.

2. AUDIT BEFORE ASSUMING OPEN. Per `EXPLORER_PHASE_BC_HANDOFF.md` §4, sub-PR E5 work may already partly exist — check whether `explorer-map.js` or `explorer-discourse.js` already emits any Phase B/C content chips. If yes, the diff is smaller than expected; if no, full E5 work is needed.

3. Inspect coverage distribution to decide chip granularity:
   - Cell-direct qs: 215 entries spread across N cells in M FCs (count via `find_cells` qs filter). The FC-tile chip likely shows "qs" presence (binary) since per-cell-count would clutter; the per-cell signal lives in the existing cell viz grid.
   - Prediction-level qs: 48 entries on 35 FC predictions + 13 cell predictions. FC tiles with prediction-level qs may already be visible via the existing yield bar.
   - Carrier-level qs: 13 entries (7 frontier + 6 totality-approach) — discourse-card chip showing "characteristic scale" presence.
   - Resolves coverage: 38 edges, 12 programs source-side, 38 distinct targets (29 cells + 8 frontiers + 1 totality). Program cards show "Resolves N" badge; cell / frontier / totality cards show "Targeted by N" badge.
   - if_real_implies coverage: 14 carriers (9 open-frontier + 5 totality-approach). Carrier discourse cards show "if real, implies N" badge.

4. Module layout — propose either (a) extending `explorer-map.js` and `explorer-discourse.js` directly with the chip rendering, or (b) creating a small new helper module `explorer/explorer-chips.js` (eleventh JS file) that exports `renderTileChips(fc)` and `renderDiscourseChips(node)`. Default recommendation: option (a). The chips are tile/card chrome, not a logical surface like resolves or implies; they belong in the renderers that already own the tile/card. Net effect: ~20-40 lines added across the two modules, no new file.

5. Decide chip visual treatment:
   - Position: top-right corner of FC tile (alongside or below the ⚠N falsified flag); on a small pill row beneath the discourse card head pills.
   - Form: single character or 2-3 char abbreviation (qs / IR / R / T) — but per `PHYSICIST_FACING_VOCABULARY.md` §6 UI text uses physicist-natural vocabulary. Recommend small textual badges: "scale" / "if real" / "resolves" / "targeted" rather than schema abbreviations.
   - Counts on the chip when meaningful (e.g., "resolves 4" on hyper-k's program card; "targeted 3" on cell-pd-Kplus-nubar-SUSY).
   - Color: muted (var(--ink-mute) or var(--ink-faint)) so they read as availability signals rather than primary content.

6. Apply the vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md`:
   - No "if_real_implies", "quantitative_scale", "resolves", "predictions_per_program" in chip text. Use "if real", "scale", "resolves", "targeted by".
   - Chip tooltips can be slightly more explanatory ("This frontier carries documented conditional structural consequences") but still no schema field names.

7. Decide whether on-hover or on-click expansion is needed — likely no. The chip is a signal; clicking the tile/card opens the sidebar where the actual content lives. No interaction on the chip itself.

8. Propose the diff (which files change, what the markup looks like, where the chips sit relative to existing chrome). Wait for maintainer confirmation before authoring.

9. Once authored, present ALL updated files via the present_files tool — complete files only, no patches. Files to be presented include: the modified `explorer-map.js`, the modified `explorer-discourse.js`, CSS additions (likely appended to an existing update-*.css file or a new `update-e5.css`), the updated `EXPLORER_PHASE_BC_HANDOFF.md`, and the updated `PROJECT_NEXT_STEPS.md`.

10. Update `EXPLORER_PHASE_BC_HANDOFF.md` §0 baseline updated; §1 add a final paragraph noting the surfacing pass closes here (or extend §1's lead paragraph); §3 sub-PR E5 description gets a full closure block analogous to E2, E3, and E4's; §3 sequencing constraints updated (E5 cadence arrow struck; surfacing pass closes); §6 file list extended if a new CSS file was added; §7 transitions the handoff to closed status; closing line annotated. Deliver as a complete file.

11. Update `PROJECT_NEXT_STEPS.md` §0 (Track 4 §1.1 + §1.2 + §1.4 — essay / query recipes / example sessions — become highest-priority eligible since explorer surfacing closes; Track 4 §1.3 chat entry point remains eligible; maintainer chooses priority among the Track 4 artifacts), §2.2 marked closed, §2.4 state updated, §3 reordered (E5 removed; Track 4 artifacts promoted), §4 (Track 4 essay/recipes/sessions move from pending to eligible), §5.9 marked DISCHARGED with closure block (mirror §5.8 shape), §5.X (next slots) Track 4 essay + query recipes + example sessions templates drafted. Deliver as a complete file.

12. Before closing, produce the closing prompt for whichever Track 4 artifact the maintainer's preference indicates — default suggestion is the essay (§5.10) since it's the most load-bearing for outreach — in a clearly-marked code block in the chat, mirroring the shape of the E3 / E5 closing prompts (state verification, delivery discipline reminder at top, step-by-step instructions, two-round split fallback noted).

The vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` *does* bind explorer UI prose (per its §6). Every chip label, tooltip, and inline text uses physicist-natural vocabulary, not schema field names.
```

### 5.10 First cross-FC sub-PR (anomaly-content virtual-FC, when triggers fire)

[Template to be drafted by the session that verifies the §10.1 triggers fire. The template body is appended to this document when the trigger conditions are met. Bumped from §5.9 to §5.10 on 2026-05-27 when the E5 template was drafted at §5.9 per the E3 closure session.]

---

## 6. Maintenance

The discipline that keeps this document load-bearing:

1. **Deliverables ship as complete files, not patches.** The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. Every methodology document update, every explorer code change, every data PR ships as one or more *complete files* presented via the `present_files` tool. The maintainer downloads each and replaces the corresponding file in the repo. "Replace §3 with this" patches, per-line diff blocks, and "splice this in here" instructions are forbidden; they require manual splicing that slows the project significantly and introduces splice errors. This norm applies to every workstream and every template in §5.

2. **Every session updates this document at close.** Sections §3 (currently eligible) and §4 (pending) are the ones that change session-to-session. The session moves completed actions out of §3, promotes newly-eligible actions from §4 to §3, adds new pending actions to §4 if the deliverable surfaced any.

3. **Section §5 (prompt templates) grows as new actions become eligible.** When a session ships a sub-PR that promotes a pending action to eligible, that session also drafts the §5 template for the new action if it doesn't exist. Templates §5.9 (and later) are placeholders that get filled in when their actions become eligible. Discharged templates (§5.1, §5.2, §5.3, §5.5, §5.6, §5.7 as of 2026-05-27) are retained with a DISCHARGED header so future sessions can read them as historical reference for analogous operations.

4. **The closing prompt is non-optional.** Every session terminates with a clearly-marked closing prompt in a code block, derived from the relevant §5 template, instantiated with current state. A session that hasn't produced a closing prompt isn't done.

5. **State-verification at session start is non-optional.** The first action of every session is reading this document and running the workstream handoff's state-verification ritual. Drift between this document and the live system is caught here and corrected (either the document updates or the maintainer is alerted to the inconsistency).

6. **This document never holds substrate state directly.** All substrate state lives in the canonical data file (`_meta.changelog`), the live MCP, and the live explorer. This document holds *operational* state: which actions are eligible, what their triggers are, what their prompts look like. The substrate state is queried fresh; the operational state is read from here.

7. **The maintainer is the only one who reads §0 routinely.** §0 holds the single answer to "what's next." A maintainer who wants to know what to do reads §0; the session that opens with the pasted prompt doesn't need §0 because the prompt already specifies the action.

---

*End of PROJECT_NEXT_STEPS.md. Initial draft 2026-05-26; amended 2026-05-27 with E1 closure, E2 promotion, and file-delivery norm (§6 #1); amended again 2026-05-27 with E2 closure, E4 promotion, and the E4 template at §5.7; amended again 2026-05-27 with E4 closure (the reusable quantitative_scale callout component now lives in `explorer-qs.js` + `update-e4.css`; 276 of 288 qs entries render across cell-direct, prediction-level, resolves sensitivity, competing-prediction values, bears-on (renderer ready), and carrier-card "Characteristic scale" surfaces), E3 promotion to highest priority, the §5.7 DISCHARGED closure block, the §5.8 E3 template body draft, and the cross-FC placeholder bumping to §5.9; amended again 2026-05-27 with E3 closure (the if_real_implies trees on all 14 carrier nodes now render via `explorer-implies.js` + `update-e3.css` + two call-site additions in `explorer-discourse.js`; 23 resolutions, 24 implications, and the remaining 12 implication-level qs entries all surface — the explorer Phase B + Phase C content-surfacing gap is now closed), E5 promotion to highest priority, the §5.8 DISCHARGED closure block, the §5.9 E5 template body draft, and the cross-FC placeholder bumping to §5.10. Companion to the workstream handoffs (Predictive Layer Phase C, Explorer Phase B+C, Track 4 artifacts, Cross-FC pattern layer scope memo). The document is updated by every session at close per §6. The chain that keeps the project moving without requiring maintainer memory is: this document tells each session what's eligible, each session generates the closing prompt for the next session from the relevant §5 template, the maintainer pastes the closing prompt into a fresh chat. Deliverables arrive as complete files via present_files. The chain holds as long as the discipline in §6 holds.*
