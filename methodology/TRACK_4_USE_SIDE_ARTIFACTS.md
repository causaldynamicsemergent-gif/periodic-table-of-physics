# TRACK_4_USE_SIDE_ARTIFACTS.md — queue and rationale for the post-surfacing use-side work

**Purpose of this file.** A standing record of the use-side artifacts that close the discoverability gap between the project's curated dataset and the working physicists who would benefit from it. Two of the four artifacts have now shipped (essay 2026-05-27 at `/methodology/USE_THE_MAP_ESSAY.md`; query recipes 2026-05-27 at `/methodology/QUERY_RECIPES.md`); the remaining two (guided chat entry point §1.3 and curated example sessions §1.4) become eligible now that explorer Phase B + C surfacing has closed and the artifacts can point at real explorer surfaces. This file's job is to preserve the queue, the seed examples already worked out, and the sequencing logic, so that the remaining work can be resumed without redoing the framing.

Location: `/methodology/TRACK_4_USE_SIDE_ARTIFACTS.md`. Attach to project knowledge so AI sessions see it automatically.

---

## 0. The gap

Three artifacts exist or will exist: the explorer, the MCP, and the methodology corpus. Each has a different discoverability problem.

**The explorer** is the most forgiving. A working physicist can poke around, click tiles, read cells, and within five minutes have a rough mental model of what the dataset *is*. Phase B + C surfacing (sub-PRs E1–E8) closes the gap from "I can see the Phase A structure" to "I can see the predictive layer." Sub-PRs E1–E5 shipped 2026-05-27, closing the content-surfacing pass; the explorer now teaches a physicist what is in the dataset. It does not teach them what novel questions the dataset answers.

**The MCP** is the unforgiving surface. A physicist landing cold on the MCP endpoint has nothing to grab — they don't know `find_resolvers` exists, let alone that it's the canonical way to ask "what experimental programs address this frontier." This is the canvas-and-paintbrush case the maintainer flagged: handing a working tool to someone who doesn't yet know what to ask of it.

**The methodology** — the firewall, the §4 admissibility test, the curation discipline — is the deepest and least discoverable. A physicist can use the explorer and the MCP without ever encountering it. But the methodology is what makes the dataset *trustworthy*; without it the project is just another collection of physics opinions.

Track 4 outreach as currently scoped in `TRACKS_AFTER_PHASE_A.md` opens the *contribution* pathway via issue templates + EDITORIAL.md + outreach. That is the right scope for what Track 4 names. It does not close the *use* pathway. The artifacts queued in this document are what closes it.

---

## 1. The four artifacts

Each artifact below has: what it is, what gap it closes, what it depends on, and rough sizing. Two have shipped; two remain.

### 1.1 Essay with worked examples — SHIPPED 2026-05-27

**What.** A short essay, 1500–2500 words, that demonstrates the moves the curated dataset makes possible. Three to five worked examples in physicist prose. Each example: a question that was incoherent or uncited before the dataset existed; the question now; what the dataset says; the citation trail. The reader's takeaway after each example is "ah, *that's* the kind of question this catalogues." The essay also doubles as the answer to "what is this and why should I care" — currently scattered across the methodology docs.

**Gap closed.** A physicist landing on the project for the first time doesn't have a model of what kind of answers it gives. The essay gives them five, concretely.

**Shipped 2026-05-27** at `/methodology/USE_THE_MAP_ESSAY.md`. Five worked examples: the three-channel mass-ordering resolver landscape (with the informative-empty discriminating result as a closing observation); the two-channel strong-CP-problem resolver (axion-haloscope + EDM); the dual-frontier EDM program (neutron-EDM channel on strong-CP, electron-EDM channel on matter-antimatter asymmetry); the eV-sterile cross-classification anchor between dark-matter candidates and neutrino-sector phenomenology, with the keV-sterile cross-observable case noted as a parallel structure; the leptogenesis → Davidson–Ibarra → M₁ ≳ 10⁹ GeV conditional-consequences chain. 89 lines, 16.6 KB, drafted against canonical data v95.

### 1.2 Query recipes — SHIPPED 2026-05-27

**What.** A paragraph each, written for working physicists who have never used an MCP server. The pattern: "If you want to know X, the move is Y. Here's a concrete example. Here's where the answer lives." Maybe five to eight recipes. Not API documentation — physicist-pitched query patterns. Lives in a "How to use the map" page in the explorer or the README, written in the vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md`.

**Gap closed.** A physicist who's read the essay and wants to try a question of their own needs scaffolding for what queries are reasonable to attempt. The recipes are that scaffolding.

**Shipped 2026-05-27** at `/methodology/QUERY_RECIPES.md`. Six recipes covering qualitatively different cross-cutting moves: (1) the experimental-coverage lookup with DESI + Rubin-LSST on the cosmological-constant frontier; (2) the cross-classification anchor lookup with the 7.1 keV sterile neutrino in two classifications related by two-body-decay kinematics; (3) the conditional-consequences lookup with dark-matter's three competing resolutions (axion / PBH / MOND) each forcing distinct structural commitments; (4) the discriminating-experiments lookup with muon g-2 and the Theory Initiative vs BMW lattice predictions; (5) the scale-ranking lookup with energy-scale entries on open frontiers spanning six orders of magnitude (TeV naturalness ceiling → Planck scale); (6) the falsified-predictions catalog surfacing the structural observation that every falsified entry is a beyond-Standard-Model or near-BSM overreach. Each recipe paragraph passes the `PHYSICIST_FACING_VOCABULARY.md` §8 self-check; tool names appear only in the closing coda sentences. 93 lines, 22.1 KB. Future extraction into the explorer's About panel is a follow-up sub-PR (the natural successor to E8 explorer banner refresh).

### 1.3 Guided chat entry point — PENDING

**What.** A landing page or button on the explorer that says something like "Ask the map a question" and opens a chat preloaded with project-system-prompt instructions (the vocabulary discipline, the MCP server already attached, a few example questions as starter prompts). The physicist doesn't have to figure out how to set up a Claude project with the MCP attached and the right system prompt — that's already done. They just ask.

**Gap closed.** The MCP is currently usable only by physicists who know how to set up an MCP-enabled chat. This collapses the setup step to zero clicks.

**Depends on.** Less than the other artifacts. The chat entry point is a hosting + prompt-configuration question that's largely orthogonal to the explorer's final shape. The system prompt's example-question seed list benefits from the explorer's now-final surfaces (so the example answers can point the reader at the right places, using the deep-link patterns from the seventeen-file E5 build); the recipes in §1.2 provide a ready-made starter set of natural-language questions whose canonical answers the chat should reproduce.

**Sizing.** Half a day for the prompt configuration; the hosting question (inside the explorer page, via an Anthropic project-link, or elsewhere) depends on a maintainer decision — see §4.

### 1.4 Curated example sessions — PENDING

**What.** A handful of transcripts of physicist-style chats, edited into shape and published alongside the explorer. Like the Distill / LessWrong convention of showing worked notebooks. Each session: a physicist-style question, the AI calling the MCP, the AI responding in the vocabulary discipline, the conversation continuing. They do triple duty — teach the moves by demonstration, show the vocabulary discipline working in practice, and calibrate expectations about what the tool does and doesn't do. The empty `find_discriminating_experiments` result from the recent test session would make an excellent published example precisely because it shows the curatorial discipline at work.

**Gap closed.** The essay tells; the recipes diagram the patterns; the sessions show. Different reading modality, different stickiness — a physicist who scans the essay and bounces may still read a transcript that opens with a question they recognize.

**Depends on.** Final vocabulary discipline (already settled in `PHYSICIST_FACING_VOCABULARY.md`), final explorer surfaces (now closed at the seventeen-file E5 build), and a few worked test sessions to edit (accumulating in maintainer use; the test session that surfaced the original five vocabulary leaks is the canonical first transcript candidate).

**Sizing.** A day or two for editing four to six sessions. Sessions themselves are essentially the test sessions the maintainer already runs.

---

## 2. Candidate seed examples

These are the worked examples that have surfaced in conversation and authoring across the use-side artifacts. The first four were captured pre-essay-draft; the next group surfaced during essay and recipes authoring. Recorded here so future artifacts (curated example sessions, README excerpts, outreach material) don't re-derive them from scratch.

**Example A — leptogenesis → Davidson-Ibarra → M₁ ≳ 10⁹ GeV.** The matter-antimatter-asymmetry frontier carries `if_real_implies` resolutions. The leptogenesis resolution forces four structural consequences: a new cell (a heavy Majorana neutrino), a new cross-classification relation (seesaw-mechanism derivation), a new axis on the neutrino-sector classification (Dirac vs Majorana character), and a quantitative lower bound on the leptogenesis scale: M₁ ≳ 10⁹ GeV (Davidson-Ibarra 2002). The example demonstrates: structural consequences chain across multiple classifications; quantitative bounds attach to specific implications with named citations; "if real, this is forced" is a structural query the dataset answers and a vanilla LLM cannot. **Used in essay §5.**

**Example B — HK / DUNE / JUNO three-channel mass-ordering redundancy.** A natural physicist question — "which experiments adjudicate the neutrino mass ordering?" — returns three programs with three independent physical channels: matter-driven beam (DUNE, ≥5σ at 1285 km), statistical-power atmospheric (HK, ≥3σ across a broad baseline range), vacuum-interference reactor (JUNO, ~3σ at 53 km, Abusleme et al. 2025). The example also demonstrates *informative emptiness*: `find_discriminating_experiments` returns empty for all three pairings because none of these programs predict competing point values — they all measure the same SM-MNS parameter that nature has already fixed. The curators encoded this by leaving the per-program prediction lists empty. The dataset distinguishes "experiments that adjudicate between competing predictions" from "experiments that measure a shared parameter through orthogonal channels"; a vanilla LLM conflates the two. **Used in essay §1.**

**Example C — strong-CP-problem two-channel resolver.** The strong-CP-problem frontier carries two resolves edges from independent experimental programs: the axion-haloscope network (probing g_aγγ ≲ 10⁻¹⁵ GeV⁻¹) and next-generation EDM searches (probing residual θ̄_QCD via the Crewther-DiVecchia-Veneziano-Witten relation, n2EDM design floor |d_n| ≲ 10⁻²⁷ e·cm). The two channels target the *same Peccei-Quinn resolution* from complementary directions — direct detection of the axion vs indirect bound on the order parameter the PQ mechanism dynamically relaxes. The example demonstrates: a single frontier can carry multiple independent resolver channels; the dataset records this structure explicitly; and the cross-channel visibility is the kind of synthesis the project is built to make tractable. **Used in essay §2.**

**Example D — muon g-2 carrier refresh.** The muon-g-2 carrier was refreshed in sub-PR 55 against post-2025 literature (Aliberti et al. 2025 WP25 + Aguillard et al. 2025 final Run-1–6 + Boccaletti et al. 2024 BMW hybrid), moving the carrier's quantitative_scale from 4.2σ to 0.6σ. The example demonstrates: the dataset is not frozen at design-report numbers; the carrier-refresh discipline keeps it current; a vanilla LLM that happens to know the 2025 result could look smarter than a stale snapshot — but the project's curated value is current. Inside-baseball relative to A–C; not used in the essay; flagged as a candidate for example sessions (§1.4) where the carrier-refresh process can be shown as a working transcript.

**Example E — dual-frontier EDM program.** The EDM program node is the dataset's only dual-frontier experimental program: the neutron-EDM channel attacks the strong-CP problem via the Crewther–DiVecchia–Veneziano–Witten relation translating |d_n| upper bounds into θ̄_QCD bounds; the electron-EDM channel attacks the matter-antimatter asymmetry via Sakharov-criterion BSM CP-phases translating |d_e| upper bounds into baryogenesis constraints. Two channels, two fermion species, two theoretical translations three orders of magnitude apart in sensitivity floor (10⁻²⁷ e·cm vs 10⁻³⁰ e·cm). The pattern is emergent in the dataset rather than postulated by it — surfaced by authoring resolves edges one program at a time and noticing afterward that EDM was the only program class whose resolver entries appeared under more than one frontier. **Used in essay §3.**

**Example F — eV-scale sterile cross-classification anchor.** The eV-scale sterile neutrino classifies in dark-matter candidates and in neutrino-sector phenomenology at once. The cross-classification edge formalizes a *derives-from* relation: under the sterile-neutrino-as-DM hypothesis, the dark-matter structure reads off the neutrino-sector flavor framework. The cross-classification carries paired status-transitivity: the LSND-specific 3+1 interpretation's falsified status (by IceCube + MicroBooNE) carries automatically to the DM-classification side, while the BEST-gallium remaining-tension region remains open on both sides. Anchor mass m_s ≈ 1.0 ± 0.5 eV shared across both sides with ≥4 common literature citations. **Used in essay §4.**

**Example G — keV-scale sterile cross-observable anchor.** Parallel one mass scale up to example F: the 7.1 keV sterile neutrino appears in dark-matter candidates with the particle-mass anchor and in neutrino-sector phenomenology with the complementary observational-signature anchor (the 3.55 keV X-ray emission line). The two anchors are related by two-body decay kinematics E_γ = m_s/2 on the same Bulbul et al. 2014 observation. **Used in essay §4 (mentioned) and recipes §2 (worked in detail).**

**Example H — cosmological-constant frontier two-resolver landscape.** The dark-energy equation-of-state w(z) deviation from ΛCDM w ≡ −1 carries two resolvers: DESI's BAO+CMB+SN combined 5σ design floor and Rubin-LSST's 3×2pt σ(w_0) ≈ 0.01 precision. The two are structurally different — DESI is bounds-setting with no per-program competing predictions admissible; Rubin is discriminating between ΛCDM, quintessence, and modified-gravity classes via three populated per-program prediction entries. Same frontier, two distinct sensitivity-encoding kinds (sigma-deviation discovery floor vs dimensionless precision), two distinct exclusion-flavor categories. The example demonstrates that two resolvers on one frontier can do structurally different work. **Used in recipes §1.**

**Example I — dark-matter three-resolution conditional landscape.** The dark-matter frontier carries three documented competing resolutions: QCD-axion-as-DM (forcing a derives-from edge to sm-rep-content extended by U(1)_PQ + the misalignment-mechanism f_a window 10¹¹·⁵±⁰·⁵ GeV); PBH-as-DM (forcing a derives-from edge to compact-astrophysical-objects in the asteroid-mass window 10⁻¹⁴·⁵±²·⁵ M_⊙); MOND-as-DM-alternative (forcing a specializes edge to modified-gravity-alternatives, under a strong reading effectively excluding the particle-DM classification). Three competing answers to one open question, each forcing different structural commitments — the dataset records what each would mean for the rest of the catalogue. **Used in recipes §3.**

**Example J — energy-scale rank across open frontiers.** Ranked by energy-scale value, the dataset's open-frontier quantitative entries span six orders of magnitude: 1 TeV (naturalness ceilings on SUSY and composite-Higgs resolutions of the hierarchy problem) → 10⁹ GeV (Davidson–Ibarra leptogenesis lower bound) → 10¹⁰±² GeV (Peccei–Quinn-breaking scale window for strong-CP) → 10¹¹·⁵±⁰·⁵ GeV (Peccei–Quinn window for axion-as-DM relic) → 10¹⁹ GeV (Planck scale at the quantum-gravity frontier). The rank is a top-down view of "where new physics could live" gathered in one frame from sources not normally read together. **Used in recipes §5.**

**Example K — falsified predictions as BSM-overreach landscape.** The dataset's 17 falsified predictions, read as a list, surface the structural observation that every falsified entry is a beyond-Standard-Model or near-BSM overreach — settled-physics predictions definitionally don't get falsified. Canonical entries: minimal SU(5) tree-level proton decay; Heidelberg-Moscow 0νββ claim; LSND 3+1 sterile interpretation; DAMA/LIBRA WIMP interpretation; EDGES 21-cm cosmic-dawn; the 2018 quantized-Majorana-conductance claim (formally retracted); pure-MOND-at-cluster-scales (Bullet Cluster); TeVeS via GW170817 graviton-speed bound; DGP self-accelerating branch. **Used in recipes §6.**

---

## 3. Sequencing

The original dependency — use-side artifacts blocked on explorer surfacing closure — was discharged 2026-05-27 when sub-PR E5 closed and the explorer Phase B + C surfacing pass completed. The artifacts that depended on real explorer surfaces could then point at them. The essay and recipes shipped the same day; the chat entry point and example sessions remain pending but are no longer blocked.

What the original sequencing constraint guarded against (the artifacts becoming hand-wavy "imagine a panel that would show…" prose, or secretly designing the UI by prose) was avoided: both shipped artifacts cite specific deep-link patterns from the live seventeen-file E5 build (`#/fc/<fc-id>/<cell-id>` for cell views, `#/discourse/<node-id>` for frontiers / candidate-foundational programs / experimental-program cards, `#/edge/<edge-id>` for cross-classification edges) and the linked targets are the real surfaces.

The remaining sequencing is among the two pending artifacts. The chat entry point (§1.3) and example sessions (§1.4) can land in either order; the chat entry point is the more orthogonal of the two and would let the example sessions, when they land, be transcripts captured *through* the live entry point rather than synthetic.

---

## 4. Open questions for maintainer decision

These aren't for this document to settle — they need a maintainer call when each pending artifact becomes active. The §1.1 and §1.2 decisions have been settled (both landed in `/methodology/`).

**Where does the chat entry point live?** Three candidates: (a) an Anthropic project-link the explorer button opens; (b) a custom landing page on GitHub Pages that hosts the chat interface; (c) a static page that explains how to set up the chat manually for users who prefer running it locally. Each placement implies different maintenance surface; (a) is lowest-effort if the Anthropic project-link infrastructure supports the use case.

**How curated do the example sessions need to be?** Raw transcripts (cheap, less polished); edited transcripts (medium effort, much more readable); transcripts with maintainer commentary annotations (highest effort, highest demonstration value). Probably worth one example session at each level to test reader response.

**Does the project want a dedicated landing site?** The explorer URL is on GitHub Pages; an essay + recipes + chat entry point on the same surface keeps everything in one place. A separate landing site gives more presentation control but adds maintenance surface.

**Does the recipes document need extraction into the explorer About panel?** The recipes ship as `/methodology/QUERY_RECIPES.md`; extracting a condensed subset into the explorer's About panel is a natural follow-up sub-PR (the successor to E8). Out of Track 4 scope; queued for after the chat entry point.

---

## 5. How this document is maintained

Same discipline as the other handoffs:

1. **When explorer Phase B + C surfacing closed** (sub-PR E5 shipped 2026-05-27 per `EXPLORER_PHASE_BC_HANDOFF.md` §3), the "depends on the explorer" caveats were removed and the use-side artifacts became actionable. Essay and recipes shipped the same day.
2. **As each use-side artifact ships**, its row in §1 closes — replaced with a SHIPPED header and a short note about where the shipped artifact lives, the date, the size, and the design decisions taken (see §1.1 and §1.2 for the precedent shape).
3. **New use-side artifact ideas that surface during the work** get added to §1 with the same shape (what / gap / depends / sizing). The four artifacts above are the current best understanding of what closes the gap; they're not exclusive.
4. **The seed examples in §2 grow as new ones surface** in test sessions, authoring work, or maintainer use. The eleven current examples (A–K) span pre-essay-draft material and the new examples surfaced during essay + recipes authoring; each is tagged with where it's been used.

---

*End of TRACK_4_USE_SIDE_ARTIFACTS.md. Drafted 2026-05-26 as a standing record of the use-side artifact queue; amended 2026-05-27 with E5 explorer surfacing closure dissolving the sequencing constraint; amended 2026-05-27 with §1.1 essay shipped at `/methodology/USE_THE_MAP_ESSAY.md`, the §2 seed-example list grown with examples E–G (used in essay); amended 2026-05-27 with §1.2 query recipes shipped at `/methodology/QUERY_RECIPES.md`, the §2 seed-example list grown further with examples H–K (used in recipes), §3 sequencing rewritten now that the dependency has discharged, and §4 maintainer-decision list trimmed to the two pending artifacts.*
