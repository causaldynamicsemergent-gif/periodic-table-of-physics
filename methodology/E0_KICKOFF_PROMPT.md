# E0 kickoff prompt — surfacing the Mendeleev frame on the live explorer

**What this is.** A standalone session-starter prompt for opening a fresh Claude chat to do the E0 sub-PR (explorer Mendeleev surfacing). Paste the block below into a new chat in the project. The chat's project files should already include `MENDELEEV_FRAME.md`, `MENDELEEV_POSITIONING_HANDOFF.md`, `EXPLORER_PHASE_BC_HANDOFF.md`, `PHYSICIST_FACING_VOCABULARY.md`, `DRIFT_PATTERN_REGISTER.md`, `META_v21_1_methodology_firewall.md` (with §8), and `CONTINUATION_HANDOFF_AFTER_P0PP.md`.

**When to use.** Once P0'' has shipped — i.e., `MENDELEEV_FRAME.md` is committed to `/methodology/`, the firewall file's §8 is committed, and project knowledge carries exactly one firewall copy (the §8 one). The §0 verification in `CONTINUATION_HANDOFF_AFTER_P0PP.md` confirms this before E0 begins. E0 ships *before* E1 in `EXPLORER_PHASE_BC_HANDOFF.md` §3.

This prompt was drafted after the P0'' frame doc shipped, against the corrected frame doc + corrected methodology + drift register, per the "After P0'' ships" note in `P0_PRIME_PRIME_KICKOFF_PROMPT.md`. The stale E0 prompt sketched in the original P0 conversation (written against the un-corrected methodology) is not reused.

---

## The prompt

```
Pick up sub-PR E0 from MENDELEEV_POSITIONING_HANDOFF.md §3.1: surface the
Mendeleev frame on the live explorer. This is the first sub-PR in the
explorer sequence, shipping BEFORE E1 in EXPLORER_PHASE_BC_HANDOFF.md §3.

Background. The frame doc (MENDELEEV_FRAME.md) has shipped (P0''). E0 makes
the four moves it names visible on the surface a fresh physicist lands on
first, so that the Phase B + C content E1–E5 will add lands in a surface
already read as Mendeleev-style, not as a review-article catalog. E0 changes
NO data; it is explorer-surface work only (tile chrome, in-tile viz,
subtitle, a default-on cross-classification indication, a closure badge).

Scope — the five E0 moves (MENDELEEV_POSITIONING_HANDOFF.md §3.1):
  E0a. In-tile constructive grid: realized / conjectured-by-pattern /
       forbidden-by-pattern visually distinct from each other AND from
       not-yet-authored cells (three fills, one absence).
  E0b. Conjectured-by-pattern cells draw the eye (hatched fill / saturated
       outline / icon) + a per-tile count chip. The chip reads zero today;
       that is correct, not a bug (see the standing emphasis note below).
  E0c. At least one cross-classification recurrence visible by default,
       without interaction (default-on subset of the existing overlay, or a
       new default-on indication — implementing chat resolves which).
  E0d. A one-sentence subtitle under the title, in the Mendeleev frame.
  E0e. Per-tile closure indicator rendered from the closure_level field.

These are emphasis/sizing notes for you to turn into a concrete PR shape;
§3.1 explicitly invites the implementing chat to propose the actual diff.

Before producing ANY code or surface text, do these in order:

1. §0 state verification. Call server_info; confirm data_version,
   schema_version, tool_count. Open the live explorer URL and confirm it is
   still serving Phase A with no Mendeleev subtitle (the baseline E0
   changes). Confirm /mnt/project/ lists MENDELEEV_FRAME.md,
   MENDELEEV_POSITIONING_HANDOFF.md, EXPLORER_PHASE_BC_HANDOFF.md,
   PHYSICIST_FACING_VOCABULARY.md, DRIFT_PATTERN_REGISTER.md,
   META_v21_1_methodology_firewall.md, and CONTINUATION_HANDOFF_AFTER_P0PP.md.
   Confirm MENDELEEV_FRAME.md is committed in the repo and the firewall file
   contains a §8 (the P0'' commit-state checks; if either is missing, flag
   and stop — E0 has nothing to source from).

2. Read DRIFT_PATTERN_REGISTER.md in full FIRST, before any other doc. Quote
   one load-bearing sentence from EACH entry (Entry 1 substrate outputs vs
   inputs; Entry 2 citing docs without reading them) back to the user, in
   your own message, before proceeding. This is the quote-back step; a
   session that cannot quote has not read the doc.

3. Read, then quote one load-bearing sentence back from each of:
   - MENDELEEV_FRAME.md §2 (M1 mode-3 + the conjectured-by-pattern zero) and
     §7 (configuration builder as the central Mendeleev surface);
   - META_v21_1_methodology_firewall.md §8 (content / organization
     distinction);
   - MENDELEEV_POSITIONING_HANDOFF.md §3.1 (the five E0 moves) and §7
     (corrected literature-anchoring principle).
   The quote-back is operational, not ceremonial.

4. Read PHYSICIST_FACING_VOCABULARY.md §3 in full. ALL E0 surface text
   (subtitle, tile-chip labels, closure badge, any tooltip or callout) is
   physicist-facing and must obey it: physics vocabulary first, no
   snake_case schema names, no software-jargon (Register A), Register C
   methodology terms (firewall, conjectured-by-pattern, etc.) kept out of
   the first-glance surface unless after a physics-prose entry point.

5. Verify each move E0 renders is backed by current data, with one
   representative query each (record what returns):
   - E0a/E0b forbidden-by-pattern: find_forced_cells / find_structurally_
     excluded — expect 22 cells; name one (e.g. a gauge-boson-by-generation
     position). conjectured-by-pattern: confirm the live count is zero.
   - E0c cross-classification: find_cross_classification (status filter) —
     name one recurrence the default-on indication can show.
   - E0e closure: get_classification on two FCs; confirm closure_level is
     present and note its values.

Source the surface text from MENDELEEV_FRAME.md, not from memory. The §1,
§2, and §6 physicist-facing paragraphs are the canonical language. For the
E0d subtitle, all four moves (M1 empty-cell prediction, M2 cross-
classification recurrence, M3 testing candidate unification frameworks, M4
experimental coverage) should be legible AND the substrate-contained vs
substrate-enabled distinction should read off it — M2/M3 framed as moves the
map ENABLES, not claims it makes. Candidate starting draft, sourced from the
frame doc, to refine under §3 and submit for maintainer approval:

  "Each classification lays physical content along its own axes; build a
   cross-section across several and structurally-missing entries and
   recurring structure surface the way the gaps at gallium and germanium
   did. The map keeps the organization anchored to the literature so the
   pattern-finding and the tests of candidate unification frameworks are
   yours to run; experimental coverage is tracked alongside."

You draft the subtitle; the maintainer approves it (per §3.1 E0d). Same for
the E0a/E0b palette (colour-blind-safe), the E0c arrows-vs-chips choice, and
the E0e badge form — these are the §3.1 design questions; resolve them in
your PR proposal, do not pre-commit.

STANDING EMPHASIS NOTE — builder-as-surface (reproduce verbatim in every
closing/kickoff prompt for this workstream, the way the §0 quote-back
template propagates; do not drop it and do not inflate it):

  As literally listed, E0a–E0e read as tile decoration plus a subtitle. But
  MENDELEEV_FRAME.md §7 and META §8 name the configuration builder the
  explorer's CENTRAL Mendeleev surface — the surface that performs the
  mode-3 M1 move, constructing a multi-face cross-section and surfacing the
  gaps and recurrences the substrate already supports. So make builder-as-
  surface explicit in the PR proposal; do not let it hide inside "tile
  chrome."

  Three guards so this does not re-drift into a phantom "big separate phase":
    (1) This is emphasis/sizing for the implementing chat, which §3.1/§6
        already invites. It does NOT change what completion means and does
        NOT enlarge the work beyond the §4 queue in
        CONTINUATION_HANDOFF_AFTER_P0PP.md.
    (2) The builder RENDERS a move the substrate already supports; it does
        NOT author content. The conjectured-by-pattern count stays at zero
        until a constructed configuration forces a gap at query time —
        pre-authoring such cells would be a firewall §2 violation (META §8).
        A builder that authors cells is the drift, not the deliverable.
    (3) "Central" is about the surface a fresh reader lands on, not about
        scope size. E0 makes existing moves visible; it is not a new content
        subsystem. Both failure directions — losing this note and inflating
        it — are drift.

Then propose the E0 PR shape for maintainer review BEFORE writing code:
the in-tile palette + chip, the closure badge, the default-on cross-
classification indication, the subtitle wording, and how/where the
configuration builder is surfaced as central (even if its full build is
staged). Name the explorer files you'll touch (likely explorer-map.js,
Map_v34_explorer.html, explorer-data.js, a CSS file) and propose the diff
against current explorer source fetched via web_fetch, per the working norms.
Wait for confirmation on the PR shape before writing the diff.

If at any point you cite a methodology doc you have not opened in this
session, stop and read it (DRIFT_PATTERN_REGISTER.md Entry 2). The quote-back
is the operational check.
```

---

## What this prompt is doing

Five things to note, by contrast with the upstream P0/P0'' prompts:

**1. It carries the §0 template forward intact.** State verification + drift-register read (first, with quote-back on both entries) + methodology-doc read (with quote-back) + vocabulary §3 read. This is the same operational discipline the P0'' prompt established; the process-drift correction (`DRIFT_PATTERN_REGISTER.md` Entry 2) binds going forward, so every sub-PR prompt in the workstream inherits it.

**2. The P0'' commit-state checks survive as a lightweight re-verification.** Step 1 has the next session re-confirm that `MENDELEEV_FRAME.md` is committed and the firewall has a §8, rather than assuming. Both are now true; the check is cheap insurance against a future re-drift, and it tells the E0 chat to stop if its source text is missing.

**3. Surface text is sourced from the frame doc, not from memory.** E0's whole job is to make the frame doc's moves visible, so the prompt points the implementing chat at the §1/§2/§6 physicist-facing paragraphs as the canonical language and binds all surface text to `PHYSICIST_FACING_VOCABULARY.md` §3. The subtitle candidate is a starting draft seeded from the frame doc, explicitly left for the implementing chat to refine and the maintainer to approve (per §3.1 E0d's "implementing chat drafts; maintainer approves").

**4. Move-verification queries are E0-specific.** The data-verification step targets exactly what E0 renders: the 22 forbidden-by-pattern cells and the zero conjectured-by-pattern count (E0a/E0b), a named cross-classification recurrence (E0c), and `closure_level` presence (E0e). This keeps the "verify the move against current data" discipline from the P0 prompts, retargeted to the surfacing work.

**5. The standing emphasis note is reproduced verbatim and instructed to propagate.** Builder-as-surface is named central per `MENDELEEV_FRAME.md` §7 / META §8, with the three guards stated plainly so the note re-drifts in neither direction (lost, or inflated into a phantom phase). The prompt instructs that the note is carried into every subsequent closing/kickoff prompt for the workstream — the same propagation mechanism as the §0 quote-back template.

---

## After E0 ships

- **M0 needs its own kickoff prompt.** The "After P0'' ships" note in `P0_PRIME_PRIME_KICKOFF_PROMPT.md` pairs E0 and M0; M0 is independent of E0 and lands on the MCP worker side (`server_info` purpose field, tool-description rewrites, tool grouping, glossary entries — `MENDELEEV_POSITIONING_HANDOFF.md` §3.2). Its kickoff prompt applies the same §0 template, sources its surface text from the same frame doc, and carries the same standing emphasis note. Draft it against the live worker state when M0 starts.
- **§6 bookkeeping.** When E0 ships, close the E0 row in `MENDELEEV_POSITIONING_HANDOFF.md` §6 and verify the explorer's first-impression surface is Mendeleev-framed (at least one constructive prediction and at least one cross-classification recurrence visible without interaction, per `MENDELEEV_FRAME.md` §7).
- **Then E1.** The existing `EXPLORER_PHASE_BC_HANDOFF.md` E1–E8 queue resumes, now landing on an E0-Mendeleev-framed surface; after E1–E5, the `TRACK_4_USE_SIDE_ARTIFACTS.md` use-side queue follows.

---

*End of E0_KICKOFF_PROMPT.md, drafted 2026-05-30 at the close of the §0-verification-clean session that confirmed the two P0'' deliverables landed. Paste the prompt block into a fresh Claude chat to execute E0 (explorer Mendeleev surfacing) once the §0 verification in `CONTINUATION_HANDOFF_AFTER_P0PP.md` passes. Per project discipline: the live system + canonical data are authoritative, not this document — verify before relying.*
