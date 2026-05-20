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

- **Update A.1 (146 KB, ready to deploy)** — fit-to-view zoom (the ⟲ button now fits the whole table to the viewport); tighter wheel zoom range (35%–200%) and pan clamping (map can't be dragged off-screen); per-category phenomena colors (7 distinct hues, multi-ring stacking when multiple categories hit one tile); identical-classification-set phenomena merged into single toggles ("Leptons / Higgs / W and Z bosons" and "Supermassive black holes / White dwarfs"); About panel now the default; persistent sidebar quick-bar with Legend / Phenomena / About buttons one click away from any view.

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
4. If the current live explorer state matters, also attach the latest deployed HTML file from the repo (the assistant can read it via `view`).

The MCP server tools may or may not be auto-loaded in a new chat. If a query against the dataset would be useful, ask the assistant to call the Map of Physics tools — these are the authority on schema, cell content, and edge semantics, and using them is always preferable to guessing or paraphrasing.

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

Document the split in a short `EXPLORER_ARCHITECTURE.md` placed next to this file: which functions live where, what to edit for what kind of change, the dependency direction (data → everything else; phenomena → data; sidebar/map → data; map and sidebar are independent of each other).

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

The maintainer should decide based on prototyping. The recommended path is to mock all three quickly (HTML sketches, no functionality) and pick one before writing the renderer. The v12 reference deck in `/mnt/user-data/uploads/Map_v12_review.html` (if still available) used Option (a) with edges drawn in SVG between the two panes.

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

Version numbers are git tags from v34 onward, not filenames. The era of `MAP_vN_*.json` filenames is closed.
