# Use the map

*An essay on what this project is, who it is for, and what kinds of questions it answers that you cannot get from a literature search alone. Draft 2026-05-27.*

---

## What this is

Modern physics has a navigation problem. The knowledge is real, the literature is exhaustive, and the working physicists who would benefit from each other's results do not always know whose corner of the literature is relevant. A neutrino-oscillation expert can read a strong-CP review or a leptogenesis paper or an axion-haloscope white paper one at a time; what becomes harder is asking questions *across* them in one frame. Which experimental programs target this open question, and through which physical channels? If this conditional resolves the way leptogenesis suggests, what else gets forced? Where does the same physical entity wear two different organizational hats?

This project is a curated catalogue, with the editorial discipline of a periodic table, organized to make those questions tractable. It is currently 30 formal classifications spanning structural mathematics (ADE families, generalized symmetries, modular tensor categories, CFT-bootstrap exclusion regions), the Standard Model and beyond, condensed-matter phases, astrophysical objects, and the active experimental landscape (next-generation neutrino experiments, axion haloscopes, EDM searches, gravitational-wave detectors, CMB programs). The cells of each classification are theories, particles, phases, observables, or specific search programs, each with the citations that anchor it. Connecting the classifications are the cross-cutting relations: which classifications structurally constrain which open frontiers, which experimental programs resolve which targets, which conditional resolutions of open questions force which structural consequences, and where the same physical entity classifies twice.

The dataset is read-only from the outside, machine-queryable, browsable in a [live explorer](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html), and built behind a curatorial discipline that constrains what can be claimed in it and on what evidence. The rest of this essay shows the discipline at work through five worked examples — each a question a physicist might naturally ask, with concrete citations, and with a deep link into the explorer where the reader can walk the source material directly.

---

## 1. Three programs, one parameter, no competing predictions

The neutrino mass ordering — whether the heaviest mass eigenstate is the one with the most electron-flavor content (normal hierarchy) or the least (inverted) — is one of the cleanest open questions in current neutrino physics. Ask the map which experimental programs target it, and three come back, each via a physically independent channel.

**DUNE**, the long-baseline beam program from Fermilab to the Sanford Underground Research Facility (1285 km), projects ≥5σ resolution of the ordering after two years of beam running, *for all values of the leptonic CP phase δ_CP*, because the long baseline produces a large matter-induced asymmetry that distinguishes the two orderings essentially independently of δ_CP [Abi et al. 2020, Eur. Phys. J. C 80:978]. **Hyper-Kamiokande**, via its atmospheric-neutrino programme, achieves ≥3σ in a 10-year atmospheric run across baselines from ~100 km to ~13,000 km Earth-traversing, climbing toward 5σ in a joint beam+atmospheric analysis under favorable θ_23 octant [Hyper-K Design Report 2018, arXiv:1805.04163]. **JUNO**, the 52.5-km reactor antineutrino experiment in southern China, exploits vacuum-oscillation interference between the solar and atmospheric mass-squared splittings — completely independent of both the matter effect and δ_CP. The collaboration's 2025 projection reaches 3σ median sensitivity at approximately 6.5 years × 26.6 GW thermal exposure [Abusleme et al. 2025, Chin. Phys. C 49:033104].

> *Where to look:* the [`cell-nu-mass-hierarchy`](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html#/fc/neutrino-sector-phenomenology/cell-nu-mass-hierarchy) cell in neutrino-sector phenomenology — three resolver entries, each with sensitivity band and design-document citation.

Three programs, three physical channels, three independent systematic dependencies. A natural follow-up: *which pairing among these adjudicates between competing theoretical predictions of the ordering?* The dataset's discriminating-experiments lookup returns empty for HK/DUNE, HK/JUNO, and DUNE/JUNO — and the empty result is informative. Mass ordering is a single Standard-Model parameter that nature has already fixed; flavor-symmetry models prefer one ordering or the other under additional assumptions but do not generically produce predictions that meet the project's admissibility test for "competing point predictions from a single program." The map distinguishes *shared-parameter convergent measurement* from *competing-prediction adjudication*; a vanilla literature search tends to conflate the two.

---

## 2. One frontier, two complementary channels

The strong-CP problem — why the QCD vacuum angle θ̄ is observationally consistent with zero to better than ~10⁻¹⁰ when the Lagrangian permits any value in [0, 2π) — has a leading candidate resolution in the Peccei-Quinn mechanism, which dynamically relaxes θ̄ via a new pseudoscalar axion. The map records two experimental programs targeting this frontier, attacking the same resolution from complementary directions.

The **axion-haloscope network** (ADMX, HAYSTAC, MADMAX, ABRACADABRA, DMRadio) is direct detection. A galactic-halo axion converts to a microwave photon in a high-Q resonant cavity inside a strong magnetic field. ADMX Run 1B has demonstrated DFSZ-coupling sensitivity g_aγγ ≲ 4 × 10⁻¹⁶ GeV⁻¹ over the 3.3–4.2 μeV band [Bartram et al. 2021, Phys. Rev. Lett. 127:261803]; the broader program envelope reaches g_aγγ ≲ 10⁻¹⁵ GeV⁻¹ across the active mass coverage. **Next-generation EDM searches** at PSI (nEDM, n2EDM) provide the indirect bound. The Crewther–DiVecchia–Veneziano–Witten relation translates a neutron EDM upper bound directly into an upper bound on θ̄: the PSI nEDM result |d_n| < 1.8 × 10⁻²⁶ e·cm at 90% CL yields |θ̄_QCD| < 10⁻¹⁰, and the n2EDM successor targets |d_n| ≲ 10⁻²⁷ e·cm, tightening the θ̄ bound by another order of magnitude [Abel et al. 2020, Phys. Rev. Lett. 124:081803; Ayres et al. 2021, Eur. Phys. J. C 81:512].

> *Where to look:* the [strong-CP-problem frontier](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html#/discourse/strong-cp-problem) — two resolver entries, complementary sensitivity bands.

What the dataset exposes that an isolated reading wouldn't: these two channels probe *the same resolution* from opposite ends. One measures the axion-photon coupling — the new particle Peccei-Quinn introduces. The other bounds the order parameter — the angle the mechanism is supposed to relax. A unanimous null result tightens both ends of the closure. A positive haloscope detection without a corresponding EDM signal would force specific model-class subdivisions on the axion side. The cross-channel structural visibility is the kind of synthesis a working physicist gets only by reading both literatures in the same head; the map records the connection so anyone can read it cold.

---

## 3. One apparatus class, two foundational frontiers

Follow the EDM program in the *other* direction from example 2 and a structural fact about the experimental landscape emerges. The same program class addresses a second open frontier through a different fermion channel.

Where the *neutron* EDM channel attacks the strong-CP problem (via Crewther–DiVecchia–Veneziano–Witten), the *electron* EDM channel attacks the cosmological matter-antimatter asymmetry. The Sakharov criteria for baryogenesis demand CP violation beyond the SM-CKM source by roughly ten orders of magnitude; the BSM CP-violating phases required to source η_B ≈ 6 × 10⁻¹⁰ generically feed into the electron EDM at one- or two-loop level. The Cesarotti–Lu–Nakai–Soni–Strassler framework [Phys. Rev. D 100:015013, 2019] translates an upper bound on |d_e| into constraints on those phases. The current JILA HfF⁺ trapped-ion measurement, |d_e| < 4.1 × 10⁻³⁰ e·cm at 90% CL [Roussy et al. 2023, Science 381:46], already excludes light-stop electroweak baryogenesis essentially completely and substantially constrains two-Higgs-doublet light-pseudoscalar variants. ACME-III continues toward ~10⁻³⁰ e·cm.

> *Where to look:* the [EDM program node](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html#/discourse/edm-program) — two resolver entries pointing at two distinct foundational frontiers.

Same source apparatus class, two distinct foundational frontiers, two fermion species, two completely different theoretical translations, sensitivity floors three orders of magnitude apart (10⁻²⁷ e·cm vs 10⁻³⁰ e·cm) because the channels respond to different microphysics. This is the dataset's only dual-frontier program at present — and it did not emerge from a design choice. It emerged from authoring the experimental-coverage relations one program at a time and noticing afterward that EDM searches were the only experimental class whose resolver entries appeared under more than one open frontier. The pattern is *emergent in the dataset*, not postulated by it.

---

## 4. One physical entity, two classifications

The eV-scale sterile neutrino lives in two classifications at once. In neutrino-sector phenomenology, it appears as two cells distinguishing the historical structure of the question: the LSND 1996 3+1 interpretation (now formally falsified by IceCube, MicroBooNE, MINOS+, and STEREO/PROSPECT reactor results) and the remaining-tension region from the BEST gallium anomaly. In dark-matter candidates, it appears as one cell — same particle, classified now by its candidate-class role for cosmological structure rather than its flavor-mixing role.

The cross-classification relation in the dataset formalizes the structural dependency: the dark-matter side *reads off* the neutrino-side flavor framework. Concretely, one source cell on the DM side anchors to *two* target cells on the neutrino side, because the DM-candidate framing inherits both the falsification status of the LSND-specific interpretation and the open-tension status of the remaining gallium parameter space. The quantitative anchor on both sides is m_s ≈ 1 eV ± 0.5 eV, with ≥ 4 shared literature citations spanning LSND 2001, MiniBooNE 2018, Dentler et al. 2018, IceCube 2020, and the 2024 PDG review.

> *Where to look:* the [cross-classification relation](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html#/edge/edge-xc-dm-derives-nu-sector-partial) connecting dark-matter candidates and neutrino-sector phenomenology — pinned cells, status, and shared citation set.

The same pattern repeats one mass scale up: a keV-scale sterile neutrino appears in dark-matter candidates with its mass anchor (m_s ≈ 7.1 keV from the 2014 stacked galaxy-cluster X-ray observations [Bulbul et al. 2014, ApJ 789:13]) and in neutrino-sector phenomenology with its complementary observational signature (the contested 3.55 keV X-ray emission line). The two are related by two-body decay kinematics E_γ = m_s/2. What the map exposes that an isolated reading wouldn't: the *paired status-transitivity* — a falsification of the LSND-specific interpretation on the neutrino side carries the same falsification meaning across to the DM-classification side automatically, because the cross-classification relation records that the DM structure is read off the neutrino-side framework, not independently postulated.

---

## 5. One conditional, forced structural consequences

Finally, an example of a *conditional* result the dataset records and a working physicist might naturally ask about. *If* the cosmological matter-antimatter asymmetry comes from leptogenesis — CP-asymmetric decays of heavy right-handed Majorana neutrinos in the early universe, converted to baryon asymmetry by electroweak sphalerons — *what does that force?*

The dataset's answer, on the matter-antimatter-asymmetry frontier, names the leptogenesis resolution and two structural consequences. First, the Dirac-vs-Majorana question, currently open in neutrino-sector phenomenology, is *forced* to Majorana — leptogenesis requires lepton-number-violating Majorana masses for the right-handed neutrinos by construction. Second, the leptogenesis mechanism cell, currently theoretical-mechanism predicted-only, is *promoted* to confirmed-by-indirect-evidence — confirmation of the asymmetry's leptogenetic origin would resolve the cell's status even though direct laboratory test of the mechanism is inaccessible.

A quantitative bound attaches to the first consequence: the lightest right-handed Majorana neutrino's mass M₁ ≳ 10⁹ GeV. This is the Davidson-Ibarra bound [Davidson, Ibarra 2002, Phys. Lett. B 535:25], derived from combining the CP-asymmetry bound |ε_1| ≤ (3/16π)(M_1 m_max / v²) with the requirement of sufficient leptogenesis efficiency to reproduce η_B ≈ 6 × 10⁻¹⁰ [Fukugita, Yanagida 1986, Phys. Lett. B 174:45; Davidson, Nardi, Nir 2008, Phys. Rep. 466:105].

> *Where to look:* the [matter-antimatter-asymmetry frontier](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html#/discourse/matter-antimatter-asymmetry) — the leptogenesis resolution, its condition citations, the implication tree, and the M₁ bound with its derivation citations.

A capable assistant can know about leptogenesis, can know about Davidson-Ibarra, can know about the seesaw mechanism. What's harder is to surface, in one frame, that *if this conditional resolves the way leptogenesis suggests, here is what gets forced and here is the quantitative scale of one consequence, with named citations for both the mechanism and the bound*. The map carries the implication chain explicitly.

---

## What makes the dataset trustworthy

A note on the discipline. None of what the dataset says is original physics. The cells, the experimental-program entries, the conditional consequences, the quantitative bounds — all are read from peer-reviewed literature, each with at least one literature-value-stating citation. What the project adds is the curatorial discipline that decides what can be encoded and on what evidence. A bound becomes part of the dataset only if a published source states the value with the value-stating phrase preserved in the citation prose; a competing prediction is encoded only if each program supplies a point value derivable from a program-internal calculation; conditional consequences enter only with derivation citations alongside the condition citations. The discipline (the project calls it *the firewall*) is what separates this from an aggregator-style site, and it is why the cross-cutting queries above return answers a physicist can audit by walking the citations rather than answers that require trust.

The four other Track 4 use-side artifacts complete the access pathway. *Query recipes* document the natural-language question shapes the dataset answers, for physicists who have never seen a machine-queryable physics catalogue. A *guided chat entry point* lets a physicist ask the dataset questions in physicist prose without setting up any tooling. *Worked session transcripts* show the moves in practice, including informative-empty results like the one in example 1. This essay is the anchor: what kinds of answers, with what discipline, demonstrated against the live data.

If something in the worked examples looks wrong, or a citation needs refreshing, or a cell deserves an axis the current classification does not have — the project is on GitHub, and the contribution pathway opens with Track 4.

---

*End of USE_THE_MAP_ESSAY.md. Live dataset state at draft time: v95 / schema v19 / 83 nodes / 230 edges / 30 formal classifications / 484 cells / 19 experimental programs / 14 open-frontier or totality-approach carriers of conditional consequences / 288 quantitative-bound entries / 38 experimental-coverage relations.*
