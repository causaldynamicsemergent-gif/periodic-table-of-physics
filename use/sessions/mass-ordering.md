# Worked session — "Which experiments will settle the neutrino mass ordering?"

*A curated use-side artifact for the Map of Physics. Demonstrates convergent experimental coverage of a single already-fixed quantity through orthogonal physical channels — and the honest reading of an empty discriminating-experiments result whose emptiness has a different cause than in the strong-CP case. Performed end-to-end on the live substrate, in physicist prose. Pairs with the query recipe at the foot of this file. Drafted from a real session against data v99; lightly edited for readability per `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.4.*

---

## The recipe this session illustrates

> **If you want to know:** which experiments will pin down a quantity whose value nature has already fixed but we haven't yet measured — and what it means when several programs all target the same number —
> **the move is:** open the quantity as a cell, read its present empirical state, then read its experimental coverage program by program — each program's sensitivity reach, its timeline, and the physical channel it uses; then ask whether any pair of those programs discriminates competing predictions, and read an empty answer for what it is: here it is empty not because the candidates supply ranges, but because there are no competing predictions at all — only one fact of nature, measured three independent ways.
> **A worked example follows.** The answer lives on the mass-ordering cell in the neutrino-sector classification and its three experimental-coverage entries.

---

## The session

**Physicist:** I want to know which experiments are actually going to settle the neutrino mass ordering — normal versus inverted. I could read the DUNE, Hyper-K and JUNO papers myself. What does the catalogue add over that?

**Assistant:** It records the ordering as a specific cell in the neutrino-sector classification — the sign of the larger mass-squared splitting, Δm²₃₁ — and carries it as *measured-tension*, which is the catalogue's way of saying "leaning, not settled." The present state it pins down: the current global fit (NuFIT 6.0, Esteban et al. 2024) prefers normal ordering, but only at about 2.5σ, and only once the Super-Kamiokande atmospheric χ² table is folded in — the same paper notes that without it the two orderings fit almost equally well. The catalogue stores that as an upper bound of 2.47σ on the deviation from no-preference, with the bound direction recorded precisely because the preference is the *ceiling* of what the current data supports, not a measurement. The magnitude is in good shape — |Δm²₃₁| ≈ 2.5 × 10⁻³ eV² to a few percent — but the *sign*, which is the ordering, is the open question.

Then it lists three programs that address this cell, each with its sensitivity reach, its timeline, and — the part worth your time — the distinct physical channel each one uses.

**Physicist:** Go on, what are the three?

**Assistant:** Three programs, three genuinely independent channels.

**DUNE** is the matter-effect beam channel. Its 1285-km Fermilab-to-SURF baseline runs the neutrino beam through enough Earth that the matter-induced ν_μ → ν_e asymmetry comes out opposite in sign for normal versus inverted ordering. The recorded reach is decisive: ≥5σ for *all* values of δ_CP after just two years of beam running (Abi et al. 2020, EPJ C 80:978). Timeline: planned, beam late this decade.

**Hyper-Kamiokande** is the atmospheric statistical-power channel. Rather than a single baseline it uses the whole range of atmospheric-neutrino path lengths — roughly 100 km to ~13 000 km for Earth-traversing trajectories — and reads the mass-ordering-dependent matter resonance out of the resulting P(ν_μ → ν_e) pattern. The recorded reach is ≥3σ from ten years of atmospheric data alone, rising to ≥5σ when the J-PARC beam data is combined in and the θ₂₃ octant is favorable (Hyper-Kamiokande Design Report 2018, arXiv:1805.04163). Timeline: planned, first beam ~2027.

**JUNO** is the vacuum-interference reactor channel. A 20-kt liquid-scintillator detector at 52.5 km from the Yangjiang and Taishan reactors reads the ordering out of the fine interference between the solar (Δm²₂₁) and atmospheric (Δm²₃₁, Δm²₃₂) oscillation frequencies in the reactor-antineutrino survival probability — a quasi-vacuum measurement with essentially no matter effect, and independent of both δ_CP and θ₂₃. The recorded reach is 3σ median sensitivity at roughly 6.5 years × 26.6 GW thermal exposure (Abusleme et al. 2025, Chin. Phys. C 49:033104) — the collaboration's current projection, which supersedes the older Yellow Book estimate. Timeline: running, since filling completed in late 2024.

So you have matter-driven beam, statistical-power atmospheric, and vacuum-interference reactor, each reaching the ordering through a different piece of physics.

**Physicist:** Fine — so which pair of them discriminates? If I ask the catalogue what DUNE and Hyper-K jointly adjudicate, what comes back?

**Assistant:** Nothing — and this is the case worth being careful about. Ask the catalogue for an experiment that discriminates competing predictions on this cell, for any of the three pairings — DUNE/Hyper-K, DUNE/JUNO, Hyper-K/JUNO — and every one of them comes back empty. The emptiness is correct and informative, but its cause here is different from the cases where two candidate theories predict overlapping ranges.

Here the cause is more basic: the ordering isn't a contest between theories at all. Normal versus inverted is a binary fact about the world — the sign of one mass-squared difference, a value nature fixed long ago and we simply haven't read off yet. The three experiments don't predict different orderings and wait to see who's right; they all measure the *same* ordering, through three different channels. There is nothing to place side by side, because there are no rival point predictions — and the catalogue records none, deliberately, rather than manufacturing a disagreement that the physics doesn't contain.

It's worth seeing the contrast. The catalogue *does* hold cases where the discrimination question is the right one — muon g-2, for instance, where dispersive and lattice calculations of the hadronic vacuum polarization are genuine competing Standard-Model predictions an experiment can adjudicate between. Mass ordering is the other kind: one number, already determined, three orthogonal ways of measuring it. The catalogue draws exactly that line — "experiments that adjudicate between competing predictions" on one side, "experiments that measure a shared quantity through orthogonal channels" on the other — and an empty discriminating-experiments answer is how it tells you which side a question sits on.

**Physicist:** Then what's the point of having all three, if they're measuring the same thing?

**Assistant:** Redundancy through independent systematics — which for a binary result of this consequence is exactly what you want. The three channels fail in unrelated ways: DUNE's answer rides on the beam matter-effect model, Hyper-K's on atmospheric flux and statistics, JUNO's on sub-percent reactor-spectrum energy resolution with no matter effect at all. A unanimous determination across all three would carry confidence no single experiment could supply; a disagreement would localize the systematic to one channel rather than leaving you to guess. That is what the catalogue's "shared resolver coverage" buys here — not a contest with a winner, but a three-way triangulation on one already-fixed fact. The catalogue records all three edges as *bounds-setting* rather than *measurement-discriminating* for precisely that reason: each one drives the significance of a binary determination upward, none of them adjudicates between rival predicted values.

**Physicist:** That's a cleaner way to hold it than three separate sensitivity plots.

**Assistant:** That's the use of it. It will tell you what the present empirical lean is and how soft it is, which programs address the question, what channel and reach each one brings, and — when you ask the discrimination question — it will tell you honestly that the question doesn't apply here, and why. The mass ordering is a clean case of convergent coverage: one fixed number, three orthogonal channels closing in, and an empty discrimination result that means "this isn't a contest" rather than "we don't know."

---

## What this demonstrates

- **Experimental coverage is read off a cell, not only a frontier.** The target here is a property cell — the ordering, carried as measured-tension — and the catalogue records which programs address it with the same sensitivity / timeline / channel structure it uses for frontiers. The coverage move works wherever a quantity is being pursued.
- **Convergent coverage on one fixed quantity is its own pattern.** Three programs, three orthogonal channels — matter-driven beam, statistical-power atmospheric, vacuum-interference reactor — all measuring the same binary fact. The catalogue holds that three-way structure explicitly, including the independent-systematics rationale that makes the redundancy valuable.
- **Informative emptiness, with a second distinct cause.** As in the strong-CP session the discriminating-experiments question returns empty; *unlike* that session, the cause is not that candidates supply ranges but that there are no competing predictions at all — the ordering is a fact of nature, not a theory-discriminator. The catalogue distinguishes "adjudicating competing predictions" from "measuring a shared quantity through orthogonal channels," and the empty answer is how it signals which case you're in. A general-purpose model tends to conflate the two; the catalogue keeps them apart and says why.
- **The vocabulary stays physics-first.** Nothing in the physicist-facing turns names an internal field; the moves read as "the ordering cell," "present empirical state," "experimental coverage," "sensitivity reach," "channel," "bounds-setting vs measurement-discriminating," "shared coverage vs discrimination."

---

## The recipe, distilled (for the "How to use the map" page)

**Reading convergent coverage of an already-fixed quantity.** Some open questions aren't contests between theories — they're quantities nature has already fixed that we simply haven't measured yet. For these, open the quantity as a cell, read its present empirical state (how strong the current lean is, and how soft), then read its experimental coverage program by program: each program's sensitivity reach, its timeline, and the physical channel it uses. When several programs target the same quantity, the value is redundancy through independent systematics, not a race — the neutrino mass ordering is carried this way, with three orthogonal channels closing in (matter-driven beam at DUNE, ≥5σ; statistical-power atmospheric at Hyper-K, ≥3σ rising to ≥5σ with beam; vacuum-interference reactor at JUNO, 3σ, running). Then ask for an experiment that discriminates competing predictions, and read the empty answer carefully: here it is empty not because the candidates supply ranges but because there are no competing predictions at all — one fact of nature, measured three ways — and the catalogue marks all three channels bounds-setting rather than inventing a contest. *Worked example: the mass-ordering cell → DUNE, Hyper-K, JUNO converging through three orthogonal channels → bounds-setting coverage, no discriminating experiment, because the ordering is fixed and not predicted.*

---

*Verified against the live `cell-nu-mass-hierarchy` cell in `neutrino-sector-phenomenology` and its three experimental-coverage entries (`hyper-k`, `dune`, `juno`) at data v99 / schema v20. The discriminating-experiments lookup returns empty for all three pairings — HK/DUNE, HK/JUNO, DUNE/JUNO. Companion sessions: `leptogenesis.md` (frontier-level forced consequences) and `strong-cp.md` (two-channel coverage with range-valued candidates) — the three together cover the forced-consequence move, two-channel coverage where the emptiness is range-valued candidates, and convergent coverage where the emptiness is a fixed fact of nature.*
