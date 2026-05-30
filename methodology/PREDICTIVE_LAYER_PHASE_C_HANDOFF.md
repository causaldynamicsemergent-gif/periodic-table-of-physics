# Predictive Layer Phase C — handoff and process (CLOSED)

> **PHASE C CLOSED — 2026-05-26.** All five authoring steps shipped (4.1, 4.2, 4.3, 4.4, 4.5). MCP worker rebuilt and verified via `server_info` (data v95, schema v19, 33 tools, 38 resolves edges, 288 quantitative_scale entries). This document is preserved for reference and as a record of the Phase C trajectory. Active explorer surfacing work continues in `EXPLORER_PHASE_BC_HANDOFF.md`. The operational queue lives in `PROJECT_NEXT_STEPS.md`.

**Purpose of this file.** Standing reference for anyone — the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo — who needs to understand Phase C of the Predictive Layer. Now marked closed; preserved as the historical record of what Phase C was and how it shipped. This is v5, written 2026-05-27 to mark Phase C closure after v94 (sub-PR 57, fcc, Step 4.4 close) and v95 (Step 4.5, if_real_implies implication-level quantitative_scale) shipped 2026-05-26. v4 (2026-05-26) carried Phase C through sub-PR 56; the chain through v95 is recorded in `_meta.changelog` of the canonical data file and summarized in §2 below.

Location: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_PHASE_BC_HANDOFF.md` (active explorer surfacing pass), `EXPLORER_HANDOFF.md` (previous explorer build, closed at Update C), `PREDICTIVE_LAYER_HANDOFF.md` (Phase A, closed), `PREDICTIVE_LAYER_PHASE_B_HANDOFF.md` (Phase B, closed), `PROJECT_NEXT_STEPS.md` (active operational queue), and `TRACKS_AFTER_PHASE_A.md` (routing doc).

---

## 0. Read this first — state-verification opens every session

**The handoff document is orientation, not ground truth.** Three prior incidents (the v2 "Phase B rebuild may not have deployed" drift note; the v3 → v4 rewrite at 2026-05-26; the v4 → v5 closure-recording rewrite at 2026-05-27 after this document still pointed at queued Phase C work after v94/v95 had shipped) revealed that handoff documents lag the live system whenever an authoring session ships work but doesn't fully update the handoff. The fix is procedural: every new session **must** verify state from authoritative sources before relying on this document.

The authoritative state lives in three places:

1. **Live MCP server.** Call `server_info` first. Note what it reports for `data_version`, `schema_version`, and `tool_count`. Compare to §1 "Where things stand" below — if they differ, the MCP server or this document has drifted.
2. **Canonical data file's `_meta` block.** Fetch `data/Map_v34_consolidated.json` via raw CDN, parse `_meta.version` and `_meta._schema`. The `_meta.changelog` array contains a per-sub-PR record of every authoring decision back to v22. This is the single source of truth about what has been shipped.
3. **The repo's `/methodology/` directory.** Lists every spec extension, scope memo, and handoff document in force. If a file is named in this handoff but missing from the repo, flag it; if a file in the repo isn't named here, this handoff is incomplete.

Once verified, proceed with the work. If state has drifted since this handoff was last updated, the session that catches the drift is responsible for either (a) updating this handoff at the end of its work, or (b) flagging the drift to the maintainer with a recommended update.

For sessions after Phase C closure: this document records the *closed* state of the Predictive Layer. Active work has moved to other workstreams (see `PROJECT_NEXT_STEPS.md`); state verification here is now a routine check that the closed-state counts (v95, schema v19, 38 resolves, 288 qs) still hold rather than a search for in-progress drift.

---

## 1. Where things stand (as of Phase C closure, 2026-05-26)

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`

**Canonical data:** `data/Map_v34_consolidated.json`, internal version `v95`. Counts: 83 nodes, 230 edges, 30 formal-classifications, 484 cells, 22 glossary entries, 19 experimental programs, 14 if_real_implies carriers, 38 resolves edges, 288 quantitative_scale entries.

**Current schema:** `schema/Map_v19_schema.json`. Adds the optional `bound_direction` field on `quantitative_scale` (lower / upper / two-sided / unspecified). Earlier schemas (v15.3, v16, v17, v18) retained in `/schema/` for reference.

**Validator:** `scripts/validate.py` enforces Rules 1–36 against v19 schema. All hard errors except Rule 22 and Rule 35 (warning-level only). 4 legacy `constrains`-subtype edges tolerated per `PROJECT_INFRASTRUCTURE.md` §2.

**Live MCP server:** `https://map-of-physics.eddie-8e5.workers.dev` — reports `version 3.2.3, schema_version v19, data_version v95, tool_count 33`. The worker is fully current with the canonical data file. The flagship Phase C AI-first queries (`find_resolvers`, `find_discriminating_experiments`, `rank_by_scale`, `find_bounds`, `find_signal_implications`) all return live results across the full v95 surface.

**Cumulative content state (verified via server_info, 2026-05-26):**
- quantitative_scale: 288 total. By kind: dimensionless 96, mass 75, energy_scale 53, coupling 21, sigma_deviation 11, ratio 11, time 15, length 6. By bound_direction: two-sided 137, upper 29, lower 16, absent 106.
- resolves edges: 38, spanning all 12 forward-looking experimental-program nodes. The 7 historical programs carry produces-classification edges instead.
- if_real_implies: 14 carriers, 23 resolutions, 24 implications, with 12 implication-level quantitative_scale entries from the Step 4.5 sweep.

**Phase B state (closed, preserved):** 14 if_real_implies carriers, 23 resolutions, 24 implications. Untouched by Phase C except for the sub-PR 55 carrier-refresh on muon-g-2 (one if_real_implies entry's condition text + condition_citations refreshed against post-2025 literature; structure preserved) and the Step 4.5 sweep that added implication-level `quantitative_scale` entries to 12 of the 24 implications.

**Worker rebuild verification convention.** Worker rebuilds are Cloudflare deployment operations, not consolidated-data PRs. They do not produce `_meta.changelog` entries. The authoritative verification is `server_info` returning the expected `data_version`. Future sessions checking rebuild status should call `server_info`, not scan the changelog.

---

## 2. What's been shipped

The single authoritative record of authoring decisions is `data/Map_v34_consolidated.json` → `_meta.changelog` (74 entries through v95). Don't paraphrase it; read the actual changelog entries when a sub-PR's reasoning matters. The summary below is a map, not a replacement.

### Phase C Step-by-step ledger

- **Step 0 — Phase C scope memo.** `methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`. Settles the v18 design questions (the `quantitative_scale` field on five surfaces; the `resolves` edge type; the firewall admissibility test). Authored 2026-05-?? before sub-PR sequence began.

- **Step 0.5 — experimental-program inventory (v41).** 12 forward-looking experimental-program nodes added: dune, hyper-k, juno, gw-ground-network, lisa, cmb-s4, rubin-lsst, desi, axion-haloscope-network, edm-program, muon-g-2-continuation, fcc. Each carries published design-report / proposal citations.

- **Step 4.1 — frontier-level `quantitative_scale` (v42).** 13 entries across 13 of 17 carriers. Established the methodological principle: include any characteristic numerical commitment when a literature value is citable, regardless of whether the carrier's open question lives in-scope or is dispatched elsewhere.

- **Step 4.2 — prediction-level and cell-direct `quantitative_scale` sweep (v43–v65, sub-PRs 1–23).** ~215 entries across 14 FCs. Surfaced ~30 T-conventions for encoding (T7 cells[i].predictions[j] attachment; T10 uncertainty=null for theoretically-exact / falsified-claim / no-explicit-σ; T11 stat ⊕ syst quadrature; T13 direct cells[i].quantitative_scale; T17 squared-dimensional kind encoding (kind=mass + units="eV²"); T19 ordering / discrete-variant best-fit; T20 NME-uncertainty-range conservative bound; T21 magnetic-field-as-deferred-kind; T22 angular-measure-as-deferred-kind; T23 cross-section-as-area; T24 temperature-as-energy-scale via k_B T; T25 dimensionful-quantum-conductance (kind=coupling units=e²/h); T26 rational-fraction encoding; T27 irrational-structural-constant encoding; T29 sigma-deviation cluster). Surfaced the bound_direction encoding gap that prompted v19.

- **v18 → v19 schema bump (v66, sub-PRs 24–29).** Step 0 v19 scope memo (`methodology/PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md`); v19 spec extension (`methodology/MAP_v19_schema_spec_extension.md`, 350 lines); v19 schema JSON (`schema/Map_v19_schema.json`); validator extended to Rules 34–36 (Rule 34: bd forbidden when uncertainty non-null; Rule 35: bd recommended when unc=null, warning level; Rule 36: bd enum). **Retrofit pass** populated `bound_direction` on the 134 uncertainty=null entries across the dataset (97 entries with non-null uncertainty correctly leave bd absent per Rule 34). MCP worker rebuilt to schema v19 with the Phase C tool surface (rank_by_scale, find_resolvers, find_discriminating_experiments, find_bounds, extended find_predictions and find_cells).

- **Step 4.2 continuation post-v19 (v67–v82, sub-PRs 30–45).** Continued cell-direct and cross-FC sweep work. ADE-clique sweep arc (sub-PRs 35–39): McKay-correspondence parallel-integer-set across five FCs. Sub-PR 40 fully-anchored hadronic-states (18/20 qs-admissible). Sub-PR 41 fully-anchored dark-matter-candidates (18/18). Sub-PR 42 cft-bootstrap-exclusion-regions cell-direct first-instance (8/18). Sub-PR 43 first cross-FC parallel-anchor pair (sterile-eV cell-dm-sterile-nu-eV ↔ cell-nu-sterile-eV-LSND-claim-FALSIFIED). Sub-PR 44 neutrino-sector-phenomenology fully-anchored qs-admissible surface (15/18, the 3 unanchored being firewall-§4 SKIPs). Sub-PR 45 FIRST cross-FC edge between dark-matter-candidates and neutrino-sector-phenomenology (`edge-xc-dm-derives-nu-sector-partial`, derives-from + status=partial + cell_refs pinning the two DM-side sterile cells). **Cumulative cross-FC pattern catalog at sub-PR 45 close: 12 bidirectional-anchor-closures + 6 parallel-anchors = 18 cross-FC numerical patterns.**

- **Step 4.4 — `resolves` edges (v83–v94, sub-PRs 46–57).** 38 edges across 11 sub-PRs opening 8 physics subdomains. The major precedents established:

  - **Sub-PR 46** (hyper-k, 4 edges): T30 mint = discovery-floor sensitivity with bound_direction populated; detector-independence principle for predictions_per_program (per-program predictions transfer across detectors); first Step 4.4 sub-PR.
  - **Sub-PR 47** (dune, 4 edges): T30 reuse; first DISCRIMINATING-RESOLVES-PAIR (HK ↔ DUNE on four shared targets via complementary detector technologies).
  - **Sub-PR 48** (juno, 4 edges): T31 mint = precision-measurement-resolves sensitivity (value mirrors cell qs; uncertainty mirrors design-projected precision; bd omitted; companion shape PPP=[] + exclusion_only=true). First THREE-WAY DISCRIMINATING-RESOLVES CLUSTERS (HK ↔ DUNE ↔ JUNO on mass-ordering and p → ν̄K⁺).
  - **Sub-PR 49** (gw-ground-network + lisa, 6 edges): First GW-domain edges; first EOS-program discriminating-resolves edge (NS tidal-deformability with stiff/intermediate/soft EOS PPP); first seed-formation discriminating-resolves edges; first mixed-timeline sub-PR (running + planned-by-2035).
  - **Sub-PR 50** (desi, 3 edges): First FRONTIER-TARGET resolves edge (desi → cc-frontier); T31 reuse on BAO + H_0 precision-improvement targets.
  - **Sub-PR 51** (axion-haloscope-network, 3 edges): First kind=coupling sensitivity (units=GeV⁻¹, log10=true). Second frontier-target edge (→ strong-cp-problem).
  - **Sub-PR 52** (edm-program, 2 edges): First DUAL-FRONTIER experimental program (→ strong-cp-problem via nEDM, → matter-antimatter-asymmetry via eEDM). First instance of a single frontier carrying two complementary resolves channels (strong-cp-problem: axion-haloscope direct-detection + edm indirect-bound). Third and fourth frontier-target edges. First non-SI-derived units string on the sensitivity surface (e·cm).
  - **Sub-PR 53** (muon-g-2-continuation, 1 edge): **PROJECT'S FIRST exclusion_only=false RESOLVES EDGE.** T33 mint = precision-measurement sensitivity with bound_direction=two-sided, structurally distinct from T30. First totality-approach-targeted resolves edge (muon-g-2 is the first totality-approach-typed target; prior frontier-targets all targeted open-frontiers). PPP populated with TI 2020 dispersive HVP + BMW 2021 lattice HVP as §4(2)-admissible competing SM-side calculations.
  - **Sub-PR 54** (cmb-s4, 3 edges): First kind=ratio sensitivity (primordial r). Resolves-edge sensitivity-kind coverage reaches 7/8 (energy_scale remains unused). Methodological observation: cell-level vs edge-level kind divergence on r (cell=dimensionless from Step 4.3; edge=ratio).
  - **Sub-PR 55** (CARRIER REFRESH on muon-g-2, no new edges): First instance of the carrier-refresh sub-PR shape as a first-class Phase C deliverable. Five fields refreshed against post-2025 literature (Aliberti 2025 WP25 + Aguillard 2025 final Run-1–6 + Boccaletti 2024 BMW hybrid): muon-g-2 quantitative_scale (4.2σ → 0.6σ), if_real_implies condition + condition_citations, carrier description; muon-g-2-continuation description + citations. Sub-PR 53 edge byte-identical-preserved by design (edge records 2021-era design landscape; carrier records current empirical status; the two are legitimately distinct structural facts). Surfaced v17 schema gap: if_real_implies implication kind enum lacks representation for "no new structure forced" SM-consistent resolutions.
  - **Sub-PR 56** (rubin-lsst, 4 edges): First MIXED-EXCLUSION-FLAVOR sub-PR (edge A exclusion_only=false PPP=3 on cc-frontier; edges B/C/D exclusion_only=true on σ_8/WDM/PBH-microlensing). First PARALLEL-RESOLVES-EDGE on cc-frontier (rubin's edge A in addition to desi's sub-PR 50 edge — same target, distinct sensitivity-encoding kinds).
  - **Sub-PR 57** (fcc, 4 edges, v94, 2026-05-26): **STEP 4.4 CLOSES.** Last unattached forward-looking experimental-program node from sub-PR 0.5 attached. Second MIXED-EXCLUSION-FLAVOR sub-PR (edges A Higgs self-coupling + C WIMP thermal mass + D m_W precision exclusion_only=false with PPP populated; edge B direct BSM reach exclusion_only=true). Third THREE-EDGES-TO-A-SINGLE-CARRIER pattern (edges A, B, D all target hierarchy-problem with structurally distinct probes). Project's fourth and fifth exclusion_only=false PPP-populated resolves edges; cumulative count rises to five PPP-populated edges. Second cell-level vs edge-level encoding-divergence instance (edge C cell-dm-WIMP-canonical: cell=length for σ_SI, edge=mass for collider reach — complementary observables). Resolves-edge sensitivity-kind coverage remains 7/8 (energy_scale unused) per accuracy-drive over forced-closure principle.

  **T-convention register after Step 4.4 close:** 33 active conventions (T1–T14, T17–T31, T33; T15 retired, T16 dropped). T30 (discovery-floor) and T33 (precision-measurement two-sided) cover the two semantic sensitivity registers.

  **Cross-FC pattern catalog after Step 4.4 close:** 12 bidirectional-anchor-closures + 6 parallel-anchors + 4 discriminating-resolves-clusters + 1 dual-frontier-program + 2 parallel-resolves-edge-clusters.

- **Step 4.5 — `quantitative_scale` on `if_real_implies` implications (v95, 2026-05-26).** **PHASE C AUTHORING CLOSES.** 12 implication-level quantitative_scale entries across 12 of 14 carriers, closing the last open Phase C authoring sweep. Entries by carrier: (1) qg-frontier/string-landscape ~10^500 vacua [ratio, log10, lower]; (2) cc-frontier/anthropic Λ ≈ 10^{-122} [ratio, log10, two-sided]; (3) koide-formula/flavor-symmetry Q = 2/3 exact [dimensionless, two-sided]; (4) chpt/holographic-QCD F_π ≈ 92 MeV [energy_scale, MeV, two-sided]; (5) hierarchy/SUSY m_SUSY ≲ 1 TeV [energy_scale, TeV, upper]; (6) hierarchy/composite-Higgs f ≲ 1 TeV [energy_scale, TeV, upper]; (7) strong-cp/PQ-axion f_a 10^8–10^12 GeV [energy_scale, GeV, log10, uncertainty {2,2}]; (8) flavor/Froggatt-Nielsen ε ≈ 0.22 [dimensionless, two-sided]; (9) measurement/GRW r_C ~ 10^{-7} m [length, m, log10, two-sided]; (10) matter-AM/leptogenesis-Majorana M_1 > 10^9 GeV [energy_scale, GeV, log10, lower] on the Dirac-vs-Majorana cell-promotion implication (the canonical Davidson-Ibarra 2002 example); (11) DM/QCD-axion f_a 10^{11}–10^{12} GeV [energy_scale, GeV, log10, uncertainty {0.5,0.5}]; (12) DM/PBH M 10^{-17}–10^{-12} M_sun [mass, M_sun, log10, uncertainty {2.5,2.5}]. The 12 implications NOT receiving qs are structural-only (no characteristic numerical scale at the implication level) or kind-enum-mismatched (MOND a_0 lacks an admissible kind in v18 enum — deferred). Validator clean against schema v19.

- **Consolidated MCP worker rebuild (post-v95, 2026-05-26).** Worker on Cloudflare rebuilt against v95 data. Verified by `server_info` reporting `version 3.2.3, schema_version v19, data_version v95, tool_count 33`. The flagship Phase C AI-first queries (`find_resolvers`, `find_discriminating_experiments`, `rank_by_scale`, `find_bounds`, `find_signal_implications`) all return live results across the full v95 surface. Per the convention recorded in §1, the rebuild is verified by `server_info` rather than by a changelog entry.

---

## 3. What's queued next

**Phase C is closed.** No items remain in the Predictive Layer authoring queue.

Active workstreams now reference other documents:

- **Explorer Phase B+C surfacing pass** — see `EXPLORER_PHASE_BC_HANDOFF.md` §3 for sub-PRs E1 through E8. E1 closed 2026-05-27 as a verification-only zero-diff sub-PR (the surfacing-side renderer was already current — completed in step with the data PRs that landed the 12 forward-looking experimental-program nodes). The pass closes when E1–E5 ship. The surfacing pass renders the Phase B + Phase C content that has accumulated since the explorer last shipped at Update C.
- **Track 4 use-side artifacts** — see `TRACK_4_USE_SIDE_ARTIFACTS.md`. The chat entry point (§1.3) is the one artifact eligible now; the others depend on the explorer surfacing closing.
- **Cross-FC pattern layer** — see `CROSS_FC_PATTERN_LAYER_SCOPE_MEMO.md`. First sub-PR's triggers (§10.1) are partially met (Phase C closed); remaining triggers gate eligibility.
- **Track 5 housekeeping items** surfaced during Phase C — carried forward below.

The operational queue lives in `PROJECT_NEXT_STEPS.md`. That document is the single source of truth for what is currently eligible; this section is a workstream-level summary.

### Track 5 housekeeping items surfaced during Phase C (carried forward)

- **Cell-authoring follow-ups from sub-PR 54.** Author `cell-cosm-Neff` with Planck 2018 N_eff = 2.99 ± 0.17 + BBN concordance; author `cell-dm-DM-baryon-scattering` with Planck/CMB-lensing upper bounds. Both enable follow-up `cmb-s4 → cell` resolves edges. Both are small content-authoring decisions.
- **Phase A structurally-excluded cleanup from sub-PRs 40, 42, 43.** Cells with content="structurally-excluded" but constructive_status MISSING — cft-bootstrap [9]/[11]/[14], hadronic-states [18]/[19], and equivalents elsewhere — need `constructive_status: "forbidden-by-pattern"` + `forced_by` edge authoring per the v16 mechanism. Queued as a Track 5 housekeeping sub-PR.
- **Derivation-edge audit (surfaced 2026-05-30 by the explorer E0 lead).** The open-questions view's focus-not-filter discipline makes a frontier's structural neighbourhood — its `bears-on` (and, more broadly, `derives-from` / `specializes`) edges — load-bearing UI: those edges are the navigable links from an open frontier into the classifications that constrain it. A spot-check during E0 found most open frontiers carry only a single `bears-on` edge (e.g. hierarchy-problem → sm-rep-content; cc-frontier → spacetime-symmetry-groups), so the neighbourhood reads thin. This is a small data-layer authoring item — audit whether additional well-attested constraining classifications should carry `bears-on` edges to each frontier — **not** on any Phase C critical path; it is surface-driven enrichment, queued as a Track 5 housekeeping sub-PR.

---

## 4. Working norms

- **Non-developer maintenance — full files only.** The maintainer is non-developer. All deployment goes via GitHub web UI (erase-and-replace upload) and Cloudflare web editor. No git CLI, no local dev environment, no `npm` or `wrangler`. **Every deliverable** — code, methodology document, scope memo, schema, data PR — ships as a complete file via the `present_files` tool. Patches, per-line diff blocks, and "replace §X with this" splice instructions are forbidden; they require manual splicing that slows the project significantly and introduces splice errors. This norm applies equally to code files and methodology documents, and is documented in `PROJECT_NEXT_STEPS.md` §6 norm #1.
- **Project files are for stable reference material.** This handoff and the scope memos go in project knowledge. Don't attach large schemas, datasets, or worker source to project knowledge — fetch via `web_fetch` or clone the repo via bash in a sandboxed session.
- **CI gates PRs to data + schema.** Methodology docs (this handoff, scope memos, spec extensions) commit directly to `main` without CI gating. Data and schema PRs must pass `scripts/validate.py` (Rules 1–36 since v19 / sub-PR 27).
- **The firewall is binding, and each phase's admissibility test is binding within it.** `META_v21_1_methodology_firewall.md` is the parent. Phase C's operationalization is the three-part scope-memo §4 / v18 spec §4 test (value-is-literature-value + per-program-predictions-are-program-internal + sensitivities-cite-the-experimental-design); v19 adds Rules 34/35/36 on bound_direction. Every authoring step records the §2.5 self-check in the PR / changelog entry.
- **Step 4.1's methodological principle remains binding for cell-direct work** (for posterity / future analogous work). Include any characteristic numerical commitment when a literature value is citable, regardless of whether the carrier's open question lives in-scope or is dispatched elsewhere. Citations are still required per the §4 test; the principle is about which surfaces qualify for inclusion when the literature is citable, not what counts as citable.
- **Existing content is load-bearing.** Cell content, axis labels, citation text, edge descriptions, status fields, frontier and totality-approach node fields, Phase B's `if_real_implies` entries, Phase C's `quantitative_scale` entries and `resolves` edges are not paraphrased in commits or code. The carrier-refresh sub-PR shape (sub-PR 55 first-use) refreshes specific value+citation fields against post-publication literature while preserving structural fields; this is a documented exception with its own firewall test, not a license for content rewriting.
- **Use physics vocabulary.** User-stated principle. Don't coin presentation terms when the data already names a thing. For physicist-facing surfaces (explorer UI, outreach material, chat output to physicists), see `PHYSICIST_FACING_VOCABULARY.md` for the translation discipline.
- **The MCP source is in the repo.** `/mcp/worker.js`, `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, and `/mcp/README.md` are version-controlled. Worker rebuilds edit the skeleton, not the bundled artifact. As of Phase C closure (2026-05-26), the deployed worker is fully current with the canonical data file (v95).

---

## 5. How to start a new chat on this work

Phase C is closed. New work happens in other workstreams; see `PROJECT_NEXT_STEPS.md` §0 for the currently-highest-priority eligible action.

Sessions resuming or investigating Phase C history (rather than active authoring):

1. Open a fresh chat in the project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, the Phase C scope memos (v18 and v19), `META_v21_1_methodology_firewall.md`, `PROJECT_GOAL_PREDICTIVE_LAYER.md`, `PROJECT_INFRASTRUCTURE.md`, `EXPLORER_PHASE_BC_HANDOFF.md`, `PROJECT_NEXT_STEPS.md`, `TRACKS_AFTER_PHASE_A.md`, and other reference docs.
3. **Run the §0 state-verification ritual.** Call `server_info` on the MCP. Fetch the data file's `_meta` block via raw CDN. Confirm the closure-state counts (v95, schema v19, 38 resolves, 288 qs) still hold.
4. Sessions in this project that intend to do active authoring should *not* start with this handoff — they should start with `PROJECT_NEXT_STEPS.md` §0 and the closing prompt the maintainer pasted into the chat.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats. If the assistant doesn't see them, ask it to call `tool_search` with keyword `"map of physics"`.

---

## 6. How this document is maintained

This is the final maintenance discipline for this document. Phase C is closed; future updates are corrections to the historical record only.

The chain of revisions:

1. **v2 → v3** (date unknown). Recorded Phase B closure.
2. **v3 → v4** (2026-05-26). Caught drift from v42 / v18 / 28 tools to v93 / v19 / 33 tools. Brought the document back in sync with reality after sustained drift across sub-PRs 24–56.
3. **v4 → v5** (2026-05-27). Marked Phase C closure after v94 (sub-PR 57, fcc, Step 4.4 close) and v95 (Step 4.5 implication-level quantitative_scale) shipped 2026-05-26. The v4 handoff still listed Phase C work as queued at the time a fresh session opened on 2026-05-27 attempting to execute sub-PR 57 — the drift was caught at session start and the handoff was rewritten to record closure. Added the explicit file-delivery norm in §4 after the same drift-catching session attempted to deliver document updates as patches and the maintainer flagged the workflow violation.

The discipline going forward (for any document still active):

1. **Authoritative state lives in the live system + data file, not the handoff.** §0 makes this explicit. New sessions verify state before trusting the handoff.
2. **Every shipped sub-PR updates the active handoff's "Where things stand" + "What's been shipped" sections.** Not just version numbers — cumulative counts and pattern catalogs need refreshing per sub-PR. Skipping this is the failure mode that caused the v3 and v4 drifts.
3. **"What's queued next" is rewritten when the queue changes.** Sub-PRs that close work items remove them; sub-PRs that surface new follow-ups add them.
4. **Per-sub-PR `_meta.changelog` entries remain the authoritative single-PR record.** Handoff §2 is a map and orientation, not a replacement for the changelog.
5. **Document updates ship as complete files via `present_files`.** Per §4 working norm and `PROJECT_NEXT_STEPS.md` §6 norm #1.

---

## 7. Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev` (current as of 2026-05-26: `v95 / v19 / 33 tools`)
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- This handoff: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` (closed)
- Active operational queue: `/methodology/PROJECT_NEXT_STEPS.md`
- Active explorer handoff: `/methodology/EXPLORER_PHASE_BC_HANDOFF.md`
- Phase C v18 scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`
- Phase C v19 scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md`
- v18 spec extension: `/methodology/MAP_v18_schema_spec_extension.md`
- v19 spec extension: `/methodology/MAP_v19_schema_spec_extension.md`
- Closed Phase B handoff: `/methodology/PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`
- Closed Phase A handoff: `/methodology/PREDICTIVE_LAYER_HANDOFF.md`
- Routing doc: `/methodology/TRACKS_AFTER_PHASE_A.md`
- Closed Update-C explorer handoff: `/methodology/EXPLORER_HANDOFF.md`
- Predictive layer goal: `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- Vocabulary discipline: `/methodology/PHYSICIST_FACING_VOCABULARY.md`
- v19 schema (current): `/schema/Map_v19_schema.json`
- v18 / v17 / v16 / v15.3 schemas (retained for reference): `/schema/`
- Canonical data: `/data/Map_v34_consolidated.json` (currently v95; ~1.5 MB)
- Validator: `/scripts/validate.py` (Rules 1–36)
- MCP worker source: `/mcp/worker.js`, `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, `/mcp/README.md`

### Raw URLs for `web_fetch`

- v19 schema: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/schema/Map_v19_schema.json`
- v19 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v19_schema_spec_extension.md`
- v18 spec extension: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/MAP_v18_schema_spec_extension.md`
- Predictive layer goal: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Phase C v19 scope memo: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md`
- TRACKS routing doc: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/methodology/TRACKS_AFTER_PHASE_A.md`
- Validator: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/scripts/validate.py`
- CI workflow: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/.github/workflows/validate.yml`
- v95 data (~1.5 MB — exceeds github.com blob fallback size limit, use raw CDN or MCP): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
- MCP worker source: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker.js`
- MCP worker skeleton (the edit point): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker_skeleton.js`

---

*End of PREDICTIVE_LAYER_PHASE_C_HANDOFF.md v5. Phase C closed 2026-05-26 at v95 / schema v19 / 38 resolves / 288 quantitative_scale. v5 (2026-05-27) marks closure and adds the file-delivery norm to §4 after a fresh session caught both the closure drift and a workflow violation in the same exchange. Per-sub-PR detail lives in the `_meta.changelog` array of `data/Map_v34_consolidated.json`, which remains the authoritative single-PR record. Active work has moved to `PROJECT_NEXT_STEPS.md` and `EXPLORER_PHASE_BC_HANDOFF.md`.*
