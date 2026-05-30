# How to use the map

*Query patterns for working physicists. Each recipe is a question you might actually have and the move that answers it, distilled from a fully worked session in [`sessions/`](sessions/). No prior experience with the underlying server is assumed — you ask in physics, the catalogue answers in physics.*

The Map of Physics is a curated, citation-traced catalogue of modern physics organized as formal classifications — Mendeleev-style partitions of physical content along discrete axes, with open frontiers, candidate resolutions, experimental coverage, and the conditional consequences of confirmation all recorded as first-class entries. The recipes below are the most useful ways in; each links to the session that works it end to end.

---

## Reading an open problem for what it forces

Open the problem as a frontier and read three things off it: the empirical bound it must explain, the structural reason it stays open, and its candidate resolutions with how far each has come. Then follow a resolution's *forced consequences* — the catalogue records, for each candidate, which classifications and cells a confirmation would pin down and in which direction, often with a required scale and the paper that derived it. Finally read its *experimental coverage*: which running or planned programs address it, and crucially whether each is *measurement-discriminating* (adjudicating between competing predicted values) or *bounds-setting* (excluding regions of parameter space). When you ask for an experiment that discriminates competing predictions and the catalogue returns nothing, that is a real answer: the candidates supply ranges, not rival point values, and the catalogue declines to invent them. *Worked example: the baryon-asymmetry frontier → leptogenesis → Majorana neutrinos forced, M₁ ≳ 10⁹ GeV required, electron-EDM searches setting bounds.* Full walkthrough: [`sessions/leptogenesis.md`](sessions/leptogenesis.md).

---

## Reading a frontier's experimental coverage

Open the problem as a frontier and read its experimental coverage: which running or planned programs address it, and for each, its sensitivity reach, its timeline, and crucially whether it is *measurement-discriminating* (adjudicating between competing predicted values) or *bounds-setting* (excluding regions of parameter space). A frontier can carry more than one channel — the strong-CP problem carries two, axion haloscopes bounding the axion–photon coupling ($g_{a\gamma\gamma} \lesssim 10^{-15}\ \mathrm{GeV^{-1}}$) and next-generation neutron-EDM searches bounding the strong-CP angle ($\bar\theta_{\mathrm{QCD}} < 10^{-10}$, heading for $|d_n| \lesssim 10^{-27}\ e\!\cdot\!\mathrm{cm}$), both probing the same Peccei–Quinn resolution from complementary directions. When you then ask for an experiment that discriminates competing predictions and the catalogue returns nothing, that is a real answer: here the candidate axion models predict coupling *relations*, not rival point values, and the catalogue declines to invent them — so the honest record is two bounds closing in, not a measurement settling a contest. *Worked example: the strong-CP frontier → axion haloscopes ($g_{a\gamma\gamma}$) and neutron-EDM searches ($\bar\theta_{\mathrm{QCD}}$) → two bounds-setting channels, no discriminating experiment, a QCD-axion classification forced if a signal appears.* Full walkthrough: [`sessions/strong-cp.md`](sessions/strong-cp.md).

---

## Reading convergent coverage of an already-fixed quantity

Some open questions aren't contests between theories — they're quantities nature has already fixed that we simply haven't measured yet. For these, open the quantity as a cell, read its present empirical state (how strong the current lean is, and how soft), then read its experimental coverage program by program: each program's sensitivity reach, its timeline, and the physical channel it uses. When several programs target the same quantity, the value is redundancy through independent systematics, not a race — the neutrino mass ordering is carried this way, with three orthogonal channels closing in (matter-driven beam at DUNE, ≥5σ; statistical-power atmospheric at Hyper-K, ≥3σ rising to ≥5σ with beam; vacuum-interference reactor at JUNO, 3σ, running). Then ask for an experiment that discriminates competing predictions, and read the empty answer carefully: here it is empty not because the candidates supply ranges but because there are no competing predictions at all — one fact of nature, measured three ways — and the catalogue marks all three channels bounds-setting rather than inventing a contest. *Worked example: the mass-ordering cell → DUNE, Hyper-K, JUNO converging through three orthogonal channels → bounds-setting coverage, no discriminating experiment, because the ordering is fixed and not predicted.* Full walkthrough: [`sessions/mass-ordering.md`](sessions/mass-ordering.md).

---

## A note on what the catalogue is good for

These recipes share a spine: the catalogue answers *structural* questions — what is forced, what is bounded, what is being measured versus excluded, and where a question sits relative to the rest of physics — with every claim traced to a named source. That is the move a curated catalogue makes possible and a free-recall model does not: not "tell me about the strong-CP problem," but "tell me, from a citation-traced record, exactly which experiments address this frontier, what each can reach, and why the discrimination question is empty." A recurring lesson across these recipes is that an *empty* answer can be the informative one — and it pays to read *why* it is empty. Sometimes the candidates supply ranges rather than rival point values (the strong-CP case); sometimes there are no competing predictions at all because the quantity is a fact of nature measured several ways rather than a contest between theories (the mass-ordering case). In both, the catalogue records the emptiness rather than inventing a contest. The worked sessions in [`sessions/`](sessions/) show each recipe in full.

---

*Written in the physicist-facing vocabulary discipline. Recipes are the distilled-recipe paragraphs of the worked sessions; as new sessions are added, their recipes join this page. See [`README.md`](README.md) for the directory index and [`essay.md`](essay.md) for the longer-form framing.*
