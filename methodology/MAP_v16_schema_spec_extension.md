# MAP v16 schema-spec extension — Phase A of the Predictive Layer

**Document type:** Schema specification. Defines the v15.3 → v16 schema bump for Phase A of the Predictive Layer. Companion file to `/schema/Map_v16_schema.json` (downstream deliverable) and `/scripts/validate.py` extensions.

**Status:** v1. Authored 2026-05-20, downstream from `PROJECT_GOAL_PREDICTIVE_LAYER.md` §3.1, §3.2, and §9. Phase A scope only.

**Parent docs:** `PROJECT_GOAL.md` (structural goal, §4 type discipline), `PROJECT_GOAL_PHENOMENON_LAYER.md` (coverage goal), `PROJECT_GOAL_PREDICTIVE_LAYER.md` (the layer this schema implements).

---

## 0. What this document is

This spec defines the schema extensions that make Phase A of the Predictive Layer authorable. It covers three new fields — two on cells, one on edges — together with the conditional validation rules that prevent malformed entries and the validator-side rules that enforce cross-field invariants.

It does **not** cover Phase B (`if_real_implies`) or Phase C (`quantitative_scale`, `resolves` edge type). Those are separate spec-extension documents downstream of their own authoring readiness. This is by design: Phase A's value is that it can ship independently against v34 data, with the highest-leverage payoff per unit work (see `PROJECT_GOAL_PREDICTIVE_LAYER.md` §5).

The spec is binding for the schema file (`/schema/Map_v16_schema.json`), for the CI validator (`/scripts/validate.py`), and for any authoring that lands `constructive_status`, `forced_by`, or `axis_mapping` content. The MCP worker (`/mcp/worker.js`) gets rebuilt against this schema as a follow-on step; the worker is downstream of the schema, not a precondition for it.

---

## 1. Summary of changes

| Field | On | Cardinality | Required when | Forbidden when |
|---|---|---|---|---|
| `constructive_status` | cell | single | never required | n/a |
| `forced_by` | cell | array (≥ 1 when present) | `constructive_status` ∈ {conjectured-by-pattern, forbidden-by-pattern} | `constructive_status` ∈ {realized, indeterminate, absent} |
| `axis_mapping` | edge (cross-classification) | array (≥ 1 when present) | never required (recommended on bijection / categorically-equivalent edges in `established` status) | `subtype` ∈ {specializes, composition}; `type` ≠ cross-classification |

Three new `$defs`: `constructive_status`, `forced_by_entry`, `axis_mapping_entry`. Three new conditional rules in cell/edge `allOf` blocks. Five new validator-side rules (Rules 19–23 continuing the v15.3 sequence).

No existing fields are removed. No existing fields change shape. Existing v15.3 data validates against v16 without modification (every Phase A field is optional). Phase A authoring is a forward-only migration; rollback to v15.3 is a no-op since v15.3 data is a strict subset of v16-conforming data.

---

## 2. New field on cells: `constructive_status`

**Purpose.** Distinguish a cell's *constructive* status (does this cell exist as a realized instance, is it conjectured-by-pattern, is it forbidden-by-pattern, or is it indeterminate?) from its *empirical* status (the existing `prediction_status` on the cell's predictions, which is about whether a prediction has been confirmed/falsified/tested).

The current schema confuses these. A cell with `realized_examples: ["the electron"]` and a prediction with `status: confirmed` is realized (constructive) and its prediction is confirmed (empirical) — two different facts. A cell with content `"structurally-excluded"` is forbidden by pattern (constructive); the empirical question doesn't apply. A cell predicted by an SU(5) GUT cross-classification edge but never observed is conjectured-by-pattern (constructive) and unconfirmed-not-yet-tested (empirical) — two facts that should be recorded independently.

**Schema delta.** Add to `$defs`:

```json
"constructive_status": {
  "type": "string",
  "enum": ["realized", "conjectured-by-pattern", "forbidden-by-pattern", "indeterminate"],
  "description": "v16. Constructive status of the cell — does this cell exist as a realized instance (realized), is it required by a structure-preserving edge but not yet realized (conjectured-by-pattern), is it excluded by a structure-preserving edge or closure constraint (forbidden-by-pattern), or does the pattern not force a verdict (indeterminate)? Distinct from empirical prediction_status. See MAP_v16_schema_spec_extension.md §2."
}
```

Add to `cell` properties:

```json
"constructive_status": { "$ref": "#/$defs/constructive_status" }
```

**Semantics of each value.**

- `realized` — concrete instance exists in nature or in well-defined mathematical construction. The cell points at something the field can produce or observe. Typical evidence: `realized_examples` array non-empty, or `predictions` containing a `confirmed` entry, or content prose that names a specific physical/mathematical object.

- `conjectured-by-pattern` — required to exist by an explicit structure-preserving edge (bijection, categorically-equivalent, or the structure-preserving subset of derives-from). The cell's properties are forced by the mapping; instantiation is pending. **The Mendeleev-cell move made first-class.** `forced_by` is required.

- `forbidden-by-pattern` — excluded by an explicit structure-preserving edge or closure constraint. The structure says this cell *cannot* be filled. The SM's structurally-excluded cells are the canonical examples. `forced_by` is required.

- `indeterminate` — the pattern does not force a verdict. The cell may be authored as a placeholder (axis-coordinate is meaningful but content is unknown), or genuinely undetermined by current structure. This is the honest default for cells where neither evidence of realization nor a forcing constraint exists.

**When absent.** The field is optional. When absent on a cell, no constructive claim is made. Tools and renderers should treat an absent value as "constructive status not recorded" — not as a synonym for `indeterminate` or any other value. Migration (§7 below) populates the field on existing cells where the evidence is unambiguous.

---

## 3. New field on cells: `forced_by`

**Purpose.** When `constructive_status` is `conjectured-by-pattern` or `forbidden-by-pattern`, the cell carries a typed link back to the edge (or, in future, closure constraint) that produced the conjecture or exclusion. This makes the forcing-relation traversable: a Claude session can ask "why is this cell forced?" and get a specific edge id back, then `get_node(edge_id)` to read the structural argument.

**Schema delta.** Add to `$defs`:

```json
"forced_by_entry": {
  "type": "object",
  "required": ["kind", "edge_id"],
  "properties": {
    "kind": {
      "type": "string",
      "enum": ["edge"],
      "description": "v16. Discriminator for the type of forcing constraint. Phase A: only 'edge' is supported. Reserved values for future: 'closure_constraint'."
    },
    "edge_id": {
      "type": "string",
      "description": "v16. Id of the edge that forces this cell. Must reference an existing edge with subtype in {bijection, categorically-equivalent, derives-from} and from/to including this cell's host classification."
    },
    "description": {
      "type": "string",
      "description": "v16. Optional one-line gloss of what the forcing edge specifically forces about this cell (e.g., 'the McKay correspondence maps the trivial irrep to the identity element')."
    }
  },
  "additionalProperties": false
}
```

Add to `cell` properties:

```json
"forced_by": {
  "type": "array",
  "items": { "$ref": "#/$defs/forced_by_entry" },
  "minItems": 1,
  "description": "v16. Array of forcing constraints that produced this cell's constructive_status. Required when constructive_status is conjectured-by-pattern or forbidden-by-pattern; forbidden otherwise."
}
```

**Why an array.** A cell may be forced by multiple edges simultaneously. A forbidden cell can be excluded by more than one no-go constraint. A conjectured cell can be required by multiple structure-preserving mappings, each contributing independent evidence. Recording all of them is more informative than picking one. The minimum is 1; ordering is not significant.

**Why the `kind` discriminator.** Phase A only uses `kind: "edge"`. The discriminator anticipates future work: closure constraints (e.g., shell-filling exhaustion in the SM rep-content table) are not yet first-class nodes in the schema. When and if they become first-class, `kind: "closure_constraint"` is reserved for them. Authors must not invent new `kind` values; the enum is closed in v16.

**Validation strength.** Schema-side: `forced_by` is required when `constructive_status` ∈ {conjectured-by-pattern, forbidden-by-pattern} and forbidden otherwise (§5 below). Validator-side: each referenced `edge_id` must exist in the dataset and must have an applicable subtype (§6 Rule 19 below).

---

## 4. New field on edges: `axis_mapping`

**Purpose.** When two classifications are linked by a structure-preserving edge, every cell on one side has a counterpart on the other. The mapping between their classification axes is what makes the counterpart computable. The Predictive Layer's `find_forced_cells` tool reads `axis_mapping` to determine which cell on the to-side corresponds to which cell on the from-side.

This is the single highest-leverage Phase A field. The ADE clique (modular-tensor-categories, ade-lie-algebras, ade-modular-invariants, ade-quivers, ade-du-val) has five classifications connected by McKay / Brieskorn / Gabriel / Cappelli-Itzykson-Zuber / Du Val correspondences. Decorating those edges with explicit axis mappings is one focused authoring sweep; downstream tools then surface forced cells across the clique mechanically.

**Schema delta.** Add to `$defs`:

```json
"axis_mapping_entry": {
  "type": "object",
  "required": ["from_axis", "to_axis"],
  "properties": {
    "from_axis": {
      "type": "string",
      "description": "v16. Axis name on the source classification. Must appear in the source FC's classification_axes."
    },
    "to_axis": {
      "type": "string",
      "description": "v16. Axis name on the target classification. Must appear in the target FC's classification_axes."
    },
    "correspondence": {
      "type": "string",
      "description": "v16. The transformation relating from_axis to to_axis. 'identity' for direct correspondence; otherwise a named transformation (e.g., 'McKay correspondence', 'dual', 'duality-twist'). Free text — interpretation is the edge author's substantive claim."
    },
    "description": {
      "type": "string",
      "description": "v16. One-line gloss of the mapping."
    }
  },
  "additionalProperties": false
}
```

Add to `edge` properties:

```json
"axis_mapping": {
  "type": "array",
  "items": { "$ref": "#/$defs/axis_mapping_entry" },
  "minItems": 1,
  "description": "v16. Explicit axis-by-axis correspondence between source and target classifications. Required on cross-classification edges with subtype 'bijection' or 'categorically-equivalent' in status 'established' (validator-side warning). Optional on 'derives-from' edges (only structure-preserving cases). Forbidden on 'specializes' and 'composition' subtypes."
}
```

**Design choice locked in.** Axis mappings are declared explicitly on the edge, **not computed dynamically**. The originating goal doc (`PROJECT_GOAL_PREDICTIVE_LAYER.md` §3.2) justifies this: computed correspondences would require an axis-equivalence substrate the schema doesn't have, and "this bijection is established" is a substantive physics claim the edge author is in a better position to record than a query engine is to infer. This decision is not revisable in Phase A.

**Why optional, not required.** Some bijection edges land in `partial`, `aspired`, or `conjectured` status, where the mapping itself is what's being worked out. A schema-level requirement to provide `axis_mapping` on every bijection edge would make those edges unauthorable. Instead, the validator-side rule (§6 Rule 22) warns when an `established`-status bijection lacks an `axis_mapping`, prompting authoring without blocking it.

**Which derives-from edges may carry `axis_mapping`.** Only the structure-preserving subset. The validator cannot mechanically distinguish structure-preserving from non-structure-preserving derives-from edges; that's the author's claim. In Phase A, an author who decorates a derives-from edge with `axis_mapping` is asserting that the derivation preserves the axis structure mapped. Validator-side Rule 23 confirms axis-name validity (§6); the structure-preservation claim itself is unchecked by the validator and is the author's substantive responsibility.

---

## 5. Conditional validation rules (JSON Schema)

The following rules are added to the existing `allOf` arrays in the `cell` and `edge` definitions. They preserve the v15.3 rules unchanged.

### 5.1 Cell rule: forced_by required iff conjectured-by-pattern or forbidden-by-pattern

```json
{
  "_comment": "v16 §5.1 — forced_by required when constructive_status forces it",
  "if": {
    "properties": {
      "constructive_status": {
        "enum": ["conjectured-by-pattern", "forbidden-by-pattern"]
      }
    },
    "required": ["constructive_status"]
  },
  "then": {
    "required": ["forced_by"]
  }
}
```

### 5.2 Cell rule: forced_by forbidden when realized, indeterminate, or constructive_status absent

```json
{
  "_comment": "v16 §5.2 — forced_by forbidden unless a forcing constructive_status is set",
  "if": {
    "anyOf": [
      { "not": { "required": ["constructive_status"] } },
      {
        "properties": {
          "constructive_status": {
            "enum": ["realized", "indeterminate"]
          }
        },
        "required": ["constructive_status"]
      }
    ]
  },
  "then": {
    "properties": { "forced_by": false }
  }
}
```

### 5.3 Edge rule: axis_mapping forbidden on non-structure-preserving subtypes

```json
{
  "_comment": "v16 §5.3 — axis_mapping forbidden on specializes/composition subtypes",
  "if": {
    "properties": {
      "type": { "const": "cross-classification" },
      "subtype": { "enum": ["specializes", "composition"] }
    },
    "required": ["type", "subtype"]
  },
  "then": {
    "properties": { "axis_mapping": false }
  }
}
```

### 5.4 Edge rule: axis_mapping forbidden on non-cross-classification edges

```json
{
  "_comment": "v16 §5.4 — axis_mapping is cross-classification-only",
  "if": {
    "not": {
      "properties": { "type": { "const": "cross-classification" } },
      "required": ["type"]
    }
  },
  "then": {
    "properties": { "axis_mapping": false }
  }
}
```

These four rules are sufficient at the JSON-Schema level. Cross-field validity (does the referenced edge id exist? do the axis names belong to the right classifications?) is enforced at the validator-side level (§6 below). JSON Schema cannot express these checks because they require lookup across array elements.

---

## 6. Validator-side rules (extending `_validator_side_rules`)

The following rules continue the v15.3 numbered sequence. Add to `_validator_side_rules` in the schema file, and implement in `/scripts/validate.py`.

**Rule 19 — `forced_by.edge_id` resolves to an existing edge.** Every `forced_by_entry.edge_id` referenced by any cell must match the `id` of some edge in the `edges` array. Failure: hard error.

**Rule 20 — Forcing edges have applicable subtypes.** The referenced edge must have `type: cross-classification` and `subtype` ∈ {bijection, categorically-equivalent, derives-from}. The `specializes` and `composition` subtypes do not force cells. Failure: hard error.

**Rule 21 — Forcing edges connect to the cell's host classification.** The referenced edge's `from` or `to` must be the id of the formal-classification node hosting the cell. Failure: hard error.

**Rule 22 — Established bijection / categorically-equivalent edges should carry `axis_mapping`.** When a cross-classification edge has `subtype` ∈ {bijection, categorically-equivalent} and `status: established` (or status absent, since `established` is the default), it should have `axis_mapping`. Failure: **warning** (not hard error). Existing v15.3 edges without `axis_mapping` get flagged on first v16 validation, prompting authoring. Hard-failing would break the CI tripwire for the whole repo on schema-bump day; the warning lets the bump land while the authoring sweep proceeds.

**Rule 23 — `axis_mapping` axis names resolve to host classifications.** Every `from_axis` value must appear in the `name` field of some entry in the source classification's `classification_axes` array; every `to_axis` value must appear similarly in the target's `classification_axes`. Failure: hard error. (This is what catches typos like `from_axis: "spacial_dimension"` when the FC declares `spatial_dimension`.)

The four hard-error rules (19, 20, 21, 23) prevent malformed Phase A entries from landing. Rule 22 is the only warning-level rule, intentionally — it surfaces the authoring sweep target without blocking the schema bump.

---

## 7. Backward compatibility and migration

### 7.1 Schema-level backward compatibility

Every v15.3-conforming data file is also v16-conforming. The three new fields (`constructive_status`, `forced_by`, `axis_mapping`) are all optional. Cells with `additionalProperties: false` continue to reject unknown fields, but the new fields are now declared, so they are no longer "unknown."

The v15.3 → v16 transition is therefore a one-way ratchet: future authoring may add Phase A fields freely, and validation continues to accept v15.3-shaped entries indefinitely. This matches the v14 → v15 transition pattern.

### 7.2 Authoring migration of existing cells

The ~484 existing cells fall into four buckets, each with a recommended `constructive_status` assignment:

**Bucket 1: cells with content "structurally-excluded" → `forbidden-by-pattern`.** The 17 SM structurally-excluded cells are the canonical examples (`PROJECT_GOAL_SUPPLEMENT.md` §2.2 documents the existing structurally-excluded pattern). Each gets `constructive_status: forbidden-by-pattern` plus a `forced_by` entry pointing at the structural reason. For Phase A, the "structural reason" is recorded as an internal closure constraint on the SM-content classification itself — but Phase A only supports `kind: "edge"` in `forced_by`. So these cells need either (a) an edge representing the closure constraint (the cleanest schema-conforming path, but new authoring lift) or (b) deferral to a future Phase A+ that adds `kind: "closure_constraint"`.

**Recommendation:** for Phase A's initial landing, the structurally-excluded SM cells get `constructive_status: forbidden-by-pattern` with `forced_by` referring to a new edge type `closure-constraint` from the SM-content FC to itself, with `subtype: specializes` and `axis_mapping` describing the closure axis. This is doable in one authoring pass. Alternative paths are documented in §9 of `PROJECT_GOAL_PREDICTIVE_LAYER.md`.

**Bucket 2: cells with `realized_examples` non-empty → `realized`.** The cell points at concrete physical/mathematical objects. Direct assignment; no `forced_by` required (or permitted, per §5.2).

**Bucket 3: cells with predicted-but-unobserved content forced by a cross-classification edge → `conjectured-by-pattern`.** The SU(5)-GUT X/Y bosons, monopoles, and proton-decay channels are the canonical examples. Each gets `constructive_status: conjectured-by-pattern` plus a `forced_by` array referring to the SM↔SU(5) cross-classification edge.

**Bucket 4: cells with neither realized examples, nor structurally-excluded content, nor an obvious forcing edge → `indeterminate`** *(or no `constructive_status` at all)*. The honest default. Authors should not invent a constructive status when the evidence doesn't support one.

### 7.3 Migration sequencing

The recommended migration sequence is:

1. Land the v16 schema (this spec + `/schema/Map_v16_schema.json` + `/scripts/validate.py` extensions). All existing v15.3 data validates without modification because Phase A fields are optional.
2. Backfill Bucket 2 (`realized`) and Bucket 4 (`indeterminate`) across all cells. No `forced_by` work; no axis-mapping work. This is mechanical authoring against existing fields.
3. Decorate ADE-clique edges with `axis_mapping`. This is the highest-leverage Phase A authoring — one focused sweep over five FCs and their connecting bijections.
4. Backfill Bucket 3 (`conjectured-by-pattern`) for SU(5) GUT and any other classifications with forced empty cells.
5. Address Bucket 1 (`forbidden-by-pattern`) including the closure-constraint edges. This is the heaviest authoring lift in Phase A and benefits from steps 1–4 being done first.

Steps 1–2 are essentially zero-creative-content work and could land in a single PR. Steps 3–5 are the substantive Phase A authoring and can each land in their own PR. The CI tripwire enforces correctness at each step.

---

## 8. Tool-surface implications (downstream of this spec)

The schema bump unlocks (but does not implement) the following MCP tool additions. These are listed for traceability; implementation happens in `/mcp/worker.js` rebuild downstream.

- **`find_forced_cells(classification_id)`** — returns cells whose `constructive_status` is `conjectured-by-pattern` or `forbidden-by-pattern`, filterable by host classification, with the `forced_by` edges joined. The flagship Phase A query.
- **`get_forcing_constraint(cell_id)`** — returns the full `forced_by` array for a cell, with each edge id resolved to the edge record.
- **`find_cells`** *(existing tool extended)* — add a `constructive_status` filter parameter accepting the four-value enum.
- **`get_axis_mapping(edge_id)`** — returns the `axis_mapping` array on an edge if present; helpful for traversing the mapping.

These are not implemented by this spec. The spec defines what they will read; their implementation is a worker rebuild that follows the schema landing.

---

## 9. Out of scope (deferred to Phase B and Phase C)

Explicitly **not** in this spec, to prevent scope creep:

- **`if_real_implies` field** on open-frontier and totality-approach nodes. Phase B. Will get its own spec extension.
- **`quantitative_scale` structured field** on frontiers, predictions, and edges. Phase C. Will get its own spec extension.
- **`resolves` edge type** from experimental-program nodes to cells/frontiers, with `predictions_per_program` substructure. Phase C.
- **Cellification of architectures.** Out of scope for the Predictive Layer entirely (`PROJECT_GOAL_PREDICTIVE_LAYER.md` §4).
- **Closure-constraint as a first-class node type** distinct from edges. Reserved for a future Phase A+ if and when needed. Phase A uses edges to represent closure constraints (see §7.2 Bucket 1).
- **Inference of axis mappings from edge structure.** Forbidden by the design choice locked in at §4. Mappings are declared, not computed.

---

## 10. Files affected

**New:**
- `/schema/Map_v16_schema.json` — the schema file with the three new `$defs`, the three new field declarations, the four new conditional rules in `allOf` arrays, and the five new entries in `_validator_side_rules`. Downstream of this spec.
- `/methodology/MAP_v16_schema_spec_extension.md` — this document.

**Modified:**
- `/scripts/validate.py` — implements Rules 19–23. Each rule corresponds to a function that takes the parsed dataset and returns either `None` (pass), a warning string (Rule 22), or an error string (Rules 19, 20, 21, 23).
- `/.github/workflows/validate.yml` — no change expected. The existing tripwire runs whatever `validate.py` does.

**Downstream (separate deliverables, not blocked by this spec):**
- `/mcp/worker.js` — rebuilt against v16 schema and v34+ data, adding `find_forced_cells`, `get_forcing_constraint`, `get_axis_mapping`, extending `find_cells`. Cloudflare worker redeploy per `PROJECT_INFRASTRUCTURE.md` §3.
- `/data/Map_v34_consolidated.json` — Phase A authoring populates `constructive_status`, `forced_by`, and `axis_mapping` per the §7 migration sequence. The file remains `Map_v34_consolidated.json` (filename unchanged; schema_version bumps to `v16`, dataset_version stays `v34` or bumps per the project's tag convention).
- `/explorer/explorer-*.js` — eventually surfaces forced cells with Mendeleev-style visual treatment, exposes axis-mapping detail in edge cards, adds a "Forced cells" Browse tab. Decoupled from the schema landing per the forward-compatibility analysis in this session's conversation (cf. EXPLORER_HANDOFF.md). The explorer keeps working through the schema bump; the explorer update is its own future deliverable.

---

## 11. What this spec does not establish

- The specific edge ids to add for closure constraints in Bucket 1. Authoring decision, downstream.
- The specific list of axis mappings for the ADE clique. Authoring decision, downstream (Step 3 of §7.3).
- The implementation of the new MCP tools listed in §8. Worker rebuild, downstream.
- The explorer's visual treatment of `conjectured-by-pattern` cells, `forbidden-by-pattern` cells, or `axis_mapping` rendering. Explorer concern, decoupled from the schema landing.
- The phasing of Phase B and Phase C schema work. Each gets its own spec extension when ready.

---

## 12. Closing note

Phase A is small in schema-delta terms — three optional fields, five validator rules — and large in unlocked content. The v34 dataset already encodes the forcing relations that `constructive_status`, `forced_by`, and `axis_mapping` will surface; the schema extension simply makes those relations declared and queryable.

The schema is the precondition for the worker rebuild, which is the precondition for an AI-first Claude session to run `find_forced_cells` and surface the Mendeleev empty slots the structure already encodes. The chain — spec → schema JSON → validator → data backfill → worker rebuild → MCP queries — is each step achievable in its own PR, each step gated by the existing CI tripwire, no step requiring the explorer to catch up.

Once the chain reaches the worker rebuild, the AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2 lands a concrete new capability: a Claude session can answer "what empty cells does the structure force across the ADE clique?" with a real list. That is the smallest non-trivial Mendeleev contribution the map is positioned to deliver, and Phase A is what makes it deliverable.

---

*End of MAP_v16_schema_spec_extension.md, v1.*
