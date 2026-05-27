# Explorer Phase B + C surfacing — handoff and process

**Purpose of this file.** Standing reference for the next phase of explorer work — extending the live explorer to render the Phase B (`if_real_implies`) and Phase C (`quantitative_scale`, `resolves` edges, 12 new forward-looking experimental-program nodes) content that has accumulated in the dataset since the Update C builds shipped. Companion to `EXPLORER_HANDOFF.md` (the previous explorer handoff, which documents the file architecture, working norms, and shipped state through Update C — all of which carries forward unchanged into this phase). Picks up the explorer build after a ~6-month pause during which the data-side phases B and C landed.

Location: `/methodology/EXPLORER_PHASE_BC_HANDOFF.md` in the repo. Attach to project knowledge so AI sessions see it automatically.

---

## 0. Read this first — state-verification opens every session

The Predictive Layer Phase C handoff established the discipline that authoring sessions ship work without proportionally updating handoff documents, and that this drift is best caught by verifying live state at session start. The same discipline applies here. Three authoritative sources:

1. **Live MCP server.** Call `server_info`. Note `data_version`, `schema_version`, and the cumulative counts. Current expected state: `data_version: v95`, `schema_version: v19`, `83 nodes`, `230 edges`, `19 experimental_programs`, `14 if_real_implies_carriers`, `288 quantitative_scale_total`, `38 resolves_edges`.
2. **Live explorer.** Open `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`. Look at the banner / About panel. Today's expected baseline: serves v34 data from `data/Map_v34_consolidated.json`, renders the fourteen-file build (1 HTML + 5 CSS + 8 JS — the eleven-file Update C build plus `explorer-resolves.js` from sub-PR E2 plus `explorer-qs.js` and `update-e4.css` from sub-PR E4). The 12 forward-looking experimental-program nodes render correctly via the existing renderer (sub-PR E1 closure audit, 2026-05-27); the 38 resolves edges render as a "Resolves" section on each program card and as a "Targeted by" section on the cells / frontiers / totality-approach they address (sub-PR E2, 2026-05-27); the reusable quantitative_scale callout component renders on every dense qs surface (cell-direct values, prediction-level chips in both the FC and cell prediction loops, resolves-edge sensitivity, competing-prediction values, bears-on edge rows) and on the prominent carrier-card block (sub-PR E4, 2026-05-27). The explorer **picks up the canonical JSON at runtime**, so the dataset is current to v95; the remaining Phase B content (if_real_implies trees + the 12 implication-level qs entries that hang off them) is in the data being fetched but is **rendered nowhere** until sub-PR E3 ships.
3. **The repo's `/methodology/` directory.** This handoff sits alongside `EXPLORER_HANDOFF.md`. The previous handoff documents the file architecture, the no-project-files-for-code rule, the edits-not-regenerations principle, the iterating-across-milestones pattern, and the 11-file module breakdown. **Everything in `EXPLORER_HANDOFF.md` carries forward**; this document supplements it for the Phase B + C surfacing work only.

If the live system has drifted further than the counts above, the session catching the drift updates this handoff at the end of its work. **All such updates ship as complete files via `present_files`, not as patches** — see §4 working norms.

---

## 1. Why this handoff exists — the gap

The data layer has grown three schema versions and roughly half the dataset's content since the explorer last shipped. The explorer renders the data-shape signatures of those new nodes (the 12 forward-looking experimental-program nodes, since E1), the new resolves-edge surfaces hanging off them (since E2), and the 276 of 288 quantitative_scale entries that don't sit on if_real_implies implications (since E4). The remaining gap is Phase B: the if_real_implies tree on each of the 14 carrier nodes, with its 23 resolutions, 24 implications, and 12 implication-level quantitative_scale entries.

What the explorer **does** render today (per `EXPLORER_HANDOFF.md`, plus the E1, E2, and E4 closures):

- 30 formal-classification tiles with cell grids, yield bars, falsified flags, in-tile cell viz, category stripes
- 484 cells with content / observational status / axis values / predictions / realized examples / citations
- 97 cross-classification edges (clickable, with cell-ref pills, citations, on-map phen↔phen overlay arrows)
- The discourse layer: 41 non-FC nodes (architectures, regime-content, open-frontiers, totality-approaches, **19** experimental-programs — the 7 historical + 12 forward-looking) and the ~89 discourse-layer edges connecting them to FCs
- The 22-entry glossary panel
- KaTeX math rendering across all prose surfaces
- The 38 Phase C resolves edges — rendered as a "Resolves" section on each experimental-program card and a "Targeted by" section on each cell / frontier / totality-approach target card. Each row carries the sensitivity (with bound-direction symbol when uncertainty is null), the timeline pill, the bounds-setting pill when `exclusion_only: true`, the description prose, and an inline competing-predictions block when `predictions_per_program` is populated (sub-PR E2, 2026-05-27).
- 276 quantitative_scale entries across four surfaces — cell-direct values render inside each cell card's Description section, FC-level and cell-level prediction chips render below each prediction's text in both predictions blocks, the resolves-edge sensitivity line and competing-prediction values render via the same component, and the carrier-card "Characteristic scale" block renders the 13 frontier + totality-approach headline numerical commitments as a prominent bordered section (sub-PR E4, 2026-05-27). All rendering is bound-direction-aware (≳ / ≲ / = / ~ when uncertainty is null per Rule 34) and KaTeX-typeset for log10 exponents and asymmetric uncertainties.

What the explorer **does not** render today, despite all of this content being present in the v95 data file being fetched at runtime:

| Content surface | Count | Surfaced by MCP tool | Rendered in explorer |
|---|---|---|---|
| `if_real_implies` carriers (open-frontier or totality-approach) | 14 carriers | `find_signal_implications` | No |
| `if_real_implies` resolutions | 23 | `find_signal_implications` | No |
| `if_real_implies` implications (kind ∈ {new_cell, new_axis, forced_edge, promotes_subtype, new_FC}) | 24 | `find_signal_implications` | No |
| 12 new forward-looking experimental-program nodes (DUNE, Hyper-K, JUNO, gw-ground-network, LISA, CMB-S4, Rubin-LSST, DESI, axion-haloscope-network, EDM, muon-g-2-continuation, FCC) | 12 | `list_experimental_programs` | **Yes (since sub-PR E1 closure audit, 2026-05-27 — surfacing-side renderer was already current, see §3 sub-PR E1)** |
| `resolves` edges (experimental-program → cell or open-frontier or totality-approach, carrying sensitivity / timeline / predictions_per_program / exclusion_only) | 38 (13 with populated competing-prediction lists) | `find_resolvers`, `find_discriminating_experiments` | **Yes (since sub-PR E2, 2026-05-27 — new `explorer-resolves.js` module + indexing in `explorer-data.js` + call-sites in the program / cell / frontier / totality cards)** |
| `quantitative_scale` entries — frontier / totality-approach carrier surface | 13 (7 open-frontier carriers + 6 totality-approach carriers) | `rank_by_scale`, `get_node` | **Yes (since sub-PR E4, 2026-05-27 — `renderQSCallout` block form on the discourse-card prominent surface)** |
| `quantitative_scale` entries — cell-direct surface | 215 | `find_cells` (with qs filters), `find_bounds` | **Yes (since sub-PR E4, 2026-05-27 — `renderQS` inline form inside each cell card's Description section, with citations rendered in compact mode)** |
| `quantitative_scale` entries — prediction-level surface (FC `predictive_yield[]` + cell `predictions[]`) | 48 (35 FC + 13 cell) | `find_predictions` (with qs filters), `find_bounds` | **Yes (since sub-PR E4, 2026-05-27 — `renderQS` inline chip below `pred-text` in both `renderSidebarFC` and `renderSidebarCell` prediction loops)** |
| `quantitative_scale` entries — bears-on edge surface | 0 at v95 (renderer ready for the surface) | `find_bounds` | **Yes — renderer ready (since sub-PR E4, 2026-05-27); `renderEdgeRow` calls `renderQS` when an edge carries `quantitative_scale`** |
| `quantitative_scale` entries — if_real_implies implication surface | 12 | `find_signal_implications` | No (lights up when E3 ships — the `renderQS` component E4 built is the component E3's implication-row renderer will consume) |
| **Total `quantitative_scale` entries** | **288** | | **276 of 288 render** (the 12 implication-level entries await E3) |
| v19 `bound_direction` enum (lower / upper / two-sided / unspecified) on every qs | 288 fields | per-tool | **Rendered on the 276 entries that render** (symbol leads value when uncertainty is null; suppressed when uncertainty is non-null per Rule 34) |

A physicist landing at the live explorer URL sees a competent Phase A presentation, the 12 forward-looking experimental-program nodes correctly catalogued in the Browse menu and discourse cards, the 38 resolves edges rendering as a Resolves section on each program card and as a Targeted by section on each cell / frontier / totality-approach card they address (sub-PR E2), and 276 of 288 quantitative_scale entries rendering across cells, predictions, resolves sensitivities, competing-prediction values, and frontier / totality-approach carrier blocks (sub-PR E4). The remaining gap is the Phase B `if_real_implies` trees on the 14 carrier nodes — the conditional structural consequences with their 24 implications and the 12 implication-level qs entries that hang off them. Closing this is the last surfacing step before Track 4 outreach (per `TRACKS_AFTER_PHASE_A.md`), because the explorer is the primary surface a working physicist will judge the project on.

---

## 2. What to surface — and where in the UI

Six content categories to surface, sketched here. Each becomes a sub-PR in §3. The sketches name the UI placement candidates and the design questions the implementing chat should resolve before authoring code.

### 2.1 The 12 forward-looking experimental-program nodes

**What.** DUNE, Hyper-K, JUNO, gw-ground-network, LISA, CMB-S4, Rubin-LSST, DESI, axion-haloscope-network, EDM, muon-g-2-continuation, FCC. These are nodes of `type: experimental-program`, same shape as the 7 historical programs the explorer already renders (PDG, ATLAS+CMS, UA1+UA2, CDF+D0, DONUT, BNL+SLAC, Fermilab-Upsilon). They carry `operational_period`, `host_institutions`, `produced_classifications`, and a `subtype` field that includes new values (`survey-program`, `accelerator-program`) the existing renderer may not know about.

**Where it goes.** Inside the existing discourse layer. The Browse menu's "experimental-programs" tab and the discourse panel should already pick them up via the existing `explorer-discourse.js` paths — but the implementing chat should verify, fix any subtype-specific styling gaps, and confirm the timeline display handles `start_year` without `end_year` (the forward-looking pattern).

**Design questions.** Does the existing discourse renderer differentiate historical programs (completed, with `end_year`) from forward-looking ones (with `start_year` in the future)? If not, a small visual differentiation (an "upcoming" pill or muted text) would help readers parse the catalog.

### 2.2 `resolves` edges (38 total)

**What.** A new edge type connecting an experimental-program node to a cell, an open-frontier node, or a totality-approach node. Each edge carries `sensitivity` (a `quantitative_scale` describing the program's reach), `timeline` (when results are expected), `predictions_per_program` (an array of competing point predictions from SM-side or BSM-side theory programs), and `exclusion_only` (boolean — true when the program excludes rather than measures). 38 edges spread across 11 of the 12 forward-looking programs.

**Where it goes.** Two reasonable placements, not mutually exclusive:

- **In the experimental-program discourse card**, a new section titled e.g. "Resolves" listing each target the program addresses, each with sensitivity + timeline. One row per resolves edge. The discourse-edges card precedent from Update C is the closest existing surface.
- **In the cell / frontier / totality-approach sidebar view**, a new section titled e.g. "Targeted by" listing each program that resolves the selected node, each with the same metadata. Mirrors the bidirectional `find_resolvers` call.

**Design questions.** Should `predictions_per_program` (when present — currently on 10 of 38 edges) render inline as discriminating-target metadata, or live in a sub-panel? When `exclusion_only: true` (rubin-lsst on σ_8, WDM, PBH-microlensing for example), how does the UI signal that the program is excluding rather than measuring? An icon or pill, probably.

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
- **`explorer/update-c-edges.css`** — appended ~155 lines of CSS for `.dc-resolves-row`, `.dc-resolves-head`, `.dc-resolves-arrow`, `.dc-resolves-sensitivity`, `.dc-resolves-prefix`, `.dc-resolves-bd`, `.dc-resolves-units`, `.dc-resolves-citations`, `.dc-resolves-citation`, `.dc-resolves-desc`, `.dc-resolves-ppp*`, `.dx-pill.dx-timeline-pill`, `.dx-pill.dx-bound-pill`. (Sub-PR E4 retires the `-prefix`/`-bd`/`-units` atoms from this file, replacing them with `qs-*` in `update-e4.css`.)
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

Phase B content. A new section in the discourse card for the 14 carrier nodes, with one expandable group per resolution → implication tree. Likely extends `explorer-discourse.js` (the existing card renderer for these node types) plus a small new helper module or extension for the implications rendering itself. Each implication-row consumes the `renderQS` component from sub-PR E4 when the implication carries quantitative_scale (12 of 24 implications). Sub-PR E3 is now the highest-priority eligible action — `PROJECT_NEXT_STEPS.md` §0 / §5.8 carries the closing-prompt template.

### Sub-PR E4 — render `quantitative_scale` callouts (the reusable component) — CLOSED (2026-05-27)

The reusable component is in. The minimal-inline `formatQS` that E2 shipped inside `explorer-resolves.js` has been absorbed into a new ninth JS module `explorer-qs.js` and is now consumed by every dense qs surface plus the new prominent block form for the carrier surface.

**Closure summary.** Shipped the following files:

- **NEW `explorer/explorer-qs.js`** (~200 lines) — exports three public functions: `renderQS(qs, opts)` (the inline atomic form — prefix label + bound-direction symbol + KaTeX-rendered value + units; used by cell-direct, prediction-level, resolves sensitivity, competing-prediction values, bears-on edges), `renderQSCallout(qs, opts)` (the block form — a complete `<div class="sidebar-section">` with `<h3>` heading, bordered card, expanded citations; used only on the carrier surface), and `renderQSCitations(citations, opts)` (citation list helper with optional `compact` mode). Internal helper: `renderTexInline(tex)` (KaTeX with graceful fallback). The component absorbs E2's `formatQS` verbatim with two upgrades: (a) `units === "dimensionless"` is now suppressed regardless of `kind` (fixes the SU5 α_GUT entry where `kind=coupling` carried the literal string `units="dimensionless"`, which E2's formatQS would have leaked into display); (b) class names switched from `dc-resolves-prefix`/`-bd`/`-units` to generic `qs-prefix`/`qs-bd`/`qs-units`.
- **`explorer/explorer-resolves.js`** — local `formatQS` and its `BD_SYMBOL` constant removed (~95 lines); the sensitivity-line and competing-prediction call-sites now invoke `renderQS` directly. The resolves-row container chrome (`dc-resolves-row`, `dc-resolves-head`, `dc-resolves-sensitivity`, `dc-resolves-citations`, `dc-resolves-desc`, `dc-resolves-ppp*`) is preserved — those are row layout, not qs atoms. Net delta: file dropped ~50 lines.
- **`explorer/explorer-sidebar.js`** — three insertions: (i) `renderSidebarCell` Description section now also renders `cell.quantitative_scale` inline below the description prose, with `renderQSCitations` in compact mode; the section now renders even when `cell.description` is empty if a qs entry exists (215 cell-direct entries previously invisible now render); (ii) `renderSidebarCell` cell-pred loop emits a `<div class="dc-pred-qs">${renderQS(p.quantitative_scale, {})}</div>` chip between `pred-text` and `pred-meta` when the prediction carries qs; (iii) `renderSidebarFC` FC-pred loop applies the same pattern. All three call-sites guarded by `typeof renderQS === 'function'` for graceful degradation.
- **`explorer/explorer-discourse.js`** — three insertions: (i) `renderEdgeRow` renders an inline `dx-edge-qs` line between the description and the discharge-status block when an edge carries qs (bears-on surface; 0 entries at v95, renderer ready for the surface); (ii) `renderFrontierCard` renders `renderQSCallout(node.quantitative_scale, { heading: 'Characteristic scale' })` between `desc` and `sections` — the 7 open-frontier carriers (qg-frontier 10¹⁹ GeV, cc-frontier 10¹²⁰, hierarchy-problem 10¹⁷, etc.) now show their headline numerical commitment as a prominent block; (iii) `renderTotalityCard` applies the same pattern — the 6 totality-approach carriers (bh-thermodynamics 1/4, cosmological-models 5σ Hubble tension, turbulence -1.667 Kolmogorov exponent, etc.) get the same prominent block.
- **NEW `explorer/update-e4.css`** (~165 lines) — generic `.qs-prefix`/`.qs-bd`/`.qs-units` (visually identical to the retired `dc-resolves-*` atoms), citation chrome `.qs-citations`/`.qs-citation` with compact-mode variant, the carrier-callout block `.qs-callout`/`.qs-callout-value` (Crimson Pro 17px headline + bordered card with 3px left rule), and the per-surface wrappers `.cell-qs-inline` (Crimson Pro 13.5px under cell description), `.dc-pred-qs` (Crimson Pro 12.5px chip below pred-text), `.dx-edge-qs` (same chip below edge description).
- **`explorer/update-c-edges.css`** — three rules retired (`.dc-resolves-prefix`, `.dc-resolves-bd`, `.dc-resolves-units`); the same atoms live under generic names in `update-e4.css` and are now shared across every qs surface. Net delta: file dropped ~12 lines.
- **`explorer/Map_v34_explorer.html`** — added `<link rel="stylesheet" href="update-e4.css">` after the existing `update-c-typography.css` link; added `<script src="explorer-qs.js"></script>` between `explorer-data.js` and `explorer-map.js` (load-order position 2, before all consumers). Stylesheet-load comment updated to reflect the new (7) entry.

**Decisions taken** (per the proposal in this sub-PR's authoring chat):

- (1) Module layout — new ninth JS file `explorer-qs.js`; resolves becomes a consumer.
- (2) API shape — `renderQS` for the inline atomic form; `renderQSCallout` for the carrier block form; `renderQSCitations` for the citations list helper.
- (3) Callout chrome — inline form (a) on the four dense surfaces; block form (c) on the carrier surface. The cell-direct surface uses the inline form with citations in compact mode (placed inside the Description section, not as its own section).
- (4) log10 + asymmetric uncertainty — KaTeX renders `10^{value^{+high}_{-low}}` (preserved verbatim from E2).
- (5) Citations clickable — option (a) static; citation prose contains the source-value phrase per §4 admissibility and is meant to be read whole; no DOI/arXiv extraction.
- (6) Vocabulary — no `quantitative_scale` / `kind` / `bound_direction` / `log10` anywhere in UI text; the value + units + bound-symbol IS the display. Carrier section heading: "Characteristic scale". No prefix on cell-direct, prediction-level, or bears-on (surrounding context already identifies the value).
- (7) "Dimensionless" units string — suppressed regardless of kind (the upgrade case).
- (8) Old `dc-resolves-prefix`/`-bd`/`-units` CSS rules — removed in this PR (clean migration; `update-e4.css` covers).

**Verified** (vm-context smoke test in the authoring chat):
- Eight canonical field combinations sampled from v95 data and rendered:
  - qg-frontier (energy_scale + log10 + units=GeV + two-sided + unc=null) → `Reach: 10^{19} GeV` via KaTeX, no bd symbol (two-sided suppressed)
  - cc-frontier (ratio + log10 + two-sided, no units) → `10^{120}` alone
  - cosmological-models (sigma_deviation + upper) → `≲ 5σ`
  - su5 α_GUT (coupling + units="dimensionless" + two-sided) → `0.04` alone (upgrade case verified)
  - cell-A-d2 (coupling + units=e²/h + two-sided) → `1 e²/h`
  - top-quark m_t (mass + asymmetric unc + units=GeV, bd absent per Rule 34) → KaTeX `177^{+21}_{-22} GeV`
  - su5 proton-decay τ (time + lower bound + units=yr) → `≳ 2.4e+34 yr` (scientific notation cosmetic; flagged below)
  - turbulence (dimensionless + two-sided + value=-1.667) → `-1.667`
  - bh-thermodynamics (dimensionless + two-sided + value=0.25) → `0.25`
- `renderQSCallout` smoke-tested against qg-frontier → full `<div class="sidebar-section">` with `<h3>Characteristic scale</h3>` heading + bordered card + citations list expanded.
- `renderQS` returns empty string on null, undefined, `{}`, and any input lacking `qs.value`.
- All 4 modified JS files + 1 new JS file pass `node --check`.

**Known follow-up surfaced by E4** (queued for housekeeping, not a closure blocker):

- Scientific-notation values (e.g. `2.4e+34` on the SU(5) proton-decay τ lower bound, `value` field stored as a JavaScript number rather than as log10-encoded) render as the raw `String(value)` output. A nicer rendering through KaTeX (`2.4 \times 10^{34}`) is one change away but isn't load-bearing for E4 — flagged as Track 5 housekeeping. Authors of future qs entries can opt into log10 encoding to get the clean rendering.
- `update-c-edges.css` retains `.dc-resolves-sensitivity` (font + line-height for the resolves-row sensitivity-line container) and `.dc-resolves-citations` / `.dc-resolves-citation` (resolves-row citation chrome). These are layout-context classes specific to the resolves row, not qs atoms; they live alongside the new `update-e4.css` generic atoms by design.

### Sub-PR E5 — tile / discourse-node decoration

The visual signal layer. Small chips or indicators on tiles and discourse nodes when they carry Phase B / Phase C content. Touch `explorer-map.js` (tile decoration) and `explorer-discourse.js` (discourse-node card decoration), plus CSS.

### Sub-PR E6 — `rank_by_scale` overview panel *(discretionary)*

New top-level view. Reach via toolbar button. Useful for the working physicist who wants the "what's the coverage by kind?" question answered in one glance. New module `explorer-ranks.js`.

### Sub-PR E7 — `find_discriminating_experiments` view *(discretionary)*

New top-level view. Pick two programs, see what they jointly resolve, with the per-program SM-vs-BSM prediction differentials surfaced. The flagship Phase C AI-first query — the project's most discriminating demo target for outreach (per the Phase C handoff §3). New module `explorer-discriminating.js`.

### Sub-PR E8 — explorer banner + About panel refresh *(housekeeping)*

The live explorer's About / banner / help-overlay text refers to v34 / schema v15.3 / 71 nodes / 7 experimental programs. The data has moved to v95 / v19 / 83 nodes / 19 programs. Update the user-facing text to reflect current state. One-file touch (the HTML).

### Sequencing constraints

E1 closed first (verification-only). E2 closed second (full implementation, 2026-05-27). E4 closed third (the reusable qs callout component now consumed by E2's sensitivity surface and rendering on every other dense qs surface plus the carrier block form, 2026-05-27). E3 ships next: the if_real_implies trees on the 14 carrier nodes; each implication-row consumes the `renderQS` component E4 built (the 12 implication-level qs entries light up the moment E3's call-sites land). E5 (decoration) makes most sense after E3 since the if_real_implies coverage is the last data category for tile decoration to signal. E6, E7, E8 are independent of each other and of E1–E5.

The natural cadence: ~~E1~~ → ~~E2~~ → ~~E4~~ → E3 → E5 → (E8 alongside any earlier sub-PR as a stowaway one-line edit) → E6 → E7 if maintainer chooses.

---

## 4. Working norms

Inherited from `EXPLORER_HANDOFF.md`, with these deltas / clarifications for Phase B + C surfacing:

- **Don't paraphrase content fields.** Quantitative_scale citations contain inline source-value-phrase prose (the Phase C admissibility test §4 requires this); render them as-is, don't truncate or summarise. Same for if_real_implies condition/description text.
- **KaTeX is already loaded** with the double-escape fix (`\\\\` → `\\`); reuse it for any qs value that benefits from math typesetting (e.g., `10^{11.5}`, `\theta_{QCD} < 10^{-10}`).
- **The MCP server is the schema authority and the per-query source of truth.** When the explorer's transform layer (`augmentDataset` in `explorer-data.js`) needs to read a new field, prefer fetching the canonical record via the MCP server's record-returning tools (`get_node`, `get_classification`, `get_experimental_program`, `find_signal_implications`) for the design and testing phase, then build the corresponding index in `explorer-data.js`. The runtime explorer reads the consolidated JSON directly — but its in-browser indexes mirror the MCP server's logic.
- **Schema v19's `bound_direction` is required reading.** The v19 spec at `methodology/MAP_v19_schema_spec_extension.md` defines the enum semantics. Two-sided is the default for exact values; lower / upper are the asymmetric cases; unspecified is reserved for cases where direction can't be determined from the citation. v19 Rule 34 forbids `bound_direction` when `uncertainty` is non-null (the uncertainty form `{low, high}` carries the direction implicitly). The renderer should not display bound_direction when uncertainty is non-null.
- **Don't add new content to the dataset from the explorer side.** The explorer reads, transforms, and renders. New cells, new edges, new implications go through the data PR pathway with CI gating. The firewall (`META_v21_1_methodology_firewall.md`) binds the data layer; the explorer reads the result.
- **Carry-over from prior handoff:** project files contain methodology only, not explorer code. Each sub-PR is one chat; the chat fetches the modules it touches via `web_fetch` or bash + curl, edits them, and returns the updated files for the maintainer to upload. The eleven-file architecture is documented in `EXPLORER_HANDOFF.md` §"File-by-file architecture"; sub-PR E2 added a twelfth file `explorer-resolves.js`; sub-PR E4 added a thirteenth and fourteenth file `explorer-qs.js` + `update-e4.css`.
- **Deliverables ship as complete files via the `present_files` tool**, not as patches. The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace; "replace §3 with this" patches and per-line diff blocks require manual splicing that slows the project significantly and introduces splice errors. This norm applies to every workstream and every sub-PR closure summary; see `PROJECT_NEXT_STEPS.md` §6 norm #1 for the project-wide version.

---

## 5. How to start a new chat on this work

Project files auto-attach when a fresh chat opens. To resume:

1. Open a fresh chat in the project.
2. Confirm `/mnt/project/` lists this handoff plus `EXPLORER_HANDOFF.md`, `META_v21_1_methodology_firewall.md`, `PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `PHYSICIST_FACING_VOCABULARY.md`, and `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` (the last is useful context for the Phase C content surfaces).
3. **Run the §0 state-verification ritual.** `server_info` on the MCP; load the live explorer URL; confirm what's live.
4. Tell the chat which sub-PR to resume — e.g., *"Pick up at sub-PR E3 from EXPLORER_PHASE_BC_HANDOFF.md: render the if_real_implies trees on the 14 carrier nodes. Fetch `explorer-discourse.js` from GitHub, look at how `renderFrontierCard` and `renderTotalityCard` already render their carrier qs callouts (sub-PR E4), identify where the if_real_implies tree section should land, propose the diff, then wait for confirmation before authoring."*
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
- Explorer modules: `/explorer/Map_v34_explorer.html`, `/explorer/explorer-data.js`, `/explorer/explorer-qs.js` (added sub-PR E4), `/explorer/explorer-map.js`, `/explorer/explorer-sidebar.js`, `/explorer/explorer-phenomena.js`, `/explorer/explorer-discourse.js`, `/explorer/explorer-resolves.js` (added sub-PR E2), `/explorer/explorer-glossary.js` plus `/explorer/update-b.css`, `/explorer/update-c.css`, `/explorer/update-c-edges.css`, `/explorer/update-c-typography.css`, `/explorer/update-e4.css` (added sub-PR E4)
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
- Explorer modules: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js` (and analogously `-qs.js`, `-map.js`, `-sidebar.js`, `-phenomena.js`, `-discourse.js`, `-resolves.js`, `-glossary.js`)
- Explorer CSS: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-b.css` (and analogously `update-c.css`, `update-c-edges.css`, `update-c-typography.css`, `update-e4.css`)
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

*End of EXPLORER_PHASE_BC_HANDOFF.md. Drafted 2026-05-26 as the next-phase explorer handoff after Predictive Layer Phase C closed (v95 / 3.2.3 / 288 quantitative_scale entries / 38 resolves edges / 14 if_real_implies carriers / 19 experimental programs). Amended 2026-05-27 to record sub-PR E1 closure as verification-only and to extend §4 with the file-delivery norm after a maintainer flag. Amended again 2026-05-27 to record sub-PR E2 closure (38 resolves edges now render via new `explorer-resolves.js` module + indexing + call-sites in the program / cell / frontier / totality cards). Amended again 2026-05-27 to record sub-PR E4 closure (the reusable quantitative_scale callout component now lives in a new `explorer-qs.js` module + `update-e4.css` stylesheet; 276 of 288 qs entries render across the four dense surfaces plus the carrier-card prominent block; the if_real_implies implication-level qs entries — the remaining 12 — light up when E3 ships). The previous explorer handoff (`EXPLORER_HANDOFF.md`) closed at Update C; this document picks up the explorer build to surface the ~6 months of Phase B + Phase C data-side content that has accumulated since.*
