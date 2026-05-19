# MAP v29 findings — electromagnetic phenomena across energy regimes

**Date:** 2026-05-17
**Authoring iteration:** Phase 2 entry #16 (eighth authored under firewall methodology)
**Entry:** `electromagnetic-phenomena-across-energy-regimes` (twelfth explicit phenomenon-FC; first FC in electromagnetic-phenomena sector; closes PROJECT_GOAL_PHENOMENON_LAYER §3 explicit-examples list — last unauthored named example)
**Cumulative state:** **66 nodes / 169 edges / 25 FCs / 80 XC edges / 159 predictions / 0 validation errors against v16 schema**

---

## 1. Authoring summary

One phenomenon-FC authored: `electromagnetic-phenomena-across-energy-regimes`, with 17 cells across 3 axes (energy-regime × source-physics-mechanism × observational-status), 10 predictions (7 confirmed, 3 unconfirmed-not-yet-tested), and 4 cross-classification edges including a phen↔phen edge to compact-astrophysical-objects (third such FC-level edge in the dataset).

| Metric | v28 | **v29** | Δ |
|---|---|---|---|
| Nodes | 65 | **66** | +1 |
| Edges | 165 | **169** | +4 |
| Formal-classifications | 24 | **25** | +1 |
| Phenomenon-FCs (explicit) | 11 | **12** | +1 |
| Cross-classification edges | 76 | **80** | +4 |
| Total predictions | 149 | **159** | +10 |
| Phen↔phen FC-level edges | 2 | **3** | +1 (em→compact-astro specializes) |
| §3 explicit examples authored | 6/7 | **7/7** | +1 — COMPLETE |
| Sector coverage | 8/12 | **9/12** | +1 (electromagnetic newly covered) |

---

## 2. Selection rationale

Authoring direction from `PROJECT_GOAL_PHENOMENON_LAYER` §3 explicit-examples list (electromagnetic-phenomena was the last unauthored). Applied v27 O1 lesson — direct dataset inspection confirmed no existing FC organizes EM phenomena as such (compact-astro and GW-catalog reference EM but neither organizes the spectrum itself).

**§2.5 self-check:** EM astronomy spans ~16 orders of magnitude in photon energy from µeV radio to PeV gamma; each band has distinct instrumentation, source populations, physical mechanisms; recent transformative results (LHAASO 2021 PeV gamma, EHT 2019/2022 BH shadows, FRB-magnetar identification 2020, AT2017gfo multi-messenger 2017). Independent physics-content justification.

---

## 3. Validation

- **JSON parses.** 17 cells unique, 4 edges have all cell_refs resolving, axis values in declared enums.
- **v16 schema:** 0 new errors. 4 pre-existing constrains-subtype carryover.
- **This entry's prediction status distribution:** 70% confirmed, 30% unconfirmed-not-yet-tested, 0% falsified, 0% tension. EM astronomy is mature — high-confidence confirmed predictions dominate. Mendeleev structure (Hawking radiation, axion-photon coupling effects) drives the unconfirmed-not-yet-tested cells.

---

## 4. Descriptive observations

### O1 — §3 explicit-examples list complete

After v29, all seven `PROJECT_GOAL_PHENOMENON_LAYER §3` named phenomenon-FC examples are authored: compact astrophysical objects (v21), hadronic states (v19), dark-matter candidates (v25), critical phenomena in real materials (v24), fractional quantum Hall states (v20), cosmological observations (v26), and now electromagnetic phenomena across energy regimes (v29). 

This is a significant MVP milestone — the explicitly-named example phenomenon-FCs from the project goal document are all in place.

### O2 — Third phen↔phen FC-level edge

New phen↔phen edge: `electromagnetic-phenomena-across-energy-regimes specializes compact-astrophysical-objects` (partial status). Third such edge after v21 (compact-astro→hadronic-states, derives-from) and v27 (gravitational-wave-event-catalog→compact-astro, specializes).

Pattern observation: compact-astrophysical-objects is now the target of two phen↔phen edges (from GW catalog v27 and from EM phenomena v29) — making it a hub for phenomenon-level connections. This reflects compact objects being the dominant astrophysical sources for both GW signals and high-energy EM emission.

### O3 — High cell-level cross-FC overlap density

This entry has the highest cell-level cross-FC overlap of any phenomenon-FC to date:
- cell-em-CMB-blackbody ↔ cosmological-observations cell-cosm-CMB-Planck-acoustic-peaks
- cell-em-GRB-short-BNS ↔ gravitational-wave-event-catalog cell-gwe-GW170817
- cell-em-AT2017gfo-kilonova ↔ gravitational-wave-event-catalog cell-gwe-multi-messenger-coincidence
- cell-em-axion-photon-coupling-bounds ↔ dark-matter-candidates axion cells
- cell-em-Hawking-radiation-PBH ↔ dark-matter-candidates PBH cells
- cell-em-AGN-jet-broadband ↔ neutrino-sector-phenomenology IceCube-blazar
- 9 cells reference compact-astro cells via the phen↔phen edge

EM phenomena is the most-cross-referencing phenomenon-FC — reflecting EM's role as the universal observational medium for almost all astrophysical phenomena.

### O4 — Cumulative cell-level cross-FC overlap reaches ~16 entries

Across all phenomenon-FCs, cell-level overlap entries (Type-Y per v27 O2):
- v23: 1 (SN 1987A)
- v25: 5 (PBHs ×3, sterile-ν ×2)
- v26: 2 (Σm_ν, Ω_DM)
- v27: implicit but counted in v27 findings: 1 phen-phen direct + several cell overlaps
- v28: 2 (NS-interior, O(4) chiral)
- v29: ~6 distinct cell-level cross-FCs documented

The v25 O3 schema-friction observation (cell-level cross-FC link field would express this directly) is now strongly supported. With ~16 cell-level cross-FC overlaps and 3 phen↔phen FC-level edges, the dataset structurally supports both phen↔phen edge subtypes (Type-X directional) and cell-level overlap fields (Type-Y content overlap) — but only Type-X has schema representation. Strong candidate for schema bump (#8).

### O5 — Sector coverage: 9 of 12 sectors

After v29: phenomenon-FCs cover particle physics (sm-rep hybrid), hadronic (×2), condensed-matter (×3), astrophysics (×2), neutrino, BSM-DM, cosmology, gravitational/transient, electromagnetic. Still uncovered: macroscopic/classical-phenomena, BSM-non-GUT-non-DM, formal-HE-theory-phenomenology.

---

## 5. Cumulative state at end of v29

- 66 nodes / 169 edges / 25 FCs / 80 XC edges / 159 predictions / 0 validation errors against v16 schema
- 12 phenomenon-FCs (explicit)
- 12 structural-FCs
- 11 falsified predictions (no new in v29)
- 3 phen↔phen FC-level edges (compact-astro→hadronic, GW→compact-astro, EM→compact-astro)
- ~16 cell-level cross-FC overlap entries
- ads-cft-instance: 5 aspired + 1 partial (unchanged from v28)
- 9 of 12 sectors with phenomenon-FC coverage
- §3 explicit-examples list: COMPLETE (7/7)

---

*End of MAP_v29_findings.md.*
