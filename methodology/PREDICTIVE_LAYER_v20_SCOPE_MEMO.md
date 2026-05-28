# PREDICTIVE_LAYER_v20_SCOPE_MEMO.md — implication-kind enum extension

**Document type:** Scope memo. Step 0 of the v20 schema bump. Settles the design question accumulated in sub-PR 55's v92 changelog (carrier-refresh on muon-g-2; the v17 `if_real_implies.implications[].kind` enum was found to lack a value for SM-consistent resolution branches) so the v20 spec extension can be written against a fixed target. Plays the role for v20 that `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` played for the v18 bump and `PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md` played for the v19 bump.

**Status:** v1. Authored 2026-05-28. Settles enum-shape decisions; spec extension (`MAP_v20_schema_spec_extension.md`), schema JSON (`Map_v20_schema.json`), validator-rule update, and consolidated MCP worker rebuild are downstream sub-PRs.

**Binding parent docs:** `META_v21_1_methodology_firewall.md` §2 (firewall on authoring decisions); `MAP_v17_schema_spec_extension.md` §2–§3 (the `if_real_implies` shape and the existing five-value enum); `MAP_v18_schema_spec_extension.md` and `MAP_v19_schema_spec_extension.md` (templates for spec-extension shape and validator-rule cadence); `PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md` (template for the scope-memo shape this document follows); `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §4 working norms; `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §5 (architecture options Route 1 / Route 2 / Route 3 / hybrid; referenced in §6 below as the secondary motivation considered and deferred); the v92 changelog entry on `data/Map_v34_consolidated.json` (sub-PR 55's `schema_candidates_status_observations` field exposes the enum gap).

**Disposition principle in force (carried forward from the v19 scope memo's §0):** the chat makes all schema-design calls autonomously, justifying each against (a) the firewall in `META_v21_1_methodology_firewall.md` §2, (b) strict additivity of schema bumps (every v19-conforming entry must validate against v20 with the new field absent), (c) the two-layer architecture of `PROJECT_GOAL_PHENOMENON_LAYER.md`, and (d) the existing v17 enum's design intent. No maintainer-approval ask. Genuine decision-forks where two designs serve different downstream considerations are recorded in §7.

---

## 0. What this memo settles

v17 introduced `if_real_implies` (the Predictive Layer's Phase B mechanism) with a five-value `kind` enum on each implication: `{new_cell, new_axis, forced_edge, promotes_subtype, new_FC}`. Each value names a specific structural consequence that the resolution forces on the substrate.

Sub-PR 55 (v92, 2026-05-25) authored a carrier-refresh on the muon-g-2 totality-approach against post-2025 literature (Aliberti 2025 WP25 lattice-HVP consensus; Aguillard 2025 final Run-1–6 measurement; Boccaletti 2024 BMW hybrid). The refresh exposed a concrete encoding gap: the post-2025 reconciliation (residual deviation ≈ 1σ, SM-internal HVP methodology question rather than BSM-loop forcing) is itself a resolution branch of the muon-g-2 open question, but the v17 enum has no value that records "this branch implies no new structure" — every existing value names a specific addition (`new_cell`, `new_axis`, `forced_edge`, `new_FC`) or a specific modification (`promotes_subtype`). The author chose Option (i) — refresh citations and condition text on the existing BSM-loop resolution entry — and recorded the gap as a schema observation deferred to a future v20 methodology pass.

v20 closes that gap. **One new enum value is added: `no_structural_consequence`.** The new value carries the semantics "this resolution implies no new cell, no new axis, no new cross-classification edge, no new formal classification, and no promotion of an existing subtype." The `target` field is null (mirroring `new_FC`'s target-null precedent); the `description` field carries the prose recording what the SM-consistent or dispatch-to-internal-methodology reading looks like and which existing FC(s) the question internally dispatches to.

This memo settles six shape decisions: (§3.1) the enum value's name and exact semantics; (§3.2) target shape; (§3.3) per-implication permission rules and interaction with the existing implications-array `minItems` constraint; (§3.4) the validator-side rule strategy (Rule 24 extension vs new Rule 37); (§3.5) the retrofit-pass scope; (§3.6) the MCP worker rebuild scope. §1 states the problem precisely; §2 fixes the new value's semantics; §4 spells out the relationship to existing v17 fields; §5 sketches what the downstream v20 spec extension will contain; §6 enumerates what this memo does not settle (including the cross-FC pattern layer Route 2 enablement); §7 records the single decision-fork (minimum v20 scope vs bundled v20 scope) where the recommendation departs from a plausible alternative reading of the cross-FC scope memo's §10.1 condition 2 trigger.

---

## 1. Why v20 — the SM-consistent-resolution gap

The v17 `if_real_implies` mechanism (per `MAP_v17_schema_spec_extension.md` §2) is designed to record forced structural consequences of a positive resolution of an open question. Each `if_real_implies_entry` carries (a) a `resolution` discriminator naming one specific way the question could land, (b) a `condition` describing the antecedent in physicist prose, (c) `condition_citations` anchoring the antecedent, and (d) one or more `implications`, each with a `kind` discriminator naming the consequence the resolution forces.

The five-value `kind` enum captures every consequence the v17 design anticipated:

- `new_cell` — a cell is forced into an existing FC (target = FC id).
- `new_axis` — a new classification axis is forced on an existing FC (target = FC id).
- `forced_edge` — a new cross-classification edge is forced between two existing FCs (target = `{from, to, subtype}`).
- `promotes_subtype` — an existing entity's status / subtype / constructive-status is promoted (target = edge id or cell id).
- `new_FC` — a new formal classification is forced into existence (target = null).

What v17 doesn't anticipate: a resolution whose positive realization implies *no* structural consequence — the substrate as it is remains correct, and the persistent open question dispatches to internal methodology of an existing FC rather than forcing new structure.

Sub-PR 55 (v92) is the first authoring case to encounter this gap concretely. The muon-g-2 carrier's post-2021-design-report empirical picture had been frozen at a 4.2σ measurement-vs-SM tension; the 2025 literature (Aliberti WP25 + Aguillard final Run-1–6 + Boccaletti BMW-hybrid) reconciles the tension to ≈ 1σ via the lattice-HVP / dispersive-HVP methodology split. The SM-consistent reading — "residual deviation is statistical scatter at post-2025 precision; the persistent question is the SM-internal dispersive-vs-lattice HVP methodology refinement" — is a substantive resolution branch of the open question, and it cannot be encoded as a separate `if_real_implies_entry` because every implication kind names a forced consequence.

The v92 changelog records this explicitly in its `schema_candidates_status_observations` field:

> The v17 `if_real_implies` implication kind enum {new_cell, new_axis, forced_edge, promotes_subtype, new_FC} is designed to record forced structural consequences and lacks a representation for resolutions whose realization implies NO new structure (the 'SM-consistent branch' / 'dispatch-to-internal-methodology-refinement' / 'no FC forced' family). The muon-g-2 post-2025 picture exposes this limitation: a complete record of the carrier's resolution landscape would benefit from both branches being structurally encoded — the BSM-loop branch (currently encoded, forces new BSM FC) AND the SM-consistent branch (cannot be encoded under v17). Whether this gap warrants a v20 schema extension (e.g., a new implication kind 'no_new_structure' with description-only target, or a separate carrier-level field 'resolution_dispatched_to' pointing at internal-to-an-existing-FC) is deferred to a future methodology discussion.

This memo is that discussion.

The friction is general, not specific to muon-g-2. Future carrier-refresh sub-PRs that the §5.20 / §5.18 / §5.19 chain anticipates — BBN parameter refreshes when CMB-S4 publishes; dark-matter freeze-out value refreshes when the canonical QCD-axion mass-coupling relation is updated by lattice-QCD progress; neutrino oscillation parameter refreshes when NuFIT or T2K publish global-fit updates — will encounter the same gap whenever the post-data-update picture lands on a "no new structure forced" reading rather than a "BSM-loop / new-FC-forcing" reading. Authoring those refreshes against v17 would force the same Option (i) workaround (refresh only the BSM-loop branch's citations and condition text), which understates the carrier's full resolution landscape and progressively widens the encoding-vs-content gap.

**Why this is the firewall-clean trigger for v20.** Per `META_v21_1_methodology_firewall.md` §2: opening an authoring sub-PR must pass the self-check question *"Would I author this anyway on physics-content / project-infrastructure grounds alone?"* The v17 enum gap passes cleanly: a concrete authoring case (sub-PR 55, dated 2026-05-25) found the encoding gap, an explicit literature-grounded resolution branch could not be recorded, and the gap is general enough that future carriers will inherit it. No pattern observation about the cross-FC pattern layer enters; no trigger-watch outcome enters; the gap is friction in authored content surfacing through a normal carrier-refresh workflow.

A secondary motivation — the cross-FC pattern layer scope memo's §10.1 condition 2 ("schema v20 authored and CI-validated") naming v20 as the binding blocker for the first Mode D virtual-FC sub-PR — exists but is not the firing trigger. The cross-FC scope memo expects v20 to enable Route 2 (virtual-FCs indexing cells across other FCs); whether v20 *should* do that is a separate maintainer decision under the firewall (a recommendation that v20 enable Route 2 because the cross-FC trigger is gated on it would be back-influence in the §2 sense). The §7 decision-fork records the alternatives explicitly and the recommended disposition.

---

## 2. The `no_structural_consequence` implication kind — semantics

**Field shape (v20).**

```json
"if_real_implies_implication": {
  "type": "object",
  "required": ["kind", "description", "derivation_citations"],
  "properties": {
    "kind": {
      "type": "string",
      "enum": ["new_cell", "new_axis", "forced_edge", "promotes_subtype", "new_FC", "no_structural_consequence"],
      "description": "v17 + v20. Discriminator for the kind of structural consequence. See MAP_v17_schema_spec_extension.md §2 for the original five values; MAP_v20_schema_spec_extension.md §2 for the v20-added value."
    },
    "target": {
      "description": "Target of the structural consequence. Shape depends on kind — see §3 conditional rules. Null when kind = new_FC OR kind = no_structural_consequence."
    },
    "description": { "type": "string" },
    "derivation_citations": { "type": "array", "minItems": 1 }
  }
}
```

The change relative to v17 is strictly additive: one value added to the `kind` enum; the `target` field's null-permission set widens by one value (`{new_FC} → {new_FC, no_structural_consequence}`); the rest of the implication object is unchanged. Every v17-conforming and v19-conforming entry validates against v20 with no edits.

**Semantics of `no_structural_consequence`.**

A resolution whose positive realization implies that the substrate as it is remains correct: no new cell is forced, no new axis is forced, no new cross-classification edge is forced, no new formal classification is forced, no existing entity's status / subtype / constructive-status is promoted. The persistent open question (if any) dispatches to internal methodology of one or more existing FCs (the dispatch is named in prose, not in a structured target field; see §3.2 for the rationale).

The kind is *not* "the resolution is impossible" (resolutions are conditional structural claims; impossibility would be a different mechanism — an `excluded_resolution` flag on the carrier, which v20 does not author). The kind is *not* "the resolution is unknown" (unknown is the implicit state when no `if_real_implies_entry` exists for a given resolution; v20 doesn't author an explicit-unknown mechanism). The kind is "the resolution branch *is* known, *and* it implies no new structure" — a positive structural claim about the absence of forced consequences, anchored in cited literature.

**Example: the muon-g-2 SM-consistent branch (the canonical first instance).**

```json
{
  "resolution": "sm-internal-hvp-methodology-question",
  "condition": "At post-2025 precision, the residual deviation between the WP25 lattice-HVP-consensus SM prediction and the Aguillard 2025 final Run-1–6 measurement is ≈1σ. The persistent open question is the SM-internal HVP methodology choice (dispersive vs lattice; CMD-3 vs earlier e⁺e⁻ below 1 GeV); the empirical reconciliation does not require BSM contributions to a_μ.",
  "condition_citations": [
    "Aliberti et al. 2025 — TI WP25 update Phys. Rep. 1143:1 adopting lattice-HVP consensus; SM prediction a_μ^SM = 116 592 033(62) × 10⁻¹¹",
    "Aguillard et al. 2025 — Fermilab E989 final Run-1–6 PRL 135:101802, arXiv:2506.03069; measurement a_μ^exp = 116 592 070.5(14.6) × 10⁻¹¹",
    "Boccaletti et al. 2024 — BMW hybrid LO-HVP at 0.48% precision, arXiv:2407.10913"
  ],
  "implications": [
    {
      "kind": "no_structural_consequence",
      "target": null,
      "description": "The residual deviation is consistent with the SM at post-2025 precision; no new BSM FC organizing leptonic anomalous-magnetic-moment contributors is forced. The persistent open question dispatches to hadronic-states (HVP regime; dispersive vs lattice methodology) and chiral-perturbation-theory (lattice methodology for the e⁺e⁻ data discrepancy below 1 GeV); both are internal-methodology refinements within existing FCs, not new structural authoring.",
      "derivation_citations": [
        "Aliberti et al. 2025 — WP25 paper's §2 scope statement explaining the omission of the dispersive HVP branch from the consensus value, recording the dispatch to lattice-HVP methodology",
        "Boccaletti et al. 2024 — BMW hybrid result documenting the lattice-HVP precision floor"
      ]
    }
  ]
}
```

This entry is *complementary* to the existing BSM-loop branch on muon-g-2 (which was preserved unchanged in sub-PR 55's Option (i) refresh). The two branches sit side-by-side as alternative resolutions of the same open question, with the muon-g-2 carrier's full landscape now expressible: one branch forces a BSM FC, the other dispatches to internal HVP methodology, and the empirical literature has converged to favor the second as of 2025.

**Where the field is permitted.** Anywhere `if_real_implies` is permitted (open-frontier and totality-approach carriers per v17 §5). The new kind value is permitted on any implication in any resolution; no per-carrier-type restrictions are introduced.

**Where the field is forbidden.** The `no_structural_consequence` kind is forbidden from co-occurring with other kinds in the same implications array — see §3.3 for the rationale. An implications array containing a `no_structural_consequence` entry must contain *only* that one entry.

---

## 3. Six shape decisions

### 3.1 Enum value — name and semantics

**Decision: the new enum value is `"no_structural_consequence"`. The v20 `kind` enum is the six-value set `{new_cell, new_axis, forced_edge, promotes_subtype, new_FC, no_structural_consequence}`.**

Options surveyed and rejected:

- **`"sm_consistent"`** — Rejected. Conflates the broader mechanism ("no new structure forced") with one specific physics case (SM-consistent reconciliation of a measurement-vs-SM tension). Other carriers — e.g., a cosmological-observations resolution that lands on "concordance ΛCDM is consistent with the data; no new cosmological-constant FC is forced" — are not SM-internal at all but exhibit the same encoding shape. The value name should describe the structural property (no consequence forced) rather than one physics instance of it.

- **`"dispatch_to_existing_FC"`** — Rejected as the *only* name; admitted as a candidate refinement deferred to a later schema bump. Captures the dispatch semantics ("the question dispatches to internal methodology of FC X") but requires a structured `target` field (the existing FC id) and assumes there is exactly one dispatch target. The muon-g-2 SM-consistent branch dispatches to *two* FCs (hadronic-states + chiral-perturbation-theory); a single-target field would force authoring discipline to pick one, which loses content. A multi-target variant would require a new array shape on the implication object, which is more invasive than a single enum addition. The single enum value `no_structural_consequence` with prose dispatch in `description` carries the full content with no schema change beyond the enum extension. If a future authoring friction surfaces a need to make the dispatch target structurally indexable (e.g., for an AI query "find every resolution that dispatches to hadronic-states"), a v21+ schema bump can add an optional `dispatches_to` array; that decision is deferred per §6.

- **`"no_new_structure"` / `"null_implication"` / `"forces_nothing"`** — Rejected. Each is a more terse synonym for `no_structural_consequence`. The longer name pays in clarity at every read site (the discriminator-encoding is read by both AI and physicist; "no_structural_consequence" is self-explanatory in either context). The brevity savings don't justify the loss of legibility.

- **Multi-value extension `{no_structural_consequence, dispatch_to_existing_FC, sm_consistent_resolution}`** — Rejected at this schema bump. Three new values for one observed authoring case is over-design; each additional value carries a target-shape decision and validator-rule decision that should be motivated by concrete authoring friction. v20 is the minimum extension that closes the sub-PR 55 gap; v21+ can refine if subsequent authoring surfaces friction.

The single-value extension `{no_structural_consequence}` is the minimum increment that closes the observed gap, preserves strict additivity, and admits future refinement via v21+ additive bumps if downstream authoring demands it.

### 3.2 Target shape

**Decision: `target` is null when `kind = no_structural_consequence`. The v20 validator enforces target-null on this kind via the same mechanism that enforces target-null on `new_FC` (Rule 24 sub-rule, see §3.4).**

Rationale: `no_structural_consequence` records the absence of a forced structural target — there is no FC id, no edge id, no cell id, no `{from, to, subtype}` triple to point at, because the resolution implies the substrate as it stands is correct. The dispatch information (which existing FC(s) the question internally refines, when applicable) lives in `description` rather than in a structured `target` field. This parallels exactly how `new_FC` records the *future* FC in prose (`description` names what the FC would organize) rather than in a structured field (because the FC doesn't exist yet to be referenced by id) — the structural-pointing-is-null shape is the same; the semantics is "no target needed."

An alternative — structuring the dispatch target as an FC id (Option B in §3.1's `dispatch_to_existing_FC` rejection) — would commit the schema to assuming exactly one dispatch target. The muon-g-2 case has two; future carriers may have zero (a resolution that lands on "the SM as a whole is correct; no specific FC needs internal methodology work") or more. Null target keeps the schema simple and offloads dispatch detail to physicist-readable prose where the cardinality and content can vary freely.

### 3.3 Per-implication permission rules and interaction with `minItems`

**Decision: `no_structural_consequence` may not co-occur with any other kind in the same `implications` array. An implications array containing a `no_structural_consequence` entry must contain exactly one entry. This is enforced by validator Rule 37 (§3.4).**

Rationale: the v17 implications array exists to enumerate *the set of* forced structural consequences. Mixing `no_structural_consequence` with, say, `new_cell` would be contradictory — "this resolution forces no new structure *and* forces this new cell." The two readings are incompatible. The only coherent shape is "the resolution branch implies no structure," recorded as a single `no_structural_consequence` entry standing alone in the implications array.

The v17 implications-array `minItems: 1` constraint is preserved unchanged: an `if_real_implies_entry` still has at least one implication. The mechanism for recording "this resolution implies no new structure" is a single-element implications array containing a single `no_structural_consequence` implication — not an empty implications array. The empty-array shape is *not* introduced by v20; it would conflate "no implications recorded yet" with "implications are deliberately absent because nothing is forced," which the existing `minItems: 1` constraint is correctly designed to prevent.

Co-occurrence of `no_structural_consequence` with other kinds in the same `if_real_implies_entry` (different resolution branches on the same carrier) is, of course, permitted — that is exactly the muon-g-2 case (one entry encoding the BSM-loop branch with `new_FC` + `forced_edge` implications; a separate entry encoding the SM-consistent branch with a `no_structural_consequence` implication). The constraint is intra-implications-array, not intra-carrier or intra-resolution-set.

### 3.4 Validator-side rule strategy — Rule 24 extension + new Rule 37

**Decision: two validator changes. (a) Extend Rule 24 with a `no_structural_consequence → target = null` sub-rule, parallel to the existing `new_FC → target = null` sub-rule. (b) Add Rule 37 (new, hard error) enforcing the §3.3 mutual-exclusivity constraint.**

The v17 → v18 → v19 cadence added 3 / 7 / 3 validator rules respectively; v20's increment of two rules (one extension + one new) is consistent with the narrow-bump pattern.

- **Rule 24 extension (`no_structural_consequence → target = null`).** The existing Rule 24 (v17) already has per-kind sub-rules:

  - `new_cell` or `new_axis` → target must be FC id (hard error if not).
  - `forced_edge` → target.from and target.to must be FC ids (hard error if not).
  - `promotes_subtype` → target must be edge id or cell id (hard error if not).
  - `new_FC` → target must be null (hard error if not).

  The v20 addition is one sub-rule: `no_structural_consequence` → target must be null (hard error if not). Same kind of check, same kind of error, same place in the validator. This is the minimum-invasive extension: it does not introduce a new top-level rule number for a small addition that fits the existing rule's structure.

- **Rule 37 (new, hard error) — `no_structural_consequence` implies sole occupancy of implications array.** Enforces the §3.3 mutual-exclusivity constraint. Implementation: walk every `if_real_implies_entry`; if any implication has `kind: no_structural_consequence` and the implications array length is > 1, emit error.

  This is a new top-level rule rather than a Rule 24 sub-rule because the check is intra-array (cardinality + cross-element kind comparison) rather than intra-implication (target-resolution). Rule 24 walks one implication at a time; Rule 37 walks one implications-array at a time. Keeping the levels distinct preserves the existing validator's per-rule clarity.

No other validator rules need updating. The existing v17 Rule 25 (derivation_citations cardinality), Rule 26 (forced_edge from/to distinctness), and the v18 / v19 quantitative_scale and bound_direction rules are independent of the implication-kind enum and require no change. The JSON Schema `enum` constraint on `kind` handles the closed-enum check at schema-validation time; no separate runtime rule is needed.

### 3.5 Retrofit-pass scope — empty for v20

**Decision: the v20 retrofit-pass is empty. No existing entries in `data/Map_v34_consolidated.json` v98 are modified by the v20 schema bump itself. Data version is bumped v98 → v99 by the retrofit-pass sub-PR (mechanical no-op + changelog entry); the v98 → v99 diff is the empty-set diff.**

Rationale: strict additivity is the design constraint (per the §0 disposition principle); every v19-conforming entry validates against v20 unchanged. No existing implication in the dataset uses the new kind (it didn't exist), so there is nothing to retrofit on existing entries. The v17 enum gap that motivated v20 was never authored as an entry in the first place — sub-PR 55 deferred it (Option (i)), and the gap remained latent in the carrier-refresh queue.

**Anticipated first use, deferred to a separate sub-PR.** The natural first use of the `no_structural_consequence` kind is a sub-PR 58-style muon-g-2 carrier-refresh-follow-up that authors the deferred SM-consistent branch as a new `if_real_implies_entry` (the Option (ii) that sub-PR 55 could not pursue). This is an *authoring* sub-PR, not a *retrofit* sub-PR — it adds new content using the v20 mechanism, anchored in literature that already supports the encoding (Aliberti 2025 + Aguillard 2025 + Boccaletti 2024). The §4 admissibility test applies as it would to any new if_real_implies authoring. Whether to open that sub-PR is a maintainer decision; opening it because the v20 mechanism now permits it would be back-influence in the §2 sense. The natural occasion is the next carrier-refresh sub-PR (against any post-publication-drift carrier where the new picture is best encoded with both a forcing branch and a no-consequence branch), at which point the v20 kind is available.

**Validator warning count after v20.** Zero new warnings expected. The Rule 35 warning (bound_direction-recommended-when-uncertainty-null) population is unchanged. No analogous "no_structural_consequence-recommended-when-resolution-is-SM-consistent" warning is introduced — the validator cannot determine from an entry's prose whether the resolution is "SM-consistent" without parsing; the choice belongs to the author per the §4 admissibility test, not to the validator.

### 3.6 MCP worker rebuild scope

**Decision: the v20 worker rebuild (downstream sub-PR after the schema + spec extension + validator ship) is a data-only refresh against canonical v99 data with skeleton edits at the same six version-and-banner sites that v98's §5.20 / v97's §5.19 / v96's §5.18 rebuilds touched. Server version bumps 3.2.6 → 3.2.7 per the patch-bump precedent. No new tool surface is required.**

Rationale: `find_signal_implications(carrier_id, resolution_id?)` already returns the full `if_real_implies` payload per the Phase B tool surface (sub-PR 29, v19 consolidated rebuild). The v20 addition appears in the `implications[].kind` field of the returned payload as just another enum value; existing client code reads the discriminator without knowing the precise enum membership. No new tool — e.g., `find_no_consequence_resolutions(...)` — is required for the AI-first goal. If post-v20 authoring accumulates enough `no_structural_consequence` instances that a dedicated query becomes natural, a v21+ tool addition can be considered; the data refresh suffices for v20.

The §3.5 empty-retrofit decision means the worker's data payload changes minimally — the only delta from v98 → v99 is the changelog entry recording the v20 schema bump and the absence of any field-value changes elsewhere. The worker's bundled data file size shifts only by the changelog entry's ~1 KB. Skeleton edits at the same six sites the v96/v97/v98 rebuilds touched: header banner, VERSION HISTORY entry for 3.2.7, `tool_server_info()` version + data_version, `server_info` tool description, `SERVER_INFO_OBJ.version`, BANNER string. The `schema_version` field reports `v20`.

**Verification step.** `server_info` against the redeployed worker reports `data_version: v99 / schema_version: v20 / version: 3.2.7 / tool_count: 33`. The cumulative counts shift only in the `if_real_implies_implications` direction by however many implications the anticipated sub-PR 58 (or successor) ships; if sub-PR 58 hasn't shipped yet, the implications count stays at 24. The presence of the new kind in the dataset is not required to verify the v20 deployment; the schema_version bump is the load-bearing change.

---

## 4. Relationship to existing v17 fields

`no_structural_consequence` is structurally orthogonal to every field on the implication object other than `kind` and `target`, and to every field on the `if_real_implies_entry` and carrier surfaces other than the implications array. The §3.2 target-null and §3.3 sole-occupancy rules are the only enforced interactions.

**`kind`.** v20 extends the enum from five to six values. The discriminator semantics is unchanged for the original five values; the new value adds the "no consequence forced" reading. The closed-enum constraint is preserved (Rule 36's equivalent for the implication-kind enum, enforced at JSON-Schema time).

**`target`.** Null-permission widens from `{new_FC}` to `{new_FC, no_structural_consequence}`. Non-null requirements for the other four kinds are unchanged.

**`description`.** For `no_structural_consequence` implications, the description carries the prose record of (a) what the resolution branch's positive realization looks like in physicist terms ("residual deviation is statistical scatter at post-2025 precision"), and (b) which existing FC(s) the persistent open question internally dispatches to, when applicable. The description is required (per v17) and is the only structural pointer to the dispatch landscape; the §3.2 decision to keep `target` null relies on this prose surface carrying the content.

**`derivation_citations`.** Required (minItems: 1 per v17). For `no_structural_consequence` implications, the citations anchor the SM-consistent reading — papers or analyses documenting that the resolution branch does not require new structure. For the muon-g-2 case, Aliberti 2025 §2 (the WP25 scope statement explaining the omission of dispersive HVP) and Boccaletti 2024 (the lattice-HVP precision floor) carry this. The §4 admissibility test applies: both citation halves required (antecedent + consequent), each program-internal, with source-value-embedded prose.

**The `if_real_implies_entry`'s other fields (`resolution`, `condition`, `condition_citations`).** Unchanged. A `no_structural_consequence`-bearing entry has the same outer-shape as any other if_real_implies_entry: a named resolution discriminator, an antecedent condition, antecedent citations. The new kind only changes what the implications array can express.

**The carrier surface (open-frontier and totality-approach nodes).** Unchanged. Carriers continue to host `if_real_implies` arrays whose entries may now include `no_structural_consequence` implications. No carrier-level field is added.

---

## 5. What the v20 spec extension will contain (sketch for downstream sub-PR)

The v20 spec extension document (`MAP_v20_schema_spec_extension.md`) will follow the v17/v18/v19 spec-extension shape:

- **§1 Why v20.** Compressed restatement of §1 of this scope memo (the enum gap as observed in sub-PR 55).
- **§2 The new `no_structural_consequence` kind — semantics and worked example.** The semantics from §2 of this memo plus a worked example using the deferred muon-g-2 SM-consistent branch authoring shape, as if it were already in the dataset (for spec-illustration; the actual authoring is downstream).
- **§3 JSON Schema definition.** The implication-kind enum extension; the target-null permission for the new kind; the implementation of Rule 24 sub-rule extension; the implementation of Rule 37 as a new top-level rule.
- **§4 The firewall admissibility test for `no_structural_consequence` implications.** Both halves required (antecedent condition citations + derivation citations for the no-consequence reading). The §2.5 self-check question applies as it would to any new implication kind.
- **§5 Validator rules.** Rule 24 extension (specified above); Rule 37 (new). With pseudo-Python sketches matching the existing validator's per-rule style.
- **§6 Migration and retrofit.** v98 → v99 is the empty-set diff; v19 → v20 is strictly additive. No existing entry needs editing.
- **§7 Tool-surface implications.** None. `find_signal_implications` returns the new kind in its payload as just another enum value.
- **§8 Anticipated first use.** Sub-PR 58-style carrier-refresh-follow-up on muon-g-2 (or successor) authoring the SM-consistent branch using the new kind. Open as a separate sub-PR per the §3.5 decision.

Expected spec-extension length: ~250–350 lines, matching v19's 350-line precedent.

---

## 6. What this memo does not settle

**The cross-FC pattern layer Route 2 enablement.** `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md` §5.4 names Route 2 (virtual-FCs indexing cells across other FCs) as the recommended first-authoring-sub-PR architecture for the cross-FC pattern layer's Mode D first instance, and §10.1 condition 2 names "Schema v20 authored and CI-validated" as the binding blocker for that sub-PR. One plausible reading of condition 2 is that v20 *should* author the Route 2 schema enablement (cells whose `content` field can be a structured cross-reference to cells in other FCs; an FC-level flag indicating "virtual"; the `candidate_origin` field per the v5 addition).

This memo deliberately does not include Route 2 in v20's scope. The §7 decision-fork records the alternatives and the rationale. The maintainer can elect to bundle Route 2 into v20 by amending this memo or by opening a successor scope-memo sub-PR; absent that decision, v20 ships the enum gap fix alone, and the cross-FC condition 2 trigger advances mechanically (schema v20 exists) without substantively enabling Route 2 (which would require a v21+ schema bump).

**Additional implication kinds.** §3.1 considered and rejected `dispatch_to_existing_FC` as a refinement of `no_structural_consequence` (the structured-target variant). If subsequent authoring surfaces a need to make dispatch targets structurally indexable (an AI query like "find every resolution that dispatches to hadronic-states"), v21+ can add an optional `dispatches_to` array as an additive extension. The §3.1 rejection is "not in v20," not "never."

**`excluded_resolution` flag on carriers.** A separate mechanism — a flag at the carrier level marking a resolution branch as "structurally impossible" rather than "implies no new structure" — has been floated in passing. Not in v20. The semantics is distinct enough to warrant its own scope memo if motivated by authoring friction.

**Empty implications-array shape.** §3.3 explicitly preserves v17's `minItems: 1` constraint. The mechanism for encoding "no new structure forced" is a singleton implications array containing one `no_structural_consequence` entry, not an empty implications array. Whether the empty-array shape should ever be admitted is a separate methodology question deferred indefinitely.

**Retroactive authoring of the muon-g-2 SM-consistent branch.** §3.5's empty-retrofit decision keeps v20 strictly additive. The deferred SM-consistent-branch authoring (the Option (ii) that sub-PR 55 could not pursue) is a separate authoring sub-PR with its own firewall self-check. Whether to open it after v20 lands is a maintainer decision; the v20 schema bump itself authors nothing.

---

## 7. Decision-fork recorded — minimum-scope vs bundled-scope v20

This is the only decision-fork in this memo where the recommendation departs from a plausible alternative reading of an upstream document. It is recorded explicitly so the maintainer can override.

### The fork

**Option (a) — minimum-scope v20 (recommended).** v20 adds the `no_structural_consequence` implication kind only. The cross-FC pattern layer Route 2 enablement is deferred to a separate v21+ schema bump motivated by its own authoring trigger (the first Mode D virtual-FC sub-PR's authoring friction, when that sub-PR is opened by maintainer decision).

**Option (b) — bundled v20.** v20 adds the `no_structural_consequence` implication kind *and* the schema support for Route 2 virtual-FCs (a new FC subtype or flag; cell-content shape that supports structured cross-references to cells in other FCs; the `candidate_origin` field per cross-FC scope memo §5.3 v5 addition). The bundle satisfies cross-FC scope memo §10.1 condition 2 substantively (not just mechanically), unblocking the first Mode D sub-PR in one schema bump.

### The recommendation: Option (a)

Three reasons:

1. **The firewall-clean trigger is the enum gap, not the cross-FC blocker.** Per `META_v21_1_methodology_firewall.md` §2 self-check: the enum gap passes ("would I author this anyway on physics-content grounds alone? Yes — sub-PR 55 surfaced concrete authoring friction"). The Route 2 enablement does not pass cleanly on its own — opening it now would be motivated by "advancing the cross-FC condition 2 trigger," which is back-influence in the §2 sense. The cross-FC scope memo §10.1 explicitly says: *"The trigger watch surfaces 'condition 2 is the blocker,' not a recommendation that it should be advanced."*

2. **The v18 → v19 precedent is narrowly-motivated bumps.** v18 introduced quantitative_scale + resolves edges (Phase C enablement, motivated by Step 4.1 authoring); v19 added bound_direction (motivated by v18 retrofit friction surfaced in sub-PR 23). Each bump had a single primary motivation. Bundling two unrelated motivations into v20 — the enum gap (Phase B refinement) and Route 2 (cross-FC pattern layer first-instance enablement) — mixes design discussions that benefit from being held separately. The two have distinct firewall self-check answers, distinct retrofit shapes, distinct validator-rule scopes, and distinct downstream implications.

3. **Route 2 enablement is a substantial separate design conversation.** The cross-FC scope memo §5.2 says only "Author new FCs whose cells reference cells in other FCs, grouped by a cross-cutting property's value. Each virtual-FC is a substantial authoring decision under full §4 review." The schema design — what shape does a cross-reference take? Does it use the existing cell-ref convention or a new mechanism? Does the virtual-FC carry the cross-cutting property as a node-level field, or as an FC-subtype discriminator? — is at least as large as v18's. Compressing this into a v20 bundle would either underspecify it (defeating the bundle's purpose) or balloon v20's scope to where the enum-gap fix gets delayed by the larger conversation.

The recommendation is to ship v20 as the enum-gap fix and open a separate v21 scope memo if and when Route 2 enablement is opened (which itself requires a maintainer decision under the firewall — the cross-FC scope memo's trigger framing makes opening Route 2 a discretionary action even after condition 2 mechanically fires).

### What Option (b) would look like, if the maintainer overrides

If the maintainer elects Option (b), this scope memo would be revised to add:

- A §1.5 ("Why v20 also enables Route 2") establishing the secondary motivation.
- §3.7 through §3.N decisions on the Route 2 schema (FC subtype flag; cell cross-reference shape; `candidate_origin` field; per-virtual-FC firewall test admixture).
- §4 extension covering interaction with existing FC-level fields.
- §5 spec-extension sketch expansion (Route 2 spec content adds ~200–300 lines).
- §6 contraction (Route 2 moves out of the not-settled list).
- §7 cancellation (the fork is closed).

The bundled scope memo would be ~500–700 lines (vs. the ~340-line minimum-scope shape). The downstream v20 spec extension would correspondingly grow. The maintainer's call.

---

*End of PREDICTIVE_LAYER_v20_SCOPE_MEMO.md v1. Authored 2026-05-28. The minimum-scope recommendation in §7 is binding under the disposition principle in §0 unless and until a successor session amends this memo. The next sub-PR in the v20 stack is the spec extension (`MAP_v20_schema_spec_extension.md`), drafted against §3's six decisions and §5's sketch. Subsequent sub-PRs: schema JSON, validator extension (Rule 24 sub-rule + Rule 37), retrofit-pass (mechanical no-op at v98 → v99), worker rebuild at the §3.6 specification. Total expected v20 stack: 4–5 sub-PRs analogous to the v19 stack's sub-PRs 24–29.*
