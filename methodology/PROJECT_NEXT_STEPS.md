# Project next steps — operational queue

**Date:** 2026-05-26 (initial draft); amended 2026-05-27 (E1 closure + file-delivery norm).
**Status:** Active. This document is the project-level operational queue. Every session reads it at start; every session updates it at close.
**Purpose:** Hold the operational state of all open workstreams so any fresh session can determine what action is currently eligible without consulting prior conversation history. Provide prompt templates so each session can generate the closing prompt that opens the next session.
**Position:** Lives in `/methodology/`. Attached to every fresh chat via project files. Companion to `META_v21_1_methodology_firewall.md`, the workstream-specific handoffs (`PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`, `EXPLORER_PHASE_BC_HANDOFF.md`, `TRACK_4_USE_SIDE_ARTIFACTS.md`, `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`), and the project goal documents.

---

## 0. Highest-priority eligible action right now

**Sub-PR E2 (render the 38 resolves edges) — workstream 2.2.**

Prompt template at §5.6. Phase C closed at v95. Sub-PR E1 closed 2026-05-27 as a verification-only zero-diff sub-PR — the surfacing-side renderer for the 12 new experimental-program nodes was completed in step with the data-side PRs that landed them, and the work was discovered to be already discharged on inspection. E2 is the first surfacing sub-PR with a substantive code diff: it adds the "Resolves" section to the experimental-program card and the "Targeted by" section to the cell / frontier / totality-approach sidebar view, surfacing the 38 resolves edges that connect the 12 forward-looking experimental programs to their physics targets.

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

*State:* Eight sub-PRs (E1-E8) sequenced. E1 closed 2026-05-27 as a verification-only zero-diff sub-PR. E2 through E5 are all eligible (their trigger conditions — Phase C closure and worker rebuild — are met). Update C closed previously; the active sub-PRs render Phase B + Phase C content that the dataset has accumulated but the explorer doesn't yet display.

*Eligible action:* Sub-PR E2 (render resolves edges). E4, E3, E5 follow in the handoff's recommended sequencing.

*Closure condition:* Sub-PRs E1-E5 shipped (E6-E8 are discretionary polish, not required for closure).

### 2.3 Cross-FC pattern layer (the reading layer)

*Scope memo:* `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`.

*State:* Scope memo committed. Six provisional modes identified. First authoring sub-PR is *not* currently eligible — Phase C closure is one of the trigger conditions (now met), but schema v20 authoring, four-FCs-stable check, and validator clean status still gate. See scope memo §10.1 for the trigger conditions.

*Eligible action:* None currently. Watch for triggers.

*Closure condition:* The layer doesn't have a closure in the same sense as Phase C or the explorer pass. It runs continuously as the substrate matures, with each mode's sub-PRs accumulating over time. The "first sub-PR shipped" milestone is the next state transition; subsequent milestones are mode-specific.

### 2.4 Track 4 use-side artifacts

*Reference:* `TRACK_4_USE_SIDE_ARTIFACTS.md`.

*State:* Four artifacts named (essay, query recipes, chat entry point, example sessions). The chat entry point (§1.3) is mostly independent of explorer surfacing and can be drafted now. The other three depend on the explorer's final shape.

*Eligible action:* Track 4 §1.3 (chat entry point). Lower priority than workstream 2.2 but available for sessions wanting to make independent progress.

*Closure condition:* All four artifacts shipped, with the explorer surfacing closed so the artifacts can point at real explorer surfaces.

---

## 3. Currently eligible actions (priority-ordered)

1. **Sub-PR E2 (render resolves edges)** — workstream 2.2. Highest priority: first user-facing rendering of Phase C content. Adds a "Resolves" section to the experimental-program card and a "Targeted by" section to the cell / frontier / totality-approach sidebar view. Template at §5.6.

2. **Sub-PR E4 (reusable quantitative_scale callout component)** — workstream 2.2. Eligible. `EXPLORER_PHASE_BC_HANDOFF.md` §3 recommends E4 before E3 so the qs component is available for E3's implication-level entries. Template TBD (draft at E2 close).

3. **Sub-PR E3 (render if_real_implies trees on frontier / totality-approach cards)** — workstream 2.2. Eligible since Step 4.5 shipped (implication-level quantitative_scale content exists). Template TBD (draft at E4 close).

4. **Sub-PR E5 (tile / discourse-node decoration for Phase B+C coverage)** — workstream 2.2. Eligible. Handoff recommends after E1-E4 since those are the surfaces being decorated. Template TBD (draft at E3 close).

5. **Track 4 §1.3 (chat entry point)** — workstream 2.4. Independent of explorer surfacing, lower physics-content demand. Suitable for sessions where the maintainer wants to advance the project without explorer authoring. Template at §5.4.

The default next session executes (1) unless the maintainer chooses otherwise.

---

## 4. Pending eligibility (blocked on triggers)

The following actions are *not* currently eligible. Each is listed with the trigger condition that would unblock it.

**Sub-PRs E6 (rank_by_scale overview panel) and E7 (find_discriminating_experiments view).** Discretionary net-new views beyond explorer Phase B+C surfacing closure. Eligible after E1-E5 ship if the maintainer chooses to extend the explorer further.

**Sub-PR E8 (explorer banner + About panel refresh).** Lightweight one-file touch; can ship alongside any earlier sub-PR as a stowaway or as a standalone closing step.

**Cross-FC pattern layer first authoring sub-PR (Mode D, anomaly-content virtual-FC).** Phase C closure trigger now met; remaining trigger conditions per `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.1 — schema v20 authored, four involved FCs stable, validator clean — still gate eligibility.

**Cross-FC layer first Mode E sub-PR.** Blocked on `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.2 triggers. Substantially downstream.

**Cross-FC layer first Mode F sub-PR.** Blocked on `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §10.3 triggers. Years out.

**Track 4 essay (§1.1), query recipes (§1.2), example sessions (§1.4).** Blocked on the explorer Phase B+C surfacing closing (sub-PRs E1-E5 shipped). The artifacts need to point at real explorer surfaces.

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

### 5.6 Sub-PR E2 (resolves edges in explorer)

```
Pick up sub-PR E2 from `EXPLORER_PHASE_BC_HANDOFF.md` §3: render the 38 resolves edges. This is the first user-facing rendering of Phase C content in the explorer.

Run §0 state-verification first: call `server_info` on the MCP (expected: data_version v95, schema_version v19, resolves_edges 38, tool_count 33). Fetch `data/Map_v34_consolidated.json` `_meta.version` via raw CDN at https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json and confirm it matches. Note any drift.

DELIVERY DISCIPLINE (critical — read before authoring anything):
The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. EVERY deliverable in this session — explorer code files, methodology document updates, anything that ends up in the repo — ships as a COMPLETE FILE via the present_files tool. Do NOT produce "replace §3 with this" patches, do NOT produce per-line diff blocks for the maintainer to splice in. The maintainer downloads the full file and drops it in place. This norm is documented in `PROJECT_NEXT_STEPS.md` §6 norm #1; violating it slows the project significantly.

Then proceed:

1. Read the current explorer architecture. Fetch from raw GitHub:
   - `explorer/explorer-discourse.js` — study `renderProgramCard` (around line 472). The "Resolves" section sequences inside this card, after "Produces classifications" and before "Key publications".
   - `explorer/explorer-sidebar.js` — find where cells render their sidebar card; the cell card is where "Targeted by" attaches for cell targets.
   - `explorer/explorer-discourse.js` again — find `renderFrontierCard` and `renderTotalityCard`; "Targeted by" also attaches to frontier and totality-approach cards (resolves edges target all three node types).
   - `explorer/explorer-data.js` — note that `DISCOURSE_EDGE_TYPES` (around line 263) does NOT include 'resolves'. Either extend that list or build a separate `resolves_by_program` / `resolves_by_target` index alongside the other discourse indexes.

2. Choose module layout. Per `EXPLORER_HANDOFF.md`'s "one new logical surface = one new module" precedent, propose creating an eighth JS file `explorer/explorer-resolves.js` that exports `renderResolvesFromProgram(programId)` (called from the program card) and `renderTargetedByTarget(targetId)` (called from the cell / frontier / totality-approach cards). Indexes live in `explorer-data.js` with the other discourse indexes.

3. Decide qs (sensitivity field) rendering. E4 will ship the reusable quantitative_scale callout component; E2 ships before E4 in the recommended sequencing. Two options:
   (a) Minimal inline rendering in E2 — value + units + bound-direction symbol (≳ / ≲ / = / ~) + first citation as a short line. E4 absorbs and refactors when it ships.
   (b) Stub a small `explorer-qs.js` module with the minimum surface E2 needs; E4 extends.
   Propose one and wait for maintainer choice. Default recommendation: (a), since E4 sequences after E2 partly to enable this absorption.

4. Decide predictions_per_program layout. 5 of 38 resolves edges carry populated competing-prediction lists (sub-PR 53 muon-g-2-continuation; sub-PR 56 rubin-lsst cc-frontier; sub-PR 57 fcc Higgs self-coupling + WIMP thermal mass + m_W precision). Two options:
   (a) Inline list of competing predictions under the edge — most informative, takes most space.
   (b) Collapsible under a "Competing predictions" toggle — less space, one extra click.
   Maintainer chooses based on density tolerance.

5. Decide exclusion_only visual signal. When the edge sets a bound rather than measures a value, the UI needs a cue. Suggested: a small pill ("Bounds-setting" or "Sets a bound") or rely on the bound-direction symbol (≳ or ≲) next to the sensitivity value. Avoid raw "exclusion_only: true" text per `PHYSICIST_FACING_VOCABULARY.md`.

6. Apply the vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` to all UI prose:
   - Section header: "Resolves" on the program card; "Targeted by" on the cell / frontier / totality-approach card.
   - exclusion_only true → "Bounds-setting" or "Sets an upper / lower bound" (matching bound_direction).
   - exclusion_only false → "Measurement-discriminating", or render the value with its uncertainty without a separate label.
   - bound_direction symbols → ≳ (lower) / ≲ (upper) / = or central-value (two-sided) / ~ (unspecified).
   - predictions_per_program → "Competing predictions", each entry labeled by its theoretical program (e.g., "BMW lattice HVP", "Aliberti dispersive HVP").

7. Propose the diff (which files change, what each section looks like at the markup level, what data-layer indexes are built). Wait for maintainer confirmation before authoring.

8. Once authored, present ALL updated files via the present_files tool — complete files only, no patches. Files to be presented: every modified explorer JS module, any new module created, both updated handoff documents, and the updated PROJECT_NEXT_STEPS.md. Maintainer downloads each and erase-and-replaces in the repo via GitHub web UI.

9. Update `EXPLORER_PHASE_BC_HANDOFF.md` §1 — gap-table rows for "resolves edges" flip to "Yes (since sub-PR E2)". Update §3 sub-PR E2 description with closure note recording the design choices made. Deliver as a complete file.

10. Update `PROJECT_NEXT_STEPS.md` §0 (E4 becomes highest priority), §3 (remove E2 from eligible, promote E4 to position 1). Deliver as a complete file.

11. Before closing, draft the §5.7 template for sub-PR E4 (qs callout component) in `PROJECT_NEXT_STEPS.md` (the complete file delivered in step 10 should already include this) and produce the closing prompt for E4 in a clearly-marked code block in the chat.

The vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md` *does* bind explorer UI prose (per its §6). Every label, tooltip, section heading, and inline text uses physicist-natural vocabulary, not schema field names. Software jargon ("array", "field", "tool fires") is excluded entirely.
```

### 5.7 First cross-FC sub-PR (anomaly-content virtual-FC, when triggers fire)

[Template to be drafted by the session that verifies the §10.1 triggers fire. The template body is appended to this document when the trigger conditions are met.]

---

## 6. Maintenance

The discipline that keeps this document load-bearing:

1. **Deliverables ship as complete files, not patches.** The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. Every methodology document update, every explorer code change, every data PR ships as one or more *complete files* presented via the `present_files` tool. The maintainer downloads each and replaces the corresponding file in the repo. "Replace §3 with this" patches, per-line diff blocks, and "splice this in here" instructions are forbidden; they require manual splicing that slows the project significantly and introduces splice errors. This norm applies to every workstream and every template in §5.

2. **Every session updates this document at close.** Sections §3 (currently eligible) and §4 (pending) are the ones that change session-to-session. The session moves completed actions out of §3, promotes newly-eligible actions from §4 to §3, adds new pending actions to §4 if the deliverable surfaced any.

3. **Section §5 (prompt templates) grows as new actions become eligible.** When a session ships a sub-PR that promotes a pending action to eligible, that session also drafts the §5 template for the new action if it doesn't exist. Templates §5.7 (and later) are placeholders that get filled in when their actions become eligible. Discharged templates (§5.1, §5.2, §5.3, §5.5 as of 2026-05-27) are retained with a DISCHARGED header so future sessions can read them as historical reference for analogous operations.

4. **The closing prompt is non-optional.** Every session terminates with a clearly-marked closing prompt in a code block, derived from the relevant §5 template, instantiated with current state. A session that hasn't produced a closing prompt isn't done.

5. **State-verification at session start is non-optional.** The first action of every session is reading this document and running the workstream handoff's state-verification ritual. Drift between this document and the live system is caught here and corrected (either the document updates or the maintainer is alerted to the inconsistency).

6. **This document never holds substrate state directly.** All substrate state lives in the canonical data file (`_meta.changelog`), the live MCP, and the live explorer. This document holds *operational* state: which actions are eligible, what their triggers are, what their prompts look like. The substrate state is queried fresh; the operational state is read from here.

7. **The maintainer is the only one who reads §0 routinely.** §0 holds the single answer to "what's next." A maintainer who wants to know what to do reads §0; the session that opens with the pasted prompt doesn't need §0 because the prompt already specifies the action.

---

*End of PROJECT_NEXT_STEPS.md. Initial draft 2026-05-26; amended 2026-05-27 with E1 closure, E2 promotion, and file-delivery norm (§6 #1). Companion to the workstream handoffs (Predictive Layer Phase C, Explorer Phase B+C, Track 4 artifacts, Cross-FC pattern layer scope memo). The document is updated by every session at close per §6. The chain that keeps the project moving without requiring maintainer memory is: this document tells each session what's eligible, each session generates the closing prompt for the next session from the relevant §5 template, the maintainer pastes the closing prompt into a fresh chat. Deliverables arrive as complete files via present_files. The chain holds as long as the discipline in §6 holds.*
