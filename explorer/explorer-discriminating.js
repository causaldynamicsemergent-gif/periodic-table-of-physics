// =============================================================
//   explorer-discriminating.js
//
//   Sub-PR E7 — the discriminating-experiments lookup view.
//
//   Two surfaces:
//
//     • renderSidebarDiscriminatingCatalogue()
//         Default state of the panel. Lists every pair of
//         experimental programs that shares at least one target
//         through the catalogue's resolves edges, sorted by
//         number of shared targets (descending). Each pair is
//         one row with a one-line summary of what kinds of
//         shared coverage the pair has.
//
//     • renderSidebarDiscriminatingPair(pairId)
//         Per-pair view. Two-column side-by-side comparison of
//         the two programs' commitments at every shared target,
//         classified into one of four physics-categories
//         (competing-prediction adjudication, orthogonal-channel
//         measurement, complementary reach, shared coverage).
//         For competing-prediction-adjudication targets, the
//         shared competing-prediction list renders once below
//         the two columns rather than duplicating per side.
//
//   Indexes consumed (built in explorer-data.js):
//     - DATA.discriminating_pairs            — sorted array of pairs
//     - DATA.discriminating_pairs_by_id      — lookup by 'a|b' id
//     - DATA.discriminating_pairs_by_program — pairs per program
//     - DATA.cell_id_to_fc_id                — cell → FC for deep-links
//     - DATA.discourse_by_id                 — program / frontier lookup
//     - FC_BY_ID                             — FC label lookup
//
//   Vocabulary discipline (PHYSICIST_FACING_VOCABULARY.md §3, §4):
//   no schema field names appear in UI text. The four classifier
//   labels are short physicist-natural phrases. The four classifier
//   blurbs are generic one-sentence explanations of the category
//   (not per-pair hand-curated prose; that would push project
//   content into the presentation layer and violate the firewall).
//   The actual physics-content of each pair lives in the edge
//   descriptions, which are rendered verbatim from the canonical
//   data file.
// =============================================================

// =============================================================
//   Classifier metadata — labels, icons, blurbs, CSS pill class
//   The blurbs explain what the category means in physics terms;
//   they describe structure already present in the data (the
//   exclusion_only state and the presence/absence of competing
//   predictions on each edge), they do not add content claims.
// =============================================================
const DISCRIMINATING_CLASSIFIERS = {
  'competing-prediction-adjudication': {
    label: 'Competing-prediction adjudication',
    short: 'competing-prediction adjudication',
    icon: '⚖',
    blurb: 'Both programs target the same channel, and competing theoretical programs publish different predicted values for that channel. The experiments adjudicate between the competing predictions by measuring the channel directly.',
    pillClass: 'dc-cls-pill dc-cls-competing',
    sortKey: 0,
  },
  'orthogonal-channel-measurement': {
    label: 'Orthogonal-channel measurement',
    short: 'orthogonal-channel measurement',
    icon: '↹',
    blurb: 'Both programs measure the same physical parameter through different physical channels. The parameter has a single value that nature has fixed; each program approaches it independently, and the measurements are mutually validating rather than mutually discriminating.',
    pillClass: 'dc-cls-pill dc-cls-orthogonal',
    sortKey: 2,
  },
  'complementary-reach': {
    label: 'Complementary reach',
    short: 'complementary reach',
    icon: '⊕',
    blurb: 'The programs probe the same open question through complementary physical channels. Their reaches combine to cover the parameter space more thoroughly than either could alone — one constraint from one channel, another from a different channel, jointly tightening the picture.',
    pillClass: 'dc-cls-pill dc-cls-complementary',
    sortKey: 1,
  },
  'shared-coverage': {
    label: 'Shared coverage',
    short: 'shared coverage',
    icon: '◇',
    blurb: 'Both programs address the same target. The detailed relationship between their measurements is captured in the per-program descriptions below.',
    pillClass: 'dc-cls-pill dc-cls-shared',
    sortKey: 3,
  },
};

// =============================================================
//   Helpers
// =============================================================
function getProgramNode(programId) {
  return (DATA && DATA.discourse_by_id) ? DATA.discourse_by_id[programId] : null;
}

function programOperationalLabel(node) {
  if (!node || !node.operational_period) return '';
  // Reuse the same formatter as the program card if available
  if (typeof formatOperationalPeriod === 'function') {
    const { text } = formatOperationalPeriod(node.operational_period);
    return text || '';
  }
  // Fallback (should be unreachable when explorer-discourse.js is loaded)
  return '';
}

function programSubtypeLabel(node) {
  if (!node) return '';
  // PROGRAM_SUBTYPE_LABELS is defined in explorer-discourse.js
  if (typeof PROGRAM_SUBTYPE_LABELS !== 'undefined' && node.subtype) {
    return PROGRAM_SUBTYPE_LABELS[node.subtype] || node.subtype;
  }
  return node.subtype || '';
}

// Target display name — for a cell, lift cell.content; for a frontier
// or totality-approach, use the discourse node's label.
function targetDisplayName(targetId) {
  if (!targetId) return '';
  const fcId = (DATA && DATA.cell_id_to_fc_id) ? DATA.cell_id_to_fc_id[targetId] : null;
  if (fcId && typeof FC_BY_ID !== 'undefined' && FC_BY_ID[fcId]) {
    const fc = FC_BY_ID[fcId];
    const cell = (fc.cells || []).find(c => c.cell_id === targetId);
    if (cell && cell.content) return cell.content;
  }
  const node = (DATA && DATA.discourse_by_id) ? DATA.discourse_by_id[targetId] : null;
  if (node && node.label) return node.label;
  return targetId;
}

// Target context name — for a cell, the owning FC label; for a frontier
// or totality-approach, a one-word type indicator. Used as small
// secondary label under the main target name.
function targetContextLabel(targetId) {
  if (!targetId) return '';
  const fcId = (DATA && DATA.cell_id_to_fc_id) ? DATA.cell_id_to_fc_id[targetId] : null;
  if (fcId && typeof FC_BY_ID !== 'undefined' && FC_BY_ID[fcId]) {
    const fc = FC_BY_ID[fcId];
    return fc.label || fcId;
  }
  const node = (DATA && DATA.discourse_by_id) ? DATA.discourse_by_id[targetId] : null;
  if (node) {
    if (node.type === 'open-frontier') return 'open frontier';
    if (node.type === 'totality-approach') return 'totality approach';
  }
  return '';
}

// Pill that opens the target's full card (cell or discourse node)
function discriminatingTargetPill(targetId) {
  if (!targetId) return '';
  const fcId = (DATA && DATA.cell_id_to_fc_id) ? DATA.cell_id_to_fc_id[targetId] : null;
  const name = targetDisplayName(targetId);
  const ctx = targetContextLabel(targetId);
  if (fcId) {
    return `<button type="button" class="dx-cell-pill dc-pair-target-pill"
      data-fc-cell-jump="${esc(fcId)}|${esc(targetId)}"
      title="Open ${esc(name)} in its formal classification">${esc(name)}${ctx ? ` <span class="dc-pair-target-pill-ctx">· ${esc(ctx)}</span>` : ''}</button>`;
  }
  // Discourse-node target (open-frontier / totality-approach)
  if (DATA && DATA.discourse_by_id && DATA.discourse_by_id[targetId]) {
    if (typeof renderDiscoursePill === 'function') {
      // renderDiscoursePill produces the standard discourse pill; wrap
      // it so we can attach the context tag
      const inner = renderDiscoursePill(targetId);
      return `<span class="dc-pair-target-pill-wrap">${inner}${ctx ? `<span class="dc-pair-target-pill-ctx"> · ${esc(ctx)}</span>` : ''}</span>`;
    }
    return `<button type="button" class="dx-disc-pill"
      data-disc-jump="${esc(targetId)}">${esc(name)}</button>`;
  }
  return `<span class="dx-disc-pill dx-disc-pill-unknown">${esc(targetId)}</span>`;
}

// Pill that opens the program's discourse card
function discriminatingProgramPill(programId) {
  if (!programId) return '';
  if (typeof renderDiscoursePill === 'function') {
    return renderDiscoursePill(programId);
  }
  const node = getProgramNode(programId);
  const label = (node && node.label) || programId;
  return `<button type="button" class="dx-disc-pill"
    data-disc-jump="${esc(programId)}">${esc(label)}</button>`;
}

// =============================================================
//   Per-program column — sensitivity + timeline + bounds + description
//
//   Strip-down of the resolves-row used by explorer-resolves.js:
//   the target pill and the directional arrow are not repeated
//   (the per-pair view shows them once at the section head), and
//   the competing-predictions block is rendered ONCE outside the
//   two columns rather than twice (PPP lists are program-identical
//   across pair-edges; see PROJECT_NEXT_STEPS.md §5.14 substrate
//   inventory).
// =============================================================
function renderPairColumn(edge, programId) {
  if (!edge) {
    return `<div class="dc-pair-col dc-pair-col-empty">No documented coverage from this program.</div>`;
  }
  const programPill = discriminatingProgramPill(programId);

  const timelineLabel = (typeof TIMELINE_LABELS !== 'undefined' && TIMELINE_LABELS[edge.timeline])
    ? TIMELINE_LABELS[edge.timeline]
    : (edge.timeline || '');
  const timelinePill = timelineLabel
    ? `<span class="dx-pill dx-timeline-pill" title="Operational timeline">${esc(timelineLabel)}</span>`
    : '';

  const boundsPill = edge.exclusion_only === true
    ? `<span class="dx-pill dx-bound-pill" title="This program sets a bound rather than measuring a value">Bounds-setting</span>`
    : '';

  let sensitivityBlock = '';
  if (edge.sensitivity && typeof renderQS === 'function') {
    sensitivityBlock = `<div class="dc-pair-col-sensitivity">${renderQS(edge.sensitivity, { prefix: 'Reach: ' })}</div>`;
    if (edge.sensitivity.citations && edge.sensitivity.citations.length) {
      sensitivityBlock += `<div class="dc-pair-col-citations">${edge.sensitivity.citations.map(c =>
        `<div class="dc-pair-col-citation">${esc(c)}</div>`).join('')}</div>`;
    }
  }

  const desc = edge.description
    ? `<div class="dc-pair-col-desc">${(typeof formatPara === 'function') ? formatPara(edge.description) : esc(edge.description)}</div>`
    : '';

  return `
    <div class="dc-pair-col">
      <div class="dc-pair-col-head">
        <span class="dc-pair-col-arrow">←</span>
        ${programPill}
      </div>
      <div class="dc-pair-col-pills">
        ${timelinePill}
        ${boundsPill}
      </div>
      ${sensitivityBlock}
      ${desc}
    </div>
  `;
}

// =============================================================
//   Shared competing-prediction block — renders once per target
//   for competing-prediction-adjudication classifier targets.
//
//   The PPP arrays on the two pair-edges carry the same theoretical-
//   program entries with the same predicted values (the predictions
//   belong to the theoretical programs, not the experimental
//   programs). Per-program description narration sometimes substitutes
//   the experimental program's name; the shared block uses edge A's
//   descriptions and notes the source in a small footnote.
// =============================================================
function renderSharedCompetingPredictions(edgeA, edgeB, programA, programB) {
  const ppp = (edgeA && edgeA.predictions_per_program) || [];
  if (!ppp.length) return '';
  const progANode = getProgramNode(programA);
  const progBNode = getProgramNode(programB);
  const progALabel = (progANode && progANode.label) || programA;
  const progBLabel = (progBNode && progBNode.label) || programB;
  return `
    <div class="dc-pair-shared-ppp">
      <div class="dc-pair-shared-ppp-head">Competing theoretical predictions both programs adjudicate <span class="dx-section-ct">· ${ppp.length}</span></div>
      ${ppp.map(p => `
        <div class="dc-pair-shared-ppp-row">
          <div class="dc-pair-shared-ppp-program">${esc(p.program || '')}</div>
          ${p.predicted_value && typeof renderQS === 'function' ? `<div class="dc-pair-shared-ppp-value">${renderQS(p.predicted_value, {})}</div>` : ''}
          ${p.description ? `<div class="dc-pair-shared-ppp-desc">${(typeof formatPara === 'function') ? formatPara(p.description) : esc(p.description)}</div>` : ''}
        </div>
      `).join('')}
      <div class="dc-pair-shared-ppp-footnote">Both programs publish these predictions in their design reports with the same theoretical entries and predicted values. Phrasing rendered above is from the <strong>${esc(progALabel)}</strong> side; the <strong>${esc(progBLabel)}</strong> card carries program-specific narration on each entry.</div>
    </div>
  `;
}

// =============================================================
//   One shared-target section — head + columns + (optional) shared
//   competing-predictions block.
// =============================================================
function renderPairTargetSection(stRow, programA, programB) {
  const cls = DISCRIMINATING_CLASSIFIERS[stRow.classifier] || DISCRIMINATING_CLASSIFIERS['shared-coverage'];
  const classifierPill = `<span class="${cls.pillClass}" title="${esc(cls.short)}">${esc(cls.icon)} ${esc(cls.label)}</span>`;
  const targetPill = discriminatingTargetPill(stRow.targetId);
  // Competing-predictions block (only for competing-prediction-adjudication)
  const sharedPPP = (stRow.classifier === 'competing-prediction-adjudication')
    ? renderSharedCompetingPredictions(stRow.edgeA, stRow.edgeB, programA, programB)
    : '';
  return `
    <div class="dc-pair-target">
      <div class="dc-pair-target-head">
        <div class="dc-pair-target-pillrow">${targetPill}${classifierPill}</div>
        <div class="dc-pair-target-blurb">${esc(cls.blurb)}</div>
      </div>
      <div class="dc-pair-cols">
        ${renderPairColumn(stRow.edgeA, programA)}
        ${renderPairColumn(stRow.edgeB, programB)}
      </div>
      ${sharedPPP}
    </div>
  `;
}

// =============================================================
//   Catalogue panel — default state, lists all pairs
// =============================================================
function renderSidebarDiscriminatingCatalogue() {
  const inner = document.getElementById('sidebar-inner');
  // UX pass — entering the catalogue clears any pair highlight on the map.
  if (typeof setTileSpotlight === 'function') setTileSpotlight([]);
  const pairs = (DATA && DATA.discriminating_pairs) || [];
  if (!pairs.length) {
    inner.innerHTML = `
      <div class="sidebar-section">
        <h3>Compare programs</h3>
        <div class="dc-pair-empty">No program pairs with documented shared coverage are recorded in the current dataset.</div>
      </div>
    `;
    return;
  }
  const rows = pairs.map(p => {
    const aNode = getProgramNode(p.progA);
    const bNode = getProgramNode(p.progB);
    const aLabel = (aNode && aNode.label) || p.progA;
    const bLabel = (bNode && bNode.label) || p.progB;
    // Compact one-line classifier summary, ordered competing → complementary → orthogonal
    const order = ['competing-prediction-adjudication', 'complementary-reach', 'orthogonal-channel-measurement', 'shared-coverage'];
    const parts = order
      .filter(k => p.summary.byClassifier[k])
      .map(k => {
        const n = p.summary.byClassifier[k];
        const lab = DISCRIMINATING_CLASSIFIERS[k].short;
        return `${n} ${lab}${n === 1 ? '' : 's'}`;
      });
    const sumLine = parts.join(' · ');
    return `
      <div class="dc-pair-catrow" data-pair-jump="${esc(p.id)}" role="button" tabindex="0">
        <div class="dc-pair-catrow-head">
          <span class="dc-pair-catrow-pair">${esc(aLabel)} <span class="dc-pair-catrow-sym">⇄</span> ${esc(bLabel)}</span>
          <span class="dc-pair-catrow-ct">${p.summary.total} shared</span>
        </div>
        <div class="dc-pair-catrow-summary">${esc(sumLine)}</div>
      </div>
    `;
  }).join('');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Compare programs <span class="dx-section-ct">· ${pairs.length}</span></h3>
      <div class="sec-sub">
        Pairs of experimental programs with documented shared coverage — targets that both
        programs address through documented experimental reach. Each pair's shared targets
        are classified by what kind of relationship the two programs hold to one another:
      </div>
      <div class="dc-pair-cat-legend">
        ${Object.values(DISCRIMINATING_CLASSIFIERS).filter(c => c.label !== 'Shared coverage').sort((a,b)=>a.sortKey-b.sortKey).map(c => `
          <div class="dc-pair-cat-legend-row">
            <span class="${c.pillClass}">${esc(c.icon)} ${esc(c.label)}</span>
            <span class="dc-pair-cat-legend-blurb">${esc(c.blurb)}</span>
          </div>
        `).join('')}
      </div>
      <div class="dc-pair-catlist">
        ${rows}
      </div>
    </div>
  `;
  // Wire pair-jump rows
  inner.querySelectorAll('[data-pair-jump]').forEach(el => {
    el.addEventListener('click', () => selectDiscriminatingPair(el.dataset.pairJump));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectDiscriminatingPair(el.dataset.pairJump);
      }
    });
  });
}

// =============================================================
//   Per-pair panel
// =============================================================
function renderSidebarDiscriminatingPair(pairId) {
  const inner = document.getElementById('sidebar-inner');
  const pair = (DATA && DATA.discriminating_pairs_by_id) ? DATA.discriminating_pairs_by_id[pairId] : null;
  if (!pair) {
    inner.innerHTML = `
      <div class="sidebar-section">
        <h3>Compare programs</h3>
        <div class="dc-pair-empty">No pair with id <code>${esc(pairId)}</code> in the current dataset.</div>
        <button class="dc-pair-back" data-pair-back="1">← Back to all pairs</button>
      </div>
    `;
    inner.querySelectorAll('[data-pair-back]').forEach(el =>
      el.addEventListener('click', () => switchSidebarPanel('discriminating'))
    );
    return;
  }
  const a = pair.progA, b = pair.progB;
  const aNode = getProgramNode(a);
  const bNode = getProgramNode(b);
  const aLabel = (aNode && aNode.label) || a;
  const bLabel = (bNode && bNode.label) || b;
  const aSub = programSubtypeLabel(aNode);
  const bSub = programSubtypeLabel(bNode);
  const aPer = programOperationalLabel(aNode);
  const bPer = programOperationalLabel(bNode);

  // Compact summary line above the sections
  const order = ['competing-prediction-adjudication', 'complementary-reach', 'orthogonal-channel-measurement', 'shared-coverage'];
  const parts = order
    .filter(k => pair.summary.byClassifier[k])
    .map(k => {
      const n = pair.summary.byClassifier[k];
      const lab = DISCRIMINATING_CLASSIFIERS[k].short;
      return `<strong>${n}</strong> ${esc(lab)}${n === 1 ? '' : 's'}`;
    });
  const sumLine = parts.join(' · ');

  inner.innerHTML = `
    <div class="sidebar-breadcrumb">
      <button class="crumb-link" data-pair-back="1">← Compare programs</button>
      <button class="crumb-close" title="Clear selection">×</button>
    </div>
    <div class="sidebar-section dc-pair-head-section">
      <div class="dc-pair-head-pair">
        <button type="button" class="dx-disc-pill dc-pair-head-prog" data-disc-jump="${esc(a)}" title="Open ${esc(aLabel)} card">${esc(aLabel)}</button>
        <span class="dc-pair-head-sym">⇄</span>
        <button type="button" class="dx-disc-pill dc-pair-head-prog" data-disc-jump="${esc(b)}" title="Open ${esc(bLabel)} card">${esc(bLabel)}</button>
      </div>
      <div class="dc-pair-head-meta">
        <div class="dc-pair-head-progmeta">${esc(aSub)}${aPer ? ` · ${esc(aPer)}` : ''}</div>
        <div class="dc-pair-head-progmeta">${esc(bSub)}${bPer ? ` · ${esc(bPer)}` : ''}</div>
      </div>
      <div class="dc-pair-head-sum">${sumLine}</div>
    </div>
    <div class="dc-pair-targets">
      ${pair.sharedTargets.map(st => renderPairTargetSection(st, a, b)).join('')}
    </div>
  `;
  // Wire interactions
  wireDiscriminatingCardLinks(inner);

  // UX pass — connect the comparison to the map: light the classifications
  // holding this pair's shared targets (frontier targets have no tile).
  if (typeof setTileSpotlight === 'function' && DATA && DATA.cell_id_to_fc_id) {
    const fcIds = (pair.sharedTargets || [])
      .map(function (st) { return st && (st.target || st.targetId || st.to); })
      .map(function (t) { return t ? DATA.cell_id_to_fc_id[t] : null; })
      .filter(Boolean);
    setTileSpotlight(Array.from(new Set(fcIds)));
  }
}

// =============================================================
//   Wiring
// =============================================================
function wireDiscriminatingCardLinks(root) {
  // Breadcrumb back-link
  root.querySelectorAll('[data-pair-back]').forEach(el => {
    el.addEventListener('click', () => switchSidebarPanel('discriminating'));
  });
  // Breadcrumb close button (clears all selection)
  const closeBtn = root.querySelector('.crumb-close');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    state.selectedPair = null;
    switchSidebarPanel('about');
  });
  // Program pills jump to discourse cards
  root.querySelectorAll('[data-disc-jump]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.discJump;
      if (typeof selectDiscourseNode === 'function') selectDiscourseNode(id);
    });
  });
  // Cell-target pills jump to cell cards (via the existing selectCell)
  root.querySelectorAll('[data-fc-cell-jump]').forEach(el => {
    el.addEventListener('click', () => {
      const [fcId, cellId] = el.dataset.fcCellJump.split('|');
      if (typeof selectCell === 'function') selectCell(fcId, cellId);
    });
  });
}

function selectDiscriminatingPair(pairId) {
  state.selectedPair = pairId;
  state.activePanel = 'discriminating-pair';
  // Clear competing selections so the panel takes over the sidebar
  state.selectedFC = null;
  state.selectedCell = null;
  if (typeof clearDiscourseSelection === 'function') clearDiscourseSelection();
  if (typeof clearGlossarySelection === 'function') clearGlossarySelection();
  if (typeof clearCrossClassEdgeSelection === 'function') clearCrossClassEdgeSelection();
  if (typeof clearDiscourseEdgeSelection === 'function') clearDiscourseEdgeSelection();
  if (typeof writeHash === 'function') writeHash();
  renderSidebarDiscriminatingPair(pairId);
  if (typeof syncSidebarQuickBar === 'function') syncSidebarQuickBar();
  if (typeof syncToolbarChips === 'function') syncToolbarChips();
}

function clearDiscriminatingSelection() {
  state.selectedPair = null;
}

// =============================================================
//   Program-card cross-link helper (consumed by explorer-discourse.js
//   renderProgramCard). Returns a small section listing the other
//   programs this one shares coverage with, with a one-line summary.
// =============================================================
function renderProgramDiscriminatingCrossLink(programId) {
  if (!DATA || !DATA.discriminating_pairs_by_program) return '';
  const pairs = DATA.discriminating_pairs_by_program[programId] || [];
  if (!pairs.length) return '';
  const order = ['competing-prediction-adjudication', 'complementary-reach', 'orthogonal-channel-measurement', 'shared-coverage'];
  const rows = pairs.map(p => {
    const otherId = (p.progA === programId) ? p.progB : p.progA;
    const otherNode = getProgramNode(otherId);
    const otherLabel = (otherNode && otherNode.label) || otherId;
    const parts = order
      .filter(k => p.summary.byClassifier[k])
      .map(k => {
        const n = p.summary.byClassifier[k];
        const lab = DISCRIMINATING_CLASSIFIERS[k].short;
        return `${n} ${lab}${n === 1 ? '' : 's'}`;
      });
    const sumLine = parts.join(' · ');
    return `
      <div class="dc-pair-xlink-row" data-pair-jump="${esc(p.id)}" role="button" tabindex="0">
        <div class="dc-pair-xlink-head">
          <span class="dc-pair-xlink-sym">⇄</span>
          <span class="dc-pair-xlink-other">${esc(otherLabel)}</span>
          <span class="dc-pair-xlink-ct">${p.summary.total} shared</span>
        </div>
        <div class="dc-pair-xlink-summary">${esc(sumLine)}</div>
      </div>
    `;
  }).join('');
  return `
    <div class="sidebar-section dc-pair-xlink-section">
      <h3>Shared coverage with other programs <span class="dx-section-ct">· ${pairs.length}</span></h3>
      <div class="sec-sub">Other programs in the catalogue with documented experimental reach toward at least one of the same targets. Click a row to open the per-pair comparison.</div>
      ${rows}
    </div>
  `;
}

// Wire the cross-link rows that renderProgramCard embeds. Called by
// wireDiscourseCardLinks in explorer-discourse.js via a guarded check.
function wireProgramDiscriminatingCrossLink(root) {
  if (!root) return;
  root.querySelectorAll('.dc-pair-xlink-row[data-pair-jump]').forEach(el => {
    el.addEventListener('click', () => selectDiscriminatingPair(el.dataset.pairJump));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectDiscriminatingPair(el.dataset.pairJump);
      }
    });
  });
}
