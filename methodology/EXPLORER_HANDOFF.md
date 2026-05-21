# Explorer build — handoff and process

**Purpose of this file.** A standing reference for anyone (the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo) who needs to pick up the explorer build mid-stream. Records the current state, what's queued next, the operational norms that keep work moving, and the file-level architecture so a fresh chat can find what it needs to touch without re-reading the whole codebase. Update this doc after every shipped milestone.

Location: `/methodology/EXPLORER_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
The live MCP server (read-only, schema-authoritative): `https://map-of-physics.eddie-8e5.workers.dev`
The canonical data: `data/Map_v34_consolidated.json` in the repo. Server-verified counts (May 2026): 71 nodes, 186 edges, 30 formal-classifications, 484 cells, 22 glossary entries, 7 experimental programs, 97 cross-classification edges, ~89 discourse-layer edges, schema v15.3, dataset v34.

The data layer is stable; the active work is presentation. The build sits inside "Update C — polish" with two items shipped (glossary panel, clickable on-map edges) and three remaining.

**Currently deployed on the live site: Update A.1 + Update B + Update C glossary panel + Update C clickable on-map edges + Update C typography pass + Update C in-tile cell viz (eleven-file build: 1 HTML + 4 CSS + 6 JS).** Any chat that ships a new build is responsible for updating this line in the same commit.

### Shipped milestones

- **v4 → A → A.1** — three iterations of the single-file monolith, ending at Update A.1 (146 KB single HTML): cell-content search, drag-pan, wheel zoom, six-tab Browse menu, phenomena layer with 25 toggles in 7 color categories, multi-ring highlight stacking, About-as-default sidebar, persistent Legend / Phenomena / About quick-bar, fit-to-view zoom.
- **Five-file refactor** — same A.1 feature set, structurally split into one HTML skeleton (~49 KB) plus four JS modules: `explorer-data.js` (~21 KB), `explorer-map.js` (~15 KB), `explorer-phenomena.js` (~13 KB), `explorer-sidebar.js` (~55 KB). Pure decomposition, no user-visible changes. Each future change now only loads what it touches.
- **Update B** — the discourse layer (41 non-FC nodes, ~89 discourse-layer edges) and a toolbar refactor that moves catalogue navigation up to first-class peer buttons. Shipped as six files: the four refactor modules plus a sixth, `explorer-discourse.js` (~37 KB), and a 17-KB CSS expansion folded into the HTML skeleton. Details in the "What was built in Update B" section below.
- **Update C — glossary panel.** Shipped the 22-entry glossary that surfaces the dataset's own organising vocabulary (Architecture / Regime content / Open frontier / structural-reason categories / Discharge status / Stratum / Family / …). New `explorer-glossary.js` (~12 KB, seventh module). Two entry points: a 4th sidebar quick-bar button (§ Glossary) and a Browse-menu tab. Type-ahead filter on term ∪ aliases ∪ definition. Related-term pills navigate within the glossary. Hash routing `#/glossary` and `#/glossary/<slug>` for deep-linking. Term-cross-linking inside cell descriptions and discourse-card prose was deliberately deferred — see "What was built in Update C — glossary panel" and the rationale in "Update C remaining" below.
- **Update C — clickable on-map edges.** Cross-classification edges (97 total in v34, 7 of which are phenomenon↔phenomenon) are now navigable from two surfaces: phen↔phen overlay arrows on the map and `dc-edge` blocks inside FC cards. Either click opens a sidebar edge card showing from-FC pill → to-FC pill, subtype + status + optional `targeted_by` pills, full description prose, cell-ref pills grouped under the from-FC, and citations. All four content fields previously lived in the data but were surfaced nowhere. Hash routing `#/edge/<edge-id>` for deep-linking. SVG overlay bumped to `z-index: 5` (above tile `:hover` at z-index 2) so lines stay reachable when the cursor approaches a tile; each edge wrapped in a `<g class="phen-phen-edge-group" data-edge-id>` containing wide transparent hit-area paths (stroke-width 14) under thin visible paths (stroke-width 1.6), so the click target is ~14 px around the visible line and the visible stroke thickens on group hover. Same seven files as before — no new module added, code split across `explorer-data.js` (`cross_class_edges_by_id` index, `state.selectedEdgeId`, hash routing), `explorer-phenomena.js` (g-group structure + idempotent `svg.onclick` delegation), `explorer-sidebar.js` (`renderSidebarCrossClassEdge` + `selectCrossClassEdge` + dc-edge keyboard/click wiring + `.edge-target` stopPropagation preserving the existing one-click neighbor jump), and `Map_v34_explorer.html` (xc-edge-card CSS chrome). Details in "What was built in Update C — clickable on-map edges" below.
- **Update C — typography pass.** KaTeX inline + display math rendering for the discourse-layer prose (regime-content / open-frontier / totality-approach descriptions, plus FC descriptions, edge-card descriptions, and glossary entries — every surface that flows through `formatPara`). KaTeX loaded from jsdelivr CDN, version-pinned to **0.16.47**, both `<link>` and `<script>` carrying SRI `integrity="sha384-…"` and `crossorigin="anonymous"`. `formatPara` extended in `explorer-data.js` with a two-pass `$$…$$` then `$…$` extractor that hashes each math segment to a `\x00MATHn\x01` placeholder (the placeholders survive `esc()`), then substitutes back with `katex.renderToString({ throwOnError: false, strict: 'ignore' })`. Defensive try/catch around the KaTeX call; offline fallback emits `<code class="math-unrendered">` with the raw LaTeX source for graceful degradation. Same commit extracted the inline `<style>` block into four CSS files — `update-b.css`, `update-c.css`, `update-c-edges.css`, and a new `update-c-typography.css` — and dropped the HTML from 72 KB to 52 KB (well under the 65 KB soft cap). The body face is **Crimson Pro** (already set on `body`; the typography pass added OpenType old-style numerals and a small `vertical-align: -0.06em` nudge on `.katex` to bring KaTeX's CMU baseline back to the Crimson Pro text baseline). Inline KaTeX is constrained to `font-size: 1em` so math doesn't visually outrank surrounding prose. Display math gets `text-align: center` and `overflow-x: auto` so long equations don't push the sidebar into horizontal scroll. Details in "What was built in Update C — typography pass" below.
- **Update C — typography fix (escape normalization).** Same-day follow-up patch after deploy: the v34 dataset has **inconsistent escape levels in math fields**. `equations[].latex` fields and `architecture_level_edges[].description` fields use correct single-backslash LaTeX (`\theta`), but the regular `description` fields on regime-content / open-frontier / totality-approach nodes and the `loose_ends[].description` fields are double-escaped (`\\theta`). KaTeX reads `\\` as a LaTeX line-break command and renders the following identifier as literal text — exactly the "theta" the maintainer reported seeing on the strong-CP-problem card. Fix: one-line collapse `latex.replace(/\\\\/g, '\\')` inside the math-segment handler of `formatPara`, applied before KaTeX sees the content. Idempotent on correctly-escaped strings (no `\\` to find), corrective on double-escaped strings. Verified safe across v34 (no `$$…$$` display math present where `\\` would be a legitimate line-break command; no chunk has triple-backslash that would defeat single-pass collapse). Same patch removed `defer` from the KaTeX `<script>` tag: deferred load was racing the cached-data fetch path, sometimes leaving the first render to hit the offline fallback. Synchronous load adds ~30–50 ms to first paint but guarantees math is ready when `init()` invokes the first `formatPara`.
- **Update C — in-tile cell visualisation.** Each FC tile with `cell_count ≤ 20` (27 of 30 FCs) gains a small grid of 8×8 px swatches between `.tile-symbol` and `.tile-yield`, one swatch per cell, color-encoded by the cell's content-state. Threshold excludes sm-rep-content (36), tenfold-way (30), freed-hopkins-cobordism (25). Encoding priority: `excluded` (diagonal-hatched paper-3) > `has-falsified` (red) > `has-confirmed` (green) > `has-tension` (amber) > `has-not-tested` (gray) > `has-retro` (purple) > `has-realized-only` (ink-faint solid) > `empty` (paper-3 with faint border). Touched two files: `explorer-map.js` (added `cellSwatchClass` + `tileCellBreakdown` helpers above `renderTile`, branched the template by `fc.cell_count`, extended `showTileTooltip` with a per-cell-state breakdown line when the tile has a mini-grid) and `update-c-typography.css` (the `.tile-cells-mini` + `.tile-swatch.*` rule block; placed in the typography file rather than spawning an eighth CSS file). Swatches are decorative (`aria-hidden="true"` on the grid, `pointer-events: none` so the tile's whole-element click + hover keep working). Real-data sanity check across all 30 FCs surfaced structural insight visible at a glance: modified-gravity-alternatives shows 5 falsified cells; dark-matter-candidates shows 4 falsified + 3 in-tension + 3 not-tested + 0 confirmed (the actual empirical state of dark-matter searches in 18 swatches); the four math-only ADE FCs (ade-su2-subgroups, ade-du-val, ade-modular-invariants, ade-quivers) render as all-empty grids — a visual surface for the "doubly-orphaned ADE clique" finding from `MAP_v21_findings.md` §3.

### What's queued (live)

- **Update C — remaining.** One item remaining: **discourse-highlight ring badges** (small clickable corner-of-tile element on FCs lit up by a selected discourse node, opening a card that explains why this FC connects to the selected discourse node). Reuses the xc-edge-card chrome from clickable edges; only the trigger surface and card content are new. Sketch in the "Update C — remaining" section below.
- **Step 5 — open the review pathway** (now substantially unblocked — Update B made the discourse layer navigable, the Update C glossary lowers the explanation overhead for unfamiliar physicist reviewers encountering map-internal vocabulary like "discharge status" or "candidate-foundational," Update C clickable edges surfaces previously-buried citation chains that subfield specialists will want to verify against their literature, the typography pass makes math-heavy prose actually readable, and the in-tile cell viz turns the map's empirical state into a glanceable summary). GitHub Issues templates for cell errata / new-FC proposals / cross-class edge proposals; `/methodology/EDITORIAL.md` describing the editorial process; outreach copy + the live explorer link sent to 2–3 working physicists in different subfields. The "Step 5" sketch later in this doc has the operational details.

---

## How to start a new chat on this project

Project files are auto-attached when you open a new chat. The AI should already see this handoff plus the methodology docs from the start. To resume work cleanly:

1. Open a fresh chat in the Claude project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, `PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, and the goal supplements.
3. Tell it which section of this doc the work resumes at — e.g., *"Pick up at Update C remaining as described in EXPLORER_HANDOFF.md, starting with the discourse-highlight ring badges."*
4. If the chat needs to read or edit explorer code, it fetches the file(s) it needs from GitHub via `web_fetch`. URLs are in the "Quick reference" section at the bottom. **Don't attach explorer code to project knowledge** — see "Project files should never contain the explorer code" below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats rather than listed directly. If the assistant doesn't see them, ask it to call `tool_search` with the keyword *"map of physics"*. The 25 read-only tools are the schema authority — using them is always preferable to guessing or paraphrasing dataset content.

If `web_fetch` rejects a GitHub raw URL the assistant tries (the tool whitelists URLs seen in prior search/fetch results; fresh chats start empty), there's a workaround the B-implementation chat documented and successive chats have re-confirmed: the `web_fetch` tool's negative-response caching can persist a 404 even after the file lands. The reliable fallback is `bash` + `curl` to `https://github.com/.../blob/main/...` (github.com is whitelisted), which returns an HTML wrapper with the file's content embedded in a `<script type="application/json" data-target="react-app.embeddedData">` JSON payload. **Path to the file lines: `data["payload"]["codeViewBlobLayoutRoute.StyledBlob"]["rawLines"]`** as of May 2026 — earlier handoff text said `payload.blob.rawLines`, which is stale. GitHub web-app refactors evidently keep the data accessible but rename the route; probe the structure with a small inspector first (`json.dumps(list(data["payload"].keys()))`) rather than assume the path. Works for files up to ~500 KB; the 1.37 MB consolidated JSON exceeds that and requires re-querying through the MCP server instead. A reusable fetcher script with both candidate paths (current + legacy) is in the typography-pass chat's `/home/claude/explorer-build/fetch_blob.py`; the same pattern works in any fresh chat.

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

**When a module grows uncomfortably large**, split it further. The first split made five files; Update B added a sixth (`explorer-discourse.js`); Update C added a seventh (`explorer-glossary.js`). If `explorer-sidebar.js` ever exceeds ~80 KB, it becomes `explorer-sidebar-panels.js` + `explorer-sidebar-fc-view.js`. If `explorer-discourse.js` grows past ~60 KB (currently 37 KB), the per-type card renderers split out. The codebase signals when by becoming hard to navigate. No fixed ceiling on number of files.

Two further techniques that push headroom out when reached:

1. **Externalize prose content.** About / Education / Research panels are mostly prose. That prose can move to standalone markdown files fetched at runtime by a thin renderer. Same for long glossary entries and lengthy descriptions. Code stays compact; content becomes data.
2. **Run scripts instead of generating code.** For repetitive transformations (regenerate phenomenon-to-classification mappings, rebuild an index, validate cell counts), have the chat write a script that *does* the work in bash, rather than emitting hundreds of lines of generated code. Script output becomes a small committed artifact.

Realistic headroom: the explorer can grow to 2–3 MB across 15–20 modules and remain fully editable by a single chat per session. Enough for Update C, Step 5, and substantial work beyond.

The constraint that breaks this isn't file size. It's two things: undisciplined splitting (modules allowed to balloon past 100 KB before anyone splits them), and conversation length (too many turns in one chat). Both are operational, not architectural.

---

## Iterating across milestones — going back is cheap

Updates aren't sequential locked phases. After C lands, you can come back any time to tweak A.1 or B features. The cost of a tweak depends only on the size of the module being changed, not on what milestone is current.

Pattern for a small revision to an earlier feature:

1. Fresh chat in the project.
2. Identify which module owns the feature using the "File-by-file architecture" section below.
3. *"Fetch `<module>.js` from GitHub. Change X to Y. Smoke-test and re-ship just that file."*
4. Upload the single returned file to `/explorer/` in GitHub.

Most features are isolated to one module — phenomena to `explorer-phenomena.js`, About copy to `explorer-sidebar.js`, fit-to-view to `explorer-map.js`, discourse cards to `explorer-discourse.js`, glossary entries / category ordering / related-pill behaviour to `explorer-glossary.js`. Tweaks to any of these are sub-30K-token chats with one-file commits.

The one thing to watch: a task that touches code in a module other than the one it's "supposed" to own creates a genuine cross-cut. The chat handling it should flag the dependency explicitly so the maintainer knows behavior elsewhere may shift.

---

## File-by-file architecture (eleven files: 1 HTML + 4 CSS + 6 JS)

Eleven files in `/explorer/`. Plain `<script>` and `<link>` tags, no bundler, no ES modules. Cross-file references resolve through the global scope. Six JS modules now (Update C glossary added the seventh in number but Update C typography didn't add a new module — it extended `explorer-data.js`'s `formatPara`). Four CSS files supplement an inline `<style>` block in the HTML: `update-b.css`, `update-c.css`, `update-c-edges.css`, and `update-c-typography.css` — the typography pass extracted them from the previously-monolithic inline block.

### Load order in `Map_v34_explorer.html`

```
<!-- in <head>, after the inline <style> block: -->
<link rel="stylesheet" href="update-b.css">
<link rel="stylesheet" href="update-c.css">
<link rel="stylesheet" href="update-c-edges.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css"
      integrity="sha384-nH0MfJ44wi1dd7w6jinlyBgljjS8EJAh2JBoRad8a3VDw2K69vfaaqm4WnR+gXtA"
      crossorigin="anonymous">
<link rel="stylesheet" href="update-c-typography.css">

<!-- before </body>: -->
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.js"
        integrity="sha384-CwjPRVHTvLiMBFjEoij+QZViMV5rhTOIp7CJzl24JEqpRDA1sJFHVXXLURktbYYp"
        crossorigin="anonymous"></script>
<script src="explorer-data.js"></script>
<script src="explorer-map.js"></script>
<script src="explorer-sidebar.js"></script>
<script src="explorer-phenomena.js"></script>
<script src="explorer-discourse.js"></script>
<script src="explorer-glossary.js"></script>
<script>init();</script>
```

CSS cascade order: inline base A.1 styles → `update-b.css` (discourse) → `update-c.css` (glossary) → `update-c-edges.css` (clickable on-map edges) → KaTeX defaults → `update-c-typography.css` (math integration + prose tuning + in-tile cell viz). KaTeX CSS sits last among the third-party stylesheets so the typography file can override its defaults; `update-c-typography.css` is loaded last so it overrides both base and KaTeX.

The KaTeX `<script>` is **not** `defer`. Deferred load races the cached-data-fetch path: when `Map_v34_consolidated.json` is served from disk cache, `fetchCanonicalData()` can resolve before the deferred KaTeX script downloads, leaving the first `formatPara` invocation to hit the offline fallback. Synchronous load adds ~30–50 ms to first paint over a cold CDN connection but guarantees `katex` is defined when `init()` first invokes `formatPara` through any of the discourse-card renderers. Tradeoff documented under the typography fix in shipped milestones.

The trailing `<script>init();</script>` is the only inline JS. Every `<script src>` parse happens before `init()` runs, so even though `init()` is defined in sidebar.js and the boot-time `renderMap()` reaches into phenomena.js / discourse.js / glossary.js helpers loaded after sidebar.js, runtime resolution finds everything as globals. The glossary module's `buildGlossaryIndexes()` is called from `init()` after `augmentDataset` returns, so the panel can render the moment the user clicks its quick-bar button.

### Dependency direction

```
                      explorer-data.js
                       ▲   ▲   ▲   ▲   ▲
                       │   │   │   │   │
       ┌───────────────┘   │   │   │   └─────────────────────────────────┐
       │                   │   │   └────────────────┐                    │
       │                   │   │                    │                    │
explorer-phenomena.js explorer-map.js  explorer-sidebar.js  explorer-discourse.js  explorer-glossary.js
                              ▲                │          ▲                  ▲                  ▲
                              └────────────────┘──────────┘──────────────────┘──────────────────┘
                              (sidebar/discourse/glossary call renderMap, applyZoom, etc.;
                               discourse and glossary call selectFC/selectCell from sidebar)
```

`explorer-data.js` is the leaf; everyone reads from it. `explorer-phenomena.js`, `explorer-discourse.js`, `explorer-glossary.js` read data and indexes that other modules consume. `explorer-map.js` reads from data, phenomena, and discourse (for the ring-highlight check); sidebar calls into map for zoom, pan, and re-renders. `explorer-sidebar.js` is the orchestrator — defines `init()`, reads from all other modules.

### What lives where

**explorer-data.js** (~30 KB) — globals (`DATA`, `FCS`, `FC_BY_ID`, `SECTORS`, `STATUSES`), constants (`CAT_ORDER`, `CLOSURE_ORDER`, `STATUS_KEY`, `STATUS_LABEL`, `STATUS_COLOR`, `SYMBOLS`, `SECTOR_MAP`, `CATEGORY_MAP`, `SECTOR_ORDER`, `DATA_URLS`, `ZOOM_LEVELS`, `MCP_BASE`), data fetch + transform (`fetchCanonicalData`, `augmentDataset`, `renderFatalError`), shared helpers (`esc`, `formatPara`, `showToast`, `yieldSegments`), URL hash routing (`parseHash`, `writeHash`), the `state` singleton. **Update B added:** discourse-node retention in `augmentDataset` (filters non-FC nodes into `discourse_nodes`); discourse-edge indexes (`discourse_edges_by_node`, `discourse_edges_by_type`, `fcs_connected_to_discourse`); `state.selectedDiscourseNode` and `state.spotlightActive` (multi-select Set replacing the single-value `state.highlight`); `/discourse/<id>` hash route and `spotlight=k1,k2,...` query string. **Update C glossary added:** `termToSlug` shared helper (lowercase + non-alphanumeric → `-`, with leading/trailing separators stripped); `state.selectedGlossaryTerm` (slug of the focused glossary entry) and `state.glossaryFilter` (the type-ahead string); `/glossary` and `/glossary/<slug>` hash routes (parseHash sets `state.activePanel = 'glossary'` automatically). **Update C clickable edges added:** `cross_class_edges_by_id` map in `augmentDataset` (full edge records keyed by id, 97 entries in v34); edge `id` propagated into `edges_by_fc` and `phen_phen_edges` entries; `state.selectedEdgeId`; `/edge/<edge-id>` hash route with `writeHash` precedence `selectedFC > selectedEdgeId > selectedDiscourseNode > glossary`. **Update C typography pass added:** `formatPara` extended with a two-pass math-aware extractor — `$$...$$` then `$...$`, each match hashed to a `\x00MATHn\x01` placeholder that survives `esc()`, then substituted back via `katex.renderToString({ throwOnError: false, strict: 'ignore' })`. Defensive try/catch around the KaTeX call. Offline fallback path (when `typeof katex === 'undefined'`) emits `<code class="math-unrendered">` so JSDOM tests pass and the page degrades gracefully if the CDN is unreachable. **Update C typography fix added:** one-line `latex.replace(/\\\\/g, '\\')` inside the math-segment handler, applied before KaTeX sees the content — collapses the v34 dataset's double-escaped math (`\\theta`) back to single-escape (`\theta`) so KaTeX renders Greek letters and macros correctly. Idempotent on already-normalized strings.

**explorer-phenomena.js** (~15 KB) — `PHENOMENA` array (25 items, A.1 merges intact), `PHEN_CAT_COLORS` (seven hues), `PHEN_CATEGORIES`, precomputed indexes (`PHEN_BY_FC`, `PHEN_COLOR_BY_ID`, `PHEN_CAT_BY_ID`), phenomena-panel renderer (`renderSidebarPhenomena`), phen↔phen on-map overlay (`drawPhenPhenOverlay`). Untouched by Update B and Update C glossary. **Update C clickable edges restructured `drawPhenPhenOverlay`:** each edge now renders as `<g class="phen-phen-edge-group" data-edge-id>` containing 4 child paths — 2 transparent wide hit-areas (stroke-width 14 spline + slightly-enlarged invisible arrow triangle) and 2 visible thin paths (the existing spline + arrow head). Idempotent `svg.onclick = (ev) => ...closest('[data-edge-id]')` delegation re-installed on every redraw; survives `renderMap` rebuilding the parent.

**explorer-map.js** (~25 KB) — periodic-table renderer (`renderMap`, `renderTile`), hover tooltip (`showTileTooltip`, `moveTooltip`, `hideTooltip`), toolbar wiring (`wireToolbar`, `syncToolbarChips`, `wireRowsByDropdown`), zoom + pan: `ZOOM_MIN = 0.35`, `ZOOM_MAX = 2.0`, plus `applyZoom`, `clampPan` (80 px MARGIN, depends on `wrap.scrollHeight * state.zoom`), `zoomFitToView`, `zoomIn`, `zoomOut`, `wireMapDragPan`. **Update B added:** `ROWSBY_OPTIONS` constant; multi-select spotlight logic in `renderTile` (Set-based dim/spot instead of single-value); discourse-highlight class on `renderTile` driven by `isFCConnectedToSelectedDiscourse`; spotlight button count and discourse-tab button active-state in `syncToolbarChips`; rows-by chip group replaced with button + dropdown menu; spotlight chip group replaced with button that opens the sidebar panel. **Untouched by Update C glossary and clickable-edges passes.** **Update C in-tile cell viz added:** `MINI_GRID_THRESHOLD = 20` constant; `cellSwatchClass(cell, fc)` helper that maps a cell to one of eight encoding classes (priority high → low: `excluded` > `has-falsified` > `has-confirmed` > `has-tension` > `has-not-tested` > `has-retro` > `has-realized-only` > `empty`); `tileCellBreakdown(fc)` helper that counts cells per bucket for tooltip use; `renderTile` branched by `fc.cell_count <= 20` to insert a `<div class="tile-cells-mini" aria-hidden="true">` block between `.tile-name` and `.tile-yield` with one `<span class="tile-swatch ...">` per cell; `showTileTooltip` extended with a "cells: …" breakdown line on the tooltip body when the tile has a mini-grid. 27 of 30 FCs render the grid (sm-rep-content 36, tenfold-way 30, freed-hopkins-cobordism 25 stay count-only).

**explorer-sidebar.js** (~67 KB, approaching the 80 KB ceiling) — every right-pane renderer (`renderSidebarDefault` = legend, `renderSidebarAbout`, `renderSidebarEducation`, `renderSidebarResearch`, `renderSidebarSearch`, `renderSidebarFC`, `renderSidebarAllCells`, `renderSidebarCell`, `renderSidebarBrowseClassifications` [new B], `renderSidebarCrossClassEdge` [new C-clickable-edges]), selection state changers (`selectFC`, `selectCell`, `selectCrossClassEdge`, `clearSelection`, `clearCrossClassEdgeSelection`), panel routing (`switchSidebarPanel`, `renderPanel`, `syncSidebarQuickBar`, `wireSidebarQuickBar`), `refreshFromServer`, `wireSplitter`, six-tab Browse dropdown (`buildBrowseMenu`, `openBrowseMenu`, `closeBrowseMenu`, `wireBrowseDropdown`), and `init()` — the boot function called by the inline `<script>init();</script>`. **Update B added:** `renderSidebarBrowseClassifications(filter)` with type-ahead search and sectored FC list; panel routing for `'discourse'`, `'spotlight'`, and the six `'browse-*'` catalogue panels; `clearDiscourseSelection` calls in the selection lifecycle; trimmed Browse menu to five MAP-only tabs (the six catalogues all moved to peer toolbar buttons). **Update C glossary added:** panel routing case for `'glossary'` (calls `renderSidebarGlossary` with `state.glossaryFilter`); Glossary tab added to `buildBrowseMenu` (between Legend and About), making it a six-tab dropdown again; `clearGlossarySelection` symmetric call in `switchSidebarPanel` and `clearSelection`; `init()` calls `buildGlossaryIndexes()` after `augmentDataset` returns and before the first render. **Update C clickable edges added:** `renderSidebarCrossClassEdge(edge)` renderer (header from-pill → arrow → to-pill, subtype + status + optional `targeted_by` pills, description prose, cells section headed by from-FC pill, citations bulleted list); `selectCrossClassEdge` / `clearCrossClassEdgeSelection` symmetric with the other selectors; `'edge'` panel routing in `renderPanel`; `selectedEdgeId` deep-link branch in `renderAll`; `clearCrossClassEdgeSelection` call in `switchSidebarPanel` when routing away from `'edge'`; symmetric `state.selectedEdgeId = null` clears added to `selectFC`, `selectCell`, `selectDiscourseNode` (in `explorer-discourse.js`), `selectGlossaryTerm` (in `explorer-glossary.js`), `clearSelection`; dc-edge click + Enter/Space keyboard wiring in `renderSidebarFC`'s handler block; `.edge-target` `event.stopPropagation()` to preserve the existing one-click neighbor jump.

**explorer-discourse.js** (~37 KB, **NEW in Update B**) — `DISCOURSE_TYPE_LABELS`, `DISCOURSE_TYPE_ICONS`, `STRUCTURAL_REASON_LABELS`, `PROGRAM_SUBTYPE_LABELS`, `DISCOURSE_RING_COLOR = '#b8651a'`; edge-grouping helpers (`groupDiscourseEdges`, `ge`); `discharge_status` renderer with polymorphic shape handling (`dischargeClass`, `renderDischargeStatus`); cross-layer pill renderers (`renderFCPill`, `renderDiscoursePill`, `renderNeighborPill`, `renderCellRefPills`); edge-row + section renderers (`renderEdgeRow`, `renderEdgeSection`); shared card-head chrome (`renderDiscourseCardHead`); five card renderers (`renderArchitectureCard`, `renderFrontierCard`, `renderTotalityCard`, `renderRegimeContentCard`, `renderProgramCard`); type-dispatcher (`renderDiscourseCard`); sidebar wiring (`renderSidebarDiscourse`, `wireDiscourseCardLinks`); selection state (`selectDiscourseNode`, `clearDiscourseSelection`); five catalogue list builders (`renderSidebarBrowseArchitectures` / `Frontiers` [grouped by structural_reason_category] / `Totalities` [grouped by empirical_status] / `RegimeContent` [alphabetical] / `Programs` [grouped by subtype]); multi-select spotlight sidebar panel (`renderSidebarSpotlight`); ring-highlight query helper (`isFCConnectedToSelectedDiscourse`). Untouched by Update C glossary. **Update C clickable edges:** one-line symmetric `state.selectedEdgeId = null` added to `selectDiscourseNode`.

**explorer-glossary.js** (~12 KB, **NEW in Update C glossary**) — module-local indexes (`GLOSSARY_ENTRIES`, `GLOSSARY_CATEGORIES`, `GLOSSARY_BY_SLUG`, `GLOSSARY_BY_TERM_LC`); `buildGlossaryIndexes()` called from `init()` after `augmentDataset` returns (reads `DATA.glossary.{categories,entries}`, annotates each entry with `_slug`, builds the four lookup tables, groups entries into category buckets in `order` ascending; defensive `_uncategorised` bucket if an entry references a category not declared in the canonical list); `lookupGlossaryEntry(termOrSlug)` accepting any of slug / term / alias / slugified term (case-insensitive); selection (`selectGlossaryTerm`, `clearGlossarySelection`) that also clears FC / cell / discourse selection symmetrically; `scrollGlossaryEntryIntoView(slug)` for deep-link boot and related-pill clicks; `renderSidebarGlossary(filter)` — the panel renderer with header counts, type-ahead search input, category-grouped entry rendering, and related-pill wiring; `renderGlossaryGroup` and `renderGlossaryEntry` helpers. Filter matches term ∪ aliases ∪ definition ∪ why_it_matters (case-insensitive substring). Related-pill rendering distinguishes in-glossary targets (clickable) from out-of-glossary references (rendered inert with explanatory `title`). **Update C clickable edges:** one-line symmetric `clearCrossClassEdgeSelection()` call added to `selectGlossaryTerm`.

**Map_v34_explorer.html** (~52 KB; was 72 KB before the typography pass's CSS extraction) — `<head>` + ~37 KB of inline `<style>` block containing base A.1 styles only (the Update B, Update C glossary, and Update C clickable-edges sections were extracted to dedicated `<link>`-loaded CSS files in the typography pass; pre-existing missing `}` at the Update B / Update C glossary boundary fixed incidentally during extraction) + body HTML (masthead, toolbar with peer catalogue buttons, body-grid with map-pane + splitter + sidebar including the **four-button quick-bar** [§ Glossary added between Phenomena and About], tooltip, help-overlay, toast) + five `<link>` tags in `<head>` (update-b.css, update-c.css, update-c-edges.css, KaTeX CDN CSS, update-c-typography.css — in that cascade order) + a KaTeX `<script>` (synchronous, **not** deferred — the deferred form races cached-data fetches) + the six explorer module `<script>` tags + the inline `<script>init();</script>`. Comfortably under the 65 KB soft cap. The HTML still contains the help-overlay help text — flagged outstanding follow-up: the help text says "8 phenomenon-to-phenomenon edges" but the live data has 7 (recorded under "Pre-existing follow-ups" near the end of this doc).

**update-b.css** (~16 KB) — discourse-layer styling: `.dx-card`, `.dx-pill` chrome for cards and pills; `.dc-edge`, `.edge-target` chrome for sidebar edges; `.discourse-highlight` ring on map tiles (outline + dashed inner via `::after`, deep amber `#b8651a` via `--discourse-ring`); spotlight panel (`.dx-spot-*`); rows-by dropdown (`.rowsby-button`, `.rowsby-menu`); six peer-button toolbar layout for the catalogues; sidebar Classifications panel chrome (`.sb-classif-*`).

**update-c.css** (~2 KB) — glossary panel styling: `.glossary-group`, `.glossary-entry`, `.glossary-term`, `.glossary-aliases`, `.glossary-field`, `.glossary-field-label`, `.glossary-field-body`, `.glossary-related-row`, `.glossary-related-pill` (with `.inert` variant for unknown related targets), `.glossary-entry.focused` accent for the deep-linked entry.

**update-c-edges.css** (~3.5 KB) — clickable-on-map-edges styling: `.pt-overlay-svg path.phen-phen-hit` and `.phen-phen-hit.arrow-hit` for wide transparent SVG hit-areas, `g.phen-phen-edge-group:hover path.phen-phen-edge` for the hover thickening, `.dc-edge.dc-edge-clickable` block-level hover/focus chrome inside FC cards, `.detail-card.xc-edge-card` with `.xc-edge-endpoints`, `.xc-edge-arrow`, `.xc-edge-meta`, `.xc-targeted-by`, `.xc-cells-grp`, `.xc-citation-list` for the cross-class edge card.

**update-c-typography.css** (~7.5 KB) — KaTeX integration + prose tuning + in-tile cell viz. KaTeX: `.katex { font-size: 1em }` so math matches surrounding prose weight, `.katex-display { text-align: center; overflow-x: auto }` so long display equations don't push the sidebar into horizontal scroll, `.katex-error` styling for the recoverable-malformed path, `vertical-align: -0.06em` on inline `.katex` to bring CMU baseline back to Crimson Pro's. Prose: `font-feature-settings: 'onum' 1, 'liga' 1, 'kern' 1` on `.dc-desc`, `.glossary-field-body`, `.dc-pred .pred-text`, `.ap-text` to enable Crimson Pro's old-style numerals (better in scholarly prose alongside math). In-tile cell viz: `.tile-cells-mini` flex container (max-width 94 px to fit inside the 110 px tile minus padding, `pointer-events: none` so it never intercepts clicks meant for the tile), `.tile-swatch` 8×8 px box base, plus encoding classes `.tile-swatch.empty / .has-realized-only / .has-confirmed / .has-tension / .has-not-tested / .has-retro / .has-falsified / .excluded` (excluded uses a diagonal `repeating-linear-gradient` hatch on paper-3 to visually distinguish "positive structural absence" from "no content authored yet").

### Cheat-sheet: what to edit for what

| Change | File |
|---|---|
| Add a new physical phenomenon | `explorer-phenomena.js` |
| Adjust a phenomenon category color | `explorer-phenomena.js` |
| Change zoom limits, pan margin, wheel-zoom step | `explorer-map.js` |
| Tweak tile size, row label, or any map-side layout | `Map_v34_explorer.html` (inline CSS — base A.1 styles still inline) |
| Edit About / Education / Research panel copy | `explorer-sidebar.js` |
| Change Browse dropdown contents or labels | `explorer-sidebar.js` (`buildBrowseMenu`) |
| Add a new sector or reorder sectors | `explorer-data.js` (`SECTOR_MAP` / `SECTOR_ORDER`) |
| Add a new classification symbol or short label | `explorer-data.js` (`SYMBOLS`) |
| Modify dataset parsing/augmentation | `explorer-data.js` (`augmentDataset`) |
| Change initial-load sidebar panel (currently About) | `explorer-sidebar.js` → `state.activePanel` |
| Adjust help-modal copy | `Map_v34_explorer.html` (HTML body) |
| Change boot sequence | `explorer-sidebar.js` → `init()` |
| Adjust a discourse-card layout (architecture / frontier / totality / regime / program) | `explorer-discourse.js` (the five `render*Card` functions) |
| Add a new discourse-edge type | `explorer-data.js` (`DISCOURSE_EDGE_TYPES`) + `explorer-discourse.js` (handling in card renderers) |
| Recolor the discourse-highlight ring | `update-b.css` (CSS `--discourse-ring`) and `explorer-discourse.js` (`DISCOURSE_RING_COLOR`) |
| Restyle discourse cards (`.dx-card`, `.dx-pill`, sections) | `update-b.css` |
| Change the spotlight-panel layout / status descriptions | `explorer-discourse.js` (`renderSidebarSpotlight`) |
| Add a new catalogue browse list (e.g. if a 7th node type is added) | `explorer-discourse.js` (new `renderSidebarBrowse*` function) + `explorer-sidebar.js` (`renderPanel` routing) + `Map_v34_explorer.html` (new `.discourse-tab` button) |
| Tweak the sidebar Classifications panel (search behavior, item layout) | `explorer-sidebar.js` (`renderSidebarBrowseClassifications`) |
| Adjust the glossary panel layout (sections, ordering, field rendering) | `explorer-glossary.js` (`renderSidebarGlossary`, `renderGlossaryGroup`, `renderGlossaryEntry`) |
| Change glossary entry-card styling (term emphasis, related-pill colours, focused-entry highlight) | `update-c.css` (`.glossary-entry`, `.glossary-field`, `.glossary-related-pill`) |
| Change which glossary fields render | `explorer-glossary.js` (`renderGlossaryEntry`) |
| Change glossary deep-link hash format | `explorer-data.js` (`parseHash` / `writeHash` — the `'glossary'` branch) |
| Tweak edge-card chrome or section ordering | `explorer-sidebar.js` (`renderSidebarCrossClassEdge`) |
| Restyle the edge card visuals (endpoints, pills, citations) | `update-c-edges.css` (`.xc-edge-card`, `.xc-edge-endpoints`, `.xc-edge-meta`, `.xc-cells-grp`, `.xc-citation-list`) |
| Tune SVG line hit-area width or arrow target size | `update-c-edges.css` (`.phen-phen-hit` stroke-width) + `explorer-phenomena.js` (arrow-hit triangle geometry constants `wHit`, `ahxHit`, `ahyHit`) |
| Recolor or restyle the visible phen↔phen line | `update-c-edges.css` (`.pt-overlay-svg path.phen-phen-edge`) |
| Change edge-card hash format | `explorer-data.js` (`parseHash` / `writeHash` — the `'edge'` branch) |
| Adjust math rendering (extend `formatPara` to handle a new delimiter, change KaTeX render options, etc.) | `explorer-data.js` (`formatPara`) |
| Adjust KaTeX math styling (font-size on inline vs. display, color inheritance, error-span chrome, baseline nudge) | `update-c-typography.css` (`.katex`, `.katex-display`, `.katex-error`) |
| Pin a different KaTeX version | `Map_v34_explorer.html` (`<link>` + `<script>` URLs and their SRI integrity hashes) |
| Change the prose font face | `Map_v34_explorer.html` (inline `<style>` `body { font-family: … }`) + revisit baseline nudge in `update-c-typography.css` |
| Add inline glossary cross-linking inside cell descriptions / discourse cards (deferred — see Update C remaining) | `explorer-data.js` (`formatPara` extension + alias scan index in `augmentDataset`) + `explorer-glossary.js` (click target resolution) |
| Adjust the in-tile cell mini-grid threshold | `explorer-map.js` (`MINI_GRID_THRESHOLD`) |
| Change swatch encoding priority or add a new content-state bucket | `explorer-map.js` (`cellSwatchClass` — the priority chain) + `update-c-typography.css` (`.tile-swatch.*` color rules) |
| Restyle the mini-grid layout or swatch size | `update-c-typography.css` (`.tile-cells-mini`, `.tile-swatch`) |
| Change the tooltip's cell-state breakdown line | `explorer-map.js` (`showTileTooltip` — the `cellBreakdownHtml` block) |

---

## What was built in Update B

Concise reference for what shipped, kept here so future chats know which design decisions are locked in vs. open to revisit.

**Goals shipped.** Discourse layer rendered (all 41 non-FC nodes are now reachable through the sidebar with detail cards); ~89 discourse-layer edges now navigable through the cards; six-peer-button toolbar architecture making catalogue navigation first-class; the toolbar's old chip groups for rows-by and spotlight consolidated into a button + dropdown and a button + sidebar-panel respectively; multi-select spotlight replacing the single-value highlight; the amber discourse-highlight ring on FC tiles connected to the selected discourse node.

**Discourse cards.** One per node type, sharing a chrome (breadcrumb + type label + name + full name + header pills). Sections in each card are driven by the edges incident to the node — only edges that exist render their section. The card renderers handle the polymorphic shape of `discharge_status` (sometimes a string, sometimes a `{ local, global, universal }`-style object, sometimes carrying a `subclaim_examples` sub-object) by routing through `renderDischargeStatus`. Cross-layer pills (FC ↔ discourse) make every neighbor in an edge clickable; `cell_refs` arrays render as monospace pill rows that jump straight into the cell card.

**Six-peer-button toolbar.** Catalogue navigation is first-class. Buttons in order: `☰ Classifications`, `⌬ Architectures`, `✕ Frontiers`, `◇ Totalities`, `▣ Regime`, `⚙ Programs`. Each opens its sidebar catalogue panel directly via `switchSidebarPanel('browse-<type>')`. Active state is the inverted-fill style matching other toolbar buttons. The Browse dropdown is back to five MAP-only tabs (Phenomena / Legend / About / Education / Research) — Browse is the navigator for non-data panels; catalogues are their own thing.

**Discourse-highlight ring.** Selecting any discourse node lights up the FCs it connects to with `outline: 2px solid var(--discourse-ring)` (deep amber, `#b8651a`) on the tile, plus a dashed inner stroke via the `::after` pseudo-element. Composes with the multi-ring phenomena box-shadow without color collision because outline ≠ box-shadow in the cascade.

**Multi-select spotlight panel.** Five status rows (`confirmed` / `unconfirmed-tension` / `unconfirmed-not-yet-tested` / `falsified` / `retro-explanatory-only`) with independent toggles, a count per status (computed live from `yield_stats`), and `all on` / `all off` buttons. `state.spotlightActive` is a `Set<string>`. Empty set = no spotlight; non-empty = dim every tile whose `yield_stats` doesn't intersect, spot every tile that does. The old `?highlight=falsified` URL format is back-compat: it parses into a one-element Set.

**Hash routing extensions.** `#/discourse/<id>` for selected discourse nodes; `?spotlight=k1,k2,...` for the multi-select set; back-compat `?highlight=k` parses into one-element Set.

**Decisions locked in by this build:**
- Catalogue buttons are toolbar peers, not nested inside Browse. (The B implementation originally tried the nested-in-Browse design; it got revised once visible.)
- Discourse cards drop empty sections (`hideWhenEmpty: true`) rather than rendering "no entries" stubs.
- `discharge_status` polymorphism handled in the renderer, not in the data — the dataset keeps the variation intentional.
- Frontier cards put `structural_reason_category` in the header pills (prominent), which directly satisfies the §8 "Distinctive" condition in `PROJECT_GOAL.md` (cross-frontier formal-content comparison reads off the grouped catalogue at a glance).

**Smoke test from the B build is preserved in /home/claude workspace style but not in the repo** (kept as dev-only). Pattern documented in the "Smoke testing under JSDOM" subsection of "Working norms" below.

---

## What was built in Update C — glossary panel

Concise reference for what shipped in the first Update C item.

**Goal shipped.** The 22 glossary entries that live in `data/Map_v34_consolidated.json` under `glossary.entries` — previously surfaced nowhere — are now first-class navigable content. The terms are *map-internal vocabulary*: Architecture / Regime content / Open frontier / structural-reason categories (organizing-structure failure, apparatus-mechanism failure, reach termination, bridge failure, cross-architecture non-sharing, solvability failure, interpretive underdetermination) / Empirical & discharge status / Mathematical languages / Stratum / Loose end / Candidate targeting / Family / etc. Five categories sorted by `order` ascending; an `_uncategorised` bucket exists defensively for entries that point at a not-yet-declared category.

**Two entry points.** A 4th sidebar quick-bar button (`§ Glossary`) between Phenomena and About; a 6th Browse-menu tab between Legend and About. The handoff sketch lean was "probably do both — quick-bar primary, Browse-tab secondary." That call held — both surfaces ship in the same build.

**Entry-card layout.** Each entry renders term + aliases caption + three labeled prose fields (`Definition` / `Why it matters` / `Example`) + a `Related` row of clickable pills. Pills resolve case-insensitively against term ∪ aliases; an in-glossary target is clickable and navigates within the panel, an unknown target renders inert with an explanatory `title`. The focused entry (set by deep-link, related-pill click, or `selectGlossaryTerm`) gets a `border-left` accent and a paper-3 background tint.

**Type-ahead filter.** Single search input at the panel head, debounced re-render. Matches across term ∪ aliases ∪ definition ∪ why_it_matters (case-insensitive substring). Filtering applies *within each category group* so the group structure stays visible — empty groups drop out of view.

**Hash routing.** `#/glossary` opens the panel; `#/glossary/<slug>` deep-links to a specific entry (it scrolls into view + gets the `.focused` chrome on first render). Slug is `term.toLowerCase().replace(/[^a-z0-9]+/g,'-').strip('-')` — stable across reloads. `selectGlossaryTerm(termOrSlug)` is exposed as a global so a future inline-cross-linker can call it from `formatPara`.

**Decisions locked in by this build:**
- Glossary is its own module (`explorer-glossary.js`, seventh file), not folded into `explorer-discourse.js`. The discourse module is thematically unrelated and was already 37 KB.
- No sticky category-jump rail — five in-flow `dx-browse-group-head` headers + the type-ahead filter cover the navigation case adequately for 22 entries.
- Field labels use plain English (`Definition` / `Why it matters` / `Example`) rather than coining presentation terms. The labels mirror the data's own key names. Aligns with the "use physics vocabulary as much as possible" working norm.

**What's deferred from this pass — inline term-cross-linking.** Making glossary terms clickable inline inside cell descriptions and discourse-card prose was deferred. The targets are *meta-vocabulary*, not physics-vocabulary — aliases would fire on words like "architecture," "discharge," "stratum," "candidate-foundational," which already appear as prominent labels and header pills in the discourse cards. Whether the inline links would compete with the existing chrome (rather than add to it) is a real UI question that benefits from talking against the shipped panel before deciding. The build-time index in `augmentDataset` and the `formatPara` extension are cheap when needed; the deferral is about the design call, not the cost.

**Smoke test (dev-only, not in repo).** 46-assertion JSDOM run against a stub dataset that includes 5 glossary entries across 2 categories + 1 orphan, exercising slug stability, index population, lookup-by-slug/term/alias, panel routing, type-ahead filter, related-pill clicks, inert pills (unknown related target), hash routing both directions, clearSelection / switchSidebarPanel integration, regression on FC + discourse selection. Plus a real-data verification pass against v34 (22 entries / 5 categories / category ordering / related-pill resolution).

---

## What was built in Update C — clickable on-map edges

Concise reference for what shipped in the second Update C item.

**Goal shipped.** Cross-classification edges in v34 carry `citations` (1–4 per edge), `cell_refs` (2–7 per edge on the 87 of 97 that have them), full description prose (3–6 sentences typical), and sometimes `targeted_by` (23 of 97 edges, mostly conjectured/aspired). All of this was buried in the JSON with no UI surface. Now two click surfaces — phen↔phen overlay arrows on the map and `dc-edge` blocks inside FC cards — both open a sidebar edge card that surfaces everything. Hash routing `#/edge/<edge-id>` for deep-links.

**Two click surfaces, one card.**

1. **Phen↔phen overlay.** Each of the 7 phenomenon↔phenomenon edges draws as a curved spline + arrow head. In the new structure each edge renders as a `<g class="phen-phen-edge-group" data-edge-id>` containing 4 paths: 2 transparent wide hit-areas (stroke-width 14 on the spline, slightly-enlarged invisible triangle for the arrow with `pointer-events: fill`) and 2 visible thin paths (stroke-width 1.6, arrow with fill). Group `:hover` thickens the visible line to 3.6, so visual feedback fires anywhere within the hit area, not just on the 1.6 px stroke. `svg.onclick` is idempotent click delegation that resolves `data-edge-id` via `closest()` — re-running `drawPhenPhenOverlay` replaces any prior handler instead of stacking duplicates.

2. **dc-edge in FC card.** Every cross-classification edge listed in the FC card is wrapped in `role="button" tabindex="0"` `.dc-edge-clickable`, with click + Enter/Space handlers calling `selectCrossClassEdge`. The inner `.edge-target` neighbor-jump link short-circuits via `stopPropagation` so the existing one-click navigation to the neighbor FC still works.

**Edge card layout.**
- Breadcrumb + × close button.
- Header: from-FC pill → arrow glyph → to-FC pill (FC pills are clickable via the existing `renderFCPill` helper from `explorer-discourse.js`).
- Meta row: subtype pill + status pill (status absent for bijection edges — renders without).
- `targeted_by` row when present.
- Description prose via `formatPara`.
- Cells section: one pill group headed by the from-FC pill, since v34 convention puts all `cell_refs` on the from-side. The "mixed-prefix" cases (`cell-ti-*` vs `cell-tsc-*` vs `cell-mzm-*` etc.) are all distinct prefix conventions WITHIN the same from-FC, not multi-endpoint refs.
- Citations: monospace bulleted list with subtle `·` markers, 1–4 entries typical.

**Decisions locked in by this build:**

- **Cell-refs grouped under the from-FC pill, not split per endpoint.** Verified empirically across all 97 cross-class edges that `cell_refs` always belongs to `from`. If a future schema bump introduces to-side refs, this renderer extends; no change needed until then. Recorded in lessons below.
- **Wide invisible hit-areas via the `<g>`-with-two-paths pattern is the standard for SVG line clickability.** CSS `g.phen-phen-edge-group:hover path.phen-phen-edge` propagates hover from any child to the visible stroke. Click target effective width ~14 px around the visible 1.6 px line.
- **SVG `z-index: 5` sits above tile `:hover` at z-index 2.** Crucial — a z-index-1 SVG vanishes behind a hovered tile, making lines unclickable wherever they visually cross a tile. Tiles still catch clicks/hover everywhere except on the path strokes themselves (`pointer-events: none` on the SVG parent, `pointer-events: stroke` on hit paths).
- **`.edge-target` `stopPropagation` preserves the one-click neighbor jump inside `dc-edge` blocks.** Whole-dc-edge click opens the card; click-on-the-text-label jumps to the neighbor FC. Both flows tested.
- **Edge card renderer lives in `explorer-sidebar.js`, not a new module.** The renderer is generic across all 97 cross-class edges (not phen↔phen-specific), so it belongs with the other sidebar renderers. No eighth file.
- **No tooltips on lines.** The click opens the card, which has the prose. A tooltip would compete with the card's content surface.

**State + hash routing additions.**
- `state.selectedEdgeId: string | null` added to the singleton.
- `state.activePanel` extended with `'edge'`.
- `parseHash` branch: `parts[0] === 'edge'` sets `state.selectedEdgeId` and `state.activePanel = 'edge'`.
- `writeHash` precedence: `selectedFC` > `selectedEdgeId` > `selectedDiscourseNode` > glossary. Hash format `#/edge/<edge-id>`.
- Symmetric clears wired across `selectFC`, `selectCell`, `selectDiscourseNode`, `selectGlossaryTerm`, `clearSelection`, `switchSidebarPanel`. Each sets `selectedEdgeId = null` directly (or calls `clearCrossClassEdgeSelection`).
- `renderAll` boot branch: if hash had `#/edge/<id>`, restore by looking up `DATA.cross_class_edges_by_id[id]` and rendering. Edge restore wins over discourse/glossary restore when set.

**Data layer additions in `augmentDataset`.**
- `cross_class_edges_by_id` map: full edge records keyed by id (97 entries in v34). Used by `renderSidebarCrossClassEdge` and the hash-restore path.
- `edges_by_fc` and `phen_phen_edges` entries now carry edge `id` so click delegation can resolve without a separate lookup. Compact references (`{ direction, id, from, to, subtype, status, description }`) — citations and cell_refs live once in `cross_class_edges_by_id`, not duplicated per FC's edge list.

**Smoke test (dev-only, not in repo).** 91-assertion JSDOM run against a stub dataset that includes 5 cross-class edges: one with full payload (cell_refs + citations + status), one with no `cell_refs` (renders without Cells section), one bijection-shaped (no `status` field — renders without status pill), one with `targeted_by` (renders the targeting pills), and one phen-to-structural (excluded from `phen_phen_edges`). Exercises `cross_class_edges_by_id` population, edge-id propagation through `edges_by_fc` and `phen_phen_edges`, `<g>`-group structure (4 groups, 8 hit-area paths, 8 visible paths), click delegation via hit-areas + arrow triangles, dc-edge keyboard navigation (Enter / Space), `.edge-target` `stopPropagation`, edge-card rendering across all field combinations, hash routing both directions, deep-link boot via `renderAll`, symmetric clears, overlay re-draw not stacking handlers, `writeHash` precedence. 91/91 against the stub. **The 91 floor becomes the new cumulative smoke-test floor for future extending passes** (replaces Update B's 80 floor).

**What's deferred from this pass — discourse-highlight ring badges.** A small clickable corner-of-tile element on FCs lit up by a discourse-node selection, opening a card that explains why this FC connects to the selected discourse node. The xc-edge-card chrome built here (header pills + structured sections + cell-ref pills + citations) is directly reusable; only the trigger and card content differ. Carry forward in a future pass — Update C remaining lists it.

---

## What was built in Update C — typography pass

Concise reference for what shipped, plus the same-day follow-up patch that addressed the v34 escape inconsistency.

**Goal shipped.** Math notation in the discourse-layer prose now renders as proper typeset mathematics instead of raw LaTeX markup. The strong-CP problem's `$\bar\theta_{\mathrm{QCD}} G \tilde G$` reads as θ̄_QCD G G̃ on the page; the electroweak sector's `$SU(2)_L \times U(1)_Y$` reads with proper italics and the times symbol; the cosmological constant's `$\Lambda \sim 10^{-122}$` reads with a proper lambda. Math fields scattered across sm-electroweak, qcd, higgs, hierarchy-problem, strong-cp-problem, flavor-puzzle, matter-antimatter-asymmetry, the cosmological-constant frontier, koide-formula, muon-g-2, and the loose_ends inside several other discourse nodes all light up cleanly.

**KaTeX strategy.** CDN-at-runtime, pinned to **0.16.47** (the latest stable as of May 2026), with SRI integrity hashes on both the `<link>` and `<script>` tags. The CSS file lives at `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css` with `integrity="sha384-nH0MfJ44wi1dd7w6jinlyBgljjS8EJAh2JBoRad8a3VDw2K69vfaaqm4WnR+gXtA"`; the JS at `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.js` with `integrity="sha384-CwjPRVHTvLiMBFjEoij+QZViMV5rhTOIp7CJzl24JEqpRDA1sJFHVXXLURktbYYp"`. Both carry `crossorigin="anonymous"`. SRI guards against CDN compromise: if jsdelivr ever serves modified bytes the browser refuses the file and the explorer's offline-fallback path kicks in instead of silently loading tampered math. Server-side rendering at augment time was considered and rejected — it would require Node.js in the maintainer's deploy loop, which violates the no-local-terminal norm.

**formatPara extension.** Two-pass extraction in `explorer-data.js`: display math `/\$\$([\s\S]+?)\$\$/g` first (greedy on internals, non-greedy on delimiters so `$$..$$` doesn't swallow adjacent `$..$..$..$`), then inline math `/\$([^$\n]+?)\$/g` (no newlines, non-greedy). Each match becomes a `\x00MATHn\x01` placeholder which `esc()` leaves untouched; placeholders are substituted back with `katex.renderToString({ throwOnError: false, displayMode: <bool>, output: 'html', strict: 'ignore' })`. `throwOnError: false` means a malformed expression renders as a red marked-up source span (KaTeX's recoverable-error path) instead of throwing. Defensive `try/catch` around the call as a backstop in case KaTeX itself throws despite `throwOnError: false`. **Offline fallback** when `typeof katex === 'undefined'`: emits `<code class="math-unrendered">` for inline, `<div class="math-unrendered">` for display, with the LaTeX source visible. Used by JSDOM smoke tests (the real KaTeX never loads in JSDOM) and graceful degradation on CDN failures.

**v34 escape normalization.** Same-day follow-up after deploy when the maintainer reported the strong-CP card rendering "theta" as literal text. Investigation against the canonical JSON file found that **the v34 dataset has inconsistent escape levels in math fields**. After `JSON.parse`, the JS string in memory holds:
  - **One backslash** in `equations[].latex` fields (e.g. `\sin^2\theta_W = …`) and in `architecture_level_edges[].description` fields — KaTeX renders these correctly out of the box
  - **Two backslashes** in `description` fields on regime-content / open-frontier / totality-approach nodes and in `loose_ends[].description` fields (e.g. `\\bar\\theta_{\\mathrm{QCD}}`) — KaTeX interprets `\\` as the LaTeX line-break command, so `\\theta` renders as line-break-then-text-"theta"
  - **Zero backslashes** in cells that use Unicode directly (mostly FC cell content and predictions): Δ_σ, π⁰, ν̄, etc.

Fix: one-line `latex.replace(/\\\\/g, '\\')` inside the math-segment handler in `formatPara`, applied to each extracted math chunk before KaTeX sees it. Idempotent on already-correctly-escaped strings; corrective on double-escaped strings. Safe across v34 because there's **zero `$$...$$` display math in the dataset** — so `\\` (which in LaTeX would be a legitimate line-break-in-displayed-math command) cannot be the intentional meaning of anything in v34. Verified by enumerating every `$…$` and `$$…$$` chunk in the 1.4 MB JSON file: no chunk has triple-backslash that would defeat single-pass collapse.

**defer removed.** The KaTeX `<script>` initially had `defer`. On reloads with cached `Map_v34_consolidated.json`, `fetchCanonicalData()` resolves from disk cache before the deferred script downloads from the CDN. The explorer's inline `init()` runs at end-of-parse and immediately calls discourse-card renderers that invoke `formatPara` — if `katex` isn't defined yet, formatPara hits the offline fallback. Removing `defer` makes the load synchronous: ~30–50 ms additional first-paint cost on a cold CDN connection, but `katex` is guaranteed defined before `init()` runs. Right tradeoff for an explorer where math is the content.

**CSS extraction.** Same commit extracted the inline `<style>` block into four files. The handoff had been carrying a recommendation since the clickable-edges pass that the HTML was 7 KB over its 65 KB soft cap (it had grown to 72 KB) and that the typography pass would add more CSS (KaTeX overrides + body face) — so doing the extraction in the same commit prevented further drift. New files:
- `update-b.css` (16 KB) — discourse-layer styles
- `update-c.css` (2 KB) — glossary panel
- `update-c-edges.css` (3.5 KB) — clickable on-map edges
- `update-c-typography.css` (4.7 KB at this pass; later grew to 7.5 KB with the in-tile cell viz additions) — KaTeX overrides + prose tuning

HTML dropped from 72 KB to 52 KB. Cascade order: inline base A.1 → update-b → update-c → update-c-edges → KaTeX defaults → update-c-typography (last to override KaTeX). **Pre-existing missing `}`** at the `.pt-tile.discourse-highlight::after` rule (the Update B / Update C glossary boundary in the original inline block) found and fixed during extraction; modern browser CSS parsers had been auto-recovering, but it was a real bug. Documented under the lessons section.

**Body face.** The handoff's lean had been "Crimson Pro" — but inspection of the live HTML before the pass found `body { font-family: 'Crimson Pro', Georgia, serif }` was already set; prose surfaces (`.dc-desc`, `.glossary-field-body`, `.dc-pred .pred-text`) all inherit it. The handoff prose suggesting otherwise had gone stale. Real work needed was integration tuning: `.katex { font-size: 1em }` so math doesn't outrank surrounding text, `vertical-align: -0.06em` on inline `.katex` to bring KaTeX's CMU baseline back to Crimson Pro's text baseline, `font-feature-settings: 'onum' 1` on prose surfaces to switch to old-style numerals (which read better in scholarly prose next to math), and `.katex-display { text-align: center; overflow-x: auto }` so a long display equation doesn't push the whole sidebar into horizontal scroll.

**Decisions locked in by this build:**

- **CDN with SRI, pinned to 0.16.47.** Server-side render rejected on no-local-terminal grounds.
- **`formatPara` extended; no new render path added.** `equations[].latex` fields on regime-content nodes are pure-LaTeX (no `$…$` delimiters) and currently aren't rendered in the explorer at all; adding a renderer would be a feature, not a typography concern. Punted.
- **`\\` → `\` collapse safe across v34.** No `$$…$$` in the dataset; no triple-backslash patterns. Re-evaluate if Step 5 PRs start adding display math.
- **KaTeX `<script>` synchronous, not deferred.** Race-condition fix.
- **CSS extraction done in same commit as KaTeX.** Prevented HTML drift; reset the brace-balance state to known-clean.
- **Body face untouched.** Crimson Pro was already there; only integration tuning was needed.

**Smoke test (dev-only, not in repo).** 123 assertions (then 129 after the escape-normalization patch added the v34-escape-collapse coverage). Sections: HTML head structure + KaTeX runtime tags + canonical SRI hashes + CSS link order; brace balance per CSS file; `formatPara` with inline math via stubbed `window.katex` (`renderToString` returns synthetic `<span class="katex">…</span>`); display math; math-free strings passing through unchanged; malformed math (recoverable red span); multi-segment ordering preserved; placeholder leaks (`\x00`/`\x01`/`MATHn`) prevented; fallback path when `katex` undefined; HTML safety (no XSS via LaTeX content); real v34 sample strings (`SU(2)_L \\times U(1)_Y`, `m_H \\approx 125.25`, `\\bar\\theta_{\\mathrm{QCD}}`, etc.); corner cases (currency-style isolated `$`, empty math, math at paragraph boundaries, math followed by hard newline); escape normalization (double-escape collapses, single-escape passes through, idempotent, applies inside display math); regression that `formatPara` stays globally scoped (`function` declaration, not `let`/`const`); CSS extraction completeness (each extracted selector present in target file AND absent from inline); inline base CSS rules still present after extraction; pre-existing missing-brace fix verified. **129 floor at the end of this pass** (raised again to 169 by in-tile cell viz; see next section).

**End-to-end real-data verification (not in the smoke test, run as a separate sanity check).** Loaded the actual `Map_v34_consolidated.json`, picked the strong-cp-problem description, ran it through `formatPara` with a recording-stub for `katex.renderToString`, and confirmed all four math chunks normalized to correct single-backslash LaTeX (`\bar\theta_{\mathrm{QCD}} G \tilde G`, `\bar\theta_{\mathrm{QCD}} < 10^{-10}`, `\bar\theta_{\mathrm{QCD}}`, `\bar\theta_{\mathrm{QCD}}`). The same script can be re-run as a regression check on any future v34 update.

---

## What was built in Update C — in-tile cell viz

Concise reference for the smallest of the Update C items.

**Goal shipped.** Each FC tile with `cell_count ≤ 20` (27 of 30 FCs) gains a small grid of 8×8 px swatches between the tile's name and yield bar, one swatch per cell, color-encoded by content-state. The map's empirical density becomes visible at a glance instead of being summarized only by the existing yield-bar count. modified-gravity-alternatives' 5 falsified cells, dark-matter-candidates' 0-confirmed status, the four math-only ADE FCs' all-empty grids — all readable without clicking into the sidebar.

**Threshold.** `MINI_GRID_THRESHOLD = 20` excludes the three largest FCs (sm-rep-content 36, tenfold-way 30, freed-hopkins-cobordism 25). At those sizes the swatches become noise rather than signal — the tile's existing `Nc · Np` corner display stays the only summary.

**Color encoding.** Eight buckets by `cellSwatchClass(cell, fc)`, priority high → low:
1. `excluded` — diagonal-hatch on paper-3 (positive structural absence, distinguished visually from "empty")
2. `has-falsified` — `--st-falsified` solid (red — attention-grabbing)
3. `has-confirmed` — `--st-confirmed` solid (green)
4. `has-tension` — `--st-tension` solid (amber)
5. `has-not-tested` — `--st-not-tested` solid (gray)
6. `has-retro` — `--st-retro` solid (purple)
7. `has-realized-only` — `--ink-faint` solid (cell populated but no live prediction)
8. `empty` — paper-3 with faint border (cell exists in classification but has no authored content)

A cell qualifying for multiple buckets wins the highest-priority one. So a cell with both a confirmed and a falsified prediction shows as `has-falsified`; an `excluded` cell beats everything else (rare data shape but defensive).

**Detection logic.** `structurally-excluded` checked via both the legacy string sentinel (`cell.content === 'structurally-excluded'`) and the explicit boolean (`cell.structurally_excluded === true`); v34 has cells with one, the other, or both. Predictions gathered from both inline (`cell.predictions`, ~14 cells in v34) and FC-level (`fc.predictions` filtered by `cell_ref === cell.cell_id || cell_id === cell.cell_id`). Status set computed across the union.

**Tooltip extension.** The tile-hover tooltip currently shows `${cell_count} cells · ${prediction_count} predictions` plus the existing prediction-status counts. For tiles with mini-grids, a third body line is added: `cells: 5 confirmed · 4 realized · 2 structurally excluded` (or whatever applies, drawn from `tileCellBreakdown(fc)`). Lets the reader decode the colors at a glance.

**Layout.** `display: flex; flex-wrap: wrap; gap: 1px`, max-width 94 px (fits inside the 110 px tile minus its 16 px padding). 8 px swatches with 1 px gaps means 10 per row (10×8 + 9×1 = 89 px); 18-20 cell FCs wrap to two rows. Tiles' `min-height: 124px` was a floor, not a fixed dimension, so rows naturally grow taller to accommodate. CSS grid was considered and rejected — `grid-template-columns: repeat(auto-fit, 8px)` left-aligns by default, and the swatch order is meaningful (matches `fc.cells[]` order from the canonical dataset), so flex with left-justify cleanly preserves that. `pointer-events: none` on the grid container so it never intercepts the tile's whole-element click or hover.

**Accessibility.** `aria-hidden="true"` on `.tile-cells-mini` because the swatches are decorative; the tooltip carries the meaning. Tile keeps its `aria-label="${fc.label}"`.

**Decisions locked in by this build:**

- **Threshold 20.** Captures 27 of 30 FCs. Three excluded FCs at 25, 30, 36 cells (sm-rep-content, tenfold-way, freed-hopkins-cobordism).
- **Swatches in `update-c-typography.css`, no eighth CSS file.** The mini-grid is structurally a cousin to the typography pass (both Update C presentation-layer additions); the rule set is small (~15 selectors). Spawning a fifth CSS file for it would have been file overhead.
- **No click handlers on individual swatches.** Would conflict with the existing whole-tile click that opens the FC sidebar. Future pass could add per-swatch click + tooltip if it earns its complexity, but that's a separate design decision.
- **No per-swatch tooltips.** Tile-level tooltip carries the meaning via the breakdown line.
- **Flex over grid for the container.** Left-align preserves dataset cell order, which is semantically meaningful.
- **`excluded` is hatched, not solid.** Visually distinguishes positive structural absence from "no content authored yet" (the `empty` bucket).

**Real-data sanity check across all 30 FCs.** Loaded `Map_v34_consolidated.json`, ran `tileCellBreakdown` on every FC, verified the sum of bucket counts equals `fc.cells.length`. Output surfaces several structural findings worth flagging:

- **modified-gravity-alternatives (16 cells): exc=0 fal=5 con=3 nt=2 real=6** — 5 falsified cells is the standout falsification cluster on the map. Most empirical bounds in the modified-gravity space are dead theories.
- **dark-matter-candidates (18 cells): fal=4 ten=3 nt=3 real=8 con=0** — zero confirmed cells. The dark-matter empirical situation summarized in eighteen 8-pixel squares.
- **ade-su2-subgroups / ade-du-val / ade-modular-invariants / ade-quivers (5 cells each, all empty)** — the four math-only ADE FCs render as all-empty grids. Real finding: these FCs have cell axes (Cartan types A, D, E6, E7, E8) but no `content` or `realized_examples` populated. Visual surface for the "doubly-orphaned ADE clique" observation from `MAP_v21_findings.md` §3.
- **sm-rep-content (36 cells, count-only): exc=17 con=6 real=13** — the 17 structurally-excluded cells (Mendeleev-style empty cells in the SM particle table) would be visually obvious if the tile gained a mini-grid; worth revisiting the threshold if other large FCs accumulate similar structural-absence patterns.
- **proton-decay-searches (17 cells): fal=1 con=2 ten=2 nt=4 retro=1 real=7** — the entire experimental state of GUT predictions, with one falsification (minimal Georgi-Glashow SU(5)) sitting amid the rest. Specific cell-state values worth screenshotting for any Step 5 outreach copy.

**Smoke test (dev-only, not in repo).** 169-assertion floor (replaces typography's 129). New section "renderTile — in-tile cell mini-grid" with 40 assertions: helper exports, `MINI_GRID_THRESHOLD === 20`, priority resolution across all eight encoding classes, structurally-excluded detection via both string sentinel and boolean, FC-level vs cell-level prediction merging, threshold edges (5 / 20 / 25 / 36 / 0), document-order placement (`tile-name` < `tile-cells-mini` < `tile-yield`), aria-hidden on the grid, breakdown bucket counts, CSS selectors present, `pointer-events: none` guard.

---

## Update C — remaining

One item remaining: **discourse-highlight ring badges**. Independent, shippable in one chat. Sketch follows.

### Discourse-highlight ring badges

A small clickable corner-of-tile element on FCs that are currently lit up by a selected discourse node (architecture / frontier / totality / regime-content / program), opening a card that explains *why* this FC connects to the selected discourse node — i.e. surfaces the discourse-edge metadata that's currently only reachable by going to the discourse-card sidebar and looking through the cell-ref pills.

**Reuses the xc-edge-card chrome from clickable on-map edges:** header pills (from = discourse pill, to = FC pill), structured sections (description, cell-ref pills, citations). Only new parts are (a) the trigger surface — a small badge in the corner of the FC tile — and (b) the card content, which pulls from the discourse-edge object rather than the cross-class-edge object.

**Files to touch.** `explorer-discourse.js` (the badge-render hook + the new card content), `explorer-sidebar.js` (a new renderer that shares chrome with `renderSidebarCrossClassEdge`), `update-c-typography.css` or a new tiny file for badge positioning + chrome.

**Trigger interaction.** Click on a badge opens a sidebar card explaining the edge. The whole-tile click should still open the FC sidebar (existing behavior). Use `event.stopPropagation()` on the badge click handler — the same pattern as `.edge-target` inside `dc-edge` cards.

**Empty-state.** Badges appear only when a discourse node is selected AND the FC has a discourse-edge to it. When no discourse node is selected, no badges anywhere on the map.

**Smoke-test floor for that pass.** 169 + ~10 new assertions (badge presence/absence by selection state, click delegation, card content drawn from the right discourse-edge, stopPropagation preserves whole-tile click).

Comparable size to in-tile cell viz. One chat, two-three files, well under 30K tokens output.

---

## Step 5 — review pathway (live, unblocked)

Now that Update B has shipped a navigable discourse layer, the explorer is ready for working physicists to review without explanation overhead. Step 5 opens the review pathway. Three deliverables, in priority order:

1. **`/methodology/EDITORIAL.md`** — describes the editorial process. Who can propose changes (anyone via PR); who decides contested-status flagging; how cross-classification disagreements get arbitrated; expected turnaround on PRs; what kinds of changes require subfield-specialist review vs maintainer review. Builds on the firewall methodology in `META_v21_1_methodology_firewall.md`.

2. **GitHub Issues templates** in `.github/ISSUE_TEMPLATE/`. Three templates initially: cell-erratum (a specific cell content is wrong); new-FC proposal (a sector needs a structural or phenomenon FC that isn't there); cross-class edge proposal (an unrecorded connection between two FCs). Each template has a structured form so non-developer-but-developer-adjacent physicists can file without learning the schema.

3. **Outreach copy + the live explorer link** sent to 2–3 working physicists in different subfields. Subfield diversity is the load-bearing condition — getting a particle-physicist, a cond-mat theorist, and a high-energy-experimentalist (say) reading the same explorer surfaces incoherences across-sector that any single reader would miss. Outreach copy probably lives in `/methodology/OUTREACH_TEMPLATE.md`; the live link is unchanged.

Step 5 is text-and-process work, not code. A fresh chat handles it cleanly; no need to maintain Update C context in the same session.

---

## Working norms

### Non-developer maintenance

The maintainer doesn't write code, doesn't run a terminal, doesn't have local Node.js, doesn't use git CLI. All deployment happens via the GitHub web UI — `Add file → Upload files → drag → commit`. Every instruction in this build must end in something the maintainer can click. Phrases like "run the test suite" or "push to a branch" need to be replaced with explicit web-UI steps.

### Deployment via delete-and-replace

The cleanest way to upload a new set of explorer files: navigate to `/explorer/` in the repo, delete every existing file in the folder (including stray duplicates from earlier uploads, like `Map_v34_explorer (1).html`), then upload all the new files in one commit. This avoids the "modified vs added" confusion when filenames overlap and guarantees no orphan files persist. The trade-off is that GitHub's file-history view will show "deleted, then re-added" rather than "modified," but the canonical history is the commit log, which is intact either way.

For small changes that touch only 1–3 files, a partial upload (overwriting only the changed files) is fine and faster.

### File size cap

Each module targets ≤ 60 KB. HTML skeleton ≤ 65 KB (currently **~52 KB** after the typography pass extracted three CSS chunks from the inline block — comfortably under the cap). The four CSS files are each well under the same target (`update-b.css` 16 KB, `update-c.css` 2 KB, `update-c-edges.css` 3.5 KB, `update-c-typography.css` 7.5 KB). If a single file approaches its cap, split it further. The monolith broke down at ~150 KB; modules feel comfortable up to ~60 KB. CSS files probably comfortable up to ~30 KB; beyond that, split by concern.

### Smoke testing under JSDOM

When an edit is made to the explorer, run a Node.js + JSDOM script that loads the HTML with a stub dataset (3 classifications minimum + 2–3 discourse nodes to exercise both layers), then exercises new features programmatically. Check the DOM for expected elements, simulate selections, verify state updates. Catches integration errors a syntax check misses.

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
for (const f of ['explorer-data.js','explorer-map.js','explorer-sidebar.js','explorer-phenomena.js','explorer-discourse.js','explorer-glossary.js']) {
  vm.runInContext(fs.readFileSync(path.join(BUILD, f), 'utf8'), ctx, { filename: f });
}
await ctx.init();
// ...then assert on the DOM.
```

Notes:
- `runScripts: 'outside-only'` + manual `vm.runInContext` rather than `runScripts: 'dangerously'` with `<script src>` because JSDOM can't fetch sibling files from the local filesystem the way a browser would.
- **JSDOM's Set is a different constructor than the test runner's Set.** `state.spotlightActive instanceof Set` returns `false` from the runner's perspective even though it IS a Set inside the JSDOM context. Use duck-typing instead: `state.spotlightActive.constructor.name === 'Set'`.
- **JSDOM polyfills accumulate.** Update B needed `CSS.escape`. Update C glossary added `Element.prototype.scrollIntoView` (no-op stub is fine for testing). Update C clickable edges added no new polyfills. Update C typography added a `window.katex` stub (synthetic `renderToString` returning a recognisable `<span class="katex">…</span>` wrapper) so smoke tests run offline without loading the real ~280 KB CDN payload. Update C in-tile cell viz added no new polyfills but did add a state-singleton stub (`window.state = { selectedFC: null, spotlightActive: new Set(), phenomenaActive: new Set() }`) since `renderTile` reads from it. Future passes should expect to add at least one more such stub. Use guarded `if (!window.X) window.X = …` so polyfills are idempotent.
- Update B's smoke test had 80 assertions; Update C glossary added 46 against a narrower stub; Update C clickable on-map edges landed at 91 against a comprehensive stub; Update C typography pass landed at 123 then 129 after the escape-normalization patch; Update C in-tile cell viz landed at 169. **Treat 169 as the cumulative floor when extending** — replaces all prior floors.
- For passes that render dataset content (typography, in-tile cell viz), supplement the synthetic-stub smoke test with a small end-to-end real-data sanity check: load the actual `Map_v34_consolidated.json` and run the new renderer/helper across the full dataset. Surfaces structural insight that synthetic stubs can't (typography pass found the v34 double-escape; in-tile cell viz surfaced modified-gravity's 5 falsifications, dark-matter's 0 confirmed, ADE clique's empty grids).
- Smoke test is a sanity check, not a full test suite — the real validation is the maintainer eyeballing the live page after upload.

### Data integrity (firewall)

`META_v21_1_methodology_firewall.md` is load-bearing. Cell content, axis labels, citation text, and edge semantics are NOT to be paraphrased in code or commits. When in doubt, query the MCP server (the canonical schema and content). New formal classifications, new cross-classification edges, and new predictive-yield entries go through PRs against the schema, gated by CI — NOT inserted ad-hoc by the explorer.

This affects the explorer in one specific way: the phenomena layer adds a mapping from "everyday names of physical things" to formal classifications. That mapping is presentation-layer, not a schema change, so it lives in the explorer's JS, not in the consolidated JSON. The mappings were verified against the live MCP server before being hardcoded. If they need updating (e.g., a new classification is added that contains photons), update the JS — not the data.

Same principle for the discourse-card chrome: `DISCOURSE_TYPE_LABELS`, `STRUCTURAL_REASON_LABELS`, `PROGRAM_SUBTYPE_LABELS` in `explorer-discourse.js` are presentation-layer mappings. The canonical values are the raw fields on the nodes; the labels are display niceties. Keep the labels in sync with what the dataset actually carries — when adding a new structural_reason_category to the data, also extend `STRUCTURAL_REASON_LABELS`, or it'll render as the raw kebab-case id.

**Cosmetic and presentation-layer changes are not gated by the firewall.** Adjusting phenomenon-category colors, tile styling, panel copy, the legend layout, discourse-card section ordering, or pill colors — any purely visual concern ships through a normal explorer commit. No MCP query, no schema PR, no CI consideration beyond the explorer's smoke test. The firewall only applies to changes that touch cell content, axis labels, citations, edge semantics, or the consolidated JSON itself.

### The MCP server is the authority

Before guessing what's in the dataset, query `https://map-of-physics.eddie-8e5.workers.dev`. The 25 read-only tools cover every node type, every edge type, the glossary. Use them to verify mappings, check cell counts, find which classifications contain a particular cell. MCP-server output is the truth; cached knowledge in an AI's context is not.

---

## Lessons from the build so far

- **Top-level `let` / `const` are script-scoped, not global** — *the trap of the multi-file split.* When the monolith was split across multiple `<script>` tags, top-level `let DATA = null` in data.js became invisible to `init()` in sidebar.js. The monolith got away with `let` because everything lived in one script. Fix: use `var` for any top-level binding that crosses files (function declarations and `var` declarations both go on the global object; `let` and `const` don't). All six modules now use `var` at top level for cross-file bindings.

- **JSDOM needs `CSS.escape` polyfilled.** `drawPhenPhenOverlay` uses `CSS.escape(fcId)` in its query selectors; JSDOM 29 doesn't ship with `CSS.escape`. The smoke test polyfills it before loading the modules.

- **JSDOM `runScripts: 'dangerously'` + sibling `<script src>` tags doesn't work** in the explorer's setup — JSDOM can't resolve the relative paths. Manual `vm.runInContext` of each module file is the working pattern.

- **`instanceof Set` lies across VM contexts.** Update B's smoke test learned this: `state.spotlightActive` was created inside the JSDOM context with the JSDOM realm's `Set` constructor; checking `instanceof Set` from the test runner (a different realm) returns `false`. Use `value.constructor.name === 'Set'` for cross-VM duck typing.

- **`web_fetch` caches negative responses tool-side.** During Update B the chat hit raw-CDN 404s for files that had just been uploaded; subsequent fetches kept returning 404 even after the file landed. The working fallback: `curl` to `https://github.com/.../blob/main/...` (github.com is in bash's allow-list), parse the React-app embedded JSON payload (`data-target="react-app.embeddedData"` script tag, `rawLines` key) with Python. Works for files up to ~500 KB. For larger files (e.g. the 1.37 MB consolidated JSON), GitHub doesn't embed the full content in the blob HTML — re-query through the MCP server instead.

- **The "width: 100/zoom %" trick** in the map wrapper is clever but counterintuitive. It makes the visible map always span the full pane width regardless of zoom level, with tile-wrapping reflowing as zoom decreases. Future modifications to zoom logic must preserve this — without it, low zoom leaves empty space on the right.

- **Pan clamping needs the visible-height calculation**, which depends on `wrap.scrollHeight * state.zoom`. Naively clamping pan to a fixed range causes the map to vanish off-screen when zoomed in.

- **Phenomena merging revealed a real pattern** — leptons, Higgs, W/Z bosons all live in just SM + GUT, nowhere else. SMBHs and white dwarfs both live in just compact-astrophysical-objects. The merged-toggle UI surfaces this structurally instead of forcing the user to discover it by toggling individually. Expand the same trick when adding new phenomena.

- **Eleven formal-mathematical classifications don't map to any physical phenomenon.** They're pure mathematical scaffolding. When phenomena toggles are active, these tiles correctly remain faded. Don't try to force a mapping.

- **Initial-load fit-to-view** matters more than expected. The default zoom of 100% made the map larger than typical viewports, requiring users to scroll or zoom out before they understood what they were looking at. Auto-fitting on boot solves this.

- **The 80-pixel sidebar quick-bar** (Legend / Phenomena / About) provides one-click access without taking serious vertical space. Tabs in the sidebar header consistently outperform burying navigation in the Browse dropdown for non-developer users. Update B's six catalogue peer-buttons learn the same lesson at the toolbar level: don't bury first-class navigation behind a wrapper verb like "browse".

- **Toolbar real-estate is scarce.** A.1 already had three inline chip groups + Browse + search + reset. Update B's rows-by → button-dropdown and spotlight → button-opens-panel compressions made room for six catalogue peer-buttons without overflow on typical viewports. Add a seventh top-level toolbar control and the layout starts to wrap; that's the signal to demote something to a sidebar panel.

- **Nested catalogue navigation is wrong.** The first Update B implementation put the five new discourse catalogues inside the Browse dropdown under a "CATALOGUES" section header. It tested OK and shipped, then immediately got revised: catalogue navigation is first-class data-layer access, not a sub-mode of "browsing the menu." Lesson: when adding a new navigation surface, ask whether it's a peer of existing surfaces (toolbar/sidebar/quick-bar) before defaulting to "expand the dropdown." Update B's redesigned design — six toolbar peer buttons — is the load-bearing pattern for any future catalogue additions.

- **`discharge_status` is polymorphic in the dataset.** Sometimes a string equal to the `nature` value; sometimes a 3-key object (typically `local`/`global`/`universal` for candidate-hosting/targeting, but `geometry`/`matter`/`universal` on causal-sets edges, etc.); sometimes a string-or-object plus a `subclaim_examples` sub-object with arbitrary keys. The renderer handles all three through one entry point; future card renderers calling it shouldn't unify the data shapes, only accept them.

- **The glossary is meta-vocabulary, not physics-vocabulary** — important design implication. All 22 entries describe the *map's own organising terms* (Architecture, Regime content, Open frontier, structural-reason categories, Discharge status, Stratum, …) rather than physics terms (quark, anomaly, cobordism, Higgs). Practical consequence: if a future pass adds inline cross-linking from prose to glossary entries, the alias scan would fire on words like "architecture," "discharge," "stratum," "candidate-foundational" — exactly the words that already appear as prominent labels and header pills in the discourse cards. That doesn't make cross-linking wrong, but it does mean the design call should happen against the live shipped panel, not in advance. The build-time index in `augmentDataset` and the `formatPara` extension are both cheap when needed.

- **Working norm — "use physics vocabulary as much as possible."** A user-stated principle that should guide UI copy decisions. Don't coin presentation terms when the data already names a thing. Don't invent map-internal vocabulary that competes with established physics terminology. When uncertain about a UI label, mirror the dataset's own key names (the glossary panel does this — `Definition` / `Why it matters` / `Example` come straight from the dataset's field names rather than reframed). New chats should treat this as a tie-breaker on naming decisions.

- **The github.com-blob fallback's embedded JSON path moved between B and C.** Documented under Update B as `payload.blob.rawLines`; the actual path in May 2026 is `payload["codeViewBlobLayoutRoute.StyledBlob"].rawLines`. GitHub's web-app refactors evidently keep the data accessible but rename the route. Lesson for future chats using the documented fallback: probe the structure with a small inspector first (`json.dumps(data["payload"].keys())`) rather than assume the path. The fetcher script in `/home/claude/explorer-build/fetch_blob.py` (in the Update C smoke-test workspace) has the working extraction.

- **JSDOM polyfill list keeps growing.** Update B's smoke test polyfilled `CSS.escape`. Update C glossary added `Element.prototype.scrollIntoView` (set to a no-op stub — the renderer's tested behavior doesn't depend on actual scrolling). Update C clickable edges added no new polyfills. Future smoke tests should expect to add at least one more such polyfill as the explorer reaches for browser APIs JSDOM's release lags on. Keep them as guarded `if (!window.X) window.X = …` so the polyfills are idempotent across re-runs.

- **Edge counts in the project preamble vs. the live dataset — resolved.** During Update C pre-work for clickable edges, an offline filter against v34 (`category === 'phenomenon'` on both endpoints of cross-classification edges, matching the explorer's exact `augmentDataset` predicate) counted **7** phen↔phen edges, not the 8 reported in the project-context preamble and `server_info`'s prose. Verified by enumerating all 97 cross-class edges via the MCP server: 7 is correct, the preamble and worker prose are stale. **Outstanding follow-up:** update the worker's `server_info` text and the project-context preamble to say 7. The clickable-edges build correctly surfaces all 7.

- **Cell_refs always belong to the from-endpoint** in v34. Verified empirically across all 97 cross-class edges. The schema doesn't document this as a constraint, but it's the consistent convention. The "mixed-prefix" cases (`cell-ti-*` vs `cell-tsc-*` vs `cell-mzm-*` etc.) are distinct prefix conventions WITHIN the same from-FC, not multi-endpoint refs. Renderers can assume from-side; if future edges need to-side refs, the schema should add a separate `to_cell_refs` field rather than overloading `cell_refs`.

- **SVG overlay z-index gotcha.** Tiles get `z-index: 2` on `:hover`. An overlay at `z-index: 1` (the original setup) vanishes behind the tile the moment the cursor approaches, making lines unclickable wherever they visually cross a tile. The clickable-edges build bumped the overlay to `z-index: 5`. Any new map-overlay layer must sit at z-index ≥ 3 to stay above hovered tiles, but should stay under modal/tooltip layers (100+).

- **Wide invisible hit-areas for SVG line interaction.** A 1.6 px stroke is too thin a click target on its own — the user reported "edges go behind cells when I try to hover" after the first clickable-edges ship, which was the z-index issue, but tests against the fixed version confirmed the thin-line problem on its own merits. Standard pattern: wrap each visual path in a `<g>` with a transparent stroke-width-14 hit-area path beneath. CSS `g:hover path.visible { stroke-width: ... }` propagates hover from the wider hit area to the visible stroke. For filled shapes (arrow heads), use a slightly-enlarged transparent triangle with `pointer-events: fill`. Effective click target ~14 px around a 1.6 px visible line.

- **`stopPropagation` inside clickable cards.** When an outer card surface is clickable and an inner link does its own navigation, the inner link's handler must `event.stopPropagation()`. Learned with `.edge-target` inside `.dc-edge-clickable` — without stopPropagation, clicking the neighbor-FC link opens the edge card instead of jumping to the neighbor. Confirm any future "card containing a link" pattern handles this.

- **The 169-assertion smoke-test floor.** Update B landed at 80, Update C glossary added 46 against a glossary-specific stub (narrower scope), Update C clickable edges landed at 91 against a comprehensive stub, Update C typography pass landed at 123 then 129 after the escape-normalization patch, Update C in-tile cell viz landed at 169. **The floor for future passes is 169.** Future passes should extend by 5–10 assertions per item to stay safely above.

- **`<g>`-group click delegation works in SVG via `closest()`.** Modern browsers (and JSDOM ≥ 22) support `Element.closest()` on SVGElement too — so attaching a delegated click handler to the outer SVG and resolving `event.target.closest('[data-edge-id]')` correctly walks up from a clicked inner `<path>` to the `<g>` ancestor. The same pattern can be used for any future SVG-based interaction (discourse-highlight ring badges, in-tile cell mini-grids, etc.).

- **Pre-existing CSS bugs are a known unknown.** During the typography pass's CSS extraction we found a missing `}` at the `.pt-tile.discourse-highlight::after` rule (the Update B / Update C glossary boundary in the original inline `<style>`). Browsers had been parse-recovering, so the bug had been invisible — but the rule was effectively malformed in source for as long as it existed. Lesson: any pass that touches CSS should opportunistically run a brace-balance check on whatever it touches. The smoke test now verifies brace balance per extracted CSS file as a regression guard.

- **Handoff perception can lag actual state.** The typography pass's handoff sketch said "Crimson Pro is loaded but underused, body text is mostly Spectral or fallback." Inspection of the live HTML before the pass found `body { font-family: 'Crimson Pro', Georgia, serif }` already set. The handoff prose had gone stale at some point and nobody noticed. **Before designing against a handoff sketch, verify the relevant claim against the live file.** This applies most acutely to claims about CSS state, which is hard to keep handoff-accurate as the codebase evolves.

- **Synchronous CDN script over deferred.** The KaTeX `<script>` initially had `defer` to avoid blocking parse. On reloads with `Map_v34_consolidated.json` already in disk cache, `fetchCanonicalData()` resolves and the explorer reaches a `formatPara` call before the deferred KaTeX script downloads — so the first render hits the offline-fallback path. Removing `defer` adds ~30-50 ms to cold first-paint but guarantees `katex` is defined when `init()` runs. **For any CDN dependency that `init()` consumes from globals immediately, prefer synchronous load.**

- **CDN runtime dependencies should be pinned + SRI-hashed.** The KaTeX `<link>` and `<script>` carry `integrity="sha384-…" crossorigin="anonymous"`. If jsdelivr ever serves modified bytes the browser refuses the file; the explorer's offline-fallback path kicks in instead of silently loading tampered math. Use the canonical hashes published on the KaTeX install page (or computed via `cat file | openssl dgst -sha384 -binary | base64`) — not vendor-cached hashes that may drift.

- **The v34 dataset has inconsistent escape levels in math fields.** After `JSON.parse`, the JS string holds **single backslash** in `equations[].latex` and `architecture_level_edges[].description` fields; **double backslash** in regular `description` fields on regime-content / open-frontier / totality-approach nodes and in `loose_ends[].description` fields; **zero backslashes** in cells that use Unicode directly. KaTeX reads `\\` as the LaTeX line-break command, so a double-escaped `\\theta` renders as line-break-then-text-"theta" (the bug the maintainer saw). Presentation-layer fix: collapse `\\` → `\` inside math segments before KaTeX sees them. Long-term, a data PR to normalize the source JSON would let the workaround be removed; whatever authored those descriptions over the project's history was inconsistent about JSON escape level. The MCP server's tooling probably needs auditing for the same drift.

- **End-to-end real-data sanity check pattern.** For any pass that adds rendering of dataset content, write a small Node.js script that loads `Map_v34_consolidated.json` from disk and runs the new renderer/helper across the full dataset. Output is informal — print to console, eyeball, save findings to the handoff. Typography pass's e2e found the v34 escape inconsistency by running `formatPara` on strong-cp-problem and inspecting what got passed to a recording-stub KaTeX. In-tile cell viz's e2e ran `tileCellBreakdown` on all 30 FCs and surfaced modified-gravity's 5-falsification cluster, dark-matter's 0-confirmed status, the math-only ADE clique's all-empty grids — real findings that synthetic stub tests can't surface. **Pattern: synthetic stub for unit-level wiring assertions + real-data e2e for "does this make sense across the dataset" sanity.**

- **Flex with `flex-wrap` is the right container for decorative grids** when document order matters and centering doesn't. CSS grid with `repeat(auto-fit, 8px)` left-aligns within the container, which works the same as flex for this case — but adding `justify-content: center` to grid creates uneven row offsets when the count doesn't fit a row exactly. Flex with `flex-wrap: wrap` and default `justify-content: flex-start` cleanly preserves dataset order and looks consistent at all counts. Used by the in-tile cell mini-grid.

- **`pointer-events: none` on decorative grids preserves underlying click + hover.** The in-tile cell mini-grid sits inside the tile element (which has a whole-element click handler). Without `pointer-events: none` on the grid, hover events on swatches would propagate but click events would land on the swatch (not the tile), breaking the tile's open-on-click behavior. With it set, the grid is purely visual; clicks and hovers pass through to the tile underneath. Same pattern as the phen↔phen overlay (which uses `pointer-events: none` at the SVG level and re-enables `pointer-events: stroke` selectively on the wide hit-area paths).

- **The in-tile cell viz surfaces structural insight that the existing yield bar misses.** The yield bar shows prediction-status proportions. The mini-grid shows per-cell content state, which includes things the yield bar can't represent: `excluded` (structurally-absent cells, like the 17 in sm-rep-content), `realized-only` (populated cells with no prediction, the dominant state in modular-tensor-categories and higgs-coulomb-branches), and `empty` (cell exists but no content authored, the state of the four math-only ADE FCs). Future passes that surface dataset state visually should consider what the existing UI already encodes and what's structurally invisible — the gap is often where the value lies.

- **Outstanding follow-up: "8 phenomenon-to-phenomenon edges" preamble drift.** The help-overlay text inside `Map_v34_explorer.html` still says "8 phenomenon-to-phenomenon edges" (in the "Layers + filters" section) and the worker's `server_info` prose says the same. The live data has 7. Verified by enumerating all 97 cross-class edges via the MCP server. The clickable-edges build correctly surfaces all 7. Each pass since clickable-edges has left this alone as out-of-scope; the next pass that touches the help-overlay text OR the worker's server_info prose should fix it.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- Live URL: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev`
- Canonical data: `/data/Map_v34_consolidated.json` (1.37 MB) — single source of truth
- Per-FC entry files: `/data/entries/` (build artifact, regenerable)
- Methodology docs: `/methodology/PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, this file
- Explorer (eleven files): `/explorer/Map_v34_explorer.html`, four CSS files (`update-b.css`, `update-c.css`, `update-c-edges.css`, `update-c-typography.css`), six JS modules (`explorer-data.js`, `explorer-map.js`, `explorer-sidebar.js`, `explorer-phenomena.js`, `explorer-discourse.js`, `explorer-glossary.js`)
- CI: `.github/workflows/` — schema + invariant validators on PRs

### Raw URLs for `web_fetch`

The HTML skeleton:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/Map_v34_explorer.html`

The four CSS files:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-b.css`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-c.css`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-c-edges.css`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-c-typography.css`

The six JS modules:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-map.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-sidebar.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-phenomena.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-discourse.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-glossary.js`

The data file (1.37 MB — too large for the github.com blob extraction fallback; if raw CDN 404s, re-query via MCP):
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`

A chat working on a single concern fetches only the modules + CSS files it needs — usually one to three files, rarely all eleven — keeping each chat's context budget small.

Version numbers are git tags from v34 onward, not filenames. The era of `MAP_vN_*.json` filenames is closed.
