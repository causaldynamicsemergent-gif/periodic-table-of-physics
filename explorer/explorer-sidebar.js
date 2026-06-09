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
      <div class="sb-page-title">Legend</div>
      <div class="sb-page-sub">
        How to read every tile on the map. Each tile is a <em>formal classification</em> with five visual signals: category stripe, symbol, cell count, predictive-yield bar, closure mark.
      </div>
      <div class="start-actions" style="margin-top:10px">
        <button type="button" class="start-action" data-open-help title="Open the labeled tile diagram">
          <span class="start-action-ico">▦</span>
          <span class="start-action-text">
            <span class="start-action-title">How to read a tile</span>
          </span>
        </button>
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
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.7;color:var(--ink-soft)">
        <span style="color:var(--ink);font-size:15.5px;margin-right:4px">■</span>complete-within-domain<br>
        <span style="color:var(--ink);font-size:15.5px;margin-right:4px">◐</span>partial<br>
        <span style="color:var(--ink);font-size:15.5px;margin-right:4px">□</span>conjectural
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

    ${(() => {
      // Layer toggles — each is a real on/off switch with its state visible
      // (a dark chip = on) and a one-line description of what it changes on
      // the map, so there is never a mystery about which button did what.
      const adeOn = (typeof sharedAxisMembers === 'function' && state.tileSpotlight)
        ? (() => { const ms = sharedAxisMembers('cartan-type'); return ms.length > 0 && ms.every(id => state.tileSpotlight.has(id)); })()
        : false;
      const items = [
        { key: 'falsified',    on: state.spotlightActive.has('falsified'),
          label: '⚠ falsified predictions',
          desc:  'lights every tile holding a falsified prediction and dims the rest' },
        { key: 'confirmed',    on: state.spotlightActive.has('confirmed'),
          label: '✓ confirmed predictions',
          desc:  'lights every tile holding a confirmed prediction and dims the rest' },
        { key: 'overlay-phen', on: !!(state.overlayActive && state.overlayActive.has('phen-phen')),
          label: '↔ phenomenon arrows',
          desc:  'draws arrows on the map between related phenomena (compact astro objects is the hub)' },
        { key: 'overlay-cross', on: !!(state.overlayActive && state.overlayActive.has('cross-class')),
          label: '⇢ cross-classification arrows',
          desc:  'draws the derives-from / specializes / … edges between classifications on the map' },
        { key: 'ade-axis',     on: adeOn,
          label: '✦ ADE quintet (shared axes)',
          desc:  'lights the five ADE tiles via their shared cartan-type axis — axis names inside any record do the same on click' },
        { key: 'cross-grid',   on: state.group === 'cross',
          label: '⊞ sector × category grid',
          desc:  'reshapes the map: rows = sector, columns = category; hatched cells are recorded gaps' },
      ];
      return `
    <div class="sidebar-section">
      <h3>Layer toggles</h3>
      <div class="sec-sub">Click to switch a layer on, click again to switch it off. A dark chip is currently <strong>on</strong>.</div>
      <div style="display:flex;flex-direction:column;gap:2px">
        ${items.map(it => `
          <button class="tb-chip qs-chip${it.on ? ' active' : ''}" data-quick="${it.key}" style="text-align:left;padding:5px 9px">${esc(it.label)}${it.on ? ' · on' : ''}</button>
          <div class="qs-desc">${esc(it.desc)}</div>
        `).join('')}
      </div>
      <div class="tip-card" style="margin-top:10px">
        Moving around, the menus, and the keyboard shortcuts are all on <button type="button" class="ap-recipe-jump" data-panel-jump="navigate">how to navigate →</button>
      </div>
    </div>
  `;
    })()}
  `;
  inner.querySelectorAll('[data-quick]').forEach(b => {
    b.addEventListener('click', () => {
      const v = b.dataset.quick;
      if (v === 'falsified' || v === 'confirmed') {
        // Toggle the status spotlight on/off.
        if (state.spotlightActive.has(v)) state.spotlightActive.delete(v);
        else state.spotlightActive.add(v);
      }
      else if (v === 'overlay-phen' || v === 'overlay-cross') {
        // Toggle an arrow overlay on/off.
        const layer = v === 'overlay-phen' ? 'phen-phen' : 'cross-class';
        if (!state.overlayActive) state.overlayActive = new Set();
        if (state.overlayActive.has(layer)) {
          state.overlayActive.delete(layer);   // lit lines survive the toggle (dim is visible-relative)
        } else {
          state.overlayActive.add(layer);
        }
      }
      else if (v === 'ade-axis') {
        // lightSharedAxis is itself a toggle (and renders + toasts).
        if (typeof lightSharedAxis === 'function') lightSharedAxis('cartan-type');
        syncToolbarChips();
        writeHash();
        renderSidebarDefault();   // refresh chip states
        return;
      }
      else if (v === 'cross-grid') {
        const turningOn = state.group !== 'cross';
        state.group = turningOn ? 'cross' : 'sector';
        if (typeof showToast === 'function') {
          showToast(turningOn
            ? 'cross-grid on: rows = sector, columns = category — the hatched cells are recorded gaps'
            : 'cross-grid off — back to plain sector rows');
        }
      }
      syncToolbarChips();
      writeHash();
      renderMap();
      renderSidebarDefault();     // refresh chip states
    });
  });
  // UX batch 2 (fix 4) — the keyboard card moved to the navigate page;
  // the pointer to it is a panel-jump, so wire those here too.
  wirePanelJumps(inner);
}

// =============================================================
//   Sidebar: Start hub + How to navigate (UX batch 2, fixes 1 + 4)
// =============================================================
// The Start hub is the instructional home: the guided tour, the
// how-to-read diagram, and the how-to-navigate page, as three large
// actions. "Start here" in the header, the ▶ Start quick-bar button,
// and the Help menu all land here or on its children.
function renderSidebarStart() {
  const inner = document.getElementById('sidebar-inner');
  const m = (typeof DATA !== 'undefined' && DATA && DATA._meta && DATA._meta.counts) ? DATA._meta.counts : null;
  inner.innerHTML = `
    <div class="sidebar-section">
      <div class="sb-page-title">Start here</div>
      <div class="sb-page-sub">A map of where physics has organised itself into formal classifications${m ? ` — ${m.formal_classifications} of them, ${m.cells} cells, ${m.predictions} predictions` : ''}. Three ways in:</div>
      <div class="start-actions">
        <button type="button" class="start-action start-action-primary" id="start-tour-btn" title="A click-through walk over the live page — every control, spotlighted in place">
          <span class="start-action-ico">▶</span>
          <span class="start-action-text">
            <span class="start-action-title">Take the tour</span>
            <span class="start-action-desc">Two minutes, click-through. Each feature lights up on the page itself, in place.</span>
          </span>
        </button>
        <button type="button" class="start-action" data-open-help title="Open the labeled tile diagram">
          <span class="start-action-ico">▦</span>
          <span class="start-action-text">
            <span class="start-action-title">How to read a tile</span>
          </span>
        </button>
        <button type="button" class="start-action" data-panel-jump="navigate" title="Moving around, the menus, and the keyboard shortcuts">
          <span class="start-action-ico">⌖</span>
          <span class="start-action-text">
            <span class="start-action-title">How to navigate</span>
            <span class="start-action-desc">Pan, zoom, drill into records, resize the panels — and the keyboard shortcuts.</span>
          </span>
        </button>
      </div>
    </div>
    <div class="sidebar-section">
      <h3>Then, when you're oriented</h3>
      <div class="ap-jumps">
        <button class="ap-jump" data-panel-jump="about">
          <span class="jump-num">01</span>
          <span class="jump-text">
            <span class="jump-title">About the map</span>
            <span class="jump-desc">What it is, who it serves, what it's for — and what it isn't.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-panel-jump="legend">
          <span class="jump-num">02</span>
          <span class="jump-text">
            <span class="jump-title">The legend</span>
            <span class="jump-desc">Every colour and mark, with the layer toggles.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-panel-jump="builder">
          <span class="jump-num">03</span>
          <span class="jump-text">
            <span class="jump-title">Build a cross-section</span>
            <span class="jump-desc">The map's central move — it has its own tutorial inside.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
      </div>
    </div>
  `;
  wirePanelJumps(inner);
  const tourBtn = document.getElementById('start-tour-btn');
  if (tourBtn) tourBtn.addEventListener('click', () => {
    if (typeof startTour === 'function') startTour('main');
  });
}

// How to navigate — every way of moving around the explorer, in one
// place, including the keyboard card that used to sit on the legend.
function renderSidebarNavigate() {
  const inner = document.getElementById('sidebar-inner');
  inner.innerHTML = `
    <div class="sidebar-section">
      <div class="sb-page-title">How to navigate</div>
      <div class="sb-page-sub">The map stays on the left; everything you click opens here on the right. These are all the ways of moving around.</div>
      <div class="nav-how">
        <div class="nav-how-row"><span class="nav-how-ico">✥</span><div class="nav-how-body">
          <div class="nav-how-title">Move the map</div>
          <div class="nav-how-text">Drag the background to pan. Scroll or pinch to zoom, anchored on your cursor. The − / + buttons zoom too; ⛶ fits the whole map to the page.</div>
        </div></div>
        <div class="nav-how-row"><span class="nav-how-ico">▦</span><div class="nav-how-body">
          <div class="nav-how-title">Drill in, walk back</div>
          <div class="nav-how-text">Click a tile → its full record opens here. Click a cell inside → one level deeper. The breadcrumb at the top of the record walks you back; × or <span class="tip-key">Esc</span> clears the selection. A plain click on the map background also clears any highlights.</div>
        </div></div>
        <div class="nav-how-row"><span class="nav-how-ico">▾</span><div class="nav-how-body">
          <div class="nav-how-title">The menus</div>
          <div class="nav-how-text"><strong>Browse</strong> catalogues everything; <strong>Analyse</strong> holds the comparison surfaces; <strong>View</strong> regroups the map's rows and columns; <strong>Tools</strong> has spotlights, overlays, and "copy link to this view" — the way to save your progress. Menus close when you click anywhere else.</div>
        </div></div>
        <div class="nav-how-row"><span class="nav-how-ico">⇄</span><div class="nav-how-body">
          <div class="nav-how-title">Resize and hide this panel</div>
          <div class="nav-how-text">Drag the divider between map and sidebar to resize — the width is remembered. The › tab on the divider hides the sidebar entirely; click ‹ to bring it back.</div>
        </div></div>
        <div class="nav-how-row"><span class="nav-how-ico">↶</span><div class="nav-how-body">
          <div class="nav-how-title">Undo and reset</div>
          <div class="nav-how-text">↶ undoes map changes step by step. ⟲ (or the quick-bar Reset above) returns everything to the default: default view, every layer off, fit to page.</div>
        </div></div>
        <div class="nav-how-row"><span class="nav-how-ico">⌨</span><div class="nav-how-body">
          <div class="nav-how-title">Keyboard</div>
          <div class="nav-how-text"><span class="tip-key">Esc</span> clear · <span class="tip-key">+</span>/<span class="tip-key">−</span> zoom · <span class="tip-key">0</span> or <span class="tip-key">f</span> fit-to-view.</div>
        </div></div>
      </div>
      <div class="start-actions" style="margin-top:14px">
        <button type="button" class="start-action" id="nav-tour-btn" title="See each of these in place on the page">
          <span class="start-action-ico">▶</span>
          <span class="start-action-text">
            <span class="start-action-title">See it in place — take the tour</span>
            <span class="start-action-desc">The same ground, walked click-by-click on the live page.</span>
          </span>
        </button>
      </div>
    </div>
  `;
  wirePanelJumps(inner);
  const tourBtn = document.getElementById('nav-tour-btn');
  if (tourBtn) tourBtn.addEventListener('click', () => {
    if (typeof startTour === 'function') startTour('main');
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
        <div class="bld-cta-desc">Lay two or more classifications along a shared axis and read off the recurrences and gaps the combined structure implies.</div>
        <div class="bld-cta-go">open the builder →</div>
      </button>
      <h3>About the map</h3>
      <p class="ap-lead">A map of where physics has organised itself into <em>formal classifications</em> — the Standard Model's particle table, the ten-fold way, Freed-Hopkins anomalies, and dozens more — assembled in one place for the first time. It sits upstream of discovery: it helps you decide where to point attention, not what you'll find.</p>
      <p class="ap-text" style="color:var(--ink-mute);font-size:14.5px">${(typeof DATA !== 'undefined' && DATA && DATA._meta && DATA._meta.counts) ? (DATA._meta.counts.formal_classifications + ' classifications · ' + DATA._meta.counts.cells + ' cells · ' + DATA._meta.counts.predictions + ' predictions · ' + DATA._meta.counts.falsifications + ' falsifications') : ''}</p>

      <button class="ap-section ap-section-btn" id="ap-how-to-read" data-open-help type="button" title="Open the labeled tile diagram">How to read a tile <span class="ap-section-go">open the diagram →</span></button>
      <p class="ap-text">Left stripe = <strong>category</strong> (blue structural · amber hybrid · green phenomenon). Bottom bar = <strong>predictive yield</strong> (green confirmed · amber tension · gray untested · red falsified · purple retro). Corner: cell count, ⚠ if falsified predictions live inside. The <strong>?</strong> chip flips the tile to its open questions.</p>
      <div class="ap-jumps">
        <button class="ap-jump" data-open-help>
          <span class="jump-num">▦</span>
          <span class="jump-text">
            <span class="jump-title">How to read a tile</span>
            <span class="jump-desc">Every mark, labeled on a diagram of a real tile.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
      </div>

      <div class="ap-section" id="ap-who-it-serves">Who it serves</div>
      <p class="ap-text">One capability — making the cross-domain structure of physics explicit — in three modes. <strong>Students</strong>: orientation. <strong>Researchers</strong>: scouting bridges between distant areas. <strong>Professors</strong>: synthesis, teaching, steering students toward ripe problems.</p>
      <div class="ap-jumps">
        <button class="ap-jump" data-panel-jump="education">
          <span class="jump-num">01</span>
          <span class="jump-text">
            <span class="jump-title">For education</span>
            <span class="jump-desc">What physics knows and what it doesn't, on one screen.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
        <button class="ap-jump" data-panel-jump="research">
          <span class="jump-num">02</span>
          <span class="jump-text">
            <span class="jump-title">For research</span>
            <span class="jump-desc">Scouting and direction-setting across disciplines.</span>
          </span>
          <span class="jump-arrow">→</span>
        </button>
      </div>

      <div class="ap-section">What it's for</div>
      <ul class="ap-list">
        <li><strong>Cross-subfield navigation</strong> — shared machinery between distant classifications, made visible.</li>
        <li><strong>Auditing predictive yield</strong> — confirmed, contested, untested, falsified, in one glance.</li>
        <li><strong>Locating a problem</strong> — the classifications and cells that bear on your frontier.</li>
      </ul>

      <div class="ap-section">What it isn't</div>
      <p class="ap-text">Not a textbook, not complete, not predictive of which programs will succeed. Every placement carries an explicit rationale you can audit — and disagree with.</p>

      <div class="ap-section">Query recipes</div>
      <p class="ap-text">Six question patterns the catalogue answers — worked examples in <a class="ap-recipes-doclink" href="https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics/blob/main/methodology/QUERY_RECIPES.md" target="_blank" rel="noopener">QUERY_RECIPES.md</a>.</p>
      <ul class="ap-list ap-recipes">
        <li><strong>Which programs target this open question?</strong> <button class="ap-recipe-jump" data-panel-jump="browse-frontiers">browse frontiers →</button></li>
        <li><strong>Where does the same entity classify in two frameworks?</strong> <button class="ap-recipe-jump" data-panel-jump="browse-classifications">browse classifications →</button></li>
        <li><strong>If this question resolves one way, what gets forced?</strong> <button class="ap-recipe-jump" data-panel-jump="browse-frontiers">browse frontiers →</button></li>
        <li><strong>Which experiments adjudicate between competing predictions?</strong> <button class="ap-recipe-jump" data-panel-jump="discriminating">compare programs →</button></li>
        <li><strong>What characteristic scales are recorded?</strong> <button class="ap-recipe-jump" data-panel-jump="ranks">scales →</button></li>
        <li><strong>Which predictions are recorded as falsified?</strong> <button class="ap-recipe-jump" data-spotlight="falsified">spotlight falsified →</button></li>
      </ul>
      <p class="ap-text" style="margin-top: 14px;"><a class="ap-recipes-doclink" href="https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics/tree/main/methodology" target="_blank" rel="noopener">Worked example sessions →</a></p>
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
      <p class="ap-text">This is not a chart you memorize. The useful thing is the bottom-of-tile bar — the predictive yield. Physics teaching usually shows the settled parts in isolation. Here you see them next to what's still being tested, what's contested, and what's already been ruled out. Knowing which is which is half of learning the subject.</p>

      <div class="ap-section">First pass — where to start</div>
      <div class="ap-jumps">
        <button class="ap-jump" data-fc-jump="sm-rep-content">
          <span class="jump-num">01</span>
          <span class="jump-text">
            <span class="jump-title">Open the Standard Model</span>
            <span class="jump-desc">Every elementary particle, organised by the rules governing it.</span>
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
      <p class="ap-lead">For working researchers, professors, grad students, and grant writers: physics's formal structural content, assembled and cross-referenced. The map as a structural lens on where productive work sits.</p>

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
      <p class="ap-text">The dataset (83 nodes, 232 edges, 484 cells, 209 predictions, 17 falsifications, 40 experimental-coverage relations, 288 characteristic scales) is queryable via the live read-only server at <code style="font-family:'JetBrains Mono',monospace;background:var(--paper-3);padding:1px 4px">map-of-physics.eddie-8e5.workers.dev</code>. 33 tools cover cell-content search, prediction filtering, cross-classification traversal, experimental-coverage lookup, characteristic-scale ranking by dimension, conditional-consequence lookup on open frontiers, and program-pair shared-coverage queries.</p>

      <p class="ap-text" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--rule-soft); font-style: italic; color: var(--ink-mute);">The map's success condition is whether the cuts the taxonomy makes organize work productively and reveal connections that weren't visible before. Whether they also carry predictive power is an open question the project treats as unproven rather than assumed. That's the test the project welcomes — challenge any edge status or classification placement via the GitHub repo.</p>
    </div>
  `;
  wirePanelJumps(inner);
}

function wirePanelJumps(root) {
  root.querySelectorAll('[data-panel-jump]').forEach(el => {
    el.addEventListener('click', () => switchSidebarPanel(el.dataset.panelJump));
  });
  root.querySelectorAll('[data-open-help]').forEach(el => {
    el.addEventListener('click', () => {
      const ov = document.getElementById('help-overlay');
      if (ov) ov.classList.add('show');
    });
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
      // UX pass — overlay layers are independent toggles in a set
      if (!state.overlayActive) state.overlayActive = new Set();
      const v = el.dataset.overlay;
      if (state.overlayActive.has(v)) {
        state.overlayActive.delete(v);
        if (typeof clearOverlayLayerLit === 'function') clearOverlayLayerLit(v);
      } else {
        state.overlayActive.add(v);
      }
      syncToolbarChips();
      writeHash();
      renderMap();
      showToast(`Overlay ${v}: ${state.overlayActive.has(v) ? 'on' : 'off'}`);
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
// Search results are an accordion, not a link list: clicking a result
// unfolds its full record inline (scrollable) and clicking again folds
// it — the results list never disappears under you. The ↗ on each row
// is the explicit "open the full page" action. Same pattern as the
// overlay-lines and Browse panels. Expansion state survives re-renders.
const _csrExpanded = new Set();        // fcId::cellId of unfolded results
const _csrGroupCollapsed = new Set();  // fcIds whose match list is folded

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
    const folded = _csrGroupCollapsed.has(fc.id);
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
      const key = fc.id + '::' + c.cell_id;
      const exp = _csrExpanded.has(key);
      const axes = Object.entries(c.axis_values || {});
      const examples = (c.realized_examples || []).filter(Boolean);
      return `<div class="csr-cell${exp ? ' sbc-open' : ''}" data-fc="${esc(fc.id)}" data-cell="${esc(c.cell_id)}" role="button" tabindex="0" aria-expanded="${exp}" title="Click to unfold this result here; ↗ opens the full record">
        <span class="csr-cell-id">${esc(c.cell_id)}</span>
        ${highlight(snippet, q)}
        <span class="sbc-chev">${exp ? '▾' : '▸'}</span>
        <button type="button" class="csr-open" data-csr-open data-fc="${esc(fc.id)}" data-cell="${esc(c.cell_id)}" title="Open this cell's full record">↗</button>
      </div>
      <div class="sbc-detail csr-detail" data-csr-detail="${esc(key)}"${exp ? '' : ' hidden'}>
        <div class="sbc-detail-inner">
          <div class="csr-detail-content">${highlight(String(c.content || ''), q)}</div>
          ${axes.length ? `<div class="csr-detail-axes">${axes.map(([k, v]) => `<span class="csr-axis"><span class="csr-axis-k">${esc(k)}</span> ${esc(String(v))}</span>`).join('')}</div>` : ''}
          ${examples.length ? `<div class="csr-detail-ex"><span class="csr-axis-k">realized examples</span> ${examples.map(esc).join(' · ')}</div>` : ''}
          <button type="button" class="csr-detail-openfull" data-csr-open data-fc="${esc(fc.id)}" data-cell="${esc(c.cell_id)}">open the full record ↗</button>
        </div>
      </div>`;
    }).join('');
    const overflow = cellMatches.length > 10 ? `<div style="font-size:13.5px;color:var(--ink-mute);font-style:italic;padding:4px 8px">+${cellMatches.length - 10} more — open the tile (↗) for the full list.</div>` : '';
    return `<div class="csr-group">
      <div class="csr-group-head${folded ? '' : ' sbc-open'}" data-csr-group="${esc(fc.id)}" role="button" tabindex="0" aria-expanded="${!folded}" title="Click to fold/unfold this group's matches; ↗ opens the classification">
        <span class="group-sym">${esc(fc.symbol)}</span>
        <span>${esc(fc.label)}</span>
        <span class="group-ct">${cellMatches.length} match${cellMatches.length===1?'':'es'}</span>
        <span class="sbc-chev">${folded ? '▸' : '▾'}</span>
        <button type="button" class="csr-open" data-csr-fc-open="${esc(fc.id)}" title="Open this classification's full record">↗</button>
      </div>
      ${folded ? '' : (cellsHtml || '') + overflow}
    </div>`;
  }).join('');

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Search</h3>
      <div class="csr-summary">Searching for <strong>${esc(query)}</strong> — <strong>${totalCells}</strong> cell match${totalCells===1?'':'es'} across <strong>${fcIds.length}</strong> classification${fcIds.length===1?'':'s'}.</div>
      ${groupsHtml}
    </div>
  `;

  // Rows unfold in place; only ↗ navigates to the full record.
  inner.querySelectorAll('.csr-cell[data-cell]').forEach(el => {
    const key = el.dataset.fc + '::' + el.dataset.cell;
    const onToggle = () => {
      const detail = inner.querySelector(`[data-csr-detail="${CSS.escape(key)}"]`);
      const nowOpen = !_csrExpanded.has(key);
      if (nowOpen) _csrExpanded.add(key); else _csrExpanded.delete(key);
      if (detail) detail.hidden = !nowOpen;
      el.classList.toggle('sbc-open', nowOpen);
      el.setAttribute('aria-expanded', String(nowOpen));
      const chev = el.querySelector('.sbc-chev');
      if (chev) chev.textContent = nowOpen ? '▾' : '▸';
    };
    el.addEventListener('click', onToggle);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
    });
  });
  inner.querySelectorAll('[data-csr-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      selectCell(btn.dataset.fc, btn.dataset.cell);
    });
  });
  inner.querySelectorAll('.csr-group-head[data-csr-group]').forEach(el => {
    const id = el.dataset.csrGroup;
    const onToggle = () => {
      if (_csrGroupCollapsed.has(id)) _csrGroupCollapsed.delete(id);
      else _csrGroupCollapsed.add(id);
      renderSidebarSearch(state.searchQuery);
    };
    el.addEventListener('click', onToggle);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
    });
  });
  inner.querySelectorAll('[data-csr-fc-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      selectFC(btn.dataset.csrFcOpen);
    });
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
    case 'start':                  renderSidebarStart();        break; // UX batch 2 — instructional hub
    case 'navigate':               renderSidebarNavigate();     break; // UX batch 2 — how to navigate
    case 'phenomena':              renderSidebarPhenomena();    break;
    case 'about':                  renderSidebarAbout();        break;
    case 'education':              renderSidebarEducation();    break;
    case 'research':               renderSidebarResearch();     break;
    case 'search':                 renderSidebarSearch(state.searchQuery); break;
    case 'legend':                 renderSidebarDefault();      break;
    case 'spotlight':              renderSidebarSpotlight();    break;   // Update B
    case 'overlay-lines':          if (typeof renderSidebarOverlayLines === 'function') renderSidebarOverlayLines(); else renderSidebarAbout(); break; // UX pass — overlay layers panel
    case 'row-explain':            if (typeof renderSidebarRowExplain === 'function') renderSidebarRowExplain(); else renderSidebarAbout(); break; // UX pass — clickable rows
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
  // UX pass — the quick-bar Reset: layers back to defaults, every lit tile
  // and overlay line off, and the view refit to the whole map. Reuses the
  // reset-layers handler so there is one source of truth for what a reset
  // means, then refits the zoom.
  const resetBtn = document.getElementById('quick-reset-map');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    const layers = document.getElementById('btn-reset-layers');
    if (layers) layers.click();
    if (typeof zoomFitToView === 'function') zoomFitToView();
    if (state.activePanel === 'overlay-lines' && typeof renderSidebarOverlayLines === 'function') {
      renderSidebarOverlayLines();
    }
  });
}

// =============================================================
//   Sidebar: FC detail
// =============================================================
// Tile-flip control, shared by every sidebar surface that shows a
// classification (the FC record header and each Browse-catalogue row).
// One source for the label and one wiring path, so the surfaces can't
// drift out of sync with each other or with the tile's actual state.
function fcFlipLabel(fcId, primary) {
  const frs = (typeof frontiersForFC === 'function') ? frontiersForFC(fcId) : [];
  const flipped = (typeof _flippedTiles !== 'undefined') && _flippedTiles.has(fcId);
  if (primary) {
    // UX batch 2 (fix 6) — users couldn't discover that tiles flip; the
    // FC record's full-width primary action spells the whole move out.
    return flipped ? '⟲ Flip the tile on the map back to its front'
      : (frs.length ? `↻ Flip the tile on the map — ${frs.length} open question${frs.length === 1 ? '' : 's'} on the back`
                    : '↻ Flip the tile on the map — open questions live on the back');
  }
  return flipped ? '⟲ flip the tile back'
    : (frs.length ? `? flip the tile — ${frs.length} open question${frs.length === 1 ? '' : 's'}`
                  : '? flip the tile — open questions');
}
function fcFlipBtnHtml(fcId, primary) {
  const frs = (typeof frontiersForFC === 'function') ? frontiersForFC(fcId) : [];
  const title = frs.length
    ? 'Show this classification\'s open questions on the back of its map tile'
    : 'No open frontiers are recorded as bearing on this classification — the back of the tile says so';
  return `<button type="button" class="dc-flip-btn${primary ? ' dc-flip-primary' : ''}" data-dc-flip="${esc(fcId)}" title="${esc(title)}">${fcFlipLabel(fcId, primary)}</button>`;
}
function wireFcFlipButtons(root) {
  root.querySelectorAll('.dc-flip-btn[data-dc-flip]').forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();   // inside catalogue rows, a plain click expands/lights — flipping must not
      const id = b.dataset.dcFlip;
      if (typeof toggleTileFlip === 'function') toggleTileFlip(id);
      const tile = document.querySelector(`.pt-tile[data-fc="${CSS.escape(id)}"]`);
      // UX fix — was tile.scrollIntoView, which scrolled the map PANE
      // itself; the pane no longer scrolls in map mode (that scroll
      // dragged the topbar and sidebar tab off-screen — the reported
      // glitch). Centering now goes through the map's own pan: the
      // translate is in screen pixels, so the screen-space delta between
      // tile centre and pane centre maps 1:1 onto panX/panY.
      const pane = document.getElementById('map-pane');
      if (tile && pane && typeof state !== 'undefined') {
        const tr = tile.getBoundingClientRect();
        const pr = pane.getBoundingClientRect();
        state.panX += (pr.left + pr.width / 2) - (tr.left + tr.width / 2);
        state.panY += (pr.top + pr.height / 2) - (tr.top + tr.height / 2);
        if (typeof clampPan === 'function') clampPan();
        if (typeof applyZoom === 'function') applyZoom();
      }
      // The FC-record path re-renders its own panel; everywhere else,
      // refresh this button's label in place (matching its variant).
      if (b.isConnected) { b.textContent = fcFlipLabel(id, b.classList.contains('dc-flip-primary')); }
    });
  });
}

function renderSidebarFC(fc) {
  const inner = document.getElementById('sidebar-inner');
  const y = yieldSegments(fc);
  const yieldBar = y.total ? `<div class="dc-yield-bar">${y.html}</div>` : '';
  const yieldCounts = Object.entries(fc.yield_stats).map(([s,n]) =>
    `<span class="yc"><span class="dot" style="background:${STATUS_COLOR[s]}"></span>${esc(STATUS_LABEL[s]||s)}: ${n}</span>`
  ).join('') || '<span class="yc" style="color:var(--ink-mute)">no predictions</span>';

  // Axes — each axis name is a shared-axis lighting trigger: clicking it
  // lights every classification on the map carrying an axis of the same
  // name (the ADE quintet all light up from any one record's cartan-type).
  const axesHtml = (fc.classification_axes || []).map(ax => {
    const sharedCt = (typeof sharedAxisMembers === 'function')
      ? sharedAxisMembers(ax.name).length : 0;
    const axTitle = sharedCt > 1
      ? `Click to light all ${sharedCt} classifications carrying a “${ax.name}” axis on the map — click again to switch off`
      : `Only this classification carries a “${ax.name}” axis — click to light it on the map`;
    return `
    <div class="dc-axis">
      <button type="button" class="ax-name ax-name-btn" data-axis-name="${esc(ax.name)}" title="${esc(axTitle)}">${esc(ax.name)}${sharedCt > 1 ? `<span class="ax-shared-ct">×${sharedCt}</span>` : ''}</button><span class="ax-kind">${esc(ax.kind)}</span>
      ${ax.values && ax.values.length ? `<div class="ax-vals">${ax.values.slice(0,12).map(v => `<span class="ax-val">${esc(String(v))}</span>`).join('')}${ax.values.length > 12 ? `<span class="ax-val" style="color:var(--ink-mute)">+${ax.values.length-12} more</span>`:''}</div>`:''}
    </div>
  `;
  }).join('') || '<em style="color:var(--ink-mute);font-size:14.5px">No axes recorded.</em>';

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
    ? `<button class="btn-ghost" id="show-all-cells" style="margin-top:8px;font-size:13px">show all ${cellsSorted.length} cells</button>`
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
  `).join('') : '<em style="color:var(--ink-mute);font-size:14.5px">No predictions match this filter.</em>';

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
  }).join('') : '<em style="color:var(--ink-mute);font-size:14.5px">No edges.</em>';

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
      ${fcFlipBtnHtml(fc.id, true)}
    </div>

    <div class="sidebar-section">
      <h3>Description</h3>
      ${!fc._has_detailed_header ? `<div class="synthesized-warning">⚠ Synthesized description — click <strong>↻ refresh</strong> in the header for the full record from the live server.</div>` : ''}
      <div class="dc-desc">${formatPara(fc.description)}</div>
      ${fc.domain_of_applicability ? `<div class="dc-desc" style="margin-top:8px"><strong style="font-family:'JetBrains Mono',monospace;font-size:12.5px;color:var(--ink-mute);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:2px">Domain</strong>${esc(fc.domain_of_applicability)}</div>` : ''}
      ${fc.closure_description ? `<div class="dc-desc" style="margin-top:8px"><strong style="font-family:'JetBrains Mono',monospace;font-size:12.5px;color:var(--ink-mute);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:2px">Closure</strong>${esc(fc.closure_description)}</div>` : ''}
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

    ${fc.citations && fc.citations.length ? `<div class="sidebar-section"><h3>Key citations</h3><div style="font-size:14px;line-height:1.6;color:var(--ink-soft);font-family:'JetBrains Mono',monospace">${fc.citations.map(c => `• ${esc(c)}`).join('<br>')}</div></div>` : ''}
    ${fc.cross_cutting_concepts && fc.cross_cutting_concepts.length ? `<div class="sidebar-section"><h3>Cross-cutting concepts</h3><div style="display:flex;flex-wrap:wrap;gap:4px">${fc.cross_cutting_concepts.map(c => `<span class="ax-val">${esc(c)}</span>`).join('')}</div></div>` : ''}
  `;

  // Wire interactions inside sidebar
  inner.querySelector('.crumb-close').addEventListener('click', clearSelection);
  // Shared-axis lighting — axis names light every classification carrying
  // that axis (see lightSharedAxis in explorer-map.js).
  wireFcFlipButtons(inner);
  inner.querySelectorAll('.ax-name-btn[data-axis-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof lightSharedAxis === 'function') lightSharedAxis(btn.dataset.axisName);
    });
  });
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

    ${(cell.description || cell.quantitative_scale) ? `<div class="sidebar-section"><h3>Description</h3>${cell.description ? `<div style="font-size:15.5px;line-height:1.55;color:var(--ink-soft)">${esc(cell.description)}</div>` : ''}${(cell.quantitative_scale && typeof renderQS === 'function') ? `<div class="cell-qs-inline">${renderQS(cell.quantitative_scale, {})}${(typeof renderQSCitations === 'function') ? renderQSCitations(cell.quantitative_scale.citations, { compact: true }) : ''}</div>` : ''}</div>` : ''}

    ${(cell.realized_examples && cell.realized_examples.length) ? `<div class="sidebar-section"><h3>Realized examples</h3><ul style="font-size:15px;line-height:1.5;color:var(--ink-soft);margin:0;padding-left:18px">${cell.realized_examples.map(e => `<li style="margin-bottom:3px">${esc(e)}</li>`).join('')}</ul></div>` : ''}

    ${allPreds.length ? `<div class="sidebar-section"><h3>Predictions for this cell <span style="color:var(--ink-mute);font-weight:400">· ${allPreds.length}</span></h3><div class="dc-preds">${allPreds.map(p => `
      <div class="dc-pred ${p.status || ''}">
        <div class="pred-status ${p.status || ''}">${esc(STATUS_LABEL[p.status] || p.status || 'unknown')}</div>
        <div class="pred-text">${esc(p.prediction || '')}</div>
        ${(p.quantitative_scale && typeof renderQS === 'function') ? `<div class="dc-pred-qs">${renderQS(p.quantitative_scale, {})}</div>` : ''}
        ${p.prediction_citation ? `<div class="pred-meta">predicted: ${esc(p.prediction_citation)}</div>` : ''}
        ${p.confirmation_citation ? `<div class="pred-meta">resolved: ${esc(p.confirmation_citation)}</div>` : ''}
      </div>`).join('')}</div></div>` : ''}

    ${(typeof renderTargetedByTarget === 'function') ? renderTargetedByTarget(cell.cell_id) : ''}

    ${cell.citations && cell.citations.length ? `<div class="sidebar-section"><h3>Citations</h3><div style="font-family:'JetBrains Mono',monospace;font-size:13.5px;line-height:1.6;color:var(--ink-soft)">${cell.citations.map(c => `• ${esc(c)}`).join('<br>')}</div></div>` : ''}
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
  // UX pass — navigating to a classification never leaves its tile behind
  // the dimming layer: with a lit set active, the destination joins it.
  if (state.tileSpotlight && state.tileSpotlight.size && !state.tileSpotlight.has(fcId)) {
    state.tileSpotlight.add(fcId);
  }
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
  state.tileSpotlight = new Set();         // UX pass — clear the highlight/dim layer
  state.edgeSpotlight = new Set();         // UX pass — and the lit phen↔phen lines
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
  // UX batch 2 follow-up — the panel used to stop at a fixed 700px. It
  // now slides out as far as the viewport allows (like Claude's centre
  // divider), keeping only a small sliver of map alive so the way back
  // is always visible.
  const MIN_MAP = 220;
  const maxPanel = () => Math.max(MIN_PANEL, window.innerWidth - MIN_MAP);
  const STORAGE_KEY = 'mop-panel-width';

  // Restore saved width
  try {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || '', 10);
    if (saved && saved >= MIN_PANEL && saved <= maxPanel()) {
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
    if (w > maxPanel()) w = maxPanel();
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
    if (state.overlayActive && state.overlayActive.size) setTimeout(drawPhenPhenOverlay, 0);
  }
  // Keyboard accessibility — left/right arrow keys
  function onKeyDown(e) {
    if (grid.classList.contains('sidebar-collapsed')) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const cur = getComputedStyle(grid).getPropertyValue('--panel-width').trim() || '380px';
    let w = parseInt(cur, 10) || 380;
    w += (e.key === 'ArrowLeft' ? 16 : -16);
    if (w < MIN_PANEL) w = MIN_PANEL;
    if (w > maxPanel()) w = maxPanel();
    grid.style.setProperty('--panel-width', w + 'px');
    try { localStorage.setItem(STORAGE_KEY, String(w)); } catch (e2) {}
    if (state.overlayActive && state.overlayActive.size) setTimeout(drawPhenPhenOverlay, 0);
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
    { id: '__home',                 icon: '⌂', title: 'Home',            desc: 'Back to the start — full map, default panel.' },
    { id: '__questions',            icon: '？', title: 'Open questions',   desc: 'The open frontiers as primary cards — what is unresolved, grouped by why.' },
    { id: 'browse-classifications', icon: '☰', title: 'Classifications', desc: 'All formal classifications, grouped by sector.' },
    { id: 'phenomena',              icon: '◉', title: 'Phenomena',       desc: 'Highlight where each physical thing lives across the map.' },
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
      if (el.dataset.tab === '__home') {
        if (typeof window.navHome === 'function') window.navHome();
        return;
      }
      if (el.dataset.tab === '__questions') {
        if (typeof setActiveView === 'function') setActiveView('questions');
        return;
      }
      switchSidebarPanel(el.dataset.tab);
    });
  });
}

// =============================================================
//   Browse classifications — sidebar catalogue panel (Update B)
//   Type-ahead search at the top, sectored list of FCs below. Peer with
//   the five discourse-type catalogue panels.
// =============================================================
// UX pass — which catalogue rows are unfolded; survives re-renders (search).
const _sbcExpanded = new Set();

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
        ${groups[sector].map(fc => {
          const lit = state.tileSpotlight && state.tileSpotlight.has(fc.id);
          const exp = _sbcExpanded.has(fc.id);
          return `
          <div class="dx-browse-item sb-classif-item${lit ? ' sbc-lit' : ''}${exp ? ' sbc-open' : ''}" data-sbc-fc="${esc(fc.id)}" role="button" tabindex="0" aria-expanded="${exp}">
            <span class="sb-classif-sym sb-classif-sym-${esc(fc.category)}">${esc(fc.symbol)}</span>
            <span class="dx-browse-name">${esc(fc.label)}</span>
            <span class="sb-classif-counts">${fc.cell_count}c · ${fc.prediction_count}p</span>
            <span class="sbc-chev">${exp ? '▾' : '▸'}</span>
          </div>
          <div class="sbc-detail" data-sbc-detail="${esc(fc.id)}"${exp ? '' : ' hidden'}>
            <div class="sbc-detail-inner">
              ${fc.description ? `<div class="sbc-detail-desc">${esc(fc.description)}</div>` : ''}
              <div class="sbc-detail-meta">${esc(fc.sector)} · ${fc.cell_count} cells · ${fc.prediction_count} predictions</div>
              <div class="sbc-detail-actions">
                <button type="button" class="sbc-open-record" data-sbc-open="${esc(fc.id)}">open full record →</button>
                ${fcFlipBtnHtml(fc.id)}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    `).join('');
  }

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>All classifications <span class="dx-section-ct">· ${FCS.length}</span></h3>
      <div class="sec-sub">The ${FCS.length} formal classifications in v34, searchable and grouped by sector. ${q ? `Showing <strong>${totalShown}</strong> matches.` : 'Click a row to light it on the map and unfold its details right here; click again to switch it off. Several can be on at once — the full record is one more click inside.'}</div>
      ${searchBar}
      ${body}
    </div>
  `;

  // UX pass — catalogue rows toggle in place: one click lights the tile on
  // the map (accumulate, the same gesture as clicking the map itself) AND
  // unfolds a scrollable detail block under the row; a second click folds
  // it and switches the tile off. The catalogue never navigates away, so
  // several classifications can be inspected and toggled in one sitting.
  inner.querySelectorAll('[data-sbc-fc]').forEach(el => {
    const id = el.dataset.sbcFc;
    const toggleRow = () => {
      const detail = inner.querySelector(`[data-sbc-detail="${CSS.escape(id)}"]`);
      const nowOpen = !_sbcExpanded.has(id);
      if (nowOpen) _sbcExpanded.add(id); else _sbcExpanded.delete(id);
      if (detail) detail.hidden = !nowOpen;
      el.classList.toggle('sbc-open', nowOpen);
      el.setAttribute('aria-expanded', String(nowOpen));
      const chev = el.querySelector('.sbc-chev');
      if (chev) chev.textContent = nowOpen ? '▾' : '▸';
      if (typeof toggleTileSpotlight === 'function') toggleTileSpotlight(id);
      el.classList.toggle('sbc-lit', !!(state.tileSpotlight && state.tileSpotlight.has(id)));
    };
    el.addEventListener('click', toggleRow);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRow(); }
    });
  });
  wireFcFlipButtons(inner);
  inner.querySelectorAll('[data-sbc-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      selectFC(btn.dataset.sbcOpen);
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
      <div style="font-size:15px;color:var(--ink-mute);line-height:1.5">
        Fetching <code style="font-family:'JetBrains Mono',monospace;background:var(--paper-3);padding:1px 4px">data/Map_v34_consolidated.json</code> from the repo. This may take a couple of seconds on first load.
      </div>
    </div>`;
  document.getElementById('pt-content').innerHTML =
    `<div style="padding:80px 20px;text-align:center;color:var(--ink-mute);font-style:italic">Loading the map…</div>`;

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
  // UX pass — the masthead subtitle was removed from the header; its framing
  // sentence and the data counts now live in the About panel
  // (renderSidebarAbout), keeping the first-impression surface to the title.
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
  // ⛶ fits the map to the page; ⟲ is the comprehensive reset (default
  // view, every layer off, fit to page); ↶ steps the map state backwards.
  const zoomFitBtn = document.getElementById('zoom-fit');
  if (zoomFitBtn) zoomFitBtn.addEventListener('click', zoomFitToView);
  document.getElementById('zoom-reset').addEventListener('click', () => {
    if (typeof resetMapToDefault === 'function') resetMapToDefault();
    else zoomFitToView();
  });
  const undoBtn = document.getElementById('map-undo');
  if (undoBtn) undoBtn.addEventListener('click', () => {
    if (typeof undoMapStep === 'function') undoMapStep();
  });

  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    const grid = document.getElementById('body-grid');
    const collapsed = grid.classList.toggle('sidebar-collapsed');
    state.sidebarCollapsed = collapsed;
    document.getElementById('sidebar-toggle').textContent = collapsed ? '‹' : '›';
    document.getElementById('sidebar-toggle').title = collapsed ? 'Show sidebar' : 'Hide sidebar';
    setTimeout(() => { if (state.overlayActive && state.overlayActive.size) drawPhenPhenOverlay(); }, 220);
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
    if (state.overlayActive && state.overlayActive.size) setTimeout(drawPhenPhenOverlay, 60);
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