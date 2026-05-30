# TRACK_4_USE_SIDE_ARTIFACTS.md — queue and rationale for the post-surfacing use-side work

**Purpose of this file.** A standing record of the use-side artifacts that close the discoverability gap between the project's curated dataset and the working physicists who would benefit from it. None of these artifacts are drafted yet — they depend on the final shape of the explorer after Phase B + C surfacing (sub-PRs E1–E8 in `EXPLORER_PHASE_BC_HANDOFF.md` §3) closes. This file's job is to preserve the queue, the seed examples already worked out, and the sequencing logic, so that the work can be resumed without redoing the framing.

Location: `/methodology/TRACK_4_USE_SIDE_ARTIFACTS.md`. Attach to project knowledge so AI sessions see it automatically.

---

## 0. The gap

Three artifacts exist or will exist: the explorer, the MCP, and the methodology corpus. Each has a different discoverability problem.

**The explorer** is the most forgiving. A working physicist can poke around, click tiles, read cells, and within five minutes have a rough mental model of what the dataset *is*. Phase B + C surfacing (sub-PRs E1–E8) closes the gap from "I can see the Phase A structure" to "I can see the predictive layer." It does not teach a physicist what novel questions the dataset answers; it teaches them what is in it.

**The MCP** is the unforgiving surface. A physicist landing cold on the MCP endpoint has nothing to grab — they don't know `find_resolvers` exists, let alone that it's the canonical way to ask "what experimental programs address this frontier." This is the canvas-and-paintbrush case the maintainer flagged: handing a working tool to someone who doesn't yet know what to ask of it.

**The methodology** — the firewall, the §4 admissibility test, the curation discipline — is the deepest and least discoverable. A physicist can use the explorer and the MCP without ever encountering it. But the methodology is what makes the dataset *trustworthy*; without it the project is just another collection of physics opinions.

Track 4 outreach as currently scoped in `TRACKS_AFTER_PHASE_A.md` opens the *contribution* pathway via issue templates + EDITORIAL.md + outreach. That is the right scope for what Track 4 names. It does not close the *use* pathway. The artifacts queued in this document are what closes it.

---

## 1. The four artifacts

Each artifact below has: what it is, what gap it closes, what it depends on, and rough sizing. None should be drafted before the explorer's final shape is known, with the partial exception of the chat entry point in §1.3.

### 1.1 Essay with worked examples

**What.** A short essay, 1500–2500 words, that demonstrates the moves the curated dataset makes possible. Three to five worked examples in physicist prose. Each example: a question that was incoherent or uncited before the dataset existed; the question now; what the dataset says; the citation trail. The reader's takeaway after each example is "ah, *that's* the kind of question this catalogues." The essay also doubles as the answer to "what is this and why should I care" — currently scattered across the methodology docs.

**Gap closed.** A physicist landing on the project for the first time doesn't have a model of what kind of answers it gives. The essay gives them three to five, concretely.

**Depends on.** The explorer's final shape (where do worked examples link to? which surfaces does the reader visit?) and the chat entry point in §1.3 (the essay points the reader at a chat surface for follow-up questions).

**Sizing.** One author-day for a draft. The seed examples are already worked out — see §2.

### 1.2 Query recipes

**STATUS: SHIPPED (2026-05-30) → [`/use/recipes.md`](../use/recipes.md).** The "How to use the map" page now aggregates the distilled-recipe paragraphs from the worked sessions in `/use/sessions/` (leptogenesis, strong-CP), written in the vocabulary discipline. It currently carries three recipes (frontier conditional consequences; resolver coverage measure-vs-bound; reading informative emptiness) and grows as new sessions land. Lives in `/use/`, not the explorer, per the §4 placement decision below.

**What.** A paragraph each, written for working physicists who have never used an MCP server. The pattern: "If you want to know X, the move is Y. Here's a concrete example. Here's where the answer lives." Maybe five to eight recipes. Not API documentation — physicist-pitched query patterns. Lives in a "How to use the map" page in the explorer or the README, written in the vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md`.

**Gap closed.** A physicist who's read the essay and wants to try a question of their own needs scaffolding for what queries are reasonable to attempt. The recipes are that scaffolding.

**Depends on.** Final explorer surfaces (recipes point at them) and finalized vocabulary translations from the supplement.

**Sizing.** Half a day.

### 1.3 Guided chat entry point

**What.** A landing page or button on the explorer that says something like "Ask the map a question" and opens a chat preloaded with project-system-prompt instructions (the vocabulary discipline, the MCP server already attached, a few example questions as starter prompts). The physicist doesn't have to figure out how to set up a Claude project with the MCP attached and the right system prompt — that's already done. They just ask.

**Gap closed.** The MCP is currently usable only by physicists who know how to set up an MCP-enabled chat. This collapses the setup step to zero clicks.

**Depends on.** Less than the other artifacts. The chat entry point is a hosting + prompt-configuration question that's largely orthogonal to the explorer's final shape. If one piece of use-side scaffolding were to land *before* the explorer surfacing closes, this is the candidate. The system prompt's example-question seed list does benefit from the explorer's final surfaces (so the example answers can point the reader at the right places), but the entry point itself can ship earlier.

**Sizing.** Half a day for the prompt configuration; the hosting question (inside the explorer page, via an Anthropic project-link, or elsewhere) depends on a maintainer decision — see §4.

### 1.4 Curated example sessions

**STATUS: SHIPPED — first two of the planned set (2026-05-30).** Two edited worked sessions are in [`/use/sessions/`](../use/sessions/): [`leptogenesis.md`](../use/sessions/leptogenesis.md) (frontier-level Mendeleev prediction move, verified against the live `matter-antimatter-asymmetry` node) and [`strong-cp.md`](../use/sessions/strong-cp.md) (two-channel resolver + the informative-empty `find_discriminating_experiments` result, verified against the live `strong-cp-problem` node). Both follow the recipe → session → "what this demonstrates" → distilled-recipe structure and the vocabulary discipline. The edited-transcript tier was chosen (see §4). More sessions to come; the empty discriminating-experiments result called out below is realized in `strong-cp.md`.

**What.** A handful of transcripts of physicist-style chats, edited into shape and published alongside the explorer. Like the Distill / LessWrong convention of showing worked notebooks. Each session: a physicist-style question, the AI calling the MCP, the AI responding in the vocabulary discipline, the conversation continuing. They do triple duty — teach the moves by demonstration, show the vocabulary discipline working in practice, and calibrate expectations about what the tool does and doesn't do. The empty `find_discriminating_experiments` result from the recent test session would make an excellent published example precisely because it shows the curatorial discipline at work.

**Gap closed.** The essay tells; the sessions show. Different reading modality, different stickiness — a physicist who scans the essay and bounces may still read a transcript that opens with a question they recognize.

**Depends on.** Final vocabulary discipline (already settled in `PHYSICIST_FACING_VOCABULARY.md`), and on having a few worked test sessions to edit (already accumulating in maintainer use).

**Sizing.** A day or two for editing four to six sessions. Sessions themselves are essentially the test sessions the maintainer already runs.

---

## 2. Candidate seed examples

These are the worked examples that have already surfaced in conversation and would be load-bearing in the essay (§1.1) and the recipes (§1.2). Recording them here so they're not re-derived from scratch later.

**Example A — leptogenesis → Davidson-Ibarra → M₁ ≳ 10⁹ GeV.** The matter-antimatter-asymmetry frontier carries `if_real_implies` resolutions. The leptogenesis resolution forces four structural consequences: a new cell (a heavy Majorana neutrino), a new cross-classification relation (seesaw-mechanism derivation), a new axis on the neutrino-sector classification (Dirac vs Majorana character), and a quantitative lower bound on the leptogenesis scale: M₁ ≳ 10⁹ GeV (Davidson-Ibarra 2002). The example demonstrates: structural consequences chain across multiple classifications; quantitative bounds attach to specific implications with named citations; "if real, this is forced" is a structural query the dataset answers and a vanilla LLM cannot.

**Example B — HK / DUNE / JUNO three-channel mass-ordering redundancy.** A natural physicist question — "which experiments adjudicate the neutrino mass ordering?" — returns three programs with three independent physical channels: matter-driven beam (DUNE, ≥5σ at 1285 km), statistical-power atmospheric (HK, ≥3σ across a broad baseline range), vacuum-interference reactor (JUNO, ~3σ at 53 km, Abusleme et al. 2025). The example also demonstrates *informative emptiness*: `find_discriminating_experiments` returns empty for all three pairings because none of these programs predict competing point values — they all measure the same SM-MNS parameter that nature has already fixed. The curators encoded this by leaving the per-program prediction lists empty. The dataset distinguishes "experiments that adjudicate between competing predictions" from "experiments that measure a shared parameter through orthogonal channels"; a vanilla LLM conflates the two.

**Example C — strong-CP-problem two-channel resolver.** The strong-CP-problem frontier carries two resolves edges from independent experimental programs: the axion-haloscope network (probing g_aγγ ≲ 10⁻¹⁵ GeV⁻¹) and next-generation EDM searches (probing residual θ̄_QCD via the Crewther-DiVecchia-Veneziano-Witten relation, n2EDM design floor |d_n| ≲ 10⁻²⁷ e·cm). The two channels target the *same Peccei-Quinn resolution* from complementary directions — direct detection of the axion vs indirect bound on the order parameter the PQ mechanism dynamically relaxes. The example demonstrates: a single frontier can carry multiple independent resolver channels; the dataset records this structure explicitly; and the cross-channel visibility is the kind of synthesis the project is built to make tractable.

**Example D (candidate) — muon g-2 carrier refresh.** The muon-g-2 carrier was refreshed in sub-PR 55 against post-2025 literature (Aliberti et al. 2025 WP25 + Aguillard et al. 2025 final Run-1–6 + Boccaletti et al. 2024 BMW hybrid), moving the carrier's quantitative_scale from 4.2σ to 0.6σ. The example demonstrates: the dataset is not frozen at design-report numbers; the carrier-refresh discipline keeps it current; a vanilla LLM that happens to know the 2025 result could look smarter than a stale snapshot — but the project's curated value is current. This example is more inside-baseball than A–C and may not survive the editor's cut.

A fourth or fifth example slot is open. Candidates include the doubly-orphaned ADE clique (a structural observation rather than a predictive one, showing the dataset records its own incompleteness), or the falsified-prediction structure (three falsified BSM-overreach predictions surfacing a structural fact about which classes of prediction get falsified — proton decay tree-level GUT, H-dibaryon stability, PBH-as-100%-DM in the LIGO mass window).

---

## 3. Sequencing

The dependency runs one direction: the use-side artifacts cannot be drafted authoritatively until the explorer's Phase B + C surfaces are built. What the artifacts demonstrate is the move from "physicist sees a question they care about" to "physicist sees the curated answer in the surface they're looking at." If the surface doesn't exist yet, the artifacts either become hand-wavy ("imagine a panel that would show…") or they secretly design the UI by prose, and the actual explorer sub-PRs then have to either match the prose's claims or quietly contradict them. Both are bad.

So: **explorer Phase B + C surfacing (sub-PRs E1–E8) closes first; use-side artifacts come after**, with the exception of the chat entry point (§1.3), which is mostly orthogonal and can land in parallel if the maintainer chooses. The maintainer's sequencing call goes in §4.

### 3.1 The "use-aware sub-PR description" working norm

While explorer sub-PRs are being built, the implementing chat should record — in the sub-PR description or a working scratchpad — what physicist-facing question each new surface answers, in physics prose. Not as a UI requirement; as a record. When the use-side essay gets drafted later, those scratchpad answers become the raw material. The essay isn't being written prematurely; the demonstrations are being noticed and saved while the surface decisions are fresh.

Concretely: every sub-PR E1–E8 description should include a short "physics demonstration" section — three sentences — saying:

> *A physicist who lands on this surface can now answer the question: X.*
> *A worked example reads: Y.*
> *In the vocabulary discipline from `PHYSICIST_FACING_VOCABULARY.md`, the demonstration sentence is: Z.*

That's the bridge between the surfacing work and the eventual essay. Cheap to add at sub-PR time; expensive to reconstruct later.

---

## 4. Open questions for maintainer decision

**RESOLVED (2026-05-30) — recorded here, originals retained below for rationale.**

- **Where the essay lives:** `/use/essay.md`. No separate landing site. `/use/` is the canonical home for all use-side material, indexed by `/use/README.md`.
- **Essay + recipes publish together** (synchronized; cleanest message).
- **Example-session curation tier:** edited transcripts (the middle tier) — applied to `leptogenesis.md` and `strong-cp.md`.
- **Pending stowaway (non-blocking):** the explorer header needs a tiny one-line HTML edit adding a link to the essay/recipes once they publish together. Carry it as a stowaway on any explorer sub-PR; it does not block the use-side work.

The original open questions, retained for the rationale behind these calls:

These aren't for this document to settle — they need a maintainer call when the use-side artifacts become active.

**Where does the essay live?** README, dedicated page in the explorer, blog post, separate landing site, all of the above. Each placement implies a different audience and a different default length. The README serves the GitHub visitor; an in-explorer page serves the physicist who's already on the surface; a blog post serves the channel where the project promotes itself externally.

**When does the chat entry point launch?** Before the essay (early surface for early adopters; risks looking thin without the essay's framing); with the essay (synchronized launch; cleanest message); after the essay (essay drives traffic to entry point; risks momentum loss between them).

**How curated do the example sessions need to be?** Raw transcripts (cheap, less polished); edited transcripts (medium effort, much more readable); transcripts with maintainer commentary annotations (highest effort, highest demonstration value). Probably worth one example session at each level to test reader response.

**Does the project want a dedicated landing site?** The explorer URL is on GitHub Pages; an essay + recipes + chat entry point on the same surface keeps everything in one place. A separate landing site gives more presentation control but adds maintenance surface.

---

## 5. How this document is maintained

Same discipline as the other handoffs:

1. **When explorer Phase B + C surfacing closes** (sub-PRs E1–E5 ship per `EXPLORER_PHASE_BC_HANDOFF.md` §3), this document's "depends on the explorer" caveats can be removed and the artifacts in §1 become actionable.
2. **As each use-side artifact ships**, its row in §1 closes — replaced with a short note about where the shipped artifact lives.
3. **New use-side artifact ideas that surface during the work** get added to §1 with the same shape (what / gap / depends / sizing). The four artifacts above are the current best understanding of what closes the gap; they're not exclusive.
4. **The seed examples in §2 grow as new ones surface in test sessions or maintainer use.** The four current candidates are the load-bearing minimum; the essay may use more.

---

*End of TRACK_4_USE_SIDE_ARTIFACTS.md, drafted 2026-05-26 as a standing record of the use-side artifact queue. Triggered by the realization that the project's discoverability gap — physicists landing cold on the explorer or MCP not knowing what to ask — is not closed by Phase B + C explorer surfacing alone, and that the artifacts that would close it depend on the explorer's final shape and so cannot be drafted until surfacing lands. This document preserves the queue, the seed examples, and the sequencing logic across the intervening sub-PRs so the work can be resumed cleanly when surfacing closes.*
