# Project goal — the phenomenon layer

**Status:** North-star reference document. Not version-incremented.
**Established:** 2026-05-16, after the post-v18.1 conversation about the project's eventual destination.

---

## 1. The destination, stated plainly

The eventual product is a **periodic-table-of-physics organized around physical referents** — actual phenomena and objects. Photons, electrons, neutron stars, the CMB, superconductors, black holes, the Higgs boson, gravitational waves, lightning, FQH states, glueballs, dark matter signatures, and every other thing physics points at.

Each entry in the eventual map describes a phenomenon or object class: what it is, what's been observed about it, which theoretical structures organize it, and where there are predicted-but-unobserved cells (Mendeleev-style empty slots awaiting discovery).

The Particle Data Group's listings approximate this for particles. Messier and NGC catalogs approximate it for astronomical objects. Materials databases approximate it for condensed-matter systems. **No single resource integrates these into one organized map with cross-domain structure and Mendeleev-style empty-slot predictions across all of physics.** That integrated map is what we're building toward.

---

## 2. Why this matters

Two reasons the integrated map has value that the existing scattered catalogs don't:

**Structural predictiveness.** A flat catalog of phenomena lists what's been observed. A *structured* periodic table tells you which observations imply which other observations should exist, and what those unobserved objects must look like. Mendeleev predicted gallium, scandium, germanium with specific properties because the periodic structure forced them. The eventual physics map should similarly: given the symmetry structure of known dark-matter constraints, what mass-coupling cells must exist with what features; given the observed FQH plateaus, which other ν values should support non-abelian anyons; given the hadronic states observed, what exotic states must exist at what masses.

**Cross-domain unification visibility.** Most of physics's deepest open questions sit across the seams between currently-separate sub-fields: the cosmological constant problem (cosmology × QFT × gravity), neutrino mass origin (particle physics × cosmology × BSM phenomenology), dark matter identity (cosmology × particle physics × astrophysics), quantum gravity (gravitation × QFT × topology). A map that puts all these phenomenon-classes in one structural framework makes the cross-seam structure visible in a way scattered catalogs don't.

---

## 3. The two-layer architecture

The eventual map has two layers:

**Layer 1 — The organizational backbone.** Formal classifications that organize the structural patterns physics phenomena fall into. Examples: modular tensor categories (organizes anyon types), cobordism (organizes invertible TFTs and SPT phases), tenfold-way (organizes free-fermion SPT classes), bootstrap (organizes consistency-allowed CFTs), generalized-symmetries / SymTFT (organizes symmetry data of QFTs), Higgs/Coulomb branches (organizes 4D N=2 SCFT moduli), etc.

These FCs are *mid-level abstractions*: not pure math, not specific phenomena, but the structural-classification machinery that connects the two. They're load-bearing scaffolding for the phenomenon layer.

**Layer 2 — The phenomenon layer.** Formal classifications that organize actual phenomena and objects. Cells are specific physical referents; axes are physical distinguishing parameters; predictive_yield records observations and predictions; cross-classification edges connect phenomenon-FCs to the structural-FCs that organize them.

Examples of phenomenon-FCs (none yet authored):
- Compact astrophysical objects (cells: specific neutron stars, black holes, white dwarfs, magnetars; axes: mass, radius, EOS-class, spin)
- Hadronic states (cells: π, K, ρ, J/ψ, ...exotic XYZ, glueballs predicted; axes: spin, parity, quark content, mass)
- Dark-matter candidates (cells: WIMPs, axions, sterile neutrinos, primordial BHs by mass; axes: mass, coupling, interaction type, predicted vs observed)
- Critical phenomena in real materials (cells: liquid helium lambda transition, 3D Ising magnets, 3D XY systems, ...; axes: dimension, symmetry, critical exponents)
- Fractional quantum Hall states (cells: ν=1/3, 1/5, 5/2, 12/5, ...; axes: filling fraction, statistics class, ground-state degeneracy)
- Cosmological observations (cells: CMB acoustic peaks, BAO features, dark-energy parameters, inflation observables, ...)
- Electromagnetic phenomena across energy regimes (cells: radio, IR, visible, X-ray, γ-ray, ultra-high-energy; axes: energy, coherence properties, source class)

**How the two layers connect.** Each phenomenon-FC has cross-classification edges to one or more structural-FCs that organize its content. For example:
- "fractional-quantum-Hall-states" (phenomenon FC) `categorically-equivalent` "modular-tensor-categories" (structural FC) — each FQH state corresponds to a specific MTC.
- "topological-insulator-materials" (phenomenon FC) `specializes` "tenfold-way" (structural FC) — each material lies in a specific symmetry class.
- "real-3D-critical-systems" (phenomenon FC) `specializes` "cft-bootstrap-exclusion-regions" (structural FC) — each critical material's exponents must satisfy bootstrap-allowed values.
- "BSM-particle-candidates" (phenomenon FC) `derives-from` "generalized-symmetries" (structural FC) — each candidate's gauge/symmetry structure derives from a SymTFT data choice.

The Mendeleev parallel sits cleanly in this architecture: empty cells in phenomenon-FCs (predicted but unobserved phenomena) are the equivalent of Mendeleev's gallium/scandium/germanium. The structural-FCs are what force the cells to have specific properties — they're the equivalent of Mendeleev's atomic-weight ordering that determined what gallium had to look like before it was found.

---

## 4. Where we are now

After v18.1: 14 structural-FCs authored, 0 phenomenon-FCs explicitly authored. Two existing FCs are partially phenomenon-FCs:
- **sm-rep-content** — cells ARE actual particles (quarks, leptons by generation). Closest existing phenomenon-FC.
- **su5-gut-rep-content** — cells include predicted-but-unobserved phenomena (X/Y bosons, monopoles). Mendeleev-style empty cells already recorded.

The current 14 FCs cover roughly a third of the structural scaffolding needed. They cluster in:
- 4 condensed-matter-adjacent (tenfold-way, MTC, generalized-symmetries, cobordism)
- 3 particle-physics-adjacent (sm-rep-content, su5-gut-rep-content, spacetime-symmetry-groups)
- 1 4D-N=2-SCFT-adjacent (HCB)
- 1 critical-phenomena-adjacent (bootstrap)
- 5 mathematical foundations (the ADE clique)

The scaffolding is substantial for some sectors and absent for others. The current build remains foundational work — the structural FCs we've authored will load-bear the phenomenon layer in their respective sectors when phenomenon-FCs get authored there. Continued structural-FC work is not detour from the destination; it's building the scaffolding the destination requires.

---

## 5. Natural phenomenon-pairings for existing FCs

Each existing structural-FC has a natural phenomenon-FC that should eventually hang from it. Recording these intended pairings clarifies what each piece of scaffolding is for.

| Structural FC | Natural phenomenon-FC pairing | Edge type |
|---|---|---|
| modular-tensor-categories | fractional-quantum-Hall-states, topological-quantum-computing-platforms, Kitaev-honeycomb-candidate-materials | categorically-equivalent |
| tenfold-way | topological-insulator-materials, topological-superconductor-materials, Majorana-wire-platforms | specializes |
| freed-hopkins-cobordism | symmetry-protected-topological-phase-observations, anomaly-matching-tests | specializes |
| generalized-symmetries / SymTFT | YM-phase-diagram-observations, categorical-symmetry-in-materials, ABJ-anomaly-confirmations | derives-from / specializes |
| cft-bootstrap-exclusion-regions | real-3D-critical-systems, real-2D-critical-systems, lambda-transition-measurements | specializes |
| sm-rep-content | (already is phenomenon-FC at the particle level) | (self) |
| su5-gut-rep-content | proton-decay-experimental-searches, monopole-searches, gauge-coupling-unification-measurements | derives-from |
| higgs-coulomb-branches | N=2-SCFT-spectrum-data, M5-brane-construction-observations, Argyres-Douglas-point-data | categorically-equivalent (partial) |
| spacetime-symmetry-groups | Lorentz-violation-bounds, conformal-symmetry-experimental-tests, Poincaré-invariance-precision-tests | specializes |
| ade-lie-algebras | ADE-classified-compactification-phenomenology (heterotic E_8 × E_8, etc.) | derives-from |
| ade-modular-invariants | 2D-rational-CFT-realizations-in-condensed-matter | specializes |

Some of these pairings are weaker than others. The MTC → FQH pairing is structurally direct. The ADE-Lie-algebras → ADE-compactification-phenomenology pairing is more speculative (depends on whether string-theoretic compactification phenomenology gets phenomenon-FC-authored).

---

## 6. Major sectors not yet covered

Sectors where neither structural-FCs nor phenomenon-FCs exist in the current map. Each represents authoring work needed before the destination is reached.

**Cosmology.** No structural or phenomenon FCs. Would need: cosmological-parameter classification, inflation-model classification, dark-energy parameterization, large-scale-structure observations, CMB-anomaly catalog, primordial-gravitational-wave predictions.

**Astrophysics.** No FCs. Would need: compact-object equation-of-state classification, stellar-evolution classification, supernova-type classification, gravitational-wave-event catalog, electromagnetic-transient catalog (gamma-ray bursts, fast radio bursts, etc.).

**Hadronic physics.** No FCs. Would need: hadron-classification (mesons, baryons, exotic XYZ states), QCD-phase-diagram classification, lattice-QCD-observation-data.

**BSM phenomenology beyond SU(5).** Limited (su5 only). Would need: dark-matter-candidate classification, neutrino-mass-mechanism classification, axion-physics classification, sterile-neutrino classification, leptoquark classification.

**Macroscopic / classical phenomena.** No FCs. Would need: classical-mechanical-systems, fluid-dynamics-phenomena, plasma-physics, optical-phenomena (lasers, masers, nonlinear optics), acoustic phenomena.

**Gravitational phenomena.** Only spacetime-symmetry-groups covers part of this. Would need: gravitational-wave-source classification, black-hole-thermodynamics classification, gravitational-lensing-observation catalog, tests-of-general-relativity classification.

**Electromagnetic phenomena.** No FCs covering electromagnetic phenomenology directly. Would need: photon-classification-by-energy-regime, electromagnetic-medium-interaction classification (Cherenkov, synchrotron, etc.), electromagnetic-source classification.

The work to reach the destination involves authoring both the missing structural-FCs (where they're needed) and the phenomenon-FCs (the destination layer) for each uncovered sector. The current authoring trajectory is contributing scaffolding for the condensed-matter, formal-high-energy, and particle-physics sectors. Most other sectors require dedicated authoring.

---

## 7. Authoring direction check

Whenever a new entry or analysis is proposed, check it against this document:

**Question 1 — Does this contribute to the eventual phenomenon layer?**

A new structural-FC contributes if it organizes structural patterns that phenomena fall into. A new phenomenon-FC contributes directly. A schema improvement contributes if it enables better phenomenon-FC authoring. A pattern-finding pass contributes by revealing structural facts that can inform phenomenon-FC connections.

If the answer is unclear, the proposal needs more articulation about how it serves the destination before authoring proceeds.

**Question 2 — Which sector does this serve?**

The current build heavily serves condensed-matter and formal-high-energy. Proposals that serve uncovered sectors (cosmology, astrophysics, hadronic, BSM-beyond-GUT, gravitational, electromagnetic, macroscopic) reach the destination faster than proposals that deepen already-covered sectors.

This isn't an absolute rule — sometimes deepening an already-covered structural sector is the right move, e.g., if it enables phenomenon-FC authoring there. But the question "which sector am I serving" should be explicit in each authoring decision.

**Question 3 — Could this be a phenomenon-FC instead of (or in addition to) a structural-FC?**

The current trajectory has built mostly structural-FCs. As scaffolding accumulates, the bottleneck shifts toward phenomenon-FCs. Proposals that combine "new structural-FC + the phenomenon-FC it organizes" are likely more valuable per unit work than structural-FCs in isolation.

---

## 8. Versioning and stability of this document

This document is **not** version-incremented like the data files. It's a project-level reference. Updates happen by direct edit when the project goal evolves or clarifies. The document's purpose is to remain stable enough that future authoring decisions can be checked against it without re-reading the entire conversation history.

Significant clarifications added to this document should be recorded with the date of clarification at the top of the changed section. The initial version (this file) reflects the 2026-05-16 conversation establishing the two-layer architecture explicitly.

---

## 9. Summary

We're building toward an integrated periodic-table-of-physics that organizes actual phenomena and objects across all of physics, with Mendeleev-style empty cells for predicted-but-unobserved entities. The work to date has built the organizational backbone — structural classifications that will support phenomenon-FCs when those are authored. The work is foundational, not detour. The next significant project-direction decisions involve:

(1) continuing structural-FC work where scaffolding is incomplete, while
(2) beginning phenomenon-FC work where existing scaffolding suffices, with
(3) priority on sectors currently uncovered if reaching the destination broadly is preferred over deepening already-covered sectors.

---

*End of PROJECT_GOAL_PHENOMENON_LAYER.md*
