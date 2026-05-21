/* =====================================================================
 * Map of Physics — MCP endpoint
 * Phase B / v17 schema / v40 data / server version 3.1.0
 *
 * ABOUT
 * -----
 * Cloudflare Worker serving the Map of Physics dataset over the Model
 * Context Protocol (MCP) via JSON-RPC 2.0. Deployed at:
 *   https://map-of-physics.eddie-8e5.workers.dev
 *
 * The dataset (`data/Map_v34_consolidated.json`) is embedded below as a
 * JS object literal (`const DATA = {...};`). Cloudflare Workers cannot
 * read files from a repo at runtime, so the data must be bundled into
 * the worker source. Module-level code runs once per worker isolate;
 * tool handlers read from in-memory indexes built at load time.
 *
 * Tools (29):
 *   v16 carry-over (28): server_info, get_node, get_classification,
 *     get_experimental_program, glossary_lookup, list_nodes,
 *     list_classifications, list_experimental_programs, search,
 *     neighbors, paths, find_classification_chain, find_cross_classification,
 *     find_uses_classification, find_produces_classification, find_bears_on,
 *     find_targeting, find_targets_of_program, find_hosting,
 *     find_predictions, find_status_distribution, find_structurally_excluded,
 *     find_forced_cells, get_forcing_constraint, get_axis_mapping,
 *     find_cells, compare_classifications, find_loose_ends
 *   Phase B additions:
 *     - find_signal_implications (NEW): surfaces if_real_implies entries
 *       on open-frontier and totality-approach carriers.
 *     - find_loose_ends EXTENDED: surfaces if_real_implies entries
 *       alongside classical loose_ends; toggle via includeIfRealImplies.
 *
 * BUILD PROCESS
 * -------------
 * The worker is built by injecting the v40 data file into a skeleton:
 *
 *   1. Fetch the canonical data from
 *      /data/Map_v34_consolidated.json in the repo.
 *   2. Run `python3 build_worker.py` (see /mcp/build_worker.py).
 *      The script replaces the data-injection marker comment in
 *      /mcp/worker_skeleton.js with `const DATA = {...JSON...};`.
 *      U+2028 / U+2029 are escaped (JSON is a valid JS object literal
 *      otherwise).
 *   3. Output: this file (/mcp/worker.js, ~1.5 MB, ~23k lines).
 *
 * To deploy:
 *   - Per PROJECT_INFRASTRUCTURE.md §3, paste this file into the
 *     Cloudflare dashboard editor for the worker named `map-of-physics`
 *     and click "Save and Deploy". Verify by GET-ing the worker URL —
 *     the banner should match the COUNTS object below.
 *
 * To rebuild (in a new Claude session):
 *   - Read /mcp/worker_skeleton.js, /mcp/build_worker.py, and the
 *     methodology handoff (/methodology/PREDICTIVE_LAYER_PHASE_B_HANDOFF.md
 *     for Phase B, or the active handoff for whatever phase is current).
 *   - Make changes to the skeleton, not this file. This file is a
 *     build artifact and gets overwritten on every rebuild.
 *   - Smoke-test before deploying. The previous build's test was
 *     /home/claude/work/smoke_test.mjs (40 tests, exercises every
 *     tool handler via worker.fetch() with mock Request objects).
 *
 * SPEC COMPLIANCE NOTES
 * ---------------------
 * - v16 spec §"When absent" (constructive_status): an absent field is
 *   NOT a synonym for `indeterminate`. find_forced_cells and find_cells
 *   filters do not match cells with no field; server_info reports
 *   `constructive_status_absent_cells` separately so cell accounting
 *   is transparent (realized + forbidden + conjectured + indeterminate
 *   + absent = total_cells).
 * - v17 spec §3 conditional rules on `if_real_implies` `target` shape
 *   per `kind` are enforced by the schema (Map_v17_schema.json) and
 *   the validator (scripts/validate.py Rules 24–26); this worker is
 *   read-only and does not re-enforce them.
 *
 * VERSION HISTORY
 * ---------------
 *   3.1.0 — Phase B / v17. Adds find_signal_implications; extends
 *           find_loose_ends with if_real_implies surfacing; adds
 *           constructive_status_absent_cells count to server_info;
 *           fixes shallow-search bug in `search` tool.
 *   3.0.0 — Phase A / v16. (Previous live worker; source was not
 *           committed to the repo.)
 *   2.x   — v15.3 baseline. (Pre-Predictive-Layer.)
 * ===================================================================== */

// __DATA_INJECTION_POINT__

// ---------- indexes ----------
const NODES = DATA.nodes || [];
const EDGES = DATA.edges || [];
const FAMILIES = DATA.families || [];
const GLOSSARY_BLOCK = DATA.glossary || {};
const GLOSSARY_ENTRIES = GLOSSARY_BLOCK.entries || [];
const GLOSSARY_CATEGORIES = GLOSSARY_BLOCK.categories || [];

const NODES_BY_ID = new Map();
const NODES_BY_TYPE = new Map();
for (const n of NODES) {
  if (n && n.id) NODES_BY_ID.set(n.id, n);
  const t = n && n.type;
  if (t) {
    if (!NODES_BY_TYPE.has(t)) NODES_BY_TYPE.set(t, []);
    NODES_BY_TYPE.get(t).push(n);
  }
}

const EDGES_BY_ID = new Map();
const EDGES_BY_FROM = new Map();
const EDGES_BY_TO = new Map();
const EDGES_BY_TYPE = new Map();
for (const e of EDGES) {
  if (e && e.id) EDGES_BY_ID.set(e.id, e);
  if (e && e.from) {
    if (!EDGES_BY_FROM.has(e.from)) EDGES_BY_FROM.set(e.from, []);
    EDGES_BY_FROM.get(e.from).push(e);
  }
  if (e && e.to) {
    if (!EDGES_BY_TO.has(e.to)) EDGES_BY_TO.set(e.to, []);
    EDGES_BY_TO.get(e.to).push(e);
  }
  if (e && e.type) {
    if (!EDGES_BY_TYPE.has(e.type)) EDGES_BY_TYPE.set(e.type, []);
    EDGES_BY_TYPE.get(e.type).push(e);
  }
}

// cells live inside formal-classification nodes; build a flat index
const CELLS_BY_ID = new Map(); // cell_id -> {fc_id, cell}
for (const n of NODES) {
  if (n && n.type === 'formal-classification' && Array.isArray(n.cells)) {
    for (const c of n.cells) {
      if (c && c.cell_id) CELLS_BY_ID.set(c.cell_id, { fc_id: n.id, cell: c });
    }
  }
}

// glossary indexes (term + aliases, case-insensitive)
const GLOSSARY_BY_KEY = new Map();
for (const g of GLOSSARY_ENTRIES) {
  if (!g) continue;
  if (g.term) GLOSSARY_BY_KEY.set(g.term.toLowerCase(), g);
  if (Array.isArray(g.aliases)) {
    for (const a of g.aliases) {
      if (a) GLOSSARY_BY_KEY.set(String(a).toLowerCase(), g);
    }
  }
}

// ---------- counts (for server_info + banner) ----------
function computeCounts() {
  let realized = 0, forbidden = 0, conjectured = 0, indeterminate = 0, absent = 0;
  let total_cells = 0;
  for (const n of NODES) {
    if (n && n.type === 'formal-classification' && Array.isArray(n.cells)) {
      for (const c of n.cells) {
        total_cells++;
        const cs = c && c.constructive_status;
        if (cs === 'realized') realized++;
        else if (cs === 'forbidden-by-pattern') forbidden++;
        else if (cs === 'conjectured-by-pattern') conjectured++;
        else if (cs === 'indeterminate') indeterminate++;
        else absent++;
      }
    }
  }
  const fcs = (NODES_BY_TYPE.get('formal-classification') || []).length;
  const eps = (NODES_BY_TYPE.get('experimental-program') || []).length;
  const ofs = (NODES_BY_TYPE.get('open-frontier') || []).length;
  const tas = (NODES_BY_TYPE.get('totality-approach') || []).length;
  const arches = (NODES_BY_TYPE.get('architecture') || []).length;
  const regimes = (NODES_BY_TYPE.get('regime-content') || []).length;
  let axis_mapping_edges = 0;
  for (const e of EDGES) if (e && Array.isArray(e.axis_mapping) && e.axis_mapping.length) axis_mapping_edges++;

  // v17 / Phase B counts
  let iri_carriers = 0;
  let iri_resolutions = 0;
  let iri_implications = 0;
  for (const n of NODES) {
    const arr = n && n.if_real_implies;
    if (Array.isArray(arr) && arr.length) {
      iri_carriers++;
      iri_resolutions += arr.length;
      for (const r of arr) {
        if (r && Array.isArray(r.implications)) iri_implications += r.implications.length;
      }
    }
  }
  return {
    nodes: NODES.length,
    edges: EDGES.length,
    formal_classifications: fcs,
    experimental_programs: eps,
    open_frontiers: ofs,
    totality_approaches: tas,
    architectures: arches,
    regime_contents: regimes,
    total_cells,
    glossary_entries: GLOSSARY_ENTRIES.length,
    realized_cells: realized,
    forbidden_by_pattern_cells: forbidden,
    conjectured_by_pattern_cells: conjectured,
    indeterminate_cells: indeterminate,
    constructive_status_absent_cells: absent,
    axis_mapping_edges,
    if_real_implies_carriers: iri_carriers,
    if_real_implies_resolutions: iri_resolutions,
    if_real_implies_implications: iri_implications,
  };
}
const COUNTS = computeCounts();

// ---------- helpers ----------
function ciIncludes(haystack, needle) {
  if (haystack == null || needle == null) return false;
  return String(haystack).toLowerCase().includes(String(needle).toLowerCase());
}
function asArray(x) {
  if (x == null) return [];
  return Array.isArray(x) ? x : [x];
}
function uniq(arr) { return Array.from(new Set(arr)); }
function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj && k in obj) out[k] = obj[k];
  return out;
}

// ============================================================
// TOOLS
// ============================================================

function tool_server_info() {
  return {
    server: 'map-of-physics',
    version: '3.1.0',
    schema_version: 'v17',
    data_version: 'v40',
    dataset_version: (DATA._meta && DATA._meta._file_role) || 'v34 consolidated',
    phase: 'Predictive Layer Phase B (if_real_implies)',
    counts: COUNTS,
    tool_count: TOOL_NAMES.length,
  };
}

function tool_get_node({ id } = {}) {
  if (!id) throw new Error("get_node: 'id' is required.");
  const n = NODES_BY_ID.get(id);
  if (!n) return null;
  return n;
}

function tool_get_classification({ id } = {}) {
  if (!id) throw new Error("get_classification: 'id' is required.");
  const n = NODES_BY_ID.get(id);
  if (!n) return null;
  if (n.type !== 'formal-classification') {
    return { error: `Node ${id} is type '${n.type}', not formal-classification.` };
  }
  return n;
}

function tool_get_experimental_program({ id } = {}) {
  if (!id) throw new Error("get_experimental_program: 'id' is required.");
  const n = NODES_BY_ID.get(id);
  if (!n) return null;
  if (n.type !== 'experimental-program') {
    return { error: `Node ${id} is type '${n.type}', not experimental-program.` };
  }
  return n;
}

function tool_glossary_lookup({ term } = {}) {
  if (!term) throw new Error("glossary_lookup: 'term' is required.");
  const k = String(term).toLowerCase();
  return GLOSSARY_BY_KEY.get(k) || null;
}

function tool_list_nodes({ type, types, stratum, sector, contentSearch, limit } = {}) {
  let typeFilter = null;
  if (types && Array.isArray(types) && types.length) typeFilter = new Set(types);
  else if (type) typeFilter = new Set([type]);

  const out = [];
  for (const n of NODES) {
    if (typeFilter && !typeFilter.has(n.type)) continue;
    if (stratum != null && String(n.stratum) !== String(stratum)) continue;
    if (sector && n.sector !== sector) continue;
    if (contentSearch) {
      const blob = JSON.stringify({
        id: n.id, label: n.label, full_name: n.full_name,
        description: n.description, subtype: n.subtype,
      });
      if (!ciIncludes(blob, contentSearch)) continue;
    }
    out.push({
      id: n.id,
      type: n.type,
      label: n.label,
      full_name: n.full_name,
      subtype: n.subtype,
      stratum: n.stratum,
      sector: n.sector,
    });
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_list_classifications({ closure_status, subtype, contentSearch, limit } = {}) {
  const out = [];
  for (const n of (NODES_BY_TYPE.get('formal-classification') || [])) {
    if (closure_status && n.closure_status !== closure_status) continue;
    if (subtype && n.subtype !== subtype) continue;
    if (contentSearch) {
      const blob = JSON.stringify({
        id: n.id, label: n.label, full_name: n.full_name,
        description: n.description, classification_axes: n.classification_axes,
      });
      if (!ciIncludes(blob, contentSearch)) continue;
    }
    const cells = Array.isArray(n.cells) ? n.cells : [];
    out.push({
      id: n.id,
      label: n.label,
      full_name: n.full_name,
      subtype: n.subtype,
      closure_status: n.closure_status,
      domain_of_applicability: n.domain_of_applicability,
      cell_count: cells.length,
      prediction_count: Array.isArray(n.predictive_yield) ? n.predictive_yield.length : 0,
      axes: (n.classification_axes || []).map(a => a && a.name).filter(Boolean),
    });
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_list_experimental_programs({ subtype, contentSearch, limit } = {}) {
  const out = [];
  for (const n of (NODES_BY_TYPE.get('experimental-program') || [])) {
    if (subtype && n.subtype !== subtype) continue;
    if (contentSearch) {
      const blob = JSON.stringify({
        id: n.id, label: n.label, full_name: n.full_name, description: n.description,
      });
      if (!ciIncludes(blob, contentSearch)) continue;
    }
    out.push({
      id: n.id,
      label: n.label,
      full_name: n.full_name,
      subtype: n.subtype,
      operational_period: n.operational_period,
      produced_classifications: n.produced_classifications || [],
      host_institutions: n.host_institutions || [],
    });
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_search({ query, limit } = {}) {
  if (!query) throw new Error("search: 'query' is required.");
  const q = String(query).toLowerCase();
  const out = [];

  // Scan every node's full payload (substring across description, axes, cells,
  // predictive_yield, citations, etc.) — promotes the hit only once per node
  // to avoid duplicate entries from sub-structure matches.
  for (const n of NODES) {
    const blob = JSON.stringify(n).toLowerCase();
    if (blob.includes(q)) {
      out.push({
        kind: 'node',
        id: n.id,
        type: n.type,
        label: n.label,
        snippet: (n.description || n.full_name || n.label || '').slice(0, 240),
      });
    }
    // also surface loose_ends as their own kind for sessions that want them split out
    const eqs = n && n.equations && n.equations.native && Array.isArray(n.equations.native.equations)
      ? n.equations.native.equations : [];
    for (const eq of eqs) {
      const les = Array.isArray(eq.loose_ends) ? eq.loose_ends : [];
      for (const le of les) {
        const leBlob = JSON.stringify(le).toLowerCase();
        if (leBlob.includes(q)) {
          out.push({
            kind: 'loose_end',
            node_id: n.id,
            node_label: n.label,
            description: le.description,
            structural_reason_category: le.structural_reason_category,
            scope: le.scope,
          });
        }
      }
    }
  }
  // glossary
  for (const g of GLOSSARY_ENTRIES) {
    const blob = [g.term, ...(g.aliases || []), g.definition, g.why_it_matters]
      .filter(Boolean).join('\n').toLowerCase();
    if (blob.includes(q)) {
      out.push({
        kind: 'glossary',
        term: g.term,
        category: g.category,
        snippet: (g.definition || '').slice(0, 240),
      });
    }
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_neighbors({ id, edge_type, direction } = {}) {
  if (!id) throw new Error("neighbors: 'id' is required.");
  const outgoing = (EDGES_BY_FROM.get(id) || []);
  const incoming = (EDGES_BY_TO.get(id) || []);
  const dir = direction || 'both';
  const filterType = (e) => !edge_type || e.type === edge_type;
  const result = {};
  if (dir === 'outgoing' || dir === 'both') {
    result.outgoing = outgoing.filter(filterType).map(e => ({
      edge_id: e.id, type: e.type, subtype: e.subtype, to: e.to,
      status: e.status, nature: e.nature, description: e.description,
    }));
  }
  if (dir === 'incoming' || dir === 'both') {
    result.incoming = incoming.filter(filterType).map(e => ({
      edge_id: e.id, type: e.type, subtype: e.subtype, from: e.from,
      status: e.status, nature: e.nature, description: e.description,
    }));
  }
  return result;
}

function bfsPaths(from, to, maxLen, edgeFilter) {
  if (!NODES_BY_ID.has(from) || !NODES_BY_ID.has(to)) return [];
  if (from === to) return [{ path: [from], edges: [] }];
  const results = [];
  // BFS up to maxLen edges
  const queue = [{ node: from, path: [from], edges: [] }];
  const seenAtDepth = new Map();
  seenAtDepth.set(from, 0);
  while (queue.length) {
    const { node, path, edges } = queue.shift();
    if (edges.length >= maxLen) continue;
    const outgoing = (EDGES_BY_FROM.get(node) || []);
    const incoming = (EDGES_BY_TO.get(node) || []);
    const all = [...outgoing.map(e => ({ e, other: e.to, dir: 'out' })),
                 ...incoming.map(e => ({ e, other: e.from, dir: 'in' }))];
    for (const { e, other, dir } of all) {
      if (edgeFilter && !edgeFilter(e)) continue;
      if (path.includes(other)) continue;
      const newPath = [...path, other];
      const newEdges = [...edges, { edge_id: e.id, type: e.type, subtype: e.subtype, direction: dir }];
      if (other === to) {
        results.push({ path: newPath, edges: newEdges });
        continue;
      }
      const prevDepth = seenAtDepth.get(other);
      if (prevDepth == null || newPath.length - 1 < prevDepth + 2) {
        if (prevDepth == null) seenAtDepth.set(other, newPath.length - 1);
        queue.push({ node: other, path: newPath, edges: newEdges });
      }
    }
  }
  return results;
}

function tool_paths({ from, to, maxLen } = {}) {
  if (!from || !to) throw new Error("paths: 'from' and 'to' are required.");
  const ml = Math.max(1, Math.min(6, maxLen || 4));
  return bfsPaths(from, to, ml, null);
}

function tool_find_classification_chain({ from, to, maxLen } = {}) {
  if (!from || !to) throw new Error("find_classification_chain: 'from' and 'to' are required.");
  const fromN = NODES_BY_ID.get(from);
  const toN = NODES_BY_ID.get(to);
  if (!fromN || fromN.type !== 'formal-classification') {
    return { error: `from '${from}' is not a formal-classification.` };
  }
  if (!toN || toN.type !== 'formal-classification') {
    return { error: `to '${to}' is not a formal-classification.` };
  }
  const ml = Math.max(1, Math.min(6, maxLen || 4));
  return bfsPaths(from, to, ml, (e) => e.type === 'cross-classification');
}

function _xcStatus(e) {
  // status may be 'established' / 'partial' / 'conjectured' / 'aspired' / 'contested' / 'impossible'
  return e.status || (e.bidirectional ? 'unknown' : 'unknown');
}

function tool_find_cross_classification({ from, to, subtype, status, targeted_by, limit } = {}) {
  const out = [];
  const statusSet = status ? new Set(asArray(status)) : null;
  const subtypeSet = subtype ? new Set(asArray(subtype)) : null;
  for (const e of (EDGES_BY_TYPE.get('cross-classification') || [])) {
    if (from && e.from !== from) continue;
    if (to && e.to !== to) continue;
    if (subtypeSet && !subtypeSet.has(e.subtype)) continue;
    if (statusSet && !statusSet.has(_xcStatus(e))) continue;
    if (targeted_by) {
      const tgs = asArray(e.targeted_by);
      if (!tgs.includes(targeted_by)) continue;
    }
    out.push(e);
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_uses_classification({ architecture, classification, limit } = {}) {
  const out = [];
  for (const e of (EDGES_BY_TYPE.get('uses-classification') || [])) {
    if (architecture && e.from !== architecture) continue;
    if (classification && e.to !== classification) continue;
    out.push(e);
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_produces_classification({ producer, classification, limit } = {}) {
  const out = [];
  for (const e of (EDGES_BY_TYPE.get('produces-classification') || [])) {
    if (producer && e.from !== producer) continue;
    if (classification && e.to !== classification) continue;
    out.push(e);
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_bears_on({ classification, frontier, nature, limit } = {}) {
  const out = [];
  for (const e of (EDGES_BY_TYPE.get('bears-on') || [])) {
    if (classification && e.from !== classification) continue;
    if (frontier && e.to !== frontier) continue;
    if (nature && e.nature !== nature) continue;
    out.push(e);
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_targeting({ frontier_id } = {}) {
  // Which candidate-foundational programs target this open-frontier (via candidate-targeting edges)
  // and which cross-classification edges name it in targeted_by.
  if (!frontier_id) throw new Error("find_targeting: 'frontier_id' is required.");
  const ct_edges = (EDGES_BY_TYPE.get('candidate-targeting') || [])
    .filter(e => e.to === frontier_id);
  const xc_edges = (EDGES_BY_TYPE.get('cross-classification') || [])
    .filter(e => Array.isArray(e.targeted_by) && e.targeted_by.includes(frontier_id));
  return {
    frontier_id,
    candidate_targeting_edges: ct_edges,
    cross_classification_edges_targeted_by: xc_edges,
  };
}

function tool_find_targets_of_program({ program_id } = {}) {
  if (!program_id) throw new Error("find_targets_of_program: 'program_id' is required.");
  // 1) candidate_targeting frontiers (edges from program → frontier)
  const ct_edges = (EDGES_BY_TYPE.get('candidate-targeting') || [])
    .filter(e => e.from === program_id);
  // 2) cross-classification edges with targeted_by containing program_id
  const xc_edges = (EDGES_BY_TYPE.get('cross-classification') || [])
    .filter(e => Array.isArray(e.targeted_by) && e.targeted_by.includes(program_id));
  return {
    program_id,
    candidate_targeting_frontiers: ct_edges.map(e => ({
      frontier: e.to,
      edge_id: e.id,
      discharge_status: e.discharge_status,
      annotation: e.annotation,
    })),
    cross_classification_targets: xc_edges,
  };
}

function tool_find_hosting({ program_id } = {}) {
  // Which architectures or frontiers this candidate-foundational program claims to host or target.
  if (!program_id) throw new Error("find_hosting: 'program_id' is required.");
  const hosting_edges = (EDGES_BY_TYPE.get('candidate-hosting') || [])
    .filter(e => e.from === program_id);
  const targeting_edges = (EDGES_BY_TYPE.get('candidate-targeting') || [])
    .filter(e => e.from === program_id);
  return {
    program_id,
    hosting_edges,
    targeting_edges,
  };
}

function tool_find_predictions({ status, fc_id, contentSearch, limit } = {}) {
  const out = [];
  const statusSet = status ? new Set(asArray(status)) : null;
  for (const n of (NODES_BY_TYPE.get('formal-classification') || [])) {
    if (fc_id && n.id !== fc_id) continue;
    const py = Array.isArray(n.predictive_yield) ? n.predictive_yield : [];
    for (const p of py) {
      if (statusSet && !statusSet.has(p.status)) continue;
      if (contentSearch && !ciIncludes(JSON.stringify(p), contentSearch)) continue;
      out.push({ fc_id: n.id, fc_label: n.label, ...p });
    }
    // also surface cell-scoped predictions (e.g., on su5-gut-rep-content)
    const cells = Array.isArray(n.cells) ? n.cells : [];
    for (const c of cells) {
      const cp = Array.isArray(c.predictive_yield) ? c.predictive_yield : [];
      for (const p of cp) {
        if (statusSet && !statusSet.has(p.status)) continue;
        if (contentSearch && !ciIncludes(JSON.stringify(p), contentSearch)) continue;
        out.push({ fc_id: n.id, fc_label: n.label, cell_id: c.cell_id, ...p });
      }
    }
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_status_distribution() {
  // Distribution of cross-classification edges by status, plus per-subtype breakdown
  const byStatus = {};
  const bySubtype = {};
  const bySubtypeStatus = {};
  for (const e of (EDGES_BY_TYPE.get('cross-classification') || [])) {
    const st = _xcStatus(e);
    byStatus[st] = (byStatus[st] || 0) + 1;
    const sub = e.subtype || 'unknown';
    bySubtype[sub] = (bySubtype[sub] || 0) + 1;
    const key = `${sub}/${st}`;
    bySubtypeStatus[key] = (bySubtypeStatus[key] || 0) + 1;
  }
  return {
    by_status: byStatus,
    by_subtype: bySubtype,
    by_subtype_status: bySubtypeStatus,
    total: (EDGES_BY_TYPE.get('cross-classification') || []).length,
  };
}

function tool_find_structurally_excluded({ fc_id, limit } = {}) {
  const out = [];
  for (const n of (NODES_BY_TYPE.get('formal-classification') || [])) {
    if (fc_id && n.id !== fc_id) continue;
    const cells = Array.isArray(n.cells) ? n.cells : [];
    for (const c of cells) {
      if (c.content === 'structurally-excluded') {
        out.push({
          fc_id: n.id,
          fc_label: n.label,
          cell_id: c.cell_id,
          axis_values: c.axis_values,
          content: c.content,
          description: c.description,
          constructive_status: c.constructive_status,
          forced_by: c.forced_by,
        });
      }
    }
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_forced_cells({ constructive_status, fc_id, limit } = {}) {
  const statusSet = constructive_status
    ? new Set(asArray(constructive_status))
    : new Set(['forbidden-by-pattern', 'conjectured-by-pattern', 'indeterminate']);
  // Per v16/v17 spec §"When absent": an absent constructive_status field is
  // NOT a synonym for indeterminate. Cells without the field do not match any
  // explicit-status filter — treat as "constructive status not recorded".
  const out = [];
  for (const n of (NODES_BY_TYPE.get('formal-classification') || [])) {
    if (fc_id && n.id !== fc_id) continue;
    const cells = Array.isArray(n.cells) ? n.cells : [];
    for (const c of cells) {
      const cs = c.constructive_status;
      if (cs == null) continue;
      if (!statusSet.has(cs)) continue;
      out.push({
        fc_id: n.id,
        fc_label: n.label,
        cell_id: c.cell_id,
        axis_values: c.axis_values,
        content: c.content,
        description: c.description,
        constructive_status: cs,
        forced_by: c.forced_by,
      });
    }
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_get_forcing_constraint({ edge_id } = {}) {
  if (!edge_id) throw new Error("get_forcing_constraint: 'edge_id' is required.");
  const e = EDGES_BY_ID.get(edge_id);
  if (!e) return null;
  // Find all cells that name this edge_id in their forced_by[].edge_id
  const forced_cells = [];
  for (const n of (NODES_BY_TYPE.get('formal-classification') || [])) {
    const cells = Array.isArray(n.cells) ? n.cells : [];
    for (const c of cells) {
      const fb = Array.isArray(c.forced_by) ? c.forced_by : [];
      const hit = fb.some(x => x && x.kind === 'edge' && x.edge_id === edge_id);
      if (hit) {
        forced_cells.push({
          fc_id: n.id, cell_id: c.cell_id,
          axis_values: c.axis_values, constructive_status: c.constructive_status,
        });
      }
    }
  }
  return { edge: e, forced_cells };
}

function tool_get_axis_mapping({ edge_id } = {}) {
  if (!edge_id) throw new Error("get_axis_mapping: 'edge_id' is required.");
  const e = EDGES_BY_ID.get(edge_id);
  if (!e) return null;
  const MAPPABLE = new Set(['bijection', 'categorically-equivalent', 'derives-from']);
  const is_mappable_subtype = e.type === 'cross-classification' && MAPPABLE.has(e.subtype);
  const am = Array.isArray(e.axis_mapping) ? e.axis_mapping : null;
  let from_axes = null, to_axes = null;
  const fromN = NODES_BY_ID.get(e.from);
  const toN = NODES_BY_ID.get(e.to);
  if (fromN && fromN.type === 'formal-classification') {
    from_axes = (fromN.classification_axes || []).map(a => ({ name: a.name, kind: a.kind }));
  }
  if (toN && toN.type === 'formal-classification') {
    to_axes = (toN.classification_axes || []).map(a => ({ name: a.name, kind: a.kind }));
  }
  let note = null;
  if (!is_mappable_subtype) {
    note = `Edge subtype '${e.subtype || e.type}' is not eligible for axis_mapping per spec §5.3 (only bijection, categorically-equivalent, derives-from carry axis_mapping). For closure-constraint self-edges on formal-classification nodes, axis_mapping with correspondence='closure-constraint' is permitted under Phase A.`;
  } else if (!am || am.length === 0) {
    note = "Edge is of a mappable subtype but no axis_mapping has been authored. Consider this a loose end for the schema's predictive layer.";
  }
  return {
    edge_id,
    edge: pick(e, ['id', 'type', 'subtype', 'from', 'to', 'status', 'description']),
    axis_mapping: am,
    is_mappable_subtype,
    from_axes,
    to_axes,
    note,
  };
}

function tool_find_cells({ fc_id, axis, value, contentSearch, constructiveStatus, hasForcedBy, limit } = {}) {
  const out = [];
  const csSet = constructiveStatus ? new Set(asArray(constructiveStatus)) : null;
  // Per v16/v17 spec §"When absent": absent constructive_status is NOT a
  // synonym for indeterminate. When the caller passes a filter, cells with
  // no field do not match.
  for (const n of (NODES_BY_TYPE.get('formal-classification') || [])) {
    if (fc_id && n.id !== fc_id) continue;
    const cells = Array.isArray(n.cells) ? n.cells : [];
    for (const c of cells) {
      if (axis && (!c.axis_values || !(axis in c.axis_values))) continue;
      if (axis && value != null && String(c.axis_values[axis]) !== String(value)) continue;
      if (contentSearch && !ciIncludes(JSON.stringify(c), contentSearch)) continue;
      if (csSet) {
        const cs = c.constructive_status;
        if (cs == null) continue;
        if (!csSet.has(cs)) continue;
      }
      if (hasForcedBy === true && (!Array.isArray(c.forced_by) || c.forced_by.length === 0)) continue;
      if (hasForcedBy === false && Array.isArray(c.forced_by) && c.forced_by.length > 0) continue;
      out.push({ fc_id: n.id, fc_label: n.label, ...c });
    }
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_compare_classifications({ id1, id2 } = {}) {
  if (!id1 || !id2) throw new Error("compare_classifications: 'id1' and 'id2' are required.");
  const a = NODES_BY_ID.get(id1);
  const b = NODES_BY_ID.get(id2);
  if (!a || a.type !== 'formal-classification') return { error: `${id1} is not a formal-classification.` };
  if (!b || b.type !== 'formal-classification') return { error: `${id2} is not a formal-classification.` };
  const aAxes = (a.classification_axes || []).map(x => x && x.name);
  const bAxes = (b.classification_axes || []).map(x => x && x.name);
  const sharedAxes = aAxes.filter(x => bAxes.includes(x));

  // edges between them
  const directEdges = (EDGES_BY_TYPE.get('cross-classification') || [])
    .filter(e => (e.from === id1 && e.to === id2) || (e.from === id2 && e.to === id1));

  // shared subtype distribution
  const aSubs = new Set();
  const bSubs = new Set();
  for (const e of (EDGES_BY_TYPE.get('cross-classification') || [])) {
    if (e.from === id1 || e.to === id1) aSubs.add(e.subtype);
    if (e.from === id2 || e.to === id2) bSubs.add(e.subtype);
  }
  const sharedSubtypes = [...aSubs].filter(s => bSubs.has(s));

  return {
    id1, id2,
    label1: a.label, label2: b.label,
    closure_status_1: a.closure_status,
    closure_status_2: b.closure_status,
    axes_1: aAxes,
    axes_2: bAxes,
    shared_axis_names: sharedAxes,
    cells_1: (a.cells || []).length,
    cells_2: (b.cells || []).length,
    direct_cross_classification_edges: directEdges,
    cross_classification_subtypes_in_use_1: [...aSubs],
    cross_classification_subtypes_in_use_2: [...bSubs],
    shared_subtypes: sharedSubtypes,
  };
}

function tool_find_loose_ends({ structural_reason_category, scope, node_id, includeIfRealImplies, limit } = {}) {
  // Flat scan over loose_ends across the equations layer of every node.
  // v17 extension: when includeIfRealImplies (default true) is set, also surface
  // if_real_implies entries on the same nodes.
  const out = [];
  const includeIRI = includeIfRealImplies !== false;
  for (const n of NODES) {
    if (node_id && n.id !== node_id) continue;
    // 1) classical loose_ends path
    const eqs = n && n.equations && n.equations.native && Array.isArray(n.equations.native.equations)
      ? n.equations.native.equations : [];
    for (const eq of eqs) {
      const les = Array.isArray(eq.loose_ends) ? eq.loose_ends : [];
      for (const le of les) {
        if (structural_reason_category && le.structural_reason_category !== structural_reason_category) continue;
        if (scope && le.scope !== scope) continue;
        out.push({
          kind: 'loose_end',
          node_id: n.id,
          node_type: n.type,
          node_label: n.label,
          equation_latex: eq.latex,
          loose_end: le,
        });
      }
    }
    // 2) v17 if_real_implies path
    if (includeIRI && Array.isArray(n.if_real_implies)) {
      for (const entry of n.if_real_implies) {
        out.push({
          kind: 'if_real_implies',
          node_id: n.id,
          node_type: n.type,
          node_label: n.label,
          resolution: entry.resolution,
          condition: entry.condition,
          condition_citations: entry.condition_citations,
          implications: entry.implications,
        });
      }
    }
  }
  if (limit && Number.isFinite(limit)) return out.slice(0, limit);
  return out;
}

function tool_find_signal_implications({ carrier_id, resolution_id } = {}) {
  // v17 / Phase B flagship query.
  // If carrier_id provided: return if_real_implies entries on that carrier (optionally filtered by resolution).
  // If carrier_id absent: return all carriers' entries (a dataset-wide scan).
  if (carrier_id) {
    const n = NODES_BY_ID.get(carrier_id);
    if (!n) return { error: `No node with id '${carrier_id}'.` };
    if (n.type !== 'open-frontier' && n.type !== 'totality-approach') {
      return {
        error: `Node '${carrier_id}' is type '${n.type}'. ` +
               "if_real_implies carriers are restricted to open-frontier and totality-approach per Phase B spec §2.",
      };
    }
    const arr = Array.isArray(n.if_real_implies) ? n.if_real_implies : [];
    let filtered = arr;
    if (resolution_id) {
      filtered = arr.filter(r => r && r.resolution === resolution_id);
      if (filtered.length === 0) {
        return {
          carrier_id, resolution_id,
          carrier_label: n.label,
          entries: [],
          note: `No if_real_implies entry on '${carrier_id}' with resolution '${resolution_id}'. ` +
                `Authored resolutions on this carrier: ${arr.map(r => r.resolution).join(', ') || '(none)'}.`,
        };
      }
    }
    return {
      carrier_id,
      carrier_label: n.label,
      carrier_type: n.type,
      resolution_id: resolution_id || null,
      entry_count: filtered.length,
      entries: filtered,
    };
  }
  // No carrier_id: return all carriers' entries.
  const carriers = [];
  for (const n of NODES) {
    if (n.type !== 'open-frontier' && n.type !== 'totality-approach') continue;
    const arr = Array.isArray(n.if_real_implies) ? n.if_real_implies : [];
    if (arr.length === 0) continue;
    carriers.push({
      carrier_id: n.id,
      carrier_label: n.label,
      carrier_type: n.type,
      entry_count: arr.length,
      entries: arr,
    });
  }
  return {
    total_carriers_with_entries: carriers.length,
    total_resolutions: carriers.reduce((s, c) => s + c.entry_count, 0),
    carriers,
  };
}

// ============================================================
// TOOL REGISTRY
// ============================================================

const TOOLS = [
  {
    name: 'server_info',
    description:
      'Server diagnostic. Returns server version, schema version (v17), data version (v40), and counts of ' +
      'nodes, edges, formal-classifications, experimental-programs, cells, glossary entries, ' +
      'Phase A counts (realized / forbidden-by-pattern / conjectured-by-pattern / indeterminate cells, axis_mapping edges), ' +
      'and Phase B counts (if_real_implies carriers, resolutions, implications).',
    inputSchema: { type: 'object', properties: {} },
    handler: tool_server_info,
  },
  {
    name: 'get_node',
    description:
      'Fetch one node by id from the physics map (full record). Use when you already know the id; ' +
      'otherwise start with list_nodes or search. For formal-classifications, prefer get_classification. ' +
      'Returns if_real_implies on open-frontier / totality-approach carriers when present.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    handler: tool_get_node,
  },
  {
    name: 'get_classification',
    description: 'Fetch a formal-classification node by id.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    handler: tool_get_classification,
  },
  {
    name: 'get_experimental_program',
    description: 'Fetch an experimental-program node by id.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    handler: tool_get_experimental_program,
  },
  {
    name: 'glossary_lookup',
    description: 'Glossary entry by term or alias. Case-insensitive.',
    inputSchema: { type: 'object', properties: { term: { type: 'string' } }, required: ['term'] },
    handler: tool_glossary_lookup,
  },
  {
    name: 'list_nodes',
    description: 'List map nodes matching a filter (type, types, stratum, sector, contentSearch).',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        types: { type: 'array', items: { type: 'string' } },
        stratum: {},
        sector: { type: 'string' },
        contentSearch: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_list_nodes,
  },
  {
    name: 'list_classifications',
    description:
      'List formal-classifications matching filters. Each entry summarizes axes, cell count, prediction count, ' +
      'closure_status, and subtype.',
    inputSchema: {
      type: 'object',
      properties: {
        closure_status: { type: 'string' },
        subtype: { type: 'string' },
        contentSearch: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_list_classifications,
  },
  {
    name: 'list_experimental_programs',
    description: 'List experimental-program nodes with filters (subtype, contentSearch).',
    inputSchema: {
      type: 'object',
      properties: {
        subtype: { type: 'string' },
        contentSearch: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_list_experimental_programs,
  },
  {
    name: 'search',
    description: 'Substring search across node descriptions, loose-ends, and glossary. Case-insensitive.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, limit: { type: 'integer' } },
      required: ['query'],
    },
    handler: tool_search,
  },
  {
    name: 'neighbors',
    description:
      'Edges incident to a node. Optional edge_type filter and direction (outgoing | incoming | both, default both).',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        edge_type: { type: 'string' },
        direction: { type: 'string', enum: ['outgoing', 'incoming', 'both'] },
      },
      required: ['id'],
    },
    handler: tool_neighbors,
  },
  {
    name: 'paths',
    description:
      'BFS paths between two node ids up to maxLen edges (default 4) across ALL edge types. Returns short paths first.',
    inputSchema: {
      type: 'object',
      properties: {
        from: { type: 'string' },
        to: { type: 'string' },
        maxLen: { type: 'integer' },
      },
      required: ['from', 'to'],
    },
    handler: tool_paths,
  },
  {
    name: 'find_classification_chain',
    description:
      'BFS paths between two formal-classifications through cross-classification edges only. ' +
      'Useful for tracing how one classification reaches another through chains of bijection / specializes / derives-from / etc.',
    inputSchema: {
      type: 'object',
      properties: {
        from: { type: 'string' },
        to: { type: 'string' },
        maxLen: { type: 'integer' },
      },
      required: ['from', 'to'],
    },
    handler: tool_find_classification_chain,
  },
  {
    name: 'find_cross_classification',
    description:
      'Find cross-classification edges (formal-classification ↔ formal-classification). ' +
      'Filterable by from, to, subtype, status, and targeted_by.',
    inputSchema: {
      type: 'object',
      properties: {
        from: { type: 'string' },
        to: { type: 'string' },
        subtype: {},
        status: {},
        targeted_by: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_cross_classification,
  },
  {
    name: 'find_uses_classification',
    description: 'Find uses-classification edges (architecture or open-frontier → formal-classification).',
    inputSchema: {
      type: 'object',
      properties: {
        architecture: { type: 'string' },
        classification: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_uses_classification,
  },
  {
    name: 'find_produces_classification',
    description:
      'Find produces-classification edges (experimental-program, architecture, or open-frontier → formal-classification).',
    inputSchema: {
      type: 'object',
      properties: {
        producer: { type: 'string' },
        classification: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_produces_classification,
  },
  {
    name: 'find_bears_on',
    description:
      'Find bears-on edges (formal-classification → open-frontier or totality-approach). ' +
      'Filterable by classification, frontier, nature.',
    inputSchema: {
      type: 'object',
      properties: {
        classification: { type: 'string' },
        frontier: { type: 'string' },
        nature: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_bears_on,
  },
  {
    name: 'find_targeting',
    description:
      'Which candidate-foundational programs target this open-frontier node, ' +
      'with the candidate-targeting edges from each, plus any cross-classification edges naming the frontier in targeted_by.',
    inputSchema: {
      type: 'object',
      properties: { frontier_id: { type: 'string' } },
      required: ['frontier_id'],
    },
    handler: tool_find_targeting,
  },
  {
    name: 'find_targets_of_program',
    description:
      'Full target set of a program: candidate_targeting frontiers UNION cross-classification edges with targeted_by containing program_id.',
    inputSchema: {
      type: 'object',
      properties: { program_id: { type: 'string' } },
      required: ['program_id'],
    },
    handler: tool_find_targets_of_program,
  },
  {
    name: 'find_hosting',
    description: 'Which architectures or frontiers this candidate-foundational program claims to host or target.',
    inputSchema: {
      type: 'object',
      properties: { program_id: { type: 'string' } },
      required: ['program_id'],
    },
    handler: tool_find_hosting,
  },
  {
    name: 'find_predictions',
    description:
      'Find predictions across all formal-classifications, filterable by status (confirmed / unconfirmed-tension / not-yet-tested / falsified / retro-explanatory-only), fc_id, and contentSearch.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {},
        fc_id: { type: 'string' },
        contentSearch: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_predictions,
  },
  {
    name: 'find_status_distribution',
    description:
      'Distribution of cross-classification edges by status (established / partial / conjectured / aspired / contested / impossible), with per-subtype and per-(subtype,status) breakdowns. No arguments.',
    inputSchema: { type: 'object', properties: {} },
    handler: tool_find_status_distribution,
  },
  {
    name: 'find_structurally_excluded',
    description:
      'Find cells with content "structurally-excluded" — cells positively absent for structural reasons (e.g., fermion-multiplet × generation=N/A in SM). v16 makes these first-class via constructive_status and forced_by.',
    inputSchema: {
      type: 'object',
      properties: { fc_id: { type: 'string' }, limit: { type: 'integer' } },
    },
    handler: tool_find_structurally_excluded,
  },
  {
    name: 'find_forced_cells',
    description:
      'Find cells with constructive_status in {forbidden-by-pattern, conjectured-by-pattern, indeterminate}. ' +
      'Default returns all three; filter via constructive_status to narrow. Includes forced_by references to the constraint edge.',
    inputSchema: {
      type: 'object',
      properties: {
        constructive_status: {},
        fc_id: { type: 'string' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_forced_cells,
  },
  {
    name: 'get_forcing_constraint',
    description:
      'Given a cross-classification edge id, return the edge record plus the list of cells whose forced_by[] points at this edge. Use to inspect the closure constraint behind a set of forced-empty cells.',
    inputSchema: {
      type: 'object',
      properties: { edge_id: { type: 'string' } },
      required: ['edge_id'],
    },
    handler: tool_get_forcing_constraint,
  },
  {
    name: 'get_axis_mapping',
    description:
      'Given a cross-classification edge id, return its axis_mapping record (or null if absent) ' +
      'together with context about the source and target FC axes (so axis names can be cross-checked against from_axes / to_axes). ' +
      'Per spec §5.3, only subtypes {bijection, categorically-equivalent, derives-from} may carry axis_mapping; the response includes is_mappable_subtype and a note explaining absences.',
    inputSchema: {
      type: 'object',
      properties: { edge_id: { type: 'string' } },
      required: ['edge_id'],
    },
    handler: tool_get_axis_mapping,
  },
  {
    name: 'find_cells',
    description:
      'Search cells across formal-classifications. Filterable by fc_id, axis (single axis name) with optional value, contentSearch, constructiveStatus (one or more of realized | forbidden-by-pattern | conjectured-by-pattern | indeterminate), and hasForcedBy (true/false).',
    inputSchema: {
      type: 'object',
      properties: {
        fc_id: { type: 'string' },
        axis: { type: 'string' },
        value: {},
        contentSearch: { type: 'string' },
        constructiveStatus: {},
        hasForcedBy: { type: 'boolean' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_cells,
  },
  {
    name: 'compare_classifications',
    description:
      'Structural comparison of two formal-classifications: shared axis names, direct cross-classification edges between them, shared cross-classification subtypes in use, cell counts, closure statuses.',
    inputSchema: {
      type: 'object',
      properties: { id1: { type: 'string' }, id2: { type: 'string' } },
      required: ['id1', 'id2'],
    },
    handler: tool_compare_classifications,
  },
  {
    name: 'find_loose_ends',
    description:
      'Flat scan over loose ends across the equations layer of every node. v17: also surfaces if_real_implies entries on open-frontier / totality-approach carriers (controlled by includeIfRealImplies, default true). ' +
      'Filterable by structural_reason_category, scope, node_id.',
    inputSchema: {
      type: 'object',
      properties: {
        structural_reason_category: { type: 'string' },
        scope: { type: 'string' },
        node_id: { type: 'string' },
        includeIfRealImplies: { type: 'boolean' },
        limit: { type: 'integer' },
      },
    },
    handler: tool_find_loose_ends,
  },
  {
    name: 'find_signal_implications',
    description:
      'v17 / Phase B flagship query. Returns if_real_implies entries — conditional structural consequences of a literature-stated resolution of an open question. ' +
      'Carriers are open-frontier or totality-approach nodes only. If carrier_id is supplied, returns entries on that carrier (optionally narrowed by resolution_id). ' +
      'If carrier_id is omitted, returns every carrier with at least one entry — dataset-wide scan. ' +
      'Each entry carries a `condition`, `condition_citations`, and one or more `implications` (kind ∈ {new_cell, new_axis, forced_edge, promotes_subtype, new_FC}), each with `derivation_citations`. ' +
      'Subject to the Phase B admissibility test in MAP_v17_schema_spec_extension.md §4.',
    inputSchema: {
      type: 'object',
      properties: {
        carrier_id: { type: 'string' },
        resolution_id: { type: 'string' },
      },
    },
    handler: tool_find_signal_implications,
  },
];

const TOOL_MAP = new Map();
const TOOL_NAMES = [];
for (const t of TOOLS) {
  TOOL_MAP.set(t.name, t);
  TOOL_NAMES.push(t.name);
}

// ============================================================
// MCP JSON-RPC 2.0 over HTTP
// ============================================================

const PROTOCOL_VERSION = '2024-11-05';
const SERVER_INFO_OBJ = {
  name: 'map-of-physics',
  version: '3.1.0',
};

const BANNER =
  'Map of Physics — MCP endpoint (v40 / v17 schema / Phase B)\n' +
  `${COUNTS.nodes} nodes, ${COUNTS.edges} edges, ${COUNTS.formal_classifications} formal-classifications, ` +
  `${COUNTS.total_cells} cells, ${TOOL_NAMES.length} tools.\n` +
  `Phase B: ${COUNTS.if_real_implies_resolutions} if_real_implies resolutions on ${COUNTS.if_real_implies_carriers} carriers ` +
  `(${COUNTS.if_real_implies_implications} implications).\n` +
  'POST JSON-RPC here. Add this URL to Claude → Settings → Connectors.\n';

function rpcResult(id, result) {
  return { jsonrpc: '2.0', id, result };
}
function rpcError(id, code, message, data) {
  const err = { code, message };
  if (data !== undefined) err.data = data;
  return { jsonrpc: '2.0', id, error: err };
}

function listToolsResult() {
  return {
    tools: TOOLS.map(t => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  };
}

function callTool(name, args) {
  const t = TOOL_MAP.get(name);
  if (!t) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: `Unknown tool: ${name}` }) }],
      isError: true,
    };
  }
  try {
    const result = t.handler(args || {});
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      isError: false,
    };
  } catch (e) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: String(e && e.message || e) }) }],
      isError: true,
    };
  }
}

function handleRpc(msg) {
  const { id, method, params } = msg || {};
  if (method === 'initialize') {
    return rpcResult(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: SERVER_INFO_OBJ,
    });
  }
  if (method === 'notifications/initialized' || method === 'initialized') {
    // notification — no response expected
    return null;
  }
  if (method === 'ping') {
    return rpcResult(id, {});
  }
  if (method === 'tools/list') {
    return rpcResult(id, listToolsResult());
  }
  if (method === 'tools/call') {
    const name = params && params.name;
    const args = params && params.arguments;
    if (!name) return rpcError(id, -32602, "tools/call requires 'name'.");
    return rpcResult(id, callTool(name, args));
  }
  return rpcError(id, -32601, `Method not found: ${method}`);
}

async function handlePostBody(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify(rpcError(null, -32700, 'Parse error: invalid JSON')), {
      status: 400, headers: { 'content-type': 'application/json' },
    });
  }
  if (Array.isArray(body)) {
    const out = [];
    for (const msg of body) {
      const r = handleRpc(msg);
      if (r !== null) out.push(r);
    }
    return new Response(JSON.stringify(out), {
      status: 200, headers: { 'content-type': 'application/json' },
    });
  }
  const r = handleRpc(body);
  if (r === null) {
    return new Response('', { status: 202 });
  }
  return new Response(JSON.stringify(r), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === 'GET') {
      return new Response(BANNER, {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
    if (request.method === 'POST') {
      return handlePostBody(request);
    }
    if (request.method === 'OPTIONS') {
      return new Response('', {
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, OPTIONS',
          'access-control-allow-headers': 'content-type',
        },
      });
    }
    return new Response('Method Not Allowed', { status: 405 });
  },
};
