# PROJECT_GOAL_PREDICTIVE_LAYER.md — Making the Coverage Force Predictions

**Document type:** Load-bearing project goal file. Third in the sequence after `PROJECT_GOAL.md` (structural goal) and `PROJECT_GOAL_PHENOMENON_LAYER.md` (coverage goal). Establishes the direction change that follows v34 MVP-completion.
**Status:** v1. Authored 2026-05-20, downstream from the post-v34 conversation about what the assembled map should do *next*.
**Working name:** *the predictive layer.* The phrase names the layer of structural commitments that make the map's existing coverage **force visible predictions** rather than passively catalogue what physics already knows.

---

## 0. What this document is

This is the load-bearing goal file for the **Predictive Layer** of the Map of Physics. It establishes the direction change that follows v34 MVP-completion: the phenomenon layer was about *covering* the field; the predictive layer is about making the coverage *force predictions*. The shift is real — v34 was the precondition for it, not the endpoint of the project.

This file sits beside `PROJECT_GOAL.md` (which defines the structural goal — formal classifications, type discipline) and `PROJECT_GOAL_PHENOMENON_LAYER.md` (which defines the coverage goal — phenomena and objects as cells). Nothing in this file overrides those documents. The predictive layer is built **on top of** the structural and phenomenon layers; both remain authoritative for their respective concerns.

This file is the document the project returns to when scope-creep, framing temptation, or the comfort of well-organized cartography surface. If a proposed move conflicts with this file, the move is on probation, not the file. Revision requires an explicit changelog and rationale in a §0.1 added below.

The project succeeds when an AI working with a physicist can run a small set of queries against the map and surface *positively required* empty cells, *structurally implied* consequences of live anomalies, and *experimentally discriminating* tests for contested or unfilled positions — none of which are derivable from the v34 data structure as it stands today. The project fails if it drifts toward fake Mendeleev cells (predictions the structure doesn't actually force), toward cellifying architectures the map cannot honestly cellify, or toward losing the distinction between curatorial axes and natural-kind axes that `PROJECT_GOAL.md` §4 establishes.

---

## 1. The direction change, stated plainly

The Map of Physics at v34 is **MVP-complete for coverage**. Every §3 / §5 / §6 target area from `PROJECT_GOAL_PHENOMENON_LAYER.md` is closed. 30 formal classifications, 71 nodes, 186 edges, 484 cells, 209 predictions, 17 falsifications. The field is broadly represented; the type discipline holds; the cross-classification edge family makes inter-layer structure first-class.

What the v34 map does well: it tells you where you stand. Given a problem, the map locates it structurally, names what kind of openness it has, lists which programs target it, and points at which formal classifications bear on it.

What the v34 map does not yet do: **force predictions the structure already implies but does not surface**. The Mendeleev contribution — empty cells with positive properties forced by their position, quantitative bets the structure makes, anomalies typed by what new structure they would require if real, experiments tied to the specific cells they would discriminate — is absent. The data is rich enough to support most of this; the schema and tool surface are not.

The thesis of this layer is that the map's existing coverage already encodes more predictive content than its current schema exposes. The work of the Predictive Layer is making that content surfaceable. The assembly was Phase 1's contribution; **the forcing is Phase 2's contribution.**

This is a real direction change. v34's MVP-completion declaration was the precondition for it, not the endpoint of the project.

---

## 2. What Mendeleev actually did (the moves the layer adopts)

The periodic table's predictive force came from five distinct moves, four of which the Predictive Layer adopts directly and one of which it does not. Being precise about each is load-bearing.

**Move 1 — Typed empty slots.** Mendeleev didn't list unknown elements; he named them (eka-aluminium, eka-silicon, eka-boron), positioned them, and constrained their properties from position. The slots were *positively predicted* to exist, not merely absent.

**Move 2 — Quantitative predictions for the gaps.** Eka-silicon was forecast at atomic weight ~72, density ~5.5, oxide formula EsO₂, specific volume ~13. Germanium arrived at 72.6, 5.32, GeO₂, 13.2. Categorical placement plus *numerical* commitment.

**Move 3 — Physically meaningful axes.** Group ↔ valence-electron count; period ↔ shell number. The axes tracked something the world was doing, not categories the cartographer found convenient. (`PROJECT_GOAL.md` §4 — the load-bearing type-discipline rule — is the analog the Map of Physics already enforces.)

**Move 4 — Anomaly as structural pointer.** The Te/I weight inversion forced recognition that atomic number, not weight, was the deeper organizing principle. Anomalies were not dismissed; they pointed at hidden axes.

**Move 5 — Closure constraints.** Once shell-filling patterns (2, 8, 18, 32) were understood, the table had to terminate or repeat in particular ways. Noble gases existed as a column before all were discovered, because closure forced them.

The Predictive Layer adopts Moves 1, 2, 4, and 5 as its five mechanisms (numbered below as #1, #2, #3, #5, #6 for traceability to the originating conversation). Move 3 is already enforced by `PROJECT_GOAL.md` §4 and needs no new mechanism.

A sixth proposed mechanism — **cellification of architectures (#4)** — is explicitly **out of scope** for this layer. See §4 below.

---

## 3. The five mechanisms

Each mechanism is described with the schema work it requires, the tool work it implies, and the authoring lift it carries.

### 3.1 Mechanism #5 — Predicted-but-unconstructed status

**What it does.** Distinguishes a cell's *constructive* status (does this cell exist as a realized instance, or is it conjectured-by-pattern, or forbidden-by-pattern, or indeterminate?) from its empirical status (is its prediction confirmed, falsified, in tension, untested?). The current `prediction_status` enum confuses these.

**Schema work.** New field on cells: `constructive_status` enum with values:
- `realized` — concrete instance exists in nature or in well-defined construction.
- `conjectured-by-pattern` — required to exist by a cross-classification or closure constraint; not yet realized.
- `forbidden-by-pattern` — excluded by a cross-classification or closure constraint.
- `indeterminate` — pattern does not force a verdict either way.

When `conjectured-by-pattern` or `forbidden-by-pattern` is set, the cell carries a typed link (`forced_by`) to the edge or closure constraint that produced the conjecture. This is the Mendeleev-cell move made first-class.

**Tool work.** Extend `find_cells` with `constructive_status` filter. Add `get_forcing_constraint(cell_id)` for traversing back to the forcing edge.

**Authoring lift.** Light-to-moderate. The SM's structurally-excluded cells already do `forbidden-by-pattern` informally; formalize and propagate. The ADE clique's bijection edges already imply `conjectured-by-pattern` cells; surface them. Most of the ~484 existing cells get `realized` as default.

### 3.2 Mechanism #2 — Forced cells from cross-classification edges

**What it does.** When two classifications are linked by a structure-preserving edge (`bijection`, `categorically-equivalent`, certain `derives-from` cases), every cell on one side has a counterpart on the other. The Predictive Layer makes the counterpart computable. If the counterpart cell does not exist on the target side, the structure has produced a positive prediction: that cell *must* exist, with axis-values determined by the mapping.

**Schema work.** Bijection-typed and categorically-equivalent edges (and the structure-preserving subset of `derives-from`) gain an explicit `axis_mapping` field:

```
axis_mapping: [
  { from_axis: "<axis name on source>",
    to_axis:   "<axis name on target>",
    correspondence: "identity" | "<named transformation>",
    description: "<one-line gloss>" }
]
```

Design choice locked in: **axis mappings are declared explicitly on the edge, not computed dynamically.** Computed correspondences would require an axis-equivalence substrate the schema doesn't have, and "the bijection is established" is a substantive physics claim that the edge author is in a better position to record than a query engine is to infer.

**Tool work.** New tool: `find_forced_cells(classification_id)` returns the cells required on this classification by all incoming structure-preserving edges, marked by whether they already exist on this side (and as what `constructive_status`) or whether they are new positive predictions.

**Authoring lift.** Moderate. The ADE clique alone — five classifications connected by McKay / Brieskorn / Gabriel / CIZ / Du Val — implies a substantial set of axis mappings. Decorating those edges with explicit mappings is one focused authoring sweep, then the tool runs against them mechanically.

This is the highest-leverage mechanism per unit work. The data is already there; the schema decoration unlocks it.

### 3.3 Mechanism #3 — Anomaly as structural signal

**What it does.** When an anomaly or unresolved empirical signal is recorded, the map captures what new structure would be required if the signal turns out to be real. This makes the bet visible: "if muon g-2 persists at 4-5σ, then the following classifications need new cells / the following edges become forced / the following axes need extension."

**Schema work.** New field on open-frontier and totality-approach nodes (where anomalies live in the current type discipline): `if_real_implies`, a structured list of typed structural consequences:

```
if_real_implies: [
  { kind: "new_cell" | "new_axis" | "forced_edge" | "promotes_subtype",
    target: "<classification or edge id>",
    description: "<one-line gloss of what becomes required>",
    citation: "<reference, optional>" }
]
```

This is the Te/I-inversion move generalized. The map currently records that Koide is "empirically-substantial-architecturally-unhosted"; it does not record what would have to be true structurally for Koide to count as signal. Mechanism #3 fixes that.

**Tool work.** Extend `find_loose_ends` and add `find_signal_implications(frontier_id)` for traversing structural implications of a live anomaly.

**Authoring lift.** Moderate. A focused sweep across open-frontier and totality-approach nodes — perhaps 20–30 nodes need `if_real_implies` populated. Each entry requires a defensible structural claim, not just a guess, so authoring requires physics-content care.

### 3.4 Mechanism #1 — Quantitative scales on every node

**What it does.** Frontiers, predictions, and edges carry numerical commitments with units and uncertainties, not just categorical statuses. The hierarchy problem isn't merely "apparatus-mechanism-failure"; it's a ratio of ~10¹⁶ between two scales. Quantum gravity isn't merely "cross-architecture-non-sharing"; the failure sets in near M_Pl ≈ 1.22 × 10¹⁹ GeV. Muon g-2 isn't merely "anomaly"; it's a 4.2σ deviation from a specific SM prediction value.

Without numbers, the map cannot tell anyone what an experiment would actually find. Mendeleev's force came from numerical bets.

**Schema work.** New structured field on frontier, prediction, and (where relevant) edge nodes: `quantitative_scale`. Design choice locked in: **structured with a `kind` discriminator**, not free text. Free text would be faster to author but would kill the AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2.

```
quantitative_scale: {
  kind: "energy_scale" | "ratio" | "coupling" | "sigma_deviation" |
        "dimensionless" | "mass" | "length" | "time",
  value: <number>,
  units: "<string, omitted for dimensionless / ratio>",
  uncertainty: <number> | { low: <number>, high: <number> } | null,
  log10: <boolean, optional — for orders-of-magnitude>,
  reference: "<citation>"
}
```

The `kind` discriminator carries the schema. The hierarchy problem is a `ratio` (10¹⁶), not an `energy_scale`. The Planck scale is an `energy_scale` (10¹⁹ GeV). Muon g-2 is a `sigma_deviation` (4.2). The schema admits all three coherently without flattening any.

**Tool work.** Extend `find_predictions` and `get_node` to return quantitative scales. Add `rank_by_scale(node_type, kind)` for ordering frontiers/predictions by energy, sensitivity, deviation, etc.

**Authoring lift.** Heavy. Roughly 30+ frontier and totality-approach nodes need scales; 209 predictions need scales where applicable. This is the largest authoring sweep the Predictive Layer requires.

### 3.5 Mechanism #6 — Experimental discriminators per cell or frontier

**What it does.** Closes the loop between the map and the lab. Each unfilled cell, contested cell, or open frontier links to the experiment(s) that would resolve it, with the sensitivity required and (where multiple programs make different predictions) the predictions each program makes for that experiment.

The current map has experimental-program nodes attached as *producers* of classifications. Mechanism #6 inverts that: experimental-program nodes also become *resolvers* of specific cells and frontiers.

**Schema work.** New edge type: `resolves`, from experimental-program to cell or frontier. Edge carries:

```
{ from: "<experimental-program id>",
  to:   "<cell id or frontier node id>",
  sensitivity: <quantitative_scale>,
  timeline: "<deployed | running | planned-by-year | proposed>",
  predictions_per_program: [
    { program: "<architecture or totality-approach id>",
      predicted_value: <quantitative_scale>,
      description: "<one-line gloss>" }
  ],
  description: "<one-line gloss>" }
```

The `predictions_per_program` field is what makes this discriminative. If three candidate programs target the same frontier and an experiment can distinguish their predictions at specified sensitivity, the map records that explicitly — which is exactly the "thousand small bets the structure forces, go check them" outcome.

**Tool work.** New tools: `find_resolvers(cell_or_frontier_id)`, `find_discriminating_experiments(program_a, program_b)`. The latter is a flagship AI-first query — given two candidate programs, return every experiment that would distinguish them with documented sensitivity.

**Authoring lift.** Heavy. Each of the 7 experimental-program nodes needs its set of resolves edges populated, with sensitivities and per-program predictions. Some of this data is already in cells' `predictions` and `citations` fields informally; consolidating it into typed `resolves` edges is the work.

---

## 4. What is out of scope — cellification of architectures (#4)

The originating conversation surfaced a sixth proposed mechanism: cellification of architectures (QFT, GR, QM as cellified spaces rather than opaque blobs). The Predictive Layer does **not** adopt it. The reason is load-bearing and needs explicit statement.

For most architectures, the natural cell structure depends on what the architecture is being asked to classify. The CFT bootstrap entry in the map cellifies a slice of QFT-space because conformal symmetry forces enough structure to support cells. Generalizing that to QFT-without-conformal-symmetry runs into the swampland problem, the relevant-deformation problem, the UV-completion problem — substantively, you are asking unification by another name. "The space of all QFTs" is open mathematics, not curatorial work.

The map's discipline is that **it hosts cell structures the field has already produced; it does not generate cell structures the field has not produced.** Cellifying architectures across the board would violate that discipline. The map can host whatever cellifications physicists deliver (CFT bootstrap regions, anomaly polynomials per dimension/symmetry, swampland constraints rendered as forbidden-region classifications); it does not produce them.

The previous response in the originating conversation acknowledged this in a closing caveat. This document elevates the acknowledgment to a scope boundary. Cellification of architectures is **up to the physicists.** When they deliver a cellification, the map will host it via the existing formal-classification machinery. Until then, architectures remain opaque labels at stratum 2a — accurately reflecting the state of physics, not a gap in the map.

---

## 5. Phasing and ordering

The five mechanisms are not all the same size and do not pay back at the same rate. The ordering below is committed.

### Phase A — #5 + #2 (schema bump v16, tools, ADE-clique edge decoration)

**Schema:** add `constructive_status` to cells; add `forced_by` typed link; add `axis_mapping` to bijection / categorically-equivalent / structure-preserving derives-from edges.

**Tools:** `find_forced_cells`, `get_forcing_constraint`; extend `find_cells` with `constructive_status` filter.

**Authoring:** decorate ADE-clique edges with explicit `axis_mapping`; mark `forbidden-by-pattern` cells on SM and other classifications with structurally-excluded content; mark `conjectured-by-pattern` cells implied by existing edges.

**Why first:** smallest schema change, biggest immediate payoff. The data is already there. This is the phase that proves the Predictive Layer thesis — that the v34 coverage already encodes predictive content the schema doesn't expose.

### Phase B — #3 (anomaly-as-structural-signal authoring sweep)

**Schema:** add `if_real_implies` to open-frontier and totality-approach nodes.

**Tools:** `find_signal_implications`; extend `find_loose_ends`.

**Authoring:** focused sweep across ~20–30 anomaly-carrying nodes. Each entry needs defensible structural claims, not guesses. Subfield-specialist review desirable for contested anomalies.

**Why second:** moderate scope, moderate payoff, no dependency on Phase C work.

### Phase C — #1 + #6 (quantitative scales + experimental discriminators)

**Schema:** add `quantitative_scale` structured field with `kind` discriminator; add `resolves` edge type with `predictions_per_program` substructure.

**Tools:** `rank_by_scale`, `find_resolvers`, `find_discriminating_experiments`.

**Authoring:** largest sweep. Numerical scales for ~30+ frontiers and 209 predictions; `resolves` edges from each of the 7 experimental-program nodes to the cells and frontiers they discriminate.

**Why last:** biggest authoring lift, and the value of #6 compounds when #1 is in place (sensitivities are quantitative scales; per-program predictions are quantitative scales). Phase C closes the loop with the lab.

Phases A → B → C is the committed ordering. Phase A is not gated on §3/§5/§6 phenomenon-layer extensions; it can begin immediately against v34 data.

---

## 6. On-target tests

These mirror the structure of `PROJECT_GOAL_SUPPLEMENT.md` §2. Each is a query an AI should be able to run productively against the layer once each phase lands. Failure of any test below is a signal the layer is off-target.

**Test 6.1 — "What empty cells does the structure force?"**
Run `find_forced_cells(classification_id)` across the ADE clique and the ten-fold-way / Freed-Hopkins pair. Expected: at least one classification per structure-preserving edge returns a non-empty set of `conjectured-by-pattern` cells with defensible axis-values. (Phase A test.)

**Test 6.2 — "What does a live anomaly imply structurally?"**
Run `find_signal_implications(frontier_id)` for muon g-2, Koide, the strong-CP frontier, and the cosmological constant. Expected: each returns at least one typed structural consequence (new cell required, new axis required, forced edge, or subtype promotion). (Phase B test.)

**Test 6.3 — "What's the quantitative gap at frontier F?"**
Run `get_node(frontier_id)` for the hierarchy problem, the cosmological constant, muon g-2, and QG. Expected: each returns a `quantitative_scale` with `kind`, `value`, units (where applicable), and uncertainty. The hierarchy problem returns a `ratio`; QG returns an `energy_scale`; muon g-2 returns a `sigma_deviation`. (Phase C test.)

**Test 6.4 — "What experiment would discriminate program A from program B?"**
Run `find_discriminating_experiments(program_a_id, program_b_id)` for at least two pairs of candidate-foundational programs targeting the same frontier (e.g., AdS/CFT vs. causal sets on QG-flavored discriminators where they exist; minimal SU(5) vs. flipped SU(5) on proton-decay channels). Expected: each returns a non-empty set of resolves-edges with per-program predicted values at specified sensitivities. (Phase C test — the flagship AI-first query.)

**Test 6.5 — "Of all conjectured-by-pattern cells in the map, which have the strongest structural force?"**
Combined query: `find_forced_cells` across all classifications, filtered by the strength of the forcing edge (bijection > categorically-equivalent > structure-preserving derives-from), ranked by `quantitative_scale` of the implied prediction where one exists. Expected: returns a ranked list — the Mendeleev-quality predictions the map's structure currently encodes. (End-of-Phase-C integration test.)

Each test is falsifiable. If Test 6.1 returns the empty set after Phase A authoring, the schema work failed to expose the data. If Test 6.4 returns the empty set after Phase C, the loop with the lab isn't closed.

---

## 7. What this project does not claim

Direct mirror of `PROJECT_GOAL.md` §6 and `PROJECT_GOAL_PHENOMENON_LAYER.md` discipline.

- The Predictive Layer does **not** claim to predict unifications. It exposes constraints the structure already encodes. The creative move — the new ansatz, the calculation that surprises — remains outside the map's scope. See `PROJECT_GOAL_SUPPLEMENT.md` discussion of the unseen-connection problem.
- The Predictive Layer does **not** cellify architectures. See §4 above. That is up to the physicists.
- The Predictive Layer does **not** settle signal-versus-accident questions. Koide remains recorded as both possibilities are live. Mechanism #3 records what would be required *if* Koide is signal; it does not assert that it is.
- The Predictive Layer does **not** generate fake Mendeleev cells. A `conjectured-by-pattern` cell exists only when an explicit structure-preserving edge forces it. If the edge is `partial` or `aspired` or `conjectured` (per the v15.3 status enum), the cells it implies inherit that status — they are not promoted to `realized` or to `confirmed`.
- The Predictive Layer does **not** override the type discipline of `PROJECT_GOAL.md` §4. Curatorial axes (strata, language columns, structural-reason kinds) remain curatorial; natural-kind axes (classification axes, quantitative scales) remain natural-kind. The two are never conflated.

---

## 8. Authoring direction check

When proposing the next deliverable, check it against the following.

**Question 1 — Does this expose forcing that exists in the data but isn't surfaced?**
The Predictive Layer's contribution is making the v34 data's existing predictive content visible. A proposal that surfaces a constraint already encoded passes. A proposal that adds a new constraint (rather than exposing an existing one) needs higher justification.

**Question 2 — Which phase is this?**
Phase A work (Mechanisms #5, #2) takes priority over Phase B work (#3), which takes priority over Phase C work (#1, #6), unless an explicit case is made for re-ordering. The Phase A → B → C ordering is committed; deviations need rationale.

**Question 3 — Does this respect the scope boundary at #4?**
If a proposal involves cellifying an architecture (QFT, GR, QM) into new substantive cells the field has not produced, it falls under §4 — out of scope. The map hosts cell structures physicists deliver; it does not generate them.

**Question 4 — Does this advance the AI-first goal?**
`PROJECT_GOAL_SUPPLEMENT.md` §1.2 is authoritative on this. A proposal that makes pattern-finding, gap-filling, or unification-landing-prediction more tractable for AI working with physicists takes priority over a proposal that only helps a human reader who already knows where to look.

If a proposal fails Question 1 or Question 3, it is the wrong next step. If it fails Question 2 without rationale, it is out of order. If it fails Question 4, it is not the highest-priority move.

---

## 9. What this file does not establish

- The detailed v16 schema-spec extension implementing the schema changes in §3. That is the first deliverable downstream of this file.
- The exact list of axis mappings for the ADE clique. That is Phase A authoring work, downstream of the schema.
- The exact list of `if_real_implies` entries for each anomaly-carrying node. That is Phase B authoring work, downstream of the schema.
- The exact set of `resolves` edges per experimental-program node. That is Phase C authoring work.
- The MCP tool implementations for the new query surface. The MCP exposes the schema; the schema is the prerequisite. Tools follow.
- The editorial process for contested anomalies (Mechanism #3) and contested experimental sensitivities (Mechanism #6). Subfield-specialist review is desirable; the process for arranging it is downstream.

Each is a next-step item, not a fact already established. The first concrete deliverable after this goal file is the v16 schema-spec extension for Phase A.

---

## 10. The honest closing position

Mendeleev's table did not tell chemists to find gallium. It told them gallium had to exist with specific properties, and chemists went and found it. The deep predictive force of the table came not from telling researchers what was true but from making constraints — already implied by the table's structure — visible enough to chase.

The Map of Physics at v34 encodes a substantial set of constraints across 30 formal classifications, 484 cells, and 209 predictions. Most of those constraints are not visible to anyone reading the data structure as it currently stands. The Predictive Layer's job is making them visible.

The result will not be a periodic table of physics in the deep sense — full Mendeleev-grade prediction at the highest strata requires the substrate (the deep theory underneath) to be known, and finding that substrate *is* the unification project. The map cannot do that work and does not claim to.

What the Predictive Layer can do is generate the small bets — the empty cells the structure forces, the structural implications of anomalies, the experimental tests that would discriminate one program from another at specified sensitivity. A thousand small bets the structure forces, go check them. That is the periodic-table contribution in miniature, and it is what the map at v34 is now positioned to deliver.

The structural discipline of the previous goal documents continues to bind. The type distinction holds. The non-fabrication rule holds. The acknowledgment that curatorial axes are curatorial holds. The Predictive Layer is built on top of those commitments, not at their expense.

---

*End of PROJECT_GOAL_PREDICTIVE_LAYER.md, v1.*
