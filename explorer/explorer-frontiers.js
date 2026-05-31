// =============================================================
//   explorer-frontiers.js  —  E0 lead: open-frontiers-as-primary-surface
//   (parallel-views architecture)
//
//   Implements MENDELEEV_FRAME.md §7's explorer commitment: a top-level
//   "open questions" view, parallel to the structural-classifications
//   (FC tile-grid) view and the default landing surface. Each of the 11
//   open-frontier nodes renders as a primary card carrying the empirical
//   bound any resolution must satisfy, the structural reason the current
//   theory breaks down at that position, the named candidate resolutions
//   with their current viability, a teaser of what is structurally forced
//   if a resolution holds, and — per the focus-not-filter discipline —
//   the structural neighbourhood (the classifications that bear on the
//   frontier), navigable directly from the card.
//
//   Clicking a card opens the full frontier detail in the sidebar via the
//   existing renderFrontierCard path (selectDiscourseNode), which already
//   renders the carrier bound (renderQSCallout), the if-real-implies tree
//   (renderIfRealImpliesSection), the candidate-targeting edges, and the
//   experimental-coverage section (renderTargetedByTarget). This module
//   adds only the landing surface and the view toggle; it reuses the rich
//   card that already exists.
//
//   Vocabulary discipline (PHYSICIST_FACING_VOCABULARY.md §3): no schema
//   field names appear in any surface text. Bound directions render as
//   ≳ / ≲ / ≈ / ~; discharge_status values render as physicist-prose
//   viability tags; "candidate resolutions", "structurally constrained
//   by", "experimental coverage" are physics-prose framings of the
//   underlying fields.
// =============================================================

// --- data access -------------------------------------------------------

function openFrontierNodes() {
  const nodes = (typeof DATA !== 'undefined' && DATA && DATA.discourse_nodes) || [];
  return nodes.filter(n => n.type === 'open-frontier');
}

// bears-on edges incident to a frontier → [{ fcId, label, description }]
// (focus-not-filter: the frontier's structural neighbourhood)
function frontierBearsOn(frontierId) {
  const incident = (DATA.discourse_edges_by_node && DATA.discourse_edges_by_node[frontierId]) || [];
  const out = [];
  for (const e of incident) {
    if (e.type !== 'bears-on') continue;
    // bears-on goes formal-classification → frontier; the FC is the neighbour.
    const fcId = (FC_BY_ID && FC_BY_ID[e.neighbor]) ? e.neighbor
               : (FC_BY_ID && FC_BY_ID[e.from]) ? e.from : e.neighbor;
    const fc = FC_BY_ID && FC_BY_ID[fcId];
    out.push({ fcId, label: (fc && (fc.label || fc.full_name || fc.id)) || fcId, description: e.description });
  }
  return out;
}

// resolves edges targeting a frontier (experimental coverage, M4)
function frontierResolvers(frontierId) {
  return (DATA.resolves_by_target && DATA.resolves_by_target[frontierId]) || [];
}

// --- vocabulary-discipline renderers ----------------------------------

// discharge_status (a plain string on candidate_targeting) → physicist prose
function frontierViabilityLabel(ds) {
  if (!ds) return '';
  const key = String(ds).toLowerCase();
  const map = {
    'constrained-by-lhc': 'constrained by LHC searches',
    'partial': 'partially addresses',
    'gestural': 'early-stage',
    'gestural-to-partial': 'early-stage, partly developed',
    'philosophically contested': 'philosophically contested',
    'philosophically-contested': 'philosophically contested',
    'structural-only': 'structural framing only'
  };
  return map[key] || key.replace(/[-_]+/g, ' ');
}

// LaTeX for a single number (prefers 10^k notation for powers of ten)
function _frontierNumLatex(value, log10) {
  if (log10) return '10^{' + value + '}';
  if (value === 0) return '0';
  // detect clean powers of ten (e.g. 1e-10, 1e19)
  const abs = Math.abs(value);
  const exp = Math.log10(abs);
  if (Math.abs(exp - Math.round(exp)) < 1e-9) {
    const k = Math.round(exp);
    return (value < 0 ? '-' : '') + '10^{' + k + '}';
  }
  // otherwise a plain (possibly scientific) value
  const s = String(value);
  const m = s.match(/^(-?\d*\.?\d+)e([+-]?\d+)$/i);
  if (m) return m[1] + ' \\times 10^{' + parseInt(m[2], 10) + '}';
  return s;
}

function _frontierUnitsLatex(units) {
  if (!units) return '';
  // light touch: GeV^-1 → GeV^{-1}, e·cm stays, eV² stays
  return '\\,\\mathrm{' + String(units).replace(/\^(-?\d+)/g, '^{$1}').replace(/·/g, '\\cdot ') + '}';
}

// One-line empirical-bound rendering for the preview card. The fuller,
// contextual bound (with citations) lives in the sidebar card's
// renderQSCallout — this is the eight-second read.
function frontierBoundLine(qs) {
  if (!qs) {
    return '<div class="oq-bound oq-bound-absent">Empirical bound not yet recorded</div>';
  }
  const dir = qs.bound_direction;
  let sym;
  if (dir === 'lower') sym = '\\gtrsim';
  else if (dir === 'upper') sym = '\\lesssim';
  else if (dir === 'unspecified') sym = '\\sim';
  else sym = '\\approx'; // two-sided / characteristic
  const num = _frontierNumLatex(qs.value, qs.log10);
  const units = _frontierUnitsLatex(qs.units);
  let tex = '$' + sym + '\\, ' + num + units + '$';
  let tail = '';
  if (qs.kind === 'ratio' && qs.log10 && typeof qs.value === 'number') {
    tail = ' <span class="oq-bound-aside">(≈ ' + Math.abs(qs.value) + ' orders of magnitude)</span>';
  }
  const body = (typeof formatPara === 'function') ? formatPara(tex) : tex;
  return '<div class="oq-bound"><span class="oq-bound-label">Empirical bound</span> ' + body + tail + '</div>';
}

// "If real, forces …" teaser — counts resolutions and names the distinct
// kinds of structural consequence in prose. The full resolution →
// implication tree lives in the sidebar card (renderIfRealImpliesSection).
function frontierForcedTeaser(node) {
  const res = node.if_real_implies || [];
  if (!res.length) return '';
  const kindProse = {
    'new_FC': 'a new classification',
    'new_axis': 'a new classification axis',
    'forced_edge': 'a new cross-classification relation',
    'promotes_subtype': 'a promoted cell',
    'new_cell': 'a new cell',
    'no_structural_consequence': 'no new structure'
  };
  const kinds = new Set();
  for (const r of res) for (const imp of (r.implications || [])) {
    kinds.add(kindProse[imp.kind] || 'new structure');
  }
  const list = Array.from(kinds);
  const what = list.length ? list.slice(0, 3).join(', ') + (list.length > 3 ? ', …' : '') : 'structural consequences';
  const n = res.length;
  return '<div class="oq-forced"><span class="oq-forced-label">If a resolution holds, the table is forced to add:</span> '
       + esc(what) + ' <span class="oq-forced-count">(' + n + ' documented resolution' + (n === 1 ? '' : 's') + ')</span></div>';
}

function frontierCandidateChips(node) {
  const cands = node.candidate_targeting || [];
  if (!cands.length) return '';
  const chips = cands.map(c => {
    const v = frontierViabilityLabel(c.discharge_status);
    const vt = v ? ' <span class="oq-cand-viability">· ' + esc(v) + '</span>' : '';
    return '<span class="oq-cand-chip">' + esc(c.program) + vt + '</span>';
  }).join('');
  return '<div class="oq-cands"><span class="oq-cands-label">Candidate resolutions</span><div class="oq-cand-row">' + chips + '</div></div>';
}

// EM0·R — counts for the neighbourhood readout. Both ride existing
// indices; neither authors content (firewall §2 / META §8: these are
// substrate outputs, not authored cells).
//   fcRecurrenceCount: distinct classifications this FC shares a
//     cross-classification correspondence with (DATA.edges_by_fc) — the
//     periodicity analog, the same source EM0c marks on the tile grid.
//   fcForbiddenCount: positions this FC's constructive pattern rules out
//     (constructive_status === 'forbidden-by-pattern') — the same measure
//     server_info reports (22 map-wide). Deliberately NOT the
//     structurally_excluded content-sentinel, which counts differently;
//     that 22-vs-38 reconciliation is a separate data-side item.
function fcRecurrenceCount(fcId) {
  const edges = (typeof DATA !== 'undefined' && DATA.edges_by_fc && DATA.edges_by_fc[fcId]) || [];
  const partners = new Set();
  for (const e of edges) {
    const other = (e.from === fcId) ? e.to : e.from;
    if (other && other !== fcId) partners.add(other);
  }
  return partners.size;
}
function fcForbiddenCount(fcId) {
  const fc = (typeof FC_BY_ID !== 'undefined' && FC_BY_ID) ? FC_BY_ID[fcId] : null;
  if (!fc || !fc.cells) return 0;
  let n = 0;
  for (const c of fc.cells) if (c.constructive_status === 'forbidden-by-pattern') n++;
  return n;
}

function frontierNeighborhood(node) {
  const bears = frontierBearsOn(node.id);
  if (!bears.length) {
    return '<div class="oq-neigh oq-neigh-thin"><span class="oq-neigh-label">Structurally constrained by</span> <span class="oq-neigh-none">no classifications recorded yet</span></div>';
  }
  const pills = bears.map(b =>
    '<button type="button" class="oq-neighbor-pill" data-fc="' + esc(b.fcId) + '" title="Open this classification — the empty cell&#39;s structural neighbourhood">'
    + esc(b.label) + '</button>'
  ).join('');
  // EM0·R — the two first-impression indications MENDELEEV_FRAME §7 asks the
  // landing surface to carry, surfaced here without interaction: a
  // constructive prediction (a forbidden-by-pattern exclusion, today) and a
  // cross-classification recurrence. Both are properties of the constraining
  // classifications shown above, surfaced through the frontier's
  // neighbourhood — not claims about the frontier itself. Each clause renders
  // only when populated, so no count is fabricated where none exists.
  let totForb = 0, recurFcs = 0;
  for (const b of bears) {
    totForb += fcForbiddenCount(b.fcId);
    if (fcRecurrenceCount(b.fcId) > 0) recurFcs++;
  }
  const clauses = [];
  if (totForb > 0) {
    clauses.push('<span class="oq-neigh-readout-forb">' + totForb
      + ' position' + (totForb === 1 ? '' : 's') + ' the structure rules out</span>');
  }
  if (recurFcs > 0) {
    clauses.push('<span class="oq-neigh-readout-rec">' + recurFcs
      + (recurFcs === 1 ? ' classification here recurs' : ' of these recur')
      + ' across the map <span class="oq-neigh-rec-glyph" title="appears at a corresponding position in another classification">↔</span></span>');
  }
  const readout = clauses.length
    ? '<div class="oq-neigh-readout">Within this neighbourhood: ' + clauses.join(' · ') + '</div>'
    : '';
  return '<div class="oq-neigh"><span class="oq-neigh-label">Structurally constrained by</span><div class="oq-neigh-row">' + pills + '</div>' + readout + '</div>';
}

function frontierCoverageLine(node) {
  const res = frontierResolvers(node.id);
  if (!res.length) {
    return '<div class="oq-cov oq-cov-none">No experimental program currently recorded — structurally addressable, empirically open</div>';
  }
  const progs = [];
  const seen = new Set();
  for (const e of res) {
    const pid = e.from;
    if (seen.has(pid)) continue;
    seen.add(pid);
    const p = DATA.discourse_by_id && DATA.discourse_by_id[pid];
    progs.push((p && (p.label || p.full_name)) || pid);
  }
  const n = res.length;
  return '<div class="oq-cov"><span class="oq-cov-label">Experimental coverage</span> '
       + esc(progs.slice(0, 4).join(', ')) + (progs.length > 4 ? ', …' : '')
       + ' <span class="oq-cov-count">(' + n + ' channel' + (n === 1 ? '' : 's') + ')</span></div>';
}

// --- the preview card --------------------------------------------------

function renderFrontierPreviewCard(node) {
  const selected = (typeof state !== 'undefined' && state.selectedDiscourseNode === node.id) ? ' oq-card-selected' : '';
  const title = esc(node.full_name || node.label || node.id);
  const reasonKey = node.structural_reason_category;
  const reasonLabel = (typeof STRUCTURAL_REASON_LABELS !== 'undefined' && STRUCTURAL_REASON_LABELS[reasonKey])
    ? STRUCTURAL_REASON_LABELS[reasonKey] : (reasonKey ? String(reasonKey).replace(/[-_]+/g, ' ') : '');
  const reason = reasonLabel
    ? '<div class="oq-reason"><span class="oq-reason-label">Why it stays open</span> ' + esc(reasonLabel) + '</div>'
    : '';
  return '<article class="oq-card' + selected + '" data-frontier="' + esc(node.id) + '" tabindex="0" '
       + 'role="button" aria-label="Open full detail for ' + title + '">'
       +   '<header class="oq-card-head"><h3 class="oq-card-title">' + title + '</h3>'
       +     '<span class="oq-card-open">full detail →</span></header>'
       +   frontierBoundLine(node.quantitative_scale)
       +   reason
       +   frontierCandidateChips(node)
       +   frontierForcedTeaser(node)
       +   frontierNeighborhood(node)
       +   frontierCoverageLine(node)
       + '</article>';
}

// --- grouping / sequencing --------------------------------------------
//   Group by structural-reason category (matches the existing Browse →
//   Frontiers grouping), order groups by the smallest stratum present so
//   cross-architecture / foundational frontiers lead (FRAME §6: "M1
//   leads"), order cards alphabetically within a group.

function _stratumNum(s) {
  const v = parseFloat(s);
  return isNaN(v) ? 99 : v;
}

function groupFrontiersByReason(frontiers) {
  const groups = {};
  for (const n of frontiers) {
    const key = n.structural_reason_category || 'other';
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  }
  const arr = Object.keys(groups).map(key => {
    const items = groups[key].slice().sort((a, b) =>
      (a.full_name || a.id).localeCompare(b.full_name || b.id));
    const minStratum = Math.min.apply(null, items.map(i => _stratumNum(i.stratum)));
    const label = (typeof STRUCTURAL_REASON_LABELS !== 'undefined' && STRUCTURAL_REASON_LABELS[key])
      ? STRUCTURAL_REASON_LABELS[key] : (key === 'other' ? 'Other' : String(key).replace(/[-_]+/g, ' '));
    return { key, label, items, minStratum };
  });
  arr.sort((a, b) => (a.minStratum - b.minStratum) || a.label.localeCompare(b.label));
  return arr;
}

// --- the view ----------------------------------------------------------

function renderQuestionsView() {
  const ptContent = document.getElementById('pt-content');
  if (!ptContent) return;
  const pane = document.getElementById('map-pane');
  if (pane) pane.classList.add('view-questions');
  // The questions view is a scrollable card surface, not a zoomable map.
  if (typeof state !== 'undefined') { state.zoom = 1; state.panX = 0; state.panY = 0; }
  if (typeof applyZoom === 'function') applyZoom();

  const frontiers = openFrontierNodes();
  const intro = '<div class="oq-intro">'
    + '<div class="oq-intro-lede">The map organises settled physics so that what is <em>missing</em> can be '
    + 'characterised before it is found. Each open question below carries the bound any resolution must satisfy, '
    + 'the structural reason the current theory breaks down there, the candidate resolutions the literature has named, '
    + 'and what each would force if it turned out to be right.</div>'
    + '<div class="oq-intro-meta">' + frontiers.length + ' open frontiers · click a card for full detail · '
    + '<button type="button" class="oq-switch-inline" data-view="classifications">structural classifications →</button></div>'
    + '</div>';

  const grouped = groupFrontiersByReason(frontiers);
  const body = grouped.map(g =>
    '<section class="oq-group">'
    + '<h2 class="oq-group-head">' + esc(g.label) + '</h2>'
    + '<div class="oq-grid">' + g.items.map(renderFrontierPreviewCard).join('') + '</div>'
    + '</section>'
  ).join('');

  ptContent.innerHTML = '<div class="oq-view">' + intro + body + '</div>';
  wireFrontierCardLinks();
  syncViewToggle();
}

function wireFrontierCardLinks() {
  // Whole card → full detail in the sidebar (reuses renderFrontierCard).
  document.querySelectorAll('.oq-card[data-frontier]').forEach(card => {
    const open = () => {
      if (typeof selectDiscourseNode === 'function') selectDiscourseNode(card.dataset.frontier);
    };
    card.addEventListener('click', e => {
      if (e.target.closest('.oq-neighbor-pill')) return; // handled below
      open();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
  // Neighbourhood pills → walk into the constraining classification
  // (focus-not-filter, directly off the landing card).
  document.querySelectorAll('.oq-neighbor-pill[data-fc]').forEach(pill => {
    pill.addEventListener('click', e => {
      e.stopPropagation();
      if (typeof selectFC === 'function') selectFC(pill.dataset.fc);
    });
  });
  // Inline "structural classifications →" switch in the intro.
  document.querySelectorAll('.oq-switch-inline[data-view]').forEach(b => {
    b.addEventListener('click', e => { e.stopPropagation(); setActiveView(b.dataset.view); });
  });
}

// --- view toggle -------------------------------------------------------

function setActiveView(v) {
  const next = (v === 'classifications') ? 'classifications' : 'questions';
  if (typeof state === 'undefined') return;
  state.activeView = next;
  try { localStorage.setItem('mop-active-view', next); } catch (e) {}
  if (typeof writeHash === 'function') writeHash();
  if (typeof renderMap === 'function') renderMap(); // dispatches on activeView
  syncViewToggle();
  if (next === 'classifications') {
    // re-fit the freshly-rendered grid when nothing specific is selected
    setTimeout(() => {
      if (!state.selectedFC && typeof zoomFitToView === 'function') zoomFitToView();
    }, 40);
  }
}

function syncViewToggle() {
  const v = (typeof state !== 'undefined') ? state.activeView : 'questions';
  document.querySelectorAll('.view-toggle-btn[data-view]').forEach(b => {
    b.classList.toggle('active', b.dataset.view === v);
    b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false');
  });
  const pane = document.getElementById('map-pane');
  if (pane) pane.classList.toggle('view-questions', v === 'questions');
}

function wireViewToggle() {
  document.querySelectorAll('.view-toggle-btn[data-view]').forEach(b => {
    b.addEventListener('click', () => setActiveView(b.dataset.view));
  });
  // Optional keyboard shortcut: `v` cycles the active view. Guarded so it
  // never fires while typing or with the help overlay open.
  document.addEventListener('keydown', e => {
    if (e.key !== 'v' && e.key !== 'V') return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    const help = document.getElementById('help-overlay');
    if (help && help.classList.contains('show')) return;
    setActiveView(state.activeView === 'questions' ? 'classifications' : 'questions');
    e.preventDefault();
  });
  syncViewToggle();
}
