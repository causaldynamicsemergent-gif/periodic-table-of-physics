# Configuration-builder kickoff prompt — the last Mendeleev surface

**What this is.** A session-starter for a fresh chat to build the interactive
configuration / cross-section builder — the one explorer surface the Mendeleev
work has not yet shipped. Use this rather than the original
`EM0_KICKOFF_PROMPT.md`, whose Phase-A baseline is long gone.

**Verified live state (2026-05-31, read from explorer source, not help text):**
- **M0 shipped** — `server_info` carries the four-move `purpose`, the
  `tool_clusters` grouping, 26 glossary entries.
- **EM0a–EM0e all shipped and live** — in-tile constructive grid; conjectured
  emphasis + "N gaps" chip (invisibly-correct at zero); the `⇄` recurrence
  marker; the subtitle (verbatim the `MENDELEEV_FRAME.md` text); the per-tile
  closure indicator (■/◐/□). E3–E7 surfacing shipped too (`update-e3`–`e7.css`).
- **Not yet built: the configuration / cross-section builder.** Today only a
  *dormant* in-tile render path exists (the conjectured-gap branch, reading
  zero until a configuration forces a gap) plus help/subtitle text; the UI
  labels the builder "in progress." No builder UI element exists in the HTML.

**Scope note (read before assuming this is "unfinished EM0").** EM0's scope
list (continuation handoff §4: in-tile grid, conjectured emphasis, cross-
classification patterns, subtitle, closure indicator = EM0a–e) is COMPLETE.
`MENDELEEV_FRAME.md` §7 calls the builder the *central* Mendeleev surface, but
the standing note's guard (1) says that emphasis does not enlarge EM0 or change
what completion means. So this is the next distinct frontier piece, not a
patch to an unfinished EM0. Build it only if the maintainer wants it next.

---

## The prompt

```
Build the interactive configuration / cross-section builder for the explorer
— the central Mendeleev surface named in MENDELEEV_FRAME.md §7, and the one
piece of the Mendeleev surfacing not yet live. EM0a–EM0e (in-tile grid,
conjectured emphasis + gaps chip, the recurrence marker, subtitle, closure
badge) are already shipped; do not rebuild them. This changes NO data.

Before producing ANY code or surface text, do these in order:

1. §0 state verification. Call server_info; confirm the four-move purpose,
   tool_clusters, and ~26 glossary entries (M0 shipped). Fetch the live
   explorer SOURCE via web_fetch (Map_v34_explorer.html + explorer-map.js +
   explorer-sidebar.js, per EXPLORER_HANDOFF.md norms) and confirm: EM0a–e
   are live; the conjectured-gap render path exists but is dormant (zero at
   v99); there is no builder UI yet. Confirm /mnt/project/ lists
   MENDELEEV_FRAME.md, MENDELEEV_POSITIONING_HANDOFF.md,
   EXPLORER_PHASE_BC_HANDOFF.md, EXPLORER_HANDOFF.md,
   PHYSICIST_FACING_VOCABULARY.md, DRIFT_PATTERN_REGISTER.md,
   META_v21_1_methodology_firewall.md, CONTINUATION_HANDOFF_AFTER_P0PP.md.

2. Read DRIFT_PATTERN_REGISTER.md in full FIRST. It has THREE entries. Quote
   one load-bearing sentence from EACH back to the user before proceeding —
   Entry 1 (substrate outputs vs inputs), Entry 2 (citing docs without
   reading them), Entry 3 (E0→EM0 numbering collision; the label is EM0,
   never plain E0, and update-e0-mendeleev.css stays unchanged). A session
   that cannot quote has not read the doc.

3. Read, then quote one load-bearing sentence back from each of:
   - MENDELEEV_FRAME.md §1 (substrate as configuration space), §2 (M1 mode-3
     + the conjectured-by-pattern zero), §7 (builder as central surface);
   - META_v21_1_methodology_firewall.md §8 (content / organization);
   - MENDELEEV_POSITIONING_HANDOFF.md §3.1 / §7.

4. Read PHYSICIST_FACING_VOCABULARY.md §3. All builder UI text is physicist-
   facing: physics vocabulary first, no snake_case, no software-jargon.

5. Verify the substrate backs the move the builder renders:
   forbidden-by-pattern = 22; conjectured-by-pattern = 0 (stays zero until a
   configuration forces a gap); the worked mode-3 instance is the PBH
   recurrence across dark-matter-candidates ↔ compact-astrophysical-objects
   with NO FC-level edge (MENDELEEV_FRAME.md §2) — the builder must surface
   that recurrence by laying the two classifications along a shared axis,
   read off the organization, not from an authored edge.

STANDING EMPHASIS NOTE — builder-as-surface (reproduce verbatim in every
closing/kickoff prompt for this workstream; do not drop it, do not inflate it):

  The configuration builder is the explorer's CENTRAL Mendeleev surface per
  MENDELEEV_FRAME.md §7 and META §8 — the surface that performs the mode-3 M1
  move, constructing a multi-face cross-section and surfacing the gaps and
  recurrences the substrate already supports. Three guards:
    (1) Emphasis/sizing, not scope creep: it does NOT change what EM0
        completion means (EM0a–e already complete) and does NOT enlarge work
        beyond the §4 queue in CONTINUATION_HANDOFF_AFTER_P0PP.md.
    (2) The builder RENDERS a move the substrate already supports; it does
        NOT author content. The conjectured-by-pattern count stays at zero
        until a constructed configuration forces a gap at query time —
        pre-authoring such cells would be a firewall §2 violation (META §8).
        A builder that authors cells is the drift, not the deliverable.
    (3) "Central" is about the surface a fresh reader lands on, not scope
        size. Both failure directions — losing this note and inflating it —
        are drift.

Then propose the builder PR shape for maintainer review BEFORE writing code:
how a user picks 2–3 classifications and a shared axis; how the cross-section
renders recurrences (reusing the ⇄ logic) and gaps (reusing the dormant
conjectured render path); a derivation-edge audit per §7 so a surfaced gap is
trustworthy (the cells it sits among are literature-anchored). Name the files
you'll touch; propose the diff against current source via web_fetch. The
shipped update-e0-mendeleev.css filename stays unchanged (Entry 3). Wait for
confirmation before writing the diff.

If at any point you cite a methodology doc you have not opened in this
session, stop and read it (DRIFT_PATTERN_REGISTER.md Entry 2).
```

---

## After the builder ships

The Mendeleev surfacing is then complete on both surfaces (MCP via M0, explorer
via EM0 + builder). Remaining work, if any: confirm E1/E2/E8 status in
`EXPLORER_PHASE_BC_HANDOFF.md` (E3–E7 shipped), then the `TRACK_4_USE_SIDE_ARTIFACTS.md`
use-side queue. The Phase C data-authoring track runs in parallel and is unaffected.

---

*End, drafted 2026-05-31 against verified live explorer source. EM0a–e + M0 + E3–E7 confirmed shipped; the configuration builder is the sole open Mendeleev surface. The live system is authoritative — verify before relying.*
