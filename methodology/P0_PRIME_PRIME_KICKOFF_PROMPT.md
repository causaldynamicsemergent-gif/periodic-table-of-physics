# P0'' kickoff prompt — redrafting MENDELEEV_FRAME.md against the corrected methodology

**What this is.** A standalone session-starter prompt for opening a fresh Claude chat to do the P0'' sub-PR (frame doc redraft). Paste the block below into a new chat in the project. The chat's project files should already include the four files shipped by P0' (`DRIFT_PATTERN_REGISTER.md`, the updated `META_v21_1_methodology_firewall.md` with §8, the updated `MENDELEEV_POSITIONING_HANDOFF.md` with the §7 rewrite, and this file).

**When to use.** Once P0' has shipped — i.e., the firewall §8 addition has been applied, the handoff §7 rewrite has been applied, the drift register has been committed to `/methodology/`, and all three are attached to project knowledge.

---

## The prompt

```
Pick up sub-PR P0'' from MENDELEEV_POSITIONING_HANDOFF.md (the corrected
handoff after P0'): redraft MENDELEEV_FRAME.md against the corrected
methodology.

Background. The original P0 chat drafted MENDELEEV_FRAME.md against an
un-corrected version of the literature-anchoring principle. The principle as
originally stated read as prohibiting the substrate from surfacing patterns
and gaps that emerge at configuration time — which would have foreclosed the
project's central Mendeleev move. P0' sub-PR corrected this at two layers:
META_v21_1_methodology_firewall.md gained §8 (content / organization
distinction), and MENDELEEV_POSITIONING_HANDOFF.md §7 was rewritten. A drift
register (DRIFT_PATTERN_REGISTER.md) was created with two entries: one for
the content drift just named, one for a process drift (sessions citing docs
they haven't read). This sub-PR (P0'') redrafts the frame doc against the
corrected methodology.

What survives from the original P0 frame doc (preserve in the redraft):
  - The configuration-space framing in §1: the substrate is a network of
    projections connected by derivational structure, not a single table.
  - M1 operating in three modes (named-frontier-first, pairwise-comparison,
    multi-face-configuration).
  - The focus-not-filter discipline for constructed configurations.
  - The §7 explorer architecture commitment (parallel views, comparison
    panel, configuration builder, derivation-edge audit flagged).
  - The four binding disciplines in §8 (firewall, §4 admissibility test,
    literature-anchoring principle, positioning frame).
  - Worked instances for M2 (critical-systems ↔ CFT-bootstrap), M3 (SU(5)
    GUT program), M4 (strong-CP problem's two-channel resolver coverage).

What needs rework against the corrected methodology:
  - M1's mode hierarchy reverses. The original draft had mode-1
    (named-frontier-first) as load-bearing and treated mode-3 (multi-face
    configuration) as derivative. Under the corrected literature-anchoring
    principle, mode-3 IS the most Mendeleev-faithful M1 move (Mendeleev
    himself didn't have a "named frontier"; the empty cells emerged from
    the configuration he constructed). Mode-3 leads in the redraft, with
    mode-1 as a special case (the named open-frontier is the configuration
    the physicist arrives with already constructed).
  - The configuration-builder is the substrate's central Mendeleev surface,
    not a subsequent sub-PR after parallel-views and comparison-panel ship.
    The §7 architecture commitment is updated accordingly.
  - The conjectured-by-pattern schema field's zero-population is correct
    under the corrected principle, not "architecturally supported but
    empirically rare." The redraft says so explicitly: the field populates
    at configuration time when the substrate's tooling surfaces a gap, not
    at content-authoring time. The current zero-count is correct because
    the configuration-builder that generates the entries is the EM0 work
    itself.
  - Mendeleev worked example replaces hierarchy-problem as the worked
    instance for M1's lead description. Hierarchy-problem becomes the
    mode-1 worked instance (a named open-frontier with the configuration
    pre-given by the structural neighborhood the substrate already encodes).
    The mode-3 worked instance is a constructed configuration — the
    matter-vs-gravity-vs-light or stellar-emission-vs-particle-content cases
    surfaced in the P0 conversation are candidates; the redraft picks the
    sharpest one and walks through how the configuration is constructed and
    what gap emerges.

Before drafting, do five things in order:

1. Run the §0 state-verification ritual from MENDELEEV_POSITIONING_HANDOFF.md.
   Call server_info on the MCP. Open the live explorer URL. Confirm
   /mnt/project/ lists the corrected firewall, the corrected handoff, the
   drift register, this prompt, and the other reference docs
   (EXPLORER_PHASE_BC_HANDOFF.md, PHYSICIST_FACING_VOCABULARY.md,
   PREDICTIVE_LAYER_PHASE_C_HANDOFF.md, TRACK_4_USE_SIDE_ARTIFACTS.md).

2. Read DRIFT_PATTERN_REGISTER.md in full FIRST, before any other doc. Both
   entries (content drift on substrate outputs; process drift on citing
   docs without reading them) are load-bearing for this sub-PR. Quote one
   load-bearing sentence from each entry back to the user, in your own
   message, before proceeding. This is the §0 verification's quote-back step.

3. Read META_v21_1_methodology_firewall.md §8 (the new section P0'
   added) and MENDELEEV_POSITIONING_HANDOFF.md §7 (the rewritten section
   P0' produced) in full. Quote one load-bearing sentence from §8 and one
   from §7 back to the user. The quote-back is operational, not ceremonial:
   it verifies that you have actually read the docs you will be working
   from. A session that cannot produce the quote has not read the doc.

4. Verify each of the four moves against current data — the same exercise
   the original P0 prompt prescribed, but with the corrected M1 framing:

   - M1 (mode-3 lead, substrate-output): the worked instance is a
     constructed configuration. Use list_nodes / find_cross_classification /
     find_cells / compare_classifications to scope out which configuration
     gives the sharpest mode-3 demonstration. Two candidates from the P0
     conversation: matter-vs-gravity (e.g., dark-matter-candidates +
     compact-astrophysical-objects + sm-rep-content along a
     gravitational-interaction axis) and stellar-emission-vs-particle-content
     (electromagnetic-phenomena + sm-rep-content + compact-astrophysical-objects).
     Run the queries; record what cells the substrate already has at the
     relevant intersections; identify the gap or pattern the constructed
     configuration surfaces; note which surrounding cells' literature-anchored
     content the gap's properties can be derived from.

   - M1 (mode-1 worked instance, substrate-contained): hierarchy-problem.
     Same as the original P0 worked instance, but reframed as the special
     case where the configuration is pre-given by the structural
     neighborhood the substrate already encodes (bears-on edges,
     candidate_targeting, if_real_implies). get_node on hierarchy-problem;
     record what the node carries.

   - M2 (substrate-enabled): edge-xc-crit-specializes-bootstrap. Same as
     the original P0 worked instance.

   - M3 (substrate-enabled): su5-gut-program (architecture node with
     empirical_status: candidate-foundational, NOT totality-approach as the
     un-corrected handoff parenthetically suggested). Same worked instance
     as the original P0; re-verify with find_targets_of_program.

   - M4 (substrate-contained): strong-cp-problem's dual-channel resolvers
     (axion-haloscope-network + edm-program). Same as original P0;
     re-verify with find_resolvers.

5. Read PHYSICIST_FACING_VOCABULARY.md §3 (the translation register) before
   drafting physicist-facing prose paragraphs in the redraft. The vocabulary
   discipline applies to every physicist-facing surface.

Then propose the redraft outline for maintainer review before drafting the
full text. The outline should name:
  - §1 the substrate-as-configuration-space framing (carries from P0,
    extended to name patterns and gaps as substrate outputs per the
    corrected §7).
  - §2 M1 with mode-3 leading: configuration-builder as the substrate's
    central Mendeleev surface; mode-1 as a special case where the
    configuration is pre-given by the open-frontier's structural
    neighborhood; mode-2 as the pairwise intermediate. The conjectured-by-
    pattern schema field's zero-population is named explicitly as correct
    under the corrected principle.
  - §3 M2 as M1's toolkit (carries from P0).
  - §4 M3 (carries from P0; architecture nodes with empirical_status:
    candidate-foundational, not totality-approach).
  - §5 M4 (carries from P0).
  - §6 the ordering principle (carries from P0; M1 leads).
  - §7 explorer architecture commitment, updated: configuration builder is
    primary, not subsequent. Parallel views still apply but the
    configuration builder is the load-bearing surface for the Mendeleev
    move. Derivation-edge audit still flagged.
  - §8 the four binding disciplines (carries from P0; both §7 and §8 now
    cross-reference DRIFT_PATTERN_REGISTER.md).
  - §9 closing note (carries from P0).

Wait for confirmation on the outline before writing the full text.

Deliverable: /methodology/MENDELEEV_FRAME.md (replacing the P0 draft, which
was built on the un-corrected methodology). Target length: 1500–2000 words.
The P0 draft ran 3272 words; the redraft compresses by tightening prose,
not by cutting load-bearing content. Each section leads with the periodic-
table analog, names whether the move is substrate-contained or substrate-
enabled (with substrate-output as a third explicit category for patterns
and gaps emerging at configuration time, per the corrected §7), names the
project surfaces and tools that support the move, includes a physicist-
facing prose paragraph the downstream surfaces can quote or adapt directly,
and notes the project-internal vocabulary prior surfaces used.

Do not paraphrase content from existing docs — quote where appropriate,
reframe where the prose surface differs. The firewall + §4 admissibility
test bind content authoring; the corrected literature-anchoring principle
binds substrate additions while admitting substrate-output emergence at
configuration time; this doc binds the positioning prose. The four
disciplines are independent and all must hold.

If at any point in this work you find yourself citing one of the
methodology docs and you have not opened and read it in this session, stop
and read it before continuing. DRIFT_PATTERN_REGISTER.md Entry 2 is the
correction for the failure mode where a session cites docs by name without
reading them. The quote-back step is the operational check; if you cannot
quote from the doc, you have not read it.
```

---

## What this prompt is doing

Five points of contrast with the original P0 kickoff prompt:

**1. The §0 verification now has a quote-back step.** Reading the doc is operationalized as quoting from it back to the user. This catches the process drift (Entry 2 in the register) before it can affect substantive work. The original P0 prompt named the docs to read but didn't make reading them operational.

**2. The drift register is read first, before any other methodology doc.** The register's entries name the corrections to the methodology corpus the session needs to apply. Reading it first means the session is working from the corrected positions before it engages with the docs that may carry residual un-corrected language.

**3. The corrected M1 framing is named explicitly.** The original P0 prompt asked the fresh chat to "name one conjectured example" — which failed on contact with the data. The P0'' prompt corrects the framing upstream of the verification queries: mode-3 leads, the conjectured-by-pattern zero-count is correct, the configuration-builder is what generates entries.

**4. Substrate-output is named as a third explicit category** alongside substrate-contained and substrate-enabled. The P0 draft had substrate-output implicit; the redraft makes it explicit, which the §7 architecture commitment depends on (the configuration-builder produces substrate outputs, not substrate inputs).

**5. The closing instruction names the process drift directly.** A session that finds itself citing a doc without reading it stops and reads. The register's Entry 2 is the structural reason; the quote-back is the operational check.

---

## After P0'' ships

The follow-up sub-PRs (EM0 lead and M0 lead) need their own kickoff prompts, drafted after P0'' produces the corrected frame doc. Both should apply the same §0 template (state verification + drift register read + methodology doc read + quote-back), since the process drift correction binds going forward.

The EM0 kickoff prompt I drafted earlier in the P0 conversation is now stale — it was written against the un-corrected methodology. When EM0 starts, draft a fresh kickoff prompt against the corrected frame doc + corrected methodology + drift register.

---

*End of P0_PRIME_PRIME_KICKOFF_PROMPT.md, drafted 2026-05-29 in P0' sub-PR alongside the methodology revisions it makes operational. Paste the prompt block into a fresh Claude chat once P0' has shipped (firewall §8 added, handoff §7 rewritten, drift register committed, all attached to project knowledge).*
