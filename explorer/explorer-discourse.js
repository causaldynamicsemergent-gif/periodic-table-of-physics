'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-discourse.js  (Update B)
//
//   Holds: the discourse layer (41 non-FC nodes — 11 architectures,
//   11 open-frontiers, 6 totality-approaches, 6 regime-content,
//   7 experimental-programs — and the ~89 discourse edges that connect
//   them). Renders one sidebar detail card per node type, builds the
//   five new Browse sub-catalogues, manages the selection state, and
//   exposes the connected-FC set for the amber discourse-highlight
//   ring on the map (the ring itself is drawn by renderTile in map.js).
//
//   Reads: state, DATA, esc, formatPara, STATUS_COLOR (data.js);
//   FC_BY_ID for FC label/symbol lookups when an edge crosses the
//   layer boundary; selectFC / selectCell / clearSelection /
//   switchSidebarPanel / closeBrowseMenu / syncSidebarQuickBar
//   (sidebar.js); renderMap, syncToolbarChips (map.js).
//
//   Load order in HTML: data → map → sidebar → phenomena → discourse.
//   Discourse loads last among the modules so it can freely reference
//   functions defined in any of the earlier files at call time.
// =============================================================

// =============================================================
//   Node-type metadata (presentation layer)
// =============================================================
var DISCOURSE_TYPE_LABELS = {
  'architecture':         'Architecture',
  'open-frontier':        'Open frontier',
  'totality-approach':    'Totality approach',
  'regime-content':       'Regime content',
  'experimental-program': 'Experimental program',
};
var DISCOURSE_TYPE_ICONS = {
  'architecture':         '⌬',
  'open-frontier':        '✕',
  'totality-approach':    '◇',
  'regime-content':       '▣',
  'experimental-program': '⚙',
};
// Order in which discourse types appear in the Browse CATALOGUES section
var DISCOURSE_TYPE_ORDER = [
  'architecture', 'open-frontier', 'totality-approach',
  'regime-content', 'experimental-program',
];

// Pretty labels for the structural-reason-category groupings used to
// satisfy PROJECT_GOAL.md §8 "Distinctive" — clicking through frontiers
// grouped by the same category surfaces cross-frontier formal-content
// commonality. Labels lifted from the spec; the canonical values come
// from the live MCP server.
var STRUCTURAL_REASON_LABELS = {
  'cross-architecture-non-sharing': 'Cross-architecture non-sharing',
  'reach-termination':              'Reach termination',
  'apparatus-mechanism-failure':    'Apparatus / mechanism failure',
  'organizing-structure-failure':   'Organizing-structure failure',
  'bridge-failure':                 'Bridge failure',
  'interpretive-underdetermination':'Interpretive underdetermination',
  'solvability-failure':            'Solvability failure',
};

// Pretty labels for experimental-program subtypes
var PROGRAM_SUBTYPE_LABELS = {
  'data-curation-collaboration': 'Data-curation collaboration',
  'experimental-collaboration':  'Experimental collaboration',
  'accelerator-program':         'Accelerator program',
  'survey-program':              'Survey program',
};

// Discourse-highlight color — used by the amber ring on connected FC tiles.
// Picked to be distinct from all 7 phenomenon category colors so the two
// highlight layers compose without visual collision.
var DISCOURSE_RING_COLOR = '#b8651a';

// =============================================================
//   Edge-grouping helper
//   Splits a node's incident edges by edge type + direction so each
//   card section can iterate over just what it needs.
// =============================================================
function groupDiscourseEdges(nodeId) {
  const incident = (DATA.discourse_edges_by_node && DATA.discourse_edges_by_node[nodeId]) || [];
  const out = {};
  for (const e of incident) {
    const key = e.type + '/' + e.direction;     // e.g. "emergence/out"
    if (!out[key]) out[key] = [];
    out[key].push(e);
  }
  return out;
}
function ge(grouped, key) {
  return grouped[key] || [];
}

// =============================================================
//   discharge_status renderer (the polymorphic field on hosting /
//   targeting / bears-on edges that's sometimes a string, sometimes
//   a 3-key object {local|global|universal: substantial|partial|gestural},
//   and sometimes carries a subclaim_examples sub-object).
// =============================================================
function dischargeClass(v) {
  if (v == null) return 'ds-neutral';
  const k = String(v).toLowerCase();
  // Order matters — match the most specific labels first
  if (k === 'substantial')              return 'ds-substantial';
  if (k === 'gestural')                 return 'ds-gestural';
  if (k.indexOf('partial') === 0)       return 'ds-partial';   // 'partial', 'partial-to-gestural'
  if (k === 'structural'
   || k === 'structural-only')          return 'ds-structural';
  if (k === 'open')                     return 'ds-open';
  if (k === 'constrains'
   || k === 'partially-solves'
   || k === 'established')              return 'ds-substantial';
  return 'ds-neutral';
}

function renderDischargeStatus(ds) {
  if (ds == null) return '';
  // String form — just a pill
  if (typeof ds === 'string') {
    return `<span class="discharge-pill ${dischargeClass(ds)}">${esc(ds)}</span>`;
  }
  // Object form — split top-level keys from subclaim_examples
  const entries = Object.entries(ds).filter(([k]) => k !== 'subclaim_examples');
  const subclaims = ds.subclaim_examples;
  let html = '';
  if (entries.length) {
    html += `<div class="discharge-grid">` + entries.map(([k, v]) => `
      <div class="discharge-cell">
        <span class="discharge-key">${esc(k)}</span>
        <span class="discharge-pill ${dischargeClass(v)}">${esc(String(v))}</span>
      </div>
    `).join('') + `</div>`;
  }
  if (subclaims && typeof subclaims === 'object') {
    const subEntries = Object.entries(subclaims);
    html += `<details class="discharge-subclaims"><summary>subclaim breakdown · ${subEntries.length}</summary>` +
      subEntries.map(([k, v]) => `
        <div class="discharge-subclaim">
          <span class="discharge-subclaim-key">${esc(k)}</span>
          <span class="discharge-pill ${dischargeClass(v)}">${esc(String(v))}</span>
        </div>
      `).join('') + `</details>`;
  }
  return html;
}

// =============================================================
//   Neighbor renderers — turn an edge's neighbor id into a clickable
//   inline pill that walks across the layer boundary.
// =============================================================
function renderFCPill(fcId) {
  const fc = FC_BY_ID && FC_BY_ID[fcId];
  if (!fc) {
    return `<span class="dx-fc-pill dx-fc-pill-unknown">${esc(fcId)}</span>`;
  }
  return `<button type="button" class="dx-fc-pill dx-fc-pill-${esc(fc.category)}" data-fc-jump="${esc(fc.id)}" title="${esc(fc.full_name || fc.label)}">
    <span class="dx-fc-pill-sym">${esc(fc.symbol)}</span>
    <span class="dx-fc-pill-lbl">${esc(fc.label)}</span>
  </button>`;
}
function renderDiscoursePill(nodeId) {
  const n = DATA.discourse_by_id && DATA.discourse_by_id[nodeId];
  if (!n) {
    return `<span class="dx-disc-pill dx-disc-pill-unknown">${esc(nodeId)}</span>`;
  }
  return `<button type="button" class="dx-disc-pill dx-disc-pill-${esc(n.type)}" data-disc-jump="${esc(n.id)}" title="${esc(n.label)}">
    <span class="dx-disc-pill-icon">${esc(DISCOURSE_TYPE_ICONS[n.type] || '·')}</span>
    <span class="dx-disc-pill-lbl">${esc(n.label)}</span>
  </button>`;
}
function renderNeighborPill(neighborId) {
  // Resolve whichever layer the neighbor lives in
  if (FC_BY_ID && FC_BY_ID[neighborId]) return renderFCPill(neighborId);
  return renderDiscoursePill(neighborId);
}
function renderCellRefPills(fcId, cellRefs) {
  if (!cellRefs || !cellRefs.length) return '';
  return `<div class="dx-cell-pills">` + cellRefs.map(cid =>
    `<button type="button" class="dx-cell-pill" data-fc-cell-jump="${esc(fcId)}|${esc(cid)}" title="${esc(cid)}">${esc(cid)}</button>`
  ).join('') + `</div>`;
}

// =============================================================
//   Edge-row renderers — small helpers each card type reuses
// =============================================================
function renderEdgeRow(e, opts) {
  opts = opts || {};
  const arrow = e.direction === 'out' ? '→' : '←';
  const neighborPill = renderNeighborPill(e.neighbor);
  // Figure out cell refs and which FC they belong to (for uses-classification etc.)
  let cellPills = '';
  if (e.cell_refs && e.cell_refs.length) {
    // The FC side of the edge — if neighbor is the FC, use it; otherwise the source.
    const fcSide = (FC_BY_ID && FC_BY_ID[e.neighbor]) ? e.neighbor
                 : (FC_BY_ID && FC_BY_ID[e.from])     ? e.from
                 : (FC_BY_ID && FC_BY_ID[e.to])       ? e.to : null;
    if (fcSide) cellPills = renderCellRefPills(fcSide, e.cell_refs);
  }
  // nature pill (bears-on only) — canonical from the live tool
  let naturePill = '';
  if (e.nature) {
    naturePill = `<span class="dx-nature-pill dx-nature-${esc(e.nature)}">${esc(e.nature)}</span>`;
  }
  const dsHtml = renderDischargeStatus(e.discharge_status);
  // Sub-PR E4 — render quantitative_scale inline on edges that carry it.
  // Bears-on edges are the canonical case (the v19 spec allows qs on
  // this surface). Zero entries at v95; the renderer is ready for the
  // surface when authoring lands.
  const qsLine = (e.quantitative_scale && typeof renderQS === 'function')
    ? `<div class="dx-edge-qs">${renderQS(e.quantitative_scale, {})}</div>`
    : '';
  return `
    <div class="dx-edge-row">
      <div class="dx-edge-head">
        <span class="dx-edge-arrow">${arrow}</span>
        ${neighborPill}
        ${naturePill}
      </div>
      ${e.description ? `<div class="dx-edge-desc">${esc(e.description)}</div>` : ''}
      ${qsLine}
      ${dsHtml ? `<div class="dx-edge-discharge">${dsHtml}</div>` : ''}
      ${cellPills}
    </div>
  `;
}

function renderEdgeSection(title, edgeList, opts) {
  opts = opts || {};
  const empty = opts.emptyText || `No <em>${esc(title.toLowerCase())}</em> edges recorded.`;
  if (!edgeList || edgeList.length === 0) {
    if (opts.hideWhenEmpty) return '';
    return `<div class="sidebar-section"><h3>${esc(title)}</h3><div class="dx-edge-empty">${empty}</div></div>`;
  }
  const intro = opts.intro ? `<div class="sec-sub">${esc(opts.intro)}</div>` : '';
  return `
    <div class="sidebar-section">
      <h3>${esc(title)} <span class="dx-section-ct">· ${edgeList.length}</span></h3>
      ${intro}
      <div class="dx-edge-list">${edgeList.map(e => renderEdgeRow(e, opts)).join('')}</div>
    </div>
  `;
}

// =============================================================
//   Sub-PR E5 — per-discourse-node Phase B/C coverage rollup
//
//   Returns { hasImplies, hasQS, targetedCount, resolvesCount }
//   for use by the card-head pill row and the Browse-list item
//   row. hasImplies / hasQS are presence-only signals; the actual
//   content lives in the card sections shipped by E3 / E4.
//   targetedCount = number of resolves edges pointing AT this
//   node (cells / frontiers / totality-approaches can be on the
//   receiving side). resolvesCount = number of resolves edges
//   ORIGINATING at this node (only the 12 forward-looking
//   experimental programs in v95 carry any).
//
//   Cheap to compute on-demand; no new data index needed. Indexes
//   consulted: DATA.resolves_by_target, DATA.resolves_by_program
//   (both built in explorer-data.js for sub-PR E2).
// =============================================================
function discourseNodeCoverage(node) {
  if (!node || !node.id) {
    return { hasImplies: false, hasQS: false, targetedCount: 0, resolvesCount: 0 };
  }
  var byTarget  = (typeof DATA !== 'undefined' && DATA && DATA.resolves_by_target)  || {};
  var byProgram = (typeof DATA !== 'undefined' && DATA && DATA.resolves_by_program) || {};
  return {
    hasImplies:    !!(node.if_real_implies && node.if_real_implies.length),
    hasQS:         !!node.quantitative_scale,
    targetedCount: (byTarget[node.id]  || []).length,
    resolvesCount: (byProgram[node.id] || []).length,
  };
}

// Sub-PR E5 — build the coverage-pill list for a discourse-card
// head. Returns an array of HTML strings (possibly empty) suitable
// for concatenation with the structural pills (stratum / status /
// subtype / period) already passed to renderDiscourseCardHead.
// Vocabulary discipline: chip text is physicist-natural ("if real,
// implies N", "characteristic scale", "targeted by N", "resolves N
// targets"); no schema field names anywhere.
function coveragePillsForCard(node) {
  var cov = discourseNodeCoverage(node);
  var pills = [];
  if (cov.hasImplies) {
    var implN = (node.if_real_implies || []).length;
    pills.push(
      '<span class="dx-pill dx-pill-cov dx-pill-cov-implies" '
      + 'title="This node carries ' + implN + ' documented conditional structural consequence'
      + (implN === 1 ? '' : 's') + ' — see the &lsquo;If real, implies…&rsquo; section below.">'
      + 'if real, implies ' + implN + '</span>'
    );
  }
  if (cov.hasQS) {
    pills.push(
      '<span class="dx-pill dx-pill-cov dx-pill-cov-scale" '
      + 'title="This node carries a headline quantitative bound or scale — see the &lsquo;Characteristic scale&rsquo; section below.">'
      + 'characteristic scale</span>'
    );
  }
  if (cov.targetedCount > 0) {
    pills.push(
      '<span class="dx-pill dx-pill-cov dx-pill-cov-targeted" '
      + 'title="' + cov.targetedCount + ' experimental program'
      + (cov.targetedCount === 1 ? '' : 's')
      + ' in the map target' + (cov.targetedCount === 1 ? 's' : '') + ' this node.">'
      + 'targeted by ' + cov.targetedCount + '</span>'
    );
  }
  if (cov.resolvesCount > 0) {
    pills.push(
      '<span class="dx-pill dx-pill-cov dx-pill-cov-resolves" '
      + 'title="This program targets ' + cov.resolvesCount + ' cell'
      + (cov.resolvesCount === 1 ? '' : 's') + ', frontier'
      + (cov.resolvesCount === 1 ? '' : 's') + ', or totality approach'
      + (cov.resolvesCount === 1 ? '' : 'es') + ' — see the &lsquo;Resolves&rsquo; section below.">'
      + 'resolves ' + cov.resolvesCount + ' target'
      + (cov.resolvesCount === 1 ? '' : 's') + '</span>'
    );
  }
  return pills;
}

// =============================================================
//   Detail-card chrome (breadcrumb + header) shared across all 5 types
// =============================================================
function renderDiscourseCardHead(node, extraPills) {
  const typeLbl = DISCOURSE_TYPE_LABELS[node.type] || node.type;
  const icon = DISCOURSE_TYPE_ICONS[node.type] || '·';
  const pills = (extraPills || []).filter(Boolean).join('');
  return `
    <div class="sb-crumb">
      <div class="crumb-trail"><span class="crumb-current">${esc(icon)} · ${esc(node.label)}</span></div>
      <button class="crumb-close" title="Close (Esc)">×</button>
    </div>

    <div class="dx-card-head dx-card-head-${esc(node.type)}">
      <div class="dx-card-type">${esc(typeLbl)}</div>
      <div class="dx-card-title">${esc(node.label)}</div>
      ${node.full_name && node.full_name !== node.label ? `<div class="dx-card-fullname">${esc(node.full_name)}</div>` : ''}
      ${pills ? `<div class="dx-card-pills">${pills}</div>` : ''}
    </div>
  `;
}

// =============================================================
//   Architecture card
// =============================================================
function renderArchitectureCard(node) {
  const grouped = groupDiscourseEdges(node.id);
  const stratumPillClass = node.stratum === '2a' ? 'dx-stratum-2a' : 'dx-stratum-2b';
  const stratumLabel = node.stratum === '2a' ? 'Established (2a)' :
                       node.stratum === '2b' ? 'Candidate-foundational (2b)' :
                       'Stratum ' + (node.stratum || '?');
  const stratumPill = `<span class="dx-pill ${stratumPillClass}">${esc(stratumLabel)}</span>`;
  const statusPill = node.empirical_status
    ? `<span class="dx-pill dx-status-pill">${esc(node.empirical_status)}</span>`
    : '';

  const head = renderDiscourseCardHead(node, [stratumPill, statusPill]);
  const desc = node.description
    ? `<div class="sidebar-section"><h3>About</h3><div class="dc-desc">${formatPara(node.description)}</div></div>`
    : '';

  // Sections (only show what's present so 2a vs 2b architectures naturally differ)
  const sections = [
    renderEdgeSection('Hosting (stratum 2a)',
      ge(grouped, 'candidate-hosting/out'),
      { intro: 'Established architectures this candidate-foundational program claims to host.', hideWhenEmpty: true }),
    renderEdgeSection('Hosted by (candidates)',
      ge(grouped, 'candidate-hosting/in'),
      { intro: 'Candidate-foundational programs claiming to host this architecture.', hideWhenEmpty: true }),
    renderEdgeSection('Targets (frontiers)',
      ge(grouped, 'candidate-targeting/out'),
      { intro: 'Open frontiers this program aims to discharge.', hideWhenEmpty: true }),
    renderEdgeSection('Produces (regime content)',
      ge(grouped, 'emergence/out'),
      { intro: 'Empirical-regime content that emerges from this architecture.', hideWhenEmpty: true }),
    renderEdgeSection('Frontiers not spanned',
      ge(grouped, 'open-frontier-architecture-edge/in')
        .concat(ge(grouped, 'open-frontier-architecture-edge/out')),
      { intro: 'Where this architecture fails to span an open frontier.', hideWhenEmpty: true }),
    renderEdgeSection('Uses (classifications)',
      ge(grouped, 'uses-classification/out'),
      { intro: 'Formal classifications this architecture invokes as machinery.', hideWhenEmpty: true }),
    renderEdgeSection('Produces (classifications)',
      ge(grouped, 'produces-classification/out'),
      { intro: 'Formal classifications this architecture established.', hideWhenEmpty: true }),
    renderEdgeSection('Multi-architecture interference',
      ge(grouped, 'multi-architecture-interference-edge/in')
        .concat(ge(grouped, 'multi-architecture-interference-edge/out')),
      { intro: 'Anomaly / interference observations spanning this architecture.', hideWhenEmpty: true }),
  ].join('');

  const citations = (node.citations && node.citations.length)
    ? `<div class="sidebar-section"><h3>Key citations</h3><div class="dx-citation-list">${node.citations.map(c => `<div>${esc(c)}</div>`).join('')}</div></div>`
    : '';

  return head + desc + sections + citations;
}

// =============================================================
//   Open-frontier card
// =============================================================
function renderFrontierCard(node) {
  const grouped = groupDiscourseEdges(node.id);
  const srPill = node.structural_reason_category
    ? `<span class="dx-pill dx-struct-reason" title="Structural reason this frontier remains open">${esc(STRUCTURAL_REASON_LABELS[node.structural_reason_category] || node.structural_reason_category)}</span>`
    : '';
  const stratumPill = node.stratum
    ? `<span class="dx-pill dx-stratum-other">Stratum ${esc(String(node.stratum))}</span>`
    : '';

  // Sub-PR E5 — Phase B/C coverage pills. Appended to the structural
  // pills (srPill, stratumPill) so the head row reads structural ↦
  // coverage. Pills are availability signals; the content they point
  // to (if_real_implies tree, carrier qs callout, "Targeted by"
  // section) already lives further down the card.
  const head = renderDiscourseCardHead(node, [srPill, stratumPill].concat(coveragePillsForCard(node)));
  const desc = node.description
    ? `<div class="sidebar-section"><h3>About</h3><div class="dc-desc">${formatPara(node.description)}</div></div>`
    : '';

  // Sub-PR E4 — carrier qs callout. The 7 open-frontier carriers
  // currently with quantitative_scale (qg-frontier 10^19 GeV,
  // cc-frontier 10^120, hierarchy-problem 10^17, etc.) get their
  // headline numerical commitment rendered as a prominent block
  // immediately after the About section.
  const carrierQS = (node.quantitative_scale && typeof renderQSCallout === 'function')
    ? renderQSCallout(node.quantitative_scale, { heading: 'Characteristic scale' })
    : '';

  // Sub-PR E3 — if_real_implies tree. The 9 open-frontier carriers
  // (qg-frontier, cc-frontier, bh-info-paradox, hierarchy-problem,
  // strong-cp-problem, flavor-puzzle, measurement-problem,
  // matter-antimatter-asymmetry, dark-matter) plus topological-
  // phases-classification get their resolutions + implications
  // rendered as a two-level tree immediately after the carrier qs.
  // Section returns '' when the node carries no if_real_implies.
  const carrierImplies = (typeof renderIfRealImpliesSection === 'function')
    ? renderIfRealImpliesSection(node)
    : '';

  const sections = [
    renderEdgeSection('Architectures that fail to span this frontier',
      ge(grouped, 'open-frontier-architecture-edge/out')
        .concat(ge(grouped, 'open-frontier-architecture-edge/in')),
      { intro: 'The architecture-level failure-to-span edges. Together these tell the story of why the frontier remains open.', hideWhenEmpty: true }),
    renderEdgeSection('Classifications that bear on this frontier',
      ge(grouped, 'bears-on/in'),
      { intro: 'Formal classifications constraining, partially-solving, or structurally delimiting the frontier. nature pill is canonical.', hideWhenEmpty: true }),
    renderEdgeSection('Programs targeting this frontier',
      ge(grouped, 'candidate-targeting/in'),
      { intro: 'Candidate-foundational programs that aim to discharge this frontier.', hideWhenEmpty: true }),
    // Sub-PR E2 — Phase C resolves edges. The "Targeted by" section is
    // empty when no experimental program documents reach for this
    // frontier; the resolves renderer returns '' in that case.
    (typeof renderTargetedByTarget === 'function')
      ? renderTargetedByTarget(node.id) : '',
    renderEdgeSection('Empirical loci',
      ge(grouped, 'open-frontier-content-edge/out')
        .concat(ge(grouped, 'open-frontier-content-edge/in')),
      { intro: 'Regime-content and totality-approach contexts where the gap is empirically visible.', hideWhenEmpty: true }),
    renderEdgeSection('Uses (classifications)',
      ge(grouped, 'uses-classification/out'),
      { intro: 'Formal classifications the frontier itself invokes.', hideWhenEmpty: true }),
    renderEdgeSection('Produces (classifications)',
      ge(grouped, 'produces-classification/out'),
      { intro: 'Formal classifications the frontier helped establish.', hideWhenEmpty: true }),
  ].join('');

  const citations = (node.citations && node.citations.length)
    ? `<div class="sidebar-section"><h3>Key citations</h3><div class="dx-citation-list">${node.citations.map(c => `<div>${esc(c)}</div>`).join('')}</div></div>`
    : '';

  return head + desc + carrierQS + carrierImplies + sections + citations;
}

// =============================================================
//   Totality-approach card
// =============================================================
function renderTotalityCard(node) {
  const grouped = groupDiscourseEdges(node.id);
  const statusPill = node.empirical_status
    ? `<span class="dx-pill dx-status-pill" title="Empirical status">${esc(node.empirical_status)}</span>`
    : '';
  const stratumPill = node.stratum
    ? `<span class="dx-pill dx-stratum-other">Stratum ${esc(String(node.stratum))}</span>`
    : '';

  // Sub-PR E5 — Phase B/C coverage pills. Same shape as
  // renderFrontierCard: the existing structural pills sit first,
  // the coverage pills follow. 5 of 6 totality-approaches in v95
  // carry if_real_implies; all 6 carry quantitative_scale; muon-g-2
  // is the only one currently targeted by a resolves edge.
  const head = renderDiscourseCardHead(node, [statusPill, stratumPill].concat(coveragePillsForCard(node)));
  const desc = node.description
    ? `<div class="sidebar-section"><h3>About</h3><div class="dc-desc">${formatPara(node.description)}</div></div>`
    : '';

  // Sub-PR E4 — carrier qs callout. Each of the 6 totality-approach
  // nodes carries a quantitative_scale entry: bh-thermodynamics 1/4
  // (Bekenstein-Hawking coefficient), cosmological-models 5σ (Hubble
  // tension upper bound), turbulence -1.667 (Kolmogorov exponent), etc.
  // The headline numerical commitment renders as a prominent block
  // immediately after the About section.
  const carrierQS = (node.quantitative_scale && typeof renderQSCallout === 'function')
    ? renderQSCallout(node.quantitative_scale, { heading: 'Characteristic scale' })
    : '';

  // Sub-PR E3 — if_real_implies tree. The 4 totality-approach carriers
  // (turbulence, koide-formula, muon-g-2, chpt) get their resolutions
  // + implications rendered as a two-level tree immediately after the
  // carrier qs. Section returns '' when the node carries no
  // if_real_implies.
  const carrierImplies = (typeof renderIfRealImpliesSection === 'function')
    ? renderIfRealImpliesSection(node)
    : '';

  const sections = [
    renderEdgeSection('Regime-content contributing here',
      ge(grouped, 'cross-architecture-emergence/in'),
      { intro: 'Established regime content feeding into this totality.', hideWhenEmpty: true }),
    renderEdgeSection('Architectures interfering here',
      ge(grouped, 'multi-architecture-interference-edge/out')
        .concat(ge(grouped, 'multi-architecture-interference-edge/in')),
      { intro: 'Architectures whose joint application matters for this totality.', hideWhenEmpty: true }),
    // Sub-PR E2 — Phase C resolves edges targeting this totality-approach.
    // muon-g-2 is the canonical first instance (sub-PR 53).
    (typeof renderTargetedByTarget === 'function')
      ? renderTargetedByTarget(node.id) : '',
    renderEdgeSection('Classifications that bear on this totality',
      ge(grouped, 'bears-on/in'),
      { intro: 'Formal classifications constraining or partially-solving the totality.', hideWhenEmpty: true }),
    renderEdgeSection('Frontiers visible here',
      ge(grouped, 'open-frontier-content-edge/in'),
      { intro: 'Open frontiers whose empirical locus includes this totality.', hideWhenEmpty: true }),
  ].join('');

  const citations = (node.citations && node.citations.length)
    ? `<div class="sidebar-section"><h3>Key citations</h3><div class="dx-citation-list">${node.citations.map(c => `<div>${esc(c)}</div>`).join('')}</div></div>`
    : '';

  return head + desc + carrierQS + carrierImplies + sections + citations;
}

// =============================================================
//   Regime-content card
// =============================================================
function renderRegimeContentCard(node) {
  const grouped = groupDiscourseEdges(node.id);
  const statusPill = node.empirical_status
    ? `<span class="dx-pill dx-status-pill">${esc(node.empirical_status)}</span>`
    : '';
  const stratumPill = node.stratum
    ? `<span class="dx-pill dx-stratum-other">Stratum ${esc(String(node.stratum))}</span>`
    : '';

  const head = renderDiscourseCardHead(node, [statusPill, stratumPill]);
  const desc = node.description
    ? `<div class="sidebar-section"><h3>About</h3><div class="dc-desc">${formatPara(node.description)}</div></div>`
    : '';

  const sections = [
    renderEdgeSection('Emerges from',
      ge(grouped, 'emergence/in'),
      { intro: 'Architectures this regime content emerges from.', hideWhenEmpty: true }),
    renderEdgeSection('Contributes to totality',
      ge(grouped, 'cross-architecture-emergence/out'),
      { intro: 'Totality approaches this regime content feeds into.', hideWhenEmpty: true }),
    renderEdgeSection('Frontiers visible here',
      ge(grouped, 'open-frontier-content-edge/in'),
      { intro: 'Open frontiers whose empirical locus includes this regime.', hideWhenEmpty: true }),
  ].join('');

  const citations = (node.citations && node.citations.length)
    ? `<div class="sidebar-section"><h3>Key citations</h3><div class="dx-citation-list">${node.citations.map(c => `<div>${esc(c)}</div>`).join('')}</div></div>`
    : '';

  return head + desc + sections + citations;
}

// =============================================================
//   Experimental-program card
// =============================================================
//
// Format an operational_period object into a physicist-natural span string.
// Returns { text, planned } where `planned` is true when the program hasn't
// started yet (start_year > current year, no `ongoing`, no `end_year`); the
// caller can apply a muted style class in that case.
//
// Cases (drawn from the three shapes in v34):
//   { start_year: 1981, end_year: 1990 }    → '1981–1990'      (completed)
//   { start_year: 1974, end_year: 1974 }    → '1974'           (single-year)
//   { start_year: 2008, ongoing: true }     → '2008–present'   (running)
//   { start_year: 2029 }                    → 'expected from 2029' (planned)
//   { start_year: 2015 }                    → '2015–'          (defensive)
function formatOperationalPeriod(op) {
  if (!op || op.start_year == null) return { text: '', planned: false };
  const start = op.start_year;
  if (op.end_year != null) {
    return {
      text: start === op.end_year ? String(start) : `${start}\u2013${op.end_year}`,
      planned: false,
    };
  }
  if (op.ongoing === true) {
    return { text: `${start}\u2013present`, planned: false };
  }
  const currentYear = new Date().getFullYear();
  if (start > currentYear) {
    return { text: `expected from ${start}`, planned: true };
  }
  return { text: `${start}\u2013`, planned: false };
}

function renderProgramCard(node) {
  // UX pass — connect programs to the map: light the classifications whose
  // cells this program targets (frontier/totality targets have no tile).
  if (typeof setTileSpotlight === 'function' && typeof DATA !== 'undefined' && DATA && DATA.resolves_by_id && DATA.cell_id_to_fc_id) {
    const fcIds = Object.keys(DATA.resolves_by_id)
      .map(function (k) { return DATA.resolves_by_id[k]; })
      .filter(function (e) { return e && e.from === node.id; })
      .map(function (e) { return DATA.cell_id_to_fc_id[e.to]; })
      .filter(Boolean);
    setTileSpotlight(Array.from(new Set(fcIds)));
  }
  const grouped = groupDiscourseEdges(node.id);
  const subtypePill = node.subtype
    ? `<span class="dx-pill dx-program-subtype">${esc(PROGRAM_SUBTYPE_LABELS[node.subtype] || node.subtype)}</span>`
    : '';
  let periodPill = '';
  if (node.operational_period) {
    const { text, planned } = formatOperationalPeriod(node.operational_period);
    if (text) {
      const planClass = planned ? ' dx-program-planned' : '';
      periodPill = `<span class="dx-pill dx-program-period${planClass}">${esc(text)}</span>`;
    }
  }

  // Sub-PR E5 — Phase B/C coverage pill. Only the resolves pill
  // is meaningful on a program card (programs are the source side
  // of resolves edges, not the receiving side). 12 of 19 programs
  // in v95 carry ≥1 resolves edge; the other 7 are historical and
  // remain pill-less.
  const head = renderDiscourseCardHead(node, [subtypePill, periodPill].concat(coveragePillsForCard(node)));
  const desc = node.description
    ? `<div class="sidebar-section"><h3>About</h3><div class="dc-desc">${formatPara(node.description)}</div></div>`
    : '';

  // Host institutions (program-specific metadata)
  let hostsSection = '';
  if (node.host_institutions && node.host_institutions.length) {
    hostsSection = `<div class="sidebar-section"><h3>Host institutions</h3><div class="dx-hosts">${node.host_institutions.map(h => `<span class="dx-host-pill">${esc(h)}</span>`).join('')}</div></div>`;
  }

  const sections = [
    hostsSection,
    renderEdgeSection('Produces classifications',
      ge(grouped, 'produces-classification/out'),
      { intro: 'Formal classifications this program established empirically. Cell-ref pills below each edge link to the specific cells the program confirmed.', hideWhenEmpty: true }),
    // Sub-PR E2 — Phase C resolves edges (Step 4.4). The 12 forward-looking
    // programs each carry 1–4 resolves edges to the cells, frontiers, and
    // totality-approach nodes they address. Section is empty for the 7
    // historical programs and the absent-render is hidden automatically
    // by the resolves renderer (it returns '' when no edges exist).
    (typeof renderResolvesFromProgram === 'function')
      ? renderResolvesFromProgram(node.id) : '',
    // Sub-PR E7 — cross-link to the Compare-programs panel for every
    // other program in the catalogue that shares ≥1 target with this
    // one. Hidden automatically when no shared coverage exists (the
    // renderer returns '' in that case). This is the discoverability
    // path: a physicist viewing DUNE's card sees the catalogue exists
    // and which other programs are relevant comparisons.
    (typeof renderProgramDiscriminatingCrossLink === 'function')
      ? renderProgramDiscriminatingCrossLink(node.id) : '',
  ].join('');

  // Key publications — for programs the citations are typically formatted differently
  const pubs = (node.key_publications && node.key_publications.length)
    ? `<div class="sidebar-section"><h3>Key publications</h3><div class="dx-citation-list">${node.key_publications.map(c => `<div>${esc(c)}</div>`).join('')}</div></div>`
    : (node.citations && node.citations.length)
      ? `<div class="sidebar-section"><h3>Key publications</h3><div class="dx-citation-list">${node.citations.map(c => `<div>${esc(c)}</div>`).join('')}</div></div>`
      : '';

  return head + desc + sections + pubs;
}

// =============================================================
//   Top-level discourse-card renderer (dispatches by type)
// =============================================================
function renderDiscourseCard(nodeId) {
  const node = DATA.discourse_by_id && DATA.discourse_by_id[nodeId];
  if (!node) {
    return `<div class="sidebar-section"><h3>Not found</h3><div class="dc-desc">No discourse node with id <code>${esc(nodeId)}</code> in the current dataset.</div></div>`;
  }
  switch (node.type) {
    case 'architecture':         return renderArchitectureCard(node);
    case 'open-frontier':        return renderFrontierCard(node);
    case 'totality-approach':    return renderTotalityCard(node);
    case 'regime-content':       return renderRegimeContentCard(node);
    case 'experimental-program': return renderProgramCard(node);
    default:
      return `<div class="sidebar-section"><h3>${esc(node.label)}</h3><div class="dc-desc">No card layout registered for type <code>${esc(node.type)}</code>.</div></div>`;
  }
}

// =============================================================
//   Sidebar render — selection state changers
// =============================================================
function renderSidebarDiscourse(node) {
  const inner = document.getElementById('sidebar-inner');
  inner.innerHTML = renderDiscourseCard(node.id);
  wireDiscourseCardLinks(inner);
}

function wireDiscourseCardLinks(root) {
  // Close button on the breadcrumb
  const closeBtn = root.querySelector('.crumb-close');
  if (closeBtn) closeBtn.addEventListener('click', clearSelection);

  // FC pills → jump to FC card (via sidebar.js's selectFC)
  root.querySelectorAll('[data-fc-jump]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      selectFC(el.dataset.fcJump);
    });
  });
  // FC+cell pills → jump straight to the cell card
  root.querySelectorAll('[data-fc-cell-jump]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const [fcId, cellId] = el.dataset.fcCellJump.split('|');
      selectCell(fcId, cellId);
    });
  });
  // Other discourse-node pills → jump to that discourse card
  root.querySelectorAll('[data-disc-jump]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      selectDiscourseNode(el.dataset.discJump);
    });
  });
  // Sub-PR E7 — program-card cross-link rows. Hidden when not present
  // (the cross-link section returns '' for programs with no shared
  // coverage, and historical programs have no resolves edges so the
  // section is empty on those cards too).
  if (typeof wireProgramDiscriminatingCrossLink === 'function') {
    wireProgramDiscriminatingCrossLink(root);
  }
}

function selectDiscourseNode(nodeId) {
  const n = DATA.discourse_by_id && DATA.discourse_by_id[nodeId];
  if (!n) return;
  state.selectedDiscourseNode = nodeId;
  state.selectedFC = null;
  state.selectedCell = null;
  state.selectedEdgeId = null;       // Update C — symmetric clear
  state.selectedDiscourseEdgesPair = null; // Update C — ring-badge card pair clear
  state.activePanel = 'discourse';
  writeHash();
  renderSidebarDiscourse(n);
  document.getElementById('sidebar').scrollTop = 0;
  renderMap();   // re-render so the amber ring appears on connected FC tiles
  if (typeof closeBrowseMenu === 'function') closeBrowseMenu();
  if (typeof syncSidebarQuickBar === 'function') syncSidebarQuickBar();
}

function clearDiscourseSelection() {
  state.selectedDiscourseNode = null;
  state.selectedDiscourseEdgesPair = null; // Update C — clear the dependent pair too
}

// =============================================================
//   Browse CATALOGUES sub-tab list builders — one per discourse type
//   Each produces a sidebar panel showing all nodes of that type,
//   grouped by an appropriate axis, with one-click selection.
// =============================================================

function renderSidebarBrowseArchitectures() {
  const inner = document.getElementById('sidebar-inner');
  const list = (DATA.discourse_by_type && DATA.discourse_by_type['architecture']) || [];
  // Group by stratum (2a / 2b)
  const groups = { '2a': [], '2b': [] };
  for (const n of list) {
    const k = n.stratum || 'other';
    if (!groups[k]) groups[k] = [];
    groups[k].push(n);
  }
  const groupOrder = ['2a', '2b'].concat(Object.keys(groups).filter(k => k !== '2a' && k !== '2b'));
  const groupLabel = { '2a': 'Established (stratum 2a)', '2b': 'Candidate-foundational (stratum 2b)' };
  const groupsHtml = groupOrder
    .filter(g => groups[g] && groups[g].length)
    .map(g => `
      <div class="dx-browse-group">
        <div class="dx-browse-group-head">${esc(groupLabel[g] || ('Stratum ' + g))} <span class="dx-browse-group-ct">(${groups[g].length})</span></div>
        ${groups[g].map(n => renderBrowseItem(n)).join('')}
      </div>
    `).join('');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Architectures <span class="dx-section-ct">· ${list.length}</span></h3>
      <div class="sec-sub">The architecture layer: empirically-established and candidate-foundational programs that organize how physics gets done.</div>
      ${groupsHtml || '<div class="dx-edge-empty">No architectures in this dataset.</div>'}
    </div>
  `;
  wireBrowseList(inner);
}

function renderSidebarBrowseFrontiers() {
  const inner = document.getElementById('sidebar-inner');
  const list = (DATA.discourse_by_type && DATA.discourse_by_type['open-frontier']) || [];
  // Group by structural_reason_category — directly satisfies PROJECT_GOAL.md §8 "Distinctive"
  const groups = {};
  for (const n of list) {
    const k = n.structural_reason_category || 'unclassified';
    if (!groups[k]) groups[k] = [];
    groups[k].push(n);
  }
  const groupOrder = Object.keys(groups).sort();
  const groupsHtml = groupOrder.map(g => `
    <div class="dx-browse-group">
      <div class="dx-browse-group-head">${esc(STRUCTURAL_REASON_LABELS[g] || g)} <span class="dx-browse-group-ct">(${groups[g].length})</span></div>
      ${groups[g].map(n => renderBrowseItem(n)).join('')}
    </div>
  `).join('');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Open frontiers <span class="dx-section-ct">· ${list.length}</span></h3>
      <div class="sec-sub">Grouped by the structural reason the frontier remains open. Click two frontiers under the same heading to see whether they share formal-classification machinery.</div>
      ${groupsHtml || '<div class="dx-edge-empty">No frontiers in this dataset.</div>'}
    </div>
  `;
  wireBrowseList(inner);
}

function renderSidebarBrowseTotalities() {
  const inner = document.getElementById('sidebar-inner');
  const list = (DATA.discourse_by_type && DATA.discourse_by_type['totality-approach']) || [];
  // Group by empirical_status (long strings — render each as its own group)
  const groups = {};
  for (const n of list) {
    const k = n.empirical_status || 'unclassified';
    if (!groups[k]) groups[k] = [];
    groups[k].push(n);
  }
  const groupOrder = Object.keys(groups).sort();
  const groupsHtml = groupOrder.map(g => `
    <div class="dx-browse-group">
      <div class="dx-browse-group-head">${esc(g)} <span class="dx-browse-group-ct">(${groups[g].length})</span></div>
      ${groups[g].map(n => renderBrowseItem(n)).join('')}
    </div>
  `).join('');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Totality approaches <span class="dx-section-ct">· ${list.length}</span></h3>
      <div class="sec-sub">Whole-system organizing principles that span multiple architectures (BH thermo, cosmological models, etc.).</div>
      ${groupsHtml || '<div class="dx-edge-empty">No totality approaches in this dataset.</div>'}
    </div>
  `;
  wireBrowseList(inner);
}

function renderSidebarBrowseRegimeContent() {
  const inner = document.getElementById('sidebar-inner');
  const list = (DATA.discourse_by_type && DATA.discourse_by_type['regime-content']) || [];
  // Alphabetical
  const sorted = list.slice().sort((a, b) => (a.label || '').localeCompare(b.label || ''));
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Regime content <span class="dx-section-ct">· ${list.length}</span></h3>
      <div class="sec-sub">Empirically-confirmed regimes the architectures produce. Stratum 3 by construction.</div>
      <div class="dx-browse-group">
        ${sorted.map(n => renderBrowseItem(n)).join('')}
      </div>
    </div>
  `;
  wireBrowseList(inner);
}

function renderSidebarBrowsePrograms() {
  const inner = document.getElementById('sidebar-inner');
  const list = (DATA.discourse_by_type && DATA.discourse_by_type['experimental-program']) || [];
  // Group by subtype
  const groups = {};
  for (const n of list) {
    const k = n.subtype || 'other';
    if (!groups[k]) groups[k] = [];
    groups[k].push(n);
  }
  const groupOrder = ['data-curation-collaboration', 'experimental-collaboration', 'accelerator-program', 'survey-program', 'other']
    .filter(k => groups[k]);
  const groupsHtml = groupOrder.map(g => `
    <div class="dx-browse-group">
      <div class="dx-browse-group-head">${esc(PROGRAM_SUBTYPE_LABELS[g] || g)} <span class="dx-browse-group-ct">(${groups[g].length})</span></div>
      ${groups[g].map(n => renderBrowseItem(n)).join('')}
    </div>
  `).join('');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Experimental programs <span class="dx-section-ct">· ${list.length}</span></h3>
      <div class="sec-sub">Collaborations, accelerator programs, surveys, and data-curation efforts. Completed programs established the empirical content of the formal classifications; current and planned programs target open frontiers.</div>
      ${groupsHtml || '<div class="dx-edge-empty">No experimental programs in this dataset.</div>'}
    </div>
  `;
  wireBrowseList(inner);
}

// UX pass — which catalogue rows are unfolded, across all five discourse
// catalogues (architectures / frontiers / totalities / regime / programs).
const _dxbExpanded = new Set();
// Which fc ids each unfolded row added to the lit set (so folding removes
// exactly what it added, and only what no other open row still needs).
const _dxbApplied = new Map();

// UX pass — the classifications a discourse node touches on the map: the
// FC endpoints of its incident edges, plus (for programs) the FCs holding
// the cells its resolves edges target. Architectures, frontiers, regimes
// and totality approaches have no tile of their own — this is how they
// reach the grid.
// One hop only: the classifications this node touches directly — the FC
// endpoints of its incident edges, plus (for programs) the classifications
// holding the cells its resolves edges target.
function _discourseDirectFCs(nodeId) {
  const out = new Set();
  const inc = (DATA.discourse_edges_by_node && DATA.discourse_edges_by_node[nodeId]) || [];
  inc.forEach(en => {
    const o = en && en.neighbor;
    if (!o) return;
    if (typeof FC_BY_ID !== 'undefined' && FC_BY_ID[o]) out.add(o);
    else if (DATA.cell_id_to_fc_id && DATA.cell_id_to_fc_id[o]) out.add(DATA.cell_id_to_fc_id[o]);
  });
  if (DATA.resolves_by_id) {
    for (const k in DATA.resolves_by_id) {
      const e = DATA.resolves_by_id[k];
      if (!e || e.from !== nodeId) continue;
      if (DATA.cell_id_to_fc_id && DATA.cell_id_to_fc_id[e.to]) out.add(DATA.cell_id_to_fc_id[e.to]);
      else if (typeof FC_BY_ID !== 'undefined' && FC_BY_ID[e.to]) out.add(e.to);
    }
  }
  return out;
}

// UX pass — most regime content, every totality approach, and several
// architectures touch no classification directly: their recorded relations
// stay among frontiers and architectures, one step removed from the grid.
// So when the direct set is empty, go one hop out — collect the node's
// discourse neighbors (including, for programs, the frontiers and totality
// approaches their resolves edges target) and light THOSE neighbors' direct
// classifications. The returned Set carries .indirect = true in that case
// so the detail block can say honestly how the map was reached.
function discourseRelatedFCs(nodeId) {
  const direct = _discourseDirectFCs(nodeId);
  if (direct.size) { direct.indirect = false; return direct; }
  const hops = new Set();
  const inc = (DATA.discourse_edges_by_node && DATA.discourse_edges_by_node[nodeId]) || [];
  inc.forEach(en => {
    const o = en && en.neighbor;
    if (o && !(typeof FC_BY_ID !== 'undefined' && FC_BY_ID[o])) hops.add(o);
  });
  if (DATA.resolves_by_id) {
    for (const k in DATA.resolves_by_id) {
      const e = DATA.resolves_by_id[k];
      if (e && e.from === nodeId && e.to && !(DATA.cell_id_to_fc_id && DATA.cell_id_to_fc_id[e.to])) hops.add(e.to);
    }
  }
  const out = new Set();
  hops.forEach(h => _discourseDirectFCs(h).forEach(fc => out.add(fc)));
  out.indirect = out.size > 0;
  return out;
}

function renderBrowseItem(n) {
  const icon = DISCOURSE_TYPE_ICONS[n.type] || '·';
  // Try to summarize the node in one line — count incident edges
  const incidentCt = ((DATA.discourse_edges_by_node && DATA.discourse_edges_by_node[n.id]) || []).length;

  // Sub-PR E5 — inline Phase B/C coverage chips on Browse-list rows.
  // The Browse menu is the second-most-scanned surface after the map
  // itself; visible coverage signals here let a physicist tell at a
  // glance which programs own resolves edges (the 12 forward-looking
  // vs the 7 historical), which frontiers / totality-approaches carry
  // documented conditional consequences and / or are targeted, etc.
  // Architectures, regime-content, and formal-classification rows
  // carry no Phase B/C surfaces of their own and stay unchanged.
  let covHtml = '';
  if (n.type === 'experimental-program' || n.type === 'open-frontier' || n.type === 'totality-approach') {
    const cov = (typeof discourseNodeCoverage === 'function')
      ? discourseNodeCoverage(n)
      : { hasImplies: false, hasQS: false, targetedCount: 0, resolvesCount: 0 };
    const chips = [];
    if (n.type === 'experimental-program' && cov.resolvesCount > 0) {
      chips.push(`<span class="dx-browse-cov dx-browse-cov-resolves" title="targets ${cov.resolvesCount} cell${cov.resolvesCount === 1 ? '' : 's'}, frontier${cov.resolvesCount === 1 ? '' : 's'}, or totality approach${cov.resolvesCount === 1 ? '' : 'es'}">resolves ${cov.resolvesCount}</span>`);
    }
    if ((n.type === 'open-frontier' || n.type === 'totality-approach') && cov.hasImplies) {
      chips.push(`<span class="dx-browse-cov dx-browse-cov-implies" title="carries documented conditional structural consequences">if real</span>`);
    }
    if ((n.type === 'open-frontier' || n.type === 'totality-approach') && cov.targetedCount > 0) {
      chips.push(`<span class="dx-browse-cov dx-browse-cov-targeted" title="targeted by ${cov.targetedCount} experimental program${cov.targetedCount === 1 ? '' : 's'}">targeted ${cov.targetedCount}</span>`);
    }
    if (chips.length) covHtml = chips.join('');
  }

  const exp = _dxbExpanded.has(n.id);
  const typeLbl = DISCOURSE_TYPE_LABELS[n.type] || n.type;
  const rel = discourseRelatedFCs(n.id);
  const relCt = rel.size;
  return `
    <div class="dx-browse-item${exp ? ' sbc-open' : ''}" data-dxb-node="${esc(n.id)}" role="button" tabindex="0" aria-expanded="${exp}">
      <span class="dx-browse-icon">${esc(icon)}</span>
      <span class="dx-browse-name">${esc(n.label)}</span>
      ${covHtml}
      <span class="dx-browse-ct" title="incident edges">${incidentCt}e</span>
      <span class="sbc-chev">${exp ? '▾' : '▸'}</span>
    </div>
    <div class="sbc-detail" data-dxb-detail="${esc(n.id)}"${exp ? '' : ' hidden'}>
      <div class="sbc-detail-inner">
        ${n.description ? `<div class="sbc-detail-desc">${esc(n.description)}</div>` : ''}
        <div class="sbc-detail-meta">${esc(typeLbl)}${n.subtype ? ' · ' + esc(String(n.subtype).replace(/-/g, ' ')) : ''} · ${incidentCt} incident edge${incidentCt === 1 ? '' : 's'}${relCt ? ` · lights ${relCt} classification${relCt === 1 ? '' : 's'} on the map${rel.indirect ? ' through its neighboring frontiers and architectures' : ''}` : ' · reaches no classification on the grid'}</div>
        <button type="button" class="sbc-open-record" data-dxb-open="${esc(n.id)}">open full record →</button>
      </div>
    </div>
  `;
}

function wireBrowseList(root) {
  // UX pass — catalogue rows unfold in place instead of navigating away:
  // a click toggles a scrollable detail block under the row, so several
  // entries can be inspected and folded back without leaving the page.
  // The full record — which for programs also lights its targeted
  // classifications on the map — is the button inside the detail block.
  root.querySelectorAll('[data-dxb-node]').forEach(el => {
    const id = el.dataset.dxbNode;
    const toggleRow = () => {
      const detail = root.querySelector(`[data-dxb-detail="${CSS.escape(id)}"]`);
      const nowOpen = !_dxbExpanded.has(id);
      if (nowOpen) _dxbExpanded.add(id); else _dxbExpanded.delete(id);
      if (detail) detail.hidden = !nowOpen;
      el.classList.toggle('sbc-open', nowOpen);
      el.setAttribute('aria-expanded', String(nowOpen));
      const chev = el.querySelector('.sbc-chev');
      if (chev) chev.textContent = nowOpen ? '▾' : '▸';
      // UX pass — the map answers: unfolding lights the classifications this
      // node touches; folding removes exactly the ones it added, unless
      // another open row still needs them.
      if (nowOpen) {
        const rel = discourseRelatedFCs(id);
        if (!state.tileSpotlight) state.tileSpotlight = new Set();
        const applied = [];
        rel.forEach(fc => {
          if (!state.tileSpotlight.has(fc)) { state.tileSpotlight.add(fc); applied.push(fc); }
        });
        _dxbApplied.set(id, applied);
        if (rel.size && typeof renderMap === 'function') renderMap();
        // UX pass — say what just happened, in the small window over the
        // map, so a sparse node never feels like a dead click.
        if (typeof showToast === 'function') {
          const node = DATA.discourse_by_id && DATA.discourse_by_id[id];
          const lbl = (node && node.label) || id;
          if (rel.size) {
            showToast(`${lbl} — lit ${rel.size} classification${rel.size === 1 ? '' : 's'} on the map${rel.indirect ? ' (through its neighboring frontiers and architectures)' : ''}`);
          } else {
            showToast(`${lbl} reaches no classification on the grid — its recorded relations stay among frontiers and architectures`);
          }
        }
      } else {
        const applied = _dxbApplied.get(id) || [];
        _dxbApplied.delete(id);
        const stillNeeded = new Set();
        _dxbExpanded.forEach(openId => discourseRelatedFCs(openId).forEach(fc => stillNeeded.add(fc)));
        let changed = false;
        applied.forEach(fc => {
          if (!stillNeeded.has(fc) && state.tileSpotlight && state.tileSpotlight.has(fc)) {
            state.tileSpotlight.delete(fc);
            changed = true;
          }
        });
        if (changed && typeof renderMap === 'function') renderMap();
      }
    };
    el.addEventListener('click', toggleRow);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRow(); }
    });
  });
  root.querySelectorAll('[data-dxb-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      selectDiscourseNode(btn.dataset.dxbOpen);
    });
  });
}

// =============================================================
//   Spotlight sidebar panel (Update B)
//   The new multi-select spotlight panel. Replaces the old inline
//   spotlight chip group in the toolbar.
// =============================================================
function renderSidebarSpotlight() {
  const inner = document.getElementById('sidebar-inner');

  // Compute counts: how many predictions across the whole dataset carry
  // each status. Counts are recomputed live so a future data update
  // doesn't require remembering to bump a hardcoded number.
  const counts = {};
  for (const fc of FCS) {
    for (const [st, n] of Object.entries(fc.yield_stats || {})) {
      counts[st] = (counts[st] || 0) + n;
    }
  }

  const rows = [
    { key: 'confirmed',                  title: 'Confirmed',         desc: 'Predicted then observed.' },
    { key: 'unconfirmed-tension',        title: 'Tension',           desc: 'Evidence is unresolved or in conflict.' },
    { key: 'unconfirmed-not-yet-tested', title: 'Not yet tested',    desc: 'Theoretical prediction without experimental verdict.' },
    { key: 'falsified',                  title: 'Falsified',         desc: 'Ruled out by experiment. ⚠ flag marks tiles containing these.' },
    { key: 'retro-explanatory-only',     title: 'Retro-explanatory', desc: 'Phenomenon observed before, classification developed after.' },
  ];

  const rowsHtml = rows.map(r => {
    const on = state.spotlightActive.has(r.key);
    const n  = counts[r.key] || 0;
    return `
      <button type="button" class="dx-spot-row${on ? ' on' : ''}" data-spot-key="${esc(r.key)}" aria-pressed="${on}">
        <span class="dx-spot-check"><span class="dx-spot-check-inner"></span></span>
        <span class="dx-spot-body">
          <span class="dx-spot-title-row">
            <span class="dx-spot-title">${esc(r.title)}</span>
            <span class="dx-spot-count">${n}</span>
          </span>
          <span class="dx-spot-desc">${esc(r.desc)}</span>
        </span>
        <span class="dx-spot-swatch dx-spot-swatch-${esc(STATUS_KEY[r.key] || r.key)}"></span>
      </button>
    `;
  }).join('');

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Spotlight</h3>
      <div class="sec-sub">Highlight tiles by their prediction status. Each toggle is independent — turn on as many as you like. Tiles matching at least one active status are highlighted; others are dimmed.</div>
      <div class="dx-spot-list">${rowsHtml}</div>
      <div class="dx-spot-actions">
        <button class="phen-action-btn" id="dx-spot-all-off" type="button">all off</button>
        <button class="phen-action-btn" id="dx-spot-all-on"  type="button">all on</button>
      </div>
    </div>
  `;

  inner.querySelectorAll('[data-spot-key]').forEach(el => {
    el.addEventListener('click', () => {
      const k = el.dataset.spotKey;
      if (state.spotlightActive.has(k)) state.spotlightActive.delete(k);
      else state.spotlightActive.add(k);
      writeHash();
      syncToolbarChips();
      renderSidebarSpotlight();
      renderMap();
    });
  });
  document.getElementById('dx-spot-all-on').addEventListener('click', () => {
    state.spotlightActive = new Set(rows.map(r => r.key));
    writeHash();
    syncToolbarChips();
    renderSidebarSpotlight();
    renderMap();
  });
  document.getElementById('dx-spot-all-off').addEventListener('click', () => {
    state.spotlightActive = new Set();
    writeHash();
    syncToolbarChips();
    renderSidebarSpotlight();
    renderMap();
  });
}

// =============================================================
//   Public helper for renderTile in map.js to query whether an
//   FC should get the amber discourse ring.
// =============================================================
function isFCConnectedToSelectedDiscourse(fcId) {
  if (!state.selectedDiscourseNode) return false;
  const fcSet = DATA && DATA.fcs_connected_to_discourse && DATA.fcs_connected_to_discourse[state.selectedDiscourseNode];
  return !!(fcSet && fcSet.has(fcId));
}

// =============================================================
//   Update C — discourse-highlight ring badges
//
//   When a discourse node is selected, the amber ring lights up every
//   FC it connects to. The badge sits in the top-right corner of each
//   lit-up tile; clicking it opens a sidebar card listing the discourse
//   edges between the selected discourse node and that FC.
//
//   A single (discourse-node, FC) pair can carry multiple edges of
//   different types (e.g. SU(5) GUT has both a candidate-hosting and a
//   produces-classification edge to some FCs). The badge shows a count
//   when N > 1; the card renders each edge as its own row.
// =============================================================

// Returns the HTML for the badge to inject in renderTile, or '' when
// the badge should not appear (no discourse selected OR no edges to
// this FC). The badge is rendered inside the tile (absolute-positioned
// via CSS) so it sits above the discourse-highlight ring's ::after
// pseudo-element without z-index gymnastics.
function renderDiscourseEdgeBadge(fc) {
  if (!state.selectedDiscourseNode) return '';
  const key = state.selectedDiscourseNode + '|' + fc.id;
  const edges = DATA && DATA.discourse_edges_by_fc_pair && DATA.discourse_edges_by_fc_pair[key];
  if (!edges || !edges.length) return '';
  const node = DATA.discourse_by_id && DATA.discourse_by_id[state.selectedDiscourseNode];
  if (!node) return '';
  const icon = DISCOURSE_TYPE_ICONS[node.type] || '·';
  const n = edges.length;
  const countHtml = (n > 1) ? `<span class="dc-edge-badge-count">${n}</span>` : '';
  const titleText = `Show discourse-edge${n>1?'s':''} from ${node.label} (${n})`;
  return `<button type="button" class="dc-edge-badge" data-disc-edge-fc="${esc(fc.id)}" data-disc-edge-node="${esc(state.selectedDiscourseNode)}" title="${esc(titleText)}" aria-label="${esc(titleText)}">
    <span class="dc-edge-badge-icon" aria-hidden="true">${esc(icon)}</span>${countHtml}
  </button>`;
}

// Lifecycle — select / clear the (node, fc) pair. The 'discourse-edges'
// activePanel value signals the renderer dispatcher in sidebar.js.
function selectDiscourseEdges(nodeId, fcId) {
  if (!nodeId || !fcId) return;
  const node = DATA.discourse_by_id && DATA.discourse_by_id[nodeId];
  const fc   = FC_BY_ID && FC_BY_ID[fcId];
  if (!node || !fc) return;
  // The badge card sits on top of the discourse-node selection — keep
  // the parent discourse selection so the amber ring stays lit while
  // the card is open. But clear other competing selections.
  state.selectedDiscourseNode = nodeId;
  state.selectedDiscourseEdgesPair = { nodeId: nodeId, fcId: fcId };
  state.selectedFC = null;
  state.selectedCell = null;
  state.selectedEdgeId = null;
  state.selectedGlossaryTerm = null;
  state.activePanel = 'discourse-edges';
  state.predFilter = 'all';
  writeHash();
  renderSidebarDiscourseEdges(nodeId, fcId);
  document.getElementById('sidebar').scrollTop = 0;
  renderMap();   // re-render so any selected-state visuals refresh
  if (typeof closeBrowseMenu === 'function') closeBrowseMenu();
  if (typeof syncSidebarQuickBar === 'function') syncSidebarQuickBar();
}

function clearDiscourseEdgeSelection() {
  state.selectedDiscourseEdgesPair = null;
}

// Renderer — discourse-edges card. Header pills (discourse → FC),
// then one section per edge: type label, description, optional cell
// pills + nature/discharge_status for bears-on, optional citations.
// Reuses renderEdgeRow / renderDischargeStatus / pill helpers above.
function renderSidebarDiscourseEdges(nodeId, fcId) {
  const inner = document.getElementById('sidebar-inner');
  const node = DATA.discourse_by_id && DATA.discourse_by_id[nodeId];
  const fc   = FC_BY_ID && FC_BY_ID[fcId];
  if (!node || !fc) {
    inner.innerHTML = '<div class="sidebar-section"><em style="color:var(--ink-mute)">Discourse-edges not found.</em></div>';
    return;
  }
  const edges = (DATA.discourse_edges_by_fc_pair && DATA.discourse_edges_by_fc_pair[nodeId + '|' + fcId]) || [];

  const fromPill = renderDiscoursePill(nodeId);
  const toPill   = renderFCPill(fcId);

  const sections = edges.map(e => {
    const typeLbl = DISCOURSE_TYPE_LABELS_EDGE[e.type] || e.type;
    const arrow = (e.direction === 'out') ? '→' : '←';
    // For bears-on edges, surface nature + discharge_status. For uses /
    // produces / emergence / candidate-* edges those fields are typically
    // absent; the renderer no-ops cleanly when they are.
    const naturePill = e.nature
      ? `<span class="dx-nature-pill dx-nature-${esc(e.nature)}">${esc(e.nature)}</span>`
      : '';
    const dsHtml = renderDischargeStatus(e.discharge_status);
    const cellPillsHtml = (e.cell_refs && e.cell_refs.length)
      ? `<div class="de-card-cells"><div class="de-card-cells-head">${renderFCPill(fcId)}</div>${renderCellRefPills(fcId, e.cell_refs)}</div>`
      : '';
    const citsHtml = (e.citations && e.citations.length)
      ? `<ul class="de-card-citations">${e.citations.map(c => `<li>${esc(c)}</li>`).join('')}</ul>`
      : '';
    return `
      <div class="de-card-edge">
        <div class="de-card-edge-head">
          <span class="de-card-edge-type">${esc(typeLbl)}</span>
          <span class="de-card-edge-arrow" aria-hidden="true">${arrow}</span>
          ${naturePill}
        </div>
        ${e.description ? `<div class="de-card-edge-desc">${formatPara(e.description)}</div>` : ''}
        ${dsHtml ? `<div class="de-card-edge-discharge">${dsHtml}</div>` : ''}
        ${cellPillsHtml}
        ${citsHtml}
      </div>`;
  }).join('');

  const headerCount = (edges.length === 1) ? '' : ` <span style="color:var(--ink-mute);font-weight:400">· ${edges.length}</span>`;

  inner.innerHTML = `
    <div class="sb-crumb">
      <div class="crumb-trail"><span class="crumb-current">Discourse-edges${headerCount}</span></div>
      <button class="crumb-close" title="Close (Esc)">×</button>
    </div>

    <div class="detail-card discourse-edges-card">
      <div class="de-card-endpoints">
        <span class="de-card-endpoint">${fromPill}</span>
        <span class="de-card-arrow" aria-hidden="true">→</span>
        <span class="de-card-endpoint">${toPill}</span>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Edge${edges.length === 1 ? '' : 's'}${headerCount}</h3>
      ${edges.length ? sections : '<em style="color:var(--ink-mute)">No edges recorded between these nodes.</em>'}
    </div>
  `;

  inner.querySelector('.crumb-close').addEventListener('click', clearSelection);
  // FC pills inside the card jump to the FC
  inner.querySelectorAll('[data-fc-jump]').forEach(el => {
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      selectFC(el.getAttribute('data-fc-jump'));
    });
  });
  // FC-cell pills jump to the cell
  inner.querySelectorAll('[data-fc-cell-jump]').forEach(el => {
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      const parts = el.getAttribute('data-fc-cell-jump').split('|');
      if (parts.length === 2) selectCell(parts[0], parts[1]);
    });
  });
  // Discourse pills jump back to the parent discourse card
  inner.querySelectorAll('[data-disc-jump]').forEach(el => {
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      selectDiscourseNode(el.getAttribute('data-disc-jump'));
    });
  });
}

// Pretty labels for the discourse-EDGE types (not node types — already
// have DISCOURSE_TYPE_LABELS for those). Used only by the badge card.
var DISCOURSE_TYPE_LABELS_EDGE = {
  'uses-classification':        'uses classification',
  'produces-classification':    'produces classification',
  'bears-on':                   'bears on',
  'emergence':                  'emergence',
  'cross-architecture-emergence': 'cross-architecture emergence',
  'open-frontier-architecture-edge': 'frontier ↔ architecture',
  'open-frontier-content-edge': 'frontier ↔ regime content',
  'multi-architecture-interference-edge': 'multi-architecture interference',
  'candidate-hosting':          'candidate-hosting',
  'candidate-targeting':        'candidate-targeting',
};