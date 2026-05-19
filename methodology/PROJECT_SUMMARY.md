# PROJECT_SUMMARY.md — Substantive Reference

**Document type:** Supplementary reference companion to `HANDOFF.md` and `PROJECT_GOAL_SUPPLEMENT.md`. Captures content that doesn't fit either of those two files: the substantive physics of what's been authored, patterns visible in the data, the decision trail (what was considered and rejected), authoring style notes, key user check-ins that shaped direction, and MCP tool recipes for common AI tasks.

**How to use this file:** Read after HANDOFF.md if you want substantive context for authoring decisions. The "what was considered and rejected" section (§3) is the most important — it prevents re-litigating settled questions.

---

## 0. What this document is

`HANDOFF.md` tells you what to do. `PROJECT_GOAL_SUPPLEMENT.md` tells you what "on target" means. This document tells you *what's actually there* — the substance of the periodic-table content, the patterns the data already exhibits, and the structural choices that produced them. It's the "why" archive plus a substantive content reference.

This document does **not** describe the schema (see `Map_v15_3_schema.json` and `MAP_v15_3_schema_spec_extension.md`), does **not** describe the visual rendering (see `MAP_v14_5_visual_spec.md`), does **not** describe the immediate next step (see `HANDOFF.md` §6), and does **not** repeat the anchoring goals (see `PROJECT_GOAL_SUPPLEMENT.md`).

---

## 1. Substantive content — what's been authored

The cumulative dataset contains 10 formal-classifications (the layers of the periodic table) + 7 experimental-programs + 2 v15.3-introduced nodes (su5-gut classification + program), on top of the v13 baseline (32 nodes covering architectures, regime-content, open-frontiers, totality-approaches). Each authored layer below has a structural claim worth knowing.

### 1.1 SM rep content (`sm-rep-content`)

The Standard Model's matter and gauge content laid out as a 9 × 4 grid (9 multiplets × 4 generation values including the N/A for non-replicating gauge bosons). **17 of 36 cells are structurally-excluded.** The excluded cells are not gaps — they encode the fermion/boson asymmetry as positive structural content: matter multiplets replicate over generations and are excluded in the N/A column; gauge multiplets do not replicate and are excluded in the 1/2/3 columns.

**Key teaching:** the SM "table" is sparser than it looks. The structural pattern (which cells exist, which don't) is itself the load-bearing content; if a candidate BSM theory implies a different structural pattern, that's the first thing to check.

### 1.2 Ten-fold way (`tenfold-way`)

Free-fermion topological phases classified by 10 symmetry classes × 3 spatial dimensions = 30 cells, each containing a topological-invariant group (0, ℤ, ℤ₂, 2ℤ). The cells with realized examples are the experimentally-confirmed topological insulators and superconductors (HgTe quantum wells, Bi₂Se₃, Majorana wires, etc.).

**Key teaching:** the ten-fold way is the canonical example of how a periodic-table-style classification looks when it's *complete-within-domain*. Every cell has content; structural exclusion doesn't apply. The classification is K-theoretic in origin, which is why it specializes Freed-Hopkins for the free-fermion sub-domain.

### 1.3 ADE cluster (5 entries)

Five separate formal-classifications, **all labeled by the same five Cartan types** (A-series, D-series, E_6, E_7, E_8): Lie algebras, finite SU(2) subgroups, Du Val singularities, SU(2)_k modular invariants, representation-finite quivers. They are connected by **10 typed cross-classification edges** with 4 subtypes (4 bijections, 2 derives-from, 1 categorically-equivalent, 3 composition).

The relations between them:
- **McKay correspondence** (subgroups ↔ Lie algebras, bijection)
- **Brieskorn/resolution** (Lie algebras derive from Du Val singularities)
- **Quotient construction** (Du Val singularities derive from SU(2) subgroups)
- **Gabriel's theorem** (quivers ↔ Lie algebras, bijection)
- **Cappelli-Itzykson-Zuber** (modular invariants ↔ Lie algebras, bijection)
- **Bridgeland-King-Reid** (Du Val ↔ quivers, categorically-equivalent — derived equivalence)
- **McKay quiver** (subgroups ↔ quivers, bijection)
- Three composition edges connecting modular invariants to the other three via Lie algebras

**Key teaching:** the ADE cluster is the canonical demonstration of how unrelated-looking classifications turn out to be *the same classification* viewed through different mathematical lenses. The McKay correspondence (1980) is the moment this became visible; the project's `cross-classification` edge type is what makes it queryable as data rather than buried in prose.

### 1.4 Spacetime symmetries (`spacetime-symmetry-groups`)

Six cells covering the major spacetime symmetry families: Galilean, Poincaré, conformal (with the 2D Virasoro infinite-dimensional special case), de Sitter, anti-de Sitter, general-coordinate. Each cell's content names the canonical group with dimension dependence noted.

**Key teaching:** Wigner's 1939 classification of unitary irreps of Poincaré by (mass², spin) is the single most consequential application — it defines what a "particle" is in relativistic QFT. The 2D conformal case is the dramatic exception: infinite-dimensional Virasoro × Virasoro with central charge c, structurally unlike the other cells. The cross-classification edge `spacetime-symmetry-groups derives-from ade-lie-algebras` (status: established, in cell_refs: 4 of 6 cells) records that the finite-dimensional cases are real forms of complex simply-laced Lie algebras.

### 1.5 Freed-Hopkins cobordism (`freed-hopkins-cobordism`)

Invertible topological field theories classified by cobordism: 5 × 5 grid (tangential structure × spacetime dimension), 25 cells. The famous results live here:
- **Ω^{Pin-}_2 = ℤ₈** — the Fidkowski-Kitaev collapse where 1d class BDI's free-fermion ℤ classification collapses to ℤ₈ under interactions.
- **Ω^{Pin+}_4 = ℤ_{16}** — the 3+1d topological insulator's ℤ_{16} refinement of the ten-fold way's class AII ℤ₂.
- **Ω^{Spin^c}_2 = ℤ** — the integer quantum Hall effect's TKNN invariant.

The ten-fold way `specializes` Freed-Hopkins via a 30-cell-pinned cross-classification edge: the entire free-fermion classification is the free-fermion sub-case of Freed-Hopkins.

**Key teaching:** Freed-Hopkins is the "more powerful classification that subsumes a famous prior classification." When a Phase 2 entry has the shape "this newer framework subsumes an older one in a specific sub-domain," the `specializes` cross-classification subtype applies. The ten-fold-way / Freed-Hopkins relation is the paradigm case.

### 1.6 SU(5) GUT (v15.3 worked example)

A formal-classification with `closure_status.level: conjectural` paired with an architecture node (`su5-gut-program`) at stratum 2b. The cross-classification edge `sm-rep-content specializes su5-gut-rep-content` has `status: conjectured` and `targeted_by: [su5-gut-program]`, with 18 SM cells pinned in cell_refs.

**Key teaching:** this is the template for authoring **any conjectured unification**. SO(10) GUT, E_6 GUT, Pati-Salam, supersymmetric variants — all follow the same pattern (conjectural formal-classification + stratum-2b architecture + conjectured cross-classification edge with targeted_by). Minimal SU(5)'s `predictive_yield` includes one `falsified` prediction (proton decay; falsified by Super-Kamiokande 2017), demonstrating that the cross-classification edge can have status `conjectured` even when some of the target classification's predictions are falsified — the connection is what's conjectured, not necessarily every prediction of the target.

### 1.7 Experimental programs (7 of them)

Each maps a real-world collaboration to the cells it produced:

| Program | Subtype | Cell(s) produced |
|---|---|---|
| `pdg` (Particle Data Group) | data-curation-collaboration | Whole SM classification (no cell_refs — curates everything) |
| `atlas-cms-lhc` | experimental-collaboration | cell-H-gNA (Higgs) |
| `ua1-ua2-sps` | experimental-collaboration | cell-W-gNA, cell-B-gNA (W and Z) |
| `cdf-d0-tevatron` | experimental-collaboration | cell-uR-g3 (top quark) |
| `donut` | experimental-collaboration | cell-LL-g3 (tau neutrino) |
| `brookhaven-slac-charm` | experimental-collaboration | cell-uR-g2 (charm quark) |
| `fermilab-upsilon` | experimental-collaboration | cell-dR-g3 (bottom quark) |

**Key teaching:** every confirmed cell of the SM table now has a structurally-pinned program. A query like `find_produces_classification({to: 'sm-rep-content'})` returns the full chain from theoretical prediction (via the SM's predictive_yield) to experimental confirmation (via the produces-classification edge). The `accelerator-program` and `survey-program` subtypes remain unused by Phase 1; Phase 2 will likely exercise them.

---

## 2. Patterns visible in the cumulative data

The current 51 nodes / 98 edges already exhibit patterns that an AI pattern-finding pass would surface. Listing them here helps future authoring know what to look for.

### 2.1 The ADE universality pattern

ADE labels appear in **five distinct classifications**, all connected by typed cross-classification edges. This is a "universal pattern" in the precise sense that the same combinatorial-classification structure (the five Cartan types) appears across mathematically unrelated-looking domains: representation theory (Lie algebras), finite group theory (SU(2) subgroups), algebraic geometry (Du Val singularities), 2D conformal field theory (modular invariants), and quiver representation theory.

**Why this matters:** if another universal pattern exists, the data structure now makes it visible. Candidates to look for: the cobordism / K-theory / Freed-Hopkins family (already partially captured); the Coxeter / root-system family (overlaps with ADE but extends to BCFG); the modular-form / arithmetic family (intersects with modular invariants). Authoring entries for these other patterns would put the ADE-shape phenomenon into context.

### 2.2 The cell-level granularity of physics

The `cell_refs` field on bears-on, uses-classification, produces-classification, and cross-classification edges makes physics granular at the cell level rather than just the node level. Concrete examples:

- ATLAS+CMS produces *specifically* the Higgs cell, not the whole SM.
- QFT uses *specifically* the Poincaré and conformal cells of spacetime symmetries, not the Galilean or Diff cells.
- The SM's bears-on-hierarchy-problem edge attaches at the Higgs cell, recording that hierarchy is *that cell's* problem.
- The ten-fold way's specializes-Freed-Hopkins edge pins all 30 ten-fold-way cells (the entire classification specializes, not a sub-domain).

**Why this matters:** AI queries that ask "what produced *this specific cell*?" or "what uses *this specific cell*?" become tractable. Node-level queries lose this granularity. The pattern of which cells get pinned (and which don't) is itself data.

### 2.3 The bears-on `nature` distribution

Across the cumulative dataset:

| nature | count | meaning |
|---|---|---|
| constrains | 1 | a classification structurally rules something out |
| partially-solves | 3 | a classification addresses a frontier in a substantive sub-domain |
| structural-only | 8 | a classification *recognizes* a frontier without addressing it |

**Why this matters:** the "structural-only" majority is consistent with how physics actually works — most classifications *touch* many open frontiers but *solve* few. A new entry that has only constrains/partially-solves edges and no structural-only edges would be unusual (it would mean the entry is exhaustively-substantive in every direction it bears on, which is rare in real physics).

### 2.4 The cross-classification status distribution (the unification map)

Current distribution: 12 established + 1 conjectured + 0 partial + 0 aspired + 0 contested + 0 impossible = 13 total.

**Why this matters:** the **0 aspired** is the most actionable signal. Aspired-status edges are how unification programs become first-class on the map. The v13 candidate-foundational programs (AdS/CFT, tensor networks, NCG, causal sets) each aspire to specific cross-classification connections that should be authored. Doing so would shift the distribution toward what `PROJECT_GOAL_SUPPLEMENT.md` test §2.4 expects: a healthy ratio of conjectured/aspired-to-established showing visible work-in-progress, not just a record of already-done physics.

### 2.5 The prediction-status distribution

22 confirmed + 1 falsified + several unconfirmed-tension + several retro-explanatory-only + several unconfirmed-not-yet-tested. The 1 falsified is minimal non-SUSY SU(5)'s proton decay prediction. The unconfirmed-tension predictions are SU(5)'s gauge-coupling unification and sin²θ_W (both rescued by SUSY variants). The retro-explanatory-only entries are predictions that came after the experimental observation they "predict" (the cobordism re-derivation of TKNN being the canonical example).

**Why this matters:** the prediction-status field captures the empirical state of the field at cell-level granularity. An AI summarizing "where physics stands empirically" can answer with citable specifics.

### 2.6 The closure-status distribution across formal-classifications

8 complete-within-domain + 1 partial + 1 conjectural = 10 total formal-classifications.

The 1 partial is Freed-Hopkins (the framework is complete for the cases authored but doesn't extend to all tangential structures or to non-invertible phases). The 1 conjectural is the SU(5) GUT.

**Why this matters:** most authored classifications are complete-within-domain because Phase 1 deliberately chose mature classifications. As Phase 2 progresses, expect more `partial` and `conjectural` classifications. A future entry being `complete-within-domain` is the *exception* once we move into active research territory.

---

## 3. Decision trail — what was considered and rejected

This is the highest-leverage section of this document because it prevents re-litigating settled questions. When making a new decision, check this section first.

### 3.1 Why `formal-classification` is a separate node type (vs subtypes of architecture)

**Considered:** make formal-classifications a subtype of architecture (using the existing `subtype` field), reusing the v13 architecture machinery (closure_condition, hosting_claims, etc.).

**Rejected because:** formal-classifications have different load-bearing fields (cells, classification_axes, closure_status with its specific 4-value enum, predictive_yield, domain_of_applicability). Reusing the architecture machinery would have either (a) bent the architecture machinery in awkward ways or (b) under-used the classification-specific machinery.

**Chosen:** a separate node type with its own required-fields discipline and its own forbidden-fields list. The v14 schema spec §8 rules 1–3 codify this.

### 3.2 Why bears-on has a `nature` enum (vs only discharge_status)

**Considered:** reuse the existing v13 `discharge_status` field on bears-on edges, with its rich polymorphic structure.

**Rejected because:** discharge_status carries scope-specific completion levels (local / global / universal / geometry / matter / overall); for bears-on, the relevant distinction is structurally different — *what kind of bearing* (constrains? partially-solves? structural-only?). Forcing this into discharge_status would have overloaded the field.

**Chosen:** a separate `nature` enum on bears-on edges only, with three values. discharge_status remains on bears-on as well (for cases where additional completion-level information matters), but nature is the structural primary.

### 3.3 Why cross-classification has exactly 5 subtypes (not 3, not 8)

**Considered:** fewer subtypes (just bijection, derives-from, composition) — covers most cases but doesn't distinguish categorical equivalence (derived equivalences are a different beast than literal bijections).

**Considered:** more subtypes (bijection, derives-from, categorically-equivalent, specializes, composition, anomaly-checks, contradicts, etc.) — could be more precise but over-segments.

**Chosen:** 5 subtypes that cover the canonical mathematical relations between classifications (bijection, derives-from, categorically-equivalent, specializes, composition). A 6th subtype `constrains` is flagged for v16 to handle the SM × Freed-Hopkins anomaly-cancellation case which doesn't fit any current subtype. The discipline: a new subtype is added only when a specific authored entry has a relation that resists the existing five.

### 3.4 Why v15.3 status has 6 values (and is separate from closure_status)

**Considered:** reuse closure_status's 4-value enum (complete-within-domain, partial, conjectural, contested) for cross-classification status.

**Rejected because:** cross-classification status needs to express things closure_status doesn't (aspired = a program works toward this without a specific testable conjecture; impossible = ruled out by no-go theorem). Renaming "complete-within-domain" to "established" makes sense in the edge context but would be semantic drift if we tried to share the enum.

**Chosen:** a separate 6-value enum (established, partial, conjectured, aspired, contested, impossible). Values overlap conceptually with closure_status (partial, conjectured/conjectural, contested) but are renamed for the edge context and extended with two unique values (aspired, impossible).

### 3.5 Why the v15 retrofit uses supersedure (not patches)

**Considered:** ship v15 retrofits as *patches* (diff-style files that modify v14 entries in place).

**Rejected because:** patches are harder to inspect, harder to validate, and depend on the v14 entry remaining unchanged. Supersedure is heavier but produces self-contained replacements that validate independently.

**Chosen:** v15 retrofit entries supersede their v14 counterparts when content changes (ADE, spacetime). Purely additive retrofits (SM programs) ship as supplemental files. Each superseding file's `_meta._supersedes` records the v14 file being replaced.

### 3.6 Why the MCP tool surface mirrors the v13 pattern (vs reorganizes)

**Considered:** reorganize the v13 tool surface to be more uniform with the v14/v15 tools (e.g., generic `find_edges_by_type` rather than dedicated per-edge-type tools).

**Rejected because:** the v13 tools' descriptions are agent-facing contracts; reorganizing breaks compatibility with AI agents trained against the v13 tool surface. The v13 tools are also already deployed and working.

**Chosen:** preserve all 10 v13 tools verbatim (descriptions only updated to point to better v14/v15 alternatives where applicable). Add 15 new v14/v15 tools alongside. Dedicated per-edge-type tools (`find_bears_on`, `find_uses_classification`, etc.) mirror the v13 pattern of `find_targeting` and `find_hosting`.

### 3.7 Why §10.3 (multi-classification cells) was retracted

**Considered:** v14.4 findings predicted that Phase 2 cobordism entries would force multi-classification cells (a cell that lives jointly in two formal-classifications, with content jointly determined by both).

**Rejected upon Phase 2 entry #1 authoring:** the SM × Freed-Hopkins anomaly cancellation relation, which was the canonical anticipated forcing case, turns out to be a cross-classification *edge* relation, not a joint-cell relation. The SM's anomaly content is determined by SM cells alone; cobordism is the check. The relation lives entirely at the cross-classification edge level.

**Status:** §10.3 retracted in v15.2 findings §4. Multi-classification cells may never be forced. The schema does not include the feature.

### 3.8 Why `produces-classification` permits multiple source-types (vs only experimental-program)

**Considered:** restrict produces-classification source types to experimental-program only (the v15 motivation case).

**Rejected because:** some classifications are produced by theoretical activity rather than experimental programs (mathematical classifications like ADE). Limiting to experimental-program would force those cases to use a different edge type.

**Chosen:** produces-classification permits source types of experimental-program, architecture, or open-frontier. The validator-side rule (Rule 12) enforces the restriction. In practice Phase 1 uses experimental-program for all 7 produces-classification edges; the other source types are reserved for cases that arise in Phase 2+.

---

## 4. Authoring style notes

Specific patterns from the authored entries that work well. Not load-bearing, but signal "this entry was authored carefully" vs "this entry was rushed."

### 4.1 Cell content

- **Terse, structural:** "Ω^{Pin+}_4 = ℤ₁₆", "(3, 2, +1/6)", "ℤ₂". The cell content is the invariant or canonical label; not a description.
- **Description carries depth:** the cell's `description` field is where context, history, and significance go. The Pin+/d4 cell's content is "Ω^{Pin+}_4 = ℤ₁₆"; its description explains the Wang-Senthil refinement story.
- **Structurally-excluded uses exactly that string:** "structurally-excluded" (verbatim) in the `content` field. The description explains why.

### 4.2 Citations

- **Always primary literature.** "Georgi, Glashow 1974, Phys. Rev. Lett. 32, 438" not "the original SU(5) paper."
- **Specific page or volume.** "Phys. Rev. B 81, 134509" not "Phys. Rev. B."
- **Both confirmed-prediction citations.** Predictions with status `confirmed` carry BOTH a `prediction_citation` (where it was first proposed) AND a `confirmation_citation` (which experiment confirmed it).
- **Multiple authors when collaboration matters.** "Aubert et al. (Brookhaven E598) 1974, Phys. Rev. Lett. 33, 1404" plus "Augustin et al. (SLAC-LBL Mark I) 1974, Phys. Rev. Lett. 33, 1406" for the J/ψ joint discovery.

### 4.3 Descriptions

- **Open with the structural claim:** "The Standard Model's matter and gauge content as a 9 × 4 grid…" not "The Standard Model is a quantum field theory that…"
- **Acknowledge what's *not* covered:** "Does not extend to: BSM physics, neutrino masses, dark matter." The `domain_of_applicability` field is where this lives, but descriptions often re-state.
- **Note conjectural/contested status in the prose:** if `closure_status.level` is `conjectural`, the description should say so plainly. The SU(5) GUT description's third paragraph does this.

### 4.4 Choosing cross-classification subtypes

The decision tree from v15.3:
- Are the classifications in 1-to-1 correspondence? → `bijection`
- Does one categorical/derived equivalence connect them via a functor? → `categorically-equivalent`
- Is one a special case of the other in a sub-domain? → `specializes`
- Is one constructed from the other via a structural recipe? → `derives-from`
- Is the relation derivable from a chain of more primitive relations? → `composition`
- None of the above? → likely needs a new subtype (v16 candidate); document the case for adding it.

The 5 subtypes are mutually exclusive. Most relations admit a clean choice; when in doubt, prefer the *more specific* subtype (specializes over derives-from over composition).

---

## 5. User check-in moments that shaped direction

Documenting the user's pivotal observations and the work they redirected. Recording these prevents future conversations from accidentally undoing the redirections.

### 5.1 "5 design decisions confirmed" (early v14)

User confirmed: (1c) hybrid axis typing, (2) explicit cells, (3) bears-on goes to frontiers only, (4) closure_status as a new enum, (5) version as v14. These five decisions are foundational; they're locked in by every subsequent authoring decision.

### 5.2 "Phase 1 first, then visual spec" (mid-v14)

User accepted "let's author Phase 1 entries first to test-drive the schema before locking in the visual spec." This ordering vindicated itself: Phase 1 entries forced four v15 features (experimental-program, typed cross-classification, axis_value_ranges, extended cell_refs) that the visual spec would have had to accommodate retroactively.

### 5.3 "Is this a periodic table? AI usability?" (post-Freed-Hopkins)

User asked two questions: (1) framing — is this really a periodic table for physics? and (2) AI usability — can AI use this the way it uses the existing Map of Physics tools? The answers shaped `PROJECT_GOAL_SUPPLEMENT.md` directly. This was the most consequential check-in.

### 5.4 "Unification programs connect layers" (motivating v15.3)

User said: "as long as the layers show how they are connected if at all or that they show what is needed for them to be connected if at all possible. unification projects would work towards connecting the layers." This is the verbatim motivation for the v15.3 status feature. The 6 status values are designed around this framing.

### 5.5 "1 then 3" (v15.3 sequencing)

User instructed: do v15.3 (cross-classification status feature) first, then build the MCP tool surface. This sequencing was right because the MCP tool surface needs to know about the status field to expose status-based queries. Doing them in the other order would have required a retrofit of the MCP server.

---

## 6. MCP tool recipes — common-task queries

How to do typical AI tasks against the tool surface. Each recipe is a sequence of tool calls.

### 6.1 "Summarize the empirical state of a classification"

```
1. get_classification(id) → returns the classification with cells, axes, predictive_yield
2. find_predictions({ classification_id: id }) → all predictions, grouped by status
3. find_produces_classification({ to: id }) → which experimental programs produced cells
4. Synthesize: "X has Y cells, of which N are structurally-excluded. Predictions: A confirmed, B falsified, C in tension, D awaiting test. Established by [program list]."
```

### 6.2 "What does program P work on?"

```
1. get_node(P) or get_experimental_program(P) → the program record
2. find_targets_of_program(P) → candidate_targeting frontiers + cross-classification edges
3. Synthesize: "P targets [frontiers] (via candidate_targeting) and [connections] (via cross-classification, status=X)."
```

### 6.3 "How is classification A connected to classification B?"

```
1. find_classification_chain(A, B, maxLen=4) → all paths through cross-classification edges
2. For each path, the edges' subtypes and statuses tell the story
3. compare_classifications(A, B) → structural similarity (shared subtype, overlapping axes, direct edges)
```

### 6.4 "What conjectured / aspired work exists for X?"

```
1. find_cross_classification({ from: X, status: ['conjectured', 'aspired'] })
2. find_cross_classification({ to: X, status: ['conjectured', 'aspired'] })
3. Each result's targeted_by names the program working on it
4. find_targets_of_program(program) for each program to get the full picture
```

### 6.5 "What are the structurally-expected-but-empty cells?"

```
1. list_classifications({}) → all formal-classifications
2. For each: get_classification(id), inspect cells
3. find_structurally_excluded({ classification_id: id }) → the explicitly-excluded ones
4. Heuristic: cells with no content, no realized_examples, no predictions, and no structurally-excluded marker are candidate gaps
```

### 6.6 "What patterns appear across multiple classifications?"

```
1. list_classifications({}) → all
2. For each pair, compare_classifications(id1, id2) → shared axes, shared subtypes, cross-class edges
3. find_cross_classification({}) → the full cross-classification graph
4. Look for: (a) classifications sharing axis names (suggests pattern reuse); (b) cross-classification edges with subtype 'bijection' (the strongest pattern indicator); (c) classifications connected by composition edges (suggests an intermediate-classification universality)
```

### 6.7 "What's the maturity profile of the inter-classification connections?"

```
1. find_status_distribution({}) → the global breakdown
2. find_status_distribution({ from: id }) for each classification → per-classification breakdown
3. Patterns: classifications with high established / low conjectured = mature; high conjectured / aspired = active research; high impossible = constrained by no-go theorems
```

---

## 7. The "what's deliberately ambiguous and why"

Some choices are deliberately left ambiguous in the schema to avoid premature commitment. Listing them:

- **`derives-from` direction reading.** The spec is ambiguous between "A is constructed from B" and "A's structure is read off B." The retrofit uses Reading 2 consistently; v15.2 findings flag this as a spec clarification candidate. Future authors should follow Reading 2 for now (consistency with existing data) but feel free to propose renaming in v16.
- **Cross-classification `cell_refs` convention.** The spec doesn't say whether cell_refs pin source-side or target-side cells. The retrofit uses source-side. Same status as above.
- **Joint experimental-program nodes.** ATLAS+CMS, UA1+UA2, etc. are currently single nodes representing joint collaborations. This collapses two independent collaborations into one. The alternative (one node per collaboration plus some joint-discovery relation between them) is heavier; deferred to v16 if/when the granularity matters.
- **Whether bears-on should also get a `status` field.** v15.3 only added status to cross-classification. Bears-on already has `nature` and `discharge_status`; adding `status` would create field-interaction questions. Deferred.

These aren't bugs; they're conscious deferrals. A future conversation that needs to resolve one should treat it as a v16 spec clarification rather than a v15.x schema patch.

---

## 8. A final note on voice

The findings docs and spec extensions have a specific voice: technical, declarative, decisions-made-and-justified, with section numbers and explicit "what was considered and rejected" trails. This voice is load-bearing — it signals to a future reader that decisions were made deliberately, not accumulated by accident. New authoring should match this voice. The existing `MAP_v0_*.md`, `MAP_v14_*_findings.md`, and `MAP_v15_*_findings.md` files are reference exemplars.

---

*End of PROJECT_SUMMARY.md.*
