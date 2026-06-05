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
//   to the data layer. Synthesized gap positions are transient: the stored
//   `conjectured-by-pattern` count stays at zero until a real configuration
//   forces a gap at query time (firewall §8; DRIFT_PATTERN_REGISTER.md
//   Entry 1 — patterns/gaps are substrate OUTPUTS, not inputs, and are not
//   bound by the §2.5 authoring self-check).
//
//   Recurrence detection keys off an EXPLICIT, structured signal — a
//   classification axis VALUE token shared across two or more classifications
//   (e.g. "primordial-black-hole" appears as a candidate-class value in
//   Dark matter candidates AND an object-class value in Compact astrophysical
//   objects). This is the substrate's controlled-vocabulary record that the
//   same physical entity is classified in both places — robust where the
//   prose cross-references are not (the v34 data already carries one stale
//   prose ref: cell-dm-PBH-LIGO-mass-excluded names a compact cell id that
//   does not exist; the shared-value signal catches the recurrence anyway,
//   and the stale ref is surfaced as a data-quality note rather than relied on).
//
//   Three epistemically distinct recurrence objects that never share a render:
//     • established — a status:'established' cross-classification edge connects
//       the faces ("the literature noticed this", classification level).
//     • recorded (cell-level) — cells across faces share a cross-FC entity
//       value token: the curators recorded the same entity in both FCs without
//       forcing an FC-level edge (the mode-3 PBH case, MENDELEEV_FRAME.md §2).
//     • candidate — a same-row co-location with NO shared entity token, passing
//       the admissibility cut (anchored on all sides AND touching a checkable
//       consequence). Computed, look-elsewhere-prone, labelled candidate, no
//       confidence number. M2 is substrate-ENABLED (FRAME §3): the builder may
//       surface a candidate; promotion to an established recurrence is a physics
//       claim a physicist makes and records by PR.
//   raw alignment (co-location failing the cut) is shown unmarked.
//
//   Vocabulary is physicist-facing (PHYSICIST_FACING_VOCABULARY.md §3):
//   "conjectured by the constructive pattern but unrealized", "forbidden by
//   the classification's own pattern", "physically realized" — no snake_case,
//   no software verbs.
//
//   Reads (all global; plain scripts, no IIFE):
//     FCS / FC_BY_ID / DATA / state / esc / showToast        (data.js)
//     cellSwatchClass / fcEstablishedRecurrence              (map.js)
//     selectFC / selectCell                                  (sidebar.js)
//   Load order in HTML: data → map → sidebar → … → builder. Builder loads
//   AFTER map and sidebar so its runtime calls resolve.
// =============================================================

// Soft legibility threshold for the human 2D projection. NOT a cap on what is
// constructible: detection is uncapped and gated only on whether an axis
// correspondence exists across the chosen faces (identical axis name OR an
// axis_mapping edge). Past this many face-columns the projection gets noisy
// for a human eye, so we nudge; the full N-way correspondence set is always
// available to the query layer without projection or ceiling.
var BUILDER_SOFT_OVERLAY_NUDGE = 3;

function builderState() {
  if (!state.builder) state.builder = { fcIds: [], axisKey: null, pickerQuery: '' };
  return state.builder;
}

// UX pass — while the builder is open, clicking tiles on the map toggles the
// classification in or out of the cross-section (same accumulate gesture as
// the map highlight). Called from the map's tile click handler.
function builderToggleFC(id) {
  var bs = builderState();
  var i = bs.fcIds.indexOf(id);
  if (i >= 0) bs.fcIds.splice(i, 1); else bs.fcIds.push(id);
  bs.axisKey = null;
  renderSidebarBuilder();
}

// ---- Cross-FC entity-value index (the explicit recurrence signal) ----------
// A value token is an "entity token" when it appears as a classification-axis
// value (or a cell axis_value) in two or more DIFFERENT classifications. Built
// once across all FCS and cached. Generic per-FC vocabulary (a status enum,
// a mechanism) is single-FC and so never creates a cross-link; genuine entity
// names ("primordial-black-hole", "sterile-neutrino-DM") are what surface.
var _builderEntityIndex = null;
function builderEntityIndex() {
  if (_builderEntityIndex) return _builderEntityIndex;
  var tokenToFcs = {};
  (FCS || []).forEach(function(fc) {
    var seen = {};
    (fc.classification_axes || []).forEach(function(ax) {
      (ax.values || []).forEach(function(v) { seen[String(v)] = true; });
    });
    (fc.cells || []).forEach(function(c) {
      Object.values(c.axis_values || {}).forEach(function(v) { seen[String(v)] = true; });
    });
    Object.keys(seen).forEach(function(tok) {
      (tokenToFcs[tok] = tokenToFcs[tok] || {})[fc.id] = true;
    });
  });
  var entity = {};
  Object.keys(tokenToFcs).forEach(function(tok) {
    if (Object.keys(tokenToFcs[tok]).length >= 2) entity[tok] = true;
  });
  _builderEntityIndex = entity;
  return entity;
}

// The entity tokens a cell carries (cross-FC value tokens on any of its axes).
function builderCellEntityTokens(cell) {
  var entity = builderEntityIndex();
  var out = [];
  Object.values(cell.axis_values || {}).forEach(function(v) {
    v = String(v);
    if (entity[v] && out.indexOf(v) < 0) out.push(v);
  });
  return out;
}

// ---- Anchoring & consequence predicates (the candidate cut) ----------------
function builderCellAnchored(cell) {
  if (!cell) return false;
  if (cell.realized_examples && cell.realized_examples.length) return true;
  if (cell.citations && cell.citations.length) return true;
  if (cell.forced_by && cell.forced_by.length) return true;
  return false;
}
function builderTouchesConsequence(cells) {
  var byTarget = (DATA && DATA.resolves_by_target) || {};
  for (var i = 0; i < cells.length; i++) {
    var c = cells[i]; if (!c) continue;
    if (c.quantitative_scale) return true;
    var cp = c.predictions || [];
    for (var j = 0; j < cp.length; j++) if (cp[j] && cp[j].quantitative_scale) return true;
    if (c.cell_id && byTarget[c.cell_id] && byTarget[c.cell_id].length) return true;
    if (c.forced_by && c.forced_by.length) return true;
  }
  return false;
}

// ---- Shared-axis discovery (substrate-decided combinability) ---------------
function builderAxisCorrespondences(idA, idB) {
  var fcA = FC_BY_ID[idA], fcB = FC_BY_ID[idB];
  if (!fcA || !fcB) return [];
  var out = [], namesB = {};
  (fcB.classification_axes || []).forEach(function(ax) { namesB[ax.name] = true; });
  (fcA.classification_axes || []).forEach(function(ax) {
    if (namesB[ax.name]) out.push({ kind: 'name', label: ax.name, axisA: ax.name, axisB: ax.name });
  });
  var byFc = (DATA && DATA.edges_by_fc) || {};
  var byId = (DATA && DATA.cross_class_edges_by_id) || {};
  (byFc[idA] || []).forEach(function(slim) {
    var other = (slim.from === idA) ? slim.to : slim.from;
    if (other !== idB) return;
    var full = byId[slim.id], am = full && full.axis_mapping;
    if (!am) return;
    (Array.isArray(am) ? am : [am]).forEach(function(m) {
      var aA = m.from_axis || m.axisA || m.from || m.a, aB = m.to_axis || m.axisB || m.to || m.b;
      if (!aA || !aB) return;
      out.push({ kind: 'mapping', edgeId: slim.id, label: aA + ' \u2194 ' + aB,
                 axisA: (slim.from === idA) ? aA : aB, axisB: (slim.from === idA) ? aB : aA });
    });
  });
  return out;
}
function builderSharedAxisKeys(fcIds) {
  if (fcIds.length < 2) return [];
  var base = fcIds[0], fcBase = FC_BY_ID[base];
  if (!fcBase) return [];
  var keys = [];
  (fcBase.classification_axes || []).forEach(function(ax) {
    var perFc = {}; perFc[base] = ax.name; var ok = true;
    for (var i = 1; i < fcIds.length; i++) {
      var corr = builderAxisCorrespondences(base, fcIds[i]).filter(function(c) { return c.axisA === ax.name; });
      if (!corr.length) { ok = false; break; }
      perFc[fcIds[i]] = corr[0].axisB;
    }
    if (ok) keys.push({ key: ax.name, label: ax.name, perFc: perFc });
  });
  return keys;
}

// ---- Lattice projection ----------------------------------------------------
function builderProject(fcIds, axisKeyObj) {
  var rowsSet = {}, occ = {};
  fcIds.forEach(function(fcId) {
    var fc = FC_BY_ID[fcId], axisName = axisKeyObj.perFc[fcId];
    (fc.cells || []).forEach(function(cell) {
      var v = (cell.axis_values || {})[axisName];
      if (v === undefined || v === null || v === '') return;
      v = String(v); rowsSet[v] = true;
      (occ[v] = occ[v] || {}); (occ[v][fcId] = occ[v][fcId] || []).push(cell);
    });
  });
  return { rows: Object.keys(rowsSet).sort(), fcIds: fcIds, occ: occ };
}

function builderEstablishedBetween(fcIds) {
  var byFc = (DATA && DATA.edges_by_fc) || {};
  for (var i = 0; i < fcIds.length; i++) {
    var list = byFc[fcIds[i]] || [];
    for (var k = 0; k < list.length; k++) {
      var e = list[k]; if (e.status !== 'established') continue;
      var other = (e.from === fcIds[i]) ? e.to : e.from;
      if (fcIds.indexOf(other) >= 0) return e;
    }
  }
  return null;
}

// Recurrences across the whole configuration, grouped by shared entity token.
// Each: { token, perFc:{fcId:[cells]}, tier:'established'|'recorded', edge }.
// Detected from the cross-FC entity index, NOT from prose — robust to stale
// prose refs. The chosen layout axis's own values are excluded so a shared
// status value can't masquerade as an entity recurrence.
function builderRecurrences(fcIds, axisKeyObj) {
  var established = builderEstablishedBetween(fcIds);
  var layoutValues = {};
  fcIds.forEach(function(fcId) {
    var an = axisKeyObj.perFc[fcId], fc = FC_BY_ID[fcId];
    (fc.classification_axes || []).forEach(function(ax) {
      if (ax.name === an) (ax.values || []).forEach(function(v) { layoutValues[String(v)] = true; });
    });
  });
  var byToken = {};
  fcIds.forEach(function(fcId) {
    (FC_BY_ID[fcId].cells || []).forEach(function(cell) {
      builderCellEntityTokens(cell).forEach(function(tok) {
        if (layoutValues[tok]) return;
        (byToken[tok] = byToken[tok] || {}); (byToken[tok][fcId] = byToken[tok][fcId] || []).push(cell);
      });
    });
  });
  var out = [];
  Object.keys(byToken).sort().forEach(function(tok) {
    var perFc = byToken[tok];
    if (Object.keys(perFc).length < 2) return; // must span >= 2 selected faces
    out.push({ token: tok, perFc: perFc, tier: established ? 'established' : 'recorded', edge: established });
  });
  return out;
}

// Stale prose cross-references: a cell names something matching a cell-id
// pattern that resolves to no cell in the loaded data. Surfaced as a gentle
// data-quality note (e.g. the cell-dm-PBH-LIGO-mass-excluded → ...-window-excluded
// typo), never relied on for detection.
function builderStaleRefs(fcIds) {
  var known = {};
  (FCS || []).forEach(function(fc) { (fc.cells || []).forEach(function(c) { known[c.cell_id] = true; }); });
  var notes = [];
  fcIds.forEach(function(fcId) {
    (FC_BY_ID[fcId].cells || []).forEach(function(cell) {
      var text = (cell.content || '') + ' ' + (cell.description || '');
      var m = text.match(/cell-[a-z0-9][a-z0-9-]+/g) || [];
      m.forEach(function(ref) {
        if (ref !== cell.cell_id && !known[ref] && notes.indexOf(ref) < 0) {
          notes.push(ref + ' (named by ' + cell.cell_id + ')');
        }
      });
    });
  });
  return notes;
}

// Same-row verdict: forbidden / candidate / raw-alignment / realized / empty.
// Recurrence (recorded/established) is handled separately, so a row earns
// 'candidate' only for co-location WITHOUT a shared entity token.
function builderRowVerdict(fcIds, occForRow, recurrenceTokensInRow) {
  var present = fcIds.filter(function(id) { return occForRow[id] && occForRow[id].length; });
  var cells = []; present.forEach(function(id) { cells = cells.concat(occForRow[id]); });
  if (!present.length) return { bucket: 'empty', cells: [], present: present };
  var forbidden = cells.some(function(c) {
    return c.constructive_status === 'forbidden-by-pattern' || c.structurally_excluded ||
           String(c.content || '').toLowerCase().indexOf('structurally-excluded') >= 0;
  });
  if (forbidden && present.length <= 1) return { bucket: 'forbidden', cells: cells, present: present };
  if (present.length >= 2 && !recurrenceTokensInRow.length) {
    if (cells.every(builderCellAnchored) && builderTouchesConsequence(cells))
      return { bucket: 'candidate', cells: cells, present: present };
    return { bucket: 'raw-alignment', cells: cells, present: present };
  }
  return { bucket: 'realized', cells: cells, present: present };
}

// ---- Render ----------------------------------------------------------------
var BUILDER_TIER_META = {
  'established': { cls: 'bld-est',  tag: 'recurrence (established)',
    desc: 'A cross-classification edge in the literature records this recurrence at the classification level.' },
  'recorded':    { cls: 'bld-rec',  tag: 'recurrence (recorded)',
    desc: 'The same entity is classified in both classifications — recorded at the cell level, with no forced classification-level edge (the mode-3 case).' },
  'candidate':   { cls: 'bld-cand', tag: 'candidate correspondence',
    desc: 'Anchored on all sides and touching a checkable consequence, but recorded nowhere. The organization permits it; whether it is real structure or coincidence is yours to evaluate \u2014 no confidence is asserted.' },
  'raw-alignment': { cls: 'bld-raw', tag: 'co-location',
    desc: 'Lands at the same position but is not anchored on all sides or touches no checkable consequence.' },
  'forbidden':   { cls: 'bld-forb', tag: 'structural exclusion',
    desc: 'Forbidden by the classification\u2019s own constructive pattern.' },
  'conjectured': { cls: 'bld-conj', tag: 'conjectured by the pattern, unrealized',
    desc: 'The configuration\u2019s structure implies a position here and nothing fills it. Transient \u2014 not written to the data.' },
};

function renderSidebarBuilder() {
  var inner = document.getElementById('sidebar-inner'); if (!inner) return;
  var bs = builderState();

  var intro = '<div class="bld-intro">Lay two or more classifications along a shared axis — pick them below, or simply click tiles on the map — and read off what the combined structure implies. The same entity recurring across classifications, and positions the structure implies but nothing fills, show up as a consequence of the layout. The recognition is yours; the map supplies the organized ground.</div>';

  var bySector = {};
  FCS.forEach(function(fc) { (bySector[fc.sector] = bySector[fc.sector] || []).push(fc); });
  var q = (bs.pickerQuery || '').toLowerCase();
  var picker = Object.keys(bySector).sort().map(function(sec) {
    var chips = bySector[sec].filter(function(fc) {
      return !q || (fc.label + ' ' + fc.symbol).toLowerCase().indexOf(q) >= 0;
    }).map(function(fc) {
      var on = bs.fcIds.indexOf(fc.id) >= 0;
      return '<button class="bld-fc-chip' + (on ? ' on' : '') + '" data-bld-fc="' + esc(fc.id) + '" type="button"><span class="bld-fc-sym">' + esc(fc.symbol) + '</span> ' + esc(fc.label) + '</button>';
    }).join('');
    return chips ? '<div class="bld-sector"><div class="bld-sector-name">' + esc(sec) + '</div>' + chips + '</div>' : '';
  }).join('');

  var selected = bs.fcIds.map(function(id) {
    var fc = FC_BY_ID[id];
    return '<span class="bld-selected" data-bld-fc="' + esc(id) + '">' + esc(fc ? fc.label : id) + ' <span class="bld-x">\u00d7</span></span>';
  }).join('') || '<span class="bld-none">none yet \u2014 pick two or more above</span>';

  var keys = builderSharedAxisKeys(bs.fcIds), axisHtml = '';
  if (bs.fcIds.length >= 2) {
    if (!keys.length) {
      axisHtml = '<div class="bld-noaxis">These classifications share no axis \u2014 by name or by an axis correspondence the map records. Nothing combinable here; try a different face. (The map decides what is combinable, not a face count.)</div>';
    } else {
      if (!bs.axisKey || !keys.some(function(k) { return k.key === bs.axisKey; })) bs.axisKey = keys[0].key;
      axisHtml = '<div class="bld-axis-row"><span class="bld-axis-label">shared axis:</span>' +
        keys.map(function(k) { return '<button class="bld-axis-chip' + (k.key === bs.axisKey ? ' on' : '') + '" data-bld-axis="' + esc(k.key) + '" type="button">' + esc(k.label) + '</button>'; }).join('') + '</div>';
    }
  }

  var recurHtml = '', latticeHtml = '', nudge = '', staleHtml = '';
  if (bs.fcIds.length >= 2 && keys.length && bs.axisKey) {
    var axisObj = keys.filter(function(k) { return k.key === bs.axisKey; })[0];
    var proj = builderProject(bs.fcIds, axisObj);
    var recurrences = builderRecurrences(bs.fcIds, axisObj);

    if (bs.fcIds.length > BUILDER_SOFT_OVERLAY_NUDGE) {
      nudge = '<div class="bld-nudge">' + bs.fcIds.length + ' faces laid out at once \u2014 the 2D projection gets hard to read past ' + BUILDER_SOFT_OVERLAY_NUDGE + '. The full correspondence set across all faces is available to the query layer without this projection.</div>';
    }

    // Which entity tokens land in each row (for marking + row-verdict gating)
    var rowTokens = {};
    proj.rows.forEach(function(rv) {
      var toks = {};
      bs.fcIds.forEach(function(id) {
        (proj.occ[rv] && proj.occ[rv][id] || []).forEach(function(c) {
          builderCellEntityTokens(c).forEach(function(t) {
            if (recurrences.some(function(r) { return r.token === t; })) toks[t] = true;
          });
        });
      });
      rowTokens[rv] = Object.keys(toks);
    });

    // Recurrence summary — the clearest surface for the mode-3 read
    if (recurrences.length) {
      recurHtml = '<div class="bld-recur"><div class="bld-section-h">recurrences across these classifications</div>' +
        recurrences.map(function(r) {
          var m = BUILDER_TIER_META[r.tier];
          var faces = Object.keys(r.perFc).map(function(fcId) {
            var fc = FC_BY_ID[fcId];
            var cellList = r.perFc[fcId].map(function(c) {
              var status = (c.axis_values || {})[axisObj.perFc[fcId]] || '';
              return '<span class="bld-recur-cell" data-fc="' + esc(fcId) + '" data-cell="' + esc(c.cell_id) + '" title="' + esc(c.content || c.cell_id) + '">' + esc(c.cell_id) + (status ? ' <span class="bld-recur-status">' + esc(String(status)) + '</span>' : '') + '</span>';
            }).join('');
            return '<div class="bld-recur-face"><span class="bld-recur-fc">' + esc(fc.label) + '</span>' + cellList + '</div>';
          }).join('');
          var edgeNote = (r.tier === 'established' && r.edge)
            ? '<div class="bld-recur-edge">via cross-classification edge ' + esc(r.edge.id) + ' (status: established)</div>' : '';
          return '<div class="bld-recur-item"><div class="bld-recur-head"><span class="bld-recur-token">' + esc(r.token) + '</span><span class="bld-chip ' + m.cls + '">' + esc(m.tag) + '</span></div>' + edgeNote + faces + '</div>';
        }).join('') + '</div>';
    } else {
      recurHtml = '<div class="bld-recur"><div class="bld-section-h">recurrences across these classifications</div><div class="bld-none">no shared entity recurs across these faces along this axis</div></div>';
    }

    // Lattice
    var head = '<th class="bld-rowhead">' + esc(bs.axisKey) + '</th>' + bs.fcIds.map(function(id) {
      var fc = FC_BY_ID[id]; return '<th class="bld-colhead" title="' + esc(fc.label) + '">' + esc(fc.symbol) + '</th>';
    }).join('');
    var body = proj.rows.map(function(rv) {
      var occRow = proj.occ[rv] || {};
      var verdict = builderRowVerdict(bs.fcIds, occRow, rowTokens[rv]);
      var cols = bs.fcIds.map(function(id) {
        var occ = occRow[id] || [];
        if (!occ.length) return '<td class="bld-pos bld-empty">\u00b7</td>';
        var html = occ.map(function(c) {
          var sw = (typeof cellSwatchClass === 'function') ? cellSwatchClass(c, FC_BY_ID[id]) : '';
          var recurMark = rowTokens[rv].some(function(t) { return builderCellEntityTokens(c).indexOf(t) >= 0; }) ? ' <span class="bld-recur-flag" title="recurs across the selected classifications">\u21c4</span>' : '';
          return '<span class="bld-occ swatch-' + esc(sw) + '" data-fc="' + esc(id) + '" data-cell="' + esc(c.cell_id) + '" title="' + esc(c.content || c.cell_id) + '">' + esc(((c.realized_examples && c.realized_examples[0]) || c.content || c.cell_id).slice(0, 38)) + recurMark + '</span>';
        }).join('');
        return '<td class="bld-pos">' + html + '</td>';
      }).join('');
      var m = BUILDER_TIER_META[verdict.bucket];
      var tag = (m && (verdict.bucket === 'candidate' || verdict.bucket === 'raw-alignment' || verdict.bucket === 'forbidden'))
        ? '<div class="bld-verdict-tag ' + m.cls + '" title="' + esc(m.desc) + '">' + esc(m.tag) + '</div>' : '';
      return '<tr class="bld-verdict-' + verdict.bucket + '"><th class="bld-rowval">' + esc(rv) + tag + '</th>' + cols + '</tr>';
    }).join('');
    latticeHtml = '<div class="bld-lattice-wrap"><table class="bld-lattice"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';

    var stale = builderStaleRefs(bs.fcIds);
    if (stale.length) {
      staleHtml = '<div class="bld-stale"><strong>data-quality note:</strong> a cell names a cross-reference that resolves to no cell in the current data \u2014 ' + stale.map(esc).join('; ') + '. Recurrence detection does not rely on prose references, so this does not affect what is surfaced above; flagged for a docs cleanup.</div>';
    }
  }

  var legend = '<div class="bld-legend"><div class="bld-legend-title">how to read this</div>' +
    ['established', 'recorded', 'candidate', 'raw-alignment', 'conjectured', 'forbidden'].map(function(b) {
      var m = BUILDER_TIER_META[b];
      return '<div class="bld-legend-row"><span class="bld-chip ' + m.cls + '">' + esc(m.tag) + '</span><span class="bld-legend-desc">' + esc(m.desc) + '</span></div>';
    }).join('') + '</div>';

  var actions = '<div class="bld-actions"><button class="bld-example" type="button" id="bld-load-example">load the worked example (dark matter \u00d7 compact objects)</button>' +
    (bs.fcIds.length ? '<button class="bld-reset" type="button" id="bld-reset">clear</button>' : '') + '</div>';

  inner.innerHTML = '<div class="sidebar-card bld-card">' +
    '<div class="dc-crumbs"><span class="crumb-current">Build a cross-section</span></div>' + intro +
    '<div class="bld-section"><div class="bld-section-h">classifications</div>' +
    '<input class="bld-search" id="bld-picker-search" placeholder="filter classifications\u2026" value="' + esc(bs.pickerQuery || '') + '">' +
    '<div class="bld-picker">' + picker + '</div></div>' +
    '<div class="bld-section"><div class="bld-section-h">selected faces</div><div class="bld-selected-row">' + selected + '</div>' + axisHtml + '</div>' +
    nudge + recurHtml + latticeHtml + staleHtml + legend + actions + '</div>';

  wireBuilderPanel();
  // UX pass — the builder's selected classifications light up on the map
  // (same highlight/dim layer as tile clicks). setTileSpotlight no-ops when
  // the set is unchanged, so picker keystrokes don't re-render the map.
  if (typeof setTileSpotlight === 'function') setTileSpotlight(builderState().fcIds);
}

function wireBuilderPanel() {
  var bs = builderState();
  var search = document.getElementById('bld-picker-search');
  if (search) search.addEventListener('input', function() {
    bs.pickerQuery = search.value; renderSidebarBuilder();
    var s2 = document.getElementById('bld-picker-search');
    if (s2) { s2.focus(); s2.setSelectionRange(s2.value.length, s2.value.length); }
  });
  document.querySelectorAll('[data-bld-fc]').forEach(function(el) {
    el.addEventListener('click', function() {
      var id = el.getAttribute('data-bld-fc'), i = bs.fcIds.indexOf(id);
      if (i >= 0) bs.fcIds.splice(i, 1); else bs.fcIds.push(id);
      bs.axisKey = null; renderSidebarBuilder();
    });
  });
  document.querySelectorAll('[data-bld-axis]').forEach(function(el) {
    el.addEventListener('click', function() { bs.axisKey = el.getAttribute('data-bld-axis'); renderSidebarBuilder(); });
  });
  document.querySelectorAll('.bld-occ[data-cell], .bld-recur-cell[data-cell]').forEach(function(el) {
    el.addEventListener('click', function() {
      var fcId = el.getAttribute('data-fc'), cellId = el.getAttribute('data-cell');
      if (typeof selectCell === 'function' && FC_BY_ID[fcId]) selectCell(fcId, cellId);
      else if (typeof selectFC === 'function' && FC_BY_ID[fcId]) selectFC(fcId);
    });
  });
  var ex = document.getElementById('bld-load-example');
  if (ex) ex.addEventListener('click', function() {
    bs.fcIds = ['dark-matter-candidates', 'compact-astrophysical-objects'].filter(function(id) { return FC_BY_ID[id]; });
    bs.axisKey = 'observational-status'; renderSidebarBuilder();
  });
  var rst = document.getElementById('bld-reset');
  if (rst) rst.addEventListener('click', function() { bs.fcIds = []; bs.axisKey = null; bs.pickerQuery = ''; renderSidebarBuilder(); });
}
