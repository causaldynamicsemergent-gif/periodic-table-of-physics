# Predictive Layer Phase B — Step 6 cosmology/QG authoring sweep

**Document type:** Authoring-sweep report. Records the §4 admissibility-test application, the §2.5 self-check, and the `if_real_implies` JSON to land on each of the six cosmology/QG carrier nodes.

**Status:** v1. Authored 2026-05-21. Sweep against v17 spec §2 (field shape) and §4 (binding admissibility test). One of four planned subfield sweeps per v17 spec §9.2; the others are hep-ph (queued / in flight), foundations, and condensed-matter / continuum.

**Binding parents:** `MAP_v17_schema_spec_extension.md`, `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`, `META_v21_1_methodology_firewall.md`.

**Scope:** Six carriers — `qg-frontier`, `cc-frontier`, `bh-info-paradox`, `dark-matter`, `bh-thermodynamics`, `cosmological-models`. Outcome: **9 entries on 5 carriers; `cosmological-models` left empty by design.**

---

## 0. How to apply this sweep

For each carrier in §3, paste the JSON block in `if_real_implies:` at the top level of the carrier node in `data/Map_v34_consolidated.json`. The field is optional and goes alongside (not inside) `candidate_targeting`, `equations`, `regime_content_loci`, etc. Order within the node doesn't matter; suggested placement is immediately after `candidate_targeting` for readability.

The PR description for this sweep MUST include the §2.5 self-check statement from §1.2 below. CI must pass (`scripts/validate.py` — Rules 24–26 if Step 3's update has landed; v16 schema otherwise, in which case `if_real_implies` is silently accepted as an unknown field). The MCP worker rebuild (Step N+1) surfaces these entries via `find_signal_implications`; until that happens the entries are queryable only by parsing the data file directly.

If the maintainer wishes to land entries one carrier at a time, the natural order is: `dark-matter` (richest, most-promotes_subtype, most existing-FC targets) → `bh-info-paradox` → `bh-thermodynamics` → `qg-frontier` → `cc-frontier`. `cosmological-models` is unchanged.

---

## 1. §4 admissibility test and §2.5 self-check — applied to this sweep

### 1.1 The §4 test (binding, reproduced from v17 spec)

An `if_real_implies` entry is admissible only if all three hold:

1. **Antecedent is a literature position.** The if-real condition names a resolution already proposed in the subfield's published literature — a position a working specialist would recognize as having been taken, not one the cartographer infers from dataset structure. `condition_citations` names the publications where the position is stated.
2. **Consequent is structural-by-derivation, not by pattern.** The implied structural change follows from the antecedent by a *published* derivation, not by inference from cross-classification patterns in v40. `derivation_citations` on each implication names the publications where the antecedent → consequent step is performed.
3. **Both halves cite.** Citation arrays both non-empty; schema enforces `minItems: 1`.

### 1.2 §2.5 self-check (binding for this PR description)

> Before adding each of the 9 entries below: I asked, "Would I author this conditional structural claim independent of any pattern observation in the existing dataset? Specifically, if I had only the subfield literature and not the v40 cross-classification graph in front of me, would the same antecedent → consequent step be defensible from the literature alone?"
>
> For all 9 entries the answer is **yes**: each came from the published subfield literature (Maldacena 1998 holography; Susskind 2003 landscape; Strominger-Vafa 1996 microstate counting; Almheiri-Penington 2019 islands; Rovelli-Smolin 1995 spin networks; Preskill-Wise-Wilczek 1983 misalignment relic; Goldberg 1983 LSP; Carr-Hawking 1974 PBHs; Milgrom 1983 MOND), each cited in `condition_citations` and `derivation_citations`. No entry uses an ADE-clique-style structural homology between FCs as a derivation step; each derivation is a step performed in a named paper.
>
> Entries that failed the self-check and were dropped from this sweep:
> - **bh-info-paradox / soft hair (Hawking-Perry-Strominger 2016)** — the soft-hair derivation does not produce a Mendeleev-style classification of physical content; it produces a calculational tool. No clear `kind` value applies.
> - **bh-info-paradox / fuzzball (Mathur 2005)** — fuzzball-as-microstate is contested in the literature; specific structural classification not derived in primary references.
> - **qg-frontier / asymptotic safety (Weinberg 1979)** — the conjectured UV fixed point is an architectural claim, not a content-classification one; no Mendeleev-style consequence is published.
> - **qg-frontier / causal sets (Sorkin 2003)** — causal-set kinematics is partial; classification of causal-set content as a Mendeleev-style FC is less developed than for spin networks in LQG.
> - **qg-frontier / tensor networks (Swingle 2012)** — subsumed by AdS/CFT entry; tensor networks are a representation of the holographic state, not a separate structural classification.
> - **cosmological-models / Hubble-tension resolutions (early dark energy and others)** — EDE and competing resolutions modify parameters within FRW but do not force a Mendeleev-style classification onto the backbone; no `kind` value applies.
>
> Entries deferred to a different sweep rather than dropped:
> - **dark-matter / WIMP-LSP-as-DM (Goldberg 1983, Kolb-Turner 1990 WIMP-miracle)** — the §4 test passes (Goldberg 1983 establishes LSP-as-DM; Kolb-Turner 1990 §5 derives the relic-density freeze-out calculation), but the natural `forced_edge` target is a `minimal-superpartner-content` FC that does not yet exist in v40 and is forced into existence by the hep-ph sweep's hierarchy-problem / SUSY-at-TeV entry (per v17 spec §6.2). Authoring WIMP-LSP-as-DM in this sweep with `sm-rep-content` as a placeholder target would create a downstream cleanup burden once the superpartner FC lands. Cleaner to let WIMP-LSP-as-DM land as a follow-up after both the hep-ph sweep and the superpartner-content FC are in place. Recorded here so the deferral is documented, not silent.
>
> The dropped resolutions remain real positions in the subfield literature. The drop is from this sweep, not from the carriers' `candidate_targeting` fields, which are untouched.

### 1.3 Constraints applied to forced_edge

For all `forced_edge` implications below, both `from` and `to` are FC ids already present in v40 (verified against `list_classifications` output). This satisfies validator Rule 24. The spec §6.2 illustrative example uses `forced_edge` with a `to` value forced into existence by an earlier `new_FC` implication in the same entry; this sweep avoids that pattern to keep entries strictly Rule-24-conformant, deferring derived edges to follow-up authoring once the forced FCs land.

---

## 2. Sweep summary

| Carrier | Entries | Mix of `kind` values | Notes |
|---|---|---|---|
| `qg-frontier` | 3 | 2 × `new_FC`, 1 × `new_FC` | AdS/CFT, string-landscape, LQG |
| `cc-frontier` | 1 | 1 × `new_axis` (on a new_FC also implied via qg-frontier) | String-landscape with Λ-distribution axis |
| `bh-info-paradox` | 2 | 2 × `new_FC` | Island formula, Strominger-Vafa |
| `dark-matter` | 3 | 1 × `forced_edge`, 1 × `forced_edge`, 1 × `forced_edge` | QCD-axion, PBH, MOND |
| `bh-thermodynamics` | 0 | — | See §3.5 — Strominger-Vafa already on bh-info-paradox; LQG-microstate carries to qg-frontier's LQG entry. Honest absence here per spec §9.2. |
| `cosmological-models` | 0 | — | See §3.6 — no resolution of a fresh loose-end (Hubble tension) admits a structural consequent per §4. |

**Total entries: 9 on 4 carriers** (revised from initial draft of 11 — see §3.5 and 3.6 rationale).

### Notes on the kind-value distribution

- `new_FC` is the dominant kind (6 of 9). This is the §4-strictest kind — it carries no `target` lookup, so the antecedent → consequent step rests fully on `derivation_citations`.
- `forced_edge` (3 of 9) — all three are on `dark-matter`, the carrier with the richest existing-FC neighborhood (`dark-matter-candidates`, `compact-astrophysical-objects`, `modified-gravity-alternatives` all already exist as cell-level FCs).
- `new_axis`, `promotes_subtype`, `new_cell` (0 each) — none of the entries this sweep produces fits these cleanly. `promotes_subtype` would require resolving specific cell ids from v40; that's a follow-up authoring task and noted as such in §4.

---

## 3. Per-carrier entries

### 3.1 `qg-frontier` (open-frontier, 3 entries)

The QG frontier hosts the canonical cross-architecture-non-sharing question (QFT × GR). The six candidate-targeting programs split: AdS/CFT, string theory, and LQG admit §4-passing structural consequences; tensor networks, causal sets, and asymptotic safety do not (see §1.2 drop list).

```json
"if_real_implies": [
  {
    "resolution": "ads-cft-as-qg-resolution",
    "condition": "If the AdS/CFT correspondence in its strong form (every consistent quantum gravity theory in asymptotically-AdS spacetimes is dual to a CFT on the boundary) is the resolution of the QFT-GR non-sharing in AdS backgrounds",
    "condition_citations": [
      "Maldacena 1998 'The large-N limit of superconformal field theories and supergravity' Adv Theor Math Phys 2:231",
      "Witten 1998 'Anti-de Sitter space and holography' Adv Theor Math Phys 2:253",
      "Gubser-Klebanov-Polyakov 1998 'Gauge theory correlators from non-critical string theory' Phys Lett B 428:105",
      "Aharony-Gubser-Maldacena-Ooguri-Oz 2000 'Large N field theories, string theory and gravity' Phys Rep 323:183"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new formal classification 'AdS quantum-gravity states', organized by axes (boundary-CFT-dual × bulk-geometry × bulk-matter-content), would be forced. Cells are pairs (bulk QG configuration, dual CFT operator content) with the holographic dictionary as the categorical equivalence to cft-bootstrap-exclusion-regions.",
        "derivation_citations": [
          "Maldacena 1998",
          "Witten 1998 (the GKP-Witten relation Z_grav[bulk] = Z_CFT[boundary source] derives the FC structure)",
          "Heemskerk-Penedones-Polchinski-Sully 2009 'Holography from conformal field theory' JHEP 10:079 (CFT bootstrap as constraint on bulk locality)"
        ]
      }
    ]
  },
  {
    "resolution": "string-landscape-as-qg-resolution",
    "condition": "If string theory's UV-complete formulation of QG is the resolution, with the consistent vacua of string/M-theory forming a discrete landscape that classifies the realizable low-energy physics",
    "condition_citations": [
      "Polchinski 1998 'String Theory' Vols I-II, Cambridge University Press",
      "Susskind 2003 'The anthropic landscape of string theory' arXiv:hep-th/0302219",
      "Douglas 2003 'The statistics of string / M theory vacua' JHEP 05:046",
      "Bousso-Polchinski 2000 'Quantization of four-form fluxes and dynamical neutralization of the cosmological constant' JHEP 06:006"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC 'string-theory vacua' (working title), organized by axes (compactification-manifold × flux-content × moduli-stabilization-pattern), would be forced. Each cell is a consistent string vacuum; the FC has ~10^{500} cells by the Douglas / Bousso-Polchinski estimate, and is the host structure for the anthropic resolution of the CC (see cc-frontier).",
        "derivation_citations": [
          "Douglas 2003 (statistics of vacua; explicit classification scheme)",
          "Denef-Douglas 2004 'Distributions of flux vacua' JHEP 05:072 (counting of flux vacua per compactification)",
          "Kachru-Kallosh-Linde-Trivedi 2003 'De Sitter vacua in string theory' Phys Rev D 68:046005 (concrete vacuum construction)"
        ]
      }
    ]
  },
  {
    "resolution": "lqg-as-qg-resolution",
    "condition": "If loop quantum gravity, with spin networks as the kinematical Hilbert-space basis and spin foams as the dynamical histories, is the resolution of the QFT-GR non-sharing — yielding a background-independent quantization of GR",
    "condition_citations": [
      "Rovelli-Smolin 1995 'Spin networks and quantum gravity' Phys Rev D 52:5743",
      "Ashtekar-Lewandowski 1995 'Projective techniques and functional integration for gauge theories' J Math Phys 36:2170",
      "Rovelli 2004 'Quantum Gravity' Cambridge University Press",
      "Thiemann 2007 'Modern Canonical Quantum General Relativity' Cambridge University Press"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC 'LQG spin-network kinematics' would be forced, organized by axes (oriented-graph × edge-SU(2)-representation × node-intertwiner). Each cell is a spin-network state (an equivalence class of graphs decorated by SU(2) reps and intertwiners); the FC content classifies the LQG kinematical Hilbert space.",
        "derivation_citations": [
          "Rovelli-Smolin 1995 (introduction of the spin-network basis and its classification)",
          "Ashtekar-Lewandowski 1995 (rigorous construction of the kinematical Hilbert space as direct sum over graphs)",
          "Baez 1996 'Spin network states in gauge theory' Adv Math 117:253 (categorical structure of spin networks)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.**

- *AdS/CFT entry:* condition is a 25-year-old established literature position with ~25,000 citations to Maldacena 1998 alone; derivation step (FC structure forced by GKP-Witten) is in Witten 1998 §2-3 and is the standard textbook treatment (Aharony-Gubser-Maldacena-Ooguri-Oz 2000 §3).
- *String-landscape entry:* condition is the Susskind 2003 / Douglas 2003 framework, well-established as a literature position even where contested; derivation of the classification scheme is the Douglas 2003 statistics-of-vacua paper itself.
- *LQG entry:* condition is Rovelli-Smolin 1995's program statement (LQG-as-QG); derivation of the FC structure is the spin-network construction in the same paper plus Ashtekar-Lewandowski 1995.

### 3.2 `cc-frontier` (open-frontier, 1 entry)

The CC frontier hosts a cross-architecture reach-termination question. The string-landscape resolution overlaps with `qg-frontier` (same new_FC implied); the additional implication on cc-frontier is the Λ-distribution axis on that FC. Modified-gravity / quintessence and SUSY-cancellation resolutions are skipped per §1.2 (the structural consequents don't pass §4 cleanly without doubling work already covered by `modified-gravity-alternatives` cells or by the hep-ph-sweep's SUSY entry on `hierarchy-problem`).

```json
"if_real_implies": [
  {
    "resolution": "string-landscape-anthropic-as-cc-resolution",
    "condition": "If the cosmological constant value Λ ≈ 10^{−122} (Planck units) is set anthropically by selection across the string-theory landscape, per Susskind 2003 and Bousso-Polchinski 2000",
    "condition_citations": [
      "Weinberg 1989 'The cosmological constant problem' Rev Mod Phys 61:1 (the problem statement)",
      "Weinberg 1987 'Anthropic bound on the cosmological constant' Phys Rev Lett 59:2607 (the anthropic-bound derivation)",
      "Susskind 2003 'The anthropic landscape of string theory' arXiv:hep-th/0302219",
      "Bousso-Polchinski 2000 'Quantization of four-form fluxes and dynamical neutralization of the cosmological constant' JHEP 06:006"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "The 'string-theory vacua' FC implied by qg-frontier's string-landscape resolution would be forced to carry a Λ-distribution axis as a load-bearing classification axis, since anthropic selection across the landscape is the mechanism that selects the observed Λ value. Axes (compactification × flux × Λ-bin); the Λ axis discretizes the four-form-flux quantization per Bousso-Polchinski 2000 §3.",
        "derivation_citations": [
          "Bousso-Polchinski 2000 §3-4 (four-form fluxes quantize Λ contributions; the discrete distribution is derived)",
          "Susskind 2003 §3 (anthropic selection across this distribution as the CC mechanism)",
          "Weinberg 1987 (anthropic bound: Λ-distribution near the observed value is selected by structure formation)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.** The entry deliberately co-implies the same new_FC as the qg-frontier string-landscape entry, with a distinct axis-content claim (Λ-distribution). This is consistent with v17 spec §2's optional `target` semantics for `new_FC`: two carriers can each imply the same FC if the derivations independently force its existence with potentially different axis-content emphases. The downstream FC-authoring pass will reconcile the two implications into a single FC node with the union of forced axes.

### 3.3 `bh-info-paradox` (open-frontier, 2 entries)

```json
"if_real_implies": [
  {
    "resolution": "island-formula-as-info-paradox-resolution",
    "condition": "If the island formula and replica-wormhole derivation of the Page curve (Almheiri-Engelhardt-Marolf-Maxfield 2019, Penington 2019, Almheiri-Hartman-Maldacena-Shaghoulian-Tajdini 2020) is the resolution — Hawking radiation entropy follows the Page curve because the entanglement wedge of the radiation includes islands inside the black hole after the Page time",
    "condition_citations": [
      "Almheiri-Engelhardt-Marolf-Maxfield 2019 'The entropy of bulk quantum fields and the entanglement wedge of an evaporating black hole' JHEP 12:063",
      "Penington 2019 'Entanglement wedge reconstruction and the information paradox' JHEP 09:002",
      "Almheiri-Hartman-Maldacena-Shaghoulian-Tajdini 2020 'Replica wormholes and the entropy of Hawking radiation' JHEP 05:013",
      "Penington-Shenker-Stanford-Yang 2022 'Replica wormholes and the black hole interior' JHEP 03:205"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC 'quantum extremal surfaces and entanglement-wedge islands' would be forced, organized by axes (bulk-subregion × QES-prescription × island-contribution). Cells are pairs (subregion, QES) with the entropy formula S = min ext (Area(QES)/4G + S_bulk(island)). The FC organizes the systematic computation of holographic entropies for black-hole subsystems.",
        "derivation_citations": [
          "Almheiri-Engelhardt-Marolf-Maxfield 2019 (the island formula itself; explicit classification of contributing surfaces)",
          "Penington 2019 (entanglement-wedge prescription as the structural object being classified)",
          "Faulkner-Lewkowycz-Maldacena 2013 'Quantum corrections to holographic entanglement entropy' JHEP 11:074 (RT formula generalization that the island formula extends)"
        ]
      }
    ]
  },
  {
    "resolution": "strominger-vafa-microstate-counting-as-info-paradox-resolution",
    "condition": "If the Strominger-Vafa explicit construction (the count of D-brane microstates of a 5D BPS extremal black hole reproduces the Bekenstein-Hawking entropy S = A/4G exactly) generalizes to non-extremal black holes — i.e., if all black-hole entropy has a microstate origin in a UV-complete theory of quantum gravity such as string theory",
    "condition_citations": [
      "Strominger-Vafa 1996 'Microscopic origin of the Bekenstein-Hawking entropy' Phys Lett B 379:99",
      "Callan-Maldacena 1996 'D-brane approach to black hole quantum mechanics' Nucl Phys B 472:591",
      "Sen 2008 'Black hole entropy function, attractors and precision counting of microstates' Gen Rel Grav 40:2249 (precision tests)",
      "David-Mandal-Wadia 2002 'Microscopic formulation of black holes in string theory' Phys Rep 369:549 (review)"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC 'BPS-BH D-brane microstate configurations' would be forced, organized by axes (BPS-charge-vector × D-brane-bound-state-content × moduli-on-attractor-flow). Cells are specific BPS-BH configurations whose D-brane bound-state count equals exp(S_BH/k_B); the FC classifies the microstate content for the subset of BHs accessible to the string-theoretic derivation.",
        "derivation_citations": [
          "Strominger-Vafa 1996 (the original D-brane microstate counting and its classification structure)",
          "Maldacena-Strominger 1997 'Black hole greybody factors and D-brane spectroscopy' Phys Rev D 55:861 (extension to more configurations)",
          "Sen 2008 (precision microstate counting via attractor mechanism)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.**

- *Island-formula entry:* Almheiri et al. 2019 / Penington 2019 are the standard citations; the island formula's structure (entanglement wedge + quantum extremal surface) is explicitly derived as a classification of contributions in those papers, prior to the present sweep's authoring decision.
- *Strominger-Vafa entry:* Strominger-Vafa 1996 is a foundational result; the D-brane microstate count for the 5D BPS black hole is given as an explicit enumeration, which is the classification structure §4 calls for.

### 3.4 `dark-matter` (open-frontier, 3 entries)

The DM frontier is the richest for Phase B in this sweep because the `dark-matter-candidates` phenomenon FC already exists (18 cells), as do `compact-astrophysical-objects` and `modified-gravity-alternatives`. Several resolutions imply `forced_edge` consequences between these existing FCs.

```json
"if_real_implies": [
  {
    "resolution": "qcd-axion-as-dark-matter",
    "condition": "If the QCD axion produced by the Peccei-Quinn mechanism — and dynamically populated via misalignment in the early universe — constitutes the cold dark matter, with the relic abundance from misalignment naturally falling in the observed range Ω_DM ≈ 0.26 for f_a in the 10^{11}–10^{12} GeV window",
    "condition_citations": [
      "Peccei-Quinn 1977 'CP Conservation in the Presence of Pseudoparticles' Phys Rev Lett 38:1440",
      "Weinberg 1978 'A New Light Boson?' Phys Rev Lett 40:223",
      "Wilczek 1978 'Problem of Strong P and T Invariance in the Presence of Instantons' Phys Rev Lett 40:279",
      "Preskill-Wise-Wilczek 1983 'Cosmology of the invisible axion' Phys Lett B 120:127",
      "Abbott-Sikivie 1983 'A cosmological bound on the invisible axion' Phys Lett B 120:133",
      "Dine-Fischler 1983 'The not-so-harmless axion' Phys Lett B 120:137"
    ],
    "implications": [
      {
        "kind": "forced_edge",
        "target": {
          "from": "dark-matter-candidates",
          "to": "sm-rep-content",
          "subtype": "derives-from"
        },
        "description": "The dark-matter-candidates axion cells would derive structurally from sm-rep-content extended by a Peccei-Quinn U(1)_PQ factor — the axion is the pseudo-Nambu-Goldstone of the spontaneously broken U(1)_PQ that augments the SM gauge content. The misalignment-mechanism derivation in Preskill-Wise-Wilczek 1983 fixes the relic density given f_a; the structural derivation runs sm-rep-content → (SM ⊗ U(1)_PQ) → axion-as-pNGB → axion-as-DM. The forced_edge target uses sm-rep-content as the natural structural source; a dedicated 'axion content' FC would tighten the edge if authored (see §4 follow-up).",
        "derivation_citations": [
          "Preskill-Wise-Wilczek 1983 §2-3 (misalignment-mechanism relic-density derivation)",
          "Abbott-Sikivie 1983 §2 (relic density from misalignment; cosmological bound)",
          "Kim-Carosi 2010 'Axions and the strong CP problem' Rev Mod Phys 82:557 (review tying PQ extension to DM)"
        ]
      }
    ]
  },
  {
    "resolution": "primordial-black-holes-as-dark-matter",
    "condition": "If primordial black holes formed in the early universe from large-amplitude curvature perturbations during inflation, with masses in the surviving allowed windows (~10^{−17} to 10^{−12} solar masses being currently least constrained), constitute a substantial fraction of the dark-matter density",
    "condition_citations": [
      "Carr-Hawking 1974 'Black holes in the early universe' Mon Not R Astron Soc 168:399",
      "Carr-Kuhnel-Sandstad 2016 'Primordial black holes as dark matter' Phys Rev D 94:083504",
      "Bird-Cholis-Munoz-Ali-Haimoud-Kamionkowski-Kovetz-Raccanelli-Riess 2016 'Did LIGO detect dark matter?' Phys Rev Lett 116:201301 (LIGO-window proposal, since constrained)",
      "Carr-Kuhnel 2020 'Primordial black holes as dark matter: Recent developments' Annu Rev Nucl Part Sci 70:355"
    ],
    "implications": [
      {
        "kind": "forced_edge",
        "target": {
          "from": "dark-matter-candidates",
          "to": "compact-astrophysical-objects",
          "subtype": "derives-from"
        },
        "description": "The PBH cells of dark-matter-candidates would derive structurally from the PBH cells of compact-astrophysical-objects, since under the PBH-as-DM hypothesis the dark-matter phenomenon and the compact-astrophysical-object phenomenon coincide for these mass windows. The derives-from edge would carry an axis_mapping (mass-regime ↔ mass-regime; observational-status ↔ observational-status; production-mechanism = primordial-collapse ↔ object-class = PBH).",
        "derivation_citations": [
          "Carr-Hawking 1974 (formation theory of PBHs in the early universe)",
          "Carr-Kuhnel-Sandstad 2016 (explicit mapping between PBH formation and the DM density; constraint analysis)",
          "Carr-Kuhnel 2020 §3-4 (mass-window analysis tying PBH abundances to allowed DM fractions)"
        ]
      }
    ]
  },
  {
    "resolution": "modified-gravity-mond-as-dark-matter-alternative",
    "condition": "If the apparent dark-matter signal at galactic scales is in fact a modification of gravity at low accelerations (MOND, with a_0 ≈ 1.2 × 10^{−10} m/s^2), with or without a covariant completion (TeVeS, RMOND), rather than a particle population",
    "condition_citations": [
      "Milgrom 1983 'A modification of the Newtonian dynamics as a possible alternative to the hidden mass hypothesis' Astrophys J 270:365",
      "Bekenstein 2004 'Relativistic gravitation theory for the modified Newtonian dynamics paradigm' Phys Rev D 70:083509 (TeVeS)",
      "McGaugh-Lelli-Schombert 2016 'Radial acceleration relation in rotationally supported galaxies' Phys Rev Lett 117:201101",
      "Skordis-Zlosnik 2021 'New relativistic theory for modified Newtonian dynamics' Phys Rev Lett 127:161302 (RMOND, recovers CMB)"
    ],
    "implications": [
      {
        "kind": "forced_edge",
        "target": {
          "from": "dark-matter-candidates",
          "to": "modified-gravity-alternatives",
          "subtype": "specializes"
        },
        "description": "The entire dark-matter-candidates FC would be specialized by (or, under a strong reading, structurally excluded by) modified-gravity-alternatives, since under MOND the DM phenomenon is reinterpreted as a low-acceleration gravity effect and the particle-DM cells lose load-bearing-ness. The specializes-edge expresses the mutual-exclusivity structure rather than asserting either FC's content is wrong; in the §4 sense, the entry records that the resolution would change which FC organizes the empirical DM signal.",
        "derivation_citations": [
          "Milgrom 1983 (original MOND derivation; specific acceleration scale a_0 fixed by galactic rotation data, not fit per-galaxy)",
          "McGaugh-Lelli-Schombert 2016 (radial-acceleration-relation derivation: a single function fits ~150 galaxies; structural prediction that DM particle theory must explain post-hoc)",
          "Skordis-Zlosnik 2021 (RMOND derivation showing modified gravity can reproduce CMB acoustic structure, addressing a historical objection)"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.**

- *QCD-axion entry:* The misalignment-mechanism derivation is a classic calculation (Preskill-Wise-Wilczek 1983, Abbott-Sikivie 1983, Dine-Fischler 1983 all in the same Phys Lett B issue). Note: the `forced_edge` target uses `sm-rep-content` because the PQ mechanism extends the SM gauge content directly (SM ⊗ U(1)_PQ). A dedicated `axion-content` structural FC would be a tighter target; authoring it is §4 follow-up #6 below.
- *PBH entry:* The forced edge between two existing phenomenon FCs (`dark-matter-candidates` ↔ `compact-astrophysical-objects`) is the cleanest §4 case in the entire sweep — both FCs exist with PBH cells, and the derivation explicitly maps between them.
- *MOND entry:* The McGaugh-Lelli-Schombert 2016 radial-acceleration-relation derivation is the strongest non-trivial structural prediction of MOND. The implication uses `specializes` rather than `derives-from` to express the mutual-exclusivity structure between particle-DM and gravity-modification resolutions.

### 3.5 `bh-thermodynamics` (totality-approach, 0 entries — honest absence)

**Why no entries.** The carrier hosts the BH-microstate-origin question (in `equations.native.equations[0].loose_ends[0]`). The three candidate-targeting programs in the loose end are:

1. **String theory (Strominger-Vafa)** — already authored on `bh-info-paradox` (§3.3 entry 2). Per spec §5, the `if_real_implies` field's outer-array resolution-id namespace is per-carrier; the same resolution may appear on multiple carriers if independently motivated. Here, the bh-info-paradox entry's `new_FC` (BPS-BH D-brane microstate configurations) is the structural payoff; reproducing the entry on `bh-thermodynamics` would duplicate the implication. The carrier's microstate-origin loose end is structurally answered by the same FC; no second `if_real_implies` entry is warranted.

2. **Loop quantum gravity (Ashtekar-Baez-Corichi-Krasnov 1998)** — the LQG-BH-entropy derivation counts spin-network edges piercing the horizon. The structural payoff is the same `new_FC` 'LQG spin-network kinematics' implied by qg-frontier's LQG entry (§3.1 entry 3). A second new_FC for "BH-entropy spectrum within LQG" would be a derived structure once spin-network-kinematics exists; per §1.3 it's deferred to downstream authoring.

3. **Fuzzball (Mathur 2005)** — dropped per §1.2.

The honest result per spec §9.2: the carrier's `if_real_implies` field is absent. The carrier's existing `equations.native.equations[0].loose_ends[0].candidate_targeting` remains the load-bearing record of the microstate-origin question. Adding entries here just to populate the field would violate the §4 firewall.

### 3.6 `cosmological-models` (totality-approach, 0 entries — honest absence)

**Why no entries.** The carrier's three loose ends (dark matter, dark energy / CC, Hubble tension) split as follows:

- **Dark matter** — points to `dark-matter` carrier (§3.4), whose 3 entries are the load-bearing record. No separate `cosmological-models`-level entry is needed.
- **Dark energy / CC** — points to `cc-frontier` carrier (§3.2), whose 1 entry is the load-bearing record. Same logic.
- **Hubble tension** — the candidate-targeting programs are (a) early dark energy (Karwal-Kamionkowski 2016, Poulin-Smith-Karwal-Kamionkowski 2019) and (b) systematics in distance-ladder calibration. Neither produces a Mendeleev-style structural classification of physical content. EDE modifies the parameter values of FRW + a new scalar-field sector but does not force a new FC, new axis, new cell, new edge, or promotes_subtype on the v40 backbone — it's a parameter adjustment within existing structure. Systematics is an experimental-uncertainty resolution, not a structural-content resolution. Per §1.2 self-check, no entry passes §4 here.

The honest absence is consistent with spec §9.2's "many proposed resolutions are speculative without a published derivation of structural consequences" warning, and with the design choice in §5 of the spec that Phase B introduces no warning-level rule precisely so that absence reflects firewall-honest emptiness rather than authoring pressure.

---

## 4. Follow-up authoring tasks unlocked by this sweep

The sweep deliberately leaves several adjacent moves for downstream authoring rather than overreaching into them in this PR. Each is named so it can be picked up cleanly later.

1. **Author the 'string-theory vacua' FC** (forced by qg-frontier and cc-frontier entries; new_FC implications). Axes per the implications: compactification-manifold × flux-content × moduli-stabilization-pattern × Λ-bin. This is a normal FC-authoring pass, not Phase B.
2. **Author the 'AdS quantum-gravity states' FC** (forced by qg-frontier's AdS/CFT entry). Axes: boundary-CFT-dual × bulk-geometry × bulk-matter-content. Downstream of this, a `forced_edge` from this FC to `cft-bootstrap-exclusion-regions` via `categorically-equivalent` becomes Rule-24-conformant.
3. **Author the 'LQG spin-network kinematics' FC** (forced by qg-frontier and implicitly by bh-thermodynamics).
4. **Author the 'quantum extremal surfaces and entanglement-wedge islands' FC** (forced by bh-info-paradox entry 1).
5. **Author the 'BPS-BH D-brane microstate configurations' FC** (forced by bh-info-paradox entry 2 and implicitly by bh-thermodynamics).
6. **Author a dedicated 'axion content' structural FC** so that the QCD-axion-as-DM entry's `forced_edge` target can be tightened from `su5-gut-rep-content` (placeholder) to the proper axion-content FC. This is a structural-FC pass per `PROJECT_GOAL_PHENOMENON_LAYER.md` §6 ("BSM phenomenology beyond SU(5)").
7. **Add `promotes_subtype` entries** on specific cells of `dark-matter-candidates`, `compact-astrophysical-objects`, and `modified-gravity-alternatives` once cell ids are resolved against v40. The forced-edge implications above record the FC-level consequences; cell-level promotions are a finer-grained follow-up.
8. **Other-subfield sweeps:** the hep-ph sweep (5 carriers), the foundations sweep (2 carriers), and the condensed-matter / continuum sweep (4 carriers) per v17 spec §9.2 remain queued.

None of these is blocking. The 9 entries above are landable independently of the follow-ups; the MCP rebuild (Step N+1) will surface them via `find_signal_implications` regardless of whether the follow-ups have landed.

---

## 5. Handoff status update

After this sweep lands:

- **`PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`** should be updated with a new "Shipped milestones" entry for Step 6, recording the 9 entries on 4 carriers and the 2 honest absences. The next pickup point becomes Step 7 (the next subfield sweep) or the MCP rebuild (Step N+1) if the maintainer prefers to rebuild after each sweep rather than after all sweeps.
- **`TRACKS_AFTER_PHASE_A.md`** — no update required; Track 2's progress is captured at the handoff level.

Recommended next pickup: **Step 7, foundations sweep (`measurement-problem`, `koide-formula`).** Foundations is a 2-carrier sweep, smaller than cosmology/QG, and the koide-formula example in v17 spec §6.3 is already drafted as an illustration. The hep-ph sweep is larger and may benefit from being run as a separate session.

---

*End of PREDICTIVE_LAYER_PHASE_B_STEP_6_COSMOLOGY_QG_SWEEP.md, v1.*
