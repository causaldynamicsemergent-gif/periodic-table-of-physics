# Cross-FC pattern layer — scope memo (v4)

**Date:** 2026-05-26
**Status:** Revised draft. Supersedes v3 of this document. Authors no cells, no edges, no FCs. Settles design choices for the cross-FC pattern layer.
**Scope:** Distinguishes between the boundaries science draws between fields (human constructions) and the patterns those boundaries are partially tracking (findings about the world's dynamics). Frames the project's substrate as an attempt to be faithful to the patterns rather than to the current boundaries. Names the cross-FC pattern layer as the reading apparatus that lets the substrate's content surface patterns that the boundaries may split apart or fail to recognize. Establishes the six currently-identified reading modes plus an explicit Mode unidentified category, with the taxonomy itself framed as provisional and expected to extend. Names specialist engagement on the layer's higher-stakes claims as expected, valuable, and collaborative. **v4 change:** §10 rewritten to use substrate-checkable trigger conditions for phase transitions, replacing v3's maintainer-judgment-based decisions deferred. Two one-time decisions remain for maintainer review at commit time; ongoing operations are trigger-gated.
**Position:** Successor to and supplement of `META_v21_1_methodology_firewall.md` (binding parent), `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` (closing predictive-layer scope), `PHYSICIST_FACING_VOCABULARY.md` (presentation-layer discipline), `PROJECT_NEXT_STEPS.md` (project-level operational queue). Companion to the forthcoming first-instance authoring sub-PR.

---

## 0. Read this first

The project rests on a distinction. The lines we draw between fields of study — biology and physics, particle physics and condensed matter, mathematical physics and applied mathematics — are human organizational decisions made for institutional and historical reasons. The patterns those boundaries are partially tracking are not. Patterns are features of the world's dynamics; the boundaries we draw around them to study them are tools of investigation. A substrate built to be faithful to patterns, rather than to current boundaries, will surface patterns that the boundaries split apart or fail to recognize. The cross-FC pattern layer is the reading apparatus that makes the substrate's content yield those patterns.

This distinction is what the document's spine rests on, and it has consequences. The taxonomy of reading modes, the architecture of schema extensions, the discharge mechanisms, the disposition toward specialist engagement, the trigger conditions for phase transitions — all follow from it. §1 develops it in detail. §3-§11 apply it.

---

## 1. The orienting claim

The philosophy-of-science debate about whether scientific knowledge is "really real" or "socially constructed" has sometimes treated those two options as the available choices. They are not. A third position incorporates both honestly: *the boundaries we draw between things are constructions; the patterns those boundaries are tracking are not.*

The vortex in a flowing stream is the canonical example. A vortex is made of the same water as its surroundings. There is no substance that is vortex distinct from water. And yet the vortex is a coherent dynamical object. It has angular momentum. It persists in time. It can be measured and predicted. It interacts with other things. Under the right conditions it can be recreated. When the conditions change and the vortex dissolves, it doesn't follow that the vortex was never there — it follows that the conditions that sustained it changed. The pattern is real *as a pattern*. The boundary an observer draws around the vortex to study it is a tool of investigation, not a feature of the pattern itself. Both can be true at once because they are operating at different levels.

The same shape applies to almost everything science studies. A living cell is a pattern in a chemical substrate; the cell/non-cell boundary is drawn by investigators. A galaxy is a pattern in a gravitational substrate; the galaxy's edge is defined by an arbitrary surface-brightness threshold. The Standard Model's three fermion generations are patterns in the gauge-theoretic substrate of quantum field theory; the "generation" concept is the investigator's name for a recurring structural feature. The 3D-Ising universality class is a pattern that appears across magnets, fluids, and percolation systems — different "fields" by conventional classification, the same pattern by what the dynamics actually do.

The project's three working propositions follow from this distinction.

**Proposition one: the patterns physics studies are real, in the pattern-not-substance sense the vortex illustrates.** When the substrate surfaces a structural feature that recurs across what the disciplinary boundaries treat as different domains, that feature is something about the world's dynamics, not about how physicists happened to organize their work. The commitment is to patterns; it doesn't require any commitment to particular boundaries.

**Proposition two: the substrate aims at fidelity to patterns rather than to current boundaries.** The 30 FCs in the project, the cells they organize, the cross-classification edges, the predictive-yield entries — each authoring decision was an attempt to organize physics in a way that tracks what physicists know about the underlying patterns. The substrate doesn't try to honor the institutional structure of the field any more than necessary.

**Proposition three: the reading apparatus surfaces patterns the substrate contains.** A query that asks the substrate "which cells share property X" returns whatever cells share X, regardless of which FC they live in or what discipline conventionally claims them. If the substrate is faithful to patterns, the queries surface features of the underlying dynamics. If the substrate has been corrupted by infidelity, the queries surface features of the methodology instead. The firewall's discipline is precisely what makes the reading apparatus trustworthy.

Three corollaries that matter for what follows.

**Corollary one: the FCs are provisional approximations.** Like any organization of knowledge, the FC structure is a current best attempt to track underlying patterns. It is not arbitrary — it tries to be faithful — but it is also not final. If the substrate's content reveals that a pattern cuts across two FCs in a way the current boundary obscures, the FCs are partial approximations to what's actually there. The cross-FC pattern layer's deepest mode (Mode F, natural-kind reorganization) is the apparatus for surfacing exactly that kind of finding.

**Corollary two: the disciplinary boundaries themselves are also provisional approximations.** This is the same observation applied at the field level rather than the FC level. The biology/physics boundary, the particle/condensed-matter boundary, the chemistry/biochemistry boundary are constructed approximations to underlying patterns, just as the FC organization is. Where a pattern crosses a disciplinary boundary, the substrate surfaces it without apologizing for the violation.

**Corollary three: deep unification is a specific empirical question the substrate is structured to make askable.** If the underlying patterns share principles that operate across what the disciplinary boundaries treat as different fields — information dynamics, computational structure, geometric organization, anomaly classification, or something not yet named — the substrate's cross-FC pattern layer is built to surface evidence of those shared principles. The project does not commit to any particular unification hypothesis. It commits to building the substrate carefully enough that, if such principles are there to be found, the reading apparatus can find them.

---

## 2. Purpose

This layer surfaces patterns that satisfy the following conditions simultaneously:

- The pattern spans more than one FC, or more than one cell, or both, or sits structurally above individual cells.
- The pattern's visibility requires aggregation across the dataset, not just inspection of a single FC's grid.
- The pattern carries either explanatory content (recurrence of a known structure across multiple domains), predictive content (a slot that the substrate's content implies should be filled and isn't), or reorganizational content (the substrate's content implies an organization that tracks specific patterns more faithfully than the current one).

For the explanatory case, the payoff is cross-specialist visibility — patterns visible across multiple FCs at once that no specialist working in any one FC could fully see.

For the predictive case, the payoff is the Mendeleev analog — predictions of structures the underlying patterns force but that have not yet been realized or identified.

For the reorganizational case, the payoff is the DNA-sequencing analog — claims that an alternative organization of the substrate would track specific patterns more faithfully than the current organization does.

This memo settles how the layer is structured, how it interacts with the firewall, and what the first authoring sub-PR must establish as precedent. **Phase transitions are gated by substrate-checkable triggers (§10), not by maintainer judgment.**

---

## 3. The reading-instrument taxonomy (provisional)

The following six modes are currently identified. The taxonomy is not exhaustive. New modes get added as new reading instruments become useful. Patterns flagged as "Mode unidentified" are surfaced honestly and recorded for later taxonomy extension. The methodology must not let the taxonomy of modes constrain what patterns get looked for or surfaced.

### 3.1 Mode A — single-cell conjectured-by-pattern

A single cell whose `constructive_status` is set to `conjectured-by-pattern` because the FC's classification structure implies the cell's existence but no realization is known.

Schema support: the `constructive_status` field already supports this value. The `forced_by` mechanism that hangs forbidden-by-pattern cells off forcing edges also hangs conjectured-by-pattern cells off the same edges.

Example shape (not authored): `cell-AIII-d3` in tenfold-way, where the Schnyder-Kitaev classification implies a 3D class-AIII topological insulator with ℤ winding number, and Yang et al. 2020 documents that no condensed-matter realization is yet confirmed.

### 3.2 Mode B — paired conjecture across two FCs

A pair of cells in two FCs, connected by a cross-classification edge, both with `constructive_status: conjectured-by-pattern`. The conjecture is that both cells should exist, related by the edge's subtype.

Schema support: existing cross-classification edges already carry `cell_refs`. A paired conjecture is a cross-classification edge whose `cell_refs` point at conjectured-by-pattern cells in both FCs.

### 3.3 Mode C — regional conjecture within one FC

A set of cells within one FC sharing a missing-realization status. The conjecture is regional rather than pointwise.

Schema support: the `predictive_yield` array on FCs can carry an entry whose `cell_ref` names a cell set.

### 3.4 Mode D — cross-FC virtual-axis conjecture

A cross-cutting property takes values across cells in multiple FCs. The values form a virtual axis no single FC owns. Cells from different FCs sharing virtual-axis values are variations of one underlying pattern.

Schema support: not yet authored. §5 proposes the hybrid Route-1 + Route-2 architecture.

Mode D's predictive content: if three cells across three FCs share a virtual-axis value, the axis implies a fourth cell with the same value should exist in a fourth FC. That fourth cell is the Mendeleev-eka-silicon analog at the cross-FC level.

### 3.5 Mode E — structure-of-FCs patterns

The 30 FCs form a structured set with properties — closure level, axis count and type, sector, candidate-targeting pattern, edge-density. The structure-of-FCs layer surfaces patterns at this level.

Three distinguishable kinds of output: missing-FC predictions (three sub-kinds by epistemic significance: coverage / specialist-recognition / pattern-fidelity), missing-axis predictions on existing FCs, missing-relationship predictions.

Mode E's load-bearing requirement: the FC-property the pattern reads off must be *literature-attested* across the involved specialist domains.

### 3.6 Mode F — natural-kind reorganization

The substrate's content reveals that the current FC organization, while a serious attempt at fidelity, is a partial approximation to underlying patterns in specific ways. The output is a reorganization claim — that the substrate's content implies an alternative organization more faithful to specific patterns.

The DNA-sequencing parallel makes the shape concrete. Morphological taxonomy classified whales with fish because the visible signal was a partial approximation to evolutionary relationships. Molecular sequencing tracks those relationships more directly. The reorganization wasn't "morphology was wrong"; it was "this construction tracks the relevant pattern more faithfully than that construction does."

Mode F outputs: natural-kind partitions across FCs, reorganization candidates, possible-unification surfacings.

Mode F's load-bearing requirement is the strictest: the natural-kind claim must be falsifiable, the partition must be coherent (cells share more than just the property value), the discharge mechanism must be specified at the community level.

### 3.7 Mode unidentified

When the substrate surfaces a pattern that doesn't fit any of the modes above, flag it as Mode unidentified, record what about it doesn't fit, let the taxonomy extend later through normal methodology revision.

---

## 4. The firewall applied to this layer

### 4.1 The firewall binds authoring, not reading

The firewall constrains *writing* — adding content to the substrate. It does not constrain *reading* — querying the substrate's content. The methodology can extend its reading apparatus freely. What it cannot do is let the reading apparatus influence what gets written.

### 4.2 Common failure modes across all modes

**Failure mode α — pattern-probe-driven authoring.** A probe surfaces a candidate; the authoring decision is "fill the slot because the probe pointed at it." Inverts the firewall.

**Failure mode β — methodology-induced authoring.** "The memo says X-style patterns are important, so I'll author one."

**Failure mode γ — overproduction.** Pressure toward authoring many entries because the layer's distinctive value scales with their number.

**Failure mode δ — taxonomy-driven blindness.** The taxonomy of modes prevents authoring sessions from surfacing patterns that don't fit existing categories. Mitigated by Mode unidentified (§3.7).

### 4.3 Mode-specific firewall tests

**Mode A:** literature reference documenting the slot's realization is open?

**Mode B:** connecting edge already authored or being authored on physics-content grounds independent of the conjecture?

**Mode C:** regional characterization literature-recognized?

**Mode D:** (a) cross-cutting property load-bearing across involved FCs' literatures? (b) virtual axis authorable on physics-content grounds even if no cross-FC pattern were expected?

**Mode E:** (a) FC-property literature-attested? (b) which of three sub-kinds of missing-FC is claimed? (c) discharge mechanism specifies external evidence?

**Mode F:** (a) cross-cutting property load-bearing in literature of every spanned FC? (b) natural-kind claim coherent? (c) claim falsifiable? (d) discharge mechanism specified at community level?

---

## 5. Schema architecture

### 5.1 Route 1 — cell-level cross-cutting tag values

Extend `cross_cutting_concepts` from FC-level to cell-level and let it carry values. Cells carry entries like:

```json
"cross_cutting_values": [
  {"property": "anomaly-content", "value": "Z2-chiral-with-sublattice", "citations": [...]}
]
```

Cost: moderate schema bump. Firewall risk: tag-proliferation, mitigated by small property registry.

### 5.2 Route 2 — virtual-FCs indexing cells across other FCs

Author new FCs whose cells reference cells in other FCs, grouped by a cross-cutting property's value.

Cost: heavier; each virtual-FC is a substantial authoring decision. Firewall properties: more firewall-faithful than Route 1.

### 5.3 Route 3 — natural-kind partition structures (Mode F support)

A new schema object type `natural_kind_partition` carrying the cross-cutting property and value, the participating cells from all involved FCs, the load-bearing claim, the falsification criteria, the discharge mechanism, the citations.

Cost: substantial schema bump. Firewall properties: the strictest — the schema makes Mode F's structure visible enough that the firewall self-check has explicit fields.

### 5.4 The hybrid architecture

Recommended phasing:

- **First authoring sub-PR:** Route 2 only, for the first cross-FC virtual-FC (Mode D first instance). Schema bump scope is minimal.
- **Second authoring sub-PR or later:** Route 1 enabled if and when needed.
- **Mode F authoring round (years out):** Route 3 enabled when the first natural-kind partition is ready.

---

## 6. Discharge mechanisms

**Mode A → realized.** Material or theoretical realization confirms the slot.

**Mode A → forbidden-by-pattern.** Structural argument shows the slot cannot have a realization.

**Modes B, C** discharge the same way as Mode A applied to each cell.

**Mode D → realized.** The implied fourth cell is confirmed in the implied fourth FC.

**Mode D → forbidden-by-pattern.** The implied cell is shown to be structurally absent.

**Mode E → confirmed.** External evidence — specialist authoring an analogous classification, or experimental discoveries forcing authoring of cells that don't fit anywhere else — confirms the missing-FC.

**Mode E → rejected.** Time passes; no external evidence accumulates; specialists indicate the predicted organization is not load-bearing.

**Mode F → community adoption.** Specialists in multiple involved subfields engage substantively and adopt the partition. Slow, community-level discharge measured in years.

**Mode F → community revision.** Specialists provide load-bearing distinctions that show the partition needs adjustment but doesn't need to be withdrawn. Most productive outcome.

**Mode F → community rejection.** Specialists provide load-bearing distinctions showing the partition cannot be repaired.

**Mode F → in-progress / contested.** Expected to be the most common Mode F state.

Each discharge is a sub-PR with a changelog entry recording the empirical, theoretical, or community development that motivated the status change.

---

## 7. First authoring sub-PR — precedent considerations

### 7.1 Recommended first instance: an anomaly-content virtual-FC (Mode D)

Anomaly content is the cleanest Mode-D first instance:

- Load-bearing in the literature of at least four involved FCs (tenfold-way, generalized-symmetries, freed-hopkins-cobordism, sm-rep-content).
- Classified explicitly via cobordism / cohomology in well-developed literature.
- Passes the §4.3 Mode-D (a)-test cleanly.
- Passes the (b)-test cleanly.

Mode A (single-cell, e.g., AIII-d3) and Mode B (paired) are downstream. Mode C, Mode E, and Mode F are deferred to their respective trigger conditions per §10.

### 7.2 Precedent the first sub-PR sets

- Granularity of virtual-FC axes.
- Cell-content shape.
- Forced_by structure when the rule is more diffuse than a single edge.
- Whether Route 1 cross-cutting tag-values are populated alongside the Mode D first instance.
- Conjectured-by-pattern presence: recommendation is to start with all-realized cells.

### 7.3 What the first sub-PR does NOT decide

- Which cross-cutting properties beyond anomaly-content get virtual-FCs.
- Whether Route 1 is enabled.
- Whether Mode E or Mode F is exercised.
- The explorer's UI surfacing of virtual-FCs.

---

## 8. The expectation of specialist engagement

The higher-stakes modes of this layer (Mode E missing-FCs, Mode F natural-kind reorganization) make claims that cross specialist subfields. These claims will be engaged by specialists invested in the current organizational divisions. That engagement is expected, valuable, and constructive — *not* because the project is right and specialists must be defended against, but because the dialogue is about which constructions track which patterns more faithfully.

**Specialist views are themselves partial constructions.** A specialist working in any single subfield holds an approximation to the underlying patterns in their domain — refined through years of work, defensible against alternative organizations within the subfield. That approximation is real expertise but bounded. A Mode F natural-kind reorganization claim that crosses three subfields is, by construction, making a claim that no single specialist's expertise can fully evaluate.

**Engagement reveals which constructions track patterns better, not which side is right.** A vortex is a vortex regardless of how investigators draw their boundaries around it. When a specialist pushes back on a natural-kind partition, the substantive content of the pushback is almost always "this partition conflates cells whose underlying dynamics are not the same, here is the load-bearing distinction you missed." That is exactly the information the project needs.

**The substrate's discipline is what makes the engagement productive.** A claim from this project is not "an AI generated some patterns." It is: a substrate built under a firewall designed to prevent pattern-finding from driving authoring; queried by reading instruments that surface what's in the substrate; with citations to literature in every involved subfield; with explicit falsification criteria; with a discharge mechanism specified. The discipline is what gives the specialist something specific to engage with.

The project does not need to avoid producing claims that will face specialist engagement. Specialist disagreement is the mechanism by which the substrate becomes more faithful over time.

---

## 9. Position relative to existing methodology

**Relative to `META_v21_1_methodology_firewall.md`:** binding parent. The firewall constrains authoring. The cross-FC pattern layer reads from authored content. §4.1 resolves the recursive worry.

**Relative to `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` and prior phase scope memos:** successor in the authoring trajectory. Phases A/B/C authored the substrate. The cross-FC pattern layer is the reading apparatus the substrate enables.

**Relative to `PHYSICIST_FACING_VOCABULARY.md`:** this memo is maintainer-facing. When virtual-FCs, structure-of-FCs entries, or natural-kind partitions get surfaced to physicists, the vocabulary discipline applies.

**Relative to `TRACKS_AFTER_PHASE_A.md` and `TRACK_4_USE_SIDE_ARTIFACTS.md`:** the cross-FC pattern layer's outputs become the strongest demonstration material for Track 4 outreach.

**Relative to `PROJECT_NEXT_STEPS.md`:** the project-level operational queue. The triggers in §10 below feed the queue's §4 (pending eligibility). When a trigger fires, the queue's §3 promotes the corresponding action to eligible.

**Relative to schema versions:** v4 anticipates a v19 → v20 schema bump for Route 2 (and later Route 1, then Route 3) per §5.4 phasing.

---

## 10. Phase transition triggers

The cross-FC pattern layer's modes are sequenced. Earlier modes establish substrate experience that later modes depend on. Phase transitions between modes are gated by *substrate-checkable conditions*, not by maintainer judgment. A fresh chat session can determine eligibility for each mode's first sub-PR by checking the conditions against the live system; the maintainer's role is reviewing the authoring once it happens, not gating whether it starts.

This is the v4 revision from v3's maintainer-judgment-deferred-decisions structure. Two one-time decisions remain (§10.5); everything else is trigger-gated.

### 10.1 Trigger for first Mode D authoring sub-PR

All of the following substrate conditions must be true:

1. **Phase C closed.** Step 4.4 complete (sub-PR 57 shipped, the final fcc resolves edges) AND Step 4.5 complete (quantitative_scale on the if_real_implies implications) AND the consolidated worker rebuild verified (`server_info` returns a `data_version` matching the canonical post-Step-4.5 version).

2. **Schema v20 authored and CI-validated.** A separate prerequisite sub-PR adds Route 2 (virtual-FC structural fields) to the schema, the validator extends to enforce v20, the validator passes against the current substrate with zero errors. v20's scope is *Route 2 only*; Routes 1 and 3 are deferred to later schema bumps.

3. **Four involved FCs stable.** Each of tenfold-way, generalized-symmetries, freed-hopkins-cobordism, and sm-rep-content has `closure_status` of at least `partial` AND no in-flight authoring sub-PRs touching them in the prior 14 days. Stability is queryable from the `_meta.changelog` array.

4. **Validator clean.** `scripts/validate.py` against the current schema returns zero errors.

When all four conditions are simultaneously true, the first Mode D authoring sub-PR is eligible. `PROJECT_NEXT_STEPS.md` §4 promotes it to §3 (currently eligible). A fresh session can verify the conditions by running `server_info`, fetching the canonical `_meta` block, checking the validator's last CI run, and checking the changelog for the four FCs' last-touched timestamps.

### 10.2 Trigger for first Mode E authoring sub-PR

All of the following substrate conditions must be true:

1. **At least one Mode D virtual-FC authored.** Per §10.1's outcome.

2. **Mode D stability.** The first Mode D virtual-FC has been stable for at least 30 days (no in-flight revisions).

3. **At least one Mode D cell discharged through external evidence.** A cell in any Mode D virtual-FC has moved from realized to confirmed-realized through external evidence, OR had its content revised based on substrate evolution caused by an external development. This is the "the layer has been exercised and behaves as expected" condition.

4. **Track 4 review pathway operational.** Track 4 has received at least 1 substantive external engagement (issue, comment, or email response to outreach). This is the "specialist engagement pathway is alive" condition, which Mode E's discharge mechanism depends on.

5. **Substrate growth.** The substrate has grown by at least 10 FCs since this scope memo committed. This is the "the structure-of-FCs has enough data points to read patterns from" condition.

When all five are simultaneously true, the first Mode E authoring sub-PR is eligible.

### 10.3 Trigger for first Mode F authoring sub-PR

All of the following substrate conditions must be true:

1. **All Mode D triggers met.**

2. **At least three Mode D virtual-FCs authored and stable.** Each stable for at least 30 days, no in-flight revisions.

3. **At least one Mode E sub-PR shipped and discharged.** Either confirmed (external evidence accumulated and the predicted FC was authored or recognized in the literature) or rejected (external evidence failed to accumulate after the documented time horizon).

4. **Substrate maturity.** 50+ FCs and 1000+ cells in the canonical data file.

5. **Track 4 maturity.** Track 4 has received at least 3 substantive specialist engagements with Mode D claims, and at least 1 Mode D discharge has been driven by specialist input.

6. **A specific natural-kind partition candidate has emerged.** Mode F is constitutively responsive to substrate content — it doesn't happen on a schedule. The trigger isn't "Mode F is time to do," it's "the substrate has surfaced a specific natural-kind partition candidate that meets the §4.3 Mode-F four-part test." A session that surfaces a candidate flags it; the candidate accumulates literature support and falsification criteria; when those reach the level the test specifies, the Mode F sub-PR becomes eligible.

When all six are simultaneously true, the first Mode F authoring sub-PR is eligible. Realistic horizon: 2-5 years from this scope memo's commit.

### 10.4 Trigger for taxonomy revision

When patterns flagged as Mode unidentified (§3.7) recur with shared structural features:

1. **At least 3 Mode unidentified flags accumulated** in the `_meta.changelog` or in dedicated probe documents.

2. **The flagged patterns share at least one structural feature** that distinguishes them from Modes A-F.

When both are true, a methodology revision sub-PR to extend the taxonomy with a new Mode label (Mode G, Mode H, etc.) is eligible. The revision is a normal methodology authoring sub-PR.

### 10.5 One-time maintainer decisions at scope-memo-commit time

A small set of decisions really do need maintainer input. They are one-time, not ongoing, and they get resolved when this memo commits.

1. **Naming.** Cross-FC pattern layer, discovery layer, reading layer, Phase D? Recommendation: "cross-FC pattern layer" as the descriptive name, "the reading layer" as the conversational shorthand. Avoid "Phase D" because the layer doesn't belong to the predictive-layer phase structure.

2. **First Mode D content choice.** Anomaly content recommended in §7.1. If the maintainer prefers a different cross-cutting property (topology, conformality, K-theoretic class, or other) as the first virtual-FC, this is where that decision is made.

Both decisions are made when the memo commits. They don't recur.

### 10.6 The unification possibility

§1 corollary three names deep unification (information dynamics, computational structure, geometric organization, anomaly classification, or something not yet named) as a specific empirical question the substrate is structured to make askable.

The existing Mode F machinery handles a unification finding if one emerges. A natural-kind partition that pulls together cells from many FCs across what current disciplinary boundaries treat as separate fields, with the load-bearing claim that a single underlying principle is what unifies them, is exactly what Mode F is for. The schema's `natural_kind_partition` object (§5.3) carries the cross-cutting property and the participating cells; if the property turns out to be "information-dynamical role" or "computational complexity class" or anything else load-bearing, the schema doesn't care which specific property is named.

The methodology does not need additional machinery to handle a unification finding. If one emerges, the existing Mode F infrastructure carries it. If subsequent experience reveals the existing machinery is inadequate for unification findings specifically, methodology revision is normal sub-PR work.

The corollary's commitment is to making the question askable. The methodology doesn't predict the answer and doesn't need to prepare for any specific answer in advance.

---

## 11. How this document is maintained

Same discipline as the other methodology documents:

1. **The substrate and the live system are authoritative.** When the first Mode D authoring sub-PR ships, §7 updates to record what was actually authored.

2. **The taxonomy in §3 is provisional.** Mode unidentified (§3.7) is the primary safety valve. Methodology revisions to extend the taxonomy are triggered by §10.4 conditions.

3. **The §4 firewall tests sharpen with experience.** Each mode's tests will be revised after the first few sub-PRs in that mode accumulate experience.

4. **The §5 architecture may revise.** If the Route 1 + Route 2 + Route 3 phasing creates friction, the architecture revises.

5. **§7 first-sub-PR recommendations close out when the first sub-PR ships.** A successor handoff document (`CROSS_FC_PATTERN_LAYER_HANDOFF.md`) takes over for sub-PR-by-sub-PR guidance.

6. **§8 engagement expectations get exercised when Track 4 opens.**

7. **The §10 triggers may sharpen with experience.** If a trigger condition turns out to be too loose (eligibility fires before the substrate is actually ready) or too tight (eligibility never fires despite substrate readiness), the trigger is revised through methodology revision. The first 12 months of authoring under this memo is the empirical test of the trigger conditions.

8. **The §1 orientation is the document's spine.** If subsequent experience indicates the orienting claim itself needs revision, the methodology revision is foundational rather than incremental. Expect it not to happen, but don't preclude it.

---

*End of CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md v4, drafted 2026-05-26. Supersedes v3. Revises §10 to use substrate-checkable trigger conditions for phase transitions, replacing v3's maintainer-judgment-based decisions deferred. The system now runs on triggers: substrate conditions either meet the eligibility threshold or they don't, and a fresh session can determine eligibility without consulting maintainer judgment. Two one-time decisions remain for maintainer review at commit time (§10.5): naming and first Mode D content choice. The unification possibility (§10.6) is handled by the existing Mode F machinery; no additional preparation needed. Companion to `PROJECT_NEXT_STEPS.md`, which holds the project-level operational queue. Authors no cells, edges, FCs, or virtual-FCs.*
