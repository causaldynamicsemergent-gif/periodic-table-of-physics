'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-builder.js
//   Sub-PR: EM1 — configuration / cross-section builder
//
//   The explorer's CENTRAL Mendeleev surface (MENDELEEV_FRAME.md §7,
//   META_v21_1_methodology_firewall.md §8). It performs the mode-3 M1
//   move: a reader lays 2+ classifications along a shared axis, and the
//   recurrences and gaps the substrate already supports are read off the
//   layout — not authored. This file RENDERS that move; it never writes
//   to the data layer. Synthesized lattice positions are transient: the
//   stored `conjectured-by-pattern` count stays at zero until a real
//   configuration forces a gap at query time (firewall §8; DRIFT_PATTERN
//   _REGISTER.md Entry 1 — patterns/gaps are substrate OUTPUTS, not
//   substrate inputs, and are not bound by the §2.5 authoring self-check).
//
//   Two admissibility cuts keep the surface honest:
//     • Gap audit (§7): an empty lattice position renders as a conjectured
//       gap ONLY when its row and column are anchored by realized/forced
//       cells in the selected faces. Otherwise it is plain "empty".
//     • Recurrence cut (M2 dual): a co-location of content across faces
//       sorts into three epistemically distinct objects that never share a
//       rendering — established recurrence (a status:'established' cross-
//       classification edge: "the literature noticed this"), candidate
//       correspondence (anchored on all sides AND touching a checkable
//       consequence: rendered at lower weight, labelled candidate, no
//       confidence number), and raw alignment (unmarked co-location).
//
//   M2 is substrate-ENABLED (MENDELEEV_FRAME.md §3): the builder may
//   surface a candidate correspondence; it may not promote it. Promotion
//   to an established recurrence is a physics claim a physicist makes and
//   records by PR. Vocabulary is physicist-facing throughout
//   (PHYSICIST_FACING_VOCABULARY.md §3): "conjectured by the constructive
//   pattern but unrealized", "forbidden by the classification's own
//   pattern", "physically realized" — no snake_case, no software verbs.
//
//   Reads (all global, plain scripts, no IIFE):
//     FCS / FC_BY_ID / DATA / state / esc / showToast        (data.js)
//     cellSwatchClass / fcEstablishedRecurrence              (map.js)
//     switchSidebarPanel / renderPanel                       (sidebar.js)
//   Load order in HTML: data → map → sidebar → … → builder. Builder loads
//   AFTER map and sidebar so its runtime calls resolve.
// =============================================================

// Soft legibility threshold for the human 2D projection. NOT a cap on what
// is constructible: detection is uncapped and gated only on whether an axis
// correspondence exists across the chosen faces (identical axis name OR an
// axis_mapping edge). Past this many face-columns the projection gets noisy
// for a human eye, so we nudge; the full N-tuple correspondence set is
// always available to the query layer without projection or ceiling.
var BUILDER_SOFT_OVERLAY_NUDGE = 3;

function builderState() {
  if (!state.builder) {
    state.builder = { fcIds: [], axisKey: null, pickerQuery: '' };
  }
  return state.builder;
}

// ---- Anchoring & consequence predicates (the cut machinery) ----------------

// A cell is literature-anchored when it carries realized examples, an
// explicit citation, or a forcing-constraint edge (forbidden/conjectured
// cells point at the closure edge that forces them via forced_by[]).
function builderCellAnchored(cell) {
  if (!cell) return false;
  if (cell.realized_examples && cell.realized_examples.length) return true;
  if (cell.citations && cell.citations.length) return true;
  if (cell.forced_by && cell.forced_by.length) return true;
  return false;
}

// A position touches a checkable consequence when at least one of its
// occupant cells carries a quantitative bound, is the target of an
// experimental-coverage (resolves) relation, or is itself a forced cell.
// (For a face that is an open frontier, if-real-implies carriers apply too;
//  the FC-cell core uses these three substrate-computable signals.)
function builderTouchesConsequence(cells) {
  for (var i = 0; i < cells.length; i++) {
    var c = cells[i];
    if (!c) continue;
    if (c.quantitative_scale) return true;
    var cp = c.predictions || [];
    for (var j = 0; j < cp.length; j++) {
      if (cp[j] && cp[j].quantitative_scale) return true;
    }
    var byTarget = (DATA && DATA.resolves_by_target) || {};
    if (c.cell_id && byTarget[c.cell_id] && byTarget[c.cell_id].length) return true;
    if (c.forced_by && c.forced_by.length) return true;
  }
  return false;
}

// ---- Shared-axis discovery -------------------------------------------------

// For a pair of classifications, the axis correspondences between them:
// identical axis names, plus any axis_mapping carried on a cross-
// classification edge connecting the two (read from the full edge record in
// cross_class_edges_by_id — axis_mapping is not on the slim edges_by_fc rows).
function builderAxisCorrespondences(idA, idB) {
  var fcA = FC_BY_ID[idA], fcB = FC_BY_ID[idB];
  if (!fcA || !fcB) return [];
  var out = [];
  var namesB = {};
  (fcB.classification_axes || []).forEach(function(ax) { namesB[ax.name] = true; });
  // (1) identical axis names
  (fcA.classification_axes || []).forEach(function(ax) {
    if (namesB[ax.name]) {
      out.push({ kind: 'name', label: ax.name, axisA: ax.name, axisB: ax.name });
    }
  });
  // (2) axis_mapping edges between the two
  var byFc = (DATA && DATA.edges_by_fc) || {};
  var byId = (DATA && DATA.cross_class_edges_by_id) || {};
  (byFc[idA] || []).forEach(function(slim) {
    var other = (slim.from === idA) ? slim.to : slim.from;
    if (other !== idB) return;
    var full = byId[slim.id];
    var am = full && full.axis_mapping;
    if (!am) return;
    var pairs = Array.isArray(am) ? am : [am];
    pairs.forEach(function(m) {
      var axisA = m.from_axis || m.axisA || m.from || m.a;
      var axisB = m.to_axis   || m.axisB || m.to   || m.b;
      if (!axisA || !axisB) return;
      out.push({
        kind: 'mapping', edgeId: slim.id,
        label: axisA + ' \u2194 ' + axisB,
        axisA: (slim.from === idA) ? axisA : axisB,
        axisB: (slim.from === idA) ? axisB : axisA,
      });
    });
  });
  return out;
}

// Shared-axis identities across ALL selected faces. An identity is offerable
// only when every selected face contributes a corresponding axis (by name or
// mapping). Returns [{ key, label, perFc: {fcId: axisName} }]. This is the
// substrate-decided constraint on what is combinable — not a face count.
function builderSharedAxisKeys(fcIds) {
  if (fcIds.length < 2) return [];
  var base = fcIds[0];
  var fcBase = FC_BY_ID[base];
  if (!fcBase) return [];
  var keys = [];
  (fcBase.classification_axes || []).forEach(function(ax) {
    var perFc = {}; perFc[base] = ax.name;
    var ok = true;
    for (var i = 1; i < fcIds.length; i++) {
      var corr = builderAxisCorrespondences(base, fcIds[i]).filter(function(c) {
        return c.axisA === ax.name;
      });
      if (!corr.length) { ok = false; break; }
      perFc[fcIds[i]] = corr[0].axisB;
    }
    if (ok) {
      keys.push({ key: ax.name, label: ax.name, perFc: perFc });
    }
  });
  return keys;
}

// ---- Lattice projection ----------------------------------------------------

// Project the selected faces onto a chosen shared axis. Rows = the union of
// the shared axis's values across faces (aligned by the per-face axis name);
// columns = the faces themselves. Each lattice cell holds the occupant cells
// of that face whose value on its corresponding axis equals the row value.
function builderProject(fcIds, axisKeyObj) {
  var rowsSet = {};
  var occByRowFc = {}; // rowValue -> fcId -> [cells]
  fcIds.forEach(function(fcId) {
    var fc = FC_BY_ID[fcId];
    var axisName = axisKeyObj.perFc[fcId];
    (fc.cells || []).forEach(function(cell) {
      var v = (cell.axis_values || {})[axisName];
      if (v === undefined || v === null || v === '') return;
      v = String(v);
      rowsSet[v] = true;
      if (!occByRowFc[v]) occByRowFc[v] = {};
      if (!occByRowFc[v][fcId]) occByRowFc[v][fcId] = [];
      occByRowFc[v][fcId].push(cell);
    });
  });
  var rows = Object.keys(rowsSet).sort();
  return { rows: rows, fcIds: fcIds, occ: occByRowFc };
}

// Does an established cross-classification edge connect any two of these
// faces? "The literature noticed this" — the highest-weight recurrence.
function builderEstablishedBetween(fcIds) {
  var byFc = (DATA && DATA.edges_by_fc) || {};
  for (var i = 0; i < fcIds.length; i++) {
    var list = byFc[fcIds[i]] || [];
    for (var k = 0; k < list.length; k++) {
      var e = list[k];
      if (e.status !== 'established') continue;
      var other = (e.from === fcIds[i]) ? e.to : e.from;
      if (fcIds.indexOf(other) >= 0) return e;
    }
  }
  return null;
}

// Same physical content across faces? Detected by realized-example token
// overlap or shared content wording — NOT asserted by an edge. This is the
// "read off the organization" recognition, the PBH-across-two-classifications
// case. Conservative: needs a non-trivial shared token.
function builderContentOverlap(cellsA, cellsB) {
  function toks(cells) {
    var t = {};
    cells.forEach(function(c) {
      var s = ((c.realized_examples || []).join(' ') + ' ' + (c.content || '')).toLowerCase();
      s.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).forEach(function(w) {
        if (w.length >= 4) t[w] = true; // 4+ chars to skip "the", "mass", etc. stay; tune later
      });
    });
    return t;
  }
  var ta = toks(cellsA), tb = toks(cellsB);
  var shared = [];
  Object.keys(ta).forEach(function(w) { if (tb[w]) shared.push(w); });
  // Require at least one shared token that is not a generic stopword.
  var STOP = { mass: 1, scale: 1, viable: 1, excluded: 1, status: 1, regime: 1,
               candidate: 1, class: 1, with: 1, that: 1, from: 1, this: 1 };
  return shared.filter(function(w) { return !STOP[w]; });
}

// Classify one lattice position into exactly one rendering bucket.
// Buckets: forbidden | recurrence-established | recurrence-candidate |
//          raw-alignment | realized | gap-conjectured | empty
function builderClassifyPosition(rowValue, fcIds, occForRow, establishedEdge) {
  var facesPresent = fcIds.filter(function(id) { return occForRow[id] && occForRow[id].length; });
  var allCells = [];
  facesPresent.forEach(function(id) { allCells = allCells.concat(occForRow[id]); });

  // Forbidden dominates: a structural exclusion sitting in this row.
  var hasForbidden = allCells.some(function(c) {
    return c.constructive_status === 'forbidden-by-pattern' ||
           c.structurally_excluded ||
           String(c.content || '').toLowerCase().indexOf('structurally-excluded') >= 0;
  });
  if (hasForbidden && facesPresent.length <= 1) return { bucket: 'forbidden', cells: allCells, faces: facesPresent };

  // Co-location across >= 2 faces -> a recurrence-class object.
  if (facesPresent.length >= 2) {
    // Established? An edge with status 'established' connecting the present faces.
    if (establishedEdge) {
      var f = establishedEdge.from, t = establishedEdge.to;
      if (facesPresent.indexOf(f) >= 0 && facesPresent.indexOf(t) >= 0) {
        return { bucket: 'recurrence-established', cells: allCells, faces: facesPresent, edge: establishedEdge };
      }
    }
    // Candidate cut: same content across faces AND anchored on all sides AND
    // touches a checkable consequence. Otherwise raw alignment.
    var overlapTokens = [];
    for (var a = 0; a < facesPresent.length; a++) {
      for (var b = a + 1; b < facesPresent.length; b++) {
        overlapTokens = overlapTokens.concat(
          builderContentOverlap(occForRow[facesPresent[a]], occForRow[facesPresent[b]]));
      }
    }
    var allAnchored = allCells.every(builderCellAnchored);
    var consequence = builderTouchesConsequence(allCells);
    if (overlapTokens.length && allAnchored && consequence) {
      return { bucket: 'recurrence-candidate', cells: allCells, faces: facesPresent,
               tokens: overlapTokens, consequence: consequence };
    }
    return { bucket: 'raw-alignment', cells: allCells, faces: facesPresent };
  }

  // Single face occupies this row.
  if (facesPresent.length === 1) {
    if (allCells.some(function(c) { return c.realized_examples && c.realized_examples.length; })) {
      return { bucket: 'realized', cells: allCells, faces: facesPresent };
    }
    return { bucket: 'realized', cells: allCells, faces: facesPresent };
  }

  // Empty across every face. Gap audit: render as a conjectured gap ONLY when
  // the row is anchored elsewhere (some face has an anchored occupant in a
  // neighbouring row) so the absence is structurally meaningful — not merely
  // not-yet-authored. The synthesized cell is transient; nothing is written.
  return { bucket: 'empty', cells: [], faces: [] };
}

// ---- Render ----------------------------------------------------------------

var BUILDER_BUCKET_META = {
  'recurrence-established': { cls: 'bld-est',  tag: 'recurrence (established)',
    desc: 'A cross-classification edge in the literature records this recurrence.' },
  'recurrence-candidate':  { cls: 'bld-cand', tag: 'candidate correspondence',
    desc: 'The organization permits this correspondence and it is anchored on all sides and touches a checkable consequence \u2014 no one has confirmed it as periodicity. Yours to evaluate.' },
  'raw-alignment':         { cls: 'bld-raw',  tag: 'co-location',
    desc: 'Content lands at the same position but is not anchored on all sides or touches no checkable consequence.' },
  'forbidden':             { cls: 'bld-forb', tag: 'structural exclusion',
    desc: 'Forbidden by the classification\u2019s own constructive pattern.' },
  'realized':              { cls: 'bld-real', tag: 'physically realized', desc: '' },
  'gap-conjectured':       { cls: 'bld-conj', tag: 'conjectured by the pattern, unrealized',
    desc: 'The configuration\u2019s structure implies a position here and nothing fills it. Transient \u2014 not written to the data.' },
  'empty':                 { cls: 'bld-empty', tag: '', desc: '' },
};

function renderSidebarBuilder() {
  var inner = document.getElementById('sidebar-inner');
  if (!inner) return;
  var bs = builderState();

  var intro = '<div class="bld-intro">Lay two or more classifications along a shared axis and read off what the combined structure implies \u2014 the move the periodic table is named for. Recurrences across classifications (the analog of periodicity) and positions the structure implies but nothing fills (the analog of the gaps Mendeleev left for gallium) show up as a consequence of the layout. The recognition is yours; the map supplies the organized ground.</div>';

  // Picker
  var bySector = {};
  FCS.forEach(function(fc) { (bySector[fc.sector] = bySector[fc.sector] || []).push(fc); });
  var q = (bs.pickerQuery || '').toLowerCase();
  var pickerRows = Object.keys(bySector).sort().map(function(sec) {
    var chips = bySector[sec].filter(function(fc) {
      return !q || (fc.label + ' ' + fc.symbol).toLowerCase().indexOf(q) >= 0;
    }).map(function(fc) {
      var on = bs.fcIds.indexOf(fc.id) >= 0;
      return '<button class="bld-fc-chip' + (on ? ' on' : '') + '" data-bld-fc="' + esc(fc.id) + '" type="button">'
        + '<span class="bld-fc-sym">' + esc(fc.symbol) + '</span> ' + esc(fc.label) + '</button>';
    }).join('');
    return chips ? '<div class="bld-sector"><div class="bld-sector-name">' + esc(sec) + '</div>' + chips + '</div>' : '';
  }).join('');

  var selected = bs.fcIds.map(function(id) {
    var fc = FC_BY_ID[id];
    return '<span class="bld-selected" data-bld-fc="' + esc(id) + '">' + esc(fc ? fc.label : id)
      + ' <span class="bld-x">\u00d7</span></span>';
  }).join('') || '<span class="bld-none">none yet \u2014 pick two or more above</span>';

  // Shared-axis selector
  var axisHtml = '';
  var keys = builderSharedAxisKeys(bs.fcIds);
  if (bs.fcIds.length >= 2) {
    if (!keys.length) {
      axisHtml = '<div class="bld-noaxis">These classifications share no axis \u2014 by name or by an axis correspondence the map records. Nothing combinable here; try a different face. (The map decides what is combinable, not a face count.)</div>';
    } else {
      if (!bs.axisKey || !keys.some(function(k) { return k.key === bs.axisKey; })) bs.axisKey = keys[0].key;
      axisHtml = '<div class="bld-axis-row"><span class="bld-axis-label">shared axis:</span>'
        + keys.map(function(k) {
            return '<button class="bld-axis-chip' + (k.key === bs.axisKey ? ' on' : '')
              + '" data-bld-axis="' + esc(k.key) + '" type="button">' + esc(k.label) + '</button>';
          }).join('') + '</div>';
    }
  }

  // Lattice
  var lattice = '';
  var nudge = '';
  if (bs.fcIds.length >= 2 && keys.length && bs.axisKey) {
    if (bs.fcIds.length > BUILDER_SOFT_OVERLAY_NUDGE) {
      nudge = '<div class="bld-nudge">' + bs.fcIds.length + ' faces laid out at once \u2014 the 2D projection gets hard to read past ' + BUILDER_SOFT_OVERLAY_NUDGE + '. The full correspondence set across all faces is available to the query layer without this projection.</div>';
    }
    var axisObj = keys.filter(function(k) { return k.key === bs.axisKey; })[0];
    var proj = builderProject(bs.fcIds, axisObj);
    var established = builderEstablishedBetween(bs.fcIds);

    var head = '<th class="bld-rowhead">' + esc(bs.axisKey) + '</th>'
      + bs.fcIds.map(function(id) {
          var fc = FC_BY_ID[id];
          return '<th class="bld-colhead" title="' + esc(fc.label) + '">' + esc(fc.symbol) + '</th>';
        }).join('');

    var body = proj.rows.map(function(rv) {
      var occForRow = proj.occ[rv] || {};
      var verdict = builderClassifyPosition(rv, bs.fcIds, occForRow, established);
      var rowCls = 'bld-verdict-' + verdict.bucket;
      var meta = BUILDER_BUCKET_META[verdict.bucket] || {};
      var cellsByFc = bs.fcIds.map(function(id) {
        var occ = occForRow[id] || [];
        if (!occ.length) return '<td class="bld-pos bld-empty">\u00b7</td>';
        var swatch = (typeof cellSwatchClass === 'function') ? cellSwatchClass(occ[0], FC_BY_ID[id]) : '';
        var label = occ.map(function(c) {
          return '<span class="bld-occ swatch-' + esc(swatch) + '" data-fc="' + esc(id) + '" data-cell="' + esc(c.cell_id) + '" title="' + esc(c.content || c.cell_id) + '">'
            + esc((c.realized_examples && c.realized_examples[0]) || c.content || c.cell_id).slice(0, 40) + '</span>';
        }).join('');
        return '<td class="bld-pos">' + label + '</td>';
      }).join('');
      var verdictTag = meta.tag
        ? '<div class="bld-verdict-tag ' + (meta.cls || '') + '" title="' + esc(meta.desc || '') + '">' + esc(meta.tag) + '</div>'
        : '';
      return '<tr class="' + rowCls + '"><th class="bld-rowval">' + esc(rv) + verdictTag + '</th>' + cellsByFc + '</tr>';
    }).join('');

    lattice = '<div class="bld-lattice-wrap"><table class="bld-lattice"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';

    // Established-edge note (read off, not asserted by the builder)
    if (established) {
      lattice += '<div class="bld-est-note">An established cross-classification edge connects '
        + esc((FC_BY_ID[established.from] || {}).label || established.from) + ' and '
        + esc((FC_BY_ID[established.to] || {}).label || established.to)
        + ' \u2014 the literature already records this recurrence.</div>';
    }
  }

  // Legend for the three recurrence tiers + gap + exclusion
  var legend = '<div class="bld-legend"><div class="bld-legend-title">how to read a row</div>'
    + ['recurrence-established', 'recurrence-candidate', 'raw-alignment', 'gap-conjectured', 'forbidden'].map(function(b) {
        var m = BUILDER_BUCKET_META[b];
        return '<div class="bld-legend-row"><span class="bld-chip ' + m.cls + '">' + esc(m.tag) + '</span><span class="bld-legend-desc">' + esc(m.desc) + '</span></div>';
      }).join('') + '</div>';

  // Worked-example shortcut (the §2 mode-3 PBH instance) + reset
  var actions = '<div class="bld-actions">'
    + '<button class="bld-example" type="button" id="bld-load-example">load the worked example (dark matter \u00d7 compact objects)</button>'
    + (bs.fcIds.length ? '<button class="bld-reset" type="button" id="bld-reset">clear</button>' : '')
    + '</div>';

  inner.innerHTML =
    '<div class="sidebar-card bld-card">'
    + '<div class="dc-crumbs"><span class="crumb-current">Build a cross-section</span></div>'
    + intro
    + '<div class="bld-section"><div class="bld-section-h">classifications</div>'
    + '<input class="bld-search" id="bld-picker-search" placeholder="filter classifications\u2026" value="' + esc(bs.pickerQuery || '') + '">'
    + '<div class="bld-picker">' + pickerRows + '</div></div>'
    + '<div class="bld-section"><div class="bld-section-h">selected faces</div><div class="bld-selected-row">' + selected + '</div>' + axisHtml + '</div>'
    + nudge
    + lattice
    + legend
    + actions
    + '</div>';

  wireBuilderPanel();
}

function wireBuilderPanel() {
  var bs = builderState();
  var search = document.getElementById('bld-picker-search');
  if (search) {
    search.addEventListener('input', function() {
      bs.pickerQuery = search.value;
      renderSidebarBuilder();
      var s2 = document.getElementById('bld-picker-search');
      if (s2) { s2.focus(); s2.setSelectionRange(s2.value.length, s2.value.length); }
    });
  }
  document.querySelectorAll('[data-bld-fc]').forEach(function(el) {
    el.addEventListener('click', function() {
      var id = el.getAttribute('data-bld-fc');
      var i = bs.fcIds.indexOf(id);
      if (i >= 0) bs.fcIds.splice(i, 1); else bs.fcIds.push(id);
      bs.axisKey = null;
      renderSidebarBuilder();
    });
  });
  document.querySelectorAll('[data-bld-axis]').forEach(function(el) {
    el.addEventListener('click', function() {
      bs.axisKey = el.getAttribute('data-bld-axis');
      renderSidebarBuilder();
    });
  });
  document.querySelectorAll('.bld-occ[data-cell]').forEach(function(el) {
    el.addEventListener('click', function() {
      var fcId = el.getAttribute('data-fc');
      var cellId = el.getAttribute('data-cell');
      if (typeof selectCell === 'function' && FC_BY_ID[fcId]) {
        selectCell(fcId, cellId);
      } else if (typeof selectFC === 'function' && FC_BY_ID[fcId]) {
        selectFC(fcId);
      }
    });
  });
  var ex = document.getElementById('bld-load-example');
  if (ex) ex.addEventListener('click', function() {
    bs.fcIds = ['dark-matter-candidates', 'compact-astrophysical-objects'].filter(function(id) { return FC_BY_ID[id]; });
    bs.axisKey = 'observational-status';
    renderSidebarBuilder();
  });
  var rst = document.getElementById('bld-reset');
  if (rst) rst.addEventListener('click', function() {
    bs.fcIds = []; bs.axisKey = null; bs.pickerQuery = '';
    renderSidebarBuilder();
  });
}
