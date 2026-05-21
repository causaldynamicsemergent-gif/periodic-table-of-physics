# Predictive Layer Phase A — handoff and process

**Purpose of this file.** Standing reference for anyone — the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo — who needs to pick up Phase A of the Predictive Layer mid-stream. Records current state, what's queued next, the operational norms that keep work moving, and the decisions made so far that aren't recoverable from the spec doc alone. Update this doc after every shipped step.

Location: `/methodology/PREDICTIVE_LAYER_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_HANDOFF.md` (which covers the explorer build). The explorer and the Predictive Layer evolve on independent tracks: the explorer keeps working through the v16 schema bump because the bump is forward-compatible (per the risk-spot audit recorded in this file's §"Lessons from Steps 0–2"). The Predictive Layer work happens primarily in the schema, the validator, the data, and the MCP worker — surfaced in the explorer later.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live MCP server: `https://map-of-physics.eddie-8e5.workers.dev` — **still serving v15.3 / v34**. The worker rebuild against v16 schema is Step 8 of this build.
The canonical data: `data/Map_v34_consolidated.json` — 71 nodes, 186 edges, 30 FCs, 97 cross-classification edges, 484 cells. The `_meta._schema` field reads `"Map_v16_schema.json"` (labeling drift that predated the v16 work; now resolved as of Step 2).
The v16 schema: `schema/Map_v16_schema.json` — landed in Step 2.
The v16 spec: `methodology/MAP_v16_schema_spec_extension.md` — landed in Step 1.
The goal doc: `methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md` — landed in Step 0.

The Predictive Layer is an additive layer on top of the existing structural + phenomenon layers documented in `PROJECT_GOAL.md`, `PROJECT_GOAL_SUPPLEMENT.md`, and `PROJECT_GOAL_PHENOMENON_LAYER.md`. The goal doc adds four Mendeleev-style "moves" (forcing of cells, structurally-excluded cells made first-class, axis-mapping declarations, if-real implications), explicitly excluding cellification of architectures (out of scope per §4). Phase A covers the first three moves at the cell and cross-classification-edge level. Phase B (`if_real_implies`) and Phase C (`quantitative_scale`, `resolves` edge type) are deferred; this handoff covers only Phase A.

### Shipped milestones

- **Step 0 — goal doc.** `PROJECT_GOAL_PREDICTIVE_LAYER.md` committed to `/methodology/`. Establishes the Predictive Layer's four mechanisms, the Phase A → B → C ordering, and the §4 scope boundary (no architecture cellification). Five on-target tests (§6 of the doc) are the falsifiable conditions for the layer succeeding. The doc is the orientation document for all subsequent Predictive Layer authoring decisions — equivalent in role to `PROJECT_GOAL_PHENOMENON_LAYER.md` for the phenomenon layer.

- **Step 1 — v16 schema spec.** `MAP_v16_schema_spec_extension.md` committed to `/methodology/`. Defines the three new fields (`constructive_status` and `forced_by` on cells; `axis_mapping` on cross-classification edges), the four JSON-Schema conditional rules (§5.1–§5.4), the five validator-side rules (Rules 19–23 continuing the v15.3 sequence), the four-bucket migration plan for the existing 484 cells, and the explicit out-of-scope list. Includes the closure-constraint workaround for Bucket 1 (SM structurally-excluded cells encoded as self-edges with `subtype: specializes`). Spec doc is the binding reference for the schema JSON and validator implementation.

- **Step 2 — v16 schema JSON.** `Map_v16_schema.json` committed to `/schema/`. Three new `$defs` (`constructive_status`, `forced_by_entry`, `axis_mapping_entry`), two new cell properties, one new edge property, new `allOf` block on cell with §5.1 and §5.2, two new entries on edge `allOf` for §5.3 and §5.4, five new entries in `_validator_side_rules`. Validated against Draft 2020-12 metaschema. **29/29 unit tests pass** covering backward-compat (4 tests), acceptance of valid v16 shapes (7 tests), rejection of invalid v16 shapes (16 tests), and design corners (2 tests). **Real-data backward-compat against v34**: 484 cells and 71 nodes validate cleanly; 4 edge failures are the documented pre-firewall "constrains" carryover that already fails v15.3 — zero new errors introduced. File is 934 lines (~148 lines over v15.3's 786), formatted to match v15.3's hand-curated compact-when-possible style so git diff shows the additions, not formatting churn.

### What's queued (live)

- **Step 3 — validator extension.** `/scripts/validate.py` needs to point at `Map_v16_schema.json` (currently points at `Map_v15_3_schema.json`) and implement Rules 19–23. The sketch in §"Step 3 sketch" below has the specifics.
- **Step 4 — Bucket 2 + Bucket 4 backfill.** Backfill `constructive_status` across all 484 cells using `realized` for cells with `realized_examples` non-empty or confirmed predictions, and either `indeterminate` or field-absent for cells with neither (equivalent under the spec). Mechanical authoring; one PR.
- **Step 5 — ADE-clique `axis_mapping` decoration.** Substantive authoring sweep over the five ADE-connected classifications (`modular-tensor-categories`, `ade-lie-algebras`, `ade-modular-invariants`, `ade-quivers`, `ade-du-val`). The highest-leverage Phase A authoring per the spec §1 and the goal doc §5.
- **Step 6 — Bucket 3 backfill.** SU(5)-GUT cells (X/Y bosons, monopoles, proton-decay channels) get `constructive_status: conjectured-by-pattern` plus `forced_by` referring to the SM↔SU(5) cross-classification edge. Smaller-scale than Step 5; one PR.
- **Step 7 — Bucket 1 backfill.** The 17 SM structurally-excluded cells get `constructive_status: forbidden-by-pattern` plus closure-constraint self-edges. Heaviest Phase A authoring lift; benefits from Steps 3–6 landing first because the closure-constraint pattern can be tested against the validator at small scale before being applied at SM scale.
- **Step 8 — MCP worker rebuild.** Worker rebuilt against v16 schema and updated v34 data, with new tools (`find_forced_cells`, `get_forcing_constraint`, `get_axis_mapping`) and the `find_cells` extension to accept a `constructive_status` filter. Cloudflare redeploy per `PROJECT_INFRASTRUCTURE.md` §3. This is the step that makes Phase A's content queryable by AI sessions through the MCP connector — the AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2 lands its first concrete deliverable.

After Step 8, Phase A is complete. Decisions about Phase B (`if_real_implies`) and Phase C (`quantitative_scale`, `resolves`) get their own spec extensions and handoffs.

---

## How to start a new chat on this work

Project files are auto-attached when you open a new chat in the Claude project. To resume cleanly:

1. Open a fresh chat in the project.
2. Confirm the assistant can list `/mnt/project/` — should include `PREDICTIVE_LAYER_HANDOFF.md`, `MAP_v16_schema_spec_extension.md`, `PROJECT_GOAL_PREDICTIVE_LAYER.md`, plus the standing methodology docs (`PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, `EXPLORER_HANDOFF.md`).
3. Tell it which step the work resumes at — e.g., *"Pick up at Step 3 of PREDICTIVE_LAYER_HANDOFF.md, the validator extension."*
4. The chat fetches files from GitHub via `web_fetch` as needed. Raw URLs are in the "Quick reference" section at the bottom.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats. If the assistant doesn't see them, ask it to call `tool_search` with the keyword *"map of physics"*. **Important:** the connector is still serving v15.3 / v34 until Step 8. Any v16-specific queries (e.g., "find forced cells") have no tool yet — until Step 8, the v16 fields are queryable only by parsing the data file directly.

If `web_fetch` rejects a raw GitHub URL it tries (the tool whitelists URLs seen in prior search results; fresh chats start empty), the fallback is `bash` + `curl` to `https://github.com/.../blob/main/...`, then parse the embedded JSON. The reusable pattern is documented in `EXPLORER_HANDOFF.md` lessons section. Current path inside the blob HTML payload: `data["payload"]["codeViewBlobLayoutRoute.StyledBlob"]["rawLines"]`. Works for files up to ~500 KB; the 1.37 MB `Map_v34_consolidated.json` exceeds that and requires the raw CDN or the MCP server.

---

## What was decided in Steps 0–2

Decisions that are NOT recoverable from the spec doc alone — captured here so a fresh chat doesn't re-litigate them.

### Spec design decisions locked in

- **`forced_by` is an array, not a single edge_id.** A cell can be forced by multiple constraints simultaneously. Recording all is more informative than picking one. `minItems: 1`, no upper bound. Order is not significant.
- **`forced_by_entry.kind` is a discriminator enum closed to `["edge"]` in Phase A.** Reserved for `"closure_constraint"` later. Authors cannot invent new `kind` values; Rule 19 will reject them. Phase A uses edges to represent closure constraints (the SM structurally-excluded workaround in §7.2 Bucket 1 of the spec).
- **`axis_mapping` is declared on the edge, not computed.** Hardlined per `PROJECT_GOAL_PREDICTIVE_LAYER.md` §3.2. Future Phase A+ chats must not propose axis-equivalence inference; the substantive correspondence claim belongs to the edge author.
- **`axis_mapping` is optional everywhere, including on bijection and categorically-equivalent edges.** The schema-level requirement was rejected because some bijection edges land in `partial` or `aspired` status where the mapping itself is what's being worked out. Rule 22 is a validator-side **warning**, not a schema-level error, so the schema bump doesn't break CI on day one before Step 5's authoring sweep runs.
- **Schema-level `additionalProperties: false` on cells preserved.** New v16 fields are declared explicitly; the strictness stays. Future Phase B/C fields on cells will need explicit declaration too — they cannot rely on `additionalProperties: true`.
- **The v15.3 → v16 transition is a one-way ratchet.** Every v15.3-conforming data file is also v16-conforming because all Phase A fields are optional. Rollback to v15.3 would be a no-op (v15.3 is a strict subset of v16-conforming data). This pattern matches the v14 → v15 transition.

### Worth-knowing about the v34 data

- **The data file's `_meta._schema` field already said `"Map_v16_schema.json"`** before v16 existed. Labeling drift that predated the work. As of Step 2, the label finally matches reality. A future schema bump should expect to update this field too.
- **4 pre-firewall legacy edges use `subtype: "constrains"`** — not in the v15.3 OR v16 enum (`bijection`, `derives-from`, `categorically-equivalent`, `specializes`, `composition`). `PROJECT_INFRASTRUCTURE.md` §2 explicitly tolerates them. **Do not "fix" them by adding `constrains` to the enum;** the project policy is to leave them as known legacy errors. They appear in both v15.3 and v16 validation output as 4 schema errors that are ignored by CI thresholds. The 4 edges are: `edge-xc-mtc-constrains-bootstrap`, `edge-xc-symtft-constrains-bootstrap`, `edge-xc-symtft-constrains-hcb`, `edge-xc-mtc-constrains-fqh`.
- **484 cells total** across the 30 FCs. Migration breakdown per spec §7.2:
  - Bucket 2 (`realized`): cells with `realized_examples` non-empty OR a confirmed prediction. Probably the majority — every populated SM cell, every populated FQH cell, every concrete neutron-star instance, etc.
  - Bucket 4 (`indeterminate`) or field absent: cells whose content prose is a category placeholder with no realized examples and no forcing edge. Likely the smaller residual bucket.
  - Bucket 3 (`conjectured-by-pattern`): SU(5)-GUT X/Y bosons (predicted-but-unobserved), monopoles, predicted proton-decay channels. Small set, well-defined.
  - Bucket 1 (`forbidden-by-pattern`): the 17 SM cells with content prose mentioning "structurally-excluded" (right-handed singlet neutrino, color-singlet quark, lepton-doublet color-triplet, etc.). Defined in the spec but requires closure-constraint authoring per the Bucket 1 workaround.

### File facts from Step 2

- v15.3 schema: 786 lines, ~30 KB
- v16 schema: 934 lines, ~38 KB (delta ~148 lines for 3 new `$defs` + 4 new conditional rules + 5 new validator-side rules + metadata)
- Spec doc: ~27 KB
- Goal doc: ~28 KB
- Unit-test coverage: 29 assertions covering schema self-validity, backward-compat, valid v16 shape acceptance, invalid v16 shape rejection, design-corner cases. Real-data validation against v34 data: 484 cells + 71 nodes pass.

---

## Step 3 sketch: validator extension

**File:** `/scripts/validate.py`

**Current behavior** (v15.3): loads `schema/Map_v15_3_schema.json`, runs `Draft202012Validator` over the consolidated dataset, prints errors and exits non-zero on failure. Implements validator-side Rules 4–14 as Python functions. Tolerates the 4 pre-firewall "constrains" errors as carryover (the validator probably has an allowlist for legacy errors, or thresholds the error count; either pattern is acceptable). **The Step 3 chat must fetch the current `validate.py` first** before editing — this handoff doesn't include its current source.

**Phase A changes required:**

1. **Point at v16 schema.** `SCHEMA_PATH = 'schema/Map_v16_schema.json'`. If the current validator keeps v15.3 as fallback, the path can be a list with v16 first.

2. **Implement Rule 19** — `forced_by[].edge_id` resolves to an edge. For every cell with `forced_by` present, every `edge_id` MUST match the `id` of some edge in the `edges` array. Failure level: **error**.

3. **Implement Rule 20** — Forcing edge has applicable subtype. For every `forced_by[].edge_id`, the referenced edge MUST have `type='cross-classification'` and `subtype ∈ {bijection, categorically-equivalent, derives-from}`. The `specializes` and `composition` subtypes do not force cells. Failure level: **error**.

4. **Implement Rule 21** — Forcing edge connects to host classification. For every `forced_by[].edge_id` on a cell hosted by formal-classification node F, the referenced edge's `from` or `to` MUST equal `F.id`. Failure level: **error**.

5. **Implement Rule 22** — Established bijection / categorically-equivalent edges SHOULD carry `axis_mapping`. For every cross-classification edge with `subtype ∈ {bijection, categorically-equivalent}` and `status='established'` (or `status` absent, since `established` is the default), `axis_mapping` SHOULD be present. Failure level: **warning, not error**. **This is the only warning-level rule in Phase A.** Intentionally warning so the schema bump doesn't break CI on day one before Step 5's authoring sweep runs. Expected warning count against the current v34 dataset is the count of v34's established bijection + categorically-equivalent edges (a quick MCP query can confirm exactly how many; the v34 cumulative count includes the McKay, Brieskorn, Gabriel, Cappelli-Itzykson-Zuber, Du Val, and related edges in the ADE clique).

6. **Implement Rule 23** — `axis_mapping` axis names resolve. For every `axis_mapping[]` entry on an edge from F1 to F2, `from_axis` MUST appear as the `name` of some entry in `F1.classification_axes`; `to_axis` MUST appear similarly in `F2.classification_axes`. Failure level: **error**. Note: the `classification_axes` entries have a `name` field per the v15.3 schema; the Step 3 chat should confirm by inspecting a sample FC node before implementing.

**Smoke test for Step 3.** The validator should:

- Print "0 errors, N warnings" against the live v34 dataset (where N = the count of v34 established bijection + categorically-equivalent edges that lack `axis_mapping`, plus possibly the 4 legacy "constrains" errors depending on how the current validator counts them — confirm against current `validate.py` semantics).
- Fail on a deliberately-malformed test case (cell with `constructive_status: conjectured-by-pattern` and no `forced_by`).
- Fail on a cell whose `forced_by[0].edge_id` points to a non-existent edge.
- Fail on a cell whose `forced_by[0].edge_id` points to an edge with `subtype: specializes`.
- Fail on an axis_mapping whose `from_axis` is misspelled relative to the source FC's axes.

A dev-only smoke-test script (matching the explorer's JSDOM pattern: not committed to repo, lives in `/home/claude/...` of the Step 3 chat) is the recommended sanity-check pattern. The CI itself runs the live `validate.py` against the live v34 dataset, which is the binding signal.

**One subtlety the Step 3 chat should know about.** The current `_meta._schema` field on the v34 data says `"Map_v16_schema.json"` (labeling drift resolved by Step 2). If the validator currently reads this field and switches schemas based on it, point-at-v16 may already be implicit. The Step 3 chat should inspect the validator's schema-loading code before assuming.

---

## Working norms

These carry forward from EXPLORER_HANDOFF.md but worth re-stating in context:

- **Project files are for stable reference material.** This handoff goes in `/methodology/`, fetchable by future chats. Don't attach large schemas or datasets to project knowledge.
- **Non-developer maintenance.** All deployment via GitHub web UI. No git CLI. Every chat instruction ends in something the maintainer can click.
- **Edits not regenerations.** Each step is one chat. One PR per step keeps the change reviewable. Steps that touch only one file (Step 3 touches `validate.py`; Step 5 touches the data file with focused diffs) are particularly clean — they leave a small, auditable trail.
- **MCP server is the schema authority** — but it's still serving v15.3 / v34 until Step 8. Until then, fetch the v16 schema from `/schema/Map_v16_schema.json` directly. The MCP queries you might want for Phase A authoring (e.g., "list all established bijection edges") still work against the v15.3 / v34 surface because the relevant fields (subtype, status, from, to) are all v15.3-vintage.
- **The firewall methodology (`META_v21_1_methodology_firewall.md`) still applies.** Phase A authoring backfills `constructive_status` based on existing cell content (presence of `realized_examples`, presence of `structurally-excluded` in content prose, presence of an SM↔SU(5) forcing edge), not on patterns observed in past findings docs. The §2.5 self-check applies: "Would I author this cell with this status anyway on physics-content grounds alone?" Almost always yes — the firewall's concern is about pattern-finding back-influencing what gets authored *next*, and Phase A backfill is making existing structure explicit, not adding new content.

---

## Lessons from Steps 0–2

- **The raw CDN negative-response cache is real.** During Step 2, `web_fetch` returned a 404 on `Map_v15_3_schema.json` even though the file was sitting in the repo. The github.com blob HTML fallback worked (handoff documents this in `EXPLORER_HANDOFF.md`). Current payload path in May 2026: `data["payload"]["codeViewBlobLayoutRoute.StyledBlob"]["rawLines"]`. Probe the structure with a small inspector before assuming the path — GitHub web-app refactors keep the data accessible but rename the route.

- **The v34 dataset's `_meta._schema` field already said `"Map_v16_schema.json"`** before v16 existed. Caught during Step 2 by inspecting the file during real-data validation. Was a labeling drift; resolved when v16 actually shipped. **Lesson for future schema bumps:** the `_meta._schema` field is the authoritative pointer in the data file, and it can drift ahead of the actual schema. Check it explicitly at the start of any schema-bump work.

- **JSON Schema 2020-12 conditional `allOf` + `if`/`then` rules compose well.** All four Phase A conditional rules use this pattern; the 29-assertion test suite confirms it works as expected. The pattern is: `{ "if": { properties + required }, "then": { required or properties-with-false } }`. The `"properties": { "fieldname": false }` idiom is the JSON Schema 2020-12 way to forbid a field conditionally.

- **Compact JSON formatting matters for git diffs.** Initial output of `json.dump(indent=2)` doubled the file length vs the v15.3 hand-formatted style (1826 lines vs 786). A custom formatter that keeps small leaf objects on one line (≤ 3 keys, all values primitive, fits under 80 chars) brought v16 down to 934 lines — a clean ~148-line delta showing the actual additions. **The custom-formatter pattern is in `/home/claude/v16-build/compact_format.py`** in the Step 2 workspace; reusable for future schema bumps. Apply it as a final post-process step after `json.dump(indent=2)` produces the canonical-but-verbose output.

- **`additionalProperties: false` on cells is load-bearing.** Without explicit declaration of `constructive_status` and `forced_by` in the cell `$def`, the new fields would be rejected even though they're new optional fields. The strictness is correct (catches typos and prevents schema drift) but it means every Phase B/C cell field must also be declared explicitly — they cannot rely on permissive defaults.

- **The closure-constraint problem is real and Phase A handles it by workaround.** Phase A's `forced_by_entry.kind` enum is closed to `["edge"]`. Bucket 1 (the SM structurally-excluded cells) needs to point at closure constraints that are not currently first-class nodes. The spec §7.2 workaround: encode each closure constraint as a self-edge on the SM-rep-content FC with `subtype: specializes` and `from = to = sm-rep-content`. This satisfies the validator (the edge exists and has an applicable subtype) without inventing a new node type. A future Phase A+ schema bump could introduce `kind: "closure_constraint"` and a `closure-constraint` node type, but that decision is deferred until the workaround actually causes friction.

- **Schema validation requires careful handling of `$ref` resolution.** The Step 2 unit tests used `jsonschema.Draft202012Validator` with a `Registry` and `Resource` from the `referencing` library to resolve `#/$defs/cell` and `#/$defs/edge` references. Pattern: load the schema, register it under a URN, build the validator with `{"$ref": "urn:schema#/$defs/<name>"}`. The naïve `Draft202012Validator(schema["$defs"]["cell"])` approach loses the `$defs` context and fails on any internal `$ref` like `$ref: #/$defs/prediction`. The working pattern is in `/home/claude/v16-build/test_v16_schema.py` and `validate_v34_against_v16.py`; reusable for future schema work.

- **One-way ratchet design is robust.** The v15.3 → v16 transition is strictly additive — every v15.3-conforming file validates against v16 with zero new errors. The data file doesn't need migration to validate; only to *use* the new fields does authoring happen. This decouples schema-bump readiness from authoring readiness. The same pattern should be used for Phase B and Phase C schema bumps.

---

## What stays unchanged

For the avoidance of doubt, these are NOT affected by Phase A:

- **The explorer.** Forward-compatible per the risk-spot audit; can continue serving the v34 view of the data throughout Steps 3–8. Surfacing of `constructive_status`, `forced_by`, `axis_mapping` in the explorer UI is a separate deliverable, queued after the Predictive Layer build completes (or in parallel, if a future chat takes it).
- **The phenomenon layer's existing structure.** All 17 phenomenon-FCs and their cross-classification edges to the structural backbone work as before; `axis_mapping` is opt-in on each edge.
- **The discourse layer.** Architecture, frontier, totality, regime-content, and program nodes are unaffected by Phase A. `if_real_implies` (Phase B) targets frontier and totality nodes but is deferred.
- **The firewall methodology.** Phase A authoring is firewall-compliant because it's making existing structure explicit, not adding new content based on pattern observations.
- **The 4 legacy "constrains" edges.** Tolerated per `PROJECT_INFRASTRUCTURE.md` §2.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev` (serving v15.3 / v34 until Step 8)
- v16 schema: `/schema/Map_v16_schema.json`
- v16 spec: `/methodology/MAP_v16_schema_spec_extension.md`
- Predictive layer goal: `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- This handoff: `/methodology/PREDICTIVE_LAYER_HANDOFF.md`
- Companion explorer handoff: `/methodology/EXPLORER_HANDOFF.md`

### Raw URLs for `web_fetch`

- v15.3 schema (kept for reference): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v15_3_schema.json`
- v16 schema (current): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v16_schema.json`
- v16 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v16_schema_spec_extension.md`
- Predictive layer goal: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Current validator: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/scripts/validate.py` (the Step 3 chat fetches this to know what it's editing)
- CI workflow: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/.github/workflows/validate.yml`
- v34 data (1.37 MB — exceeds github.com blob fallback size limit, use raw CDN or MCP): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`

### Housekeeping notes (not blocking Phase A)

The methodology folder has some duplicate or orphan files the maintainer can clean up whenever:

- `PROJECT_GOAL (1).md`, `PROJECT_GOAL_PHENOMENON_LAYER (1).md`, `PROJECT_PATTERN_FINDING_METHODOLOGY (1).md`, `DEPLOYMENT_step4 (1).md` — `(1)` suffixes from GitHub upload collisions. Rename or delete after confirming which copy is current.
- `PROJECT_GOAL_SUPPLEMENT.md` — exists in project knowledge but never landed in the `/methodology/` folder of the repo. Upload to make it fetchable by future chats.
- The v15.3 schema's `description` field references `MAP_v15_3_schema_spec_extension.md` which doesn't exist in the repo. Pre-existing loose end; v16 supersedes it.

The explorer also has `explorer-glossary.js` which the `EXPLORER_HANDOFF.md` doesn't yet mention — Update C glossary panel shipped but the handoff wasn't updated. (Captured in this handoff for cross-reference; the explorer-handoff update is its own deliverable, decoupled from Phase A.)

None of these block Phase A.

---

*End of PREDICTIVE_LAYER_HANDOFF.md, v1. Update after every shipped step.*
