# Predictive Layer Phase B — handoff and process

**Purpose of this file.** Standing reference for anyone — the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo — who needs to pick up Phase B of the Predictive Layer mid-stream. Records current state, what's queued next, the operational norms that keep work moving, and the decisions made so far that aren't recoverable from the spec doc alone. Update this doc after every shipped step.

Location: `/methodology/PREDICTIVE_LAYER_PHASE_B_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_HANDOFF.md` (explorer build, active), `PREDICTIVE_LAYER_HANDOFF.md` (Phase A, closed — kept for reference and for the spec → schema → validator → authoring → MCP rebuild arc this phase mirrors), and `TRACKS_AFTER_PHASE_A.md` (the routing doc that queued this track). When subsequent tracks (Phase C, review pathway) activate, they get their own scoped handoffs.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live MCP server: `https://map-of-physics.eddie-8e5.workers.dev` — serving v40 / v16, 28 tools (since Phase A Step 8 deployment). Will be rebuilt against v17 in Phase B's final step.
The canonical data: `data/Map_v34_consolidated.json`, internal version `v40`. Server-verified counts: 71 nodes, 191 edges, 30 formal-classifications, 484 cells (376 realized + 22 forbidden-by-pattern + 86 indeterminate; 0 conjectured-by-pattern), 22 glossary entries, 7 experimental programs, 102 cross-classification edges (97 cross-FC + 5 closure-constraint self-edges), 10 edges with `axis_mapping` populated.
The current schema: `schema/Map_v16_schema.json`. The v17 schema will land in Step 2.
The current validator: implements Rules 1–23. Phase B adds Rules 24–26 enforcing the §3 firewall test from the scope memo and the target-id resolution from the v17 spec.
The Phase B scope memo: `methodology/PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` — landed in Step 0.
The Phase B v17 spec extension: `methodology/MAP_v17_schema_spec_extension.md` — landed in Step 1.
The goal doc: `methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md` — §2 Move 4 and §3.3 are the parent for `if_real_implies`.

Phase B implements the fourth Predictive Layer mechanism (`if_real_implies`) on `open-frontier` and `totality-approach` discourse-layer nodes. Phase A (covered by the closed `PREDICTIVE_LAYER_HANDOFF.md`) implemented the first three mechanisms (`constructive_status`, `forced_by`, `axis_mapping`) at the cell and cross-classification-edge level. Phase C (`quantitative_scale`, `resolves`) follows Phase B per the ordering committed in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §5 and `TRACKS_AFTER_PHASE_A.md`.

### Shipped milestones

- **Step 0 — scope memo.** `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` committed to `/methodology/`. Settles the five shape questions from the Track 2 sketch: (1) carrier-node types — `if_real_implies` is a field on `open-frontier` and `totality-approach` nodes only; (2) consequence kinds — five `kind` values (`new_cell`, `new_axis`, `forced_edge`, `promotes_subtype`, `new_FC`), no new edge subtype; (3) firewall admissibility test — three-part test (antecedent is a literature position, consequent is structural-by-derivation, both halves cite) binding for every authoring pass and required verbatim in the v17 spec; (4) relationship to `predictive_yield` — independent fields on disjoint node types, no bidirectional binding; (5) plurality semantics — array grouped by resolution, with the firewall test's two citation halves (`condition_citations`, `derivation_citations`) structurally separated in the data shape so the validator enforces the test. The grouping decision in (5) is the design choice that elevates the firewall test from self-check discipline to schema commitment. Scope memo is the orientation document for all subsequent Phase B authoring decisions, equivalent in role to `PROJECT_GOAL_PREDICTIVE_LAYER.md` for the layer as a whole.

- **Step 1 — v17 schema-spec extension.** `MAP_v17_schema_spec_extension.md` committed to `/methodology/`. Carries the scope memo's §3 firewall admissibility test verbatim in §4 (with the §2.5 self-check restated). Defines the `if_real_implies` field on `open-frontier` and `totality-approach` carriers (17 nodes: 11 open-frontier + 6 totality-approach per live MCP counts), two new `$defs` (`if_real_implies_entry`, `if_real_implies_implication`), four JSON-Schema conditional rules in §3 (one restricting `if_real_implies` to the carrier types, three governing the shape of `target` per `kind` — null for `new_FC`, non-null string for `new_cell`/`new_axis`/`promotes_subtype`, structured `{from, to, subtype}` triple for `forced_edge`), and three validator-side rules in §5 (Rules 24–26 continuing v16's Rule 23: target-id resolution per kind, resolution-uniqueness within a carrier, and the self-edge restriction on `forced_edge` mirroring Phase A's closure-constraint convention). Three grounded examples in §6 (muon-g-2's BSM-loop interpretation; hierarchy-problem's SUSY-at-TeV and composite-Higgs resolutions illustrating plurality; koide-formula as discrete-flavor-symmetry signal) drawn from carriers whose `candidate_targeting` already cites the relevant literature. No warning-level rule in Phase B by design — absence of `if_real_implies` entries reflects absence of citable evidence per the firewall, and a nudge would create pressure to author without citations. The v17 spec is the binding reference for the schema JSON (Step 2) and validator implementation (Step 3); it cannot be skipped or merged with Step 2.

### What's queued (live)

- **Step 2 — v17 schema JSON.** New file `schema/Map_v17_schema.json`, modelling on `Map_v16_schema.json`. Adds `$defs` for `if_real_implies_entry` and `if_real_implies_implication` per the spec §2; adds the `if_real_implies` property on the `open-frontier` and `totality-approach` node `$defs` (or on the parent node `$def` with conditional inclusion via `allOf` — whichever pattern matches the existing schema's handling of node-type-specific fields, the Step 2 chat must check `Map_v16_schema.json` first); adds the new `allOf` block on those node types implementing the §3 conditional rules from the spec; adds entries in `_validator_side_rules` for Rules 24–26. Validate against Draft 2020-12 metaschema. Run backward-compat against v40 data: every v40-conforming node must validate cleanly against v17 (the v16 → v17 transition is a strict additive ratchet, same pattern as v15.3 → v16). The 4 pre-firewall "constrains" edges continue to be tolerated. Diff shape: ~150–250 lines added over v16. Reuse the `compact_format.py` formatter pattern documented in Phase A's Step 2 lessons so git diff shows additions cleanly.

- **Step 3 — validator update.** Edit `scripts/validate.py`. Point `SCHEMA_PATH` at `schema/Map_v17_schema.json` (with v16 as fallback if the existing validator keeps a fallback chain — check the file first). Implement Rules 24–26 per spec §5: target id resolution (FC id for `new_cell`/`new_axis`, edge id or cell id for `promotes_subtype`, structured `{from, to, subtype}` triple for `forced_edge` with `from` and `to` resolving to existing FC ids, null for `new_FC`); resolution-uniqueness within a single carrier's `if_real_implies` array; `forced_edge` from/to FC ids distinct unless subtype is `specializes` (the closure-constraint self-edge convention). Smoke test: against v40 data (no `if_real_implies` populated yet), expected output is "0 new errors, 0 new warnings" — the v16 → v17 transition is strictly additive, so v40 validates cleanly. Negative smoke tests: deliberately authored bad entries fire the expected new rules.

- **Steps 4–N — authoring sweeps.** Per-carrier passes against the 17 nodes (11 open-frontier + 6 totality-approach). The TRACKS doc Track 2 estimate names "roughly 6–10 numbered steps" total for Phase B; subtracting Steps 0–3 + the MCP rebuild leaves 2–6 authoring steps. The natural split is by subfield per spec §9.2: one sweep for hep-ph carriers (hierarchy-problem, strong-cp-problem, flavor-puzzle, matter-antimatter-asymmetry, muon-g-2), one for cosmology / QG (qg-frontier, cc-frontier, bh-info-paradox, dark-matter, bh-thermodynamics, cosmological-models), one for foundations (measurement-problem, koide-formula), one for condensed-matter / continuum (topological-phases-classification, ns-regularity, turbulence, chpt). Each sweep applies the scope memo §3 admissibility test entry-by-entry, records the §2.5 self-check in the PR description, and authors entries only where both citation halves are available. Subfield-specialist review desirable on contested entries but not blocking — the firewall test gates admissibility; expert review gates content quality, downstream of the MCP rebuild.

- **Step N+1 — MCP worker rebuild.** Worker rebuilt against v17 schema and updated v40 data, with new tool `find_signal_implications(carrier_id, resolution_id?)` and extension of `find_loose_ends` to surface `if_real_implies` entries. Cloudflare redeploy per `PROJECT_INFRASTRUCTURE.md` §3. Models on Phase A's Step 8 (the worker rebuild that landed `find_forced_cells`, `get_forcing_constraint`, `get_axis_mapping` and the `find_cells` extension). After this step, Phase B is complete and the on-target test in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6.2 ("Test 6.2 — What does a live anomaly imply structurally?") becomes runnable.

After Step N+1, Phase B is closed. Phase C (`quantitative_scale`, `resolves`) is queued next per `TRACKS_AFTER_PHASE_A.md` Track 3.

---

## Working norms

Carry forward from `PREDICTIVE_LAYER_HANDOFF.md` and `TRACKS_AFTER_PHASE_A.md`:

- **Non-developer maintenance.** All deployment via GitHub web UI and Cloudflare web editor. No git CLI, no local dev environment, no `npm` or `wrangler`.
- **Project files are for stable reference material.** This handoff and the scope memo go in project knowledge. Don't attach large schemas, datasets, or worker source to project knowledge — fetch via `web_fetch` instead.
- **CI gates PRs to data + schema.** Methodology docs (this handoff, the scope memo, the v17 spec) commit directly to `main` without CI gating. Data and schema PRs must pass `scripts/validate.py`.
- **The firewall is binding, and Phase B's admissibility test is binding within it.** `META_v21_1_methodology_firewall.md` is the parent; the scope memo §3 / v17 spec §4 three-part test is Phase B's operationalization. The v17 spec includes the test verbatim; every authoring step records the §2.5 self-check in the PR description. Phase B authoring cannot start until Steps 1–3 (spec, schema, validator) are in place.
- **MCP is the inspection surface.** The 28 v40/v16 tools are the fast path for inspecting dataset state. The data file is 1.49 MB which exceeds the github.com blob fallback size limit; raw CDN or MCP for inspection.
- **Existing content is load-bearing.** Cell content, axis labels, citation text, edge descriptions, status fields are not paraphrased in commits or code. Frontier and totality-approach node fields (`candidate_targeting`, `equations`, `loose_ends`, `description`, `empirical_status`) are similarly load-bearing — Phase B adds the `if_real_implies` field; it does not rewrite the existing fields.
- **Use physics vocabulary.** User-stated principle. Don't coin presentation terms when the data already names a thing.

---

## How to start a new chat on this work

Project files auto-attach when a fresh chat opens in the Claude project. To resume:

1. Open a fresh chat in the project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, the scope memo, the v17 spec extension, `TRACKS_AFTER_PHASE_A.md`, `PREDICTIVE_LAYER_HANDOFF.md` (closed but kept for reference), `EXPLORER_HANDOFF.md`, `PROJECT_GOAL.md`, `PROJECT_GOAL_SUPPLEMENT.md`, `PROJECT_GOAL_PHENOMENON_LAYER.md`, `PROJECT_GOAL_PREDICTIVE_LAYER.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, `MAP_v16_schema_spec_extension.md`.
3. Tell it which step the work resumes at — e.g., *"Pick up at Step 2, the v17 schema JSON. Fetch Map_v16_schema.json first to mirror its node-type-specific-field handling, then implement against MAP_v17_schema_spec_extension.md."*
4. The chat fetches code, data, and schema from GitHub via `web_fetch`. Raw URLs in the Quick reference below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats. If the assistant doesn't see them, ask it to call `tool_search` with keyword `"map of physics"`. **Important:** the connector serves v40 / v16 (28 tools) until Phase B's MCP rebuild lands. Any v17-specific queries (`find_signal_implications`) have no tool yet — the v17 field is queryable only by parsing the data file directly once authoring begins.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev` (v40 / v16, 28 tools)
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- Phase B scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`
- Phase B v17 spec extension: `/methodology/MAP_v17_schema_spec_extension.md`
- This handoff: `/methodology/PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`
- Routing doc: `/methodology/TRACKS_AFTER_PHASE_A.md`
- Closed Phase A handoff: `/methodology/PREDICTIVE_LAYER_HANDOFF.md`
- Companion explorer handoff: `/methodology/EXPLORER_HANDOFF.md`
- Predictive layer goal: `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- v16 schema (current): `/schema/Map_v16_schema.json`
- v16 spec extension: `/methodology/MAP_v16_schema_spec_extension.md`

### Raw URLs for `web_fetch`

- v16 schema: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v16_schema.json`
- v16 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v16_schema_spec_extension.md`
- v17 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v17_schema_spec_extension.md`
- Predictive layer goal: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Phase B scope memo: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`
- TRACKS routing doc: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/TRACKS_AFTER_PHASE_A.md`
- Validator: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/scripts/validate.py`
- CI workflow: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/.github/workflows/validate.yml`
- v40 data (1.49 MB — exceeds github.com blob fallback size limit, use raw CDN or MCP): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
- MCP worker source: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker.js`

---

*End of PREDICTIVE_LAYER_PHASE_B_HANDOFF.md, v2 (Steps 0–1 shipped — scope memo settles the five shape questions; v17 spec extension defines the `if_real_implies` field and carries the firewall admissibility test verbatim. Step 2 (schema JSON) is next). Update after every shipped step.*
