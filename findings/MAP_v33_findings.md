# MAP v33 findings — modified-gravity alternatives

**Date:** 2026-05-17
**Authoring iteration:** Phase 2 entry #20 (twelfth authored under firewall methodology)
**Entry:** `modified-gravity-alternatives` (sixteenth explicit phenomenon-FC; covers BSM-non-GUT-non-DM §6 sector; **MAJOR FALSIFICATION ENTRY**)
**Cumulative state:** **70 nodes / 183 edges / 29 FCs / 94 XC edges / 199 predictions / 17 falsified predictions / 0 validation errors against v16 schema**

---

## 1. Authoring summary

One phenomenon-FC authored: `modified-gravity-alternatives`, with 16 cells (gravity-theory-class × observational-test-domain × status-after-tests), 10 predictions (3 confirmed, 5 falsified, 2 unconfirmed-not-yet-tested), and 4 cross-classification edges including 3 phen↔phen edges.

Five new falsified predictions take cumulative falsification count from 12 to 17 — the largest single-iteration increase since v25 (DM, +4 falsified). The post-GW170817 era has been broadly destructive to scalar-tensor and bigravity modified-gravity alternatives.

| Metric | v32 | **v33** | Δ |
|---|---|---|---|
| Nodes | 69 | **70** | +1 |
| Edges | 179 | **183** | +4 |
| Formal-classifications | 28 | **29** | +1 |
| Phenomenon-FCs (explicit) | 15 | **16** | +1 |
| Cross-classification edges | 90 | **94** | +4 |
| Total predictions | 189 | **199** | +10 |
| Falsified predictions | 12 | **17** | +5 (TeVeS, MOND clusters, DGP, Horndeski G_5, Brans-Dicke γ) |
| Phen↔phen FC-level edges | 4 | **7** | +3 (MG→GW, MG→compact-astro, MG→DM) |
| Sector coverage | 10/12 | **11/12** | +1 (BSM-non-GUT-non-DM newly covered) |

---

## 2. Selection rationale

Direction from `PROJECT_GOAL_PHENOMENON_LAYER §6` — BSM-non-GUT-non-DM sector was uncovered. Applied v27 O1 lesson — inspected GR/spacetime-symmetry-groups, dark-matter-candidates, cosmological-observations, gravitational-wave-event-catalog cells to verify distinctness.

**§2.5 self-check:** Modified-gravity alternatives are a major theoretical-and-observational program with substantial constraint history. GW170817 (Aug 2017) was a watershed event: the Δv/c < 7 × 10⁻¹⁶ bound on graviton-speed deviation from c falsified almost all scalar-tensor and bigravity classes within hours of the observation. Solar-system PPN (Cassini), binary-pulsar timing (PSR J0737-3039), EHT BH shadows, LIGO/Virgo waveform tests, and Bullet Cluster lensing have all played falsifying roles. Independent physics-content justification.

---

## 3. Validation

- **JSON parses.** 16 cells, 4 edges resolve, 0 enum errors.
- **v16 schema:** 0 new errors. 4 pre-existing constrains-subtype carryover.
- **Prediction status distribution:** 30% confirmed, 50% falsified, 20% unconfirmed-not-yet-tested, 0% tension. The unusual falsification dominance reflects the post-GW170817 modified-gravity landscape — most natural-parameter modified-gravity predictions have been falsified.

---

## 4. Descriptive observations

### O1 — Largest single-iteration falsification surge since v25

Five new falsifications added in v33:
1. **TeVeS predicts c_T ≠ c** — falsified by GW170817
2. **Pure MOND on cluster scales** — falsified by Bullet Cluster (Clowe et al. 2006)
3. **DGP self-accelerating branch** — falsified by combined cosmography + GW170817
4. **Horndeski G_5 + most G_4 terms** — falsified by GW170817
5. **Brans-Dicke natural γ ≠ 1** — falsified by Cassini (Bertotti et al. 2003)

Cumulative falsified count: 12 → 17. Last comparable jump was v25 (DM): +4 falsified (DAMA/LIBRA, MACHO, PBH-LIGO, CDMS-II Si).

### O2 — Three new phen↔phen FC-level edges

Three new phen↔phen edges in v33:
- `modified-gravity-alternatives specializes gravitational-wave-event-catalog` (partial)
- `modified-gravity-alternatives specializes compact-astrophysical-objects` (partial)
- `modified-gravity-alternatives derives-from dark-matter-candidates` (partial)

Cumulative phen↔phen FC-level edges: 4 → 7.

Updated tally of all phen↔phen edges:

| # | From | To | Subtype | Status |
|---|---|---|---|---|
| 1 | compact-astrophysical-objects | hadronic-states | derives-from | partial |
| 2 | gravitational-wave-event-catalog | compact-astrophysical-objects | specializes | partial |
| 3 | electromagnetic-phenomena | compact-astrophysical-objects | derives-from | partial |
| 4 | SPT-phase-anomaly | topological-insulator-materials | specializes | partial |
| 5 | modified-gravity-alternatives | gravitational-wave-event-catalog | specializes | partial |
| 6 | modified-gravity-alternatives | compact-astrophysical-objects | specializes | partial |
| 7 | modified-gravity-alternatives | dark-matter-candidates | derives-from | partial |

Compact-astrophysical-objects: now 4 phen↔phen edges (hub status confirmed)
Modified-gravity-alternatives: 3 outgoing phen↔phen edges (new hub from BSM side)

### O3 — Falsification distribution by sector after v33

Cumulative 17 falsified predictions by sector:
- **Modified gravity** (NEW): 5 (TeVeS, MOND clusters, DGP, Horndeski G_5, Brans-Dicke γ)
- **Dark matter**: 4 (DAMA/LIBRA, MACHO, PBH-LIGO, CDMS-II Si)
- **Neutrino**: 2 (Heidelberg-Moscow 0νββ, LSND 3+1 sterile)
- **GUT**: 2 (proton-decay tree, Georgi-Glashow minimal SU(5))
- **Hadronic**: 1 (H-dibaryon)
- **Topo-matter**: 1 (InSb/Al 2018 MZM)
- **EM phenomena**: 1 (Galactic 511 keV DM origin)
- **Cosmology**: 1 (EDGES 21cm)

Modified gravity becomes the largest single sector contributor to falsifications (5). The post-GW170817 landscape is the most active falsification frontier.

### O4 — BSM-non-GUT-non-DM sector closed

v33 covers the BSM-non-GUT-non-DM §6 sector. Sector coverage: 11/12. Only `macroscopic/classical-phenomena` remains uncovered.

### O5 — Crossing 200-prediction threshold

v33 total predictions: 199 (one short of 200). Across the project: 16 phenomenon-FCs averaging ~10 predictions + 12 structural-FCs averaging ~3 predictions ≈ 196. The dataset is now beyond reasonable typical-paper scope and approaches reference-database scale.

---

## 5. Cumulative state at end of v33

- 70 nodes / 183 edges / 29 FCs / 94 XC edges / 199 predictions / 0 validation errors against v16 schema
- 16 phenomenon-FCs (explicit), 13 structural-FCs (including 2 hybrid)
- **17 falsified predictions** (5 type-A + 12 type-B; type-B now dominates with modified-gravity surge)
- 7 phen↔phen FC-level edges
- ~25+ cell-level cross-FC overlap entries
- 11 of 12 sectors with phenomenon-FC coverage
- §3 explicit-examples: COMPLETE
- §5 natural-pairings: COMPLETE
- §6 sector coverage: 11/12 (only macroscopic/classical remaining)

---

## 6. Final remaining MVP candidates

Only one sector remains:
1. **Macroscopic / classical phenomena** — broad scope (turbulence, plasma physics, classical statistical mechanics, fluid dynamics). Would need careful scoping to fit a single FC. Closes §6 entirely.

After that single entry, the MVP target areas (§3 + §5 + §6) would all be substantially complete.

---

*End of MAP_v33_findings.md.*
