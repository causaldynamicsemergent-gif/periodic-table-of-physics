# Predictive Layer Phase B — Step 8 condensed-matter / continuum authoring sweep

**Document type:** Authoring-sweep report. Records the §4 admissibility-test application, the §2.5 self-check, and the `if_real_implies` JSON to land on three of the four condensed-matter / continuum carrier nodes (`ns-regularity` honest-absence).

**Status:** v1. Authored 2026-05-21. Sweep against v17 spec §2 (field shape) and §4 (binding admissibility test). Fourth and final subfield sweep per v17 spec §9.2; the hep-ph (Steps 4–5), cosmology/QG (Step 6), and foundations (Step 7) sweeps are closed.

**Binding parents:** `MAP_v17_schema_spec_extension.md`, `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`, `META_v21_1_methodology_firewall.md`, `PREDICTIVE_LAYER_PHASE_B_STEP_6_COSMOLOGY_QG_SWEEP.md` and `PREDICTIVE_LAYER_PHASE_B_STEP_7_FOUNDATIONS_SWEEP.md` (templates).

**Scope:** Four carriers — `topological-phases-classification` (open-frontier), `ns-regularity` (open-frontier), `turbulence` (totality-approach), `chpt` (totality-approach). Outcome: **6 new entries on 3 carriers; `ns-regularity` honest-absent.**

---

## 0. How to apply this sweep

For each of the three populated carriers in §3, paste the JSON block as the value of `if_real_implies:` at the top level of the carrier node in `data/Map_v34_consolidated.json`. The field is optional and goes alongside (not inside) `candidate_targeting`, `equations`, `regime_content_loci`, etc. Placement matches the Steps 6/7 convention:

- `topological-phases-classification`: immediately after `candidate_targeting`, before `citations` (the open-frontier convention).
- `turbulence` and `chpt`: immediately after `equations`, before `citations` (the totality-approach convention — neither carrier has a top-level `candidate_targeting` field; its analog `equations.native.equations[].loose_ends[].candidate_targeting` is nested and untouched).

For `ns-regularity`, no change. The §1.2 self-check determined that none of the candidate resolutions in its `candidate_targeting` admits a §4-passing structural consequent under current literature. Honest absence is the correct outcome and is documented in §3.2 below.

The PR description for this sweep MUST include the §2.5 self-check statement from §1.2. CI (`scripts/validate.py` with Rules 24–26) passes on the modified file: 71 nodes, 191 edges, 0 new schema errors, 0 validator-rule errors, 4 known legacy `constrains` carryovers (within tolerance per `PROJECT_INFRASTRUCTURE.md` §2). See §6 for the verbatim validator output.

After this sweep lands, the queued work is the MCP worker rebuild (Step N+1) — see §5 handoff note. Phase B authoring is closed.

---

## 1. §4 admissibility test and §2.5 self-check — applied to this sweep

### 1.1 The §4 test (binding, reproduced from v17 spec)

An `if_real_implies` entry is admissible only if all three hold:

1. **Antecedent is a literature position.** The if-real condition names a resolution already proposed in the subfield's published literature — a position a working specialist would recognize as having been taken, not one the cartographer infers from dataset structure. `condition_citations` names the publications where the position is stated.
2. **Consequent is structural-by-derivation, not by pattern.** The implied structural change follows from the antecedent by a *published* derivation, not by inference from cross-classification patterns in v40. `derivation_citations` on each implication names the publications where the antecedent → consequent step is performed.
3. **Both halves cite.** Citation arrays both non-empty; schema enforces `minItems: 1`.

### 1.2 §2.5 self-check (binding for this PR description)

> Before adding each of the 6 entries below: I asked, "Would I author this conditional structural claim independent of any pattern observation in the existing dataset? Specifically, if I had only the subfield literature and not the v40 cross-classification graph in front of me, would the same antecedent → consequent step be defensible from the literature alone?"
>
> For all 6 entries the answer is **yes**: each came from the published subfield literature (Kapustin 2014; Freed-Hopkins 2016; Wang-Senthil 2014; Shiozaki-Xiong-Gomi 2018; Else-Thorngren 2019; Haah 2011; Vijay-Haah-Fu 2016; Pretko-Chen-You 2020; Nandkishore-Hermele 2019; Barkeshli-Bonderson-Cheng-Wang 2019; Bhardwaj-Schäfer-Nameki 2024; Parisi-Frisch 1985; Frisch 1995; Sreenivasan-Antonia 1997; Erlich-Katz-Son-Stephanov 2005; Sakai-Sugimoto 2004, 2005), each cited in `condition_citations` and `derivation_citations`. No entry uses an ADE-clique-style structural homology between FCs as a derivation step; each derivation is a step performed in a named paper.
>
> Entries that failed the self-check and were dropped from this sweep:
>
> - **topological-phases-classification / interaction-collapses-as-MTC-refinement** — the antecedent (interactions on free-fermion topological phases produce classification collapses like Fidkowski-Kitaev ℤ→ℤ₈ and Wang-Senthil ℤ₂→ℤ₁₆) is a stated literature position. The consequent fails §4 part 2 in the form "the modular-tensor-category framework subsumes the interacting-SPT classification": no published derivation makes MTC the host for invertible SPT (MTC classifies topological order with anyons; interacting invertible SPT are *not* topological orders — they're invertible TFTs). The correct framing is the Kapustin / Freed-Hopkins bordism programme, which is the entry that landed. Dropping the MTC framing keeps the entry §4-tight.
>
> - **topological-phases-classification / tensor-network-state-classifies-spt** — the antecedent is a stated literature position (Chen-Gu-Wen 2011, the carrier's own `candidate_targeting`). The consequent fails §4 part 2: tensor-network / MPS / PEPS methods *characterize* SPT phases (entanglement spectra, edge modes, group-cohomology labels) but the *classification* result they reach is the same group-cohomology classification (1d boson Chen-Gu-Wen) that the bordism programme subsumes. Tensor-network methods are not a separate structural classification; they are a computational technique whose output lives within the existing classification frameworks. Mirrors Step 6's drop of tensor-networks-as-qg-resolution on `qg-frontier`.
>
> - **topological-phases-classification / higher-categorical-symmetry-d>=4** — the antecedent (3-group and higher-group structures classify (3+1)D and higher topological phases per Cordova-Dumitrescu-Intriligator 2019 and subsequent work) is a stated literature position. The consequent fails §4 part 1 in a subtle way: the higher-categorical programme is *partial* — Bhardwaj-Schäfer-Nameki 2024 review explicitly flags "complete classification of d=4 non-invertible symmetries" as active research 2024-2026 and "higher-categorical structures in d ≥ 5" as open. The carrier's open question already names this as one of its loose ends ("complete classification of (2+1)d topological order beyond MTC current reach" + "integration of crystalline, magnetic, internal classification programs"); recording the higher-categorical programme as a `resolution` would commit a literature position that the field itself does not yet treat as taken.
>
> - **ns-regularity / Tao-2016-averaged-blowup-as-resolution** — Tao 2016 proves finite-time blowup for an *averaged* Navier-Stokes system. The antecedent (the same mechanism applies to true 3D NS) is a real position but Tao explicitly notes the averaged system is not the original; the consequent fails §4 part 2: even granting blowup for true NS, no published derivation forces a Mendeleev-style classification of physical content. A classification of singularity *types* exists in Caffarelli-Kohn-Nirenberg 1982 partial-regularity theory, but that is a mathematical theorem about allowed singular sets in suitable weak solutions, not a Mendeleev-style classification of physical content on the periodic-table-of-physics backbone.
>
> - **ns-regularity / Constantin-Fefferman-vorticity-criterion-as-resolution** — Constantin-Fefferman 1993 derives a conditional regularity criterion: if vorticity direction is sufficiently aligned (in a quantitative sense), smoothness is preserved. The antecedent is a stated literature position. The consequent fails §4 part 2: the conditional criterion classifies *mathematical sufficient conditions* on the velocity field, not physical content with cells and axes. Mirrors the structural-vs-mathematical distinction.
>
> - **ns-regularity / Escauriaza-Seregin-Šverák-L³-criterion-as-resolution** — same shape as Constantin-Fefferman. Escauriaza-Seregin-Šverák 2003 derives the critical L³ regularity criterion; classifies sufficient conditions on the velocity, not physical content.
>
> - **turbulence / Onsager-conjecture-resolves-dissipation** — Onsager's conjecture (energy can be dissipated by weak Euler solutions only when regularity drops below C^{1/3}) was proven by Isett 2018 and Buckmaster-De Lellis-Székelyhidi-Vicol 2019. The antecedent is a stated and now-proven literature position. The consequent fails §4 part 2: the proof's structural content is a regularity-threshold theorem, not a classification of physical content. The threshold C^{1/3} is *invoked* in the multifractal entry's derivation (singularity exponents α ≤ 1/3 can dissipate energy in the weak-solution sense), but the threshold theorem itself does not force its own classification structure.
>
> - **turbulence / She-Leveque-1994-as-separate-resolution** — She-Lévêque 1994 ζ_p = p/9 + 2(1 − (2/3)^{p/3}) is a specific hierarchical scaling within the multifractal framework. Authoring it as a separate `resolution` would split a single literature position (multifractal organization of intermittency) into competing entries that are actually cells within one classification. It lands as a *cell* of the new FC implied by the multifractal-formalism entry, not as its own resolution. Mirrors the way `koide-as-flavor-symmetry-signal` in Step 7 was framed broadly enough to subsume Sumino-2009-gauged and Ishimori-2010-discrete as a single resolution with sub-content.
>
> - **chpt / lattice-QCD-bridges-qcd-to-chpt** — Lattice QCD computation of ChPT low-energy constants (FLAG 2024 review and earlier) provides effectively complete *numerical* discharge of the QCD→ChPT bridge. The antecedent is a stated and confirmed literature position. The consequent fails §4 in a specific way: lattice computation of the LECs does not force *new* structural content — it provides values for parameters of an EFT whose structure (Gasser-Leutwyler counterterm Lagrangian) is already established. No `kind` value cleanly applies — there is no new cell forced, no new axis, no new edge, no promoted subtype, no new FC. The bridge is discharged numerically but the existing structural backbone is unchanged. Recorded honestly here; the existing carrier `bridges[0].bridge_status` ("partial (lattice QCD provides numerical discharge; analytic discharge open)") already captures this.
>
> - **chpt / Weinberg-power-counting-as-resolution** — Weinberg 1979 articulated the principle of phenomenological Lagrangians and chiral power counting. The antecedent is a foundational literature position. The consequent fails §4 part 1 in a subtle way: Weinberg's power-counting is the *organizing principle of ChPT itself*, not a resolution to the carrier's open question (the QCD→ChPT bridge). The if-real condition would collapse into "if ChPT is the right EFT" — tautological with the carrier's existence. The Gasser-Leutwyler 1984/1985 counterterm tabulation is an instance of this principle, but recording the counterterm classification as `if_real_implies` content would commit it as conditional structure when it is already established structure within ChPT.
>
> The dropped resolutions remain real positions in the subfield literature. The drop is from this sweep, not from the carriers' `candidate_targeting` (or analog) fields, which are untouched. None of these resolutions admits a clean §4-passing structural consequent under current literature; if specific Mendeleev-style classification papers emerge — say, a higher-categorical classification of (3+1)D topological order analogous to Barkeshli et al. 2019 for (2+1)D SET — the dropped resolutions become re-candidate-able in a future authoring pass.

### 1.3 Constraints applied to the implications

Of the 6 implications across this sweep:

- 4 use `kind: new_FC` with `target: null`. Per v17 spec §3.2 / validator Rule 24, this requires no target id resolution. The four forced FCs (fracton phases, (2+1)D SET phases via SymTFT, multifractal turbulence models, holographic-QCD models) are authored downstream of Phase B via the normal FC-authoring pipeline — see §4 follow-ups #1, #2, #3, #4.
- 2 use `kind: new_axis` with `target: "freed-hopkins-cobordism"`. Both target the existing v40 FC `freed-hopkins-cobordism`; per validator Rule 24, both targets are strings equal to the id of an existing formal-classification node (verified against the v40 dataset's 30 FCs). Permitted to share a target — Rule 25 enforces uniqueness of the *outer* `resolution` value, not of `target` — because the two entries condition on different literature positions (interacting-SPT bordism vs crystalline equivariant bordism), each forcing a distinct new axis (internal-symmetry-group G vs crystalline-space-group). Both axes can land on `freed-hopkins-cobordism` without conflict; the FC's existing closure_status ("Partial. ... higher dimensions and more exotic tangential structures (twisted Spin × G for various G) are not all explicitly computed; ... cosmological-scale generalizations are partially developed but incomplete") anticipates exactly this kind of extension.

Rule 25 (resolution-uniqueness within a carrier) is engaged on `topological-phases-classification` (4 resolutions: `kapustin-freed-hopkins-bordism-closes-interacting-invertible-spt`, `equivariant-cobordism-closes-crystalline-spt`, `fractons-are-distinct-classification-class`, `symtft-organizes-set-classification` — all distinct). Rule 26 (`forced_edge` self-edge restriction) is not engaged — no `forced_edge` implications in this sweep.

---

## 2. Sweep summary

| Carrier | Entries (after sweep) | New in this sweep | Mix of `kind` values | Notes |
|---|---|---|---|---|
| `topological-phases-classification` | 4 | **+4** | 2 × `new_axis`, 2 × `new_FC` | Kapustin-Freed-Hopkins interacting-SPT, Shiozaki-Else-Thorngren crystalline, fracton phases, SymTFT SET. 3 resolutions dropped per §1.2. |
| `ns-regularity` | 0 | 0 | — | **Honest absence.** 3 candidate resolutions dropped per §1.2 (Tao-2016 averaged blowup; Constantin-Fefferman vorticity-alignment; Escauriaza-Seregin-Šverák L³). All fail §4 part 2 — conditional regularity criteria classify mathematical sufficient conditions, not physical content. |
| `turbulence` | 1 | **+1** | 1 × `new_FC` | Multifractal formalism (Parisi-Frisch 1985 / Frisch 1995). 2 resolutions dropped per §1.2 (Onsager-conjecture threshold theorem; She-Lévêque as separate resolution — lands as cell within the multifractal FC). |
| `chpt` | 1 | **+1** | 1 × `new_FC` | Holographic QCD (Erlich-Katz-Son-Stephanov 2005; Sakai-Sugimoto 2004). 2 resolutions dropped per §1.2 (lattice-QCD numerical bridge — no new structure forced; Weinberg power-counting — already established within ChPT). |

**Total new entries: 6 on 3 carriers; 1 honest absence (`ns-regularity`).**

### Notes on the kind-value distribution

- `new_FC` is again dominant (4 of 6), continuing the cosmology/QG (6 of 9 in Step 6) and foundations (1 of 1 in Step 7) pattern. Condensed-matter / continuum carriers sit far enough from existing FC nodes in v40's cross-classification graph that `forced_edge`, `promotes_subtype`, and `new_cell` rarely fit cleanly — the resolutions identified here typically force whole new classification objects rather than promotions of existing edges or new cells within existing FCs.
- `new_axis` is the distinguishing kind for this sweep (2 of 6, both on `topological-phases-classification`). `freed-hopkins-cobordism` is the unusual case where the existing FC's closure_status explicitly anticipates extension along additional symmetry axes — internal-symmetry-G (Kapustin / Freed-Hopkins programme) and crystalline-space-group (Shiozaki-Xiong-Gomi / Else-Thorngren). These resolutions don't force new FCs because the existing FC already has the right framework; they force its axis structure to be made explicit beyond the five enumerated tangential structures.
- `forced_edge`, `promotes_subtype`, `new_cell` (0 each in this sweep). Consistent with Step 7. The dark-matter / Step 6 carrier was the unusual case where existing FC neighborhood supplied `forced_edge` targets; condensed-matter / continuum carriers don't have an analogous dense neighborhood in v40.

### Honest absences

- `ns-regularity` carries 3 candidate resolutions in its `candidate_targeting` field. All three are real positions in the literature (Tao 2016, Constantin-Fefferman 1993, lattice/numerical evidence). None admits a §4-passing structural consequent under current literature, because the carrier's open question is a yes/no analytic question whose either resolution does not force a Mendeleev-style classification of physical content. The honest call is the no-entries one. Future re-examination would be triggered if a Mendeleev-style classification of NS singularity types emerges from Caffarelli-Kohn-Nirenberg partial-regularity theory beyond its current shape, or if a structural classification of fluid-dynamical content is forced by some unforeseen resolution route.
- 3 resolutions dropped on `topological-phases-classification` (interaction-collapses-as-MTC, tensor-network-as-classification, higher-categorical-d≥4), 2 on `turbulence` (Onsager-conjecture, She-Lévêque as separate resolution), 2 on `chpt` (lattice numerical bridge, Weinberg power-counting), 3 on `ns-regularity`. Each drop is documented in §1.2 with the specific §4 part(s) that failed. Each remains in its carrier's `candidate_targeting` (or analog) field, untouched.

---

## 3. Per-carrier entries

### 3.1 `topological-phases-classification` (open-frontier, +4 entries)

The carrier hosts the broader topological-phase classification question — interacting fermionic SPT subsuming Fidkowski-Kitaev-type collapses; (2+1)D topological order beyond MTC current reach; symmetry-enriched topological order across symmetries and dimensions; integration of crystalline / magnetic / internal classification programs. The only candidate in the v40 `candidate_targeting` is tensor-network (dropped per §1.2). Four resolutions identified from the broader subfield literature pass §4; three further candidates are dropped per §1.2.

The four entries together address different parts of the carrier's multi-part open question: entries 1 and 2 extend `freed-hopkins-cobordism` to internal-symmetry G and crystalline space groups respectively (closing the invertible-SPT part); entry 3 forces a separate FC for fracton phases (which sit outside both MTC and Freed-Hopkins frameworks); entry 4 forces a separate FC for (2+1)D SET phases organized within SymTFT (closing the symmetry-enriched-topological-order part).

```json
"if_real_implies": [
  {
    "resolution": "kapustin-freed-hopkins-bordism-closes-interacting-invertible-spt",
    "condition": "If invertible interacting SPT phases in d spacetime dimensions with internal symmetry G are completely classified by the (Spin x BG)-bordism programme of Kapustin 2014 and Freed-Hopkins 2016 — the framework that already subsumes the Fidkowski-Kitaev Z->Z_8 collapse for 1d class BDI (Pin- bordism) and the Wang-Senthil Z_2->Z_16 refinement for 3+1d class AII (Pin+ bordism), but not yet completed across arbitrary internal-symmetry groups G.",
    "condition_citations": [
      "Kapustin 2014 'Symmetry-protected topological phases, anomalies, and cobordisms: Beyond group cohomology' arXiv:1403.1467",
      "Freed-Hopkins 2016 'Reflection positivity and invertible topological phases' arXiv:1604.06527 (published Commun Math Phys 374, 1021, 2021)",
      "Wang-Senthil 2014 'Interacting fermionic topological insulators/superconductors in three dimensions' Phys Rev B 89:195124",
      "Fidkowski-Kitaev 2010 'Effects of interactions on the topological classification of free fermion systems' Phys Rev B 81:134509"
    ],
    "implications": [
      {
        "kind": "new_axis",
        "target": "freed-hopkins-cobordism",
        "description": "An internal-symmetry-group axis (G in {Z_n, U(1), SU(N), discrete groups acting on fermions}) would be forced as an explicit third axis on freed-hopkins-cobordism, factored out from the current implicit packaging within the choice of tangential structure. The current FC enumerates five tangential structures (SO, Spin, Pin+, Pin-, Spin^c) that conflate spacetime-orientation data with specific internal Z_2 / U(1) symmetries; the resolution forces the general (Spin x BG) form with G as its own axis. Each (G, d) pair becomes a cell whose content is the bordism group Omega^{Spin x BG}_{d+1}.",
        "derivation_citations": [
          "Freed-Hopkins 2016 arXiv:1604.06527 (the derivation that invertible interacting SPT in d spacetime dimensions with internal symmetry G is classified by the torsion in Omega^{Spin x BG}_{d+1})",
          "Kapustin-Thorngren-Turzillo-Wang 2015 'Fermionic symmetry protected topological phases and cobordisms' JHEP 12:052 (independent derivation including specific Spin x BG examples)"
        ]
      }
    ]
  },
  {
    "resolution": "equivariant-cobordism-closes-crystalline-spt",
    "condition": "If crystalline-symmetry-protected topological phases are completely classified by twisted equivariant cobordism / generalized homology with crystallographic space groups acting on the tangential structure (Shiozaki-Xiong-Gomi 2018), with the crystalline equivalence principle (Else-Thorngren 2019) reducing d-dim crystalline SPT under a point-group action to internal-symmetry SPT in lower dimensions.",
    "condition_citations": [
      "Shiozaki-Xiong-Gomi 2018 'Generalized homology and Atiyah-Hirzebruch spectral sequence in crystalline symmetry protected topological phenomena' arXiv:1810.00801",
      "Else-Thorngren 2019 'Crystallographic interactions and SPT phases' Phys Rev B 99:115116",
      "Thorngren-Else 2018 'Gauging spatial symmetries and the classification of topological crystalline phases' Phys Rev X 8:011040"
    ],
    "implications": [
      {
        "kind": "new_axis",
        "target": "freed-hopkins-cobordism",
        "description": "A crystalline-space-group axis (the 230 crystallographic space groups, plus magnetic / Shubnikov extensions when time-reversal acts) would be forced as a further explicit axis on freed-hopkins-cobordism, beyond the internal-symmetry-G axis implied by the Kapustin-Freed-Hopkins resolution. Cells become triples (tangential-structure, internal-symmetry-G, crystalline-space-group); cell content is the twisted equivariant bordism group computed via the Atiyah-Hirzebruch spectral sequence of Shiozaki-Xiong-Gomi 2018. The crystalline-equivalence-principle of Else-Thorngren 2019 organizes how cells across this expanded axis relate.",
        "derivation_citations": [
          "Shiozaki-Xiong-Gomi 2018 arXiv:1810.00801 (derivation of the twisted equivariant cobordism classification for crystalline SPT, including explicit Atiyah-Hirzebruch computations across the wallpaper and space groups)",
          "Else-Thorngren 2019 Phys Rev B 99:115116 (crystalline equivalence principle as a structural map between crystalline cells and internal-symmetry cells)"
        ]
      }
    ]
  },
  {
    "resolution": "fractons-are-distinct-classification-class",
    "condition": "If fracton phases (gapped phases with subextensive ground-state degeneracy and immobile or restricted-mobility excitations) genuinely form a class of topological phases outside the modular-tensor-category / TQFT classification framework, requiring foliated-TQFT or tensor-gauge-theory machinery for their classification rather than being limits or refinements of MTC-classified topological order.",
    "condition_citations": [
      "Haah 2011 'Local stabilizer codes in three dimensions without string logical operators' Phys Rev A 83:042330 (Haah's cubic code — first definite Type-II fracton)",
      "Vijay-Haah-Fu 2016 'Fracton topological order, generalized lattice gauge theory, and duality' Phys Rev B 94:235157 (X-cube model and the Type-I/Type-II distinction)",
      "Chamon 2005 'Quantum glassiness in strongly correlated clean systems: an example of topological overprotection' Phys Rev Lett 94:040402"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC organizing fracton phases would be forced, with axes (mobility-restriction-pattern [planon / lineon / fracton / type-I-vs-type-II] x ground-state-degeneracy-scaling-with-system-size x foliation-structure [number and orientation of foliations] x underlying-lattice-class). Cells are specific fracton models: X-cube (Vijay-Haah-Fu 2016), Haah's cubic code (Haah 2011), Chamon's model (Chamon 2005), checkerboard model (Vijay-Haah-Fu 2015), Type-II 'fractal' codes. The classification sits outside both modular-tensor-categories (anyons have free mobility; fractons do not) and freed-hopkins-cobordism (fractons are not invertible TQFTs; they have subextensive ground-state degeneracy).",
        "derivation_citations": [
          "Pretko-Chen-You 2020 'Fracton phases of matter' Int J Mod Phys A 35:2030003 (review classifying fracton models by Type-I / Type-II and by mobility structure)",
          "Nandkishore-Hermele 2019 'Fractons' Annu Rev Condens Matter Phys 10:295 (review establishing fractons as a distinct topological-order class)",
          "Slagle-Aasen-Williamson 2019 'Foliated field theory and string-membrane-nets' SciPost Phys 6:043 (foliated-TQFT machinery for the Type-I subclass)"
        ]
      }
    ]
  },
  {
    "resolution": "symtft-organizes-set-classification",
    "condition": "If (2+1)D symmetry-enriched topological (SET) phases — topological orders with anyonic excitations carrying an additional internal-symmetry action — are completely classified by the data (C, G, [rho], [w]) consisting of a modular tensor category C, a finite group G, a symmetry-localization class [rho], and a symmetry-fractionalization class [w] in H^2(G, A) (where A is the abelian-anyon subcategory), organized within the SymTFT framework.",
    "condition_citations": [
      "Barkeshli-Bonderson-Cheng-Wang 2019 'Symmetry fractionalization, defects, and gauging of topological phases' Phys Rev B 100:115147",
      "Etingof-Nikshych-Ostrik 2010 'Fusion categories and homotopy theory' Quantum Topol 1:209 (categorical-symmetry foundation)",
      "Gaiotto-Kapustin-Seiberg-Willett 2015 'Generalized global symmetries' JHEP 02:172 (SymTFT antecedent)"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC organizing (2+1)D SET phases would be forced, with axes (host-MTC C x internal-symmetry-group G x symmetry-localization-class [rho] x symmetry-fractionalization-class [w] in H^2(G, A) x extrinsic-defect-content). Cells are specific SET phases: G-enriched Z_2 toric code under various G-actions (Cheng-Gu-Senthil 2017 explicit lattice models); G-enriched Ising anyon model (rich landscape for G in {Z_2, Z_2 x Z_2, D_4}); fractional-quantum-Hall-state SET phases with magnetic-translation enrichment (Barkeshli-Manmana-Vishwanath 2014). The FC sits between modular-tensor-categories (its host-MTC axis) and generalized-symmetries (its SymTFT-bulk realisation of G); it does not subsume either.",
        "derivation_citations": [
          "Barkeshli-Bonderson-Cheng-Wang 2019 Phys Rev B 100:115147 (the systematic derivation of the (C, G, [rho], [w]) classification with worked-out examples across G and C)",
          "Bhardwaj-Schafer-Nameki 2024 'Lectures on generalized symmetries' Phys Rep 1051:1 (review showing SymTFT organization of the (C, G, [rho], [w]) data for (2+1)D SET phases)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.**

- *Entry 1 (Kapustin-Freed-Hopkins):* Antecedent — Kapustin 2014 and Freed-Hopkins 2016 are the canonical references introducing the (Spin × BG) bordism classification of invertible interacting SPT; Wang-Senthil 2014 and Fidkowski-Kitaev 2010 are the specific instance papers v40 already cites within `freed-hopkins-cobordism`. Consequent — Freed-Hopkins 2016 explicitly derives the Ω^{Spin × BG}_{d+1} classification with G as a parameter; Kapustin-Thorngren-Turzillo-Wang 2015 provides an independent derivation with worked examples. 4 condition + 2 derivation citations, all non-empty.
- *Entry 2 (Shiozaki-Else-Thorngren):* Antecedent — Shiozaki-Xiong-Gomi 2018 and Else-Thorngren 2019 are the canonical references for the crystalline extension; Thorngren-Else 2018 provides the gauged-spatial-symmetry foundation. Consequent — Shiozaki-Xiong-Gomi 2018 derives the twisted equivariant cobordism classification with explicit Atiyah-Hirzebruch computations; Else-Thorngren 2019 derives the crystalline-equivalence-principle structural map. 3 condition + 2 derivation citations.
- *Entry 3 (Fracton):* Antecedent — Haah 2011, Vijay-Haah-Fu 2016, and Chamon 2005 are the canonical first-instance papers for the three distinct fracton model classes. Consequent — Pretko-Chen-You 2020 and Nandkishore-Hermele 2019 are *published reviews* that classify fracton phases as a distinct topological-order class with the named axes; Slagle-Aasen-Williamson 2019 derives the foliated-TQFT machinery for the Type-I subclass. 3 condition + 3 derivation citations.
- *Entry 4 (SymTFT SET):* Antecedent — Barkeshli-Bonderson-Cheng-Wang 2019 is the canonical SET classification paper; Etingof-Nikshych-Ostrik 2010 is the foundational categorical-symmetry result; Gaiotto-Kapustin-Seiberg-Willett 2015 is the SymTFT antecedent. Consequent — Barkeshli-Bonderson-Cheng-Wang 2019 *derives* the (C, G, [rho], [w]) classification systematically with worked examples; Bhardwaj-Schäfer-Nameki 2024 review organizes the same data within the SymTFT framework. 3 condition + 2 derivation citations.

### 3.2 `ns-regularity` (open-frontier, 0 entries — honest absence)

The carrier hosts the Clay Millennium question on global existence and smoothness of 3D incompressible Navier-Stokes solutions for arbitrary smooth initial data. Three candidate-targeting programs in `candidate_targeting`: Tao 2016 averaged-NS blowup; Constantin-Fefferman 1993 conditional regularity criteria; lattice / numerical evidence. All three fail the §4 admissibility test for the same structural reason described in §1.2: the carrier's open question is a yes/no analytic question, and each resolution route's literature output is a *mathematical sufficient condition* (or a related theorem) rather than a Mendeleev-style classification of physical content.

This is the second honest-absence carrier in the sweep series (after `bh-thermodynamics` and `cosmological-models` from Step 6). It is the cleanest case for honest absence: none of the candidates was deferred for reasons of v40-graph-distance or downstream-FC-dependency; all three failed §4 part 2 directly. No future re-examination is anticipated unless the field articulates a Mendeleev-style classification of fluid-dynamical content that NS-regularity resolution would force into existence.

### 3.3 `turbulence` (totality-approach, +1 entry)

The carrier hosts multi-architecture-interference content jointly hosted by classical mechanics, statistical mechanics, and thermodynamics. Its `equations.native.equations[].loose_ends[]` lists active research (Clay Millennium Navier-Stokes via the carrier's loose ends) and "multifractal formalism (partial)" under intermittency corrections to Kolmogorov K41. One resolution passes §4; two are dropped per §1.2 (Onsager-conjecture threshold theorem; She-Lévêque as separate resolution rather than cell within the multifractal FC).

```json
"if_real_implies": [
  {
    "resolution": "multifractal-formalism-organizes-intermittency",
    "condition": "If the intermittency corrections to Kolmogorov K41 scaling in fully developed inertial-range turbulence reflect a genuine multifractal distribution of singularity strengths — i.e., the inertial-range turbulent dissipation field epsilon_r over scale r has a continuous spectrum of Holder exponents alpha distributed on fractal subsets of fractional dimension f(alpha), as proposed by Parisi-Frisch 1985.",
    "condition_citations": [
      "Parisi-Frisch 1985 'On the singularity structure of fully developed turbulence' in Ghil-Benzi-Parisi (eds) Turbulence and Predictability in Geophysical Fluid Dynamics, Proc Intl School of Physics Enrico Fermi (Varenna 1983), North-Holland, pp 84-87",
      "Mandelbrot 1974 'Intermittent turbulence in self-similar cascades: divergence of high moments and dimension of the carrier' J Fluid Mech 62:331 (precursor multifractal description)",
      "Frisch-Sulem-Nelkin 1978 'A simple dynamical model of intermittent fully developed turbulence' J Fluid Mech 87:719 (beta-model — precursor monofractal)"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC organizing multifractal models of inertial-range turbulent intermittency would be forced, with axes (singularity-spectrum-shape f(alpha) x universality-class [log-normal vs log-Poisson vs log-stable vs log-infinitely-divisible] x cascade-mechanism [random / discrete / continuous] x dimensional-range-of-applicability). Cells are specific multifractal models: Kolmogorov-Obukhov 1962 log-normal model, She-Leveque 1994 log-Poisson hierarchical model with zeta_p = p/9 + 2(1 - (2/3)^(p/3)), p-model of Meneveau-Sreenivasan 1987, random beta-model of Benzi-Paladin-Parisi-Vulpiani 1984, log-stable models. The Legendre-transform relation between structure-function exponents zeta_p and the singularity spectrum f(alpha) (Frisch 1995 ch 8) is the load-bearing structural map across cells.",
        "derivation_citations": [
          "Frisch 1995 'Turbulence: The Legacy of A.N. Kolmogorov' Cambridge University Press, chapter 8 (systematic derivation of the multifractal formalism, the Legendre-transform relation zeta_p <-> f(alpha), and the cell-by-cell tabulation of competing multifractal models)",
          "Sreenivasan-Antonia 1997 'The phenomenology of small-scale turbulence' Annu Rev Fluid Mech 29:435 (review with experimental tests of multifractal predictions across geophysical, laboratory, and atmospheric turbulence)",
          "Meneveau-Sreenivasan 1991 'The multifractal nature of turbulent energy dissipation' J Fluid Mech 224:429 (explicit derivation of f(alpha) from experimental data)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.** *Antecedent:* Parisi-Frisch 1985 is the canonical introduction of the multifractal description of turbulent intermittency; Mandelbrot 1974 is the precursor multiplicative-cascade work; Frisch-Sulem-Nelkin 1978 β-model is the monofractal precursor superseded by Parisi-Frisch. *Consequent:* Frisch 1995 chapter 8 is the canonical textbook derivation of the multifractal formalism including the load-bearing Legendre-transform relation between structure-function exponents and the singularity spectrum, and tabulates the competing multifractal models that become cells of the forced FC; Sreenivasan-Antonia 1997 reviews the experimental tests; Meneveau-Sreenivasan 1991 derives f(α) from data. 3 condition + 3 derivation citations.

### 3.4 `chpt` (totality-approach, +1 entry)

The carrier hosts the effective theory below the QCD scale articulating low-energy hadronic physics. Its `bridges[0].bridge_status` records the QCD→ChPT bridge as "partial (lattice QCD provides numerical discharge; analytic discharge open)". The nested `candidate_targeting` under the chiral-Lagrangian loose-end lists lattice QCD (substantial-numerical) and AdS/CFT (partial/gestural). One resolution passes §4; two are dropped per §1.2 (lattice numerical bridge — no structural change forced; Weinberg power-counting — already established within ChPT).

```json
"if_real_implies": [
  {
    "resolution": "holographic-qcd-bridges-qcd-to-chpt",
    "condition": "If gauge/gravity duality (in its phenomenological AdS/QCD and top-down brane-construction forms) provides the analytic, large-N derivation of ChPT structure — pion decay constant F_pi, vector-meson masses and decay constants, low-energy constants L_i of the Gasser-Leutwyler chiral Lagrangian, hadronic form factors — from gravitational computation in an appropriately-chosen 5D background dual to a QCD-like theory at large N.",
    "condition_citations": [
      "Erlich-Katz-Son-Stephanov 2005 'QCD and a holographic model of hadrons' Phys Rev Lett 95:261602 (hard-wall AdS/QCD)",
      "Da Rold-Pomarol 2005 'Chiral symmetry breaking from five dimensional spaces' Nucl Phys B 721:79 (alternative hard-wall construction)",
      "Sakai-Sugimoto 2004 'Low energy hadron physics in holographic QCD' Prog Theor Phys 113:843 (D4/D8 top-down construction)",
      "Sakai-Sugimoto 2005 'More on a holographic dual of QCD' Prog Theor Phys 114:1083"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC organizing holographic-QCD models would be forced, with axes (background-geometry [AdS_5 hard-wall vs AdS_5 soft-wall vs full backreacted top-down] x flavor-brane-embedding [probe vs backreacted; D8 vs D7 vs none] x confinement-mechanism [hard cutoff vs dilaton vs geometric] x large-N-type [planar vs Veneziano] x ChPT-LECs-derivable). Cells are specific holographic-QCD models: hard-wall AdS/QCD (Erlich-Katz-Son-Stephanov 2005; Da Rold-Pomarol 2005), soft-wall AdS/QCD (Karch-Katz-Son-Stephanov 2006), Sakai-Sugimoto D4/D8 (Sakai-Sugimoto 2004, 2005), Witten 1998 QCD-from-D4-branes, dynamical AdS/QCD (Brodsky-de Teramond 2008). The structural payoff is that each cell's analytic predictions for chiral observables become directly comparable, and the bridge from QCD to ChPT becomes a derivation through a specific holographic dual rather than purely numerical-lattice.",
        "derivation_citations": [
          "Erlich-Katz-Son-Stephanov 2005 Phys Rev Lett 95:261602 (analytic derivation of F_pi, rho-meson mass, a_1-meson mass, KSRF relation, and ChPT L-parameters from hard-wall AdS/QCD)",
          "Sakai-Sugimoto 2004 Prog Theor Phys 113:843 (analytic derivation of pion dynamics, the full Skyrme-like effective Lagrangian, and vector-meson tower from the D4/D8 construction)",
          "Erdmenger-Evans-Kirsch-Threlfall 2008 'Mesons in gauge/gravity duals' Eur Phys J A 35:81 (review systematically organizing holographic-QCD model predictions for chiral and meson observables across the holographic-model landscape)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.** *Antecedent:* Erlich-Katz-Son-Stephanov 2005 and Da Rold-Pomarol 2005 are the foundational hard-wall AdS/QCD papers; Sakai-Sugimoto 2004 and 2005 are the foundational top-down D4/D8 papers. The AdS/QCD programme as analytic discharge of the QCD→ChPT bridge has been an active subfield for two decades. *Consequent:* Erlich-Katz-Son-Stephanov 2005 derives F_π, ρ-meson and a₁-meson masses, the KSRF relation, and ChPT L-parameters analytically from a 5D hard-wall background; Sakai-Sugimoto 2004 derives the full Skyrme-like chiral Lagrangian and vector-meson tower from the D4/D8 construction; Erdmenger-Evans-Kirsch-Threlfall 2008 reviews the systematic organization of holographic-QCD models, which is itself the load-bearing cell-by-cell tabulation that the forced FC would render machine-explicit. 4 condition + 3 derivation citations.

---

## 4. Follow-up authoring tasks unlocked by this sweep

The sweep deliberately leaves several adjacent moves for downstream authoring rather than overreaching into them in this PR. Each is named so it can be picked up cleanly later.

1. **Author the 'fracton phases' FC** (forced by entry 3 on `topological-phases-classification`). Axes per the implication: mobility-restriction-pattern × ground-state-degeneracy-scaling × foliation-structure × underlying-lattice-class. Cells: X-cube (Vijay-Haah-Fu 2016), Haah's cubic code (Haah 2011), Chamon's model (Chamon 2005), checkerboard model (Vijay-Haah-Fu 2015), Type-II fractal codes. Normal FC-authoring pass per `PROJECT_GOAL_PHENOMENON_LAYER.md` §6 (the "condensed-matter-adjacent" sector grows by one). Once authored, candidate `bears-on` and `derives-from` edges into `modular-tensor-categories`, `freed-hopkins-cobordism`, and `generalized-symmetries` become natural — all of which are *non-trivial absence* edges (fractons sit outside these frameworks).

2. **Author the '(2+1)D SET phases' FC** (forced by entry 4 on `topological-phases-classification`). Axes per the implication: host-MTC × internal-symmetry-G × symmetry-localization-class × symmetry-fractionalization-class × extrinsic-defect-content. Cells: G-enriched Z₂ toric code (Cheng-Gu-Senthil 2017), G-enriched Ising anyon model, FQH SET phases with magnetic-translation enrichment (Barkeshli-Manmana-Vishwanath 2014). The FC sits between `modular-tensor-categories` and `generalized-symmetries`; once authored, the two natural cross-classification edges (specializes from MTC; derives-from SymTFT-organized symmetry data) are both authorable with `axis_mapping` populated. Likely the highest-density single new FC of the post-Phase-B authoring queue.

3. **Author the 'multifractal turbulence models' FC** (forced by `turbulence` entry). Axes per the implication: singularity-spectrum-shape × universality-class × cascade-mechanism × dimensional-range-of-applicability. Cells: Kolmogorov-Obukhov 1962 log-normal, She-Lévêque 1994 log-Poisson, Meneveau-Sreenivasan 1987 p-model, random β-model. Sits in `PROJECT_GOAL_PHENOMENON_LAYER.md` §6 "Macroscopic / classical phenomena" sector, currently uncovered. The Legendre-transform structural map between ζ_p and f(α) is a candidate for `closure-constraint` self-edge on the FC.

4. **Author the 'holographic-QCD models' FC** (forced by `chpt` entry). Axes per the implication: background-geometry × flavor-brane-embedding × confinement-mechanism × large-N-type × ChPT-LECs-derivable. Cells: Erlich-Katz-Son-Stephanov 2005 hard-wall, Da Rold-Pomarol 2005 alternative hard-wall, Karch-Katz-Son-Stephanov 2006 soft-wall, Sakai-Sugimoto D4/D8, Brodsky-de Téramond 2008 dynamical AdS/QCD. Sits across the seam between hep-ph and formal-high-energy sectors of `PROJECT_GOAL_PHENOMENON_LAYER.md` §6. Once authored, the natural `bears-on` edge `chpt → holographic-QCD-models` discharges the carrier's `bridges[0].bridge_status` from "partial" toward "established (analytic in large-N limit)".

5. **Extend `freed-hopkins-cobordism` along its two new forced axes** (forced by entries 1 and 2 on `topological-phases-classification`). The two `new_axis` implications jointly imply that the FC's current (tangential-structure × spacetime-dimension) cell grid expands to (tangential-structure × internal-symmetry-G × crystalline-space-group × spacetime-dimension). Populating cells across the expanded grid is substantial subfield-specific work: the Atiyah-Hirzebruch spectral sequence computations of Shiozaki-Xiong-Gomi 2018 supply the crystalline-axis cell content; the Spin × BG bordism computations across G (Kapustin-Thorngren-Turzillo-Wang 2015 worked examples) supply the internal-symmetry-axis content. Multiple authoring passes; not Phase B.

6. **Cross-FC edges downstream of (1) through (5).** Many edges become natural once the four forced FCs land: `derives-from(fracton-phases, modular-tensor-categories)` recorded as `partial` or `impossible` (the fracton FC is structurally *not* an MTC); `specializes(set-phases, modular-tensor-categories)` and `derives-from(set-phases, generalized-symmetries)` both with `axis_mapping`; `derives-from(multifractal-turbulence-models, freed-hopkins-cobordism)` recorded as `impossible` (these are continuum classifications, not topological); `bears-on(chpt, holographic-QCD-models)` discharging the QCD→ChPT bridge. Normal authoring tasks once the FCs exist; not Phase B.

7. **MCP worker rebuild (Step N+1).** See §5 handoff note. With this sweep landing, all four planned subfield authoring passes per v17 spec §9.2 are complete. The maintainer's path is now Step N+1 — rebuild the worker against v17 with `find_signal_implications` and the `find_loose_ends` extension — making the on-target test in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6.2 ("What does a live anomaly imply structurally?") runnable.

None of these is blocking. The 6 entries above are landable independently of the follow-ups.

---

## 5. Handoff status update

After this sweep lands:

- **`PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`** — update the "Shipped milestones" section with a new Step 8 entry: "Condensed-matter / continuum sweep — 6 new entries on 3 carriers (`topological-phases-classification` +4, `turbulence` +1, `chpt` +1); `ns-regularity` honest-absent per §1.2 self-check on its 3 candidate-targeting resolutions. Honest absences also recorded on 3 of 7 `topological-phases-classification` candidate resolutions, 2 of 3 `turbulence` resolutions, and 2 of 3 `chpt` candidate resolutions, all per §1.2." Recommended next pickup: **Step N+1, MCP worker rebuild.** Phase B authoring is closed.

- **`TRACKS_AFTER_PHASE_A.md`** — Track 2 (Predictive Layer Phase B `if_real_implies`) is now content-complete pending the MCP worker rebuild. The Track 2 sketch's "Diff-shape estimate" line ("upper bound on authored entries is on the order of dozens, not hundreds") is empirically validated at the lower end of that range: 23 entries across 14 carriers, with 3 honest-absence carriers. The maintainer's ordering recommendation (Track 1 → Track 2 → Track 3 → Track 1' → Track 5 → Track 4) advances by one position; Track 3 (Phase C `quantitative_scale`, `resolves`) can now be scoped without blocking on Phase B authoring.

- **`PROJECT_GOAL_PHENOMENON_LAYER.md` §6** — no immediate update; the four forced FCs from this sweep (fractons, SET phases, multifractal turbulence models, holographic-QCD models) span the §6 sectors "condensed-matter-adjacent" (fractons, SET), "Macroscopic / classical phenomena" (multifractal turbulence), and the hep-ph / formal-high-energy seam (holographic QCD). Follow-ups #1 through #4 above are the natural moves once Phase B closes.

- **`PROJECT_GOAL_PREDICTIVE_LAYER.md` §6.2** — the on-target test ("Test 6.2 — What does a live anomaly imply structurally?") moves from "returns the empty set" toward "runnable" once the MCP worker rebuild lands. After Step N+1, an AI session can ask `find_signal_implications(topological-phases-classification)` and get back the four conditional structural claims authored here, each with literature anchors on both halves of the §4 test.

**Phase B progress tally (after Step 8).** Of 17 carriers, 14 carry `if_real_implies` entries (up from 11): the 5 hep-ph carriers (Steps 4–5), 4 of 6 cosmology/QG carriers (Step 6 — `bh-thermodynamics` and `cosmological-models` honest-absent), 2 foundations carriers (Step 7), and 3 of 4 condensed-matter / continuum carriers (this sweep — `ns-regularity` honest-absent). 3 carriers remain empty by design (honest absences with documented §1.2 rationale): `bh-thermodynamics`, `cosmological-models`, `ns-regularity`. Total `if_real_implies` entries across the dataset: **23** (up from 17 — 13 hep-ph + cosmology/QG entries from Steps 4–6, plus the pre-existing koide entry, plus Step 7's measurement-problem entry, plus this sweep's 6 condensed-matter / continuum entries).

**Phase B authoring is closed.** The next move is Step N+1: rebuild the MCP worker against v17 schema and v40+ data, with new tool `find_signal_implications(carrier_id, resolution_id?)` per `MAP_v17_schema_spec_extension.md` §8 and extension of `find_loose_ends` to surface `if_real_implies` entries alongside the existing loose-ends payload. Cloudflare worker redeploy per `PROJECT_INFRASTRUCTURE.md` §3. After Step N+1 lands, the on-target test in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6.2 becomes runnable for the first time, and the Phase B chain — spec → schema → validator → authoring → MCP rebuild — closes. Phase C (`quantitative_scale`, `resolves`) is then the queued next layer per `TRACKS_AFTER_PHASE_A.md` Track 3.

---

## 6. Validation evidence

Run against the modified file (`Map_v34_consolidated.json` with the §3.1, §3.3, §3.4 entries inserted) using `scripts/validate.py` and `schema/Map_v17_schema.json`:

```
============================================================
Validation report: Map_v34_consolidated.json
  Schema:     Map_v17_schema.json
  Nodes:      71
  Edges:      191
  Families:   4
============================================================

Legacy errors (constrains-subtype carryover): 4

New schema errors: 0

Validator-side rule errors (rules 19, 20, 21, 23, 24, 25, 26): 0

Validator-side warnings (rule 22, axis_mapping recommended): 0

PASS — dataset validates cleanly (legacy errors within tolerance).
```

Diff against the baseline: +13,780 chars across three localized regions:

- `topological-phases-classification`: immediately after `candidate_targeting`, before `citations` (+~10.5 KB; 4 entries; 2 × `new_axis` and 2 × `new_FC` implications).
- `turbulence`: immediately after `equations`, before `citations` (+~2.0 KB; 1 entry; 1 × `new_FC`).
- `chpt`: immediately after `equations`, before `citations` (+~1.3 KB; 1 entry; 1 × `new_FC`).

No other nodes touched; edge count unchanged (191); schema version unchanged (`Map_v17_schema.json`); all v15.3-era and v16-era and v17-era fields unmodified. `ns-regularity` is unchanged (honest absence). The diff renders cleanly on GitHub as three additions on three nodes; no field reorder, no removal, no rewrite of existing content.

---

*End of PREDICTIVE_LAYER_PHASE_B_STEP_8_CONDENSED_MATTER_CONTINUUM_SWEEP.md, v1.*
