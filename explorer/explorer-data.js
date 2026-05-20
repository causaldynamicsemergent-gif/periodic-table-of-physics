'use strict';
// =============================================================
//   Periodic Table of Physics — modular build (A.1 features + five-file split)
//   File: explorer-data.js
//   Holds: globals (DATA/FCS/FC_BY_ID/SECTORS/STATUSES), constants
//   (STATUS_*, SECTOR_*, CATEGORY_*, SYMBOLS), the data fetch + transform
//   (fetchCanonicalData, augmentDataset, renderFatalError), shared helpers
//   (esc, formatPara, showToast, yieldSegments), URL hash routing
//   (parseHash, writeHash), the `state` singleton, ZOOM_LEVELS, MCP_BASE.
//
//   Load order in the HTML: data → map → sidebar → phenomena → inline init().
//   Loaded first; defines no functions that depend on the other modules.
//
//   Persistent map + sidebar. No navigation away from the map.
// =============================================================

// Will be populated by fetchCanonicalData() before init() finishes:
var DATA = null, FCS = null, FC_BY_ID = null, SECTORS = null, STATUSES = null;

var CAT_ORDER = ['structural','hybrid','phenomenon'];
var CLOSURE_ORDER = ['complete-within-domain','partial','conjectural'];

var STATUS_KEY = {
  'confirmed':'confirmed',
  'unconfirmed-tension':'tension',
  'unconfirmed-not-yet-tested':'not-tested',
  'falsified':'falsified',
  'retro-explanatory-only':'retro',
};
var STATUS_LABEL = {
  'confirmed':'confirmed',
  'unconfirmed-tension':'tension',
  'unconfirmed-not-yet-tested':'not yet tested',
  'falsified':'falsified',
  'retro-explanatory-only':'retro',
};
var STATUS_COLOR = {
  'confirmed':'var(--st-confirmed)',
  'unconfirmed-tension':'var(--st-tension)',
  'unconfirmed-not-yet-tested':'var(--st-not-tested)',
  'falsified':'var(--st-falsified)',
  'retro-explanatory-only':'var(--st-retro)',
};

// =============================================================
//   Presentation maps (FC id → sector, symbol, category)
//   These are presentation choices that augment the canonical data.
// =============================================================
var SYMBOLS = {
  "tenfold-way":                                            ["10W",  "Ten-fold way"],
  "sm-rep-content":                                         ["SM",   "Standard Model"],
  "ade-lie-algebras":                                       ["ADE",  "ADE Lie alg."],
  "ade-su2-subgroups":                                      ["SU2",  "ADE SU(2)"],
  "ade-du-val":                                             ["DuV",  "Du Val sing."],
  "ade-modular-invariants":                                 ["CIZ",  "ADE mod. inv."],
  "ade-quivers":                                            ["Qvr",  "ADE quivers"],
  "spacetime-symmetry-groups":                              ["Sym",  "Spacetime sym."],
  "freed-hopkins-cobordism":                                ["FH",   "Freed-Hopkins"],
  "su5-gut-rep-content":                                    ["GUT",  "SU(5) GUT"],
  "cft-bootstrap-exclusion-regions":                        ["CFT",  "CFT bootstrap"],
  "modular-tensor-categories":                              ["MTC",  "Modular t.c."],
  "generalized-symmetries":                                 ["GSy",  "Gen. symmetries"],
  "higgs-coulomb-branches":                                 ["HCB",  "Higgs/Coulomb br."],
  "hadronic-states":                                        ["Had",  "Hadronic states"],
  "fractional-quantum-hall-states":                         ["FQH",  "Frac. quantum Hall"],
  "compact-astrophysical-objects":                          ["CAO",  "Compact astro"],
  "topological-insulator-and-superconductor-materials":     ["TI",   "Topo. ins./sc"],
  "neutrino-sector-phenomenology":                          ["νSec", "Neutrino sector"],
  "real-critical-systems":                                  ["RCr",  "Real critical"],
  "dark-matter-candidates":                                 ["DM",   "Dark matter"],
  "cosmological-observations":                              ["Cos",  "Cosmo. obs."],
  "gravitational-wave-event-catalog":                       ["GW",   "GW events"],
  "qcd-phase-diagram":                                      ["QCD",  "QCD phase diag."],
  "electromagnetic-phenomena-across-energy-regimes":        ["EM",   "EM phenomena"],
  "proton-decay-searches":                                  ["pD",   "Proton decay"],
  "N2-SCFT-spectrum-data":                                  ["N=2",  "N=2 SCFT"],
  "SPT-phase-and-anomaly-matching-observations":            ["SPT",  "SPT phases"],
  "modified-gravity-alternatives":                          ["MGr",  "Mod. gravity"],
  "macroscopic-classical-phenomena":                        ["Mac",  "Macro/classical"],
};

var SECTOR_MAP = {
  "tenfold-way":                                            "Condensed matter",
  "sm-rep-content":                                         "Particle physics (SM)",
  "ade-lie-algebras":                                       "Formal HE theory",
  "ade-su2-subgroups":                                      "Formal HE theory",
  "ade-du-val":                                             "Formal HE theory",
  "ade-modular-invariants":                                 "Formal HE theory",
  "ade-quivers":                                            "Formal HE theory",
  "spacetime-symmetry-groups":                              "Formal HE theory",
  "freed-hopkins-cobordism":                                "Formal HE theory",
  "su5-gut-rep-content":                                    "BSM-GUT",
  "cft-bootstrap-exclusion-regions":                        "Formal HE theory",
  "modular-tensor-categories":                              "Formal HE theory",
  "generalized-symmetries":                                 "Formal HE theory",
  "higgs-coulomb-branches":                                 "Formal HE theory",
  "hadronic-states":                                        "Hadronic",
  "fractional-quantum-hall-states":                         "Condensed matter",
  "compact-astrophysical-objects":                          "Astrophysics",
  "topological-insulator-and-superconductor-materials":     "Condensed matter",
  "neutrino-sector-phenomenology":                          "Neutrino",
  "real-critical-systems":                                  "Condensed matter",
  "dark-matter-candidates":                                 "Dark matter",
  "cosmological-observations":                              "Cosmology",
  "gravitational-wave-event-catalog":                       "Gravitational/transient",
  "qcd-phase-diagram":                                      "Hadronic",
  "electromagnetic-phenomena-across-energy-regimes":        "Electromagnetic",
  "proton-decay-searches":                                  "BSM-GUT",
  "N2-SCFT-spectrum-data":                                  "Formal HE theory",
  "SPT-phase-and-anomaly-matching-observations":            "Formal HE theory",
  "modified-gravity-alternatives":                          "BSM-non-GUT-non-DM",
  "macroscopic-classical-phenomena":                        "Macroscopic / classical",
};

var CATEGORY_MAP = {
  "tenfold-way":                                            "structural",
  "sm-rep-content":                                         "hybrid",
  "ade-lie-algebras":                                       "structural",
  "ade-su2-subgroups":                                      "structural",
  "ade-du-val":                                             "structural",
  "ade-modular-invariants":                                 "structural",
  "ade-quivers":                                            "structural",
  "spacetime-symmetry-groups":                              "structural",
  "freed-hopkins-cobordism":                                "structural",
  "su5-gut-rep-content":                                    "hybrid",
  "cft-bootstrap-exclusion-regions":                        "structural",
  "modular-tensor-categories":                              "structural",
  "generalized-symmetries":                                 "structural",
  "higgs-coulomb-branches":                                 "structural",
  "hadronic-states":                                        "phenomenon",
  "fractional-quantum-hall-states":                         "phenomenon",
  "compact-astrophysical-objects":                          "phenomenon",
  "topological-insulator-and-superconductor-materials":     "phenomenon",
  "neutrino-sector-phenomenology":                          "phenomenon",
  "real-critical-systems":                                  "phenomenon",
  "dark-matter-candidates":                                 "phenomenon",
  "cosmological-observations":                              "phenomenon",
  "gravitational-wave-event-catalog":                       "phenomenon",
  "qcd-phase-diagram":                                      "phenomenon",
  "electromagnetic-phenomena-across-energy-regimes":        "phenomenon",
  "proton-decay-searches":                                  "phenomenon",
  "N2-SCFT-spectrum-data":                                  "structural",
  "SPT-phase-and-anomaly-matching-observations":            "hybrid",
  "modified-gravity-alternatives":                          "phenomenon",
  "macroscopic-classical-phenomena":                        "phenomenon",
};

var SECTOR_ORDER = [
  "Particle physics (SM)", "Hadronic", "Condensed matter", "Astrophysics",
  "Neutrino", "Cosmology", "Dark matter", "Gravitational/transient",
  "Electromagnetic", "BSM-GUT", "BSM-non-GUT-non-DM",
  "Formal HE theory", "Macroscopic / classical", "Other",
];

// =============================================================
//   Data fetch + transform
// =============================================================
var DATA_URLS = [
  // Try relative paths first (works if HTML is served alongside the JSON)
  './Map_v34_consolidated.json',
  '../data/Map_v34_consolidated.json',
  // Fall back to the canonical raw URL on GitHub
  'https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json',
];

async function fetchCanonicalData() {
  let lastErr = null;
  for (const url of DATA_URLS) {
    try {
      const r = await fetch(url, { cache: 'default' });
      if (!r.ok) { lastErr = new Error(url + ' → HTTP ' + r.status); continue; }
      const j = await r.json();
      console.log('[map] loaded canonical data from', url);
      return { data: j, url };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('All data URLs failed');
}

function augmentDataset(raw) {
  // The consolidated file has shape: { schema_version, dataset_version, nodes:[...], edges:[...], glossary:[...] }
  // (Best-effort: also handle a few alternate shapes for forward-compatibility.)
  const nodes = raw.nodes || raw.formal_classifications || [];
  const edges = raw.edges || [];
  const glossary = raw.glossary || raw.glossary_entries || [];

  const fcs = nodes
    .filter(n => (n.type === 'formal-classification') || n.classification_axes)
    .map(fc => {
      const sym = SYMBOLS[fc.id] || [fc.id.slice(0, 3).toUpperCase(), fc.label];
      const predictions = fc.predictive_yield || fc.predictions || [];
      const cells = (fc.cells || []).map(c => ({
        ...c,
        has_predictions: !!(c.predictions && c.predictions.length) ||
                         predictions.some(p => p.cell_ref === c.cell_id),
        structurally_excluded: c.structurally_excluded ||
          String(c.content || '').toLowerCase().includes('structurally-excluded'),
      }));
      const yield_stats = {};
      for (const p of predictions) {
        const s = p.status || 'unknown';
        yield_stats[s] = (yield_stats[s] || 0) + 1;
      }
      return {
        id: fc.id,
        label: fc.label,
        full_name: fc.full_name || fc.label,
        subtype: fc.subtype || '',
        description: fc.description || '',
        domain_of_applicability: fc.domain_of_applicability || '',
        classification_axes: fc.classification_axes || [],
        cells,
        predictions,
        citations: fc.citations || [],
        cross_cutting_concepts: fc.cross_cutting_concepts || [],
        symbol: sym[0],
        short_label: sym[1],
        sector: SECTOR_MAP[fc.id] || 'Other',
        category: CATEGORY_MAP[fc.id] || 'phenomenon',
        closure_level: (fc.closure_status && fc.closure_status.level) || fc.closure_level || 'unknown',
        closure_description: (fc.closure_status && fc.closure_status.description) || fc.closure_description || '',
        cell_count: cells.length,
        prediction_count: predictions.length,
        yield_stats,
        _has_detailed_header: (fc.description || '').length > 200,
      };
    });

  // Index FCs for fast lookup
  const fcById = Object.fromEntries(fcs.map(f => [f.id, f]));

  // Build edges_by_fc and phen↔phen list from cross-classification edges
  const xEdges = edges.filter(e => e.type === 'cross-classification' || e.edge_type === 'cross-classification');
  const edges_by_fc = {};
  const phen_phen_edges = [];
  for (const e of xEdges) {
    const from = e.from || e.source;
    const to   = e.to   || e.target;
    if (!from || !to) continue;
    if (!edges_by_fc[from]) edges_by_fc[from] = [];
    if (!edges_by_fc[to])   edges_by_fc[to]   = [];
    edges_by_fc[from].push({ direction: 'outgoing', from, to, subtype: e.subtype, status: e.status, description: e.description });
    edges_by_fc[to].push  ({ direction: 'incoming', from, to, subtype: e.subtype, status: e.status, description: e.description });
    if ((fcById[from] && fcById[from].category === 'phenomenon') &&
        (fcById[to]   && fcById[to].category   === 'phenomenon')) {
      phen_phen_edges.push({ from, to, subtype: e.subtype, status: e.status, description: e.description });
    }
  }

  // Falsifications list
  const falsifications = [];
  for (const fc of fcs) {
    for (const p of fc.predictions) {
      if (p.status === 'falsified') {
        falsifications.push({
          classification_id: fc.id,
          classification_label: fc.label,
          sector: fc.sector,
          prediction: p.prediction,
          prediction_citation: p.prediction_citation,
          confirmation_citation: p.confirmation_citation,
          cell_ref: p.cell_ref,
          cell_id: p.cell_id,
        });
      }
    }
  }

  // Canonical sector list, in display order
  const presentSectors = new Set(fcs.map(f => f.sector));
  const sectors = SECTOR_ORDER.filter(s => presentSectors.has(s)).concat(
    Array.from(presentSectors).filter(s => !SECTOR_ORDER.includes(s))
  );

  // Status order
  const prediction_statuses = ['confirmed','unconfirmed-tension','unconfirmed-not-yet-tested','falsified','retro-explanatory-only'];

  // Totals
  const total_cells = fcs.reduce((s, f) => s + f.cell_count, 0);
  const total_predictions = fcs.reduce((s, f) => s + f.prediction_count, 0);

  return {
    formal_classifications: fcs,
    sectors,
    prediction_statuses,
    edges_by_fc,
    phen_phen_edges,
    falsifications,
    glossary,
    _meta: {
      dataset_version: raw.dataset_version || raw.schema_version || 'v34',
      generated_at: new Date().toISOString(),
      counts: {
        formal_classifications: fcs.length,
        cells: total_cells,
        predictions: total_predictions,
        cross_classification_edges: xEdges.length,
        falsifications: falsifications.length,
        phen_phen_edges: phen_phen_edges.length,
      },
    },
  };
}

function renderFatalError(msg, detail) {
  document.getElementById('sidebar-inner').innerHTML = `
    <div class="sidebar-section">
      <h3 style="color:var(--st-falsified)">Could not load dataset</h3>
      <div style="font-size:13px;line-height:1.55;color:var(--ink-soft)">${esc(msg)}</div>
      ${detail ? `<pre style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--ink-mute);background:var(--paper-2);padding:8px 10px;border-radius:2px;margin-top:8px;white-space:pre-wrap">${esc(String(detail))}</pre>` : ''}
      <div style="margin-top:10px;font-size:12px;color:var(--ink-mute)">
        The explorer fetches <code style="font-family:'JetBrains Mono',monospace;background:var(--paper-3);padding:1px 4px">data/Map_v34_consolidated.json</code> from the repo at load time. Either check your connection or place the JSON file beside this HTML.
      </div>
      <button class="btn-ghost" style="margin-top:10px" onclick="location.reload()">↻ retry</button>
    </div>
  `;
  document.getElementById('pt-content').innerHTML =
    `<div style="padding:80px 20px;text-align:center;color:var(--ink-mute);font-style:italic">Dataset could not be loaded. See the sidebar →</div>`;
}

// =============================================================
//   App state (singleton, mutated in place by the other modules)
// =============================================================
var state = {
  selectedFC: null,           // currently-shown FC in sidebar (null = default intro)
  selectedCell: null,         // sub-selection within FC's cells
  group: 'sector',            // sector | category | closure
  highlight: 'all',           // all | confirmed | unconfirmed-tension | ...
  overlay: 'none',            // none | phen-phen
  predFilter: 'all',          // status filter for sidebar's predictions list
  zoom: 1.0,                  // 1.0 = 100%
  sidebarCollapsed: false,
  // Update A: phenomena layer + panel routing
  activePanel: 'about',       // phenomena | legend | about | education | research | search | fc
  phenomenaActive: new Set(), // start with none on (user opts in via the panel)
  searchQuery: '',
  panX: 0,                    // map pan offset
  panY: 0,
};
var ZOOM_LEVELS = [0.5, 0.65, 0.8, 1.0, 1.25, 1.5, 1.85, 2.25];

var MCP_BASE = 'https://map-of-physics.eddie-8e5.workers.dev';

// =============================================================
//   Helpers (used by every module — kept here to avoid duplication)
// =============================================================
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function formatPara(s) {
  if (!s) return '';
  return s.split(/\n\n+/).map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
}
function showToast(msg, kind) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (kind ? ' ' + kind : '');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.className = 'toast', 2800);
}

// =============================================================
//   URL hash (informational — never causes navigation)
// =============================================================
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  if (!h) return;
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'fc' && parts[1]) {
    state.selectedFC = parts[1];
    state.selectedCell = parts[2] || null;
  }
  if (qs) {
    const p = new URLSearchParams(qs);
    if (p.get('group'))     state.group = p.get('group');
    if (p.get('highlight')) state.highlight = p.get('highlight');
    if (p.get('overlay'))   state.overlay = p.get('overlay');
    if (p.get('pred'))      state.predFilter = p.get('pred');
  }
}
function writeHash() {
  let h = '#/';
  if (state.selectedFC) {
    h += 'fc/' + encodeURIComponent(state.selectedFC);
    if (state.selectedCell) h += '/' + encodeURIComponent(state.selectedCell);
  }
  const qs = [];
  if (state.group     !== 'sector') qs.push('group='     + encodeURIComponent(state.group));
  if (state.highlight !== 'all')    qs.push('highlight=' + encodeURIComponent(state.highlight));
  if (state.overlay   !== 'none')   qs.push('overlay='   + encodeURIComponent(state.overlay));
  if (state.selectedFC && state.predFilter !== 'all') qs.push('pred=' + encodeURIComponent(state.predFilter));
  if (qs.length) h += '?' + qs.join('&');
  if (location.hash !== h) {
    try { history.replaceState(null, '', h); }
    catch (e) { try { location.hash = h; } catch (e2) {} }
  }
}

// =============================================================
//   Yield-bar helper (used by tile rendering AND by sidebar FC view)
// =============================================================
function yieldSegments(fc) {
  const stats = fc.yield_stats || {};
  const total = Object.values(stats).reduce((a,b) => a+b, 0);
  if (total === 0) return { html: '', total: 0 };
  const order = ['confirmed','unconfirmed-tension','unconfirmed-not-yet-tested','falsified','retro-explanatory-only'];
  const segs = order.map(st => {
    const n = stats[st] || 0;
    if (!n) return '';
    const pct = (n/total)*100;
    return `<span class="seg ${STATUS_KEY[st]}" style="width:${pct}%"></span>`;
  }).join('');
  return { html: segs, total };
}
