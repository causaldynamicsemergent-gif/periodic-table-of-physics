# M0 kickoff prompt — surfacing the Mendeleev frame on the MCP server

**What this is.** A standalone session-starter prompt for opening a fresh Claude chat to do the M0 sub-PR (MCP Mendeleev orientation). Paste the block below into a new chat in the project. The chat's project files should already include `MENDELEEV_FRAME.md`, `MENDELEEV_POSITIONING_HANDOFF.md`, `PHYSICIST_FACING_VOCABULARY.md`, `DRIFT_PATTERN_REGISTER.md`, `META_v21_1_methodology_firewall.md` (with §8), and `CONTINUATION_HANDOFF_AFTER_P0PP.md`.

**When to use.** Once `MENDELEEV_FRAME.md` is committed to `/methodology/` (M0 sources its surface text from it). M0 is independent of EM0 — it can run before, after, or alongside the explorer work — and lands on the MCP worker side. It does not depend on EM0 having shipped.

**One difference from EM0 / EM0·R — read before starting.** EM0 and EM0·R changed no data. **M0 does:** move M0d adds glossary entries to `/data/Map_v34_consolidated.json`, which goes through the schema/invariant CI tripwire and PR review, and moves M0a/M0b/M0c edit the live MCP worker (`/mcp/worker_skeleton.js`), deployed via the Cloudflare web editor per `PROJECT_INFRASTRUCTURE.md` §3. So M0 is firewall-gated and deploy-gated in a way the explorer sub-PRs were not. The glossary entries are *vocabulary framing* (periodic-table analog → map vocabulary), not new physics content — adding a definition is organization, not cell/edge/prediction authoring — but they still pass through validation.

This prompt was drafted against the corrected frame doc + corrected methodology + drift register, per the "After P0'' ships" note in `P0_PRIME_PRIME_KICKOFF_PROMPT.md`, which pairs EM0 and M0.

---

## The prompt

```
Pick up sub-PR M0 from MENDELEEV_POSITIONING_HANDOFF.md §3.2: surface the
Mendeleev frame on the live MCP server. M0 is independent of EM0 and lands
on the MCP worker side.

Background. The frame doc (MENDELEEV_FRAME.md) is the upstream source. M0
makes the four moves it names legible on the surface a calling LLM (and the
physicist behind it) meets first when it reaches the server: the server_info
response, the tool descriptions, the way tool_search groups tools, and the
glossary it can pull on demand. Today that surface reads as operational
metadata plus filter-behaviour tool descriptions; M0 reorients it to lead
with the move.

Scope — the four M0 moves (MENDELEEV_POSITIONING_HANDOFF.md §3.2):
  M0a. A first-class `purpose` field in server_info — a 100–200 word
       orientation leading with the Mendeleev frame and the four moves
       M1–M4 in order. Sourced from MENDELEEV_FRAME.md.
  M0b. Tool descriptions lead with the MOVE, not the filter behaviour, for
       the structural-pattern tools (find_structurally_excluded,
       find_forced_cells, find_cross_classification, compare_classifications,
       find_hosting, find_targeting, find_targets_of_program,
       get_axis_mapping). M2 and M3 tool descriptions additionally carry the
       substrate-enabled framing (the substrate provides the literature-
       anchored organization; the discovery/adjudication is the user's). The
       M4 tools (find_discriminating_experiments, find_resolvers,
       find_predictions) keep their current descriptions — already accurate
       to M4. §3.2 gives example rewrites; use them as the register, refine
       the wording.
  M0c. tool_search groups tools into semantic clusters with headers
       (Mendeleev moves / unification-test moves / experimental adjudication
       / navigation) so a calling LLM learns the M1–M4 typology at first
       contact instead of deriving it from tool names.
  M0d. Three or four glossary entries in Mendeleev vocabulary ("empty cell",
       "structural exclusion", "cross-classification pattern", "constructive
       closure", "candidate-foundational program / totality-approach"), each
       leading with the periodic-table analog then specializing to the map's
       vocabulary. This is a small DATA-side PR.

These are emphasis/sizing notes for you to turn into a concrete PR shape;
§3.2 invites the implementing chat to propose the actual diff.

Before producing ANY surface text, code, or glossary entries, do these in
order:

1. §0 state verification. Call server_info; confirm data_version,
   schema_version, tool_count, AND record the current server_info field
   shape (M0a adds `purpose`; note whether one already exists). Confirm
   /mnt/project/ lists MENDELEEV_FRAME.md, MENDELEEV_POSITIONING_HANDOFF.md,
   PHYSICIST_FACING_VOCABULARY.md, DRIFT_PATTERN_REGISTER.md,
   META_v21_1_methodology_firewall.md, and CONTINUATION_HANDOFF_AFTER_P0PP.md.
   Confirm MENDELEEV_FRAME.md is committed in the repo (M0 has nothing to
   source from otherwise — if missing, flag and stop). web_fetch the raw
   worker source (/mcp/worker_skeleton.js) per the Phase C handoff §4 and
   confirm you can see the current server_info shape and tool descriptions —
   do not infer them from the tool list; read the source.

2. Read DRIFT_PATTERN_REGISTER.md in full FIRST, before any other doc. Quote
   one load-bearing sentence from EACH entry (Entry 1 substrate outputs vs
   inputs; Entry 2 citing docs without reading them; Entry 3 numbering
   collision across parallel handoffs) back to the user, in your own
   message, before proceeding. A session that cannot quote has not read.

3. Read, then quote one load-bearing sentence back from each of:
   - MENDELEEV_FRAME.md §1/§2 (the substrate-output reading and M1) and the
     §3/§4/§5 move definitions M0b's tool descriptions must match;
   - META_v21_1_methodology_firewall.md §8 (content / organization
     distinction — the glossary entries are organization, not content);
   - MENDELEEV_POSITIONING_HANDOFF.md §3.2 (the four M0 moves) and §7
     (corrected literature-anchoring principle).
   The quote-back is operational, not ceremonial.

4. Read PHYSICIST_FACING_VOCABULARY.md §3 in full. ALL M0 surface text (the
   purpose statement, every tool description, the cluster headers, the
   glossary entries) is physicist-facing and must obey it: physics
   vocabulary first, no snake_case schema names in prose, no software-jargon
   (Register A), Register C methodology terms (closure, conjectured-by-
   pattern, etc.) introduced only after a physics-prose entry point. Note
   the tension specific to M0: tool descriptions name schema-shaped things,
   so lead each with the move in physics prose, then name the field/filter.

5. Verify every claim M0's surface text will make is backed by current data,
   with one representative query each (record what returns):
   - M0a/M0b M1 claims: find_forced_cells / find_structurally_excluded —
     expect 22 forbidden-by-pattern cells and zero conjectured-by-pattern
     (so the purpose statement and tool descriptions describe an empty
     conjectured category honestly).
   - M0b M2 claim: find_cross_classification — confirm the recurrence edges
     exist; name one (e.g. the critical-systems ↔ conformal-bootstrap edge).
   - M0b M3 claim: find_hosting / find_targeting — confirm su5-gut-program's
     recorded commitment and the proton-decay falsification.
   - M0d glossary: list_classifications / the current glossary (expect 22
     entries) — confirm the new entries don't duplicate existing terms.

Source ALL surface text from MENDELEEV_FRAME.md, not from memory — its
physicist-facing paragraphs are the canonical language, and M0's whole job is
to make the same four moves the explorer now surfaces (EM0) legible on the
MCP face, in consistent wording. For the M0a purpose statement, all four
moves must be legible in order AND the substrate-contained (M1/M4, the map
holds it) vs substrate-enabled (M2/M3, the map enables it) distinction must
read off it. Candidate starting draft, sourced from the frame doc, to refine
under §3 and submit for maintainer approval:

  "The Map of Physics is a periodic-table-style catalogue of modern physics:
   a network of formal classifications, each laying physical or mathematical
   content along its own axes, linked where the same content recurs. It
   supports four moves. M1, empty-cell prediction: lay out a classification
   or a cross-section of several and positions with a structural reason to
   exist but no occupant surface as predictions — the gallium/germanium
   analog — along with their dual, positions the structure forbids. M2,
   cross-classification recurrence: the same content at corresponding
   positions in two classifications, the periodicity analog. M3, testing a
   candidate unification framework against the recorded structure. M4,
   experimental-program adjudication. The map holds M1 and M4 directly and
   provides the literature-anchored organization that makes M2 and M3
   findable — the recognition and the testing are yours."

You draft the purpose statement, the tool-description rewrites, the cluster
headers, and the glossary entries; the maintainer approves them (per §3.2).
These are the §3.2 wording decisions — resolve them in your PR proposal, do
not pre-commit.

STANDING EMPHASIS NOTE — builder-as-surface (reproduce verbatim in every
closing/kickoff prompt for this workstream, the way the §0 quote-back
template propagates; do not drop it and do not inflate it):

  As literally listed, EM0a–EM0e read as tile decoration plus a subtitle. But
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
        scope size. EM0 makes existing moves visible; it is not a new content
        subsystem. Both failure directions — losing this note and inflating
        it — are drift.

M0 NOTE on the standing emphasis note. The note above is written for the
explorer's configuration builder; M0 does not build it. The principle that
carries to M0 is guard (3) plus guard (2): "central" means the surface a
fresh reader lands on, and for the MCP face that surface is server_info +
the tool descriptions + the tool_search grouping a calling LLM meets at
first contact. M0 makes the four moves legible there — and, exactly like the
builder, M0 RENDERS/REORIENTS; it does not author content. M0 changes how
the tools are described and grouped and adds vocabulary glossary entries; it
does NOT change what any tool returns, does NOT add cells/edges/predictions,
and the conjectured-by-pattern count stays zero. A glossary entry that
asserts a new physical claim, or a "purpose" statement that advertises
outputs the data does not hold, is the drift — not the deliverable.

Then propose the M0 PR shape for maintainer review BEFORE writing anything
final: the purpose-statement wording, the per-tool description rewrites
(M0b), the cluster scheme (M0c), and the glossary entries (M0d). Name the
files you'll touch (/mcp/worker_skeleton.js for M0a/b/c, /data/Map_v34_
consolidated.json for M0d, /mcp/README.md for docs) and propose the
worker-skeleton diff against current source fetched via web_fetch, per the
working norms. Note explicitly that M0a/b/c deploy via the Cloudflare web
editor and M0d goes through the CI tripwire, so the maintainer applies both
— you propose, you do not deploy. Wait for confirmation on the PR shape
before writing the diff or the glossary entries.

If at any point you cite a methodology doc you have not opened in this
session, stop and read it (DRIFT_PATTERN_REGISTER.md Entry 2). The quote-back
is the operational check.
```

---

## What this prompt is doing

By contrast with the EM0 prompt it is paired with:

**1. Same §0 template, retargeted to the MCP face.** State verification + drift-register read (first, with quote-back — now on all three entries, including the new Entry 3) + methodology-doc read (with quote-back) + vocabulary §3. Step 1 additionally has the chat `web_fetch` the raw worker source and read the *current* `server_info` shape and tool descriptions rather than inferring them — the same "inspect the surface, don't infer from names" discipline EM0·R used on the explorer.

**2. It flags M0's data + deploy gates up front.** Unlike EM0/EM0·R, M0 touches `/data/Map_v34_consolidated.json` (M0d glossary, CI-gated) and the live worker (M0a/b/c, Cloudflare-deployed). The prompt names this in the header and in the closing instruction so the implementing chat proposes rather than deploys, and treats the glossary as firewall-gated vocabulary.

**3. Surface text is sourced from the frame doc, in wording consistent with EM0.** M0 and EM0 surface the same four moves on two faces; the prompt binds M0's purpose statement, tool descriptions, and glossary to `MENDELEEV_FRAME.md` and `PHYSICIST_FACING_VOCABULARY.md` §3, with a seed purpose-statement draft left for the chat to refine and the maintainer to approve (per §3.2).

**4. Verification queries are M0-specific.** They check exactly the claims M0's text will make — 22 forbidden-by-pattern and zero conjectured (M1), a named cross-classification recurrence (M2), the SU(5) commitment + proton-decay falsification (M3), and the current glossary count (M0d) — so no description advertises an output the data does not hold.

**5. The standing emphasis note is reproduced verbatim and propagates, with an M0 mapping.** Because the literal note is about the explorer's configuration builder, an "M0 NOTE" maps its load-bearing principle to the MCP face: central = the first-contact surface (server_info + tool descriptions + grouping), and M0 reorients without authoring content — the same render-don't-author guard the builder is held to.

---

## After M0 ships

- **§6 bookkeeping.** Close the M0 rows (M0a/b/c, M0d) in `MENDELEEV_POSITIONING_HANDOFF.md` §6, and confirm `server_info.purpose` is live and the structural-pattern tool descriptions lead with the move.
- **Then the content queue.** With both EM0 (explorer) and M0 (MCP) framed, the `EXPLORER_PHASE_BC_HANDOFF.md` E1–E8 queue lands on a Mendeleev-framed surface on both faces; after E1–E5, the `TRACK_4_USE_SIDE_ARTIFACTS.md` use-side queue follows. The Phase C data-authoring track runs in parallel and is unaffected.

---

*End of M0_KICKOFF_PROMPT.md, drafted 2026-05-30 alongside the MENDELEEV_FRAME.md compression pass. Paste the prompt block into a fresh Claude chat to execute M0 (MCP Mendeleev orientation). Per project discipline: the live system + canonical data are authoritative, not this document — verify before relying.*
