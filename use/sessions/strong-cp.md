# Worked session — "What does this catalogue say about the strong-CP problem?"

*A curated use-side artifact for the Map of Physics. Demonstrates a frontier addressed by two independent experimental channels pulling from complementary directions — and the honest reading of an empty discriminating-experiments result. Performed end-to-end on the live substrate, in physicist prose. Pairs with the query recipe at the foot of this file. Drafted from a real session against data v99; lightly edited for readability per `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.4.*

---

## The recipe this session illustrates

> **If you want to know:** how an open problem is actually being attacked in the lab — which experiments address it, what each can reach, and whether they *measure* a discriminating value or merely *bound* a region —
> **the move is:** open the question as a frontier, read its experimental coverage, and for each program note its sensitivity, its timeline, and whether it is measurement-discriminating or bounds-setting; then ask whether any pair of programs discriminates competing predictions, and read an empty answer as the informative result it is.
> **A worked example follows.** The answer lives on the strong-CP frontier card and its two experimental-coverage entries.

---

## The session

**Physicist:** The strong-CP problem I know — QCD allows a $\bar\theta_{\mathrm{QCD}}\,G\tilde G$ term, nothing forbids it, the neutron EDM says it's tiny. What does this catalogue add beyond that?

**Assistant:** It records the problem as an open question with structure attached, and then — this is the part worth your time — it tells you exactly how the question is being pressed experimentally. Start with the frontier card. The empirical anchor is the bound $\bar\theta_{\mathrm{QCD}} < 10^{-10}$, an upper bound sourced to the PSI neutron-EDM measurement (Abel et al. 2020) and the 2024 *Review of Particle Physics*. The reason it stays open is recorded as a specific kind of failure — an organizing-structure failure: gauge symmetry alone simply does not constrain $\bar\theta_{\mathrm{QCD}}$ to be small, so the smallness is unexplained rather than mis-modelled. The standard candidate resolution is on the card: Peccei–Quinn symmetry producing a pseudo-Goldstone axion that dynamically relaxes $\bar\theta_{\mathrm{QCD}}$ toward zero (Peccei–Quinn 1977; Weinberg 1978; Wilczek 1978), alongside two weaker candidates — an anthropic argument and the Vafa–Witten structural constraint.

**Physicist:** So what's actually being done to test it?

**Assistant:** Here the catalogue records something a review usually leaves you to assemble. The frontier carries *two* experimental-coverage entries, from independent programs with no shared apparatus and no shared observable — and it is the first frontier in the catalogue to carry two such channels.

The first is the axion haloscope network — ADMX, HAYSTAC, MADMAX, ABRACADABRA, DMRadio. This is the direct-detection channel: a galactic-halo axion converts to a microwave photon in a high-Q cavity inside a strong magnetic field (Sikivie 1983). What it bounds is the axion–photon coupling. The recorded reach is a discovery-floor upper bound $g_{a\gamma\gamma} \lesssim 10^{-15}\ \mathrm{GeV^{-1}}$, with ADMX Run 1B already reaching DFSZ sensitivity $g_{a\gamma\gamma} \lesssim 4\times10^{-16}\ \mathrm{GeV^{-1}}$ over the 3.3–4.2 μeV band (Bartram et al. 2021). Running, now.

The second is next-generation neutron-EDM searches — nEDM/n2EDM at PSI. This is the indirect channel. The Crewther–DiVecchia–Veneziano–Witten relation, $|d_n| \approx (3.6\times10^{-16}\ e\!\cdot\!\mathrm{cm})\times\bar\theta_{\mathrm{QCD}}$, turns an upper bound on the neutron EDM straight into an upper bound on $\bar\theta_{\mathrm{QCD}}$. The current PSI bound $|d_n| < 1.8\times10^{-26}\ e\!\cdot\!\mathrm{cm}$ (Abel et al. 2020) is exactly what produces the frontier's recorded $\bar\theta_{\mathrm{QCD}} < 10^{-10}$; the n2EDM successor targets $|d_n| \lesssim 10^{-27}\ e\!\cdot\!\mathrm{cm}$ (Ayres et al. 2021), tightening the angle by another order of magnitude.

The shape is the payoff. One frontier, two channels probing the *same* Peccei–Quinn resolution from complementary directions: the haloscope bounds $g_{a\gamma\gamma}$, the coupling of the *postulated* axion; the neutron EDM bounds $\bar\theta_{\mathrm{QCD}}$, the *order parameter* the mechanism is supposed to relax. The catalogue holds that cross-channel structure explicitly — you don't have to assemble it.

**Physicist:** Do the two of them discriminate between competing predictions, then?

**Assistant:** No — and the catalogue is careful to say so rather than pretend otherwise. Both entries are marked *bounds-setting, not measurement-discriminating*. If you ask directly for an experiment that discriminates competing predictions on this frontier, the answer comes back empty, and that emptiness is the correct, informative result.

The reason is physical. The candidate axion models — KSVZ, DFSZ, the broader invisible-axion family catalogued by Di Luzio et al. 2020 — predict *relations* between the breaking scale $f_a$, the axion mass $m_a$, and the coupling $g_{a\gamma\gamma}$. That's a hypothesis class, not a single value at fixed mass. Peccei–Quinn predicts $\bar\theta \to 0$ in the large-$f_a$ limit but pins no specific non-zero residual at the EDM floor; the anthropic argument is a parameter-space claim; Vafa–Witten constrains the angle's origin without fixing its value. So there are no rival point predictions to place side by side and have an experiment choose between. The catalogue records none here, on purpose — inventing them would assert structure the literature doesn't have. What the frontier has instead is two-channel coverage: two independent bounds closing on the same resolution from different directions, which is informative in a different way than discrimination.

**Physicist:** And if the axion is actually found?

**Assistant:** The catalogue records that too, as a forced consequence. Confirmation of the Peccei–Quinn resolution would force a new classification organizing the QCD-axion model space — DFSZ vs KSVZ, hadronic vs leptonic, the invisible-axion variants — along axes of PQ-breaking scale, heavy-fermion content, and the two coupling families (Di Luzio et al. 2020; Kim–Carosi 2010). And that forced classification carries a number of its own: the PQ-breaking scale sits in the open window $f_a \sim 10^{8}$–$10^{12}\ \mathrm{GeV}$ — lower bound from SN1987A axion-emission constraints, upper bound from the misalignment-mechanism relic abundance not overclosing the universe — written as $\log_{10}(f_a/\mathrm{GeV}) = 10 \pm 2$. So the chain is: an open question → a measured bound it must explain → two complementary channels narrowing it → and, conditional on a detection, a new classification forced into being with a required scale and the papers that derived it.

**Physicist:** That's a cleaner picture than I'd have drawn myself.

**Assistant:** That's the use of it. It will tell you what is forced, what is bounded, and whether the experiments measure or merely exclude — and it won't dress up two bounds as a contest. The strong-CP frontier is a clean case of two-channel coverage: a sharp angle to explain, two independent running programs closing in from coupling and order-parameter sides, and a forced classification waiting on the other side of a detection.

---

## What this demonstrates

- **One frontier, two independent channels, recorded explicitly.** Direct axion detection ($g_{a\gamma\gamma}$) and an indirect order-parameter bound ($\bar\theta_{\mathrm{QCD}}$ via the neutron EDM) — no shared apparatus, no shared observable, both addressing the same resolution. A reader gets the cross-channel structure off the card rather than having to build it.
- **Bounds-setting is a first-class status, distinct from discrimination.** Both channels exclude parameter space rather than measuring a value that adjudicates rival predictions. The catalogue distinguishes the two postures and marks these edges as bounds-setting on stated physics grounds.
- **Informative emptiness is a real result.** Asking for a discriminating experiment returns nothing *because the candidate programs genuinely supply coupling relations, not competing point values* — and the catalogue says so by leaving the prediction lists empty rather than inventing numbers. The reason for the emptiness is the content.
- **The prediction move is frontier-level.** The forced consequence — "if Peccei–Quinn is real, a new axion-model classification is forced, with $f_a$ in a stated window" — hangs on the frontier, the way an empty column in the periodic table is a prediction about the table, not about one cell.
- **The vocabulary stays physics-first.** Nothing in the physicist-facing turns names an internal field; the moves read as "open question," "experimental coverage," "sensitivity reach," "bounds-setting vs measurement-discriminating," "what a detection would force."

---

## The recipe, distilled (for the "How to use the map" page)

**Reading a frontier's experimental coverage.** Open the problem as a frontier and read its experimental coverage: which running or planned programs address it, and for each, its sensitivity reach, its timeline, and crucially whether it is *measurement-discriminating* (adjudicating between competing predicted values) or *bounds-setting* (excluding regions of parameter space). A frontier can carry more than one channel — the strong-CP problem carries two, axion haloscopes bounding the axion–photon coupling ($g_{a\gamma\gamma} \lesssim 10^{-15}\ \mathrm{GeV^{-1}}$) and next-generation neutron-EDM searches bounding the strong-CP angle ($\bar\theta_{\mathrm{QCD}} < 10^{-10}$, heading for $|d_n| \lesssim 10^{-27}\ e\!\cdot\!\mathrm{cm}$), both probing the same Peccei–Quinn resolution from complementary directions. When you then ask for an experiment that discriminates competing predictions and the catalogue returns nothing, that is a real answer: here the candidate axion models predict coupling *relations*, not rival point values, and the catalogue declines to invent them — so the honest record is two bounds closing in, not a measurement settling a contest. *Worked example: the strong-CP frontier → axion haloscopes ($g_{a\gamma\gamma}$) and neutron-EDM searches ($\bar\theta_{\mathrm{QCD}}$) → two bounds-setting channels, no discriminating experiment, a QCD-axion classification forced if a signal appears.*

---

*Verified against the live `strong-cp-problem` open-frontier node and its two experimental-coverage entries at data v99 / schema v20. Companion session: `leptogenesis.md` — next-generation EDM searches appear in both, via the neutron-EDM channel here and the electron-EDM channel there, which makes that program the catalogue's first dual-frontier experimental program.*
