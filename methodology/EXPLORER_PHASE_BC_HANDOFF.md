# Explorer Phase B + C surfacing — handoff and process

**Purpose of this file.** Standing reference for the next phase of explorer work — extending the live explorer to render the Phase B (`if_real_implies`) and Phase C (`quantitative_scale`, `resolves` edges, 12 new forward-looking experimental-program nodes) content that has accumulated in the dataset since the Update C builds shipped. Companion to `EXPLORER_HANDOFF.md` (the previous explorer handoff, which documents the file architecture, working norms, and shipped state through Update C — all of which carries forward unchanged into this phase). Picks up the explorer build after a ~6-month pause during which the data-side phases B and C landed.

Location: `/methodology/EXPLORER_PHASE_BC_HANDOFF.md` in the repo. Attach to project knowledge so AI sessions see it automatically.

---

## 0. Read this first — state-verification opens every session

The Predictive Layer Phase C handoff established the discipline that authoring sessions ship work without proportionally updating handoff documents, and that this drift is best caught by verifying live state at session start. The same discipline applies here. Three authoritative sources:

1. **Live MCP server.** Call `server_info`. Note `data_version`, `schema_version`, and the cumulative counts. Current expected state: `data_version: v95`, `schema_version: v19`, `83 nodes`, `230 edges`, `19 experimental_programs`, `14 if_real_implies_carriers`, `288 quantitative_scale_total`, `38 resolves_edges`.
2. **Live explorer.** Open `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`. Look at the banner / About panel. Today's expected baseline: serves v34 data from `data/Map_v34_consolidated.json`, renders the twelve-file build (1 HTML + 4 CSS + 7 JS — the eleven-file Update C build plus `explorer-resolves.js` from sub-PR E2). The 12 forward-looking experimental-program nodes render correctly via the existing renderer (sub-PR E1 closure audit, 2026-05-27); the 38 resolves edges render as a "Resolves" section on each program card and as a "Targeted by" section on the cells / frontiers / totality-approach they address (sub-PR E2, 2026-05-27). The explorer **picks up the canonical JSON at runtime**, so the dataset is current to v95; the remaining Phase B and Phase C content (if_real_implies trees, quantitative_scale callouts beyond the minimal-inline form shipped in E2) is in the data being fetched but is **rendered nowhere** until sub-PRs E3 and E4 ship.
3. **The repo's `/methodology/` directory.** This handoff sits alongside `EXPLORER_HANDOFF.md`. The previous handoff documents the file architecture, the no-project-files-for-code rule, the edits-not-regenerations principle, the iterating-across-milestones pattern, and the 11-file module breakdown. **Everything in `EXPLORER_HANDOFF.md` carries forward**; this document supplements it for the Phase B + C surfacing work only.

If the live system has drifted further than the counts above, the session catching the drift updates this handoff at the end of its work. **All such updates ship as complete files via `present_files`, not as patches** — see §4 working norms.

---

## 1. Why this handoff exists — the gap

The data layer has grown three schema versions and roughly half the dataset's content since the explorer last shipped. The explorer renders the data-shape signatures of those new nodes (the 12 forward-looking experimental-program nodes, since E1) and the new resolves-edge surfaces hanging off them (since E2), but nothing yet of the if_real_implies trees or the cumulative quantitative_scale callouts sitting on cell / prediction / frontier / totality-approach surfaces.

What the explorer **does** render today (per `EXPLORER_HANDOFF.md`, plus the E1 and E2 closures):

- 30 formal-classification tiles with cell grids, yield bars, falsified flags, in-tile cell viz, category stripes
- 484 cells with content / observational status / axis values / predictions / realized examples / citations
- 97 cross-classification edges (clickable, with cell-ref pills, citations, on-map phen↔phen overlay arrows)
- The discourse layer: 41 non-FC nodes (architectures, regime-content, open-frontiers, totality-approaches, **19** experimental-programs — the 7 historical + 12 forward-looking) and the ~89 discourse-layer edges connecting them to FCs
- The 22-entry glossary panel
- KaTeX math rendering across all prose surfaces
- The 38 Phase C resolves edges — rendered as a "Resolves" section on each experimental-program card and a "Targeted by" section on each cell / frontier / totality-approach target card. Each row carries the sensitivity (with bound-direction symbol when uncertainty is null), the timeline pill, the bounds-setting pill when `exclusion_only: true`, the description prose, and an inline competing-predictions block when `predictions_per_program` is populated (sub-PR E2, 2026-05-27).

What the explorer **does not** render today, despite all of this content being present in the v95 data file being fetched at runtime:

| Content surface | Count | Surfaced by MCP tool | Rendered in explorer |
|---|---|---|---|
| `if_real_implies` carriers (open-frontier or totality-approach) | 14 carriers | `find_signal_implications` | No |
| `if_real_implies` resolutions | 23 | `find_signal_implications` | No |
| `if_real_implies` implications (kind ∈ {new_cell, new_axis, forced_edge, promotes_subtype, new_FC}) | 24 | `find_signal_implications` | No |
| 12 new forward-looking experimental-program nodes (DUNE, Hyper-K, JUNO, gw-ground-network, LISA, CMB-S4, Rubin-LSST, DESI, axion-haloscope-network, EDM, muon-g-2-continuation, FCC) | 12 | `list_experimental_programs` | **Yes (since sub-PR E1 closure audit, 2026-05-27 — surfacing-side renderer was already current, see §3 sub-PR E1)** |
| `resolves` edges (experimental-program → cell or open-frontier or totality-approach, carrying sensitivity / timeline / predictions_per_program / exclusion_only) | 38 (13 with populated competing-prediction lists) | `find_resolvers`, `find_discriminating_experiments` | **Yes (since sub-PR E2, 2026-05-27 — new `explorer-resolves.js` module + indexing in `explorer-data.js` + call-sites in the program / cell / frontier / totality cards)** |
| `quantitative_scale` entries — frontier / totality-approach surface | ~13 | `rank_by_scale`, `get_node` | No |
| `quantitative_scale` entries — cell-direct surface | ~185 | `find_cells` (with qs filters), `find_bounds` | No |
| `quantitative_scale` entries — prediction-level surface (cell.predictions[] and FC.predictive_yield[]) | ~78 | `find_predictions` (with qs filters), `find_bounds` | No |
| `quantitative_scale` entries — bears-on edge surface | <5 | `find_bounds` | No |
| `quantitative_scale` entries — if_real_implies implication surface | 12 | `find_signal_implications` | No |
| **Total `quantitative_scale` entries** | **288** | | **No** |
| v19 `bound_direction` enum (lower / upper / two-sided / unspecified) on every qs | 288 fields | per-tool | No |

A physicist landing at the live explorer URL sees a competent Phase A presentation, the 12 forward-looking experimental-program nodes correctly catalogued in the Browse menu and discourse cards, the 38 resolves edges rendering as a Resolves section on each program card and as a Targeted by section on each cell / frontier / totality-approach card they address (sub-PR E2, 2026-05-27), and no visual evidence the Predictive Layer's `if_real_implies` implications and `quantitative_scale` callouts exist. This is the remaining gap to close before Track 4 outreach (per `TRACKS_AFTER_PHASE_A.md`), because the explorer is the primary surface a working physicist will judge the project on.

---

## 2. What to surface — and where in the UI

Six content categories to surface, sketched here. Each becomes a sub-PR in §3. The sketches name the UI placement candidates and the design questions the implementing chat should resolve before authoring code.

### 2.1 The 12 forward-looking experimental-program nodes

**What.** DUNE, Hyper-K, JUNO, gw-ground-network, LISA, CMB-S4, Rubin-LSST, DESI, axion-haloscope-network, EDM, muon-g-2-continuation, FCC. These are nodes of `type: experimental-program`, same shape as the 7 historical programs the explorer already renders (PDG, ATLAS+CMS, UA1+UA2, CDF+D0, DONUT, BNL+SLAC, Fermilab-Upsilon). They carry `operational_period`, `host_institutions`, `produced_classifications`, and a `subtype` field that includes values (`survey-program`, `accelerator-program`) which the existing renderer was anticipated to need updates for.

**Where it goes.** Inside the existing discourse layer. The Browse menu's "experimental-programs" tab and the discourse panel pick them up via the existing `explorer-discourse.js` paths.

**Status (closed):** Sub-PR E1 closure audit (2026-05-27) verified the surfacing-side renderer was already current — the data-side PRs that landed the 12 new programs (sub-PR 0.5 / v40) had also updated `PROGRAM_SUBTYPE_LABELS`, `formatOperationalPeriod` (with the `start > currentYear` → "expected from YYYY" branch and `planned: true` flag), the `dx-program-period.dx-program-planned` CSS class (italic + muted + dashed border), the browse-menu `groupOrder`, and the `full_name` rendering in `renderDiscourseCardHead`. The 12 forward-looking program cards render cleanly with head + About + Host institutions + Key publications.

### 2.2 `resolves` edges (38 total)

**What.** A new edge type connecting an experimental-program node to a cell, an open-frontier node, or a totality-approach node. Each edge carries `sensitivity` (a `quantitative_scale` describing the program's reach), `timeline` (when results are expected), `predictions_per_program` (an array of competing point predictions from SM-side or BSM-side theory programs), and `exclusion_only` (boolean — true when the program excludes rather than measures). 38 edges spread across 11 of the 12 forward-looking programs.

**Where it goes.** Two reasonable placements, not mutually exclusive:

- **In the experimental-program discourse card**, a new section titled e.g. "Resolves" listing each target the program addresses, each with sensitivity + timeline. One row per resolves edge. The discourse-edges card precedent from Update C is the closest existing surface.
- **In the cell / frontier / totality-approach sidebar view**, a new section titled e.g. "Targeted by" listing each program that resolves the selected node, each with the same metadata. Mirrors the bidirectional `find_resolvers` call.

**Design questions.** Should `predictions_per_program` (when present — currently on 13 of 38 edges) render inline as discriminating-target metadata, or live in a sub-panel? When `exclusion_only: true` (rubin-lsst on σ_8, WDM, PBH-microlensing for example), how does the UI signal that the program is excluding rather than measuring? An icon or pill, probably.

**Status (closed):** Sub-PR E2 (2026-05-27) shipped both sections. See §3 sub-PR E2 below for the closure note.

### 2.3 `if_real_implies` — conditional structural consequences (Phase B)

**What.** 14 open-frontier or totality-approach nodes (qg-frontier, cc-frontier, bh-info-paradox, turbulence, koide-formula, muon-g-2, chpt, hierarchy-problem, strong-cp-problem, flavor-puzzle, measurement-problem, matter-antimatter-asymmetry, dark-matter, topological-phases-classification) each carry one or more `if_real_implies` resolutions. Each resolution has a `condition`, `condition_citations`, and one or more `implications`. Each implication has a `kind` (one of {new_cell, new_axis, forced_edge, promotes_subtype, new_FC}), a `target` (id or descriptive string of the structural object the implication forces / promotes), a `description`, and `derivation_citations`. 12 of the 24 implications additionally carry a `quantitative_scale` (the Davidson-Ibarra bound on the Dirac-vs-Majorana implication is the canonical example).

**Where it goes.** Inside the discourse card for each carrier (currently the only places frontiers and totality-approaches appear in the explorer is via the discourse layer / Browse / phenomena overlays). A new section "If real, implies…" with one expandable group per resolution. Each group shows the condition prose, the implications as a small graph or list with kind icons + target pills, and the qs callout where present.

**Design questions.** A `forced_edge` implication's target is a `{from, to, subtype}` triple referencing other nodes — should that render as a tiny edge diagram or as three pills? The `promotes_subtype` implications target a specific cell-id — should the implication be clickable and walk to that cell? Almost certainly yes. The `condition_citations` and `derivation_citations` lists can be long (5-10 entries) — collapse them by default?

### 2.4 `quantitative_scale` rendering (288 entries across 5 surfaces)

**What.** A structured numerical commitment with these fields: `kind` (one of {energy_scale, mass, length, time, coupling, dimensionless, ratio, sigma_deviation}), `value` (number), `units` (string, required for dimensional kinds), `log10` (boolean, optional), `uncertainty` (null, scalar, or {low, high} object), `bound_direction` (v19: {lower, upper, two-sided, unspecified}), `citations` (array, ≥1 entry, each a long descriptive string typically including the source-value phrase).

This single shape appears on five surfaces (frontier / totality-approach nodes, cells, predictions, bears-on edges, if_real_implies implications). Render once, reuse everywhere.

**Where it goes.** A reusable callout component shaped roughly like:

> M₁ ≳ 10⁹ GeV   *(log10 GeV = 9, lower bound)*
> Davidson-Ibarra 2002 …

The kind drives the units display (energy_scale + log10 + GeV renders as 10⁹ GeV, mass + M_sun renders as M_sun, dimensionless renders without units, sigma_deviation renders as Nσ). bound_direction renders as a small pill or symbol (≳ for lower, ≲ for upper, = for two-sided exact value, ~ for unspecified). The citations array is the same long-prose form used everywhere else in the dataset and should render in the existing citations chrome.

**Design questions.** When a value has both `log10: true` and asymmetric uncertainty `{low, high}` (like the QCD-axion DM window, log10 GeV = 11.5 ± 0.5), the display should make it obvious that the uncertainty is on the exponent, not on the value. KaTeX rendering (already loaded) handles `10^{11.5 \pm 0.5}` cleanly. When uncertainty is null and bound_direction is two-sided, the value is an exact theoretical / structural commitment (Q = 2/3, η/s = 1/(4π)); the display should signal "exact" rather than "central value of a measurement" — perhaps no error bar at all rather than the somewhat-misleading "± 0".

### 2.5 Tile / discourse-node decoration for Phase B + C coverage

**What.** Tile-level and discourse-node-level visual indicators for what Phase B + C content the node carries, analogous to the in-tile cell viz from Update C. Examples: a small chip on an FC tile when ≥1 cell carries `quantitative_scale`; a small chip on an open-frontier discourse card when the node carries `if_real_implies`; a small chip on an experimental-program node when it owns ≥1 resolves edge.

**Where it goes.** Tile chrome (existing Update C pattern). One pixel of metadata per concept; the heavy lifting is in the sidebar view that opens on click.

**Design questions.** Two competing impulses: (a) signal that there's *more content available here*, drawing the eye, vs (b) avoid further tile clutter (Update C already added the cell-viz grid + falsified flag + discourse-highlight ring badges). The implementing chat should resolve before authoring — probably the right answer is a single mute indicator per category, not a count, with the actual numbers in the sidebar.

### 2.6 New panels enabled by the MCP tool surface (optional, lower priority)

**What.** Two Phase C MCP queries don't naturally belong to any existing sidebar view:

- `rank_by_scale(kind, node_type)` — rank every qs entry of a given kind across nodes. The "scales chart" view a working physicist might use to see the project's coverage at a glance.
- `find_discriminating_experiments(program_a, program_b)` — pick two experimental-program nodes, get the shared targets where their resolves edges meet, with the complementary detector-physics rationales surfaced from `predictions_per_program`. This is the flagship Phase C AI-first query.

**Where it goes.** Each as a new top-level panel reachable from the toolbar, alongside the existing Browse / phenomena / discourse panels. Or as deep-linked routes (`#/ranks/kind/energy_scale`, `#/discriminating/hyper-k/dune`).

**Design questions.** These are net-new UI surfaces, not extensions of existing ones, and are higher-cost than sub-PRs E1–E5. Worth a maintainer call on whether to ship them as part of the Phase B + C surfacing pass or defer them to a later iteration. The explorer becomes legitimately useful without them; with them it becomes a serious working tool.

---

## 3. Proposed sub-PR sequence

Eight sub-PRs, each shippable independently, each scoped to one chat. The first five close the "data present but UI invisible" gap end-to-end; the last three are discretionary polish and net-new views.

### Sub-PR E1 — pick up the 12 new experimental-program nodes — CLOSED (verification-only, 2026-05-27)

Closed without code diff. Audit of `explorer-discourse.js` and `explorer-data.js` against the canonical v95 data found the surfacing-side renderer was already current — the changes that would have constituted E1's work were completed in step with the data-side PRs that landed the 12 new programs (sub-PR 0.5 / v40), even though no surfacing-pass sub-PR was open at the time. Specifically verified: (a) all four subtype labels (`data-curation-collaboration`, `experimental-collaboration`, `accelerator-program`, `survey-program`) present in `PROGRAM_SUBTYPE_LABELS`; (b) `formatOperationalPeriod` handles `start > currentYear` → "expected from YYYY" with `planned: true`; (c) CSS `dx-program-period.dx-program-planned` styles forward-looking pills with italic + muted color + dashed border (update-b.css:104); (d) browse-menu `groupOrder` includes all four subtypes with current introductory copy; (e) `renderDiscourseCardHead` displays `full_name` when distinct from `label`; (f) data-layer indexing in `explorer-data.js` flows all 19 programs through `discourse_by_id` and `discourse_by_type['experimental-program']` without issue; (g) the empty `produces-classifications` section for the 12 new programs is correctly hidden by `renderEdgeSection`'s `hideWhenEmpty: true`. The 12 forward-looking program cards render cleanly with head + About + Host institutions + Key publications; the resolves-edge section is intentionally absent until sub-PR E2.

This is the surfacing-pass analogue of the Phase C worker rebuild: real work dispatched outside the formal queue, verified by direct inspection rather than by a queue artifact. The closure pattern is recorded in §7 so future sessions know to audit before assuming a queued sub-PR has substantive code work — the formal queue is a recommendation, not a guarantee that work hasn't already shipped.

### Sub-PR E2 — render `resolves` edges — CLOSED (2026-05-27)

A new edge type. Two sub-tasks: (a) the "Resolves" section in the experimental-program discourse card; (b) the "Targeted by" section in the cell / frontier / totality-approach sidebar view. Eighth JS file `explorer-resolves.js` added, per the "one new logical surface = one new module" precedent.

**Closure summary.** Shipped the following files:

- **NEW `explorer/explorer-resolves.js`** (~270 lines) — exports `renderResolvesFromProgram(programId)` and `renderTargetedByTarget(targetId)`, plus local helpers: `formatQS` (minimal-inline qs renderer; E4 will absorb and refactor), `renderCompetingPredictions` (inline list under each row), `renderResolvesTargetPill` (cell-or-discourse-node deep-link), `renderResolvesProgramPill`, `renderResolvesRow` (shared row chrome with arrow + head pills + sensitivity line + description + competing-predictions block).
- **`explorer/explorer-data.js`** — added three resolves indexes (`resolves_by_program`, `resolves_by_target`, `resolves_by_id`) and a supporting `cell_id_to_fc_id` reverse-lookup map (484 cells, no collisions). `_meta.counts.resolves_edges` populated to 38. No change to `DISCOURSE_EDGE_TYPES` — resolves edges have distinct shape (sensitivity / timeline / predictions_per_program / exclusion_only) that doesn't fit `renderEdgeRow`, so they get their own indexes and renderer.
- **`explorer/explorer-discourse.js`** — three call-site additions: in `renderProgramCard` after `Produces classifications`; in `renderFrontierCard` after `Programs targeting this frontier`; in `renderTotalityCard` after `Architectures interfering here`. Each call is gated by `typeof renderResolvesFromProgram === 'function'` / `typeof renderTargetedByTarget === 'function'` so the discourse module degrades gracefully if the resolves module hasn't loaded.
- **`explorer/explorer-sidebar.js`** — call-site addition in `renderSidebarCell` after the `Predictions for this cell` section, plus pill-wiring (`[data-fc-cell-jump]`, `[data-disc-jump]`) replicated locally since `renderSidebarCell` doesn't go through `wireDiscourseCardLinks`.
- **`explorer/update-c-edges.css`** — appended ~155 lines of CSS for `.dc-resolves-row`, `.dc-resolves-head`, `.dc-resolves-arrow`, `.dc-resolves-sensitivity`, `.dc-resolves-prefix`, `.dc-resolves-bd`, `.dc-resolves-units`, `.dc-resolves-citations`, `.dc-resolves-citation`, `.dc-resolves-desc`, `.dc-resolves-ppp*`, `.dx-pill.dx-timeline-pill`, `.dx-pill.dx-bound-pill`.
- **`explorer/Map_v34_explorer.html`** — added `<script src="explorer-resolves.js"></script>` after the existing `explorer-discourse.js` script tag.

**Decisions taken** (per the proposal in this sub-PR's authoring chat):

- (1) Module layout — new eighth JS file `explorer-resolves.js`.
- (2) qs rendering — minimal inline now (option (a)), E4 absorbs.
- (3) PPP layout — inline competing-predictions list (option (a)).
- (4) `exclusion_only` signal — "Bounds-setting" pill (dashed border, italic, muted) when explicitly true; no pill when false or absent. Bound-direction symbol (≳ / ≲ / = / ~) leads the sensitivity value when uncertainty is null (Rule 34); symbol suppressed when uncertainty is non-null.
- (5) Cell-card placement — after `Predictions for this cell`, before `Citations`.
- (6) Frontier-card placement — after `Programs targeting this frontier`, before `Empirical loci`.
- (7) Totality-card placement — after `Architectures interfering here`, before `Classifications that bear on this totality`.

**Verified** (vm-context smoke test in the authoring chat):
- All 38 resolves edges indexed by program (38/38 coverage) and by target (38/38 coverage).
- Twelve forward-looking programs render: hyper-k (4), dune (4), juno (4), rubin-lsst (4), fcc (4), gw-ground-network (3), lisa (3), desi (3), axion-haloscope-network (3), cmb-s4 (3), edm-program (2), muon-g-2-continuation (1).
- `renderTargetedByTarget(cell-pd-Kplus-nubar-SUSY)` returns 3 rows (HK + DUNE + JUNO discriminating-resolves cluster, sub-PR 48 precedent).
- `renderTargetedByTarget(muon-g-2)` returns 1 row (sub-PR 53 muon-g-2-continuation, the project's first `exclusion_only=false` resolves edge with populated competing-predictions).
- `renderTargetedByTarget(cc-frontier)` returns 2 rows (DESI sub-PR 50 + Rubin sub-PR 56, the parallel-resolves-edge cluster on cc-frontier).
- All 4 syntax-clean files compile under `new Function()`.

**Known follow-up surfaced by E2** (queued for the post-E5 audit pass per `PHYSICIST_FACING_VOCABULARY.md` §9):

- A subset of resolves-edge `description` fields contain curator-internal vocabulary ("exclusion_only", "bound_direction", "predictions_per_program", "T30/T31/T33 sensitivity-encoding-convention", "§4 admissibility-test", "PPP") that renders verbatim in the UI per the load-bearing rule. 17 of 38 edges contain "exclusion_only" in description text; 28 of 38 contain "bound_direction"; 5 of 38 contain "quantitative_scale"; 13 of 38 contain "predictions_per_program". This is a data-side concern (description-rewrite pass through each edge) rather than an explorer-side bug. The §9 periodic-audit clause covers it; a dedicated content-rewrite sub-PR may be the right vehicle, sequenced after E5 closure and before Track 4 outreach launch. The current explorer renders the descriptions verbatim because paraphrasing curator-authored content is forbidden by `EXPLORER_PHASE_BC_HANDOFF.md` §4.

### Sub-PR E3 — render `if_real_implies` on frontier / totality-approach cards

Phase B content. A new section in the discourse card for the 14 carrier nodes, with one expandable group per resolution → implication tree. Likely extends `explorer-discourse.js` (the existing card renderer for these node types) plus a small new helper module or extension for the implications rendering itself.

### Sub-PR E4 — render `quantitative_scale` callouts (the reusable component)

The component. Build the qs-display once, place it everywhere the data exists. Surfaces: (a) cell sidebar view, (b) cell-prediction list items, (c) FC predictive_yield items, (d) frontier / totality-approach card section, (e) the if_real_implies implications from sub-PR E3. The component is the same; the placement varies. Likely a new module `explorer-qs.js` exporting the renderer plus several call-sites in `explorer-sidebar.js` and `explorer-discourse.js`.

### Sub-PR E5 — tile / discourse-node decoration

The visual signal layer. Small chips or indicators on tiles and discourse nodes when they carry Phase B / Phase C content. Touch `explorer-map.js` (tile decoration) and `explorer-discourse.js` (discourse-node card decoration), plus CSS.

### Sub-PR E6 — `rank_by_scale` overview panel *(discretionary)*

New top-level view. Reach via toolbar button. Useful for the working physicist who wants the "what's the coverage by kind?" question answered in one glance. New module `explorer-ranks.js`.

### Sub-PR E7 — `find_discriminating_experiments` view *(discretionary)*

New top-level view. Pick two programs, see what they jointly resolve, with the per-program SM-vs-BSM prediction differentials surfaced. The flagship Phase C AI-first query — the project's most discriminating demo target for outreach (per the Phase C handoff §3). New module `explorer-discriminating.js`.

### Sub-PR E8 — explorer banner + About panel refresh *(housekeeping)*

The live explorer's About / banner / help-overlay text refers to v34 / schema v15.3 / 71 nodes / 7 experimental programs. The data has moved to v95 / v19 / 83 nodes / 19 programs. Update the user-facing text to reflect current state. One-file touch (the HTML).

### Sequencing constraints

E1 closed first (verification-only). E2 closed second (full implementation, 2026-05-27). E4 ships next; resolves edges hang off the experimental-program nodes that E1 verified rendering for and the qs callout component will absorb the minimal-inline `formatQS` shipped in E2. E4 (the qs component) should precede E3 by a little — the if_real_implies implications carry quantitative_scale entries that E3 should render via the E4 component. But E3 and E4 can also ship in either order with the qs section of implications lighting up when both are in. E5 (decoration) makes most sense after E1–E4 since those are the surfaces being decorated. E6, E7, E8 are independent of each other and of E1–E5.

The natural cadence: ~~E1~~ → ~~E2~~ → E4 → E3 → E5 → (E8 alongside any earlier sub-PR as a stowaway one-line edit) → E6 → E7 if maintainer chooses.

---

## 4. Working norms

Inherited from `EXPLORER_HANDOFF.md`, with these deltas / clarifications for Phase B + C surfacing:

- **Non-developer maintenance — full files only.** The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. **Every deliverable in every sub-PR** — explorer code modules, CSS files, methodology document updates, anything that ends up in the repo — ships as a complete file via the `present_files` tool. Patches, per-line diff blocks, and "replace §X with this" splice instructions are forbidden; they require manual splicing that slows the project significantly and introduces splice errors. The norm applies equally to JS modules, CSS, and markdown methodology documents. Documented in `PROJECT_NEXT_STEPS.md` §6 norm #1.
- **Don't paraphrase content fields.** Quantitative_scale citations contain inline source-value-phrase prose (the Phase C admissibility test §4 requires this); render them as-is, don't truncate or summarise. Same for if_real_implies condition/description text.
- **KaTeX is already loaded** with the double-escape fix (`\\\\` → `\\`); reuse it for any qs value that benefits from math typesetting (e.g., `10^{11.5}`, `\theta_{QCD} < 10^{-10}`).
- **The MCP server is the schema authority and the per-query source of truth.** When the explorer's transform layer (`augmentDataset` in `explorer-data.js`) needs to read a new field, prefer fetching the canonical record via the MCP server's record-returning tools (`get_node`, `get_classification`, `get_experimental_program`, `find_signal_implications`) for the design and testing phase, then build the corresponding index in `explorer-data.js`. The runtime explorer reads the consolidated JSON directly — but its in-browser indexes mirror the MCP server's logic.
- **Schema v19's `bound_direction` is required reading.** The v19 spec at `methodology/MAP_v19_schema_spec_extension.md` defines the enum semantics. Two-sided is the default for exact values; lower / upper are the asymmetric cases; unspecified is reserved for cases where direction can't be determined from the citation. v19 Rule 34 forbids `bound_direction` when `uncertainty` is non-null (the uncertainty form `{low, high}` carries the direction implicitly). The renderer should not display bound_direction when uncertainty is non-null.
- **Don't add new content to the dataset from the explorer side.** The explorer reads, transforms, and renders. New cells, new edges, new implications go through the data PR pathway with CI gating. The firewall (`META_v21_1_methodology_firewall.md`) binds the data layer; the explorer reads the result.
- **Audit before assuming a sub-PR is open.** The sub-PR queue in §3 is a planning artifact, not a guarantee that the work hasn't already shipped through some other path. Sub-PR E1 closure showed that data-side PRs sometimes update the explorer in step (the data and explorer code share a repo and a maintainer); the closure pattern is "audit, find the work is done, ship as verification-only." This is a legitimate first move for any queued sub-PR — read the current state of the touched modules before proposing a diff.
- **Carry-over from prior handoff:** project files contain methodology only, not explorer code. Each sub-PR is one chat; the chat fetches the modules it touches via `web_fetch` or bash + curl, edits them, and presents the updated files via `present_files` for the maintainer to upload. The 11-file architecture is documented in `EXPLORER_HANDOFF.md` §"File-by-file architecture".

---

## 5. How to start a new chat on this work

Project files auto-attach when a fresh chat opens. To resume:

1. Open a fresh chat in the project.
2. Confirm `/mnt/project/` lists this handoff plus `EXPLORER_HANDOFF.md`, `META_v21_1_methodology_firewall.md`, `PROJECT_NEXT_STEPS.md`, `PROJECT_INFRASTRUCTURE.md`, `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` (the last is useful context for the Phase C content surfaces), and `PHYSICIST_FACING_VOCABULARY.md`.
3. **Run the §0 state-verification ritual.** `server_info` on the MCP; load the live explorer URL; confirm what's live.
4. Read the closing prompt the maintainer pasted into the chat (or `PROJECT_NEXT_STEPS.md` §0 if there isn't one) for the current eligible action.
5. The chat fetches the explorer module(s) and data shapes it needs via `web_fetch` (raw URLs in §6 below) or via MCP tool calls for content questions. Don't attach explorer code to project knowledge — per `EXPLORER_HANDOFF.md`.

The Map of Physics MCP tools are usually deferred behind `tool_search`. If the assistant doesn't see them, ask it to call `tool_search` with keyword `"map of physics"`. The 33 read-only tools cover the Phase B + C surface; using them is preferable to guessing content shapes or paraphrasing.

---

## 6. Quick reference — file locations

- This handoff: `/methodology/EXPLORER_PHASE_BC_HANDOFF.md`
- Previous handoff (file architecture, working norms, shipped state through Update C): `/methodology/EXPLORER_HANDOFF.md`
- Operational queue: `/methodology/PROJECT_NEXT_STEPS.md`
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- Live MCP: `https://map-of-physics.eddie-8e5.workers.dev`
- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- Explorer modules: `/explorer/Map_v34_explorer.html`, `/explorer/explorer-data.js`, `/explorer/explorer-map.js`, `/explorer/explorer-sidebar.js`, `/explorer/explorer-phenomena.js`, `/explorer/explorer-discourse.js`, `/explorer/explorer-resolves.js` (added sub-PR E2), `/explorer/explorer-glossary.js` plus `/explorer/update-b.css`, `/explorer/update-c.css`, `/explorer/update-c-edges.css`, `/explorer/update-c-typography.css`
- Canonical data: `/data/Map_v34_consolidated.json` (currently v95)
- Schema: `/schema/Map_v19_schema.json`
- v19 spec extension (`bound_direction`, Rules 34–36): `/methodology/MAP_v19_schema_spec_extension.md`
- v18 spec extension (the quantitative_scale and resolves shapes): `/methodology/MAP_v18_schema_spec_extension.md`
- v17 spec extension (the if_real_implies shape): `/methodology/MAP_v17_schema_spec_extension.md`
- Phase C handoff (context for the data side): `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- Vocabulary discipline (binds explorer UI prose): `/methodology/PHYSICIST_FACING_VOCABULARY.md`

### Raw URLs for `web_fetch`

- Explorer HTML: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/Map_v34_explorer.html`
- Explorer modules: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js` (and analogously `-map.js`, `-sidebar.js`, `-phenomena.js`, `-discourse.js`, `-resolves.js`, `-glossary.js`)
- Explorer CSS: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-b.css` (and analogously `update-c.css`, `update-c-edges.css`, `update-c-typography.css`)
- Canonical data (1.5 MB, exceeds github.com blob fallback): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
- v19 schema: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v19_schema.json`
- Previous handoff: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/EXPLORER_HANDOFF.md`
- v19 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v19_schema_spec_extension.md`
- v18 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v18_schema_spec_extension.md`
- v17 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v17_schema_spec_extension.md`
- Phase C handoff: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`
- Vocabulary discipline: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PHYSICIST_FACING_VOCABULARY.md`

---

## 7. How this document is maintained

Same discipline as `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §6:

1. **The live system + the canonical data are authoritative**, not this document. §0 makes that explicit; fresh sessions verify before relying on the handoff.
2. **Every shipped sub-PR updates §1 "the gap" and §3 "proposed sub-PR sequence"** — sub-PRs close items, surface new follow-ups, and the cumulative counts shift (e.g., "all 38 resolves edges now render in the experimental-program cards" replaces the corresponding gap-table row).
3. **Updates ship as complete files** via the `present_files` tool, per §4 working norm and `PROJECT_NEXT_STEPS.md` §6 norm #1. Not patches.
4. **The closure pattern from sub-PR E1 is documented for posterity.** Real work can dispatch outside the formal queue (data PRs sometimes update the explorer in step). The auditing-before-assuming-open move is now a first-class working norm (§4). Future sessions opening a queued sub-PR should audit before proposing a diff.
5. **When all sub-PRs E1–E5 have shipped**, the Phase B + C surfacing pass closes. This handoff transitions to "closed" status and a successor handoff (or just `EXPLORER_HANDOFF.md` itself, refreshed) takes over for whatever comes next — likely Track 4 outreach, since explorer-readiness for outreach was the original reason this pass exists.

---

*End of EXPLORER_PHASE_BC_HANDOFF.md. Drafted 2026-05-26 as the next-phase explorer handoff after Predictive Layer Phase C closed (v95 / 3.2.3 / 288 quantitative_scale entries / 38 resolves edges / 14 if_real_implies carriers / 19 experimental programs). Amended 2026-05-27 to record sub-PR E1 closure as verification-only and to extend §4 with the file-delivery norm after a maintainer flag. Amended again 2026-05-27 to record sub-PR E2 closure (38 resolves edges now render via new `explorer-resolves.js` module + indexing + call-sites in the program / cell / frontier / totality cards). The previous explorer handoff (`EXPLORER_HANDOFF.md`) closed at Update C; this document picks up the explorer build to surface the ~6 months of Phase B + Phase C data-side content that has accumulated since.*
