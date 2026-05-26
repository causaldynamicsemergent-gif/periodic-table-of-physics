# Predictive Layer Phase C — handoff and process

**Purpose of this file.** Standing reference for anyone — the project maintainer, AI assistants in fresh sessions, physicist collaborators reading the repo — who needs to pick up Phase C of the Predictive Layer mid-stream. Records current state, what's queued next, the operational norms that keep work moving, and the decisions made so far that aren't recoverable from the scope memo alone. **Update this doc after every shipped step.** This is v4, written 2026-05-26 to bring the document back in sync with reality after sustained drift across sub-PRs 24–56 — see §6 "How this document is maintained" for the discipline.

Location: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` in the repo. Also attached to project knowledge so AI sessions see it automatically.

Companion to `EXPLORER_HANDOFF.md` (explorer build, active), `PREDICTIVE_LAYER_HANDOFF.md` (Phase A, closed), `PREDICTIVE_LAYER_PHASE_B_HANDOFF.md` (Phase B, closed), and `TRACKS_AFTER_PHASE_A.md` (routing doc).

---

## 0. Read this first — state-verification opens every session

**The handoff document is orientation, not ground truth.** Two prior incidents (the v2 "Phase B rebuild may not have deployed" drift note; the v3 → v4 rewrite this document represents) revealed that handoff documents lag the live system whenever an authoring session ships work but doesn't fully update the handoff. The fix is procedural: every new session **must** verify state from authoritative sources before relying on this document.

The authoritative state lives in three places:

1. **Live MCP server.** Call `server_info` first. Note what it reports for `data_version`, `schema_version`, and `tool_count`. Compare to §1 "Where things stand" below — if they differ, the MCP server is lagging the canonical data file (this is the current situation as of 2026-05-26; see §1).
2. **Canonical data file's `_meta` block.** Fetch `data/Map_v34_consolidated.json` via raw CDN, parse `_meta.version` and `_meta._schema`. The `_meta.changelog` array contains a per-sub-PR record of every authoring decision back to v22. This is the single source of truth about what has been shipped.
3. **The repo's `/methodology/` directory.** Lists every spec extension, scope memo, and handoff document in force. If a file is named in this handoff but missing from the repo, flag it; if a file in the repo isn't named here, this handoff is incomplete.

Once verified, proceed with the work. If state has drifted since this handoff was last updated, the session that catches the drift is responsible for either (a) updating this handoff at the end of its work, or (b) flagging the drift to the maintainer with a recommended update.

---

## 1. Where things stand (as of 2026-05-26, after sub-PR 56)

The repository: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`

**Canonical data:** `data/Map_v34_consolidated.json`, internal version `v93`. Counts: 83 nodes, 226 edges, 30 formal-classifications, 484 cells, 22 glossary entries, 19 experimental programs.

**Current schema:** `schema/Map_v19_schema.json`. Adds the optional `bound_direction` field on `quantitative_scale` (lower / upper / two-sided / unspecified). Schema v15.3 / v16 / v17 / v18 retained in `/schema/` for reference.

**Validator:** `scripts/validate.py` enforces Rules 1–36 against v19 schema. All hard errors except Rule 22 and Rule 35 (warning-level only). 4 legacy `constrains`-subtype edges tolerated per `PROJECT_INFRASTRUCTURE.md` §2.

**Live MCP server:** `https://map-of-physics.eddie-8e5.workers.dev` — reports `version: 3.2.0, schema_version: v19, data_version: v66, tool_count: 33, resolves_edges: 0`. **The server is data-lagging.** Schema and tool surface are current to v19 / Phase C tool set (server_info, get_node, get_classification, find_predictions with kindFilter and boundDirectionFilter, find_cells with quantitativeScaleKind / hasQuantitativeScale / boundDirection, rank_by_scale, find_bounds, find_resolvers, find_discriminating_experiments, etc.), but the data the worker serves is from data v66 (post-Step-4.2-sub-PR-23, before any Step 4.4 work). **All 34 resolves edges authored in sub-PRs 46–56 are invisible to MCP queries until the worker is rebuilt against v93 data.** `find_resolvers` and `find_discriminating_experiments` return empty.

**Cumulative quantitative_scale state (across all surfaces):** ~272 entries. Frontier-level (Step 4.1) = 13; Step 4.2 prediction + cell-direct + cell-pred sweeps across 23 sub-PRs ≈ 215+ entries; remaining entries on frontiers and other surfaces from earlier sweeps. By kind (from the live MCP server snapshot at v66, will be larger at v93): dimensionless 61, mass 66, energy_scale 46, coupling 20, time 15, sigma_deviation 10, ratio 9, length 4. By bound_direction: two-sided 101, upper 22, lower 11, absent 97 (entries with non-null uncertainty).

**Resolves edges (Step 4.4):** 34 edges across 10 sub-PRs (46–56), distributed across 11 of the 12 forward-looking experimental-program nodes authored in sub-PR 0.5. Source-program breakdown: hyper-k 4, dune 4, juno 4, rubin-lsst 4, gw-ground-network 3, lisa 3, desi 3, axion-haloscope-network 3, cmb-s4 3, edm-program 2, muon-g-2-continuation 1. **One unattached forward-looking program remains: fcc** — the natural sub-PR 57 lead.

**Phase B state (closed, preserved):** 14 if_real_implies carriers, 23 resolutions, 24 implications. Untouched by Phase C except for the sub-PR 55 carrier-refresh on muon-g-2 (one if_real_implies entry's condition text + condition_citations refreshed against post-2025 literature; structure preserved).

---

## 2. What's been shipped

The single authoritative record of authoring decisions is `data/Map_v34_consolidated.json` → `_meta.changelog` (72 entries through v93). Don't paraphrase it; read the actual changelog entries when a sub-PR's reasoning matters. The summary below is a map, not a replacement.

### Phase C Step-by-step ledger

- **Step 0 — Phase C scope memo.** `methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`. Settles the v18 design questions (the `quantitative_scale` field on five surfaces; the `resolves` edge type; the firewall admissibility test). Authored 2026-05-?? before sub-PR sequence began.

- **Step 0.5 — experimental-program inventory (v41).** 12 forward-looking experimental-program nodes added: dune, hyper-k, juno, gw-ground-network, lisa, cmb-s4, rubin-lsst, desi, axion-haloscope-network, edm-program, muon-g-2-continuation, fcc. Each carries published design-report / proposal citations.

- **Step 4.1 — frontier-level `quantitative_scale` (v42).** 13 entries across 13 of 17 carriers. Established the methodological principle: include any characteristic numerical commitment when a literature value is citable, regardless of whether the carrier's open question lives in-scope or is dispatched elsewhere.

- **Step 4.2 — prediction-level and cell-direct `quantitative_scale` sweep (v43–v65, sub-PRs 1–23).** ~215 entries across 14 FCs. Surfaced ~30 T-conventions for encoding (T7 cells[i].predictions[j] attachment; T10 uncertainty=null for theoretically-exact / falsified-claim / no-explicit-σ; T11 stat ⊕ syst quadrature; T13 direct cells[i].quantitative_scale; T17 squared-dimensional kind encoding (kind=mass + units="eV²"); T19 ordering / discrete-variant best-fit; T20 NME-uncertainty-range conservative bound; T21 magnetic-field-as-deferred-kind; T22 angular-measure-as-deferred-kind; T23 cross-section-as-area; T24 temperature-as-energy-scale via k_B T; T25 dimensionful-quantum-conductance (kind=coupling units=e²/h); T26 rational-fraction encoding; T27 irrational-structural-constant encoding; T29 sigma-deviation cluster). Surfaced the bound_direction encoding gap that prompted v19.

- **v18 → v19 schema bump (v66, sub-PRs 24–29).** Step 0 v19 scope memo (`methodology/PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md`); v19 spec extension (`methodology/MAP_v19_schema_spec_extension.md`, 350 lines); v19 schema JSON (`schema/Map_v19_schema.json`); validator extended to Rules 34–36 (Rule 34: bd forbidden when uncertainty non-null; Rule 35: bd recommended when unc=null, warning level; Rule 36: bd enum). **Retrofit pass** populated `bound_direction` on the 134 uncertainty=null entries across the dataset (97 entries with non-null uncertainty correctly leave bd absent per Rule 34). MCP worker rebuilt to schema v19 with the Phase C tool surface (rank_by_scale, find_resolvers, find_discriminating_experiments, find_bounds, extended find_predictions and find_cells). **This is the deployment state currently live on Cloudflare** (server_info confirms `v66 / v19 / 33 tools`).

- **Step 4.2 continuation post-v19 (v67–v82, sub-PRs 30–45).** Continued cell-direct and cross-FC sweep work. ADE-clique sweep arc (sub-PRs 35–39): McKay-correspondence parallel-integer-set across five FCs. Sub-PR 40 fully-anchored hadronic-states (18/20 qs-admissible). Sub-PR 41 fully-anchored dark-matter-candidates (18/18). Sub-PR 42 cft-bootstrap-exclusion-regions cell-direct first-instance (8/18). Sub-PR 43 first cross-FC parallel-anchor pair (sterile-eV cell-dm-sterile-nu-eV ↔ cell-nu-sterile-eV-LSND-claim-FALSIFIED). Sub-PR 44 neutrino-sector-phenomenology fully-anchored qs-admissible surface (15/18, the 3 unanchored being firewall-§4 SKIPs). Sub-PR 45 FIRST cross-FC edge between dark-matter-candidates and neutrino-sector-phenomenology (`edge-xc-dm-derives-nu-sector-partial`, derives-from + status=partial + cell_refs pinning the two DM-side sterile cells). **Cumulative cross-FC pattern catalog at sub-PR 45 close: 12 bidirectional-anchor-closures + 6 parallel-anchors = 18 cross-FC numerical patterns.**

- **Step 4.4 — `resolves` edges (v83–v93, sub-PRs 46–56).** 34 edges across 10 sub-PRs opening 8 physics subdomains. The major precedents established:

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

  **T-convention register after sub-PR 56:** 33 active conventions (T1–T14, T17–T31, T33; T15 retired, T16 dropped). T30 (discovery-floor) and T33 (precision-measurement two-sided) cover the two semantic sensitivity registers.

  **Cross-FC pattern catalog after sub-PR 56:** 12 bidirectional-anchor-closures + 6 parallel-anchors + 4 discriminating-resolves-clusters + 1 dual-frontier-program + 1 parallel-resolves-edge-cluster.

---

## 3. What's queued next

### Immediate (highest priority)

**MCP worker data refresh.** The deployed worker is serving data v66; canonical is v93. All 34 resolves edges plus 27 versions of cell-direct and carrier-refresh content (sub-PRs 24–56) are invisible to MCP queries. `find_resolvers(cell_id)` and `find_discriminating_experiments(program_a, program_b)` — the flagship AI-first Phase C queries — return empty until this refresh lands. The worker source code in `/mcp/worker_skeleton.js` and `/mcp/build_worker.py` is already on schema v19 with the Phase C tool surface; the rebuild is a data-refresh-only operation, not a code change. Verify by running `server_info` against the redeployed worker and confirming `data_version: v93` (or whatever the current canonical version is when this is done). Cloudflare web editor per `PROJECT_INFRASTRUCTURE.md` §3 — non-developer maintenance, no git CLI or wrangler.

### Phase C closure (then Phase C closes)

**Step 4.4 sub-PR 57 — fcc.** One unattached forward-looking experimental-program node remains: fcc. The most complex Step 4.4 lead — fcc-ee + fcc-hh span multiple science cases (Higgs-coupling precision, electroweak precision, top-quark mass, direct BSM search reach at 100 TeV, possibly precision g-2 auxiliaries). Expected to use mixed-exclusion-flavor sub-PR shape (precedent set by sub-PR 56 rubin-lsst): PPP-populated edges where SM-side competing point predictions exist (Higgs couplings, EW observables); exclusion_only edges where program candidate predictions are parameter-class only (direct BSM searches). Likely closes resolves-edge sensitivity-kind coverage 7/8 → 8/8 via beam-energy or unification-scale anchor. Expected diff shape: 4–7 edges. After sub-PR 57, Step 4.4 is closed.

**Step 4.5 — `quantitative_scale` on `if_real_implies` implications.** Still entirely open. The 24 Phase B implications across 14 carriers do not yet carry `quantitative_scale` on the implication-level surface. Expected subset of implications where the implied structural consequence is quantitative: ~12 (others are structural — "a new FC is forced" rather than "the implied scale is X"). One PR per carrier or small batches. Smallest of the Phase C authoring sweeps; expected one sub-PR.

### Phase C Step N+1

**Consolidated worker rebuild after Phase C closes.** A second rebuild after sub-PR 57 + Step 4.5 ship, to bring the deployed worker fully current. May or may not require code changes depending on whether sub-PR 57 surfaces any new tool surface needs. Verify with `server_info` reporting data version matching the canonical post-sub-PR-57 state.

### Outside Phase C (queued for later, in `TRACKS_AFTER_PHASE_A.md`)

- **Recommended cell-authoring follow-ups** (surfaced by sub-PR 54's skip decisions): author `cell-cosm-Neff` with Planck 2018 N_eff = 2.99 ± 0.17 + BBN concordance value to enable a follow-up `cmb-s4 → cell-cosm-Neff` resolves edge; author `cell-dm-DM-baryon-scattering` with Planck/CMB-lensing upper bounds to enable a follow-up `cmb-s4 → cell-dm-DM-baryon-scattering` resolves edge. Both are small content-authoring decisions.
- **Phase A structurally-excluded cleanup** (surfaced by sub-PRs 40, 42, 43): cells with content="structurally-excluded" but constructive_status MISSING — cft-bootstrap [9]/[11]/[14], hadronic-states [18]/[19], and equivalents elsewhere — need `constructive_status: "forbidden-by-pattern"` + `forced_by` edge authoring per the v16 mechanism. Out of Phase C scope; queued as a Track 5 housekeeping sub-PR after Phase C closes.
- **Tracks 1, 1' — explorer surfacing of v16+ fields** (constructive_status, forced_by, axis_mapping; then v17/v18/v19 fields if_real_implies, quantitative_scale, resolves). Deferred per `TRACKS_AFTER_PHASE_A.md` maintainer call until Phase C closes.
- **Track 5 — housekeeping** (file-collision cleanups, explorer help-overlay drift corrections, v15.3 spec-reference loose ends).
- **Track 4 — open the review pathway** via GitHub Issues templates + EDITORIAL.md + outreach. Phase C completion is the prerequisite. The cumulative cross-FC pattern catalog (18+ patterns) and the discriminating-resolves-cluster + parallel-resolves-edge structures from Step 4.4 are the strongest concrete demonstration targets for outreach.

---

## 4. Working norms

- **Non-developer maintenance.** All deployment via GitHub web UI and Cloudflare web editor. No git CLI, no local dev environment, no `npm` or `wrangler`.
- **Project files are for stable reference material.** This handoff and the scope memos go in project knowledge. Don't attach large schemas, datasets, or worker source to project knowledge — fetch via `web_fetch` or clone the repo via bash in a sandboxed session.
- **CI gates PRs to data + schema.** Methodology docs (this handoff, scope memos, spec extensions) commit directly to `main` without CI gating. Data and schema PRs must pass `scripts/validate.py` (Rules 1–36 since v19 / sub-PR 27).
- **The firewall is binding, and each phase's admissibility test is binding within it.** `META_v21_1_methodology_firewall.md` is the parent. Phase C's operationalization is the three-part scope-memo §4 / v18 spec §4 test (value-is-literature-value + per-program-predictions-are-program-internal + sensitivities-cite-the-experimental-design); v19 adds Rules 34/35/36 on bound_direction. Every authoring step records the §2.5 self-check in the PR / changelog entry.
- **Step 4.1's methodological principle remains binding for cell-direct work.** Include any characteristic numerical commitment when a literature value is citable, regardless of whether the carrier's open question lives in-scope or is dispatched elsewhere. Citations are still required per the §4 test; the principle is about which surfaces qualify for inclusion when the literature is citable, not what counts as citable.
- **Existing content is load-bearing.** Cell content, axis labels, citation text, edge descriptions, status fields, frontier and totality-approach node fields, Phase B's `if_real_implies` entries, Phase C's `quantitative_scale` entries and `resolves` edges are not paraphrased in commits or code. The carrier-refresh sub-PR shape (sub-PR 55 first-use) refreshes specific value+citation fields against post-publication literature while preserving structural fields; this is a documented exception with its own firewall test, not a license for content rewriting.
- **Use physics vocabulary.** User-stated principle. Don't coin presentation terms when the data already names a thing.
- **The MCP source is in the repo.** `/mcp/worker.js`, `/mcp/worker_skeleton.js`, `/mcp/build_worker.py`, and `/mcp/README.md` are version-controlled. Worker rebuilds edit the skeleton, not the bundled artifact. **The deployed worker on Cloudflare currently serves v66 / v19 data — lagging the canonical v93 data file by 27 versions.** Step N+1 rebuilds must diff-check repo source against deployed worker before declaring the rebuild done.

---

## 5. How to start a new chat on this work

Project files auto-attach when a fresh chat opens in the Claude project. To resume:

1. Open a fresh chat in the project.
2. Confirm the assistant can list `/mnt/project/` — should include this handoff, the Phase C scope memos (v18 and v19), `META_v21_1_methodology_firewall.md`, `PROJECT_GOAL_PREDICTIVE_LAYER.md`, `PROJECT_INFRASTRUCTURE.md`, `EXPLORER_HANDOFF.md`, `TRACKS_AFTER_PHASE_A.md`, and other reference docs. Optionally `MAP_v17_schema_spec_extension.md`, `MAP_v18_schema_spec_extension.md`, `MAP_v19_schema_spec_extension.md` (uploadable from raw GitHub when needed).
3. **Run the §0 state-verification ritual.** Call `server_info` on the MCP. Fetch the data file's `_meta` block via raw CDN. Confirm what's actually live before trusting this handoff's "Where things stand" section.
4. Tell the chat which step to resume — e.g., *"Pick up at Step 4.4 sub-PR 57 from PREDICTIVE_LAYER_PHASE_C_HANDOFF.md: fcc resolves edges. Start by listing fcc's existing description and citations on the experimental-program node, then propose the edge set (expected 4–7 edges, mixed-exclusion-flavor per sub-PR 56 precedent), then wait for confirmation before authoring."*
5. The chat fetches code, data, and schema from GitHub via `web_fetch` or by cloning the repo with bash. Raw URLs in §7 below.

The Map of Physics MCP tools are usually deferred behind `tool_search` in fresh chats. If the assistant doesn't see them, ask it to call `tool_search` with keyword `"map of physics"`. **Important:** until the worker is rebuilt against v93 data, MCP queries against `find_resolvers`, `find_discriminating_experiments`, and any tool surfacing fields populated since v66 will return empty or stale results. Use `web_fetch` on the raw data file when authoritative current state matters.

---

## 6. How this document is maintained

**Update this doc after every shipped step. No exceptions.**

The drift that necessitated the v3 → v4 rewrite happened because authoring sessions shipped work (12 sub-PRs of Step 4.2 continuation; the entire v18 → v19 schema bump; 10 sub-PRs of Step 4.4) without proportionally updating this handoff. The deployed system moved from v42 / v18 / 28 tools to v93 / v19 / 33 tools while this document still described v42 / v18.

The discipline that prevents recurrence:

1. **Authoritative state lives in the live system + data file, not this document.** §0 makes this explicit. New sessions verify state before trusting the handoff.
2. **Every shipped sub-PR updates §1 "Where things stand" + §2 "What's been shipped."** Not just version numbers — the cumulative counts (quantitative_scale entries by surface, resolves edges by source program, T-convention register, cross-FC pattern catalog) need refreshing per sub-PR. Skipping this is the failure mode that caused the v3 drift.
3. **§3 "What's queued next" is rewritten when the queue changes.** Sub-PRs that close work items remove them; sub-PRs that surface new follow-ups add them.
4. **Per-sub-PR `_meta.changelog` entries remain the authoritative single-PR record.** This handoff's §2 is a map and orientation, not a replacement for the changelog.
5. **The v3 → v4 rewrite was triggered by the maintainer noticing the drift and a fresh session catching the contradiction between the handoff and live state.** That noticing-and-catching is now first-class — every new session is expected to do it, and the §0 state-verification ritual makes it the first thing that happens.

---

## 7. Quick reference — file locations

- Repo: `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics`
- MCP server: `https://map-of-physics.eddie-8e5.workers.dev` (currently `v66 / v19 / 33 tools` — data-lagging by 27 versions; rebuild queued)
- Live explorer: `https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html`
- This handoff: `/methodology/PREDICTIVE_LAYER_PHASE_C_HANDOFF.md`
- Phase C v18 scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md`
- Phase C v19 scope memo: `/methodology/PREDICTIVE_LAYER_PHASE_C_v19_SCOPE_MEMO.md`
- v18 spec extension: `/methodology/MAP_v18_schema_spec_extension.md`
- v19 spec extension: `/methodology/MAP_v19_schema_spec_extension.md`
- Closed Phase B handoff: `/methodology/PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`
- Closed Phase A handoff: `/methodology/PREDICTIVE_LAYER_HANDOFF.md`
- Routing doc: `/methodology/TRACKS_AFTER_PHASE_A.md`
- Companion explorer handoff: `/methodology/EXPLORER_HANDOFF.md`
- Predictive layer goal: `/methodology/PROJECT_GOAL_PREDICTIVE_LAYER.md`
- Firewall: `/methodology/META_v21_1_methodology_firewall.md`
- v19 schema (current): `/schema/Map_v19_schema.json`
- v18 / v17 / v16 / v15.3 schemas (retained for reference): `/schema/`
- Canonical data: `/data/Map_v34_consolidated.json` (currently v93; 1.5 MB)
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
- v93 data (1.5 MB — exceeds github.com blob fallback size limit, use raw CDN or MCP): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
- MCP worker source: `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker.js`
- MCP worker skeleton (the edit point): `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/mcp/worker_skeleton.js`

---

*End of PREDICTIVE_LAYER_PHASE_C_HANDOFF.md v4. Rewritten 2026-05-26 to bring the document back in sync with reality after sustained drift across sub-PRs 24–56. The previous handoff (v3, 2026-05-?? at Step 4.1 close) understated the project's progress by 27 data versions and one full schema bump (v18 → v19) plus the entire Step 4.4 sweep. Maintained per the discipline in §6: every shipped sub-PR updates §1, §2, and §3. Per-sub-PR detail lives in the `_meta.changelog` array of `data/Map_v34_consolidated.json`, which is the authoritative single-PR record. Update this doc after every shipped step.*
