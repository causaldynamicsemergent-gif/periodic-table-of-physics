// =============================================================
//   explorer-ranks.js
//
//   Sub-PR E6 — the quantitative-scale catalogue + per-kind
//   drill-down view.
//
//   Two surfaces:
//
//     • renderSidebarRanksCatalogue()
//         Default state of the panel. One row per physical
//         dimension (energy, mass, lifetime, length, coupling,
//         dimensionless quantity, dimensionless ratio,
//         σ-deviation), in physicist-natural display order.
//         Each row shows the count of entries in the dataset
//         plus a compact min → max range rendered through the
//         existing E4 `renderQS` atom so source units are
//         preserved in the overview. Click a row to drill into
//         the per-kind ranked list.
//
//     • renderSidebarRanksKind(kind)
//         Per-kind view. Breadcrumb back to the catalogue, a
//         panel head with kind name + entry count + min → max
//         span + one-line physicist-prose explanation of what
//         the bucket contains, an optional filter row (default
//         "all directions") that narrows by bound nature
//         (lower / upper / measured / exact / other), and a
//         ranked list sorted ascending by physical magnitude.
//         Each row carries:
//           – the bound-direction symbol (≳ / ≲ / blank for
//             measured value / nothing for exact / ~ for
//             unspecified bound) leading the value
//           – the value + units rendered via renderQS so the
//             T-conventions (log10, asymmetric uncertainty,
//             sigma-suffix, dimensionless suppression) handle
//             themselves
//           – a one-line description of what the value refers
//             to (cell content, prediction text, carrier label,
//             implication description, or reach summary)
//           – a host pill on the right that deep-links back to
//             the host card (cell card, FC card, frontier/
//             totality-approach card, or program card)
//           – a small surface chip ("cell" / "prediction" /
//             "frontier" / "totality" / "consequence" / "reach")
//             that tells the reader which structural surface
//             the entry sits on without surfacing schema
//             vocabulary
//           – an expandable citation block (collapsed by default,
//             clickable chevron to show the source-value-phrase
//             prose underneath)
//
//   Indexes consumed (built in explorer-data.js):
//     - DATA.qs_entries                       — full flat array of qs entries
//     - DATA.qs_entries_by_kind               — entries per kind, magnitude-sorted
//     - DATA.qs_kind_summary                  — per-kind {count, minEntry, maxEntry, hasUnranked}
//     - DATA.cell_id_to_fc_id                 — for cell-target deep-links
//     - DATA.discourse_by_id                  — for host pill rendering
//     - FC_BY_ID                              — for FC label lookup
//
//   Vocabulary discipline (PHYSICIST_FACING_VOCABULARY.md §3, §4):
//   no schema field names appear in UI text. "quantitative_scale",
//   "kind", "bound_direction", "log10", "uncertainty", "host",
//   "surface", "predictive_yield", "if_real_implies", "resolves",
//   and "predictions_per_program" never surface as labels,
//   tooltips, or chip text. The panel uses physicist-natural
//   phrases: "Energy scales", "Mass scales", "Lifetime scales",
//   "Length scales", "Coupling strengths", "Dimensionless
//   quantities", "Dimensionless ratios", "σ-deviation entries",
//   "Lower bound", "Upper bound", "Measured value", "Exact value",
//   "Bound", "cell", "prediction", "frontier", "totality",
//   "consequence", "reach".
// =============================================================


// =============================================================
//   Kind metadata — display order, label, plural, blurb, color
//   token, sort_order in the catalogue.
//
//   Display order rationale: energy and mass first (the iconic
//   HEP scales), then lifetime + length (the other dimensional
//   kinds), then coupling + ratio + dimensionless (the
//   dimensionless family with coupling first because it carries
//   the most physics-load-bearing entries), then sigma_deviation
//   (a special category — measure of disagreement, not a scale).
//
//   Color tokens map each kind to one of the project palette
//   accents. Mass uses brick-red because masses are the iconic
//   physics quantity; energy uses blue because energies are the
//   structural scaffolding; length green for spatial extent;
//   time gold for temporal evolution; coupling purple for the
//   "tying together" semantics; dimensionless / ratio /
//   sigma-deviation use neutral ink shades since they read as
//   abstract pure numbers.
// =============================================================
const RANKS_KIND_META = {
  'energy_scale': {
    label:        'Energy scales',
    short:        'energy',
    blurb:        'Characteristic energies — temperature, transition gaps, mass-energy equivalents, vacuum-scale commitments. Spans the eV regime of condensed-matter transitions up to the Planck scale.',
    icon:         '⚡',
    pillClass:    'rk-kind-pill rk-kind-energy',
    sortOrder:    0,
  },
  'mass': {
    label:        'Mass scales',
    short:        'mass',
    blurb:        'Particle masses, condensed-matter excitation masses, mass-squared splittings, astrophysical and cosmological mass commitments. Spans the eV-scale of dark-matter candidate constraints up to the Planck mass.',
    icon:         '⊙',
    pillClass:    'rk-kind-pill rk-kind-mass',
    sortOrder:    1,
  },
  'time': {
    label:        'Lifetime scales',
    short:        'lifetime',
    blurb:        'Decay lifetimes, oscillation periods, characteristic timescales for relaxation or formation, age-of-universe commitments. The strongest experimental lower bounds on stability — proton decay, neutron decay — live here.',
    icon:         '⏳',
    pillClass:    'rk-kind-pill rk-kind-time',
    sortOrder:    2,
  },
  'length': {
    label:        'Length scales',
    short:        'length',
    blurb:        'Characteristic spatial extents — coherence lengths, correlation scales, astrophysical and cosmological lengths, Planck length commitments.',
    icon:         '↔',
    pillClass:    'rk-kind-pill rk-kind-length',
    sortOrder:    3,
  },
  'coupling': {
    label:        'Coupling strengths',
    short:        'coupling',
    blurb:        'Dimensionless and dimensional coupling constants — gauge couplings, Yukawa couplings, axion-photon couplings, electroweak mixings. The empirically-measured fundamental constants and their upper bounds.',
    icon:         '⊗',
    pillClass:    'rk-kind-pill rk-kind-coupling',
    sortOrder:    4,
  },
  'ratio': {
    label:        'Dimensionless ratios',
    short:        'ratio',
    blurb:        'Dimensionless physical ratios — primordial helium fraction, scalar-to-tensor ratio, neutron-to-proton ratio at decoupling, baryon-to-photon ratio. Each ratio is a structural commitment about how two scales relate.',
    icon:         '÷',
    pillClass:    'rk-kind-pill rk-kind-ratio',
    sortOrder:    5,
  },
  'dimensionless': {
    label:        'Dimensionless quantities',
    short:        'dimensionless',
    blurb:        'Pure-number commitments — quantum numbers, critical exponents, structural integers from formal classifications (Catalan numbers, dimensions of irreducible representations), and exact theoretical values like η/s = 1/(4π) and Q_quark = 2/3.',
    icon:         '#',
    pillClass:    'rk-kind-pill rk-kind-dimensionless',
    sortOrder:    6,
  },
  'sigma_deviation': {
    label:        'σ-deviation entries',
    short:        'σ-deviation',
    blurb:        'Statistical tension between theory and experiment, recorded in units of σ. Includes the discovery-floor sensitivity of forward-looking programs (HK, DUNE, JUNO mass-ordering 3σ / 5σ targets) and the empirical tension level of carrier frontiers (muon g-2 at 0.6σ post-2025 lattice consolidation).',
    icon:         'σ',
    pillClass:    'rk-kind-pill rk-kind-sigma',
    sortOrder:    7,
  },
};

const RANKS_KIND_ORDER = Object.keys(RANKS_KIND_META)
  .sort((a, b) => RANKS_KIND_META[a].sortOrder - RANKS_KIND_META[b].sortOrder);


// =============================================================
//   Surface metadata — short chip label + tooltip.
//
//   Six surfaces:
//     cell-direct        →  "cell"
//     cell-prediction    →  "prediction"   (attached to a cell)
//     fc-prediction      →  "prediction"   (attached to the classification)
//     carrier-frontier   →  "frontier"     (open-frontier headline)
//     carrier-totality   →  "totality"     (totality-approach headline)
//     implication        →  "consequence"  (forced consequence under if-real)
//     experimental-reach →  "reach"        (sensitivity of an experimental program)
//
//   The short labels are physicist-natural. Tooltips explain the
//   structural origin in one sentence, no schema vocabulary.
// =============================================================
const RANKS_SURFACE_META = {
  'cell-direct': {
    label:   'cell',
    tooltip: 'Numerical commitment attached to a specific cell in a formal classification.',
  },
  'cell-prediction': {
    label:   'prediction',
    tooltip: 'Numerical commitment carried by a prediction attached to a specific cell.',
  },
  'fc-prediction': {
    label:   'prediction',
    tooltip: 'Numerical commitment carried by a prediction at the formal-classification level.',
  },
  'carrier-frontier': {
    label:   'frontier',
    tooltip: 'Headline numerical commitment of an open frontier of physics.',
  },
  'carrier-totality': {
    label:   'totality',
    tooltip: 'Headline numerical commitment of a candidate-foundational program (totality approach).',
  },
  'implication': {
    label:   'consequence',
    tooltip: 'Quantitative consequence forced by a conditional resolution of an open frontier or totality approach — "if X is real, then this scale is forced".',
  },
  'experimental-reach': {
    label:   'reach',
    tooltip: 'Experimental program\'s sensitivity to a documented target — how far the program can probe.',
  },
};


// =============================================================
//   Direction-filter metadata — labels for the per-kind filter
//   chips. Five categories, exhaustive over (bound_direction,
//   uncertainty) combinations per Rule 34:
//
//     all       — every entry, no filter
//     lower     — bound_direction = "lower" (only meaningful when
//                 uncertainty = null per Rule 34)
//     upper     — bound_direction = "upper"
//     measured  — bound_direction = "two-sided" AND uncertainty
//                 non-null. The value carries a documented σ.
//     exact     — bound_direction = "two-sided" AND uncertainty
//                 null. The value is a theoretically-exact /
//                 structural commitment (Q = 2/3, η/s = 1/(4π),
//                 etc.).
//     other     — bound_direction = "unspecified" (catch-all when
//                 direction can't be determined from the citation).
// =============================================================
const RANKS_DIRECTION_FILTERS = [
  { id: 'all',      label: 'All directions' },
  { id: 'lower',    label: 'Lower bound'    },
  { id: 'upper',    label: 'Upper bound'    },
  { id: 'measured', label: 'Measured value' },
  { id: 'exact',    label: 'Exact value'    },
  { id: 'other',    label: 'Other bound'    },
];

// Bound-direction symbol shown leading the value — mirrors the
// convention in explorer-qs.js. Used in compact rendering where
// renderQS isn't called (the catalogue row's min/max pills wrap
// renderQS, so this is mostly for the per-kind drill-down row).
const RANKS_BD_SYMBOL = {
  'lower':       '≳',
  'upper':       '≲',
  'two-sided':   '=',
  'unspecified': '~',
};


// =============================================================
//   Direction-filter matcher — returns true if an entry passes
//   the active filter.
// =============================================================
function ranksEntryMatchesFilter(entry, filter) {
  if (!filter || filter === 'all') return true;
  const qs = entry.qs || {};
  const bd = qs.bound_direction;
  const unc = qs.uncertainty;
  if (filter === 'lower')    return bd === 'lower';
  if (filter === 'upper')    return bd === 'upper';
  if (filter === 'measured') return bd === 'two-sided' && unc != null;
  if (filter === 'exact')    return bd === 'two-sided' && unc == null;
  if (filter === 'other')    return bd === 'unspecified';
  return true;
}


// =============================================================
//   Host-pill renderer — deep-links into the appropriate host
//   card (cell card via selectCell, FC card via selectFC,
//   discourse-node card via selectDiscourseNode).
// =============================================================
function ranksHostPill(entry) {
  if (!entry) return '';
  const surface = entry.surface;

  // Cell-direct or cell-prediction → cell pill, jumps to the cell card
  if (surface === 'cell-direct' || surface === 'cell-prediction') {
    const fcId = entry.fc_id;
    const cellId = entry.cell_id;
    const cellLabel = entry.host_label || cellId || 'cell';
    if (fcId && cellId) {
      return `<button type="button" class="dx-cell-pill rk-host-pill rk-host-pill-cell"
        data-fc-cell-jump="${esc(fcId)}|${esc(cellId)}"
        title="Open ${esc(cellLabel)} in its formal classification">${esc(cellLabel)}</button>`;
    }
  }

  // FC-prediction → FC pill, jumps to the FC card
  if (surface === 'fc-prediction') {
    const fcId = entry.fc_id;
    const fcLabel = entry.host_label || fcId || 'classification';
    if (fcId) {
      return `<button type="button" class="dx-cell-pill rk-host-pill rk-host-pill-fc"
        data-fc-jump="${esc(fcId)}"
        title="Open ${esc(fcLabel)}">${esc(fcLabel)}</button>`;
    }
  }

  // Carrier (open-frontier / totality-approach) or implication →
  // discourse-node pill, jumps to the carrier card
  if (surface === 'carrier-frontier' || surface === 'carrier-totality' || surface === 'implication') {
    const nodeId = entry.host_id;
    if (nodeId && typeof renderDiscoursePill === 'function') {
      return renderDiscoursePill(nodeId);
    }
    const nodeLabel = entry.host_label || nodeId || 'carrier';
    return `<button type="button" class="dx-disc-pill rk-host-pill"
      data-disc-jump="${esc(nodeId)}"
      title="Open ${esc(nodeLabel)}">${esc(nodeLabel)}</button>`;
  }

  // Experimental-reach → program pill, jumps to the program card
  if (surface === 'experimental-reach') {
    const programId = entry.host_id;
    if (programId && typeof renderDiscoursePill === 'function') {
      return renderDiscoursePill(programId);
    }
    const programLabel = entry.host_label || programId || 'program';
    return `<button type="button" class="dx-disc-pill rk-host-pill"
      data-disc-jump="${esc(programId)}"
      title="Open ${esc(programLabel)}">${esc(programLabel)}</button>`;
  }

  return '';
}


// =============================================================
//   Context label — small secondary text under the description,
//   identifying the structural neighborhood the entry lives in.
//   For cells, the owning classification. For predictions, the
//   classification (FC-prediction) or the owning cell + FC
//   (cell-prediction). For carriers, the type word. For
//   implications, the carrier label. For experimental-reach,
//   the target the program addresses.
// =============================================================
function ranksContextLabel(entry) {
  if (!entry) return '';
  const surface = entry.surface;

  if (surface === 'cell-direct') {
    const fcId = entry.fc_id;
    if (fcId && typeof FC_BY_ID !== 'undefined' && FC_BY_ID[fcId]) {
      return FC_BY_ID[fcId].label || fcId;
    }
    return '';
  }
  if (surface === 'cell-prediction') {
    const fcId = entry.fc_id;
    const cellLabel = entry.host_cell_label;
    const fcLabel = (fcId && typeof FC_BY_ID !== 'undefined' && FC_BY_ID[fcId]) ? FC_BY_ID[fcId].label : '';
    if (cellLabel && fcLabel) return `prediction on ${cellLabel} · ${fcLabel}`;
    if (fcLabel) return `prediction on cell · ${fcLabel}`;
    return 'prediction on cell';
  }
  if (surface === 'fc-prediction') {
    const fcId = entry.fc_id;
    if (fcId && typeof FC_BY_ID !== 'undefined' && FC_BY_ID[fcId]) {
      return `prediction · ${FC_BY_ID[fcId].label || fcId}`;
    }
    return 'prediction';
  }
  if (surface === 'carrier-frontier')  return 'open frontier';
  if (surface === 'carrier-totality')  return 'totality approach';
  if (surface === 'implication') {
    const carrierId = entry.host_id;
    const carrier = (typeof DATA !== 'undefined' && DATA.discourse_by_id) ? DATA.discourse_by_id[carrierId] : null;
    const carrierLabel = (carrier && carrier.label) || carrierId;
    return `forced consequence of ${carrierLabel}`;
  }
  if (surface === 'experimental-reach') {
    const targetLabel = entry.reach_target_label;
    if (targetLabel) return `experimental reach toward ${targetLabel}`;
    return 'experimental reach';
  }
  return '';
}


// =============================================================
//   Range-pair rendering — used by both the catalogue rows and
//   the per-kind panel head. Renders the smallest-magnitude and
//   largest-magnitude entries' values through renderQS so source
//   units are preserved.
// =============================================================
function ranksRenderRangePair(minEntry, maxEntry) {
  if (!minEntry && !maxEntry) return '';
  const minHtml = (minEntry && typeof renderQS === 'function')
    ? renderQS(minEntry.qs, {})
    : '';
  const maxHtml = (maxEntry && typeof renderQS === 'function')
    ? renderQS(maxEntry.qs, {})
    : '';
  if (minHtml && maxHtml && minEntry !== maxEntry) {
    return `<span class="rk-range-min">${minHtml}</span><span class="rk-range-sep">→</span><span class="rk-range-max">${maxHtml}</span>`;
  }
  // Single-entry kind, or only one of min/max present
  return minHtml || maxHtml;
}


// =============================================================
//   One rank-list row — used by the per-kind drill-down list.
// =============================================================
function ranksRenderRow(entry, idx, kind) {
  if (!entry) return '';
  const qs = entry.qs || {};
  const unc = qs.uncertainty;
  const bd = qs.bound_direction;

  // Bound-direction prefix symbol (only when uncertainty is null
  // and bd carries directional meaning; matches renderQS's
  // internal handling, included here so the row's *display
  // column for direction* is consistent independent of how
  // renderQS formats the value).
  // We do NOT duplicate the symbol — renderQS already emits it.
  // We emit a left-column "direction tag" instead, which is a
  // short word ("Lower" / "Upper" / "Measured" / "Exact" / "Bound")
  // for the dense list reader scanning for a kind of entry.
  let directionTag = '';
  if (bd === 'lower')          directionTag = 'Lower bound';
  else if (bd === 'upper')     directionTag = 'Upper bound';
  else if (bd === 'two-sided' && unc != null) directionTag = 'Measured';
  else if (bd === 'two-sided' && unc == null) directionTag = 'Exact';
  else if (bd === 'unspecified')              directionTag = 'Bound';

  const valueHtml = (typeof renderQS === 'function') ? renderQS(qs, {}) : esc(String(qs.value || ''));

  const description = entry.description || '';
  const descHtml = description ? (typeof formatPara === 'function' ? formatPara(description) : esc(description)) : '';

  const context = ranksContextLabel(entry);
  const contextHtml = context ? `<div class="rk-row-context">${esc(context)}</div>` : '';

  const hostHtml = ranksHostPill(entry);
  const surfaceMeta = RANKS_SURFACE_META[entry.surface] || { label: '', tooltip: '' };
  const surfaceChip = surfaceMeta.label
    ? `<span class="rk-row-surface" title="${esc(surfaceMeta.tooltip)}">${esc(surfaceMeta.label)}</span>`
    : '';

  const citations = (qs.citations || []).filter(Boolean);
  const hasCitations = citations.length > 0;
  const citeId = `rk-cite-${esc(kind)}-${idx}`;
  const citationsHtml = hasCitations
    ? `<button type="button"
        class="rk-row-citetoggle"
        data-rk-cite-toggle="${esc(citeId)}"
        aria-expanded="false"
        aria-controls="${esc(citeId)}"
        title="Show source citation${citations.length === 1 ? '' : 's'}">
        <span class="rk-row-citetoggle-chev">▸</span>
        <span class="rk-row-citetoggle-label">source${citations.length === 1 ? '' : 's'}</span>
      </button>
      <div id="${esc(citeId)}" class="rk-row-citations" hidden>
        ${citations.map(c => `<div class="rk-row-citation">${esc(c)}</div>`).join('')}
      </div>`
    : '';

  // Magnitude-unranked entries get a small visual indicator. They
  // appear at the end of the sorted list in their kind because the
  // walker sorts unranked entries after ranked ones.
  const unrankedHint = (entry.magnitude_ok === false)
    ? `<span class="rk-row-unranked" title="Sorted alphabetically — the units on this entry don't map onto a comparable physical magnitude.">unranked</span>`
    : '';

  return `
    <div class="rk-row" data-rk-row-idx="${idx}"${entry.fc_id ? ` data-rk-fc="${esc(entry.fc_id)}"` : ''}>
      <div class="rk-row-main">
        <div class="rk-row-left">
          ${directionTag ? `<div class="rk-row-direction">${esc(directionTag)}</div>` : ''}
          <div class="rk-row-value">${valueHtml}</div>
          ${unrankedHint}
        </div>
        <div class="rk-row-mid">
          ${descHtml ? `<div class="rk-row-desc">${descHtml}</div>` : ''}
          ${contextHtml}
          <div class="rk-row-meta">
            ${surfaceChip}
            ${citationsHtml ? citationsHtml : ''}
          </div>
        </div>
        <div class="rk-row-right">
          ${hostHtml}
        </div>
      </div>
    </div>
  `;
}


// =============================================================
//   Catalogue panel — default state, lists all 8 kinds with
//   counts and ranges.
// =============================================================
function renderSidebarRanksCatalogue() {
  const inner = document.getElementById('sidebar-inner');
  const summary = (DATA && DATA.qs_kind_summary) || {};
  const total = Object.values(summary).reduce((a, b) => a + (b.count || 0), 0);

  if (!total) {
    inner.innerHTML = `
      <div class="sidebar-section">
        <h3>Scales by kind</h3>
        <div class="rk-empty">No quantitative-scale entries are recorded in the current dataset.</div>
      </div>
    `;
    return;
  }

  const rows = RANKS_KIND_ORDER.map(kind => {
    const meta = RANKS_KIND_META[kind];
    const s = summary[kind] || { count: 0, minEntry: null, maxEntry: null };
    const count = s.count || 0;
    if (count === 0) {
      // Empty-kind row — non-clickable, muted
      return `
        <div class="rk-cat-row rk-cat-row-empty">
          <div class="rk-cat-row-head">
            <span class="${meta.pillClass}">${esc(meta.icon)} ${esc(meta.label)}</span>
            <span class="rk-cat-row-ct rk-cat-row-ct-empty">0 entries</span>
          </div>
          <div class="rk-cat-row-blurb">${esc(meta.blurb)}</div>
        </div>
      `;
    }
    const rangeHtml = ranksRenderRangePair(s.minEntry, s.maxEntry);
    return `
      <div class="rk-cat-row" data-rk-kind-jump="${esc(kind)}" role="button" tabindex="0">
        <div class="rk-cat-row-head">
          <span class="${meta.pillClass}">${esc(meta.icon)} ${esc(meta.label)}</span>
          <span class="rk-cat-row-ct">${count} entr${count === 1 ? 'y' : 'ies'}</span>
        </div>
        <div class="rk-cat-row-range">${rangeHtml}</div>
        <div class="rk-cat-row-blurb">${esc(meta.blurb)}</div>
      </div>
    `;
  }).join('');

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Scales by kind <span class="dx-section-ct">· ${total}</span></h3>
      <div class="sec-sub">
        Every quantitative bound and characteristic scale recorded in the map, grouped by physical
        dimension. Each row's range shows the smallest and largest values currently catalogued for that
        kind, in their original units. Click a row to open the ranked list of every entry.
      </div>
      <div class="rk-catlist">
        ${rows}
      </div>
    </div>
  `;
  // Wire kind-jump rows
  inner.querySelectorAll('[data-rk-kind-jump]').forEach(el => {
    el.addEventListener('click', () => selectRanksKind(el.dataset.rkKindJump));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRanksKind(el.dataset.rkKindJump);
      }
    });
  });
}


// =============================================================
//   Per-kind panel — opened by clicking a catalogue row or
//   landing on the `#/scales/<kind>` route.
// =============================================================
function renderSidebarRanksKind(kind) {
  const inner = document.getElementById('sidebar-inner');
  const meta = RANKS_KIND_META[kind];
  if (!meta) {
    inner.innerHTML = `
      <div class="sidebar-section">
        <h3>Scales by kind</h3>
        <div class="rk-empty">No kind named <code>${esc(String(kind))}</code> in the current dataset.</div>
        <button class="rk-back" data-rk-back="1">← Back to Scales by kind</button>
      </div>
    `;
    inner.querySelectorAll('[data-rk-back]').forEach(el =>
      el.addEventListener('click', () => switchSidebarPanel('ranks'))
    );
    return;
  }

  const entriesAll = (DATA && DATA.qs_entries_by_kind && DATA.qs_entries_by_kind[kind]) || [];
  const summary = (DATA && DATA.qs_kind_summary && DATA.qs_kind_summary[kind]) || { count: 0, minEntry: null, maxEntry: null };

  const filter = (state.selectedKindFilter && RANKS_DIRECTION_FILTERS.some(f => f.id === state.selectedKindFilter))
    ? state.selectedKindFilter
    : 'all';

  const entries = entriesAll.filter(e => ranksEntryMatchesFilter(e, filter));

  // Filter chip row — each chip shows count under the current filter
  const filterChips = RANKS_DIRECTION_FILTERS.map(f => {
    const n = (f.id === 'all') ? entriesAll.length : entriesAll.filter(e => ranksEntryMatchesFilter(e, f.id)).length;
    const active = (f.id === filter);
    return `<button type="button"
      class="rk-filter-chip ${active ? 'rk-filter-chip-active' : ''}"
      data-rk-filter="${esc(f.id)}"
      ${n === 0 && f.id !== 'all' ? 'disabled' : ''}>
      ${esc(f.label)} <span class="rk-filter-chip-ct">${n}</span>
    </button>`;
  }).join('');

  const rangeHtml = ranksRenderRangePair(summary.minEntry, summary.maxEntry);

  let bodyHtml;
  if (entries.length === 0) {
    bodyHtml = `
      <div class="rk-empty-filtered">
        No entries in the current dataset match the
        <strong>${esc(RANKS_DIRECTION_FILTERS.find(f => f.id === filter).label.toLowerCase())}</strong>
        filter under <strong>${esc(meta.label.toLowerCase())}</strong>.
        <button type="button" class="rk-filter-clear" data-rk-filter="all">Clear filter</button>
      </div>
    `;
  } else {
    bodyHtml = `
      <div class="rk-list">
        ${entries.map((e, i) => ranksRenderRow(e, i, kind)).join('')}
      </div>
    `;
  }

  inner.innerHTML = `
    <div class="sidebar-breadcrumb">
      <button class="crumb-link" data-rk-back="1">← Scales by kind</button>
      <button class="crumb-close" title="Clear selection">×</button>
    </div>
    <div class="sidebar-section rk-head-section">
      <div class="rk-head-pill"><span class="${meta.pillClass}">${esc(meta.icon)} ${esc(meta.label)}</span></div>
      <div class="rk-head-ct">${entriesAll.length} entr${entriesAll.length === 1 ? 'y' : 'ies'} catalogued</div>
      ${rangeHtml ? `<div class="rk-head-range">${rangeHtml}</div>` : ''}
      <div class="rk-head-blurb">${esc(meta.blurb)}</div>
      <div class="rk-head-sortnote">Sorted ascending by physical magnitude. Source units are preserved in each row.</div>
      <div class="rk-filter-row">${filterChips}</div>
    </div>
    ${bodyHtml}
  `;

  wireRanksKindLinks(inner);
}


// =============================================================
//   Wiring
// =============================================================
function wireRanksKindLinks(root) {
  if (!root) return;
  // Back link to catalogue
  root.querySelectorAll('[data-rk-back]').forEach(el => {
    el.addEventListener('click', () => switchSidebarPanel('ranks'));
  });
  // Close button on the breadcrumb clears the panel
  const closeBtn = root.querySelector('.crumb-close');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    state.selectedKind = null;
    state.selectedKindFilter = null;
    switchSidebarPanel('about');
  });
  // Filter-chip clicks
  root.querySelectorAll('[data-rk-filter]').forEach(el => {
    el.addEventListener('click', () => {
      if (el.disabled) return;
      const f = el.dataset.rkFilter;
      state.selectedKindFilter = (f === 'all') ? null : f;
      // Re-render to apply the filter
      renderSidebarRanksKind(state.selectedKind);
    });
  });
  // Citation expand/collapse
  // UX pass — scales rows light their classification on the map
  // (accumulate-toggle, mirroring tile clicks). Inner buttons keep their
  // own actions; clicks on them are ignored here.
  root.querySelectorAll('[data-rk-fc]').forEach(row => {
    row.addEventListener('click', ev => {
      if (ev.target && ev.target.closest && ev.target.closest('button, a')) return;
      if (typeof toggleTileSpotlight === 'function') toggleTileSpotlight(row.getAttribute('data-rk-fc'));
    });
  });
  root.querySelectorAll('[data-rk-cite-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const targetId = el.dataset.rkCiteToggle;
      const panel = root.querySelector(`#${CSS.escape(targetId)}`);
      if (!panel) return;
      const open = !panel.hidden;
      panel.hidden = open;
      el.setAttribute('aria-expanded', open ? 'false' : 'true');
      const chev = el.querySelector('.rk-row-citetoggle-chev');
      if (chev) chev.textContent = open ? '▸' : '▾';
    });
  });
  // Cell-target pills → selectCell
  root.querySelectorAll('[data-fc-cell-jump]').forEach(el => {
    el.addEventListener('click', () => {
      const [fcId, cellId] = el.dataset.fcCellJump.split('|');
      if (typeof selectCell === 'function') selectCell(fcId, cellId);
    });
  });
  // FC pills → selectFC
  root.querySelectorAll('[data-fc-jump]').forEach(el => {
    el.addEventListener('click', () => {
      if (typeof selectFC === 'function') selectFC(el.dataset.fcJump);
    });
  });
  // Discourse-node pills → selectDiscourseNode
  root.querySelectorAll('[data-disc-jump]').forEach(el => {
    el.addEventListener('click', () => {
      if (typeof selectDiscourseNode === 'function') selectDiscourseNode(el.dataset.discJump);
    });
  });
}


// =============================================================
//   Selection driver — opens the per-kind view.
// =============================================================
function selectRanksKind(kind) {
  state.selectedKind = kind;
  state.selectedKindFilter = null;  // reset filter on kind change
  state.activePanel = 'ranks-kind';
  // Clear competing selections so the panel takes over the sidebar
  state.selectedFC = null;
  state.selectedCell = null;
  if (typeof clearDiscourseSelection === 'function') clearDiscourseSelection();
  if (typeof clearGlossarySelection === 'function') clearGlossarySelection();
  if (typeof clearCrossClassEdgeSelection === 'function') clearCrossClassEdgeSelection();
  if (typeof clearDiscourseEdgeSelection === 'function') clearDiscourseEdgeSelection();
  if (typeof clearDiscriminatingSelection === 'function') clearDiscriminatingSelection();
  if (typeof writeHash === 'function') writeHash();
  renderSidebarRanksKind(kind);
  if (typeof syncSidebarQuickBar === 'function') syncSidebarQuickBar();
  if (typeof syncToolbarChips === 'function') syncToolbarChips();
}


// =============================================================
//   Clear selection — called by switchSidebarPanel when leaving
//   the per-kind view, mirroring the discriminating module.
// =============================================================
function clearRanksSelection() {
  state.selectedKind = null;
  state.selectedKindFilter = null;
}
