# Explorer build — handoff and process

**Purpose of this file.** A standing reference for anyone (the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo) who needs to pick up the explorer build mid-stream. It records current state, what's queued, how to do the next piece without losing the work that came before, and the working norms that have evolved during the build.

Put this next to `PROJECT_GOAL.md` and friends, in the repo root or `/methodology/`. Update it after every shipped change.

---

## Where things stand

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
The live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
The live MCP server (read-only, schema-authoritative): `https://map-of-physics.eddie-8e5.workers.dev`
The canonical data: `data/Map_v34_consolidated.json` in the repo

The build is in the "Update A series" of the explorer rebuild. Schema v15.3, dataset v34. The data layer is stable; the active work is presentation.

### Shipped builds (in order)

- **v4** (the project file `Map_v34_explorer.html`, ~98 KB). The base rebuild. Single-file HTML/CSS/JS, fetches the consolidated JSON at runtime, renders the 30 formal classifications as Mendeleev-style tiles. Persistent left-pane map plus right-pane sidebar with breadcrumb drill-down. Browse dropdown, rows-by chips, spotlight filters, draggable splitter, basic zoom. This is what GitHub Pages currently serves until Update A is uploaded.

- **Update A (138 KB)** — added cell-level content search, click-and-drag panning, wheel/trackpad zoom, six-tab Browse menu (Phenomena, Legend, About, Education, Research, All 30), separate About/Education/Research sidebar panels with copy structured after the v9/v12 reference. Phenomena layer introduced: 28 toggleable physical things mapped to the classifications that contain them. (Not deployed — superseded by A.1.)

- **Update A.1 (146 KB, deployed)** — fit-to-view zoom (the ⟲ button now fits the whole table to the viewport); tighter wheel zoom range (35%–200%) and pan clamping (map can't be dragged off-screen); per-category phenomena colors (7 distinct hues, multi-ring stacking when multiple categories hit one tile); identical-classification-set phenomena merged into single toggles, bringing the count from 28 to **25 total** ("Leptons / Higgs / W and Z bosons" was three toggles, now one; "Supermassive black holes / White dwarfs" was two, now one); About panel now the default; persistent sidebar quick-bar with Legend / Phenomena / About buttons one click away from any view. **Currently in production on the live site.**

### What's still on the table

- **Refactor** — split the explorer into ~5 files. Necessary before further feature work; the monolith is getting too large for AI-assisted edits to be efficient (each chat would burn 50K+ tokens just reading the file).
- **Update B** — restore the discourse layer (11 architectures, 11 open-frontiers, 7 experimental programs, totality approaches) and the cross-layer edges (bears-on, uses-classification, produces-classification, targets, hosts). The dataset already contains all of this; the explorer just doesn't render it yet. `PROJECT_GOAL.md` §2-§3 requires both layers visible and connected.
- **Update C** — polish: glossary panel, clickable on-map edges with detail cards, typography pass (KaTeX for inline math, scholarly serif body font like Crimson Pro or Spectral), in-tile cell visualization.
- **Step 5** — open the review pathway: issue templates, `/methodology/EDITORIAL.md`, outreach to 2-3 working physicists. Held until the explorer is shippable.

---

## How to start a new chat on this project

The project files are auto-attached when you open a new chat with this Claude project, so the AI has the methodology docs from the start. To restart the explorer work without retreading old ground:

1. Open a fresh chat in the same Claude project.
2. Confirm the assistant can see the project files (it can list them; ask if needed).
3. Tell it where in this document the work resumes — by section header. For example: *"Pick up at the five-file refactor described in EXPLORER_HANDOFF.md."*
4. If the assistant needs to see or edit the current explorer code, it should fetch it directly from GitHub via `web_fetch` against the raw URL (listed at the bottom of this document). **Do not attach the explorer file to project knowledge.** See "Project files should never contain the explorer code" below.

The MCP server tools may or may not be auto-loaded in a new chat — they're sometimes deferred behind `tool_search` rather than listed directly. If the Map of Physics tools aren't visible in the assistant's tool list, ask the assistant to call `tool_search` with the keyword "map of physics" or "formal classification". Once surfaced, the 25 read-only tools are the authority on schema, cell content, and edge semantics, and using them is always preferable to guessing or paraphrasing.

## Project files should never contain the explorer code

This is the most important operational rule in this document — it determines whether the project remains workable a year from now.

**Project files are for stable reference material.** Methodology docs, project goals, schema specs, this handoff doc. These hover around ~50 KB total and never grow.

**Project files are NOT for code that ships.** The explorer doubled in size in two iterations (98 KB → 146 KB) and will double again as the discourse layer and polish work land. If the explorer is attached to project knowledge, every future chat pays that size cost just to boot — and eventually a chat starting from scratch can't fit the file plus enough working room to do anything useful. The project becomes unusable.

**Instead:** the live explorer always lives in the GitHub repo. Future chats fetch only the modules they need via `web_fetch`, work on them in the chat, and the maintainer uploads the result back to GitHub. Project knowledge holds the handoff doc (which lists the fetch URLs) and the methodology — nothing more.

Practical implications:

- When uploading a new explorer build to GitHub, the maintainer does NOT also update project files. There is no "second upload step."
- The project files panel should contain: methodology docs (`PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, etc.), this handoff doc, and supplements like `PROJECT_GOAL_SUPPLEMENT.md`. The explorer HTML file should be removed from project files if it's currently there.
- If a one-off chat needs the explorer code, it fetches via `web_fetch` from the raw URLs. If for some reason `web_fetch` is unavailable, the maintainer can drag the file into the chat directly — this is a per-chat attachment that doesn't bloat project knowledge.

## Edits, not regenerations — how the work scales as the codebase grows

A reasonable worry on first encounter with this project: "If the explorer keeps doubling, eventually a chat won't be able to produce the file at all." This rests on a mistaken assumption — that an AI assistant has to regenerate the whole file every time it makes a change. It does not. The cost of an edit is the cost of the delta, not the cost of the whole file.

For a typical edit on a large module:

- **Fetching the file** — one-time cost per chat. A 100 KB file is roughly 25K tokens of input.
- **Locating the section to change** — read 30–80 relevant lines, ~1–2K tokens.
- **Making the change** — `str_replace` outputs only the changed string, almost always under 1K tokens.
- **Smoke-testing + shipping** — a few thousand more tokens.

Total for one substantial edit: comfortably under 30K tokens, with under 5K of it being output. The file size barely affects the output cost — what eats context is conversation length across many turns, and that resets every new chat.

**When a module does grow uncomfortably large**, the answer is to split it further — never to give up. The five-file refactor is the first split. If `explorer-sidebar.js` later grows to 120 KB, it becomes `explorer-sidebar-panels.js` + `explorer-sidebar-fc-view.js`. The codebase signals when by becoming hard to navigate. There is no fixed ceiling on number of files.

Two more techniques that push the ceiling out further when reached:

1. **Externalize prose content.** The About, Education, and Research panels are mostly prose. That prose does not need to live in JavaScript — it can move to standalone markdown files fetched at runtime by a thin renderer. The same applies to long glossary entries and lengthy descriptions. The code stays compact; the content becomes data.

2. **Run scripts instead of generating code.** For repetitive transformations (regenerate phenomenon-to-classification mappings from the current MCP server output, rebuild an index, validate cell counts), have the assistant write a small script that *does* the work in the bash tool, rather than emitting hundreds of lines of generated code into the response. The output of the script becomes a small artifact that gets committed.

Realistic headroom with the discipline above: the explorer can grow to 2–3 MB across 15–20 modules and remain fully editable by a single chat per session. That is enough for Update B, Update C, Step 5, and a substantial amount of work beyond.

The constraint that breaks this is not file size. It is two things: undisciplined splitting (modules allowed to balloon past 100 KB before anyone splits them), and conversation length (too many turns in one chat without starting fresh). Both are operational, not architectural.

## Iterating across milestones — going back is cheap

Updates aren't sequential locked phases. After Updates B and C land, you can still come back at any time to tweak A.1 features (or any earlier work). The cost of a tweak doesn't depend on what milestone you're currently in — it depends only on the size of the module being changed.

The pattern for a small revision to an earlier feature:

1. Open a fresh chat in the project.
2. Identify which module owns the feature using the **File-by-file architecture** section below.
3. Tell the chat: *"Fetch `<module>.js` from GitHub. Change X to Y. Smoke-test and re-ship just that file."*
4. Upload the returned single file to `/explorer/` in GitHub.

Most A.1 features are isolated to a single module — phenomena to `explorer-phenomena.js`, About copy to `explorer-sidebar.js`, fit-to-view to `explorer-map.js`. Tweaks to any of these are sub-50 KB chats with one-file commits. You can interleave these with milestone work freely.

The one thing to watch: a B or C task that touches code A.1 also touches (e.g. the discourse layer interacting with the phenomena overlay) is a genuine cross-cut. The chat handling it should flag the dependency explicitly so the maintainer knows A.1 behavior may shift. Most B/C work won't have this property — they add new code paths rather than modifying existing ones — but the convention is to call it out when it happens.

---

## The five-file refactor (do this before Update B)

The explorer is currently one ~150 KB HTML file. Split it into five so each future change only loads what it touches. Same folder, same deployment, same behavior — pure decomposition.

Target structure in `/explorer/`:

- `Map_v34_explorer.html` (skeleton: `<head>`, all CSS, the body's structural HTML, the script tags that load the four JS files in order, the data-fetch boot). Target ~50 KB.
- `explorer-data.js` — JSON fetch with fallback chain, in-browser transform (symbol assignment, sector/category derivation, yield-stats computation, edge indices), the `state` object, hash routing.
- `explorer-map.js` — `renderMap`, `renderTile`, the toolbar/chips/spotlights, zoom and pan (`applyZoom`, `clampPan`, `zoomFitToView`, drag-pan, wheel-zoom).
- `explorer-sidebar.js` — `renderPanel`, the FC view, the cell view, the About/Education/Research/Legend renderers, the sidebar quick-bar, the splitter.
- `explorer-phenomena.js` — `PHENOMENA` array, `PHEN_CAT_COLORS`, `PHEN_BY_FC` index, `renderSidebarPhenomena`, the phenomena toggle logic, the phen↔phen overlay rendering.

Rules for the split:
- Each JS file is loaded as a plain `<script>` tag in order (data → map → sidebar → phenomena → boot). No bundler. Functions/constants attach to module scope; cross-file references just work because they're all global.
- Don't introduce ES modules — they break the runtime fetch-from-local pattern when the explorer is opened directly as a file (which the maintainer sometimes does for offline checks).
- All five files live in `/explorer/`. The fallback fetch chain in `explorer-data.js` continues to work because the JSON is in `/data/` (one level up).
- After the split, smoke-test (see the JSDOM pattern below) to confirm no regressions, then commit all five files in a single PR.

When the refactor is shipped, the chat that did it should append a new section to **this handoff doc** titled "File-by-file architecture (post-refactor)" — listing which functions and constants live in which module, which file to edit for which kind of change, and the dependency direction (`explorer-data.js` defines `state` and is loaded first; `explorer-phenomena.js` depends on `state`; `explorer-map.js` and `explorer-sidebar.js` both depend on `state` and on phenomena but not on each other). One screen of orientation that lives where future chats already look. Do not create a separate `EXPLORER_ARCHITECTURE.md` — one handoff doc, one read.

---

## Update B — restoring the discourse layer

The dataset already contains 11 architectures (string theory, asymptotic safety, loop quantum gravity, etc.), 11 open frontiers (quantum gravity, hierarchy problem, baryogenesis-mechanism, etc.), 7 experimental programs (LHC, LIGO, Planck, etc.), and totality approaches. Each has its own node type. They're connected to formal classifications by typed edges:

- `bears-on` — a formal classification bears on an open frontier or totality approach. (Example: spacetime-symmetry-groups bears on the quantum-gravity frontier.)
- `uses-classification` — an architecture or open frontier uses a formal classification. (Example: string theory uses ADE classifications.)
- `produces-classification` — an experimental program produced a classification. (Example: LHC produced sm-rep-content cells.)
- `candidate-targeting` — a candidate-foundational program targets an open frontier.
- `hosts` — a totality approach hosts an architecture.
- `cross-classification` — classification ↔ classification (already rendered as edges in v4).

Query the MCP server for the current count and content; do not guess. The PROJECT_GOAL §8 "five-click test" requires a user to get from any frontier to (a) its structural reason, (b) the classifications bearing on it, (c) the targeting programs in fewer than five clicks. That defines the success criterion for Update B.

Design question still open: how do the two layers sit on screen?

- **Option a** — two side-by-side panes (formal classifications on the left as today, discourse nodes on the right). Edges drawn between.
- **Option b** — one unified grid with visual differentiation (different tile shapes, or grouped row bands).
- **Option c** — toggle between layers; clicking a node in one layer highlights its connections in the other.

The maintainer should decide based on prototyping. The recommended path is to mock all three quickly (HTML sketches, no functionality) and pick one before writing the renderer. An older mockup of the project (the v12 review deck) used Option (a) with edges drawn in SVG between two panes; if the maintainer has it locally, they can attach it to the refactor chat for reference, but the refactor doesn't require it.

---

## Update C — polish

Backlog, no order:

- Glossary panel — the dataset has 22 entries; surface them as a fourth sidebar quick-bar tab, with cross-links from terms inline in tile descriptions.
- Clickable on-map edges — currently the phen↔phen overlay draws lines but they're not interactive. Make them clickable, opening a detail card describing the edge's basis.
- Typography pass — bring in KaTeX for inline math (LaTeX in cell descriptions), a scholarly serif for body text (Crimson Pro or Spectral, both free). The v12 reference shows the target aesthetic.
- In-tile cell visualization — for classifications with small cell counts (under 20), show a mini-grid of the actual cells inside the tile preview, so the structure is visible at a glance without drilling in.

---

## Working norms

### Non-developer maintenance

The maintainer does not write code, does not run a terminal, does not have local Node.js, does not use git command-line. All deployment happens via the GitHub web UI — `Add file → Upload files → drag → commit`. Every instruction in this build must end in something the maintainer can click. Phrases like "run the test suite" or "push to a branch" need to be replaced with explicit web-UI steps.

### File size cap

Aim to keep individual files under 100 KB. The monolith approach broke down at ~150 KB. After the refactor, each module should target 30-60 KB and the HTML skeleton under 50 KB. If a single file is approaching the cap, that's the signal to split it further.

### Smoke testing under JSDOM

The pattern that's been working: when an edit is made to the explorer, run a Node.js JSDOM script that loads the HTML with a stub dataset (3 classifications minimum to exercise rendering), then exercises the new feature programmatically. Check the DOM for expected elements, simulate clicks, verify state updates. This catches integration errors that a syntax check misses.

Pattern (write into `/home/claude/smoketest.js` in a scratch dir):

```js
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('explorer.html', 'utf8');
const stubData = { /* minimal 3-classification dataset matching schema v15.3 */ };
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  beforeParse(window) {
    window.fetch = () => Promise.resolve({
      ok: true, json: () => Promise.resolve(stubData)
    });
  }
});
// wait for init, then assert on DOM
```

Run with `node smoketest.js`. Smoke test is a sanity check, not a full test suite — the real validation is the maintainer eyeballing the live page after upload.

### Data integrity (firewall)

`META_v21_1_methodology_firewall.md` is load-bearing. Cell content, axis labels, citation text, and edge semantics are NOT to be paraphrased in code or in commits. When in doubt, query the MCP server (it serves the canonical schema and content). New formal classifications, new cross-classification edges, and new predictive-yield entries go through PRs against the schema, gated by the CI tripwire — they are NOT inserted ad-hoc by the explorer.

This affects the explorer in one specific way: the phenomena layer in Update A added a mapping from "everyday names of physical things" to formal classifications. That mapping is a presentation-layer artifact, not a schema change, so it lives in the explorer's JS, not in the consolidated JSON. The mappings were verified against the live MCP server before being hardcoded. If they need updating (e.g., a new classification is added that contains photons), update the JS — not the data.

### The MCP server is the authority

Before guessing what's in the dataset, query `https://map-of-physics.eddie-8e5.workers.dev`. The 25 read-only tools cover every node type, every edge type, and the glossary. Use them to verify mappings, check cell counts, find which classifications contain a particular cell, and so on. Output from the MCP server is the truth; cached knowledge in an assistant's context window is not.

---

## Lessons from the build so far

- **The "width: 100/zoom %" trick** in the map wrapper is clever but counterintuitive. It makes the visible map always span the full pane width regardless of zoom level, with the tile-wrapping reflowing as zoom decreases. Future modifications to the zoom logic should preserve this behavior — without it, low zoom leaves empty space on the right.
- **Pan clamping needs the visible-height calculation**, which depends on `wrap.scrollHeight * state.zoom`. Naively clamping pan to a fixed range causes the map to vanish off-screen when zoomed in.
- **Phenomena merging revealed a real pattern** — leptons, higgs, and W/Z bosons all live in just SM + GUT, nowhere else. SMBHs and white dwarfs both live in just compact-astrophysical-objects. The merged-toggle UI surfaces this structurally instead of forcing the user to discover it by toggling individually. This kind of automatic merge is in spirit with what the project is about; expand it when adding new phenomena.
- **Eleven formal-mathematical classifications** (ADE families, Freed-Hopkins, CFT bootstrap, generalized symmetries, Higgs/Coulomb branches, N=2 SCFT, modular tensor categories, macroscopic-classical-phenomena, plus three more) do not map to any physical phenomenon. They're pure mathematical scaffolding. When phenomena toggles are active, these tiles correctly remain faded. Don't try to force a mapping.
- **Initial-load fit-to-view** matters more than expected. The default zoom of 100% made the map larger than typical viewports, requiring users to scroll or zoom out before they understood what they were looking at. Auto-fitting on boot solves this. Restore this behavior in the refactor.
- **The 80-pixel sidebar quick-bar** (Legend / Phenomena / About) provides one-click access without taking serious vertical space. Tabs in the sidebar header consistently outperform burying navigation in the Browse dropdown for non-developer users.

---

## Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- Live URL: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev`
- Canonical data: `/data/Map_v34_consolidated.json` (1.37 MB) — single source of truth
- Per-FC entry files: `/data/entries/` (build artifact, regenerable)
- Methodology docs: `/methodology/PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `META_v21_1_methodology_firewall.md`, this file
- Explorer: `/explorer/Map_v34_explorer.html` (post-refactor: also `explorer-data.js`, `explorer-map.js`, `explorer-sidebar.js`, `explorer-phenomena.js`)
- CI: `.github/workflows/` — schema + invariant validators on PRs

### Raw URLs for `web_fetch` (the way a new chat sees the current explorer)

The HTML monolith (until refactor):
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/Map_v34_explorer.html`

The data file:
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`

After the five-file refactor lands, these URLs become available (same path pattern):
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-map.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-sidebar.js`
- `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-phenomena.js`

A chat working on a single concern fetches only the modules it needs — usually two files, rarely all five — keeping each chat's context budget small.

Version numbers are git tags from v34 onward, not filenames. The era of `MAP_vN_*.json` filenames is closed.
