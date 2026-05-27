# Project next steps — operational queue

**Date:** 2026-05-26 (initial draft); amended 2026-05-27 (E1 closure + file-delivery norm); amended 2026-05-27 (E2 closure, E4 promotion); amended 2026-05-27 (E4 closure, E3 promotion, §5.8 E3 template body drafted); amended 2026-05-27 (E3 closure, E5 promotion, §5.9 E5 template body drafted); amended 2026-05-27 (E5 closure, explorer surfacing pass CLOSED, Track 4 §1.1 essay and §1.2 query recipes both SHIPPED at `/methodology/USE_THE_MAP_ESSAY.md` and `/methodology/QUERY_RECIPES.md`, §5.9 marked DISCHARGED, §5.10 essay DISCHARGED block added, §5.11 recipes DISCHARGED block added, §5.12 example-sessions template body drafted, cross-FC placeholder bumped to §5.13).
**Status:** Active. This document is the project-level operational queue. Every session reads it at start; every session updates it at close.
**Purpose:** Hold the operational state of all open workstreams so any fresh session can determine what action is currently eligible without consulting prior conversation history. Provide prompt templates so each session can generate the closing prompt that opens the next session.
**Position:** Lives in `/methodology/`. Attached to every fresh chat via project files. Companion to `META_v21_1_methodology_firewall.md`, the workstream-specific handoffs (`PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`, `EXPLORER_PHASE_BC_HANDOFF.md`, `TRACK_4_USE_SIDE_ARTIFACTS.md`, `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`), and the project goal documents.

---

## 0. Highest-priority eligible action right now

**Track 4 §1.3 (guided chat entry point) — workstream 2.4.** *Default maintainer suggestion; Track 4 §1.4 example sessions is the equally-eligible alternative.*

Prompt template at §5.4. Sub-PR E5 closed 2026-05-27 (the signal layer — small chips on FC tiles signalling "scale N" / "targeted N" presence, plus discourse-card head pills signalling "if real, implies N" / "characteristic scale" / "targeted by N" / "resolves N targets" — landed in the explorer; the surfacing pass CLOSED). With explorer surfacing closed, the two remaining Track 4 use-side artifacts that depended on real explorer surfaces became unblocked the same day: the essay (§1.1) shipped at `/methodology/USE_THE_MAP_ESSAY.md` (89 lines, five worked examples, vocabulary-discipline-bound, deep-linked to the seventeen-file E5 build); the query recipes (§1.2) shipped at `/methodology/QUERY_RECIPES.md` (93 lines, six paragraph-length cross-cutting query patterns, each with a worked v95-verified example). The two pending Track 4 artifacts are the guided chat entry point (§1.3, lets a physicist ask the dataset in natural language without setting up an MCP-enabled chat) and the curated example sessions (§1.4, transcripts of physicist-style chats edited for publication). Either can land next; the chat entry point is the maintainer's default suggestion because it's the more orthogonal of the two and once shipped becomes the natural recording surface for the example sessions in §1.4.

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

### 2.2 Explorer Phase B+C surfacing — CLOSED

*Handoff:* `EXPLORER_PHASE_BC_HANDOFF.md` (marked closed at sub-PR E5; preserved for reference).

*State:* All five required sub-PRs (E1–E5) shipped 2026-05-27. E1 closed as a verification-only zero-diff sub-PR. E2 closed with the 38 Phase C resolves edges rendering across the program / cell / frontier / totality-approach cards via a new `explorer-resolves.js` module. E4 closed with the reusable quantitative_scale callout component living in a new `explorer-qs.js` module + `update-e4.css` stylesheet (276 of 288 qs entries rendering across four dense surfaces plus the carrier-card prominent block). E3 closed with the if_real_implies trees on all 14 carrier nodes rendering via a new `explorer-implies.js` module + `update-e3.css` stylesheet (23 resolutions, 24 implications, 12 implication-level qs entries all surfacing). E5 closed with the signal layer — FC-tile chips ("scale N" / "targeted N") and discourse-card head pills ("if real, implies N" / "characteristic scale" / "targeted by N" / "resolves N targets") — landing via additions to `explorer-map.js` + `explorer-discourse.js` plus a new `update-e5.css` stylesheet. The live explorer at the seventeen-file build (1 HTML + 7 CSS + 9 JS) renders the full Phase A + Phase B + Phase C surface. The remaining E6 (rank_by_scale overview panel), E7 (find_discriminating_experiments view), and E8 (banner refresh) are discretionary follow-ups.

*Eligible action:* None required. E6, E7, E8 are discretionary follow-ups.

*Closure condition:* Met 2026-05-27.

### 2.3 Cross-FC pattern layer (the reading layer)

*Scope memo:* `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`.

*State:* Scope memo committed. Six provisional modes identified. First authoring sub-PR is *not* currently eligible — Phase C closure is one of the trigger conditions (now met), but schema v20 authoring, four-FCs-stable check, and validator clean status still gate. See scope memo §10.1 for the trigger conditions.

*Eligible action:* None currently. Watch for triggers.

*Closure condition:* The layer doesn't have a closure in the same sense as Phase C or the explorer pass. It runs continuously as the substrate matures, with each mode's sub-PRs accumulating over time. The "first sub-PR shipped" milestone is the next state transition; subsequent milestones are mode-specific.

### 2.4 Track 4 use-side artifacts

*Reference:* `TRACK_4_USE_SIDE_ARTIFACTS.md`.

*State:* Four artifacts named. Two shipped 2026-05-27: §1.1 essay at `/methodology/USE_THE_MAP_ESSAY.md` (89 lines, five worked examples covering the three-channel mass-ordering landscape, the two-channel strong-CP-problem resolver, the dual-frontier EDM program, the sterile-neutrino cross-classification anchor, and the leptogenesis conditional-consequences chain — drafted against canonical v95 with explicit deep links to the seventeen-file E5 explorer build), and §1.2 query recipes at `/methodology/QUERY_RECIPES.md` (93 lines, six paragraph-length cross-cutting query patterns each with a worked v95-verified example, covering the experimental-coverage lookup, cross-classification anchor lookup, conditional-consequences lookup, discriminating-experiments lookup, scale-ranking lookup, and falsified-predictions catalog). Two remain pending: §1.3 guided chat entry point (collapses the MCP-setup step to zero clicks for physicists who'd rather ask in natural language than invoke catalogue queries) and §1.4 curated example sessions (transcripts of physicist-style chats, edited for publication alongside the explorer).

*Eligible action:* Track 4 §1.3 (chat entry point, default) or Track 4 §1.4 (example sessions, equally eligible). The chat entry point is the more orthogonal of the two and once shipped becomes the natural recording surface for the example sessions; the maintainer chooses sequencing.

*Closure condition:* All four artifacts shipped, with the explorer surfacing closed so the artifacts can point at real explorer surfaces.

---

## 3. Currently eligible actions (priority-ordered)

1. **Track 4 §1.3 (guided chat entry point)** — workstream 2.4. Highest priority by maintainer default: with explorer surfacing closed and the essay + recipes shipped, the chat entry point is the natural next artifact — it lets physicists ask the dataset in natural language without setting up an MCP-enabled chat themselves, and once shipped becomes the recording surface for the example sessions in §1.4. Lower physics-content demand than substrate authoring; suitable for sessions where the maintainer wants to advance the project without explorer authoring. Template at §5.4.

2. **Track 4 §1.4 (curated example sessions)** — workstream 2.4. Equally eligible alternative to §1.3 if the maintainer prefers to ship transcripts before the entry point. Edits 4–6 worked test sessions into publishable form, demonstrating the dataset's moves and the vocabulary discipline in practice. Template at §5.12.

The default next session executes (1) unless the maintainer chooses otherwise.

---

## 4. Pending eligibility (blocked on triggers)

The following actions are *not* currently eligible. Each is listed with the trigger condition that would unblock it.

**Sub-PRs E6 (rank_by_scale overview panel) and E7 (find_discriminating_experiments view).** Discretionary net-new views beyond explorer Phase B+C surfacing closure. Sub-PRs E1-E5 shipped 2026-05-27, so the trigger has technically met — these are now eligible-on-request if the maintainer chooses to extend the explorer further. Not promoted to §3 because the maintainer's stated priority is Track 4 use-side artifacts first.

**Sub-PR E8 (explorer banner + About panel refresh).** Lightweight one-file touch; trigger has met (same as E6/E7); can ship alongside any later sub-PR as a stowaway or as a standalone closing step. Not promoted to §3 because lower priority than Track 4 §1.3 / §1.4.

**Cross-FC pattern layer first authoring sub-PR (Mode D, anomaly-content virtual-FC).** Phase C closure trigger met; explorer surfacing closure trigger met. Remaining trigger conditions per `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.1 — schema v20 authored, four involved FCs stable, validator clean — still gate eligibility.

**Cross-FC layer first Mode E sub-PR.** Blocked on `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.2 triggers. Substantially downstream.

**Cross-FC layer first Mode F sub-PR.** Blocked on `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.3 triggers. Years out.

**Track 1 / 1' explorer surfacing of v16+ fields, Track 5 housekeeping.** Per `TRACKS_AFTER_PHASE_A.md`, Phase C closure gate and explorer surfacing closure gate both now met; deprioritised below the Track 4 use-side artifacts.

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

### 5.9 Sub-PR E5 (tile / discourse-node decoration for Phase B+C coverage) — DISCHARGED 2026-05-27

The signal layer is in. FC tiles and discourse-node card heads carry small physicist-natural chips signalling which Phase B / Phase C content the node carries — "scale N" / "targeted N" on FC tiles, "if real, implies N" / "characteristic scale" / "targeted by N" / "resolves N targets" on discourse-node card heads and Browse-list rows. The chips are availability signals, not primary content; the substantive content lives in the surfaces E2 / E3 / E4 already shipped. **The explorer Phase B + C surfacing pass CLOSES here.**

**Files shipped:**

- `explorer/explorer-map.js` — FC-tile chip rendering: "scale N" chip for tiles whose FC has cells with `quantitative_scale` (count = qs-bearing cell count); "targeted N" chip for tiles whose FC has cells on the receiving side of resolves edges (count = distinct programs). Positioned in the tile header alongside the existing ⚠N falsified flag.
- `explorer/explorer-discourse.js` — discourse-node card-head and Browse-list-row chips: "if real, implies N" pill on open-frontier and totality-approach cards carrying `if_real_implies` (count = resolutions); "characteristic scale" pill on carrier cards with `quantitative_scale`; "targeted by N" pill on cell / frontier / totality cards on the receiving side of resolves edges; "resolves N targets" pill on experimental-program cards source-side of resolves edges. Mirrored on Browse-list rows for at-a-glance discovery from the Browse menu.
- NEW `explorer/update-e5.css` — chip chrome: small-textual-badge form (~10-11 px, muted color, light background, capsule shape), positioned per Phase A precedent for tile chrome / per discourse card-head precedent for pills. Tooltips supply slightly-more-explanatory text without schema field names.
- `explorer/Map_v34_explorer.html` — added `<link rel="stylesheet" href="update-e5.css">` to the existing stylesheet block. Total build: 1 HTML + 7 CSS + 9 JS = seventeen files.
- `methodology/EXPLORER_PHASE_BC_HANDOFF.md` — §0 baseline updated to seventeen-file E5 build; §1 lead paragraph extended with the signal-layer landing, render list extended with the chip layer; §3 sub-PR E5 description replaced with closure block; §7 transitions the handoff to closed status; closing line annotated.
- `methodology/PROJECT_NEXT_STEPS.md` — §0 advanced to Track 4 §1.3 (chat entry point) as default, §2.2 marked CLOSED, §2.4 state updated to reflect essay+recipes shipped, §3 reordered (Track 4 §1.3 and §1.4 promoted; E5 removed), §4 (Track 4 essay/recipes moved out as shipped; example sessions promoted to §3), §5.9 marked DISCHARGED with this closure block, §5.10 (essay DISCHARGED block) and §5.11 (recipes DISCHARGED block) added, §5.12 example-sessions template body drafted, cross-FC placeholder bumped to §5.13.

**Decisions taken** (per the authoring chat's design proposal):
- (1) Module layout — option (a) extend `explorer-map.js` and `explorer-discourse.js` directly with chip rendering; no new helper module needed.
- (2) Chip form — small textual badges with physicist-natural labels ("scale", "if real", "resolves", "targeted by") rather than schema abbreviations.
- (3) Counts on chips where meaningful ("resolves 4" on hyper-k, "targeted 3" on cell-pd-Kplus-nubar-SUSY); binary presence-only where count would clutter ("scale" on FC tiles, since per-cell count lives in the cell viz grid).
- (4) Tooltips slightly more explanatory but no schema field names.
- (5) No interaction on the chip itself — clicking the tile / card opens the sidebar where the content lives.

**Verified:** counts match canonical v95 (FC-level qs presence: N FCs; resolves-side cells: 29 distinct cells across 11 FCs; carrier-side if_real_implies: 14 carriers; resolves-side frontiers/totalities: 9 nodes; programs source-side of resolves: 11 programs); chips render in correct positions; tooltips read in physicist-natural register; vocabulary §6 self-check passes on every chip label and tooltip.

**Known follow-up surfaced and queued:** the description-rewrite content sub-PR queued during E2 / E3 closure (schema-name leaks in resolves descriptions, partial overlap in implication descriptions) is now the natural next housekeeping pass — recommended at any time, blocking nothing. Tracked in `EXPLORER_PHASE_BC_HANDOFF.md` §3.

### 5.10 Track 4 §1.1 (essay with worked examples) — DISCHARGED 2026-05-27

The essay landed at `/methodology/USE_THE_MAP_ESSAY.md`. Five worked examples in physicist prose, each demonstrating a distinct cross-cutting move the dataset records and a vanilla literature search would not surface in one frame. The essay doubles as the answer to "what is this project and why should I care," with explicit deep links into the seventeen-file E5 explorer build so a reader can walk the worked examples to source material directly.

**Files shipped:**

- NEW `methodology/USE_THE_MAP_ESSAY.md` (~89 lines, 16.6 KB). Opening framing paragraph; five worked examples each with citations, quantitative anchors verified against canonical v95, and a deep-link callout pointing at the explorer surface where the example lives; a "what makes the dataset trustworthy" paragraph naming the firewall discipline; a closing paragraph pointing at the other three Track 4 artifacts. Worked examples: (§1) three-channel mass-ordering resolver landscape with the informative-empty discriminating-experiments result; (§2) two-channel strong-CP resolver (axion-haloscope + EDM); (§3) dual-frontier EDM program; (§4) sterile-neutrino cross-classification anchor at eV scale with keV-scale parallel noted; (§5) leptogenesis → Davidson–Ibarra conditional-consequences chain with M₁ ≳ 10⁹ GeV.
- `methodology/TRACK_4_USE_SIDE_ARTIFACTS.md` — §1.1 marked SHIPPED with location + drafting summary; §2 seed examples grown with examples E (dual-frontier EDM), F (eV-sterile cross-class anchor), G (keV-sterile cross-observable anchor); §3 sequencing rewritten now that the explorer-surfacing dependency has discharged. (Both §1.1 and the related methodology updates were authored by the prior session but the methodology updates did not actually land in the repo — folded forward into this session.)

**Decisions taken** (per the prior session's design proposal):
- (1) Five worked examples, in the order above — each demonstrates a different cross-cutting move; the order builds from the simplest physicist question (which programs?) to the deepest (what gets forced?).
- (2) Deep-link callouts use `#/discourse/<node-id>`, `#/edge/<edge-id>`, and `#/fc/<fc-id>/<cell-id>` patterns from the seventeen-file E5 build.
- (3) Vocabulary discipline — Crewther–DiVecchia–Veneziano–Witten / Davidson–Ibarra / Davidson–Nardi–Nir / Boyarsky / Bulbul / Aguillard spelled out; schema field names absent from physicist-facing prose; sensitivity values quoted with their literature anchors.
- (4) Closing paragraph names the firewall as the discipline making the dataset trustworthy without diving into methodology depth — orientation for an interested reader, not exposition.

**Verified:** every quantitative anchor and citation cross-checked against canonical v95 via the live MCP server before drafting; deep-link target ids verified against the running explorer at draft time.

### 5.11 Track 4 §1.2 (query recipes) — DISCHARGED 2026-05-27

The query recipes landed at `/methodology/QUERY_RECIPES.md`. Six paragraph-length cross-cutting query patterns answering the essay's natural follow-up — "if I want to try a question of my own, what query patterns are reasonable to attempt?" Each recipe has the shape (a) the physicist's natural question, (b) the move the dataset offers, (c) one worked example with citations and quantitative anchors verified against canonical v95, (d) the deep link into the explorer where the answer lives, (e) a single closing-sentence coda naming the underlying lookup tool.

**Files shipped:**

- NEW `methodology/QUERY_RECIPES.md` (~93 lines, 22.1 KB). Opening framing paragraph linking back to the essay; six recipes; closing "what next" paragraph pointing at the chat entry point and the broader catalogue surface. Six recipes covering qualitatively different moves: (1) experimental-coverage lookup with DESI + Rubin-LSST on the cosmological-constant frontier; (2) cross-classification anchor lookup with the 7.1 keV sterile neutrino / 3.55 keV X-ray line pairing; (3) conditional-consequences lookup with dark-matter's three competing resolutions (QCD axion / PBH / MOND) each forcing distinct structural commitments; (4) discriminating-experiments lookup with muon g-2 and the Theory Initiative 2020 dispersive vs BMW 2021 lattice predictions; (5) scale-ranking lookup with energy-scale entries on open frontiers spanning six orders of magnitude (TeV naturalness ceiling → Planck scale); (6) falsified-predictions catalog with the structural observation that every falsified entry is a beyond-Standard-Model or near-BSM overreach.
- `methodology/TRACK_4_USE_SIDE_ARTIFACTS.md` — §1.2 marked SHIPPED with location + drafting summary; §2 seed examples grown with examples H (cc-frontier two-resolver landscape), I (dark-matter three-resolution conditional landscape), J (energy-scale rank across open frontiers), K (falsified predictions as BSM-overreach landscape); §3 sequencing updated to reflect both artifacts shipped; §4 maintainer-decision list trimmed to the two pending artifacts.
- `methodology/PROJECT_NEXT_STEPS.md` — this file: §0 confirmed at Track 4 §1.3 (chat entry point) as default with §1.4 as alternative; §2.4 state updated to reflect essay + recipes both shipped; §3 (Track 4 §1.3 and §1.4 remain top-of-queue); §5.10 essay DISCHARGED block authored (folding forward the prior session's pending update); §5.11 marked DISCHARGED with this closure block; §5.12 example-sessions template body drafted; cross-FC placeholder bumped to §5.13.

**Decisions taken** (per the authoring chat's design proposal, maintainer-approved):
- (1) Six recipes (this set), not different count / different selection. The set covers six qualitatively different cross-cutting moves; covers Phase A cross-class structure (1), Phase B conditional structure (1), Phase C predictive layer (3), and Phase A historical structure (1). Set is balanced.
- (2) Placement — standalone `/methodology/QUERY_RECIPES.md` alongside the essay (default per `TRACK_4_USE_SIDE_ARTIFACTS.md` §4); extraction into the explorer About panel queued as a successor sub-PR (the natural follow-up to E8).
- (3) "To invoke this yourself" coda — one sentence per recipe, naming the tool, kept tight; full setup instructions are the chat entry point's job (§1.3).
- (4) Recipe examples introduce new physics instances (cc-frontier resolvers, keV-sterile, dark-matter three-resolution, muon g-2 with PPP populated, energy-scale rank, falsified catalog) rather than restating the essay's five canonical worked examples — recipes show breadth while the essay shows depth.

**Verified:** every quantitative anchor and citation cross-checked against canonical v95 via the live MCP server (`server_info` returning v95/v19/33-tools/288-qs/38-resolves baseline; per-recipe verification via `find_resolvers(cc-frontier)`, `find_cross_classification(dark-matter-candidates → neutrino-sector-phenomenology)`, `find_signal_implications(dark-matter)`, `find_resolvers(muon-g-2)`, `rank_by_scale(kind=energy_scale, node_type=open-frontier)`, `find_predictions(status=falsified)`); vocabulary discipline §8 self-check passes on every recipe paragraph (schema tool names appear only in the dedicated coda sentence, never in framing prose); deep-link target ids verified against the seventeen-file E5 build.

**Known follow-up surfaced:** the recipes file is a candidate for partial extraction into the explorer's About panel as a successor sub-PR to E8. Not blocking anything; queued for after the chat entry point lands.

### 5.12 Track 4 §1.4 (curated example sessions)

```
Draft the curated-example-sessions artifact from `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.4. Eligible alongside §1.3 chat entry point now that explorer surfacing has closed (sub-PR E5 shipped 2026-05-27) and the essay (§1.1) and query recipes (§1.2) have shipped.

What this is: a handful of transcripts of physicist-style chats, edited into shape and published alongside the explorer. Each session demonstrates the moves the recipes describe and the vocabulary discipline working in practice, calibrates expectations about what the tool does and doesn't do, and provides a different reading modality from the essay (which tells) and the recipes (which diagram patterns). The empty `find_discriminating_experiments` result from the recent test session is the canonical first transcript candidate — shows the curatorial discipline at work in an informative-empty case.

Run §0 state-verification first: call `server_info` on the MCP (expected baseline: data_version v95, schema_version v19, 83 nodes, 230 edges, 19 experimental_programs, 14 if_real_implies_carriers, 288 quantitative_scale_total, 38 resolves_edges, 33 tools). Confirm the seventeen-file E5 explorer build is still live. Confirm `/methodology/USE_THE_MAP_ESSAY.md` and `/methodology/QUERY_RECIPES.md` exist and are current. If the live system has drifted further, update the relevant methodology docs at session close.

DELIVERY DISCIPLINE (critical — read before authoring anything):
The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. EVERY deliverable in this session ships as a COMPLETE FILE via the present_files tool. No "replace §3 with this" patches, no per-line diff blocks. The maintainer downloads the full file and drops it in place. Norm documented in PROJECT_NEXT_STEPS.md §6 norm #1, EXPLORER_PHASE_BC_HANDOFF.md §4, etc. If at risk of timing out, ship in two rounds — transcripts first, methodology updates + closing prompt second — but complete files in each round.

Then proceed:

1. Source the raw sessions. Two candidates from accumulated test sessions: (a) the discriminating-experiments empty-result session that prompted PHYSICIST_FACING_VOCABULARY.md (the canonical informative-empty case showing the curatorial §4 admissibility test at work); (b) any subsequent maintainer test sessions surfacing the moves the recipes describe. The maintainer supplies the raw transcripts; the implementing chat does not synthesize sessions. If only one transcript is available, ship that one first and queue the others.

2. Decide the editorial register. Three candidates per TRACK_4_USE_SIDE_ARTIFACTS.md §4:
   - Raw transcript with minimal cleanup (cheapest, least polished — keep this option for at least one session to anchor the others).
   - Edited transcript (medium effort — clean up false starts, tighten the AI side's vocabulary discipline in place, preserve the physics).
   - Edited transcript with maintainer commentary annotations (highest effort, highest demonstration value — sidebar callouts explaining what the move is, what the dataset is doing, why the discipline holds).
   Recommend shipping one session at each level for the first batch (3 transcripts) to test reader response.

3. For each session, apply the vocabulary discipline from PHYSICIST_FACING_VOCABULARY.md. The AI side of the transcript is concentrated physicist-facing surface — every paragraph passes the §8 self-check. Schema field names appear only when the AI is showing the reader how to invoke a tool, after the physics has been stated in physicist prose. If the original AI side leaked schema names (the original test session that prompted the vocabulary doc certainly did), the editing pass fixes them in place. Preserve the physics; rewrite the packaging.

4. Decide placement. Three candidates per TRACK_4_USE_SIDE_ARTIFACTS.md §4:
   - Standalone /methodology/EXAMPLE_SESSIONS.md or /methodology/SESSIONS/<slug>.md per session (project-knowledge available, accessible from explorer's About panel).
   - In-explorer "Worked sessions" panel as a successor to E8.
   - Distill / blog-style separate landing site.
   Default recommendation: standalone files in /methodology/SESSIONS/ per session (so each can be linked individually); extraction into the explorer About panel queued as a follow-up sub-PR.

5. Propose the editorial set + placement decision. Wait for maintainer confirmation before authoring final transcripts.

6. Once authored, present ALL updated files via the present_files tool — complete files only. Files to be presented include: the transcripts themselves, the updated `TRACK_4_USE_SIDE_ARTIFACTS.md`, the updated `PROJECT_NEXT_STEPS.md`.

7. Update `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.4 to mark the artifact shipped (with locations of each transcript); §2 seed examples may grow if new ones surfaced during editing. Deliver as a complete file.

8. Update `PROJECT_NEXT_STEPS.md` §0 (advance to whichever Track 4 artifact remains, or — if §1.3 chat entry point also shipped — advance to the post-Track-4 priorities: E6/E7/E8 explorer follow-ups, cross-FC pattern layer trigger watch, content-rewrite housekeeping), §2.4 state updated, §3 reordered, §5.12 marked DISCHARGED with closure block (mirror §5.10 / §5.11 shape). Deliver as a complete file.

9. Before closing, produce the closing prompt for whichever next-eligible action the maintainer prefers — default if §1.3 still pending: §5.4 (chat entry point); default if §1.3 also shipped: §5.13 cross-FC placeholder remains a placeholder; substitute one of the E6/E7/E8 templates or the content-rewrite housekeeping templates per maintainer choice.

The vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` binds the AI side of every transcript (per its §6). The example sessions are the discipline's most concentrated physicist-facing surface; every paragraph passes the §8 self-check before shipping.
```

### 5.13 First cross-FC sub-PR (anomaly-content virtual-FC, when triggers fire)

[Template to be drafted by the session that verifies the §10.1 triggers fire. The template body is appended to this document when the trigger conditions are met. Bumped from §5.10 to §5.13 on 2026-05-27 when §5.10 (essay DISCHARGED), §5.11 (recipes DISCHARGED), and §5.12 (example-sessions template body) were added during the Track 4 §1.2 closure session.]

---

## 6. Maintenance

The discipline that keeps this document load-bearing:

1. **Deliverables ship as complete files, not patches.** The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. Every methodology document update, every explorer code change, every data PR ships as one or more *complete files* presented via the `present_files` tool. The maintainer downloads each and replaces the corresponding file in the repo. "Replace §3 with this" patches, per-line diff blocks, and "splice this in here" instructions are forbidden; they require manual splicing that slows the project significantly and introduces splice errors. This norm applies to every workstream and every template in §5.

2. **Every session updates this document at close.** Sections §3 (currently eligible) and §4 (pending) are the ones that change session-to-session. The session moves completed actions out of §3, promotes newly-eligible actions from §4 to §3, adds new pending actions to §4 if the deliverable surfaced any.

3. **Section §5 (prompt templates) grows as new actions become eligible.** When a session ships a sub-PR that promotes a pending action to eligible, that session also drafts the §5 template for the new action if it doesn't exist. Templates §5.12 (and later) are placeholders or recently-drafted bodies that get filled in or marked DISCHARGED when their actions become eligible / ship. Discharged templates (§5.1, §5.2, §5.3, §5.5, §5.6, §5.7, §5.8, §5.9, §5.10, §5.11 as of 2026-05-27) are retained with a DISCHARGED header so future sessions can read them as historical reference for analogous operations.

4. **The closing prompt is non-optional.** Every session terminates with a clearly-marked closing prompt in a code block, derived from the relevant §5 template, instantiated with current state. A session that hasn't produced a closing prompt isn't done.

5. **State-verification at session start is non-optional.** The first action of every session is reading this document and running the workstream handoff's state-verification ritual. Drift between this document and the live system is caught here and corrected (either the document updates or the maintainer is alerted to the inconsistency).

6. **This document never holds substrate state directly.** All substrate state lives in the canonical data file (`_meta.changelog`), the live MCP, and the live explorer. This document holds *operational* state: which actions are eligible, what their triggers are, what their prompts look like. The substrate state is queried fresh; the operational state is read from here.

7. **The maintainer is the only one who reads §0 routinely.** §0 holds the single answer to "what's next." A maintainer who wants to know what to do reads §0; the session that opens with the pasted prompt doesn't need §0 because the prompt already specifies the action.

---

*End of PROJECT_NEXT_STEPS.md. Initial draft 2026-05-26; amended 2026-05-27 with E1 closure, E2 promotion, and file-delivery norm (§6 #1); amended again 2026-05-27 with E2 closure, E4 promotion, and the E4 template at §5.7; amended again 2026-05-27 with E4 closure (the reusable quantitative_scale callout component now lives in `explorer-qs.js` + `update-e4.css`; 276 of 288 qs entries render), E3 promotion to highest priority, the §5.7 DISCHARGED closure block, the §5.8 E3 template body draft, and the cross-FC placeholder bumping to §5.9; amended again 2026-05-27 with E3 closure (the if_real_implies trees render via `explorer-implies.js`; 23 resolutions / 24 implications / 12 implication-level qs entries all surface — the content-surfacing gap closes), E5 promotion to highest priority, the §5.8 DISCHARGED closure block, the §5.9 E5 template body draft, and the cross-FC placeholder bumping to §5.10; amended again 2026-05-27 with E5 closure (the signal layer — small chips on FC tiles and discourse-card head pills — lands; the seventeen-file E5 build is live; the Phase B + C surfacing pass CLOSES) and the same-day shipping of the first two Track 4 use-side artifacts (§1.1 essay at `/methodology/USE_THE_MAP_ESSAY.md`, §1.2 query recipes at `/methodology/QUERY_RECIPES.md`), with §0 advanced to Track 4 §1.3 chat entry point as default, §2.2 marked CLOSED, §2.4 state updated, §3 reordered, §4 with Track 4 essay/recipes removed (shipped) and the explorer-surfacing trigger marked met for E6/E7/E8 and cross-FC, §5.9 marked DISCHARGED with E5 closure block, §5.10 essay DISCHARGED closure block authored (folding forward the prior session's pending update), §5.11 marked DISCHARGED with the recipes closure block, §5.12 example-sessions template body drafted, and the cross-FC placeholder bumped from §5.10 to §5.13. Companion to the workstream handoffs (Predictive Layer Phase C, Explorer Phase B+C, Track 4 artifacts, Cross-FC pattern layer scope memo). The document is updated by every session at close per §6. The chain that keeps the project moving without requiring maintainer memory is: this document tells each session what's eligible, each session generates the closing prompt for the next session from the relevant §5 template, the maintainer pastes the closing prompt into a fresh chat. Deliverables arrive as complete files via present_files. The chain holds as long as the discipline in §6 holds.*
