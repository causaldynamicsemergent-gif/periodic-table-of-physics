'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-map.js
//
//   Holds: the periodic-table renderer (renderMap, renderTile), the
//   hover tooltip (showTileTooltip / moveTooltip / hideTooltip), the
//   toolbar wiring (wireToolbar, syncToolbarChips), and zoom + pan
//   (applyZoom, clampPan, zoomFitToView, zoomIn, zoomOut, wireMapDragPan).
//
//   Reads: FCS / FC_BY_ID / SECTORS / state / CAT_ORDER / CLOSURE_ORDER /
//   STATUS_KEY / STATUS_LABEL / DATA / esc / showToast / yieldSegments
//   (all from data.js); PHEN_BY_FC / PHEN_CAT_BY_ID / PHEN_CATEGORIES /
//   PHEN_CAT_COLORS / drawPhenPhenOverlay (from phenomena.js); selectFC
//   (from sidebar.js — called only on click).
//
//   Load order in HTML: data → map → sidebar → phenomena. Map loads before
//   phenomena, so the runtime calls to PHEN_* and drawPhenPhenOverlay rely
//   on all four scripts being parsed before init() runs them.
// =============================================================

var ZOOM_MIN = 0.35;
var ZOOM_MAX = 2.0;

// =============================================================
//   In-tile cell visualisation (Update C — third item)
//
//   Each tile for an FC with <= MINI_GRID_THRESHOLD cells gets a small
//   grid of swatches showing each cell's content-state at a glance.
//   FCs with more than the threshold (sm-rep-content 36, tenfold-way 30,
//   freed-hopkins-cobordism 25) stay count-only — at that size the
//   swatches become noise rather than signal.
//
//   Encoding (priority high → low; a cell qualifying for multiple
//   buckets wins the highest-priority one):
//     excluded         — structurally-excluded ("Mendeleev-style positive
//                        non-existence"); diagonal-hatch swatch
//     has-falsified    — at least one falsified prediction (red)
//     has-confirmed    — at least one confirmed prediction (green)
//     has-tension      — at least one in-tension prediction (amber)
//     has-not-tested   — at least one not-yet-tested prediction (gray)
//     has-retro        — at least one retro-explanatory prediction (purple)
//     has-realized-only — populated cell with no live prediction (ink-faint)
//     empty            — cell exists in the classification but is
//                        currently empty (paper-3 with faint border)
// =============================================================
var MINI_GRID_THRESHOLD = 20;

function cellSwatchClass(cell, fc) {
  // structurally-excluded check mirrors the sidebar's cell-card check:
  // both the legacy content-string sentinel and the explicit boolean
  // appear in v34 (some cells have one, some the other, a few have both).
  var contentLower = String(cell.content || '').toLowerCase();
  if (cell.structurally_excluded || contentLower.indexOf('structurally-excluded') >= 0) {
    return 'excluded';
  }

  // Gather predictions: inline (cell-scoped, ~14 cells in v34) plus
  // FC-level predictions whose cell_ref / cell_id points at this cell.
  var inlinePreds = cell.predictions || [];
  var fcPreds = (fc.predictions || []).filter(function(p) {
    return p.cell_ref === cell.cell_id || p.cell_id === cell.cell_id;
  });
  var all = inlinePreds.concat(fcPreds);
  var statuses = {};
  for (var i = 0; i < all.length; i++) {
    if (all[i].status) statuses[all[i].status] = true;
  }

  if (statuses['falsified'])                 return 'has-falsified';
  if (statuses['confirmed'])                 return 'has-confirmed';
  if (statuses['unconfirmed-tension'])       return 'has-tension';
  if (statuses['unconfirmed-not-yet-tested']) return 'has-not-tested';
  if (statuses['retro-explanatory-only'])    return 'has-retro';

  if (cell.realized_examples && cell.realized_examples.length) {
    return 'has-realized-only';
  }
  return 'empty';
}

// For the tile-hover tooltip: a per-bucket count breakdown so the
// reader can decode swatch colors at a glance.
function tileCellBreakdown(fc) {
  var cells = (fc && fc.cells) || [];
  if (!cells.length) return null;
  var b = {
    excluded: 0, falsified: 0, confirmed: 0, tension: 0,
    notTested: 0, retro: 0, realizedOnly: 0, empty: 0,
    total: cells.length,
  };
  for (var i = 0; i < cells.length; i++) {
    var klass = cellSwatchClass(cells[i], fc);
    if      (klass === 'excluded')          b.excluded++;
    else if (klass === 'has-falsified')     b.falsified++;
    else if (klass === 'has-confirmed')     b.confirmed++;
    else if (klass === 'has-tension')       b.tension++;
    else if (klass === 'has-not-tested')    b.notTested++;
    else if (klass === 'has-retro')         b.retro++;
    else if (klass === 'has-realized-only') b.realizedOnly++;
    else                                    b.empty++;
  }
  return b;
}

// =============================================================
//   Periodic table render (Level 1; persistent)
// =============================================================
function renderMap() {
  // Group classifications
  let groupOf, groupOrder;
  if (state.group === 'sector') {
    groupOf = f => f.sector;
    groupOrder = SECTORS.slice();
  } else if (state.group === 'category') {
    groupOf = f => f.category;
    groupOrder = CAT_ORDER.slice();
  } else {
    groupOf = f => f.closure_level;
    groupOrder = CLOSURE_ORDER.slice();
  }
  const groups = {};
  for (const fc of FCS) {
    const k = groupOf(fc) || 'Other';
    if (!groups[k]) groups[k] = [];
    groups[k].push(fc);
  }
  const keys = groupOrder.filter(k => groups[k]).concat(
    Object.keys(groups).filter(k => !groupOrder.includes(k))
  );

  // Intro + stats
  const m = DATA._meta.counts;
  const intro = `
    <div class="pt-intro">
      <div class="blurb">
        <strong>v${DATA._meta.dataset_version}.</strong> Each tile below is a <em>formal classification</em>. Rows are sectors of physics. <strong>Hover</strong> a tile for a preview, <strong>click</strong> for full detail in the sidebar.
      </div>
      <div class="pt-stats">
        <div class="pt-stat"><span class="n">${m.formal_classifications}</span><span class="lbl">classifications</span></div>
        <div class="pt-stat"><span class="n">${m.cells}</span><span class="lbl">cells</span></div>
        <div class="pt-stat"><span class="n">${m.predictions}</span><span class="lbl">predictions</span></div>
        <div class="pt-stat"><span class="n">${m.cross_classification_edges}</span><span class="lbl">edges</span></div>
        <div class="pt-stat"><span class="n" style="color:var(--st-falsified)">${m.falsifications}</span><span class="lbl">falsified</span></div>
      </div>
    </div>
  `;

  // Build rows
  const rows = keys.map(k => {
    const arr = groups[k];
    const sub = state.group === 'sector'
      ? `${arr.length} class · ${arr.reduce((s,f)=>s+f.cell_count,0)} cells`
      : `${arr.length} class`;
    const tiles = arr.map(renderTile).join('');
    return `
      <div class="pt-row" data-key="${esc(k)}">
        <div class="pt-row-label">${esc(k)}<span class="row-meta">${sub}</span></div>
        <div class="pt-row-tiles">${tiles}</div>
      </div>
    `;
  }).join('');

  const ptContent = document.getElementById('pt-content');
  ptContent.innerHTML = `<div class="pt-table" id="pt-table">${rows}<svg class="pt-overlay-svg" id="pt-overlay"></svg></div>`;

  // Wire tile interactions
  ptContent.querySelectorAll('.pt-tile').forEach(el => {
    el.addEventListener('click', () => selectFC(el.dataset.fc));
    el.addEventListener('mouseenter', e => showTileTooltip(e, el.dataset.fc));
    el.addEventListener('mousemove',  e => moveTooltip(e));
    el.addEventListener('mouseleave', hideTooltip);
  });

  // Overlay
  if (state.overlay === 'phen-phen') drawPhenPhenOverlay();
  else document.getElementById('pt-overlay').classList.remove('show');
}

function renderTile(fc) {
  const y = yieldSegments(fc);
  // Update B — multi-select spotlight. Empty set = no spotlight; non-empty
  // = dim every tile whose yield_stats doesn't intersect, spot every tile
  // that does.
  const anySpot      = state.spotlightActive && state.spotlightActive.size > 0;
  const matchesSpot  = anySpot && Array.from(state.spotlightActive).some(s => (fc.yield_stats[s] || 0) > 0);
  const dim          = anySpot && !matchesSpot;
  const spot         = matchesSpot;
  const selected     = (state.selectedFC === fc.id);
  const fals         = fc.yield_stats.falsified || 0;
  // Update B — discourse-highlight ring: selecting an architecture / frontier /
  // totality lights up the FCs it connects to. Class adds outline + dashed inner
  // stroke via CSS (composes with the phenomena box-shadow rings).
  const discourseHighlight = (typeof isFCConnectedToSelectedDiscourse === 'function')
    ? isFCConnectedToSelectedDiscourse(fc.id)
    : false;

  // Phenomena highlight: tile is "on" if any active phenomenon points at it.
  // Color resolution: collect the set of categories whose active phenomena hit
  // this tile, and build a multi-ring outline (one ring per category) so a
  // tile that's hit by, say, both Particles and Cosmological shows both colours.
  const entry = PHEN_BY_FC[fc.id];
  const anyPhenActive = state.phenomenaActive.size > 0;
  let phenOn = false;
  let phenOffWhileActive = false;
  let phenStyle = '';
  if (entry) {
    const matchedCats = [];
    for (const cat of PHEN_CATEGORIES) {
      // Order rings by canonical category order so visual stacking is stable
      const hasAny = [...entry.phenIds].some(pid =>
        PHEN_CAT_BY_ID[pid] === cat && state.phenomenaActive.has(pid));
      if (hasAny) matchedCats.push(cat);
    }
    if (matchedCats.length > 0) {
      phenOn = true;
      // Stack box-shadow rings: each ring is 2px thick. Outermost ring is the
      // first matched category in PHEN_CATEGORIES order.
      const rings = matchedCats.slice(0, 3).map((cat, i) => {
        const col = PHEN_CAT_COLORS[cat];
        const r = 2 * (i + 1);
        return `0 0 0 ${r}px ${col}`;
      });
      // Soft outer glow using the dominant (first) category color
      const dom = PHEN_CAT_COLORS[matchedCats[0]];
      // Apply as inline style. The .phen-on class also tints the background.
      phenStyle = `box-shadow:${rings.join(', ')}, 0 0 14px ${dom}55; --phen-tint:${dom}1a;`;
    } else if (anyPhenActive) {
      phenOffWhileActive = true;
    }
  } else if (anyPhenActive) {
    phenOffWhileActive = true;
  }

  // Update C — in-tile cell visualisation. FCs at or below the threshold
  // get a swatch grid showing each cell's content-state; larger FCs stay
  // count-only (the swatches become noise above ~20 cells).
  var miniGridHtml = '';
  if (fc.cells && fc.cells.length > 0 && fc.cells.length <= MINI_GRID_THRESHOLD) {
    var swatches = fc.cells.map(function(c) {
      return '<span class="tile-swatch ' + cellSwatchClass(c, fc) + '"></span>';
    }).join('');
    miniGridHtml = '<div class="tile-cells-mini" aria-hidden="true">' + swatches + '</div>';
  }

  return `
    <div class="pt-tile ${fc.category}${dim?' dim':''}${spot?' spot':''}${selected?' selected':''}${phenOn?' phen-on':''}${phenOffWhileActive?' phen-off-and-active':''}${discourseHighlight?' discourse-highlight':''}" data-fc="${esc(fc.id)}" tabindex="0" aria-label="${esc(fc.label)}"${phenStyle?' style="'+phenStyle+'"':''}>
      <div class="tile-corner">
        <span class="cell-ct">${fc.cell_count}c · ${fc.prediction_count}p</span>
        ${fals ? `<span class="fals-flag" title="${fals} falsified">⚠${fals}</span>` : '<span></span>'}
      </div>
      <div class="tile-symbol">${esc(fc.symbol)}</div>
      <div class="tile-name">${esc(fc.short_label || fc.label)}</div>
      ${miniGridHtml}
      <div class="tile-yield">${y.html || '<span style="background:var(--paper-3);width:100%"></span>'}</div>
      <div class="tile-yield-meta${y.total===0?' empty':''}">${y.total ? `<span>${y.total}</span><span style="color:var(--ink-faint)">${fc.closure_level==='complete-within-domain'?'■':fc.closure_level==='partial'?'◐':'□'}</span>` : 'no preds'}</div>
    </div>
  `;
}

// =============================================================
//   Tooltip (hover preview)
// =============================================================
function showTileTooltip(e, fcId) {
  const fc = FC_BY_ID[fcId];
  if (!fc) return;
  const t = document.getElementById('tooltip');
  const stats = fc.yield_stats || {};
  const statLine = Object.entries(stats).map(([s,n]) => `${STATUS_LABEL[s] || s}: ${n}`).join(' · ') || 'no predictions';

  // Update C — in-tile cell viz. When the tile renders a mini-grid, the
  // tooltip gets a parallel breakdown of CELL states (not just prediction
  // statuses) so the swatch colors decode at a glance.
  let cellBreakdownHtml = '';
  if (fc.cells && fc.cells.length > 0 && fc.cells.length <= MINI_GRID_THRESHOLD) {
    const b = tileCellBreakdown(fc);
    if (b) {
      const parts = [];
      if (b.confirmed)    parts.push(`${b.confirmed} confirmed`);
      if (b.tension)      parts.push(`${b.tension} in tension`);
      if (b.falsified)    parts.push(`${b.falsified} falsified`);
      if (b.notTested)    parts.push(`${b.notTested} not yet tested`);
      if (b.retro)        parts.push(`${b.retro} retro`);
      if (b.realizedOnly) parts.push(`${b.realizedOnly} realized`);
      if (b.excluded)     parts.push(`${b.excluded} structurally excluded`);
      if (b.empty)        parts.push(`${b.empty} empty`);
      if (parts.length) {
        cellBreakdownHtml = `<br><span style="color:var(--ink-faint);font-size:11px">cells: ${esc(parts.join(' · '))}</span>`;
      }
    }
  }

  t.innerHTML = `
    <div class="tt-title">${esc(fc.symbol)} · ${esc(fc.label)}</div>
    <div class="tt-meta">${esc(fc.category)} · ${esc(fc.sector)} · ${esc(fc.closure_level)}</div>
    <div class="tt-body">${esc(fc.cell_count)} cells · ${esc(fc.prediction_count)} predictions<br>${esc(statLine)}${cellBreakdownHtml}</div>
  `;
  t.classList.add('visible');
  moveTooltip(e);
}
function moveTooltip(e) {
  const t = document.getElementById('tooltip');
  if (!t.classList.contains('visible')) return;
  let x = e.clientX + 14, y = e.clientY + 14;
  const r = t.getBoundingClientRect();
  if (x + r.width  > window.innerWidth)  x = e.clientX - r.width  - 14;
  if (y + r.height > window.innerHeight) y = e.clientY - r.height - 14;
  t.style.left = x + 'px'; t.style.top = y + 'px';
}
function hideTooltip() {
  document.getElementById('tooltip').classList.remove('visible');
}

// =============================================================
//   Toolbar wiring (Update B refactor)
//   - Rows-by becomes a button + dropdown menu (was 3 inline chips)
//   - Spotlight becomes a button that opens a sidebar panel (was 6 chips)
//   - Overlay stays as inline chips (only two options; not worth a button)
// =============================================================
var ROWSBY_OPTIONS = [
  { value: 'sector',   label: 'Sector',   desc: 'Group rows by physics subfield.' },
  { value: 'category', label: 'Category', desc: 'Structural / hybrid / phenomenon.' },
  { value: 'closure',  label: 'Closure',  desc: 'Complete · partial · conjectural.' },
];

function wireToolbar() {
  // Overlay chips (unchanged from A.1; kept inline because there are only 2 options)
  document.querySelectorAll('.tb-chip[data-filter="overlay"]').forEach(b => {
    b.addEventListener('click', () => {
      state.overlay = b.dataset.value;
      syncToolbarChips();
      writeHash();
      renderMap();
    });
  });

  // Rows-by button + dropdown menu
  wireRowsByDropdown();

  // Spotlight button: opens the sidebar panel rather than mutating state directly
  const spotBtn = document.getElementById('spotlight-btn');
  if (spotBtn) {
    spotBtn.addEventListener('click', () => {
      switchSidebarPanel('spotlight');
    });
  }

  // Update B — discourse-tab buttons: each opens its sidebar catalogue panel directly.
  // First-class peer buttons (not nested inside Browse), since these are real
  // node-layer catalogues, not "browsing" sub-options.
  document.querySelectorAll('.discourse-tab[data-disc-tab]').forEach(b => {
    b.addEventListener('click', () => {
      switchSidebarPanel(b.dataset.discTab);
    });
  });

  // Reset-layers link
  document.getElementById('btn-reset-layers').addEventListener('click', () => {
    state.group = 'sector';
    state.spotlightActive = new Set();    // Update B — empty set, not 'all'
    state.overlay = 'none';
    syncToolbarChips();
    writeHash();
    renderMap();
    // If the sidebar is showing the spotlight panel, re-render it so toggles reset
    if (state.activePanel === 'spotlight' && typeof renderSidebarSpotlight === 'function') {
      renderSidebarSpotlight();
    }
  });
}

function wireRowsByDropdown() {
  const btn = document.getElementById('rowsby-btn');
  const menu = document.getElementById('rowsby-menu');
  if (!btn || !menu) return;
  // Populate menu items once (label + handler)
  menu.innerHTML = ROWSBY_OPTIONS.map(o =>
    `<div class="rowsby-item" data-rowsby="${esc(o.value)}" role="menuitem" tabindex="0" title="${esc(o.desc)}">${esc(o.label)}</div>`
  ).join('');
  function close() { menu.classList.remove('open'); btn.classList.remove('active'); }
  function open()  { menu.classList.add('open');    btn.classList.add('active');    }
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (menu.classList.contains('open')) close(); else open();
  });
  menu.querySelectorAll('[data-rowsby]').forEach(el => {
    el.addEventListener('click', () => {
      state.group = el.dataset.rowsby;
      close();
      syncToolbarChips();
      writeHash();
      renderMap();
    });
  });
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && e.target !== btn) close();
  });
}

function syncToolbarChips() {
  // Overlay chips — still inline
  document.querySelectorAll('.tb-chip[data-filter="overlay"]').forEach(b => {
    b.classList.toggle('active', b.dataset.value === state.overlay);
  });
  // Rows-by button label reflects current group; menu items reflect active
  const rowsByBtn = document.getElementById('rowsby-btn');
  if (rowsByBtn) {
    const lbl = (ROWSBY_OPTIONS.find(o => o.value === state.group) || ROWSBY_OPTIONS[0]).label.toLowerCase();
    const lbox = rowsByBtn.querySelector('.tb-btn-label');
    if (lbox) lbox.textContent = lbl;
  }
  document.querySelectorAll('.rowsby-item').forEach(el => {
    el.classList.toggle('active', el.dataset.rowsby === state.group);
  });
  // Spotlight button — show count when any are active
  const spotBtn = document.getElementById('spotlight-btn');
  if (spotBtn) {
    const n = state.spotlightActive ? state.spotlightActive.size : 0;
    const countEl = spotBtn.querySelector('.tb-btn-count');
    if (countEl) {
      if (n > 0) { countEl.textContent = String(n); countEl.style.display = ''; }
      else       { countEl.textContent = '';        countEl.style.display = 'none'; }
    }
    spotBtn.classList.toggle('active', n > 0 || state.activePanel === 'spotlight');
  }
  // Update B — discourse-tab buttons: active when their catalogue panel is open
  document.querySelectorAll('.discourse-tab[data-disc-tab]').forEach(b => {
    b.classList.toggle('active', b.dataset.discTab === state.activePanel);
  });
}

// =============================================================
//   Zoom + pan
// =============================================================
function applyZoom() {
  const wrap = document.getElementById('map-zoom-wrap');
  // Combine zoom + pan in the transform
  wrap.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
  wrap.style.transformOrigin = '0 0';
  wrap.style.width = `${100/state.zoom}%`;
  document.getElementById('zoom-level').textContent = Math.round(state.zoom * 100) + '%';
  if (state.overlay === 'phen-phen') setTimeout(drawPhenPhenOverlay, 220);
}

function clampPan() {
  const pane = document.getElementById('map-pane');
  const wrap = document.getElementById('map-zoom-wrap');
  if (!pane || !wrap) return;
  // Visible content always spans paneW wide (the wrap width trick).
  // Visible content height = wrap.scrollHeight * zoom.
  const paneW = pane.clientWidth;
  const paneH = pane.clientHeight;
  const visH = wrap.scrollHeight * state.zoom;
  const MARGIN = 80; // always keep at least this many px of map in the viewport
  // Horizontal: visible content is always paneW wide, so panX should stay close to 0.
  // Allow some give for cursor-anchored zoom, but not enough to leave the viewport.
  state.panX = Math.max(-paneW + MARGIN, Math.min(paneW - MARGIN, state.panX));
  // Vertical:
  if (visH <= paneH) {
    state.panY = Math.max(-(visH - MARGIN), Math.min(paneH - MARGIN, state.panY));
  } else {
    // Map taller than pane: allow scrolling within bounds
    state.panY = Math.max(-(visH - MARGIN), Math.min(MARGIN, state.panY));
  }
}

function zoomFitToView() {
  // Goal: set zoom so the whole map content fits inside the pane vertically
  // (horizontal already fits at every zoom level thanks to the width:100/zoom trick).
  const pane = document.getElementById('map-pane');
  const wrap = document.getElementById('map-zoom-wrap');
  if (!pane || !wrap) { state.zoom = 1; state.panX = 0; state.panY = 0; applyZoom(); return; }

  // Step 1: reset to zoom=1 to measure natural height
  state.zoom = 1; state.panX = 0; state.panY = 0;
  applyZoom();
  // Force layout
  void wrap.offsetHeight;

  const paneH = pane.clientHeight - 80;  // leave room for zoom controls + bottom padding
  const naturalH = wrap.scrollHeight;
  if (naturalH < 50) return;

  // Step 2: compute the target zoom (vertical fit) and clamp
  let target = paneH / naturalH;
  // Note: as zoom decreases, more tiles fit per row, so actual height shrinks
  // further than this calculation predicts — leaving a small comfortable margin.
  target = Math.max(ZOOM_MIN, Math.min(1.0, target));
  state.zoom = target;
  state.panX = 0;
  state.panY = 0;
  applyZoom();
  showToast(`Fit to view — zoom ${Math.round(target * 100)}%`);
}

// Drag-to-pan (Update A): click-and-hold on the map background, drag to move.
// Skips when the user starts a click on a tile (so tile click still works).
function wireMapDragPan() {
  const pane = document.getElementById('map-pane');
  const wrap = document.getElementById('map-zoom-wrap');
  pane.classList.add('grabbable');

  let dragging = false;
  let startX = 0, startY = 0;
  let startPanX = 0, startPanY = 0;
  let moved = false;

  pane.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    const t = e.target;
    if (t.closest('.pt-tile')) return;
    if (t.closest('.zoom-controls')) return;
    if (t.closest('.sidebar-toggle')) return;
    dragging = true;
    moved = false;
    startX = e.clientX; startY = e.clientY;
    startPanX = state.panX; startPanY = state.panY;
    pane.classList.add('grabbing');
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    state.panX = startPanX + dx;
    state.panY = startPanY + dy;
    clampPan();
    applyZoom();
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    pane.classList.remove('grabbing');
  });

  // Trackpad / wheel zoom (cursor-anchored)
  pane.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left);
    const py = (e.clientY - rect.top);
    const localX = px / state.zoom;
    const localY = py / state.zoom;
    const oldZoom = state.zoom;
    // Gentler zoom factor than before — was 1.1, now ~1.07 per wheel tick
    const factor = e.deltaY < 0 ? 1.07 : 1/1.07;
    let newZoom = oldZoom * factor;
    newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom));
    if (newZoom === oldZoom) return; // hit a limit, don't move pan
    state.zoom = newZoom;
    state.panX -= localX * (newZoom - oldZoom);
    state.panY -= localY * (newZoom - oldZoom);
    clampPan();
    applyZoom();
  }, { passive: false });
}
function zoomIn()  {
  const i = ZOOM_LEVELS.findIndex(z => z >= state.zoom - 1e-6);
  const next = ZOOM_LEVELS[Math.min(ZOOM_LEVELS.length-1, (i<0?ZOOM_LEVELS.length-1:i)+1)];
  state.zoom = Math.min(ZOOM_MAX, next);
  clampPan();
  applyZoom();
}
function zoomOut() {
  const i = ZOOM_LEVELS.findIndex(z => z >= state.zoom - 1e-6);
  const prev = ZOOM_LEVELS[Math.max(0, (i<0?0:i)-1)];
  state.zoom = Math.max(ZOOM_MIN, prev);
  clampPan();
  applyZoom();
}