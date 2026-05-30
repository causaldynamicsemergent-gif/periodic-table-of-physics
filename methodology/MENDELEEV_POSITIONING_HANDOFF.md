# Mendeleev positioning — handoff and process

**Purpose of this file.** Standing reference for the workstream that closes a positioning gap surfaced during a 2026-05-28 test-chat exchange. A fresh chat asked to evaluate the Map of Physics produced a competent, physically accurate critique that nevertheless pitched the tool as "comparable to a very good review article" — completely missing the Mendeleev-style structural moves (empty-cell prediction, cross-classification patterns, unification-attempt testing) that are the project's actual differentiator. The data layer has been doing this work all along (`constructive_status` fields, the cross-classification pattern catalog, `find_hosting` / `find_targeting`); the surfaces a fresh reader lands on (the explorer's first-ten-seconds visual surface, the MCP's tool surface) don't lead with it. This handoff queues the work that fixes that, upstream of Track 4 outreach and the use-side artifact queue.

Location: `/methodology/MENDELEEV_POSITIONING_HANDOFF.md`. Attach to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_PHASE_BC_HANDOFF.md` (inserts a new sub-PR E0 before its existing E1–E8 sequence), `PHYSICIST_FACING_VOCABULARY.md` (the prose-surface discipline; this work extends the same discipline to the orientation surfaces), and `TRACK_4_USE_SIDE_ARTIFACTS.md` (the use-side queue, which sequences after this work closes).

---

## 0. Read this first — state verification

Same ritual as the other handoffs. Three authoritative sources:

1. **Live MCP server.** Call `server_info`. Note `data_version`, `schema_version`, `tool_count`. Today's expected state per the Phase C handoff: `v66 / v19 / 33 tools` deployed, `v95+` canonical (worker data-lagging by ~30 versions; rebuild queued separately). The state of `server_info`'s response shape is itself part of what this workstream changes — see §3.2.
2. **Live explorer.** Open `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`. Today's expected baseline: serves Phase A content from the eleven-file Update C build; reads the canonical JSON at runtime so the Phase B + C content is in the data but rendered nowhere. The state of the first-ten-seconds visual surface is what this workstream changes — see §3.1.
3. **The repo's `/methodology/` directory.** This handoff sits alongside `EXPLORER_PHASE_BC_HANDOFF.md`, `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`, `PHYSICIST_FACING_VOCABULARY.md`, `TRACK_4_USE_SIDE_ARTIFACTS.md`, `META_v21_1_methodology_firewall.md`, and the project goal docs.

Fresh sessions verify state before relying on this document. The session that catches drift updates the handoff at the end of its work.

---

## 1. Why this exists — the positioning gap

The fresh-chat critique that triggered this workstream (preserved verbatim in the conversation log archived at 2026-05-28) is internally consistent and physically accurate. It correctly notes the post-2025 muon g-2 reconciliation, the edge-status distribution as honest epistemics, the discriminating-experiments lookup as the right interface for adjudication questions. It does not contain physics errors. Its bottom line — *"a sophisticated, opinionated, unusually disciplined meta-physics tool… comparable to a very good review article but queryable and current in a way reviews aren't"* — is the framing that fails.

Mendeleev's table is famous because it *generates* predictions from empty cells (gallium, germanium predicted from valence patterns before discovery) and *adjudicates* candidate theories of matter by whether they reproduce the periodicity. "Comparable to a very good review article" is, on the Mendeleev standard, a description of the *thing the project is meant to transcend*. Review articles don't predict gallium.

The fresh chat did not query a single structural-pattern tool. `find_structurally_excluded`, `find_forced_cells`, `find_cross_classification`, `compare_classifications`, `find_hosting`, `find_targeting`, `find_targets_of_program`, `get_axis_mapping` — the Mendeleev moves — were not used. The tools the chat reached for were `find_discriminating_experiments`, `find_resolvers`, `find_predictions`: all experimental-program-adjudication tools. The chat sorted the available surface by what read familiar to an LLM's training distribution, found experimental adjudication, and produced a competent answer for that subset. The structural-prediction layer was invisible.

A working physicist landing on the live explorer is in the same position. The Phase A tile grid is visible. The constructive-status content of cells — which cells are *realized*, which are *conjectured-by-pattern*, which are *forbidden-by-pattern* — is currently buried in the sidebar after a click. Cross-classification patterns live behind the phen↔phen overlay (which is off by default) and the `find_cross_classification` query (which requires knowing to ask). The title says "Periodic Table of Physics"; the surface does not back the title's claim in the ten seconds it has.

This is a positioning failure, not a data failure. The fix is to push the Mendeleev frame into the surfaces a fresh reader (human or AI) lands on first, so the moves the project actually supports are visible before either party has to derive them.

---

## 2. The four moves — the project's positioning

In order. The first three are Mendeleev moves; the fourth is downstream.

The four moves split into two structural categories, and the distinction is load-bearing for how the surfaces are framed:

- **Substrate-contained moves** (M1, M4) — the map directly holds the relevant content; the physicist looks it up. Cells with `constructive_status: conjectured-by-pattern` and `resolves` edges are objects in the substrate, authored by the project against the §4 admissibility test.
- **Substrate-enabled moves** (M2, M3) — the map provides queryable, literature-anchored organization; the physicist does the pattern-recognition or unification-testing work on top. The substrate's contribution is the disciplined organization that makes the moves tractable and grounded; the moves themselves are the user's. Mendeleev didn't invent the elements — he organized literature-anchored empirical data on them so the periodicity became visible to himself and others. Same structural relationship here.

**M1. Empty-cell prediction (substrate-contained).** Cells with `constructive_status: conjectured-by-pattern` are the gallium-and-germanium analog: positions the classification's constructive axes predict should exist but where nature (or theory) has not yet delivered. Cells with `constructive_status: forbidden-by-pattern` are the dual move — positions the structure rules out. Both are first-class predictions of the table, authored against literature sources per the §4 test; both need to be visible at first glance.

**M2. Cross-classification patterns (substrate-enabled).** When the same physical object appears at corresponding positions in multiple formal classifications, that recurrence is the periodicity analog. The 18+ patterns catalogued in Phase C (bidirectional-anchor-closures, parallel-anchors, discriminating-resolves-clusters, the McKay-correspondence ADE-clique sweep) are precedents — proof-of-concept that the queries surface findable structure when the literature has surfaced it — not the map's exhaustive claims about what patterns exist. The discovery work for further patterns is the physicist's: running `find_cross_classification`, `compare_classifications`, and per-FC scans across the substrate, and recognising recurrences that the literature has noticed (or, when literature-anchored synthesis arrives later, recording new ones via PR review). The map's contribution is the literature-anchored organization that makes the recurrence visible.

**M3. Testing candidate unification frameworks against the structure (substrate-enabled).** A candidate-foundational program (totality-approach) makes claims about which open frontiers it targets, which classifications it hosts, which architectures it reduces to. `find_hosting`, `find_targeting`, `find_targets_of_program`, `get_axis_mapping`, `find_cross_classification` with status filters — these are the test-against-the-table tools. A theorist proposing a unification scenario queries the substrate to test whether the framework's claims are consistent with the literature-anchored organization the map records. The test is the physicist's; the substrate is the map's. This is the move that turns the table from descriptive to adjudicative — but the adjudication is performed by the user, not asserted by the project.

**M4. Experimental-program adjudication (substrate-contained).** `find_discriminating_experiments`, `find_resolvers`, `find_predictions` — the Phase C flagship tools. These tell a working physicist or experimentalist what running and near-term programs bear on a given open frontier, at what sensitivity, and where competing theoretical programs predict adjudicable point values. The `resolves` edges and per-program prediction lists are authored against the §4 admissibility test. This is genuinely useful work, but it is *downstream* of M1–M3: experimental adjudication is the empirical test of structural commitments that M1–M3 surface and frame.

The ordering matters because it sets reader expectations. A fresh reader who encounters M4 first reads the tool as an experimental-program reference. A fresh reader who encounters M1–M3 first reads the tool as a periodic table that also happens to track experimental coverage. The data and the methodology support both readings; the *positioning* decides which one a fresh reader walks away with.

The substrate-contained / substrate-enabled distinction matters because it sets the *honesty* of the positioning. A surface that frames M2/M3 as "the map's claims about cross-classification patterns and unification adjudications" overstates the project's authority and invites the failure mode of project-side synthesis. A surface that frames M2/M3 as "the map's literature-anchored organization, enabling the physicist's pattern-recognition and adjudication work" lands the positioning honestly. This is the framing the surfaces must carry.

---

## 3. The two workstreams

Two parallel surfaces, two parallel sub-PR sequences. Both depend on a small upstream artifact (§4) that names M1–M4 once so the surface text stays consistent.

### 3.1 Explorer Mendeleev surfacing (sub-PR E0)

Slots into the existing E1–E8 queue in `EXPLORER_PHASE_BC_HANDOFF.md` §3 as a new **sub-PR E0**, shipped *before* E1. The reason for the ordering: E1–E5 add Phase B + Phase C content to a surface a fresh physicist is currently reading as a review-article catalog. Without E0, that content lands in a frame that mutes its significance. With E0, the Phase B + C content arrives in a surface the physicist already reads as Mendeleev-style; then conditional-consequence chains (Phase B) and quantitative-bound entries (Phase C) read as *structural commitments the table is making*, not as more entries in a catalog.

**What E0 does — five concrete moves, none of which change the data layer:**

- **E0a. In-tile constructive grid.** The existing in-tile cell viz (Update C) renders cells as a grid coloured by observational-status. E0a extends the colour scheme so realized, conjectured-by-pattern, and forbidden-by-pattern cells are visually distinct from one another *and* from cells that are simply not-yet-authored. Three distinct fills, one absence. This is the single most important visual move; without it the constructive predictions are invisible at the tile level.

- **E0b. Conjectured cells draw the eye.** Within E0a, the conjectured-by-pattern fill should be the most visually arresting — a hatched fill, a saturated outline, a small icon. Whatever signals *"the table is asserting something here that hasn't been found yet."* A small per-tile chip showing the conjectured count (*"2 conjectured"*) makes the prediction parseable at a glance without a click.

- **E0c. Cross-classification patterns visible by default.** The phen↔phen overlay currently exists but is off by default. E0c either (a) turns on a strongest-pattern subset by default, or (b) adds a new default-on overlay surfacing the bidirectional-anchor-closures and parallel-anchors. The choice between (a) and (b) is for the implementing chat to resolve. The goal is that a physicist looking at the static map sees *at least one* recurring-structure indication without interacting.

- **E0d. Subtitle naming the moves.** Under the explorer's title, a single-sentence subtitle in the Mendeleev frame. Draft: *"Cells are physical content positioned in formal classifications. Empty cells with structural reason are predictions or exclusions. Patterns across classifications — the analog of periodicity — and tests of candidate unification frameworks are moves the substrate enables; the discovery work is yours."* The implementing chat may shorten or rephrase, but the four moves (M1–M4 in §2) must each appear *and* the substrate-contained / substrate-enabled distinction must read off the subtitle — M2 and M3 are framed as moves the substrate enables, not claims the map makes. This subtitle is the eight-second orientation layer that tells the physicist what to look for in the next minute of poking.

- **E0e. Per-tile closure indicator.** `closure_level` is already a field on FC records. E0e renders it on the tile chrome (small badge or symbol) so the physicist sees whether a classification's constructive pattern terminates (the noble-gases analog) or is open. Cheap edit; high informational value.

**Files touched by E0:** likely `explorer-map.js` (tile chrome + in-tile viz), `Map_v34_explorer.html` (subtitle), `explorer-data.js` (any new index needs), one of the CSS files for the visual treatment. The implementing chat should propose the diff against current explorer source via `web_fetch` per the working norms in `EXPLORER_HANDOFF.md`.

**Design questions for the implementing chat to resolve before authoring code:**

- *(E0a/b)* The exact visual treatment for realized vs conjectured vs forbidden — colour scheme, fill pattern, accessibility (colour-blind palette must work). Update C's existing palette is the starting point.
- *(E0c)* Whether to ship default-on overlay arrows or default-on tile chips. Arrows are more visually striking but risk cluttering the static map; chips are smaller-footprint.
- *(E0d)* Subtitle wording — the implementing chat drafts; maintainer approves.
- *(E0e)* Badge form (text "■", "◐", "□" as already used in tile footer; an icon; a colour treatment).

### 3.2 MCP Mendeleev orientation (sub-PR M0)

Independent of E0. Lands on the MCP worker side. Four concrete moves:

- **M0a. Purpose statement in `server_info`.** The current `server_info` response reports operational metadata (`data_version`, `schema_version`, `tool_count`, `resolves_edges`). M0a adds a first-class `purpose` field — a 100–200 word orientation statement leading with the Mendeleev frame and the four moves M1–M4 in order. Sourced from `MENDELEEV_FRAME.md` (§4 below) so all surfaces stay consistent.

- **M0b. Tool descriptions lead with the move.** Each of the structural-pattern tools (`find_structurally_excluded`, `find_forced_cells`, `find_cross_classification`, `compare_classifications`, `find_hosting`, `find_targeting`, `find_targets_of_program`, `get_axis_mapping`) gets its description rewritten so the *move* is the lead sentence, not the *filter behaviour*. M2 and M3 tool descriptions additionally carry the substrate-enabled framing — the substrate provides literature-anchored organization, the discovery / adjudication work is the user's. Example rewrites:
  - `find_structurally_excluded` (M1): current "find cells with content 'structurally-excluded'" → new *"Returns cells the constructive pattern of a classification rules out — the analog of periodic-table positions forbidden by valence rules. Use this to surface the map's structural exclusion predictions."*
  - `find_forced_cells` (M1): current "find cells with `constructive_status` in {forbidden-by-pattern, conjectured-by-pattern}" → new *"Returns cells predicted by the constructive pattern but not yet realized — the analog of gallium and germanium. Use this to surface what the table predicts should exist."*
  - `find_cross_classification` (M2): current "find cross-classification edges (formal-classification ↔ formal-classification)" → new *"Returns recurring-structure edges where the literature has recorded the same physical content appearing at corresponding positions in two classifications — the periodicity analog. Combined with `compare_classifications`, `find_cells` filtered by content, and per-FC scans, this enables cross-classification pattern discovery — the discovery work is yours, the substrate provides the literature-anchored organization that makes recurrences visible."*
  - `find_hosting` (M3) / `find_targeting` (M3): new framing *"Returns the structural commitments a candidate-foundational program makes against the substrate — which architectures it hosts, which frontiers it targets, which classifications it uses. Use this to test whether a unification framework's claims are consistent with the literature-anchored organization the map records; the test is yours, the substrate is the map's."*
  - And so on for the other tools. The experimental-program adjudication tools (`find_discriminating_experiments`, `find_resolvers`, `find_predictions`) keep their current descriptions, since their framing is already accurate to M4 — these are substrate-contained moves where the map directly holds the relevant edges.

- **M0c. Tool grouping in the registry response.** When `tool_search` returns tools to a calling LLM, the response groups them into semantic clusters with cluster headers: *Mendeleev moves*, *unification-test moves*, *experimental adjudication*, *navigation*. The grouping is the typology M1–M4 expressed at the tool surface. An LLM that sees the grouped surface learns the typology at first contact instead of having to derive it from tool names.

- **M0d. Glossary entries in Mendeleev vocabulary.** Three or four new glossary entries the AI can pull on demand: *"empty cell," "structural exclusion," "cross-classification pattern," "constructive closure," "candidate-foundational program (totality-approach)."* Each entry leads with the periodic-table analog, then specializes to the map's vocabulary. This is a data-side PR (small) accompanying the worker-side PR.

**Files touched by M0:** `/mcp/worker_skeleton.js` (server_info shape, tool descriptions, tool_search response shape), `/data/Map_v34_consolidated.json` (glossary entries), `/mcp/README.md` (any documentation updates). The implementing chat should propose the worker-skeleton diff via `web_fetch` on the raw source per the Phase C handoff §4.

**Sequencing inside M0:** M0a/M0b/M0c can ship as one worker rebuild; M0d is a separate data-side PR that lands alongside or just before the worker rebuild. The worker rebuild discipline (Cloudflare web editor per `PROJECT_INFRASTRUCTURE.md` §3) applies.

---

## 4. The upstream artifact — MENDELEEV_FRAME.md

A short methodology doc that names M1–M4 once, in canonical wording, with a one-paragraph rationale per move. This doc seeds:

- The explorer subtitle (E0d) and the help-overlay text (eventually).
- The `server_info` purpose statement (M0a).
- The lead sentence of each rewritten tool description (M0b).
- The glossary entries (M0d).
- The opening of the eventual use-side essay (`TRACK_4_USE_SIDE_ARTIFACTS.md` §1.1).

Writing it once means the surfaces stay consistent. Editing it later is a single point of change rather than a per-surface audit.

**Location:** `/methodology/MENDELEEV_FRAME.md` (or `/methodology/PROJECT_POSITIONING.md` — maintainer call on the name).

**Shape:** 800–1500 words. One section per move (M1–M4), each leading with the periodic-table analog, naming whether the move is substrate-contained or substrate-enabled, naming the project surfaces and tools that support the move, and noting the project-internal vocabulary that prior surfaces used to refer to it. A closing section names the ordering principle (M1–M3 first, M4 downstream), the substrate-contained / substrate-enabled distinction as load-bearing for surface honesty, and the disciplines that bind each layer (the firewall and §4 admissibility test bind the data; the literature-anchoring principle in §7 of this handoff binds what gets authored into the substrate; the positioning binds the surface prose).

**Vocabulary discipline:** This document is methodology-facing (maintainer + AI sessions resuming work), so Register C terms (firewall, §4 admissibility, structural-FC vs phenomenon-FC) are appropriate. But MENDELEEV_FRAME.md is *also* the source text for several physicist-facing surfaces, so each section should include a physicist-facing prose paragraph the surfaces can quote or adapt directly. The vocabulary supplement (`PHYSICIST_FACING_VOCABULARY.md`) governs the adapted forms.

MENDELEEV_FRAME.md is the first sub-PR in the workstream (call it **sub-PR P0**). E0 and M0 depend on it.

---

## 5. Sequencing

```
P0 (draft MENDELEEV_FRAME.md)
  ├─→ E0 (explorer Mendeleev surfacing)         ─→ E1…E8 (existing Phase B+C surfacing queue)
  └─→ M0 (MCP Mendeleev orientation)
                                                          │
                                                          ↓
                                                use-side artifacts queue
                                                (TRACK_4_USE_SIDE_ARTIFACTS.md)
```

P0 first. E0 and M0 can land in parallel after P0 ships. E1–E8 sequence picks up after E0 (the existing handoff's queue rewrites to start with E1 unchanged, but now landing on an E0-Mendeleev-framed surface). The use-side artifacts queue sequences after E1–E5 close as already specified in `TRACK_4_USE_SIDE_ARTIFACTS.md` §3.

The Phase C content-authoring queue (sub-PR 57 fcc, Step 4.5 implication-level `quantitative_scale`, worker data refresh) sits on its own track and can land in parallel with any of this. It is content authoring, not positioning, and is governed by `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`.

**Note on the use-side queue.** A 2026-05-28 maintainer call surfaced a high-priority addition to `TRACK_4_USE_SIDE_ARTIFACTS.md`: a query recipe paired with a worked example session demonstrating the cross-FC pattern discovery move end-to-end (the substrate-enabled M2 move performed by a physicist on the current substrate, with the discovery work explicitly the user's, not the project's). This is the single most important use-side artifact for teaching the move the literature-anchoring principle reserves for the physicist. The handoff doesn't queue this artifact directly — it lives in `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.2 (recipes) or §1.4 (curated sessions) per the maintainer's call on dedicated billing vs flagship-recipe placement — but the workstream's downstream concerns hinge on it. The artifact is properly added to the use-side queue document in a separate small sub-PR; this handoff flags the requirement so it doesn't get lost.

---

## 6. Sub-PR sequence — concrete deliverables

### P0 — MENDELEEV_FRAME.md
- One file: `/methodology/MENDELEEV_FRAME.md`.
- 800–1500 words, structure per §4 above.
- Maintainer-approved before E0 and M0 begin.
- One chat.

### E0a — In-tile constructive grid
- Touches `explorer-map.js` (in-tile cell viz extension), one CSS file (visual treatment).
- Realized / conjectured / forbidden / not-authored as four visually distinct fills.
- Colour-blind-accessible palette.
- One chat.

### E0b — Conjectured cells draw the eye + per-tile conjectured-count chip
- Touches `explorer-map.js` and CSS.
- Conjectured fill is the most visually arresting of the four from E0a.
- Per-tile chip showing conjectured-count when ≥1.
- Can merge into E0a as a single PR if natural.

### E0c — Cross-classification patterns default-visible
- Touches `explorer-map.js` (overlay defaults) or adds new default-on visualization.
- At least one recurring-structure indication visible on the static map without interaction.
- Implementing chat resolves the arrows-vs-chips question before authoring.

### E0d — Subtitle
- Touches `Map_v34_explorer.html`.
- One sentence under the title, names M1–M4 by their physics-prose forms (per `PHYSICIST_FACING_VOCABULARY.md`).
- Smallest sub-PR by diff size.

### E0e — Per-tile closure indicator
- Touches `explorer-map.js` and CSS.
- Reads `closure_level` from the FC record, renders a small badge or symbol on the tile.
- Independent of E0a–E0d; can ship in any order with them.

(E0a–E0e may collapse into 2–3 PRs in practice. The above is the logical decomposition; the implementing chat should propose the actual PR shape.)

### M0a/b/c — MCP worker rebuild with Mendeleev orientation
- Touches `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, `/mcp/README.md`.
- `server_info` adds `purpose` field; tool descriptions rewritten for the eight structural-pattern tools; `tool_search` response groups tools by M1–M4 cluster.
- Worker rebuild via Cloudflare web editor per `PROJECT_INFRASTRUCTURE.md` §3.
- Verify deployment with `server_info` reporting the new purpose field and an updated tool surface.

### M0d — Glossary entries
- Touches `/data/Map_v34_consolidated.json` (glossary array).
- 3–5 new entries: empty cell, structural exclusion, cross-classification pattern, constructive closure, candidate-foundational program.
- CI-gated data PR; lands alongside or just before the M0a/b/c worker rebuild.

---

## 7. Working norms

Inherited from `EXPLORER_HANDOFF.md`, `EXPLORER_PHASE_BC_HANDOFF.md`, `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`, and `PHYSICIST_FACING_VOCABULARY.md`, with these clarifications:

- **This work does not touch the data layer.** No new cells, no new edges, no new classifications, no schema changes. The firewall (`META_v21_1_methodology_firewall.md`) is unaffected. The data already supports M1–M4; the positioning makes that visible.
- **MENDELEEV_FRAME.md is the single source of truth for the four moves.** Surface text in the explorer, MCP, glossary, and eventual essay quotes or adapts MENDELEEV_FRAME.md rather than re-inventing wording per surface. Drift between surfaces is the failure mode; a single source prevents it.
- **The vocabulary discipline (`PHYSICIST_FACING_VOCABULARY.md`) applies in full to the physicist-facing surface text** drafted in E0 and to the AI-orientation prose in M0 to the extent that AI orientation prose eventually reaches a physicist (via the chat entry point in `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.3).
- **The Mendeleev framing is descriptive, not aspirational.** The data layer actually supports M1–M4; this work surfaces what is already there. If a surface text claim about a Mendeleev move can't be backed by current data + tools, the claim doesn't go in. The opening worked example in any future essay must be a real query against the current map, not a hypothetical.
- **The literature-anchoring principle binds content authoring, not configuration-time emergence.** (Corrected 2026-05-29 in P0' sub-PR; see `META_v21_1_methodology_firewall.md` §8 and `DRIFT_PATTERN_REGISTER.md` Entry 1 for the conversational trajectory.) Content entering the substrate is literature-anchored — no project-side computation enters as cell content, edge claims, or quantitative scales. Organizational structure connecting content (axes, classifications, cross-classification edges) is the project's contribution; authoring those is bound by the firewall and §4 admissibility test. Patterns and gaps emerging when the substrate's organization meets its literature-anchored content — at query time, during configuration construction, in the configuration builder the E0 work surfaces — are first-class substrate outputs, neither invented nor literature-required. The positioning prose carries three categories explicitly: **substrate-contained** (M4 and M1 mode-1: the map directly holds the content), **substrate-enabled** (M2 and M3: the map enables the user's work on top), and **substrate-output** (M1 modes 2–3: the map surfaces patterns and gaps at configuration time). Surfaces that frame M1 modes 2–3 as "requiring prior literature endorsement" foreclose the project's central Mendeleev move; surfaces that frame them as "the map's autonomous synthesis" overstate the project's authority. The frame doc, subtitle, tool descriptions, and glossary entries all carry the three-category distinction. The original version of this bullet (pre-correction) said *"substrate content is added only when the indexing / synthesis is itself proposed in the literature — not when the project would be synthesizing across literature-anchored fragments"*; that statement is preserved as the rule binding **content authoring** but does not extend to substrate outputs at configuration time.
- **Existing surface content is load-bearing where it's correct.** Update C's tile chrome, the existing yield bar, the discourse panel, the help overlay's current content — none of these are wrong; they're framed at the wrong level. E0 extends the chrome; it doesn't replace working surfaces.

---

## 8. How to start a new chat on this work

Project files auto-attach when a fresh chat opens. To resume:

1. Open a fresh chat in the project.
2. Confirm `/mnt/project/` lists this handoff plus `EXPLORER_PHASE_BC_HANDOFF.md`, `PHYSICIST_FACING_VOCABULARY.md`, `TRACK_4_USE_SIDE_ARTIFACTS.md`, `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`, and `META_v21_1_methodology_firewall.md`.
3. Run the §0 state-verification ritual.
4. Tell the chat which sub-PR to resume.

### The P0 kickoff prompt (paste into a fresh chat)

```
Pick up sub-PR P0 from MENDELEEV_POSITIONING_HANDOFF.md: draft MENDELEEV_FRAME.md.

Background: this is the upstream artifact for the explorer E0 sub-PR sequence
and the MCP M0 sub-PR sequence. It names the four moves the Map of Physics
supports (M1 empty-cell prediction, M2 cross-classification patterns, M3
unification-attempt testing, M4 experimental-program adjudication) once, in
canonical wording. All physicist-facing surface text downstream (explorer
subtitle, server_info purpose statement, tool description rewrites, glossary
entries, eventual use-side essay opening) sources from this doc.

Two structural points the frame doc must carry (per the handoff §2 and §7):

A. The four moves split into substrate-contained (M1, M4) and substrate-enabled
   (M2, M3). Substrate-contained: the map directly holds the relevant content
   (`constructive_status: conjectured-by-pattern` cells, `resolves` edges);
   the physicist looks them up. Substrate-enabled: the map provides
   literature-anchored organization; the physicist does the pattern-recognition
   or unification-testing work on top. Mendeleev didn't invent the elements —
   he organized literature-anchored empirical data on them so the periodicity
   became visible. Same structural relationship for M2 and M3. The frame doc
   must read this distinction off the prose: M1 / M4 sections describe what
   the map directly holds; M2 / M3 sections describe what the substrate enables
   the physicist to do.

B. The literature-anchoring principle binds what enters the substrate. Substrate
   content is added only when the indexing / synthesis is itself proposed in the
   literature — not when the project would be synthesizing across literature-
   anchored fragments. The frame doc's M2 and M3 sections must NOT frame the
   substrate as making cross-classification or unification-adjudication claims;
   they must frame the substrate as providing the organization that enables the
   user to find or make those claims (themselves grounded in the literature).

Before drafting, do four things in order:

1. Run the §0 state-verification ritual from MENDELEEV_POSITIONING_HANDOFF.md
   (server_info, the live explorer URL, the /mnt/project/ file list).

2. Verify each of the four moves is backed by current data + tools by running
   one representative query for each:
   - M1: find_forced_cells across the dataset (or scan a couple of FC records
     for cells with constructive_status in {forbidden-by-pattern,
     conjectured-by-pattern}). Note the count and at least one named example.
   - M2: find_cross_classification with a status filter. Note one named
     bidirectional-anchor-closure or parallel-anchor pair the catalog records.
     Important: the worked instance must be a pattern whose cross-classification
     indexing is itself surfaced in the literature, not a synthesis the project
     would be making. If the catalog's named patterns don't meet this bar, name
     a simpler literature-anchored recurrence instead (e.g., the same physical
     constant appearing in cells of two FCs where the literature has noted the
     correspondence).
   - M3: find_hosting or find_targeting on one totality-approach. Note the
     scope of structural commitments returned. The worked instance is the
     substrate's record of what the program claims; the testing move (whether
     the claims hold) is the physicist's.
   - M4: find_discriminating_experiments on one frontier (or find_resolvers
     if the worker's data-lagged state returns empty on the former).
     Note the program-level adjudication structure returned.
   Record what each query actually returns. The frame doc grounds in real
   queries, not hypotheticals.

3. Read PHYSICIST_FACING_VOCABULARY.md §3 in full. The frame doc carries both
   methodology-facing and physicist-facing prose; the physicist-facing
   paragraphs in each section must apply the vocabulary discipline.

4. Read META_v21_1_methodology_firewall.md §2 (the firewall principle and the
   §2.5 feedback-loop self-check) and apply the analogous self-check to each
   section of the frame doc as you draft it. For M2 and M3 in particular: is
   the prose in this section framing the substrate as making a claim, or as
   enabling a user move? The latter is the bar.

Then propose the frame doc outline (one paragraph per move, plus the closing
section naming the ordering principle, the substrate-contained / substrate-
enabled distinction, and the disciplines binding each layer) for maintainer
review before drafting the full text. Wait for confirmation before writing
the full doc.

Deliverable: /methodology/MENDELEEV_FRAME.md, 800–1500 words, structured per
MENDELEEV_POSITIONING_HANDOFF.md §4. Each section names whether the move is
substrate-contained or substrate-enabled; M2 / M3 sections explicitly frame
the substrate as enabling user work, not asserting project claims.
```

---

## 9. How this document is maintained

Same discipline as the other handoffs:

1. **The live system + the canonical data are authoritative**, not this document. §0 makes that explicit.
2. **When P0 ships**, §6 closes the P0 row and the handoff's working text references the shipped MENDELEEV_FRAME.md directly.
3. **When E0 and M0 ship**, §6 closes those rows; the explorer's first-ten-seconds surface and the MCP's `server_info` are verified Mendeleev-framed; the work transitions to the next-downstream concerns (E1–E5 Phase B+C surfacing per the explorer handoff; use-side artifacts per the Track 4 queue).
4. **When all of E0/M0/E1–E5/use-side artifacts ship**, this handoff transitions to "closed" status. The successor handoff (likely an outreach handoff, since Track 4 outreach is what this work is ultimately upstream of) takes over.

---

## 10. Quick reference — file locations

- This handoff: `/methodology/MENDELEEV_POSITIONING_HANDOFF.md`
- Upstream artifact (to be drafted in P0): `/methodology/MENDELEEV_FRAME.md`
- Companion handoff (E0 inserts before its E1): `/methodology/EXPLORER_PHASE_BC_HANDOFF.md`
- Companion handoff (data-side authoring continues in parallel): `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`
- Vocabulary discipline: `/methodology/PHYSICIST_FACING_VOCABULARY.md`
- Downstream queue: `/methodology/TRACK_4_USE_SIDE_ARTIFACTS.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- Project goal docs: `/methodology/PROJECT_GOAL.md`, `/methodology/PROJECT_GOAL_PHENOMENON_LAYER.md`, `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Explorer modules: `/explorer/Map_v34_explorer.html` + the ten companion files
- MCP worker source: `/mcp/worker.js`, `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, `/mcp/README.md`
- Canonical data: `/data/Map_v34_consolidated.json`

### Raw URLs for `web_fetch`

- Companion handoffs and methodology docs: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/{FILENAME}`
- Explorer modules: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/{FILENAME}`
- MCP worker skeleton: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker_skeleton.js`
- Canonical data: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`

---

*End of MENDELEEV_POSITIONING_HANDOFF.md, drafted 2026-05-28 in response to a test-chat exchange that surfaced the Mendeleev-positioning gap, and revised the same day to carry the literature-anchoring principle and the substrate-contained / substrate-enabled distinction (a maintainer call after a Mode-D substrate-authoring proposal in a parallel chat clarified that the project synthesizes only what the literature has synthesized; the positioning prose must reflect that discipline). The data layer already supports the four moves M1–M4; this workstream makes that support visible on the surfaces a fresh reader (human or AI) lands on first, in a way that honestly distinguishes what the map directly holds (M1, M4) from what the map enables the physicist to do (M2, M3). Upstream of Track 4 outreach and the use-side artifact queue. P0 drafts the canonical frame doc; E0 surfaces it on the explorer; M0 surfaces it on the MCP; both wind through the rest of the project's downstream sequence unchanged.*
