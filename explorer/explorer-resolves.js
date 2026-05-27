// =============================================================
//   explorer-resolves.js
//
//   Sub-PR E2 (initial) + sub-PR E4 (refactor):
//   Renders the 38 Phase C `resolves` edges (Step 4.4) linking
//   experimental programs to the cells, open frontiers, or
//   totality-approach nodes they address.
//
//   Two surfaces are exposed:
//
//     • renderResolvesFromProgram(programId)
//         The "Resolves" section appearing inside an experimental-program
//         card (between Produces classifications and Key publications).
//         Lists every target this program addresses, with sensitivity,
//         timeline, optional bounds-setting pill, optional competing
//         predictions block, and the full description prose.
//
//     • renderTargetedByTarget(targetId)
//         The "Targeted by" section appearing inside the cell card and
//         the open-frontier / totality-approach discourse cards. Lists
//         every program with documented reach for the selected target,
//         same fields as above but with the arrow reversed.
//
//   Indexes consumed: DATA.resolves_by_program, DATA.resolves_by_target,
//   DATA.cell_id_to_fc_id — all built in explorer-data.js.
//
//   Sub-PR E4 — the minimal-inline formatQS that this module shipped
//   in E2 has been absorbed into explorer-qs.js as the reusable
//   component renderQS. This module is now a consumer: the sensitivity
//   line and the competing-predictions predicted_value cells both call
//   renderQS directly. The change is class-name + semantics only;
//   visual treatment is preserved. See explorer-qs.js for the contract.
//
//   Vocabulary discipline (PHYSICIST_FACING_VOCABULARY.md §3, §4):
//   no schema field names appear in UI text. "Bounds-setting" instead
//   of "exclusion_only", "Competing predictions" instead of
//   "predictions_per_program", physicist-natural symbols (≳ ≲ =) for
//   bound directions, "Reach:" prefix on sensitivity lines.
// =============================================================

// =============================================================
//   Display tables (physicist-facing)
// =============================================================
const TIMELINE_LABELS = {
  'running':          'running',
  'planned-by-2030':  'planned by 2030',
  'planned-by-2035':  'planned by 2035',
  'proposed':         'proposed',
};

// =============================================================
//   Citation list (collapsible-feeling, just a small block)
//
//   Resolves-specific wrapper around the qs-citation rendering.
//   Kept here because the resolves row's container CSS hooks on
//   .dc-resolves-citations / .dc-resolves-citation (row layout
//   chrome, not qs-atom). The actual citation rendering style is
//   unified across surfaces in update-e4.css.
// =============================================================
function renderResolvesCitations(citations) {
  if (!citations || !citations.length) return '';
  return `<div class="dc-resolves-citations">${citations.map(c =>
    `<div class="dc-resolves-citation">${esc(c)}</div>`
  ).join('')}</div>`;
}

// =============================================================
//   Competing-predictions block (predictions_per_program)
//
//   Inline list (E2 default — option (a) from the proposal).
//   Each row: program label · value display · description.
//   The predicted_value field is itself a quantitative_scale record,
//   so it goes through renderQS like every other qs surface.
// =============================================================
function renderCompetingPredictions(ppp) {
  if (!ppp || !ppp.length) return '';
  return `
    <div class="dc-resolves-ppp">
      <div class="dc-resolves-ppp-head">Competing predictions <span class="dx-section-ct">· ${ppp.length}</span></div>
      ${ppp.map(p => `
        <div class="dc-resolves-ppp-row">
          <div class="dc-resolves-ppp-program">${esc(p.program || '')}</div>
          ${p.predicted_value ? `<div class="dc-resolves-ppp-value">${renderQS(p.predicted_value, {})}</div>` : ''}
          ${p.description ? `<div class="dc-resolves-ppp-desc">${esc(p.description)}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// =============================================================
//   Target pill — resolves "→ target" or "← program" head.
//
//   The target side: a cell id, a frontier id, or a totality-approach id.
//   Cell ids deep-link via [data-fc-cell-jump]; node ids via [data-disc-jump].
// =============================================================
function renderResolvesTargetPill(targetId) {
  if (!targetId) return '';
  // Cell? Look up the owning FC via DATA.cell_id_to_fc_id.
  const fcId = (DATA && DATA.cell_id_to_fc_id) ? DATA.cell_id_to_fc_id[targetId] : null;
  if (fcId && FC_BY_ID && FC_BY_ID[fcId]) {
    const fc = FC_BY_ID[fcId];
    // Lift the cell's content for the pill label if findable; otherwise the cell id.
    let label = targetId;
    const cell = (fc.cells || []).find(c => c.cell_id === targetId);
    if (cell && cell.content) label = cell.content;
    return `<button type="button" class="dx-cell-pill"
      data-fc-cell-jump="${esc(fcId)}|${esc(targetId)}"
      title="${esc(targetId)} · ${esc(fc.label || fcId)}">${esc(label)}</button>`;
  }
  // Otherwise a discourse-node (open-frontier or totality-approach).
  if (DATA && DATA.discourse_by_id && DATA.discourse_by_id[targetId]) {
    return renderDiscoursePill(targetId);
  }
  // Fallback (should be unreachable on clean data).
  return `<span class="dx-disc-pill dx-disc-pill-unknown">${esc(targetId)}</span>`;
}

// =============================================================
//   Program pill — for the "← Program" head on the target side.
//   Always a discourse-node pill.
// =============================================================
function renderResolvesProgramPill(programId) {
  if (!programId) return '';
  if (DATA && DATA.discourse_by_id && DATA.discourse_by_id[programId]) {
    return renderDiscoursePill(programId);
  }
  return `<span class="dx-disc-pill dx-disc-pill-unknown">${esc(programId)}</span>`;
}

// =============================================================
//   One row — shared between the program-card "Resolves" section
//   and the target-card "Targeted by" section.
//
//   side: 'from-program' → arrow points to the target
//         'from-target'  → arrow points back to the program
// =============================================================
function renderResolvesRow(edge, side) {
  const arrow = side === 'from-program' ? '→' : '←';
  const headPill = side === 'from-program'
    ? renderResolvesTargetPill(edge.to)
    : renderResolvesProgramPill(edge.from);

  // Timeline pill — every resolves edge has a timeline.
  const timelineLabel = TIMELINE_LABELS[edge.timeline] || edge.timeline || '';
  const timelinePill = timelineLabel
    ? `<span class="dx-pill dx-timeline-pill" title="Operational timeline">${esc(timelineLabel)}</span>`
    : '';

  // Bounds-setting pill — only when exclusion_only is explicitly true.
  // (Edges with exclusion_only:false or absent are measurement-discriminating;
  // the competing-predictions block below makes that visible.)
  const boundsPill = edge.exclusion_only === true
    ? `<span class="dx-pill dx-bound-pill" title="This program sets a bound rather than measuring a value">Bounds-setting</span>`
    : '';

  // Sensitivity line — "Reach:" prefix + value display via renderQS.
  // The first citation list is shown via renderResolvesCitations (which
  // hooks on the resolves-row container chrome).
  let sensitivityBlock = '';
  if (edge.sensitivity) {
    sensitivityBlock = `
      <div class="dc-resolves-sensitivity">
        ${renderQS(edge.sensitivity, { prefix: 'Reach: ' })}
      </div>
      ${renderResolvesCitations(edge.sensitivity.citations)}
    `;
  }

  // Description prose — long-form per the v18 spec. Kept verbatim (no
  // paraphrase per the load-bearing rule); rendered through formatPara
  // so any $...$ math segments render via KaTeX.
  const desc = edge.description
    ? `<div class="dc-resolves-desc">${formatPara(edge.description)}</div>`
    : '';

  // Competing predictions (predictions_per_program).
  const ppp = renderCompetingPredictions(edge.predictions_per_program);

  return `
    <div class="dc-resolves-row">
      <div class="dc-resolves-head">
        <span class="dc-resolves-arrow">${arrow}</span>
        ${headPill}
        ${timelinePill}
        ${boundsPill}
      </div>
      ${sensitivityBlock}
      ${desc}
      ${ppp}
    </div>
  `;
}

// =============================================================
//   Section renderers — the two public exports
// =============================================================
function renderResolvesFromProgram(programId) {
  const edges = (DATA && DATA.resolves_by_program && DATA.resolves_by_program[programId]) || [];
  if (!edges.length) return '';
  return `
    <div class="sidebar-section">
      <h3>Resolves <span class="dx-section-ct">· ${edges.length}</span></h3>
      <div class="sec-sub">Targets this program addresses, with the experimental reach committed in the program's design report and the expected timeline.</div>
      <div class="dc-resolves-list">${edges.map(e => renderResolvesRow(e, 'from-program')).join('')}</div>
    </div>
  `;
}

function renderTargetedByTarget(targetId) {
  const edges = (DATA && DATA.resolves_by_target && DATA.resolves_by_target[targetId]) || [];
  if (!edges.length) return '';
  return `
    <div class="sidebar-section">
      <h3>Targeted by <span class="dx-section-ct">· ${edges.length}</span></h3>
      <div class="sec-sub">Experimental programs with documented reach for this target.</div>
      <div class="dc-resolves-list">${edges.map(e => renderResolvesRow(e, 'from-target')).join('')}</div>
    </div>
  `;
}
