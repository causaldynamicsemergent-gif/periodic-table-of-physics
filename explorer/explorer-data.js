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
  // Update C — clickable on-map edges. The full edge record (citations,
  // cell_refs, targeted_by, from_label, to_label, etc.) is preserved in
  // cross_class_edges_by_id, keyed by edge id. The per-FC and phen-phen
  // entries below carry the edge id so consumers can look up the full
  // record when the user opens an edge card.
  const cross_class_edges_by_id = {};
  for (const e of xEdges) {
    const from = e.from || e.source;
    const to   = e.to   || e.target;
    if (!from || !to) continue;
    if (e.id) cross_class_edges_by_id[e.id] = e;
    if (!edges_by_fc[from]) edges_by_fc[from] = [];
    if (!edges_by_fc[to])   edges_by_fc[to]   = [];
    edges_by_fc[from].push({ direction: 'outgoing', id: e.id, from, to, subtype: e.subtype, status: e.status, description: e.description });
    edges_by_fc[to].push  ({ direction: 'incoming', id: e.id, from, to, subtype: e.subtype, status: e.status, description: e.description });
    if ((fcById[from] && fcById[from].category === 'phenomenon') &&
        (fcById[to]   && fcById[to].category   === 'phenomenon')) {
      phen_phen_edges.push({ id: e.id, from, to, subtype: e.subtype, status: e.status, description: e.description });
    }
  }

  // ----- Discourse layer (Update B) -----
  // The 53 non-FC nodes (11 architectures, 11 open-frontiers, 6 totality-approaches,
  // 6 regime-content, 19 experimental-programs) plus the ~89 discourse-layer edges
  // that connect them — every edge type other than cross-classification.
  const DISCOURSE_EDGE_TYPES = [
    'candidate-hosting', 'candidate-targeting', 'emergence',
    'cross-architecture-emergence', 'open-frontier-architecture-edge',
    'open-frontier-content-edge', 'multi-architecture-interference-edge',
    'bears-on', 'uses-classification', 'produces-classification',
  ];
  const discourse_nodes = nodes
    .filter(n => n.type !== 'formal-classification' && !n.classification_axes)
    .map(n => ({ ...n }));
  const discourse_by_id = Object.fromEntries(discourse_nodes.map(n => [n.id, n]));

  // Group discourse nodes by node type for catalogue list builders
  const discourse_by_type = {};
  for (const n of discourse_nodes) {
    const t = n.type || 'unknown';
    if (!discourse_by_type[t]) discourse_by_type[t] = [];
    discourse_by_type[t].push(n);
  }

  // Edges indexed for the discourse cards.
  //   discourse_edges_by_node[id]  → array of { ...edge, direction, neighbor }
  //   discourse_edges_by_type[t]   → array of edges of type t
  // Each incident-edge entry adds two keys (`direction` and `neighbor`) so
  // a renderer can ask "which way does this go and who's on the other end"
  // without re-deriving from from/to.
  const discourse_edges_by_node = {};
  const discourse_edges_by_type = {};
  for (const e of edges) {
    if (!DISCOURSE_EDGE_TYPES.includes(e.type)) continue;
    const from = e.from || e.source;
    const to   = e.to   || e.target;
    if (!from || !to) continue;
    if (!discourse_edges_by_type[e.type]) discourse_edges_by_type[e.type] = [];
    discourse_edges_by_type[e.type].push(e);
    if (!discourse_edges_by_node[from]) discourse_edges_by_node[from] = [];
    if (!discourse_edges_by_node[to])   discourse_edges_by_node[to]   = [];
    discourse_edges_by_node[from].push({ ...e, direction: 'out', neighbor: to });
    discourse_edges_by_node[to].push  ({ ...e, direction: 'in',  neighbor: from });
  }

  // For each discourse node, the Set of FC ids it connects to (used by the
  // amber discourse-highlight ring on the map). E.g. selecting QFT lights
  // up every FC that QFT 'uses-classification' or 'produces-classification'.
  const fcs_connected_to_discourse = {};
  for (const n of discourse_nodes) {
    const fcSet = new Set();
    const incident = discourse_edges_by_node[n.id] || [];
    for (const e of incident) {
      if (fcById[e.neighbor]) fcSet.add(e.neighbor);
    }
    fcs_connected_to_discourse[n.id] = fcSet;
  }

  // Update C — discourse-highlight ring badges. Index every (discourse-node,
  // FC) pair to the list of discourse-edges between them. Used by the badge
  // renderer (one badge per FC currently lit up by the selected discourse
  // node) and the multi-edge sidebar card.
  //   key = "<node-id>|<fc-id>", value = array of edge records (same shape
  //   as discourse_edges_by_node entries, with `direction` + `neighbor`).
  // A single (node, fc) pair can carry multiple edges of different types
  // (e.g. SU(5) GUT has both a candidate-hosting and a produces-classification
  // edge to some FCs; QFT typically has uses-classification only). The badge
  // count == this array's length.
  const discourse_edges_by_fc_pair = {};
  for (const n of discourse_nodes) {
    const incident = discourse_edges_by_node[n.id] || [];
    for (const e of incident) {
      if (!fcById[e.neighbor]) continue;
      const key = n.id + '|' + e.neighbor;
      if (!discourse_edges_by_fc_pair[key]) discourse_edges_by_fc_pair[key] = [];
      discourse_edges_by_fc_pair[key].push(e);
    }
  }

  // =============================================================
  //   Phase C — resolves edges (Step 4.4)
  //
  //   38 edges in v95 connect 12 forward-looking experimental-program
  //   nodes to the cells, open frontiers, and totality-approach nodes
  //   they address. Resolves edges have a distinct shape (sensitivity,
  //   timeline, predictions_per_program, exclusion_only) and do NOT
  //   flow through the generic discourse-edge machinery — they get
  //   their own indexes here and their own rendering module
  //   (explorer-resolves.js).
  //
  //   Three indexes:
  //     resolves_by_program[programId]  → array of edges from that program
  //     resolves_by_target[targetId]    → array of edges to that target
  //                                       (cell id, frontier id, or totality-approach id)
  //     resolves_by_id[edgeId]          → single-edge lookup
  //
  //   Plus a supporting cell_id_to_fc_id map used by the resolves
  //   renderer to deep-link cell-target pills back to the cell's
  //   owning formal classification (cell ids are globally unique;
  //   one entry per cell, all 484 cells covered).
  // =============================================================
  const resolves_by_program = {};
  const resolves_by_target  = {};
  const resolves_by_id      = {};
  for (const e of edges) {
    if (e.type !== 'resolves') continue;
    const from = e.from || e.source;
    const to   = e.to   || e.target;
    if (!from || !to) continue;
    if (!resolves_by_program[from]) resolves_by_program[from] = [];
    if (!resolves_by_target[to])    resolves_by_target[to]    = [];
    resolves_by_program[from].push(e);
    resolves_by_target[to].push(e);
    if (e.id) resolves_by_id[e.id] = e;
  }

  // cell_id → fc_id reverse-lookup, used by the resolves renderer to
  // deep-link cell-target pills back into the cell card (which expects
  // (fcId, cellId) per the [data-fc-cell-jump] convention).
  const cell_id_to_fc_id = {};
  for (const fc of fcs) {
    for (const c of (fc.cells || [])) {
      if (c.cell_id) cell_id_to_fc_id[c.cell_id] = fc.id;
    }
  }

  // =============================================================
  //   Sub-PR E7 — discriminating-experiments lookup substrate
  //
  //   For every pair of experimental programs that share at least
  //   one target through resolves edges, derive:
  //     - the list of shared targets
  //     - per-target classification of the comparison into one of
  //       four physics-categories, computed from the edge metadata
  //       (exclusion_only flag, predictions_per_program population,
  //       target-node type)
  //
  //   The four classifiers (all derived from the edges' own fields;
  //   no per-pair hand-curation, which would push project content
  //   into the presentation layer and violate the firewall):
  //
  //     • 'competing-prediction-adjudication' — both edges carry
  //       per-program competing predictions (PPP populated on both
  //       sides). The shared theoretical programs publish different
  //       predicted values; the experiments adjudicate between them
  //       by measuring the channel directly.
  //
  //     • 'orthogonal-channel-measurement' — both edges are bounds-
  //       setting (exclusion_only:true on both), target is a cell.
  //       A cell is a definite physical parameter; both programs
  //       measure it through different physical channels and the
  //       parameter has the single value nature has fixed.
  //
  //     • 'complementary-reach' — either (a) both edges are bounds-
  //       setting and the target is an open frontier or totality-
  //       approach (the question itself has multiple resolutions, so
  //       different channels probe different resolutions, not a
  //       single shared parameter); or (b) one edge is bounds-setting
  //       and the other is measurement-discriminating (the programs
  //       address the target from genuinely complementary directions).
  //
  //     • 'shared-coverage' — fallback. Currently unused on v95/v96
  //       data; all 11 shared-target pairings fit one of the above.
  //
  //   Pair ids are alphabetised: 'dune|hyper-k', never 'hyper-k|dune'.
  //
  //   On v95/v96: 38 resolves edges across 12 programs produce 6
  //   pairs with at least one shared target, 11 shared-target rows
  //   total. The interesting structural fact is that the four
  //   classifiers represent four genuinely different physics-
  //   relationships, and the catalogue surfaces both the rare
  //   "competing predictions" case and the equally-informative
  //   "shared resolver coverage" case as physics-positive findings.
  // =============================================================
  function classifyTargetPair(edgeA, edgeB, targetIsCell) {
    const pppA = !!(edgeA.predictions_per_program && edgeA.predictions_per_program.length > 0);
    const pppB = !!(edgeB.predictions_per_program && edgeB.predictions_per_program.length > 0);
    const boundsA = edgeA.exclusion_only === true;
    const boundsB = edgeB.exclusion_only === true;
    if (pppA && pppB) return 'competing-prediction-adjudication';
    if (boundsA && boundsB) {
      return targetIsCell ? 'orthogonal-channel-measurement' : 'complementary-reach';
    }
    return 'complementary-reach';
  }
  // Sort key for the four classifier categories — competing first
  // (the rarest and most discriminating), then complementary, then
  // orthogonal-channel, then shared-coverage.
  const CLASSIFIER_ORDER = {
    'competing-prediction-adjudication': 0,
    'complementary-reach':               1,
    'orthogonal-channel-measurement':    2,
    'shared-coverage':                   3,
  };
  // Build a target → list-of-resolves-edges index
  const _byTarget = {};
  for (const eid in resolves_by_id) {
    const e = resolves_by_id[eid];
    if (!_byTarget[e.to]) _byTarget[e.to] = [];
    _byTarget[e.to].push(e);
  }
  // Walk each target's edge list; every (i, j) program pair contributes
  // a row to that pair's shared-targets array.
  const _pairMap = {};
  for (const t in _byTarget) {
    const list = _byTarget[t];
    // Distinct from-programs at this target, alphabetised
    const progs = Array.from(new Set(list.map(e => e.from))).sort();
    if (progs.length < 2) continue;
    const targetIsCell = !!cell_id_to_fc_id[t];
    for (let i = 0; i < progs.length; i++) {
      for (let j = i + 1; j < progs.length; j++) {
        const a = progs[i], b = progs[j];
        const pairId = a + '|' + b;
        if (!_pairMap[pairId]) _pairMap[pairId] = { id: pairId, progA: a, progB: b, sharedTargets: [] };
        const edgeA = list.find(e => e.from === a);
        const edgeB = list.find(e => e.from === b);
        _pairMap[pairId].sharedTargets.push({
          targetId: t,
          targetIsCell,
          edgeA,
          edgeB,
          classifier: classifyTargetPair(edgeA, edgeB, targetIsCell),
        });
      }
    }
  }
  // Sort each pair's shared targets by classifier (competing first), then target id
  for (const pid in _pairMap) {
    _pairMap[pid].sharedTargets.sort((a, b) =>
      (CLASSIFIER_ORDER[a.classifier] ?? 99) - (CLASSIFIER_ORDER[b.classifier] ?? 99)
      || (a.targetId || '').localeCompare(b.targetId || '')
    );
    // Per-pair summary: count by classifier
    const byClassifier = {};
    for (const s of _pairMap[pid].sharedTargets) {
      byClassifier[s.classifier] = (byClassifier[s.classifier] || 0) + 1;
    }
    _pairMap[pid].summary = {
      total: _pairMap[pid].sharedTargets.length,
      byClassifier,
    };
  }
  // Discriminating-pairs array, sorted by total shared targets (desc), then pair id
  const discriminating_pairs = Object.values(_pairMap).sort((a, b) =>
    b.summary.total - a.summary.total || a.id.localeCompare(b.id)
  );
  // Quick lookup by pair-id
  const discriminating_pairs_by_id = Object.fromEntries(
    discriminating_pairs.map(p => [p.id, p])
  );
  // Per-program count of pairs that program participates in (used by
  // the program-card cross-link footer)
  const discriminating_pairs_by_program = {};
  for (const p of discriminating_pairs) {
    if (!discriminating_pairs_by_program[p.progA]) discriminating_pairs_by_program[p.progA] = [];
    if (!discriminating_pairs_by_program[p.progB]) discriminating_pairs_by_program[p.progB] = [];
    discriminating_pairs_by_program[p.progA].push(p);
    discriminating_pairs_by_program[p.progB].push(p);
  }

  // =============================================================
  //   Sub-PR E6 — quantitative-scale entries substrate
  //
  //   Walks every surface that can carry a quantitative_scale
  //   (or its sibling sensitivity field on resolves edges) and
  //   produces:
  //
  //     - DATA.qs_entries           — flat array of denormalised entries
  //     - DATA.qs_entries_by_kind   — entries per kind, sorted by physical magnitude
  //     - DATA.qs_kind_summary      — per-kind {count, minEntry, maxEntry, hasUnranked}
  //
  //   Six surfaces (five carry quantitative_scale per the schema;
  //   the sixth — resolves-edge sensitivity — has the same shape
  //   under a different field name, included so the rank panel
  //   surfaces experimental reach alongside theoretical commitments):
  //
  //     1. cell-direct        — fc.cells[i].quantitative_scale
  //     2. cell-prediction    — fc.cells[i].predictions[j].quantitative_scale
  //     3. fc-prediction      — fc.predictive_yield[j].quantitative_scale
  //     4. carrier-frontier   — open-frontier node.quantitative_scale
  //        carrier-totality   — totality-approach node.quantitative_scale
  //     5. implication        — node.if_real_implies[i].implications[j].quantitative_scale
  //     6. experimental-reach — resolves-edge.sensitivity (sibling field, same shape)
  //
  //   v95 totals: ~288 quantitative_scale entries + 38 resolves
  //   sensitivities = ~326 rank-panel rows.
  //
  //   Unit normalisation: each entry gets a `magnitude` field
  //   (log10 of value in a kind-specific base unit) used purely
  //   for sorting. Entries whose units don't map to a recognised
  //   conversion factor get magnitude_ok=false and sort to the
  //   end of their kind alphabetically by host_label.
  // =============================================================

  // Per-kind log10 unit-conversion factors. Base units:
  //   energy_scale, mass  → eV  (mass-energy equivalence via E=mc²,
  //                              kg=5.609e35 eV; common HEP convention)
  //   length             → m
  //   time               → s
  //   coupling, dimensionless, ratio, sigma_deviation → 1
  //                        (treat raw value as the magnitude; units
  //                         when present read as a category label)
  //
  // Unknown unit strings fall back to magnitude_ok=false and the
  // entry sorts alphabetically at the end of its kind. The map of
  // recognised units is intentionally generous — the dataset uses
  // a mix of SI prefixes, astronomical units, and a few project-
  // internal abbreviations.
  const QS_UNIT_LOG10 = {
    'energy_scale': {
      'eV':   0,    'meV': -3,   'μeV': -6,   'µeV': -6,   'ueV': -6,
      'neV': -9,    'peV': -12,  'feV': -15,
      'keV':  3,    'MeV':  6,   'GeV':  9,   'TeV': 12,   'PeV': 15,  'EeV': 18,  'ZeV': 21,
      'J':    18.795,  'erg':  11.795,         // 1 J = 6.242×10¹⁸ eV
      'K':    -4.0648,                          // k_B × 1 K = 8.617×10⁻⁵ eV
    },
    'mass': {
      'eV':   0,    'meV': -3,   'μeV': -6,   'µeV': -6,   'ueV': -6,
      'keV':  3,    'MeV':  6,   'GeV':  9,   'TeV': 12,   'PeV': 15,
      'eV²':  0,    'eV2':  0,                  // T17 squared-dimensional encoding; sort co-located with eV
      'eV/c²': 0,   'eV/c2': 0,                 // explicit /c² form
      'MeV/c²': 6,  'MeV/c2': 6,
      'GeV/c²': 9,  'GeV/c2': 9,
      'kg':   35.749,    'g':    32.749,
      'M_sun': 66.05,    'M_⊙': 66.05,
      'M_pl':  28.087,                          // Planck mass = 1.22×10¹⁹ GeV
    },
    'length': {
      'm':    0,    'cm': -2,    'mm': -3,    'μm': -6,    'µm': -6,    'um': -6,
      'nm':  -9,    'pm': -12,   'fm': -15,   'am': -18,   'zm': -21,
      'km':   3,    'Mm':  6,    'Gm':  9,
      'AU':   11.175,    'ly':  15.976,
      'pc':   16.489,    'kpc': 19.489,    'Mpc': 22.489,    'Gpc': 25.489,
      'R_sun': 8.842,    'R_⊙': 8.842,
      'R_earth': 6.804,  'R_⊕': 6.804,
      'l_pl':  -34.792,                         // Planck length ~ 1.616×10⁻³⁵ m
    },
    'time': {
      's':    0,    'ms': -3,    'μs': -6,    'µs': -6,    'us': -6,
      'ns':  -9,    'ps': -12,   'fs': -15,   'as': -18,
      'min':  1.778,    'minute': 1.778,
      'h':    3.556,    'hr':     3.556,    'hour':   3.556,
      'd':    4.937,    'day':    4.937,
      'wk':   5.781,    'week':   5.781,
      'yr':   7.499,    'year':   7.499,    'a':      7.499,
      'kyr':  10.499,   'Myr':    13.499,
      'Gyr':  16.499,   'Tyr':    19.499,
      't_pl': -43.268,                          // Planck time ~ 5.39×10⁻⁴⁴ s
    },
    // Dimensionless families — units when present don't add a
    // conversion factor; the raw value carries the magnitude.
    'coupling':       { '': 0, 'dimensionless': 0 },
    'dimensionless':  { '': 0, 'dimensionless': 0 },
    'ratio':          { '': 0, 'dimensionless': 0 },
    'sigma_deviation':{ '': 0, 'σ': 0, 'sigma': 0 },
  };

  function qsEntryMagnitude(qs, kind) {
    if (!qs || qs.value === undefined || qs.value === null) {
      return { magnitude: -Infinity, magnitude_ok: false };
    }
    const v = qs.value;
    const isLog10 = !!qs.log10;
    const units = qs.units || '';
    // Base magnitude in the entry's own units
    let base;
    if (isLog10) {
      base = (typeof v === 'number') ? v : NaN;
    } else if (typeof v === 'number' && v !== 0) {
      base = Math.log10(Math.abs(v));
    } else if (v === 0) {
      // value = 0 magnitudes sort to the front
      return { magnitude: -Infinity, magnitude_ok: true };
    } else {
      base = NaN;
    }
    if (!isFinite(base)) {
      return { magnitude: -Infinity, magnitude_ok: false };
    }
    const table = QS_UNIT_LOG10[kind] || null;
    if (!table) {
      // Unknown kind — sort by raw magnitude, flag as unranked
      return { magnitude: base, magnitude_ok: false };
    }
    const factor = table[units];
    if (factor === undefined) {
      // For dimensionless families, an unrecognised units string
      // is acceptable (the raw value is still the magnitude); for
      // dimensional kinds, mark unranked.
      const isDimensionlessFamily = (kind === 'coupling' || kind === 'dimensionless' || kind === 'ratio' || kind === 'sigma_deviation');
      if (isDimensionlessFamily) return { magnitude: base, magnitude_ok: true };
      return { magnitude: base, magnitude_ok: false };
    }
    return { magnitude: base + factor, magnitude_ok: true };
  }

  // Helper: produce a short one-line description for a host based
  // on the surface type. Used by the rank panel row's middle column.
  function _cellContentString(cell) {
    if (!cell) return '';
    if (typeof cell.content === 'string') return cell.content;
    if (cell.cell_id) return cell.cell_id;
    return '';
  }

  const qs_entries = [];

  // (1) cell-direct + (2) cell-prediction surfaces — walk every fc, every cell
  for (const fc of fcs) {
    for (const cell of (fc.cells || [])) {
      const cellContent = _cellContentString(cell);
      // cell-direct
      if (cell.quantitative_scale && cell.quantitative_scale.value !== undefined) {
        const qs = cell.quantitative_scale;
        const mag = qsEntryMagnitude(qs, qs.kind);
        qs_entries.push({
          kind: qs.kind || '',
          qs,
          magnitude: mag.magnitude,
          magnitude_ok: mag.magnitude_ok,
          surface: 'cell-direct',
          host_id: cell.cell_id || '',
          host_type: 'formal-classification',
          host_label: cellContent || cell.cell_id || 'cell',
          fc_id: fc.id,
          cell_id: cell.cell_id,
          description: cellContent,
        });
      }
      // cell-prediction
      for (let pi = 0; pi < (cell.predictions || []).length; pi++) {
        const pred = cell.predictions[pi];
        if (pred && pred.quantitative_scale && pred.quantitative_scale.value !== undefined) {
          const qs = pred.quantitative_scale;
          const mag = qsEntryMagnitude(qs, qs.kind);
          qs_entries.push({
            kind: qs.kind || '',
            qs,
            magnitude: mag.magnitude,
            magnitude_ok: mag.magnitude_ok,
            surface: 'cell-prediction',
            host_id: cell.cell_id || '',
            host_type: 'formal-classification',
            host_label: cellContent || cell.cell_id || 'cell',
            host_cell_label: cellContent || '',
            fc_id: fc.id,
            cell_id: cell.cell_id,
            prediction_idx: pi,
            description: pred.prediction || pred.description || '',
          });
        }
      }
    }
    // (3) fc-prediction surface — fc.predictions === predictive_yield
    for (let pi = 0; pi < (fc.predictions || []).length; pi++) {
      const pred = fc.predictions[pi];
      if (pred && pred.quantitative_scale && pred.quantitative_scale.value !== undefined) {
        const qs = pred.quantitative_scale;
        const mag = qsEntryMagnitude(qs, qs.kind);
        qs_entries.push({
          kind: qs.kind || '',
          qs,
          magnitude: mag.magnitude,
          magnitude_ok: mag.magnitude_ok,
          surface: 'fc-prediction',
          host_id: fc.id,
          host_type: 'formal-classification',
          host_label: fc.label,
          fc_id: fc.id,
          prediction_idx: pi,
          description: pred.prediction || pred.description || '',
        });
      }
    }
  }

  // (4) carrier surface + (5) implication surface — walk discourse_nodes
  for (const node of discourse_nodes) {
    const isFrontier = (node.type === 'open-frontier');
    const isTotality = (node.type === 'totality-approach');
    if (!isFrontier && !isTotality) continue;
    // carrier-frontier / carrier-totality
    if (node.quantitative_scale && node.quantitative_scale.value !== undefined) {
      const qs = node.quantitative_scale;
      const mag = qsEntryMagnitude(qs, qs.kind);
      qs_entries.push({
        kind: qs.kind || '',
        qs,
        magnitude: mag.magnitude,
        magnitude_ok: mag.magnitude_ok,
        surface: isFrontier ? 'carrier-frontier' : 'carrier-totality',
        host_id: node.id,
        host_type: node.type,
        host_label: node.label || node.id,
        description: node.label || node.id,
      });
    }
    // implication-level surface
    const resolutions = node.if_real_implies || [];
    for (let ri = 0; ri < resolutions.length; ri++) {
      const res = resolutions[ri] || {};
      const impls = res.implications || [];
      for (let ii = 0; ii < impls.length; ii++) {
        const impl = impls[ii] || {};
        if (impl.quantitative_scale && impl.quantitative_scale.value !== undefined) {
          const qs = impl.quantitative_scale;
          const mag = qsEntryMagnitude(qs, qs.kind);
          qs_entries.push({
            kind: qs.kind || '',
            qs,
            magnitude: mag.magnitude,
            magnitude_ok: mag.magnitude_ok,
            surface: 'implication',
            host_id: node.id,
            host_type: node.type,
            host_label: node.label || node.id,
            implication_resolution_idx: ri,
            implication_idx: ii,
            description: impl.description || impl.target || '',
          });
        }
      }
    }
  }

  // (6) experimental-reach surface — resolves-edge sensitivity
  for (const eid in resolves_by_id) {
    const e = resolves_by_id[eid];
    if (!e || !e.sensitivity || e.sensitivity.value === undefined) continue;
    const qs = e.sensitivity;
    const mag = qsEntryMagnitude(qs, qs.kind);
    // Reach target label — for cell targets, the cell content; for
    // discourse-node targets, the node label.
    let reachTargetLabel = '';
    const targetId = e.to;
    if (cell_id_to_fc_id[targetId]) {
      const fcId = cell_id_to_fc_id[targetId];
      const fc = fcById[fcId];
      const cell = fc && (fc.cells || []).find(c => c.cell_id === targetId);
      reachTargetLabel = _cellContentString(cell) || targetId;
    } else if (discourse_by_id[targetId]) {
      reachTargetLabel = discourse_by_id[targetId].label || targetId;
    }
    const programNode = discourse_by_id[e.from];
    const programLabel = (programNode && programNode.label) || e.from;
    qs_entries.push({
      kind: qs.kind || '',
      qs,
      magnitude: mag.magnitude,
      magnitude_ok: mag.magnitude_ok,
      surface: 'experimental-reach',
      host_id: e.from,
      host_type: 'experimental-program',
      host_label: programLabel,
      edge_id: e.id || '',
      reach_target_id: targetId,
      reach_target_label: reachTargetLabel,
      description: reachTargetLabel
        ? `Reach toward ${reachTargetLabel}`
        : 'Reach',
    });
  }

  // (Bears-on edge surface — renderer-ready, but v95 has zero entries.
  // When non-zero, walk edges of type === 'bears-on' for edge.quantitative_scale
  // here. Skipped silently for now.)

  // Group entries by kind and sort within each group:
  //   ranked entries first, sorted by magnitude ascending;
  //   unranked entries after, alphabetised by host_label.
  const qs_entries_by_kind = {};
  for (const entry of qs_entries) {
    const k = entry.kind || '__unknown__';
    if (!qs_entries_by_kind[k]) qs_entries_by_kind[k] = [];
    qs_entries_by_kind[k].push(entry);
  }
  for (const k in qs_entries_by_kind) {
    qs_entries_by_kind[k].sort((a, b) => {
      const aOk = a.magnitude_ok !== false;
      const bOk = b.magnitude_ok !== false;
      if (aOk && !bOk) return -1;
      if (!aOk && bOk) return 1;
      if (aOk && bOk) {
        if (a.magnitude !== b.magnitude) return a.magnitude - b.magnitude;
        return (a.host_label || '').localeCompare(b.host_label || '');
      }
      return (a.host_label || '').localeCompare(b.host_label || '');
    });
  }

  // Per-kind summary: count, minEntry (smallest magnitude),
  // maxEntry (largest magnitude), hasUnranked (any entry whose
  // units didn't normalise).
  const qs_kind_summary = {};
  for (const k in qs_entries_by_kind) {
    const list = qs_entries_by_kind[k];
    const ranked = list.filter(e => e.magnitude_ok !== false);
    qs_kind_summary[k] = {
      count: list.length,
      minEntry: ranked.length ? ranked[0] : (list[0] || null),
      maxEntry: ranked.length ? ranked[ranked.length - 1] : (list[list.length - 1] || null),
      hasUnranked: list.some(e => e.magnitude_ok === false),
    };
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
    cross_class_edges_by_id,
    falsifications,
    glossary,
    // Update B — discourse layer
    discourse_nodes,
    discourse_by_id,
    discourse_by_type,
    discourse_edges_by_node,
    discourse_edges_by_type,
    fcs_connected_to_discourse,
    discourse_edges_by_fc_pair,
    // Phase C — resolves edges (Step 4.4)
    resolves_by_program,
    resolves_by_target,
    resolves_by_id,
    cell_id_to_fc_id,
    // Sub-PR E7 — discriminating-experiments lookup substrate
    discriminating_pairs,
    discriminating_pairs_by_id,
    discriminating_pairs_by_program,
    // Sub-PR E6 — quantitative-scale catalogue substrate
    qs_entries,
    qs_entries_by_kind,
    qs_kind_summary,
    _meta: {
      dataset_version: (raw._meta && raw._meta.version) || raw.dataset_version || raw.schema_version || 'v34',
      generated_at: new Date().toISOString(),
      counts: {
        formal_classifications: fcs.length,
        cells: total_cells,
        predictions: total_predictions,
        cross_classification_edges: xEdges.length,
        falsifications: falsifications.length,
        phen_phen_edges: phen_phen_edges.length,
        discourse_nodes: discourse_nodes.length,
        discourse_edges: Object.values(discourse_edges_by_type).reduce((a, b) => a + b.length, 0),
        resolves_edges: Object.values(resolves_by_id).length,
        discriminating_pairs: discriminating_pairs.length,
        quantitative_scale_entries: qs_entries.length,
      },
    },
  };
}

function renderFatalError(msg, detail) {
  document.getElementById('sidebar-inner').innerHTML = `
    <div class="sidebar-section">
      <h3 style="color:var(--st-falsified)">Could not load dataset</h3>
      <div style="font-size:15.5px;line-height:1.55;color:var(--ink-soft)">${esc(msg)}</div>
      ${detail ? `<pre style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--ink-mute);background:var(--paper-2);padding:8px 10px;border-radius:2px;margin-top:8px;white-space:pre-wrap">${esc(String(detail))}</pre>` : ''}
      <div style="margin-top:10px;font-size:14.5px;color:var(--ink-mute)">
        The map’s dataset didn’t load. Check your connection and reload — the explorer reads its data live from the project repository. If you’re running this page from your own machine, place <code style="font-family:'JetBrains Mono',monospace;background:var(--paper-3);padding:1px 4px">data/Map_v34_consolidated.json</code> beside it.
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
  selectedFC: null,             // currently-shown FC in sidebar (null = default intro)
  selectedCell: null,           // sub-selection within FC's cells
  selectedDiscourseNode: null,  // Update B — selected architecture/frontier/totality/regime-content/program
  selectedEdgeId: null,         // Update C — selected cross-classification edge (clickable on-map edges)
  selectedDiscourseEdgesPair: null, // Update C — discourse-highlight ring badge: { nodeId, fcId } or null
  activeView: 'classifications', // every visit starts on the classification map (the questions view is reachable, not remembered); an explicit ?view= in a saved link still wins
  group: 'sector',              // sector | category | closure
  spotlightActive: new Set(),   // Update B — multi-select prediction statuses (empty = no spotlight)
  // UX pass — overlay layers are independent toggles; the set holds any of
  // 'phen-phen' / 'cross-class'. Empty set = no overlay drawn.
  overlayActive: new Set(),
  predFilter: 'all',            // status filter for sidebar's predictions list
  zoom: 1.0,                    // 1.0 = 100%
  sidebarCollapsed: false,
  // Update A: phenomena layer + panel routing
  activePanel: 'about',         // phenomena | legend | about | education | research | search | spotlight | fc | discourse | discourse-edges | glossary | edge | discriminating | discriminating-pair | ranks | ranks-kind
  phenomenaActive: new Set(),   // start with none on (user opts in via the panel)
  searchQuery: '',
  panX: 0,                      // map pan offset
  panY: 0,
  // UX pass — unified highlight/dim: the set of tiles lit directly on the
  // map (plain click, shift-click multi-compare, or the cross-section
  // builder's selected classifications). Ephemeral — not written to the hash.
  tileSpotlight: new Set(),
  // UX pass — phen↔phen lines lit by click (accumulate-toggle, mirrors tiles).
  edgeSpotlight: new Set(),
  // Update C — glossary panel
  selectedGlossaryTerm: null,   // slug of the currently-focused glossary entry (null = no specific focus)
  glossaryFilter: '',           // type-ahead filter on the glossary panel
  // Sub-PR E7 — discriminating-experiments lookup
  selectedPair: null,           // alphabetised pair-id ('dune|hyper-k') or null
  // Sub-PR E6 — scales-by-kind catalogue
  selectedKind: null,           // 'energy_scale' | 'mass' | 'time' | 'length' | 'coupling' | 'ratio' | 'dimensionless' | 'sigma_deviation' | null
  selectedKindFilter: null,     // null | 'lower' | 'upper' | 'measured' | 'exact' | 'other'  (null = all)
};
var ZOOM_LEVELS = [0.15, 0.25, 0.35, 0.5, 0.65, 0.8, 1.0, 1.25, 1.5, 1.85, 2.25, 2.8, 3.5];

var MCP_BASE = 'https://map-of-physics.eddie-8e5.workers.dev';

// =============================================================
//   Helpers (used by every module — kept here to avoid duplication)
// =============================================================
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function termToSlug(term) {
  // Used by the glossary module: "Architecture" → "architecture",
  // "Cross-architecture non-sharing" → "cross-architecture-non-sharing",
  // "N=2 SCFT spectrum" → "n-2-scft-spectrum". Stable across reloads
  // (no hashing or counters) so deep-link URLs like #/glossary/<slug>
  // keep working.
  if (term == null) return '';
  return String(term)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
// Math-aware paragraph formatter.
//
// Recognises $$...$$ (display math) and $...$ (inline math) using the
// conventions in use across v34 — predominantly in the discourse-layer
// nodes' description fields and loose_ends, where strings like
// "$SU(2)_L \\times U(1)_Y$" or "$\\bar\\theta_{\\mathrm{QCD}} G \\tilde G$"
// were previously rendering as raw markup.
//
// Strategy: extract math segments into placeholders before HTML escape,
// then substitute them back with katex.renderToString output. The
// placeholders use \x00…\x01 sentinels which esc() leaves untouched.
//
// throwOnError:false makes a malformed expression render as a red
// source span via katex's own error machinery; the outer try/catch
// is a defensive backstop in case katex itself throws.
//
// If window.katex is not yet loaded (e.g. during JSDOM smoke tests
// before the CDN script has executed) the math segment falls through
// as escaped text inside a code-styled wrapper, preserving the source
// rather than crashing.
function formatPara(s) {
  if (!s) return '';

  const segments = [];
  let idx = 0;

  // Pass 1: display math (greedy non-greedy on internals so $$..$$ doesn't swallow $..$..$..$).
  let text = String(s).replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => {
    segments.push({ latex, displayMode: true });
    return '\x00MATH' + (idx++) + '\x01';
  });
  // Pass 2: inline math. [^$\n]+? to keep matches single-line, non-greedy.
  text = text.replace(/\$([^$\n]+?)\$/g, (_, latex) => {
    segments.push({ latex, displayMode: false });
    return '\x00MATH' + (idx++) + '\x01';
  });

  // Original behaviour: split paragraphs, escape, soft-break on single newlines.
  const escaped = text.split(/\n\n+/)
    .map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('');

  // Substitute math segments back as KaTeX-rendered HTML.
  return escaped.replace(/\x00MATH(\d+)\x01/g, (_, n) => {
    const seg = segments[Number(n)];
    if (!seg) return '';
    // v34 dataset escape normalization. Many `description` and `loose_ends`
    // string fields in v34 are double-escaped at the JSON-source level —
    // a literal "\\theta" stored where "\theta" was intended. KaTeX sees
    // "\\" as a line-break command and renders the following identifier
    // (bar, theta, mathrm, …) as literal text. Collapsing "\\" → "\"
    // inside math segments fixes it without touching the canonical data.
    // Safe because v34 has zero $$...$$ display math where "\\" would be
    // a legitimate line-break; can be revisited if/when that changes.
    const latex = seg.latex.replace(/\\\\/g, '\\');
    if (typeof katex === 'undefined' || !katex || typeof katex.renderToString !== 'function') {
      // Graceful fallback: render the source so the reader can see what
      // KaTeX would have processed. Useful in JSDOM smoke tests and on
      // the rare occasion the CDN is unreachable.
      const wrap = seg.displayMode ? 'div' : 'code';
      return `<${wrap} class="math-unrendered">${esc((seg.displayMode ? '$$' : '$') + latex + (seg.displayMode ? '$$' : '$'))}</${wrap}>`;
    }
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: seg.displayMode,
        output: 'html',
        strict: 'ignore',
      });
    } catch (e) {
      // Defensive: katex itself threw despite throwOnError:false.
      return `<code class="math-unrendered" title="${esc(String(e && e.message || e))}">${esc(latex)}</code>`;
    }
  });
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
  if (!h) {
    // No hash: the default view, every time. Saved progress is explicit —
    // a copied link with its hash — never an invisible remembered state.
    return;
  }
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'fc' && parts[1]) {
    state.selectedFC = parts[1];
    state.selectedCell = parts[2] || null;
  } else if (parts[0] === 'discourse' && parts[1]) {
    // Update B — /discourse/<id>
    state.selectedDiscourseNode = parts[1];
  } else if (parts[0] === 'edge' && parts[1]) {
    // Update C — /edge/<edge-id>  (clickable on-map edges)
    state.selectedEdgeId = parts[1];
    state.activePanel = 'edge';
  } else if (parts[0] === 'discourse-edges' && parts[1] && parts[2]) {
    // Update C — /discourse-edges/<node-id>/<fc-id>  (ring-badge multi-edge card)
    state.selectedDiscourseEdgesPair = { nodeId: parts[1], fcId: parts[2] };
    // Also restore the parent discourse selection so the ring stays lit
    state.selectedDiscourseNode = parts[1];
    state.activePanel = 'discourse-edges';
  } else if (parts[0] === 'glossary') {
    // Update C — /glossary  or  /glossary/<slug>
    state.activePanel = 'glossary';
    state.selectedGlossaryTerm = parts[1] || null;
  } else if (parts[0] === 'pairs') {
    // Sub-PR E7 — /pairs  catalogue of all program pairs with shared coverage
    state.activePanel = 'discriminating';
  } else if (parts[0] === 'pair' && parts[1] && parts[2]) {
    // Sub-PR E7 — /pair/<progA>/<progB>  per-pair shared-coverage view.
    // Pair ids are alphabetised; the parser tolerates either order and
    // canonicalises on read.
    const a = parts[1], b = parts[2];
    const pid = (a < b) ? (a + '|' + b) : (b + '|' + a);
    state.selectedPair = pid;
    state.activePanel = 'discriminating-pair';
  } else if (parts[0] === 'scales') {
    // Sub-PR E6 — /scales  catalogue of all qs entries grouped by kind;
    //             /scales/<kind>  per-kind ranked drill-down.
    if (parts[1]) {
      state.selectedKind = parts[1];
      state.activePanel = 'ranks-kind';
    } else {
      state.activePanel = 'ranks';
    }
  }
  if (qs) {
    const p = new URLSearchParams(qs);
    if (p.get('group')) state.group = p.get('group');
    // Update B — spotlight=confirmed,falsified (comma-separated multi-select)
    if (p.get('spotlight')) {
      state.spotlightActive = new Set(p.get('spotlight').split(',').filter(Boolean));
    } else if (p.get('highlight') && p.get('highlight') !== 'all') {
      // Back-compat with pre-B URLs: ?highlight=X becomes a one-element set
      state.spotlightActive = new Set([p.get('highlight')]);
    }
    if (p.get('overlay')) {
      // UX pass — comma-separated layer list (was a single value)
      state.overlayActive = new Set(p.get('overlay').split(',')
        .map(x => x.trim()).filter(x => x === 'phen-phen' || x === 'cross-class'));
    }
    if (p.get('pred'))    state.predFilter = p.get('pred');
  }
  // E0 lead — resolve the active top-level view. An explicit ?view= wins;
  // otherwise an FC- or edge-selection path implies the classifications
  // view, and everything else (bare, /discourse, /glossary, …) is the
  // open-questions view.
  const _qsParams = qs ? new URLSearchParams(qs) : null;
  const _vparam = _qsParams && _qsParams.get('view');
  if (_vparam === 'questions' || _vparam === 'classifications') {
    state.activeView = _vparam;
  } else if (parts[0] === 'fc' || parts[0] === 'edge') {
    state.activeView = 'classifications';
  } else {
    // Bare and non-selection paths imply the default view — the
    // classification map. The questions view is reachable via its
    // explicit ?view=questions, never implied.
    state.activeView = 'classifications';
  }
}
function writeHash() {
  let h = '#/';
  if (state.selectedFC) {
    h += 'fc/' + encodeURIComponent(state.selectedFC);
    if (state.selectedCell) h += '/' + encodeURIComponent(state.selectedCell);
  } else if (state.selectedEdgeId) {
    // Update C — /edge/<edge-id>  (clickable on-map edges)
    h += 'edge/' + encodeURIComponent(state.selectedEdgeId);
  } else if (state.selectedDiscourseEdgesPair && state.selectedDiscourseEdgesPair.nodeId && state.selectedDiscourseEdgesPair.fcId) {
    // Update C — /discourse-edges/<node-id>/<fc-id>  (ring-badge card).
    // Sits between cross-class edge and discourse-node in precedence:
    // the badge card is a focused view of an FC's edges *to a particular
    // selected discourse node*, so it's strictly more specific than the
    // bare discourse-node selection.
    h += 'discourse-edges/' + encodeURIComponent(state.selectedDiscourseEdgesPair.nodeId)
      +  '/' + encodeURIComponent(state.selectedDiscourseEdgesPair.fcId);
  } else if (state.selectedDiscourseNode) {
    h += 'discourse/' + encodeURIComponent(state.selectedDiscourseNode);
  } else if (state.activePanel === 'glossary') {
    // Update C — /glossary  or  /glossary/<slug>
    h += 'glossary';
    if (state.selectedGlossaryTerm) h += '/' + encodeURIComponent(state.selectedGlossaryTerm);
  } else if (state.activePanel === 'discriminating-pair' && state.selectedPair) {
    // Sub-PR E7 — /pair/<progA>/<progB>
    const [a, b] = state.selectedPair.split('|');
    h += 'pair/' + encodeURIComponent(a) + '/' + encodeURIComponent(b);
  } else if (state.activePanel === 'discriminating') {
    // Sub-PR E7 — /pairs  catalogue
    h += 'pairs';
  } else if (state.activePanel === 'ranks-kind' && state.selectedKind) {
    // Sub-PR E6 — /scales/<kind>  per-kind drill-down
    h += 'scales/' + encodeURIComponent(state.selectedKind);
  } else if (state.activePanel === 'ranks') {
    // Sub-PR E6 — /scales  catalogue
    h += 'scales';
  }
  const qs = [];
  if (state.group !== 'sector') qs.push('group=' + encodeURIComponent(state.group));
  if (state.spotlightActive.size > 0) {
    // Sort so the hash is stable across reorderings of the Set
    const vals = Array.from(state.spotlightActive).sort();
    qs.push('spotlight=' + encodeURIComponent(vals.join(',')));
  }
  if (state.overlayActive && state.overlayActive.size) qs.push('overlay=' + encodeURIComponent(Array.from(state.overlayActive).join(',')));
  if (state.selectedFC && state.predFilter !== 'all') qs.push('pred=' + encodeURIComponent(state.predFilter));
  // E0 lead — preserve the active view across reloads, but only when it
  // diverges from what the path already implies (keeps clean URLs in the
  // common case: bare/discourse ⇒ questions, fc/edge ⇒ classifications).
  const pathImpliedView = 'classifications';
  if (state.activeView !== pathImpliedView) qs.push('view=' + encodeURIComponent(state.activeView));
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