# MAP v21 findings — compact astrophysical objects

**Date:** 2026-05-16 (continuing-session iteration; first authoring step after handoff)
**Authoring iteration:** Phase 2 entry #8
**Entry:** `compact-astrophysical-objects` (third explicit phenomenon-FC)
**Sector:** Astrophysics (first FC in this sector)
**Cumulative state:** **58 nodes / 141 edges / 17 FCs / 52 XC edges / 79 predictions / 0 validation errors against v16 schema**

---

## 1. Authoring summary

A single phenomenon-FC was authored: `compact-astrophysical-objects`, with 17 cells across 3 axes (object-class × mass-regime × observational-status), 10 predictions exercising 4 of 5 status categories, and 4 cross-classification edges to existing structural-FCs.

The entry is the third explicit phenomenon-FC (after `hadronic-states` v19 and `fractional-quantum-hall-states` v20) and the **first FC in the astrophysics sector** — directly addressing v20.1 Finding 2 (half of physics sectors entirely uncovered). Astrophysics goes from "neither structural nor phenomenon" to "phenomenon-only" coverage.

| Metric | v20.1 | **v21** | Δ |
|---|---|---|---|
| Nodes | 57 | **58** | +1 |
| Edges | 137 | **141** | +4 |
| Formal-classifications | 16 | **17** | +1 |
| Phenomenon-FCs | 4 (incl. implicit sm-rep) | **5** | +1 |
| Cross-classification edges | 48 | **52** | +4 |
| Total predictions | 69 | **79** | +10 |
| Falsified predictions | 2 | **3** | +1 (PBH-as-100%-DM in LIGO window) |
| Astrophysics-sector FCs | 0 | **1** | +1 |
| Concept tags (approx) | ~97 | ~110 | +~13 |

---

## 2. The EOS co-authoring decision

The handoff document posed the central authoring question: should an equation-of-state structural-FC be co-authored, or should compact-astrophysical-objects be authored standalone?

**Decision: author standalone.** Reasoning, recorded for future authoring discipline:

1. **The phenomenon-FC IS the destination.** Per `PROJECT_GOAL_PHENOMENON_LAYER` §3, structural-FCs are scaffolding; phenomenon-FCs are the destination. The marginal value of one more phenomenon-FC in an uncovered sector exceeds the marginal value of one more structural-FC, even an adjacent one.

2. **EOS classification is itself partial/contested.** Authoring an EOS structural-FC well requires care: hadronic-only, hybrid-hadron-quark, quark-matter, color-superconducting-phase, and exotic-matter classes are all open at the level of confirming-which-applies-in-NS-interiors. The classification axes themselves are partly contested (density-organization vs symmetry-organization). This deserves its own iteration.

3. **Existing structural-FC connections are sufficient.** Compact-astro has 4 clean edges (spacetime-symmetry-groups, hadronic-states, sm-rep-content, bootstrap-via-ads-cft) covering the structural-backbone-attachment requirement. No edge feels missing.

4. **Direction-check questions all pass for standalone authoring.** §7 Q1 (does this contribute to the phenomenon layer? — YES, directly). §7 Q2 (which sector? — astrophysics, uncovered). §7 Q3 (could this be phenomenon-FC? — YES, it IS one). All three answers green-light standalone authoring.

EOS classification is recorded as a planned future structural-FC in `related_entries` and is the natural Phase 2 entry #9 candidate.

---

## 3. Patterns this entry sharpens

### 3.1 Phenomenon-FC trajectory: third in a row, all hang from structural backbone

Three consecutive phenomenon-FC authoring steps (v19 hadrons, v20 FQH, v21 compact-astro) have produced FCs that **attach to the structural backbone via 3-4 cross-classification edges each**. The connection pattern is consistent:

| Phenomenon-FC | XC-edge count | Subtypes used | Multi-edges with other FCs |
|---|---|---|---|
| hadronic-states (v19) | 4 | specializes, derives-from (×2), specializes | 0 |
| fractional-quantum-hall-states (v20) | 4 | categorically-equivalent, derives-from (×2), constrains | 1 (MTC, multi-edge) |
| compact-astrophysical-objects (v21) | 4 | specializes, derives-from (×3) | 0 |

The v20.1 Finding 4 ("phenomenon-FCs hang from structural backbone at 86%") continues to hold and now extends to a third phenomenon-FC. **The two-layer architecture works empirically.**

### 3.2 `ads-cft-instance` is the most-claimed-but-least-discharged unification program

Three phenomenon-FCs now have aspired `derives-from→cft-bootstrap-exclusion-regions` edges with `targeted_by: [ads-cft-instance]`:
- hadrons → bootstrap [aspired, ads-cft] (v19) — holographic QCD
- FQH → bootstrap [aspired, ads-cft] (v20) — bootstrap-bound for FQH edge CFTs
- compact-astro → bootstrap [aspired, ads-cft] (v21) — holographic BH thermodynamics

**Three of five phenomenon-FCs in the map now claim AdS/CFT-mediated bootstrap derivation as a future unification target.** No other unification program has this much phenomenon-FC reach. This is a structural fact: AdS/CFT is the most widely-aspired unification program in the map's phenomenon layer.

This is non-obvious because in v15.6 the program was just one of several candidate-foundational programs. By v21 it's the de-facto convergent target for phenomenon-FC→structural-FC unification claims. The structural significance: **`cft-bootstrap-exclusion-regions` is becoming the central absorbing-FC for phenomenon-derivation claims**, paralleling its earlier role as the central absorbing-FC for `constrains` edges (v17.1 finding).

### 3.3 Third falsified prediction: BSM-overreach pattern

Falsified predictions in the map are now:
1. Proton decay via SU(5) GUT (tree-level X/Y exchange, predicted τ_p ~ 10^29-31 yr; Super-Kamiokande exclusion at τ_p > 1.6 × 10^34 yr)
2. H-dibaryon bound state below 2m(Λ) (Jaffe 1977 prediction; lattice and experiment excluded)
3. **NEW:** PBH = 100% of dark matter in 1-100 M_sun (Bird et al. 2016 LIGO-mass PBH-DM proposal; microlensing + GW-rate constraints reduce to ≲ 0.1%)

**Pattern:** all three falsified predictions are BSM-style or beyond-conventional proposals that aimed at unexplained phenomena (proton decay → matter-antimatter asymmetry; H-dibaryon → exotic hadrons; PBH-DM → dark matter identity). None of the three falsified predictions are settled-physics extrapolations. This is consistent with the structure of physics: settled-physics predictions are rarely falsified (they wouldn't be settled if they were); falsified predictions concentrate in the regions where physicists are proposing new content. **The falsified-prediction distribution is a partial map of where attempted-new-physics has been over-reached.**

### 3.4 Tag pool: astrophysics vocabulary substantially added

Pre-v21 concept tags emphasized condensed matter, formal HE theory, and particle physics. v21 introduces ~13 new tags spanning methodology (general-relativity, hydrostatic-equilibrium, gravitational-wave-astronomy, electromagnetic-observation, equation-of-state-modeling) and physical content (compact-object, neutron-star, black-hole, white-dwarf, dense-matter, gravitational-wave-source, no-hair-theorem, black-hole-thermodynamics, holography).

The methodology-vs-content split (v17.2 audit framework) is preserved: 5 methodology tags, 4 connection tags, 6 content tags. Per the v17.2 audit framework requirement (≥1 methodology AND ≥1 connection), the entry passes cleanly.

The new tags create vocabulary overlap with:
- spacetime-symmetry-groups (`diffeomorphism-invariance`, Lie-theory-adjacent)
- hadronic-states (`dense-matter` adjacent to hadronic-bound-state)
- cft-bootstrap-exclusion-regions (`holography` adjacent to bootstrap)

This will be visible in the next layer-conditional concept-edge correlation analysis (A1 in the v20.1 methodology) — compact-astro should show non-zero Jaccard overlap with the three above, predicting the three edges that are in fact authored. **The tags-predict-edges signal should sharpen for the struct↔phen partition with this entry**.

### 3.5 First sector-coverage transition

v20.1 Finding 2 identified 6 uncovered sectors (cosmology, astrophysics, BSM-non-GUT, gravitational, electromagnetic, macroscopic). v21 transitions astrophysics from `(structural=NO, phenomenon=NO)` → `(structural=NO, phenomenon=YES)`. **First sector-state-transition since the v20.1 finding was authored.**

This is the cleanest possible direct response to a pattern-finding pass: a finding identified a gap; the next authoring step closed (part of) that gap; the closure happens with no schema changes required.

Remaining uncovered sectors (5 of original 6):
- Cosmology — still NEITHER (cc-frontier and cosmological-models are stratum-2 architecture/regime-content, not FCs)
- BSM-non-GUT — still NEITHER (dark-matter, axion, neutrino-mass, leptoquark phenomenology unauthored)
- Gravitational — partial (spacetime-symmetry-groups covers part; gravitational-phenomenology proper still missing)
- Electromagnetic — still NEITHER
- Macroscopic — still NEITHER

**Astrophysics now joins (partly) gravitational and (partly) hadronic in the "phenomenon-only" coverage class.** Sector coverage by count: 4 structural-only, 3 phenomenon-only, 1 both (sm-rep counts as both via the implicit-phenomenon argument), 4 still uncovered. The reframing is now: **5 of 12 sectors have NO coverage at all; 7 of 12 have some coverage**.

### 3.6 Observational-status as a load-bearing axis

The `observational-status` axis (confirmed-individual, confirmed-population, candidate-individual, candidate-population, predicted-only, excluded-as-DM-fraction) is a new axis kind in the map. Previous phenomenon-FCs used physical axes (J^PC, mass-regime, filling-fraction). Compact-astro adds an **epistemic axis** distinguishing observational state.

This is structurally important because the empty-cell logic differs:
- A "predicted-only" cell (e.g., quark-star) is a Mendeleev-style empty cell awaiting discovery.
- An "excluded-as-DM-fraction" cell (e.g., LIGO-mass PBHs at ≳ 1% DM) is a Mendeleev-style **negatively-empty** cell — predicted then excluded.
- A "candidate-population" cell (e.g., IMBHs at 10^2-10^5 M_sun) is a partially-populated cell.

**The "excluded" status is a new category of structural information**: where physics has proposed and then ruled out. This complements the standard "predicted-but-not-yet-observed" Mendeleev empty cell. Other phenomenon-FCs might benefit from explicit observational-status axes (e.g., dark-matter-candidates would have a similar status structure with most cells in "excluded" or "candidate" states).

Schema candidate noted: **observational-status as a standard axis type**, parallel to how `mass-regime` has become a recurring phenomenon-FC axis.

---

## 4. The six findings distilled

1. **Three consecutive phenomenon-FC authoring steps validate the two-layer architecture.** Hadrons (v19), FQH (v20), and compact-astro (v21) each attach to the structural backbone via 3-4 cross-classification edges. No phenomenon-FC has been impossible to wire into the existing scaffolding. The structural-FC pre-work was load-bearing.

2. **`ads-cft-instance` is the most-claimed phenomenon-FC unification program.** 3 of 5 phenomenon-FCs aspire to bootstrap-CFT derivation via the same program. No other unification program approaches this reach. The bootstrap is becoming the central absorbing-FC for phenomenon-derivation claims (parallel to its earlier role as central absorber for `constrains` edges).

3. **The 3 falsified predictions in the map are all BSM-overreach.** Settled-physics predictions don't get falsified (definitionally); falsified predictions concentrate in attempted-new-physics. This means the falsified-prediction distribution is a partial structural map of which proposed new content has been ruled out — proton decay tree-level, H-dibaryon, and PBH-DM in LIGO mass window now form that catalog.

4. **First sector-state-transition response to a pattern-finding pass.** v20.1 Finding 2 (uncovered sectors) was authored 2026-05-16; v21 authored 2026-05-16 (same session continuation) closes part of it. Astrophysics goes from `(struct=NO, phen=NO)` → `(struct=NO, phen=YES)`. No schema changes required for the closure. Demonstrates the methodology working as designed.

5. **Observational-status as an axis is structurally novel and may be replicable.** The compact-astro classification uses a 6-value epistemic axis (confirmed-individual / confirmed-population / candidate-individual / candidate-population / predicted-only / excluded-as-DM-fraction). The "excluded" value names a new structural category: cells where physics proposed-and-ruled-out. Other phenomenon-FCs (dark-matter-candidates, exotic-hadrons) would benefit from similar axes. Promoted to schema candidate #7.

6. **The EOS-co-authoring deferral demonstrates direction-check discipline.** The handoff posed a real co-authoring temptation. The PROJECT_GOAL_PHENOMENON_LAYER §7 direction-check questions resolved the question by orienting toward "what most advances the destination per unit authoring effort." Standalone authoring won. The decision is recorded for future authoring iterations facing similar co-authoring temptations.

---

## 5. Schema candidates accumulated (now 7)

1. `experimental_program_subtype` enum extension
2. Rationalize `candidate_targeting` vs `targeted_by`
3. Optional `structural_role` field on FC nodes — strongly justified by v20.1 Finding 5
4. `claim` as tolerated alias for `prediction`
5. Per-cell `parent_group` / `dimension_ref` / `symmetry_ref` for multi-grain axes
6. `paired_cell_refs` field on edges — quantified at 8-20% of edges (v20.1)
7. **NEW: standard `observational-status` axis kind for phenomenon-FCs** — load-bearing for compact-astro; predicted to be load-bearing for dark-matter-candidates, exotic-hadrons, gravitational-wave-event-catalog, and similar future phenomenon-FCs.

**7 of 8-10 threshold.** One more candidate from the next authoring iteration would trigger a v17 schema bump consideration.

---

## 6. Recommended next steps

The handoff document's pattern-analysis-driven priority list still holds. After this v21 authoring step, the highest-priority remaining items in order:

1. **Phase 2 entry #9 — dense-matter-equation-of-state structural-FC** (the EOS-FC deferred from v21). Would close the structural-FC pairing for compact-astrophysical-objects and provide scaffolding for a future cosmological-FC. Sector served: gravitational/nuclear; structural backbone for compact-astrophysical-objects.

2. **Phase 2 entry #10 — dark-matter-candidates phenomenon-FC.** Sector served: BSM-non-GUT (currently uncovered). Cells would include WIMPs, axions, sterile neutrinos, primordial BHs (cross-edge with compact-astro!), self-interacting DM, fuzzy DM. The cross-edge with compact-astro on PBHs would be a new pattern: phenomenon-FC↔phenomenon-FC with shared content cells, potentially creating the first instance where `paired_cell_refs` (schema candidate #6) becomes load-bearing — strong promotion signal.

3. **Phase 2 entry #11 — cosmological-observations phenomenon-FC.** Sector served: cosmology (currently uncovered). Cells: CMB acoustic peaks, BAO features, dark-energy parameters, inflation observables, Hubble-tension data points.

After entries #9-11 the map would cover: structural — astrophysics scaffolded; phenomenon — astrophysics + BSM-non-GUT + cosmology added. Sector coverage would go from 7/12 to 10/12.

4. **Alternative path: v17 schema bump.** If entry #9 (EOS) surfaces another schema candidate, that would bring the count to 8, which is the lower threshold. A schema bump at that point would let candidates 3 (`structural_role`) and 7 (`observational-status` axis) become first-class.

5. **Pattern analysis v4** — recommended cadence: after 3-4 more authoring iterations OR after a schema bump. The v20.1 findings still mostly apply; running a new pass too early would not produce new findings beyond noise.

---

## 7. Cumulative state at end of v21

- 58 nodes / 141 edges / 17 FCs / 52 XC edges / 79 predictions / 0 validation errors against v16 schema
- 5 phenomenon-FCs (sm-rep-content implicit; hadrons + FQH + compact-astro explicit; su5 partial)
- 12 structural-FCs (unchanged from v20)
- 6 multi-edge FC pairs (unchanged — no new multi-edges in v21)
- 4 `constrains` edges (unchanged from v20)
- 3 falsified predictions (proton decay tree-level, H-dibaryon, PBH-as-100%-DM-in-LIGO-window)
- 4 sectors with some-coverage growing to 7 (astrophysics added as phenomenon-only)
- ~110 distinct concept tags
- 7 schema candidates accumulated

---

*End of MAP_v21_findings.md.*
