'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-nav.js   (UX pass — sidebar navigation history)
//
//   Problem this solves: the sidebar drills deeper on every click
//   (catalogue -> node -> connected node -> cell …) but kept NO record of
//   where you came from, so there was no way back and no way to clear to
//   the start — a rabbit hole. This adds:
//     • a navigation history stack (state.navStack),
//     • a persistent bar at the top of the sidebar carrying a "← Back" button
//       (named for where it returns to), visible from every panel. The
//       "⌂ Home" button (clears to the start) now lives in the sidebar
//       quick-bar, left of Legend; this module wires it to navHome.
//
//   How it captures history without rewriting every navigation function:
//   the sidebar's navigations all flow through a small set of GLOBAL
//   functions called by name at click time (selectFC, selectCell,
//   selectDiscourseNode, selectCrossClassEdge, switchSidebarPanel, and the
//   per-pair / per-kind selectors). We wrap each once at load so that,
//   before it changes the view, the CURRENT view is pushed onto the stack.
//   Restoring (Back / Home) sets a guard so it doesn't re-push.
//
//   Reads (globals): state, DATA, FC_BY_ID, esc, writeHash, renderMap,
//   renderPanel, renderSidebarFC, renderSidebarCell.
//   Load order: LAST (after every module that defines a navigation
//   function), before init().
// =============================================================

(function () {
  if (window.__navWrapped) return;
  window.__navWrapped = true;

  if (!state.navStack) state.navStack = [];
  var restoring = false;

  // The nav-relevant slice of state — what determines which sidebar view shows.
  function snapshot() {
    return {
      activePanel: state.activePanel,
      selectedFC: state.selectedFC,
      selectedCell: state.selectedCell,
      selectedDiscourseNode: state.selectedDiscourseNode,
      selectedEdgeId: state.selectedEdgeId,
      selectedDiscourseEdgesPair: state.selectedDiscourseEdgesPair,
      selectedGlossaryTerm: state.selectedGlossaryTerm,
      selectedPair: state.selectedPair,
      selectedKind: state.selectedKind,
      predFilter: state.predFilter,
    };
  }

  function snapKey(s) {
    return [s.activePanel, s.selectedFC, s.selectedCell, s.selectedDiscourseNode,
            s.selectedEdgeId, s.selectedKind,
            s.selectedPair && JSON.stringify(s.selectedPair)].join('|');
  }

  // A human label for a view, for the bar ("← Frontiers", "you are here: …").
  function labelFor(s) {
    if (s.activePanel === 'fc' && s.selectedFC) {
      var fc = FC_BY_ID[s.selectedFC];
      if (fc && s.selectedCell) return s.selectedCell;
      if (fc) return fc.label;
    }
    if (s.activePanel === 'discourse' && s.selectedDiscourseNode) {
      var n = DATA.discourse_by_id && DATA.discourse_by_id[s.selectedDiscourseNode];
      return (n && (n.label || n.full_name)) || 'node';
    }
    if (s.activePanel === 'edge') return 'cross-classification edge';
    var names = {
      about: 'About', legend: 'Legend', glossary: 'Glossary', phenomena: 'Phenomena',
      education: 'For education', research: 'For research', spotlight: 'Spotlight',
      search: 'Search', builder: 'Build cross-section',
      'browse-classifications': 'Classifications', 'browse-architectures': 'Architectures',
      'browse-frontiers': 'Frontiers', 'browse-totalities': 'Totalities',
      'browse-regime-content': 'Regime', 'browse-programs': 'Programs',
      discriminating: 'Compare programs', 'discriminating-pair': 'Program pair',
      ranks: 'Scales', 'ranks-kind': 'Scale group', 'discourse-edges': 'Shared edges',
    };
    return names[s.activePanel] || 'the map';
  }

  // Re-render whichever view the current state describes (covers fc/cell,
  // delegates everything else to renderPanel).
  function renderActive() {
    if (state.activePanel === 'fc' && state.selectedFC) {
      var fc = FC_BY_ID[state.selectedFC];
      if (fc) {
        if (state.selectedCell) {
          var cell = (fc.cells || []).find(function (c) { return c.cell_id === state.selectedCell; });
          if (cell && typeof renderSidebarCell === 'function') { renderSidebarCell(fc, cell); return; }
        }
        if (typeof renderSidebarFC === 'function') { renderSidebarFC(fc); return; }
      }
    }
    if (typeof renderPanel === 'function') renderPanel();
  }

  function pushCurrent() {
    if (restoring) return;
    var cur = snapshot();
    var top = state.navStack[state.navStack.length - 1];
    if (top && snapKey(top) === snapKey(cur)) return; // don't stack duplicates
    state.navStack.push(cur);
    if (state.navStack.length > 100) state.navStack.shift();
  }

  function restore(s) {
    restoring = true;
    state.activePanel = s.activePanel;
    state.selectedFC = s.selectedFC;
    state.selectedCell = s.selectedCell;
    state.selectedDiscourseNode = s.selectedDiscourseNode;
    state.selectedEdgeId = s.selectedEdgeId;
    state.selectedDiscourseEdgesPair = s.selectedDiscourseEdgesPair;
    state.selectedGlossaryTerm = s.selectedGlossaryTerm;
    state.selectedPair = s.selectedPair;
    state.selectedKind = s.selectedKind;
    state.predFilter = s.predFilter || 'all';
    if (typeof writeHash === 'function') writeHash();
    renderActive();
    if (typeof renderMap === 'function') renderMap();
    restoring = false;
  }

  function navBack() {
    if (!state.navStack.length) return;
    restore(state.navStack.pop());
    updateBar();
  }

  function navHome() {
    state.navStack = [];
    restoring = true;
    state.selectedFC = null; state.selectedCell = null; state.selectedDiscourseNode = null;
    state.selectedEdgeId = null; state.selectedDiscourseEdgesPair = null;
    state.selectedGlossaryTerm = null; state.selectedPair = null; state.selectedKind = null;
    state.predFilter = 'all';
    state.activePanel = 'about';
    if (typeof writeHash === 'function') writeHash();
    renderActive();
    if (typeof renderMap === 'function') renderMap();
    restoring = false;
    updateBar();
  }

  function updateBar() {
    var bar = document.getElementById('sidebar-nav-bar');
    if (!bar) return;
    var hasBack = state.navStack.length > 0;
    var backLabel = hasBack ? labelFor(state.navStack[state.navStack.length - 1]) : '';
    var here = labelFor(snapshot());
    // Home now lives in the sidebar quick-bar (left of Legend), so the nav-bar
    // carries only the contextual Back button + the "you are here" label.
    bar.innerHTML =
      (hasBack
        ? '<button class="nav-back" id="nav-back-btn" title="Go back to ' + esc(backLabel) + '">\u2190 ' + esc(backLabel) + '</button>'
        : '<span class="nav-back nav-back-disabled">\u2190 Back</span>') +
      '<span class="nav-here" title="' + esc(here) + '">' + esc(here) + '</span>';
    var b = document.getElementById('nav-back-btn'); if (b) b.addEventListener('click', navBack);
  }

  // Wrap the navigation functions: record where we are before going deeper,
  // and refresh the bar after. Restores (Back/Home) bypass the push via the
  // `restoring` guard. Missing functions are skipped safely.
  ['selectFC', 'selectCell', 'selectDiscourseNode', 'selectCrossClassEdge',
   'switchSidebarPanel', 'selectDiscriminatingPair', 'selectRanksKind',
   'selectGlossaryTerm', 'selectDiscourseEdges'].forEach(function (name) {
    var orig = window[name];
    if (typeof orig !== 'function') return;
    window[name] = function () {
      pushCurrent();
      var r = orig.apply(this, arguments);
      updateBar();
      return r;
    };
  });

  // clearSelection (the × on a card) shouldn't add history, but the bar should
  // refresh after it.
  if (typeof window.clearSelection === 'function') {
    var origClear = window.clearSelection;
    window.clearSelection = function () { var r = origClear.apply(this, arguments); updateBar(); return r; };
  }

  // Home moved out of the nav-bar into the sidebar quick-bar (#quick-home-btn,
  // left of Legend). It clears to the start via navHome. The button carries no
  // data-quick-panel, so wireSidebarQuickBar (scoped to [data-quick-panel])
  // leaves it alone and only this handler fires.
  var qHome = document.getElementById('quick-home-btn');
  if (qHome) qHome.addEventListener('click', navHome);

  // The masthead title is a home link — the most universal convention on
  // the web; nobody should have to hunt for the way back to the start.
  var mastTitle = document.querySelector('.masthead h1');
  if (mastTitle) {
    mastTitle.style.cursor = 'pointer';
    mastTitle.title = 'Back to the start — full map, default panel';
    mastTitle.setAttribute('role', 'button');
    mastTitle.setAttribute('tabindex', '0');
    mastTitle.addEventListener('click', navHome);
    mastTitle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navHome(); }
    });
  }

  // Exposed so Browse's Home tab (explorer-sidebar.js) can call it.
  window.navHome = navHome;

  // Paint the bar once after the first render settles.
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', function () { setTimeout(updateBar, 0); });
  } else {
    setTimeout(updateBar, 0);
  }

  // Expose for any other surface that wants them.
  window.navBack = navBack;
  window.navHome = navHome;
  window.navUpdateBar = updateBar;
})();
