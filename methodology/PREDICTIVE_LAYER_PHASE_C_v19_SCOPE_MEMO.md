# PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md — `bound_direction` shape decisions

**Document type:** Scope memo. Step 0 of the v19 schema bump within Phase C. Settles the design questions accumulated through Phase C Step 4.2 sub-PRs 1–23 so the v19 spec extension can be written against a fixed target. Plays the role for v19 that `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` played for the v18 bump and `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` played for the v17 bump.

**Status:** v1. Authored 2026-05-24. Settles shape decisions; spec extension, schema JSON, validator update, retrofit-pass, and consolidated MCP worker rebuild are downstream sub-PRs 25–29.

**Binding parent docs:** `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2–§3 (Mechanism #1 quantitative_scale); `META_v21_1_methodology_firewall.md`; `MAP_v18_schema_spec_extension.md` (template for the v19 spec extension structure and parent for the qs object schema); `TRACKS_AFTER_PHASE_A.md` §Track 3; `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §Step N+1 drift note (informs §3.5 consolidated rebuild decision); the v64 sub-PR 22 signal (xliv-new — bound-direction disambiguator candidate) and v65 sub-PR 23 signal (lii-new — sensitivity-floor sub-class candidate within T4).

**Disposition principle in force (per v65-chat handoff):** the chat makes all schema-design calls autonomously, justifying each against (a) the AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2, (b) the firewall in `META_v21_1_methodology_firewall.md`, (c) the two-layer architecture in `PROJECT_GOAL_PHENOMENON_LAYER.md`, (d) the locked T-convention typology from prior sub-PRs, and (e) strict additivity of schema bumps. No maintainer-approval ask. Genuine decision-forks where two designs serve different downstream considerations are recorded in §7.

---

## 0. What this memo settles

v18 introduced `quantitative_scale` (Mechanism #1 of the Predictive Layer) as a structured object on five distinct carrier surfaces. The 231 quantitative-scale entries authored across sub-PRs 1–23 of Step 4.2 surfaced one design hole: the `uncertainty: null` encoding collapses three semantically distinct cases into a single AI-invisible representation — strict lower bounds (observational lifetimes, sensitivity floors), strict upper bounds (mass maxima, flux thresholds, sigma-deviation tensions), and exact-value characteristic commitments (S_BH = A/(4Gℏ) coefficient 0.25, K41 −5/3 exponent, Koide Q = 2/3, group-order encodings). A query of the form *"find every lower-bounded lifetime in the dataset"* cannot distinguish these from each other without prose-parsing the first-citation parenthetical.

v19 adds an optional `bound_direction` field to the `quantitative_scale` object that closes this hole. The field is strictly additive over v18 (every v18-conforming entry validates against v19 with `bound_direction` absent) and is the only structural change v19 contains. The retrofit pass populates `bound_direction` on the 134 uncertainty=null entries already authored in v18.

This memo settles five shape decisions: (§3.1) the enum value set; (§3.2) per-kind permission rules and the relationship to the `uncertainty` field; (§3.3) the retrofit-pass scope; (§3.4) the validator-side rules; (§3.5) the MCP worker rebuild scope. §1 states the problem precisely; §2 fixes `bound_direction`'s semantics; §4 spells out the relationship to existing v18 fields; §5 sketches what the downstream v19 spec extension (sub-PR 25) will contain; §6 enumerates what this memo does not settle; §7 records a single decision-fork where the recommended default departs slightly from the handoff's framing.

---

## 1. Why v19 — the T4 disambiguation problem

`uncertainty: null` was introduced in v18 to record literature-reported values where no measurement uncertainty is given. The handoff's T-convention typology labels the broad uncertainty=null surface T10 (134 cumulative entries through v65) and the narrower bound-encoding subset T4 (~45 cumulative entries). The two are related but not coextensive.

The disambiguation problem surfaces concretely in five recurring authoring patterns from Phase C Step 4.2:

**(a) Observational lower bounds on lifetimes / ages / oscillation times.** Sub-PR 23 added seven such entries on `proton-decay-searches` cells: τ/B(p→e⁺π⁰) > 2.4×10³⁴ yr (Super-K 2020), τ(p→ν̄K⁺) > 5.9×10³³ yr (SK 2014), τ(n→n̄) > 4.7×10⁸ s (SK 2021), etc. The literature prose says "lower bound at 90% CL," but the structured `quantitative_scale` records only `kind: "time"`, `value: 2.4e+34`, `uncertainty: null`. An AI query asking *"return every confirmed lower bound on a hadronic decay channel"* cannot distinguish these from the v18 entry recording τ_p as a falsified prediction at exactly 10³³ yr (an exact-value-target encoding, not a bound).

**(b) Sensitivity-floor design targets from future experimental programs.** Sub-PR 23 added Hyper-K's 10³⁵ yr and DUNE's 1.3×10³⁴ yr sensitivity floors from the design reports (1805.04163, 2002.03005). These are structurally identical to (a) on the v18 surface (`kind: "time"`, `value: 1e+35`, `uncertainty: null`) but represent forward-looking program commitments rather than current observational bounds. The (lii-new) sub-PR 23 signal flagged this as a candidate new sub-class within T4; the §3.1 decision below relegates the *type* dimension to Step 4.4 `resolves` edges and preserves `bound_direction` as a purely *direction* discriminator.

**(c) Upper bounds on tension / flux / mass / dimensionless thresholds.** The Hubble-tension sigma_deviation entries (sub-PR 17 ~5σ, 3σ on SK σ_8 from sub-PR 18), upper limits on |θ_QCD| < 10⁻¹⁰ (Abel et al. 2020 PSI nEDM), mass maxima on dark-matter candidate cells. The "at least Nσ" reading of sigma_deviation entries is itself a unidirectional bound that v18 cannot express.

**(d) Exact-value characteristic numerical commitments.** Sub-PR 4.1 included these explicitly per the maintainer-stated thermodynamics-principle ("a periodic table of physics is not complete without thermodynamics; what if some of the potential closures or unifications can't be seen because we left it off the map"): S_BH = A/(4Gℏ) coefficient 0.25, K41 turbulence exponent −5/3, Koide Q ≈ 2/3, the chiral scale Λ_χ ≈ 1 GeV. The literature reports these as exact (not as bounds in either direction). The current v18 encoding (uncertainty=null) is correct for "no precision data given" but cannot signal *"this is an exact-value commitment, not a one-sided bound."*

**(e) Discrete-variant / structural-constant encodings.** SPT classification group orders (Z_16 for class-DIII from Kapustin et al. 2015; Z_8 from Fidkowski-Kitaev 2010), FQH topological-order anyon counts, MTC discrete labels. These are mathematical-structural commitments with no notion of direction at all — they are exact integers or rationals encoding categorical content.

Cases (a), (b), and (c) need `lower` or `upper` direction marks to be AI-queryable. Cases (d) and (e) need a third mark — `two-sided` — that signals "exact-value commitment, not a directional bound." A fourth mark — `unspecified` — covers entries where the cartographer cannot determine direction from the existing prose (target for v20-or-later revisit).

The v19 bump introduces these four marks as the values of a single optional field, `bound_direction`, on the `quantitative_scale` object.

---

## 2. The `bound_direction` field — semantics

**Field shape.**

```json
"quantitative_scale": {
  "kind": "...",
  "value": <number>,
  "units": "...",
  "uncertainty": <number> | { "low": ..., "high": ... } | null,
  "log10": <boolean, optional>,
  "bound_direction": "lower" | "upper" | "two-sided" | "unspecified",   // v19 — optional
  "citations": [ "..." ]
}
```

**Enum values (binding for v19; settled in §3.1).**

- `"lower"` — `value` is a lower bound on the underlying quantity. Examples: observational proton-decay lifetime lower bound (τ > 2.4×10³⁴ yr), neutron-EDM rules out |θ_QCD| > 10⁻¹⁰ giving a lower bound on the small-θ_QCD case (interpreted opposite below), monopole-mass lower bound from cosmological abundance constraints, sensitivity floors on future-program reach (the underlying observable will be discovered if its value exceeds the floor).

- `"upper"` — `value` is an upper bound on the underlying quantity. Examples: σ_8 ≲ 0.78 from SPT Y_500 cluster counts (sub-PR 18), |θ_QCD| < 10⁻¹⁰ from nEDM null result (this is the standard reading), Σm_ν < 0.12 eV from Planck+BAO, tension severity Nσ "at least N" upper-bound semantic. Sigma_deviation entries are encoded `upper` per the "at least Nσ" reading — the discrepancy is at least the reported value.

- `"two-sided"` — `value` is an exact-value commitment reported in the literature without one-sided directionality. The entry is not a bound; it is the value the literature reports as the structural / characteristic / theoretical commitment. Examples: S_BH = A/(4Gℏ) coefficient 0.25, K41 −5/3 exponent, Koide Q = 2/3, group-order encodings (Z_16, Z_8), the chiral scale Λ_χ ≈ 1 GeV, predicted α_GUT ≈ 0.21 from Georgi-Quinn-Weinberg 1974, the entropy formula S_BH = A/(4Gℏ) coefficient.

- `"unspecified"` — direction is genuinely ambiguous from the existing prose or applicable in multiple non-redundant ways. Reserved for entries the retrofit-pass cannot assign confidently; flagged in the sub-PR 28 changelog for v20-or-later revisit. Expected to be rare (≲5% of T10) but explicitly admitted so the retrofit-pass never has to make arbitrary calls.

**Where the field is permitted.** Anywhere `quantitative_scale` is permitted, subject to §3.2 per-kind / per-uncertainty restrictions. The five v18 carrier surfaces (open-frontier/totality-approach nodes, cells, predictions, `bears-on` edges, `if_real_implies` implications) all carry `bound_direction` optionally when their qs is present.

**Where the field is forbidden.** Any qs entry with a non-null `uncertainty` (numeric or `{low, high}`). Two-sided measurements are already structurally complete via the uncertainty annotation; adding `bound_direction: "two-sided"` would be redundant, and adding `bound_direction: "lower"` or `"upper"` would contradict the uncertainty payload. Hard-error rule (§3.4, Rule 34) enforces this.

**When absent.** The field is optional on all five carrier surfaces. Absence on an uncertainty=null entry means the retrofit-pass has not yet reached that entry (warning-level Rule 35); absence on a non-null-uncertainty entry is the only correct state and the schema enforces this.

---

## 3. Five shape decisions

### 3.1 Enum values — four-value set

**Decision: `bound_direction` is an enum with exactly four string values: `"lower"`, `"upper"`, `"two-sided"`, `"unspecified"`.**

Options surveyed and rejected:

- **3-value `{lower, upper, two-sided}` + absence-as-non-applicable.** Rejected. Conflates two distinct meanings of "field absent": (i) the field is irrelevant because the entry has uncertainty (the §3.2 hard-error case) and (ii) the field is applicable but direction couldn't be determined (the cartographer's escape hatch). A dedicated `"unspecified"` value separates these.

- **5-value `{lower, upper, two-sided, design-floor, unspecified}`.** Rejected. Folds the (lii-new) sub-PR 23 SENSITIVITY-FLOOR sub-class candidate into the direction enum, but this conflates the *direction* of a bound (lower/upper/two-sided/unspecified) with the *type* of bound (current-observational vs future-design-target). A sensitivity floor IS a lower bound in direction — what makes it a design target is the cross-reference to a future-program experimental-program node. That cross-reference is the natural locus of Step 4.4 `resolves` edges (queued sub-PR after v19 completes per `TRACKS_AFTER_PHASE_A.md` Track 3). Keeping `bound_direction` as a pure direction discriminator and relegating the type dimension to `resolves` edges preserves orthogonality and admits the 5-value option as an additive v20 bump if Step 4.4 timing argues otherwise.

- **6-value adding `"excluded"` for sigma_deviation-style exclusion thresholds.** Rejected. Sigma_deviation entries are already structurally upper bounds on tension severity ("the discrepancy is at least Nσ" reading); encoding them as `"upper"` is semantically unambiguous. A separate `"excluded"` would split a single-direction surface into two synonyms without adding queryability.

The 4-value enum captures every retrofit-pass case the 134 T10 entries in v65 require, leaves room for future refinement via v20+ additive bumps (e.g., splitting `"lower"` into observational-confirmed-lower vs design-floor-lower if Step 4.4 timing demands it), and aligns with the principle that a schema bump should resolve a concrete authoring pain without preempting downstream design space.

### 3.2 Per-kind and per-uncertainty permission rules

**Decision: `bound_direction` is OPTIONAL on every qs kind. It is FORBIDDEN whenever `uncertainty` is non-null. It is RECOMMENDED (warning-level) on every uncertainty=null entry.**

Three sub-rules:

- **Optional on every kind (`energy_scale`, `mass`, `length`, `time`, `ratio`, `coupling`, `dimensionless`, `sigma_deviation`).** Strict additivity: every v18-conforming entry validates against v19 with `bound_direction` absent. No kind is excluded from the field — even `dimensionless` and `sigma_deviation` (which v18 §5.3–§5.4 exclude from `units` and `log10` respectively) accept all four enum values.

- **Forbidden when `uncertainty` is non-null.** Hard error (Rule 34, §3.4). An entry with `uncertainty: 0.05` (symmetric ±) or `uncertainty: {low: 0.03, high: 0.07}` (asymmetric) is already a two-sided measurement; the bound_direction field carries no information beyond the uncertainty payload. Forbidding it via hard error keeps the schema's internal consistency tight and prevents two-sided-measurement entries from being mis-encoded as bounds.

- **Recommended (warning-level) when `uncertainty` is null.** Rule 35, §3.4. Mirrors the Rule 22 axis_mapping precedent (v16) — warning-level so the v18→v19 transition validates the existing 134 uncertainty=null entries cleanly on day one, with the warning population shrinking as the retrofit-pass (sub-PR 28) lands. After sub-PR 28 the warning count drops to ≲5 entries (the genuine `"unspecified"` cases), where it stays until v20-or-later revisits them.

This three-rule structure encodes a binary semantic in the schema: an entry either has a directional bound to record (uncertainty=null + bound_direction) or has a two-sided measurement to record (numeric/asymmetric uncertainty). The schema rejects all mixed cases.

### 3.3 Retrofit-pass scope — all 134 T10 entries, single PR

**Decision: the retrofit-pass (sub-PR 28) covers all 134 uncertainty=null entries in `data/Map_v34_consolidated.json` v65 in one mechanical pass. Data version bump v65 → v66.**

This departs from the v65-chat handoff's "45 T4 entries" framing; the departure is recorded in §7 as the single decision-fork in this memo with rationale.

**Retrofit decision rule (mechanical per entry):**

- T10 lifetime / age / timescale / oscillation-time lower bounds (cases (a)–(b) of §1) → `bound_direction: "lower"`. Includes: sub-PR 23 cells[0,1,2,4,7,9,10] proton-decay-searches lifetime lower bounds and sensitivity floors; SU(5) τ_p falsification on `su5-gut-rep-content.predictive_yield[0]`; n–n̄ oscillation lower bound; monopole-mass lower bound from cosmological-abundance constraint; cosmological lower bounds on TXS-source astrophysical-neutrino lifetimes (sub-PR 18); sensitivity floors on Hyper-K, DUNE, axion-haloscope, EDM continuation programs once added by Step 0.5-precedent forward-looking experimental-program reach. Approximate count: 35–45.

- T10 mass / coupling / dimensionless / energy_scale **upper** bounds (case (c) of §1) → `bound_direction: "upper"`. Includes: |θ_QCD| < 10⁻¹⁰ from PSI nEDM; Σm_ν upper bound from Planck+BAO; mass maxima on dark-matter candidate cells; coupling-strength upper bounds on axion-photon and dark-photon mixing; σ_8 upper bound from SPT Y_500 cluster counts; flux upper bounds on UHE cosmic-ray sources. Approximate count: 15–25.

- T10 sigma_deviation tension severities → `bound_direction: "upper"`. The "at least Nσ" reading is uniformly upper-bounded on the parent discrepancy. All 10 sigma_deviation T10 entries fall here. Approximate count: 10.

- T10 exact-value characteristic / theoretical / structural commitments (cases (d)–(e) of §1) → `bound_direction: "two-sided"`. Includes: S_BH = A/(4Gℏ) coefficient 0.25; K41 −5/3; Koide Q = 2/3; chiral scale Λ_χ ≈ 1 GeV; predicted α_GUT ≈ 0.21 (Georgi-Quinn-Weinberg 1974); group-order encodings (Z_16, Z_8); η_B central value 6.1×10⁻¹⁰ (when reported without uncertainty in the source); monopole mass M_M ≈ 10¹⁶ GeV (when reported as the 't Hooft-Polyakov prediction central value rather than as a bound). Approximate count: 50–70.

- T10 entries where the prose is ambiguous about direction → `bound_direction: "unspecified"`. Flagged in the sub-PR 28 changelog for v20-or-later revisit. Approximate count: 0–5.

The retrofit is mechanical: every assignment is derivable from the existing first-citation parenthetical (which already encodes "source-value: lower limit…", "source-value: 90% CL upper bound", "source-value: predicted value", etc., per the v18 spec's citation-formatting convention). No new literature anchoring is required — the firewall self-check in v19 spec §4 will confirm that bound_direction values are re-encoding of structural content already present, not new claims. This is the same kind of strictly-additive structural-explicitness move that Phase A's `constructive_status` was relative to v15.3 — making implicit structural content machine-explicit.

**Granularity of the retrofit PR.** Single PR. The retrofit decisions are uniformly mechanical at the rule-application level. The 134 entries can be processed in 1–2 authoring sessions. Splitting by FC would multiply commits without separating concerns — every FC's contribution to T10 is uniform-mechanical. The §0 disposition principle update means no proposal-table maintainer-approval step; the chat authors the retrofit in one pass and commits.

### 3.4 Validator-side rules — 34, 35, 36

**Decision: three new validator rules, mirroring the v17 (Rules 24–26) and v18 (Rules 27–33) phases' rule-count cadence.**

- **Rule 34 (hard error) — bound_direction forbidden on entries with non-null uncertainty.** Enforces the §3.2 forbidden-on-two-sided-measurements rule. Implementation: walk every `quantitative_scale` object; if `uncertainty` is present and non-null and `bound_direction` is also present, emit error.

- **Rule 35 (warning) — bound_direction recommended on entries with uncertainty=null.** Mirrors the Rule 22 axis_mapping warning precedent. Implementation: walk every `quantitative_scale` object; if `uncertainty` is null (or — by §3.2 — explicitly null) and `bound_direction` is absent, emit warning. Expected warning population after v19 schema lands but before sub-PR 28 retrofit: 134; after sub-PR 28: ≲5 (the genuine `"unspecified"` cases that are explicitly marked, so the warning fires on absent-not-unspecified).

  **Refinement:** Rule 35 fires only when `bound_direction` is **absent**. Entries explicitly marked `"unspecified"` do **not** trip the warning — they are the documented escape hatch. This keeps the warning signal-to-noise high: post-retrofit, a Rule 35 warning means the entry was missed, not that the cartographer made a deliberate `"unspecified"` call.

- **Rule 36 (hard error) — bound_direction must be one of the four enum values.** JSON Schema's `enum` constraint handles this at schema-validation time, but Rule 36 codifies the runtime cross-check (mirrors Rule 31 on units conformance and Rule 32 on log10 permission). Implementation: walk every qs object; if `bound_direction` is present and not in `{"lower", "upper", "two-sided", "unspecified"}`, emit error.

The three-rule scope is consistent with the v17→v18 cadence (Phase B added 3 rules, Phase C added 7 rules, v19 adds 3) and reflects the narrower v19 scope (one field added, one warning, one hard-error gate, one enum-conformance check). No additional rules are required for v19 — the new field has no carrier-type restrictions beyond the qs-carrier-surface restrictions already enforced by v18 Rules 27–33.

### 3.5 MCP worker rebuild — consolidated Phase A + B + C + v19

**Decision: the v19 worker rebuild (sub-PR 29) is a consolidated rebuild covering the full Phase A + B + C + v19 tool surface in one Cloudflare deployment. The deployment also fixes the Phase B Step N+1 drift and Phase C Step N+1 drift documented in `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §Where-things-stand.**

The deployed MCP worker at `https://map-of-physics.eddie-8e5.workers.dev` reports `v40 / v16 / 28 tools` as of v65 (verified via `server_info` in the Phase C handoff). This is the Phase A surface only — neither the Phase B `find_signal_implications` tool nor the Phase C `rank_by_scale` / `find_resolvers` / `find_discriminating_experiments` tools are accessible through MCP. The drift originated from Phase B's Step N+1 either never deploying cleanly or being reverted; Phase C compounded the gap.

A v19-only rebuild would extend the drift: tooling would advance from Phase A to Phase A + v19 but still skip Phase B and Phase C. A consolidated rebuild aligns the worker with canonical data state v66 (post-retrofit) and schema state v19 in one deployment, closing all three drift instances simultaneously.

**Scope of sub-PR 29 consolidated rebuild:**

- **Phase B tools (deferred since v17 deployment):** `find_signal_implications(carrier_id, resolution_id?)`; extension of `find_loose_ends` to surface `if_real_implies` entries.

- **Phase C tools (deferred since v18 deployment):** `rank_by_scale(node_type, kind)` — ranks all qs entries of a given kind across a given node_type; `find_resolvers(cell_or_frontier_id)` — returns the set of experimental-program nodes connected via `resolves` edges to the target; `find_discriminating_experiments(program_a, program_b)` — the flagship AI-first query per `PROJECT_GOAL_SUPPLEMENT.md` §1.2; extensions to `find_predictions` and `get_node` to surface `quantitative_scale` on returned payloads.

- **v19 tool (new):** `find_bounds(kind, direction)` — returns every qs entry of the given `kind` with the given `bound_direction`. Closes the AI-queryable surface for the dataset's directional empirical commitments. Extensions to `find_cells`, `find_predictions`, and `get_node` to filter by `bound_direction` and to surface it on returned payloads.

Verification step (per sub-PR 29 close): `server_info` against the redeployed worker reports `v66 / v19 / ~33 tools` (Phase A's 28 + 1 Phase B + 3 Phase C + 1 v19 = 33). This is the closing check that the consolidated rebuild succeeded.

---

## 4. Relationship to existing v18 fields

`bound_direction` is structurally orthogonal to every existing field on the qs object and to the v16 / v17 fields it interacts with at the carrier level. The §3.2 forbidden-on-non-null-uncertainty rule is the only enforced interaction.

**`uncertainty`.** Records *precision* of the value (symmetric ±, asymmetric {low, high}, or null = no precision data). `bound_direction` records *direction* of the value. The two are independent dimensions of the encoding. The forbidden-on-non-null-uncertainty rule (Rule 34) is the only mandatory interaction: when uncertainty is non-null, the entry is already structurally a two-sided measurement and bound_direction is forbidden as redundant-or-contradictory.

**`value`, `units`.** Encode the numerical commitment and its dimensional category. `bound_direction` qualifies *how* the numerical commitment is read (is `value` a floor / ceiling / exact). Independent.

**`kind`.** Determines which `bound_direction` values are *typically* sensible — sigma_deviation entries are uniformly `upper`, group-order encodings on `dimensionless` are uniformly `two-sided`, lifetime entries on `time` are typically `lower`. But the schema does not enforce kind-direction co-restrictions; an unusual case (e.g., a `length` entry recording the maximum applicability radius of a regime → `upper`) is admissible. The retrofit rule in §3.3 is a guideline, not a schema constraint.

**`log10`.** Encodes representation (value-in-log-base-10 vs value-as-quantity). Independent of bound_direction; either representation can carry any direction.

**`citations`.** Encode literature source. Independent of bound_direction; the firewall self-check in §3.3 establishes that every bound_direction value is derivable from existing citation prose, so no new citations are required in the v19 retrofit.

**v17 `if_real_implies` quantitative consequences.** Phase B Step 4.5 (queued, not yet executed) will add `quantitative_scale` to a subset of the 24 `if_real_implies` implications across 14 carriers. When that happens, those qs entries carry `bound_direction` per §3.2 like any other qs entry — uncertainty=null implications get `bound_direction`; uncertainty-bearing implications don't. The v17 and v19 fields compose cleanly with no special-case logic.

**v16 `constructive_status`.** Cell-level closure encoding (`realized` / `forbidden-by-pattern` / `conjectured-by-pattern` / `indeterminate`). Independent of any single qs entry's `bound_direction` on that cell — a cell can be `realized` with a `bound_direction: "lower"` quantitative_scale (e.g., a proton-decay-search cell with a lower bound on the lifetime), or `forbidden-by-pattern` with no qs at all, or `indeterminate` with a qs entry recording a sensitivity floor for the experiment that would resolve it.

---

## 5. What the v19 spec extension (sub-PR 25) will contain — sketch

Following the v17 and v18 spec extensions' structure, the v19 spec extension at `methodology/MAP_v19_schema_spec_extension.md` will be ~250–400 lines and will contain:

**§0 — Orientation.** What v19 settles; pointer back to this scope memo; pointer up to `PROJECT_GOAL_PREDICTIVE_LAYER.md` and the v18 spec.

**§1 — The `bound_direction` field.** Field semantics per §2 of this memo; four enum values per §3.1; permitted carrier surfaces (the five v18 qs surfaces); when present and when absent.

**§2 — New $def.** `bound_direction` as a JSON Schema enum: `{"type": "string", "enum": ["lower", "upper", "two-sided", "unspecified"]}`. Single $def; no nested object structure.

**§3 — Modifications to existing $defs.** The `quantitative_scale` $def gains a new optional property: `"bound_direction": { "$ref": "#/$defs/bound_direction" }`. No other property changes. The two `if_real_implies_implication` and any Phase C edge-level qs $defs that compose `quantitative_scale` inherit the change automatically.

**§4 — Firewall admissibility self-check (restated for the v19 retrofit-pass).** Verbatim restatement of the §2.5 firewall self-check from `META_v21_1_methodology_firewall.md`, scoped to v19. Critical clause: every `bound_direction` value the retrofit-pass assigns must be derivable from the existing first-citation parenthetical or from the cited source's published convention. No new literature anchoring; no inference from cross-FC pattern; no cartographer-coined direction calls. If the prose is genuinely ambiguous, the entry receives `"unspecified"` and is flagged in the sub-PR 28 changelog for v20-or-later revisit. The firewall self-check is recorded entry-by-entry in the sub-PR 28 PR description (mirrors the Phase B and Phase C precedent).

**§5 — Conditional rules.**

- **5.1** — `bound_direction` forbidden when `uncertainty` is non-null. JSON Schema `allOf` block on `quantitative_scale`: `{"if": {"properties": {"uncertainty": {"not": {"type": "null"}}}, "required": ["uncertainty"]}, "then": {"not": {"required": ["bound_direction"]}}}`. (Equivalent canonical form per the v18 spec's §5.1–§5.4 convention.)

**§6 — Validator-side rules (Rules 34–36).** Per §3.4 of this memo, with code-shape and smoke-test specifications mirroring the v18 spec's §6 structure.

**§7 — Grounded examples (drawn from real v65 entries).**

- `proton-decay-searches.cells[0].quantitative_scale` (sub-PR 23): `kind: "time"`, `value: 2.4e+34`, `units: "yr"`, `uncertainty: null`, `bound_direction: "lower"` — observational 90%-CL lifetime lower bound from Super-K 2020.

- `bh-thermodynamics.quantitative_scale` (sub-PR 4.1): `kind: "dimensionless"`, `value: 0.25`, `uncertainty: null`, `bound_direction: "two-sided"` — Bekenstein-Hawking entropy coefficient; literature reports as exact theoretical commitment.

- `proton-decay-searches.cells[9].quantitative_scale` (sub-PR 23): `kind: "time"`, `value: 1e+35`, `units: "yr"`, `uncertainty: null`, `bound_direction: "lower"` — Hyper-K sensitivity floor from design report. Direction is `"lower"` per §3.1 (the underlying observable will be discovered if its value exceeds the floor); the design-target type dimension lives in the Step 4.4 `resolves` edge.

- `muon-g-2.quantitative_scale` (sub-PR 4.1): `kind: "sigma_deviation"`, `value: 4.2`, `uncertainty: null`, `bound_direction: "upper"` — tension severity at least 4.2σ per TI-2020 dispersive HVP; the "at least Nσ" reading is uniformly upper-bounded.

- `cosmological-models.quantitative_scale` (sub-PR 4.1): `kind: "sigma_deviation"`, `value: 5`, `uncertainty: null`, `bound_direction: "upper"` — Hubble tension at least 5σ per Riess et al. 2022. Same pattern as muon g-2.

- `tenfold-way.cells[14].quantitative_scale` (sub-PR 4.3 in spirit, sub-PR 12 in actuality): `kind: "dimensionless"`, `value: 16`, `uncertainty: null`, `bound_direction: "two-sided"` — group-order encoding for Z_16 class-DIII SPT classification; literature reports as exact mathematical structural constant.

**§8 — Downstream sequencing.** Sub-PR 26 (schema JSON) ⇒ sub-PR 27 (validator) ⇒ sub-PR 28 (retrofit) ⇒ sub-PR 29 (consolidated MCP worker rebuild). Estimated total time-to-close: 3–5 chat sessions including the present sub-PR 24.

---

## 6. What this memo does not settle

Each is queued downstream:

- **v19 schema-spec extension** (sub-PR 25, immediate next step) — fleshes out §5 above into the binding spec document.

- **v19 schema JSON** (sub-PR 26) — `schema/Map_v19_schema.json`, strictly additive over v18. Adds the `bound_direction` $def per §3.1 and the optional property on `quantitative_scale` per §3 above; adds the conditional rule per §5.1; populates `_validator_side_rules` with entries 34–36.

- **Validator update** (sub-PR 27) — `scripts/validate.py` extended with Rules 34–36 per §3.4. Smoke test against v65 data (pre-retrofit): 0 new schema errors / 134 new Rule 35 warnings (every existing T10 entry triggers the warning because `bound_direction` is absent). Negative smoke tests against malformed entries fire as expected.

- **Retrofit-pass** (sub-PR 28) — `data/Map_v34_consolidated.json` v65 → v66; bound_direction populated on all 134 uncertainty=null entries per the §3.3 mechanical decision rule; firewall self-check applied entry-by-entry per spec §4; sub-PR 28 PR description records every assignment with reference to the source citation parenthetical. Post-retrofit: Rule 35 warning count drops from 134 to ≲5 (the `"unspecified"` cases).

- **MCP worker rebuild** (sub-PR 29) — `mcp/worker_skeleton.js` extended with the Phase B + Phase C + v19 tools per §3.5; Cloudflare deploy; `server_info` verification reporting `v66 / v19 / ~33 tools`.

- **Phase B Step 4.5 `if_real_implies` quantitative consequences** — unaffected by v19. The 24 Phase B implications across 14 carriers do not yet carry `quantitative_scale`; when Phase B Step 4.5 lands (queued elsewhere), the new implication-level qs entries will carry `bound_direction` per the same §3.2 rules.

- **Phase C Step 4.4 `resolves` edges** — unaffected by v19. The 12 forward-looking experimental-program nodes authored in Phase C Step 0.5 are the source-end inventory; the `resolves` edges they originate will not carry `quantitative_scale` at the edge level (per v18 §5.7), but their target cells / frontiers will (and those qs entries will carry `bound_direction`). The (lii-new) sensitivity-floor sub-class candidate is settled here by relegating the design-floor type dimension to `resolves` edge structure rather than to `bound_direction` enum.

- **Phase C Step 4.2 sub-PR 30+ resumption** — after sub-PR 29 lands the consolidated MCP rebuild, sub-PR 30+ resumes phenomenon-side sweeps with `bound_direction` encoded from authoring time. The next candidates per the v65 handoff: (a) neutrino-sector-phenomenology astrophysical-neutrino cells cell-direct (closes the TXS↔ν-FC half-anchor opened in sub-PR 18); (b) dark-matter-candidates Ω_c h² cell-direct (closes the Ω_c h²↔DM-FC half-anchor opened in sub-PR 20); (c) coverage-gap FC sweeps; (d) ADE clique sweep addressing META_v21_1 observation O6.

---

## 7. Recorded decision-fork — retrofit scope (45 vs 134)

The v65-chat handoff framed the §3.3 retrofit scope as "all 45 T4 entries." Direct inspection of v65 data (verified at the start of this chat: 231 total quantitative_scale entries, 134 with `uncertainty: null`, 97 with non-null uncertainty) shows that the broader T10 (uncertainty=null) surface contains 134 entries, of which the strict-bound subset T4 is approximately 45 and the exact-value-commitment subset is approximately 89.

The handoff's own §3.3 breakdown lists assignments for both subsets — strict bounds get `"lower"` or `"upper"`, characteristic numerical commitments get `"two-sided"`. So the handoff's framing is internally consistent with retrofitting both subsets, but the "45 T4 entries" framing reads narrower than the breakdown supports.

**Recorded call:** the retrofit scope is the full 134 T10 entries. Rationale:

(i) **AI-queryability.** A query like `find_bounds(kind="time", direction="lower")` returns the 35–45 strict-lower-bound time entries cleanly. A symmetric query like `find_bounds(kind="dimensionless", direction="two-sided")` returns the ~70 exact-value dimensionless commitments (S_BH coefficient, K41 exponent, group orders) — useful AI surface for cross-FC pattern-finding (e.g., finding all literature-reported structural constants across the dataset). A partial retrofit leaving characteristic-commitments without `bound_direction` makes the latter query return nothing, which underuses the schema's expressive surface.

(ii) **Uniformity.** A uniform encoding scheme across the entire uncertainty=null surface is simpler than a partial one. Rule 35 (warning on absent `bound_direction` for any T10 entry) becomes a clean signal of authoring completeness post-retrofit; a partial scheme would need to distinguish "intentionally absent on characteristic commitments" from "missed on a strict bound," which would either require an additional schema bit or leave the warning's signal-to-noise compromised.

(iii) **Cost of the wider scope.** Touching the additional ~89 characteristic-commitment entries in sub-PR 28 adds modestly to the retrofit-pass workload (estimated +1 authoring session) but adds no firewall risk — these entries' source citations already encode the exact-value-commitment reading in the first-citation parenthetical. The assignment to `"two-sided"` is mechanical.

(iv) **Step 4.1 inclusivity principle alignment.** The maintainer-stated thermodynamics-principle from Step 4.1 ("a periodic table of physics is not complete without thermodynamics; what if some of the potential closures or unifications can't be seen because we left it off the map — it will disrupt patterns") generalizes here: leaving characteristic-commitment entries without `bound_direction` would make them invisible to AI queries that surface across the directional axis, distorting cross-FC pattern-visibility in exactly the way the Step 4.1 principle warned against. Retrofitting all 134 entries is the pattern-visibility-preserving choice.

This is the only decision in this memo where the recommended default departs from the handoff's framing. The departure is recorded here per the §0 disposition principle update and is binding for sub-PR 28's authoring scope.

---

*End of PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md, v1.*
