# Worked example sessions

This file indexes transcripts of physicist-style chats captured through the project's live chat entry point at [`/explorer/ask-the-map.html`](https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/ask-the-map.html), edited for publication. Each session demonstrates the moves the catalogue's curated dataset records — experimental coverage of open frontiers, cross-classification anchors, conditional structural consequences, discriminating-experiment adjudication, scale ranking, falsified-predictions structure — and the vocabulary discipline from [`PHYSICIST_FACING_VOCABULARY.md`](./PHYSICIST_FACING_VOCABULARY.md) working in practice. They are the demonstration register of the Track 4 use-side artifacts (per [`TRACK_4_USE_SIDE_ARTIFACTS.md`](./TRACK_4_USE_SIDE_ARTIFACTS.md) §1.4): the [essay](./USE_THE_MAP_ESSAY.md) tells, the [recipes](./QUERY_RECIPES.md) diagram the patterns, the sessions show.

Three editorial registers are planned for the session corpus:

- **Raw transcripts** — minimal cleanup, captured-as-spoken, kept to anchor the other registers and show what the AI side of the entry point actually produces unedited.
- **Edited transcripts** — light cleanup of false starts and conversational scaffolding; the vocabulary discipline tightened in place where the original leaked schema names; physics, citations, and deep links preserved verbatim.
- **Edited transcripts with maintainer commentary** — sidebar callouts explaining what the move is, what the dataset is doing, why the discipline holds; highest demonstration value.

The first batch ships two sessions at the edited register. Raw and annotated registers are queued for later batches as additional raw material is captured.

## Sessions

### [2026-05-26 — The vocabulary discipline: an origin transcript](./2026-05-26-vocabulary-discipline-origin.md)

**Opening question:** *How would the project demonstrate that the curated tool does something a vanilla LLM cannot?*

**Editorial register:** edited. Exceptional entry in the corpus — not captured through the entry point (predates it), and not a demonstration of the moves but the meta-conversation that produced three of the project's methodology documents.

Five turns covering: the test-design exercise and the state-verification catch that surfaced the *handoff-documents-are-orientation-not-ground-truth* principle (the worker-data-lag warning in [`PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`](./PREDICTIVE_LAYER_PHASE_C_HANDOFF.md) §1 had become stale; a live `server_info` call retired the avoidance instruction); the find_discriminating_experiments empty-result demonstration of informative emptiness as curatorial value, with the vanilla-LLM-contrast vs. the catalogue's three-channel orthogonality on neutrino mass-ordering (HK statistical-power atmospheric, DUNE matter-driven beam, JUNO vacuum-interference reactor); the schema-name leak critique that produced [`PHYSICIST_FACING_VOCABULARY.md`](./PHYSICIST_FACING_VOCABULARY.md), with the canonical bad/good rewrite pair (now Example A in §5 of the supplement) recorded verbatim; the discoverability gap that produced [`TRACK_4_USE_SIDE_ARTIFACTS.md`](./TRACK_4_USE_SIDE_ARTIFACTS.md), with the four use-side artifacts queued and the sequencing logic that defers them until the explorer's final shape is known; the recursive closing-prompt pattern now codified as [`PROJECT_NEXT_STEPS.md`](./PROJECT_NEXT_STEPS.md) §6 #4 — every session that closes a sub-PR produces the closing prompt for the next, with explicit *new-in-the-previous-session* markers on load-bearing recent docs. Companion to the [cc-frontier two-resolver walk](./2026-05-27-cc-frontier-two-resolver-walk.md) of the day after: this transcript shows where the disciplines came from; the cc-frontier walk shows them working.

### [2026-05-27 — The cosmological-constant frontier: a two-resolver walk](./2026-05-27-cc-frontier-two-resolver-walk.md)

**Opening question:** *Which experimental programs target the cosmological-constant problem, and through which physical channels?*

**Editorial register:** edited.

Five turns covering the two-resolver landscape of `cc-frontier` (DESI's BAO standard-ruler probe with its 5σ discovery-floor sensitivity encoding, and Rubin/LSST's 3×2pt probe-sum with its dimensionless percent-level precision and three populated competing predictions from ΛCDM / quintessence / modified gravity); the frontier's single recorded conditional-consequences branch (string-landscape anthropic selection per Weinberg–Susskind–Bousso–Polchinski, with the chained presupposition through `qg-frontier`'s string-landscape branch and the forced Λ-distribution axis on the string-theory-vacua classification); the methodological distinction between BAO and 3×2pt as scientific probes — background vs growth, spectroscopic vs photometric, ΛCDM-tension-lineage divergence between the DESI evolving-DE anomaly and the Rubin S_8 lineage; an explorer-rendering description with an inline structural-view diagram of the frontier and its empirical / theoretical resolution lanes; and a cross-frontier pattern survey identifying `strong-cp-problem` as the only other open frontier with the same two-distinct-program structure, `hierarchy-problem` as a third structural pattern (single program / three channels), and the seven empty-resolver open frontiers explained structurally.

Companion file: [`cc-frontier-diagram.svg`](./cc-frontier-diagram.svg) (the structural-view diagram embedded in turn 4).

---

*Index maintained per the discipline in [`TRACK_4_USE_SIDE_ARTIFACTS.md`](./TRACK_4_USE_SIDE_ARTIFACTS.md) §5. New sessions are added at the top of the Sessions list in reverse-chronological order; each entry carries the opening question, the editorial register, and a one-paragraph summary of the moves demonstrated.*
