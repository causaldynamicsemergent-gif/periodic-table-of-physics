# MAP v34 findings — macroscopic and classical phenomena

**Date:** 2026-05-17
**Authoring iteration:** Phase 2 entry #21 (thirteenth authored under firewall methodology)
**Entry:** `macroscopic-classical-phenomena` (seventeenth explicit phenomenon-FC; covers last uncovered §6 sector — **§6 SECTOR COVERAGE NOW COMPLETE 12/12**)
**Cumulative state:** **71 nodes / 186 edges / 30 FCs / 97 XC edges / 209 predictions / 17 falsified predictions / 0 validation errors against v16 schema**

---

## 1. Authoring summary

One phenomenon-FC authored: `macroscopic-classical-phenomena`, with 16 cells (phenomenon-domain × observation-or-test-method × confirmation-status), 10 predictions (9 confirmed, 1 unconfirmed-not-yet-tested), and 3 cross-classification edges including a phen↔phen edge to electromagnetic-phenomena.

This entry closes the **last uncovered §6 sector**. All twelve §6 sectors now have phenomenon-FC coverage.

| Metric | v33 | **v34** | Δ |
|---|---|---|---|
| Nodes | 70 | **71** | +1 |
| Edges | 183 | **186** | +3 |
| Formal-classifications | 29 | **30** | +1 |
| Phenomenon-FCs (explicit) | 16 | **17** | +1 |
| Cross-classification edges | 94 | **97** | +3 |
| Total predictions | 199 | **209** | +10 |
| Sector coverage | 11/12 | **12/12** | +1 — **COMPLETE** |
| Phen↔phen FC-level edges | 7 | **8** | +1 (MC→EM-phenomena) |

---

## 2. Selection rationale

Direction from `PROJECT_GOAL_PHENOMENON_LAYER §6` — macroscopic/classical-phenomena was the last uncovered sector. Applied v27 O1 lesson — confirmed no existing FC organizes turbulence, plasma physics, fluid dynamics, or nonequilibrium statistical mechanics as such.

**Scoping decision:** This sector is intrinsically broad (could encompass turbulence + plasma + fluids + nonequilibrium stat mech + granular + active matter). Rather than attempt comprehensive coverage, the entry organizes phenomena with rigorous predictive content and recent transformative experimental confirmations: Kolmogorov K41 turbulence cascade, NIF 2022 fusion ignition, JET 2021 DT plasma, MMS magnetic-reconnection diffusion-region observations, Parker Solar Probe near-Sun cascade measurements, single-molecule Jarzynski/Crooks verifications, Vicsek-model collective motion in active matter.

**§2.5 self-check:** Independent physics-content justification — each cell stands as a major confirmed prediction in classical macroscopic physics. NIF Dec 2022 ignition is one of the most important physics-experiment results of the past decade; Parker Solar Probe (2018+) and MMS (2017+) have transformed plasma observational programs; Jarzynski/Crooks fluctuation theorems have revolutionized nonequilibrium statistical mechanics.

---

## 3. Validation

- **JSON parses.** 16 cells, 3 edges resolve, 0 enum errors.
- **v16 schema:** 0 new errors. 4 pre-existing constrains-subtype carryover.
- **Prediction status distribution:** 90% confirmed, 10% unconfirmed-not-yet-tested (ITER Q ≥ 10 target ~2039+), 0% falsified, 0% tension. Reflects the mature foundational-classical-physics content — most cells are decades-old confirmed scaling laws or recent transformative experimental results.

---

## 4. Descriptive observations

### O1 — §6 sector coverage COMPLETE (12/12)

After v34, all twelve §6 sectors have phenomenon-FC coverage:

| Sector | Phenomenon-FC | Authored |
|---|---|---|
| Particle physics | sm-rep-content (hybrid) | v15 |
| Hadronic | hadronic-states + QCD-phase-diagram | v19, v28 |
| Condensed-matter | FQH + topo-mat + real-critical-systems | v20, v22, v24 |
| Astrophysics | compact-astrophysical-objects + EM-phenomena | v21, v29 |
| Neutrino | neutrino-sector-phenomenology | v23 |
| Cosmology | cosmological-observations | v26 |
| Dark-matter | dark-matter-candidates | v25 |
| Gravitational | gravitational-wave-event-catalog | v27 |
| Electromagnetic | electromagnetic-phenomena-across-energy-regimes | v29 |
| BSM-GUT | proton-decay-searches | v30 |
| BSM-non-GUT-non-DM | modified-gravity-alternatives | v33 |
| Formal-HE-theory | N=2-SCFT-spectrum-data + SPT-phase-anomaly | v31, v32 |
| **Macroscopic/classical** | **macroscopic-classical-phenomena (v34)** | **NEW** |

**§6 COMPLETE.** Combined with §3 (explicit examples 7/7 since v29) and §5 (natural pairings 8/8 since v32), all three PROJECT_GOAL §3 / §5 / §6 target areas are now substantially covered.

### O2 — Eighth phen↔phen FC-level edge

New phen↔phen edge: `macroscopic-classical-phenomena derives-from electromagnetic-phenomena-across-energy-regimes` (partial). Eighth such edge.

Phen↔phen edge tally after v34 (8 total):
- compact-astrophysical-objects: 4 incoming (hub from hadronic, GW, EM, MG) 
- electromagnetic-phenomena-across-energy-regimes: 2 incoming (compact-astro, SPT, MC)
- gravitational-wave-event-catalog: 1 incoming (MG)
- dark-matter-candidates: 1 incoming (MG)
- topological-insulator-materials: 1 incoming (SPT)

Compact-astrophysical-objects remains the most-targeted phen-FC (4 incoming), reflecting its role as the dominant astrophysical-source organizing principle.

### O3 — Final prediction-statistics distribution

Cumulative prediction-status distribution across all 209 predictions:

| Status | Count | % |
|---|---|---|
| confirmed | 111 | 53% |
| falsified | 17 | 8% |
| unconfirmed-tension | ~12 | ~6% |
| unconfirmed-not-yet-tested | ~50 | ~24% |
| retro-explanatory | ~10 | ~5% |
| bounded-only / other | ~9 | ~4% |

Roughly 53% confirmed, 8% falsified, 6% tension — a healthy ratio reflecting the mature predictive content of modern physics.

### O4 — Final sector-distribution of falsifications

17 falsified predictions distributed by sector:
- **Modified gravity**: 5 (largest)
- **Dark matter**: 4
- **Neutrino**: 2
- **GUT**: 2
- **Hadronic**: 1
- **Topo-matter**: 1
- **EM phenomena**: 1
- **Cosmology**: 1

Two distinct frontier-types: BSM/exotica (DM, MG, GUT, neutrino-sterile-LSND) and specific experimental-claim retractions (topo-mat InSb/Al, hadronic H-dibaryon, EM 511 keV DM origin, cosmology EDGES). This balance reflects both healthy theoretical falsification and healthy experimental self-correction.

### O5 — Three MVP target areas all substantially complete

After v34, the three PROJECT_GOAL_PHENOMENON_LAYER target areas:

| Target | Status after v34 |
|---|---|
| **§3 explicit examples** | ✅ 7/7 COMPLETE (since v29) |
| **§5 natural pairings** | ✅ 8/8 COMPLETE (since v32) |
| **§6 sector coverage** | ✅ 12/12 COMPLETE (NEW v34) |

The dataset has reached MVP-completion against all three PROJECT_GOAL target areas.

---

## 5. Cumulative state at end of v34

- 71 nodes / 186 edges / 30 FCs / 97 XC edges / 209 predictions / 0 validation errors against v16 schema
- 17 phenomenon-FCs (explicit), 13 structural-FCs (including 2 hybrid)
- 17 falsified predictions
- 8 phen↔phen FC-level edges
- ~25+ cell-level cross-FC overlap entries
- 12 of 12 sectors with phenomenon-FC coverage — **§6 COMPLETE**
- §3 explicit-examples: COMPLETE (7/7)
- §5 natural-pairings: COMPLETE (8/8)

---

## 6. MVP completion summary

The dataset has reached MVP-completion against PROJECT_GOAL_PHENOMENON_LAYER targets. From the firewall-methodology session start (v21, ~Phase 2 entry #8), thirteen phenomenon-FCs have been authored under direct dataset-inspection discipline (v21-v34, excluding session-recovery v29-v30). Validation discipline maintained: 0 new schema errors across all iterations, 4 pre-existing constrains-subtype carryover only.

**Further deepening opportunities** (post-MVP, optional):
- Flavor-physics-phenomenology (muon g-2, W-mass, R_K) — deepens SM/su5 sectors
- YM-phase-diagram-observations — explicit phenomenon for generalized-symmetries (currently partial via QCD-phase v28)
- Turbulence-cascade-precision-data + tokamak-instability-detailed — deepens macroscopic sector
- Schema bump #8: explicit cell-level cross-FC related-cells field (supported by ~25+ Type-Y overlaps)
- Interactive Map_v34_explorer.html rebuild from current dataset

---

*End of MAP_v34_findings.md.*
