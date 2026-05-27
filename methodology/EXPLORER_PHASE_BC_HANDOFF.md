# Explorer Phase B + C surfacing — handoff and process

**Purpose of this file.** Standing reference for the next phase of explorer work — extending the live explorer to render the Phase B (`if_real_implies`) and Phase C (`quantitative_scale`, `resolves` edges, 12 new forward-looking experimental-program nodes) content that has accumulated in the dataset since the Update C builds shipped. Companion to `EXPLORER_HANDOFF.md` (the previous explorer handoff, which documents the file architecture, working norms, and shipped state through Update C — all of which carries forward unchanged into this phase). Picks up the explorer build after a ~6-month pause during which the data-side phases B and C landed.

Location: `/methodology/EXPLORER_PHASE_BC_HANDOFF.md` in the repo. Attach to project knowledge so AI sessions see it automatically.

---

## 0. Read this first — state-verification opens every session

The Predictive Layer Phase C handoff established the discipline that authoring sessions ship work without proportionally updating handoff documents, and that this drift is best caught by verifying live state at session start. The same discipline applies here. Three authoritative sources:

1. **Live MCP server.** Call `server_info`. Note `data_version`, `schema_version`, and the cumulative counts. Current expected state: `data_version: v95`, `schema_version: v19`, `83 nodes`, `230 edges`, `19 experimental_programs`, `14 if_real_implies_carriers`, `288 quantitative_scale_total`, `38 resolves_edges`.
2. **Live explorer.** Open `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`. Look at the banner / About panel. Today's expected baseline: serves v34 data from `data/Map_v34_consolidated.json`, renders the sixteen-file build (1 HTML + 6 CSS + 9 JS — the eleven-file Update C build plus `explorer-resolves.js` from sub-PR E2 plus `explorer-qs.js` and `update-e4.css` from sub-PR E4 plus `explorer-implies.js` and `update-e3.css` from sub-PR E3). The 12 forward-looking experimental-program nodes render correctly via the existing renderer (sub-PR E1 closure audit, 2026-05-27); the 38 resolves edges render as a "Resolves" section on each program card and as a "Targeted by" section on the cells / frontiers / totality-approach they address (sub-PR E2, 2026-05-27); the reusable quantitative_scale callout component renders on every dense qs surface (cell-direct values, prediction-level chips in both the FC and cell prediction loops, resolves-edge sensitivity, competing-prediction values, bears-on edge rows) and on the prominent carrier-card block (sub-PR E4, 2026-05-27); the if_real_implies trees render as an "If real, implies…" sidebar section on each of the 14 carrier cards, with one resolution group per resolution and one implication row per implication, the kind-label rendered as a color-coded physicist-natural pill, kind-specific target rendering (FC pill / cell pill / edge triplet / no target), and the 12 implication-level qs entries rendered via the E4 `renderQS` atom (sub-PR E3, 2026-05-27). The explorer **picks up the canonical JSON at runtime**, so the dataset is current to v95; all Phase B + Phase C surfacing is now complete.
3. **The repo's `/methodology/` directory.** This handoff sits alongside `EXPLORER_HANDOFF.md`. The previous handoff documents the file architecture, the no-project-files-for-code rule, the edits-not-regenerations principle, the iterating-across-milestones pattern, and the 11-file module breakdown. **Everything in `EXPLORER_HANDOFF.md` carries forward**; this document supplements it for the Phase B + C surfacing work only.

If the live system has drifted further than the counts above, the session catching the drift updates this handoff at the end of its work. **All such updates ship as complete files via `present_files`, not as patches** — see §4 working norms.

---

## 1. Why this handoff exists — the gap

The data layer has grown three schema versions and roughly half the dataset's content since the explorer last shipped. After sub-PR E3 closure (2026-05-27), every Phase B and Phase C content surface added since v34 / schema v15.3 renders in the explorer — the if_real_implies trees on the 14 carrier nodes, their 23 resolutions, their 24 implications, and the 12 implication-level quantitative_scale entries that hang off them now light up alongside the 12 forward-looking experimental-program nodes (E1), the 38 resolves edges (E2), and the 276 non-implication-level quantitative_scale entries (E4). The Phase B + C surfacing pass closes here; the remaining sub-PR E5 is decoration / signal-layer work, not content surfacing.

What the explorer **does** render today (per `EXPLORER_HANDOFF.md`, plus the E1, E2, E3, and E4 closures):

- 30 formal-classification tiles with cell grids, yield bars, falsified flags, in-tile cell viz, category stripes
- 484 cells with content / observational status / axis values / predictions / realized examples / citations
- 97 cross-classification edges (clickable, with cell-ref pills, citations, on-map phen↔phen overlay arrows)
- The discourse layer: 41 non-FC nodes (architectures, regime-content, open-frontiers, totality-approaches, **19** experimental-programs — the 7 historical + 12 forward-looking) and the ~89 discourse-layer edges connecting them to FCs
- The 22-entry glossary panel
- KaTeX math rendering across all prose surfaces
- The 38 Phase C resolves edges — rendered as a "Resolves" section on each experimental-program card and a "Targeted by" section on each cell / frontier / totality-approach target card. Each row carries the sensitivity (with bound-direction symbol when uncertainty is null), the timeline pill, the bounds-setting pill when `exclusion_only: true`, the description prose, and an inline competing-predictions block when `predictions_per_program` is populated (sub-PR E2, 2026-05-27).
- All 288 quantitative_scale entries across five surfaces — cell-direct values render inside each cell card's Description section; FC-level and cell-level prediction chips render below each prediction's text in both predictions blocks; the resolves-edge sensitivity line and competing-prediction values render via the same component; the carrier-card "Characteristic scale" block renders the 13 frontier + totality-approach headline numerical commitments as a prominent bordered section (sub-PR E4, 2026-05-27); and the implication-level qs entries (12) render inside the if_real_implies tree on each carrier card (sub-PR E3, 2026-05-27). All rendering is bound-direction-aware (≳ / ≲ / = / ~ when uncertainty is null per Rule 34) and KaTeX-typeset for log10 exponents and asymmetric uncertainties.
- The 14 Phase B if_real_implies carrier nodes (9 open-frontiers + 5 totality-approaches: qg-frontier, cc-frontier, bh-info-paradox, hierarchy-problem, strong-cp-problem, flavor-puzzle, measurement-problem, matter-antimatter-asymmetry, dark-matter, topological-phases-classification, turbulence, koide-formula, muon-g-2, chpt) — each carrier card now renders an "If real, implies…" sidebar section between the carrier qs callout and the rest of the discourse-edge sections. Each of the 23 resolutions appears as its own group with the italic condition prose at the top and the condition_citations beneath; each of the 24 implications appears as a bordered row with a kind-label pill ("Forces new formal classification", "Forces relation", "Forces new axis", "Promotes cell") + kind-specific target rendering (no target for `new_FC`; FC pill for `new_axis`; from-pill → subtype-label → to-pill triplet for `forced_edge`; cell pill via the resolves target-pill helper for `promotes_subtype`) + the description prose + the optional quantitative_scale block (12 of 24) + the derivation_citations (sub-PR E3, 2026-05-27).

What the explorer **does not** render today is no longer a content gap — the remaining E5 sub-PR is decoration on the surfaces above (chips on tiles and discourse-node cards signalling which Phase B / Phase C content the node carries). The content-surfacing gap is closed:

| Content surface | Count | Surfaced by MCP tool | Rendered in explorer |
|---|---|---|---|
| `if_real_implies` carriers (open-frontier or totality-approach) | 14 carriers | `find_signal_implications` | **Yes (since sub-PR E3, 2026-05-27 — new `explorer-implies.js` module + call-sites in `renderFrontierCard` and `renderTotalityCard`)** |
| `if_real_implies` resolutions | 23 | `find_signal_implications` | **Yes (since sub-PR E3, 2026-05-27 — one group per resolution with italic condition prose + condition citations + N implication rows)** |
| `if_real_implies` implications (kind ∈ {new_cell, new_axis, forced_edge, promotes_subtype, new_FC} per schema; v95 instantiates 4 of the 5) | 24 | `find_signal_implications` | **Yes (since sub-PR E3, 2026-05-27 — bordered row with color-coded kind-label pill + kind-specific target rendering + description + optional qs + derivation citations)** |
| 12 new forward-looking experimental-program nodes (DUNE, Hyper-K, JUNO, gw-ground-network, LISA, CMB-S4, Rubin-LSST, DESI, axion-haloscope-network, EDM, muon-g-2-continuation, FCC) | 12 | `list_experimental_programs` | **Yes (since sub-PR E1 closure audit, 2026-05-27 — surfacing-side renderer was already current, see §3 sub-PR E1)** |
| `resolves` edges (experimental-program → cell or open-frontier or totality-approach, carrying sensitivity / timeline / predictions_per_program / exclusion_only) | 38 (13 with populated competing-prediction lists) | `find_resolvers`, `find_discriminating_experiments` | **Yes (since sub-PR E2, 2026-05-27 — new `explorer-resolves.js` module + indexing in `explorer-data.js` + call-sites in the program / cell / frontier / totality cards)** |
| `quantitative_scale` entries — frontier / totality-approach carrier surface | 13 (7 open-frontier carriers + 6 totality-approach carriers) | `rank_by_scale`, `get_node` | **Yes (since sub-PR E4, 2026-05-27 — `renderQSCallout` block form on the discourse-card prominent surface)** |
| `quantitative_scale` entries — cell-direct surface | 215 | `find_cells` (with qs filters), `find_bounds` | **Yes (since sub-PR E4, 2026-05-27 — `renderQS` inline form inside each cell card's Description section, with citations rendered in compact mode)** |
| `quantitative_scale` entries — prediction-level surface (FC `predictive_yield[]` + cell `predictions[]`) | 48 (35 FC + 13 cell) | `find_predictions` (with qs filters), `find_bounds` | **Yes (since sub-PR E4, 2026-05-27 — `renderQS` inline chip below `pred-text` in both `renderSidebarFC` and `renderSidebarCell` prediction loops)** |
| `quantitative_scale` entries — bears-on edge surface | 0 at v95 (renderer ready for the surface) | `find_bounds` | **Yes — renderer ready (since sub-PR E4, 2026-05-27); `renderEdgeRow` calls `renderQS` when an edge carries `quantitative_scale`** |
| `quantitative_scale` entries — if_real_implies implication surface | 12 | `find_signal_implications` | **Yes (since sub-PR E3, 2026-05-27 — rendered via the `renderQS` component E4 shipped, wrapped in `.dc-implies-qs` chrome with compact-mode citations)** |
| **Total `quantitative_scale` entries** | **288** | | **288 of 288 render** |
| v19 `bound_direction` enum (lower / upper / two-sided / unspecified) on every qs | 288 fields | per-tool | **Rendered on all 288 entries** (symbol leads value when uncertainty is null; suppressed when uncertainty is non-null per Rule 34) |

A physicist landing at the live explorer URL now sees the full Phase A + Phase B + Phase C surface: the 30 formal-classification tiles and 484 cells from the original Update C build; the 19 experimental-program nodes catalogued in the Browse menu and discourse cards; the 38 resolves edges rendering as Resolves / Targeted by sections; all 288 quantitative_scale entries rendering across five surfaces with bound-direction symbology; and the 14 if_real_implies trees rendering as "If real, implies…" sections on each carrier card, with the 23 resolutions, 24 implications, and 12 implication-level qs entries visible inline. The remaining E5 sub-PR (decoration / signal-layer chips on tiles and discourse-node cards) is the last item before Track 4 outreach prep per `TRACKS_AFTER_PHASE_A.md`.

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

### Sub-PR E3 — render `if_real_implies` on frontier / totality-approach cards — CLOSED (2026-05-27)

Phase B content is in. A new tenth JS module `explorer-implies.js` renders the if_real_implies trees on all 14 carrier nodes, as a new "If real, implies…" sidebar section between the carrier qs callout and the rest of the discourse-edge sections in both `renderFrontierCard` and `renderTotalityCard`. The 23 resolutions, 24 implications, and 12 implication-level quantitative_scale entries all surface; the explorer Phase B + C content-surfacing gap closes here.

**Closure summary.** Shipped the following files:

- **NEW `explorer/explorer-implies.js`** (~275 lines) — exports one public function `renderIfRealImpliesSection(node)` returning a complete `<div class="sidebar-section">` or empty string when the node has no `if_real_implies`. Internal helpers: `renderImpliesCitations(citations)` (citation list with the chrome that mirrors `dc-resolves-citations`), `renderImplicationTarget(imp)` (kind-specific target dispatcher — null for `new_FC`; `renderFCPill(target)` for `new_axis`; from-pill → subtype-label → to-pill triplet for `forced_edge`; `renderResolvesTargetPill(target)` for `promotes_subtype`; defensive guard for `new_cell` and unknown kinds), `renderImplicationRow(imp)` (single bordered row with head line + description + optional qs block + derivation citations), `renderResolutionGroup(res)` (italic condition prose + condition_citations + N implication rows). Kind labels via `IMPLIES_KIND_LABELS` map: "Forces new formal classification" / "Forces new axis" / "Forces relation" / "Promotes cell" / "Forces new cell".
- **NEW `explorer/update-e3.css`** (~190 lines) — chrome for the if_real_implies surface. Top-level `.dc-implies-list`. Resolution group `.dc-implies-resolution` (dashed top-border between consecutive resolutions, first-child margin reset). Italic condition prose `.dc-implies-condition` (Crimson Pro 14.5px). Citation chrome `.dc-implies-citations` / `.dc-implies-citation` (10.5px JetBrains Mono, left-border accent, matches `.dc-resolves-citations` weight). Implication rows `.dc-implies-imp` (bordered card on `var(--paper-2)`). Kind-label pill `.dc-implies-kind` with five color variants mapped to the project palette: `new_FC` → `--struct` (blue), `new_axis` → `--struct` italic, `forced_edge` → `--hybrid` (gold), `promotes_subtype` → `--phen` (green), `new_cell` → `--accent` (red). Forced-edge target triplet `.dc-implies-edge-triplet` + `.dc-implies-edge-subtype` (paper-background pill with `[...]` brackets). Description prose `.dc-implies-desc`. qs block `.dc-implies-qs` + `.dc-implies-qs-value` (bordered card with left-accent border on `--struct`; consumes the `renderQS` atom from E4 + compact-mode citations from `renderQSCitations`). Responsive rule at 540px.
- **`explorer/explorer-discourse.js`** — two call-site additions: in `renderFrontierCard` after the carrier qs callout and before the first edge-section; in `renderTotalityCard` after the carrier qs callout and before the first edge-section. Each is gated by `typeof renderIfRealImpliesSection === 'function'` so the discourse module degrades gracefully if the implies module hasn't loaded. Both return statements extended to include `carrierImplies` between `carrierQS` and `sections`. Net +20 lines (1060 → 1080).
- **`explorer/Map_v34_explorer.html`** — added `<link rel="stylesheet" href="update-e3.css">` after `update-e4.css` (one line + a corresponding entry in the file-list comment); added `<script src="explorer-implies.js"></script>` after `explorer-resolves.js` and before `explorer-glossary.js` (load order: data → qs → map → sidebar → phenomena → discourse → resolves → **implies** → glossary; implies depends on `renderQS`/`renderQSCitations` from qs and `renderResolvesTargetPill` from resolves, both of which load earlier). Net +4 lines.

**Decisions taken** (per the proposal in this sub-PR's authoring chat):

- (1) Module layout — new tenth JS file `explorer-implies.js`, per the "one new logical surface = one new module" precedent set by E2 (resolves) and E4 (qs).
- (2) No new data index — `node.if_real_implies` is already on each carrier through the `{...n}` spread in `discourse_by_id` (`explorer-data.js` line 271). `explorer-data.js` untouched.
- (3) Row chrome — option (b) two-level tree: resolutions as groups, implications as rows within each group. The resolution → implications hierarchy is load-bearing (different resolutions name different physical scenarios — leptogenesis vs Affleck-Dine on matter-antimatter-asymmetry, PBH-DM vs WIMP-DM on dark-matter, AdS-CFT vs string-vacua-landscape vs spinfoam on qg-frontier). Flattening loses this.
- (4) Default expansion — resolutions and implications both default-expanded. Citation lists rendered inline beneath; no collapse. The if_real_implies tree is the headline content of the carrier card; hiding it behind a click defeats the surfacing.
- (5) Section heading — `<h3>If real, implies… <span class="dx-section-ct">· N</span></h3>` where N is the total implications count (mirrors the count-pill convention used by resolves / discourse-edge sections).
- (6) Per-resolution group header — italic verbatim "If <condition prose>" — load-bearing per the no-paraphrase rule. The `resolution`-slug field (e.g., "leptogenesis-via-heavy-neutrino-decay") is intentionally omitted from UI: it's a schema-internal identifier and per the vocabulary discipline shouldn't surface in physicist-facing prose.
- (7) Kind labels — physicist-natural phrases ("Forces new formal classification", "Forces relation", "Promotes cell", "Forces new axis"), not the schema enum values. Color-coded pills mapped to the project palette.
- (8) Target rendering per kind — `new_FC`: no target pill (target is null in all 17 v95 cases; description carries the story). `new_axis`: FC pill via `renderFCPill` (the host classification the axis would be added to). `forced_edge`: three-pill row `from → [subtype] → to` reusing `renderFCPill`. `promotes_subtype`: reuse `renderResolvesTargetPill` from `explorer-resolves.js` (it already does cell-id → fc-id resolution via `DATA.cell_id_to_fc_id` and emits `[data-fc-cell-jump]` with the cell `content` as label — exact reuse).
- (9) Subtype string on forced_edge ("derives-from", "specializes") — rendered verbatim with `[...]` bracket pill styling; these are physicist-readable project edge-type names that the reader already sees in the cross-classification edge list elsewhere.
- (10) Vocabulary discipline — no "if_real_implies", "resolution", "implication", "kind", "target", "condition_citations", "derivation_citations" appear as labels, tooltips, or section headings (per `PHYSICIST_FACING_VOCABULARY.md` §3, §4, §6).

**Verified** (vm-context smoke test in the authoring chat):
- 14 carriers, 23 resolutions, 24 implications, 12 with `quantitative_scale` — all counts confirmed against canonical v95 data.
- 4 of 5 schema-defined `kind` values appear in v95 (`new_FC` 17, `forced_edge` 3, `new_axis` 2, `promotes_subtype` 2); `new_cell` is schema-defined but absent in v95 — defensive guard included in the renderer.
- Each kind renders with the correct kind-class on the row (`dc-implies-kind-new-FC`, `-new-axis`, `-forced-edge`, `-promotes-subtype`), the correct target rendering (no target pill for `new_FC`; FC pill for `new_axis`; three-pill edge triplet with subtype bracket pill for `forced_edge`; cell pill for `promotes_subtype`), the description prose, and the qs block on the 12 qs-bearing implications.
- Full leptogenesis render (`matter-antimatter-asymmetry`): sidebar-section emitted with `If real, implies… · 2` heading, italic condition prose, Fukugita-Yanagida / Davidson-Nardi-Nir / Buchmüller condition citations, two `promotes_subtype` implication rows (cell-nu-Dirac-vs-Majorana with Davidson-Ibarra M₁ ≳ 10⁹ GeV qs block; cell-nu-leptogenesis without qs), each with derivation citations.
- Dark-matter render: three `forced_edge` implications across two resolutions, edge-triplet rendering correctly for `dark-matter-candidates → [derives-from] → sm-rep-content`, `... → compact-astrophysical-objects`, `... → [specializes] → modified-gravity-alternatives`.
- Topological-phases-classification render: 4 resolution groups (the carrier with the most resolutions in v95), 4 implications total (2 `new_axis` targeting `freed-hopkins-cobordism` as an FC pill, 2 `new_FC` with no target).
- Empty / null inputs return `''` cleanly.
- `node --check` passes on the new module and the modified `explorer-discourse.js`.

**Known follow-up surfaced by E3** (cosmetic / queued):

- Three cell-targets of `promotes_subtype` implications and two FC-targets of `new_axis` implications resolve to nodes that already exist in v95 (e.g., `cell-nu-Dirac-vs-Majorana` is a real cell in `neutrino-sector-phenomenology`; `freed-hopkins-cobordism` is a real FC). All clickable, deep-link working.
- The `resolution`-slug field is omitted from UI by design per the vocabulary discipline. If a future maintainer wants to surface it (e.g., as a small monospace pill on the resolution-group header for cross-referencing), that's a CSS + one-line markup change; not a redesign.
- The qs block inside an implication row reuses `update-e4.css`'s `.qs-citations-compact` styling for the qs citations; the implication's own `derivation_citations` use `.dc-implies-citations`. The two citation lists appear consecutively (qs citations first, then derivation citations) for the 12 qs-bearing implications. Both are load-bearing per the no-paraphrase rule and both render.
- The resolves-edge description-rewrite follow-up surfaced by E2 (curator-internal vocabulary in `description` fields) also applies to a small number of implication descriptions — they contain physicist-natural English words that overlap with schema enum values ("resolution of the QFT-GR non-sharing", "the anthropic resolution of the CC"). These are load-bearing prose, not schema-name leaks, and render verbatim by design.

### Sub-PR E4 — render `quantitative_scale` callouts (the reusable component) — CLOSED (2026-05-27)

The reusable component is in. The minimal-inline `formatQS` that E2 shipped inside `explorer-resolves.js` has been absorbed into a new ninth JS module `explorer-qs.js` and is now consumed by every dense qs surface plus the new prominent block form for the carrier surface.

**Closure summary.** Shipped the following files:

- **NEW `explorer/explorer-qs.js`** (~200 lines) — exports three public functions: `renderQS(qs, opts)` (the inline atomic form — prefix label + bound-direction symbol + KaTeX-rendered value + units; used by cell-direct, prediction-level, resolves sensitivity, competing-prediction values, bears-on edges), `renderQSCallout(qs, opts)` (the block form — a complete `<div class="sidebar-section">` with `<h3>` heading, bordered card, expanded citations; used only on the carrier surface), and `renderQSCitations(citations, opts)` (citation list helper with optional `compact` mode). Internal helper: `renderTexInline(tex)` (KaTeX with graceful fallback). The component absorbs E2's `formatQS` verbatim with two upgrades: (a) `units === "dimensionless"` is now suppressed regardless of `kind` (fixes the SU5 α_GUT entry where `kind=coupling` carried the literal string `units="dimensionless"`, which E2's formatQS would have leaked into display); (b) class names switched from `dc-resolves-prefix`/`-bd`/`-units` to generic `qs-prefix`/`qs-bd`/`qs-units`.
- **`explorer/explorer-resolves.js`** — local `formatQS` and its `BD_SYMBOL` constant removed (~95 lines); the sensitivity-line and competing-prediction call-sites now invoke `renderQS` directly. The resolves-row container chrome (`dc-resolves-row`, `dc-resolves-head`, `dc-resolves-sensitivity`, `dc-resolves-citations`, `dc-resolves-desc`, `dc-resolves-ppp*`) is preserved — those are row layout, not qs atoms. Net delta: file dropped ~50 lines.
- **`explorer/explorer-sidebar.js`** — three insertions: (i) `renderSidebarCell` Description section now also renders `cell.quantitative_scale` inline below the description prose, with `renderQSCitations` in compact mode; the section now renders even when `cell.description` is empty if a qs entry exists (215 cell-direct entries previously invisible now render); (ii) `renderSidebarCell` cell-pred loop emits a `<div class="dc-pred-qs">${renderQS(p.quantitative_scale, {})}</div>` chip between `pred-text` and `pred-meta` when the prediction carries qs; (iii) `renderSidebarFC` FC-pred loop applies the same pattern. All three call-sites guarded by `typeof renderQS === 'function'` for graceful degradation.
- **`explorer/explorer-discourse.js`** — three insertions: `renderEdgeRow` renders `dx-edge-qs` line when edge carries qs; `renderFrontierCard` and `renderTotalityCard` insert `renderQSCallout` between desc and sections.
- **NEW `explorer/update-e4.css`** (~165 lines) — generic `.qs-prefix`/`.qs-bd`/`.qs-units` atoms, citation chrome `.qs-citations`/`.qs-citation` with compact-mode variant, carrier-callout block `.qs-callout`/`.qs-callout-value`, per-surface wrappers `.cell-qs-inline`/`.dc-pred-qs`/`.dx-edge-qs`.
- **`explorer/update-c-edges.css`** — three rules retired (`.dc-resolves-prefix`, `.dc-resolves-bd`, `.dc-resolves-units`); the atoms live in `update-e4.css` under generic names.
- **`explorer/Map_v34_explorer.html`** — added `<link rel="stylesheet" href="update-e4.css">` after `update-c-typography.css`; added `<script src="explorer-qs.js"></script>` between `explorer-data.js` and `explorer-map.js`.

**Decisions taken** (per the proposal in this sub-PR's authoring chat):

- (1) New ninth JS file `explorer-qs.js`; resolves becomes a consumer.
- (2) API shape — `renderQS` inline + `renderQSCallout` block + `renderQSCitations` helper.
- (3) Chrome — inline form (a) on the four dense surfaces; block form (c) on carrier surface. Cell-direct placement inside the Description section, not as its own section.
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

The visual signal layer. Small chips or indicators on tiles and discourse nodes when they carry Phase B / Phase C content. Touch `explorer-map.js` (tile decoration) and `explorer-discourse.js` (discourse-node card decoration), plus CSS. Now the highest-priority eligible action — `PROJECT_NEXT_STEPS.md` §0 / §5.9 carries the closing-prompt template.

### Sub-PR E6 — `rank_by_scale` overview panel *(discretionary)*

New top-level view. Reach via toolbar button. Useful for the working physicist who wants the "what's the coverage by kind?" question answered in one glance. New module `explorer-ranks.js`.

### Sub-PR E7 — `find_discriminating_experiments` view *(discretionary)*

New top-level view. Pick two programs, see what they jointly resolve, with the per-program SM-vs-BSM prediction differentials surfaced. The flagship Phase C AI-first query — the project's most discriminating demo target for outreach (per the Phase C handoff §3). New module `explorer-discriminating.js`.

### Sub-PR E8 — explorer banner + About panel refresh *(housekeeping)*

The live explorer's About / banner / help-overlay text refers to v34 / schema v15.3 / 71 nodes / 7 experimental programs. The data has moved to v95 / v19 / 83 nodes / 19 programs. Update the user-facing text to reflect current state. One-file touch (the HTML).

### Sequencing constraints

E1 closed first (verification-only). E2 closed second (full implementation, 2026-05-27). E4 closed third (the reusable qs callout component, 2026-05-27). E3 closed fourth (if_real_implies trees on all 14 carrier nodes, with the 23 resolutions / 24 implications / 12 implication-level qs entries all surfacing — the explorer Phase B + Phase C content-surfacing gap closes here, 2026-05-27). E5 ships next: decoration / signal-layer chips on tiles and discourse-node cards to signal which Phase B / Phase C content each node carries. E6, E7, E8 are independent of each other and of E1–E5.

The natural cadence: ~~E1~~ → ~~E2~~ → ~~E4~~ → ~~E3~~ → E5 → (E8 alongside any earlier sub-PR as a stowaway one-line edit) → E6 → E7 if maintainer chooses.

---

## 4. Working norms

Inherited from `EXPLORER_HANDOFF.md`, with these deltas / clarifications for Phase B + C surfacing:

- **Deliverables ship as complete files via `present_files`, not as patches.** The maintainer is non-developer and uploads files via GitHub web UI by erase-and-replace. Every JS file, CSS file, HTML file, and methodology document modification ships as a *complete file* presented via the `present_files` tool. "Replace §3 with this" patches, per-line diff blocks, and "splice this in here" instructions are forbidden — they require manual splicing that slows the project significantly and introduces splice errors. This is the project-wide norm documented in `PROJECT_NEXT_STEPS.md` §6 norm #1 and `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` §4; it applies to every sub-PR in this handoff.
- **Audit before assuming open.** The E1 closure pattern (work that landed outside the formal queue) shows that the queue isn't a guarantee — surfacing work can ship in step with data-side PRs. Future sessions opening a queued sub-PR should audit the relevant explorer modules + the canonical v95 data before proposing a diff. If the work is already done, close the sub-PR with a verification-only closure block (E1 is the template).
- **Don't paraphrase content fields.** Quantitative_scale citations contain inline source-value-phrase prose (the Phase C admissibility test §4 requires this); render them as-is, don't truncate or summarise. Same for if_real_implies condition/description text. Same for resolves-edge descriptions (even when they contain curator-internal vocabulary that surfaces in the UI — flagged as the E2 follow-up; resolution is a separate data-side content-rewrite sub-PR, not an explorer-side paraphrase).
- **KaTeX is already loaded** with the double-escape fix (`\\\\` → `\\`); reuse it for any qs value that benefits from math typesetting (e.g., `10^{11.5}`, `\theta_{QCD} < 10^{-10}`).
- **The MCP server is the schema authority and the per-query source of truth.** When the explorer's transform layer (`augmentDataset` in `explorer-data.js`) needs to read a new field, prefer fetching the canonical record via the MCP server's record-returning tools (`get_node`, `get_classification`, `get_experimental_program`, `find_signal_implications`) for the design and testing phase, then build the corresponding index in `explorer-data.js`. The runtime explorer reads the consolidated JSON directly — but its in-browser indexes mirror the MCP server's logic.
- **Schema v19's `bound_direction` is required reading.** The v19 spec at `methodology/MAP_v19_schema_spec_extension.md` defines the enum semantics. Two-sided is the default for exact values; lower / upper are the asymmetric cases; unspecified is reserved for cases where direction can't be determined from the citation. v19 Rule 34 forbids `bound_direction` when `uncertainty` is non-null (the uncertainty form `{low, high}` carries the direction implicitly). The renderer should not display bound_direction when uncertainty is non-null.
- **Don't add new content to the dataset from the explorer side.** The explorer reads, transforms, and renders. New cells, new edges, new implications go through the data PR pathway with CI gating. The firewall (`META_v21_1_methodology_firewall.md`) binds the data layer; the explorer reads the result.
- **Carry-over from prior handoff:** project files contain methodology only, not explorer code. Each sub-PR is one chat; the chat fetches the modules it touches via `web_fetch` or bash + curl, edits them, and returns the updated files via `present_files` for the maintainer to upload. The 11-file architecture is documented in `EXPLORER_HANDOFF.md` §"File-by-file architecture" — sub-PR E2 added `explorer-resolves.js` (eighth JS file), sub-PR E4 added `explorer-qs.js` (ninth JS file) and `update-e4.css`, and sub-PR E3 added `explorer-implies.js` (tenth JS file) and `update-e3.css`. The current build is sixteen files (1 HTML + 6 CSS + 9 JS).

---

## 5. How to start a new chat on this work

Project files auto-attach when a fresh chat opens. To resume:

1. Open a fresh chat in the project.
2. Confirm `/mnt/project/` lists this handoff plus `EXPLORER_HANDOFF.md`, `META_v21_1_methodology_firewall.md`, `PROJECT_GOAL.md`, `PROJECT_INFRASTRUCTURE.md`, `PROJECT_NEXT_STEPS.md`, and `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` (the last is useful context for the Phase C content surfaces).
3. **Run the §0 state-verification ritual.** `server_info` on the MCP; load the live explorer URL; confirm what's live.
4. Tell the chat which sub-PR to resume — e.g., *"Pick up at sub-PR E5 from EXPLORER_PHASE_BC_HANDOFF.md: tile / discourse-node decoration. Fetch the relevant modules from GitHub, propose the diff, then wait for confirmation before authoring. Ship complete files via present_files."*
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
- Explorer modules: `/explorer/Map_v34_explorer.html`, `/explorer/explorer-data.js`, `/explorer/explorer-qs.js` (added sub-PR E4), `/explorer/explorer-map.js`, `/explorer/explorer-sidebar.js`, `/explorer/explorer-phenomena.js`, `/explorer/explorer-discourse.js`, `/explorer/explorer-resolves.js` (added sub-PR E2), `/explorer/explorer-implies.js` (added sub-PR E3), `/explorer/explorer-glossary.js` plus `/explorer/update-b.css`, `/explorer/update-c.css`, `/explorer/update-c-edges.css`, `/explorer/update-c-typography.css`, `/explorer/update-e4.css` (added sub-PR E4), `/explorer/update-e3.css` (added sub-PR E3)
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
- Explorer modules: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/explorer-data.js` (and analogously `-qs.js`, `-map.js`, `-sidebar.js`, `-phenomena.js`, `-discourse.js`, `-resolves.js`, `-implies.js`, `-glossary.js`)
- Explorer CSS: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/explorer/update-b.css` (and analogously `update-c.css`, `update-c-edges.css`, `update-c-typography.css`, `update-e4.css`, `update-e3.css`)
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
5. **When all sub-PRs E1–E5 have shipped**, the Phase B + C surfacing pass closes. This handoff transitions to "closed" status and a successor handoff (or just `EXPLORER_HANDOFF.md` itself, refreshed) takes over for whatever comes next — likely Track 4 outreach, since explorer-readiness for outreach was the original reason this pass exists. After E3 (this sub-PR) the content-surfacing pass is content-complete; E5 is the remaining decoration sub-PR.

---

*End of EXPLORER_PHASE_BC_HANDOFF.md. Drafted 2026-05-26 as the next-phase explorer handoff after Predictive Layer Phase C closed (v95 / 3.2.3 / 288 quantitative_scale entries / 38 resolves edges / 14 if_real_implies carriers / 19 experimental programs). Amended 2026-05-27 to record sub-PR E1 closure as verification-only and to extend §4 with the file-delivery norm after a maintainer flag. Amended again 2026-05-27 to record sub-PR E2 closure (38 resolves edges now render via new `explorer-resolves.js` module + indexing + call-sites in the program / cell / frontier / totality cards). Amended again 2026-05-27 to record sub-PR E4 closure (the reusable quantitative_scale callout component now lives in a new `explorer-qs.js` module + `update-e4.css` stylesheet; 276 of 288 qs entries render across the four dense surfaces plus the carrier-card prominent block; the if_real_implies implication-level qs entries — the remaining 12 — light up when E3 ships). Amended again 2026-05-27 to record sub-PR E3 closure (the if_real_implies trees on all 14 carrier nodes now render via a new `explorer-implies.js` module + `update-e3.css` stylesheet + two call-site additions in `explorer-discourse.js`; 23 resolutions, 24 implications, and the remaining 12 implication-level qs entries all surface — the explorer Phase B + Phase C content-surfacing gap is now closed; E5 (decoration / signal-layer chips) is the remaining sub-PR before the surfacing pass closes). The previous explorer handoff (`EXPLORER_HANDOFF.md`) closed at Update C; this document picks up the explorer build to surface the ~6 months of Phase B + Phase C data-side content that has accumulated since.*
