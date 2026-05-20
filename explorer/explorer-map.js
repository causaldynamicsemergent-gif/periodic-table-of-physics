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
  const dim  = (state.highlight !== 'all') && !(fc.yield_stats[state.highlight] > 0);
  const spot = (state.highlight !== 'all') && (fc.yield_stats[state.highlight] > 0);
  const selected = (state.selectedFC === fc.id);
  const fals = fc.yield_stats.falsified || 0;

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

  return `
    <div class="pt-tile ${fc.category}${dim?' dim':''}${spot?' spot':''}${selected?' selected':''}${phenOn?' phen-on':''}${phenOffWhileActive?' phen-off-and-active':''}" data-fc="${esc(fc.id)}" tabindex="0" aria-label="${esc(fc.label)}"${phenStyle?' style="'+phenStyle+'"':''}>
      <div class="tile-corner">
        <span class="cell-ct">${fc.cell_count}c · ${fc.prediction_count}p</span>
        ${fals ? `<span class="fals-flag" title="${fals} falsified">⚠${fals}</span>` : '<span></span>'}
      </div>
      <div class="tile-symbol">${esc(fc.symbol)}</div>
      <div class="tile-name">${esc(fc.short_label || fc.label)}</div>
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
  t.innerHTML = `
    <div class="tt-title">${esc(fc.symbol)} · ${esc(fc.label)}</div>
    <div class="tt-meta">${esc(fc.category)} · ${esc(fc.sector)} · ${esc(fc.closure_level)}</div>
    <div class="tt-body">${esc(fc.cell_count)} cells · ${esc(fc.prediction_count)} predictions<br>${esc(statLine)}</div>
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
//   Toolbar wiring
// =============================================================
function wireToolbar() {
  document.querySelectorAll('.tb-chip[data-filter]').forEach(b => {
    b.addEventListener('click', () => {
      const f = b.dataset.filter, v = b.dataset.value;
      state[f] = v;
      syncToolbarChips();
      writeHash();
      renderMap();
    });
  });
  document.getElementById('btn-reset-layers').addEventListener('click', () => {
    state.group = 'sector';
    state.highlight = 'all';
    state.overlay = 'none';
    syncToolbarChips();
    writeHash();
    renderMap();
  });
}
function syncToolbarChips() {
  ['group','highlight','overlay'].forEach(f => {
    document.querySelectorAll(`.tb-chip[data-filter="${f}"]`).forEach(b => {
      b.classList.toggle('active', b.dataset.value === state[f]);
    });
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
