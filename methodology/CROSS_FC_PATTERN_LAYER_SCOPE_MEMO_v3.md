# Cross-FC pattern layer — scope memo (v3)

**Date:** 2026-05-26
**Status:** Revised draft. Supersedes the v2 draft of this document. Authors no cells, no edges, no FCs. Settles design choices for the cross-FC pattern layer.
**Scope:** Distinguishes between the boundaries science draws between fields (human constructions) and the patterns those boundaries are partially tracking (findings about the world's dynamics). Frames the project's substrate as an attempt to be faithful to the patterns rather than to the current boundaries. Names the cross-FC pattern layer as the reading apparatus that lets the substrate's content surface patterns that the boundaries may split apart or fail to recognize. Establishes the six currently-identified reading modes plus an explicit Mode unidentified category, with the taxonomy itself framed as provisional and expected to extend. Names specialist engagement on the layer's higher-stakes claims as expected, valuable, and collaborative — engagement reveals which constructions track which patterns more faithfully, not which side is right.
**Position:** Successor to and supplement of `META_v21_1_methodology_firewall.md` (binding parent), `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` (closing predictive-layer scope), `PHYSICIST_FACING_VOCABULARY.md` (presentation-layer discipline). Companion to the forthcoming first-instance authoring sub-PR. Replaces the v2 draft of this document.

---

## 0. Read this first

The project rests on a distinction. The lines we draw between fields of study — biology and physics, particle physics and condensed matter, mathematical physics and applied mathematics — are human organizational decisions made for institutional and historical reasons. The patterns those boundaries are partially tracking are not. Patterns are features of the world's dynamics; the boundaries we draw around them to study them are tools of investigation. A substrate built to be faithful to patterns, rather than to current boundaries, will surface patterns that the boundaries split apart or fail to recognize. The cross-FC pattern layer is the reading apparatus that makes the substrate's content yield those patterns.

This distinction is what the document's spine rests on, and it has consequences. The taxonomy of reading modes, the architecture of schema extensions, the discharge mechanisms, the disposition toward specialist engagement — all follow from it. §1 develops it in detail. §3-§11 apply it.

---

## 1. The orienting claim

The philosophy-of-science debate about whether scientific knowledge is "really real" or "socially constructed" has sometimes treated those two options as the available choices. They are not. A third position incorporates both honestly: *the boundaries we draw between things are constructions; the patterns those boundaries are tracking are not.*

The vortex in a flowing stream is the canonical example. A vortex is made of the same water as its surroundings. There is no substance that is vortex distinct from water. And yet the vortex is a coherent dynamical object. It has angular momentum. It persists in time. It can be measured and predicted. It interacts with other things. Under the right conditions it can be recreated. When the conditions change and the vortex dissolves, it doesn't follow that the vortex was never there — it follows that the conditions that sustained it changed. The pattern is real *as a pattern*. The boundary an observer draws around the vortex to study it is a tool of investigation, not a feature of the pattern itself. Both can be true at once because they are operating at different levels.

The same shape applies to almost everything science studies. A living cell is a pattern in a chemical substrate; the cell/non-cell boundary is drawn by investigators. A galaxy is a pattern in a gravitational substrate; the galaxy's edge is defined by an arbitrary surface-brightness threshold. The Standard Model's three fermion generations are patterns in the gauge-theoretic substrate of quantum field theory; the "generation" concept is the investigator's name for a recurring structural feature. The 3D-Ising universality class is a pattern that appears across magnets, fluids, and percolation systems — different "fields" by conventional classification, the same pattern by what the dynamics actually do.

The project's three working propositions follow from this distinction.

**Proposition one: the patterns physics studies are real, in the pattern-not-substance sense the vortex illustrates.** When the substrate surfaces a structural feature that recurs across what the disciplinary boundaries treat as different domains, that feature is something about the world's dynamics, not about how physicists happened to organize their work. The commitment is to patterns; it doesn't require any commitment to particular boundaries.

**Proposition two: the substrate aims at fidelity to patterns rather than to current boundaries.** The 30 FCs in the project, the cells they organize, the cross-classification edges, the predictive-yield entries — each authoring decision was an attempt to organize physics in a way that tracks what physicists know about the underlying patterns. The substrate doesn't try to honor the institutional structure of the field any more than necessary. Where the institutional structure happens to track the patterns well, fine. Where it doesn't, the substrate follows the patterns.

**Proposition three: the reading apparatus surfaces patterns the substrate contains.** A query that asks the substrate "which cells share property X" returns whatever cells share X, regardless of which FC they live in or what discipline conventionally claims them. If the substrate is faithful to patterns, the queries surface features of the underlying dynamics. If the substrate has been corrupted by infidelity, the queries surface features of the methodology instead. The firewall's discipline (`META_v21_1_methodology_firewall.md`) is precisely what makes the reading apparatus trustworthy.

Three corollaries that matter for what follows.

**Corollary one: the FCs are provisional approximations.** Like any organization of knowledge, the FC structure is a current best attempt to track underlying patterns. It is not arbitrary — it tries to be faithful — but it is also not final. If the substrate's content reveals that a pattern cuts across two FCs in a way the current boundary obscures, the FCs are partial approximations to what's actually there. The cross-FC pattern layer's deepest mode (Mode F, natural-kind reorganization) is the apparatus for surfacing exactly that kind of finding.

**Corollary two: the disciplinary boundaries themselves are also provisional approximations.** This is the same observation applied at the field level rather than the FC level. The biology/physics boundary, the particle/condensed-matter boundary, the chemistry/biochemistry boundary are constructed approximations to underlying patterns, just as the FC organization is. Where a pattern crosses a disciplinary boundary, the substrate surfaces it without apologizing for the violation. The substrate's job is fidelity to patterns; it is not custodian of the field's institutional structure.

**Corollary three: deep unification is a specific empirical question the substrate is structured to make askable.** If the underlying patterns share principles that operate across what the disciplinary boundaries treat as different fields — information dynamics, computational structure, geometric organization, anomaly classification, or something not yet named — the substrate's cross-FC pattern layer is built to surface evidence of those shared principles. The project does not commit to any particular unification hypothesis. It commits to building the substrate carefully enough that, if such principles are there to be found, the reading apparatus can find them. Whether the substrate yields evidence of deep unification, irreducible diversity, or something in between, is determined by what physics turns out to contain — not by what the methodology assumes.

---

## 2. Purpose

This layer surfaces patterns that satisfy the following conditions simultaneously:

- The pattern spans more than one FC, or more than one cell, or both, or sits structurally above individual cells.
- The pattern's visibility requires aggregation across the dataset, not just inspection of a single FC's grid.
- The pattern carries either explanatory content (recurrence of a known structure across multiple domains), predictive content (a slot that the substrate's content implies should be filled and isn't), or reorganizational content (the substrate's content implies an organization that tracks specific patterns more faithfully than the current one).

For the explanatory case, the payoff is cross-specialist visibility — patterns visible across multiple FCs at once that no specialist working in any one FC could fully see. The project already partly delivers this.

For the predictive case, the payoff is the Mendeleev analog — predictions of structures the underlying patterns force but that have not yet been realized or identified. This is the discovery-payoff layer.

For the reorganizational case, the payoff is the DNA-sequencing analog — claims that an alternative organization of the substrate would track specific patterns more faithfully than the current organization does. This is the layer's most ambitious mode.

This memo settles how the layer is structured, how it interacts with the firewall, and what the first authoring sub-PR must establish as precedent.

---

## 3. The reading-instrument taxonomy (provisional)

The following six modes are currently identified. The taxonomy is not exhaustive. New modes get added as new reading instruments become useful or as the substrate surfaces patterns that don't fit existing modes. Patterns flagged as "Mode unidentified" are surfaced honestly and recorded for later taxonomy extension. The methodology must not let the taxonomy of modes constrain what patterns get looked for or surfaced.

### 3.1 Mode A — single-cell conjectured-by-pattern

A single cell whose `constructive_status` is set to `conjectured-by-pattern` because the FC's classification structure implies the cell's existence but no realization is known.

Schema support: the `constructive_status` field already supports this value (since v15.3). The `forced_by` mechanism that hangs forbidden-by-pattern cells off forcing edges also hangs conjectured-by-pattern cells off the same edges.

Example shape (not authored): `cell-AIII-d3` in tenfold-way, where the Schnyder-Kitaev classification implies a 3D class-AIII topological insulator with ℤ winding number, and Yang et al. 2020 documents that no condensed-matter realization is yet confirmed.

Mode A is the cheapest entry point and the least distinctive. It captures gaps that any specialist in the relevant FC's subfield would also recognize. Its value is in establishing the conjectured-by-pattern precedent.

### 3.2 Mode B — paired conjecture across two FCs

A pair of cells in two FCs, connected by a cross-classification edge, both with `constructive_status: conjectured-by-pattern`. The conjecture is that both cells should exist, related by the edge's subtype — typically derives-from, bijection, or categorically-equivalent.

Schema support: existing cross-classification edges already carry `cell_refs`. A paired conjecture is a cross-classification edge whose `cell_refs` point at conjectured-by-pattern cells in both FCs.

Example shape (not authored): the AIII-d3 cell in tenfold-way and a matching cell in cft-bootstrap-exclusion-regions representing the implied 2D Dirac-fermion boundary CFT with chiral sublattice symmetry, jointly pinned by `edge-xc-tenfold-derives-bootstrap-aspired`.

Mode B is more constrained than Mode A because both ends of the relation are pinned; it is also more falsifiable.

### 3.3 Mode C — regional conjecture within one FC

A set of cells within one FC sharing a missing-realization status. The conjecture is regional rather than pointwise: the FC's structure implies a region of slots whose realizations are systematically absent.

Schema support: the `predictive_yield` array on FCs can carry an entry whose `cell_ref` names a cell set.

Example shape (not authored): tenfold-way cells AIII-d3, CI-d3, and CII-d3 share "3D-classified-but-unrealized-in-condensed-matter" status, in contrast to AII and DIII which have canonical realizations.

Mode C captures the *shape* of where realizations are missing within an FC. Closer in form to the silvery-alkali-metals column structure of Mendeleev's table than to isolated gap predictions.

### 3.4 Mode D — cross-FC virtual-axis conjecture

The first of the layer's high-distinctive-value modes. A cross-cutting property — anomaly content, K-theoretic class, dimensionality, conformality, gauge-symmetry-breaking pattern, propagation-speed class — takes values across cells in multiple FCs. The values form a virtual axis no single FC owns. Cells from different FCs sharing virtual-axis values are variations of one underlying pattern visible only from outside any single FC's view.

Schema support: not yet authored. §5 proposes the hybrid Route-1 + Route-2 architecture.

Example shape (not authored): an anomaly-content cross-FC virtual axis with values like "Ω₄^Spin = ℤ class," "ABJ anomaly polynomial of type X," "ℤ₂ chiral anomaly with sublattice symmetry." Cells from tenfold-way, generalized-symmetries, freed-hopkins-cobordism, and sm-rep-content all carry values on this virtual axis. Matching values pull cells from four FCs together as variations of one anomaly-content pattern.

Mode D's predictive content: if three cells across three FCs share a virtual-axis value, the axis implies a fourth cell with the same value should exist in a fourth FC. That fourth cell is the Mendeleev-eka-silicon analog at the cross-FC level. The prediction is *constitutively cross-FC* — no specialist working in any single FC would generate it because the prediction depends on the pattern's recurrence across FCs the specialist doesn't simultaneously hold in view.

### 3.5 Mode E — structure-of-FCs patterns

The 30 FCs in the project are not just a collection. They form a structured set. FCs have properties — closure level, axis count and type, sector, candidate-targeting pattern, edge-density to other FCs, distribution of constructive-status values across their cells. These properties take values across the FCs in patterned ways. The structure-of-FCs layer surfaces patterns at this level.

Three distinguishable kinds of structure-of-FCs output:

- *Missing-FC predictions.* The distribution of FCs by their properties may imply that an FC should exist where one currently doesn't. Three sub-kinds matter for the firewall and the discharge mechanism:
  - *Missing-of-authoring-coverage.* The relevant physics is well-known to specialists; the FC organizing it just hasn't been authored in the project yet. These are catalogue-completion sub-PRs, not structural predictions.
  - *Missing-of-specialist-recognition.* The physics exists; the organization is implicit in specialist practice; no review article or textbook has explicitly drawn it out. Authoring the FC first makes implicit structure explicit, but is not Mendeleev-style prediction.
  - *Missing-of-pattern-fidelity.* The structure-of-FCs implies an FC should exist; the relevant physics content exists somewhere in the field; no one has yet recognized the relevant phenomena as belonging to a coherent classification. This is the substantive prediction kind. It is the rarest and most valuable, and the most likely to be confused with one of the easier kinds. The §4.3 Mode-E firewall test sharpens specifically to keep these three distinguishable.

- *Missing-axis predictions on existing FCs.* The pattern of which axes exist across the FC collection may imply a specific FC should carry an axis it currently doesn't. The prediction is about that axis, not about a whole missing FC.

- *Missing-relationship predictions.* The pattern of cross-classification edges across the dataset may imply a specific pair of FCs should have a specific kind of edge between them. The prediction is about that edge.

Schema support: missing-FC predictions and missing-axis predictions don't have native schema support yet. Missing-relationship predictions are partly handled by the existing aspired-edge mechanism. The §5 architecture decision affects all three.

Mode E's load-bearing requirement: the FC-property that the pattern is being read off must be *literature-attested* across the involved specialist domains. Closure level, sector, and candidate-targeting pattern likely qualify (specialists in each subfield would recognize these as real distinctions). Axis-structure type and edge-density likely do not qualify (these are methodological features of the project, not literature-attested properties of physics). §4.3 sharpens this.

### 3.6 Mode F — natural-kind reorganization

The layer's most ambitious mode and the closest analog to what DNA sequencing did for biological taxonomy. The substrate's content reveals that the current FC organization, while a serious attempt at fidelity, is a partial approximation to underlying patterns in specific ways. The output is not a pattern within the existing organization — it is a *reorganization claim*, that the substrate's content implies an alternative organization more faithful to specific patterns than the current one.

Mode F is not "the existing FCs are wrong." Every organization is a construction; the question is which constructions track which patterns more faithfully. Mode F surfaces cases where the substrate's content implies an alternative construction that tracks a specific pattern better than the current FCs do.

The DNA-sequencing parallel makes the shape concrete. Morphological taxonomy classified whales with fish because the visible signal (lives in water, fish-shaped, swims) was a partial approximation to the underlying evolutionary relationships. Molecular sequencing tracks those relationships more directly. Both organizations are constructions; molecular phylogenetics is more faithful to the specific pattern of evolutionary descent. The results — birds as theropod dinosaurs, whales as land-tetrapod-descended mammals related to hippos, Archaea as a third domain distinct from bacteria — were not "morphology was wrong." They were reorganizations that tracked the relevant patterns better than morphological organization did.

For physics, the analog: the matter-types question. "Matter" is currently partitioned across the project's FCs along several axes — Standard Model matter, dark matter, anti-matter, topological-phase matter, quantum-information-theoretic "matter." Each partitioning is a partial approximation. The boundaries between them reflect historical accidents of how each subfield identified its objects, what tools were available, which communities did the work first. The substrate-content query "what carries energy-momentum that does not propagate at speed c," or "what supports stable localized excitations under symmetry protection," or "what carries cohomologically non-trivial degrees of freedom" might return a set of cells from multiple FCs that the current partitioning splits. The resulting partition would be a natural-kind claim: *these cells track a specific underlying pattern, the current FC boundaries split that pattern, and a reorganization following the pattern would be more faithful to it.*

Mode F outputs:

- *Natural-kind partitions across FCs.* Sets of cells from multiple FCs that should be considered together as a category, named by the cross-cutting property they share, with the load-bearing claim that the category tracks an underlying pattern more faithfully than the current FC boundaries do.

- *Reorganization candidates.* Explicit claims that one or more existing FCs would track specific patterns better as some alternative organization. Research-program-scale claims that would change how the field thinks about its own organizational fidelity if adopted.

- *Possible-unification surfacings.* The deepest version: a natural-kind partition that pulls together cells from many FCs across what current disciplinary boundaries treat as separate fields, with the load-bearing claim that a single underlying dynamical principle (information dynamics, geometric structure, anomaly classification, or something not yet named) is what unifies them. The project does not commit to any specific unification. Mode F is the apparatus that would surface evidence for one if the substrate contains it.

Mode F's claim shape: *not* "this organization is right and that one is wrong," but *"this construction tracks this specific pattern more faithfully than that construction does, here is the cross-cutting property, here is the falsification criterion, here are the cells that participate, here are the citations from each involved subfield."* The claim is calibrated to the pattern; it doesn't claim more than fidelity-to-pattern.

Mode F's load-bearing requirement is the strictest of any mode. The natural-kind claim must be falsifiable — a specialist must be able to argue "this partition is conflating cells whose underlying dynamics are not the same, here is the load-bearing distinction the partition ignores, here is the literature support." If the partition cannot be challenged this way, it isn't making a real claim. §4.3 sharpens this further.

Mode F is the slowest-moving mode. A single Mode F claim is a research-program-scale assertion. Realistic cadence is at most a few per year, with each one being a substantial deliverable.

### 3.7 Mode unidentified

When the substrate's content surfaces a pattern that doesn't fit any of the modes above, the right response is not to force-fit it into the closest existing mode. The right response is to flag it as Mode unidentified, record what about it doesn't fit, and let the taxonomy extend later through normal methodology revision.

The Mode unidentified category exists for two purposes:

1. *To prevent the taxonomy from closing.* If every pattern has to fit an existing mode, the taxonomy constrains what gets surfaced. Mode unidentified prevents this by giving novel patterns a home that doesn't require them to be one of the recognized kinds.

2. *To accumulate evidence for taxonomy revision.* Patterns flagged as Mode unidentified may recur. If three or four sub-PRs surface unidentified patterns sharing structural features, the methodology can extend to give them a proper label (Mode G, Mode H, etc.). Patterns that occur once and don't recur stay flagged as anomalies and inform later authoring without becoming recognized modes.

The bar for flagging a pattern as Mode unidentified is intentionally low. If an authoring session is uncertain whether a pattern fits Mode D or Mode E, the session may flag it as Mode unidentified rather than committing to one. The methodology revision process resolves the ambiguity later as more cases accumulate.

---

## 4. The firewall applied to this layer

### 4.1 The firewall binds authoring, not reading

The firewall (`META_v21_1_methodology_firewall.md`) constrains *writing* — adding content to the substrate. It does not constrain *reading* — querying the substrate's content. The methodology can extend its reading apparatus freely. What it cannot do is let the reading apparatus influence what gets written.

A pattern that the reading apparatus surfaces was present in the substrate's content before the reading apparatus existed. The reading apparatus made the pattern visible; it didn't put it there. If the substrate is faithful to patterns (which the firewall is what makes possible), then the patterns the reading apparatus surfaces are features of the patterns, not features of the methodology. New reading instruments can be added without violating the firewall, provided they read content the substrate already contains.

The taxonomy of modes in §3 is therefore not a methodological commitment about which patterns count. It is a current best guess at which reading instruments are most likely to produce useful surfacings from the substrate's content. The taxonomy extends as new instruments become useful; patterns that don't fit any current mode get flagged and surfaced honestly regardless.

### 4.2 Common failure modes across all modes

**Failure mode α — pattern-probe-driven authoring.** A probe surfaces a candidate slot or pattern; the authoring decision is "fill the slot because the probe pointed at it." This inverts the firewall.
*Test:* would the authoring decision have been made on physics-content grounds independent of the probe? The probe's job is to point at relevant literature to consult, not to justify authoring.

**Failure mode β — methodology-induced authoring.** This memo itself becomes the justification: "the memo says X-style patterns are important, so I'll author one."
*Test:* the authoring decision must be motivated by physics-content observation independent of this memo's existence.

**Failure mode γ — overproduction.** Pressure toward authoring many entries because the layer's distinctive value scales with their number.
*Test:* each new entry survives the §4.3 mode-specific tests on its own physics-content merits.

**Failure mode δ — taxonomy-driven blindness.** The taxonomy of modes prevents authoring sessions from surfacing patterns that don't fit existing categories.
*Test:* Mode unidentified is used whenever appropriate. Patterns get flagged honestly even when they don't fit; the methodology revises rather than the patterns being suppressed.

### 4.3 Mode-specific firewall tests

**Mode A (single-cell):** is there a specific literature reference documenting that the slot's realization is an open question?

**Mode B (paired):** is the connecting edge already authored, or being authored on physics-content grounds independent of the conjecture?

**Mode C (regional):** is the regional characterization literature-recognized, not constructed by the dataset?

**Mode D (cross-FC virtual axis):** two-part test. (a) Is the cross-cutting property load-bearing across the involved FCs in their specialist literatures? (b) Would the virtual axis be authorable on physics-content grounds even if no cross-FC pattern were expected to emerge from it?

**Mode E (structure-of-FCs):** three-part test. (a) Is the FC-property the pattern reads off literature-attested across multiple specialist domains, or just a methodological feature? (b) Which of the three kinds of missing-FC prediction (coverage / specialist-recognition / pattern-fidelity) is being claimed? (c) Is the discharge mechanism specified, with external evidence (specialist authoring, experimental discoveries) rather than self-fulfilling internal authoring?

**Mode F (natural-kind reorganization):** four-part test. (a) Is the cross-cutting property load-bearing in the literature of every FC the natural-kind partition spans? (b) Is the natural-kind claim coherent — do the cells the partition pulls together share more than just the property value? (c) Is the claim falsifiable — could a specialist provide a load-bearing additional distinction that would show the partition is conflating distinct things? (d) Is the discharge mechanism specified at the community level — is there a path to specialist adoption, revision, or rejection that the project can track?

---

## 5. Schema architecture

### 5.1 Route 1 — cell-level cross-cutting tag values

Extend `cross_cutting_concepts` from the FC level to the cell level and let it carry values:

```json
"cross_cutting_values": [
  {
    "property": "anomaly-content",
    "value": "Z2-chiral-with-sublattice",
    "citations": [...]
  }
]
```

Queries surface cross-FC patterns: `find_cells_by_cross_cutting_value(property, value)` returns every cell sharing the value across FCs.

Cost: moderate schema bump. Validator updates to enforce a small registry of allowable properties and value enums.

Firewall properties: tag-proliferation is the risk. Mitigated by keeping the property registry small and requiring each property to pass the §4.3 Mode-D (a)-test before its values are opened.

### 5.2 Route 2 — virtual-FCs indexing cells across other FCs

Author new FCs whose cells reference cells in other FCs, grouped by a cross-cutting property's value.

Cost: heavier. Each virtual-FC is a substantial authoring decision under full §4 review.

Firewall properties: each virtual-FC is an explicit physics-content authoring decision. Tag-proliferation is structurally prevented. More firewall-faithful than Route 1.

### 5.3 Route 3 — natural-kind partition structures (Mode F support)

Mode F's outputs don't fit Route 1 or Route 2 cleanly. A natural-kind partition is a reorganization claim, not a tag or a virtual-FC. The schema would need a new object type — call it `natural_kind_partition` — carrying:

- The cross-cutting property and value that defines the partition.
- The full list of cells from across all involved FCs that belong to the natural kind.
- The load-bearing claim that the partition tracks the named pattern more faithfully than the existing FC boundaries it cuts across.
- The falsification criteria: what additional distinctions a specialist could provide that would show the partition is conflating distinct things.
- The discharge mechanism: how community-level engagement (adoption, revision, rejection) is tracked.
- Citations: literature support for the natural-kind claim, ideally from specialists in multiple of the involved subfields.

Cost: substantial schema bump (probably v20 alongside Route 1 + Route 2). Each natural-kind partition is a major authoring deliverable.

Firewall properties: the strictest. The schema makes Mode F's structure visible enough that the firewall self-check has explicit fields to fill in. A `natural_kind_partition` object that fails to specify falsification criteria or discharge mechanism is incomplete and won't pass validation.

### 5.4 The hybrid architecture

Routes 1 + 2 + 3 are all part of the layer's full implementation. Not all three need to ship in the first authoring sub-PR.

Recommended phasing:

- **First authoring sub-PR:** Route 2 only, for the first cross-FC virtual-FC (Mode D first instance). Schema bump scope is minimal — virtual-FC structural fields only.
- **Second authoring sub-PR or later:** Route 1 enabled if and when the first virtual-FC's cells need to draw from a populated tag-value substrate. Schema bump for `cross_cutting_values`.
- **Mode F authoring round (years out):** Route 3 enabled when the first natural-kind partition is ready to be authored. Schema bump for `natural_kind_partition` objects.

The hybrid is what this memo proposes. Maintainer review on the phasing is one of the load-bearing decisions in §10.

---

## 6. Discharge mechanisms

Mode-specific. Each mode's entries discharge differently because the claim each mode makes is at a different epistemic level.

**Mode A (single-cell conjectured-by-pattern) → realized.** A material or theoretical realization confirms the slot. Cell's `constructive_status` flips from `conjectured-by-pattern` to `realized`.

**Mode A → forbidden-by-pattern.** A structural argument shows the slot cannot have a realization. Cell flips to `forbidden-by-pattern`.

**Modes B, C (paired and regional)** discharge the same way as Mode A, applied to each cell in the pair or region.

**Mode D (virtual-FC cells) → realized.** The cross-FC virtual axis's implied fourth cell is confirmed in the implied fourth FC. The virtual-FC cell moves from conjectured to realized.

**Mode D → forbidden-by-pattern.** The implied cell is shown to be structurally absent (the virtual-axis pattern was incomplete or the cross-FC unification was coincidental). The virtual-axis's reach narrows.

**Mode E (structure-of-FCs predictions) → confirmed.** External evidence — a specialist authoring an analogous classification in the literature, or experimental discoveries that force authoring of cells that don't fit anywhere else in the existing FCs — confirms the missing-FC prediction. The new FC is authored. The Mode E entry discharges.

**Mode E → rejected.** Time passes; no external evidence of the missing-FC's necessity accumulates; specialists indicate the predicted organization is not load-bearing in their understanding. The Mode E entry discharges as rejected, recording the time horizon and the literature consulted at the time of rejection.

**Mode F (natural-kind reorganization) → community adoption.** Specialists in multiple involved subfields engage substantively with the natural-kind partition and adopt it as a way of thinking about the relevant physics. This is a slow, community-level discharge — measured in years, not months. Adoption is rarely uniform; the partition becomes "adopted" when it appears in review articles, textbooks, or major research programs as a recognized organizational framework.

**Mode F → community revision.** Specialists engage substantively and provide load-bearing distinctions that show the partition needs adjustment but doesn't need to be withdrawn. The partition narrows, refines, or extends in response. This is the most productive form of community engagement and the most common outcome for substantive natural-kind claims.

**Mode F → community rejection.** Specialists provide load-bearing distinctions showing the partition is conflating distinct things in ways that cannot be repaired by narrowing. The natural-kind partition is withdrawn. The discharge records what the load-bearing distinction was and how it changed the project's substrate.

**Mode F → in-progress / contested.** The partition is being engaged with; some specialists adopt or refine, others reject. The Mode F entry stays open, with the state of engagement tracked as it evolves. Expected to be the most common Mode F state for any non-trivial natural-kind claim.

For all modes, each discharge is a sub-PR with a changelog entry recording the empirical, theoretical, or community development that motivated the status change, with citations.

---

## 7. First authoring sub-PR — precedent considerations

The first authoring sub-PR is load-bearing. Its choices will be inherited as precedent. The maintainer's review on the first sub-PR is where the layer's character is fixed for the modes it exercises.

### 7.1 Recommended first instance: an anomaly-content virtual-FC (Mode D)

Anomaly content is the cleanest Mode-D first instance:

- Load-bearing in the literature of at least four involved FCs (tenfold-way, generalized-symmetries, freed-hopkins-cobordism, sm-rep-content).
- Classified explicitly via cobordism / cohomology in well-developed literature.
- Passes the §4.3 Mode-D (a)-test cleanly.
- Passes the (b)-test cleanly — the virtual-FC is useful as queryable structure even if no novel predictions emerged.

Mode A (single-cell, e.g., the AIII-d3 cell I drafted in earlier conversation) and Mode B (paired, e.g., AIII-d3 plus its matching boundary-CFT cell) are downstream of the Mode D first instance. The AIII-d3 cell becomes one instance within the anomaly-content virtual-FC's grid; it isn't a standalone first instance.

Mode C, Mode E, and Mode F are explicitly deferred. They each have their own first-instance precedent decisions that the maintainer makes when the project is ready to exercise those modes. The current scope memo doesn't bind those decisions in advance.

### 7.2 Precedent the first sub-PR sets

- Granularity of virtual-FC axes.
- Cell-content shape (template for subsequent virtual-FC cells).
- Forced_by structure when the rule justifying the virtual axis is more diffuse than a single edge.
- Whether Route 1 cross-cutting tag-values are populated alongside the Mode D first instance, or deferred to a later sweep.
- Conjectured-by-pattern presence: recommendation is to start with all-realized cells in the first virtual-FC; conjectured-by-pattern cells are added in subsequent sub-PRs once the structural classification has settled.

### 7.3 What the first sub-PR does NOT decide

- Which cross-cutting properties beyond anomaly-content get virtual-FCs.
- Whether Route 1 is enabled.
- Whether Mode E or Mode F is exercised.
- The explorer's UI surfacing of virtual-FCs.

---

## 8. The expectation of specialist engagement

The higher-stakes modes of this layer (Mode E missing-FCs, Mode F natural-kind reorganization) make claims that cross specialist subfields. These claims will be engaged by specialists invested in the current organizational divisions. That engagement is expected, valuable, and constructive — *not* because the project is right and specialists must be defended against, but because the dialogue is about which constructions track which patterns more faithfully, and specialists hold partial approximations the project should learn from just as much as the project's substrate offers approximations specialists might learn from.

Three points worth stating explicitly.

**Specialist views are themselves partial constructions.** A specialist working in any single subfield holds an approximation to the underlying patterns in their domain — refined through years of work, calibrated against experiment and theory, defensible against alternative organizations within the subfield. That approximation is real expertise. But it is also bounded: a specialist's view of how their domain connects to other domains is necessarily less developed than their view within their domain. A Mode F natural-kind reorganization claim that crosses three subfields is, by construction, making a claim that no single specialist's expertise can fully evaluate. The specialist's role is to bring their within-domain expertise to the cross-domain question; the project's role is to bring the cross-domain visibility a substrate makes possible. Both are partial; together they're stronger than either alone.

**Engagement reveals which constructions track patterns better, not which side is right.** A vortex in a stream is a vortex regardless of how investigators draw their boundaries around it. The question between two investigators with different boundary-drawing conventions isn't "whose vortex is real" — both descriptions are of the same vortex. The question is "which boundary-drawing better captures the dynamical features being investigated." That same shape applies to specialist engagement with Mode F claims. When a specialist pushes back on a natural-kind partition, the substantive content of the pushback is almost always "this partition conflates cells whose underlying dynamics are not the same, here is the load-bearing distinction you missed." That is exactly the information the project needs. If the distinction is real and load-bearing, the partition narrows or revises. If the substrate's content suggests the specialist's assumed distinction is itself partial, the dialogue continues. Either way, the engagement is productive. The methodology that handles this well treats specialist engagement as data, not as opposition.

**The substrate's discipline is what makes the engagement productive.** A claim from this project is not "an AI generated some patterns." It is: a substrate built over years under a firewall designed to prevent pattern-finding from driving authoring; queried by reading instruments that surface what's in the substrate; yielding a pattern that the maintainer judged to be a load-bearing natural-kind claim; with citations to literature in every involved subfield; with explicit falsification criteria; with a discharge mechanism specified. The discipline is what gives the specialist something specific to engage with. A specialist who responds "I don't recognize this organization" has identified a real disagreement; a specialist who responds "here is the load-bearing distinction the partition ignores" has provided exactly the input the project needs. Both responses are useful; both extend the substrate.

The project does not need to avoid producing claims that will face specialist engagement. The right disposition is: build the substrate faithfully, surface what's there honestly, articulate claims at the appropriate epistemic level (pattern-fidelity, not right-versus-wrong), defend the claims that survive engagement, revise the ones that load-bearing counter-evidence indicates need revision. Specialist disagreement is the mechanism by which the substrate becomes more faithful over time. It is not a failure of the project; it is the project working as designed.

---

## 9. Position relative to existing methodology

**Relative to `META_v21_1_methodology_firewall.md`:** binding parent. The firewall constrains authoring. The cross-FC pattern layer reads from authored content. §4.1 resolves what might have looked like a recursive worry: extending the reading apparatus doesn't require the firewall to bind methodology, because reading is not writing.

**Relative to `PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md` and prior phase scope memos:** successor in the authoring trajectory. Phases A/B/C authored the substrate. The cross-FC pattern layer is the reading apparatus the substrate enables. Whether to name it "Phase D" formally is a maintainer call (see §10).

**Relative to `PHYSICIST_FACING_VOCABULARY.md`:** this memo is maintainer-facing. When virtual-FCs, structure-of-FCs entries, or natural-kind partitions get surfaced to physicists, the vocabulary discipline applies. The discipline doesn't bind this document.

**Relative to `TRACKS_AFTER_PHASE_A.md` and `TRACK_4_USE_SIDE_ARTIFACTS.md`:** the cross-FC pattern layer's outputs become the strongest demonstration material for Track 4 outreach. The natural-kind reorganization mode in particular is the kind of claim that would justify outreach to working physicists from each involved subfield. The Track 4 review pathway is the mechanism for specialist engagement (§8).

**Relative to schema versions:** v2 anticipated a v19 → v20 schema bump for Route 1 + Route 2. v3 adds Route 3 for Mode F, which is a further v20 (or v21) extension. The phased schema-bump scope is named in §5.4 and §10.

---

## 10. Open questions — maintainer decisions deferred

The load-bearing decisions this memo does not settle. Each is for the maintainer to resolve before or during the relevant authoring sub-PR.

1. **Naming.** Cross-FC pattern layer, discovery layer, reading layer, Phase D? The orientation in §1 may make "Phase D" feel inadequate — this isn't another phase of the predictive layer, it's the reading apparatus on top of all prior phases. "Cross-FC pattern layer" or "reading layer" preserves the distinction.

2. **Schema bump phasing.** Three routes phased across multiple schema bumps. Is the proposed phasing right, or should some be deferred further?

3. **First Mode D instance.** Anomaly content recommended. Competing candidates worth considering?

4. **First Mode E sub-PR timing.** When is the project ready to exercise Mode E? Recommendation is after the first Mode D virtual-FC has been authored, discharged at least once, and reviewed externally if Track 4 is open by then.

5. **First Mode F sub-PR timing.** Mode F is the highest-stakes mode. Recommendation: not before the substrate is substantially more mature (50+ FCs, 1000+ cells, several Mode D virtual-FCs with discharge histories), and not before Track 4 is robust enough to handle specialist engagement. Realistic horizon: 2-5 years.

6. **Cadence targets.** How many Mode D sub-PRs per year? How many Mode E? Mode F is by-its-nature low-cadence. Recommendation is conservative: one Mode D per quarter once precedent is established; one Mode E per year; Mode F as physics content motivates, not on a schedule.

7. **Specialist engagement before vs after first sub-PR.** Does the maintainer want to defer the first Mode D virtual-FC until Track 4 specialist engagement is operational, or proceed with maintainer-only review and absorb specialist input as it accumulates? §7 recommends proceeding; §8 grounds why specialist engagement is constructive.

8. **The unification possibility.** §1 corollary three names deep unification (information dynamics, computational structure, geometric organization, anomaly classification, or something not yet named) as a specific empirical question the substrate is structured to make askable. Does the methodology need any specific additional mechanism to handle a unification finding if Mode F surfaces evidence of one, or is the existing Mode F machinery sufficient? Provisional answer: existing machinery suffices, but the maintainer may want to revisit if such a finding emerges. The point of corollary three is that the methodology supports the question being asked without committing to any particular answer.

---

## 11. How this document is maintained

Same discipline as the other methodology documents in `/methodology/`:

1. **The substrate and the live system are authoritative.** This memo orients; it does not constrain. When the first Mode D authoring sub-PR ships, §7 updates to record what was actually authored.

2. **The taxonomy in §3 is provisional.** §3.7 (Mode unidentified) is the primary safety valve. Authoring sessions that surface patterns not fitting Modes A-F are expected to use Mode unidentified rather than force-fit. Methodology revisions to extend the taxonomy are normal sub-PR work.

3. **The §4 firewall tests sharpen with experience.** The current §4.3 mode-specific tests are best-current-understanding. Each mode's tests will be revised after the first few sub-PRs in that mode accumulate experience.

4. **The §5 architecture may revise.** If the Route 1 + Route 2 + Route 3 phasing creates friction, the architecture revises. The first 12 months of authoring under this memo is the empirical test.

5. **§7 first-sub-PR recommendations close out when the first sub-PR ships.** A successor handoff document (`CROSS_FC_PATTERN_LAYER_HANDOFF.md`) takes over for sub-PR-by-sub-PR guidance.

6. **§8 engagement expectations get exercised when Track 4 opens.** Specialist engagement that drives substrate revision or Mode F status changes gets recorded as part of the discharge mechanism, building up a body of cases that informs methodology revision.

7. **The §1 orientation is the document's spine.** The taxonomy, the architecture, the firewall application, the discharge mechanisms, the engagement expectations — all serve the orienting claim that boundaries are constructions and patterns are findings, and that the substrate aims at fidelity to the latter. If subsequent experience indicates the orienting claim itself needs revision, the methodology revision is foundational rather than incremental. That kind of revision would be its own major event; expect it not to happen, but don't preclude it.

---

*End of CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md v3, drafted 2026-05-26. Supersedes v2. Replaces v2's realist-vs-constructivist hedging with the sharper pattern-vs-boundary framing: boundaries between fields are human constructions, patterns are findings about world dynamics, the project distinguishes the two and aims at fidelity to the patterns. Uses the vortex analogy in §1 as the canonical example. Reframes Mode F (natural-kind reorganization) as "more faithful approximation" rather than "the existing organization is wrong." Reframes specialist engagement (§8) as collaborative dialogue about which constructions track which patterns more faithfully, rather than confrontation. Names deep unification (information dynamics and other candidates) as a specific empirical question the substrate is structured to make askable. Authors no cells, edges, FCs, or virtual-FCs; those are the first authoring sub-PR's work. Eight maintainer decisions deferred in §10. Companion to the forthcoming first-instance sub-PR, recommended in §7.1 to author the anomaly-content virtual-FC as the layer's first Mode-D instance.*
