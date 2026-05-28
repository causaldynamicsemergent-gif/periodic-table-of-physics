# Cross-FC pattern layer — scope memo (v5)

**Date:** 2026-05-26
**Status:** Revised draft. Supersedes v4 of this document. Authors no cells, no edges, no FCs. Settles design choices for the cross-FC pattern layer.
**Scope:** Distinguishes between the boundaries science draws between fields (human constructions) and the patterns those boundaries are partially tracking (findings about the world's dynamics). Frames the project's substrate as an attempt to be faithful to the patterns rather than to the current boundaries. Names the cross-FC pattern layer as the reading apparatus that lets the substrate's content surface patterns that the boundaries may split apart or fail to recognize. **v5 change:** Mode F (natural-kind reorganization) revised to make explicit that candidates may originate either from substrate-content analysis (substrate-internal) or from external work the substrate is positioned to test (substrate-external). The firewall self-check, discharge mechanism, and trigger conditions apply identically to both origins. Affects §3.6, §4.2 (new failure mode ε), §4.3 Mode F test, §5.3 (candidate-origin field on Route 3), §6 discharge mechanisms, and §10.3 condition 6.
**Position:** Successor to `META_v21_1_methodology_firewall.md` (binding parent), `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`, `PHYSICIST_FACING_VOCABULARY.md`, `PROJECT_NEXT_STEPS.md`.

---

## 0. Read this first

The project rests on a distinction. The lines we draw between fields of study are human organizational decisions made for institutional and historical reasons. The patterns those boundaries are partially tracking are not. Patterns are features of the world's dynamics; the boundaries we draw around them to study them are tools of investigation. A substrate built to be faithful to patterns will surface patterns that the boundaries split apart or fail to recognize. The cross-FC pattern layer is the reading apparatus that makes the substrate's content yield those patterns.

---

## 1. The orienting claim

The philosophy-of-science debate about whether scientific knowledge is "really real" or "socially constructed" has sometimes treated those two options as the available choices. They are not. A third position incorporates both honestly: *the boundaries we draw between things are constructions; the patterns those boundaries are tracking are not.*

The vortex in a flowing stream is the canonical example. A vortex is made of the same water as its surroundings. There is no substance that is vortex distinct from water. And yet the vortex is a coherent dynamical object. It has angular momentum, persists in time, can be measured and predicted, interacts with other things. The pattern is real *as a pattern*. The boundary an observer draws around the vortex to study it is a tool of investigation, not a feature of the pattern itself.

The same shape applies to almost everything science studies. The Standard Model's three fermion generations are patterns in the gauge-theoretic substrate of quantum field theory. The 3D-Ising universality class is a pattern that appears across magnets, fluids, and percolation systems — different "fields" by conventional classification, the same pattern by what the dynamics actually do.

The project's three working propositions:

**Proposition one:** the patterns physics studies are real, in the pattern-not-substance sense the vortex illustrates.

**Proposition two:** the substrate aims at fidelity to patterns rather than to current boundaries.

**Proposition three:** the reading apparatus surfaces patterns the substrate contains.

Three corollaries:

**Corollary one:** the FCs are provisional approximations. Mode F is the apparatus for surfacing the cases where they are partial.

**Corollary two:** the disciplinary boundaries themselves are also provisional approximations.

**Corollary three:** deep unification (information dynamics, computational structure, geometric organization, anomaly classification, or something not yet named) is a specific empirical question the substrate is structured to make askable. The project does not commit to any unification hypothesis. It commits to building the substrate carefully enough that, if such principles are there to be found, the reading apparatus can find them.

---

## 2. Purpose

The cross-FC pattern layer surfaces patterns that (i) span more than one FC or sit structurally above individual cells, (ii) require aggregation across the dataset to be visible, and (iii) carry explanatory, predictive, or reorganizational content.

Phase transitions are gated by substrate-checkable triggers (§10), not by maintainer judgment.

---

## 3. The reading-instrument taxonomy (provisional)

Six modes are currently identified. The taxonomy is not exhaustive. Patterns that don't fit get flagged as Mode unidentified and inform later taxonomy revision.

### 3.1 Mode A — single-cell conjectured-by-pattern

A single cell whose `constructive_status` is `conjectured-by-pattern` because the FC's classification structure implies the cell's existence but no realization is known.

### 3.2 Mode B — paired conjecture across two FCs

A pair of cells in two FCs, connected by a cross-classification edge, both with `constructive_status: conjectured-by-pattern`.

### 3.3 Mode C — regional conjecture within one FC

A set of cells within one FC sharing a missing-realization status, captured via a `predictive_yield` entry naming the cell set.

### 3.4 Mode D — cross-FC virtual-axis conjecture

A cross-cutting property takes values across cells in multiple FCs, forming a virtual axis no single FC owns. Cells from different FCs sharing virtual-axis values are variations of one underlying pattern. Predictive content: shared values across N-1 FCs imply a corresponding cell in an Nth FC.

### 3.5 Mode E — structure-of-FCs patterns

The 30 FCs form a structured set with properties (closure level, axis count, sector, candidate-targeting pattern, edge-density). Mode E surfaces patterns at this level. Three outputs: missing-FC predictions (coverage / specialist-recognition / pattern-fidelity sub-kinds), missing-axis predictions on existing FCs, missing-relationship predictions.

### 3.6 Mode F — natural-kind reorganization

The layer's most ambitious mode and the closest analog to what DNA sequencing did for biological taxonomy. The output is a reorganization claim — that an alternative organization tracks specific patterns more faithfully than the current FCs do.

Mode F is not "the existing FCs are wrong." Every organization is a construction; the question is which constructions track which patterns more faithfully.

The DNA-sequencing parallel: morphological taxonomy classified whales with fish because the visible signal was a partial approximation to evolutionary relationships. Molecular sequencing tracks those relationships more directly. Both organizations are constructions; molecular phylogenetics is more faithful to the specific pattern of evolutionary descent. The reorganization wasn't "morphology was wrong"; it was "this construction tracks the relevant pattern more faithfully."

**Origin of Mode F candidates — substrate-internal versus substrate-external.** *(v5 distinction.)* Mode F candidates can originate from two distinct directions, and the methodology treats both equally.

- *Substrate-internal Mode F.* The substrate's content surfaces a candidate natural-kind partition as a finding from cross-FC analysis. A query asks for cells sharing property X; the returned set crosses existing FC boundaries in a way that implies an alternative organization tracks X more faithfully. The candidate emerges from the substrate; the maintainer or contributor recognizes it as load-bearing and proposes it for authoring under the §4.3 four-part test.

- *Substrate-external Mode F.* External work — a research programme, a unification attempt, a theoretical framework, a specialist insight — brings a specific cross-FC reorganization claim to the substrate for testing. The candidate doesn't emerge from the substrate; it is offered from outside. The substrate's role is to provide the cross-domain context that lets the candidate be tested against the broader landscape of physics knowledge. The same §4.3 four-part test applies; the same discharge mechanism applies; the same firewall self-check applies.

Both origins are first-class. The substrate's value isn't only in surfacing patterns from its own content — it's also in providing the structural reference frame against which patterns proposed from anywhere can be examined.

Mode F outputs (origin-agnostic):

- *Natural-kind partitions across FCs.* Sets of cells from multiple FCs that should be considered together as a category, with the load-bearing claim that the category tracks an underlying pattern more faithfully than the current FC boundaries do.

- *Reorganization candidates.* Explicit claims that one or more existing FCs would track specific patterns better as an alternative organization.

- *Possible-unification surfacings.* A natural-kind partition that pulls together cells from many FCs across what current disciplinary boundaries treat as separate fields, with the claim that a single underlying principle (information dynamics, geometric structure, anomaly classification, or otherwise) unifies them. Mode F surfaces or tests evidence for such unifications.

Mode F's claim shape: not "this organization is right and that one is wrong," but *"this construction tracks this specific pattern more faithfully than that construction does, here is the cross-cutting property, here is the falsification criterion, here are the cells that participate, here are the citations."*

Mode F's load-bearing requirement is the strictest of any mode — see §4.3.

### 3.7 Mode unidentified

When the substrate surfaces a pattern that doesn't fit, flag it as Mode unidentified, record what about it doesn't fit, let the taxonomy extend through normal methodology revision.

---

## 4. The firewall applied to this layer

### 4.1 The firewall binds authoring, not reading

The firewall constrains writing — adding content to the substrate. It does not constrain reading. The methodology can extend its reading apparatus freely. What it cannot do is let the reading apparatus influence what gets written.

### 4.2 Common failure modes

**α — pattern-probe-driven authoring.** Authoring justified by "the probe pointed at it." Inverts the firewall.

**β — methodology-induced authoring.** "The memo says X-style patterns are important, so I'll author one."

**γ — overproduction.** Authoring many entries because the layer's value scales with count.

**δ — taxonomy-driven blindness.** The taxonomy preventing patterns that don't fit from being surfaced. Mitigated by Mode unidentified.

**ε — external-candidate accommodation.** *(v5 addition.)* For substrate-external Mode F candidates: pressure to relax the §4.3 four-part test because the candidate comes from work the maintainer is sympathetic to or interested in. The firewall applies identically regardless of candidate origin; an external candidate that fails the four-part test is rejected the same way a substrate-internal candidate that fails would be. Sympathy for the candidate's source is not a justification.

### 4.3 Mode-specific firewall tests

**Mode A:** literature reference documenting the slot's realization is open?

**Mode B:** connecting edge already authored or being authored on physics-content grounds independent of the conjecture?

**Mode C:** regional characterization literature-recognized?

**Mode D:** (a) property load-bearing across involved FCs' literatures? (b) virtual axis authorable on physics-content grounds even if no cross-FC pattern were expected?

**Mode E:** (a) FC-property literature-attested? (b) which of three sub-kinds of missing-FC is claimed? (c) discharge mechanism specifies external evidence?

**Mode F:** four-part test, **agnostic about candidate origin**.

(a) Is the cross-cutting property load-bearing in the literature of every FC the natural-kind partition spans?
(b) Is the natural-kind claim coherent — do the cells the partition pulls together share more than just the property value?
(c) Is the claim falsifiable — could a specialist provide a load-bearing distinction showing the partition is conflating distinct things?
(d) Is the discharge mechanism specified at the community level?

For substrate-internal candidates, the test verifies that the substrate-surfaced candidate is load-bearing rather than an artifact. For substrate-external candidates, the test verifies that the external claim has the structure needed for the substrate to test it. The four parts are identical; what they verify differs slightly by origin, but the bar is the same.

---

## 5. Schema architecture

### 5.1 Route 1 — cell-level cross-cutting tag values

Extend `cross_cutting_concepts` from FC-level to cell-level and let it carry values. Cells carry entries like:

```json
"cross_cutting_values": [
  {"property": "anomaly-content", "value": "Z2-chiral-with-sublattice", "citations": [...]}
]
```

### 5.2 Route 2 — virtual-FCs indexing cells across other FCs

Author new FCs whose cells reference cells in other FCs, grouped by a cross-cutting property's value. Each virtual-FC is a substantial authoring decision under full §4 review.

### 5.3 Route 3 — natural-kind partition structures (Mode F support)

A new schema object type `natural_kind_partition` carrying the cross-cutting property and value, the participating cells from all involved FCs, the load-bearing claim, the falsification criteria, the discharge mechanism, the citations, and *(v5 addition)* a `candidate_origin` field naming the work that proposed the partition (substrate-internal: the originating substrate query; substrate-external: the external work's citation).

The `candidate_origin` field makes the substrate-internal/substrate-external distinction visible in the schema without privileging either origin.

### 5.4 The hybrid architecture — recommended phasing

- **First authoring sub-PR:** Route 2 only, for the first cross-FC virtual-FC (Mode D first instance).
- **Second authoring sub-PR or later:** Route 1 enabled if and when needed.
- **Mode F authoring round (years out):** Route 3 enabled when the first natural-kind partition is ready, whether substrate-internal or substrate-external.

---

## 6. Discharge mechanisms

**Mode A → realized.** Material or theoretical realization confirms the slot.

**Mode A → forbidden-by-pattern.** Structural argument shows the slot cannot have a realization.

**Modes B, C** discharge the same way as Mode A applied to each cell.

**Mode D → realized.** The implied fourth cell is confirmed in the implied fourth FC.

**Mode D → forbidden-by-pattern.** The implied cell is shown to be structurally absent.

**Mode E → confirmed.** External evidence confirms the missing-FC.

**Mode E → rejected.** No external evidence accumulates within the documented time horizon.

**Mode F (origin-agnostic) → community adoption.** Specialists in multiple involved subfields engage substantively and adopt the partition. Years-scale discharge.

**Mode F → community revision.** Specialists provide load-bearing distinctions showing the partition needs adjustment but not withdrawal. Most productive outcome.

**Mode F → community rejection.** Specialists provide load-bearing distinctions showing the partition cannot be repaired.

**Mode F → in-progress / contested.** Expected to be the most common Mode F state.

*Substrate-external Mode F discharge timeline. (v5 addition.)* The discharge timeline for a substrate-external Mode F candidate starts when the substrate's first substantive engagement with the candidate happens, not when the candidate was authored externally. An external work that has been in the literature for years can become a substrate-external Mode F candidate at the moment it is authored as a `natural_kind_partition` entry; the discharge clock begins then. The substrate isn't claiming to evaluate decades of prior work in months; it's claiming to track community engagement with the candidate within the substrate's framework.

Each discharge is a sub-PR with a changelog entry citing the empirical, theoretical, or community development that motivated the status change.

---

## 7. First authoring sub-PR — precedent considerations

### 7.1 Recommended first instance: an anomaly-content virtual-FC (Mode D)

Anomaly content is the cleanest Mode-D first instance. Load-bearing in the literature of at least four involved FCs (tenfold-way, generalized-symmetries, freed-hopkins-cobordism, sm-rep-content). Passes the §4.3 Mode-D (a) and (b) tests cleanly.

### 7.2 Precedent the first sub-PR sets

- Granularity of virtual-FC axes.
- Cell-content shape.
- Forced_by structure when the rule is more diffuse than a single edge.
- Whether Route 1 cross-cutting tag-values are populated alongside.
- Conjectured-by-pattern presence: recommendation is to start with all-realized cells.

### 7.3 What the first sub-PR does NOT decide

- Which cross-cutting properties beyond anomaly-content get virtual-FCs.
- Whether Route 1 is enabled.
- Whether Mode E or Mode F is exercised.
- The explorer's UI surfacing of virtual-FCs.

---

## 8. The expectation of specialist engagement

The higher-stakes modes of this layer (Mode E missing-FCs, Mode F natural-kind reorganization, including substrate-external candidates) make claims that cross specialist subfields. These claims will be engaged by specialists invested in the current organizational divisions. That engagement is expected, valuable, and constructive — not because the project is right and specialists must be defended against, but because the dialogue is about which constructions track which patterns more faithfully.

**Specialist views are themselves partial constructions.** A specialist working in any single subfield holds an approximation refined through years of work but bounded.

**Engagement reveals which constructions track patterns better, not which side is right.** A vortex is a vortex regardless of how investigators draw their boundaries around it.

**The substrate's discipline is what makes the engagement productive.** A claim from this project is not "an AI generated some patterns." It is: substrate built under firewall, queried by reading instruments (or testing claims brought from outside the substrate), with citations to literature in every involved subfield, with explicit falsification criteria, with a discharge mechanism specified.

---

## 9. Position relative to existing methodology

**Relative to `META_v21_1_methodology_firewall.md`:** binding parent. Firewall constrains authoring; cross-FC pattern layer reads from authored content.

**Relative to phase scope memos:** successor in the authoring trajectory.

**Relative to `PHYSICIST_FACING_VOCABULARY.md`:** maintainer-facing memo; vocabulary discipline applies when virtual-FCs / natural-kind partitions get surfaced to physicists.

**Relative to `TRACKS_AFTER_PHASE_A.md` and `TRACK_4_USE_SIDE_ARTIFACTS.md`:** the cross-FC pattern layer's outputs become the strongest demonstration material for Track 4 outreach. Substrate-external Mode F candidates are a natural Track 4 connection point: external research programmes can be invited to propose their cross-FC reorganization claims for substrate testing.

**Relative to `PROJECT_NEXT_STEPS.md`:** the triggers in §10 feed the queue's §4 (pending eligibility).

**Relative to schema versions:** v5 anticipates a v19 → v20 schema bump for Route 2 per §5.4 phasing.

---

## 10. Phase transition triggers

### 10.1 Trigger for first Mode D authoring sub-PR

1. Phase C closed (Step 4.4 + Step 4.5 + worker rebuild verified).
2. Schema v20 authored and CI-validated.
3. Four involved FCs stable (closure_status ≥ partial, no in-flight sub-PRs in prior 14 days).
4. Validator clean.

### 10.2 Trigger for first Mode E authoring sub-PR

1. At least one Mode D virtual-FC authored.
2. Mode D stability ≥ 30 days.
3. At least one Mode D cell discharged through external evidence.
4. Track 4 review pathway operational (≥ 1 substantive external engagement).
5. Substrate has grown by ≥ 10 FCs since this scope memo committed.

### 10.3 Trigger for first Mode F authoring sub-PR

1. All Mode D triggers met.
2. At least three Mode D virtual-FCs authored and stable for ≥ 30 days each.
3. At least one Mode E sub-PR shipped and discharged.
4. Substrate maturity: 50+ FCs and 1000+ cells.
5. Track 4 maturity: ≥ 3 substantive specialist engagements with Mode D claims, ≥ 1 Mode D discharge driven by specialist input.
6. **A specific natural-kind partition candidate is ready for substrate-based testing.** *(v5 revision.)* The candidate may originate from substrate-content analysis (substrate-internal Mode F) or from external work — research programmes, unification attempts, theoretical frameworks, specialist insights — that make specific cross-FC reorganization claims the substrate is positioned to test (substrate-external Mode F). In either case, the candidate must meet the §4.3 Mode-F four-part test, and the substrate's role is to provide the cross-domain context that lets the candidate be examined against the broader landscape of physics knowledge. Mode F is constitutively *responsive* — to substrate content for internal candidates, to external work for external candidates — but in both cases the *trigger* is "a specific candidate exists, meets the test, and is ready for substrate-based examination."

When all six are simultaneously true, the first Mode F authoring sub-PR is eligible. Realistic horizon: 2-5 years.

### 10.4 Trigger for taxonomy revision

When patterns flagged as Mode unidentified recur:

1. At least 3 Mode unidentified flags accumulated.
2. The flagged patterns share at least one structural feature distinguishing them from Modes A-F.

### 10.5 One-time maintainer decisions

1. **Naming.** Cross-FC pattern layer (formal), reading layer (shorthand).
2. **First Mode D content choice.** Anomaly content.

Both resolved at commit time.

### 10.6 The unification possibility

§1 corollary three names deep unification as a specific empirical question the substrate is structured to make askable.

The existing Mode F machinery handles a unification finding regardless of origin. The substrate-internal/substrate-external distinction added in v5 makes this explicit: external work that proposes deep unification doesn't have to wait for the substrate to surface the same claim independently; the substrate is built to receive and test such claims directly.

The corollary's commitment is to making the question askable. The methodology doesn't predict the answer.

---

## 11. How this document is maintained

1. The substrate and live system are authoritative.
2. The taxonomy in §3 is provisional.
3. The §4 firewall tests sharpen with experience.
4. The §5 architecture may revise, including the candidate-origin field on `natural_kind_partition` objects (§5.3).
5. §7 first-sub-PR recommendations close out when the first sub-PR ships.
6. §8 engagement expectations get exercised when Track 4 opens.
7. The §10 triggers may sharpen with experience.
8. The §1 orientation is the document's spine.

---

*End of CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md v5, drafted 2026-05-26. Supersedes v4. Revises §3.6, §4.2 (new failure mode ε), §4.3 Mode F test, §5.3 candidate-origin field, §6 discharge timeline addition, and §10.3 condition 6 to make explicit that natural-kind reorganization candidates may originate from either substrate-content analysis (substrate-internal Mode F) or external work brought to the substrate for testing (substrate-external Mode F). The firewall self-check, discharge mechanism, and trigger conditions apply identically to both origins. Other sections unchanged from v4. The substrate is now structured to receive both substrate-surfaced cross-FC reorganization findings and external research programmes whose claims the substrate is positioned to test.*
