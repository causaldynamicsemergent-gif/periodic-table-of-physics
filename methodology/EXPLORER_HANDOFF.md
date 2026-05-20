# Explorer build — handoff and process

**Purpose of this file.** A standing reference for anyone (the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo) who needs to pick up the explorer build mid-stream. Records the current state, what's queued next, the operational norms that keep work moving, and the file-level architecture so a fresh chat can find what it needs to touch without re-reading the whole codebase. Update this doc after every shipped milestone.

Location: `/methodology/EXPLORER_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
The live MCP server (read-only, schema-authoritative): `https://map-of-physics.eddie-8e5.workers.dev`
The canonical data: `data/Map_v34_consolidated.json` in the repo. Server-verified counts (May 2026): 71 nodes, 186 edges, 30 formal-classifications, 484 cells, 22 glossary entries, 7 experimental programs, 97 cross-classification edges, ~89 discourse-layer edges, schema v15.3, dataset v34.

The data layer is stable; the active work is presentation. The build sits at the front of "Update C — polish" after a clean Update B ship.

**Currently deployed on the live site: Update A.1 + Update B + Update C glossary panel (seven-file build).** Any chat that ships a new build is responsible for updating this line in the same commit.

### Shipped milestones

- **v4 → A → A.1** — three iterations of the single-file monolith, ending at Update A.1 (146 KB single HTML): cell-content search, drag-pan, wheel zoom, six-tab Browse menu, phenomena layer with 25 toggles in 7 color categories, multi-ring highlight stacking, About-as-default sidebar, persistent Legend / Phenomena / About quick-bar, fit-to-view zoom.
- **Five-file refactor** — same A.1 feature set, structurally split into one HTML skeleton (~49 KB) plus four JS modules: `explorer-data.js` (~21 KB), `explorer-map.js` (~15 KB), `explorer-phenomena.js` (~13 KB), `explorer-sidebar.js` (~55 KB). Pure decomposition, no user-visible changes. Each future change now only loads what it touches.
- **Update B** — the discourse layer (41 non-FC nodes, ~89 discourse-layer edges) and a toolbar refactor that moves catalogue navigation up to first-class peer buttons. Shipped as six files: the four refactor modules plus a sixth, `explorer-discourse.js` (~37 KB), and a 17-KB CSS expansion folded into the HTML skeleton. Details in the "What was built in Update B" section below.
- **Update C — glossary panel.** Shipped the 22-entry glossary that surfaces the dataset's own organising vocabulary (Architecture / Regime content / Open frontier / structural-reason categories / Discharge status / Stratum / Family / …). New `explorer-glossary.js` (~12 KB, seventh module). Two entry points: a 4th sidebar quick-bar button (§ Glossary) and a Browse-menu tab. Type-ahead filter on term ∪ aliases ∪ definition. Related-term pills navigate within the glossary. Hash routing `#/glossary` and `#/glossary/<slug>` for deep-linking. Term-cross-linking inside cell descriptions and discourse-card prose was deliberately deferred — see "What was built in Update C — glossary panel" and the rationale in "Update C remaining" below.

### What's queued (live)

- **Update C — remaining.** Three items remaining after the glossary panel shipped, each independent and shippable in its own chat. **Next up: clickable on-map edges.** The phen↔phen overlay's lines and the FC card's `dc-edge` blocks both become clickable, opening a sidebar edge card with the edge's full description, citations (1–4 per edge), and `cell_refs` (2–7 per edge) — all of which currently live in the data but are surfaced nowhere in the explorer. Design decisions taken in the preceding chat: (1) include `dc-edge` clickability in the same pass so the citation-lift propagates to FC views too; (2) hover affordance on SVG lines is `cursor: pointer` + thicker stroke, no tooltip (the click opens the card, which has the prose); (3) discourse-highlight ring badges are **deferred but not forgotten** — they introduce a new corner-of-tile visual surface that wants its own design conversation. After clickable edges: typography pass (KaTeX inline math, scholarly serif body font), and in-tile cell visualisation for small classifications (mini-grids of the actual cells in tiles with under ~20 cells). Sketches in the "Update C remaining" section below.
- **Step 5 — open the review pathway** (now further unblocked — Update B made the discourse layer navigable, and the Update C glossary lowers the explanation overhead for an unfamiliar physicist reviewer encountering map-internal vocabulary like "discharge status" or "candidate-foundational"). GitHub Issues templates for cell errata / new-FC proposals / cross-class edge proposals; `/methodology/EDITORIAL.md` describing the editorial process; outreach copy + the live explorer link sent to 2–3 working physicists in different subfields. The "Step 5" sketch later in this doc has the operational details.

---

## How to start a new chat on this project

Project files are auto-attached when you open a new chat. The AI should already see this handoff plus the methodology docs from the start. To resume work cleanly:

1. Open a fresh chat in the Claude project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, `PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, and the goal supplements.
3. Tell it which section of this doc the work resumes at — e.g., *"Pick up at Update C remaining as described in EXPLORER_HANDOFF.md, starting with clickable on-map edges (design decisions already locked in)."*
4. If the chat needs to read or edit explorer code, it fetches the file(s) it needs from GitHub via `web_fetch`. URLs are in the "Quick reference" section at the bottom. **Don't attach explorer code to project knowledge** — see "Project files should never contain the explorer code" below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats rather than listed directly. If the assistant doesn't see them, ask it to call `tool_search` with the keyword *"map of physics"*. The 25 read-only tools are the schema authority — using them is always preferable to guessing or paraphrasing dataset content.

If `web_fetch` rejects a GitHub raw URL the assistant tries (the tool whitelists URLs seen in prior search/fetch results; fresh chats start empty), there's a workaround the B-implementation chat documented and the C-implementation chat re-confirmed: the `web_fetch` tool's negative-response caching can persist a 404 even after the file lands. The reliable fallback is `bash` + `curl` to `https://github.com/.../blob/main/...` (github.com is whitelisted), which returns an HTML wrapper with the file's content embedded in a `<script data-target="react-app.embeddedData">` JSON payload. **Path to the file lines: `data["payload"]["codeViewBlobLayoutRoute.StyledBlob"]["rawLines"]`** as of May 2026 — earlier handoff text said `payload.blob.rawLines`, which is stale. GitHub web-app refactors evidently keep the data accessible but rename the route; probe the structure with a small inspector first (`json.dumps(list(data["payload"].keys()))`) rather than assume the path. Works for files up to ~500 KB; the 1.37 MB consolidated JSON exceeds that and requires re-querying through the MCP server instead.

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

## File-by-file architecture (seven files)

Seven files in `/explorer/`. Plain `<script>` tags, no bundler, no ES modules. Cross-file references resolve through the global scope.

### Load order in `Map_v34_explorer.html`

```
<script src="explorer-data.js"></script>
<script src="explorer-map.js"></script>
<script src="explorer-sidebar.js"></script>
<script src="explorer-phenomena.js"></script>
<script src="explorer-discourse.js"></script>
<script src="explorer-glossary.js"></script>
<script>init();</script>
```

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

**explorer-data.js** (~25 KB) — globals (`DATA`, `FCS`, `FC_BY_ID`, `SECTORS`, `STATUSES`), constants (`CAT_ORDER`, `CLOSURE_ORDER`, `STATUS_KEY`, `STATUS_LABEL`, `STATUS_COLOR`, `SYMBOLS`, `SECTOR_MAP`, `CATEGORY_MAP`, `SECTOR_ORDER`, `DATA_URLS`, `ZOOM_LEVELS`, `MCP_BASE`), data fetch + transform (`fetchCanonicalData`, `augmentDataset`, `renderFatalError`), shared helpers (`esc`, `formatPara`, `showToast`, `yieldSegments`), URL hash routing (`parseHash`, `writeHash`), the `state` singleton. **Update B added:** discourse-node retention in `augmentDataset` (filters non-FC nodes into `discourse_nodes`); discourse-edge indexes (`discourse_edges_by_node`, `discourse_edges_by_type`, `fcs_connected_to_discourse`); `state.selectedDiscourseNode` and `state.spotlightActive` (multi-select Set replacing the single-value `state.highlight`); `/discourse/<id>` hash route and `spotlight=k1,k2,...` query string. **Update C added:** `termToSlug` shared helper (lowercase + non-alphanumeric → `-`, with leading/trailing separators stripped); `state.selectedGlossaryTerm` (slug of the focused glossary entry) and `state.glossaryFilter` (the type-ahead string); `/glossary` and `/glossary/<slug>` hash routes (parseHash sets `state.activePanel = 'glossary'` automatically).

**explorer-phenomena.js** (~13 KB) — `PHENOMENA` array (25 items, A.1 merges intact), `PHEN_CAT_COLORS` (seven hues), `PHEN_CATEGORIES`, precomputed indexes (`PHEN_BY_FC`, `PHEN_COLOR_BY_ID`, `PHEN_CAT_BY_ID`), phenomena-panel renderer (`renderSidebarPhenomena`), phen↔phen on-map overlay (`drawPhenPhenOverlay`). Untouched by Update B.

**explorer-map.js** (~19 KB) — periodic-table renderer (`renderMap`, `renderTile`), hover tooltip (`showTileTooltip`, `moveTooltip`, `hideTooltip`), toolbar wiring (`wireToolbar`, `syncToolbarChips`, `wireRowsByDropdown`), zoom + pan: `ZOOM_MIN = 0.35`, `ZOOM_MAX = 2.0`, plus `applyZoom`, `clampPan` (80 px MARGIN, depends on `wrap.scrollHeight * state.zoom`), `zoomFitToView`, `zoomIn`, `zoomOut`, `wireMapDragPan`. **Update B added:** `ROWSBY_OPTIONS` constant; multi-select spotlight logic in `renderTile` (Set-based dim/spot instead of single-value); discourse-highlight class on `renderTile` driven by `isFCConnectedToSelectedDiscourse`; spotlight button count and discourse-tab button active-state in `syncToolbarChips`; rows-by chip group replaced with button + dropdown menu; spotlight chip group replaced with button that opens the sidebar panel.

**explorer-sidebar.js** (~60 KB) — every right-pane renderer (`renderSidebarDefault` = legend, `renderSidebarAbout`, `renderSidebarEducation`, `renderSidebarResearch`, `renderSidebarSearch`, `renderSidebarFC`, `renderSidebarAllCells`, `renderSidebarCell`, `renderSidebarBrowseClassifications` [new B]), selection state changers (`selectFC`, `selectCell`, `clearSelection`), panel routing (`switchSidebarPanel`, `renderPanel`, `syncSidebarQuickBar`, `wireSidebarQuickBar`), `refreshFromServer`, `wireSplitter`, six-tab Browse dropdown (`buildBrowseMenu`, `openBrowseMenu`, `closeBrowseMenu`, `wireBrowseDropdown`), and `init()` — the boot function called by the inline `<script>init();</script>`. **Update B added:** `renderSidebarBrowseClassifications(filter)` with type-ahead search and sectored FC list; panel routing for `'discourse'`, `'spotlight'`, and the six `'browse-*'` catalogue panels; `clearDiscourseSelection` calls in the selection lifecycle; trimmed Browse menu to five MAP-only tabs (the six catalogues all moved to peer toolbar buttons). **Update C added:** panel routing case for `'glossary'` (calls `renderSidebarGlossary` with `state.glossaryFilter`); Glossary tab added to `buildBrowseMenu` (between Legend and About), making it a six-tab dropdown again; `clearGlossarySelection` symmetric call in `switchSidebarPanel` and `clearSelection`; `init()` calls `buildGlossaryIndexes()` after `augmentDataset` returns and before the first render.

**explorer-discourse.js** (~37 KB, **NEW in Update B**) — `DISCOURSE_TYPE_LABELS`, `DISCOURSE_TYPE_ICONS`, `STRUCTURAL_REASON_LABELS`, `PROGRAM_SUBTYPE_LABELS`, `DISCOURSE_RING_COLOR = '#b8651a'`; edge-grouping helpers (`groupDiscourseEdges`, `ge`); `discharge_status` renderer with polymorphic shape handling (`dischargeClass`, `renderDischargeStatus`); cross-layer pill renderers (`renderFCPill`, `renderDiscoursePill`, `renderNeighborPill`, `renderCellRefPills`); edge-row + section renderers (`renderEdgeRow`, `renderEdgeSection`); shared card-head chrome (`renderDiscourseCardHead`); five card renderers (`renderArchitectureCard`, `renderFrontierCard`, `renderTotalityCard`, `renderRegimeContentCard`, `renderProgramCard`); type-dispatcher (`renderDiscourseCard`); sidebar wiring (`renderSidebarDiscourse`, `wireDiscourseCardLinks`); selection state (`selectDiscourseNode`, `clearDiscourseSelection`); five catalogue list builders (`renderSidebarBrowseArchitectures` / `Frontiers` [grouped by structural_reason_category] / `Totalities` [grouped by empirical_status] / `RegimeContent` [alphabetical] / `Programs` [grouped by subtype]); multi-select spotlight sidebar panel (`renderSidebarSpotlight`); ring-highlight query helper (`isFCConnectedToSelectedDiscourse`). Untouched by Update C glossary.

**explorer-glossary.js** (~12 KB, **NEW in Update C**) — module-local indexes (`GLOSSARY_ENTRIES`, `GLOSSARY_CATEGORIES`, `GLOSSARY_BY_SLUG`, `GLOSSARY_BY_TERM_LC`); `buildGlossaryIndexes()` called from `init()` after `augmentDataset` returns (reads `DATA.glossary.{categories,entries}`, annotates each entry with `_slug`, builds the four lookup tables, groups entries into category buckets in `order` ascending; defensive `_uncategorised` bucket if an entry references a category not declared in the canonical list); `lookupGlossaryEntry(termOrSlug)` accepting any of slug / term / alias / slugified term (case-insensitive); selection (`selectGlossaryTerm`, `clearGlossarySelection`) that also clears FC / cell / discourse selection symmetrically; `scrollGlossaryEntryIntoView(slug)` for deep-link boot and related-pill clicks; `renderSidebarGlossary(filter)` — the panel renderer with header counts, type-ahead search input, category-grouped entry rendering, and related-pill wiring; `renderGlossaryGroup` and `renderGlossaryEntry` helpers. Filter matches term ∪ aliases ∪ definition ∪ why_it_matters (case-insensitive substring). Related-pill rendering distinguishes in-glossary targets (clickable) from out-of-glossary references (rendered inert with explanatory `title`).

**Map_v34_explorer.html** (~69 KB) — `<head>` + ~47 KB of CSS (A.1 styles + folded `update-b.css` for discourse cards, spotlight panel, rows-by dropdown, peer-button toolbar group, discourse-highlight tile ring, sidebar classifications panel + folded `update-c.css` glossary styles: `.glossary-entry`, `.glossary-field`, `.glossary-term`, `.glossary-related-pill`, etc.) + body HTML (masthead, toolbar with peer catalogue buttons, body-grid with map-pane + splitter + sidebar including the **four-button quick-bar** [§ Glossary added between Phenomena and About], tooltip, help-overlay, toast), then the seven script tags. No inline JS apart from the one-line `init()` call. **Over the 65 KB soft target** — next pass that naturally touches HTML/CSS should extract `update-c.css` (and likely `update-b.css` too) into separate files.

### Cheat-sheet: what to edit for what

| Change | File |
|---|---|
| Add a new physical phenomenon | `explorer-phenomena.js` |
| Adjust a phenomenon category color | `explorer-phenomena.js` |
| Change zoom limits, pan margin, wheel-zoom step | `explorer-map.js` |
| Tweak tile size, row label, or any map-side layout | `Map_v34_explorer.html` (CSS) |
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
| Recolor the discourse-highlight ring | `Map_v34_explorer.html` (CSS `--discourse-ring`) and `explorer-discourse.js` (`DISCOURSE_RING_COLOR`) |
| Change the spotlight-panel layout / status descriptions | `explorer-discourse.js` (`renderSidebarSpotlight`) |
| Add a new catalogue browse list (e.g. if a 7th node type is added) | `explorer-discourse.js` (new `renderSidebarBrowse*` function) + `explorer-sidebar.js` (`renderPanel` routing) + `Map_v34_explorer.html` (new `.discourse-tab` button) |
| Tweak the sidebar Classifications panel (search behavior, item layout) | `explorer-sidebar.js` (`renderSidebarBrowseClassifications`) |
| Adjust the glossary panel layout (sections, ordering, field rendering) | `explorer-glossary.js` (`renderSidebarGlossary`, `renderGlossaryGroup`, `renderGlossaryEntry`) |
| Change glossary entry-card styling (term emphasis, related-pill colours, focused-entry highlight) | `Map_v34_explorer.html` (CSS `.glossary-entry`, `.glossary-field`, `.glossary-related-pill`) |
| Change which glossary fields render | `explorer-glossary.js` (`renderGlossaryEntry`) |
| Change glossary deep-link hash format | `explorer-data.js` (`parseHash` / `writeHash` — the `'glossary'` branch) |
| Add inline glossary cross-linking inside cell descriptions / discourse cards (deferred — see Update C remaining) | `explorer-data.js` (`formatPara` extension + alias scan index in `augmentDataset`) + `explorer-glossary.js` (click target resolution) |

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

## Update C — remaining

Three items remaining after the glossary panel shipped. Each is independent and can ship in its own chat. Sketches follow.

### Clickable on-map edges (next up — design decisions taken)

Two interactive layers on the map were previously inert: the phen↔phen overlay (the lines drawn between phenomenon-FCs when the overlay is on) and the discourse-highlight rings (drawn around FCs when a discourse node is selected). Making both clickable opens a sidebar edge card that surfaces content currently un-surfaced anywhere: each cross-classification edge in the data has `citations` (1–4) and usually `cell_refs` (2–7) that live in the JSON but appear nowhere in the explorer — the FC card's `dc-edge` block truncates to description-only.

**Scope (decisions confirmed in the preceding chat):**

1. **Phen↔phen overlay lines become clickable.** `drawPhenPhenOverlay` in `explorer-phenomena.js` already emits SVG `<path>` elements for each edge; add `data-edge-id` to each, plus `pointer-events: stroke` and `cursor: pointer` in the CSS, and wire click delegation on the SVG container.

2. **`dc-edge` blocks in the FC card also become clickable** — opens the same edge card. Unifies the flow; the citation/cell-ref lift propagates from the phen↔phen surface to every FC view too. Small extra cost, big consistency win.

3. **Hover affordance on SVG lines is `cursor: pointer` + thicker stroke on hover.** No tooltip — the click opens the card, which has the prose; an extra tooltip would compete.

4. **Discourse-highlight ring badges are deferred but not forgotten.** The handoff originally sketched "add a small badge near the ring (e.g. an icon at the corner) that, on click, opens a card describing why this FC is connected to the selected discourse node." That introduces a new corner-of-tile visual surface and wants its own design conversation against a built phen↔phen card. Carry this forward in the next pass after clickable edges lands — same edge-card chrome will likely apply, only the trigger is different.

**Edge card layout.** Reuses existing chrome from `explorer-discourse.js` where useful (`renderFCPill`, `renderCellRefPills`, header pills). Sections: breadcrumb (× close) → header (subtype + status pill + `from-FC pill → to-FC pill`) → full description prose → cell-ref pills (clickable, jump to specific cell within either endpoint) → citations.

**Files expected:** `explorer-data.js` (extend `phen_phen_edges` push to spread the full edge — currently drops `id`, `citations`, `cell_refs`; add `state.selectedEdgeId`; `#/edge/<edge-id>` hash route), `explorer-phenomena.js` (click handler + `data-edge-id`), `explorer-sidebar.js` (`renderSidebarCrossClassEdge(edge)` renderer; `'edge'` panel routing case; ESC/clearSelection integration; `selectCrossClassEdge(edgeId)` helper used by both phen↔phen clicks and FC-card `dc-edge` clicks), `Map_v34_explorer.html` (CSS for hover and clickable `dc-edge`).

**Edge-count drift to verify and reconcile.** `server_info` and the project-context preamble report **8** phen↔phen edges; an offline filter run during pre-work (matching the same `category === 'phenomenon'` predicate `augmentDataset` uses) counted **7**. Next chat should verify the discrepancy first — either the preamble is stale (and the count should be updated to 7) or the local filter is missing one (and `augmentDataset` should be checked).

### Typography pass

KaTeX for inline math in cell descriptions and discourse-card descriptions. The dataset already uses LaTeX-style notation (`$...$` and `$$...$$`) in many descriptions; right now it renders as raw markup. Implementation: bundle KaTeX (~250 KB, server-side render to avoid runtime cost), call it in `formatPara` or a new `formatProseWithMath` helper.

Scholarly serif for body text: Crimson Pro or Spectral, both free, both already loaded by the explorer's `<link>` to Google Fonts. Currently Crimson Pro is loaded but underused — body text is mostly Spectral or fallback. Pick one consistent body face and apply it to descriptions, card bodies, glossary entries.

### In-tile cell visualization

For classifications with under ~20 cells, show a mini-grid of the actual cells inside the tile preview (rather than just the symbol + counts). This makes the inner structure visible at a glance. Tiles with more than ~20 cells continue to show just the count. Implementation: branch in `renderTile` by `fc.cell_count`; the mini-grid uses CSS grid with small swatches colored by content-type (empty / has-predictions / structurally-excluded / has-realized-examples).

### Update C operational expectations

Per the "Edits, not regenerations" section, each Update C item is one chat, one to three files touched, well under 30K tokens output. The smoke test extends by 3–8 assertions per item (the glossary pass landed 46 / 46 against the stub plus a real-data verification — that's the floor when extending). Ship each item independently; don't bundle.

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

Each module targets ≤ 60 KB. HTML skeleton ≤ 65 KB (currently **68.8 KB after Update C glossary — over the soft target by 4 KB**; next pass that naturally touches HTML/CSS should extract `update-c.css` and likely `update-b.css` too into their own files in `/explorer/`, loaded via `<link>` tags before the script tags). If a single file approaches the cap, split it further. The monolith broke down at ~150 KB; modules feel comfortable up to ~60 KB.

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
for (const f of ['explorer-data.js','explorer-map.js','explorer-sidebar.js','explorer-phenomena.js','explorer-discourse.js']) {
  vm.runInContext(fs.readFileSync(path.join(BUILD, f), 'utf8'), ctx, { filename: f });
}
await ctx.init();
// ...then assert on the DOM.
```

Notes:
- `runScripts: 'outside-only'` + manual `vm.runInContext` rather than `runScripts: 'dangerously'` with `<script src>` because JSDOM can't fetch sibling files from the local filesystem the way a browser would.
- **JSDOM's Set is a different constructor than the test runner's Set.** `state.spotlightActive instanceof Set` returns `false` from the runner's perspective even though it IS a Set inside the JSDOM context. Use duck-typing instead: `state.spotlightActive.constructor.name === 'Set'`.
- **JSDOM polyfills accumulate.** Update B needed `CSS.escape`. Update C added `Element.prototype.scrollIntoView` (no-op stub is fine for testing). Future passes should expect to polyfill at least one more browser API as the explorer reaches for things JSDOM's release lags on. Use guarded `if (!window.X) window.X = …` so polyfills are idempotent.
- Update B's smoke test had 80 assertions at last commit; Update C glossary added 46 against a stub plus a real-data verification pass. Treat *the larger of those* (80) as the cumulative floor when extending — Update C's smaller count reflects narrower scope (one panel, one selection model), not relaxed standards.
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

- **JSDOM polyfill list keeps growing.** Update B's smoke test polyfilled `CSS.escape`. Update C added `Element.prototype.scrollIntoView` (set to a no-op stub — the renderer's tested behavior doesn't depend on actual scrolling). Future smoke tests should expect to add at least one more such polyfill as the explorer reaches for browser APIs JSDOM's release lags on. Keep them as guarded `if (!window.X) window.X = …` so the polyfills are idempotent across re-runs.

- **Edge counts in the project preamble vs. the live dataset.** During Update C pre-work for the deferred-then-promoted clickable-edges item, an offline filter against v34 (`category === 'phenomenon'` on both endpoints of cross-classification edges) counted 7 phen↔phen edges, not the 8 reported in the project-context preamble and in `server_info`'s prose. May reflect a recent edge removal whose impact propagated to data but not to the count, or a discrepancy in the filter. **Reconcile before shipping the clickable-edges work** — either update the preamble/server text, or fix the filter, depending on which is wrong.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- Live URL: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev`
- Canonical data: `/data/Map_v34_consolidated.json` (1.37 MB) — single source of truth
- Per-FC entry files: `/data/entries/` (build artifact, regenerable)
- Methodology docs: `/methodology/PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, this file
- Explorer (seven files): `/explorer/Map_v34_explorer.html`, `explorer-data.js`, `explorer-map.js`, `explorer-sidebar.js`, `explorer-phenomena.js`, `explorer-discourse.js`, `explorer-glossary.js`
- CI: `.github/workflows/` — schema + invariant validators on PRs

### Raw URLs for `web_fetch`

The HTML skeleton:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/Map_v34_explorer.html`

The six JS modules:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-map.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-sidebar.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-phenomena.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-discourse.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-glossary.js`

The data file (1.37 MB — too large for the github.com blob extraction fallback; if raw CDN 404s, re-query via MCP):
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`

A chat working on a single concern fetches only the modules it needs — usually one or two files, rarely all seven — keeping each chat's context budget small.

Version numbers are git tags from v34 onward, not filenames. The era of `MAP_vN_*.json` filenames is closed.
