# Project methodology — pattern-finding passes

**Status:** Project-level methodology reference. Not version-incremented (edited in place when methodology evolves).
**Established:** 2026-05-16, after the v20 → v20.1 transition surfaced that the v17.1 analytical apparatus was no longer aligned with the dataset's two-layer architecture.
**Revised:** 2026-05-17, to add the firewall principle (§2) and the standard-pass / exploratory-probe distinction (§3) after audit revealed that prior findings documents had let pattern observations become authoring recommendations.
**Related documents:** `PROJECT_GOAL.md`, `PROJECT_GOAL_PHENOMENON_LAYER.md`.

---

## 1. Purpose

Pattern-finding passes are periodic AI-driven structural analyses of the cumulative dataset. Their purpose is to **surface non-obvious observations** about the map's organization — patterns across FCs, edges, cells, predictions, concept tags, programs, and any future layers — that no single authoring step would reveal.

Pattern-finding passes are **distinct from authoring iterations and downstream of them**. Authoring adds content driven by physics; pattern-finding analyzes accumulated content. The direction of influence is one-way: **authoring → accumulation → pattern observation**. Pattern observation does NOT feed back into authoring priorities (see §2).

The legitimate outputs of a pattern-finding pass are:
- Descriptive observations about the map's current structure.
- Identifications of where the map is dense vs sparse (without prescription that the sparse areas must be filled).
- Sanity-check findings (internal inconsistencies, schema-fit issues).
- Notes on which schema-expressivity limits authoring has been bumping into (descriptive accumulation, not advocacy).

The illegitimate outputs are:
- Priority-ordered authoring queues.
- Recommendations that a new entry be authored to instance a structural pattern, fill a structural slot, or promote a schema candidate.
- Any framing in which a future authoring decision is justified by "this would produce pattern X."

---

## 2. The firewall — pattern-finding does not shape authoring

**The principle:** patterns arise from the map, not the other way around. The map is built by physics-content decisions. Pattern-finding observes what the resulting map looks like. The methodology must not introduce a feedback loop in which the map's structure conforms to the analytical apparatus's expectations.

**Why this matters:** if authoring chases patterns the pattern-finder identifies — filling orphaned structural slots, instancing schema candidates, producing nicer alignment scores — then the map becomes a record of the pattern-finder's priors rather than an honest organization of physics. Future pattern passes would then find patterns commissioned by previous passes. The map drifts away from its referent.

**The firewall in practice:**

### 2.1 Authoring justification is physics-content-first

A new FC entry is justified by what it organizes in the physical world (for phenomenon-FCs) or in formal mathematics (for structural-FCs). It is **never** justified by:
- "This would close an orphaned structural-FC pair."
- "This would instance schema candidate N."
- "This would create the first phenomenon↔phenomenon edge."
- "This would fill sector Z which is currently uncovered."
- "This would produce a multi-edge pattern."

The literal test: if the entry's only motivation is structural (would produce some pattern), it should not be authored. If the literature on the topic supports organizing it as a Periodic Table candidate, it can be authored — regardless of whether it happens to produce any pattern.

### 2.2 Pattern findings are observations, not recommendations

Findings documents (`MAP_vN_1_pattern_analysis_vN.md`) describe what patterns surfaced. They do not contain "Recommended next steps." Where prior practice listed a priority-ordered authoring queue, the firewall replaces it with:

- **Coverage observations** — "Sector X is currently uncovered by both structural and phenomenon FCs." (descriptive)
- **Density observations** — "Concept-tag overlap is high in cluster A but sparse in cluster B." (descriptive)
- **Schema-friction observations** — "Authoring iterations N–M repeatedly worked around expressivity limit Q." (descriptive, accumulated across iterations)
- **Loose-end observations** — "Prediction P is unconfirmed and has been so since iteration N." (descriptive)

A researcher reading these observations may decide to author an entry that happens to address them. That's fine — the decision is made independently, on physics-content grounds, using PROJECT_GOAL and PROJECT_GOAL_PHENOMENON_LAYER as the orientation. The pattern document is not the orientation.

### 2.3 Authoring is conducted blind to recent pattern findings

When deciding what to author next, consult:
- `PROJECT_GOAL.md`
- `PROJECT_GOAL_PHENOMENON_LAYER.md` — which phenomena need organizing?
- The literature on the candidate topic.
- The schema (to know what can be expressed).

Do **not** consult the most recent pattern-finding pass for authoring direction. Pattern-finding informs whether the methodology is working and surfaces facts about the map; it does not dictate the next entry.

This is an honor-system principle, not a procedural one. Pattern observations are inevitably in working memory. The discipline is to ensure the *justification* for any authoring decision is physics-first, even when pattern observations are aware.

### 2.4 Schema bumps are triggered by authoring friction, not pattern advocacy

A schema candidate exists when authoring has hit the same expressivity limit multiple times in honest work. A schema bump is triggered by accumulated frustration during authoring, not by a pattern pass declaring "candidate N is now load-bearing — promote it."

The candidate-count threshold (8-10) is a coarse signal, not a mandate. A single candidate can justify a bump if it's blocking; six candidates can wait if none are blocking.

### 2.5 The feedback-loop self-check

After every pattern pass, the next authoring iteration should answer one question internally before starting: **"Did pattern observations in the previous pass influence this entry's selection or design? If yes, would I author this entry anyway on physics-content grounds alone?"** If the honest answer to the second question is no, the entry is not authored.

---

## 3. Standard pattern pass vs exploratory probe

Pattern-finding is not exhausted by the prescribed apparatus. Two modes operate over the same data and query infrastructure:

### 3.1 Standard pattern pass

Periodic, prescribed apparatus (currently §5's eight analyses), run on the accumulated dataset. Designed to surface patterns that would be evident from a systematic sweep — coverage gaps, distribution skews, clustering, etc. These are the patterns that "surface at face value" given the right partitioning.

**When to run:** when the dataset has grown enough to plausibly contain new structure (rule of thumb: 3-5 authoring iterations since last pass), OR when a schema bump or new data layer triggers methodology update.

**Output:** `MAP_vN_1_pattern_analysis_vN.md` with descriptive findings.

### 3.2 Exploratory probe

Ad-hoc, researcher-driven, hypothesis-led queries using the same query infrastructure (MCP server, `map_query` script, raw dataset). Designed to look for patterns the prescribed apparatus would not surface — patterns specific to a researcher's intuition about where to look.

Examples of exploratory probe questions:
- "Do all `derives-from` edges between phenomenon-FCs and structural-FCs share a common concept tag, or only some?"
- "What's the shortest path in the graph between a falsified prediction and the structural-FC that hosts the program claiming it?"
- "Are there FCs whose cells have predictions of all five closure statuses? What would those FCs share?"
- "If I project the concept-tag space onto a 2D embedding (informal — say co-occurrence frequency), do programs cluster?"
- "Where in the map do `aspired` and `partial+targeted_by` statuses co-occur in a single edge-target?"

These questions are not part of the prescribed apparatus. They will not appear in `MAP_vN_1_pattern_analysis_vN.md` unless they yield a finding worth recording. They are first-class pattern-finding — often where the most interesting structural observations come from.

**When to run:** any time a researcher has a question. No cadence.

**Output:** if a finding emerges, it is recorded — either as a standalone probe note (`PROBE_*.md`) or folded into the next pattern pass's findings doc as supporting evidence. If no finding emerges, no output is required; the probe was a query, not a deliverable.

### 3.3 The two modes share infrastructure, not findings

Both modes use the same dataset, schema, MCP server, and query scripts. They produce findings under the same finding bar (§7). The firewall (§2) applies equally to both — observations from either mode do not direct authoring.

The distinction is purely about who frames the question:
- **Standard pass:** the prescribed apparatus frames the questions.
- **Exploratory probe:** a researcher frames the question.

A mature project will run both: standard passes periodically for systematic sweeps, exploratory probes continuously as curiosity directs.

---

## 4. The layer-conditional principle

**Analyses must be calibrated to the dataset's current data-layer structure.** When new layers emerge (concept tags in v16.1, phenomenon-FCs in v19, partial+targeted_by in v18.1, multi-edge pairs in v15.7), the analyses that interpret them must be designed to use those layers correctly — not just to mechanically extend existing analyses.

The clearest example: concept-edge correlation analysis from v17.1 measured Jaccard similarity across all FC pairs. After v19 introduced phenomenon-FCs, "shared concepts" between an FC pair has three distinct meanings depending on FC-type-of-participants:
- struct ↔ struct: shared mathematical / structural vocabulary
- struct ↔ phen: shared connection-vocabulary (concepts that bridge the layers)
- phen ↔ phen: shared physical content

Collapsing these into one Jaccard score loses information. The analysis must partition by FC-type-pair to remain meaningful.

**General rule:** when authoring introduces a new layer or distinction, examine the existing pattern-finding analyses and explicitly decide which need partitioning, which need new variants, and which become inapplicable to the new layer. Record the decisions in this document.

**Direction of influence:** the map's evolution drives methodology updates. Methodology updates do not drive the map's evolution. The layer-conditional principle is the formal expression of map → methodology direction.

---

## 5. Historical methodology evolution

### 5.1 v15.6 — first pattern-finding pass (5 findings)

**Dataset state:** 52 nodes / 110 edges / 13 cross-class edges / 31 predictions / 0 concept tags / all FCs structural.

**Analyses:**
- A1: Programs targeting what FCs (program-FC incidence)
- A2: Structurally-expected-but-empty FCs (partial-closure analysis)
- A3: Patterns across layers (cell-content × FC-cluster × program-targeting)
- A4: Where unifications likely land (status distributions per FC)
- A5: Empirical state (prediction-status distributions)

**Methodology generated:** the cross-FC perspective (analyses that joined data across the FC, edge, cell, prediction, and program layers).

### 5.2 v17.1 — second pattern-finding pass (6 findings)

**Dataset state:** 54 nodes / 122 edges / 33 cross-class edges / 45 predictions / 61 concept tags / all FCs structural.

**Analyses added/changed:**
- A1, A4, A5: re-run of v15.6 analyses with v17 deltas
- A6 (NEW): Concept-tag cluster analysis — first use of v16.1 tags
- A7 (NEW): Concept-edge correlation — does concept overlap predict edges?
- A8 (NEW): Central-axis sub-graph connectivity analysis
- A9 (NEW): Shadow-edge re-scan with co-targeting programs
- A10 (NEW): Per-FC concept-edge alignment scores

**Methodology generated:** the concept-tag analytical layer was new (v16.1 had introduced it). Per-FC quantitative diagnostics (alignment scores) were new. Multi-layer cluster analysis matured.

### 5.3 v20.1 — third pattern-finding pass (6 findings)

**Dataset state:** 57 nodes / 137 edges / 48 cross-class edges / 69 predictions / ~88 concept tags / **4 phenomenon-FCs + 12 structural-FCs / 6 multi-edge pairs / 4 constrains edges**.

**The new layer requiring methodology update:** phenomenon-FCs (introduced v19). All concept and edge analyses now require partitioning by FC-type-pair (struct↔struct, struct↔phen, phen↔phen) where they previously assumed homogeneous FC content.

### 5.4 2026-05-17 — firewall revision (no pattern pass; methodology-only update)

After audit found that prior findings documents (including the immediately-preceding `MAP_v21_findings.md` §6) contained pattern-driven authoring recommendations — most starkly "Phase 2 entry #10 ... would create the first instance where `paired_cell_refs` becomes load-bearing — strong promotion signal" — the firewall principle was added as §2 and the standard-vs-exploratory distinction as §3.

**Concrete changes:**
- §1 Purpose revised: removed "Findings inform which authoring steps to prioritize next" and analogous claims.
- §2 firewall added: makes the no-feedback-loop principle explicit and operational.
- §3 exploratory probe added: legitimizes researcher-driven queries as equal-status pattern-finding.
- §10 operational checklist revised: removed "Recommended-next-steps in the findings doc inform the next authoring iteration."
- A meta-addendum (`META_v21_1_methodology_firewall.md`) was authored to reframe the v21 findings recommendations as descriptive observations and to flag the pattern of prior-document violations for the historical record.

This revision does not retract prior findings. The patterns observed were real. The error was prescribing authoring on the basis of those patterns.

---

## 6. The current analytical apparatus (v20.1, unchanged in this revision)

Eight analyses, each described below with rationale and method. Each surfaces *observations*; what to do with the observations is decided independently per §2.

### A1 — Layer-conditional concept-edge correlation

**Method:** Partition FC pairs by FC-type-of-participants (struct↔struct, struct↔phen, phen↔phen). Within each partition, compute mean Jaccard for pairs with and without cross-classification edges. Report ratio.

**Why partition:** the v17.1 ratio of 7.6× was a single number across heterogeneous pairs; the v20 dataset has 3 distinct FC-type-pair classes that should be compared separately.

**Finding bar:** ratios differing substantially across partitions (e.g., struct↔struct ratio 10× but struct↔phen ratio 2×) would indicate that concept-tag overlap means structurally-different things at the two layers.

### A2 — Structural backbone coverage by phenomenon-FCs

**Method:** For each structural-FC, list which phenomenon-FCs (if any) connect to it via cross-classification edges. Identify "orphaned" structural-FCs — those with no phenomenon-FC partner yet.

**Output frame:** descriptive list of orphans. This is a coverage observation per §2.2. It does NOT generate authoring recommendations. A researcher may notice an orphan and, on physics-content grounds, decide it merits a phenomenon-FC partner — but the decision is downstream and independent.

### A3 — Phenomenon-FC connection topology

**Method:** For each phenomenon-FC, characterize its edge structure: how many edges, to which structural-FCs, with which subtypes/statuses. Look for patterns.

**Expected pattern from v19 §7.2:** phenomenon-FCs hang from structural backbone, with sparse direct edges among themselves. Observe whether this holds.

**Output frame:** quantitative confirmation or deviation. Descriptive.

### A4 — Cell-density and cell-to-cell-pairing coverage

**Method:** Count cells per FC. For each cross-classification edge (especially categorically-equivalent and bijection types), identify implied cell-to-cell mappings via narrative descriptions. Quantify how many edges have implied pairings the current schema can't express.

**Output frame:** schema-friction observation. The accumulated friction across iterations is what eventually argues for a schema bump (§2.4). A single pass does not advocate.

### A5 — Sector coverage matrix

**Method:** Define ~10 physics sectors. For each, list which FCs serve it and whether the coverage is structural-only, phenomenon-only, both, or neither.

**Output frame:** the grid is a coverage observation per §2.2. Sparse sectors are noted, not commissioned.

### A6 — Multi-edge pair characterization

**Method:** Catalog the multi-edge FC pairs. For each, record: FC-types-of-participants, subtype combinations, status combinations, programs involved.

**Output frame:** structural observation about which FC-type-pairs attract multi-edges, with explanation.

### A7 — `constrains` role-specific pattern formalization

**Method:** Analyze the existing `constrains` edges. Identify what makes their targets share a structural role. Try to operationalize: given an existing FC, can the role-definition predict whether it would attract `constrains` edges?

**Output frame:** descriptive role-definition. If the role-definition is operationalizable, it becomes a structural fact about the map worth recording.

### A8 — Re-run of v17.1 analyses on the structural-FC sub-layer alone

**Method:** Restrict the analyses (concept-edge correlation, central-axis cluster connectivity, shadow-edge re-scan, per-FC alignment) to only the structural-FCs. Compare to v17.1 baseline.

**Output frame:** comparison table with deltas. Descriptive.

---

## 7. The "finding" bar

Not every observation from the analyses is a "finding." The bar:

1. **Non-obvious** — wouldn't be apparent from any single authoring step or from reading the dataset linearly.
2. **Structural** — about the map's organization, not just incidental.
3. **Informative** — clarifies a structural fact about physics revealed by the map's organization. (Note: the previous version of this bar included "actionable" — i.e., "directly informs next authoring decisions." This criterion has been removed under the firewall; findings inform understanding, not authoring decisions.)
4. **Distinguishable from noise** — based on multiple data points, not single anecdotes.

Analyses can produce findings, supporting evidence for prior findings, or background data. Only findings get distilled into the summary section of each pattern-pass document.

Historical pattern-pass yields:
- v15.6: 5 findings from 5 analyses
- v17.1: 6 findings from 8 analyses
- v20.1: 6 findings from 8 analyses

A pattern-pass yielding 0-1 findings would be a signal that the dataset has matured to the point that AI-driven structural analysis is producing diminishing returns — at which point the pass cadence should slow.

---

## 8. When to update this methodology document

Trigger an update when:

- A new data layer appears that the existing analyses can't interpret cleanly (e.g., phenomenon-FCs in v19 triggered the v20.1 methodology revision).
- An analysis type becomes inapplicable to a layer.
- A finding becomes structurally-established and analyses can be retired.
- A new analytical principle is introduced (e.g., the firewall in 2026-05-17).
- The finding-bar definition needs adjustment.
- An audit reveals that the methodology has been allowing feedback loops (as in the 2026-05-17 revision).

**Updates happen by direct edit, not version-increment.** This document is a living methodology reference, not a static archive. The historical methodology evolution section (§5) is the place to record what changed and why.

---

## 9. The relationship to other project documents

- **`PROJECT_GOAL.md`** — original project goal statement.
- **`PROJECT_GOAL_PHENOMENON_LAYER.md`** — the two-layer architecture and destination. This is the orientation document for authoring decisions, not the pattern-finding document.
- **`PROJECT_PATTERN_FINDING_METHODOLOGY.md`** (this document) — methodology for pattern-finding passes and exploratory probes.
- **Each `MAP_vN_1_pattern_analysis_vN.md`** — specific findings from a given standard pass. Methodology evolves as recorded here; specific findings are recorded in those files.
- **`PROBE_*.md`** (when authored) — records of exploratory probes that yielded findings.

Each pattern-finding pass is conducted by reading this document, applying the current analytical apparatus, surfacing findings, and updating this document if the methodology needed to evolve to accommodate new data. The findings are observations, not directives (§2).

---

## 10. Operational checklist — standard pattern pass

1. Read `PROJECT_GOAL_PHENOMENON_LAYER.md` to refresh the project's destination orientation.
2. Read this document to refresh methodology.
3. Inspect the current dataset state — what's new since the last pass?
4. **Determine whether methodology updates are needed before analyses run.** If new layers / distinctions have appeared, plan methodology updates first, then update this document, then run analyses.
5. Run the analytical apparatus (currently §6's eight analyses).
6. Filter results per the finding bar (§7).
7. Write `MAP_vN_1_pattern_analysis_vN.md` with the findings and supporting analyses. **Do not include a "Recommended next steps" section.** Where prior practice included one, use the descriptive observation frames in §2.2 instead (coverage observations, density observations, schema-friction observations, loose-end observations).
8. If methodology updates were needed in step 4, record them in §5.x (historical methodology evolution) before closing the pass.

The next authoring iteration is selected independently by the researcher consulting `PROJECT_GOAL_PHENOMENON_LAYER.md` and the literature, not this findings doc (§2.3).

---

## 11. Operational checklist — exploratory probe

Exploratory probes are intentionally lightweight; the apparatus should not become bureaucratic.

1. Frame the question. One sentence is fine.
2. Decide what query infrastructure answers it (MCP server tools, `map_query` script, raw JSON inspection, ad-hoc code).
3. Run the query.
4. Look at the result. Note any observations that meet the finding bar (§7).
5. If a finding emerges, record it: either as a standalone `PROBE_yyyymmdd_short_name.md` or noted for inclusion in the next standard pass's findings doc. If no finding, no record required.

The firewall (§2) applies. A probe that surfaces "sector X is uncovered" produces an observation, not a directive to author entry X.

Exploratory probes are encouraged. They are often where the most interesting structural observations come from — precisely because they look in places the prescribed apparatus would not.

---

*End of PROJECT_PATTERN_FINDING_METHODOLOGY.md*
