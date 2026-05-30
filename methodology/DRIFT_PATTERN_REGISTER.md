# Drift Pattern Register

**Purpose of this file.** Standing record of methodology drifts that have been caught and corrected in conversation, with the corrected position and the structural failure mode each drift produces. Two classes of entries — **content drifts** (the methodology's stated position contradicts what the project actually needs to do) and **process drifts** (failure modes in how sessions execute the methodology) — both serve drift prevention: when a fresh session re-derives a contradiction or repeats a failure pattern named here, the prior correction lives in this file so the work doesn't have to start over.

Location: `/methodology/DRIFT_PATTERN_REGISTER.md`. Attached to project knowledge. Cross-referenced from `META_v21_1_methodology_firewall.md` §8 and `MENDELEEV_POSITIONING_HANDOFF.md` §7.

---

## How to use this register

A session opening on this project reads this file as part of the §0 state-verification ritual (per the kickoff prompt for the sub-PR it is executing). Before producing substantive analysis on a topic that touches one of the entries below, the session:

1. **Reads the relevant entry.**
2. **Applies the corrected position** rather than re-deriving the contradiction from un-corrected docs (the methodology corpus may carry residual un-corrected language elsewhere; entries here are authoritative).
3. **Notes in its output if the work touches a registered drift**, so the maintainer can see the register's coverage is being applied.

Entries are **active by default**. Fresh sessions need to be aware of them in case the methodology layer drifts back. An entry archives only after a stable pattern of fresh sessions handling the correction correctly without consulting the register has been established. Archival is a maintainer call.

**Maintenance trigger.** A conversation that ends with a methodology-level revision (not just a draft adjustment) proposes a new register entry as part of the same sub-PR. The register grows entry by entry, on every methodology-revision sub-PR.

---

## Entry 1 — content drift: substrate outputs vs substrate inputs

**Drift pattern.** Treating substrate-organization-time emergence as if it were substrate-content-authoring; conflating what the firewall binds (content authoring) with what the project's tool exists to do (surface patterns and gaps when literature-anchored content meets project-built organization).

**Failure mode.** A too-strict reading of the literature-anchoring principle forecloses the Mendeleev move at its central point. The principle as originally stated — *"substrate content is added only when the indexing / synthesis is itself proposed in the literature"* — read as also prohibiting the substrate from surfacing patterns and gaps that emerge from the configuration of literature-anchored content. But the patterns and gaps are *not* substrate content; they are substrate outputs. Mendeleev's empty cells at positions 31, 32, and 21 weren't proposed in any chemistry paper; they emerged from organization meeting content. A project that calls itself a Mendeleev-style periodic table cannot prohibit this emergence — it is the tool's central function.

**Corrected position.** Content entering the substrate is literature-anchored (this is what the firewall and §4 admissibility test bind). Organizational structure connecting content — formal classifications, axes, cross-classification edges — is the project's contribution. Patterns and gaps emerging when organization meets content are first-class substrate outputs, neither invented nor literature-required. The firewall binds *authoring decisions*; configuration-time emergence is not an authoring decision and the §2.5 self-check does not apply to it.

**Self-check.** A session detects this drift in its own output by asking: am I treating an emergent property of the substrate's organization as if it required prior literature endorsement? If yes — and especially if the emergent property is a pattern or a gap surfaced by the configuration of literature-anchored cells — the drift is active. The correction is to recognize the emergent property as substrate output and proceed.

**Caught.** Conversation 2026-05-29 P0 sub-PR, the `conjectured-by-pattern: 0` finding. A fresh chat reading the un-corrected literature-anchoring principle concluded the workstream would be "advertising something the data doesn't back." The contradiction was resolved in conversation by recognizing that the schema field `conjectured-by-pattern` is meant to populate at configuration time (when the tool surfaces a gap), not at content-authoring time. The corrected reading: zero cell-level entries today is correct under the corrected principle, because the configuration-builder that generates the entries is the E0 work itself.

**Landed.** `META_v21_1_methodology_firewall.md` §8 (content / organization distinction at the firewall layer); `MENDELEEV_POSITIONING_HANDOFF.md` §7 rewrite (corrected literature-anchoring principle); `MENDELEEV_FRAME.md` redraft (M1 mode-3 leading; configuration-builder as the central Mendeleev surface; `conjectured-by-pattern` cells as substrate outputs rendered at query time). All three land in P0' sub-PR (this register's creation) and P0'' sub-PR (the frame doc redraft).

---

## Entry 2 — process drift: citing docs without reading them

**Drift pattern.** A session cites methodology docs by name and produces fluent, plausible-sounding analysis grounded in what the docs' titles suggest they contain — without having actually opened and read the docs.

**Failure mode.** The conversation reads authoritatively. The maintainer trusts citations and reasoning until a downstream contradiction surfaces (e.g., the session's claim about a doc's §7 doesn't match §7's actual text). At that point the whole conversation's substantive grounding is in question, because the session was pattern-matching on doc titles rather than building on doc content. Especially likely in projects with many methodology docs whose names suggest their content — an LLM session can produce plausible summaries from the names alone, and the summaries can be wrong in ways that don't surface until the maintainer pushes back.

**Corrected position.** Sessions read the docs they cite. The §0 state-verification ritual is the right place to make this operational. The verification's pass condition is not "the session has fetched the doc"; it is "the session can quote a load-bearing sentence from the doc back to the user, in the session's own message, before proceeding to substantive analysis." A session that hasn't actually read the doc cannot produce the quote.

**Self-check.** Before citing a methodology doc, the session asks: am I working from text I've read, or from inference about what the doc must contain based on its title? If the latter, open the doc. If the doc is not accessible (not in project files, not fetchable), say so explicitly and decline to cite it rather than produce inferred content.

**Caught.** Conversation 2026-05-29 P0 sub-PR, a fresh-chat parallel session that confidently cited `MENDELEEV_POSITIONING_HANDOFF.md` without having opened it. The session admitted the failure on maintainer pushback, fetched the doc, and the analysis sharpened materially once it was working from actual text. The lag between citation and reading was the substantive grounding gap.

**Landed.** All sub-PR kickoff prompts (P0'', E0, M0, future sub-PRs) updated to include a quote-back step in §0: before producing any substantive analysis, the session quotes one load-bearing sentence from each methodology doc the prompt names, in its own message to the user. The P0'' kickoff prompt drafted in this sub-PR includes the revision; the maintainer applies the same pattern to future kickoff prompts.

---

*End of DRIFT_PATTERN_REGISTER.md, initial creation in P0' sub-PR (2026-05-29) with two entries. Maintained per the discipline named in "How to use this register": every methodology-revision sub-PR is responsible for proposing new entries.*
