# Session summary — 2026-05-16

**Role:** Historical-record summary of the v17 → v20.1 authoring session. Goes into project files as part of the project's session archive.
**Session span:** v17 through v20.1 — 8 version increments plus 2 project-level documents.
**State at session start:** v16 schema landed; 53 nodes / 117 edges / 12 FCs / 28 cross-class edges; concept tags recently introduced (v16.1).
**State at session end:** **57 nodes / 137 edges / 16 FCs / 48 cross-class edges / 0 validation errors.**

---

## 1. Major project-level developments

Two architectural clarifications emerged that changed how the project is framed:

### 1.1 The two-layer architecture (PROJECT_GOAL_PHENOMENON_LAYER)

Mid-session, a clarification about the project's destination crystallized: the eventual Periodic Table of Physics is a **phenomenon-level** map organizing actual physical referents (particles, neutron stars, FQH states, the CMB, etc.), with Mendeleev-style empty-cell predictions. The work done before this session was building the **organizational backbone** — formal classifications that the eventual phenomenon layer will hang from.

This wasn't a redirection of work; the existing structural-FCs (MTC, cobordism, bootstrap, SymTFT, etc.) ARE the scaffolding the phenomenon layer requires. The clarification made the goal explicit and oriented future authoring decisions. The document `PROJECT_GOAL_PHENOMENON_LAYER.md` was authored as a north-star reference recording this two-layer architecture, the natural phenomenon-FC pairings for each existing structural-FC, the major uncovered sectors, and 3 direction-check questions for future authoring proposals.

### 1.2 Pattern-finding methodology (PROJECT_PATTERN_FINDING_METHODOLOGY)

When the v20.1 pattern-finding pass began, it became clear the v17.1 analytical apparatus was no longer aligned with the dataset's two-layer architecture (phenomenon-FCs introduced v19-v20 needed different analyses). Rather than ad-hoc fix the analyses, methodology was documented as a project-level reference: `PROJECT_PATTERN_FINDING_METHODOLOGY.md`. It contains the **layer-conditional principle** (analyses must be calibrated to data-layer structure), historical methodology evolution (v15.6 → v17.1 → v20.1), the current 8-analysis apparatus, the finding bar, and an operational checklist for conducting passes. This document is now the authority for how pattern-finding passes are conducted; it evolves as new data layers emerge.

---

## 2. Chronological version-by-version summary

### v17 — generalized symmetries / SymTFT entry

**Authored:** Phase 2 entry #4. 13 FCs / 33 cross-class edges / 0 errors.

**Key content:** New FC `generalized-symmetries` with 17 cells across 3 axes (spacetime-dim × form-degree × structure-type). 5 cross-classification edges including the **second use of `constrains` subtype** (SymTFT→bootstrap, Komargodski-Sulejmanpasic-Unsal anomaly matching).

**Major findings:**
- v16's predicted axis-kind diversity gap (representation, cobordism-class) was NOT closed. Both kinds have schema constraints (single parent_group; single dimension_ref+symmetry_ref) that don't fit SymTFT's multi-group multi-dim character. The kinds remain unexercised.
- Central-axis cluster grew to 5 FCs / 12 internal edges — the densest structural cluster in the map.
- v16.1 prediction that SymTFT joins K-theory ∩ anomaly confirmed (4-FC intersection: tenfold-way, cobordism, MTC, generalized-symmetries).

### v17.1 — pattern analysis v2 (second AI-driven pass)

**Authored:** 6 non-obvious findings from 8 analyses against a 54-node / 122-edge / 33-XC-edge / 45-prediction / 67-concept-tag dataset.

**Key findings:**
1. 0 candidate-foundational programs target the ADE clique; 5 target the central-axis cluster
2. Shadow-edge test exhausted (1 in v15.6, 0 in v17.1)
3. Bootstrap is the FC absorbing structural-causal constraints (both `constrains` edges point at it)
4. Concept tags and edge structure are non-redundant diagnostic layers; bootstrap connects to FCs with 0 shared concepts
5. Empirical agenda shifting toward open questions (not-yet-tested 10% → 18%)
6. Central-axis cluster's external reach 2.67× ADE clique's

Surfaced 3 new schema candidates including concept-tag consistency review.

### v17.2 — concept-tag consistency pass

**Authored:** Direct edits to 7 canonical FC files — 8 tag additions across 7 FCs. 54 nodes / 122 edges / 0 errors (no structural changes; tagging only).

**Audit rubric established:** each FC should carry tags from at least methodology + structural-connection categories. Applied to identify gaps. Most-changed FCs:
- spacetime-symmetry-groups: +Lie-theory (alignment 0.12 → 0.22)
- cft-bootstrap-exclusion-regions: +anomaly, +topology (alignment 0.38 → 0.50)
- modular-tensor-categories: +topology
- Plus methodology tags for FCs that lacked them

**Major finding:** the v17.1 finding that "bootstrap connects to FCs with 0 shared concepts" partially closed; bootstrap now shares anomaly+topology with all central-axis neighbors but correctly NOT K-theory (since it's not K-theoretic-methodological). The consistency pass surfaces this distinction cleanly.

### v18 — Higgs/Coulomb branches entry

**Authored:** Phase 2 entry #5. 55 nodes / 126 edges / 14 FCs / 37 XC edges.

**Key content:** New FC `higgs-coulomb-branches` with 17 cells across 3 axes (branch-type × rank × theory-family). 4 cross-classification edges including the **third use of `constrains` subtype — and the first that does NOT point at bootstrap** (generalized-symmetries → HCB).

**Major finding:** The v17.1 Finding 3 ("bootstrap is the constrains-target") refined from node-specific to role-specific: `constrains` targets **exclusion-region-style classifications** regardless of which node. HCB is an exclusion-region-style FC (organizes allowed N=2 SCFT branch structures via SUSY+conformal+anomaly constraints).

Central-axis cluster grew to 6 FCs / 15 internal edges. `partial` status edges jumped 2 → 5.

### v18.1 — three SymTFT-incident edges

**Authored:** 3 new aspired/partial edges connecting SymTFT to non-AdS/CFT programs. 55 nodes / 129 edges / 40 XC edges.

**Edges by literature strength:**
1. **MTC composition generalized-symmetries [partial, tensor-network]** — STRONG (Bridgeman-Williamson, Lootens; Levin-Wen string nets ARE SymTFT)
2. **gen-sym derives-from bootstrap [partial, rg-info]** — MEDIUM (C/A-theorem, Cordova-Dumitrescu RG extensions)
3. **cobordism composition gen-sym [aspired, ncg-instance]** — WEAK (K-theoretic structural overlap, no concrete realization)

**First uses of `partial + targeted_by` combination.** Status reflects literature strength: strong/medium → partial+, weak → aspired+. Multi-edge FC pairs jumped 2 → 5. SymTFT-incident programs perfectly balanced (1 each across 4 programs).

**Important user clarification this turn:** "we're not making claims with the map, we're just organizing everything." I had drifted toward treating speculative aspired edges as reasons to skip authoring; user corrected this. The map records what programs target, including weakly-developed connections; the weakness itself is structural information about the program's position. All three edges authored honestly with literature-strength annotations.

### v19 — hadronic-states entry (FIRST PHENOMENON-FC)

**Authored:** Phase 2 entry #6, first explicit phenomenon-FC per the two-layer architecture. 56 nodes / 133 edges / 15 FCs / 44 XC edges.

**Project-level finding:** **The schema carries to phenomenon-level cleanly. No modifications needed.** The two-layer architecture sits on a single schema. Work done before v19 was already load-bearing for the phenomenon layer with no architectural rework required.

**Content:** 20 cells covering established hadrons (π, ρ, J/ψ, Υ, nucleon, Δ, charm/bottom baryons), recently-confirmed exotics (X(3872), pentaquarks, T_cc+), and Mendeleev empty cells (glueballs, hybrid 1-+ mesons, predicted T_bb tetraquark, doubly-bottom baryons). All 5 used status categories exercised; second falsified prediction (H-dibaryon) added.

4 cross-edges: specializes spacetime-symmetry-groups, derives-from sm-rep-content, specializes ade-lie-algebras, derives-from cft-bootstrap-exclusion-regions [aspired, ads-cft].

### v20 — fractional-quantum-hall-states entry (second phenomenon-FC)

**Authored:** Phase 2 entry #7. 57 nodes / 137 edges / 16 FCs / 48 XC edges.

**Schema test results:**
- WORKED: phenomenon ↔ structural-FC connection at scale; multi-edge for phenomenon-FC pair; 4th constrains edge continued role-specific pattern (MTC → FQH-states).
- GAP SURFACED: cell-to-cell pairing across edges cannot be structurally expressed. FQH ν=1/3 ↔ MTC Z_3, FQH 12/5 ↔ MTC Fibonacci — these pairings are narrative-only. **New schema candidate #6: `paired_cell_refs` field.**

19 cells covering Laughlin states (1/3, 1/5, 1/7, 1/9), Jain CF sequence (2/5, 3/7, 4/9), 5/2 with three competing identifications, Read-Rezayi 12/5, doubly-heavy candidates. 4 edges including 4th constrains edge (MTC → FQH-states).

**Patterns sharpened:**
- Phenomenon-FCs vs structural-FCs have empirically clear complementary roles (different cell content, different predictive-yield character, different edge roles).
- `constrains` is now strongly role-specific (4 edges; 3 of 4 target exclusion-region-style FCs including the bootstrap which IS exclusion-region).
- Status distribution stabilized: confirmed ~55%, tension+not-yet-tested ~34%, retro+falsified ~10%.

### v20.1 — pattern analysis v3 (third AI-driven pass)

**Authored:** 6 non-obvious findings from 8 analyses, first conducted under the PROJECT_PATTERN_FINDING_METHODOLOGY framework with the layer-conditional principle.

**Six findings:**
1. **Concept-edge correlation is highly layer-specific** — struct↔struct 11.10×, struct↔phen 2.02×, phen↔phen 2.56×. The v17.1 global 7.64× was entirely a struct-struct phenomenon. Layer-conditional partitioning revealed signal hidden in the unpartitioned data.
2. **Half of physics sectors are entirely uncovered** — 6 of 12 sectors have no FCs (cosmology, astrophysics, BSM non-GUT, gravitational, electromagnetic, macroscopic). Biggest project-direction finding.
3. **Structural backbone coverage 58%; ADE clique doubly-orphaned** — 5 of 12 structural-FCs lack phenomenon partners; 4 of these are ADE FCs (combined with v17.1's 0-programs-target-ADE finding, the ADE clique is closed-within-domain with limited outward reach).
4. **Phenomenon-FCs hang from structural backbone at 86%** — v19 §7.2 prediction confirmed quantitatively.
5. **`constrains` role-specific pattern operationally defined** — explicit definition of "exclusion-region-style classification" applies to all 4 constrains-targets and makes specific predictions about future FCs.
6. **Multi-edges concentrate in central-axis cluster** — all 6 multi-edge pairs involve at least one central-axis FC; each captures multiple DISTINCT structural relationships (no subtype appears twice in any multi-edge).

**Methodology evolution recorded** in PROJECT_PATTERN_FINDING_METHODOLOGY.md §3.3: v20.1 yielded 6 findings from 8 analyses; the layer-conditional apparatus worked as designed; no further methodology revisions needed before next pass.

---

## 3. Cumulative state changes

| Metric | Session start (v16+v17 begin) | **Session end (v20.1)** | Δ |
|---|---|---|---|
| nodes | 53 | **57** | +4 |
| edges | 117 | **137** | +20 |
| formal-classifications | 12 | **16** | +4 |
| FC subtypes (distinct) | 10 | **14** | +4 |
| **Phenomenon-FCs (new category)** | 0 explicit | **4** | +4 |
| Structural-FCs | 12 | **12** | 0 (same set; tags consistency-passed) |
| cross-classification edges | 28 | **48** | +20 |
| `constrains` edges | 1 | **4** | +3 |
| Multi-edge FC pairs | 2 | **6** | +4 |
| `partial + targeted_by` uses | 0 | **2** | +2 (first uses) |
| Total predictions | 38 | **69** | +31 |
| falsified predictions | 1 | **2** | +1 (H-dibaryon) |
| Distinct concept tags | 61 | **~88** | +~27 |
| Programs touching SymTFT | 1 | **4** | +3 |

---

## 4. New project-level documents

1. **PROJECT_GOAL_PHENOMENON_LAYER.md** — the two-layer architecture and destination; natural phenomenon-pairings for each structural-FC; major uncovered sectors; 3 direction-check questions.

2. **PROJECT_PATTERN_FINDING_METHODOLOGY.md** — methodology for pattern-finding passes; layer-conditional principle; historical evolution (v15.6 → v17.1 → v20.1); current 8-analysis apparatus; finding bar; update triggers; operational checklist.

---

## 5. Schema candidates accumulated

6 candidates, below the 8-10 threshold for a schema bump:

1. `experimental_program_subtype` enum extension
2. Rationalize `candidate_targeting` vs `targeted_by`
3. Optional `structural_role` field on FC nodes — **STRONGLY JUSTIFIED** by v20.1 Finding 5
4. `claim` as tolerated alias for `prediction`
5. Per-cell `parent_group` / `dimension_ref` / `symmetry_ref` for multi-grain axes
6. `paired_cell_refs` field on edges — quantified at 8-20% of edges (v20.1 supporting evidence)

---

## 6. Session-level lessons

**For project methodology:**
- The two-layer architecture clarified mid-session changed how authoring decisions are framed without changing the work itself.
- Pattern-finding methodology benefits from being documented explicitly as a project-level reference; ad-hoc analyses miss structural opportunities.
- Layer-conditional analysis is essential after new data layers are introduced.

**For the schema and authoring:**
- The schema designed for structural-FCs carries to phenomenon-FCs without modification.
- `partial + targeted_by` is a useful new status combination expressing "established sub-cases, program extending to full generality."
- `constrains` subtype patterns are role-specific, not node-specific.
- Multi-edges naturally express that two FCs have multiple distinct structural relationships.

**For project direction:**
- 50% of physics sectors remain entirely uncovered.
- Phenomenon-FCs are where the destination map lives; structural-FCs are the scaffolding.
- The ADE clique is doubly-orphaned but that's fine — it's settled-input math.
- Schema bumps should be event-driven (candidate accumulation), not version-cadence-driven.

---

*End of session summary 2026-05-16.*
