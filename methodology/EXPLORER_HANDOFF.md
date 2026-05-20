# Explorer build — handoff and process

**Purpose of this file.** A standing reference for anyone (the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo) who needs to pick up the explorer build mid-stream. Records the current state, what's queued next, the operational norms that keep work moving, and the file-level architecture so a fresh chat can find what it needs to touch without re-reading the whole codebase. Update this doc after every shipped milestone.

Location: `/methodology/EXPLORER_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
The live MCP server (read-only, schema-authoritative): `https://map-of-physics.eddie-8e5.workers.dev`
The canonical data: `data/Map_v34_consolidated.json` in the repo (71 nodes, 186 edges, 484 cells, schema v15.3, dataset v34).

The data layer is stable; the active work is presentation. The build is in the "Update A series" of the explorer rebuild.

**Currently deployed on the live site: Update A.1 + five-file refactor.** Any chat that ships a new build is responsible for updating this line in the same commit.

### Shipped milestones

- **v4 → A → A.1** — three iterations of the single-file monolith, ending at Update A.1 (146 KB single HTML): cell-content search, drag-pan, wheel zoom, six-tab Browse menu, phenomena layer with 25 toggles in 7 color categories, multi-ring highlight stacking, About-as-default sidebar, persistent Legend / Phenomena / About quick-bar, fit-to-view zoom.
- **Five-file refactor** (current deploy) — same A.1 feature set, structurally split into one HTML skeleton (~49 KB) plus four JS modules: `explorer-data.js` (~21 KB), `explorer-map.js` (~15 KB), `explorer-phenomena.js` (~13 KB), `explorer-sidebar.js` (~55 KB). Pure decomposition, no user-visible changes. Each future change now only loads what it touches.

### What's queued

- **Update B** — restore the **discourse layer** (41 non-FC nodes the explorer doesn't render) and consolidate the toolbar's inline chip groups. Detailed plan in §"Update B" below.
- **Update C** — polish: glossary panel (22 entries in the dataset), clickable on-map edges with detail cards, typography pass (KaTeX inline math, scholarly serif body font), in-tile cell visualization for small classifications.
- **Step 5** — open the review pathway: GitHub Issues templates, `/methodology/EDITORIAL.md`, outreach to 2–3 working physicists. Held until Update B ships.

---

## How to start a new chat on this project

Project files are auto-attached when you open a new chat. The AI should already see this handoff plus the methodology docs from the start. To resume work cleanly:

1. Open a fresh chat in the Claude project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, `PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, and the goal supplements.
3. Tell it which section of this doc the work resumes at — e.g., *"Pick up at Update B as described in EXPLORER_HANDOFF.md."*
4. If the chat needs to read or edit explorer code, it fetches the file(s) it needs from GitHub via `web_fetch`. URLs are in §"Quick reference" at the bottom. **Don't attach explorer code to project knowledge** — see §"Project files should never contain the explorer code" below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats rather than listed directly. If the assistant doesn't see them, ask it to call `tool_search` with the keyword *"map of physics"*. The 25 read-only tools are the schema authority — using them is always preferable to guessing or paraphrasing dataset content.

If `web_fetch` rejects a GitHub raw URL the assistant tries (the tool whitelists URLs seen in prior search/fetch results; fresh chats start empty), the workaround is: (a) `web_fetch` `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics` first to whitelist the host, then retry — or (b) the maintainer attaches the file directly to the chat as a per-chat upload (not to project knowledge).

---

## Project files should never contain the explorer code

The most important operational rule in this document — it determines whether the project stays workable a year from now.

**Project files are for stable reference material.** Methodology docs, project goals, schema specs, this handoff doc. ~80 KB total, doesn't grow much.

**Project files are NOT for code that ships.** The explorer grows without bound — every doubling adds a fixed cost to every future chat's boot. If the explorer were attached to project knowledge, eventually a fresh chat couldn't fit the file plus enough working room to do anything useful.

**Instead:** the live explorer lives in the GitHub repo. Future chats `web_fetch` only the modules they need, edit them in the chat, and the maintainer uploads results back to GitHub. Project knowledge holds the handoff (which lists the fetch URLs) and the methodology — nothing more.

Practical implications:

- When uploading a new explorer build, the maintainer does NOT also update project files. No "second upload step."
- The project files panel should contain methodology docs and this handoff. Nothing else.
- If a one-off chat needs the explorer and `web_fetch` is unavailable, the maintainer drags the file directly into the chat — per-chat attachment, doesn't bloat project knowledge.

---

## Edits, not regenerations — how the work scales

A reasonable worry on first encounter with this project: "If the explorer keeps growing, eventually a chat won't be able to produce the file at all." This rests on a mistaken assumption — that an AI assistant has to regenerate the whole file every time it makes a change. It doesn't. The cost of an edit is the cost of the delta, not the cost of the whole file.

For a typical edit on a module:

- **Fetching the file** — one-time cost per chat. A 50 KB module is ~12K tokens of input.
- **Locating the section to change** — ~1–2K tokens.
- **Making the change** — `str_replace` outputs only the changed string, almost always under 1K tokens.
- **Smoke-testing + shipping** — a few thousand more tokens.

Total for one substantial edit: comfortably under 25K tokens. File size barely affects output cost; conversation length eats context, and that resets every new chat.

**When a module grows uncomfortably large**, split it further. The five-file refactor was the first split. If `explorer-sidebar.js` ever exceeds ~80 KB, it becomes `explorer-sidebar-panels.js` + `explorer-sidebar-fc-view.js`. The codebase signals when by becoming hard to navigate. No fixed ceiling on number of files.

Two further techniques that push headroom out when reached:

1. **Externalize prose content.** About / Education / Research panels are mostly prose. That prose can move to standalone markdown files fetched at runtime by a thin renderer. Same for long glossary entries and lengthy descriptions. Code stays compact; content becomes data.
2. **Run scripts instead of generating code.** For repetitive transformations (regenerate phenomenon-to-classification mappings, rebuild an index, validate cell counts), have the chat write a script that *does* the work in bash, rather than emitting hundreds of lines of generated code. Script output becomes a small committed artifact.

Realistic headroom: the explorer can grow to 2–3 MB across 15–20 modules and remain fully editable by a single chat per session. Enough for Update B, Update C, Step 5, and substantial work beyond.

The constraint that breaks this isn't file size. It's two things: undisciplined splitting (modules allowed to balloon past 100 KB before anyone splits them), and conversation length (too many turns in one chat). Both are operational, not architectural.

---

## Iterating across milestones — going back is cheap

Updates aren't sequential locked phases. After B and C land, you can come back any time to tweak A.1 features (or anything earlier). The cost of a tweak depends only on the size of the module being changed, not on what milestone is current.

Pattern for a small revision to an earlier feature:

1. Fresh chat in the project.
2. Identify which module owns the feature using the File-by-file architecture section below.
3. *"Fetch `<module>.js` from GitHub. Change X to Y. Smoke-test and re-ship just that file."*
4. Upload the single returned file to `/explorer/` in GitHub.

Most A.1 features are isolated to one module — phenomena to `explorer-phenomena.js`, About copy to `explorer-sidebar.js`, fit-to-view to `explorer-map.js`. Tweaks to any of these are sub-30K-token chats with one-file commits.

The one thing to watch: a B or C task that touches A.1 code creates a genuine cross-cut. The chat handling it should flag the dependency explicitly so the maintainer knows A.1 behavior may shift. Most B/C work won't have that property — it adds new code paths rather than modifying existing ones.

---

## File-by-file architecture (post-refactor)

Five files in `/explorer/`. Plain `<script>` tags, no bundler, no ES modules. Cross-file references resolve through the global scope.

### Load order in `Map_v34_explorer.html`

```
<script src="explorer-data.js"></script>
<script src="explorer-map.js"></script>
<script src="explorer-sidebar.js"></script>
<script src="explorer-phenomena.js"></script>
<script>init();</script>
```

The trailing `<script>init();</script>` is the only inline JS. Every `<script src>` parse happens before `init()` runs, so even though `init()` is defined in sidebar.js and the boot-time `renderMap()` reaches into phenomena.js helpers loaded *after* sidebar.js, runtime resolution finds everything as globals.

### Dependency direction

```
                     explorer-data.js
                          ▲   ▲   ▲
                          │   │   │
       ┌──────────────────┘   │   └──────────────────┐
       │                      │                      │
explorer-phenomena.js   explorer-map.js     explorer-sidebar.js
                              ▲                      │
                              └──────────────────────┘
                              (sidebar calls renderMap, applyZoom, etc.)
```

`explorer-data.js` is the leaf; everyone reads from it. `explorer-phenomena.js` reads data (state, DATA) and exports indexes that map.js consumes per tile. `explorer-map.js` reads from data and phenomena; sidebar calls into it for zoom, pan, and re-renders. `explorer-sidebar.js` is the orchestrator — defines `init()`, reads from all three other modules.

### What lives where

**explorer-data.js** — globals (`DATA`, `FCS`, `FC_BY_ID`, `SECTORS`, `STATUSES`), constants (`CAT_ORDER`, `CLOSURE_ORDER`, `STATUS_KEY`, `STATUS_LABEL`, `STATUS_COLOR`, `SYMBOLS`, `SECTOR_MAP`, `CATEGORY_MAP`, `SECTOR_ORDER`, `DATA_URLS`, `ZOOM_LEVELS`, `MCP_BASE`), data fetch + transform (`fetchCanonicalData`, `augmentDataset`, `renderFatalError`), shared helpers (`esc`, `formatPara`, `showToast`, `yieldSegments`), URL hash routing (`parseHash`, `writeHash`), the `state` singleton.

**explorer-phenomena.js** — `PHENOMENA` array (25 items, A.1 merges intact), `PHEN_CAT_COLORS` (seven hues), `PHEN_CATEGORIES`, precomputed indexes (`PHEN_BY_FC`, `PHEN_COLOR_BY_ID`, `PHEN_CAT_BY_ID`), phenomena-panel renderer (`renderSidebarPhenomena`), phen↔phen on-map overlay (`drawPhenPhenOverlay`).

**explorer-map.js** — periodic-table renderer (`renderMap`, `renderTile`), hover tooltip (`showTileTooltip`, `moveTooltip`, `hideTooltip`), toolbar wiring (`wireToolbar`, `syncToolbarChips`), zoom + pan: `ZOOM_MIN = 0.35`, `ZOOM_MAX = 2.0`, plus `applyZoom`, `clampPan` (80 px MARGIN, depends on `wrap.scrollHeight * state.zoom`), `zoomFitToView`, `zoomIn`, `zoomOut`, `wireMapDragPan`.

**explorer-sidebar.js** — every right-pane renderer (`renderSidebarDefault` = legend, `renderSidebarAbout`, `renderSidebarEducation`, `renderSidebarResearch`, `renderSidebarSearch`, `renderSidebarFC`, `renderSidebarAllCells`, `renderSidebarCell`), selection state changers (`selectFC`, `selectCell`, `clearSelection`), panel routing (`switchSidebarPanel`, `renderPanel`, `syncSidebarQuickBar`, `wireSidebarQuickBar`, `wirePanelJumps`), `refreshFromServer`, `wireSplitter`, six-tab Browse dropdown (`browseMode`, `buildBrowseMenu`, `openBrowseMenu`, `closeBrowseMenu`, `wireBrowseDropdown`), and `init()` — the boot function called by the inline `<script>init();</script>`.

**Map_v34_explorer.html** — `<head>` + ~30 KB of CSS + body HTML (masthead, toolbar, body-grid with map-pane + splitter + sidebar, tooltip, help-overlay, toast), then the five script tags. No inline JS apart from the one-line `init()` call.

### Cheat-sheet: what to edit for what

| Change | File |
|---|---|
| Add a new physical phenomenon | `explorer-phenomena.js` |
| Adjust a phenomenon category color | `explorer-phenomena.js` |
| Change zoom limits, pan margin, wheel-zoom step | `explorer-map.js` |
| Tweak tile size, row label, or any map-side layout | `Map_v34_explorer.html` (CSS) |
| Edit About / Education / Research panel copy | `explorer-sidebar.js` |
| Change Browse dropdown contents or labels | `explorer-sidebar.js` |
| Add a new sector or reorder sectors | `explorer-data.js` (`SECTOR_MAP` / `SECTOR_ORDER`) |
| Add a new classification symbol or short label | `explorer-data.js` (`SYMBOLS`) |
| Modify dataset parsing/augmentation | `explorer-data.js` (`augmentDataset`) |
| Change initial-load sidebar panel (currently About) | `explorer-sidebar.js` → `state.activePanel` |
| Adjust help-modal copy | `Map_v34_explorer.html` (HTML body) |
| Change boot sequence | `explorer-sidebar.js` → `init()` |

---

## Update B — discourse layer + toolbar consolidation

Two things at once because they touch the same toolbar UI region:

**(a)** Render the 41 non-FC nodes (discourse layer) the explorer doesn't currently show, plus the ~89 discourse-layer edges connecting them.
**(b)** Replace the inline rows-by / spotlight chip groups with buttons + dropdowns + a sidebar panel, so the toolbar has room for the new discourse Browse tabs without becoming a wall of chips.

### Discourse layer — what's in the dataset

The dataset has 41 non-FC nodes the explorer doesn't render:

- **11 architectures** — 4 stratum-2a established (QFT, GR, QM-foundational, Stat mech); 7 stratum-2b candidate-foundational (Tensor-net/ER, RG-as-info-flow, Jaynesian, NCG, Causal sets, AdS/CFT, SU(5) GUT program).
- **11 open-frontiers** — QG, CC, BH info, Hierarchy, Strong CP, Flavor, Measurement, Matter-AM, Dark matter, NS regularity, Topological phases. Each carries a `structural_reason_category` (cross-architecture-non-sharing / reach-termination / apparatus-mechanism-failure / organizing-structure-failure / bridge-failure / interpretive-underdetermination / solvability-failure).
- **6 totality-approaches** — BH thermo, Cosmological models, turbulence, Koide formula, muon g-2, ChPT.
- **6 regime-content** — SM EW, QCD, Higgs, classical gravity, Hilbert/measurement, equilibrium.
- **7 experimental programs** — PDG, ATLAS+CMS at LHC, UA1+UA2 at SPS, CDF+D0 at Tevatron, DONUT, Brookhaven+SLAC (J/ψ), Fermilab E288 (Upsilon).

These connect via ~89 discourse-layer edges across 10 verified edge types: `candidate-hosting` and `candidate-targeting` (both carry graded `discharge_status` across local / global / universal sub-claims), `emergence` (architecture → regime-content), `cross-architecture-emergence` (regime-content → totality-approach), `open-frontier-architecture-edge` (the "fails-to-span" edges), `open-frontier-content-edge`, `multi-architecture-interference-edge`, `bears-on` (FC → frontier or totality, carries `nature` of constrains / partially-solves / structural-only), `uses-classification` (architecture or frontier → FC, may carry `cell_refs`), `produces-classification` (experimental-program → FC). Plus the 97 `cross-classification` edges already rendered.

**Before starting B, the implementing chat should re-query the MCP server** to confirm the taxonomy hasn't changed — the data layer evolves independently of the explorer.

### UX plan: refined Option (c)

The FC map keeps doing what it does. Discourse nodes go everywhere *but* the main canvas. Reasons: drawn-edge approaches don't scale to 89+ edges across 10+ types; unified grids risk conflating the openness-axis / content-axis distinction `PROJECT_GOAL.md` §4 makes load-bearing; refined-c preserves A.1's fit-to-view behavior which assumes full-pane map width.

**1. Browse menu grows from 6 tabs to 11**, structured as two groups inside the same dropdown:

- **MAP** (5 tabs, unchanged from A.1): Phenomena, Legend, About, Education, Research
- **CATALOGUES** (6 tabs): All 30 classifications *(existing)*, plus 5 new — Architectures, Frontiers, Totalities, Regime-content, Programs *(FCs first as primary content, then discourse types by conceptual importance)*

Section headers ("MAP" / "CATALOGUES") render as small-caps eyebrows, non-interactive. The Browse button keeps its current label and chevron. The existing six tabs keep their behavior; the five new ones each open a categorized list in the sidebar following the same UX pattern as "All 30 classifications."

**2. Each catalogue's grouping is type-appropriate.** Architectures group by stratum (established 2a / candidate-foundational 2b). Frontiers group by `structural_reason_category` — this directly satisfies `PROJECT_GOAL.md` §8 "Distinctive" condition (cross-frontier formal-content comparison happens by clicking through frontiers grouped under the same category). Totalities group by `empirical_status`. Regime-content alphabetical. Programs by subtype (collaboration / accelerator / survey / data-curation).

**3. Clicking a discourse node opens a sidebar detail card.** Same chrome as the FC detail card (breadcrumb, close button, structured metadata), but fields differ by type. An architecture card shows its stratum, the regime-content it produces (via `emergence` edges), the frontiers it fails to span, the FCs it uses (with `cell_refs` rendered as inline pills linking to specific cells), and any candidate-hosting / candidate-targeting relationships with `discharge_status` rendered as a small graded bar (substantial / partial / gestural — three segments). A frontier card shows its `structural_reason_category` prominently in the header, the architectures that fail to span it, the FCs that bear on it (with the `nature` pill: constrains / partially-solves / structural-only), the programs targeting it, the empirical loci (open-frontier-content-edges). Totality, regime-content, and program cards follow analogous patterns specific to their incident edges.

**4. Connected FC tiles get a highlight ring on the map.** Same multi-ring `box-shadow` mechanism A.1 uses for phenomena, but a single distinguishing color and a dashed inner stroke so the discourse highlight reads visually different from phenomena rings. Recommended color: deep amber `#b8651a` (distinct from all 7 phenomena hues). Selecting "QFT" highlights all 6 FCs it uses; selecting "QG" highlights the 4 FCs that bear on it. The discourse highlight layers *above* phenomena rings if both are active — both can coexist without color collision.

**5. Five-click navigation satisfies `PROJECT_GOAL.md` §8 "Working".** Any frontier → its structural reason (0 clicks; visible in card header) → an FC bearing on it (1 click on the bears-on edge in the card) → back to frontier (1 click on the breadcrumb) → a program targeting it (1 click on the targeting edge). Three clicks per leg, well under five.

### Toolbar consolidation: rows-by and spotlight become buttons

The current toolbar has three inline chip groups (rows by | spotlight | overlay) plus Browse and search and reset. Adding 5 new Browse tabs without changing anything else would push the toolbar past comfortable readability. So two of the three chip groups collapse:

**Rows-by → button + dropdown.** Single button labeled `Rows: sector ▾` (label reflects current state). Clicking opens a small dropdown with three options: sector / category / closure. Single-select, same behavior as today — just hidden behind a click. Three short labels are self-explanatory; no separate panel needed.

**Spotlight → button + sidebar panel.** Button label shows count active when any are on (e.g. `Spotlight (2) ▾` if two statuses toggled). Clicking opens a new sidebar panel — same chrome as Phenomena / Legend / About / Education / Research. The panel lists all five status types as independent toggles (confirmed / tension / not yet tested / falsified / retro-explanatory), each with a one-line explanation and a count of how many predictions across the whole map carry that status. "All on" and "All off" buttons at the bottom.

**Behavior change worth flagging:** spotlight is currently single-select (pick exactly one status, or "all" = nothing highlighted). The new design is **multi-select** — turn on confirmed AND falsified at the same time and both groups of tiles light up; everything else dims. Compound queries become natural ("show me everything with empirical traction regardless of direction"). The "all" option goes away — it's just the "everything off" state.

**Overlay stays inline** as a chip group (only two options — none / phen↔phen — and likely to gain a third in Update C; not worth a button until then).

**Toolbar before and after:**

```
Before:  [Browse ▾] [search]   rows by [sector|category|closure]   spotlight [all|confirmed|tension|not tested|falsified|retro]   overlay [none|phen↔phen]   reset
After:   [Browse ▾] [search]   [Rows: sector ▾]                    [Spotlight ▾]                                                  overlay [none|phen↔phen]   reset
```

**Spotlight sidebar panel layout:**

```
SPOTLIGHT

Highlight tiles by their prediction status. Each toggle
is independent — turn on as many as you like. Tiles
matching at least one active status are highlighted;
others are dimmed.

[ □ ]  Confirmed                                NNN
       Predicted then observed.

[ □ ]  Tension                                  NNN
       Evidence is unresolved or in conflict.

[ □ ]  Not yet tested                           NNN
       Theoretical prediction without experimental
       verdict.

[ □ ]  Falsified                                NNN
       Ruled out by experiment. ⚠ flag marks tiles
       containing these.

[ □ ]  Retro-explanatory                        NNN
       Phenomenon observed before; classification
       developed after.

         [ all off ]   [ all on ]
```

Counts are computed at panel-render time from the live data, not hardcoded.

### Implementation: a sixth module

A new file `explorer-discourse.js` (estimated ~25–30 KB) holds:

- Discourse-node detail-card renderers (one per type: `renderArchitectureCard`, `renderFrontierCard`, `renderTotalityCard`, `renderRegimeContentCard`, `renderProgramCard`).
- Discourse Browse sub-tab list builders (one per type).
- `selectDiscourseNode(id)` / `clearDiscourseSelection()` state changers, working alongside `selectedFC`.
- Discourse-highlight ring logic (called from `renderTile` via a new helper).

The new spotlight panel and rows-by dropdown live in `explorer-sidebar.js` and `explorer-map.js` respectively — no module of their own.

Small edits to existing files:

- **`explorer-data.js`** — extend `augmentDataset` to retain discourse nodes (currently filtered out: the function keeps only nodes where `type === 'formal-classification'` or `classification_axes` exists). Add `state.selectedDiscourseNode` initialized to `null`. Add `state.spotlightActive` as a `Set<string>` replacing the current single-value `state.highlight`. Build indexes: discourse-nodes-by-id, discourse-edges-by-node-id, discourse-edges-by-type.
- **`explorer-sidebar.js`** — add the new `renderSidebarSpotlight()` panel and wire it into `switchSidebarPanel`. Add the five new Browse sub-tabs to `buildBrowseMenu` with the MAP / CATALOGUES grouping. Wire selection routing to call `selectDiscourseNode` when the user clicks a discourse-node entry. Add `clearDiscourseSelection` to `clearSelection`.
- **`explorer-map.js`** — replace the rows-by chip wiring with a button + dropdown component. Remove the spotlight inline chips (their behavior moves to the sidebar panel). Update `renderTile`'s spotlight logic to use the multi-select set: dim tiles whose `yield_stats` doesn't intersect `state.spotlightActive` (if non-empty); spot tiles that do. `renderTile` learns one more ring overlay (discourse-highlight) layered above phenomena rings, gated on whether the tile's FC id appears in the connected-FCs set of `state.selectedDiscourseNode`.
- **`Map_v34_explorer.html`** — toolbar HTML restructuring (remove rows-by chip group and spotlight chip group; add Rows button + Spotlight button). CSS additions: rows-by dropdown styling, spotlight button counter pill, discourse-ring color and dashed inner stroke, grouped-dropdown section headers in Browse menu, discourse-card styling for the new pill types (`discharge_status` segmented bar, `nature` pill, `structural_reason_category` header pill).

### Out of scope for Update B

- Drawing discourse-to-discourse edges on the map. Handled via in-card link-through, not visual lines. (Update C polish can revisit.)
- A parallel discourse mini-map. Refined Option (c) is doing the work; no second canvas needed.
- Per-edge interactive overlays. Deferred to Update C.
- Glossary cross-linking from within discourse cards. Deferred to Update C (when the glossary panel itself lands).

### Smoke-test additions

The smoke test grows ~7 checks: discourse-node count by type matches MCP; Browse dropdown renders both MAP / CATALOGUES groups with correct headers; rows-by dropdown button replaces the three chips; spotlight button replaces the six chips and opens the sidebar panel; spotlight multi-select correctly dims/spots tiles; selecting an architecture in Browse opens its detail card with the right edge types listed; selecting QFT highlights its uses-classification FCs with discourse-color rings on the map; frontier card shows `structural_reason_category` in its header.

### Decisions locked in

- Browse button keeps its current label.
- Browse dropdown grouped MAP (5 tabs) / CATALOGUES (6 tabs), section headers as eyebrows.
- Catalogues order: All 30 classifications, then architectures, frontiers, totalities, regime-content, programs.
- Frontiers in Browse group by `structural_reason_category` (satisfies §8 Distinctive).
- Discourse highlight color: deep amber `#b8651a`, dashed inner stroke, layered above phenomena rings.
- Rows-by becomes a button + dropdown. Spotlight becomes a button + sidebar panel.
- Spotlight gains multi-select behavior; "all" option goes away.
- Overlay stays inline as chips for now.
- New file `explorer-discourse.js`. Don't merge discourse renderers into `explorer-sidebar.js` (already at 55 KB).

### Open decisions for the B-implementation chat

- **Stratum representation in the architecture card.** "Established (2a)" vs "candidate-foundational (2b)" as pills, or text-only? Probably pills, but check against the A.1 pill aesthetic.
- **`discharge_status` rendering.** Three-segment graded bar (substantial / partial / gestural)? Or per-subclaim breakdown (the data has `subclaim_examples` for some edges)? Lean toward the three-segment bar with an expandable "subclaims" disclosure when present.
- **Spotlight button label format.** `Spotlight ▾` when none active, `Spotlight (2) ▾` when two active? Or always show count? Or a colored dot indicator? Decide during the B chat after seeing it in context.
- **Rows-by button label format.** `Rows: sector ▾` (visible current state) vs `Rows ▾` (cleaner)? First option is more informative; second matches the Spotlight button's pattern better. Decide during the B chat.
- **The maintainer is non-developer.** Every shipped change ends in GitHub web-UI clicks. No terminal, no git CLI, no local Node. Smoke test runs in the implementing chat's sandbox, not on the maintainer's machine.

---

## Update C — polish (backlog, no order)

- **Glossary panel** — 22 entries; surface as a fourth sidebar quick-bar tab, with cross-links from terms inline in tile descriptions.
- **Clickable on-map edges** — phen↔phen overlay draws lines but they're not interactive. Make them clickable, opening a detail card describing the edge's basis. Same treatment for discourse-highlight rings if a user wants to inspect why a specific FC is highlighted.
- **Typography pass** — KaTeX for inline math (LaTeX in cell descriptions); scholarly serif for body text (Crimson Pro or Spectral, both free, already loaded by the explorer's `<link>`).
- **In-tile cell visualization** — for classifications with small cell counts (under 20), show a mini-grid of the actual cells inside the tile preview, so structure is visible at a glance without drilling in.

---

## Working norms

### Non-developer maintenance

The maintainer doesn't write code, doesn't run a terminal, doesn't have local Node.js, doesn't use git CLI. All deployment happens via the GitHub web UI — `Add file → Upload files → drag → commit`. Every instruction in this build must end in something the maintainer can click. Phrases like "run the test suite" or "push to a branch" need to be replaced with explicit web-UI steps.

### Deployment via delete-and-replace

The cleanest way to upload a new set of explorer files: navigate to `/explorer/` in the repo, delete every existing file in the folder (including stray duplicates from earlier uploads, like `Map_v34_explorer (1).html`), then upload all the new files in one commit. This avoids the "modified vs added" confusion when filenames overlap and guarantees no orphan files persist. The trade-off is that GitHub's file-history view will show "deleted, then re-added" rather than "modified," but the canonical history is the commit log, which is intact either way.

### File size cap

Each module targets ≤ 60 KB. HTML skeleton ≤ 50 KB. If a single file approaches the cap, split it further. The monolith broke down at ~150 KB; modules feel comfortable up to ~60 KB.

### Smoke testing under JSDOM

When an edit is made to the explorer, run a Node.js + JSDOM script that loads the HTML with a stub dataset (3 classifications minimum to exercise rendering — one structural, one hybrid, one phenomenon), then exercises new features programmatically. Check the DOM for expected elements, simulate selections, verify state updates. Catches integration errors a syntax check misses.

Pattern (write into `/home/claude/explorer-build/smoke-test.js`):

```js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const BUILD = __dirname;
const html = fs.readFileSync(path.join(BUILD, 'Map_v34_explorer.html'), 'utf8');

// Strip <script src=...> tags so JSDOM doesn't try to fetch them from the network.
const htmlNoScripts = html
  .replace(/<script src="explorer-[^"]+\.js"><\/script>\s*/g, '')
  .replace(/<script>init\(\);<\/script>/, '');

const dom = new JSDOM(htmlNoScripts, {
  url: 'http://localhost/explorer/Map_v34_explorer.html',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const { window } = dom;

window.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve(STUB_DATA) });

// JSDOM doesn't have CSS.escape — polyfill before drawPhenPhenOverlay runs:
if (!window.CSS || !window.CSS.escape) {
  window.CSS = window.CSS || {};
  window.CSS.escape = (s) =>
    String(s).replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c.charCodeAt(0).toString(16) + ' ');
}

// Load each module into the JSDOM context manually:
const ctx = dom.getInternalVMContext();
for (const f of ['explorer-data.js','explorer-map.js','explorer-sidebar.js','explorer-phenomena.js']) {
  vm.runInContext(fs.readFileSync(path.join(BUILD, f), 'utf8'), ctx, { filename: f });
}
await ctx.init();
// ...then assert on the DOM.
```

The reason for `runScripts: 'outside-only'` + manual `vm.runInContext` rather than `runScripts: 'dangerously'` with `<script src>`: JSDOM can't fetch sibling files from the local filesystem the way a browser would, and manually loading via `vm.runInContext` is more controllable. Smoke test is a sanity check, not a full test suite — the real validation is the maintainer eyeballing the live page after upload.

### Data integrity (firewall)

`META_v21_1_methodology_firewall.md` is load-bearing. Cell content, axis labels, citation text, and edge semantics are NOT to be paraphrased in code or commits. When in doubt, query the MCP server (the canonical schema and content). New formal classifications, new cross-classification edges, and new predictive-yield entries go through PRs against the schema, gated by CI — NOT inserted ad-hoc by the explorer.

This affects the explorer in one specific way: the phenomena layer adds a mapping from "everyday names of physical things" to formal classifications. That mapping is presentation-layer, not a schema change, so it lives in the explorer's JS, not in the consolidated JSON. The mappings were verified against the live MCP server before being hardcoded. If they need updating (e.g., a new classification is added that contains photons), update the JS — not the data.

**Cosmetic and presentation-layer changes are not gated by the firewall.** Adjusting phenomenon-category colors, tile styling, panel copy, the legend layout — any purely visual concern ships through a normal explorer commit. No MCP query, no schema PR, no CI consideration beyond the explorer's smoke test. The firewall only applies to changes that touch cell content, axis labels, citations, edge semantics, or the consolidated JSON itself.

### The MCP server is the authority

Before guessing what's in the dataset, query `https://map-of-physics.eddie-8e5.workers.dev`. The 25 read-only tools cover every node type, every edge type, the glossary. Use them to verify mappings, check cell counts, find which classifications contain a particular cell. MCP-server output is the truth; cached knowledge in an AI's context is not.

---

## Lessons from the build so far

- **Top-level `let` / `const` are script-scoped, not global** — *the trap of the five-file split.* When the monolith was split across multiple `<script>` tags, top-level `let DATA = null` in data.js became invisible to `init()` in sidebar.js. The monolith got away with `let` because everything lived in one script. Fix: use `var` for any top-level binding that crosses files (function declarations and `var` declarations both go on the global object; `let` and `const` don't). All four modules now use `var` at top level for cross-file bindings.
- **JSDOM needs `CSS.escape` polyfilled.** `drawPhenPhenOverlay` uses `CSS.escape(fcId)` in its query selectors; JSDOM 29 doesn't ship with `CSS.escape`. The smoke test polyfills it before loading the modules.
- **JSDOM `runScripts: 'dangerously'` + sibling `<script src>` tags doesn't work** in the explorer's setup — JSDOM can't resolve the relative paths. Manual `vm.runInContext` of each module file is the working pattern.
- **The "width: 100/zoom %" trick** in the map wrapper is clever but counterintuitive. It makes the visible map always span the full pane width regardless of zoom level, with tile-wrapping reflowing as zoom decreases. Future modifications to zoom logic must preserve this — without it, low zoom leaves empty space on the right.
- **Pan clamping needs the visible-height calculation**, which depends on `wrap.scrollHeight * state.zoom`. Naively clamping pan to a fixed range causes the map to vanish off-screen when zoomed in.
- **Phenomena merging revealed a real pattern** — leptons, Higgs, W/Z bosons all live in just SM + GUT, nowhere else. SMBHs and white dwarfs both live in just compact-astrophysical-objects. The merged-toggle UI surfaces this structurally instead of forcing the user to discover it by toggling individually. Expand the same trick when adding new phenomena.
- **Eleven formal-mathematical classifications** (ADE families, Freed-Hopkins, CFT bootstrap, generalized symmetries, Higgs/Coulomb branches, N=2 SCFT, modular tensor categories, macroscopic-classical-phenomena, plus three more) don't map to any physical phenomenon. They're pure mathematical scaffolding. When phenomena toggles are active, these tiles correctly remain faded. Don't try to force a mapping.
- **Initial-load fit-to-view** matters more than expected. The default zoom of 100% made the map larger than typical viewports, requiring users to scroll or zoom out before they understood what they were looking at. Auto-fitting on boot solves this.
- **The 80-pixel sidebar quick-bar** (Legend / Phenomena / About) provides one-click access without taking serious vertical space. Tabs in the sidebar header consistently outperform burying navigation in the Browse dropdown for non-developer users. Update B's Spotlight panel will be accessible the same way — via Browse — but if it gets used heavily, consider promoting it to a fourth quick-bar tab.
- **Toolbar real-estate is scarce.** A.1 already had three inline chip groups + Browse + search + reset. Update B's discourse layer would push the rows-by + spotlight + new Browse tabs past the breaking point. The B refactor (rows-by → dropdown, spotlight → sidebar panel) is the right call before adding more.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- Live URL: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev`
- Canonical data: `/data/Map_v34_consolidated.json` (1.37 MB) — single source of truth
- Per-FC entry files: `/data/entries/` (build artifact, regenerable)
- Methodology docs: `/methodology/PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, this file
- Explorer: `/explorer/Map_v34_explorer.html`, `explorer-data.js`, `explorer-map.js`, `explorer-sidebar.js`, `explorer-phenomena.js` (post-Update-B: also `explorer-discourse.js`)
- CI: `.github/workflows/` — schema + invariant validators on PRs

### Raw URLs for `web_fetch`

The HTML skeleton:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/Map_v34_explorer.html`

The four JS modules:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-map.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-sidebar.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-phenomena.js`

The data file:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`

A chat working on a single concern fetches only the modules it needs — usually two files, rarely all five — keeping each chat's context budget small.

Version numbers are git tags from v34 onward, not filenames. The era of `MAP_vN_*.json` filenames is closed.
