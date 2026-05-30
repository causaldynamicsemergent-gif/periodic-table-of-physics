# Physicist-facing vocabulary — supplement to the handoffs

**Purpose of this file.** A working discipline for how schema field names, query / tool names, and methodology terms get translated into the prose surfaces a physicist actually reads — AI chat output that uses the MCP, explorer UI text, README / About / help-overlay text, issue templates, and any Track 4 outreach material. The data layer, the schema docs, and the validator can use whatever internal vocabulary serves them; the physicist-facing prose layer must not. This document is a supplement to `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` and `EXPLORER_PHASE_BC_HANDOFF.md`, not a replacement for either.

Location: `/methodology/PHYSICIST_FACING_VOCABULARY.md`. Attach to project knowledge so AI sessions see it automatically.

---

## 0. The principle, in one sentence

A working physicist reading any physicist-facing output should encounter physics vocabulary first; schema field names and project-internal methodology terms appear only when load-bearing, only after a physics-prose entry point, and never in raw snake_case form.

---

## 1. Why this exists

The project's data layer has accumulated three schema versions and a substantial Phase B + Phase C content layer with its own internal vocabulary: `predictions_per_program`, `exclusion_only`, `quantitative_scale`, `bound_direction`, `if_real_implies`, `resolves edges`, `cell_refs`, `axis_mapping`. The methodology layer has its own: "§4 admissibility," "firewall-faithful authoring," "T-convention," "carrier refresh." These terms are correct, useful, and load-bearing inside the project. They are also opaque to anyone encountering the project from outside.

The risk is concrete and immediate. The MCP tools return JSON records whose field names are the schema field names. AI chats querying the MCP and summarising the result for a physicist user will naturally surface those field names because that's what comes back. The Phase B + C explorer surfacing work (sub-PRs E1–E8 in `EXPLORER_PHASE_BC_HANDOFF.md` §3) will render new fields in UI surfaces, and the temptation to display each field's name above its value verbatim is high. Track 4 outreach is the next major project phase; first impressions in the first paragraph determine whether a working physicist reads on. Snake-case field names in the first paragraph signal "this is a software project that happens to be about physics." Cleaner phrasings signal "this is a physics project that happens to use software." Same dataset, different first impression.

The recent test-chat exchange that prompted this document is the canonical bad example: a physicist-facing summary led with *"that tool is strict — it only fires on resolves edges whose `predictions_per_program` array contains side-by-side per-program predicted values"* — five distinct vocabulary leaks in one sentence (the software event verb "fires," the schema name `resolves edges`, the schema name `predictions_per_program`, the data-structure name "array," the implicit "tool" framing). The physics content underneath was correct. The packaging would have lost the reader.

---

## 2. Three registers of vocabulary

Each register has a different disposition in physicist-facing output.

**Register A — software jargon proper.** Verbs and nouns from software engineering: *fires, hits, returns null, array, field (when used as a data-structure noun), tool (when used to mean function), endpoint, payload, callback, hook, instance.* **Disposition: never in physicist-facing output.** These have clean prose equivalents and signal "this output is from a software tool" rather than "this output is about physics." The leak is gratuitous.

**Register B — schema and tool names.** The project's own technical vocabulary that names things in the dataset: `predictions_per_program`, `exclusion_only`, `quantitative_scale`, `bound_direction`, `resolves`, `if_real_implies`, `cell_refs`, `axis_mapping`, `bears-on`, `derives-from`, `uses-classification`, `produces-classification`, `formal-classification`, `candidate_targeting`, `discharge_status`, `find_discriminating_experiments`, `find_resolvers`, `find_signal_implications`. **Disposition: translate to prose by default; use the schema name only when the prose has already named the concept and the schema name carries information the prose loses, or when explicitly identifying a tool / function being called.** The translation register in §3 is the per-term lookup.

**Register C — project methodology terms.** Terms that name principles, decisions, or workflows the project itself adopted: *the firewall, §4 admissibility test, carrier refresh, T-convention, parallel-anchor, discriminating-resolves-cluster, bidirectional-anchor-closure, structural-FC vs phenomenon-FC, totality-approach, closure level, yield bar.* **Disposition: introduce only after physics rationale, and only when the reader is engaged enough to follow project-internal structure.** Track 4 outreach material should generally avoid these in the first 200 words; an AI chat answering a casual physicist's question should not lead with them. They are appropriate in maintainer-facing communication and in glossary entries the reader can pull up on demand. The methodology firewall doc (`META_v21_1_methodology_firewall.md`) is required reading before using "firewall" as a one-word reference in physicist-facing prose.

---

## 3. Translation register (Register B lookup)

Schema name on the left; physicist-facing prose on the right. The prose forms are interchangeable suggestions, not mandates; the rule is "use one of these or something equivalent," not "use this exact phrase."

| Schema / tool name | Physicist-facing prose |
| --- | --- |
| `predictions_per_program` | per-program competing predictions; competing point predictions from each program; the side-by-side prediction list |
| `exclusion_only: true` | bounds-setting (rather than measurement-discriminating); excludes parameter space rather than measuring a value; sets an upper / lower bound |
| `exclusion_only: false` | measurement-discriminating; adjudicates between competing predictions; returns a point value with uncertainty |
| `resolves` (the edge type) | the experimental coverage relation; experimental targeting; programs that address this question (when the edge is the subject); "X resolves Y" — usually keep the verb |
| `resolves edges` (plural noun) | the set of experimental-coverage relations; the authored resolver entries; just describe what's connected — "the experimental programs targeting this frontier" |
| `quantitative_scale` | quantitative bound; characteristic scale; the numerical commitment; the numerical entry |
| `bound_direction: lower` | lower bound (≳); the value is a lower limit |
| `bound_direction: upper` | upper bound (≲); the value is an upper limit |
| `bound_direction: two-sided` | central value with uncertainty; measured value; exact theoretical value (when uncertainty is null and the value is structural) |
| `bound_direction: unspecified` | bound; constraint (when direction can't be determined from the citation) |
| `if_real_implies` | the conditional consequences; "if real, this implies…"; the implication tree; the structural consequences of confirmation |
| `if_real_implies_carriers` | open frontiers / totality approaches that carry conditional consequences; the carriers of structural consequences |
| `implications` (Phase B) | structural consequences; forced consequences; what would be forced |
| `implication kind: new_cell` | forces a new cell |
| `implication kind: new_axis` | forces a new axis on the existing classification |
| `implication kind: forced_edge` | forces a new cross-classification edge |
| `implication kind: promotes_subtype` | promotes a specific cell's subtype |
| `implication kind: new_FC` | forces a new formal classification |
| `cell_refs` | the specific cells the edge / entry pins to; pinned cells |
| `cells[i].predictions[j]` | the prediction attached to this cell; this cell's specific prediction |
| `axis_mapping` | the axis correspondence between two classifications |
| `bears-on` | structurally constrains; bears on (verb is physicist-natural already) |
| `derives-from` | derives from (physicist-natural) |
| `uses-classification` | uses this classification; depends on this classification |
| `produces-classification` | produces this classification; generates this classification |
| `cross-classification` (edge type) | cross-classification edge — fine as a noun; "a relation across classifications" if a fuller phrase helps |
| `formal-classification` / FC | classification (when context is clear); formal classification (when the structural / phenomenon distinction matters) — the abbreviation FC is fine in tables and dense lists but should not appear in opening paragraphs |
| `structural-FC` / `phenomenon-FC` | structural-content classification / phenomenon-content classification; or just "structural" / "phenomenon" with the noun clear from context |
| `totality-approach` | candidate-foundational program (this is the project's longer phrasing; physicist-readable); approach to a foundational rewrite |
| `open-frontier` | open frontier of physics (the phrase is physicist-native; the hyphenated form is the schema form) |
| `experimental-program` | experimental program (no hyphen in prose) |
| `discharge_status` (on `candidate_targeting`) | the candidate program's current viability against the frontier — not a schema term in surface text. Map: `constrained-by-LHC` → "constrained by LHC searches"; `partial` → "partially addresses"; `gestural` → "early-stage"; `gestural-to-partial` → "early-stage, partly developed"; `philosophically-contested` → "philosophically contested"; `structural-only` → "structural framing only". The explorer's `frontierViabilityLabel()` (`explorer-frontiers.js`, E0 lead) mirrors this map; this row is the single source of truth — keep the two in sync. |
| `candidate_targeting` | the candidate resolutions; the named programs that aim to resolve this frontier (render as candidate-resolution chips, not the field name) |
| `find_discriminating_experiments` | the discriminating-experiments lookup; the query for competing-prediction adjudication; "I checked whether the map records competing point predictions for these two programs on the same target" |
| `find_resolvers` | the lookup for experimental coverage of a given target; "I asked the map which programs address this frontier / cell / approach" |
| `find_signal_implications` | the lookup for structural consequences of a given frontier; the if-real-implies lookup |
| `find_predictions` | the prediction search |
| `find_cells` | the cell search |
| `rank_by_scale` | the cross-map ranking by numerical scale; the scale-ranking lookup |
| `find_bounds` | the bound search; the search for entries with a specified bound direction |
| `kind` (on quantitative_scale) | dimensional type; quantity type; physical dimension |
| `kind=energy_scale` / `mass` / `length` / `time` / `coupling` / `dimensionless` / `ratio` / `sigma_deviation` | energy scale / mass / length / time / coupling / dimensionless quantity / dimensionless ratio / deviation in σ |
| `log10: true` | the value is stored as log₁₀ — display as 10^value units |
| `uncertainty: null` | no quoted uncertainty; theoretically exact; falsified-claim entry; no σ supplied by the source |
| `uncertainty: {low, high}` | asymmetric uncertainty |
| `_meta.changelog` | the per-PR changelog; the authoring ledger |
| `constructive_status` | the cell's constructive status (forbidden-by-pattern, realized, etc.) |
| `forbidden-by-pattern` | forbidden by the classification's own constructive pattern; structurally excluded by the axis pattern |
| `realized` | physically realized; instantiated in nature or theory |
| `conjectured-by-pattern` | conjectured by the constructive pattern but unrealized |

When a translation isn't in the table and the new schema field is being introduced, the authoring sub-PR that introduces it should propose its physicist-facing translation in the same PR description, and the maintainer should add the row here.

---

## 4. Software event verbs — the short version

The verbs to avoid and their replacements, since they recur:

*"The tool fires"* → "The query returns…" or "I asked the map…" or just describe the result.
*"Returns null"* → "Returns no result" or "is empty."
*"No hits"* → "no matches" or "no results."
*"The validator fails"* → "The validator rejects the entry" or "the entry doesn't pass validation."
*"Array"* → "list" or, more often, just the content noun ("predictions," "citations," "cells") without the container word at all.
*"Field"* (as a data-structure noun) → "entry," "value," or the specific noun ("the citation," "the bound").
*"Tool"* (as a generic noun for a function or query) → "query," "lookup," "search," or the specific function name in context.
*"Endpoint"* / *"Payload"* / *"Hook"* / *"Callback"* → these have no place in physicist-facing prose at all.

---

## 5. Worked examples — the canonical bad-to-good translations

**Example A — the original test-chat paragraph (bad).**

> "`find_discriminating_experiments` returns empty for all three pairings (HK/DUNE, HK/JUNO, DUNE/JUNO). That tool is strict — it only fires on resolves edges whose `predictions_per_program` array contains side-by-side per-program predicted values. The relevant edges here are all flagged `exclusion_only: true` with empty prediction arrays. The map authors made that choice deliberately: these programs aren't candidate-foundational frameworks predicting competing δ_CP or hierarchy values, they're all measuring the same SM-MNS parameter that nature has already fixed. The 'side-by-side predictions' the question asks about don't exist in the dataset — and the firewall-faithful authoring choice is exactly not to invent them."

**Example A — rewritten (good).**

> "The map distinguishes two kinds of experimental targets. One: cases where competing theoretical programs predict different values, and the experiment adjudicates between them — for example, dispersive vs lattice calculations of muon g-2 hadronic vacuum polarization. Two: cases where a single Standard-Model parameter has a value nature has already fixed, and the experiment measures it through one or another channel. Mass ordering and δ_CP are both case-two: there's one underlying number; multiple experiments converge on it through different physical channels. The curators encoded this by leaving the competing-prediction lists empty on these targets. The discriminating-experiments lookup, which only returns case-one results by design, correctly returns nothing for HK/DUNE, HK/JUNO, and DUNE/JUNO. What's available instead is shared resolver coverage — different programs measuring the same parameter through orthogonal physical channels, which is informative in a different way."

Same content. No `predictions_per_program`. No "the tool fires." No "§4 admissibility." The terms "discriminating-experiments lookup" and "shared resolver coverage" survive because they name structural distinctions the project actually makes, and they're introduced after the physics distinction is drawn.

**Example B — a hypothetical Phase B output (bad).**

> "matter-antimatter-asymmetry has 3 `if_real_implies` resolutions. The leptogenesis resolution has 4 implications: implication kind=new_cell target=cell-bsm-heavy-majorana; implication kind=forced_edge target={from:..., to:..., subtype:derives-from}; implication kind=new_axis target=neutrino-sector-phenomenology; one implication carries quantitative_scale (kind=mass value=9 log10=true units=GeV bound_direction=lower) per Davidson-Ibarra 2002."

**Example B — rewritten (good).**

> "Matter-antimatter asymmetry carries three documented resolutions in the map. The leptogenesis resolution forces four structural consequences: a new cell (a heavy Majorana neutrino), a new cross-classification relation (the seesaw-mechanism derivation linking that cell to the existing neutrino mass structure), a new axis on the neutrino-sector classification (Dirac vs Majorana character), and a quantitative bound on the leptogenesis scale: M₁ ≳ 10⁹ GeV (lower bound, Davidson-Ibarra 2002)."

The schema's implication-kind enum names get replaced with physics descriptions of what each kind means in this specific case. The quantitative-scale fields get rendered as the formula a physicist would write on a blackboard.

**Example C — a UI tooltip (bad).**

> "exclusion_only: true · timeline: running · bound_direction: upper · kind: coupling"

**Example C — rewritten (good).**

> "Sets an upper bound · running · coupling-strength reach"

The UI surface is a tooltip, not a debug panel. The reader needs the meaning of each value, not its schema field name.

---

## 6. Where this binds

The discipline applies to:

- **AI chat output** that surfaces MCP results to a user, whenever the user appears to be a physicist or an outreach target. The chat should call the MCP, get JSON back with schema field names, and translate before presenting. If the chat doesn't know the translation, it falls back to physics prose that describes what was found rather than reproducing field names.
- **Explorer UI prose** — every label, tooltip, callout, sidebar section heading, breadcrumb, help-overlay paragraph, and About-panel description. Sub-PRs E1–E8 in `EXPLORER_PHASE_BC_HANDOFF.md` §3 each ship UI text; each must apply this discipline to the text it adds.
- **Track 4 outreach materials** — issue templates, EDITORIAL.md, any blog post or comment thread or email outreach to working physicists.
- **README**, About panel, help overlay — current text needs auditing against this register; sub-PR E8 in the explorer handoff is the natural place to do that pass.

---

## 7. Where this does NOT bind

The discipline does **not** apply to:

- **Schema documentation** — `MAP_v17_schema_spec_extension.md`, `MAP_v18_schema_spec_extension.md`, `MAP_v19_schema_spec_extension.md`. These are normative specifications for the data layer; schema field names are the subject matter.
- **Changelog entries** in `_meta.changelog` of the consolidated data file. Per-sub-PR records use the project's internal vocabulary because their audience is the maintainer and future authoring sessions.
- **Validator error messages**. Software output for a software audience.
- **Methodology docs themselves** — this document, the firewall, the scope memos, the handoffs. Audience is the maintainer and AI sessions resuming work.
- **PR descriptions** for maintainer review.
- **The glossary**. Glossary entries explicitly name and explain project-internal terms; that's their job.
- **MCP tool descriptions** themselves (the JSON-schema descriptions returned by tool_search). Those describe the tool's behaviour to a calling LLM; physicist-facing prose comes one layer further out.

The principle is "the surfaces a physicist reads, not the surfaces a maintainer or an LLM reads."

---

## 8. Self-check

Before publishing or shipping any physicist-facing prose:

1. Read the first paragraph as if you've never seen the project before.
2. Underline every term you wouldn't expect to see in a *Physical Review* paper, a Snowmass white paper, or a colloquium talk in your field.
3. If any underlined term is a Register A (software) word: replace it.
4. If any underlined term is a Register B (schema / tool) word: either translate it using §3, or check that the physics concept has already been introduced and the schema name is being referenced as a tool name in context.
5. If any underlined term is a Register C (methodology) word: either it follows a physics-prose introduction of the same concept, or it shouldn't be in this opening paragraph at all. Methodology terms are fine deeper in, after engagement is established.

A separate, blunter test: would the chat output read like something printed in *Physics Today*, or like something printed in a software vendor's release notes? The first is the target. The second is the failure mode.

---

## 9. How this document is maintained

Same discipline as the other handoffs:

1. **The translation register in §3 grows as new schema fields are added.** Each PR that introduces a new schema field — Phase C v20 (if there's a v20), Track 1 explorer surfacing, any future predictive-layer extension — should add its physicist-facing translation in the same PR that adds the field, and append a row to §3.
2. **The worked examples in §5 grow as new bad-to-good translations get caught.** When an AI chat or UI surface ships text that violates the discipline and gets flagged, the bad text and its rewrite go into §5 as a new example. The examples are the most directly useful part of this document for future sessions.
3. **The "where this binds / does not bind" sections in §6 / §7 grow as new surfaces are added.** When a new physicist-facing surface is created (a new outreach channel, a new visualisation, a paper draft), §6 should be updated to include it.
4. **Periodic audit.** Once Phase B + C surfacing closes (sub-PRs E1–E5 in the explorer handoff), the live explorer should be audited end-to-end against this discipline. Any violations get fixed and the bad-to-good pair logged in §5.

---

*End of PHYSICIST_FACING_VOCABULARY.md, drafted 2026-05-26 as a supplement to `PREDICTIVE_LAYER_PHASE_C_HANDOFF.md` and `EXPLORER_PHASE_BC_HANDOFF.md`. Triggered by a test-chat exchange in which an MCP-using chat returned physically-correct content packaged in five distinct schema-name / software-jargon leaks in a single sentence. The data layer doesn't need to change; the prose layer does. Track 4 outreach is the immediate stake, but this discipline binds going forward across every physicist-facing surface.*
