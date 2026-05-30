# Continuation handoff — after P0'' (MENDELEEV_FRAME.md redraft)

**Purpose of this file.** Hand the Mendeleev-positioning workstream to the next conversation cleanly. Records what the P0'' session produced, what state is live vs. what is only sitting in a download panel, the maintainer actions that must happen before the next chat builds on this work, and what's queued after. Companion to `MENDELEEV_POSITIONING_HANDOFF.md` (the parent workstream handoff), `P0_PRIME_PRIME_KICKOFF_PROMPT.md` (the prompt this session executed), and `DRIFT_PATTERN_REGISTER.md`.

Drafted 2026-05-30 at the end of the P0'' session.

---

## 0. Read this first — state verification, and the one thing that will bite you

Run the standard §0 ritual (`server_info`; open the live explorer; list `/mnt/project/`). But the load-bearing check this time is different:

**Two files were produced in the P0'' session and may or may not be committed to the repo yet.** They were handed to the maintainer as downloads, not committed by the session (the session has no repo write access). Before the next chat builds on them, verify:

1. **`/methodology/MENDELEEV_FRAME.md` exists in the repo.** If it does not, the frame doc redraft has not landed and E0/M0 have nothing to source from — stop and commit it first.
2. **`/methodology/META_v21_1_methodology_firewall.md` contains a §8.** Fetch it (raw CDN or `/mnt/project/`) and confirm the header `## 8. The content / organization distinction` is present. If the file still ends at §7, the firewall §8 completion has not landed, and `MENDELEEV_POSITIONING_HANDOFF.md` §7 + `DRIFT_PATTERN_REGISTER.md` Entry 1 are still pointing at a section a reader can't find. This was the exact drift the P0'' session caught; do not let it persist.
3. **Project knowledge has exactly one firewall copy, the one with §8.** During P0'' there were two attached copies (one with §8, one without). If both are still attached, remove the pre-§8 one — otherwise a future session reads the stale copy and the drift recurs. This is a live instance of `DRIFT_PATTERN_REGISTER.md` Entry 2 at the document level.

If any of these three is unmet, the next session's first job is to flag it to the maintainer, not to proceed.

---

## 1. Live state as verified in the P0'' session (2026-05-30)

The live system is **well ahead of the handoff corpus**, which still describes v66–v95 / schema v18–v19. Verified snapshot:

- **MCP `server_info`:** `version 3.2.7, schema_version v20, data_version v99, tool_count 33`. The worker data-lag the Phase C handoff warned about is resolved — `find_resolvers` and `find_discriminating_experiments` return live data. There is a v19→v20 schema bump (adds `no_structural_consequence`).
- **Phase A counts:** `realized 387, forbidden_by_pattern 22, conjectured_by_pattern 0, indeterminate 0, constructive_status_absent 75`. The `conjectured_by_pattern: 0` is the load-bearing fact for the frame doc — it is *correct*, not a deficiency (see `META §8`).
- **Phase B/C counts:** `if_real_implies_carriers 14, resolutions 23, implications 24, quantitative_scale_total 288, resolves_edges 40`.
- **Live explorer:** up, still serving the v34 Phase A presentation (no Mendeleev subtitle, no constructive-status framing — **E0 has not shipped**, as expected since it depends on the frame doc). An `ask-the-map.html` entry point is already live, so `TRACK_4_USE_SIDE_ARTIFACTS.md` §1.3 shipped early.

Implication: trust `server_info` and the canonical data file over any handoff's "where things stand," and update handoffs when you catch them lagging.

---

## 2. What the P0'' session shipped (as downloads, pending commit)

- **`MENDELEEV_FRAME.md` — the P0'' redraft.** ~2,650 words, structure §1–§9 per `MENDELEEV_POSITIONING_HANDOFF.md` §4. Replaces the un-committed P0 draft. Grounded throughout in live v99 queries. Key features:
  - M1 leads with mode-3 (multi-face configuration); mode-1 (`hierarchy-problem`) is the substrate-contained special case; mode-2 is the pairwise intermediate.
  - The mode-3 worked instance is the **PBH recurrence** across `dark-matter-candidates` ↔ `compact-astrophysical-objects` (verified cells: `cell-dm-PBH-asteroid-mass-viable`/`cell-compact-PBH-asteroid-mass`, `cell-dm-PBH-LIGO-mass-excluded`/`cell-compact-PBH-LIGO-window`), with **no FC-level edge between the two** (`compare_classifications` returns zero direct edges; both FCs record the overlap only at cell level). This is a genuine substrate output — read off the organization, not asserted by an edge — and it is the *same case the firewall's history turned on* (META §2.2 once flagged authoring a PBH FC-edge as back-influence).
  - The asteroid-mass open cell is correctly framed as an **authored, empirically-open cell** (`observational-status: viable-targeted`), explicitly *not* a `conjectured-by-pattern` cell. The `conjectured-by-pattern` zero-count is named correct, populating only at configuration time via the E0 configuration-builder.
  - M2 = `edge-xc-crit-specializes-bootstrap` (substrate-enabled); M3 = `su5-gut-program`, confirmed `type: architecture` / `empirical_status: candidate-foundational` (substrate-enabled); M4 = `strong-cp-problem` two-channel resolvers (substrate-contained).
  - §8 names the four binding disciplines; §7/§8 cross-reference `DRIFT_PATTERN_REGISTER.md`.

- **`META_v21_1_methodology_firewall.md` — §8 completion.** §1–§7 byte-unchanged from the canonical file; §8 ("The content / organization distinction") merged in verbatim from the P0'-drafted copy that was in project knowledge but had never reached the canonical file. This is a **P0' completion item**, not new P0'' content — the §8 text was not rewritten, so the maintainer should confirm it matches intent before committing.

Neither file is committed. Both are in the maintainer's download panel.

---

## 3. Immediate maintainer actions (before the next chat builds on this)

1. **Confirm and commit the firewall §8 file** to `/methodology/META_v21_1_methodology_firewall.md` (overwrites the §7-ending version). Methodology docs commit directly to `main` via the GitHub web UI — no CI gate, no PR.
2. **Commit `MENDELEEV_FRAME.md`** to `/methodology/MENDELEEV_FRAME.md` (new file).
3. **Re-attach both to project knowledge; remove the stale pre-§8 firewall copy** (see §0.3).
4. **Bookkeeping** (small, non-blocking): mark the P0 row done in `MENDELEEV_POSITIONING_HANDOFF.md` §6 (P0 now shipped as P0''); update the "Landed" line in `DRIFT_PATTERN_REGISTER.md` Entry 1 (firewall §8 and frame-doc redraft now landed, assuming commit).

---

## 4. What's queued next

In rough order:

- **Optional: a compression pass on `MENDELEEV_FRAME.md`.** It is ~2,650 words against a 1,500–2,000 target. The mode-3 section earned its length, but the doc is the source text other surfaces (E0 subtitle, M0 `server_info` purpose, glossary, use-side essay) will quote, so tight is better. Recommend doing this *after* the maintainer reads the current draft, so load-bearing content isn't cut blind. Trim candidates: the front-matter preamble, §6, §7, §9, and the more verbose physicist-facing paragraphs; do **not** cut the grounded mode-3 walkthrough or the §8 disciplines.
- **Draft the E0 and M0 kickoff prompts.** Per `P0_PRIME_PRIME_KICKOFF_PROMPT.md` "After P0'' ships," these are written *after* the frame doc exists, against the corrected frame doc + corrected methodology + drift register, and must carry the same §0 template (state verification + drift-register read + methodology-doc read + quote-back step). The stale E0 prompt drafted in the original P0 conversation must not be reused.
- **Execute E0** (explorer Mendeleev surfacing: in-tile constructive grid, conjectured-cell emphasis, default-visible cross-classification patterns, subtitle, per-tile closure indicator) — `MENDELEEV_POSITIONING_HANDOFF.md` §3.1 / §6. E0 ships *before* E1.
- **Execute M0** (MCP Mendeleev orientation: `server_info` purpose field, tool-description rewrites, tool grouping, glossary entries) — §3.2 / §6. Independent of E0.
- **Then** the existing `EXPLORER_PHASE_BC_HANDOFF.md` E1–E8 queue (now landing on an E0-Mendeleev-framed surface), and after E1–E5, the `TRACK_4_USE_SIDE_ARTIFACTS.md` use-side queue.

**Standing emphasis note — reproduce in the E0 kickoff prompt and every closing/kickoff prompt that follows.** As literally listed, E0a–E0e read as tile decoration plus a subtitle. But `MENDELEEV_FRAME.md` §7 and `META_v21_1_methodology_firewall.md` §8 name the configuration builder the explorer's *central* Mendeleev surface — the surface that performs the mode-3 move and renders, for a non-MCP reader, the gaps and recurrences the substrate already supports (the P0'' session surfaced one such recurrence by hand, with no builder, using `compare_classifications` + `get_classification`). So the E0 author must make builder-as-surface explicit and not let it hide inside "tile chrome."

Three guards so this does not re-drift into a phantom "big separate phase" (this is the exact drift caught at the end of the P0'' session):

- It is an emphasis/sizing note for the implementing chat, which `MENDELEEV_POSITIONING_HANDOFF.md` §3.1/§6 already invites ("the implementing chat should propose the actual PR shape"). It does **not** change what completion means and does **not** enlarge the remaining work beyond this §4 list.
- The builder *renders* a move the substrate already supports; it does **not** generate or author content. The `conjectured-by-pattern` count stays at zero until a constructed configuration forces a gap at query time — pre-authoring such cells would be a firewall §2 violation (`META §8`). A builder that authors cells is the drift, not the deliverable.
- "Central" is about emphasis on the surface a fresh reader lands on, not about scope size. E0 makes the existing moves visible; it is not a new content subsystem.

Reproduce this note in every closing/kickoff prompt for the workstream, the same way the §0 quote-back template propagates — so the builder-as-surface emphasis is not lost between sessions and is not re-inflated into an undefined phase. Both failure directions (losing it, and inflating it) are drift.

The Phase C data-authoring track (`PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`: sub-PR 57 fcc, Step 4.5, worker refresh) runs in parallel and is unaffected by this positioning work. Note its handoff also lags live state (the worker is already at v99/v20).

---

## 5. How to start the next chat

1. Open a fresh chat in the project.
2. Confirm `/mnt/project/` lists the parent handoffs plus this one.
3. **Run the §0 verification, including the three commit-state checks above.** If the two P0'' files aren't committed, flag and stop.
4. Tell the chat which step to resume.

### Suggested kickoff prompt (next substantive step: E0 kickoff-prompt drafting)

```
Pick up the Mendeleev-positioning workstream after P0''. First run the §0
verification from "Continuation handoff — after P0''": call server_info,
open the live explorer, and confirm (a) /methodology/MENDELEEV_FRAME.md
exists in the repo, (b) /methodology/META_v21_1_methodology_firewall.md
contains a §8, (c) project knowledge has only the §8 firewall copy. If any
fails, flag it and stop.

If state is clean, draft the E0 kickoff prompt (per MENDELEEV_POSITIONING_
HANDOFF.md §3.1/§6 and the "After P0'' ships" note in P0_PRIME_PRIME_
KICKOFF_PROMPT.md). It must carry the §0 template: state verification +
drift-register read + methodology-doc read + quote-back step. Source the
E0 surface text (subtitle, etc.) from MENDELEEV_FRAME.md, applying
PHYSICIST_FACING_VOCABULARY.md §3.

In that E0 prompt, reproduce the §4 standing emphasis note: E0a–E0e read as
tile decoration plus a subtitle, but the configuration builder is the
explorer's CENTRAL Mendeleev surface per MENDELEEV_FRAME.md §7 / META §8 —
so make builder-as-surface explicit and do not let it hide inside "tile
chrome." State the three guards plainly so it does not re-drift: (1) this is
emphasis/sizing, not a scope change, and does not enlarge the work beyond
the §4 list or change what completion means; (2) the builder RENDERS a move
the substrate already supports — it does not author content, and the
conjectured-by-pattern zero stays zero until a configuration forces a gap at
query time (authoring those cells would be a firewall §2 violation); (3)
"central" is about the surface a fresh reader lands on, not scope size.
Instruct that this note is carried into every subsequent closing/kickoff
prompt for the workstream. Then propose the prompt for review before
finalizing.

Alternatively, if I ask for it first: do the compression pass on
MENDELEEV_FRAME.md to bring it toward the 1500-2000 word target without
cutting the grounded mode-3 walkthrough or the §8 disciplines.
```

The Map of Physics MCP tools are usually deferred behind `tool_search` (keyword `"map of physics"`). `compare_classifications` required interactive approval in the P0'' session — expect the same gate.

---

## 6. Quick reference — file locations

- This handoff: `/methodology/CONTINUATION_HANDOFF_AFTER_P0PP.md` (suggested name; maintainer's call)
- The two P0'' deliverables (pending commit): `/methodology/MENDELEEV_FRAME.md`, `/methodology/META_v21_1_methodology_firewall.md`
- Parent workstream handoff: `/methodology/MENDELEEV_POSITIONING_HANDOFF.md`
- The prompt this session executed: `/methodology/P0_PRIME_PRIME_KICKOFF_PROMPT.md`
- Drift register: `/methodology/DRIFT_PATTERN_REGISTER.md`
- Vocabulary discipline: `/methodology/PHYSICIST_FACING_VOCABULARY.md`
- Explorer surfacing queue: `/methodology/EXPLORER_PHASE_BC_HANDOFF.md`
- Use-side queue: `/methodology/TRACK_4_USE_SIDE_ARTIFACTS.md`
- Data-authoring track: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`
- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP: `https://map-of-physics.eddie-8e5.workers.dev` (live v99 / v20 / 33 tools)
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`

### Raw URLs for `web_fetch`

- Frame doc (after commit): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MENDELEEV_FRAME.md`
- Firewall: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/META_v21_1_methodology_firewall.md`
- Other methodology docs: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/{FILENAME}`

---

*End of continuation handoff. Written 2026-05-30 at the close of the P0'' session, which redrafted MENDELEEV_FRAME.md against the corrected methodology and completed the P0' firewall §8 merge that had never reached the canonical file. Both deliverables are pending maintainer commit; §0 makes verifying that the load-bearing first step. Per project discipline: the live system + canonical data are authoritative, not this document — verify before relying.*
