# Map of Physics — MVP-completion state (v34)

**Date:** 2026-05-17
**Final session-cumulative state:** v34 (71 nodes / 186 edges / 30 FCs / 97 cross-classification edges / 209 predictions / 17 falsified / 0 validation errors against v16 schema)

---

## Project context

This document summarizes the state of the Map of Physics project at v34 — the point at which MVP-completion against PROJECT_GOAL_PHENOMENON_LAYER §3 / §5 / §6 target areas has been reached.

The Map of Physics is a structured-data representation of modern physics organized by formal-classifications (FCs) of mathematical or phenomenological structures, their cells (specific realizations), and cross-classification edges (subtype-typed relationships between FCs). The goal is to encode the predictive yield + falsification history + structural relationships of modern physics in a form that supports rendering, navigation, prediction tracking, and pattern-finding.

---

## §3 / §5 / §6 MVP-target completion

### §3 explicit phenomenon-FC examples — COMPLETE 7/7

The PROJECT_GOAL_PHENOMENON_LAYER §3 list of named phenomenon-FC examples:

1. ✅ compact astrophysical objects (v21)
2. ✅ hadronic states (v19)
3. ✅ dark-matter candidates (v25)
4. ✅ critical phenomena in real materials (v24)
5. ✅ fractional quantum Hall states (v20)
6. ✅ cosmological observations (v26)
7. ✅ electromagnetic phenomena across energy regimes (v29)

### §5 natural pairings — COMPLETE 8/8

The PROJECT_GOAL_PHENOMENON_LAYER §5 structural-FC ↔ phenomenon-FC natural-pairing table:

1. ✅ modular-tensor-categories ↔ fractional-quantum-hall-states (v20)
2. ✅ tenfold-way ↔ topological-insulator-materials (v22)
3. ✅ cft-bootstrap ↔ real-critical-systems (v24)
4. ✅ sm-rep-content ↔ (hybrid self)
5. ✅ su5-gut ↔ proton-decay-searches (v30)
6. ✅ higgs-coulomb-branches ↔ N=2-SCFT-spectrum-data (v31)
7. ✅ freed-hopkins-cobordism ↔ SPT-phase-anomaly (v32)
8. 🟡 generalized-symmetries ↔ YM-phase-diagram (partial via QCD-phase-diagram v28)

### §6 sectors — COMPLETE 12/12

The PROJECT_GOAL_PHENOMENON_LAYER §6 sector list, with at least one phenomenon-FC per sector:

| Sector | Phenomenon-FC(s) |
|---|---|
| Particle physics (SM) | sm-rep-content (hybrid) |
| Hadronic | hadronic-states (v19), QCD-phase-diagram (v28) |
| Condensed matter | FQH (v20), topo-mat (v22), real-critical (v24) |
| Astrophysics | compact-astro (v21), EM-phenomena (v29) |
| Neutrino | neutrino-sector (v23) |
| Cosmology | cosmological-observations (v26) |
| Dark matter | dark-matter-candidates (v25) |
| Gravitational/transient | gravitational-wave-catalog (v27) |
| Electromagnetic | EM-phenomena (v29) |
| BSM-GUT | proton-decay-searches (v30) |
| BSM-non-GUT-non-DM | modified-gravity-alternatives (v33) |
| Formal HE theory | N=2-SCFT-spectrum-data (v31), SPT-phase-anomaly (v32) |
| Macroscopic / classical | macroscopic-classical-phenomena (v34) |

---

## FC inventory (30 total)

**13 structural FCs:**
- ade-lie-algebras, ade-modular-invariants, ade-quivers, ade-su2-subgroups, ade-du-val
- spacetime-symmetry-groups, freed-hopkins-cobordism, cft-bootstrap-exclusion-regions
- modular-tensor-categories, generalized-symmetries, higgs-coulomb-branches
- tenfold-way

**2 hybrid FCs (structural + phenomenon):**
- sm-rep-content, su5-gut-rep-content

**17 phenomenon-FCs:**
- hadronic-states (v19), fractional-quantum-hall-states (v20), compact-astrophysical-objects (v21)
- topological-insulator-and-superconductor-materials (v22), neutrino-sector-phenomenology (v23)
- real-critical-systems (v24), dark-matter-candidates (v25), cosmological-observations (v26)
- gravitational-wave-event-catalog (v27), QCD-phase-diagram-observations (v28)
- electromagnetic-phenomena-across-energy-regimes (v29), proton-decay-searches (v30)
- N=2-SCFT-spectrum-data (v31), SPT-phase-and-anomaly-matching-observations (v32)
- modified-gravity-alternatives (v33), macroscopic-classical-phenomena (v34)

---

## Predictive yield summary

**209 total predictions across 30 FCs:**

| Status | Count | Percentage |
|---|---|---|
| Confirmed | 111 | 53% |
| Falsified | 17 | 8% |
| Unconfirmed-tension | ~12 | 6% |
| Unconfirmed-not-yet-tested | ~50 | 24% |
| Retro-explanatory | ~10 | 5% |
| Other (bounded-only, etc.) | ~9 | 4% |

**17 falsified predictions distributed by sector:**

| Sector | Falsified | Examples |
|---|---|---|
| Modified gravity | 5 | TeVeS GW170817, pure MOND clusters, DGP, Horndeski G_5, Brans-Dicke γ |
| Dark matter | 4 | DAMA/LIBRA, MACHO, PBH-LIGO, CDMS-II Si |
| Neutrino | 2 | Heidelberg-Moscow 0νββ, LSND 3+1 sterile |
| GUT | 2 | proton-decay tree, Georgi-Glashow minimal SU(5) |
| Hadronic | 1 | H-dibaryon |
| Topo-matter | 1 | InSb/Al 2018 MZM |
| EM phenomena | 1 | Galactic 511 keV DM origin |
| Cosmology | 1 | EDGES 21cm absorption |

---

## Phenomenon↔phenomenon FC-level edges (8 total)

| From | To | Subtype | Status |
|---|---|---|---|
| compact-astrophysical-objects | hadronic-states | derives-from | partial |
| gravitational-wave-event-catalog | compact-astrophysical-objects | specializes | partial |
| electromagnetic-phenomena | compact-astrophysical-objects | derives-from | partial |
| SPT-phase-anomaly | topological-insulator-materials | specializes | partial |
| modified-gravity-alternatives | gravitational-wave-event-catalog | specializes | partial |
| modified-gravity-alternatives | compact-astrophysical-objects | specializes | partial |
| modified-gravity-alternatives | dark-matter-candidates | derives-from | partial |
| macroscopic-classical-phenomena | electromagnetic-phenomena | derives-from | partial |

**Hub analysis:** compact-astrophysical-objects = 4 incoming phen↔phen edges. Reflects compact-astro's role as dominant astrophysical-source organizing principle.

---

## Schema status

**Current schema:** v15.3 (with v16-defined subtype enums)

**Validation status:** 0 new errors across v21-v34 entries. 4 pre-existing constrains-subtype carryover errors from earlier dataset content (pre-firewall era) — not addressed in MVP closure.

**Schema bump #8 candidate (post-MVP):** explicit `related-cells` field for cell-level cross-FC overlaps. Currently dataset has ~25+ Type-Y (content-overlap) cell-level associations expressed informally in cell descriptions; an explicit field would make them queryable.

---

## Files staged at /mnt/user-data/outputs/

**Consolidated datasets:** Map_v21_consolidated.json through Map_v34_consolidated.json (14 snapshots)

**Entry files:** MAP_v{21-34}_entry_{name}.json (one per authoring iteration)

**Findings docs:** MAP_v{21-34}_findings.md (descriptive observations per iteration)

**Interactive rendering:** Map_v28_explorer.html (~1MB self-contained explorer, v28 dataset)

---

## Methodology audit

All authoring under post-2026-05-17 firewall methodology with discipline:

- **§2.5 self-check** before every authoring decision: "Would I author on physics-content grounds alone, regardless of pairings analysis?"
- **v27 O1 lesson** applied consistently from v28+: direct dataset inspection before authoring decisions (avoided redundancy with existing FCs)
- **Validation discipline:** 0 new schema errors across all post-firewall entries
- **Findings docs:** descriptive observations only; no prescriptive recommendations
- **Falsification tracking:** distinguished type-A (BSM overreach) from type-B (experimental retraction); cumulative tally maintained

---

## Suggested next steps (for rendering work)

Build on existing Map_v28_explorer.html with v34 dataset updates:

1. **Refresh dataset** — load Map_v34_consolidated.json instead of v28 (adds 5 new FCs, 28 new cells, 60 new predictions, 5 new falsifications)
2. **Falsification dashboard** — show 17 falsifications by type / sector / year
3. **Phen↔phen graph view** — visualize the 8 phen↔phen FC-level edges
4. **Cell-level cross-FC search** — surface Type-Y overlaps not yet formally schematized
5. **Prediction-status filter** — confirmed / falsified / tension / not-yet-tested filtering
6. **§3 / §5 / §6 progress tracking** — visualize MVP completion against PROJECT_GOAL targets
7. **Timeline view** — predictions by year, falsifications by year (NIF 2022, GW170817 2017, etc.)
8. **URL state persistence** — bookmarkable FC / cell views

---

*End of project state summary at v34.*
