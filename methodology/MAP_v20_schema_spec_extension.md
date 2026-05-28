# MAP v20 schema-spec extension — `no_structural_consequence` implication kind

**Document type:** Schema specification. Defines the v19 → v20 schema bump within the Predictive Layer's Phase B mechanism (`if_real_implies`). Companion file to `/schema/Map_v20_schema.json` (downstream deliverable, next sub-PR in the v20 stack) and `/scripts/validate.py` extensions (downstream deliverable, the sub-PR after that).

**Status:** v1. Authored 2026-05-28, downstream from `PREDICTIVE_LAYER_v20_SCOPE_MEMO.md` (Step 0 of the v20 stack, which settles the six shape decisions this spec implements). The v20 bump is strictly additive over v19 — every v19-conforming entry validates against v20 with the new enum value unused — and is the only structural change v20 contains.

**Parent docs:** `PROJECT_GOAL.md` (structural goal, §4 type discipline), `PROJECT_GOAL_PREDICTIVE_LAYER.md` (the layer this schema implements; §2 Move 1 / Mechanism #2 is the parent for `if_real_implies`), `META_v21_1_methodology_firewall.md` §2 (firewall on authoring decisions), `PREDICTIVE_LAYER_v20_SCOPE_MEMO.md` (settles the six shape decisions this spec implements), `MAP_v17_schema_spec_extension.md` §2–§5 (the original `if_real_implies` shape this spec extends — the v20 change is a one-value extension of v17's `kind` enum and a one-rule extension of v17's Rule 24), `MAP_v18_schema_spec_extension.md` and `MAP_v19_schema_spec_extension.md` (the two intervening Phase C bumps; v18 added `quantitative_scale` and `resolves` edges, v19 added `bound_direction`; the v20 extension's size and shape are between these — narrower than v18, similar in scale to v19).

---

## 0. What this document is

This spec defines the schema extension that closes the v17 `if_real_implies.implications[].kind` enum gap surfaced by sub-PR 55's muon-g-2 carrier refresh: the five v17 enum values (`new_cell`, `new_axis`, `forced_edge`, `promotes_subtype`, `new_FC`) all name a forced structural consequence, leaving no value to record resolution branches that imply no new structure. It covers exactly one new enum value — `no_structural_consequence` — together with the widening of `target`-null permission to include this new kind, the implementation of the v17 §3.2 conditional rule's extension under JSON Schema, the new Rule 37 enforcing sole-occupancy of the implications array, and the binding firewall self-check the new kind inherits from v17 §4.

It does **not** introduce any new node type, edge type, carrier surface, or relationship to other v15.3 / v16 / v17 / v18 / v19 mechanisms. The two carrier-node types that host `if_real_implies` (open-frontier and totality-approach) are inherited from v17 §2 unchanged. The `if_real_implies_entry` object shape (resolution / condition / condition_citations / implications) is inherited from v17 §2 unchanged. The remaining four properties of the `if_real_implies_implication` object (target / description / derivation_citations + the existing five `kind` values) are inherited from v17 §2 unchanged.

The bump exists because v17's enum, by naming only forced consequences, cannot record a resolution branch whose positive realization implies the substrate as it stands is correct — the SM-consistent / dispatch-to-internal-methodology family. Sub-PR 55 surfaced this concretely (the muon-g-2 post-2025 reconciliation lands on a no-new-structure-forced reading); the gap is general (any carrier-refresh whose post-data-update picture lands on an SM-consistent branch inherits it).

The spec is binding for the schema file (`/schema/Map_v20_schema.json`, next sub-PR), for the CI validator (`/scripts/validate.py`, the sub-PR after), and for any future Phase B authoring that uses the new enum value. The MCP worker (`/mcp/worker_skeleton.js`) gets rebuilt against this schema in the consolidated v20 deployment (the final sub-PR in the v20 stack), which is downstream of the schema and is not a precondition for it.

The §4 firewall admissibility test is the load-bearing part of this spec. Any future `if_real_implies_entry` whose implications include a `no_structural_consequence` value must pass §4's two-citation-halves requirement — the antecedent (`condition_citations`) anchoring the resolution branch in the subfield literature, and the consequent (`derivation_citations`) anchoring the published derivation or analysis documenting that the resolution implies no new structure forced.

---

## 1. Why v20

The v17 `if_real_implies` mechanism (per `MAP_v17_schema_spec_extension.md` §2) records forced structural consequences of a positive resolution of an open question. Each `if_real_implies_entry` carries (a) a `resolution` discriminator naming one specific way the question could land, (b) a `condition` describing the antecedent in physicist prose, (c) `condition_citations` anchoring the antecedent, and (d) one or more `implications`, each with a `kind` discriminator naming the consequence the resolution forces. The five-value `kind` enum captures every consequence the v17 design anticipated: a forced cell, a forced axis, a forced cross-classification edge, a forced status / subtype promotion, or a forced new formal classification.

What v17 doesn't anticipate: a resolution whose positive realization implies *no* structural consequence — the substrate as it is remains correct, and the persistent open question (if any) dispatches to internal methodology of an existing formal classification rather than forcing new structure.

Sub-PR 55 (data v92, 2026-05-25) is the first authoring case to encounter this gap concretely. The muon-g-2 totality-approach's post-2021-design-report empirical picture had been frozen at a 4.2σ measurement-vs-SM tension; the 2025 literature (Aliberti et al. 2025 WP25 update; Aguillard et al. 2025 final Run-1–6 measurement; Boccaletti et al. 2024 BMW hybrid lattice-HVP) reconciles the tension to ≈ 1σ via the lattice-HVP / dispersive-HVP methodology split. The SM-consistent reading — "residual deviation is statistical scatter at post-2025 precision; the persistent question is the SM-internal dispersive-vs-lattice HVP methodology refinement" — is a substantive resolution branch of the open question, and it cannot be encoded as a separate `if_real_implies_entry` because every v17 implication kind names a forced consequence. The sub-PR 55 author chose Option (i) — refresh citations and condition text on the existing BSM-loop resolution entry, leaving the SM-consistent branch unencoded — and recorded the gap as a schema observation deferred to a future v20 methodology pass.

The friction is general, not specific to muon-g-2. Future carrier-refresh sub-PRs that the project's roadmap anticipates — BBN parameter refreshes when CMB-S4 publishes; dark-matter freeze-out value refreshes when the canonical QCD-axion mass-coupling relation is updated by lattice-QCD progress; neutrino oscillation parameter refreshes when NuFIT or T2K publish global-fit updates — will encounter the same gap whenever the post-data-update picture lands on a "no new structure forced" reading rather than a "BSM-loop / new-FC-forcing" reading. Authoring those refreshes against v17 would force the same Option (i) workaround, which understates the carrier's full resolution landscape and progressively widens the encoding-vs-content gap.

The v20 bump closes this gap by adding one value to the v17 enum. The scope memo's §7 records the firewall-clean rationale: the trigger is the v92-surfaced authoring friction (concrete enum gap in an authored entry), not any pattern observation about cross-FC structure. The minimum-scope disposition is recorded as binding in the scope memo's §0 and §7 unless a successor session amends.

---

## 2. The `no_structural_consequence` kind — semantics and worked example

### 2.1 Semantics

A `no_structural_consequence` implication records a resolution branch whose positive realization implies that the substrate as it stands is correct: **no new cell is forced, no new axis is forced, no new cross-classification edge is forced, no new formal classification is forced, and no existing entity's status / subtype / constructive-status is promoted**. The persistent open question (if any) dispatches to internal methodology of one or more existing formal classifications; the dispatch is named in the implication's `description` prose, not in a structured target field.

The kind is **not** "the resolution is impossible." Resolutions are conditional structural claims; impossibility would be a different mechanism (an `excluded_resolution` flag on the carrier, which v20 does not author).

The kind is **not** "the resolution is unknown." Unknown is the implicit state when no `if_real_implies_entry` exists for a given resolution; v20 does not author an explicit-unknown mechanism.

The kind is **"the resolution branch *is* known, *and* it implies no new structure"** — a positive structural claim about the absence of forced consequences, anchored in cited literature per §4 below.

### 2.2 Worked example — the muon-g-2 SM-consistent branch

The following entry illustrates the canonical first instance of the new kind. It is the deferred sub-PR 55 Option (ii) authoring (preserved here for spec illustration; actual authoring is downstream per §8). The companion BSM-loop branch — preserved unchanged in sub-PR 55's refresh — would sit side-by-side as a separate entry in the same carrier's `if_real_implies` array.

```json
{
  "resolution": "sm-internal-hvp-methodology-question",
  "condition": "At post-2025 precision, the residual deviation between the WP25 lattice-HVP-consensus SM prediction and the Aguillard 2025 final Run-1–6 measurement is ≈1σ. The persistent open question is the SM-internal HVP methodology choice (dispersive vs lattice; CMD-3 vs earlier e⁺e⁻ data below 1 GeV); the empirical reconciliation does not require BSM contributions to a_μ.",
  "condition_citations": [
    "Aliberti et al. 2025 — TI WP25 update Phys. Rep. 1143:1 adopting lattice-HVP consensus; SM prediction a_μ^SM = 116 592 033(62) × 10⁻¹¹",
    "Aguillard et al. 2025 — Fermilab E989 final Run-1–6 PRL 135:101802, arXiv:2506.03069; measurement a_μ^exp = 116 592 070.5(14.6) × 10⁻¹¹",
    "Boccaletti et al. 2024 — BMW hybrid LO-HVP at 0.48% precision, arXiv:2407.10913"
  ],
  "implications": [
    {
      "kind": "no_structural_consequence",
      "target": null,
      "description": "The residual deviation is consistent with the SM at post-2025 precision; no new BSM formal classification organizing leptonic anomalous-magnetic-moment contributors is forced. The persistent open question dispatches to hadronic-states (HVP regime; dispersive vs lattice methodology) and chiral-perturbation-theory (lattice methodology for the e⁺e⁻ data discrepancy below 1 GeV); both are internal-methodology refinements within existing FCs, not new structural authoring.",
      "derivation_citations": [
        "Aliberti et al. 2025 — WP25 paper's §2 scope statement explaining the omission of the dispersive HVP branch from the consensus value, recording the dispatch to lattice-HVP methodology",
        "Boccaletti et al. 2024 — BMW hybrid result documenting the lattice-HVP precision floor"
      ]
    }
  ]
}
```

This entry is complementary to the existing BSM-loop branch on muon-g-2 (which sub-PR 55's Option (i) preserved unchanged). The two branches sit side-by-side as alternative resolutions of the same open question, with the muon-g-2 carrier's full landscape now expressible: one branch forces a BSM FC, the other dispatches to internal HVP methodology, and the empirical literature has converged to favor the second as of 2025.

---

## 3. JSON Schema definition

The v20 change is centralized in the `if_real_implies_implication` `$def` and in the conditional rule that constrains `target` when `kind` names a no-target-needed value. No other `$def` is touched; no carrier-surface `$def` change is required.

### 3.1 The `if_real_implies_implication` `$def` — extended `kind` enum

The v17 `$def` (per `MAP_v17_schema_spec_extension.md` §2) gains one value in the `kind` enum:

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
      "description": "v17 + v20. Target of the structural consequence. Shape depends on kind — see §3.2 / §3.3 / §3.4 conditional rules. Null when kind = new_FC OR kind = no_structural_consequence.",
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
    "description": { "type": "string" },
    "derivation_citations": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1
    }
  },
  "additionalProperties": false
}
```

The `target` `oneOf` shape is unchanged — `null` was already permitted under v17 for the `new_FC` case. The v20 extension widens the *semantic* set of kinds permitted to use null (from `{new_FC}` to `{new_FC, no_structural_consequence}`); the JSON Schema type-level union does not change.

### 3.2 Conditional rule: `target` must be null when `kind ∈ {new_FC, no_structural_consequence}`

The v17 §3.2 rule (which used `"kind": { "const": "new_FC" }`) is extended to enumerate both null-target kinds:

```json
{
  "_comment": "v17 §3.2 + v20 — new_FC and no_structural_consequence both imply null target",
  "if": {
    "properties": { "kind": { "enum": ["new_FC", "no_structural_consequence"] } },
    "required": ["kind"]
  },
  "then": {
    "properties": { "target": { "type": "null" } }
  }
}
```

This is the minimum-invasive extension: the existing `if`/`then` block is preserved at the same place in the `allOf` chain, with the inner discriminator widening from `const` to `enum`. v17 §3.3 (string-target kinds) and v17 §3.4 (structured-triple kind) are unchanged.

### 3.3 What JSON Schema cannot enforce

JSON Schema cannot express the §3.3 (this spec) sole-occupancy constraint — that an implications array containing a `no_structural_consequence` entry must contain exactly one entry — because the check is intra-array (cardinality + cross-element kind comparison) rather than intra-implication (target-resolution). The runtime validator carries that load via the new Rule 37 (§5 below). This parallels the v17 / v18 / v19 precedent of placing cross-record id-resolution and cross-field cardinality checks at the validator-side level rather than the JSON-Schema level.

### 3.4 No retired or renamed fields

v20 retires no v17 / v18 / v19 field and renames no v17 / v18 / v19 field. The bump is strictly additive in the enum (one new value), strictly additive in the validator-rule numbering (v19 ended at Rule 36; v20 adds Rule 37 and extends Rule 24), and strictly additive in `target`-null permission (one new kind admitted). Every v19-conforming entry validates against v20 unchanged.

---

## 4. Firewall admissibility test (binding)

The Phase B three-part admissibility test (reproduced from `MAP_v17_schema_spec_extension.md` §4, originally from `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` §3) is binding for any `if_real_implies_entry` whose implications include a `no_structural_consequence` value. The test is preserved in full; the new kind inherits it like any v17 kind.

> **Three-part test.** An `if_real_implies` entry is admissible only if all three hold:
>
> 1. **Antecedent is a literature position.** The if-real condition names a resolution already proposed in the subfield's published literature — a position a working specialist would recognize as having been taken, not one the cartographer infers from dataset structure. `condition_citations` names the publications where the position is stated.
>
> 2. **Consequent is structural-by-derivation, not by pattern.** The implied structural change follows from the antecedent by a *published* derivation, not by inference from cross-classification patterns. `derivation_citations` on each implication names the publications where the antecedent → consequent step is performed.
>
> 3. **Both halves cite.** The two citation arrays are both non-empty. The schema enforces `minItems: 1` on each. Inability to cite either half disqualifies the entry.

### 4.1 What "consequent" means for a `no_structural_consequence` implication

For the four v17 forcing kinds, the "consequent" is the named structural addition (the new cell, the new axis, the new edge, the new FC) or the named promotion (the cell or edge whose status the resolution promotes). The derivation_citations anchor the published step from antecedent to that structural addition.

For `no_structural_consequence`, the "consequent" is the literature-recorded claim *that no new structure is forced* by the resolution branch — an absence-claim about the consequences, not a presence-claim about a specific addition. The derivation_citations must anchor this absence-claim in the subfield literature. For the muon-g-2 SM-consistent branch (§2.2): Aliberti et al. 2025's §2 scope statement documents the WP25 adoption of the lattice-HVP consensus as the SM prediction without BSM contributions; Boccaletti et al. 2024 documents the lattice-HVP precision floor against which the no-new-structure reading is consistent. Both are program-internal calculations recording the SM-consistent landscape, not BSM-overreach derivations.

### 4.2 The §2.5 self-check restated for `no_structural_consequence`

> **§2.5 self-check restated.** Before adding a `no_structural_consequence` implication: *"Would I author this implication independent of any pattern observation in the existing dataset? Specifically, if I had only the subfield literature and not the v98 cross-classification graph in front of me, would the same antecedent → no-new-structure-forced step be defensible from the literature alone?"* A yes-but-the-pattern-also-says answer fails the check.

The risk pattern the self-check guards against is specific to `no_structural_consequence`: it would be easy to author a no-consequence implication whose actual basis is "I cannot find a cross-classification edge from this carrier to the rest of the map, so the resolution must imply no new structure." That is inference from dataset pattern, not from literature. The firewall-faithful authoring rejects it. Admissibility requires literature anchoring of the absence-claim per §4.1, not absence of dataset edges.

### 4.3 What the validator checks and does not check

The validator does not check citation *quality* — whether the cited papers establish the no-new-structure reading, whether the derivation they contain is correct, whether the consequent they argue for is sound physics. Those are physicist-review work. The validator checks only structural conformance: that the citation arrays are non-empty (the v17 `minItems: 1` constraint), that the target is null (§3.2 + Rule 24 sub-rule, §5 below), and that the sole-occupancy constraint holds (Rule 37, §5 below). The §4 test is enforced at three levels — schema, self-check, review — and none substitutes for the others.

---

## 5. Validator-side rules (extending `_validator_side_rules`)

v19 ended at Rule 36. v20 adds two changes: one extension of an existing rule (Rule 24's per-kind sub-rules gain a `no_structural_consequence` clause), and one new top-level rule (Rule 37, sole-occupancy). The v17 → v18 → v19 cadence added 3 / 7 / 3 validator rules respectively; v20's increment of one new rule + one sub-rule extension is consistent with the narrow-bump pattern.

### 5.1 Rule 24 sub-rule extension — `no_structural_consequence` → target = null

The existing Rule 24 implementation in `/scripts/validate.py` (per `MAP_v17_schema_spec_extension.md` §5) walks every implication and dispatches on `kind`, checking the target's shape and existence against the appropriate substrate (FC id set, edge id set, cell id set). v20 adds one branch to the dispatch:

```python
# Extension of check_rule_24_if_real_implies_target_resolution() in /scripts/validate.py
# Added branch, parallel to the existing new_FC branch at line ~482 of v19's validate.py.
elif kind == "no_structural_consequence":
    if target is not None:
        # JSON-Schema §3.2 also catches this (extended to enumerate both null-target
        # kinds); included here for defense-in-depth, matching the existing new_FC
        # defense-in-depth precedent.
        errors.append(
            f"Rule 24: {ctx} no_structural_consequence requires target=null; "
            f"got {target!r}."
        )
```

Failure: hard error. Error message text: `Rule 24: nodes[<carrier_id>].if_real_implies[<e_idx>].implications[<i_idx>] no_structural_consequence requires target=null; got <target>`.

### 5.2 Rule 37 (new, hard error) — sole-occupancy of implications array

Enforces the §3.3 sole-occupancy constraint that JSON Schema cannot express. The pseudo-Python sketch follows the existing `/scripts/validate.py` per-rule style (one function per rule, returning a list of error strings):

```python
def check_rule_37_no_structural_consequence_sole_occupancy(
    carriers_by_node: dict
) -> list[str]:
    """Rule 37. Within a single if_real_implies_entry's implications array, a
    no_structural_consequence implication may not co-occur with any other
    implication. The implications array containing a no_structural_consequence
    entry must contain exactly one entry. Failure: hard error.

    Rationale: the v17 implications array exists to enumerate the set of forced
    structural consequences. Mixing no_structural_consequence with any forcing
    kind is contradictory — 'this resolution forces no new structure AND
    forces this new cell' is incoherent. The only coherent shape is a singleton
    implications array containing one no_structural_consequence entry. See
    MAP_v20_schema_spec_extension.md §3.3.
    """
    errors = []
    for carrier_id, entries in carriers_by_node.items():
        for e_idx, entry in enumerate(entries):
            implications = entry.get("implications") or []
            has_nsc = any(
                impl.get("kind") == "no_structural_consequence"
                for impl in implications
            )
            if has_nsc and len(implications) > 1:
                ctx = f"nodes[{carrier_id}].if_real_implies[{e_idx}]"
                errors.append(
                    f"Rule 37: {ctx} contains a no_structural_consequence "
                    f"implication alongside {len(implications) - 1} other "
                    f"implication(s); no_structural_consequence requires "
                    f"sole occupancy of the implications array "
                    f"(MAP_v20_schema_spec_extension.md §3.3)."
                )
    return errors
```

Failure: hard error.

### 5.3 No other validator rules need updating

The v17 Rule 25 (resolution uniqueness within a carrier's `if_real_implies` array) and Rule 26 (forced_edge from/to distinctness) are independent of the new kind and require no change. The v18 / v19 `quantitative_scale` and `bound_direction` rules (Rules 27–36) are similarly independent. The `if_real_implies_implication`'s `quantitative_scale` composition (per v18 §2's schema delta and v19 §3.1's inherited extension) carries the new kind transparently — implications with `kind: no_structural_consequence` may optionally carry `quantitative_scale` with the same rules as any other implication, though the typical case will be that no_structural_consequence implications do not (the absence-claim is structural rather than quantitative).

### 5.4 Smoke tests (binding for the validator-extension sub-PR)

- **Positive smoke test 1 — v98 data against the v20 schema.** Expected output: `0 new schema errors, 0 Rule 24 errors on the no_structural_consequence branch (no such implications exist in v98), 0 Rule 37 errors (no such implications exist in v98)`. The post-bump v99 data — the empty-retrofit diff per §6 below — should validate identically.
- **Negative smoke test 1 — no_structural_consequence with non-null target.** Test fixture entry with `kind: "no_structural_consequence"`, `target: "some-fc-id"`, `description: "..."`, `derivation_citations: ["..."]`. Expected: Rule 24 fires (hard error). The JSON-Schema §3.2 rule also fires at schema-validation time; both should be reported.
- **Negative smoke test 2 — no_structural_consequence co-occurring with another kind.** Test fixture entry whose implications array contains both a `no_structural_consequence` entry and a `new_cell` entry. Expected: Rule 37 fires (hard error). JSON Schema does not fire because the constraint is intra-array.
- **No-op smoke test — singleton no_structural_consequence implications array.** Test fixture entry with one `no_structural_consequence` implication, `target: null`, citations populated. Expected: no Rule 24 error, no Rule 37 error. (Confirms the well-formed case validates clean.)

---

## 6. Migration and retrofit

### 6.1 Schema-level backward compatibility

The v20 bump is strictly additive over v19. Every v19-conforming entry validates against v20 unchanged: the v17 enum's five existing values remain valid; the v17 `target`-null permission for `new_FC` is preserved; the v18 / v19 mechanisms (`quantitative_scale`, `bound_direction`, `resolves` edges) are untouched. No existing implication in the dataset uses the new kind (it didn't exist before v20), so the closed-enum check passes for every existing implication.

### 6.2 Empty retrofit-pass

Per the scope memo's §3.5 decision, the v20 retrofit-pass is empty. No existing entry in `data/Map_v34_consolidated.json` v98 is modified by the v20 schema bump itself. Data version is bumped v98 → v99 by the retrofit-pass sub-PR as a mechanical no-op + changelog entry; the v98 → v99 diff is the empty-set diff. This matches the scope memo's strict-additivity disposition: the v17 enum gap was never authored as an entry (sub-PR 55 deferred it under Option (i)), so there is nothing to retrofit on existing entries.

### 6.3 Changelog entry structure

The v99 changelog entry records the closure of the v92 schema observation that motivated v20. The `schema_candidates_status_observations` field — first used in the v92 changelog to record the open enum gap (per the scope memo §1 quote of that field's text) — is updated to record that the gap has been closed by the v20 enum extension. The closure note names the v20 spec extension and the new enum value, and removes the v17 enum from the open-observations list while preserving the audit trail.

### 6.4 Anticipated first use, deferred to a separate sub-PR

The natural first use of `no_structural_consequence` is a sub-PR 58-style carrier-refresh-follow-up on muon-g-2, authoring the deferred SM-consistent branch (the §2.2 worked example, as actual content rather than spec illustration). This is an *authoring* sub-PR, not a *retrofit* sub-PR — it adds new content using the v20 mechanism, anchored in literature that already supports the encoding (Aliberti 2025 + Aguillard 2025 + Boccaletti 2024). The §4 admissibility test applies as it would to any new `if_real_implies` authoring. Whether to open that sub-PR is a maintainer decision under the firewall; opening it because the v20 mechanism now permits it would be back-influence in `META_v21_1_methodology_firewall.md` §2's sense and is not implicit in the v20 schema bump. See §8 below.

---

## 7. Tool-surface implications (downstream of this spec)

**None required.** `find_signal_implications(carrier_id, resolution_id?)` already returns the full `if_real_implies` payload per the Phase B tool surface (sub-PR 29's v19 consolidated rebuild). The v20 addition appears in the `implications[].kind` field of the returned payload as just another enum value; existing client code reads the discriminator field without knowing the precise enum membership.

If post-v20 authoring accumulates enough `no_structural_consequence` instances that a dedicated query becomes natural — e.g., "find every carrier whose resolution landscape includes an SM-consistent branch" or "list every dispatch target named in a no_structural_consequence implication" — a v21+ tool addition can be considered (`find_no_consequence_resolutions(...)` or similar). The data refresh suffices for v20; no new tool surface is part of the v20 stack.

The MCP worker rebuild that closes the v20 stack (the final sub-PR after schema JSON + validator extension + retrofit-pass) is data-only against canonical v99, with skeleton edits at the same six version-and-banner sites that prior data-refresh rebuilds touched. Server version bumps 3.2.6 → 3.2.7 per the patch-bump precedent. `server_info` against the redeployed worker reports `data_version: v99 / schema_version: v20 / version: 3.2.7 / tool_count: 33`. The cumulative counts shift only in the `if_real_implies_implications` direction by however many implications the anticipated sub-PR 58 (or successor) ships; if no such authoring sub-PR has shipped yet, the implications count stays at 24.

---

## 8. Anticipated first use

The natural first use of the v20 mechanism is a sub-PR 58-style carrier-refresh-follow-up on muon-g-2, authoring the SM-consistent branch entry sketched in §2.2 as actual dataset content. The entry would sit alongside the existing BSM-loop branch (preserved unchanged from sub-PR 55's Option (i) refresh), giving the muon-g-2 totality-approach a complete documented resolution landscape: one branch forces a new BSM FC and the cross-classification edges that organize leptonic anomalous-magnetic-moment contributors; the other branch implies no new structure and dispatches to internal HVP methodology within hadronic-states and chiral-perturbation-theory.

The §4 admissibility test applies as it would to any new `if_real_implies` authoring. The condition_citations (Aliberti 2025 + Aguillard 2025 + Boccaletti 2024) anchor the post-2025 empirical antecedent; the derivation_citations (Aliberti 2025 §2 + Boccaletti 2024) anchor the no-new-structure consequent. Both halves cite. The §2.5 self-check passes: the SM-consistent reading is defensible from the post-2025 subfield literature alone, independent of any v98 cross-classification pattern.

The natural occasion for the first-use sub-PR is the next carrier-refresh against a carrier whose post-publication picture is best encoded with both a forcing branch and a no-consequence branch. The §3.5 scope-memo decision keeps v20 strictly additive — the spec extension lands without authoring the worked example as content; opening the content-authoring sub-PR is a separate maintainer decision under the firewall.

Whether and when to open that sub-PR remains discretionary. Opening it *because* v20 now permits the encoding would be back-influence in `META_v21_1_methodology_firewall.md` §2's sense — the firewall-clean trigger for the content-authoring sub-PR is the same as for any `if_real_implies` authoring: published literature supports the entry's both citation halves, and the cartographer would author the entry independent of any pattern observation in the existing dataset. The 2025 muon-g-2 literature passes both tests cleanly; the §3.5 decision defers the timing to the maintainer.

---

*End of MAP_v20_schema_spec_extension.md, v1. Authored 2026-05-28 downstream from `PREDICTIVE_LAYER_v20_SCOPE_MEMO.md`. The next sub-PR in the v20 stack is the schema JSON commit at `schema/Map_v20_schema.json`, implementing the §3 conditional-rule extension and registering the new enum value; subsequent sub-PRs: validator-rule extension (Rule 24 sub-rule + Rule 37 per §5), retrofit-pass (v98 → v99 mechanical no-op per §6), worker rebuild against v99 with skeleton bumps to server version 3.2.7 per §7. Total expected v20 stack: 4 sub-PRs analogous to the v19 stack's sub-PRs 26–29.*
