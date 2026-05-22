# MAP v18 schema-spec extension — Phase C of the Predictive Layer

**Document type:** Schema specification. Defines the v17 → v18 schema bump for Phase C of the Predictive Layer. Companion file to `/schema/Map_v18_schema.json` (downstream deliverable, Step 2) and `/scripts/validate.py` extensions (downstream deliverable, Step 3).

**Status:** v1. Authored 2026-05-21, downstream from `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2 Moves 2 + 5 and §3.4 + §3.5, and from `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`. Phase C scope only.

**Parent docs:** `PROJECT_GOAL.md` (structural goal, §4 type discipline), `PROJECT_GOAL_PHENOMENON_LAYER.md` (coverage goal), `PROJECT_GOAL_PREDICTIVE_LAYER.md` (the layer this schema implements), `META_v21_1_methodology_firewall.md` (firewall), `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` (settles the six shape decisions this spec implements), `MAP_v17_schema_spec_extension.md` (Phase B, the immediately preceding bump), `MAP_v16_schema_spec_extension.md` (Phase A, the bump preceding that).

---

## 0. What this document is

This spec defines the schema extensions that make Phase C of the Predictive Layer authorable. It covers two new mechanisms — `quantitative_scale` (a structured numerical-commitment field permitted on five distinct surfaces) and `resolves` (a new edge type from `experimental-program` nodes to cells, frontiers, and totality-approaches) — together with the new `$defs` for their nested structure, the conditional validation rules that prevent malformed entries, the validator-side rules that enforce cross-field invariants, and the binding admissibility test that gates authoring.

It does **not** cover any further Predictive Layer mechanisms; Phase C closes the layer. Subsequent schema bumps (v19+) will be motivated by authoring friction in tracks beyond the Predictive Layer (per `META_v21_1_methodology_firewall.md` §5 — schema bumps are triggered by repeated authoring friction, not by anticipated need).

The spec is binding for the schema file (`/schema/Map_v18_schema.json`, Step 2), for the CI validator (`/scripts/validate.py`, Step 3), and for any authoring that lands `quantitative_scale` content or `resolves` edges (Steps 4.1–4.5). The MCP worker (`/mcp/worker.js`) gets rebuilt against this schema as the final Phase C step (Step N+1); the worker is downstream of the schema, not a precondition for it.

The §4 admissibility test is the highest-stakes part of this spec. Phase A's firewall test ("is this making existing structure explicit?") applies in the limit — most `quantitative_scale` entries surface numerical content already in v41 cell descriptions, frontier prose, or citation text. Phase B's test (literature-position antecedent + structural-derivation consequent + both cite) does not apply because Phase C's content is empirical-numerical rather than conditional-structural. Phase C needs its own criterion, tighter than either predecessor because numerical claims are checkable against experiment in a way structural claims are not.

---

## 1. Motivation

Phase A made the existing structural backbone machine-explicit (forced cells, structurally-excluded cells, axis-mappings). Phase B added the forward-looking conditional move (`if_real_implies` on the 17 carrier nodes). Phase C is the final pair of Predictive Layer mechanisms named in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2:

- **Move 2 / Mechanism #1** (`quantitative_scale`) — turn categorical statuses into quantitative bets by attaching structured numerical commitments to frontier nodes, cells, predictions, `bears-on` edges, and Phase B's `if_real_implies` implications. The v41 dataset already carries this information in prose (frontier descriptions citing the hierarchy ratio of $\sim\!10^{17}$, cell descriptions giving particle masses, prediction text reporting BMW lattice HVP values); Phase C makes it structured.
- **Move 5 / Mechanism #6** (`resolves`) — close the loop between the map and the lab. A new edge type from experimental-program nodes (12 new forward-looking nodes added in Step 0.5: `dune`, `hyper-k`, `juno`, `gw-ground-network`, `lisa`, `cmb-s4`, `rubin-lsst`, `desi`, `axion-haloscope-network`, `edm-program`, `muon-g-2-continuation`, `fcc`) to cells and frontiers, carrying documented sensitivity, timeline, and a `predictions_per_program` substructure that makes the edge discriminative rather than merely promissory.

These two mechanisms close the AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2 — once they land, the flagship query `find_discriminating_experiments(program_a, program_b)` is implementable: given two candidate programs targeting the same frontier, return every experiment that would distinguish them with documented sensitivity. That is the Mendeleev-style demonstration the project was scoped to deliver; Phase C is what makes it queryable.

The firewall consequence is the same as Phase B's, with one tightening: numerical claims are checkable against experiment in a way structural claims are not, so the §4 admissibility test for Phase C is sharper than Phase B's. Pattern-finding cannot slide into pattern-asserting because the test requires that every numerical value name a citable measurement or calculation.

---

## 2. The new field: `quantitative_scale`

**Carrier surfaces.** `quantitative_scale` is permitted as an optional field on five distinct surfaces, per scope memo §1:

1. **`open-frontier` and `totality-approach` nodes** — top-level frontier-scale. 17 carriers in v41.
2. **`cell` objects** — cell-level numerical content. 484 cells in v41.
3. **`prediction` objects** — both in the FC-level `predictive_yield[]` array and in the cell-level `predictions[]` array. 223 predictions in v41 (the `prediction` `$def` is shared, so the same schema delta covers both surfaces).
4. **`bears-on` edges** (FC → frontier) — edge-level scale band. Permitted only when `type: bears-on`.
5. **`if_real_implies_implication` objects** (Phase B field, optional refinement) — conditional-consequence-scale. When a Phase B implication carries a quantitative consequence, the scale lands here.

`quantitative_scale` is **never required** at any surface. Absence means no quantitative claim is recorded; absence does not imply zero, indeterminate, or any other value. (Same convention as Phase A's `constructive_status`, Phase B's `if_real_implies`.)

Architectures, regime-content nodes, candidate-foundational programs, experimental-program nodes, and formal-classification nodes themselves do **not** carry `quantitative_scale` directly. They carry numerical commitments via the cells they host, the frontiers they target, the predictions they make, and (for experimental programs) the `sensitivity` field on the `resolves` edges they originate.

**Schema delta — top-level field on the carrier surfaces.** A single field declaration is reused on all five surfaces:

```json
"quantitative_scale": {
  "$ref": "#/$defs/quantitative_scale"
}
```

This goes on the `node` `$def` (gated by §3.1 to the two carrier node types), the `cell` `$def`, the `prediction` `$def`, the `edge` `$def` (gated by §3.5 to `bears-on` edges), and the `if_real_implies_implication` `$def`.

**Schema delta — new `$defs`:**

```json
"quantitative_scale_kind": {
  "type": "string",
  "enum": [
    "energy_scale",
    "mass",
    "length",
    "time",
    "ratio",
    "coupling",
    "dimensionless",
    "sigma_deviation"
  ],
  "description": "v18. Discriminator for the kind of quantitative quantity recorded. See spec §2 for kind semantics."
}
```

```json
"quantitative_scale_uncertainty": {
  "oneOf": [
    { "type": "number" },
    {
      "type": "object",
      "required": ["low", "high"],
      "properties": {
        "low": { "type": "number" },
        "high": { "type": "number" }
      },
      "additionalProperties": false
    },
    { "type": "null" }
  ],
  "description": "v18. Uncertainty on the recorded value. A single number is interpreted as symmetric ±uncertainty in the same units; an object specifies asymmetric {low, high} bounds at 68% CL by convention; null records that no uncertainty is given (distinct from uncertainty = 0). The schema does not enforce a CL convention; entries cite their source's convention via the parent quantitative_scale's citations field."
}
```

```json
"quantitative_scale": {
  "type": "object",
  "required": ["kind", "value", "citations"],
  "properties": {
    "kind": { "$ref": "#/$defs/quantitative_scale_kind" },
    "value": {
      "type": "number",
      "description": "v18. The numerical value. Interpreted as the quantity itself when log10 is absent or false; interpreted as the base-10 logarithm of the underlying quantity when log10 is true (see §2 log10 semantics)."
    },
    "units": {
      "type": "string",
      "description": "v18. Units of the value (required for the dimensional kinds energy_scale / mass / length / time / coupling; forbidden for the dimensionless kinds ratio / dimensionless / sigma_deviation per §3.2-3.3). Typical strings: GeV, TeV, MeV, eV for energies/masses; m, fm, Mpc, kpc for lengths; s, yr for times; dimensionless for couplings (e.g., '1' or omitted)."
    },
    "uncertainty": { "$ref": "#/$defs/quantitative_scale_uncertainty" },
    "log10": {
      "type": "boolean",
      "description": "v18. When true, value is the base-10 logarithm of the underlying quantity (used for order-of-magnitude claims). Permitted only on the six kinds where it is meaningful (ratio, energy_scale, mass, length, time, coupling); forbidden on dimensionless and sigma_deviation per §3.4."
    },
    "citations": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "description": "v18. Publications sourcing the numerical value. Required non-empty per the §4 admissibility test part (1)."
    }
  },
  "additionalProperties": false
}
```

**Semantics of each `kind` value.**

- `energy_scale` — characteristic energy, scale-of-failure, or scale at which an effective description breaks down. Units required (typically GeV, TeV, eV). Examples: Planck scale, electroweak vacuum expectation value $v$, QCD scale $\Lambda_\mathrm{QCD}$.
- `mass` — particle mass, hadronic mass, or other mass observable. Units required (typically GeV, MeV, eV). Examples: top-quark mass, neutrino mass-sum bound, axion mass-band benchmark.
- `length` — characteristic length, correlation length, or scale-of-applicability in spatial coordinates. Units required (typically m, fm, Mpc). Examples: Planck length, hadronic radius, BAO scale.
- `time` — characteristic time, lifetime, or epoch. Units required (typically s, yr, Hubble time). Examples: proton-decay half-life lower bound, BH evaporation timescale.
- `ratio` — dimensionless ratio of two scales. Units omitted; `log10: true` is the natural form for order-of-magnitude claims. Examples: hierarchy ratio $M_\mathrm{Pl}/v \sim 10^{17}$, $\eta_B$ (baryon-to-photon ratio).
- `coupling` — dimensionless coupling strength. Units omitted by convention (couplings are dimensionless after canonical normalization). Examples: fine-structure constant $\alpha \approx 1/137$, axion-photon coupling $g_{a\gamma\gamma}$ benchmark.
- `dimensionless` — any other dimensionless quantity not better captured as ratio or coupling. Units omitted. Examples: critical exponents, Koide's $Q \approx 2/3$, tensor-to-scalar ratio $r$.
- `sigma_deviation` — measurement-vs-prediction discrepancy in standard deviations. Units omitted. Examples: muon g-2 at $\sim 4.2\sigma$, DESI Year-1 $w_0w_a$ at $\sim 2.6\sigma$ from $\Lambda\mathrm{CDM}$.

**`log10` semantics.** When `log10: true`, `value` is the base-10 logarithm of the underlying quantity (e.g., `value: 17, log10: true, kind: ratio` records "the hierarchy ratio is $\sim\!10^{17}$"). When `log10` is absent or `false`, `value` is the quantity itself. Use `log10` when the order of magnitude is the load-bearing fact and precision below a factor of $\sim\!2$–$5$ is not the point.

**Uncertainty.** Either a symmetric value (single number — interpreted as $\pm$value in the parent's units), an asymmetric `{low, high}` object (low and high deltas, both positive numbers, interpreted as 68% CL by convention), or `null` (no uncertainty recorded — distinct from uncertainty = 0, which is a falsifiable claim). The schema permits all three forms; choice is per-entry.

**When absent.** The field is optional everywhere. Absence on a carrier surface means no quantitative claim is recorded. Tools and renderers should not infer "no numerical content" from absence — many existing v41 cells carry numerical content in their `description` field that has not yet been lifted into `quantitative_scale`; absence may simply mean Phase C authoring hasn't reached that surface yet.

---

## 3. The new edge type: `resolves`

**Carrier types.** `resolves` is a new edge type per scope memo §3:

- **`from`** — must be an `experimental-program` node id.
- **`to`** — must be either a `cell` id (the edge resolves a specific cell), an `open-frontier` id (resolves the frontier itself), or a `totality-approach` id (resolves the totality-approach).

This is a separate edge type from `bears-on`, not a strengthening of `bears-on:partially-solves`. `bears-on` connects a formal-classification to a frontier (the FC structurally addresses part of the frontier); `resolves` connects an experimental-program to a frontier or cell (a lab apparatus will, with documented sensitivity, push the frontier toward resolution). Different source-node types, different semantics, different downstream uses. No existing `bears-on:partially-solves` edge is migrated, retyped, or modified by Phase C.

**Schema delta — extend the `edge_type` enum:**

```json
"edge_type": {
  "type": "string",
  "enum": [
    "candidate-hosting",
    "candidate-targeting",
    "emergence",
    "cross-architecture-emergence",
    "open-frontier-architecture-edge",
    "open-frontier-content-edge",
    "multi-architecture-interference-edge",
    "bears-on",
    "uses-classification",
    "produces-classification",
    "cross-classification",
    "resolves"
  ]
}
```

**Schema delta — new `$defs`:**

```json
"resolves_timeline": {
  "type": "string",
  "enum": [
    "deployed",
    "running",
    "planned-by-2030",
    "planned-by-2035",
    "planned-by-2040",
    "proposed"
  ],
  "description": "v18. Operational-state enum for resolves edges. deployed = already taking data; running = currently operating with scheduled runs ahead; planned-by-YYYY = funded/approved with first physics expected by the named year (three year-buckets at half-decade granularity); proposed = concept stage, not yet funded."
}
```

```json
"resolves_predictions_per_program_entry": {
  "type": "object",
  "required": ["program", "predicted_value", "description", "citations"],
  "properties": {
    "program": {
      "type": "string",
      "description": "v18. id of the candidate-foundational program, architecture, totality-approach, or candidate-resolution being characterized. Need not be a node id — may be a candidate_targeting program string already used elsewhere on the carrier (e.g., 'WIMP candidates (SUSY neutralinos, generic weak-scale)' as it appears in dark-matter's candidate_targeting)."
    },
    "predicted_value": { "$ref": "#/$defs/quantitative_scale" },
    "description": {
      "type": "string",
      "description": "v18. One-line gloss of what the program predicts for the experimental observable."
    },
    "citations": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "description": "v18. Publications where the per-program prediction is calculated. Required non-empty per the §4 admissibility test part (2)."
    }
  },
  "additionalProperties": false
}
```

**Schema delta — fields added to the `edge` `$def` (conditionally gated to `resolves` edges per §3.5):**

```json
"sensitivity": {
  "$ref": "#/$defs/quantitative_scale",
  "description": "v18. The experiment's documented sensitivity to the observable being measured. Cited from the experimental program's design report, proposal, or published projection."
},
"timeline": {
  "$ref": "#/$defs/resolves_timeline"
},
"predictions_per_program": {
  "type": "array",
  "items": { "$ref": "#/$defs/resolves_predictions_per_program_entry" },
  "description": "v18. Per-program predictions for the experimental observable. Each entry pairs a candidate program with its predicted value, description, and cited derivation. Empty array permitted only when exclusion_only is true (§3.7)."
},
"exclusion_only": {
  "type": "boolean",
  "description": "v18. When true, the experiment is documented as exclusion-only — it narrows the candidate space without producing discriminating per-program predictions. Permits predictions_per_program to be empty (§3.7). When false or absent, predictions_per_program must be non-empty."
}
```

The existing edge fields `id`, `type`, `from`, `to`, `description`, `citations` continue to apply (and `citations` continues to be required on edges per the existing edge schema).

**Required when.** `sensitivity` and `timeline` are required on every `resolves` edge. `predictions_per_program` is required to be present (the field) but permitted to be empty if `exclusion_only: true` is also set. See §3.6, §3.7.

**Asymmetry with `bears-on`.** A frontier with extensive `bears-on` edges and no `resolves` edges has substantial structural understanding but no clear experimental path to settling its open content. A frontier with `resolves` edges but no `bears-on` is structurally orphaned but empirically tractable. Both states are visible from the v18 data — and informative; the asymmetry is structural, not a defect to repair.

---

## 4. Phase C admissibility test (binding)

The following test is reproduced verbatim from `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` §4. It is binding for every Phase C authoring pass and supersedes the Phase B firewall test for this layer. Failure of any of the three parts disqualifies a `quantitative_scale` entry or a `resolves` edge.

> **Three-part test.**
>
> 1. **The value is a literature value.** Every `quantitative_scale` entry's `value` (and `uncertainty` if present) names a measurement, calculation, or canonical reference in the published literature. `citations` is non-empty (validator-enforced: `minItems: 1`). Values inferred by the cartographer from cross-classification pattern, from analogy with other cells, or from arithmetic on other cells' values without a published source are inadmissible.
>
> 2. **Per-program predictions are program-internal calculations.** Every entry in `predictions_per_program[]` on a `resolves` edge cites the program-internal calculation or paper that produces the per-program value. A per-program prediction inferred by pattern from other programs' predictions, or invented to fill a discriminator slot, is inadmissible. If the program does not have a published prediction for the experimental observable, the entry is omitted rather than invented.
>
> 3. **Sensitivities cite the experimental design.** A `resolves` edge's `sensitivity` field cites the design report, proposal, or published projection from the experimental program itself. Sensitivities estimated by the cartographer from raw-flux-times-runtime calculations, or extrapolated from analogous experiments without citation, are inadmissible.
>
> **§2.5 self-check restated for Phase C.** Before adding each `quantitative_scale` or `resolves` entry: *"Would I record this numerical claim — value, uncertainty, sensitivity, predicted-value — if I had only the source literature and not the v41 dataset structure in front of me? Specifically, is the value I am about to write the value the citation says, or is it my reconstruction from context?"* PR descriptions record that the self-check was applied per-entry. A "the source says ≈10¹⁶ and I'm rendering it as `value: 16, log10: true`" answer passes (faithful rendering of a citable value). A "the source describes the effect qualitatively but doesn't name a number; I'm estimating from the surrounding paragraphs" answer fails.

The test rules out values inferred by cartographer arithmetic on other cells' values without published source, sensitivities estimated from raw-detector specifications without a design-report citation, and per-program predictions invented to fill discriminator slots when the program has no published calculation for the observable. It admits values where the cited source states the number explicitly (or names it to the order of magnitude when `log10: true`), sensitivities the experimental program's own design report names, and per-program predictions whose derivation a working subfield specialist would recognize as belonging to that program.

**What the validator checks and does not check.** The validator does not check citation *quality* or numerical *accuracy* — whether the cited measurement is well-regarded, whether the calculation is correct, whether the value is sound physics. Those are physicist-review work, downstream of the Phase C MCP rebuild and Track 4 (review pathway). The validator checks only structural conformance: that the citation arrays are non-empty (Rules per §2 and §3's `minItems`), that units are required/forbidden per the kind taxonomy (Rules 29–30), that `log10` is permitted only on the six dimensional/ratio/coupling kinds (Rule 31), that `resolves` edges have `experimental-program`-typed sources (Rule 32), and that target ids resolve to the correct node type per the target's class (Rule 33). The §4 test is therefore enforced at three levels: (a) schema, via citation-array shape and unit-conformance conditionals; (b) self-check, via author discipline recorded in PR descriptions; (c) review, via downstream physicist engagement. None of these levels substitutes for the others.

**Why Phase C needs its own test.** Phase A's test ("is this making existing structure explicit?") applies only in the limit where the numerical content is already in v41 prose; many quantitative entries will surface content not yet captured anywhere, so Phase A's criterion is incomplete. Phase B's test (literature-position antecedent + structural-derivation consequent + both cite) does not apply because Phase C records empirical-numerical content rather than conditional-structural content — the units of evidence are different. The three-part test above is the firewall's Phase C form; it preserves the firewall's intent (no back-influence from pattern-finding to authoring) by binding admissibility to literature-stated numerical values, program-internal calculations, and design-report-named sensitivities rather than to dataset pattern.

---

## 5. Conditional validation rules (JSON Schema)

The following rules are added to the existing `allOf` arrays in the relevant `$def` definitions. They preserve the v17 rules unchanged.

### 5.1 Node-type rule: `quantitative_scale` on nodes is permitted only on carrier types

```json
{
  "_comment": "v18 §5.1 — top-level quantitative_scale restricted to open-frontier and totality-approach",
  "if": {
    "not": {
      "properties": {
        "type": { "enum": ["open-frontier", "totality-approach"] }
      },
      "required": ["type"]
    }
  },
  "then": {
    "properties": { "quantitative_scale": false }
  }
}
```

### 5.2 Kind rule: `units` is required for the dimensional kinds

```json
{
  "_comment": "v18 §5.2 — units required for energy_scale / mass / length / time / coupling",
  "if": {
    "properties": {
      "kind": { "enum": ["energy_scale", "mass", "length", "time", "coupling"] }
    },
    "required": ["kind"]
  },
  "then": { "required": ["units"] }
}
```

### 5.3 Kind rule: `units` is forbidden for the strictly-dimensionless kinds

```json
{
  "_comment": "v18 §5.3 — units forbidden for ratio / dimensionless / sigma_deviation",
  "if": {
    "properties": {
      "kind": { "enum": ["ratio", "dimensionless", "sigma_deviation"] }
    },
    "required": ["kind"]
  },
  "then": {
    "properties": { "units": false }
  }
}
```

(Note: `coupling` is dimensionless but the convention in §2 permits `units` to record the normalization choice for non-standard couplings; the rule lists it among the dimensional kinds in §5.2 to keep the units string available, though it is typically omitted in practice.)

### 5.4 Kind rule: `log10` is forbidden for `dimensionless` and `sigma_deviation`

```json
{
  "_comment": "v18 §5.4 — log10 forbidden for dimensionless and sigma_deviation (the two kinds where it is not meaningful)",
  "if": {
    "properties": {
      "kind": { "enum": ["dimensionless", "sigma_deviation"] }
    },
    "required": ["kind"]
  },
  "then": {
    "properties": { "log10": false }
  }
}
```

### 5.5 Edge-type rule: `resolves`-only fields are forbidden on non-`resolves` edges

```json
{
  "_comment": "v18 §5.5 — sensitivity, timeline, predictions_per_program, exclusion_only forbidden on non-resolves edges",
  "if": {
    "not": {
      "properties": { "type": { "const": "resolves" } },
      "required": ["type"]
    }
  },
  "then": {
    "properties": {
      "sensitivity": false,
      "timeline": false,
      "predictions_per_program": false,
      "exclusion_only": false
    }
  }
}
```

### 5.6 Edge-type rule: `resolves` edges require `sensitivity`, `timeline`, and `predictions_per_program`

```json
{
  "_comment": "v18 §5.6 — resolves edges require the Phase C edge fields",
  "if": {
    "properties": { "type": { "const": "resolves" } },
    "required": ["type"]
  },
  "then": {
    "required": ["sensitivity", "timeline", "predictions_per_program"]
  }
}
```

### 5.7 Edge field rule: `quantitative_scale` on edges is permitted only on `bears-on` edges

```json
{
  "_comment": "v18 §5.7 — edge-level quantitative_scale restricted to bears-on (resolves uses sensitivity instead)",
  "if": {
    "not": {
      "properties": { "type": { "const": "bears-on" } },
      "required": ["type"]
    }
  },
  "then": {
    "properties": { "quantitative_scale": false }
  }
}
```

These seven rules are sufficient at the JSON-Schema level. Cross-field validity — does the referenced edge `from`/`to` id actually resolve to the correct node type? does `predictions_per_program` being empty coincide with `exclusion_only: true`? — is enforced at the validator-side level (§6 below). JSON Schema cannot express these checks because they require lookup across array elements.

---

## 6. Validator-side rules (extending `_validator_side_rules`)

The following rules continue the v17 numbered sequence. v17 ended at Rule 26; Phase C adds Rules 27–33. Add to `_validator_side_rules` in the schema file, and implement in `/scripts/validate.py`.

**Rule 27 — `predictions_per_program` non-empty unless `exclusion_only` is true.** For each `resolves` edge, if `predictions_per_program` is an empty array, then `exclusion_only` must be present and equal to `true`. If `predictions_per_program` is non-empty, `exclusion_only` is either absent or `false`. Failure: hard error. This rule operationalizes scope memo §3's "predictions_per_program either non-empty with cited per-program values, or an explicit note that the experiment is exclusion-only with citation."

**Rule 28 — Per-entry citation presence on `predictions_per_program`.** For each entry in `predictions_per_program[]`, the `citations` array must be non-empty AND the `predicted_value`'s `citations` array must be non-empty. (The first is enforced by `minItems: 1` on the entry's citations; the second by the same constraint on the embedded `quantitative_scale`. Validator provides defense-in-depth.) Failure: hard error.

**Rule 29 — `resolves` edge source is `experimental-program`.** For each `resolves` edge, the node referenced by `from` must be of type `experimental-program`. The 19 v41 experimental-program nodes (7 historical + 12 forward-looking from Step 0.5) are the only admissible sources. Failure: hard error.

**Rule 30 — `resolves` edge target is `cell`, `open-frontier`, or `totality-approach`.** For each `resolves` edge, the id referenced by `to` must resolve to either (a) a cell id in some formal-classification node's `cells[]` array, or (b) an `open-frontier` node id, or (c) a `totality-approach` node id. Targets resolving to architectures, regime-content nodes, candidate-foundational programs, FCs as a whole, or other experimental-program nodes are forbidden. Failure: hard error.

**Rule 31 — `quantitative_scale` units conformance.** For each `quantitative_scale` entry (on any surface), if `kind ∈ {energy_scale, mass, length, time, coupling}` then `units` must be present and a non-empty string. If `kind ∈ {ratio, dimensionless, sigma_deviation}` then `units` must be absent. (Already enforced by §5.2 + §5.3 at JSON-Schema level; redundant validator check provides defense-in-depth.) Failure: hard error.

**Rule 32 — `quantitative_scale` log10 conformance.** For each `quantitative_scale` entry, if `kind ∈ {dimensionless, sigma_deviation}` then `log10` must be absent. (Already enforced by §5.4 at JSON-Schema level.) Failure: hard error.

**Rule 33 — `quantitative_scale` citation presence.** For each `quantitative_scale` entry (on any surface, including nested inside `resolves` edges and `predictions_per_program` entries), the `citations` array must be non-empty. (Already enforced by `minItems: 1` in §2's `$def`; validator provides defense-in-depth.) Failure: hard error.

There is no warning-level rule in Phase C by design — absence of `quantitative_scale` entries reflects either absence of citable evidence per the §4 firewall, or absence of authoring effort to lift prose content into structured form. Neither warrants a CI nudge: the first is the correct firewall outcome, and the second is for the maintainer to prioritize against other tracks.

---

## 7. Examples

The following examples illustrate `quantitative_scale` entries and `resolves` edges grounded in v41 content. They are *illustrative* — actual Phase C authoring sweeps will draft their own entries against the §4 admissibility test, and the entries below would themselves need PR review before landing.

### 7.1 Frontier-level scale: `hierarchy-problem`

```json
{
  "id": "hierarchy-problem",
  "type": "open-frontier",
  "label": "Hierarchy",
  "quantitative_scale": {
    "kind": "ratio",
    "value": 17,
    "log10": true,
    "uncertainty": null,
    "citations": [
      "Wilson 1971 'Renormalization Group and Strong Interactions' PRD 3:1818",
      "'t Hooft 1980 'Naturalness, Chiral Symmetry, and Spontaneous Chiral Symmetry Breaking' NATO Sci. Ser. B 59:135",
      "Particle Data Group 2024"
    ]
  }
}
```

The cited value is the canonical hierarchy ratio $M_\mathrm{Pl}/v \sim 10^{17}$, recorded as `value: 17, log10: true` since the order of magnitude is the load-bearing fact (not the precise value to several digits).

### 7.2 Cell-level scale and prediction-level scale: `sm-rep-content` top quark

```json
{
  "axis_values": { "field_type": "quark", "chirality": "right-handed", "generation": 3, "isospin": "down-type" },
  "content": "Right-handed top quark t_R",
  "cell_id": "sm-tR-3",
  "quantitative_scale": {
    "kind": "mass",
    "value": 172.69,
    "units": "GeV",
    "uncertainty": 0.30,
    "citations": [
      "Particle Data Group 2024 'Review of Particle Physics' PTEP 2024:083C01"
    ]
  },
  "predictions": [
    {
      "prediction": "Top quark mass between 150 and 200 GeV from electroweak precision constraints prior to direct observation",
      "status": "confirmed",
      "confirmation_citation": "CDF + D0 1995 (direct top observation)",
      "quantitative_scale": {
        "kind": "mass",
        "value": 173,
        "units": "GeV",
        "uncertainty": { "low": 23, "high": 27 },
        "citations": [
          "ALEPH/DELPHI/L3/OPAL/LEP EW Working Group 1995 'Electroweak parameters of the Z resonance' Phys. Lett. B 350:298"
        ]
      }
    }
  ]
}
```

This entry illustrates the shared-`prediction`-shape carrier: the same `quantitative_scale` schema applies to the cell-level field (recording the measured top mass) and to the prediction-level field (recording the pre-discovery EW-precision prediction window).

### 7.3 Prediction-level scale with `sigma_deviation` kind: muon g-2

```json
{
  "prediction": "Muon anomalous magnetic moment a_μ measured at Fermilab E989 shows a discrepancy with the Theory Initiative 2020 dispersive-HVP SM prediction",
  "status": "unconfirmed-tension",
  "confirmation_citation": "Aguillard et al. 2023 'Measurement of the Positive Muon Anomalous Magnetic Moment to 0.20 ppm' PRL 131:161802",
  "quantitative_scale": {
    "kind": "sigma_deviation",
    "value": 5.1,
    "uncertainty": null,
    "citations": [
      "Aguillard et al. 2023 PRL 131:161802",
      "Aoyama et al. 2020 'The anomalous magnetic moment of the muon in the Standard Model' Phys. Rep. 887:1"
    ]
  }
}
```

The value is the cited Run-1+2+3 vs. Theory Initiative 2020 dispersive-HVP deviation; the §4 test passes because the number is stated in the cited paper, not reconstructed by the cartographer. (A separate `quantitative_scale` entry could record the deviation against BMW lattice-HVP, where the discrepancy narrows substantially — that would be a second prediction entry, not a competing `quantitative_scale` on the same entry.)

### 7.4 `resolves` edge: `hyper-k` resolves `su5-gut-rep-content` proton-decay cells

```json
{
  "id": "edge-rs-hyper-k-resolves-pdecay",
  "type": "resolves",
  "from": "hyper-k",
  "to": "su5-gut-pdecay-epi0-cell",
  "description": "Hyper-Kamiokande will resolve the SU(5) GUT prediction of proton decay via the p → e+ π0 channel.",
  "sensitivity": {
    "kind": "time",
    "value": 35,
    "log10": true,
    "units": "yr",
    "uncertainty": null,
    "citations": [
      "Hyper-Kamiokande Proto-Collaboration 2018 'Hyper-Kamiokande Design Report' arXiv:1805.04163 §4.3"
    ]
  },
  "timeline": "planned-by-2035",
  "predictions_per_program": [
    {
      "program": "su5-gut-program",
      "predicted_value": {
        "kind": "time",
        "value": 33,
        "log10": true,
        "units": "yr",
        "uncertainty": { "low": 0.5, "high": 1.5 },
        "citations": [
          "Langacker 1981 'Grand Unified Theories and Proton Decay' Phys. Rep. 72:185",
          "Nath-Fileviez Pérez 2007 'Proton stability in grand unified theories, in strings and in branes' Phys. Rep. 441:191"
        ]
      },
      "description": "Minimal SU(5) GUT predicts partial proton-decay lifetime τ(p→e+π0) ≈ 10³³ yr, already falsified by Super-Kamiokande's >10³⁴ yr bound; non-minimal SU(5) variants push the prediction to 10³⁴–10³⁶ yr, the band Hyper-K probes.",
      "citations": [
        "Langacker 1981 Phys. Rep. 72:185",
        "Super-Kamiokande Collaboration 2017 'Search for proton decay via p→e+π0' Phys. Rev. D 95:012004"
      ]
    },
    {
      "program": "flipped-su5-program",
      "predicted_value": {
        "kind": "time",
        "value": 36,
        "log10": true,
        "units": "yr",
        "uncertainty": { "low": 1, "high": 1 },
        "citations": [
          "Antoniadis-Ellis-Hagelin-Nanopoulos 1987 'Supersymmetric flipped SU(5) revitalized' Phys. Lett. B 194:231"
        ]
      },
      "description": "Flipped SU(5) GUT suppresses p→e+π0 to ~10³⁶ yr, outside Hyper-K's reach but within next-generation Hyper-K-class detectors.",
      "citations": [
        "Ellis-Garcia-Nanopoulos-Olive 2002 'Beyond the Standard Model with the SU(5) × U(1) flipped GUT' Eur. Phys. J. C 28:181"
      ]
    }
  ],
  "citations": [
    "Hyper-Kamiokande Proto-Collaboration 2018 'Hyper-Kamiokande Design Report' arXiv:1805.04163"
  ]
}
```

This is the canonical discriminative `resolves` edge: Hyper-K's 10³⁵-yr sensitivity sits between minimal SU(5)'s prediction (already falsified) and flipped SU(5)'s (out of reach), so the edge's three citations record the structural ground truth: minimal SU(5) is *already* falsified, flipped SU(5) is *not yet* discriminated, and Hyper-K is the experiment that moves both.

### 7.5 `resolves` edge: `axion-haloscope-network` resolves `strong-cp-problem`

```json
{
  "id": "edge-rs-axion-haloscopes-resolves-strongcp",
  "type": "resolves",
  "from": "axion-haloscope-network",
  "to": "strong-cp-problem",
  "description": "The axion haloscope programme directly tests the Peccei-Quinn solution to the strong-CP problem by searching for galactic-halo dark-matter axions at QCD-axion benchmark couplings.",
  "sensitivity": {
    "kind": "coupling",
    "value": -16,
    "log10": true,
    "units": "GeV^-1",
    "uncertainty": null,
    "citations": [
      "Du et al. (ADMX) 2018 PRL 120:151301",
      "Brun et al. (MADMAX) 2019 EPJ C 79:186"
    ]
  },
  "timeline": "running",
  "predictions_per_program": [
    {
      "program": "Peccei-Quinn / axion (DFSZ)",
      "predicted_value": {
        "kind": "coupling",
        "value": -16,
        "log10": true,
        "units": "GeV^-1",
        "uncertainty": { "low": 0.5, "high": 0.5 },
        "citations": [
          "Dine-Fischler-Srednicki 1981 PLB 104:199",
          "Zhitnitsky 1980 Sov. J. Nucl. Phys. 31:260"
        ]
      },
      "description": "DFSZ-type QCD axion: g_aγγ ≈ 10⁻¹⁶ GeV⁻¹ at axion masses in the μeV range (galactic-halo DM mass window).",
      "citations": [
        "Dine-Fischler-Srednicki 1981 PLB 104:199"
      ]
    },
    {
      "program": "Peccei-Quinn / axion (KSVZ)",
      "predicted_value": {
        "kind": "coupling",
        "value": -15.5,
        "log10": true,
        "units": "GeV^-1",
        "uncertainty": { "low": 0.5, "high": 0.5 },
        "citations": [
          "Kim 1979 PRL 43:103",
          "Shifman-Vainshtein-Zakharov 1980 NPB 166:493"
        ]
      },
      "description": "KSVZ-type QCD axion: g_aγγ ≈ 10⁻¹⁵·⁵ GeV⁻¹, ~3× larger than DFSZ at fixed mass.",
      "citations": [
        "Kim 1979 PRL 43:103"
      ]
    }
  ],
  "citations": [
    "Du et al. (ADMX) 2018 'A Search for Invisible Axion Dark Matter with ADMX' PRL 120:151301",
    "Brun et al. (MADMAX) 2019 'A new experimental approach to probe QCD axion dark matter' EPJ C 79:186"
  ]
}
```

This edge discriminates between the two canonical QCD-axion benchmarks at the per-program level. ADMX has reached DFSZ sensitivity in part of its mass range; MADMAX extends the reach to higher masses.

### 7.6 `resolves` edge: `muon-g-2-continuation` resolves `muon-g-2` totality-approach

```json
{
  "id": "edge-rs-muon-g-2-continuation-resolves-muon-g-2",
  "type": "resolves",
  "from": "muon-g-2-continuation",
  "to": "muon-g-2",
  "description": "The Fermilab E989 final-run analysis combined with J-PARC E34's systematics-independent measurement will resolve whether the muon g-2 discrepancy is robust to storage-ring-method systematics. Combined with continued lattice-HVP and dispersive-method work, the programme settles the totality-approach's open question.",
  "sensitivity": {
    "kind": "dimensionless",
    "value": 1.4e-10,
    "uncertainty": null,
    "citations": [
      "Aguillard et al. 2023 PRL 131:161802",
      "Abe et al. (J-PARC E34) 2019 'A new approach for measuring the muon anomalous magnetic moment and electric dipole moment' PTEP 2019:053C02"
    ]
  },
  "timeline": "running",
  "predictions_per_program": [
    {
      "program": "Theory Initiative dispersive-HVP SM",
      "predicted_value": {
        "kind": "dimensionless",
        "value": 1.16591810e-3,
        "uncertainty": 4.3e-10,
        "citations": [
          "Aoyama et al. 2020 'The anomalous magnetic moment of the muon in the Standard Model' Phys. Rep. 887:1"
        ]
      },
      "description": "Theory Initiative 2020 SM prediction for a_μ using dispersive e+e- → hadrons HVP. Sits ~5σ below the Fermilab measurement.",
      "citations": [
        "Aoyama et al. 2020 Phys. Rep. 887:1"
      ]
    },
    {
      "program": "BMW lattice-HVP SM",
      "predicted_value": {
        "kind": "dimensionless",
        "value": 1.16591954e-3,
        "uncertainty": 5.5e-10,
        "citations": [
          "Borsanyi et al. (BMW) 2021 'Leading hadronic contribution to the muon magnetic moment from lattice QCD' Nature 593:51"
        ]
      },
      "description": "BMW 2021+ lattice-HVP SM prediction. Sits ~1σ below the Fermilab measurement — narrowing the interpretive space substantially.",
      "citations": [
        "Borsanyi et al. 2021 Nature 593:51"
      ]
    }
  ],
  "citations": [
    "Aguillard et al. 2023 PRL 131:161802",
    "Abe et al. (J-PARC E34) 2019 PTEP 2019:053C02"
  ]
}
```

The two per-program predictions are the two competing SM calculations. The Fermilab measurement falls between them; J-PARC's systematics-independent cross-check moves the experimental side, while the Theory Initiative vs. BMW reconciliation moves the theory side. The resolves edge captures both halves of the discriminator.

### 7.7 `resolves` edge with `exclusion_only: true`: `desi` on `cc-frontier`

```json
{
  "id": "edge-rs-desi-resolves-cc-frontier",
  "type": "resolves",
  "from": "desi",
  "to": "cc-frontier",
  "description": "DESI's BAO + RSD programme constrains the dark-energy equation-of-state (w_0, w_a) at sub-percent precision. Year-1 results reported a 2.6σ preference for an evolving w over the Λ baseline when combined with CMB + SNIa; the full 5-year programme will tighten or relax this tension. The exclusion-only flag is set because the experiment does not discriminate between specific named candidate-foundational programs (anthropic, holographic dark energy, modified gravity, etc.) at the predictions_per_program level — it narrows the (w_0, w_a) parameter space without testing program-internal calculations against each other.",
  "sensitivity": {
    "kind": "dimensionless",
    "value": 0.005,
    "uncertainty": null,
    "citations": [
      "DESI Collaboration 2016 'The DESI Experiment Part I: Science, Targeting, and Survey Design' arXiv:1611.00036"
    ]
  },
  "timeline": "running",
  "predictions_per_program": [],
  "exclusion_only": true,
  "citations": [
    "DESI Collaboration 2016 arXiv:1611.00036",
    "Adame et al. 2024 'DESI 2024 VI: Cosmological Constraints from BAO' arXiv:2404.03002"
  ]
}
```

This illustrates the exclusion-only escape hatch from Rule 27: the edge is structurally admissible without `predictions_per_program` because `exclusion_only: true` is set and the edge's `description` explains the exclusion-only character. The §4 firewall test is satisfied via the cited design report and Year-1 release; no per-program predictions need to be invented to populate the discriminator slot.

### 7.8 `quantitative_scale` on a Phase B `if_real_implies` implication

When a Phase B conditional consequence is quantitative, the implication carries a `quantitative_scale` recording the implied numerical claim:

```json
{
  "resolution": "susy-at-tev",
  "condition": "If TeV-scale supersymmetry resolves the hierarchy problem via stabilization of the Higgs mass against quadratic divergences",
  "condition_citations": [ "Dimopoulos-Georgi 1981", "Susskind 1979" ],
  "implications": [
    {
      "kind": "new_FC",
      "target": null,
      "description": "A new FC organizing minimal-superpartner-content (sleptons, squarks, gauginos, higgsinos) with axes (SM-partner × spin-shift × R-parity) would be forced.",
      "derivation_citations": [
        "Dimopoulos-Georgi 1981",
        "Pierce-Bagger-Matchev-Zhang 1997"
      ],
      "quantitative_scale": {
        "kind": "mass",
        "value": 1,
        "log10": true,
        "units": "TeV",
        "uncertainty": { "low": 0.3, "high": 0.7 },
        "citations": [
          "Martin 1997 'A supersymmetry primer' (revised through 2016)"
        ]
      }
    }
  ]
}
```

The `quantitative_scale` records the canonical SUSY-mass scale at which the hierarchy stabilization works. Phase B's structural consequence becomes a quantitative one without rewriting the Phase B field — the addition is composed, not invasive.

---

## 8. Out of scope (deferred to later schema bumps or other tracks)

Explicitly **not** in this spec, to prevent scope creep:

- **Structured axis-tuples for cells implied by Phase B `if_real_implies` `new_cell` kinds.** Phase B `new_cell` implications use a `target` of FC id and a free-text axis-tuple in `description`. Adding a structured axis-tuple to that implication shape is a v19+ candidate, motivated only if `find_signal_implications` consumers ask for it.
- **A `discriminating-pair` derived edge.** Two `resolves` edges that share a `to` target and have non-overlapping `predictions_per_program[].program` values constitute a discriminating pair. The MCP tool `find_discriminating_experiments(program_a, program_b)` will compute these from the resolves edges; no new edge type is needed in the data layer.
- **Sensitivity-vs-prediction comparison logic.** The validator does not check whether a `resolves` edge's `sensitivity` actually distinguishes the per-program predictions (e.g., whether Hyper-K's 10³⁵ yr sensitivity sits between minimal-SU(5)'s 10³³ yr and flipped-SU(5)'s 10³⁶ yr). That logic belongs in the MCP worker's downstream `find_discriminating_experiments` tool, not in CI.
- **Uncertainty propagation.** When a `predicted_value` and a `sensitivity` both carry uncertainties, downstream tooling may want to compute a discrimination significance. Phase C records the structured values; significance computation is downstream.
- **Bidirectional scale propagation between cells and predictions.** A cell that carries a `mass` `quantitative_scale` does not automatically propagate that value to predictions on the same cell. Each prediction's `quantitative_scale` is an independent claim with its own citations. No automatic propagation.
- **Author-side tooling for entry drafting.** A tool that surfaces a frontier's existing prose-quantitative content and prompts an author to lift it into structured form would be useful, but it is downstream of the worker rebuild (Step N+1) and not in this spec.
- **Cellification of architectures.** Out of scope for the Predictive Layer entirely (`PROJECT_GOAL_PREDICTIVE_LAYER.md` §4).

---

## 9. Tool-surface implications (downstream of this spec)

The schema bump unlocks (but does not implement) the following MCP tool additions. These are listed for traceability; implementation happens in `/mcp/worker.js` rebuild downstream (Step N+1).

- **`rank_by_scale(node_type, kind)`** — returns nodes / cells / predictions of the given type, ranked by their `quantitative_scale.value` for the given `kind`. The flagship "what are the biggest open numerical questions" query.
- **`find_resolvers(cell_or_frontier_id)`** — returns the `resolves` edges with the given id as `to`, plus the source experimental-program nodes' label, timeline, and sensitivity. The "what experiments would settle this" query.
- **`find_discriminating_experiments(program_a, program_b)`** — given two candidate programs, returns the set of `resolves` edges whose `predictions_per_program[]` contains both programs with non-overlapping `predicted_value` ranges. The Mendeleev-quality flagship query per `PROJECT_GOAL_SUPPLEMENT.md` §1.2.
- **`find_predictions`** *(existing tool extended)* — projects `quantitative_scale` when present, filterable by `kind` and `units`.
- **`get_node`** *(existing tool extended)* — automatically returns `quantitative_scale` and outbound `resolves` edges when present; no schema change required.

These are not implemented by this spec. The spec defines what they will read; their implementation is a worker rebuild that follows the schema landing.

---

## 10. Backward compatibility and migration

### 10.1 Schema-level backward compatibility

Every v17-conforming data file is also v18-conforming. The new fields (`quantitative_scale` on five surfaces, `resolves`-edge-only fields) are optional or gated by edge type; the conditional rules in §5 forbid them on non-carrier types but do not require their presence anywhere. Existing v41 data validates against v18 without modification — v41 contains no `quantitative_scale` entries and no `resolves` edges, and none are required.

The v17 → v18 transition is therefore a one-way ratchet, identical in shape to the v15.3 → v16 → v17 transitions. Future authoring may add Phase C entries freely, and validation continues to accept v17-shaped data indefinitely.

### 10.2 Authoring migration of existing carriers

No mechanical migration of existing data is required. Phase C authoring is content-driven: each `quantitative_scale` entry requires a literature-cited value per the §4 test, and each `resolves` edge requires cited per-program predictions and a cited sensitivity. Authors should not invent entries to populate the fields uniformly.

The five authoring sweeps (per scope memo §7) are:

- **4.1 — `quantitative_scale` on all 17 open-frontier and totality-approach carriers.** The smallest sweep by count; the largest per-entry by content density.
- **4.2 — `quantitative_scale` on the 223 predictions.** Many will not carry a value because the prediction is qualitative ("X is observed"); the §4 test correctly excludes these.
- **4.3 — `quantitative_scale` on cells where mass / coupling / numerical content is the load-bearing claim.** Estimated subset ~50–100 cells out of 484, primarily in `sm-rep-content`, `su5-gut-rep-content`, `dark-matter-candidates`, `hadronic-states`, `compact-astrophysical-objects`.
- **4.4 — `resolves` edges from each Step-0.5-authored experimental-program node.** Estimated 30–60 edges total across the 12 forward-looking nodes plus selective edges from the 7 historical nodes where their resolves relation is still load-bearing (e.g., `pdg` resolves a substantial chunk of `sm-rep-content` cells).
- **4.5 — `quantitative_scale` on Phase B `if_real_implies` implications.** Subset of the 24 implications populated in v40 / v41.

Authors apply the §4 test entry-by-entry. PR descriptions record the §2.5 self-check. Where an entry's value cannot pass the test (no literature citation for the number), the entry is omitted; this is the honest result, not a gap.

### 10.3 Migration sequencing

1. Land the v18 schema (this spec + `/schema/Map_v18_schema.json` + `/scripts/validate.py` extensions). All existing v41 data validates without modification because Phase C fields are optional.
2. Begin authoring sweeps per the §10.2 ordering. Each sweep is its own PR.
3. After all sweeps complete (or the maintainer judges the fields sufficiently populated), rebuild the MCP worker against v18 with the new `rank_by_scale`, `find_resolvers`, and `find_discriminating_experiments` tools.

Steps 1 and 3 are bounded; Step 2 is the largest authoring effort of the Predictive Layer. The CI tripwire enforces correctness at each step.

---

## 11. Files affected

**New:**
- `/schema/Map_v18_schema.json` — the schema file with the new `$defs` (`quantitative_scale`, `quantitative_scale_kind`, `quantitative_scale_uncertainty`, `resolves_timeline`, `resolves_predictions_per_program_entry`), the new `quantitative_scale` field on the five carrier surfaces, the extended `edge_type` enum (adding `resolves`), the new conditional rules in `allOf` arrays, and the new entries in `_validator_side_rules`. Downstream of this spec (Step 2).
- `/methodology/MAP_v18_schema_spec_extension.md` — this document.

**Modified:**
- `/scripts/validate.py` — implements Rules 27–33. Each rule corresponds to a function that takes the parsed dataset and returns either `None` (pass) or an error string. Phase C introduces no warning-level rules; see §6 closing note for the rationale.
- `/.github/workflows/validate.yml` — no change expected. The existing tripwire runs whatever `validate.py` does.

**Downstream (separate deliverables, not blocked by this spec):**
- `/mcp/worker.js` — rebuilt against v18 schema and v41+ data, adding `rank_by_scale`, `find_resolvers`, `find_discriminating_experiments`, extending `find_predictions` and `get_node`. Cloudflare worker redeploy per `PROJECT_INFRASTRUCTURE.md` §3.
- `/data/Map_v34_consolidated.json` — Phase C authoring populates `quantitative_scale` and `resolves` per the §10.2 sweeps. The filename and `_meta._schema` field update to `"Map_v18_schema.json"` when Phase C authoring begins; the internal version increments per sweep.
- `/explorer/explorer-*.js` — eventually surfaces `quantitative_scale` entries in the carrier-node and cell side panels, renders `resolves` edges in a distinct visual style, exposes the per-program discrimination view. Decoupled from the schema landing per the same forward-compatibility analysis applied to v16 and v17; the explorer keeps working through the schema bump.

---

## 12. What this spec does not establish

- The specific `quantitative_scale` entries for any frontier, cell, prediction, edge, or implication. Authoring decisions, downstream (Steps 4.1–4.5).
- The specific `resolves` edges for any experimental-program node. Authoring decisions, downstream (Step 4.4).
- The list of literature-cited values for each cell that satisfy the §4 admissibility test. Each is an authoring-pass research task.
- The implementation of `rank_by_scale`, `find_resolvers`, and `find_discriminating_experiments`. Worker rebuild, downstream (Step N+1).
- The explorer's visual treatment of `quantitative_scale` entries (numerical-display formatting, log10 rendering, uncertainty bars) and `resolves` edges (visual distinction from `bears-on`, per-program prediction surfacing). Explorer concern, decoupled from the schema landing.
- The review pathway. Track 4, downstream of the complete Predictive Layer.

---

## 13. Closing note

Phase C is the largest schema bump of the Predictive Layer in surface area — two new mechanisms across five distinct carrier surfaces, one new edge type, four new `$defs`, seven conditional rules, seven validator rules — and the most demanding in authoring effort. The five authoring sweeps span the data layer's most numerically-dense content: particle masses, coupling strengths, BAO scales, GW-detector sensitivities, axion-haloscope coupling reach, EDM bounds, projected discovery timelines.

What Phase C delivers, when complete, is the Mendeleev-style demonstration the project was scoped for. With Phase A + B + C in the data, a working physicist can ask: *Given two candidate programs targeting the same frontier, which experiments would distinguish them, with what timeline, with what documented sensitivity?* And get a real, citation-anchored answer back. That query is `find_discriminating_experiments`, and it cannot return non-empty results until Phase C populates `predictions_per_program[]` on `resolves` edges.

The §4 admissibility test is the spec's commitment that every numerical claim in the Phase C layer traces back to a citable literature value, every per-program prediction traces back to a program-internal calculation, and every sensitivity traces back to a design report. The test is binding for every authoring pass; the schema enforces its citation-shape constraints; the firewall doc (`META_v21_1_methodology_firewall.md`) is the parent that gives the test its standing.

The chain — spec → schema JSON → validator → five authoring sweeps → MCP rebuild — is each step achievable in its own PR, each gated by the CI tripwire, and each carrying its own §2.5 self-check in its PR description. Once the chain reaches the worker rebuild, the Predictive Layer is closed and `PROJECT_GOAL_PREDICTIVE_LAYER.md`'s §6 on-target tests all become runnable. Track 4 (open the review pathway) is then queued; the layer's flagship demonstrations are what reviewers from each subfield will see when they arrive.

---

*End of MAP_v18_schema_spec_extension.md, v1.*
