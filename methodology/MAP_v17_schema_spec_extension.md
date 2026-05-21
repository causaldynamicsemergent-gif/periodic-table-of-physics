# MAP v17 schema-spec extension — Phase B of the Predictive Layer

**Document type:** Schema specification. Defines the v16 → v17 schema bump for Phase B of the Predictive Layer. Companion file to `/schema/Map_v17_schema.json` (downstream deliverable, Step 2) and `/scripts/validate.py` extensions (downstream deliverable, Step 3).

**Status:** v1. Authored 2026-05-21, downstream from `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2 Move 4 and §3.3, and from `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`. Phase B scope only.

**Parent docs:** `PROJECT_GOAL.md` (structural goal, §4 type discipline), `PROJECT_GOAL_PHENOMENON_LAYER.md` (coverage goal), `PROJECT_GOAL_PREDICTIVE_LAYER.md` (the layer this schema implements), `META_v21_1_methodology_firewall.md` (firewall), `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` (settles the five shape questions this spec implements), `MAP_v16_schema_spec_extension.md` (Phase A, the immediately preceding bump).

---

## 0. What this document is

This spec defines the schema extensions that make Phase B of the Predictive Layer authorable. It covers one new field on two node types — `if_real_implies` on `open-frontier` and `totality-approach` discourse-layer nodes — together with two new `$defs` for the field's nested structure, the conditional validation rules that prevent malformed entries, the validator-side rules that enforce cross-field invariants, and the binding admissibility test that gates authoring.

It does **not** cover Phase C (`quantitative_scale`, `resolves` edge type). That is a separate spec-extension document downstream of its own authoring readiness. This is by design: Phase B's value is that it can ship independently against v40 data, recording the forward-looking conditional move that Phase A's machine-explicit-existing-structure work cannot reach (see `PROJECT_GOAL_PREDICTIVE_LAYER.md` §3.3 and §5).

The spec is binding for the schema file (`/schema/Map_v17_schema.json`, Step 2), for the CI validator (`/scripts/validate.py`, Step 3), and for any authoring that lands `if_real_implies` content (Steps 4+). The MCP worker (`/mcp/worker.js`) gets rebuilt against this schema as the final Phase B step (Step N+1); the worker is downstream of the schema, not a precondition for it.

The §4 admissibility test is the highest-stakes part of this spec. Phase A's firewall test ("is this making existing structure explicit?") does not apply to Phase B because Phase B records structure that does not yet exist in the dataset. The test in §4 is Phase B's operationalization of `META_v21_1_methodology_firewall.md` and is binding for every authoring pass.

---

## 1. Motivation

Phase A made the existing structural backbone machine-explicit: forced cells, structurally-excluded cells, and axis-mappings on bijection / categorically-equivalent edges. Phase B is the fourth Predictive Layer mechanism — the **forward-looking conditional move** named in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2 Move 4 ("anomaly as structural pointer") and elaborated in §3.3. It records what *would follow structurally* if a frontier or totality-approach node's open question received a particular resolution proposed in the subfield literature.

This is the first mechanism that records structure the current dataset does not yet contain — every Phase A field describes content already implicit in v40; every Phase B entry describes content that would arrive *if* a literature position turned out to be right. The firewall consequence is direct: pattern-finding can most easily slide into pattern-asserting here, and the §4 admissibility test is the binding check that prevents that slide. `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` §3 specifies the three-part test; §4 of this spec includes it verbatim.

---

## 2. The new field: `if_real_implies`

**Carrier-node types.** `if_real_implies` is added to `open-frontier` and `totality-approach` node types only. The dataset has 11 open-frontier and 6 totality-approach nodes (v40 live counts; the carrier-set is 17 nodes total). No other node type carries the field; architectures, formal classifications, regime-content, and experimental-program nodes are not carriers. Scope memo §1 justifies the restriction: the carrier of a conditional structural claim is the node hosting the open question being conditioned on, and only these two node types do.

**Cardinality.** `if_real_implies` is an array of `if_real_implies_entry` objects, each grouping consequences of a single named resolution. The outer-array grouping is the design choice that elevates the §4 admissibility test from author-discipline to schema commitment — `condition_citations` and per-implication `derivation_citations` are structurally separated so the validator enforces the test's two-citation-halves requirement. Scope memo §5 locks in the grouping shape.

**Required when.** Never required. The field is optional everywhere. Absence on a carrier node means no conditional structural claim is recorded — not a synonym for "no consequences" or "no resolutions proposed." Phase A's pattern of optional fields is preserved.

**Schema delta — top-level field on the carrier node types:**

```json
"if_real_implies": {
  "type": "array",
  "items": { "$ref": "#/$defs/if_real_implies_entry" },
  "minItems": 1,
  "description": "v17. Array of conditional structural claims, each grouped by a named resolution. Each entry records what would follow structurally if a literature-stated resolution of this carrier node's open question turned out to be right. Carrier-node types: open-frontier, totality-approach. Subject to the Phase B admissibility test in MAP_v17_schema_spec_extension.md §4."
}
```

**Schema delta — new `$defs`:**

```json
"if_real_implies_entry": {
  "type": "object",
  "required": ["resolution", "condition", "condition_citations", "implications"],
  "properties": {
    "resolution": {
      "type": "string",
      "description": "v17. Short identifier for the resolution being conditioned on (e.g., 'susy-at-tev', 'koide-as-discrete-flavor-signal', 'muon-g2-bsm-loop'). Unique within the carrier's if_real_implies array. Not a global id; carriers may reuse identifiers locally."
    },
    "condition": {
      "type": "string",
      "description": "v17. One-line statement of the if-real antecedent — the literature position whose realization is being conditioned on."
    },
    "condition_citations": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "description": "v17. Publications where the resolution is stated as a literature position. Required non-empty per the §4 admissibility test part (1). At least one citation must name a paper a working subfield specialist would recognize as taking the position."
    },
    "implications": {
      "type": "array",
      "items": { "$ref": "#/$defs/if_real_implies_implication" },
      "minItems": 1,
      "description": "v17. Structural consequences of the resolution, each independently citation-supported."
    }
  },
  "additionalProperties": false
}
```

```json
"if_real_implies_implication": {
  "type": "object",
  "required": ["kind", "description", "derivation_citations"],
  "properties": {
    "kind": {
      "type": "string",
      "enum": ["new_cell", "new_axis", "forced_edge", "promotes_subtype", "new_FC"],
      "description": "v17. Discriminator for the kind of structural consequence. See MAP_v17_schema_spec_extension.md §2 for semantics."
    },
    "target": {
      "description": "v17. Target of the structural consequence. Shape depends on kind — see §3 conditional rules. Null when kind = new_FC.",
      "oneOf": [
        { "type": "string" },
        { "type": "null" },
        {
          "type": "object",
          "required": ["from", "to", "subtype"],
          "properties": {
            "from": { "type": "string" },
            "to": { "type": "string" },
            "subtype": {
              "type": "string",
              "enum": ["bijection", "categorically-equivalent", "derives-from", "specializes", "composition"]
            }
          },
          "additionalProperties": false
        }
      ]
    },
    "description": {
      "type": "string",
      "description": "v17. One-line gloss of the structural change implied. Names the cell/axis/edge/subtype-promotion/FC and what about it the resolution forces."
    },
    "derivation_citations": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "description": "v17. Publications where the antecedent → consequent step is performed. Required non-empty per the §4 admissibility test part (2). Citations should name the paper(s) where the derivation from the resolution to this specific structural consequence is recorded — not merely the resolution's introduction (those are in condition_citations)."
    }
  },
  "additionalProperties": false
}
```

**Semantics of each `kind` value.**

- `new_cell` — resolution forces a cell not currently in some FC. The cell's axis-tuple is determined by the derivation cited in `derivation_citations`. `target` is the host FC id; the axis-coordinates of the forced cell are recorded in `description` (free text — a fully structured axis-tuple is a candidate for v18+ but is out of scope here).

- `new_axis` — resolution forces a new classification axis on an existing FC. The new axis discriminates content the existing axes do not. `target` is the host FC id; `description` names the axis and its values.

- `forced_edge` — resolution forces a new cross-classification edge between two existing FCs. `target` is the structured triple `{from, to, subtype}`. The `subtype` value must be a valid cross-classification edge subtype per the existing v16 edge enum.

- `promotes_subtype` — an existing edge or cell has its `status`, `subtype`, or `constructive_status` promoted (e.g., an edge in `partial` status becomes `established`; a cell with `constructive_status: conjectured-by-pattern` becomes `realized`). `target` is either an existing edge id or an existing cell id. The validator (§5 Rule 24) resolves the target against both lookup tables.

- `new_FC` — resolution forces a new formal classification into existence. `target` is null by design; the FC itself is authored downstream of Phase B (in a normal authoring pass that adds an FC node), not in the `if_real_implies` entry. The entry simply records that a new FC is forced; `description` names what the FC would organize.

**Distinct from `predictive_yield`.** `predictive_yield` lives on formal-classification nodes and records the FC's own forward predictions (223 entries in v40, each with `prediction_status`). `if_real_implies` lives on the carrier discourse-layer nodes and records *conditional structural consequences of a resolution*. The two fields are on disjoint node types, do not bind to each other in the schema, and do not propagate automatically. Scope memo §4 settles this: if a conditional resolution is later confirmed, the `if_real_implies` entries become the trigger list for authoring against their target FCs via the normal authoring pipeline; any predictions the new cells subsequently generate land in `predictive_yield` in the usual way. The decoupling keeps `if_real_implies` from sliding into "predicting predictions."

**When absent.** The field is optional everywhere. Absent on a carrier node means no conditional structural claim is recorded. Tools and renderers should not infer "no resolutions proposed" from absence — many resolutions exist for many frontiers; absence of `if_real_implies` may simply reflect that the §4 test cannot yet be satisfied for any of them.

---

## 3. Conditional validation rules (JSON Schema)

The following rules are added to the existing `allOf` arrays in the node-type definitions. They preserve the v16 rules unchanged.

### 3.1 Node-type rule: `if_real_implies` is permitted only on carrier types

```json
{
  "_comment": "v17 §3.1 — if_real_implies restricted to open-frontier and totality-approach",
  "if": {
    "not": {
      "properties": {
        "type": { "enum": ["open-frontier", "totality-approach"] }
      },
      "required": ["type"]
    }
  },
  "then": {
    "properties": { "if_real_implies": false }
  }
}
```

### 3.2 Implication rule: `target` must be null when `kind = new_FC`

```json
{
  "_comment": "v17 §3.2 — new_FC implies null target (the new FC is authored downstream, not here)",
  "if": {
    "properties": { "kind": { "const": "new_FC" } },
    "required": ["kind"]
  },
  "then": {
    "properties": { "target": { "type": "null" } }
  }
}
```

### 3.3 Implication rule: `target` must be a non-null string when `kind ∈ {new_cell, new_axis, promotes_subtype}`

```json
{
  "_comment": "v17 §3.3 — these kinds reference a single existing entity by id (FC id, edge id, or cell id)",
  "if": {
    "properties": { "kind": { "enum": ["new_cell", "new_axis", "promotes_subtype"] } },
    "required": ["kind"]
  },
  "then": {
    "required": ["target"],
    "properties": {
      "target": { "type": "string", "minLength": 1 }
    }
  }
}
```

### 3.4 Implication rule: `target` must be a structured triple when `kind = forced_edge`

```json
{
  "_comment": "v17 §3.4 — forced_edge target is {from, to, subtype}",
  "if": {
    "properties": { "kind": { "const": "forced_edge" } },
    "required": ["kind"]
  },
  "then": {
    "required": ["target"],
    "properties": {
      "target": {
        "type": "object",
        "required": ["from", "to", "subtype"],
        "properties": {
          "from": { "type": "string", "minLength": 1 },
          "to": { "type": "string", "minLength": 1 },
          "subtype": {
            "type": "string",
            "enum": ["bijection", "categorically-equivalent", "derives-from", "specializes", "composition"]
          }
        },
        "additionalProperties": false
      }
    }
  }
}
```

These four rules are sufficient at the JSON-Schema level. The two-citation-halves requirement is already enforced by the `minItems: 1` constraints on `condition_citations` and `derivation_citations` in the `$defs` declarations (§2 above). Cross-field validity — does the referenced FC / edge / cell id actually exist in the dataset? — is enforced at the validator-side level (§5 below). JSON Schema cannot express these checks because they require lookup across array elements.

---

## 4. Phase B admissibility test (binding)

The following test is reproduced verbatim from `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` §3. It is binding for every Phase B authoring pass and supersedes the Phase A firewall test for this layer. Failure of any of the three parts disqualifies an `if_real_implies` entry.

> **Three-part test.** An `if_real_implies` entry is admissible only if all three hold:
>
> 1. **Antecedent is a literature position.** The if-real condition names a resolution already proposed in the subfield's published literature — a position a working specialist would recognize as having been taken, not one the cartographer infers from dataset structure. `condition_citations` names the publications where the position is stated.
>
> 2. **Consequent is structural-by-derivation, not by pattern.** The implied structural change follows from the antecedent by a *published* derivation, not by inference from cross-classification patterns in v40. `derivation_citations` on each implication names the publications where the antecedent → consequent step is performed.
>
> 3. **Both halves cite.** The two citation arrays are both non-empty. The schema enforces `minItems: 1` on each. Inability to cite either half disqualifies the entry.
>
> **§2.5 self-check restated for Phase B.** Before adding each entry: *"Would I author this conditional structural claim independent of any pattern observation in the existing dataset? Specifically, if I had only the subfield literature and not the v40 cross-classification graph in front of me, would the same antecedent → consequent step be defensible from the literature alone?"* PR descriptions for authoring steps record that the self-check was applied. A yes-but-the-pattern-also-says answer fails the check.

The test rules out consequences inferred from ADE-clique-style structural homology between FCs not yet linked in published derivation, and consequences synthesized by combining unconnected literature positions into a step no published author has made. It admits entries where the antecedent is stated in the subfield literature and the consequent is derived in the same literature or a closely-cited downstream paper.

**What the validator checks and does not check.** The validator does not check citation *quality* — whether the cited paper is well-regarded, whether the derivation it contains is correct, whether the consequent it argues for is sound physics. Those are physicist-review work, downstream of the Phase B MCP rebuild and Track 4 (review pathway). The validator checks only structural conformance: that the citation arrays are non-empty (Rule per §2's `minItems`) and that the target ids resolve (§5 Rule 24 below). The §4 test is therefore enforced at three levels: (a) schema, via the citation-array shape; (b) self-check, via author discipline recorded in PR descriptions; (c) review, via downstream physicist engagement. None of these levels substitutes for the others.

**Why Phase B needs its own test.** `META_v21_1_methodology_firewall.md` is the parent firewall doc. Phase A's operationalization — "is this making existing structure explicit?" — works because Phase A records only structure already present in v40. Phase B records structure not yet present, so the Phase A operationalization is silent on the relevant question. The three-part test above is the firewall's Phase B form; it preserves the firewall's intent (no back-influence from pattern-finding to authoring) by binding admissibility to literature evidence rather than to dataset pattern.

---

## 5. Validator-side rules (extending `_validator_side_rules`)

The following rules continue the v16 numbered sequence. v16 ended at Rule 23; Phase B adds Rules 24–26. Add to `_validator_side_rules` in the schema file, and implement in `/scripts/validate.py`.

**Rule 24 — `target` resolves to an existing entity of the correct kind.** For each implication:

- `kind: new_cell` or `new_axis` → `target` must be a string equal to the `id` of some formal-classification node in the dataset. Failure: hard error.
- `kind: forced_edge` → `target.from` and `target.to` must each be strings equal to the `id` of some formal-classification node. Failure: hard error. (The proposed `subtype` is enum-validated by §3.4 at the JSON-Schema level; no separate validator check required.)
- `kind: promotes_subtype` → `target` must be a string equal to either the `id` of some existing edge OR the `id` of some existing cell. The validator resolves against both lookup tables; failure to find in either is a hard error.
- `kind: new_FC` → `target` must be null. (Already enforced at JSON-Schema level by §3.2; redundant validator check provides defense-in-depth.)

Failure: hard error.

**Rule 25 — `resolution` values are unique within a carrier's `if_real_implies` array.** Within a single carrier node, two entries with the same `resolution` value are forbidden. This prevents two entries with the same name from being authored separately when they should be merged. (Resolution ids are not global; the same `resolution` value may appear on different carriers — e.g., `susy-at-tev` may appear on `hierarchy-problem` and on `muon-g-2` if both have SUSY-at-TeV resolutions in the literature. Uniqueness is enforced only within a single carrier's array.) Failure: hard error.

**Rule 26 — `forced_edge` from/to FC ids must be distinct unless the proposed edge is a closure-constraint self-edge.** Phase A's closure-constraint pattern (introduced in v16 Step 4 authoring for the SM structurally-excluded cells) permits an FC to have a self-edge with `subtype: specializes`. For Phase B `forced_edge` implications, a self-edge is permitted only when `subtype = specializes`; for any other subtype, `from` and `to` must be distinct FC ids. Failure: hard error.

The three hard-error rules together prevent malformed Phase B entries from landing. The §4 admissibility test is enforced by the citation-array `minItems: 1` constraints in §2's `$defs`, and by author discipline recorded in PR descriptions. There is no warning-level rule in Phase B by design — absence of `if_real_implies` entries reflects absence of citable evidence per the firewall, and a warning nudge would create pressure to author without citations. The Phase A pattern of Rule 22 (warning for missing axis-mapping) does not transfer to Phase B for this reason.

---

## 6. Examples

The following examples illustrate `if_real_implies` entries grounded in literature positions already cited in the v40 dataset's existing `candidate_targeting` fields. They are *illustrative* — actual Phase B authoring sweeps will draft their own entries against the §4 admissibility test, and the entries below would themselves need PR review before landing.

### 6.1 Carrier: `muon-g-2` (totality-approach)

The v40 record on muon-g-2 names three candidate resolutions in its loose-ends `candidate_targeting`: (a) lattice-QCD HVP refinement, (b) dispersive-method refinement, (c) new-physics interpretations. The first two are SM-internal reconciliation paths and imply no new structural content. The third — new-physics interpretations — is the resolution with a structural payoff if real. An illustrative entry:

```json
{
  "resolution": "muon-g2-bsm-loop",
  "condition": "If the muon g-2 anomaly survives lattice-HVP / dispersive reconciliation as a residual >3σ deviation indicating new-physics loop contributions",
  "condition_citations": [
    "Muon g-2 Collaboration 2021 'Measurement of the Positive Muon Anomalous Magnetic Moment to 0.46 ppm' Phys Rev Lett 126:141801",
    "Aoyama et al. 2020 'The anomalous magnetic moment of the muon in the Standard Model' Phys Rep 887:1"
  ],
  "implications": [
    {
      "kind": "new_FC",
      "target": null,
      "description": "A new formal classification organizing BSM contributors to lepton anomalous magnetic moments (dark-photon, slepton-neutralino-loop, leptoquark, axion-like-particle channels) would be forced, with axes (mediator-spin × mediator-mass × coupling-to-lepton-current).",
      "derivation_citations": [
        "Czarnecki-Marciano 2001 'The muon anomalous magnetic moment: A harbinger for new physics'",
        "Lindner-Platscher-Queiroz 2018 'A call for new physics: The muon anomalous magnetic moment and lepton flavor violation'"
      ]
    }
  ]
}
```

This entry satisfies the §4 test: (1) the new-physics interpretation of muon g-2 is a stated literature position cited by both the carrier's existing `candidate_targeting` and the new condition_citations; (2) the derivation that such a residual would force a BSM-mediator classification is in the cited reviews; (3) both citation arrays are non-empty.

### 6.2 Carrier: `hierarchy-problem` (open-frontier)

The v40 record on hierarchy-problem names five candidate resolutions in its `candidate_targeting`. Two of them admit clean illustrative entries:

```json
{
  "resolution": "susy-at-tev",
  "condition": "If TeV-scale supersymmetry resolves the hierarchy problem via stabilization of the Higgs mass against quadratic divergences (historically the canonical resolution; now strongly constrained by LHC)",
  "condition_citations": [
    "Dimopoulos-Georgi 1981 'Softly broken supersymmetry and SU(5)'",
    "Susskind 1979 'Dynamics of spontaneous symmetry breaking in the Weinberg-Salam theory'"
  ],
  "implications": [
    {
      "kind": "new_FC",
      "target": null,
      "description": "A new FC organizing minimal-superpartner-content (sleptons, squarks, gauginos, higgsinos) with axes (SM-partner × spin-shift × R-parity) would be forced, paralleling sm-rep-content's gauge × generation × representation organization.",
      "derivation_citations": [
        "Dimopoulos-Georgi 1981",
        "Pierce-Bagger-Matchev-Zhang 1997 'Precision corrections in the minimal supersymmetric standard model'"
      ]
    },
    {
      "kind": "forced_edge",
      "target": {
        "from": "sm-rep-content",
        "to": "minimal-superpartner-content",
        "subtype": "derives-from"
      },
      "description": "Each SM particle would have a forced superpartner cell with derived properties; the edge would carry an axis_mapping (SM-partner ↔ superpartner-identity, spin ↔ spin±½, R-parity = +1 ↔ R-parity = −1).",
      "derivation_citations": [
        "Martin 1997 'A supersymmetry primer' (revised through 2016)"
      ]
    }
  ]
},
{
  "resolution": "composite-higgs",
  "condition": "If the hierarchy is resolved by the Higgs being a pseudo-Nambu-Goldstone boson of a spontaneously broken global symmetry in a new strongly-coupled sector at the TeV scale",
  "condition_citations": [
    "Kaplan-Georgi 1984 'SU(2) × U(1) breaking by vacuum misalignment'",
    "Contino-Nomura-Pomarol 2003 'Higgs as a holographic pseudo-Goldstone boson'"
  ],
  "implications": [
    {
      "kind": "new_FC",
      "target": null,
      "description": "A new FC organizing composite-Higgs strong-sector content (techniquarks, top partners, gauge resonances) with axes (coset structure × resonance-mass × techni-color group) would be forced.",
      "derivation_citations": [
        "Panico-Wulzer 2016 'The composite Nambu-Goldstone Higgs' Lect Notes Phys 913"
      ]
    }
  ]
}
```

These two entries together illustrate the plurality semantics of §2's outer array: hierarchy-problem carries two mutually-exclusive resolutions, each with a distinct `resolution` value and a distinct set of implications. `find_signal_implications(hierarchy-problem, susy-at-tev)` would return only the SUSY entry's implications; without the second argument, the tool returns both.

### 6.3 Carrier: `koide-formula` (totality-approach)

The Koide formula's v40 record names one candidate program: "various flavor-symmetry proposals." The literature on Koide-as-signal proposes that the formula's empirical robustness reflects an underlying discrete flavor symmetry. An illustrative entry:

```json
{
  "resolution": "koide-as-discrete-flavor-signal",
  "condition": "If the Koide formula's ~5-decimal-place agreement reflects an exact relation enforced by a discrete flavor symmetry rather than a numerical coincidence",
  "condition_citations": [
    "Koide 1983 'A fermion-boson composite model of quarks and leptons'",
    "Sumino 2009 'Family gauge symmetry as an origin of Koide's mass formula and charged lepton spectrum'",
    "Foot 1994 'A note on Koide's lepton mass relation'"
  ],
  "implications": [
    {
      "kind": "new_FC",
      "target": null,
      "description": "A new FC organizing discrete flavor symmetries acting on the charged-lepton sector (S3, S4, A4, A5 candidates) with axes (group × representation-content × Yukawa-pattern-implied) would be forced.",
      "derivation_citations": [
        "Sumino 2009"
      ]
    }
  ]
}
```

This entry illustrates that even where the carrier currently has only "gestural" candidate_targeting in v40, the §4 test can be satisfied — the discrete-flavor-symmetry interpretation is a stated literature position (Sumino) with a published derivation of what symmetry structure the Koide value implies. The entry would be admissible; whether to author it is a separate decision per the carrier's existing literature coverage.

---

## 7. Out of scope (deferred to Phase C)

Explicitly **not** in this spec, to prevent scope creep:

- **`quantitative_scale` structured field** on frontiers, predictions, and edges. Phase C. Will get its own spec extension.
- **`resolves` edge type** from experimental-program nodes to cells/frontiers, with `predictions_per_program` substructure. Phase C.
- **Scale-bounding of `if_real_implies` consequences.** When a conditional resolution implies a structural consequence at a specific scale (e.g., SUSY-at-TeV implies superpartner cells at masses ~1 TeV), the scale is naturally a `quantitative_scale` field on the implication. Phase B does not author scales on implications; Phase C's `quantitative_scale` spec will decide whether implications carry scale bounds and how.
- **Coupling of `if_real_implies` to experimental discriminators.** When two mutually-exclusive resolutions imply different structural consequences, an experiment that discriminates them is a `resolves` edge (Phase C, Mechanism #6). Phase B records the conditional consequences; Phase C will record the experimental link.
- **Author-side tooling for entry drafting.** A tool that helps authors draft `if_real_implies` entries by surfacing the carrier's existing `candidate_targeting` literature and prompting for the §4 test halves would be useful, but it is downstream of the worker rebuild (Step N+1) and not in this spec.
- **Cellification of architectures.** Out of scope for the Predictive Layer entirely (`PROJECT_GOAL_PREDICTIVE_LAYER.md` §4). `new_FC` implications on `if_real_implies` entries author the FC downstream of Phase B via the normal FC-authoring pipeline, not by cellifying any existing architecture.
- **Bidirectional propagation between `if_real_implies` and `predictive_yield`.** Scope memo §4 settles this as out of scope: the two fields are on disjoint node types and do not bind to each other. If a resolution is later confirmed, the `if_real_implies` entries become the trigger list for authoring against their target FCs; any predictions the new cells generate land on the FC's `predictive_yield` in the normal way. No automatic propagation.

---

## 8. Tool-surface implications (downstream of this spec)

The schema bump unlocks (but does not implement) the following MCP tool additions. These are listed for traceability; implementation happens in `/mcp/worker.js` rebuild downstream (Step N+1).

- **`find_signal_implications(carrier_id, resolution_id?)`** — returns the `if_real_implies` entries on the named carrier. If `resolution_id` is supplied, returns only the entry with that `resolution` value; otherwise returns all entries. The flagship Phase B query.
- **`find_loose_ends`** *(existing tool extended)* — extend to surface `if_real_implies` entries alongside the existing `loose_ends` payload, so a session asking "what's unresolved here and what would resolving it imply structurally" gets both halves.
- **`get_node`** *(existing tool extended)* — automatically returns `if_real_implies` when present on the carrier; no schema change required, since `get_node` already returns the full record.

These are not implemented by this spec. The spec defines what they will read; their implementation is a worker rebuild that follows the schema landing.

---

## 9. Backward compatibility and migration

### 9.1 Schema-level backward compatibility

Every v16-conforming data file is also v17-conforming. The new field (`if_real_implies`) is optional on the two carrier node types; the conditional rule in §3.1 forbids it on other node types but does not require its presence anywhere. Existing v40 data validates against v17 without modification — v40 contains no `if_real_implies` entries, and none are required.

The v16 → v17 transition is therefore a one-way ratchet, identical in shape to the v15.3 → v16 transition. Future authoring may add Phase B entries freely, and validation continues to accept v16-shaped data indefinitely.

### 9.2 Authoring migration of existing carriers

No mechanical migration of existing data is required. Unlike Phase A's Bucket-1-through-4 cell-content sweep (v16 spec §7.2), Phase B authoring is content-driven: each `if_real_implies` entry requires defensible literature evidence per the §4 test, and authors should not invent entries to populate the field uniformly.

The 17 carrier nodes split into four authoring sweeps by subfield (handoff §"What's queued (live)"):

- **hep-ph carriers (5):** `hierarchy-problem`, `strong-cp-problem`, `flavor-puzzle`, `matter-antimatter-asymmetry`, `muon-g-2`. The richest set of literature-stated resolutions; the highest expected authoring density.
- **cosmology / QG carriers (6):** `qg-frontier`, `cc-frontier`, `bh-info-paradox`, `dark-matter`, `bh-thermodynamics`, `cosmological-models`. Resolutions exist but the §4 test is hardest to satisfy here — many proposed resolutions are speculative without a published derivation of structural consequences.
- **foundations carriers (2):** `measurement-problem`, `koide-formula`. Each has its own distinctive shape (foundations literature for the former; the discrete-flavor-symmetry literature for the latter).
- **condensed-matter / continuum carriers (4):** `topological-phases-classification`, `ns-regularity`, `turbulence`, `chpt`. Highly subfield-specific; admissibility likely sparse but precise where it lands.

Authors apply the §4 test entry-by-entry. PR descriptions record the §2.5 self-check. Where a carrier's resolutions cannot pass the test (no literature-derivation step exists for any of them), the carrier's `if_real_implies` field remains absent; this is the honest result, not a gap.

### 9.3 Migration sequencing

1. Land the v17 schema (this spec + `/schema/Map_v17_schema.json` + `/scripts/validate.py` extensions). All existing v40 data validates without modification because Phase B fields are optional.
2. Begin authoring sweeps per the §9.2 subfield split. Each sweep is its own PR.
3. After all sweeps complete (or the maintainer judges the field sufficiently populated), rebuild the MCP worker against v17 with the new `find_signal_implications` tool.

Steps 1 and 3 are bounded; Step 2 is variable in length. The CI tripwire enforces correctness at each step.

---

## 10. Files affected

**New:**
- `/schema/Map_v17_schema.json` — the schema file with the two new `$defs`, the new field declaration on the two carrier node types, the four new conditional rules in `allOf` arrays, and the three new entries in `_validator_side_rules`. Downstream of this spec (Step 2).
- `/methodology/MAP_v17_schema_spec_extension.md` — this document.

**Modified:**
- `/scripts/validate.py` — implements Rules 24–26. Each rule corresponds to a function that takes the parsed dataset and returns either `None` (pass) or an error string (Rules 24, 25, 26). Phase B introduces no warning-level rules; see §5 closing note for the rationale.
- `/.github/workflows/validate.yml` — no change expected. The existing tripwire runs whatever `validate.py` does.

**Downstream (separate deliverables, not blocked by this spec):**
- `/mcp/worker.js` — rebuilt against v17 schema and v40+ data, adding `find_signal_implications`, extending `find_loose_ends`. Cloudflare worker redeploy per `PROJECT_INFRASTRUCTURE.md` §3.
- `/data/Map_v34_consolidated.json` — Phase B authoring populates `if_real_implies` per the §9.2 subfield sweeps. The filename and `dataset_version` are unchanged by the schema bump itself; `_meta._schema` updates to `"Map_v17_schema.json"` when Phase B authoring begins.
- `/explorer/explorer-*.js` — eventually surfaces `if_real_implies` entries in the carrier-node side panel and exposes a per-resolution drill-down. Decoupled from the schema landing per the same forward-compatibility analysis that applied to v16; the explorer keeps working through the schema bump.

---

## 11. What this spec does not establish

- The specific `if_real_implies` entries for any carrier. Authoring decisions, downstream (Steps 4+).
- The list of literature positions for each carrier that satisfy the §4 admissibility test. Each is an authoring-pass research task.
- The implementation of `find_signal_implications` and the `find_loose_ends` extension. Worker rebuild, downstream (Step N+1).
- The explorer's visual treatment of `if_real_implies` entries (per-resolution drill-down, conditional-consequence rendering, distinct-from-existing-content visual treatment). Explorer concern, decoupled from the schema landing.
- The Phase B → Phase C transition for shared concerns (scale-bounding of consequences, experimental-discriminator coupling). Phase C spec, downstream.

---

## 12. Closing note

Phase B is small in schema-delta terms — one optional field on two node types, two new `$defs`, four conditional rules, three validator rules — and large in unlocked content. Unlike Phase A, the unlocked content is not already in v40; it is the body of literature-stated conditional structural claims across the subfields that hold the map's open questions. The schema makes that content authorable with citation discipline; the §4 admissibility test gates which claims actually land.

The schema is the precondition for the worker rebuild, which is the precondition for the on-target test in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6.2 ("What does a live anomaly imply structurally?") to be runnable. Until Phase B authoring populates `if_real_implies` entries on at least the muon-g-2, Koide, strong-CP, and CC carriers, that test returns the empty set and the layer's flagship demonstration is incomplete.

Phase B is where pattern-finding can most easily slide into pattern-asserting. The §4 admissibility test is the spec's commitment that the slide will not happen on this layer's watch. The test is binding for every authoring pass; the schema enforces its citation-shape constraints; the firewall doc (`META_v21_1_methodology_firewall.md`) is the parent that gives the test its standing. The chain — spec → schema JSON → validator → authoring → MCP rebuild — is each step achievable in its own PR, each gated by the CI tripwire, and each carrying its own §2.5 self-check in its PR description.

Once the chain reaches the worker rebuild, an AI working with a physicist can ask "what would have to be true structurally for this anomaly to count as signal?" and get a real, citation-anchored list back. That is the second concrete non-trivial Mendeleev contribution the map is positioned to deliver — the first being Phase A's forced-cell surfacing — and Phase B is what makes it deliverable.

---

*End of MAP_v17_schema_spec_extension.md, v1.*
