# Predictive Layer Phase B — Step 7 foundations authoring sweep

**Document type:** Authoring-sweep report. Records the §4 admissibility-test application, the §2.5 self-check, the audit of the pre-existing `koide-formula` entry, and the `if_real_implies` JSON to land on `measurement-problem`.

**Status:** v1. Authored 2026-05-21. Sweep against v17 spec §2 (field shape) and §4 (binding admissibility test). Third of four planned subfield sweeps per v17 spec §9.2; the hep-ph sweep (Steps 4–5) and cosmology/QG sweep (Step 6) are closed. The condensed-matter / continuum sweep (Step 8 or later) remains queued.

**Binding parents:** `MAP_v17_schema_spec_extension.md`, `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md`, `META_v21_1_methodology_firewall.md`, `PREDICTIVE_LAYER_PHASE_B_STEP_6_COSMOLOGY_QG_SWEEP.md` (template).

**Scope:** Two carriers — `measurement-problem` (open-frontier) and `koide-formula` (totality-approach). Outcome: **1 new entry on `measurement-problem`; `koide-formula` entry pre-existing in v40 and confirmed admissible by audit (no change).**

---

## 0. How to apply this sweep

For `measurement-problem`, paste the JSON block in §3.1 as the value of `if_real_implies:` at the top level of the carrier node in `data/Map_v34_consolidated.json`. The field is optional and goes alongside (not inside) `candidate_targeting`, `citations`, etc. Placement matches the Step 6 convention: immediately after `candidate_targeting`, before `citations`.

For `koide-formula`, no change. The audit in §3.2 confirms the pre-existing entry passes the §4 test cleanly and is materially tighter than the `MAP_v17_schema_spec_extension.md` §6.3 illustrative draft. Reproducing the §6.3 draft into the data file would be a regression.

The PR description for this sweep MUST include the §2.5 self-check statement from §1.2. CI (`scripts/validate.py` with Rules 24–26) passes on the modified file: 71 nodes, 191 edges, 0 new schema errors, 0 validator-rule errors, 4 known legacy `constrains` carryovers (within tolerance per `PROJECT_INFRASTRUCTURE.md` §2).

The MCP worker rebuild (Step N+1) will surface these entries via `find_signal_implications`; until that happens the entries are queryable only by parsing the data file directly.

---

## 1. §4 admissibility test and §2.5 self-check — applied to this sweep

### 1.1 The §4 test (binding, reproduced from v17 spec)

An `if_real_implies` entry is admissible only if all three hold:

1. **Antecedent is a literature position.** The if-real condition names a resolution already proposed in the subfield's published literature — a position a working specialist would recognize as having been taken, not one the cartographer infers from dataset structure. `condition_citations` names the publications where the position is stated.
2. **Consequent is structural-by-derivation, not by pattern.** The implied structural change follows from the antecedent by a *published* derivation, not by inference from cross-classification patterns in v40. `derivation_citations` on each implication names the publications where the antecedent → consequent step is performed.
3. **Both halves cite.** Citation arrays both non-empty; schema enforces `minItems: 1`.

### 1.2 §2.5 self-check (binding for this PR description)

> Before adding the 1 entry below: I asked, "Would I author this conditional structural claim independent of any pattern observation in the existing dataset? Specifically, if I had only the subfield literature and not the v40 cross-classification graph in front of me, would the same antecedent → consequent step be defensible from the literature alone?"
>
> For the `objective-collapse-resolves-measurement` entry the answer is **yes**: it came from the published foundations-of-physics literature (Ghirardi-Rimini-Weber 1986 GRW; Pearle 1989 CSL; Diosi 1989 gravitational; Penrose 1996; Bassi-Ghirardi 2003 *Phys Rep* classification review; Bassi-Lochan-Satin-Singh-Ulbricht 2013 *RMP* updated review). The Bassi-Ghirardi 2003 review IS a published classification of collapse-model variants tabulating GRW, CSL, mass-density CSL, Diosi-Penrose, and others against their predicted experimental signatures. No part of the entry uses an ADE-clique-style structural homology between FCs as a derivation step.
>
> Entries that failed the self-check and were dropped from this sweep — all from `measurement-problem`'s seven `candidate_targeting` resolutions:
>
> - **measurement-problem / Many-worlds (Everett 1957, Wallace 2012)** — the antecedent is a stated literature position. The consequent fails §4 part 2: no published derivation forces a Mendeleev-style classification of physical content. The decoherent-histories formalism (Griffiths 1984, Gell-Mann-Hartle 1993, Omnès 1992) and einselection (Zurek 2003) provide a mathematical apparatus for branch analysis, but the apparatus classifies *frameworks of description*, not physical content with tabulated cells and axes. Many-worlds asserts the bare formalism is complete and adds no Mendeleev-style content — its content is the same as standard QM.
>
> - **measurement-problem / Decoherence + branching (Zurek 2003)** — same reason as Many-worlds. Decoherence-induced einselection produces an effective preferred basis but does not classify physical content in a Mendeleev sense.
>
> - **measurement-problem / Bohmian mechanics (Bohm 1952, Dürr-Goldstein-Zanghi 1992)** — the antecedent is a stated literature position. The variant landscape (Bohm 1952 original, Dürr-Goldstein-Zanghi 1992 minimal, Bohm-Hiley quantum-potential, Struyve-Westman 2007 field-theoretic extensions) is real. The consequent fails §4 part 2: there is no published classification review for Bohmian variants comparable to Bassi-Ghirardi 2003 for collapse models. Variants exist in scattered papers without an integrated derivation of a Mendeleev-style classification. Mirrors the Step 6 fuzzball / soft-hair drops.
>
> - **measurement-problem / QBism and relational QM (Fuchs 2010, Rovelli 1996)** — the antecedent is a stated literature position. The consequent fails §4 part 2: QBism explicitly denies a deeper ontology to classify, treating QM as epistemic; relational QM relativizes content to observer-system pairs. Neither forces a new content classification.
>
> - **measurement-problem / tensor-network entanglement-renormalization (Vidal 2007, Swingle 2012)** — the v40 record itself records "doesn't directly address measurement problem but provides information-theoretic structure." The antecedent isn't a measurement-event resolution proper; tensor networks classify ground states, not measurement events. Subsumed by the cosmology/QG sweep's AdS/CFT entry in any case (Step 6 §3.1, §1.2 drop list).
>
> - **measurement-problem / Operational reconstructions (Hardy 2001, Chiribella-D'Ariano-Perinotti 2011)** — the antecedent is a stated literature position with a published classification of axiom systems (Hardy 2001, CDP 2011, Masanes-Müller 2011, Barnum-Barrett-Leifer-Wilce 2014). The consequent fails §4 part 1 in a subtle way: operational reconstructions resolve "why this formalism?" rather than "what happens at measurement?" The v40 candidate_targeting annotation is explicit on this — "partially address why-this-formalism question but not the measurement-event question directly." The published classification of axiom systems exists, but doesn't condition on a measurement-event resolution.
>
> The dropped resolutions remain real positions in the subfield literature. The drop is from this sweep, not from the carrier's `candidate_targeting` field, which is untouched. None of these resolutions admits a clean §4-passing structural consequent under current literature; if specific Mendeleev-style classification papers emerge (e.g., a "Bohmian variants" review on the scale of Bassi-Ghirardi 2003), the dropped resolutions become re-candidate-able in a future authoring pass.

### 1.3 Constraints applied to the implication

The single implication on the `objective-collapse-resolves-measurement` entry uses `kind: new_FC` with `target: null`. Per v17 spec §3.2 / validator Rule 24, this requires no target id resolution. Rules 25 and 26 are not engaged (only one entry, no `forced_edge` implications).

The choice of `new_FC` over `forced_edge` or `promotes_subtype` reflects the v40 state: no FC currently organizes collapse-model variants. The closest existing structural neighbors are `qm-foundational` (architecture, not FC) and `hilbert-measurement` (regime-content, not FC). The "collapse models" classification is forced into existence by the resolution; the FC itself is authored downstream via the normal FC-authoring pipeline (see §4 follow-up #1).

---

## 2. Sweep summary

| Carrier | Entries (after sweep) | New in this sweep | Mix of `kind` values | Notes |
|---|---|---|---|---|
| `measurement-problem` | 1 | **+1** | 1 × `new_FC` | Objective-collapse family (GRW/CSL/Diosi-Penrose). 6 candidate resolutions dropped per §1.2. |
| `koide-formula` | 1 | 0 (audit only) | 1 × `new_FC` | Pre-existing entry (`koide-as-flavor-symmetry-signal`) confirmed §4-admissible. |

**Total new entries: 1 on 1 carrier; 1 audit-only confirmation.**

### Notes on the kind-value distribution

- The single new implication uses `new_FC`, consistent with the cosmology/QG sweep's dominant kind (6 of 9 in Step 6) and the hep-ph sweep's pattern. Foundations resolutions that pass §4 tend toward `new_FC` because the foundations carriers sit far from existing FC nodes in the v40 graph — there are few cells/edges/axes for `promotes_subtype`/`new_axis`/`forced_edge`/`new_cell` to land against.
- `forced_edge` would have required identifying two existing FC ids the resolution structurally connects. The foundations carriers don't have that neighborhood; the cosmology/QG `dark-matter` carrier was the unusual case where the existing `dark-matter-candidates`, `compact-astrophysical-objects`, and `modified-gravity-alternatives` FCs supplied targets.
- This sweep adds zero `forced_edge`, `promotes_subtype`, `new_cell`, or `new_axis` implications. Honest reflection of foundations carriers' graph-distance from the structural backbone.

### Honest absences

- 6 of 7 `measurement-problem` candidate resolutions dropped (see §1.2). Documented; not silent. Each remains in the carrier's `candidate_targeting` field.
- 0 dropped resolutions on `koide-formula`. The carrier's `equations.native.equations[0].loose_ends[0].candidate_targeting` lists "various flavor-symmetry proposals" as a single gestural pointer; the pre-existing entry's resolution-id `koide-as-flavor-symmetry-signal` captures this directly. No additional resolutions on the carrier admit a separate §4-passing entry.

---

## 3. Per-carrier entries

### 3.1 `measurement-problem` (open-frontier, +1 entry)

The carrier hosts QM's organizing-structure-failure question (why measurement events appear non-unitary). Seven candidate-targeting programs in `candidate_targeting`; one passes §4. The discharge against §4 is described in §1.2 above; the surviving entry follows.

```json
"if_real_implies": [
  {
    "resolution": "objective-collapse-resolves-measurement",
    "condition": "If the measurement problem is resolved by an objective stochastic modification of unitary Schrödinger evolution producing genuine wavefunction collapse — as in the GRW, CSL, and Diosi-Penrose families — with collapse rate, localization length, and noise structure fixed by empirically-constrained parameters.",
    "condition_citations": [
      "Ghirardi-Rimini-Weber 1986 'Unified dynamics for microscopic and macroscopic systems' Phys Rev D 34:470",
      "Pearle 1989 'Combining stochastic dynamical state-vector reduction with spontaneous localization' Phys Rev A 39:2277",
      "Diosi 1989 'Models for universal reduction of macroscopic quantum fluctuations' Phys Rev A 40:1165",
      "Penrose 1996 'On gravity's role in quantum state reduction' Gen Rel Grav 28:581"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC organizing the family of objective-collapse models (GRW, CSL, mass-density CSL, Diosi-Penrose gravitationally-induced collapse, and relativistic extensions) would be forced, with axes (noise structure [discrete-hit vs continuous] × collapse operator [position vs mass-density vs curvature] × parameter set [collapse rate λ, localization length r_C, gravitational scale where applicable] × relativistic-extension status). Cells are specific collapse-model proposals with predicted signatures (spontaneous X-ray emission from charged matter, mass-density-dependent collapse rates, free-test-mass anomalous heating) directly comparable to current experimental bounds.",
        "derivation_citations": [
          "Bassi-Ghirardi 2003 'Dynamical reduction models' Phys Rep 379:257",
          "Bassi-Lochan-Satin-Singh-Ulbricht 2013 'Models of wave-function collapse, underlying theories, and experimental tests' Rev Mod Phys 85:471"
        ]
      }
    ]
  }
]
```

**§4 evidence summary.**

- *Antecedent (§4 part 1):* Objective stochastic collapse is a 40-year-old established position. GRW 1986 introduces the discrete-hit dynamics; Pearle 1989 extends it to CSL (continuous spontaneous localization); Diosi 1989 and Penrose 1996 propose gravity-induced collapse with parameters fixed by gravitational scale. Each is the canonical citation for its respective branch.
- *Consequent (§4 part 2):* The Bassi-Ghirardi 2003 *Physics Reports* review is a published classification of collapse models — it explicitly tabulates GRW, CSL, mass-density CSL, Diosi-Penrose, and other variants by their stochastic dynamics, collapse operator, parameter set, and experimental signatures. The Bassi-Lochan-Satin-Singh-Ulbricht 2013 *Reviews of Modern Physics* article extends the classification with the experimental landscape (X-ray emission bounds from IGEX/MAJORANA, free-test-mass bounds from LISA Pathfinder, etc.). The classification structure named in the implication's description is read from these reviews, not synthesized from v40 cross-classification patterns.
- *Both citations (§4 part 3):* 4 condition citations + 2 derivation citations, all non-empty arrays.

**Note on relativistic extensions.** Pearle and others have produced relativistic CSL formulations (Bedingham-Dürr-Ghirardi-Goldstein-Tumulka-Zanghi 2014, Tumulka 2006 rGRWf); the "relativistic-extension status" axis in the implication's description captures the structural incompleteness across the variant family. This is consistent with §4 — the relativistic-extension axis is identified in the classification literature, not invented here.

### 3.2 `koide-formula` (totality-approach, audit only — pre-existing entry confirmed)

The carrier's pre-existing v40 entry (`koide-as-flavor-symmetry-signal`) is materially tighter than the illustrative draft in `MAP_v17_schema_spec_extension.md` §6.3 — broader "gauged or discrete" framing, additional Ishimori et al. 2010 review for the discrete branch. Audit verdict: **admissible, no change required.**

**Pre-existing entry (verbatim from v40):**

```json
"if_real_implies": [
  {
    "resolution": "koide-as-flavor-symmetry-signal",
    "condition": "If the Koide formula's ~5-decimal-place agreement reflects an exact relation enforced by an underlying flavor symmetry (gauged or discrete) acting on the charged-lepton sector, rather than a numerical coincidence.",
    "condition_citations": [
      "Koide 1983 'A fermion-boson composite model of quarks and leptons' Phys Rev D 28:252",
      "Sumino 2009 'Family gauge symmetry as an origin of Koide's mass formula and charged lepton spectrum' JHEP 0905:075",
      "Foot 1994 'A note on Koide's lepton mass relation' arXiv:hep-ph/9402242"
    ],
    "implications": [
      {
        "kind": "new_FC",
        "target": null,
        "description": "A new FC organizing the flavor-symmetry candidates compatible with a Koide-form charged-lepton mass relation would be forced, with axes (symmetry type [gauged vs discrete] × group × representation assignment on the lepton family × radiative-correction structure required to land on the empirical Koide value). The candidate set includes U(3)_F family gauge symmetry (Sumino) and non-Abelian discrete flavor symmetries (S3, A4, S4 and relatives) studied in the broader flavor-model literature.",
        "derivation_citations": [
          "Sumino 2009 'Family gauge symmetry as an origin of Koide's mass formula and charged lepton spectrum' JHEP 0905:075",
          "Ishimori et al. 2010 'Non-Abelian Discrete Symmetries in Particle Physics' Prog Theor Phys Suppl 183:1"
        ]
      }
    ]
  }
]
```

**§4 audit verdict.**

- *Antecedent (§4 part 1):* Koide-as-symmetry-signal is a stated literature position. Koide 1983 introduces the formula; Foot 1994 gives a geometric reinterpretation (mass vector at 45°); Sumino 2009 proposes the gauged U(3)_F family-symmetry mechanism. The "gauged or discrete" framing of the condition is honest about which papers anchor which branch — Sumino for the gauged side, discrete-flavor-symmetry literature (Ma-Rajasekaran 2001, Harrison-Perkins-Scott 2002, Ishimori et al. 2010 review) for the discrete side. **PASSES.**
- *Consequent (§4 part 2):* Sumino 2009 derives one specific gauged-symmetry mechanism for Koide; Ishimori et al. 2010 is a published classification of non-Abelian discrete symmetries used in particle physics, including for charged-lepton mass relations. The new_FC implication runs: (Sumino derives gauged-flavor cell) + (Ishimori review classifies discrete-flavor cells) → the union space of flavor-symmetry candidates compatible with Koide is a Mendeleev-style classification with the named axes. The derivation chain rests on published reviews and original mechanism papers, not on cross-classification patterns in v40. **PASSES.**
- *Both citations (§4 part 3):* 3 + 2 non-empty arrays. **PASSES.**

**Why the pre-existing entry is tighter than the §6.3 draft.** The illustrative draft in `MAP_v17_schema_spec_extension.md` §6.3 has resolution-id `koide-as-discrete-flavor-signal` with a description specifying "S3, S4, A4, A5 candidates" and derivation citations limited to Sumino 2009. This is inaccurate in two ways: (a) Sumino 2009 is a *gauged* family-symmetry proposal, not discrete, so citing Sumino as the sole derivation for a discrete-only consequent overreaches; (b) restricting to discrete symmetries silently drops the gauged branch where Sumino's mechanism actually lives. The pre-existing v40 entry corrects both — broader "gauged or discrete" framing in the condition and description, and Ishimori et al. 2010 added as the discrete-branch derivation reference. The §6.3 draft would have failed a strict §4 audit; the landed version passes.

This is an example of the spec's §6 examples being correctly treated as *illustrative* rather than binding (`MAP_v17_schema_spec_extension.md` §6 opening: "they are *illustrative* — actual Phase B authoring sweeps will draft their own entries against the §4 admissibility test"). The Step 7 sweep's substantive task on `koide-formula` is the audit recorded above; the entry stands as-landed.

---

## 4. Follow-up authoring tasks unlocked by this sweep

The sweep deliberately leaves several adjacent moves for downstream authoring rather than overreaching into them in this PR. Each is named so it can be picked up cleanly later.

1. **Author the 'objective-collapse models' FC** (forced by `measurement-problem` entry). Axes per the implication: noise-structure × collapse-operator × parameter-set × relativistic-extension status. Cells: GRW (original), CSL (Pearle), mass-density CSL (Adler), Diosi-Penrose gravitational, Bedingham et al. relativistic, etc. This is a normal FC-authoring pass per `PROJECT_GOAL_PHENOMENON_LAYER.md` §6 ("Foundations of quantum mechanics" sector is currently uncovered). Once authored, this FC's relationship to `hilbert-measurement` (regime-content) becomes a candidate `bears-on` edge.

2. **Author the 'flavor-symmetry models' FC** (forced by `koide-formula` entry, with substantial neighborhood overlap into the hep-ph sweep's `flavor-puzzle` carrier). Axes per the implication: symmetry-type × group × lepton-family-representation × radiative-correction structure. Cells: U(3)_F (Sumino), S3, A4, S4, A5, T', and other discrete groups from the Ishimori et al. 2010 review. This FC sits structurally upstream of any future `neutrino-mixing-data` phenomenon-FC (mentioned as a coverage gap in `PROJECT_GOAL_PHENOMENON_LAYER.md` §6 "BSM phenomenology beyond SU(5)"). Authoring it is a structural-FC pass shared between the foundations sweep's koide implication and the hep-ph sweep's flavor-puzzle implication.

3. **Cross-FC edges downstream of (1) and (2).** Once the 'objective-collapse models' FC lands, candidate edges include `bears-on(qm-foundational, 'objective-collapse-models')`, `bears-on('objective-collapse-models', hilbert-measurement)`. Once the 'flavor-symmetry models' FC lands, candidate edges include `derives-from(sm-rep-content, 'flavor-symmetry-models')` for the gauged branch and `specializes(ade-lie-algebras, 'flavor-symmetry-models')` for the SU(3)_F-flavor link. These are normal authoring tasks once the FCs exist; not Phase B.

4. **Condensed-matter / continuum sweep.** Remaining four carriers per `MAP_v17_schema_spec_extension.md` §9.2: `topological-phases-classification`, `ns-regularity`, `turbulence`, `chpt`. Each requires its own subfield-literature pass against the §4 test. Smallest-remaining sweep before the MCP rebuild.

5. **MCP worker rebuild (Step N+1).** After the condensed-matter sweep lands (or earlier if the maintainer chooses), rebuild the worker against v17 with `find_signal_implications` and the `find_loose_ends` extension. Tests `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6.2 become runnable.

None of these is blocking. The 1 entry above is landable independently of the follow-ups.

---

## 5. Handoff status update

After this sweep lands:

- **`PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`** — update the "Shipped milestones" section with a new Step 7 entry: "Foundations sweep — 1 new entry on `measurement-problem` (objective-collapse-resolves-measurement); `koide-formula` audit confirmed pre-existing entry passes §4 (no change). Honest absences recorded on 6 of 7 `measurement-problem` candidate resolutions per §1.2." Recommended next pickup: **Step 8, condensed-matter / continuum sweep (`topological-phases-classification`, `ns-regularity`, `turbulence`, `chpt`)** — the last subfield sweep before the MCP rebuild.
- **`TRACKS_AFTER_PHASE_A.md`** — no update required; Track 2's progress is captured at the handoff level.
- **`PROJECT_GOAL_PHENOMENON_LAYER.md` §6** — no immediate update; the "Foundations of quantum mechanics" and "BSM phenomenology beyond SU(5)" sectors remain uncovered at the FC level. Follow-ups #1 and #2 above are the natural moves once Phase B closes.

**Phase B progress tally (after Step 7).** Of 17 carriers, 11 now carry `if_real_implies` entries (up from 10), 6 remain empty: `bh-thermodynamics` (honest absence per Step 6 §3.5), `cosmological-models` (honest absence per Step 6 §3.6), `turbulence` (queued for Step 8), `chpt` (queued for Step 8), `ns-regularity` (queued for Step 8), `topological-phases-classification` (queued for Step 8). Total `if_real_implies` entries across the dataset: **16** (up from 15 — 13 hep-ph + cosmology/QG entries from Steps 4–6, plus the pre-existing koide entry, plus this sweep's measurement-problem entry).

---

## 6. Validation evidence

Run against the modified file (Map_v34_consolidated.json with measurement-problem entry inserted) using `scripts/validate.py` and `schema/Map_v17_schema.json`:

```
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

Diff against the baseline: +2,099 chars in a single localized region (immediately after `candidate_targeting` on `measurement-problem`, before `citations`). No other nodes touched; edge count unchanged (191); schema version unchanged (`Map_v17_schema.json`); all v15.3-era and v16-era fields unmodified. The diff renders cleanly on GitHub as a single addition.

---

*End of PREDICTIVE_LAYER_PHASE_B_STEP_7_FOUNDATIONS_SWEEP.md, v1.*
