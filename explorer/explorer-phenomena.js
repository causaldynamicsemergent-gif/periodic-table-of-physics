'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-phenomena.js
//
//   Holds: the PHENOMENA array (25 physical things a non-specialist would
//   recognise — light, neutrinos, black holes, gravity, dark matter, ...),
//   the per-category palette, three computed indexes (PHEN_BY_FC,
//   PHEN_COLOR_BY_ID, PHEN_CAT_BY_ID), the sidebar phenomena panel
//   (renderSidebarPhenomena), and the on-map phen↔phen overlay drawing
//   (drawPhenPhenOverlay).
//
//   Mappings precomputed from queries against the live v34 dataset.
//   Update A.1: phenomena with identical classification sets are merged,
//   so the merge itself reveals "these share machinery" patterns.
//
//   Reads: state, DATA, esc (data.js), renderMap (map.js — only via toggles).
//   Read by: renderTile in map.js (PHEN_BY_FC, PHEN_CAT_BY_ID for rings),
//   and by renderMap in map.js (drawPhenPhenOverlay) when overlay is on.
//
//   Load order in HTML: data → map → sidebar → phenomena. This file loads
//   LAST among the modules, which is safe because functions defined here
//   are only called at runtime (from init() in sidebar.js) after every
//   script has parsed.
// =============================================================

// Per-category palette — distinct, harmonious, readable on the cream/paper background
var PHEN_CAT_COLORS = {
  'Light & electromagnetism': '#c89c14',   // warm gold
  'Particles':                '#2553b3',   // cobalt blue
  'Astrophysical objects':    '#7a3e9c',   // purple
  'Spacetime & gravitation':  '#1d6f6a',   // deep teal
  'Cosmological':             '#a82a35',   // brick red
  'Condensed-matter':         '#3f7a1c',   // olive green
  'Phases of matter':         '#c9591f',   // burnt orange
};

var PHENOMENA = [
  // Light & EM
  { id: 'light', label: 'Light (photons)', category: 'Light & electromagnetism',
    classifications: ['electromagnetic-phenomena-across-energy-regimes', 'sm-rep-content', 'cosmological-observations'] },

  // Particles
  { id: 'quarks', label: 'Quarks', category: 'Particles',
    classifications: ['sm-rep-content', 'qcd-phase-diagram', 'hadronic-states', 'su5-gut-rep-content'] },
  { id: 'gluons', label: 'Gluons', category: 'Particles',
    classifications: ['sm-rep-content', 'qcd-phase-diagram', 'su5-gut-rep-content'] },
  // Merged: leptons + higgs + W/Z bosons all map to {SM, SU(5) GUT}
  { id: 'electroweak-inhabitants', label: 'Leptons / Higgs / W and Z bosons', category: 'Particles',
    note: 'These three share identical classification machinery — they all live in the Standard Model and the SU(5) GUT, and nowhere else.',
    classifications: ['sm-rep-content', 'su5-gut-rep-content'] },
  { id: 'neutrinos', label: 'Neutrinos', category: 'Particles',
    classifications: ['neutrino-sector-phenomenology', 'sm-rep-content', 'dark-matter-candidates'] },

  // Astrophysical objects
  { id: 'stellar-bh', label: 'Stellar-mass black holes', category: 'Astrophysical objects',
    classifications: ['compact-astrophysical-objects', 'gravitational-wave-event-catalog'] },
  // Merged: SMBHs and white dwarfs both only live in compact-astro
  { id: 'compact-singletons', label: 'Supermassive black holes / White dwarfs', category: 'Astrophysical objects',
    note: 'Both live in only one classification (compact astrophysical objects) — none of the other tiles classify them.',
    classifications: ['compact-astrophysical-objects'] },
  { id: 'pbh', label: 'Primordial black holes', category: 'Astrophysical objects',
    classifications: ['compact-astrophysical-objects', 'dark-matter-candidates'] },
  { id: 'neutron-stars', label: 'Neutron stars', category: 'Astrophysical objects',
    classifications: ['compact-astrophysical-objects', 'gravitational-wave-event-catalog', 'modified-gravity-alternatives'] },
  { id: 'pulsars', label: 'Pulsars and magnetars', category: 'Astrophysical objects',
    classifications: ['compact-astrophysical-objects', 'gravitational-wave-event-catalog', 'electromagnetic-phenomena-across-energy-regimes', 'modified-gravity-alternatives'] },

  // Spacetime & gravitation
  { id: 'gravity', label: 'Gravity (and modified gravity)', category: 'Spacetime & gravitation',
    classifications: ['modified-gravity-alternatives', 'gravitational-wave-event-catalog'] },
  { id: 'grav-waves', label: 'Gravitational waves', category: 'Spacetime & gravitation',
    classifications: ['gravitational-wave-event-catalog', 'compact-astrophysical-objects', 'modified-gravity-alternatives'] },
  { id: 'spacetime', label: 'Space-time structure', category: 'Spacetime & gravitation',
    classifications: ['spacetime-symmetry-groups', 'modified-gravity-alternatives'] },

  // Cosmological
  { id: 'dark-matter', label: 'Dark matter', category: 'Cosmological',
    classifications: ['dark-matter-candidates', 'cosmological-observations', 'compact-astrophysical-objects'] },
  { id: 'dark-energy', label: 'Dark energy', category: 'Cosmological',
    classifications: ['cosmological-observations', 'modified-gravity-alternatives', 'spacetime-symmetry-groups'] },
  { id: 'cmb', label: 'Cosmic microwave background', category: 'Cosmological',
    classifications: ['cosmological-observations', 'electromagnetic-phenomena-across-energy-regimes'] },
  { id: 'inflation', label: 'Cosmic inflation', category: 'Cosmological',
    classifications: ['cosmological-observations'] },
  { id: 'baryogenesis', label: 'Matter-antimatter asymmetry', category: 'Cosmological',
    classifications: ['cosmological-observations', 'sm-rep-content'] },

  // Condensed-matter
  { id: 'superconductivity', label: 'Superconductivity', category: 'Condensed-matter',
    classifications: ['topological-insulator-and-superconductor-materials', 'tenfold-way', 'real-critical-systems'] },
  { id: 'topo-insulators', label: 'Topological insulators', category: 'Condensed-matter',
    classifications: ['topological-insulator-and-superconductor-materials', 'tenfold-way', 'SPT-phase-and-anomaly-matching-observations'] },
  { id: 'quantum-hall', label: 'Quantum Hall states', category: 'Condensed-matter',
    classifications: ['fractional-quantum-hall-states', 'tenfold-way', 'modular-tensor-categories'] },
  { id: 'superfluidity', label: 'Superfluidity', category: 'Condensed-matter',
    classifications: ['real-critical-systems', 'compact-astrophysical-objects'] },

  // Phases of matter
  { id: 'qgp', label: 'Quark-gluon plasma', category: 'Phases of matter',
    classifications: ['qcd-phase-diagram'] },
  { id: 'color-sc', label: 'Color superconductivity', category: 'Phases of matter',
    classifications: ['qcd-phase-diagram', 'compact-astrophysical-objects'] },
  { id: 'hadrons', label: 'Hadrons (protons, neutrons, mesons)', category: 'Phases of matter',
    classifications: ['hadronic-states', 'qcd-phase-diagram', 'proton-decay-searches'] },
];

var PHEN_CATEGORIES = [
  'Light & electromagnetism',
  'Particles',
  'Astrophysical objects',
  'Spacetime & gravitation',
  'Cosmological',
  'Condensed-matter',
  'Phases of matter',
];

// Index: classification_id → { phenIds: Set, cats: Set } describing which
// phenomena (and which categories) point at this tile.
var PHEN_BY_FC = (() => {
  const m = {};
  for (const p of PHENOMENA) {
    for (const fc of p.classifications) {
      if (!m[fc]) m[fc] = { phenIds: new Set(), cats: new Set() };
      m[fc].phenIds.add(p.id);
      m[fc].cats.add(p.category);
    }
  }
  return m;
})();
// Quick lookup: phenomenon id → its category color
var PHEN_COLOR_BY_ID = (() => {
  const m = {};
  for (const p of PHENOMENA) m[p.id] = PHEN_CAT_COLORS[p.category];
  return m;
})();
// Quick lookup: phenomenon id → its category
var PHEN_CAT_BY_ID = (() => {
  const m = {};
  for (const p of PHENOMENA) m[p.id] = p.category;
  return m;
})();

// =============================================================
//   Sidebar: Phenomena panel (Update A — physical-things layer)
// =============================================================
function renderSidebarPhenomena() {
  const inner = document.getElementById('sidebar-inner');
  const activeCount = state.phenomenaActive.size;
  const totalCount = PHENOMENA.length;

  const byCat = {};
  for (const p of PHENOMENA) {
    if (!byCat[p.category]) byCat[p.category] = [];
    byCat[p.category].push(p);
  }
  const catKeys = PHEN_CATEGORIES.filter(c => byCat[c]);

  // Convert hex to rgba(...) string for tints
  const tint = (hex, a) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  };

  const html = catKeys.map(cat => {
    const color = PHEN_CAT_COLORS[cat];
    const items = byCat[cat].map(p => {
      const isOn = state.phenomenaActive.has(p.id);
      const n = p.classifications.length;
      const itemStyle = `--phen-item-tint:${tint(color, 0.09)}; --phen-item-border:${tint(color, 0.4)}; --phen-item-dot:${color};`;
      return `<button class="phen-item${isOn?' on':''}" data-phen="${esc(p.id)}" type="button" aria-pressed="${isOn}" style="${itemStyle}">
        <span class="phen-dot"></span>
        <span class="phen-label">
          <span class="phen-label-text">${esc(p.label)}</span>
          ${p.note ? `<span class="phen-note">${esc(p.note)}</span>` : ''}
        </span>
        <span class="phen-ct">${n} tile${n===1?'':'s'}</span>
      </button>`;
    }).join('');
    return `<div class="phen-cat"><span class="cat-swatch" style="background:${color}"></span>${esc(cat)}</div><div class="phen-list">${items}</div>`;
  }).join('');

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Physical phenomena</h3>
      <div class="phen-panel-head">
        <div class="phen-summary"><strong>${activeCount}</strong> of ${totalCount} active</div>
        <div class="phen-actions">
          <button class="phen-action-btn" id="phen-all-on">all on</button>
          <button class="phen-action-btn" id="phen-all-off">all off</button>
        </div>
      </div>
      <div class="phen-summary">
        Each phenomenon highlights the classifications that contain it, in its category's colour. A tile glows with one ring per matching category — so a tile hit by both Particles and Cosmological will show both rings. Phenomena that map to the <em>same exact set</em> of classifications have been combined; the merging itself is information (they share machinery).
      </div>
      ${html}
    </div>
  `;

  inner.querySelectorAll('[data-phen]').forEach(el => {
    el.addEventListener('click', () => {
      const pid = el.dataset.phen;
      if (state.phenomenaActive.has(pid)) state.phenomenaActive.delete(pid);
      else state.phenomenaActive.add(pid);
      renderSidebarPhenomena();
      renderMap();
    });
  });
  document.getElementById('phen-all-on').addEventListener('click', () => {
    state.phenomenaActive = new Set(PHENOMENA.map(p => p.id));
    renderSidebarPhenomena();
    renderMap();
  });
  document.getElementById('phen-all-off').addEventListener('click', () => {
    state.phenomenaActive = new Set();
    renderSidebarPhenomena();
    renderMap();
  });
}

// =============================================================
//   Phen↔phen overlay (uses sticky positions of the tiles)
//   Drawn on top of the periodic-table map when state.overlay === 'phen-phen'.
//   Called from renderMap (map.js) and from window-resize / splitter-drag.
// =============================================================
function drawPhenPhenOverlay() {
  const svg = document.getElementById('pt-overlay');
  const tableEl = document.getElementById('pt-table');
  if (!svg || !tableEl) return;
  const tableRect = tableEl.getBoundingClientRect();
  svg.classList.add('show');
  svg.setAttribute('viewBox', `0 0 ${tableRect.width} ${tableRect.height}`);
  svg.setAttribute('width', tableRect.width);
  svg.setAttribute('height', tableRect.height);

  function tileCenter(fcId) {
    const tile = tableEl.querySelector(`.pt-tile[data-fc="${CSS.escape(fcId)}"]`);
    if (!tile) return null;
    const r = tile.getBoundingClientRect();
    return { x: r.left - tableRect.left + r.width/2, y: r.top - tableRect.top + r.height/2 };
  }

  const paths = [];
  // UX pass — one overlay machine, two layers: the phenomenon↔phenomenon
  // arrows, or the full cross-classification edge set (derives-from /
  // specializes / …) the old map drew as "edges". With tiles lit, only
  // edges touching a lit tile are drawn, so the overlay follows the focus
  // instead of flooding the grid.
  let edgeList = (state.overlay === 'cross-class')
    ? Object.keys(DATA.cross_class_edges_by_id || {}).map(k => DATA.cross_class_edges_by_id[k])
    : (DATA.phen_phen_edges || []);
  if (state.tileSpotlight && state.tileSpotlight.size) {
    const lit = state.tileSpotlight;
    edgeList = edgeList.filter(e => e && (lit.has(e.from) || lit.has(e.to)));
  }
  for (const e of edgeList) {
    const a = tileCenter(e.from), b = tileCenter(e.to);
    if (!a || !b) continue;
    const mx = (a.x + b.x)/2, my = (a.y + b.y)/2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.sqrt(dx*dx + dy*dy) || 1;
    const off = Math.min(28, len/6);
    const cx = mx - (dy/len)*off;
    const cy = my + (dx/len)*off;
    // Update C — clickable on-map edges.
    // Each edge is a <g> with: (1) wide transparent hit-area paths that
    // catch clicks/hover, (2) thin visible paths that thicken via the
    // group:hover CSS rule. selectCrossClassEdge is dispatched via
    // delegated click on data-edge-id (set on the group), so any inner
    // element click bubbles up and resolves correctly.
    const eid = e.id ? `data-edge-id="${esc(e.id)}"` : '';
    const splineD = `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
    const ang = Math.atan2(b.y - cy, b.x - cx);
    const ahx = b.x - 9*Math.cos(ang);
    const ahy = b.y - 9*Math.sin(ang);
    const w = 4.5;
    const arrowD = `M${b.x},${b.y} L${ahx + w*Math.sin(ang)},${ahy - w*Math.cos(ang)} L${ahx - w*Math.sin(ang)},${ahy + w*Math.cos(ang)} Z`;
    // Build a slightly enlarged arrow hit-area for click forgiveness.
    const wHit = 9;
    const ahxHit = b.x - 14*Math.cos(ang);
    const ahyHit = b.y - 14*Math.sin(ang);
    const arrowHitD = `M${b.x + 3*Math.cos(ang)},${b.y + 3*Math.sin(ang)} L${ahxHit + wHit*Math.sin(ang)},${ahyHit - wHit*Math.cos(ang)} L${ahxHit - wHit*Math.sin(ang)},${ahyHit + wHit*Math.cos(ang)} Z`;
    paths.push(`<g class="phen-phen-edge-group" ${eid}>`);
    paths.push(`<path class="phen-phen-hit" d="${splineD}"/>`);
    paths.push(`<path class="phen-phen-hit arrow-hit" d="${arrowHitD}"/>`);
    paths.push(`<path class="phen-phen-edge" d="${splineD}"/>`);
    paths.push(`<path class="phen-phen-edge arrow-head" d="${arrowD}"/>`);
    paths.push(`</g>`);
  }
  svg.innerHTML = paths.join('');
  applyEdgeSpotlightClasses(svg);   // UX pass — restore lit/dim line state across redraws

  // Update C — click delegation. Assigning .onclick (property, not
  // addEventListener) is idempotent — re-running drawPhenPhenOverlay
  // replaces any prior handler instead of stacking duplicates. Also
  // re-installs cleanly after renderMap() destroys + recreates the SVG
  // element.
  svg.onclick = function (ev) {
    const target = ev.target && ev.target.closest && ev.target.closest('[data-edge-id]');
    if (!target) return;
    const id = target.getAttribute('data-edge-id');
    // UX pass — accumulate-toggle for phen↔phen lines, mirroring tiles:
    // clicking a line lights it (and opens its record); clicking a lit line
    // switches it off and leaves the sidebar as it is. Esc, ⌂ Home, reset
    // layers, or a plain click on the map background restores all lines.
    if (!state.edgeSpotlight) state.edgeSpotlight = new Set();
    if (state.edgeSpotlight.has(id)) {
      state.edgeSpotlight.delete(id);
    } else {
      state.edgeSpotlight.add(id);
      if (typeof selectCrossClassEdge === 'function') selectCrossClassEdge(id);
    }
    applyEdgeSpotlightClasses(svg);
  };
}

// UX pass — apply lit/dim classes to the phen↔phen line groups from
// state.edgeSpotlight. Called after every overlay redraw and every toggle.
function applyEdgeSpotlightClasses(svg) {
  if (!svg) return;
  const set = state.edgeSpotlight || new Set();
  const any = set.size > 0;
  svg.querySelectorAll('[data-edge-id]').forEach(function (g) {
    const lit = any && set.has(g.getAttribute('data-edge-id'));
    g.classList.toggle('lit', lit);
    g.classList.toggle('dim', any && !lit);
  });
}
