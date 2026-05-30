# META_v21_1 — methodology firewall and audit of prior findings

**Date:** 2026-05-17
**Type:** Methodology-revision addendum. Not a pattern pass. Not an authoring iteration.
**Scope:** Records the introduction of the firewall principle in `PROJECT_PATTERN_FINDING_METHODOLOGY.md` §2, audits prior findings docs for back-influence violations, and reframes the v21 findings §6 recommendations as descriptive observations.

---

## 1. What prompted this addendum

User-raised concern (verbatim): *"make sure that the pattern finding protocol doesn't affect the structure of the map. the patterns should arise from the map and not the other way around. we should not force patterns. the tool should allow a creative researcher to also search for patterns where others haven't thought of it aside from revealing patterns that surface at face value."*

The concern is that pattern-finding, by recommending what to author next, was creating a feedback loop in which the map's structure conformed to the analytical apparatus's expectations. Subsequent pattern passes would then find patterns commissioned by previous passes — circular epistemics rather than honest organization.

---

## 2. Audit of prior findings documents — what was found

### 2.1 The methodology document itself (pre-revision)

Two clauses in `PROJECT_PATTERN_FINDING_METHODOLOGY.md` formalized the feedback loop:

- **§1 Purpose:** "Findings inform: (i) which authoring steps to prioritize next; ..."
- **§8 step 9 of the operational checklist:** "Recommended-next-steps in the findings doc inform the next authoring iteration."

Both have been removed/rewritten in the 2026-05-17 revision. See `PROJECT_PATTERN_FINDING_METHODOLOGY.md` §2 (the new firewall section) and §10 (the revised checklist).

### 2.2 `MAP_v21_findings.md` §6 "Recommended next steps"

The most recent findings document contained the clearest violation. Entry #10 (dark-matter-candidates) was justified in part with:

> "The cross-edge with compact-astro on PBHs would be a new pattern: phenomenon-FC↔phenomenon-FC with shared content cells, potentially creating the first instance where `paired_cell_refs` (schema candidate #6) becomes load-bearing — strong promotion signal."

This is authoring motivated by wanting to instance a structural pattern and promote a schema candidate. It is precisely the back-influence the firewall prohibits.

Additionally, the entire §6 was framed as a priority-ordered authoring queue, with entries #9, #10, #11 sequenced and pitched. This sequencing was inherited from earlier findings docs (going back at least to v17.1's pattern-pass output), so the violation pattern is not new to v21.

### 2.3 Earlier findings docs (sampled)

The pattern of "Recommended next steps" sections containing priority-ordered authoring queues appears throughout prior findings docs (v15.6, v17.1, v20.1 — the standard pattern passes — and was carried into per-iteration findings docs like v17, v18, v19, v20, v21). The practice originated as a convenience for session-to-session handoff but accumulated into a parallel governance channel for authoring decisions.

These prior recommendations are not being retracted. To the extent prior authoring was independently justifiable on physics-content grounds — and most was — the pattern-recommendation-channel was duplicative rather than directive. The firewall going forward forecloses the channel either way; for the historical record, this addendum flags the practice.

### 2.4 Specific authored entries to spot-check

Several entries' selection was clearly physics-motivated and would have been authored anyway (e.g., hadronic-states as the first phenomenon-FC was independently justified by the project's mid-session direction-check). One — the compact-astrophysical-objects entry itself — was prompted by the prior pass's coverage observation about uncovered sectors; under the firewall this would still be authorable because compact astrophysical objects independently merit organization on physics-content grounds. The author can verify by asking the §2.5 feedback-loop self-check question: "Would I author this entry anyway on physics-content grounds alone?" In this case yes; the firewall is satisfied.

No prior entry has been identified that would fail the self-check. But the practice of writing entries justified by pattern-language ("would close the orphaned pair," "would instance candidate #6") was creating the appearance of feedback even where the underlying decision was physics-first. The firewall removes both the appearance and any actual back-influence.

---

## 3. Reframing `MAP_v21_findings.md` §6 as descriptive observations

The "Recommended next steps" section of `MAP_v21_findings.md` is hereby reframed as the following descriptive observations. These observations may inform a researcher's authoring decisions, but only insofar as they orient attention; the authoring decision itself must be made independently using `PROJECT_GOAL_PHENOMENON_LAYER.md` and the literature.

### Coverage observations (replacing the recommendations)

**O1.** The compact-astrophysical-objects FC (v21) has 4 cross-classification edges into the structural backbone; one of them (`derives-from hadronic-states`, partial) implicitly references the equation-of-state of dense hadronic matter as a structural object. No standalone structural-FC currently organizes equation-of-state classifications. This is a coverage gap; whether to fill it is a separate decision.

**O2.** Sectors currently with no FC of either type: BSM-non-GUT (axions, sterile neutrinos, WIMPs as a population), cosmological observations, dark-energy classification, neutrino-sector phenomenology (mixing, mass hierarchy), inflation-model space, and one or two others depending on how sectors are partitioned. The grid in v20.1 A5 gave the formal breakdown.

**O3.** All explicit phenomenon-FCs to date connect to ≥3 structural-FCs. There is no observed phenomenon↔phenomenon cross-class edge. Whether this reflects (a) the layered architecture's structural prediction (phenomenon-FCs hang from the backbone, not from each other), (b) insufficient sample size, or (c) authoring practice that hasn't yet attempted phen↔phen edges, is undetermined.

### Schema-friction observation

**O4.** Schema candidate count stands at 7. Among them, candidates 3 (`structural_role` on FC nodes) and 6 (`paired_cell_refs` on edges) have been encountered as friction across multiple authoring iterations. The remaining five have been encountered once each. A schema bump is appropriate when authoring friction warrants — independent of any pattern observation about "load-bearing" candidates.

### Loose-end observations

**O5.** Three falsified predictions are recorded: proton decay (tree-level GUT), H-dibaryon (stable), PBH-as-100%-DM in the LIGO mass window. All three are BSM-overreach predictions — settled-physics predictions definitionally don't get falsified. This is a structural fact about which classes of prediction enter the falsified bucket, not a recommendation about what to do about them.

**O6.** The doubly-orphaned ADE clique (4 of 5 ADE-related nodes with no cross-classification edges into the rest of the map) persists from v17.1. This is a recorded structural fact; whether it warrants attention is a separate decision.

### Researcher's own next-step decision

The author of the next entry should consult `PROJECT_GOAL_PHENOMENON_LAYER.md` and the literature, decide what physics content next merits organizing, and proceed. The observations above may inform attention but do not direct the choice.

---

## 4. The standard-pass / exploratory-probe distinction

The methodology revision also adds an explicit second mode of pattern-finding (§3 of the revised methodology doc):

- **Standard pattern pass** — the prescribed apparatus (currently 8 analyses), run periodically, surfaces face-value patterns from systematic sweeps.
- **Exploratory probe** — researcher-driven, hypothesis-led queries using the same data and infrastructure, surfaces patterns the prescribed apparatus would not look for.

Both are first-class. Both are subject to the firewall. The methodology should not privilege the prescribed apparatus over researcher curiosity. The most interesting structural observations often come from probes precisely because they look in places the systematic sweep would not.

Examples of probe-style questions are listed in §3.2 of the revised methodology. The bar for committing a probe to record (a `PROBE_*.md` file or inclusion in the next standard pass's findings) is the same finding bar as for the standard pass.

---

## 5. What changes operationally going forward

- Findings documents (`MAP_vN_findings.md` per-iteration and `MAP_vN_1_pattern_analysis_vN.md` per-pass) will not contain "Recommended next steps" sections. They will contain descriptive observation sections using the frames in §2.2 of the revised methodology.
- Authoring iterations begin by consulting `PROJECT_GOAL_PHENOMENON_LAYER.md` and the literature, not the most recent findings doc.
- The §2.5 feedback-loop self-check is run mentally at the start of each authoring iteration. If a prior pattern observation is in working memory, the question is asked: "Would I author this anyway on physics-content grounds alone?"
- Exploratory probes are encouraged. They may be recorded as `PROBE_yyyymmdd_short_name.md` if they yield findings; otherwise they leave no artifact.
- Schema bumps are triggered by repeated authoring friction, not by candidate-count thresholds or pattern advocacy. The 8-10 candidate-count guideline becomes coarse signal, not mandate.

---

## 6. What does not change

- Prior findings remain valid as descriptions of the map's structure at the time they were observed.
- The schema, the cumulative dataset, and the authored FC entries are unaffected. This is a methodology-only revision.
- The current 8-analysis apparatus is unchanged; only its outputs are reframed (descriptive observation vs prescriptive recommendation).
- The two-layer architecture (`PROJECT_GOAL_PHENOMENON_LAYER.md`) is unaffected and remains the orientation document for authoring.
- Cumulative dataset metrics (58 nodes / 141 edges / 17 FCs / 0 validation errors against v16 schema) are unchanged.

---

## 7. Files affected

- **REVISED:** `PROJECT_PATTERN_FINDING_METHODOLOGY.md` — added §2 firewall, §3 exploratory-probe mode, §5.4 historical record of this revision; revised §1, §6, §7, §10; removed prescriptive language.
- **NEW:** this addendum `META_v21_1_methodology_firewall.md`.
- **UNCHANGED but reframed in §3 above:** `MAP_v21_findings.md` §6 recommendations. The file itself is not edited; the reframing in §3 of this addendum is the canonical replacement going forward.

---

## 8. The content / organization distinction — what the firewall does and does not bind

**This section was added 2026-05-29 in P0' sub-PR.** A second-order failure mode, distinct from the back-influence failure §2 names, surfaced during the Mendeleev-positioning workstream: a too-strict reading of the firewall as also prohibiting configuration-time emergence of patterns and gaps from substrate organization. This section makes the distinction explicit, so the firewall as a whole binds what it should and does not foreclose what it should not.

**The firewall binds content authoring.** §2 names the back-influence failure mode and the §2.5 self-check that detects it. Both apply to *authoring decisions* — what cells, edges, classifications, predictions, or other content enters the substrate. The discipline is: authoring decisions are made from physics content independently, not driven by pattern-finding outputs. The §2.5 self-check ("would I author this anyway on physics-content grounds alone?") is the operational test. None of this changes.

**The firewall does not bind configuration-time emergence.** When a physicist (or the substrate's tooling) constructs a configuration over the substrate's literature-anchored content — single-classification, pairwise, or multi-face — and a pattern or a gap appears as a consequence of that configuration meeting the content, the appearance is *substrate output*, not substrate content. No authoring decision is being made. The firewall's §2.5 self-check does not apply, because there is no authoring choice in scope. The substrate's tooling that performs this surfacing (the configuration builder, the comparison panel, the open-frontier view's structural-neighborhood navigation, the existing `find_forced_cells` / `find_cross_classification` / `find_structurally_excluded` queries, and the analogous query layer added by E0 / M0 work) is performing the substrate's central function, not violating the firewall.

**Why this distinction matters.** The project's stated positioning is Mendeleev-style. Mendeleev's central move was to organize literature-anchored empirical data (atomic weights, valences, chemical behavior) along chosen axes; the empty cells and the periodicity emerged from the organization itself. No prior chemistry literature predicted gallium at position 31. A periodic-table-of-physics project that prohibits configuration-time emergence prohibits its own central function. The firewall as originally stated in §1–§7 was correct in what it bound (back-influence on authoring); it left the distinction between content authoring and substrate-output emergence implicit. This section makes the distinction explicit so that the firewall continues to bind back-influence on authoring (no relaxation of the §2 principle) while the substrate's tooling can surface patterns and gaps at configuration time without violating the firewall.

**Operational implications.**

- The `conjectured-by-pattern` schema field, currently zero-populated at the cell level, is correctly read as a category that populates at configuration time, not at content-authoring time. The substrate's tooling generates `conjectured-by-pattern` cell outputs when configurations are constructed and gaps appear. Pre-authoring `conjectured-by-pattern` cells with specific content would be content-authoring driven by pattern-finding — a §2 firewall violation. The current zero-count is correct.

- Surface-text claims about substrate outputs (patterns surfaced, gaps identified, configurations constructed) do not need to be backed by prior literature endorsement of the specific pattern or gap. They need to be backed by the substrate's organization being correctly constructed and its content being literature-anchored. The outputs follow.

- The literature-anchoring principle in `MENDELEEV_POSITIONING_HANDOFF.md` §7, the bullet on "the literature-anchoring principle binds content authoring, not configuration-time emergence," is the parallel correction at the handoff layer. The handoff's corrected bullet and this §8 together establish the operational discipline.

**Cross-references.** `MENDELEEV_POSITIONING_HANDOFF.md` §7 (corrected literature-anchoring principle bullet); `DRIFT_PATTERN_REGISTER.md` Entry 1 (content drift: substrate outputs vs substrate inputs) for the conversational trajectory that surfaced this distinction.

*End of META_v21_1_methodology_firewall.md*
