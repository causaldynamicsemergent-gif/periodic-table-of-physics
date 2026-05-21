# Predictive Layer Phase C — handoff and process

**Purpose of this file.** Standing reference for anyone — the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo — who needs to pick up Phase C of the Predictive Layer mid-stream. Records current state, what's queued next, the operational norms that keep work moving, and the decisions made so far that aren't recoverable from the scope memo alone. Update this doc after every shipped step.

Location: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_HANDOFF.md` (explorer build, active), `PREDICTIVE_LAYER_HANDOFF.md` (Phase A, closed), `PREDICTIVE_LAYER_PHASE_B_HANDOFF.md` (Phase B, closed — kept for reference and for the spec → schema → validator → authoring → MCP rebuild arc this phase mirrors), and `TRACKS_AFTER_PHASE_A.md` (the routing doc that queued this track). When subsequent tracks (review pathway, Phase B/C explorer surfacing) activate, they get their own scoped handoffs.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live MCP server: `https://map-of-physics.eddie-8e5.workers.dev` — serving v40 / v17 / Phase B, 29 tools (since Phase B Step N+1 deployment). Will be rebuilt against v18 in Phase C's final step.
The canonical data: `data/Map_v34_consolidated.json`, internal version `v40`. Counts: 71 nodes, 191 edges, 30 formal-classifications, 484 cells, 22 glossary entries, 7 experimental programs, 102 cross-classification edges. Phase B added 23 `if_real_implies` resolutions on 14 of 17 carriers, 24 implications total. Phase C adds nothing to v40 directly; the v40 → v41 bump lands during the Step 0.5 inventory pass.
The current schema: `schema/Map_v17_schema.json`. The v18 schema will land in Step 1.
The current validator: implements Rules 1–26. Phase C adds Rules 27+ enforcing the §4 firewall test from the scope memo and the target-type resolution on `resolves` edges.
The Phase C scope memo: `methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` — landed in Step 0.
The goal doc: `methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md` — §2 Moves 2 + 5 and §3.4 + §3.5 are the parent for `quantitative_scale` and `resolves`.

Phase C implements the final two Predictive Layer mechanisms: `quantitative_scale` (Mechanism #1, structured numerical commitments on frontier nodes, cells, predictions, `bears-on` edges, and Phase B's `if_real_implies` implications), and `resolves` (Mechanism #6, a new edge type from experimental-program nodes to cells and frontiers with sensitivity, timeline, and per-program predictions). Phase C closes the Predictive Layer. The maintainer's call in `TRACKS_AFTER_PHASE_A.md` is to complete Phase C before opening the review pathway (Track 4).

### Shipped milestones

- **Step 0 — scope memo.** `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` committed to `/methodology/`. Settles six decisions: (1) `quantitative_scale` is a permitted optional field on five distinct surfaces (frontier nodes, cells, predictions, `bears-on` edges, `if_real_implies` implications) with uniform structure; (2) `quantitative_scale` is a structured object with `kind` discriminator (eight values: `energy_scale`, `mass`, `length`, `time`, `ratio`, `coupling`, `dimensionless`, `sigma_deviation`), `value`, `units` (required for dimensional kinds, forbidden for dimensionless), optional symmetric or asymmetric `uncertainty`, optional `log10`, required `citations` (`minItems: 1`); (3) `resolves` is a separate edge type (NOT a strengthening of `bears-on:partially-solves`) with source typed to `experimental-program`, target either cell-id or frontier/totality-approach id, `predictions_per_program` as the load-bearing discriminator substructure, `timeline` enum with six values, no migration of existing edges; (4) firewall admissibility test — three-part test (value is a literature value, per-program predictions are program-internal calculations, sensitivities cite the experimental design) binding for every Phase C authoring pass and required verbatim in the v18 spec; (5) `quantitative_scale` is orthogonal to Phase A's `constructive_status` and composes cleanly with Phase B's `if_real_implies` implications (the natural locus for forward-looking quantitative claims); (6) **the experimental-program inventory gap** — the 7 existing experimental-program nodes are all historical SM-particle-discovery collaborations; `resolves` edges have no source-end nodes to attach to until forward-looking experimental-program nodes are authored. Memo introduces Phase C Step 0.5 to close this gap before any `resolves` authoring begins. Scope memo is the orientation document for all subsequent Phase C authoring decisions.

### What's queued (live)

- **Step 0.5 — experimental-program inventory pass.** A focused authoring sweep adds forward-looking experimental-program nodes to v40. Minimum-viable inventory: 8–15 nodes. Indicative candidates (none committed; each requires its own §4 admissibility check before authoring): DUNE, Hyper-Kamiokande, JUNO, LISA, future ground-based GW detectors (Cosmic Explorer / Einstein Telescope), CMB-S4 / LiteBIRD / Simons Observatory, Vera Rubin Observatory (LSST), axion haloscopes (ADMX, HAYSTAC, MADMAX), EDM experiments (nEDM at PSI/SNS, electron EDM at JILA), future g-2 (Muon g-2 continuation, J-PARC g-2), FCC, future proton-decay successors. Each node follows the existing `experimental-program` schema: id, label, subtype, operational_period, host_institutions, key_publications or design_reports, produced_classifications (often null for forward-looking experiments). The pass is mechanical against existing schema (no schema bump required); the §4 firewall test applies (each node cites a design report or proposal). This is the first Phase C authoring step and can land against the current v17 schema. The data version increments v40 → v41 during this step.

- **Step 1 — v18 schema-spec extension.** New file `methodology/MAP_v18_schema_spec_extension.md`. Defines the `quantitative_scale` field per scope memo §2 and the `resolves` edge type per §3. Carries the scope memo's §4 firewall admissibility test verbatim. Models on `MAP_v17_schema_spec_extension.md`. Includes JSON-Schema conditional rules for the `kind` taxonomy (units required for the dimensional kinds, units forbidden for `dimensionless` / `coupling` / `ratio` / `sigma_deviation`; `log10` permitted only on the six kinds where it's meaningful), the `resolves` edge shape (source typed to `experimental-program`, target resolved against the appropriate type table per the target's class), and a `predictions_per_program` either-non-empty-or-exclusion-only-with-citation rule. Validator-side rules (Rules 27+) cover citation presence, units conformance per kind, and target-id resolution. Grounded examples in the spec should be drawn from carriers and experimental programs that exist after Step 0.5 lands — so Step 0.5 should precede Step 1 to give the spec authoritative examples.

- **Step 2 — v18 schema JSON.** New file `schema/Map_v18_schema.json`, modelling on `Map_v17_schema.json`. Adds `$defs` for `quantitative_scale` and the `resolves` edge body; adds the `quantitative_scale` property to all five carrier surfaces from scope memo §1; adds the new `allOf` blocks implementing the §2 and §3 conditional rules; adds entries in `_validator_side_rules` for the new rules. Validate against Draft 2020-12 metaschema. Run backward-compat against the data state after Step 0.5 (whatever v41 becomes): every conforming node must validate cleanly. The v17 → v18 transition is a strict additive ratchet, same pattern as v15.3 → v16 → v17. The 4 pre-firewall "constrains" edges continue to be tolerated. Reuse the `compact_format.py` formatter pattern.

- **Step 3 — validator update.** Edit `scripts/validate.py`. Point `SCHEMA_PATH` at `schema/Map_v18_schema.json`. Implement Rules 27+ per spec §5: citation presence on every `quantitative_scale` and every `predictions_per_program` entry; units required/forbidden per kind; `log10` permitted only on the six kinds where meaningful; `resolves` edge source must be `experimental-program`; `resolves` edge target id must resolve to a cell or open-frontier or totality-approach node. Smoke test: against the data state after Step 0.5 (no `quantitative_scale` or `resolves` populated yet), expected output is "0 new errors, 0 new warnings" — the v17 → v18 transition is strictly additive. Negative smoke tests: deliberately authored bad entries fire the expected new rules.

- **Steps 4–N — authoring sweeps.** Five passes per scope memo §7, ordered:
  - 4.1 — `quantitative_scale` on all 17 open-frontier and totality-approach nodes (frontier-level scales).
  - 4.2 — `quantitative_scale` on the 223 predictions where numerical content is citable.
  - 4.3 — `quantitative_scale` on cells where mass / coupling / numerical content is the load-bearing claim (estimated subset ~50–100 cells out of 484).
  - 4.4 — `resolves` edges from each Step-0.5-authored experimental-program node to its target cells and frontiers, with `predictions_per_program` populated where candidate programs make discriminating predictions.
  - 4.5 — `quantitative_scale` on `if_real_implies` implications where consequences are quantitative (subset of the 24 implications in v40).

  Each sweep applies the scope memo §4 admissibility test entry-by-entry, records the §2.5 self-check in the PR description, and authors entries only where the citations the test requires are available. Subfield-specialist review desirable on contested predictions and contested sensitivities but not blocking — the firewall test gates admissibility; expert review gates content quality, downstream of the MCP rebuild.

- **Step N+1 — MCP worker rebuild.** Worker rebuilt against v18 schema and updated v40+ data, with new tools `rank_by_scale(node_type, kind)`, `find_resolvers(cell_or_frontier_id)`, `find_discriminating_experiments(program_a, program_b)`, and extension of `find_predictions` and `get_node` to surface `quantitative_scale`. The `find_discriminating_experiments` tool is the flagship AI-first query per `PROJECT_GOAL_SUPPLEMENT.md` §1.2 — given two candidate programs targeting the same frontier, return every experiment that would distinguish them with documented sensitivity. Worker source already in repo at `/mcp/worker.js` per Phase B's closing infrastructure work; rebuild flow is documented in `/mcp/README.md`. Cloudflare redeploy per `PROJECT_INFRASTRUCTURE.md` §3. After this step, Phase C is complete and on-target tests 6.3, 6.4, 6.5 in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6 become runnable (6.1 and 6.2 already runnable post-Phase-B).

After Step N+1, Phase C is closed and the Predictive Layer is complete. Track 4 (review pathway) is queued next per `TRACKS_AFTER_PHASE_A.md`.

---

## Working norms

Carry forward from `PREDICTIVE_LAYER_PHASE_B_HANDOFF.md` and `TRACKS_AFTER_PHASE_A.md`:

- **Non-developer maintenance.** All deployment via GitHub web UI and Cloudflare web editor. No git CLI, no local dev environment, no `npm` or `wrangler`.
- **Project files are for stable reference material.** This handoff and the scope memo go in project knowledge. Don't attach large schemas, datasets, or worker source to project knowledge — fetch via `web_fetch` instead.
- **CI gates PRs to data + schema.** Methodology docs (this handoff, the scope memo, the v18 spec) commit directly to `main` without CI gating. Data and schema PRs must pass `scripts/validate.py`.
- **The firewall is binding, and Phase C's admissibility test is binding within it.** `META_v21_1_methodology_firewall.md` is the parent; the scope memo §4 / v18 spec §4 three-part test is Phase C's operationalization. The v18 spec includes the test verbatim; every authoring step records the §2.5 self-check in the PR description. Phase C authoring beyond Step 0.5 cannot start until Steps 1–3 (spec, schema, validator) are in place; Step 0.5 itself can land against the existing v17 schema.
- **The MCP source is in the repo.** Per Phase B's closing work, `/mcp/worker.js`, `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, and `/mcp/README.md` are version-controlled. The Phase C Step N+1 rebuild edits the skeleton, not the bundled artifact.
- **Existing content is load-bearing.** Cell content, axis labels, citation text, edge descriptions, status fields, frontier and totality-approach node fields (`candidate_targeting`, `equations`, `loose_ends`, `description`, `empirical_status`), and Phase B's `if_real_implies` entries are not paraphrased in commits or code. Phase C adds the `quantitative_scale` field and `resolves` edges; it does not rewrite existing fields.
- **Use physics vocabulary.** User-stated principle. Don't coin presentation terms when the data already names a thing.

---

## How to start a new chat on this work

Project files auto-attach when a fresh chat opens in the Claude project. To resume:

1. Open a fresh chat in the project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, the Phase C scope memo, `PREDICTIVE_LAYER_PHASE_B_HANDOFF.md` (closed but kept for reference), `EXPLORER_HANDOFF.md`, `TRACKS_AFTER_PHASE_A.md`, `PROJECT_GOAL.md`, `PROJECT_GOAL_SUPPLEMENT.md`, `PROJECT_GOAL_PHENOMENON_LAYER.md`, `PROJECT_GOAL_PREDICTIVE_LAYER.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, `MAP_v16_schema_spec_extension.md`, `MAP_v17_schema_spec_extension.md`.
3. Tell it which step the work resumes at — e.g., *"Pick up at Step 0.5 from PREDICTIVE_LAYER_PHASE_C_HANDOFF.md: the experimental-program inventory pass. Start by fetching the scope memo and reading §6 for the indicative candidate list, then propose 8–12 nodes with citation candidates before authoring any entries."*
4. The chat fetches code, data, and schema from GitHub via `web_fetch`. Raw URLs in the Quick reference below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats. If the assistant doesn't see them, ask it to call `tool_search` with keyword `"map of physics"`. **Important:** the connector now serves v40 / v17 / Phase B (29 tools). Any v18-specific queries (`rank_by_scale`, `find_resolvers`, `find_discriminating_experiments`) have no tool yet — the v18 fields are queryable only by parsing the data file directly once authoring begins.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev` (v40 / v17 / Phase B, 29 tools)
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- Phase C scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`
- This handoff: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`
- Closed Phase B handoff: `/methodology/PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`
- Closed Phase A handoff: `/methodology/PREDICTIVE_LAYER_HANDOFF.md`
- Phase B scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`
- Routing doc: `/methodology/TRACKS_AFTER_PHASE_A.md`
- Companion explorer handoff: `/methodology/EXPLORER_HANDOFF.md`
- Predictive layer goal: `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- v17 schema (current): `/schema/Map_v17_schema.json`
- v17 spec extension: `/methodology/MAP_v17_schema_spec_extension.md`
- MCP worker source: `/mcp/worker.js`, `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, `/mcp/README.md`

### Raw URLs for `web_fetch`

- v17 schema: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v17_schema.json`
- v17 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v17_schema_spec_extension.md`
- Predictive layer goal: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Phase C scope memo: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`
- Phase B scope memo: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`
- TRACKS routing doc: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/TRACKS_AFTER_PHASE_A.md`
- Validator: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/scripts/validate.py`
- CI workflow: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/.github/workflows/validate.yml`
- v40 data (1.49 MB — exceeds github.com blob fallback size limit, use raw CDN or MCP): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
- MCP worker source: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker.js`
- MCP worker skeleton (the edit point): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker_skeleton.js`

---

*End of PREDICTIVE_LAYER_PHASE_C_HANDOFF.md, v1 (Step 0 shipped — scope memo settles the six shape decisions and identifies the experimental-program inventory gap. Step 0.5 (forward-looking experimental-program nodes) is next, modelled on Phase B's authoring pattern). Update after every shipped step.*
