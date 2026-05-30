# MENDELEEV_FRAME.md — the four moves the Map of Physics supports

**Purpose.** The canonical statement of the four structural moves the Map of Physics supports, named once so every physicist-facing surface downstream — the explorer subtitle and help text (E0), the `server_info` purpose statement and tool descriptions (M0), the glossary, and the use-side essay — can quote or adapt from a single source. This is the upstream artifact for the E0 and M0 sub-PR sequences. It is methodology-facing, so it uses project-internal vocabulary freely; but each section carries a physicist-facing paragraph the downstream surfaces can lift directly, written under the discipline in `PHYSICIST_FACING_VOCABULARY.md`.

Each move is tagged by its structural relationship to the substrate: **substrate-contained** (the map directly holds the content; the physicist looks it up), **substrate-enabled** (the map provides literature-anchored organization; the physicist does the recognition or testing work on top), or **substrate-output** (the map surfaces a pattern or a gap at configuration time, as a consequence of organization meeting content). The third category is the one the corrected methodology makes explicit; see `META_v21_1_methodology_firewall.md` §8 and `MENDELEEV_POSITIONING_HANDOFF.md` §7.

Drafted 2026-05-29 in sub-PR P0'', replacing the P0 draft built on the un-corrected literature-anchoring principle.

---

## §1 — The substrate is a configuration space, not a single table

The "periodic table" analogy is a starting image, not the data structure. The substrate is a network of formal classifications — each a projection of physical or mathematical content along discrete axes — connected by cross-classification and derivational edges. A periodic table is one configuration over such a network: one classification laid out along its axes. The substrate supports many more. A *configuration* is any view constructed over the network: a single classification, a pair set side by side, or a multi-face cross-section that cuts several classifications along a shared axis.

Two kinds of thing emerge when a configuration is constructed: **patterns** (the same physical content recurring at corresponding positions across classifications) and **gaps** (a position the configuration's structure implies should be occupied, where no content yet sits). Both are *substrate outputs*. They are not authored content and they do not require prior literature endorsement of the specific pattern or gap; they require only that the content entering the substrate is literature-anchored and the organization is correctly built. The outputs follow. This is the corrected reading the firewall §8 establishes: the firewall binds what content enters the substrate; it does not bind what emerges when a physicist or the substrate's tooling lays that content out.

*Physicist-facing:* The map is a set of classifications of physical structure, each laid out along its own axes, linked where the same content appears in more than one. You can read one classification, compare two, or build a cross-section that cuts several at once — and recurrences and missing entries show up as a consequence of the layout, the way periodicity and the gaps at gallium and germanium showed up once the elements were laid out by weight and valence.

---

## §2 — M1: empty-cell prediction (substrate-output, with a substrate-contained special case)

This is the move the project is named for, and it leads. Mendeleev did not begin from a named open problem. He organized literature-anchored empirical data — atomic weights, valences, observed chemical behavior — along axes he chose, and the empty cells at positions 31 and 32 emerged from the organization itself. He then read the missing elements' properties off their occupied neighbors. No chemistry paper predicted gallium first; the configuration did.

The map records this exact move performed in physics. The light-hadron decuplet is organized by flavor SU(3) — the A₂ Lie algebra (`edge-xc-hadrons-specializes-ade`). Completing the 10 of SU(3) left one position empty, the sss member; its mass and quantum numbers were derived from the occupied positions and the particle (the Ω⁻) was subsequently found. The corresponding cell is now realized. This is the empty-cell move in its sharpest physical form, and it is literature-anchored in the substrate.

**Mode-3 (multi-face configuration) is the most Mendeleev-faithful version of M1**, because it matches what Mendeleev actually did: construct a configuration and let the structure emerge. The surface that performs it is the **configuration builder** — the substrate's central Mendeleev surface. The worked instance cuts `dark-matter-candidates` and `compact-astrophysical-objects` along a shared mass-and-observational-status axis — in effect, "what gravitationally-dominant matter exists at each mass scale, and is it confirmed." Both classifications independently hold primordial black holes: the dark-matter side as a candidate class (`cell-dm-PBH-asteroid-mass-viable`, viable; `cell-dm-PBH-LIGO-mass-excluded`, excluded as a major fraction), the compact-object side as an object class (`cell-compact-PBH-asteroid-mass`, an open cell; `cell-compact-PBH-LIGO-window`, excluded as a DM fraction). Laying the configuration out surfaces the recurrence as a substrate output: the same objects sit at corresponding positions in two classifications, with matching status, and — by the curators' deliberate choice — **no FC-level edge connects them** (both classifications record the overlap only at the cell level, "without forcing FC-level edges where no edge subtype cleanly fits"; a direct-edge query returns none). The recurrence is read off the organization, not asserted by an edge. This is the exact case the firewall's own history turned on: the un-corrected reading once treated authoring such a PBH edge as the thing to do, which §2 flags as back-influence; the corrected reading recognizes the recurrence as a configuration-time output that needs no edge at all.

Within that recurrence, one position reads as the configuration's open cell: the asteroid-mass window (~10¹⁷–10²¹ g), bounded below by the Hawking-evaporation lifetime and above by microlensing exclusion, the one mass scale where primordial black holes could still be the entire dark matter. Adding `sm-rep-content` as a third face sharpens why it is *that* position and not its baryonic neighbor — MACHOs, baryonic compact objects drawn from SM matter content, are excluded by the baryon budget (`cell-dm-MACHO-falsified`), while primordial black holes, formed gravitationally in the radiation era, are not. The gravitational-origin axis separates them. Critically, this open cell is an *authored, empirically-open* cell — its observational status is "viable-targeted," not the schema's `constructive_status: conjectured-by-pattern`. It shows the move with content the substrate already holds.

The schema's formal home for a *pattern-forced* empty cell — one the configuration's constructive axes require, as distinct from the empirically-open PBH cell above — is `constructive_status: conjectured-by-pattern`, and **its standing at zero cells today is correct, not a deficiency.** The category populates at configuration time, when the configuration builder forces a gap — not at content-authoring time. Pre-authoring `conjectured-by-pattern` cells with specific content would be content-authoring driven by pattern-finding, which the firewall §2 prohibits. The configuration builder that generates the entries is the E0 work itself; the zero-count is the honest state until that surface ships. (`META_v21_1_methodology_firewall.md` §8; the live count is confirmed zero at data v99.)

**Mode-1 (named-frontier-first) is the special case** where the configuration arrives pre-constructed: a named open frontier already carries its structural neighborhood, so the physicist doesn't build the configuration — the substrate holds it. This is substrate-contained. The worked instance is `hierarchy-problem`: the node arrives with its architecture edge to QFT, its regime-content loci (the Higgs and electroweak sectors), five candidate-targeting programs with discharge status, a characteristic scale (the ~17-order electroweak/Planck ratio), and two conditional resolutions (TeV-scale SUSY, composite Higgs), each forcing a new classification with a ~1 TeV upper bound. The configuration is given; the reader inspects it. **Mode-2 (pairwise comparison)** is the intermediate: two classifications set side by side, with `compare_classifications` surfacing shared axes and edges.

The dual of empty-cell prediction is **structural exclusion**: positions the configuration's constructive pattern rules out. The map holds 22 such cells (`find_forced_cells`, `find_structurally_excluded`) — for example, the gauge-boson-by-generation positions in SM rep content, forbidden because gauge bosons do not replicate over fermion generations, each forced by a named closure edge. These are first-class predictions too: the table asserting that certain positions cannot be filled.

*Physicist-facing:* Lay out a classification, or a cross-section of several, and some positions have a structural reason to exist but no occupant — the analog of the gaps Mendeleev left for gallium and the decuplet left for the Ω⁻. The map surfaces these gaps when you build the configuration; their properties follow from the occupied neighbors. The dual case is positions the structure forbids outright. Building those configurations, and reading the gaps off them, is the move the map is built to make tractable.

---

## §3 — M2: cross-classification patterns (substrate-enabled)

When the same physical content appears at corresponding positions in more than one classification, that recurrence is the analog of chemical periodicity. The map's contribution is the literature-anchored organization that makes the recurrence visible; the recognition of further recurrences is the physicist's work. The map does not claim to hold every pattern — it holds the organization in which patterns become findable.

The worked instance is `edge-xc-crit-specializes-bootstrap`. Each real critical system — the liquid-gas critical point of water, CO₂, and xenon; the ⁴He superfluid λ-transition; the FeF₂/MnF₂ antiferromagnets — specializes the conformal field theory at its Wilson-Fisher fixed point, and the conformal-bootstrap exclusion regions pin the critical exponents to high precision. The correspondence between a real system's universality class and its bootstrap fixed point is settled physics, surfaced in the literature; the map organizes it so the recurrence reads off cleanly. The discovery of less-obvious recurrences across the substrate's classifications is the move `find_cross_classification`, `compare_classifications`, and per-classification scans enable — performed by the physicist, grounded in literature the substrate is anchored to.

*Physicist-facing:* The same physical content often sits at matching positions in two different classifications — a critical system and the conformal field theory at its fixed point, say, where the measured exponents and the bootstrap bounds are the same numbers. The map lays the classifications out so these recurrences are visible and lets you go looking for ones that haven't been noticed; the recognition is yours, on organization the map keeps anchored to the literature.

---

## §4 — M3: testing candidate unification frameworks against the structure (substrate-enabled)

A candidate-foundational program makes structural claims: which classifications it hosts, which frontiers it targets, which existing structure it reduces to. The map records those claims against its literature-anchored organization; a theorist tests whether the claims are consistent with what the map records. The adjudication is the physicist's; the substrate is the map's.

The worked instance is `su5-gut-program` — an architecture node with `empirical_status: candidate-foundational`. The substrate records exactly one structural commitment for it: a conjectured `specializes` relation embedding the SM rep content into SU(5) representations (the 5̄ + 10 embedding, pinning fifteen matter cells and three gauge cells). The substrate holds the claim; the test is the reader's — and the substrate records that proton-decay non-observation has already falsified minimal non-supersymmetric SU(5), so the test has teeth. `find_hosting`, `find_targeting`, `find_targets_of_program`, and `get_axis_mapping` are the test-against-the-table tools. This is the move that makes the table adjudicative rather than merely descriptive, but the adjudication is performed by the user, not asserted by the project.

*Physicist-facing:* A proposed unification framework commits to specific structural claims — which parts of the existing classification it would absorb, and how. The map records those commitments, so you can check a framework against the organized structure rather than against memory: the SU(5) program, for instance, claims a specific embedding of the Standard Model content, and the map holds that claim alongside the proton-decay result that already rules out its minimal version. The check is yours; the map supplies the organized ground to run it on.

---

## §5 — M4: experimental-program adjudication (substrate-contained)

The map directly holds, as authored edges, what running and near-term experimental programs bear on a given frontier, at what sensitivity, and where competing theoretical programs predict adjudicable values. The worked instance is `strong-cp-problem`, which carries two complementary experimental channels (`find_resolvers`): the axion-haloscope network bounding the axion-photon coupling by direct detection, and next-generation electric-dipole-moment searches bounding the residual strong-CP angle indirectly through the neutron EDM. Both are bounds-setting rather than measurement-discriminating — neither records competing point predictions, because the candidate resolution (Peccei-Quinn) predicts relations rather than a single discriminable value. The two channels probe the same resolution from opposite directions. These edges are authored against the Phase C §4 admissibility test; the move is genuinely useful, but it is downstream of M1–M3: experimental adjudication is the empirical test of structural commitments that the first three moves surface and frame.

*Physicist-facing:* For a given open question, the map records which running and planned experiments bear on it, how deeply each reaches, and — where competing theories predict different values — which experiment would tell them apart. The strong-CP problem, for example, is bounded from two complementary directions at once: a direct search for the axion and an indirect bound on the neutron's electric dipole moment.

---

## §6 — The ordering principle

M1, M2, and M3 are the Mendeleev moves; M4 is downstream. The order sets a reader's expectations, and that is its whole function. A reader who meets M4 first reads the project as an experimental-program reference that happens to organize theory. A reader who meets M1–M3 first reads it as a periodic table of physics that also tracks experimental coverage. The data and the methodology support both readings; the positioning decides which one a fresh reader leaves with. The first three lead.

---

## §7 — Explorer architecture commitment

The configuration builder is the explorer's **central** Mendeleev surface, not a feature that arrives after parallel views and a comparison panel ship. It is the surface that performs the mode-3 M1 move — constructing a multi-face configuration and surfacing the gaps and recurrences that emerge — and so it is load-bearing for the positioning, not optional polish. Parallel classification views and the pairwise comparison panel remain part of the commitment (they serve mode-1 and mode-2), and a derivation-edge audit — surfacing the literature anchoring behind each edge a configuration rests on — is flagged as a requirement, since a gap is only trustworthy if the cells it sits among are themselves anchored. The explorer's first-impression surface should let a reader see at least one constructive prediction (a `conjectured-by-pattern` output once the builder ships, a `forbidden-by-pattern` exclusion today) and at least one cross-classification recurrence without having to ask for them.

---

## §8 — The four binding disciplines

Four disciplines bind this work; they are independent and all must hold.

1. **The firewall** (`META_v21_1_methodology_firewall.md` §2, §8). Authoring decisions are made from physics content independently, never driven by pattern-finding outputs (§2). Configuration-time emergence of patterns and gaps is *not* an authoring decision and is not bound by the firewall (§8). The two together let the substrate surface gaps without forcing patterns into it.
2. **The §4 admissibility test** (Phase C scope memo / v18 spec §4). Binds what enters the predictive layer: values are literature values, per-program predictions are program-internal, sensitivities cite the experimental design.
3. **The corrected literature-anchoring principle** (`MENDELEEV_POSITIONING_HANDOFF.md` §7). Content entering the substrate is literature-anchored; organizational structure is the project's contribution; patterns and gaps emerging at configuration time are substrate outputs, neither invented nor literature-required.
4. **The positioning frame** (this document). Surfaces frame M1/M4 as what the map holds and M2/M3 as what the map enables — never overstating the project's authority, never foreclosing its central move.

§7 and §8 of this document both cross-reference `DRIFT_PATTERN_REGISTER.md`: Entry 1 (substrate outputs vs substrate inputs) for the content distinction that mode-3 M1 and the configuration builder rest on, and Entry 2 (citing docs without reading them) for the process discipline that keeps every surface's claims grounded in the text it cites.

---

## §9 — Closing note

The four moves are descriptive, not aspirational. The substrate holds 22 structural-exclusion cells, the cross-classification edges that make M2 findable, the candidate-program commitments M3 tests, and the resolver edges M4 surfaces — all verifiable by live query against the current data. The one move whose cell-level output stands empty, `conjectured-by-pattern`, stands empty correctly: it is the output of a configuration builder that has not yet shipped, and authoring its entries any other way would violate the firewall. The positioning this document fixes is the claim that the surfaces a fresh reader lands on should make these moves visible before the reader has to derive them — and that the visibility must stay honest about which moves the map holds and which it enables.

*End of MENDELEEV_FRAME.md*
