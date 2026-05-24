# MAP v19 schema-spec extension — `bound_direction` on `quantitative_scale`

**Document type:** Schema specification. Defines the v18 → v19 schema bump within Phase C of the Predictive Layer. Companion file to `/schema/Map_v19_schema.json` (downstream deliverable, sub-PR 26) and `/scripts/validate.py` extensions (downstream deliverable, sub-PR 27).

**Status:** v1. Authored 2026-05-24, downstream from `PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md` (sub-PR 24, which settles the five shape decisions this spec implements). The v19 bump is strictly additive over v18 — every v18-conforming entry validates against v19 with `bound_direction` absent — and is the only structural change v19 contains.

**Parent docs:** `PROJECT_GOAL.md` (structural goal, §4 type discipline), `PROJECT_GOAL_PREDICTIVE_LAYER.md` (the layer this schema implements; §2 Move 2 / Mechanism #1 is the parent for `quantitative_scale`), `META_v21_1_methodology_firewall.md` (firewall), `PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md` (settles the five shape decisions this spec implements), `MAP_v18_schema_spec_extension.md` (the immediately preceding bump; this spec extends its `quantitative_scale` `$def` and inherits the §4 admissibility framework), `MAP_v17_schema_spec_extension.md` (Phase B; supplies the `if_real_implies_implication` `$def` that composes `quantitative_scale` and inherits the v19 change automatically).

---

## 0. What this document is

This spec defines the schema extension that makes the directional reading of `quantitative_scale` entries machine-explicit. It covers exactly one new field — `bound_direction`, a four-value enum permitted optionally on every `quantitative_scale` object — together with the new `$def` for that enum, the conditional validation rule that prevents bound_direction from coexisting with non-null `uncertainty`, the three validator-side rules that enforce cross-field invariants and authoring completeness, and the binding firewall self-check that gates the sub-PR 28 retrofit-pass.

It does **not** introduce any new node type, edge type, carrier surface, or relationship to other v15.3 / v16 / v17 / v18 mechanisms. The five carrier surfaces on which `quantitative_scale` is permitted (open-frontier / totality-approach nodes, cells, predictions, `bears-on` edges, `if_real_implies` implications) are inherited from v18 §2 unchanged. The eight `quantitative_scale_kind` enum values are inherited from v18 §2 unchanged. The `units` / `uncertainty` / `log10` / `citations` rule structure from v18 §5.1–§5.4 is inherited unchanged.

The bump exists to close the AI-queryability hole that v18's `uncertainty: null` encoding leaves open: 134 entries in v65 collapse three semantically distinct cases — strict lower bounds (observational lifetimes, sensitivity floors), strict upper bounds (mass maxima, tension severities, flux thresholds), and exact-value characteristic commitments (S_BH coefficient, K41 exponent, group-order encodings) — into a single indistinguishable representation. The scope memo §1 names this the *T4 disambiguation problem* and §3 settles the four-value enum that resolves it.

The spec is binding for the schema file (`/schema/Map_v19_schema.json`, sub-PR 26), for the CI validator (`/scripts/validate.py`, sub-PR 27), and for the retrofit-pass that populates `bound_direction` on the existing 134 uncertainty=null entries (`data/Map_v34_consolidated.json` v65 → v66, sub-PR 28). The MCP worker (`/mcp/worker_skeleton.js`) gets rebuilt against this schema in the consolidated Phase A + B + C + v19 deployment (sub-PR 29), which is downstream of the schema and is not a precondition for it.

The §4 firewall self-check is the load-bearing part of this spec. The sub-PR 28 retrofit cannot start without §4 in place, because every `bound_direction` value the retrofit assigns is a reading of structural content already present in the first-citation parenthetical of an existing entry, and the self-check is what binds the retrofit to those existing readings rather than admitting new literature anchoring or cartographer-coined direction calls.

---

## 1. The `bound_direction` field — semantics

**Carrier surface.** `bound_direction` is permitted as an optional field on every `quantitative_scale` object, regardless of which of the five v18 carrier surfaces hosts the object. The v18 spec §2 lists those surfaces:

1. `open-frontier` and `totality-approach` nodes — top-level frontier-scale. 17 carriers in v65.
2. `cell` objects — cell-level numerical content. 484 cells in v65.
3. `prediction` objects — both in the FC-level `predictive_yield[]` array and in the cell-level `predictions[]` array. 223 predictions in v65 (the shared `prediction` `$def` covers both surfaces).
4. `bears-on` edges (FC → frontier) — edge-level scale band. Permitted only when `type: bears-on`.
5. `if_real_implies_implication` objects (v17 field, optional v18 refinement) — conditional-consequence-scale.

The v19 schema change is centralized in the `quantitative_scale` `$def` itself. Every surface inherits the new optional property automatically; no per-surface schema delta is required.

**Enum values (four, binding from sub-PR 24 §3.1).**

- **`"lower"`** — `value` is a lower bound on the underlying quantity. The literature reports the value as a floor: the underlying observable is at least this large. Examples in v65: observational 90%-CL lifetime lower bounds on `proton-decay-searches` cells (τ/B(p→e⁺π⁰) > 2.4×10³⁴ yr from Super-K 2020; τ(p→ν̄K⁺) > 5.9×10³³ yr from SK 2014); n–n̄ oscillation time lower bound; sensitivity floors on forward-looking experimental programs (Hyper-K 10³⁵ yr discovery sensitivity from arXiv:1805.04163; DUNE 1.3×10³⁴ yr from arXiv:2002.03005); monopole-mass lower bound from cosmological abundance constraints.

- **`"upper"`** — `value` is an upper bound on the underlying quantity. The literature reports the value as a ceiling. Examples in v65: |θ_QCD| < 10⁻¹⁰ from PSI nEDM null result (Abel et al. 2020); Σm_ν < 0.12 eV from Planck+BAO; σ_8 upper bound from SPT Y_500 cluster counts; coupling-strength upper bounds on axion-photon and dark-photon mixing; mass maxima on dark-matter candidate cells. Sigma_deviation entries are uniformly `"upper"` per the *"at least Nσ"* reading — the cited tension severity is the minimum the discrepancy can be, so the reported number is an upper bound on the case where the tension is exactly that severe.

- **`"two-sided"`** — `value` is an exact-value commitment reported in the literature without one-sided directionality. The entry is not a bound; it is the central value the literature reports as the structural, characteristic, or theoretical commitment. Examples in v65: S_BH = A/(4 G ℏ) coefficient 0.25 (Bekenstein 1973; Hawking 1975); K41 turbulence spectrum exponent −5/3; Koide Q ≈ 2/3; chiral scale Λ_χ ≈ 1 GeV; predicted α_GUT ≈ 0.21 (Georgi-Quinn-Weinberg 1974); group-order encodings (Z_16 from Kapustin et al. 2015 on `freed-hopkins-cobordism.cells[14]`; Z_8 from Fidkowski-Kitaev 2010 on `freed-hopkins-cobordism.cells[17]`); η_B central value 6.1×10⁻¹⁰ when the cited source reports it without uncertainty.

- **`"unspecified"`** — direction is genuinely ambiguous from the existing prose or applicable in multiple non-redundant ways. Reserved for entries the retrofit-pass cannot assign confidently from the cited source; flagged in the sub-PR 28 changelog for v20-or-later revisit. Expected to be rare (≲5% of T10, i.e. ≲5 entries post-retrofit) but explicitly admitted so the retrofit-pass never has to make arbitrary calls. The `"unspecified"` value is the documented escape hatch under the firewall self-check in §4: it is preferred over `"two-sided"` when the cited source genuinely does not commit to a direction, because misencoding a non-directional ambiguity as `"two-sided"` would import the exact-value-commitment semantic the prose does not support.

**Permission rules (binding from sub-PR 24 §3.2).**

- Optional on every `quantitative_scale_kind` value (`energy_scale`, `mass`, `length`, `time`, `ratio`, `coupling`, `dimensionless`, `sigma_deviation`). No kind excludes the field.
- Forbidden when `uncertainty` is non-null (numeric or asymmetric `{low, high}`). Hard-error rule (Rule 34, §6). Two-sided measurements are already structurally complete via the uncertainty payload; adding `bound_direction` would be redundant-or-contradictory.
- Recommended (warning-level) when `uncertainty` is null. Warning rule (Rule 35, §6). Mirrors the Rule 22 axis_mapping warning precedent. Post sub-PR 28 retrofit, the warning population drops from 134 to ≲5 (the genuine `"unspecified"` cases are flagged explicitly, not absent).

The three rules encode a clean binary semantic into the schema: an entry either records a directional bound (uncertainty=null + bound_direction) or records a two-sided measurement (numeric / asymmetric uncertainty). The schema rejects all mixed cases. Same convention as Phase A's `constructive_status`, Phase B's `if_real_implies`, and Phase C's `quantitative_scale` itself: absence carries no semantic implication beyond *"no claim recorded."*

---

## 2. The new `$def`: `bound_direction`

```json
"bound_direction": {
  "type": "string",
  "enum": ["lower", "upper", "two-sided", "unspecified"],
  "description": "v19. Direction discriminator for the quantitative claim recorded in the enclosing quantitative_scale. See spec §1 for enum semantics. Permitted only when uncertainty is null (Rule 34); recommended in that case (Rule 35)."
}
```

This is the entire new `$def`. No nested object structure, no per-value substructure, no value-discriminated branching. The field is a single enum string keyed by the literature reading of the cited value.

---

## 3. Modifications to existing `$defs`

### 3.1 `quantitative_scale` — single new optional property

The v18 `quantitative_scale` `$def` gains exactly one new optional property:

```json
"bound_direction": { "$ref": "#/$defs/bound_direction" }
```

The complete post-v19 `properties` section of `quantitative_scale` reads (additions in **bold** for emphasis in this spec only — the schema JSON has no markup):

```
properties:
  kind:           { $ref: "#/$defs/quantitative_scale_kind" }    // v18
  value:          { type: "number" }                              // v18
  units:          { type: "string", minLength: 1 }                // v18 (conditional)
  uncertainty:    { $ref: "#/$defs/quantitative_scale_uncertainty" }  // v18
  log10:          { type: "boolean" }                             // v18 (conditional)
  bound_direction:{ $ref: "#/$defs/bound_direction" }             // v19 (conditional, §5.1)
  citations:      { type: "array", minItems: 1, items: { type: "string", minLength: 1 } }  // v18
```

The `required` array is unchanged: `["kind", "value", "citations"]`. `additionalProperties: false` is unchanged.

### 3.2 No other `$def` modifications

Because every surface that hosts `quantitative_scale` does so via `$ref`, no surface-specific `$def` changes are required. In particular:

- `cell` `$def`, `prediction` `$def`, `edge` `$def`, the `node` `$def` (gated to open-frontier and totality-approach by v18 §5.1) — all inherit the change through their existing `quantitative_scale` references.
- `if_real_implies_implication` `$def` (v17) — composes `quantitative_scale` via the v18 spec's §2 schema delta and inherits the change automatically. When Phase B Step 4.5 later populates `quantitative_scale` on the 24 implications across 14 carriers, those entries carry `bound_direction` per §1's permission rules like any other qs entry. No special-case logic for the v17 surface.

### 3.3 No retired or renamed fields

v19 retires no v18 field and renames no v18 field. The bump is strictly additive in both the `$defs` and in the validator-rule numbering (v18 ended at Rule 33; v19 adds Rules 34–36).

---

## 4. Firewall admissibility self-check (binding for the v19 retrofit-pass)

The following self-check is reproduced from `META_v21_1_methodology_firewall.md` §2.5, restated for the v19 retrofit-pass (sub-PR 28). It is binding for every `bound_direction` assignment the retrofit makes. Failure of the self-check disqualifies the assignment; the entry receives `"unspecified"` instead and is flagged in the sub-PR 28 changelog.

> **§2.5 self-check restated for v19.** Before assigning `bound_direction` to each existing uncertainty=null `quantitative_scale` entry: *"Is the direction I am about to record derivable from the first-citation parenthetical or from the cited source's published convention as it stands in v65, or am I inferring it from cross-FC pattern, from analogy with other dataset entries, or from a reading of the prose that the cited source does not itself support?"* A "the parenthetical says 'lower limit at 90% CL', I'm encoding `"lower"`" answer passes (re-encoding of structural content already present). A "the cited paper is about an upper bound on a related quantity, and the cited source for this entry reports the value without direction, but combining the two suggests `"upper"`" answer fails — that is inference across sources, not re-encoding.

**Three load-bearing clauses of the self-check, binding for sub-PR 28.**

1. **Derivable from the existing first-citation parenthetical.** The v18 citation-formatting convention places the source-value reading in the first citation string as a parenthetical: e.g., `"... (source-value: τ/B(p→e⁺π⁰) > 2.4 × 10³⁴ years at 90% CL from 450 kton·yr Super-K I-IV exposure ...)"`. The retrofit reads the parenthetical's *direction phrasing* — *"lower limit"*, *"upper bound at 90% CL"*, *"predicted value"*, *"exact theoretical commitment"*, *"central value"*, *"discovery sensitivity"*, etc. — and assigns `bound_direction` accordingly. No new prose is added to the citation; no new citations are required.

2. **No inference from cross-FC pattern.** Even when the dataset's other entries make a direction reading look obvious — e.g., when several sigma_deviation entries are encoded `"upper"` and a new one looks like it fits the pattern — the retrofit assigns the direction only if *that entry's own citation* supports the reading. The pattern is a cue for attention, never a license to author. This is the load-bearing methodology firewall provision; violation breaks the no-back-influence guarantee from `META_v21_1_methodology_firewall.md`.

3. **`"unspecified"` is the documented escape hatch.** If the cited source genuinely does not commit to a direction — the prose is ambiguous, the value is reported as an order-of-magnitude estimate without one-sided/two-sided framing, or the entry's citations split between two readings — the retrofit assigns `"unspecified"` and records the call in the sub-PR 28 changelog for v20-or-later revisit. Encoding ambiguity as `"two-sided"` would import the exact-value-commitment semantic the source does not support; encoding it as `"lower"` or `"upper"` would manufacture direction the source does not name. `"unspecified"` is the firewall-faithful outcome.

**Recording the self-check.** The sub-PR 28 PR description records the self-check application entry-by-entry — for every one of the 134 assignments, a line of the form `<cell-id-or-node-id> → "<bound_direction>" (rationale: <parenthetical phrase from existing citation>)`. Mirrors the Phase A, Phase B, and Phase C precedents of per-entry firewall-recording. The line for `"unspecified"` assignments additionally names the ambiguity (e.g., *"source reports value without direction phrase; v20 revisit"*).

**Why v19 keeps the Phase C admissibility test's structure.** The three-part Phase C test (literature value + program-internal calculations + sensitivity citation) is binding for new `quantitative_scale` and `resolves` entries authored from v18 onward. The v19 retrofit-pass authors no new values, no new units, no new uncertainties, and no new citations — every `bound_direction` value is a *direction reading of content already passed through the v18 §4 test*. The v19 self-check above is the narrower, retrofit-scoped form: it admits readings derivable from the parenthetical, refuses inference across sources, and admits `"unspecified"` as the escape hatch.

---

## 5. Conditional validation rules (JSON Schema)

The following rule is added to the existing `allOf` array in the `quantitative_scale` `$def`. It preserves the v18 rules §5.1–§5.7 unchanged.

### 5.1 `bound_direction` is forbidden when `uncertainty` is non-null

```json
{
  "_comment": "v19 §5.1 — bound_direction forbidden on entries with non-null uncertainty (numeric or asymmetric); enforces the binary semantic that an entry either records a directional bound (uncertainty=null + bound_direction) or a two-sided measurement (numeric/asymmetric uncertainty)",
  "if": {
    "properties": {
      "uncertainty": { "not": { "type": "null" } }
    },
    "required": ["uncertainty"]
  },
  "then": {
    "not": { "required": ["bound_direction"] }
  }
}
```

*Rationale for this conformance pattern.* The v18 spec's §5.2–§5.4 conditional rules use the same `if`/`then` with `properties` + `required` + `not`/`required` shape. v19 §5.1 adopts the identical pattern for consistency with the existing `allOf` chain on the `quantitative_scale` `$def`. An equivalent form using `allOf` with `oneOf` would also validate but would diverge from the established convention; the chosen form is the v19 implementation surface that sub-PR 26 (schema JSON) is bound to.

**Edge case: `uncertainty: null` explicitly recorded vs `uncertainty` field absent.** The v18 `quantitative_scale_uncertainty` `$def` admits three shapes — number, `{low, high}` object, or null. Entries with the field absent are equivalent to entries with `uncertainty: null` for the purposes of Rule 34 (the forbidden-on-non-null-uncertainty rule); the `if` clause above tests *non-null*-ness, so absent `uncertainty` does not match the `if` clause and the `then` clause's restriction does not apply — `bound_direction` is permitted in both cases. The sub-PR 26 schema JSON should test this explicitly in its smoke-test against v65 data.

---

## 6. Validator-side rules (extending `_validator_side_rules`)

The following three rules continue the v18 numbered sequence. v18 ended at Rule 33; v19 adds Rules 34–36, mirroring the v17 (Rules 24–26) and v18 (Rules 27–33) phases' rule-count cadence and matching the narrower v19 scope (one field added, one warning, one hard-error gate, one enum-conformance check).

**Rule 34 — `bound_direction` forbidden on entries with non-null `uncertainty`.** For each `quantitative_scale` entry on any of the five v18 carrier surfaces, if `uncertainty` is present and not null (i.e., a number or asymmetric `{low, high}` object) and `bound_direction` is also present, emit a hard error. (Redundant with the §5.1 JSON-Schema conditional rule; the validator-side check provides defense-in-depth, matching the v18 Rules 31–33 precedent of cross-checking JSON-Schema-enforced rules at validator runtime.) Failure: hard error. Error message text: `quantitative_scale at <path> has both non-null uncertainty and bound_direction; the two fields are mutually exclusive (v19 spec §5.1)`.

**Rule 35 — `bound_direction` recommended on entries with `uncertainty: null` or `uncertainty` absent.** For each `quantitative_scale` entry on any of the five v18 carrier surfaces, if `uncertainty` is null or absent and `bound_direction` is **absent**, emit a warning. Mirrors the v16 Rule 22 axis_mapping warning precedent — warning-level so the v18 → v19 transition validates the existing 134 uncertainty=null entries cleanly on day one, with the warning population shrinking to ≲5 as sub-PR 28 lands. Failure: warning (does not fail CI). Warning message text: `quantitative_scale at <path> has uncertainty=null but no bound_direction; consider populating per v19 spec §1 (use "unspecified" if direction is genuinely ambiguous from the cited source)`.

**Refinement of Rule 35.** Rule 35 fires only when `bound_direction` is *absent*. Entries explicitly marked `"unspecified"` do **not** trip the warning — they are the documented firewall escape hatch from §4. This keeps Rule 35's signal-to-noise high: post-retrofit, a Rule 35 warning means the entry was missed by the retrofit-pass, not that the cartographer made a deliberate `"unspecified"` call.

**Rule 36 — `bound_direction` must be one of the four enum values.** For each `quantitative_scale` entry, if `bound_direction` is present and not in the set `{"lower", "upper", "two-sided", "unspecified"}`, emit a hard error. (Redundant with the `enum` constraint in the §2 `$def`; the validator-side check provides defense-in-depth, matching the v18 Rule 31 unit-conformance precedent of cross-checking schema-enforced enums at validator runtime.) Failure: hard error. Error message text: `quantitative_scale at <path> has bound_direction "<value>" not in {"lower", "upper", "two-sided", "unspecified"} (v19 spec §1)`.

**Smoke tests (binding for sub-PR 27).**

- **Positive smoke test 1 — pre-retrofit v65 data against v19 schema.** Expected output: `0 new schema errors, 0 new Rule 34 errors, 134 new Rule 35 warnings, 0 new Rule 36 errors`. Rule 35's 134-warning count is the expected pre-retrofit baseline; each existing T10 entry triggers it because `bound_direction` is absent.
- **Positive smoke test 2 — post-retrofit v66 data against v19 schema.** Expected output: `0 new schema errors, 0 new Rule 34 errors, ≲5 new Rule 35 warnings (the explicit "unspecified" entries do not trip; only retrofit-missed entries do), 0 new Rule 36 errors`. The drop from 134 to ≲5 is the retrofit's completion signal.
- **Negative smoke test 1 — bound_direction with non-null uncertainty.** A test fixture entry with `kind: "mass"`, `value: 172.69`, `units: "GeV"`, `uncertainty: 0.30`, `bound_direction: "two-sided"`, `citations: ["..."]`. Expected: Rule 34 fires (hard error).
- **Negative smoke test 2 — invalid enum value.** A test fixture entry with `kind: "time"`, `value: 2.4e+34`, `units: "yr"`, `uncertainty: null`, `bound_direction: "ascending"`, `citations: ["..."]`. Expected: Rule 36 fires (hard error). The JSON-Schema `enum` constraint also fires at schema-validation time; both should be reported.
- **No-op smoke test — entry with non-null uncertainty and no bound_direction.** A test fixture entry with `kind: "mass"`, `value: 172.69`, `units: "GeV"`, `uncertainty: 0.30`, `citations: ["..."]`. Expected: no Rule 34, no Rule 35, no Rule 36. (Confirms the §5.1 `if` clause's non-firing path.)

No additional rules are required for v19. The new field has no carrier-type restrictions beyond the qs-carrier-surface restrictions already enforced by v18 Rules 27–33; the four-value enum carries no nested structure that would require recursive checks; and the §4 firewall self-check is enforced by author discipline recorded in PR descriptions rather than by validator rule (mirroring v17 §6 and v18 §6 — validators check structural conformance, not citation quality or direction-reading judgment).

---

## 7. Examples

The following six examples illustrate `bound_direction` assignments grounded in real v65 entries. They are *exemplary*, drawn from entries that already exist in `data/Map_v34_consolidated.json` v65 with `uncertainty: null`; in each case the v19 retrofit-pass (sub-PR 28) will add the `bound_direction` field per §4's self-check applied to the existing first-citation parenthetical. The example block below shows the post-retrofit state of each entry. The first-citation parenthetical's source-value phrase is reproduced from v65 unchanged.

### 7.1 Strict observational lower bound — `proton-decay-searches.cells[0]` (sub-PR 23)

```json
{
  "cell_id": "cell-pd-pi0-eplus-falsified-GG",
  "axis_values": {
    "decay-channel": "p-to-pi0-e+",
    "GUT-variant-predicted": "minimal-Georgi-Glashow-SU5",
    "observational-status": "falsified-canonical-prediction"
  },
  "content": "p → π⁰ e⁺ — minimal Georgi-Glashow SU(5) prediction τ_p ~ 10²⁹⁻³⁰ yr RULED OUT by Super-K at τ > 2.4 × 10³⁴ yr (2020)",
  "quantitative_scale": {
    "kind": "time",
    "value": 2.4e+34,
    "units": "yr",
    "uncertainty": null,
    "bound_direction": "lower",
    "citations": [
      "Super-Kamiokande Collaboration (Takenaka A. et al.) 2020 'Search for proton decay via p→e+π0 and p→μ+π0 with an enlarged fiducial volume in Super-Kamiokande I-IV' Phys Rev D 102:112011 arXiv:2010.16098 (source-value: τ/B(p→e+π0) > 2.4 × 10^34 years at 90% CL from 450 kton·yr Super-K I-IV exposure 1996-2018 with enlarged fiducial volume 22.5→27.2 kton, no e+π0 candidates observed; ...)"
    ]
  }
}
```

The first-citation parenthetical's `"τ/B(p→e+π0) > 2.4 × 10^34 years at 90% CL"` phrase encodes the lower-bound direction explicitly. The retrofit reads `"> ... at 90% CL"` as `"lower"`. Firewall self-check passes: the assignment is derivable from the existing parenthetical without inference.

### 7.2 Exact-value theoretical commitment — `bh-thermodynamics` (sub-PR 4.1)

```json
{
  "id": "bh-thermodynamics",
  "type": "totality-approach",
  "label": "BH thermo",
  "quantitative_scale": {
    "kind": "dimensionless",
    "value": 0.25,
    "uncertainty": null,
    "bound_direction": "two-sided",
    "citations": [
      "Bekenstein 1973 'Black holes and entropy' Phys Rev D 7:2333",
      "Hawking 1975 'Particle creation by black holes' Commun Math Phys 43:199"
    ]
  }
}
```

The Bekenstein-Hawking entropy formula S_BH = A / (4 G ℏ) reports the coefficient 1/4 as a theoretical commitment, not as a bound in either direction. The retrofit reads the absence of bound phrasing in either cited source as `"two-sided"`. Firewall self-check passes: both citations report 1/4 as the coefficient without one-sided directionality; the reading is derivable from the existing citations without inference.

### 7.3 Forward-looking sensitivity floor — `proton-decay-searches.cells[9]` (sub-PR 23)

```json
{
  "cell_id": "cell-pd-Hyper-K-future",
  "axis_values": {
    "decay-channel": "p-to-pi0-e+",
    "GUT-variant-predicted": "SUSY-SU5",
    "observational-status": "future-program-sensitivity"
  },
  "content": "Hyper-Kamiokande future program — 260 kton fiducial × ~10× sensitivity over Super-K, target τ > 10³⁵ yr",
  "quantitative_scale": {
    "kind": "time",
    "value": 1e+35,
    "units": "yr",
    "uncertainty": null,
    "bound_direction": "lower",
    "citations": [
      "Hyper-Kamiokande Collaboration (Abe K. et al.) 2018 'Hyper-Kamiokande Design Report' arXiv:1805.04163 (source-value: τ(p→e+π0) discovery sensitivity ~ 10^35 years at 20-year exposure of the 260 kton fiducial water Cherenkov detector at 90% CL, design target ~10× over Super-Kamiokande's current bound; ...)"
    ]
  }
}
```

The direction is `"lower"`: a discovery sensitivity floor means the underlying observable, if real, will be detected when its value exceeds the floor. The design-target nature of the entry (future-program sensitivity vs current observational bound) is **not** encoded in `bound_direction` per sub-PR 24 §3.1 — that type dimension lives in the Phase C Step 4.4 `resolves` edge between `hyper-k` and this cell, which the consolidated MCP rebuild surfaces via `find_resolvers(cell_id)`. The retrofit reads `"discovery sensitivity ~ 10^35 years at 90% CL"` as `"lower"`; the firewall self-check passes by parenthetical re-encoding.

### 7.4 Sigma-deviation tension severity — `muon-g-2` (sub-PR 4.1)

```json
{
  "id": "muon-g-2",
  "type": "totality-approach",
  "label": "muon g-2",
  "quantitative_scale": {
    "kind": "sigma_deviation",
    "value": 4.2,
    "uncertainty": null,
    "bound_direction": "upper",
    "citations": [
      "Muon g-2 Collaboration (Abi et al.) 2021 'Measurement of the positive muon anomalous magnetic moment to 0.46 ppm' Phys Rev Lett 126:141801",
      "Aoyama et al. 2020 'The anomalous magnetic moment of the muon in the Standard Model' Phys Rep 887:1",
      "Borsanyi et al. (BMW Collaboration) 2021 'Leading hadronic contribution to the muon magnetic moment from lattice QCD' Nature 593:51"
    ]
  }
}
```

The cited 4.2σ discrepancy (Fermilab Run-1 + BNL E821 vs Theory Initiative 2020 dispersive-HVP) is encoded `"upper"` per the *"at least Nσ"* reading: the reported value is the minimum severity of the tension, so it is structurally an upper bound on the case where the tension equals exactly that severity. (The BMW lattice-HVP citation reports a substantially narrower discrepancy; that is a separate quantitative claim and lives on a different prediction entry, not on this carrier-level qs.) Firewall self-check passes: the direction reading is the standard sigma_deviation convention named in scope memo §3.3.

### 7.5 Cosmological-tension sigma_deviation — `cosmological-models` (sub-PR 4.1)

```json
{
  "id": "cosmological-models",
  "type": "totality-approach",
  "label": "Cosmological models",
  "quantitative_scale": {
    "kind": "sigma_deviation",
    "value": 5.0,
    "uncertainty": null,
    "bound_direction": "upper",
    "citations": [
      "Riess et al. 2022 'A comprehensive measurement of the local value of the Hubble constant with 1 km/s/Mpc uncertainty from the Hubble Space Telescope and the SH0ES Team' Astrophys J Lett 934:L7",
      "Planck Collaboration (Aghanim et al.) 2020 Astron Astrophys 641:A6"
    ]
  }
}
```

Same pattern as §7.4: the Hubble tension at ~5σ between SH0ES local and Planck CMB-inferred H₀ is encoded `"upper"` per the *"at least 5σ"* reading. The two-citation structure is preserved from v65 unchanged (Riess et al. 2022 anchors the local value; Planck 2018 anchors the CMB-inferred value). Firewall self-check passes by direct parenthetical re-encoding.

### 7.6 Group-order structural constant — `freed-hopkins-cobordism.cells[14]` (sub-PR 12)

```json
{
  "cell_id": "cell-fh-Pinp-d4",
  "axis_values": {
    "tangential-structure": "Pin+",
    "spacetime-dimension": 4
  },
  "content": "Ω^{Pin+}_4 = ℤ₁₆",
  "quantitative_scale": {
    "kind": "dimensionless",
    "value": 16,
    "uncertainty": null,
    "bound_direction": "two-sided",
    "citations": [
      "Kapustin, Thorngren, Turzillo, Wang 2015, JHEP 12:052 arXiv:1406.7329 'Fermionic Symmetry Protected Topological Phases and Cobordisms' (source-value: Ω^{Pin+}_4 ≅ ℤ_16 via Freed-Hopkins cobordism framework — 16 distinct interacting 3+1d fermionic SPT phases with T²=−1 collapse from the free-fermion ℤ classification; mathematically exact group order; encoded as dimensionless count |Ω^{Pin+}_4|=16 ...)",
      "Wang, Senthil 2014, PRX 4:041031 arXiv:1401.1142 ..."
    ]
  }
}
```

The cited group-order |Ω^{Pin+}_4| = 16 is reported as a *"mathematically exact group order"* per the existing parenthetical. The retrofit reads this as `"two-sided"`: a group-order is not a bound in either direction; it is the cardinality of a finite group. Same pattern applies to the companion Z_8 cell at `freed-hopkins-cobordism.cells[17]` (sub-PR 12, Fidkowski-Kitaev 2010) and to any other group-order encoding the dataset accumulates. Firewall self-check passes: the parenthetical's *"mathematically exact group order"* phrase encodes the two-sided reading directly.

(Note: the scope memo §5's preliminary §7 sketch referenced `tenfold-way.cells[14]` for this example. Direct inspection of v65 data shows the Z_16 cell lives on `freed-hopkins-cobordism.cells[14]` instead; the tenfold-way's cells[14] carries a different axis-value pair. The corrected reference is recorded here in the binding spec.)

---

## 8. Downstream sequencing

The v19 build closes after one more authoring sub-PR and one consolidated MCP rebuild. Steps after this spec lands:

- **sub-PR 26 — `schema/Map_v19_schema.json`.** Strictly additive over `Map_v18_schema.json`. Adds the `bound_direction` `$def` per §2; adds the optional property on `quantitative_scale` per §3.1; adds the §5.1 `allOf` conditional block; populates `_validator_side_rules` with entries 34–36 per §6. Validates against JSON Schema Draft 2020-12. Backward-compat regression against v65 data: every conforming entry validates cleanly. The 4 pre-firewall `constrains`-subtype edges continue to be tolerated per `PROJECT_INFRASTRUCTURE.md` §2.

- **sub-PR 27 — `scripts/validate.py` update.** `SCHEMA_PATH` repointed at `Map_v19_schema.json`. Rules 34–36 implemented per §6. Smoke tests run per §6's binding spec: pre-retrofit v65 yields 134 Rule 35 warnings; post-retrofit v66 yields ≲5; negative fixtures fire Rules 34 and 36 as expected.

- **sub-PR 28 — `data/Map_v34_consolidated.json` v65 → v66 retrofit-pass.** `bound_direction` populated on all 134 uncertainty=null entries per the sub-PR 24 §3.3 mechanical decision rule, each assignment passing the §4 self-check above. PR description records every assignment with reference to the source citation parenthetical. Post-retrofit Rule 35 warning count drops from 134 to ≲5. Data version bumped v65 → v66; `_meta._schema` updated to `Map_v19_schema.json`.

- **sub-PR 29 — consolidated Phase A + B + C + v19 MCP worker rebuild.** Closes the Phase B Step N+1 drift and Phase C Step N+1 drift documented in `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §Where-things-stand, alongside surfacing the v19 field. New tool `find_bounds(kind, direction)`. Extensions to `find_cells`, `find_predictions`, `get_node` to filter and project `bound_direction`. Verification: `server_info` against the redeployed worker reports `v66 / v19 / ~33 tools` (28 Phase A + 1 Phase B + 3 Phase C + 1 v19).

After sub-PR 29 closes the v19 build, sub-PR 30+ resumes Phase C Step 4.2 phenomenon-side sweeps with `bound_direction` encoded from authoring time. Next candidates per the v65 handoff: (a) neutrino-sector-phenomenology astrophysical-neutrino cells (closing the TXS↔ν-FC half-anchor opened in sub-PR 18); (b) dark-matter-candidates Ω_c h² cell-direct (closing the Ω_c h²↔DM-FC half-anchor opened in sub-PR 20); (c) coverage-gap FC sweeps (SPT-observations, modified-gravity, macroscopic-classical, N=2-SCFT); (d) ADE clique sweep addressing META_v21_1 observation O6.

Estimated total time-to-close from this spec to sub-PR 29 deployment: 3–4 chat sessions.

---

*End of MAP_v19_schema_spec_extension.md, v1.*
