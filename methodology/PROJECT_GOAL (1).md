# PROJECT_GOAL.md — Periodic Table of Physics

**Document type:** Load-bearing project goal file.
**Status:** v1. Authored at project inception, downstream from the Map of Physics (v0 through v13) and the conversation that motivated the shift in target.
**Working title for the artifact:** *The Periodic Table of Physics.* The phrase is used in the specific sense defined in §1 — the *assembled state* of physics's Mendeleev-grade structural content rendered navigable in one place alongside the discourse-level cartography. Not a single new Mendeleev act repeated whole.

---

## 0. What this document is

This is the load-bearing goal file for the *Periodic Table of Physics* project. It defines what the project is building, what it preserves from its predecessor (the Map of Physics, v0–v13), what it adds, what it does not claim, and the falsifiable conditions for success.

This file is the document the project returns to when scope-creep, framing temptation, or curatorial-discipline drift surface. If a proposed move conflicts with this file, the move is the thing on probation, not the file. The file is itself revisable, but revision requires an explicit changelog and rationale in a §0.1 added below.

The project succeeds when a working physicist can arrive cold, locate the problem they are working on, and navigate fluidly between (a) the structural reason it remains open, (b) the formal-classification content that bears on it where such content exists, and (c) the programs targeting it. The project fails when it does any of the following: claims to perform Mendeleev's discovery act anew; flattens or paraphrases the internal structure of the formal classifications it hosts; promotes curatorial axes to natural-kind status; or papers over contested or absent classifications by gesturing rather than by saying so.

---

## 1. The thesis

Physics's Mendeleev-grade structural content already exists. It is scattered.

The Standard Model's particle table is one fragment. The Altland-Zirnbauer / Kitaev ten-fold way of topological phases is another. The Freed-Hopkins cobordism classification of anomalies is a third. ADE classifications, conformal-bootstrap exclusion regions, swampland constraints, and group-representation-theoretic catalogs of allowed gauge-extensions are further fragments. Each is a domain where mathematical structure that nature appears to respect has been catalogued, with predictive bite within its domain. A physicist working at a frontier currently has to know which subfield's classification literature to consult and how to translate between fragments. **No artifact assembles them.**

The thesis of this project is that assembling these fragments — properly typed, internally faithful, and cross-referenced with the existing discourse-level cartography of the Map of Physics — produces an artifact that does work nothing else currently does. The phrase "periodic table of physics" names this assembled state, not a single new Mendeleev act. **The assembly is the contribution.** The contribution is real because no aggregation of this kind currently exists and physicists need it.

The honest position the project holds: the periodic table of physics is a partially-existing thing scattered across several formal-classification programs; the assembled artifact's job is making the field navigable in the regions where those programs *don't* reach (discourse-map layer) and pointing into them where they *do* (formal-content layer).

---

## 2. What is preserved from the Map of Physics

The full discourse-level cartography of the Map of Physics is preserved unchanged in its core. Specifically:

- The scale-stratified atlas of architectures (strata 1, 2a, 2b, 3, 4) with sub-bands (established / candidate within stratum 2).
- The four primary mathematical-language columns (information-theoretic, geometric, category-theoretic, algebraic) with the structurally-excluded combinations rendered as periodic-table-style empty cells.
- The seven structural-reason kinds classifying *why* an open frontier remains open. Operational definitions follow the v13 spec; this file does not redefine them.
- The candidate-foundational tier with the extending / reinterpreting distinction.
- The four diagnostic checks operationalized in the v1 visual spec: coherence, scale, structural-reason, equation-level.
- The methodological discipline established across v0 through v13: no fabrication; every claim has either an in-document articulation or a citation to primary literature; gestured-at content is flagged as such, not asserted.

The current map is not being replaced. It is being **extended**. The new project starts from the v13 data files and schema and adds to them; existing nodes, edges, and structural-reason tagging remain intact through migration.

---

## 3. What is added — the formal-content layer

A new node type is introduced: the **formal-classification node**. A formal-classification node represents a (closed or partially-closed) taxonomy of physical content that nature appears to respect, with its own internal axis structure rendered faithfully.

Each formal-classification node carries the following metadata:

- **Classification axes.** The variables along which the taxonomy is organized — e.g. for the ten-fold way: three discrete symmetries (time-reversal, particle-hole, chiral) × spatial dimension. For SM rep content: gauge group × representation × generation. For Freed-Hopkins cobordism: spacetime dimension × symmetry-group structure.
- **Domain of applicability.** Which physical regimes the classification covers and which it does not.
- **Closure status.** Whether the classification is complete within its domain (e.g. the ten-fold way), partial, or conjectural / contested (e.g. de Sitter swampland conjecture).
- **Predictive yield.** What the classification has predicted that has been confirmed — concrete instances (e.g. specific topological-phase predictions confirmed in materials; the top quark; the Higgs).
- **Citations to original results.** No paraphrase of contested or technical content without a primary-literature anchor.

Formal-classification nodes are rendered such that their internal structure is visible at the node level — small embedded sub-grids, expandable on selection, with the axis structure of the classification preserved rather than collapsed to a label.

A new edge type is introduced alongside: **bears-on**. A formal-classification node *bears on* a frontier node when the classification constrains or partially solves the frontier's problem. A program node *uses* or *produces* a formal-classification node when the program either invokes the classification or contributed to establishing it. Both edge directions are first-class and traversable.

---

## 4. Type discipline — load-bearing

The project's defensibility rests on keeping two axis types distinguished. This is the load-bearing rule of the project. Any proposed move that conflicts with this rule needs explicit revision of this section before being implemented.

- **Openness axis.** The structural-reason taxonomy classifies *kinds of openness*. These attach to frontier-type nodes only. They are curatorial cuts — explicitly acknowledged as such — that do real organizational work without pretending to be natural-kind classifications.
- **Content axis.** Formal-classification axes attach to formal-classification nodes only. These are properties theories must have because nature imposes them, not curatorial cuts. Ten-fold-way symmetry classes are not editorial categories; they are imposed by the discrete-symmetry structure of the Hamiltonian. Cobordism classes are imposed by the topology of spacetime.

These two axis types are **never conflated**. The strata, the language columns, and the structural-reason kinds are not promoted to Mendeleev-grade status. The ten-fold-way symmetry classes and the Freed-Hopkins cobordism classes are not demoted to curatorial status. The map's most distinctive feature is its self-aware honesty about which axes are which; that honesty is preserved by enforcing the type distinction visually and in the schema.

Cross-references between the two layers are the connective tissue, not a blurring of the type distinction.

---

## 5. Coverage targets and phasing

The aggregation work scales sharply with subfield expertise required. The project phases as follows:

**Phase 1.** Small, stable, well-tabulated classifications.
- Standard Model particle content (gauge group, representations, generations) with explicit rendering of the rep-theoretic structure.
- The ten-fold way (Altland-Zirnbauer × dimension) for topological phases of free fermions.
- ADE classifications as they manifest across physics (Lie algebras, simply-laced groups, surface singularities, McKay correspondence).
- Spacetime symmetry groups (Poincaré, Galilean, conformal) and their rep theory.

**Phase 2.** Larger, dimension-dependent, technically demanding classifications.
- Freed-Hopkins cobordism classification of anomalies, rendered honestly across dimensions and symmetry types.
- Classification of 2d CFTs (rational, c < 1, modular tensor categories).
- Conformal-bootstrap exclusion regions for selected dimensions and symmetries.
- Higher-form / generalized symmetry classifications.

**Phase 3.** Contested, conjectural, or actively-developing classifications.
- Swampland constraints (weak gravity, distance, de Sitter), rendered with explicit conjecture-status and the disagreements about each.
- Generalized global symmetry classifications under active development.
- Whatever else has matured into Mendeleev-grade work by the time Phase 3 starts.

Phases are not strictly sequential — a stable Phase 2 entry can be added before all Phase 1 entries are complete — but the discipline is that Phase 3 entries are not absorbed at the cost of skipping the foundational Phase 1 work. The Phase 1 entries are the artifact's spine and have to be complete and faithful before the artifact carries its name.

---

## 6. What the project does not claim

To prevent the project drifting toward the overclaim that the periodic-table comparison invites, the following are explicit non-claims:

- The project does **not** claim to perform Mendeleev's act of discovery. The classifications it aggregates were produced by the physicists and mathematicians who built them. The project's contribution is in the assembly, the typing, and the cross-referencing.
- The project does **not** claim to predict new theories on its own. Individual formal-classification nodes inherit whatever predictive bite their source results have (and that bite is real and substantial in many cases — the SM table predicted the top quark; the ten-fold way predicted experimentally-found topological phases). The aggregation itself does not produce additional predictions beyond what its constituents already do.
- The project does **not** claim to Mendeleev-ize the parts of physics that resist formal classification. Foundations of quantum mechanics, candidate quantum-gravity programs as a whole, dark-energy origin, time / arrow / observer questions, and consciousness-related questions are not currently amenable to Mendeleev-grade classification. They remain in the discourse-map layer. The project renders this honestly rather than gesturing at coverage it does not have.
- The project does **not** promote its curatorial axes (strata, language columns, structural-reason kinds) to natural-kind status. Those axes do real organizational work; that work is interpretive, and the project says so.

---

## 7. Methodological discipline

The discipline from the predecessor project carries forward unchanged and is extended:

- **No fabrication.** Every formal-classification node has a primary-literature anchor for its content. Where the literature disagrees, the disagreement is rendered, not arbitrated.
- **No flattening.** The internal structure of each classification is preserved in the node's rendering. The ten-fold way is not collapsed to a sentence; it is rendered as a 10 × dim grid with the symmetry-class structure visible.
- **No paraphrase substitution for structural claims.** If a result is too technical to render briefly, the node says so and points to the primary literature rather than substituting an under-faithful summary.
- **Contested status is rendered as contested.** Conjectural results carry their conjecture-status as visible metadata, not as a buried caveat. The de Sitter swampland conjecture, for instance, is rendered with its disputed status front-and-center.
- **Editorial scaling is acknowledged.** Phase 2 and Phase 3 entries will require subfield-specialist review. The project plans for this rather than improvising it. The natural growth trajectory is from one-curator cartography toward a multi-specialist editorial board; that growth is explicit, not concealed.

---

## 8. The bar this project has to clear

Concrete falsifiable success conditions, in order of escalating ambition:

**Minimum.** A physicist arriving at the assembled artifact can locate the SM particle table, the ten-fold way, and at least three other formal classifications, each rendered with internal axis structure visible, primary-literature anchors live, and *bears-on* edges to the discourse-level map's frontier nodes wired up.

**Working.** A physicist working on a frontier problem (pick one: strong-CP, measurement, cosmological constant, neutrino-mass origin, hierarchy, baryogenesis) can navigate from the frontier node to (a) its structural-reason kind, (b) every formal-classification node that bears on it, (c) every program node targeting it, in fewer than five clicks per leg, with each landing actually informative rather than gestural.

**Distinctive.** A physicist comparing two structurally distant frontiers classified under the same structural-reason kind (e.g. two "bridge failure" frontiers in different subfields) can see at the formal-content layer whether they share any classification machinery — whether the structural-reason cross-classification is *also* shadowed by a formal-content commonality. The project produces visible candidate cross-subfield connections this way that would not be visible from the literature taken piecewise. **Producing even one such candidate that survives subfield-specialist review is a distinctive success.**

**Aspirational.** The artifact becomes a tool a subfield-specialist actually uses — to orient grad students, to locate the formal-content edge of their own problem, to write grants that articulate not just *what* their program targets but *what kind of openness* the target has and *which formal-classification machinery* bears on it. Adoption is the long-run success metric. The project does not pursue adoption at the cost of any of the discipline conditions in §7.

---

## 9. What this file does not establish

This file establishes the project's frame. It does not establish:

- The detailed schema extensions required for the formal-classification node type (axis-metadata fields, sub-grid rendering specifications, *bears-on* edge semantics, edge cardinality rules). Those are the first deliverable of the new project.
- The visual rendering for formal-classification nodes. This requires its own spec document, downstream from the schema.
- The Phase 1 entry-data files. Those are the second deliverable.
- The editorial process for Phase 2 and Phase 3 (who reviews; who decides contested-status flagging; how cross-classification disagreements are arbitrated).
- The migration path from v13's data files to the new project's data files. The new project starts from v13 as its base; the migration is a defined-scope task with its own checklist.
- The MCP server's tool surface for the new node type. The MCP exposes the schema; the schema is the prerequisite; the MCP comes after.

Each of the above is a next-step item, not a fact already established. The first concrete deliverable after this goal file is the schema extension spec.

---

## 10. The honest closing position

The Periodic Table of Physics, in the only sense the phrase can honestly mean today, is not a single Mendeleev act repeated whole. It is the assembled state of physics's structural content — fragments that already exist, scattered across formal-classification programs nobody has assembled — rendered navigable in one place, alongside the discourse-level cartography that catalogues where those fragments don't yet reach and why.

This project commits to building exactly that artifact. Not more, not less. The discipline of this file is what keeps the commitment honest.
