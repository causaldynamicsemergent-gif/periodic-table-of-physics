# PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md — `quantitative_scale` and `resolves` shape decisions

**Document type:** Scope memo. Step 0 of the Predictive Layer Phase C build. Settles the design questions named in `TRACKS_AFTER_PHASE_A.md` Track 3 sketch so the v18 spec extension can be written against a fixed target. Plays the role for Phase C that `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` played for Phase B and that the §3.x mechanism descriptions in `PROJECT_GOAL_PREDICTIVE_LAYER.md` played for Phase A.

**Status:** v1. Authored 2026-05-21. Settles shape decisions; schema, validator, tools, authoring inventory, and authoring content are downstream.

**Binding parent docs:** `PROJECT_GOAL_PREDICTIVE_LAYER.md` §2 Moves 2 + 5 (Mechanisms #1 + #6) and §3.4 + §3.5; `META_v21_1_methodology_firewall.md`; `TRACKS_AFTER_PHASE_A.md` Track 3; `PREDICTIVE_LAYER_PHASE_B_SCOPE_MEMO.md` (template for the §4 firewall structure).

---

## 0. What this memo settles

Phase C implements the final two Predictive Layer mechanisms: `quantitative_scale` (Mechanism #1, §3.4 of the goal doc), the structured numerical-commitment field that turns categorical statuses into quantitative bets; and `resolves` (Mechanism #6, §3.5), the new edge type from experimental-program nodes to cells and frontiers that closes the loop between the map and the lab. Phase A made existing structure machine-explicit; Phase B recorded structure that does not yet exist conditional on literature positions; Phase C records the numerical content the v34 dataset already carries in prose and the experimental tests that would discriminate program from program. Phase C is the largest authoring lift of the layer and the one whose payoff is most directly visible to a working physicist.

Six decisions: (§1) `quantitative_scale` carrier surfaces; (§2) `quantitative_scale` schema shape and kind taxonomy; (§3) `resolves` carrier types and edge semantics; (§4) the binding firewall admissibility test for Phase C; (§5) interactions with Phase A and Phase B; (§6) the experimental-program inventory gap and how to close it. §7 lists what the memo does not settle.

---

## 1. `quantitative_scale` carrier surfaces

**Decision: `quantitative_scale` is a permitted optional field on five distinct surfaces. It is a *uniform* structured object everywhere it appears.**

The five surfaces are:

1. **`open-frontier` and `totality-approach` nodes** (17 carriers as of v40) — the top-level frontier-scale field. Records the characteristic numerical commitment the frontier carries: the hierarchy problem's ratio of ~10¹⁶, the cosmological constant's value, muon g-2's sigma-deviation, the QG energy scale.

2. **Cells of formal-classifications** (484 cells) — cell-level numerical content. Records masses, coupling strengths, dimensionless ratios, or other quantitative axis-values that a cell's content carries beyond its categorical axis-tuple. Example: SM-rep-content's `u_R` cell at generation 3 carries the top-quark mass ~173 GeV; the cell's axis-value `generation: 3` is categorical, but the mass is the quantitative commitment.

3. **`predictive_yield[]` entries on FC nodes and `predictions[]` entries on cells** (223 total predictions) — prediction-level numerical commitment. Records the predicted value and uncertainty when a prediction has one. Many existing predictions already carry numerical content in prose; Phase C makes it structured.

4. **`bears-on` edges** (FC → frontier, `nature: partially-solves` or `constrains`) — edge-level scale band. Records the energy range, length range, or other quantitative bracket over which the bearing holds. Example: ten-fold-way bears-on topological-phases-classification at scales where free-fermion approximation holds (typically ≲ T_F-scale temperatures and weak interactions).

5. **`if_real_implies` implications** (Phase B field on the 17 carriers in §1.1, 24 implications populated in v40) — conditional-consequence-scale. When a Phase B consequence implies a numerical commitment ("if SUSY at TeV is real, superpartner masses ≲ 10 TeV"), the implication carries a `quantitative_scale` recording the implied numerical claim.

`quantitative_scale` is **never required** at any surface. Absence means no quantitative claim is recorded; absence does not imply zero, indeterminate, or any other value. (Same convention as `constructive_status`, per v16 spec §"When absent" — Phase C cannot relax this.)

Architectures, regime-content nodes, and candidate-foundational programs do **not** carry `quantitative_scale` directly. They carry their numerical commitments via the cells they host or produce, the frontiers they target, and the predictions they make. Adding `quantitative_scale` directly to architectures would invite "the energy scale of QFT" claims that are not meaningful at the architecture-as-a-whole level.

---

## 2. `quantitative_scale` schema shape

**Decision: structured object with `kind` discriminator. No free-text quantitative fields. Eight kinds, one shared object schema.**

The §3.4 goal-doc commitment to structured-with-`kind` is preserved; this memo settles the kind taxonomy and the surrounding fields.

**Schema shape (binding for the v18 spec):**

```json
"quantitative_scale": {
  "kind": "energy_scale" | "mass" | "length" | "time" |
          "ratio" | "coupling" | "dimensionless" | "sigma_deviation",
  "value": <number>,
  "units": "<string, required for energy_scale/mass/length/time/coupling; omitted otherwise>",
  "uncertainty": <number> | { "low": <number>, "high": <number> } | null,
  "log10": <boolean, optional>,
  "citations": ["<reference 1>", "..."]
}
```

**Kind taxonomy (eight values).**

- `energy_scale` — characteristic energy or scale-of-failure. Units required (typically GeV, TeV, eV). Example: Planck scale, electroweak v.
- `mass` — particle mass, hadronic mass, or other mass observable. Units required (typically GeV, MeV). Example: top quark mass.
- `length` — characteristic length, correlation length, or scale-of-applicability. Units required (typically m, fm, Mpc).
- `time` — characteristic time, lifetime, or age. Units required (typically s, yr).
- `ratio` — dimensionless ratio of two scales. Units omitted; `log10: true` admissible for order-of-magnitude claims. Example: hierarchy problem records `value: 17, log10: true` for ~10¹⁷.
- `coupling` — dimensionless coupling strength. Units omitted. Example: fine-structure constant α ≈ 1/137.
- `dimensionless` — any other dimensionless quantity not better captured as ratio or coupling. Units omitted. Example: critical exponents, Koide's Q ≈ 2/3.
- `sigma_deviation` — measurement-vs-prediction discrepancy in standard deviations. Units omitted. Example: muon g-2 at ~4.2σ.

**Rationale for the kind discriminator.** A working physicist reading "10¹⁶" wants to know immediately whether that's a ratio (hierarchy), an energy in GeV (close to GUT scale), or a length in inverse-GeV (much smaller than Planck length). The `kind` field carries that disambiguation without prose. The AI-first goal in `PROJECT_GOAL_SUPPLEMENT.md` §1.2 requires that AI queries can rank, filter, and compare across the dataset — free-text fields make that infeasible.

**`log10` semantics.** When `log10: true`, `value` is the base-10 logarithm of the underlying quantity. Used for order-of-magnitude claims where the precise value is not the load-bearing fact (`value: 17, log10: true, kind: ratio` records "~10¹⁷ to within an order of magnitude"). When omitted or `false`, `value` is the quantity itself. `log10` is meaningful only for `ratio`, `energy_scale`, `mass`, `length`, `time`, and `coupling`; the schema permits it on those six kinds and forbids it on `dimensionless` and `sigma_deviation`.

**Uncertainty.** Either a symmetric value (single number, interpreted as ±value in the same units), an asymmetric `{low, high}` object (low and high bounds at 68% CL by convention), or `null` (no uncertainty recorded — distinct from uncertainty = 0). The schema does not enforce a CL convention; entries cite their source's convention via the `citations` field.

**Citations.** `minItems: 1`. The numerical value must be sourced. This is part of the §4 firewall test.

---

## 3. `resolves` carrier types and edge semantics

**Decision: `resolves` is a new edge type, source-typed to `experimental-program` nodes, target-typed to cells or frontier-type nodes (`open-frontier` and `totality-approach`). Distinct from `bears-on:partially-solves`. No migration of existing edges.**

The Track 3 sketch asked whether `resolves` is a strengthening of `bears-on:partially-solves` or a separate edge type. The answer is **separate**, and the reason is structural: `bears-on` connects a formal-classification to a frontier (the FC structurally addresses part of the frontier); `resolves` connects an experimental-program to a frontier or cell (a lab apparatus will, with documented sensitivity, push the frontier toward resolution). They have different source-node types, different semantics, and different downstream uses. They complement; they do not compete. No existing `bears-on:partially-solves` edge is migrated, retyped, or modified by Phase C.

**Schema shape (binding for the v18 spec):**

```json
{
  "id": "<edge id, e.g. edge-rs-hyper-k-resolves-proton-decay>",
  "type": "resolves",
  "from": "<experimental-program id>",
  "to": "<cell id | open-frontier id | totality-approach id>",
  "sensitivity": { /* quantitative_scale per §2 */ },
  "timeline": "deployed" | "running" | "planned-by-2030" |
              "planned-by-2035" | "planned-by-2040" | "proposed",
  "predictions_per_program": [
    {
      "program": "<architecture id | candidate-foundational program id | totality-approach id>",
      "predicted_value": { /* quantitative_scale per §2 */ },
      "description": "<one-line gloss>",
      "citations": ["<reference 1>", "..."]
    }
  ],
  "description": "<one-line gloss of what the experiment will resolve>",
  "citations": ["<experimental proposal or design report 1>", "..."]
}
```

**`predictions_per_program` is the load-bearing substructure** — it is what makes a `resolves` edge discriminative rather than merely promissory. An experimental program that targets a frontier without recording what different candidate-foundational programs predict for the experiment is recording an aspiration, not a discriminator. Edges where `predictions_per_program` is empty are admissible (some experiments narrow the space rather than discriminate cleanly) but flagged structurally: the §4 firewall test requires that at least one of (a) `predictions_per_program` non-empty with cited per-program values, or (b) an explicit note that the experiment is exclusion-only with citation, must hold.

**`timeline` enum.** Six values capture the operational state. `deployed` (already taking data), `running` (currently operating with scheduled runs ahead), `planned-by-YYYY` for three year-buckets (`2030`, `2035`, `2040`), `proposed` (concept stage, not yet funded). The year-bucket convention is coarse by design — physicists reading the map need timeline information at the half-decade granularity, and finer-grained timelines drift faster than annual edits to the dataset.

**Target type.** Either a cell id (the experiment discriminates content at the cell level — e.g., proton-decay searches at a specific channel are cell-level resolutions of su5-gut-rep-content's monopole and X/Y-boson cells), or an `open-frontier`/`totality-approach` id (the experiment discriminates at the frontier level — e.g., LISA's resolution of the QG-frontier is not at the cell level since QG has no cellified content yet). The validator (§5 Rule 28) resolves target ids against the appropriate type table per the target's class.

**Asymmetry with `bears-on`.** `bears-on` records "FC X structurally addresses part of frontier Y." `resolves` records "experiment Z will, with sensitivity S by timeline T, discriminate the candidate programs targeting Y (or settle the content of cell Y)." Both flow toward closing the same frontier from different epistemic directions. A frontier with extensive `bears-on` edges and no `resolves` edges has substantial structural understanding but no clear experimental path to settling its open content. A frontier with `resolves` edges but no `bears-on` is structurally orphaned but empirically tractable. Both states are visible from the data after Phase C.

---

## 4. Firewall admissibility test for Phase C

**Binding for every Phase C authoring pass.** The v18 spec extension MUST include this test verbatim as its admissibility section before any authoring begins. Phase A's test ("is this making existing structure explicit?") applies in the limit — most `quantitative_scale` entries surface numerical content already in v40 cell descriptions, frontier prose, or citation text. Phase B's test (literature-position antecedent + structural-derivation consequent + both cite) does not apply because Phase C's content is empirical-numerical rather than conditional-structural. Phase C needs its own criterion, tighter than either predecessor because numerical claims are checkable against experiment in a way structural claims are not.

**Three-part test.**

1. **The value is a literature value.** Every `quantitative_scale` entry's `value` (and `uncertainty` if present) names a measurement, calculation, or canonical reference in the published literature. `citations` is non-empty (validator-enforced: `minItems: 1`). Values inferred by the cartographer from cross-classification pattern, from analogy with other cells, or from arithmetic on other cells' values without a published source are inadmissible.

2. **Per-program predictions are program-internal calculations.** Every entry in `predictions_per_program[]` on a `resolves` edge cites the program-internal calculation or paper that produces the per-program value. A per-program prediction inferred by pattern from other programs' predictions, or invented to fill a discriminator slot, is inadmissible. If the program does not have a published prediction for the experimental observable, the entry is omitted rather than invented.

3. **Sensitivities cite the experimental design.** A `resolves` edge's `sensitivity` field cites the design report, proposal, or published projection from the experimental program itself. Sensitivities estimated by the cartographer from raw-flux-times-runtime calculations, or extrapolated from analogous experiments without citation, are inadmissible.

**§2.5 self-check restated for Phase C.** Before adding each `quantitative_scale` or `resolves` entry: *"Would I record this numerical claim — value, uncertainty, sensitivity, predicted-value — if I had only the source literature and not the v40 dataset structure in front of me? Specifically, is the value I am about to write the value the citation says, or is it my reconstruction from context?"* PR descriptions record that the self-check was applied per-entry. A "the source says ≈10¹⁶ and I'm rendering it as `value: 16, log10: true`" answer passes (faithful rendering of a citable value). A "the source describes the effect qualitatively but doesn't name a number; I'm estimating from the surrounding paragraphs" answer fails.

The validator does not check citation **quality** or numerical **accuracy** — those are physicist-review work, downstream of the Phase C MCP rebuild. The validator checks structural conformance: presence of citations, well-typed kinds, units required for the dimensional kinds, units forbidden for the dimensionless kinds.

---

## 5. Interactions with Phase A and Phase B

**Phase A interaction.** `quantitative_scale` is independent of `constructive_status` and `forced_by`. A cell may be `realized` and carry a `quantitative_scale` (the standard case for measured masses); a cell may be `forbidden-by-pattern` and carry no `quantitative_scale` (the standard case for structurally-excluded cells); a cell may be `realized` with no `quantitative_scale` (no quantitative content recorded). The fields are orthogonal; no schema rule binds them.

**Phase B interaction.** `quantitative_scale` is permitted on `if_real_implies` implications per §1.5. When a Phase B consequence is quantitative, the implication carries a `quantitative_scale` recording the implied numerical claim. The §4 firewall test applies — the implied value must be sourced from the literature that proposed the resolution, not estimated by the cartographer. This is the natural locus for forward-looking quantitative claims: "if X is real per published proposal Y, then per the same proposal Z scales as ~V." Phase B's grouping-by-resolution and Phase C's per-implication scaling combine cleanly without schema entanglement: Phase B answers "what would follow"; Phase C answers "at what scale would it follow."

**Phase C as the layer closer.** With Phase A + Phase B + Phase C in the data, the on-target tests in `PROJECT_GOAL_PREDICTIVE_LAYER.md` §6 all become runnable: 6.1 (forced cells, Phase A) ✓, 6.2 (signal implications, Phase B) ✓, 6.3 (quantitative gaps, Phase C), 6.4 (discriminating experiments, Phase C), 6.5 (Mendeleev-quality ranked predictions, Phase A + C integration). Test 6.5 is the Phase-C integration test; it cannot be made runnable without both `quantitative_scale` and `resolves` present.

---

## 6. The experimental-program inventory gap

The seven existing experimental-program nodes in v40 are all historical SM-particle-discovery collaborations: PDG, ATLAS + CMS at LHC, UA1 + UA2 at SPS, CDF + D0 at Tevatron, DONUT, Brookhaven + SLAC charm, Fermilab E288 Upsilon. All have `produced_classifications: ["sm-rep-content"]`. None of them are forward-looking. None of them will resolve any of the 17 open frontiers and totality-approaches by themselves.

**This is a Phase C blocker.** Mechanism #6's `resolves` edges have no source-end nodes to attach to until forward-looking experimental-program nodes are authored. The scope memo flags this as a sub-track that must precede `resolves` authoring.

**Decision: Phase C Step 0.5 — experimental-program inventory pass.** Before any `resolves` authoring, a focused authoring sweep adds forward-looking experimental-program nodes to v40. The minimum-viable inventory the layer needs to populate `resolves` edges for the 17 carriers is on the order of 8–15 nodes. Indicative candidates (not committed — each requires its own admissibility check):

- **DUNE** (deep underground neutrino experiment, FNAL → SURF) — neutrino oscillation, proton decay, supernova-neutrino detection
- **Hyper-Kamiokande** (Kamioka) — proton decay, neutrino mass hierarchy, supernova-neutrino detection
- **JUNO** (Jiangmen) — neutrino mass hierarchy, reactor anti-neutrino spectroscopy
- **LISA** (space-based gravitational-wave detector, planned 2030s) — mHz GW band, BH thermodynamics tests, primordial-GW background searches
- **LIGO/Virgo/KAGRA + future Cosmic Explorer / Einstein Telescope** — kHz GW band, BH merger thermodynamics
- **CMB-S4 / LiteBIRD / Simons Observatory** — primordial gravitational waves via CMB B-modes, inflation parameter constraints
- **Vera Rubin Observatory (LSST)** — dark-energy equation-of-state, dark-matter substructure
- **Axion haloscopes** (ADMX, HAYSTAC, MADMAX) — QCD axion at meV–eV mass range, strong-CP signal
- **EDM experiments** (nEDM at PSI / SNS, electron EDM at JILA) — strong-CP, CP-violation beyond CKM
- **Future g-2** (Muon g-2 at Fermilab continuation, J-PARC g-2) — muon-g-2 resolution
- **FCC** (proposed 100 TeV pp collider) — hierarchy-problem at scales beyond LHC reach
- **Future proton-decay successors** (potentially Hyper-K + JUNO combined) — GUT discrimination

Each new node follows the existing `experimental-program` schema: id, label, subtype, operational_period, host_institutions, key_publications or design_reports, produced_classifications (often null for forward-looking experiments — they will eventually produce classifications when they take data). The inventory pass is mechanical against existing schema; the §4 firewall test applies (each node cites a design report or proposal).

**This is the first Phase C authoring step.** Without it, `resolves` edges cannot land.

---

## 7. What this memo does not settle

Each is downstream:

- **v18 schema-spec extension** — JSON Schema definitions for the §2 `quantitative_scale` shape and the §3 `resolves` shape, conditional rules (analog of v16 §5.1–§5.4 and v17 §3), validator-side rules (Rules 27+ continuing v17's Rules 24–26). First downstream deliverable; models on `MAP_v17_schema_spec_extension.md`.
- **v18 schema JSON.** Models on Phase B's Step 2.
- **Validator update.** Models on Phase B's Step 3, with new rules enforcing the §4 firewall test (citations required on every `quantitative_scale` and on every `predictions_per_program` entry; units required/forbidden per kind; target-id resolution on `resolves`; experimental-program-typed source on `resolves`).
- **Step 0.5 experimental-program inventory pass.** §6.
- **Authoring sweeps.** Five passes, ordered:
  - 6.1 — `quantitative_scale` on all 17 open-frontier and totality-approach nodes (frontier-level scales).
  - 6.2 — `quantitative_scale` on the 223 predictions where numerical content is citable. Many will not carry one; that is correct under the firewall.
  - 6.3 — `quantitative_scale` on cells where mass / coupling / numerical content is the load-bearing claim (estimated subset: ~50–100 cells out of 484).
  - 6.4 — `resolves` edges from each newly-authored experimental-program node (per §6) to its target cells/frontiers, with `predictions_per_program` populated where candidate programs make discriminating predictions.
  - 6.5 — `quantitative_scale` on `if_real_implies` implications where consequences are quantitative (subset of the 24 implications populated in v40).
- **MCP worker rebuild.** New tools `rank_by_scale(node_type, kind)`, `find_resolvers(cell_or_frontier_id)`, `find_discriminating_experiments(program_a, program_b)`; extension of `find_predictions` and `get_node` to surface `quantitative_scale`. Models on Phase B's Step N+1.

These map onto the 6–8 numbered steps the TRACKS doc Track 3 estimate names, plus Step 0.5 for the experimental-program inventory. The companion handoff `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` is the operational document each downstream step updates.

---

*End of PREDICTIVE_LAYER_PHASE_C_SCOPE_MEMO.md, v1.*
