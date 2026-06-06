// =============================================================
//   explorer-tour.js — Update F (UX batch 2, fixes 1 + 10)
//
//   A click-through guided tour: dims the page, spotlights one real
//   control at a time with a caption card and Next / Back / Skip.
//   Two tours ship: 'main' (the whole explorer, launched from the
//   Start panel or the Help menu) and 'builder' (launched from the
//   tutorial button at the top of the builder panel).
//
//   Engine rules:
//   - A step names a CSS selector; if the element is missing when the
//     step is reached (e.g. tiles in the questions view), the step is
//     skipped silently — the tour never breaks on a hidden surface.
//   - A step may carry a before() hook that prepares the page (expand
//     the sidebar, open the builder, load the worked example). Hooks
//     reuse the explorer's own functions — the tour drives the real
//     UI, it never fakes it.
//   - Esc, Skip, or finishing all steps tears the overlay down
//     completely. No state is remembered; per the always-start-at-
//     default rule a reload never resumes a tour.
// =============================================================

/* ---------- step hooks ---------- */

function tourEnsureSidebarOpen() {
  var grid = document.getElementById('body-grid');
  if (grid && grid.classList.contains('sidebar-collapsed')) {
    grid.classList.remove('sidebar-collapsed');
    if (typeof state !== 'undefined') state.sidebarCollapsed = false;
    var st = document.getElementById('sidebar-toggle');
    if (st) { st.textContent = '›'; st.title = 'Hide sidebar'; }
  }
}

function tourOpenBuilder() {
  tourEnsureSidebarOpen();
  if (typeof state !== 'undefined' && state.activePanel !== 'builder' && typeof switchSidebarPanel === 'function') {
    switchSidebarPanel('builder');
  }
}

function tourLoadBuilderExample() {
  // Same payload as the "load the worked example" button — the tour
  // narrates a real cross-section, not a mock.
  tourOpenBuilder();
  if (typeof builderState !== 'function' || typeof FC_BY_ID === 'undefined') return;
  var bs = builderState();
  if (bs.fcIds.length < 2) {
    bs.fcIds = ['dark-matter-candidates', 'compact-astrophysical-objects'].filter(function (id) { return FC_BY_ID[id]; });
    bs.axisKey = 'observational-status';
    if (typeof renderSidebarBuilder === 'function') renderSidebarBuilder();
  }
}

/* ---------- tour scripts ---------- */

var TOURS = {
  main: [
    { sel: '#pt-content',
      title: 'The map',
      text: 'Every tile is a formal classification — a Mendeleev-style table physics has built somewhere. Click any tile and its full record opens in the sidebar on the right; the map itself never goes away. Drag the background to pan, scroll to zoom.' },
    { sel: '.pt-tile',
      title: 'Reading one tile',
      text: 'The big symbol names the classification. The left stripe is its category (blue structural · amber hybrid · green phenomenon); the bottom bar is its predictive yield. The small ? chip FLIPS the tile over — its open questions are on the back.' },
    { sel: '#cell-search-input',
      title: 'Find a thing',
      text: 'Type any physical thing — black holes, gluons, light — and jump straight to every cell that holds it, across all classifications.' },
    { sel: '.tb-discourse-tabs',
      title: 'Build a cross-section',
      text: 'The builder lays two or more classifications along a shared axis and reads off recurrences and gaps. It has its own click-through tutorial inside.' },
    { sel: '#browse-wrap',
      title: 'Browse',
      text: 'Catalogues of everything in the map — classifications, frontiers, architectures, programs — grouped by sector, with type-ahead search.' },
    { sel: '#analyse-wrap',
      title: 'Analyse',
      text: 'The analytical surfaces: compare experimental programs, characteristic scales, open frontiers, and more.' },
    { sel: '#zoom-controls',
      title: 'Zoom and reset',
      text: '− / + zoom, ⛶ fits the map to the page, ↶ undoes the last map change, ⟲ resets everything to the default view. Keyboard: + / − / 0 / f.' },
    { sel: '#pt-structure',
      title: 'View',
      text: 'Opens the view toolbox: regroup the map\u2019s rows and columns by sector, category, or closure — all three at once gives the 3-D view.' },
    { sel: '#ps-tools',
      title: 'Tools',
      text: 'Spotlights (light tiles by prediction status), arrow overlays between classifications, and "copy link to this view" — the way to save your progress.' },
    { sel: '#splitter', pad: 6,
      title: 'The divider',
      text: 'Drag it to resize map and sidebar. The › tab beside it hides the sidebar entirely; click it again to bring the panel back.',
      before: tourEnsureSidebarOpen },
    { sel: '#sidebar-quick-bar',
      title: 'Always one click away',
      text: 'Start (this hub), the Legend, the Glossary, and a full map Reset live here permanently — whatever is open in the panel below.',
      before: tourEnsureSidebarOpen },
    { sel: '#feedback-tab',
      title: 'Tell the maintainer',
      text: 'Anything broken, confusing, or missing — the Feedback tab sends it straight in. That\u2019s the end of the tour; the Start panel can replay it any time.' },
  ],

  builder: [
    { sel: '.bld-card',
      title: 'The builder',
      text: 'This panel lays two or more classifications along an axis they share and reads off what the combined structure implies. This tutorial walks a real worked example.',
      before: tourOpenBuilder },
    { sel: '.bld-picker-wrap',
      title: '1 · Pick classifications',
      text: 'Open this dropdown and click two or more classifications (grouped by sector, with a filter box inside). Clicking tiles on the map adds them too.',
      before: tourOpenBuilder },
    { sel: '.bld-selected-row',
      title: '2 · Your selected faces',
      text: 'The classifications you picked appear here — we\u2019ve loaded the worked example (dark matter × compact objects). Click a chip\u2019s × to remove it.',
      before: tourLoadBuilderExample },
    { sel: '.bld-axis-row',
      title: '3 · The shared axis',
      text: 'The map lists only axes these classifications genuinely share — by name or by a recorded axis correspondence. Pick one to lay the faces along it.',
      before: tourLoadBuilderExample },
    { sel: '.bld-recur',
      title: '4 · Recurrences',
      text: 'The same physical entity turning up in more than one classification, with its standing: an established cross-classification edge, a recorded correspondence, or a raw alignment.',
      before: tourLoadBuilderExample },
    { sel: '.bld-lattice-wrap',
      title: '5 · The lattice',
      text: 'Rows are values of the shared axis; columns are your classifications. Every occupant sits at its position — and rows the structure implies but nothing fills are the empty-cell predictions.',
      before: tourLoadBuilderExample },
    { sel: '.bld-legend',
      title: '6 · How to read the verdicts',
      text: 'Each tier — established, recorded, candidate, raw alignment, conjectured, forbidden — is defined here. The map supplies the organized ground; the recognition is yours.',
      before: tourLoadBuilderExample },
    { sel: '.bld-actions',
      title: 'Your turn',
      text: 'Clear the example and lay out your own faces. The worked example is always one click away if you want it back.',
      before: tourLoadBuilderExample },
  ],
};

/* ---------- engine ---------- */

var _tour = null;   // { steps, idx, root, hi, card }

function startTour(name) {
  endTour();
  var steps = TOURS[name];
  if (!steps || !steps.length) return;

  var root = document.createElement('div');
  root.className = 'tour-root';
  root.innerHTML =
    '<div class="tour-highlight"></div>' +
    '<div class="tour-card">' +
      '<div class="tour-card-step"></div>' +
      '<div class="tour-card-title"></div>' +
      '<div class="tour-card-text"></div>' +
      '<div class="tour-card-btns">' +
        '<button type="button" class="tour-btn tour-back">← Back</button>' +
        '<button type="button" class="tour-btn tour-next">Next →</button>' +
        '<button type="button" class="tour-btn tour-skip">Skip tour</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(root);

  _tour = {
    steps: steps, idx: -1, root: root,
    hi: root.querySelector('.tour-highlight'),
    card: root.querySelector('.tour-card'),
  };

  root.querySelector('.tour-next').addEventListener('click', function () { tourStep(+1); });
  root.querySelector('.tour-back').addEventListener('click', function () { tourStep(-1); });
  root.querySelector('.tour-skip').addEventListener('click', endTour);
  document.addEventListener('keydown', tourOnKey);
  window.addEventListener('resize', tourReposition);

  tourStep(+1);
}

function endTour() {
  if (!_tour) return;
  document.removeEventListener('keydown', tourOnKey);
  window.removeEventListener('resize', tourReposition);
  if (_tour.root && _tour.root.parentNode) _tour.root.parentNode.removeChild(_tour.root);
  _tour = null;
}

function tourOnKey(e) {
  if (!_tour) return;
  if (e.key === 'Escape') { e.stopPropagation(); endTour(); }
  else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); tourStep(+1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); tourStep(-1); }
}

// Advance (dir = +1) or retreat (dir = -1), skipping any step whose
// target is absent after its before() hook has run.
function tourStep(dir) {
  if (!_tour) return;
  var i = _tour.idx + dir;
  while (i >= 0 && i < _tour.steps.length) {
    var st = _tour.steps[i];
    if (typeof st.before === 'function') { try { st.before(); } catch (err) { /* keep touring */ } }
    if (document.querySelector(st.sel)) break;
    i += dir;
  }
  if (i < 0) return;                       // Back past the first step: stay
  if (i >= _tour.steps.length) { endTour(); return; }
  _tour.idx = i;
  // before() may have re-rendered a panel — let the DOM settle one
  // frame before measuring the target.
  requestAnimationFrame(function () { tourShow(); });
}

function tourShow() {
  if (!_tour) return;
  var st = _tour.steps[_tour.idx];
  var el = document.querySelector(st.sel);
  if (!el) { tourStep(+1); return; }

  // Targets inside the scrolling sidebar must be in view to spotlight.
  var sbInner = document.getElementById('sidebar-inner');
  if (sbInner && sbInner.contains(el)) el.scrollIntoView({ block: 'center', behavior: 'auto' });

  var pad = (typeof st.pad === 'number') ? st.pad : 4;
  var r = el.getBoundingClientRect();
  var hi = _tour.hi;
  hi.style.top = (r.top - pad) + 'px';
  hi.style.left = (r.left - pad) + 'px';
  hi.style.width = (r.width + pad * 2) + 'px';
  hi.style.height = (r.height + pad * 2) + 'px';

  // Visible-step counter: of the steps whose targets exist right now.
  var live = _tour.steps.filter(function (s) { return document.querySelector(s.sel); });
  var pos = live.indexOf(st) + 1 || (_tour.idx + 1);
  var card = _tour.card;
  card.querySelector('.tour-card-step').textContent = 'step ' + pos + ' of ' + (live.length || _tour.steps.length);
  card.querySelector('.tour-card-title').textContent = st.title;
  card.querySelector('.tour-card-text').textContent = st.text;
  card.querySelector('.tour-back').disabled = (_tour.idx === 0);
  card.querySelector('.tour-next').textContent = (_tour.idx === _tour.steps.length - 1) ? 'Done ✓' : 'Next →';

  // Card placement: below the highlight when there is room, above it
  // otherwise, clamped to the viewport horizontally.
  card.style.visibility = 'hidden';
  card.style.top = '0px'; card.style.left = '0px';
  var ch = card.offsetHeight, cw = card.offsetWidth;
  var top = r.bottom + pad + 12;
  if (top + ch > window.innerHeight - 10) top = r.top - pad - ch - 12;
  if (top < 10) top = Math.max(10, (window.innerHeight - ch) / 2);
  var left = r.left;
  if (left + cw > window.innerWidth - 14) left = window.innerWidth - cw - 14;
  if (left < 14) left = 14;
  card.style.top = top + 'px';
  card.style.left = left + 'px';
  card.style.visibility = '';
}

function tourReposition() { if (_tour) tourShow(); }
