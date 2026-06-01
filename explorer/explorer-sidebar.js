'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-sidebar.js
//
//   Holds: every right-pane sidebar renderer (legend / about / education /
//   research / search / FC detail / all-cells / cell detail), selection
//   state changers (selectFC / selectCell / clearSelection), panel routing
//   (switchSidebarPanel / renderPanel / syncSidebarQuickBar / wireSidebarQuickBar),
//   the splitter drag handler (wireSplitter), the six-tab Browse dropdown
//   (browseMode / buildBrowseMenu / openBrowseMenu / closeBrowseMenu /
//   wireBrowseDropdown), the refresh-from-MCP-server helper
//   (refreshFromServer), and init() — the boot function called by the
//   inline <script>init();</script> at the bottom of the HTML.
//
//   Reads: data.js (state / DATA / FCS / FC_BY_ID / STATUSES / SECTORS /
//   MCP_BASE / esc / formatPara / showToast / yieldSegments / writeHash /
//   parseHash / STATUS_KEY / STATUS_LABEL / STATUS_COLOR / PHEN_CATEGORIES
//   via phenomena.js / PHEN_CAT_COLORS); map.js (renderMap, wireToolbar,
//   syncToolbarChips, wireMapDragPan, applyZoom, zoomFitToView, zoomIn,
//   zoomOut, drawPhenPhenOverlay via phenomena.js); phenomena.js
//   (renderSidebarPhenomena).
//
//   Load order in HTML: data → map → sidebar → phenomena. Sidebar can
//   reference phenomena functions because everything resolves at call time.
// =============================================================

// =============================================================
//   Sidebar: default state (legend + intro + tips)
// =============================================================
function renderSidebarDefault() {
  const inner = document.getElementById('sidebar-inner');
  const m = DATA._meta.counts;

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Legend</h3>
      <div style="font-size:11.5px;color:var(--ink-mute);line-height:1.5;margin-bottom:12px">
        How to read every tile on the map. Each tile is a <em>formal classification</em> with five visual signals: category stripe, symbol, cell count, predictive-yield bar, closure mark.
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Category</h3>
      <div class="sec-sub">The left-edge stripe on each tile.</div>
      <div class="sb-legend-row">
        <span class="swatch-square structural"></span>
        <span class="label"><span class="lab-name">Structural</span><span class="lab-desc">Pure mathematical scaffolding (e.g. ADE families, modular tensor categories).</span></span>
      </div>
      <div class="sb-legend-row">
        <span class="swatch-square hybrid"></span>
        <span class="label"><span class="lab-name">Hybrid</span><span class="lab-desc">Mathematical structure with empirical content (e.g. SM rep content).</span></span>
      </div>
      <div class="sb-legend-row">
        <span class="swatch-square phenomenon"></span>
        <span class="label"><span class="lab-name">Phenomenon</span><span class="lab-desc">Empirical territory (e.g. compact astro, hadronic states, neutrino sector).</span></span>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Prediction status</h3>
      <div class="sec-sub">The bar at the bottom of each tile.</div>
      <div class="sb-legend-row">
        <span class="swatch-bar" style="background:var(--st-confirmed)"></span>
        <span class="label"><span class="lab-name">Confirmed</span><span class="lab-desc">Predicted then observed.</span></span>
      </div>
      <div class="sb-legend-row">
        <span class="swatch-bar" style="background:var(--st-tension)"></span>
        <span class="label"><span class="lab-name">Tension</span><span class="lab-desc">Evidence is unresolved or in conflict.</span></span>
      </div>
      <div class="sb-legend-row">
        <span class="swatch-bar" style="background:var(--st-not-tested)"></span>
        <span class="label"><span class="lab-name">Not yet tested</span><span class="lab-desc">Theoretical prediction without experimental verdict.</span></span>
      </div>
      <div class="sb-legend-row">
        <span class="swatch-bar" style="background:var(--st-falsified)"></span>
        <span class="label"><span class="lab-name">Falsified</span><span class="lab-desc">Ruled out by experiment. <span style="color:var(--st-falsified)">⚠</span> appears on tiles that contain at least one.</span></span>
      </div>
      <div class="sb-legend-row">
        <span class="swatch-bar" style="background:var(--st-retro)"></span>
        <span class="label"><span class="lab-name">Retro-explanatory</span><span class="lab-desc">Phenomenon observed before, classification developed after.</span></span>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Closure level</h3>
      <div class="sec-sub">In the small symbol under the yield bar.</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11.5px;line-height:1.7;color:var(--ink-soft)">
        <span style="color:var(--ink);font-size:13px;margin-right:4px">■</span>complete-within-domain<br>
        <span style="color:var(--ink);font-size:13px;margin-right:4px">◐</span>partial<br>
        <span style="color:var(--ink);font-size:13px;margin-right:4px">□</span>conjectural
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Phenomena overlay colours</h3>
      <div class="sec-sub">When phenomena are toggled on, tiles glow in their category's colour.</div>
      ${PHEN_CATEGORIES.map(cat => `
        <div class="sb-legend-row">
          <span class="swatch-square" style="background:${PHEN_CAT_COLORS[cat]}"></span>
          <span class="label"><span class="lab-name">${esc(cat)}</span></span>
        </div>
      `).join('')}
    </div>

    <div class="sidebar-section">
      <h3>Quick spotlights</h3>
      <div style="display:flex;flex-direction:column;gap:5px">
        <button class="tb-chip" data-quick="falsified" style="text-align:left;padding:5px 9px">tiles with falsified predictions →</button>
        <button class="tb-chip" data-quick="overlay-phen" style="text-align:left;padding:5px 9px">show phen↔phen edges (CAO is hub) →</button>
        <button class="tb-chip" data-quick="confirmed" style="text-align:left;padding:5px 9px">tiles with confirmed predictions →</button>
      </div>
      <div class="tip-card" style="margin-top:10px">
        <strong style="color:var(--ink)">Keyboard</strong>: <span class="tip-key">Esc</span> clear · <span class="tip-key">+</span>/<span class="tip-key">−</span> zoom · <span class="tip-key">0</span> or <span class="tip-key">f</span> fit-to-view · drag the divider to resize this panel
      </div>
    </div>
  `;
  inner.querySelectorAll('[data-quick]').forEach(b => {
    b.addEventListener('click', () => {
      const v = b.dataset.quick;
      if (v === 'falsified')      { state.spotlightActive.add('falsified'); }
      else if (v === 'confirmed') { state.spotlightActive.add('confirmed'); }
      else if (v === 'overlay-phen') { state.overlay = 'phen-phen'; }
      syncToolbarChips();
      writeHash();
      renderMap();
    });
  });
}

// =============================================================
//   Sidebar: About / Education / Research panels (Update A)
// =============================================================
function renderSidebarAbout() {
  const inner = document.getElementById('sidebar-inner');
  inner.innerHTML = `
    <div class="sidebar-section">
      <button class="bld-cta" data-panel-jump="builder" type="button">
        <div class="bld-cta-title">⧉ Build a cross-section</div>
        <div class="bld-cta-desc">Lay two or more classifications along a shared axis and read off the recurrences and gaps the combined structure implies — the move the table is named for.</div>
        <div class="bld-cta-go">open the builder →</div>
      </button>
      <h3>About the table</h3>
      <p class="ap-lead">A map of where physics has organised itself into <em>formal classifications</em> — the Standard Model's particle table, the ten-fold way for topological phases, Freed-Hopkins anomalies, and dozens of others — assembled in one place for the first time.</p>

      <div class="ap-section">What it is</div>
      <p class="ap-text">Each tile is a formal classification: a taxonomy of physical content that nature appears to respect, with its own internal axis structure, predictive yield, and citations to primary literature. Until now these have been scattered across separate subfields. This is the first artifact that assembles them.</p>

      <div class="ap-section">How to read a tile</div>
      <p class="ap-text">The left-edge stripe is the <strong>category</strong>: blue = structural (pure mathematical scaffolding), green = phenomenon (empirical territory), amber = hybrid. The bar at the bottom is the <strong>predictive yield</strong>: green confirmed, amber under tension, gray not yet tested, red falsified, purple retro-explanatory. The corner shows the cell count, with ⚠ if the tile contains falsified predictions.</p>

      <div class="ap-section">What it's for</div>
      <ul class="ap-list">
        <li><strong>Cross-subfield navigation.</strong> Two classifications under different sectors may share machinery — the map makes those connections visible.</li>
        <li><strong>Auditing predictive yield.</strong> See in one glance what physics has predicted, what got confirmed, what got falsified, and what's still being tested.</li>
        <li><strong>Locating a problem.</strong> A working physicist can find the classifications that bear on their frontier and the cells inside each one that constrain it.</li>
      </ul>

      <div class="ap-section">Query recipes</div>
      <p class="ap-text">Six patterns of question the catalogue is built to answer — each demonstrated in <a class="ap-recipes-doclink" href="https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics/blob/main/methodology/QUERY_RECIPES.md" target="_blank" rel="noopener">QUERY_RECIPES.md</a> with worked examples and citations. The jump-links below open the panel where the catalogue surfaces each pattern.</p>
      <ul class="ap-list ap-recipes">
        <li><strong>Which programs target this open question?</strong> Experimental coverage of a frontier, cell, or candidate-foundational program. <button class="ap-recipe-jump" data-panel-jump="browse-frontiers">browse frontiers →</button></li>
        <li><strong>Where does the same entity classify in two frameworks?</strong> Cross-classification anchors between subfields. <button class="ap-recipe-jump" data-panel-jump="browse-classifications">browse classifications →</button></li>
        <li><strong>If this open question resolves one way, what gets forced?</strong> Conditional structural consequences on open frontiers. <button class="ap-recipe-jump" data-panel-jump="browse-frontiers">browse frontiers →</button></li>
        <li><strong>Which experiments adjudicate between competing predictions?</strong> Shared coverage between programs with side-by-side prediction lists. <button class="ap-recipe-jump" data-panel-jump="discriminating">compare programs →</button></li>
        <li><strong>What characteristic scales does the catalogue record?</strong> Every numerical commitment ranked by physical dimension. <button class="ap-recipe-jump" data-panel-jump="ranks">scales →</button></li>
        <li><strong>Which predictions has the catalogue recorded as falsified?</strong> The seventeen ruled-out predictions, by sector. <button class="ap-recipe-jump" data-spotlight="falsified">spotlight falsified →</button></li>
      </ul>
      <p class="ap-text" style="margin-top: 14px;"><a class="ap-recipes-doclink" href="https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics/tree/main/methodology" target="_blank" rel="noopener">Worked example sessions →</a> — physicists' chats walking these patterns through the catalogue, edited and published.</p>

      <div class="ap-section">Who it serves</div>
      <p class="ap-text">Two audiences. Pick the one closer to you:</p>
      <div class="ap-jumps">
        <button class="ap-jump" data-panel-jump="education">
          <span class="jump-num">01</span>
          <span class="jump-text">
            <span class="jump-title">For education</span>
            <span class="jump-desc">Students, teachers, curious newcomers — what physics knows and what it doesn't, on one screen.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-panel-jump="research">
          <span class="jump-num">02</span>
          <span class="jump-text">
            <span class="jump-title">For research</span>
            <span class="jump-desc">Working researchers, grant writers, grad students — direction-setting and cross-disciplinary navigation.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
      </div>

      <div class="ap-section">What it isn't</div>
      <p class="ap-text">Not a textbook. Not a complete catalogue. Not predictive of which research programs will succeed. The discourse layer around the formal classifications — architectures, open frontiers, totality approaches, regime contents, experimental programs, and the relations between them — is recorded, and the predictive layer on top of it (conditional consequences, experimental coverage relations, characteristic scales) is in; coverage will continue to deepen. Every placement carries an explicit rationale a reader can audit and disagree with.</p>
    </div>
  `;
  wirePanelJumps(inner);
}

function renderSidebarEducation() {
  const inner = document.getElementById('sidebar-inner');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>For education</h3>
      <p class="ap-lead">For students, teachers, and curious newcomers: a single map showing both what physics has worked out and what it hasn't.</p>

      <div class="ap-section">What's useful here</div>
      <p class="ap-text">This is not a chemistry-style periodic table you memorize. The useful thing is the bottom-of-tile bar — the predictive yield. Physics teaching usually shows the settled parts in isolation. Here you see them next to what's still being tested, what's contested, and what's already been ruled out. Knowing which is which is half of learning the subject.</p>

      <div class="ap-section">First pass — where to start</div>
      <div class="ap-jumps">
        <button class="ap-jump" data-fc-jump="sm-rep-content">
          <span class="jump-num">01</span>
          <span class="jump-text">
            <span class="jump-title">Open the Standard Model</span>
            <span class="jump-desc">Particle physics's own periodic table — every elementary particle, organised by the rules governing it.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-spotlight="confirmed">
          <span class="jump-num">02</span>
          <span class="jump-text">
            <span class="jump-title">See confirmed predictions</span>
            <span class="jump-desc">Highlights classifications that predicted something experiment later found.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-spotlight="falsified">
          <span class="jump-num">03</span>
          <span class="jump-text">
            <span class="jump-title">See where physics has been wrong</span>
            <span class="jump-desc">Highlights falsified predictions. Showing what got ruled out is as important as showing what got confirmed.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-panel-jump="phenomena">
          <span class="jump-num">04</span>
          <span class="jump-text">
            <span class="jump-title">Browse by physical phenomena</span>
            <span class="jump-desc">Toggle phenomena — light, black holes, neutrinos, gravity — to highlight where they live on the map.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
      </div>

      <div class="ap-section">Then</div>
      <p class="ap-text">Click any tile to read its classification description, see its cells (the specific theories, particles, phases, or observations it covers), and check the predictions it has staked on experiment. From inside a tile, click any cell for its full record.</p>
    </div>
  `;
  wirePanelJumps(inner);
}

function renderSidebarResearch() {
  const inner = document.getElementById('sidebar-inner');
  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>For research</h3>
      <p class="ap-lead">For working researchers, grad students, and grant writers: physics's Mendeleev-grade structural content, assembled and cross-referenced. The map as a structural lens on where productive work sits.</p>

      <div class="ap-section">What's on screen</div>
      <p class="ap-text">Each tile is a formal classification with its own internal axis structure, predictive-yield record, and primary-literature anchors. Tiles connect through cross-classification edges. Inside a tile, cells carry axis values, realized examples, and per-cell prediction status.</p>

      <div class="ap-section">Direction-setting</div>
      <ul class="ap-list">
        <li>Spot under-attacked classifications relative to their structural tractability.</li>
        <li>Identify cross-classification structural similarities — formal machinery shared across sectors that are not usually compared.</li>
        <li>Locate which classifications carry confirmed predictions versus contested or falsified ones.</li>
      </ul>

      <div class="ap-section">Where to start</div>
      <div class="ap-jumps">
        <button class="ap-jump" data-panel-jump="browse-classifications">
          <span class="jump-num">01</span>
          <span class="jump-text">
            <span class="jump-title">Browse all 30 classifications</span>
            <span class="jump-desc">Searchable list grouped by sector — the original Browse menu.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-spotlight="unconfirmed-tension">
          <span class="jump-num">02</span>
          <span class="jump-text">
            <span class="jump-title">Spotlight tiles under tension</span>
            <span class="jump-desc">Where predictions are in conflict with experiment or with each other.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-overlay="phen-phen">
          <span class="jump-num">03</span>
          <span class="jump-text">
            <span class="jump-title">Overlay phenomenon-to-phenomenon links</span>
            <span class="jump-desc">Connective tissue between phenomenon-type classifications across subfields.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-rows-by="closure">
          <span class="jump-num">04</span>
          <span class="jump-text">
            <span class="jump-title">Re-row by closure level</span>
            <span class="jump-desc">Group tiles by complete-within-domain / partial / conjectural to see closure distribution.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
      </div>

      <div class="ap-section">AI-augmented workflows</div>
      <p class="ap-text">The dataset (83 nodes, 230 edges, 484 cells, 209 predictions, 17 falsifications, 38 experimental-coverage relations, 288 characteristic scales) is queryable via the live read-only server at <code style="font-family:'JetBrains Mono',monospace;background:var(--paper-3);padding:1px 4px">map-of-physics.eddie-8e5.workers.dev</code>. 33 tools cover cell-content search, prediction filtering, cross-classification traversal, experimental-coverage lookup, characteristic-scale ranking by dimension, conditional-consequence lookup on open frontiers, and program-pair shared-coverage queries.</p>

      <p class="ap-text" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--rule-soft); font-style: italic; color: var(--ink-mute);">The map's success condition is whether the cuts the taxonomy makes turn out to predict things, organize work productively, or reveal connections that weren't visible before. That's the test the project welcomes — challenge any edge status or classification placement via the GitHub repo.</p>
    </div>
  `;
  wirePanelJumps(inner);
}

function wirePanelJumps(root) {
  root.querySelectorAll('[data-panel-jump]').forEach(el => {
    el.addEventListener('click', () => switchSidebarPanel(el.dataset.panelJump));
  });
  root.querySelectorAll('[data-fc-jump]').forEach(el => {
    el.addEventListener('click', () => selectFC(el.dataset.fcJump));
  });
  root.querySelectorAll('[data-spotlight]').forEach(el => {
    el.addEventListener('click', () => {
      const v = el.dataset.spotlight;
      // Toggle into the multi-select set (Update B)
      if (state.spotlightActive.has(v)) state.spotlightActive.delete(v);
      else state.spotlightActive.add(v);
      syncToolbarChips();
      writeHash();
      renderMap();
      showToast(`Spotlight: ${state.spotlightActive.size === 0 ? 'off' : Array.from(state.spotlightActive).join(', ')}`);
    });
  });
  root.querySelectorAll('[data-overlay]').forEach(el => {
    el.addEventListener('click', () => {
      state.overlay = el.dataset.overlay;
      syncToolbarChips();
      writeHash();
      renderMap();
      showToast(`Overlay: ${state.overlay}`);
    });
  });
  root.querySelectorAll('[data-rows-by]').forEach(el => {
    el.addEventListener('click', () => {
      state.group = el.dataset.rowsBy;
      syncToolbarChips();
      writeHash();
      renderMap();
      showToast(`Rows by: ${state.group}`);
    });
  });
}

// =============================================================
//   Sidebar: cell-content search results (Update A)
// =============================================================
function renderSidebarSearch(query) {
  const inner = document.getElementById('sidebar-inner');
  const q = (query || '').trim().toLowerCase();
  state.searchQuery = q;
  if (!q) {
    inner.innerHTML = `
      <div class="sidebar-section">
        <h3>Search</h3>
        <div class="csr-summary">Type into the box at the top to search the 484 cells of the table by content. Try <strong>black holes</strong>, <strong>gluons</strong>, <strong>light</strong>, <strong>neutron stars</strong>, <strong>AdS/CFT</strong>, or anything else you'd like to find.</div>
      </div>`;
    return;
  }

  // Search across cells (content, examples, cell_id, axis_values) and classifications (label, symbol, description)
  const groups = {};
  const lowerEsc = s => String(s || '').toLowerCase();
  for (const fc of FCS) {
    const fcMatch = lowerEsc(fc.label).includes(q) || lowerEsc(fc.symbol).includes(q) || lowerEsc(fc.description).includes(q) || lowerEsc(fc.subtype).includes(q);
    const cellMatches = [];
    for (const c of (fc.cells || [])) {
      const blob = lowerEsc(c.content) + ' ' + lowerEsc(c.cell_id) + ' ' +
                   (c.realized_examples || []).map(lowerEsc).join(' ') + ' ' +
                   Object.values(c.axis_values || {}).map(lowerEsc).join(' ');
      if (blob.includes(q)) cellMatches.push(c);
    }
    if (fcMatch || cellMatches.length > 0) {
      groups[fc.id] = { fc, cellMatches, fcMatch };
    }
  }

  const fcIds = Object.keys(groups);
  const totalCells = fcIds.reduce((s, k) => s + groups[k].cellMatches.length, 0);

  if (fcIds.length === 0) {
    inner.innerHTML = `
      <div class="sidebar-section">
        <h3>Search</h3>
        <div class="csr-summary">Searching for <strong>${esc(query)}</strong>…</div>
        <div class="csr-empty">No matches in the 484 cells or 30 classifications. Try a more common term or a different spelling.</div>
      </div>`;
    return;
  }

  const highlight = (text, q) => {
    const idx = text.toLowerCase().indexOf(q);
    if (idx < 0) return esc(text);
    return esc(text.slice(0, idx)) + '<mark>' + esc(text.slice(idx, idx + q.length)) + '</mark>' + esc(text.slice(idx + q.length));
  };

  const trim = (s, n) => {
    s = String(s || '');
    if (s.length <= n) return s;
    return s.slice(0, n - 1) + '…';
  };

  const groupsHtml = fcIds.map(fcId => {
    const { fc, cellMatches } = groups[fcId];
    const cellsHtml = cellMatches.slice(0, 10).map(c => {
      // Find a snippet around the query
      const content = String(c.content || '');
      const lc = content.toLowerCase();
      const idx = lc.indexOf(q);
      let snippet;
      if (idx >= 0) {
        const start = Math.max(0, idx - 30);
        const end = Math.min(content.length, idx + q.length + 60);
        snippet = (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
      } else {
        snippet = trim(content, 90);
      }
      return `<div class="csr-cell" data-fc="${esc(fc.id)}" data-cell="${esc(c.cell_id)}">
        <span class="csr-cell-id">${esc(c.cell_id)}</span>
        ${highlight(snippet, q)}
      </div>`;
    }).join('');
    const overflow = cellMatches.length > 10 ? `<div style="font-size:11px;color:var(--ink-mute);font-style:italic;padding:4px 8px">+${cellMatches.length - 10} more — open the tile for the full list.</div>` : '';
    return `<div class="csr-group">
      <div class="csr-group-head" data-fc-open="${esc(fc.id)}">
        <span class="group-sym">${esc(fc.symbol)}</span>
        <span>${esc(fc.label)}</span>
        <span class="group-ct">${cellMatches.length} match${cellMatches.length===1?'':'es'}</span>
      </div>
      ${cellsHtml || ''}${overflow}
    </div>`;
  }).join('');

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Search</h3>
      <div class="csr-summary">Searching for <strong>${esc(query)}</strong> — <strong>${totalCells}</strong> cell match${totalCells===1?'':'es'} across <strong>${fcIds.length}</strong> classification${fcIds.length===1?'':'s'}.</div>
      ${groupsHtml}
    </div>
  `;

  inner.querySelectorAll('[data-cell]').forEach(el => {
    el.addEventListener('click', () => selectCell(el.dataset.fc, el.dataset.cell));
  });
  inner.querySelectorAll('[data-fc-open]').forEach(el => {
    el.addEventListener('click', () => selectFC(el.dataset.fcOpen));
  });
}

// =============================================================
//   Panel routing (Update A; extended in Update B)
// =============================================================
// Discourse-catalogue tabs (Browse → CATALOGUES section). Each opens
// a typed listing of discourse nodes in the sidebar rather than navigating
// away from the map. Update B.
var DISCOURSE_CATALOGUE_TABS = {
  'browse-architectures':  { panel: 'browse-architectures',  render: function() { renderSidebarBrowseArchitectures(); } },
  'browse-frontiers':      { panel: 'browse-frontiers',      render: function() { renderSidebarBrowseFrontiers();     } },
  'browse-totalities':     { panel: 'browse-totalities',     render: function() { renderSidebarBrowseTotalities();    } },
  'browse-regime-content': { panel: 'browse-regime-content', render: function() { renderSidebarBrowseRegimeContent(); } },
  'browse-programs':       { panel: 'browse-programs',       render: function() { renderSidebarBrowsePrograms();      } },
};

function switchSidebarPanel(panel) {
  state.activePanel = panel;
  state.selectedFC = null;
  state.selectedCell = null;
  // Update B — clearing FC selection also clears the discourse one when
  // routing to a non-discourse panel; the discourse cards have their own
  // selection path through selectDiscourseNode.
  if (panel !== 'discourse') {
    if (typeof clearDiscourseSelection === 'function') clearDiscourseSelection();
  }
  // Update C — same pattern for glossary
  if (panel !== 'glossary') {
    if (typeof clearGlossarySelection === 'function') clearGlossarySelection();
  }
  // Update C — same pattern for cross-class edge
  if (panel !== 'edge') {
    if (typeof clearCrossClassEdgeSelection === 'function') clearCrossClassEdgeSelection();
  }
  // Update C — same pattern for discourse-edges ring-badge card
  if (panel !== 'discourse-edges') {
    if (typeof clearDiscourseEdgeSelection === 'function') clearDiscourseEdgeSelection();
  }
  // Sub-PR E7 — clear the selected pair when leaving the per-pair view.
  // The catalogue view doesn't carry a selectedPair, so clearing on
  // 'discriminating' as well is fine (no-op if already null).
  if (panel !== 'discriminating-pair') {
    if (typeof clearDiscriminatingSelection === 'function') clearDiscriminatingSelection();
  }
  // Sub-PR E6 — clear the selected kind + filter when leaving the
  // per-kind view. The catalogue view doesn't carry a selectedKind,
  // so clearing on 'ranks' as well is fine (no-op if already null).
  if (panel !== 'ranks-kind') {
    if (typeof clearRanksSelection === 'function') clearRanksSelection();
  }
  writeHash();
  renderPanel();
  closeBrowseMenu();
}

function renderPanel() {
  // Honors state.activePanel; only used when no FC is selected
  switch (state.activePanel) {
    case 'phenomena':              renderSidebarPhenomena();    break;
    case 'about':                  renderSidebarAbout();        break;
    case 'education':              renderSidebarEducation();    break;
    case 'research':               renderSidebarResearch();     break;
    case 'search':                 renderSidebarSearch(state.searchQuery); break;
    case 'legend':                 renderSidebarDefault();      break;
    case 'spotlight':              renderSidebarSpotlight();    break;   // Update B
    case 'glossary':               renderSidebarGlossary(state.glossaryFilter || ''); break; // Update C
    case 'discourse': {                                                  // Update B
      const n = DATA.discourse_by_id && DATA.discourse_by_id[state.selectedDiscourseNode];
      if (n) renderSidebarDiscourse(n);
      else renderSidebarAbout();
      break;
    }
    case 'edge': {                                                       // Update C — clickable on-map edges
      const edge = DATA.cross_class_edges_by_id && DATA.cross_class_edges_by_id[state.selectedEdgeId];
      if (edge) renderSidebarCrossClassEdge(edge);
      else renderSidebarAbout();
      break;
    }
    case 'discourse-edges': {                                            // Update C — ring-badge card
      const pair = state.selectedDiscourseEdgesPair;
      if (pair && pair.nodeId && pair.fcId && typeof renderSidebarDiscourseEdges === 'function') {
        renderSidebarDiscourseEdges(pair.nodeId, pair.fcId);
      } else {
        renderSidebarAbout();
      }
      break;
    }
    case 'browse-classifications': renderSidebarBrowseClassifications(state.searchQuery || ''); break; // Update B (FC catalogue)
    case 'browse-architectures':   renderSidebarBrowseArchitectures();  break; // Update B
    case 'browse-frontiers':       renderSidebarBrowseFrontiers();      break;
    case 'browse-totalities':      renderSidebarBrowseTotalities();     break;
    case 'browse-regime-content':  renderSidebarBrowseRegimeContent();  break;
    case 'browse-programs':        renderSidebarBrowsePrograms();       break;
    case 'discriminating':                                              // Sub-PR E7 — catalogue
      if (typeof renderSidebarDiscriminatingCatalogue === 'function') renderSidebarDiscriminatingCatalogue();
      else renderSidebarAbout();
      break;
    case 'discriminating-pair': {                                       // Sub-PR E7 — per-pair view
      if (state.selectedPair && typeof renderSidebarDiscriminatingPair === 'function') {
        renderSidebarDiscriminatingPair(state.selectedPair);
      } else if (typeof renderSidebarDiscriminatingCatalogue === 'function') {
        // Fall back to the catalogue when the pair id is missing
        renderSidebarDiscriminatingCatalogue();
      } else {
        renderSidebarAbout();
      }
      break;
    }
    case 'ranks':                                                       // Sub-PR E6 — catalogue
      if (typeof renderSidebarRanksCatalogue === 'function') renderSidebarRanksCatalogue();
      else renderSidebarAbout();
      break;
    case 'ranks-kind': {                                                // Sub-PR E6 — per-kind drill-down
      if (state.selectedKind && typeof renderSidebarRanksKind === 'function') {
        renderSidebarRanksKind(state.selectedKind);
      } else if (typeof renderSidebarRanksCatalogue === 'function') {
        // Fall back to the catalogue when the kind id is missing
        renderSidebarRanksCatalogue();
      } else {
        renderSidebarAbout();
      }
      break;
    }
    case 'builder':
      if (typeof renderSidebarBuilder === 'function') renderSidebarBuilder();
      else renderSidebarAbout();
      break;
    default:                       renderSidebarAbout();
  }
  syncSidebarQuickBar();
  if (typeof syncToolbarChips === 'function') syncToolbarChips();
}

function syncSidebarQuickBar() {
  // Only the panel buttons carry data-quick-panel; the Home button (action,
  // not a panel) is excluded so it never picks up an active state.
  document.querySelectorAll('.quick-bar-btn[data-quick-panel]').forEach(b => {
    b.classList.toggle('active', b.dataset.quickPanel === state.activePanel);
  });
}

function wireSidebarQuickBar() {
  // Scoped to [data-quick-panel] so the Home button (wired to navHome in
  // explorer-nav.js) is not also routed through switchSidebarPanel.
  document.querySelectorAll('.quick-bar-btn[data-quick-panel]').forEach(b => {
    b.addEventListener('click', () => {
      switchSidebarPanel(b.dataset.quickPanel);
    });
  });
}

// =============================================================
//   Sidebar: FC detail
// =============================================================
function renderSidebarFC(fc) {
  const inner = document.getElementById('sidebar-inner');
  const y = yieldSegments(fc);
  const yieldBar = y.total ? `<div class="dc-yield-bar">${y.html}</div>` : '';
  const yieldCounts = Object.entries(fc.yield_stats).map(([s,n]) =>
    `<span class="yc"><span class="dot" style="background:${STATUS_COLOR[s]}"></span>${esc(STATUS_LABEL[s]||s)}: ${n}</span>`
  ).join('') || '<span class="yc" style="color:var(--ink-mute)">no predictions</span>';

  // Axes
  const axesHtml = (fc.classification_axes || []).map(ax => `
    <div class="dc-axis">
      <span class="ax-name">${esc(ax.name)}</span><span class="ax-kind">${esc(ax.kind)}</span>
      ${ax.values && ax.values.length ? `<div class="ax-vals">${ax.values.slice(0,12).map(v => `<span class="ax-val">${esc(String(v))}</span>`).join('')}${ax.values.length > 12 ? `<span class="ax-val" style="color:var(--ink-mute)">+${ax.values.length-12} more</span>`:''}</div>`:''}
    </div>
  `).join('') || '<em style="color:var(--ink-mute);font-size:12px">No axes recorded.</em>';

  // Cells preview (first 12 sorted: falsified > preds > rest)
  const cellsSorted = [...fc.cells].sort((a,b) => {
    const aF = (fc.predictions||[]).some(p => p.cell_ref === a.cell_id && p.status === 'falsified') ? 1 : 0;
    const bF = (fc.predictions||[]).some(p => p.cell_ref === b.cell_id && p.status === 'falsified') ? 1 : 0;
    if (bF !== aF) return bF - aF;
    return (b.has_predictions?1:0) - (a.has_predictions?1:0);
  });
  const cellsPreview = cellsSorted.slice(0, 14);
  const cellsHtml = cellsPreview.map(c => {
    const isExcl = String(c.content || '').toLowerCase().includes('structurally-excluded') || c.structurally_excluded;
    const predsHere = (fc.predictions||[]).filter(p => p.cell_ref === c.cell_id || p.cell_id === c.cell_id);
    const inlinePreds = c.predictions || [];
    const all = [...inlinePreds, ...predsHere];
    const hasFals = all.some(p => p.status === 'falsified');
    const statusDots = [...new Set(all.map(p => p.status).filter(Boolean))].slice(0,5).map(s => `<span class="${STATUS_KEY[s]||''}" style="background:${STATUS_COLOR[s]||'var(--ink-faint)'}"></span>`).join('');
    return `<div class="dc-cell${isExcl?' excluded':''}${all.length?' has-preds':''}${hasFals?' has-falsified':''}" data-cell="${esc(c.cell_id)}" title="${esc(c.cell_id)}">
      <div class="cell-mini-id">${esc(c.cell_id)}</div>
      <div class="cell-mini-content">${esc((c.content || '').slice(0,60))}${(c.content||'').length>60?'…':''}</div>
      ${statusDots ? `<div class="cell-mini-status">${statusDots}</div>` : ''}
    </div>`;
  }).join('');
  const cellsMore = cellsSorted.length > 14
    ? `<button class="btn-ghost" id="show-all-cells" style="margin-top:8px;font-size:10.5px">show all ${cellsSorted.length} cells</button>`
    : '';

  // Predictions with filter
  const presentStatuses = STATUSES.filter(s => fc.predictions.some(p => p.status === s));
  const predTabs = ['all', ...presentStatuses];
  const predFilterBar = `
    <div class="pred-filters">
      ${predTabs.map(s => `<button data-pred="${s}" class="${state.predFilter === s ? 'active' : ''}">${esc(s === 'all' ? 'all' : (STATUS_LABEL[s] || s))}<span class="n">${s === 'all' ? fc.predictions.length : fc.predictions.filter(p=>p.status===s).length}</span></button>`).join('')}
    </div>
  `;
  const visiblePreds = fc.predictions.filter(p => state.predFilter === 'all' || p.status === state.predFilter);
  const predsHtml = visiblePreds.length ? visiblePreds.map(p => `
    <div class="dc-pred ${p.status || ''}">
      <div class="pred-status ${p.status || ''}">${esc(STATUS_LABEL[p.status] || p.status || 'unknown')}${p.cell_ref ? ` · ${esc(p.cell_ref)}` : ''}</div>
      <div class="pred-text">${esc(p.prediction || '')}</div>
      ${(p.quantitative_scale && typeof renderQS === 'function') ? `<div class="dc-pred-qs">${renderQS(p.quantitative_scale, {})}</div>` : ''}
      ${p.prediction_citation ? `<div class="pred-meta">predicted: ${esc(p.prediction_citation)}</div>` : ''}
      ${p.confirmation_citation ? `<div class="pred-meta">resolved: ${esc(p.confirmation_citation)}</div>` : ''}
    </div>
  `).join('') : '<em style="color:var(--ink-mute);font-size:12px">No predictions match this filter.</em>';

  // Edges
  const edges = DATA.edges_by_fc[fc.id] || [];
  const edgesHtml = edges.length ? edges.map(e => {
    const other = e.direction === 'outgoing' ? e.to : e.from;
    const otherLabel = (FC_BY_ID[other] && FC_BY_ID[other].label) || other;
    const arrow = e.direction === 'outgoing' ? '→' : '←';
    // Update C — clickable on-map edges. data-edge-id makes the whole
    // dc-edge block a hit target for selectCrossClassEdge. The inline
    // .edge-target still jumps directly to the neighbor FC via stopPropagation.
    const eid = e.id ? `data-edge-id="${esc(e.id)}" role="button" tabindex="0"` : '';
    return `
      <div class="dc-edge${e.id ? ' dc-edge-clickable' : ''}" ${eid}>
        <div class="edge-header">
          <span class="edge-subtype">${esc(e.subtype || 'unknown')}</span>
          ${e.status ? `<span class="edge-status-pill ${e.status}">${esc(e.status)}</span>` : ''}
          <span class="edge-arrow">${arrow}</span>
          <span class="edge-target" data-fc="${esc(other)}">${esc(otherLabel)}</span>
        </div>
        ${e.description ? `<div class="edge-desc">${esc(e.description)}</div>` : ''}
      </div>
    `;
  }).join('') : '<em style="color:var(--ink-mute);font-size:12px">No edges.</em>';

  inner.innerHTML = `
    <div class="sb-crumb">
      <div class="crumb-trail"><span class="crumb-current">${esc(fc.symbol)} · ${esc(fc.label)}</span></div>
      <button class="crumb-close" title="Close (Esc)">×</button>
    </div>

    <div class="detail-card ${fc.category}">
      <div style="display:flex;align-items:center;gap:0;margin-bottom:4px">
        <span class="dc-symbol">${esc(fc.symbol)}</span>
      </div>
      <div class="dc-title">${esc(fc.label)}</div>
      <div class="dc-fullname">${esc(fc.full_name)}</div>
      <div class="dc-meta">
        <span><strong>category:</strong> ${esc(fc.category)}</span>
        <span><strong>sector:</strong> ${esc(fc.sector)}</span>
        <span><strong>subtype:</strong> ${esc(fc.subtype)}</span>
        <span><strong>closure:</strong> ${esc(fc.closure_level)}</span>
        <span><strong>extent:</strong> ${fc.cell_count} cells · ${fc.prediction_count} predictions</span>
      </div>

      <div class="dc-yield">
        ${yieldBar}
        <div class="dc-yield-counts">${yieldCounts}</div>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Description</h3>
      ${!fc._has_detailed_header ? `<div class="synthesized-warning">⚠ Synthesized description — click <strong>↻ refresh</strong> in the header for the full record from the live server.</div>` : ''}
      <div class="dc-desc">${formatPara(fc.description)}</div>
      ${fc.domain_of_applicability ? `<div class="dc-desc" style="margin-top:8px"><strong style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--ink-mute);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:2px">Domain</strong>${esc(fc.domain_of_applicability)}</div>` : ''}
      ${fc.closure_description ? `<div class="dc-desc" style="margin-top:8px"><strong style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--ink-mute);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:2px">Closure</strong>${esc(fc.closure_description)}</div>` : ''}
    </div>

    <div class="sidebar-section">
      <h3>Classification axes</h3>
      <div class="dc-axes-list">${axesHtml}</div>
    </div>

    <div class="sidebar-section">
      <h3>Cells <span style="color:var(--ink-mute);font-weight:400">· ${fc.cells.length}</span></h3>
      <div class="dc-cells">${cellsHtml}</div>
      ${cellsMore}
    </div>

    <div class="sidebar-section">
      <h3>Predictions <span style="color:var(--ink-mute);font-weight:400">· ${fc.predictions.length}</span></h3>
      ${predFilterBar}
      <div class="dc-preds">${predsHtml}</div>
    </div>

    <div class="sidebar-section">
      <h3>Cross-classification edges <span style="color:var(--ink-mute);font-weight:400">· ${edges.length}</span></h3>
      <div class="dc-edges">${edgesHtml}</div>
    </div>

    ${fc.citations && fc.citations.length ? `<div class="sidebar-section"><h3>Key citations</h3><div style="font-size:11.5px;line-height:1.6;color:var(--ink-soft);font-family:'JetBrains Mono',monospace">${fc.citations.map(c => `• ${esc(c)}`).join('<br>')}</div></div>` : ''}
    ${fc.cross_cutting_concepts && fc.cross_cutting_concepts.length ? `<div class="sidebar-section"><h3>Cross-cutting concepts</h3><div style="display:flex;flex-wrap:wrap;gap:4px">${fc.cross_cutting_concepts.map(c => `<span class="ax-val">${esc(c)}</span>`).join('')}</div></div>` : ''}
  `;

  // Wire interactions inside sidebar
  inner.querySelector('.crumb-close').addEventListener('click', clearSelection);
  inner.querySelectorAll('.dc-cell[data-cell]').forEach(el => {
    el.addEventListener('click', () => selectCell(fc.id, el.dataset.cell));
  });
  const showAll = inner.querySelector('#show-all-cells');
  if (showAll) showAll.addEventListener('click', () => renderSidebarAllCells(fc));
  // Update C — clickable on-map edges. The whole dc-edge block opens the
  // edge card. .edge-target inside still short-circuits to the neighbor
  // FC via stopPropagation (preserves the existing one-click neighbor jump).
  inner.querySelectorAll('.dc-edge-clickable[data-edge-id]').forEach(el => {
    el.addEventListener('click', () => {
      if (typeof selectCrossClassEdge === 'function') {
        selectCrossClassEdge(el.getAttribute('data-edge-id'));
      }
    });
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        if (typeof selectCrossClassEdge === 'function') {
          selectCrossClassEdge(el.getAttribute('data-edge-id'));
        }
      }
    });
  });
  inner.querySelectorAll('.edge-target').forEach(el => {
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      selectFC(el.dataset.fc);
    });
  });
  inner.querySelectorAll('.pred-filters button').forEach(b => {
    b.addEventListener('click', () => {
      state.predFilter = b.dataset.pred;
      writeHash();
      renderSidebarFC(fc);
    });
  });
}

function renderSidebarAllCells(fc) {
  const inner = document.getElementById('sidebar-inner');
  // Build "all cells" view inside the sidebar
  const cellsHtml = fc.cells.map(c => {
    const isExcl = String(c.content || '').toLowerCase().includes('structurally-excluded') || c.structurally_excluded;
    const predsHere = (fc.predictions||[]).filter(p => p.cell_ref === c.cell_id || p.cell_id === c.cell_id);
    const inlinePreds = c.predictions || [];
    const all = [...inlinePreds, ...predsHere];
    const hasFals = all.some(p => p.status === 'falsified');
    const statusDots = [...new Set(all.map(p => p.status).filter(Boolean))].slice(0,5).map(s => `<span style="background:${STATUS_COLOR[s]||'var(--ink-faint)'}"></span>`).join('');
    return `<div class="dc-cell${isExcl?' excluded':''}${all.length?' has-preds':''}${hasFals?' has-falsified':''}" data-cell="${esc(c.cell_id)}">
      <div class="cell-mini-id">${esc(c.cell_id)}</div>
      <div class="cell-mini-content">${esc(c.content || '')}</div>
      ${statusDots ? `<div class="cell-mini-status">${statusDots}</div>` : ''}
    </div>`;
  }).join('');
  inner.innerHTML = `
    <div class="sb-crumb">
      <div class="crumb-trail"><a data-back-to-fc>${esc(fc.symbol)} · ${esc(fc.label)}</a> › <span class="crumb-current">all cells</span></div>
      <button class="crumb-close" title="Close (Esc)">×</button>
    </div>
    <div class="sidebar-section">
      <h3>All cells <span style="color:var(--ink-mute);font-weight:400">· ${fc.cells.length}</span></h3>
      <div class="dc-cells" style="grid-template-columns: 1fr">${cellsHtml}</div>
    </div>
  `;
  inner.querySelector('.crumb-close').addEventListener('click', clearSelection);
  inner.querySelector('[data-back-to-fc]').addEventListener('click', () => renderSidebarFC(fc));
  inner.querySelectorAll('.dc-cell[data-cell]').forEach(el => {
    el.addEventListener('click', () => selectCell(fc.id, el.dataset.cell));
  });
  document.getElementById('sidebar').scrollTop = 0;
}

// =============================================================
//   Sidebar: cell detail
// =============================================================
function renderSidebarCell(fc, cell) {
  const inner = document.getElementById('sidebar-inner');
  const predsForCell = (fc.predictions||[]).filter(p => p.cell_ref === cell.cell_id || p.cell_id === cell.cell_id);
  const inlinePreds  = cell.predictions || [];
  const allPreds     = [...inlinePreds, ...predsForCell.filter(p => !inlinePreds.some(cp => cp.prediction === p.prediction))];

  inner.innerHTML = `
    <div class="sb-crumb">
      <div class="crumb-trail">
        <a data-back-to-fc>${esc(fc.symbol)} · ${esc(fc.label)}</a> ›
        <span class="crumb-current">${esc(cell.cell_id)}</span>
      </div>
      <button class="crumb-close" title="Close (Esc)">×</button>
    </div>

    <div class="detail-card ${fc.category}" style="border-bottom:1px solid var(--rule);padding-bottom:14px;margin-bottom:18px">
      <div class="dc-title">${esc(cell.content || cell.cell_id)}</div>
      <div class="dc-fullname">in ${esc(fc.label)}</div>
    </div>

    <div class="sidebar-section">
      <h3>Axis values</h3>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${Object.entries(cell.axis_values || {}).map(([k,v]) => `<span class="ax-val"><strong style="color:var(--ink)">${esc(k)}</strong>: ${esc(String(v))}</span>`).join('')}
      </div>
    </div>

    ${(cell.description || cell.quantitative_scale) ? `<div class="sidebar-section"><h3>Description</h3>${cell.description ? `<div style="font-size:13px;line-height:1.55;color:var(--ink-soft)">${esc(cell.description)}</div>` : ''}${(cell.quantitative_scale && typeof renderQS === 'function') ? `<div class="cell-qs-inline">${renderQS(cell.quantitative_scale, {})}${(typeof renderQSCitations === 'function') ? renderQSCitations(cell.quantitative_scale.citations, { compact: true }) : ''}</div>` : ''}</div>` : ''}

    ${(cell.realized_examples && cell.realized_examples.length) ? `<div class="sidebar-section"><h3>Realized examples</h3><ul style="font-size:12.5px;line-height:1.5;color:var(--ink-soft);margin:0;padding-left:18px">${cell.realized_examples.map(e => `<li style="margin-bottom:3px">${esc(e)}</li>`).join('')}</ul></div>` : ''}

    ${allPreds.length ? `<div class="sidebar-section"><h3>Predictions for this cell <span style="color:var(--ink-mute);font-weight:400">· ${allPreds.length}</span></h3><div class="dc-preds">${allPreds.map(p => `
      <div class="dc-pred ${p.status || ''}">
        <div class="pred-status ${p.status || ''}">${esc(STATUS_LABEL[p.status] || p.status || 'unknown')}</div>
        <div class="pred-text">${esc(p.prediction || '')}</div>
        ${(p.quantitative_scale && typeof renderQS === 'function') ? `<div class="dc-pred-qs">${renderQS(p.quantitative_scale, {})}</div>` : ''}
        ${p.prediction_citation ? `<div class="pred-meta">predicted: ${esc(p.prediction_citation)}</div>` : ''}
        ${p.confirmation_citation ? `<div class="pred-meta">resolved: ${esc(p.confirmation_citation)}</div>` : ''}
      </div>`).join('')}</div></div>` : ''}

    ${(typeof renderTargetedByTarget === 'function') ? renderTargetedByTarget(cell.cell_id) : ''}

    ${cell.citations && cell.citations.length ? `<div class="sidebar-section"><h3>Citations</h3><div style="font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.6;color:var(--ink-soft)">${cell.citations.map(c => `• ${esc(c)}`).join('<br>')}</div></div>` : ''}
  `;

  inner.querySelector('.crumb-close').addEventListener('click', clearSelection);
  inner.querySelector('[data-back-to-fc]').addEventListener('click', () => renderSidebarFC(fc));

  // Sub-PR E2 — wire the resolves-renderer's deep-link pills inside the
  // cell sidebar. The pills use the same data attributes the discourse
  // module wires up ([data-fc-cell-jump], [data-disc-jump]); we replicate
  // the handlers here because renderSidebarCell doesn't go through
  // wireDiscourseCardLinks.
  inner.querySelectorAll('[data-fc-cell-jump]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const [fcId, cellId] = el.dataset.fcCellJump.split('|');
      selectCell(fcId, cellId);
    });
  });
  inner.querySelectorAll('[data-disc-jump]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      selectDiscourseNode(el.dataset.discJump);
    });
  });
}

// =============================================================
//   Selection state changers
// =============================================================
function selectFC(fcId) {
  const fc = FC_BY_ID[fcId];
  if (!fc) return;
  state.selectedFC = fcId;
  state.selectedCell = null;
  state.selectedDiscourseNode = null;    // Update B
  state.selectedEdgeId = null;           // Update C
  state.selectedDiscourseEdgesPair = null; // Update C — ring-badge card
  state.predFilter = 'all';
  state.activePanel = 'fc';
  writeHash();
  renderSidebarFC(fc);
  document.getElementById('sidebar').scrollTop = 0;
  renderMap();   // re-render to show the selected ring on the tile
  closeBrowseMenu();
  syncSidebarQuickBar();
}
function selectCell(fcId, cellId) {
  const fc = FC_BY_ID[fcId];
  if (!fc) return;
  const cell = fc.cells.find(c => c.cell_id === cellId);
  if (!cell) return;
  state.selectedFC = fcId;
  state.selectedCell = cellId;
  state.selectedDiscourseNode = null;    // Update B
  state.selectedEdgeId = null;           // Update C
  state.selectedDiscourseEdgesPair = null; // Update C — ring-badge card
  state.activePanel = 'fc';
  writeHash();
  renderSidebarCell(fc, cell);
  document.getElementById('sidebar').scrollTop = 0;
}
function clearSelection() {
  state.selectedFC = null;
  state.selectedCell = null;
  state.selectedDiscourseNode = null;    // Update B
  state.selectedGlossaryTerm = null;     // Update C
  state.selectedEdgeId = null;           // Update C (clickable on-map edges)
  state.selectedDiscourseEdgesPair = null; // Update C (ring-badge card)
  state.predFilter = 'all';
  writeHash();
  renderPanel();
  renderMap();
}

// =============================================================
//   Update C — clickable on-map edges
// =============================================================
// A cross-classification edge is shown as either a phen<->phen overlay
// line on the map, or a dc-edge block inside an FC card. Either click
// surface lands the user on the same edge card, rendered here.

function selectCrossClassEdge(edgeId) {
  if (!edgeId) return;
  const edge = DATA.cross_class_edges_by_id && DATA.cross_class_edges_by_id[edgeId];
  if (!edge) return;
  state.selectedFC = null;
  state.selectedCell = null;
  state.selectedDiscourseNode = null;
  state.selectedGlossaryTerm = null;
  state.selectedDiscourseEdgesPair = null; // Update C — ring-badge card
  state.selectedEdgeId = edgeId;
  state.activePanel = 'edge';
  state.predFilter = 'all';
  writeHash();
  renderSidebarCrossClassEdge(edge);
  document.getElementById('sidebar').scrollTop = 0;
  renderMap();
  closeBrowseMenu();
  syncSidebarQuickBar();
}

function clearCrossClassEdgeSelection() {
  state.selectedEdgeId = null;
}

function renderSidebarCrossClassEdge(edge) {
  const inner = document.getElementById('sidebar-inner');
  if (!edge) {
    inner.innerHTML = '<div class="sidebar-section"><em style="color:var(--ink-mute)">Edge not found.</em></div>';
    return;
  }
  const fromPill = (typeof renderFCPill === 'function') ? renderFCPill(edge.from)
                 : `<span>${esc(edge.from)}</span>`;
  const toPill   = (typeof renderFCPill === 'function') ? renderFCPill(edge.to)
                 : `<span>${esc(edge.to)}</span>`;

  const statusPill = edge.status
    ? `<span class="edge-status-pill ${esc(edge.status)}">${esc(edge.status)}</span>`
    : '';
  const subtypePill = edge.subtype
    ? `<span class="edge-subtype">${esc(edge.subtype)}</span>`
    : '';
  const targetedPills = (edge.targeted_by && edge.targeted_by.length)
    ? `<div class="xc-targeted-by"><span class="xc-targeted-by-lbl">targeted by:</span> ${
        edge.targeted_by.map(t => `<span class="xc-targeted-by-pill">${esc(t)}</span>`).join('')
      }</div>`
    : '';

  // Cell-refs. Convention in v34: cell_refs belong to the `from` endpoint
  // of the edge. One pill group, FC pill as the section header.
  const refsHtml = (edge.cell_refs && edge.cell_refs.length)
    ? `
      <div class="sidebar-section">
        <h3>Cells <span style="color:var(--ink-mute);font-weight:400">· ${edge.cell_refs.length}</span></h3>
        <div class="xc-cells-grp">
          <div class="xc-cells-grp-head">${(typeof renderFCPill === 'function') ? renderFCPill(edge.from) : esc(edge.from)}</div>
          ${(typeof renderCellRefPills === 'function')
              ? renderCellRefPills(edge.from, edge.cell_refs)
              : `<div class="xc-cell-pills">${edge.cell_refs.map(c => `<span class="xc-cell-pill">${esc(c)}</span>`).join('')}</div>`}
        </div>
      </div>`
    : '';

  const citationsHtml = (edge.citations && edge.citations.length)
    ? `
      <div class="sidebar-section">
        <h3>Citations <span style="color:var(--ink-mute);font-weight:400">· ${edge.citations.length}</span></h3>
        <ul class="xc-citation-list">
          ${edge.citations.map(c => `<li>${esc(c)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  inner.innerHTML = `
    <div class="sb-crumb">
      <div class="crumb-trail"><span class="crumb-current">Cross-classification edge</span></div>
      <button class="crumb-close" title="Close (Esc)">×</button>
    </div>

    <div class="detail-card xc-edge-card">
      <div class="xc-edge-endpoints">
        <span class="xc-edge-endpoint">${fromPill}</span>
        <span class="xc-edge-arrow" aria-hidden="true">→</span>
        <span class="xc-edge-endpoint">${toPill}</span>
      </div>
      <div class="xc-edge-meta">
        ${subtypePill}
        ${statusPill}
      </div>
      ${targetedPills}
    </div>

    <div class="sidebar-section">
      <h3>Description</h3>
      <div class="dc-desc">${edge.description ? formatPara(edge.description) : '<em style="color:var(--ink-mute)">No description recorded.</em>'}</div>
    </div>

    ${refsHtml}
    ${citationsHtml}
  `;

  // Wire the close button + FC-pill jumps (the renderFCPill helper
  // already emits data-fc-jump on its buttons; we attach handlers here).
  inner.querySelector('.crumb-close').addEventListener('click', clearSelection);
  inner.querySelectorAll('[data-fc-jump]').forEach(el => {
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      selectFC(el.getAttribute('data-fc-jump'));
    });
  });
  inner.querySelectorAll('[data-fc-cell-jump]').forEach(el => {
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      const parts = el.getAttribute('data-fc-cell-jump').split('|');
      if (parts.length === 2) selectCell(parts[0], parts[1]);
    });
  });
}

// =============================================================
//   Render dispatch
// =============================================================
function renderAll() {
  renderMap();
  if (state.selectedFC) {
    const fc = FC_BY_ID[state.selectedFC];
    if (fc) {
      if (state.selectedCell) {
        const cell = fc.cells.find(c => c.cell_id === state.selectedCell);
        if (cell) { renderSidebarCell(fc, cell); return; }
      }
      renderSidebarFC(fc);
      return;
    }
  }
  // Update C — restore a previously-selected cross-classification edge
  // from the hash before falling back to other selection layers. Edge
  // selection wins over discourse and glossary when set.
  if (state.selectedEdgeId) {
    const edge = DATA.cross_class_edges_by_id && DATA.cross_class_edges_by_id[state.selectedEdgeId];
    if (edge) { state.activePanel = 'edge'; renderSidebarCrossClassEdge(edge); return; }
  }
  // Update C — restore a previously-selected discourse-edges pair (ring-
  // badge card). Wins over the bare discourse-node selection because it's
  // strictly more specific. parseHash sets selectedDiscourseNode alongside
  // so the amber ring stays lit when the card opens.
  if (state.selectedDiscourseEdgesPair && state.selectedDiscourseEdgesPair.nodeId && state.selectedDiscourseEdgesPair.fcId) {
    const pair = state.selectedDiscourseEdgesPair;
    const node = DATA.discourse_by_id && DATA.discourse_by_id[pair.nodeId];
    const fc   = FC_BY_ID && FC_BY_ID[pair.fcId];
    if (node && fc && typeof renderSidebarDiscourseEdges === 'function') {
      state.activePanel = 'discourse-edges';
      renderSidebarDiscourseEdges(pair.nodeId, pair.fcId);
      return;
    }
  }
  // Update B — restore a previously-selected discourse node from the hash
  if (state.selectedDiscourseNode) {
    const n = DATA.discourse_by_id && DATA.discourse_by_id[state.selectedDiscourseNode];
    if (n) { state.activePanel = 'discourse'; renderSidebarDiscourse(n); return; }
  }
  // Update C — restore the glossary panel (and optionally a focused entry)
  // from the hash. If parseHash set activePanel='glossary', the regular
  // renderPanel switch handles it; this branch is for the case where the
  // hash includes a slug that needs to scroll into view after first render.
  renderPanel();
}

// =============================================================
//   Refresh from live MCP server
// =============================================================
async function refreshFromServer() {
  const btn = document.getElementById('btn-refresh');
  btn.classList.add('spinning'); btn.disabled = true;
  try {
    const r = await fetch(MCP_BASE + '/', { method: 'GET', mode: 'cors' });
    if (r.ok) showToast('Live MCP server reachable. Embedded snapshot is from ' + (DATA._meta.generated_at || 'build time'), 'success');
    else throw new Error('HTTP ' + r.status);
  } catch (err) {
    showToast('Browser fetch blocked (CORS). Opening server URL in a new tab.', 'error');
    setTimeout(() => window.open(MCP_BASE, '_blank'), 500);
  } finally {
    btn.classList.remove('spinning'); btn.disabled = false;
  }
}

// =============================================================
//   Splitter drag (resize the sidebar)
// =============================================================
function wireSplitter() {
  const splitter = document.getElementById('splitter');
  const grid = document.getElementById('body-grid');
  if (!splitter || !grid) return;

  const MIN_PANEL = 240;
  const MAX_PANEL = 700;
  const STORAGE_KEY = 'mop-panel-width';

  // Restore saved width
  try {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || '', 10);
    if (saved && saved >= MIN_PANEL && saved <= MAX_PANEL) {
      grid.style.setProperty('--panel-width', saved + 'px');
    }
  } catch (e) {}

  let dragging = false;
  let startX = 0;
  let startWidth = 0;

  function onMouseDown(e) {
    if (grid.classList.contains('sidebar-collapsed')) return;
    dragging = true;
    splitter.classList.add('dragging');
    document.body.classList.add('splitter-dragging');
    startX = e.clientX;
    const cur = getComputedStyle(grid).getPropertyValue('--panel-width').trim() || '380px';
    startWidth = parseInt(cur, 10) || 380;
    e.preventDefault();
  }
  function onMouseMove(e) {
    if (!dragging) return;
    const dx = startX - e.clientX;        // drag left = grow panel
    let w = startWidth + dx;
    if (w < MIN_PANEL) w = MIN_PANEL;
    if (w > MAX_PANEL) w = MAX_PANEL;
    // Also constrain to keep at least 320px of map visible
    const maxByViewport = Math.max(MIN_PANEL, window.innerWidth - 320);
    if (w > maxByViewport) w = maxByViewport;
    grid.style.setProperty('--panel-width', w + 'px');
  }
  function onMouseUp() {
    if (!dragging) return;
    dragging = false;
    splitter.classList.remove('dragging');
    document.body.classList.remove('splitter-dragging');
    try {
      const cur = getComputedStyle(grid).getPropertyValue('--panel-width').trim();
      const w = parseInt(cur, 10);
      if (w) localStorage.setItem(STORAGE_KEY, String(w));
    } catch (e) {}
    // Overlay arrows need to be redrawn if active
    if (state.overlay === 'phen-phen') setTimeout(drawPhenPhenOverlay, 0);
  }
  // Keyboard accessibility — left/right arrow keys
  function onKeyDown(e) {
    if (grid.classList.contains('sidebar-collapsed')) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const cur = getComputedStyle(grid).getPropertyValue('--panel-width').trim() || '380px';
    let w = parseInt(cur, 10) || 380;
    w += (e.key === 'ArrowLeft' ? 16 : -16);
    if (w < MIN_PANEL) w = MIN_PANEL;
    if (w > MAX_PANEL) w = MAX_PANEL;
    grid.style.setProperty('--panel-width', w + 'px');
    try { localStorage.setItem(STORAGE_KEY, String(w)); } catch (e2) {}
    if (state.overlay === 'phen-phen') setTimeout(drawPhenPhenOverlay, 0);
    e.preventDefault();
  }

  splitter.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  splitter.addEventListener('keydown', onKeyDown);

  // Touch support
  splitter.addEventListener('touchstart', e => {
    const t = e.touches[0]; if (!t) return;
    onMouseDown({ clientX: t.clientX, preventDefault: () => e.preventDefault() });
  }, { passive: false });
  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const t = e.touches[0]; if (!t) return;
    onMouseMove({ clientX: t.clientX });
  }, { passive: true });
  document.addEventListener('touchend', onMouseUp);
}

// =============================================================
//   Browse dropdown — five-tab navigator (Update B: catalogues moved out)
//   The Browse menu now holds only the five "Map" panels: phenomena,
//   legend, about, education, research. The six catalogues — all formal
//   classifications + the five discourse types — live as peer toolbar
//   buttons (see the .discourse-tab buttons in the toolbar HTML and
//   wireToolbar() in explorer-map.js).
// =============================================================
var browseMode = 'tabs'; // 'tabs' only — classifications-mode removed in Update B
function buildBrowseMenu(filter) {
  const menu = document.getElementById('browse-menu');
  const tabs = [
    { id: 'browse-classifications', icon: '☰', title: 'Classifications', desc: 'All formal classifications, grouped by sector.' },
    { id: 'browse-architectures',   icon: '⌬', title: 'Architectures',   desc: 'Established and candidate-foundational programs.' },
    { id: 'browse-frontiers',       icon: '✕', title: 'Frontiers',       desc: 'Open frontiers, grouped by structural reason.' },
    { id: 'browse-totalities',      icon: '◇', title: 'Totalities',      desc: 'Whole-system organizing principles.' },
    { id: 'browse-regime-content',  icon: '▣', title: 'Regime',          desc: 'Empirically-confirmed regimes.' },
    { id: 'browse-programs',        icon: '⚙', title: 'Programs',        desc: 'Experimental programs — collaborations, surveys.' },
  ];
  menu.innerHTML = tabs.map(t => {
    const active = (state.activePanel === t.id);
    return `<div class="menu-tab${active ? ' active' : ''}" data-tab="${esc(t.id)}" role="menuitem" tabindex="0">
      <span class="tab-icon">${esc(t.icon)}</span>
      <div class="menu-tab-block">
        <span>${esc(t.title)}</span>
        <span class="tab-desc">${esc(t.desc)}</span>
      </div>
    </div>`;
  }).join('');
  menu.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', () => {
      switchSidebarPanel(el.dataset.tab);
    });
  });
}

// =============================================================
//   Browse classifications — sidebar catalogue panel (Update B)
//   Type-ahead search at the top, sectored list of FCs below. Peer with
//   the five discourse-type catalogue panels.
// =============================================================
function renderSidebarBrowseClassifications(filter) {
  const inner = document.getElementById('sidebar-inner');
  const q = (filter || '').toLowerCase().trim();
  const groups = {};
  for (const fc of FCS) {
    if (q) {
      const hay = (fc.symbol + ' ' + fc.label + ' ' + fc.short_label + ' ' + fc.sector + ' ' + fc.subtype).toLowerCase();
      if (!hay.includes(q)) continue;
    }
    const k = fc.sector;
    if (!groups[k]) groups[k] = [];
    groups[k].push(fc);
  }
  const orderedKeys = SECTORS.filter(s => groups[s]).concat(
    Object.keys(groups).filter(k => !SECTORS.includes(k))
  );
  const totalShown = orderedKeys.reduce((s, k) => s + groups[k].length, 0);

  const searchBar = `
    <div class="sb-classif-search">
      <input type="search" id="sb-classif-search-input" placeholder="filter by symbol, name, or sector…" value="${esc(filter || '')}" autocomplete="off" spellcheck="false">
    </div>
  `;

  let body;
  if (orderedKeys.length === 0) {
    body = `<div class="dx-edge-empty">no matches for "<em>${esc(filter)}</em>"</div>`;
  } else {
    body = orderedKeys.map(sector => `
      <div class="dx-browse-group">
        <div class="dx-browse-group-head">${esc(sector)} <span class="dx-browse-group-ct">(${groups[sector].length})</span></div>
        ${groups[sector].map(fc => `
          <div class="dx-browse-item sb-classif-item" data-fc-jump="${esc(fc.id)}" role="button" tabindex="0">
            <span class="sb-classif-sym sb-classif-sym-${esc(fc.category)}">${esc(fc.symbol)}</span>
            <span class="dx-browse-name">${esc(fc.label)}</span>
            <span class="sb-classif-counts">${fc.cell_count}c · ${fc.prediction_count}p</span>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>All classifications <span class="dx-section-ct">· ${FCS.length}</span></h3>
      <div class="sec-sub">The ${FCS.length} formal classifications in v34, searchable and grouped by sector. ${q ? `Showing <strong>${totalShown}</strong> matches.` : 'Click any to open its detail card.'}</div>
      ${searchBar}
      ${body}
    </div>
  `;

  // Wire FC-jump items
  inner.querySelectorAll('[data-fc-jump]').forEach(el => {
    el.addEventListener('click', () => selectFC(el.dataset.fcJump));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectFC(el.dataset.fcJump); }
    });
  });
  // Wire search input
  const searchEl = document.getElementById('sb-classif-search-input');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.searchQuery = searchEl.value;
      // Re-render in place and refocus the input (cursor jumps to end is acceptable here)
      renderSidebarBrowseClassifications(searchEl.value);
      const next = document.getElementById('sb-classif-search-input');
      if (next) {
        next.focus();
        // Preserve cursor at end
        const v = next.value; next.value = ''; next.value = v;
      }
    });
    // Focus on first render so the search is immediately usable from the toolbar click
    setTimeout(() => searchEl.focus(), 0);
  }
}
function openBrowseMenu() {
  buildBrowseMenu('');
  document.getElementById('browse-menu').classList.add('open');
  document.getElementById('browse-btn').classList.add('active');
}
function closeBrowseMenu() {
  document.getElementById('browse-menu').classList.remove('open');
  document.getElementById('browse-btn').classList.remove('active');
}
function wireBrowseDropdown() {
  const btn = document.getElementById('browse-btn');
  const menu = document.getElementById('browse-menu');
  const wrap = document.getElementById('browse-wrap');
  if (!btn || !menu || !wrap) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (menu.classList.contains('open')) closeBrowseMenu();
    else openBrowseMenu();
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.classList.contains('open')) return;
    if (wrap.contains(e.target)) return;
    closeBrowseMenu();
  });
  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeBrowseMenu();
      e.stopPropagation();
    }
  });
}

// =============================================================
//   Boot
// =============================================================
async function init() {
  // First: fetch and augment the canonical dataset.
  // Show a sidebar "loading" line while the network request is in flight.
  document.getElementById('sidebar-inner').innerHTML = `
    <div class="sidebar-section">
      <h3 class="muted">Loading dataset…</h3>
      <div style="font-size:12.5px;color:var(--ink-mute);line-height:1.5">
        Fetching <code style="font-family:'JetBrains Mono',monospace;background:var(--paper-3);padding:1px 4px">data/Map_v34_consolidated.json</code> from the repo. This may take a couple of seconds on first load.
      </div>
    </div>`;
  document.getElementById('pt-content').innerHTML =
    `<div style="padding:80px 20px;text-align:center;color:var(--ink-mute);font-style:italic">Loading the periodic table…</div>`;

  try {
    const { data: raw, url } = await fetchCanonicalData();
    DATA = augmentDataset(raw);
    FCS = DATA.formal_classifications;
    FC_BY_ID = Object.fromEntries(FCS.map(f => [f.id, f]));
    SECTORS = DATA.sectors;
    STATUSES = DATA.prediction_statuses;
    // Update C — populate glossary indexes once DATA.glossary is available
    if (typeof buildGlossaryIndexes === 'function') buildGlossaryIndexes();
  } catch (err) {
    console.error('[map] failed to load canonical data:', err);
    renderFatalError('Could not load the physics-map dataset.', err && err.message ? err.message : err);
    return;
  }

  const m = DATA._meta.counts;
  // E0d — masthead subtitle in the Mendeleev frame (MENDELEEV_FRAME.md
  // §1/§2/§6; wording maintainer-approved). The frame sentence leads; the
  // data counts are demoted to a faint second line. This is the one E0
  // move on the actual first-impression surface, since the default landing
  // view is the open-questions view rather than this tile grid. All four
  // moves are legible and M2/M3 read as moves the map ENABLES ("yours to
  // run"), per the substrate-contained / substrate-enabled distinction.
  const subtitleEl = document.getElementById('header-subtitle');
  if (subtitleEl) {
    subtitleEl.innerHTML =
      '<span class="subtitle-frame">Each classification lays physical content along its own axes; '
      + 'build a cross-section across several and structurally-missing entries and recurring structure '
      + 'surface the way the gaps at gallium and germanium did. The map keeps the organization anchored '
      + 'to the literature, so the pattern-finding and the tests of candidate unification frameworks are '
      + 'yours to run; experimental coverage is tracked alongside.</span>'
      + '<span class="subtitle-counts">'
      + m.formal_classifications + ' classifications · ' + m.cells + ' cells · '
      + m.predictions + ' predictions · ' + m.falsifications + ' falsifications</span>';
  }
  const headerVersionEl = document.getElementById('header-version');
  if (headerVersionEl && DATA._meta.dataset_version) {
    headerVersionEl.textContent = DATA._meta.dataset_version;
  }

  wireToolbar();
  wireSplitter();
  wireBrowseDropdown();
  wireMapDragPan();
  wireSidebarQuickBar();

  // Cell-content search (Update A)
  const searchInput = document.getElementById('cell-search-input');
  if (searchInput) {
    let debounce = null;
    const runSearch = () => {
      const q = searchInput.value;
      state.activePanel = 'search';
      state.selectedFC = null;
      state.selectedCell = null;
      renderSidebarSearch(q);
    };
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(runSearch, 120);
    });
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() && state.activePanel !== 'search') {
        runSearch();
      }
    });
  }

  document.getElementById('btn-help').addEventListener('click', () => {
    document.getElementById('help-overlay').classList.add('show');
  });
  document.getElementById('help-close').addEventListener('click', () => {
    document.getElementById('help-overlay').classList.remove('show');
  });
  document.getElementById('help-overlay').addEventListener('click', e => {
    if (e.target.id === 'help-overlay') document.getElementById('help-overlay').classList.remove('show');
  });

  document.getElementById('btn-refresh').addEventListener('click', refreshFromServer);

  document.getElementById('zoom-in').addEventListener('click', zoomIn);
  document.getElementById('zoom-out').addEventListener('click', zoomOut);
  document.getElementById('zoom-reset').addEventListener('click', zoomFitToView);

  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    const grid = document.getElementById('body-grid');
    const collapsed = grid.classList.toggle('sidebar-collapsed');
    state.sidebarCollapsed = collapsed;
    document.getElementById('sidebar-toggle').textContent = collapsed ? '‹' : '›';
    document.getElementById('sidebar-toggle').title = collapsed ? 'Show sidebar' : 'Hide sidebar';
    setTimeout(() => { if (state.overlay === 'phen-phen') drawPhenPhenOverlay(); }, 220);
  });

  document.addEventListener('keydown', e => {
    if (document.getElementById('help-overlay').classList.contains('show')) {
      if (e.key === 'Escape') document.getElementById('help-overlay').classList.remove('show');
      return;
    }
    if (e.key === 'Escape') { clearSelection(); return; }
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === '+' || e.key === '=') { zoomIn(); e.preventDefault(); }
    else if (e.key === '-' || e.key === '_') { zoomOut(); e.preventDefault(); }
    else if (e.key === '0') { zoomFitToView(); e.preventDefault(); }
    else if (e.key === 'f' || e.key === 'F') { zoomFitToView(); e.preventDefault(); }
  });

  window.addEventListener('resize', () => {
    if (state.overlay === 'phen-phen') setTimeout(drawPhenPhenOverlay, 60);
  });

  parseHash();
  syncToolbarChips();
  applyZoom();
  renderAll();
  // After the first render settles, fit the map to the viewport so the user
  // sees everything at once (Update A.1 — answering "the whole map should be
  // able to be seen at once by zooming out").
  setTimeout(() => {
    if (!state.selectedFC && location.hash.indexOf('zoom=') < 0) {
      zoomFitToView();
    }
  }, 80);
}