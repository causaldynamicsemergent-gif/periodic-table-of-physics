# Description-rewrite content housekeeping CHANGELOG — 2026-05-27

**Scope:** Documentation-only rewrite pass on the canonical data file's user-facing description fields. Removes the four schema-name leak patterns named in `PHYSICIST_FACING_VOCABULARY.md` §3 (`exclusion_only`, `predictions_per_program`, `bound_direction`, bare `resolves edge(s)` plural-noun) where they appear as primary nouns describing physics, plus two implication-description leaks (`forced_edge`, `axis_mapping` as primary nouns). All physics content, citations, numerical values, units, and direction-of-bound preserved byte-identical; only the natural-language packaging changes.

**Delivery shape:** The modified canonical data file ships complete as the upload artifact per `PROJECT_NEXT_STEPS.md` §6 #1 (no exception). This CHANGELOG is a documentation record of the 89 (before, after) pairs — useful for future review of what changed at the prose level, for verifying any individual edit against the live diff, and as reference for the option B follow-up sub-PR. The maintainer does NOT apply edits from this file; the modified data file already contains every edit.

**Counts:**
- 36 `resolves`-type edge `description` fields edited (out of 38; the 2 PASS edges are `edge-rs-dune-pd-pi0-eplus` and `edge-rs-dune-pd-Kplus-nubar`).
- 2 `if_real_implies` implication `description` fields edited (out of 24; both on the `dark-matter` carrier).
- **89 distinct edits total** (87 resolves + 2 implications).
- 101 total target-pattern occurrences removed across the leak surface (`exclusion_only` 26 → 0; `predictions_per_program` 13 → 0; `bound_direction` 34 → 0; `resolves edge(s)` 28 → 0).

**Reference:** `PHYSICIST_FACING_VOCABULARY.md` §3 translation register; `META_v21_1_methodology_firewall.md` (this is a methodology-aligned descriptive change, not an authoring iteration — no new physics content, no new structural claims).

**Verification:** Each `before` string was confirmed present exactly once in its named field against the live canonical data file (`data/Map_v34_consolidated.json` v95). Simulated application of all edits yields zero residual target-pattern occurrences across the 38 fields.

---

## Proposed `_meta.changelog` entry text

Append the following entry to `_meta.changelog` when all field edits are applied. The entry names this as a documentation-only update, gives the entity counts by surface, and cites the discipline the rewrites apply. No schema fields, cell content, citations, or quantitative-scale values were modified.

```json
{
  "version": "v96",
  "date": "2026-05-27",
  "summary": "Description-rewrite content housekeeping — vocabulary discipline applied to resolves-edge and if_real_implies-implication description fields.",
  "scope": "Documentation-only. Rewrites 38 description fields (36 resolves-type edges + 2 dark-matter-carrier if_real_implies implications) to remove four schema-name leak patterns identified by PHYSICIST_FACING_VOCABULARY.md §3 (exclusion_only, predictions_per_program, bound_direction, bare 'resolves edge(s)' plural-noun) where they appeared as primary nouns describing physics, plus the two implication-description leaks (forced_edge, axis_mapping as primary nouns). 89 distinct edits across the 38 fields; 101 target-pattern occurrences eliminated. All physics content, citations, numerical values, units, direction-of-bound preserved byte-identical; only the natural-language packaging changes.",
  "discipline": "PHYSICIST_FACING_VOCABULARY.md §3 translation register; §8 self-check passes on every rewritten description for the four target patterns. Adjacent patterns the discipline also catches (PPP abbreviation, T-conventions T30/T31/T33, §4 admissibility test references, sub-PR landmark cross-references) deferred to a follow-up sub-PR per the option A scope confirmed by the maintainer.",
  "non_changes": "Schema unchanged (still Map_v19_schema.json). No new edges, cells, classifications, predictions, citations, or quantitative_scale entries. No counts shift. Validator gates: all rules 1-36 continue to pass; this is a documentation-only delta on description fields, which the validator does not constrain content of.",
  "firewall_self_check": "§2.5 self-check: would I make these descriptive changes on physics-content grounds alone? Yes — the descriptions are user-facing prose that renders in the explorer's resolves-edge rows and implication trees per sub-PRs E2 / E3 (DISCHARGED 2026-05-27); the rewrites remove schema-name leaks that obscure the physics for a working physicist reader. The rewrites do not commission any new structural pattern, do not change any classification axis, and do not alter any cell content. Firewall-clean.",
  "delivery_shape": "Single file replacement: modified canonical data file shipped complete via present_files, per the file-delivery norm (PROJECT_NEXT_STEPS.md §6 #1). Companion CHANGELOG at methodology/DESCRIPTION_REWRITE_CHANGELOG_2026-05-27.md retained as documentation of the 89 (before, after) pairs for future reference but is not the upload artifact."
}
```

---

## What's recorded in this CHANGELOG

The 89 (before, after) pairs below document every prose change made between v95 and v96. They are organized as the maintainer would have audited them — by source program (for resolves edges) and by carrier (for implications) — but the edits themselves are already applied in the v96 canonical data file. This document exists for:

- **Auditability**: someone reviewing what changed at the prose level can scan this file rather than diffing two 3-MB JSON files.
- **Verification**: anyone wanting to confirm a specific edit against the live data can search the v96 file for the `after` text.
- **Option B follow-up**: when the next content-housekeeping sub-PR addresses the deferred leak patterns (PPP abbreviation, T-conventions, §4 admissibility references, sub-PR landmark caps paragraphs in their broader form), this file's structure is the template.

Each `before` string was verified unique within its entity's description field at v95 before being applied to produce v96.

---

## Part 1 — Resolves-edge description fields (36 edges, 87 edits)

Field path for each entity: `edges[id=<edge_id>].description`


### Program: `axion-haloscope-network` (3 edges, 8 edits)

#### `edge-rs-axion-haloscope-network-ALP-haloscope` → `cell-dm-ALP-haloscope` (2 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity): kind=coupling, value=−16 (log10), units=GeV⁻¹, bound_direction=upper — log10(g_aγγ) < −16 mirrors the cell's existing coupling qs (g_aγγ ≈ 10⁻¹⁶ GeV⁻¹) as the program-wide forward-looking sensitivity floor combining MADMAX, IAXO/RADES, and DMRadio design reaches across the ALP-haloscope envelope.
```

*After:*

```
Sensitivity reach: discovery-floor upper bound g_aγγ ≲ 10⁻¹⁶ GeV⁻¹ (equivalently log₁₀(g_aγγ /GeV⁻¹) ≲ −16), mirroring the cell's existing coupling-strength bound as the program-wide forward-looking sensitivity floor combining MADMAX, IAXO/RADES, and DMRadio design reaches across the ALP-haloscope envelope.
```

**Edit 2**

*Before:*

```
Exclusion_only=true: ALPs are explicitly hypothesis-class candidates (m_a and g_aγγ unlinked, parameter space broader than the QCD-axion line); no candidate-foundational program in the dataset commits to a point prediction in the (m_a, g_aγγ) plane that haloscope sensitivity could discriminate at the §4 part (2) admissibility bar. The string-axiverse cell (cell-dm-predicted-string-axiverse) provides theoretical motivation for the broad ALP parameter space but does not commit to specific point predictions; predictions_per_program=[] is the §4-admissible posture.
```

*After:*

```
This is a bounds-setting probe rather than measurement-discriminating: ALPs are explicitly hypothesis-class candidates (m_a and g_aγγ unlinked, parameter space broader than the QCD-axion line); no candidate-foundational program in the dataset commits to a point prediction in the (m_a, g_aγγ) plane that haloscope sensitivity could discriminate at the §4 part (2) admissibility bar. The string-axiverse cell (cell-dm-predicted-string-axiverse) provides theoretical motivation for the broad ALP parameter space but does not commit to specific point predictions; no per-program point predictions are recorded — the §4-admissible posture for this edge.
```

#### `edge-rs-axion-haloscope-network-QCD-axion-DM` → `cell-dm-QCD-axion-DFSZ-KSVZ` (3 edits)

**Edit 1**

*Before:*

```
this resolves edge formalizes the empirical discharge of the cell's structural content
```

*After:*

```
this edge formalizes the empirical discharge of the cell's structural content
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity): kind=coupling, value=−15.4 (log10), units=GeV⁻¹, bound_direction=upper — log10(g_aγγ) < −15.4, equivalent to g_aγγ ≲ 4 × 10⁻¹⁶ GeV⁻¹, is the ADMX Run 1B Bartram et al. 2021 published DFSZ-benchmark exclusion at 90% CL in the 3.3–4.2 μeV band.
```

*After:*

```
Sensitivity reach: discovery-floor upper bound g_aγγ ≲ 4 × 10⁻¹⁶ GeV⁻¹ (equivalently log₁₀(g_aγγ /GeV⁻¹) ≲ −15.4), the ADMX Run 1B Bartram et al. 2021 published DFSZ-benchmark exclusion at 90% CL in the 3.3–4.2 μeV band.
```

**Edit 3**

*Before:*

```
Exclusion_only=true: while DFSZ (E/N = 8/3) and KSVZ (E/N = 0) predict distinct g_aγγ values at fixed m_a, neither is a point predictor in the §4 part (2) sense — both are model classes with implementation-dependent fermion content (Di Luzio et al. 2020) producing benchmark coupling bands; haloscope sensitivity excludes the entire DFSZ/KSVZ band over its mass coverage rather than discriminating two competing point predictions at a single m_a.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating: while DFSZ (E/N = 8/3) and KSVZ (E/N = 0) predict distinct g_aγγ values at fixed m_a, neither is a point predictor in the §4 part (2) sense — both are model classes with implementation-dependent fermion content (Di Luzio et al. 2020) producing benchmark coupling bands; haloscope sensitivity excludes the entire DFSZ/KSVZ band over its mass coverage rather than discriminating two competing point predictions at a single m_a.
```

#### `edge-rs-axion-haloscope-network-strong-cp-problem` → `strong-cp-problem` (3 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity with bound_direction populated): kind=coupling, value=−15 (log10), units=GeV⁻¹, bound_direction=upper — the upper bound g_aγγ ≲ 10⁻¹⁵ GeV⁻¹ representing the broad few-μeV-band haloscope program reach (ADMX Run 1B Bartram et al. 2021 published DFSZ exclusion ≈ 3.5 × 10⁻¹⁶ GeV⁻¹ over 3.3–4.2 μeV; HAYSTAC, MADMAX, ABRACADABRA, and DMRadio extend coverage to higher and lower m_a; the value −15 is a robust rounded reach across the program's active mass-coupling envelope).
```

*After:*

```
Sensitivity reach: discovery-floor upper bound g_aγγ ≲ 10⁻¹⁵ GeV⁻¹ — the broad few-μeV-band haloscope program reach (ADMX Run 1B Bartram et al. 2021 published DFSZ exclusion ≈ 3.5 × 10⁻¹⁶ GeV⁻¹ over 3.3–4.2 μeV; HAYSTAC, MADMAX, ABRACADABRA, and DMRadio extend coverage to higher and lower m_a; the value −15 is a robust rounded reach across the program's active mass-coupling envelope).
```

**Edit 2**

*Before:*

```
Exclusion_only=true follows the desi-cc-frontier precedent (sub-PR 50): the candidate axion models (KSVZ, DFSZ, generalized invisible-axion variants per Di Luzio et al. 2020) predict relations between f_a, m_a, and g_aγγ rather than single point values discriminable at fixed m_a in the §4 part (2) sense; predictions_per_program=[] is the §4-admissible posture, mirroring the (w_0, w_a) hypothesis-class structure of evolving-DE alternatives at desi-cc-frontier.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating, following the desi-cc-frontier precedent (sub-PR 50): the candidate axion models (KSVZ, DFSZ, generalized invisible-axion variants per Di Luzio et al. 2020) predict relations between f_a, m_a, and g_aγγ rather than single point values discriminable at fixed m_a in the §4 part (2) sense; no per-program point predictions are recorded — the §4-admissible posture, mirroring the (w_0, w_a) hypothesis-class structure of evolving-DE alternatives at desi-cc-frontier.
```

**Edit 3**

*Before:*

```
SECOND frontier-target resolves edge in the project (after edge-rs-desi-cc-frontier in sub-PR 50).
```

*After:*

```
Second experimental-coverage edge in the project to target an open frontier directly (after edge-rs-desi-cc-frontier in sub-PR 50).
```


### Program: `cmb-s4` (3 edges, 7 edits)

#### `edge-rs-cmb-s4-Sigma-mass-nu` → `cell-cosm-Sigma-mass-nu` (2 edits)

**Edit 1**

*Before:*

```
this resolves edge attaches to the cosmology-native cell per the gw-ground-network and DESI precedent
```

*After:*

```
this edge attaches to the cosmology-native cell per the gw-ground-network and DESI precedent
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity): kind=mass, value=0.03, units=eV, bound_direction=upper — design-completion σ(Σm_ν) ~ 30 meV is sufficient for ~3σ discrimination of the normal-hierarchy oscillation-implied lower bound Σm_ν > 0.059 eV (Esteban-Gonzalez-Garcia-Maltoni-Schwetz-Zhou 2020 JHEP 09:178 NuFIT 5.2) from null. Exclusion_only=true: §4 part (2) admissibility fails at this cell on STRUCTURAL-DISCIPLINE grounds rather than parameter-freedom.
```

*After:*

```
Sensitivity reach: discovery-floor upper bound Σm_ν ≲ 0.03 eV — design-completion σ(Σm_ν) ~ 30 meV is sufficient for ~3σ discrimination of the normal-hierarchy oscillation-implied lower bound Σm_ν > 0.059 eV (Esteban-Gonzalez-Garcia-Maltoni-Schwetz-Zhou 2020 JHEP 09:178 NuFIT 5.2) from null. This edge is bounds-setting rather than measurement-discriminating: §4 part (2) admissibility fails at this cell on STRUCTURAL-DISCIPLINE grounds rather than parameter-freedom.
```

#### `edge-rs-cmb-s4-primordial-GW-r-bound` → `cell-cosm-primordial-GW-r-bound` (4 edits)

**Edit 1**

*Before:*

```
The cell records the BICEP/Keck 2021 upper bound r < 0.036 and explicitly anticipates LiteBIRD and CMB-S4 reaching r ~ 10⁻³ sensitivity; this resolves edge formalizes the empirical-discharge pathway.
```

*After:*

```
The cell records the BICEP/Keck 2021 upper bound r < 0.036 and explicitly anticipates LiteBIRD and CMB-S4 reaching r ~ 10⁻³ sensitivity; this edge formalizes the empirical-discharge pathway.
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity): kind=ratio, value=0.001, bound_direction=upper — r = P_T / P_S is genuinely a ratio of primordial tensor to scalar power spectra at the pivot scale k = 0.05 Mpc⁻¹ (Lyth-Riotto 1999 Phys Rep 314:1, eq. 2.21–2.24), so kind=ratio is structurally the correct discriminator on the resolves-edge surface even though the cell's existing quantitative_scale uses kind=dimensionless
```

*After:*

```
Sensitivity reach: discovery-floor upper bound r ≲ 10⁻³ — r = P_T / P_S is genuinely a ratio of primordial tensor to scalar power spectra at the pivot scale k = 0.05 Mpc⁻¹ (Lyth-Riotto 1999 Phys Rep 314:1, eq. 2.21–2.24), so a dimensionless-ratio encoding is structurally the correct discriminator on this edge even though the cell's existing quantitative bound uses a plain dimensionless encoding
```

**Edit 3**

*Before:*

```
Exclusion_only=true: §4 part (2) admissibility fails for every candidate-targeting program at this cell.
```

*After:*

```
This edge is bounds-setting rather than measurement-discriminating: §4 part (2) admissibility fails for every candidate-targeting program at this cell.
```

**Edit 4**

*Before:*

```
all of which landed exclusion_only=true on parameter-freedom grounds.
```

*After:*

```
all of which were recorded as bounds-setting (rather than measurement-discriminating) on parameter-freedom grounds.
```

#### `edge-rs-cmb-s4-primordial-non-Gaussianity-fNL` → `cell-cosm-primordial-non-Gaussianity-fNL` (1 edit)

**Edit 1**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity): kind=dimensionless, value=1.0, bound_direction=upper — f_NL^local is the amplitude of the local-template bispectrum and is a dimensionless parameter rather than a ratio of physical scales; kind=dimensionless matches both the cell-level encoding and the structural semantics of the observable.
```

*After:*

```
Sensitivity reach: discovery-floor upper bound |f_NL^local| ≲ 1.0 — f_NL^local is the amplitude of the local-template bispectrum and is a dimensionless parameter rather than a ratio of physical scales; the dimensionless encoding matches both the cell-level recording and the structural semantics of the observable.
```


### Program: `desi` (3 edges, 10 edits)

#### `edge-rs-desi-BAO-sound-horizon` → `cell-cosm-BAO-sound-horizon-DESI` (3 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T31, precision-improvement target): kind=length, units=Mpc, value=147.09 (mirroring the cell's existing qs), uncertainty=0.5 (projected DESI Y5+CMB combined r_d-equivalent precision), bound_direction omitted per Rule 34 (non-null uncertainty).
```

*After:*

```
Sensitivity reach: precision-improvement target on r_d, with central value 147.09 Mpc (mirroring the cell's existing value) and projected DESI Y5 + CMB combined precision ±0.5 Mpc; no direction-of-bound recorded since the uncertainty is non-null (the precision interval is two-sided around the central value).
```

**Edit 2**

*Before:*

```
exclusion_only=true: DESI's role on this cell is to deliver the measurement at sub-percent precision — a precision-improvement target, not a discriminating measurement between point-predictive candidate-foundational programs.
```

*After:*

```
This is a bounds-setting probe rather than measurement-discriminating: DESI's role on this cell is to deliver the measurement at sub-percent precision — a precision-improvement target, not a discriminating measurement between point-predictive candidate-foundational programs.
```

**Edit 3**

*Before:*

```
Future cosmological-models extensions (e.g., extra-radiation N_eff scenarios, early-dark-energy modifications to recombination history) that DO shift r_d in predictable ways could populate predictions_per_program in a downstream sub-PR if they satisfy §4 part (2) admissibility.
```

*After:*

```
Future cosmological-models extensions (e.g., extra-radiation N_eff scenarios, early-dark-energy modifications to recombination history) that DO shift r_d in predictable ways could be recorded as per-program competing predictions in a downstream sub-PR if they satisfy §4 part (2) admissibility.
```

#### `edge-rs-desi-H0-CMB-precision` → `cell-cosm-H0-CMB-Planck` (3 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T31, precision-improvement target): kind=time, units=Gyr, value=14.52 (mirroring the cell's existing qs), uncertainty=0.07 (DESI Y5+CMB projected Hubble-time precision at H_0 ≈ 67.5 km/s/Mpc), bound_direction omitted per Rule 34.
```

*After:*

```
Sensitivity reach: precision-improvement target on the Hubble time, with central value 14.52 Gyr (mirroring the cell's existing value) and DESI Y5 + CMB projected precision ±0.07 Gyr at H_0 ≈ 67.5 km/s/Mpc; no direction-of-bound recorded since the uncertainty is non-null per Rule 34.
```

**Edit 2**

*Before:*

```
exclusion_only=true: DESI's contribution to this cell is precision-improvement on the CMB-anchored H_0, not a discriminating measurement between point-predictive candidate-foundational programs.
```

*After:*

```
This is a bounds-setting probe rather than measurement-discriminating: DESI's contribution to this cell is precision-improvement on the CMB-anchored H_0, not a discriminating measurement between point-predictive candidate-foundational programs.
```

**Edit 3**

*Before:*

```
A future sub-PR pairing DESI with Rubin LSST or SH0ES via predictions_per_program for specific early-DE benchmarks could populate the per-program discriminating structure across the Hubble-tension cluster.
```

*After:*

```
A future sub-PR pairing DESI with Rubin LSST or SH0ES via per-program competing predictions for specific early-DE benchmarks could populate the discriminating-experiments structure across the Hubble-tension cluster.
```

#### `edge-rs-desi-cc-frontier` → `cc-frontier` (4 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T30): kind=sigma_deviation, value=5, bound_direction=lower (the experiment's design-exposure discovery floor on (w_0, w_a) deviation from ΛCDM under CMB+SN-combined constraint).
```

*After:*

```
Sensitivity reach: 5σ lower bound on (w_0, w_a) deviation from ΛCDM under CMB + SN-combined constraint — the experiment's design-exposure discovery floor.
```

**Edit 2**

*Before:*

```
FIRST FRONTIER-TARGET RESOLVES EDGE IN THE PROJECT. All 18 prior resolves edges (sub-PRs 46–49) target cells (cell ids on phenomenon-FCs). This edge targets cc-frontier directly — an open-frontier node — demonstrating that resolves edges may attach at the frontier level when the experimental program's most direct structural payoff is the frontier's empirical content rather than a specific cell's value. The v18 spec §3 Rule 32 explicitly permits open-frontier and totality-approach ids as resolves edge targets; this sub-PR is the first instance.
```

*After:*

```
This is the first experimental-coverage edge in the project to target an open frontier directly rather than attaching to a specific cell — appropriate when the experimental program's most direct structural payoff is the frontier's empirical content rather than a specific cell's value. The v18 spec §3 Rule 32 explicitly permits open-frontier and totality-approach ids as targets for such edges; this sub-PR is the first instance.
```

**Edit 3**

*Before:*

```
exclusion_only=true because the candidate-foundational dark-energy programs that DESI's measurement bears on (ΛCDM with w ≡ -1, quintessence-class models with thawing or freezing potentials, early-dark-energy proposals, modified-gravity Horndeski/DHOST classes) do not, in their currently-published forms, supply point-predictive program-internal calculations of (w_0, w_a) that satisfy §4 admissibility test part (2).
```

*After:*

```
This is a bounds-setting probe rather than measurement-discriminating because the candidate-foundational dark-energy programs DESI's measurement bears on (ΛCDM with w ≡ -1, quintessence-class models with thawing or freezing potentials, early-dark-energy proposals, modified-gravity Horndeski/DHOST classes) do not, in their currently-published forms, supply point-predictive program-internal calculations of (w_0, w_a) that satisfy §4 admissibility test part (2).
```

**Edit 4**

*Before:*

```
A future sub-PR may populate predictions_per_program with specific point-predictive quintessence-potential benchmarks (e.g., axion-quintessence with cosmologically-constrained potential parameters, or specific early-DE realizations with fixed pre-recombination physics) if the firewall test admits per-program predictions citing program-internal calculation papers.
```

*After:*

```
A future update may record specific point-predictive quintessence-potential benchmarks for the competing programs (e.g., axion-quintessence with cosmologically-constrained potential parameters, or specific early-DE realizations with fixed pre-recombination physics) if the firewall test admits per-program predictions citing program-internal calculation papers.
```


### Program: `dune` (2 edges, 5 edits)

#### `edge-rs-dune-nu-deltaCP` → `cell-nu-deltaCP` (2 edits)

**Edit 1**

*Before:*

```
The two experiments form a discriminating-resolves-pair on this observable in a fairness-preserving sense:
```

*After:*

```
The two experiments form a discriminating-experiments pair on this observable in a fairness-preserving sense:
```

**Edit 2**

*Before:*

```
The resolves edge is recorded as exclusion_only: leptonic δ_CP is a Standard-Model-MNS-matrix parameter being measured, not a discriminator between candidate-foundational programs that make competing single-valued predictions of its value. Specific BSM frameworks (leptogenesis with flavor symmetries, A4/S4 family symmetries, anarchic neutrino mass models) correlate δ_CP with other parameters but do not in general fix it to a single citable value; per-program-predictions admissibility under §4 part (2) would require single-valued δ_CP predictions, which the leading frameworks do not generally offer. The exclusion_only framing is therefore the firewall-faithful outcome, mirroring the Hyper-K edge.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating: leptonic δ_CP is a Standard-Model-MNS-matrix parameter being measured, not a discriminator between candidate-foundational programs that make competing single-valued predictions of its value. Specific BSM frameworks (leptogenesis with flavor symmetries, A4/S4 family symmetries, anarchic neutrino mass models) correlate δ_CP with other parameters but do not in general fix it to a single citable value; per-program admissibility under §4 part (2) would require single-valued δ_CP predictions, which the leading frameworks do not generally offer. The bounds-setting framing is therefore the appropriate one, mirroring the Hyper-K edge.
```

#### `edge-rs-dune-nu-mass-hierarchy` → `cell-nu-mass-hierarchy` (3 edits)

**Edit 1**

*Before:*

```
the two experiments form a discriminating-resolves-pair on this observable in the strongest sense:
```

*After:*

```
the two experiments form a discriminating-experiments pair on this observable in the strongest sense:
```

**Edit 2**

*Before:*

```
(a future Step-4.4 sub-PR can author the parallel JUNO resolves edge, completing a three-way discriminating-resolves cluster on this cell).
```

*After:*

```
(a future Step-4.4 sub-PR can author the parallel JUNO experimental-coverage edge, completing a three-way discriminating-experiments cluster on this cell).
```

**Edit 3**

*Before:*

```
The resolves edge is recorded as exclusion_only: NH vs IH is a binary determination of which mass ordering nature realizes, not a discriminator between candidate-foundational programs that make competing predictions of the ordering. Specific flavor-symmetry models (A4 type-I seesaw with sequential dominance; certain anarchic models; some μ-τ-symmetric models) prefer one ordering or the other under additional assumptions but do not generically produce program-internal predictions admissible under §4 part (2). The exclusion_only framing is therefore firewall-faithful, mirroring the Hyper-K edge.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating: NH vs IH is a binary determination of which mass ordering nature realizes, not a discriminator between candidate-foundational programs that make competing predictions of the ordering. Specific flavor-symmetry models (A4 type-I seesaw with sequential dominance; certain anarchic models; some μ-τ-symmetric models) prefer one ordering or the other under additional assumptions but do not generically produce program-internal predictions admissible under §4 part (2). The bounds-setting framing is therefore the appropriate one, mirroring the Hyper-K edge.
```


### Program: `edm-program` (2 edges, 8 edits)

#### `edge-rs-edm-program-matter-antimatter-asymmetry` → `matter-antimatter-asymmetry` (4 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity with bound_direction populated): kind=coupling (eEDM is a dimension-five spin-electric-field coupling with the same Lagrangian structure as the neutron-EDM channel in Edge 1, here for charged leptons), value=−30 (log10), units=e·cm, bound_direction=upper. The choice of value=−30 represents the JILA HfF⁺ 2023 published floor and the ACME-III near-term continuation reach across the program's running operating period.
```

*After:*

```
Sensitivity reach: discovery-floor upper bound |d_e| ≲ 10⁻³⁰ e·cm — the JILA HfF⁺ 2023 published floor and the ACME-III near-term continuation reach across the program's running operating period. The dimension-five spin-electric-field coupling has the same Lagrangian structure as the neutron-EDM channel in Edge 1, here for charged leptons.
```

**Edit 2**

*Before:*

```
Exclusion_only=true on the same §4 part (2) admissibility grounds as Edge 1 and the desi-cc-frontier / axion-haloscope precedents:
```

*After:*

```
This edge is bounds-setting rather than measurement-discriminating on the same §4 part (2) admissibility grounds as Edge 1 and the desi-cc-frontier / axion-haloscope precedents:
```

**Edit 3**

*Before:*

```
The EDM sensitivity excludes broad regions of these parameter spaces rather than discriminating two competing point values; predictions_per_program=[] is the §4-admissible posture.
```

*After:*

```
The EDM sensitivity excludes broad regions of these parameter spaces rather than discriminating two competing point values; no per-program point predictions are recorded — the §4-admissible posture.
```

**Edit 4**

*Before:*

```
FOURTH FRONTIER-TARGET RESOLVES EDGE IN THE PROJECT (after desi/cc-frontier sub-PR 50, axion-haloscope/strong-cp-problem sub-PR 51, and edm-program/strong-cp-problem in this sub-PR 52). FIRST resolves edge attached to matter-antimatter-asymmetry (the frontier had zero resolves edges before this sub-PR). The pairing with Edge 1 (edm-program targeting strong-cp-problem via nEDM channel) makes edm-program the project's FIRST DUAL-FRONTIER experimental program — the same source-end node carries resolves edges into two distinct open-frontier nodes via complementary experimental sub-programs (PSI nEDM/n2EDM for nEDM; ACME-II/III and JILA HfF⁺ for eEDM), each bearing on different BSM-physics structural payoffs.
```

*After:*

```
This is the fourth experimental-coverage edge in the project to target an open frontier directly (after desi/cc-frontier sub-PR 50, axion-haloscope/strong-cp-problem sub-PR 51, and edm-program/strong-cp-problem in this sub-PR 52). It is the first such edge attached to matter-antimatter-asymmetry (the frontier had zero experimental-coverage edges before this sub-PR). The pairing with Edge 1 (edm-program targeting strong-cp-problem via the nEDM channel) makes edm-program the project's first dual-frontier experimental program — the same source-end node targets two distinct open frontiers via complementary experimental sub-programs (PSI nEDM/n2EDM for nEDM; ACME-II/III and JILA HfF⁺ for eEDM), each bearing on different BSM-physics structural payoffs.
```

#### `edge-rs-edm-program-strong-cp-problem` → `strong-cp-problem` (4 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T30, discovery-floor sensitivity with bound_direction populated): kind=coupling (EDM appears as a dimension-five CP-violating spin-electric-field coupling −(i/2) d_n ψ̄ σ^{μν} γ_5 ψ F_{μν} with the same coupling-of-fermion-to-electromagnetic-field semantics as the haloscope's g_aγγ), value=−27 (log10), units=e·cm (the community convention for EDM quantities), bound_direction=upper. The choice of value=−27 represents the n2EDM design floor; the current best bound (PSI 2020) sits at log10 ≈ −25.7, and the program's near-term reach via n2EDM brings the floor to −27 across the running operating period.
```

*After:*

```
Sensitivity reach: discovery-floor upper bound |d_n| ≲ 10⁻²⁷ e·cm — the n2EDM design floor; the current best bound (PSI 2020) sits near |d_n| ~ 10⁻²⁵·⁷ e·cm, and the program's near-term reach via n2EDM brings the floor to ~10⁻²⁷ e·cm across the running operating period. EDM appears as a dimension-five CP-violating spin-electric-field coupling −(i/2) d_n ψ̄ σ^{μν} γ_5 ψ F_{μν} with the same coupling-of-fermion-to-electromagnetic-field semantics as the haloscope's g_aγγ; e·cm is the community convention for EDM quantities.
```

**Edit 2**

*Before:*

```
Exclusion_only=true follows the desi-cc-frontier (sub-PR 50) and axion-haloscope-network-strong-cp-problem (sub-PR 51) precedents:
```

*After:*

```
This edge is bounds-setting rather than measurement-discriminating, following the desi-cc-frontier (sub-PR 50) and axion-haloscope-network-strong-cp-problem (sub-PR 51) precedents:
```

**Edit 3**

*Before:*

```
The EDM sensitivity excludes the |θ̄_QCD| > 10⁻¹⁰ region rather than discriminating two competing point predictions; predictions_per_program=[] is the §4-admissible posture.
```

*After:*

```
The EDM sensitivity excludes the |θ̄_QCD| > 10⁻¹⁰ region rather than discriminating two competing point predictions; no per-program point predictions are recorded — the §4-admissible posture.
```

**Edit 4**

*Before:*

```
THIRD FRONTIER-TARGET RESOLVES EDGE IN THE PROJECT (after edge-rs-desi-cc-frontier in sub-PR 50 and edge-rs-axion-haloscope-network-strong-cp-problem in sub-PR 51). SECOND resolves edge attached to strong-cp-problem — the first instance of a single frontier carrying TWO resolves edges from independent experimental programs (haloscope-direct-detection channel via axion-haloscope-network, and electric-dipole-moment-indirect channel via edm-program).
```

*After:*

```
This is the third experimental-coverage edge in the project to target an open frontier directly (after edge-rs-desi-cc-frontier in sub-PR 50 and edge-rs-axion-haloscope-network-strong-cp-problem in sub-PR 51). It is the second such edge attached to strong-cp-problem — the first instance of a single frontier carrying two experimental-coverage edges from independent experimental programs (haloscope direct-detection channel via axion-haloscope-network, and electric-dipole-moment indirect channel via edm-program).
```


### Program: `fcc` (4 edges, 5 edits)

#### `edge-rs-fcc-WIMP-thermal-mass-reach` → `cell-dm-WIMP-canonical` (2 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding: kind=mass, value=3, units=TeV, bound_direction=lower (one-sided collider exclusion — if no signal observed, the inferred lower bound is m_χ > 3 TeV across the disappearing-track sensitivity region).
```

*After:*

```
Sensitivity reach: lower bound m_χ ≳ 3 TeV from one-sided collider exclusion — if no signal is observed, the inferred lower bound is m_χ > 3 TeV across the disappearing-track sensitivity region.
```

**Edit 2**

*Before:*

```
METHODOLOGICAL NOTE: this is the first resolves edge to target cell-dm-WIMP-canonical via a COLLIDER mass-reach methodology distinct from the cell's direct-detection cross-section encoding (the cell carries kind=length σ_SI = 2.2 × 10⁻⁴⁸ cm² from LZ); the cell-level vs edge-level encoding-divergence precedent is established by sub-PR 54 cmb-s4 r-bound (cell=dimensionless, edge=ratio), and applies here as cell=length-cross-section, edge=mass-reach — distinct observables of the same WIMP-DM physical content.
```

*After:*

```
METHODOLOGICAL NOTE: this is the first edge to target cell-dm-WIMP-canonical via a COLLIDER mass-reach methodology distinct from the cell's direct-detection cross-section encoding (the cell carries σ_SI = 2.2 × 10⁻⁴⁸ cm² from LZ as a cross-section); the cell-level vs edge-level encoding-divergence precedent is established by sub-PR 54 cmb-s4 r-bound (cell encodes as a dimensionless quantity, edge as a ratio), and applies here as cross-section on the cell vs collider mass-reach on the edge — distinct observables of the same WIMP-DM physical content.
```

#### `edge-rs-fcc-hierarchy-Higgs-self-coupling` → `hierarchy-problem` (1 edit)

**Edit 1**

*Before:*

```
Sensitivity encoding: kind=dimensionless, value=0.05, bound_direction=two-sided (T33 reuse from sub-PR 53 muon-g-2-continuation and sub-PR 56 rubin-lsst — precision-measurement sensitivity bounding deviation from a reference value in either direction).
```

*After:*

```
Sensitivity reach: dimensionless precision-measurement target, two-sided ±0.05 on κ_λ around the SM reference value (T33 reuse from sub-PR 53 muon-g-2-continuation and sub-PR 56 rubin-lsst — precision-measurement sensitivity bounding deviation from a reference value in either direction).
```

#### `edge-rs-fcc-hierarchy-direct-BSM-reach` → `hierarchy-problem` (1 edit)

**Edit 1**

*Before:*

```
Sensitivity encoding: kind=mass, value=30, units=TeV, bound_direction=lower (one-sided exclusion — if no signal observed, the inferred lower bound on the BSM-particle mass is m_BSM > 30 TeV in the associated-production channel).
```

*After:*

```
Sensitivity reach: lower bound m_BSM ≳ 30 TeV from one-sided exclusion — if no signal is observed, the inferred lower bound on the BSM-particle mass is m_BSM > 30 TeV in the associated-production channel.
```

#### `edge-rs-fcc-hierarchy-mW-precision` → `hierarchy-problem` (1 edit)

**Edit 1**

*Before:*

```
Sensitivity encoding: kind=mass, value=0.0005, units=GeV, bound_direction=two-sided (T33 reuse — precision-measurement two-sided bounding deviation from a reference value).
```

*After:*

```
Sensitivity reach: two-sided precision-measurement target σ(m_W) ≈ 0.0005 GeV (T33 reuse — precision-measurement sensitivity bounding deviation from a reference value in either direction).
```


### Program: `gw-ground-network` (3 edges, 7 edits)

#### `edge-rs-gw-ground-network-NS-EOS` → `cell-compact-NS-massive` (2 edits)

**Edit 1**

*Before:*

```
The three predictions_per_program entries record the predicted Λ₁.₄ for stiff, intermediate, and soft EOS families respectively, each citing the program-internal nuclear-physics calculation.
```

*After:*

```
The three per-program competing-prediction entries record the predicted Λ₁.₄ for stiff, intermediate, and soft EOS families respectively, each citing the program-internal nuclear-physics calculation.
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30): kind=dimensionless (Λ̃ is dimensionless), value=400 (projected A+/O5 90% CL upper bound), bound_direction=upper.
```

*After:*

```
Sensitivity reach: dimensionless upper bound Λ̃ ≲ 400 (projected A+/O5 90% CL upper bound; Λ̃ is dimensionless).
```

#### `edge-rs-gw-ground-network-NS-merger-remnant` → `cell-compact-NS-merger-remnant` (2 edits)

**Edit 1**

*Before:*

```
This edge is exclusion_only because the per-program HMNS post-merger frequency predictions overlap heavily within EOS uncertainty
```

*After:*

```
This edge is bounds-setting rather than measurement-discriminating because the per-program HMNS post-merger frequency predictions overlap heavily within EOS uncertainty
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30): kind=length, units=Mpc, value=330, bound_direction=upper (A+/O5 BNS detection range as the relevant scale for nearby loud events accessible to post-merger study).
```

*After:*

```
Sensitivity reach: detection-horizon upper bound ~330 Mpc — the A+/O5 BNS detection range as the relevant distance scale for nearby loud events accessible to post-merger study.
```

#### `edge-rs-gw-ground-network-stellar-BH-GW` → `cell-compact-stellar-BH-GW` (3 edits)

**Edit 1**

*Before:*

```
This edge is exclusion_only because the catalog-enumeration cell does not directly discriminate between candidate-foundational programs:
```

*After:*

```
This edge is bounds-setting rather than measurement-discriminating because the catalog-enumeration cell does not directly discriminate between candidate-foundational programs:
```

**Edit 2**

*Before:*

```
The discriminating-resolves-pair structure for this cell is created by LISA's complementary early-inspiral edge (edge-rs-lisa-stellar-BH-early-inspiral):
```

*After:*

```
The discriminating-experiments pair structure for this cell is created by LISA's complementary early-inspiral edge (edge-rs-lisa-stellar-BH-early-inspiral):
```

**Edit 3**

*Before:*

```
Sensitivity encoding (T30): kind=length, units=Gpc, value=2.6, bound_direction=upper (detector can probe distances up to this for canonical source).
```

*After:*

```
Sensitivity reach: detection-horizon upper bound ~2.6 Gpc (the distance to which the detector can probe a canonical source).
```


### Program: `hyper-k` (4 edges, 8 edits)

#### `edge-rs-hyper-k-nu-deltaCP` → `cell-nu-deltaCP` (1 edit)

**Edit 1**

*Before:*

```
The resolves edge is recorded as exclusion_only: leptonic δ_CP is a Standard-Model-MNS-matrix parameter being measured, not a discriminator between candidate-foundational programs that make competing single-valued predictions of its value. Various BSM frameworks (leptogenesis flavor-symmetry models, A4/S4 family symmetries, anarchic neutrino mass models) correlate δ_CP with other parameters but do not in general fix it to a single citable value; admissibility under §4 part (2) would require program-internal calculations that produce specific δ_CP point predictions, which the leading frameworks do not generally offer. The exclusion_only framing is therefore the firewall-faithful outcome.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating: leptonic δ_CP is a Standard-Model-MNS-matrix parameter being measured, not a discriminator between candidate-foundational programs that make competing single-valued predictions of its value. Various BSM frameworks (leptogenesis flavor-symmetry models, A4/S4 family symmetries, anarchic neutrino mass models) correlate δ_CP with other parameters but do not in general fix it to a single citable value; admissibility under §4 part (2) would require program-internal calculations that produce specific δ_CP point predictions, which the leading frameworks do not generally offer. The bounds-setting framing is therefore the appropriate one.
```

#### `edge-rs-hyper-k-nu-mass-hierarchy` → `cell-nu-mass-hierarchy` (3 edits)

**Edit 1**

*Before:*

```
(current global-fit preference for NH at ≈2.5σ, qs=sigma_deviation 2.47 bd=upper).
```

*After:*

```
(current global-fit preference for NH at ≈2.5σ, recorded as an upper bound of 2.47σ on the deviation from null ordering).
```

**Edit 2**

*Before:*

```
JUNO at ∼53 km from reactor sources provides matter-effect-free complementary determination of the ordering (a future Step-4.4 sub-PR can author the parallel JUNO resolves edge).
```

*After:*

```
JUNO at ∼53 km from reactor sources provides matter-effect-free complementary determination of the ordering (a future Step-4.4 sub-PR can author the parallel JUNO experimental-coverage edge).
```

**Edit 3**

*Before:*

```
The resolves edge is recorded as exclusion_only: NH vs IH is a binary determination of which mass ordering nature realizes, not a discriminator between candidate-foundational programs that make competing predictions of the ordering. Specific flavor-symmetry models (A4, sequential-dominance type-I seesaw, anarchic) prefer one ordering or the other under additional assumptions but do not generically produce program-internal predictions admissible under §4 part (2). The exclusion_only framing is therefore firewall-faithful.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating: NH vs IH is a binary determination of which mass ordering nature realizes, not a discriminator between candidate-foundational programs that make competing predictions of the ordering. Specific flavor-symmetry models (A4, sequential-dominance type-I seesaw, anarchic) prefer one ordering or the other under additional assumptions but do not generically produce program-internal predictions admissible under §4 part (2). The bounds-setting framing is therefore the appropriate one.
```

#### `edge-rs-hyper-k-pd-Kplus-nubar` → `cell-pd-Kplus-nubar-SUSY` (2 edits)

**Edit 1**

*Before:*

```
Note Pati-Salam GUTs render the proton stable in their minimal form and are not represented in predictions_per_program because no quantitative prediction can be encoded for an infinite lifetime; their incompatibility with any HK observation is recorded only at the description level.
```

*After:*

```
Note Pati-Salam GUTs render the proton stable in their minimal form and are not represented in the per-program prediction list because no quantitative prediction can be encoded for an infinite lifetime; their incompatibility with any HK observation is recorded only at the description level.
```

**Edit 2**

*Before:*

```
anchors the SK bound (qs=time 5.9 × 10³³ yr bd=lower)
```

*After:*

```
anchors the SK bound (τ > 5.9 × 10³³ yr as a lower bound on the lifetime)
```

#### `edge-rs-hyper-k-pd-pi0-eplus` → `cell-pd-pi0-eplus-falsified-GG` (2 edits)

**Edit 1**

*Before:*

```
The cell cell-pd-pi0-eplus-falsified-GG on proton-decay-searches anchors the empirical state of this channel (τ > 2.4 × 10³⁴ yr, bd=lower)
```

*After:*

```
The cell cell-pd-pi0-eplus-falsified-GG on proton-decay-searches anchors the empirical state of this channel (τ > 2.4 × 10³⁴ yr as a lower bound on the lifetime)
```

**Edit 2**

*Before:*

```
The resolves edge formalizes the experiment-to-channel-cell relationship the parallel cell cell-pd-Hyper-K-future already describes descriptively (qs=time 10³⁵ yr bd=lower). The three programs in predictions_per_program span the discrimination space:
```

*After:*

```
This edge formalizes the experiment-to-channel-cell relationship the parallel cell cell-pd-Hyper-K-future already describes descriptively (target lifetime τ > 10³⁵ yr as a lower bound). The three per-program competing predictions span the discrimination space:
```


### Program: `juno` (4 edges, 11 edits)

#### `edge-rs-juno-nu-Dm21-squared` → `cell-nu-Dm21-squared` (2 edits)

**Edit 1**

*Before:*

```
The resolves edge is recorded as exclusion_only because Δm²_21 is a Standard-Model PMNS-matrix-related parameter being measured to higher precision, not a discriminator between candidate-foundational programs. The exclusion_only framing is firewall-faithful for the same reasons as edge-rs-juno-nu-theta12-solar.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating because Δm²_21 is a Standard-Model PMNS-matrix-related parameter being measured to higher precision, not a discriminator between candidate-foundational programs. The bounds-setting framing is the appropriate one for the same reasons as edge-rs-juno-nu-theta12-solar.
```

**Edit 2**

*Before:*

```
value records the current central value (7.49 × 10⁻⁵), uncertainty records the achievable projected precision (3.75 × 10⁻⁷ eV² = 0.5% relative); bound_direction omitted because this is a precision target, not a discovery floor.
```

*After:*

```
the value records the current central value (7.49 × 10⁻⁵), uncertainty records the achievable projected precision (3.75 × 10⁻⁷ eV² = 0.5% relative), with no direction-of-bound encoded since this is a precision target rather than a discovery floor.
```

#### `edge-rs-juno-nu-mass-hierarchy` → `cell-nu-mass-hierarchy` (4 edits)

**Edit 1**

*Before:*

```
(current NuFIT 6.0 global-fit preference for NH at ~2.5σ when SK-atmospheric data is included, qs=sigma_deviation 2.47 bd=upper).
```

*After:*

```
(current NuFIT 6.0 global-fit preference for NH at ~2.5σ when SK-atmospheric data is included, recorded as an upper bound of 2.47σ on the deviation from null ordering).
```

**Edit 2**

*Before:*

```
JUNO is the THIRD experimental program added to the discriminating-resolves cluster on this cell (after HK at sub-PR 46 and DUNE at sub-PR 47),
```

*After:*

```
JUNO is the third experimental program added to the discriminating-experiments cluster on this cell (after HK at sub-PR 46 and DUNE at sub-PR 47),
```

**Edit 3**

*Before:*

```
The three-way discriminating-resolves cluster therefore exposes the mass ordering through three independent physical channels
```

*After:*

```
The three-way discriminating-experiments cluster therefore exposes the mass ordering through three independent physical channels
```

**Edit 4**

*Before:*

```
The resolves edge is recorded as exclusion_only mirroring the HK and DUNE edges on this cell: NH vs IH is a binary determination of which mass ordering nature realizes, not a discriminator between candidate-foundational programs that make competing predictions of the ordering. Specific flavor-symmetry models (A4 type-I seesaw with sequential dominance; certain anarchic models; some μ-τ-symmetric models) prefer one ordering or the other under additional assumptions but do not generically produce program-internal predictions admissible under §4 part (2). The exclusion_only framing is therefore firewall-faithful, mirroring the HK and DUNE edges.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating, mirroring the HK and DUNE edges on this cell: NH vs IH is a binary determination of which mass ordering nature realizes, not a discriminator between candidate-foundational programs that make competing predictions of the ordering. Specific flavor-symmetry models (A4 type-I seesaw with sequential dominance; certain anarchic models; some μ-τ-symmetric models) prefer one ordering or the other under additional assumptions but do not generically produce program-internal predictions admissible under §4 part (2). The bounds-setting framing is therefore the appropriate one, mirroring the HK and DUNE edges.
```

#### `edge-rs-juno-nu-theta12-solar` → `cell-nu-theta12-solar` (3 edits)

**Edit 1**

*Before:*

```
The resolves edge is recorded as exclusion_only because sin²θ_12 is a Standard-Model PMNS-matrix parameter being measured to higher precision, not a discriminator between candidate-foundational programs that make competing single-valued predictions of its value.
```

*After:*

```
This edge is recorded as bounds-setting rather than measurement-discriminating because sin²θ_12 is a Standard-Model PMNS-matrix parameter being measured to higher precision, not a discriminator between candidate-foundational programs that make competing single-valued predictions of its value.
```

**Edit 2**

*Before:*

```
The exclusion_only framing is therefore firewall-faithful. JUNO is the only experimental program currently adding a precision-measurement-resolves edge to this cell; no discriminating-resolves cluster forms here.
```

*After:*

```
The bounds-setting framing is therefore the appropriate one. JUNO is the only experimental program currently adding a precision-measurement probe to this cell; no discriminating-experiments cluster forms here.
```

**Edit 3**

*Before:*

```
The sensitivity encoding (T31 mint at sub-PR 48): kind matches the cell's qs kind (dimensionless), value records the current central value (0.307), uncertainty records the achievable projected precision (±0.0015 = 0.5% relative); bound_direction omitted because this is a precision target, not a discovery floor.
```

*After:*

```
The sensitivity is recorded as a dimensionless precision target — central value 0.307 (matching the cell's existing dimensionless encoding) with achievable projected precision ±0.0015 (0.5% relative) — with no direction-of-bound encoded since this is a precision target rather than a discovery floor.
```

#### `edge-rs-juno-pd-Kplus-nubar` → `cell-pd-Kplus-nubar-SUSY` (2 edits)

**Edit 1**

*Before:*

```
JUNO is the THIRD experimental program added to the discriminating-resolves cluster on this cell (after HK at sub-PR 46 with τ > 3 × 10³⁴ yr targeted, and DUNE at sub-PR 47 with τ > 1.3 × 10³⁴ yr targeted). The three experiments form a discriminating-resolves cluster across THREE orthogonal detector technologies:
```

*After:*

```
JUNO is the third experimental program added to the discriminating-experiments cluster on this cell (after HK at sub-PR 46 with τ > 3 × 10³⁴ yr targeted, and DUNE at sub-PR 47 with τ > 1.3 × 10³⁴ yr targeted). The three experiments form a discriminating-experiments cluster across three orthogonal detector technologies:
```

**Edit 2**

*Before:*

```
Pati-Salam GUTs render the proton stable in their minimal form and are not represented in predictions_per_program because no quantitative prediction can be encoded for an infinite lifetime; their incompatibility with any HK/DUNE/JUNO observation is recorded at the description level.
```

*After:*

```
Pati-Salam GUTs render the proton stable in their minimal form and are not represented in the per-program prediction list because no quantitative prediction can be encoded for an infinite lifetime; their incompatibility with any HK/DUNE/JUNO observation is recorded at the description level.
```


### Program: `lisa` (3 edges, 6 edits)

#### `edge-rs-lisa-IMBH-gap` → `cell-compact-IMBH-gap` (2 edits)

**Edit 1**

*Before:*

```
The predictions_per_program substructure records the discriminating IMBH-merger-rate predictions for the three leading seed-formation scenarios:
```

*After:*

```
The per-program competing-prediction list records the discriminating IMBH-merger-rate predictions for the three leading seed-formation scenarios:
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30): kind=length, units=Gpc, value=30, bound_direction=upper (LISA can probe IMBH-IMBH mergers up to comoving distances of ≈30 Gpc, equivalent to z≈15).
```

*After:*

```
Sensitivity reach: detection-horizon upper bound ~30 Gpc (LISA can probe IMBH–IMBH mergers up to comoving distances of ≈30 Gpc, equivalent to z ≈ 15).
```

#### `edge-rs-lisa-SMBH-mergers` → `cell-compact-SMBH-galactic-center` (2 edits)

**Edit 1**

*Before:*

```
The predictions_per_program substructure records discriminating SMBHB-merger-rate predictions for the two leading seed-formation scenarios:
```

*After:*

```
The per-program competing-prediction list records discriminating SMBHB-merger-rate predictions for the two leading seed-formation scenarios:
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30): kind=length, units=Gpc, value=40, bound_direction=upper (LISA reach to z≈20 for canonical 10⁶ M_sun SMBHB).
```

*After:*

```
Sensitivity reach: detection-horizon upper bound ~40 Gpc (LISA reach to z ≈ 20 for canonical 10⁶ M_sun SMBHB).
```

#### `edge-rs-lisa-stellar-BH-early-inspiral` → `cell-compact-stellar-BH-GW` (2 edits)

**Edit 1**

*Before:*

```
The structural discriminator is the frequency-band + epoch complementarity, not a per-program prediction difference; therefore the edge is exclusion_only at the resolves level.
```

*After:*

```
The structural discriminator is the frequency-band + epoch complementarity, not a per-program prediction difference; therefore this edge is bounds-setting rather than measurement-discriminating at the experimental-coverage level.
```

**Edit 2**

*Before:*

```
Sensitivity encoding (T30): kind=length, units=Gpc, value=3, bound_direction=upper.
```

*After:*

```
Sensitivity reach: detection-horizon upper bound ~3 Gpc.
```


### Program: `muon-g-2-continuation` (1 edges, 6 edits)

#### `edge-rs-muon-g-2-continuation-muon-g-2` → `muon-g-2` (6 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding (T33 mint, precision-measurement sensitivity with bound_direction=two-sided): kind=dimensionless (a_μ is a dimensionless number), value=1.48 × 10⁻¹⁰ (absolute design-completion uncertainty in units of a_μ), bound_direction=two-sided. T33 is structurally distinct from T30 (discovery-floor sensitivity with bound_direction=upper/lower as used in axion-haloscope-network sub-PR 51 and edm-program sub-PR 52): the muon-g-2 measurement does NOT exclude above/below a floor but instead PINS a_μ to a two-sided precision range centered on the experimentally measured central value. Future precision-measurement programs that report achieved-precision-of-measurement sensitivities (e.g., FCC-ee Higgs-coupling precision targets, future g-2 of the electron or tau) will inherit T33; the T30/T33 distinction makes 'discovery-floor sensitivity' and 'achieved-precision sensitivity' queryable as semantically separate categories rather than conflated under T30 with bound_direction discriminator alone.
```

*After:*

```
Sensitivity reach: two-sided precision-measurement target on a_μ (a dimensionless number), absolute design-completion uncertainty ≈ 1.48 × 10⁻¹⁰ centered on the experimentally measured value (T33 mint, precision-measurement sensitivity). T33 is structurally distinct from T30 (discovery-floor sensitivity as used in axion-haloscope-network sub-PR 51 and edm-program sub-PR 52): the muon g-2 measurement does NOT exclude above or below a floor but instead PINS a_μ to a two-sided precision range centered on the experimentally measured central value. Future precision-measurement programs that report achieved-precision-of-measurement sensitivities (e.g., FCC-ee Higgs-coupling precision targets, future g-2 of the electron or tau) will inherit T33; the T30/T33 distinction makes 'discovery-floor sensitivity' and 'achieved-precision sensitivity' queryable as semantically separate categories rather than conflated under T30 with direction-of-bound as the only discriminator.
```

**Edit 2**

*Before:*

```
Predictions_per_program — TWO entries, the project's FIRST resolves edge with exclusion_only=false:
```

*After:*

```
Per-program competing predictions — TWO entries, the project's first measurement-discriminating (rather than bounds-setting) experimental-coverage edge:
```

**Edit 3**

*Before:*

```
This is the standard parameter-space-class pattern that axion-haloscope-network (sub-PR 51) and edm-program (sub-PR 52) handled by setting exclusion_only=true for the entire edge. The muon-g-2 case differs because the SM-side candidate programs DO supply discriminable point predictions; PPP is populated for the SM-side programs while the BSM-loop family is excluded from PPP and the exclusion is documented in the v90 changelog's firewall_self_check field as a §4(2) finding consistent with the precedent.
```

*After:*

```
This is the standard parameter-space-class pattern that axion-haloscope-network (sub-PR 51) and edm-program (sub-PR 52) handled by recording the entire edge as bounds-setting. The muon-g-2 case differs because the SM-side candidate programs DO supply discriminable point predictions; PPP is populated for the SM-side programs while the BSM-loop family is excluded from PPP and the exclusion is documented in the v90 changelog's firewall_self_check field as a §4(2) finding consistent with the precedent.
```

**Edit 4**

*Before:*

```
FIRST PPP-populated resolves edge on a totality-approach carrier: all 8 prior PPP-populated edges (hyper-k, dune, juno targeting cells in sm-rep-content / su5-gut-rep-content / neutrino-sector-phenomenology; gw-ground-network, lisa targeting cells in compact-astrophysical-objects) target specific cells with structurally-discrete candidate-foundational program predictions per cell.
```

*After:*

```
First PPP-populated experimental-coverage edge on a totality-approach carrier: all 8 prior PPP-populated edges (hyper-k, dune, juno targeting cells in sm-rep-content / su5-gut-rep-content / neutrino-sector-phenomenology; gw-ground-network, lisa targeting cells in compact-astrophysical-objects) target specific cells with structurally-discrete candidate-foundational program predictions per cell.
```

**Edit 5**

*Before:*

```
the structural fact captured by the resolves edge (the experimental program's precision is sufficient to distinguish the two competing SM-side calculations at design completion) is independent of which of the two calculations the post-2021 literature has subsequently consolidated around.
```

*After:*

```
the structural fact captured by this edge (the experimental program's precision is sufficient to distinguish the two competing SM-side calculations at design completion) is independent of which of the two calculations the post-2021 literature has subsequently consolidated around.
```

**Edit 6**

*Before:*

```
refreshing the carrier's representation is a separate authoring decision outside this resolves-edge sub-PR's scope.
```

*After:*

```
refreshing the carrier's representation is a separate authoring decision outside this experimental-coverage sub-PR's scope.
```


### Program: `rubin-lsst` (4 edges, 6 edits)

#### `edge-rs-rubin-lsst-PBH-microlensing-asteroid` → `cell-dm-PBH-asteroid-mass-viable` (1 edit)

**Edit 1**

*Before:*

```
Sensitivity encoding: kind=dimensionless, value=0.01, bound_direction=upper. Exclusion_only=true; PPP empty.
```

*After:*

```
Sensitivity reach: dimensionless upper bound f_PBH ≲ 0.01 (asteroid-mass-window). This edge is bounds-setting rather than measurement-discriminating; no per-program point predictions are recorded.
```

#### `edge-rs-rubin-lsst-WDM-mass-MWsatellites` → `cell-dm-sterile-nu-keV-warm` (1 edit)

**Edit 1**

*Before:*

```
Sensitivity encoding: kind=mass, value=6.0, units=keV, bound_direction=lower (one-sided structure-formation constraint that small-scale-power suppression from WDM free-streaming damps below the Rubin-observed satellite-population completeness floor). Exclusion_only=true; PPP empty.
```

*After:*

```
Sensitivity reach: lower bound m_WDM ≳ 6.0 keV from one-sided structure-formation constraint (small-scale-power suppression from WDM free-streaming would damp below the Rubin-observed satellite-population completeness floor). This edge is bounds-setting rather than measurement-discriminating; no per-program point predictions are recorded.
```

#### `edge-rs-rubin-lsst-cc-frontier` → `cc-frontier` (2 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding T33 (reuse from sub-PR 53 muon-g-2-continuation): kind=dimensionless, value=0.01, bound_direction=two-sided — precision-measurement sensitivity bounding the deviation from the ΛCDM reference value w_0 = −1 in either direction. Exclusion_only=false; PPP populated with 3 candidate-foundational programs
```

*After:*

```
Sensitivity reach: dimensionless two-sided precision-measurement target σ(w_0) ≈ 0.01 around the ΛCDM reference value w_0 = −1 (T33 reuse from sub-PR 53 muon-g-2-continuation — precision-measurement sensitivity bounding deviation from a reference value in either direction). This edge is measurement-discriminating rather than bounds-setting; PPP populated with 3 candidate-foundational programs
```

**Edit 2**

*Before:*

```
Second project-wide exclusion_only=false PPP-populated resolves edge after sub-PR 53 muon-g-2-continuation; first such edge on a cosmological frontier.
```

*After:*

```
Second project-wide measurement-discriminating PPP-populated experimental-coverage edge after sub-PR 53 muon-g-2-continuation; first such edge on a cosmological frontier.
```

#### `edge-rs-rubin-lsst-sigma8-weak-lensing` → `cell-cosm-sigma8-weak-lensing` (2 edits)

**Edit 1**

*Before:*

```
Sensitivity encoding T33 (reuse from sub-PR 53 muon-g-2-continuation and edge A this sub-PR): kind=dimensionless, value=0.005, bound_direction=two-sided — precision-measurement sensitivity bounding the deviation from the Planck-CMB-inferred S_8 reference value in either direction. Exclusion_only=true; PPP empty.
```

*After:*

```
Sensitivity reach: dimensionless two-sided precision-measurement target σ(S_8) ≈ 0.005 around the Planck-CMB-inferred reference value (T33 reuse from sub-PR 53 muon-g-2-continuation and edge A this sub-PR — precision-measurement sensitivity bounding deviation from a reference value in either direction). This edge is bounds-setting rather than measurement-discriminating; no per-program point predictions are recorded.
```

**Edit 2**

*Before:*

```
Per the cmb-s4 sub-PR 54 precedent (Σm_ν, exclusion_only=true with structural-discipline §4(2) failure on STRUCTURAL-LOCUS grounds), exclusion_only=true on this cell.
```

*After:*

```
Per the cmb-s4 sub-PR 54 precedent (Σm_ν, recorded as bounds-setting with structural-discipline §4(2) failure on STRUCTURAL-LOCUS grounds), this edge is also bounds-setting on this cell.
```

---

## Part 2 — `if_real_implies` implication description fields (2 implications, 2 edits)

Field path: `nodes[id=<carrier_id>].if_real_implies[resolution=<resolution_slug>].implications[kind=<kind>].description`

Both edits are on the `dark-matter` carrier.

### Carrier: `dark-matter` · Resolution: `qcd-axion-as-dark-matter` · Kind: `forced_edge` · Target: `{'from': 'dark-matter-candidates', 'to': 'sm-rep-content', 'subtype': 'derives-from'}`

**Edit 1**

*Before:*

```
The forced_edge target uses sm-rep-content as the natural structural source; a dedicated 'axion content' FC would tighten the edge if authored (see §4 follow-up).
```

*After:*

```
The forced cross-classification edge takes sm-rep-content as its natural structural source; a dedicated 'axion content' classification would tighten the derivation if authored (see §4 follow-up).
```

### Carrier: `dark-matter` · Resolution: `primordial-black-holes-as-dark-matter` · Kind: `forced_edge` · Target: `{'from': 'dark-matter-candidates', 'to': 'compact-astrophysical-objects', 'subtype': 'derives-from'}`

**Edit 1**

*Before:*

```
The derives-from edge would carry an axis_mapping (mass-regime ↔ mass-regime; observational-status ↔ observational-status; production-mechanism = primordial-collapse ↔ object-class = PBH).
```

*After:*

```
The derives-from edge would carry an axis correspondence (mass-regime ↔ mass-regime; observational-status ↔ observational-status; production-mechanism = primordial-collapse ↔ object-class = PBH).
```

---

## Out-of-scope leak patterns (option B, deferred)

The following adjacent leak patterns the discipline also catches were *not* touched in this sub-PR per the option A scope confirmed by the maintainer. They are recorded here as known follow-up work, eligible for a future content-housekeeping sub-PR:

- **`PPP` abbreviation** for `predictions_per_program` — appears in 11 resolves edge descriptions.
- **T-convention references** (`T30`, `T31`, `T33`) — appear in 27 resolves edge descriptions; these are project-internal sensitivity-encoding-convention names (Register C methodology terms).
- **`§4 admissibility test part (2)` references** — appear in ~14 resolves edge descriptions; these are project-internal methodology references.
- **`quantitative_scale` and `if_real_implies` as schema-field-name cross-references** — appear in 7 resolves edge descriptions when one edge's description points to another carrier's recorded structural content.
- **Sub-PR landmark caps paragraphs** (e.g., 'FIRST FRONTIER-TARGET RESOLVES EDGE IN THE PROJECT') — substantially compressed in this sub-PR where they overlapped with bare-`resolves edge(s)` plural-noun rewrites, but the broader 'first X in the project' commentary pattern remains in several other edge descriptions where it didn't overlap with the four named patterns.
- **Software event verbs** (`field` as a data-structure noun in 2 instances; otherwise clean).

Per `PHYSICIST_FACING_VOCABULARY.md` §2, Register C methodology terms have a softer disposition than Register B schema names: they are appropriate deeper into a description after physics rationale has been stated, but the entry-point-paragraph principle still binds. A follow-up sub-PR could productively address these remaining leaks; this sub-PR's scope was the four target patterns the maintainer named explicitly.

---

*End of DESCRIPTION_REWRITE_CHANGELOG_2026-05-27.md. 89 distinct edits across 38 description fields, all applied in the v96 canonical data file shipped alongside this CHANGELOG. The `_meta.changelog` entry above is already appended; `_meta.version` is already bumped from v95 to v96; the data file is ready for upload. Worker rebuild required after the data version is live in main to surface the cleaner descriptions through MCP queries; explorer fetches the canonical JSON at runtime and picks up the changes on next page load.*
