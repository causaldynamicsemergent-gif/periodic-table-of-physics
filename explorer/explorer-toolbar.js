'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-toolbar.js   (UX pass — toolbar consolidation)
//
//   The toolbar was a long flat row of buttons. It is now grouped by what
//   each control DOES:
//     • view-toggle (Open questions / Classifications)   — map mode
//     • ⧉ Build cross-section                            — the action
//     • search
//     • Browse ▾   — the six catalogues (built in explorer-sidebar.js,
//                    buildBrowseMenu; routes via switchSidebarPanel)
//     • Analyse ▾  — the two cross-map tools (wired here)
//     • View ▾     — rows-by / spotlight / reset (wired here)
//     • Phenomena ▾ — physical-phenomena panel + phen↔phen overlay (wired here)
//
//   The remaining info panels (legend / glossary / about / education /
//   research) are reachable from the sidebar quick-bar and the Home button.
//
//   Implementation note: spotlight, the overlay chips and reset KEEP their
//   original ids/classes (#spotlight-btn, .tb-chip[data-filter="overlay"],
//   #btn-reset-layers), so their handlers in explorer-map.js (wireToolbar)
//   keep working unchanged. The overlay chips now live inside the Phenomena
//   menu; spotlight + reset stay inside the View menu. Only rows-by is
//   re-expressed here as inline chips. We do NOT touch explorer-map.js. The
//   old rows-by dropdown is gone, so its wirer (wireRowsByDropdown) and
//   syncToolbarChips both no-op safely on the missing #rowsby-btn /
//   #rowsby-menu (they are guarded).
//
//   Reads (globals): state, esc, switchSidebarPanel, syncToolbarChips,
//   renderMap, writeHash.
//   Load order: after explorer-sidebar.js / explorer-map.js, before init().
// =============================================================

(function () {
  if (window.__toolbarGrouped) return;
  window.__toolbarGrouped = true;

  // Generic dropdown wiring that mirrors wireBrowseDropdown (toggle, close on
  // outside click, close on Escape). Returns {open, close}.
  function wireDropdown(btnId, menuId, wrapId, onOpen) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    var wrap = document.getElementById(wrapId);
    if (!btn || !menu || !wrap) return null;
    function close() { menu.classList.remove('open'); btn.classList.remove('active'); }
    function open() { if (onOpen) onOpen(); menu.classList.add('open'); btn.classList.add('active'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) close(); else open();
    });
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('open')) return;
      if (wrap.contains(e.target)) return;
      close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { close(); e.stopPropagation(); }
    });
    return { open: open, close: close };
  }

  // ---- Analyse ▾ — the two cross-map tools ----
  var analyseMenu = document.getElementById('analyse-menu');
  if (analyseMenu) {
    analyseMenu.innerHTML =
      '<div class="menu-tab" data-tab="discriminating" role="menuitem" tabindex="0">' +
        '<span class="tab-icon">\u21c4</span>' +
        '<div class="menu-tab-block"><span>Compare programs</span>' +
        '<span class="tab-desc">Where two programs share experimental coverage.</span></div></div>' +
      '<div class="menu-tab" data-tab="ranks" role="menuitem" tabindex="0">' +
        '<span class="tab-icon">\u25b2\u25bc</span>' +
        '<div class="menu-tab-block"><span>Scales</span>' +
        '<span class="tab-desc">Every quantitative bound, grouped by dimension.</span></div></div>';
  }
  var analyseDD = wireDropdown('analyse-btn', 'analyse-menu', 'analyse-wrap');
  if (analyseMenu) {
    analyseMenu.querySelectorAll('[data-tab]').forEach(function (el) {
      el.addEventListener('click', function () {
        if (typeof switchSidebarPanel === 'function') switchSidebarPanel(el.dataset.tab);
        if (analyseDD) analyseDD.close();
      });
    });
  }

  // ---- Phenomena ▾ — physical-phenomena panel + phen↔phen overlay ----
  // The panel link routes through switchSidebarPanel('phenomena') (same as the
  // old quick-bar entry). The two overlay chips were MOVED here from View ▾ but
  // keep their ids/classes (.tb-chip[data-filter="overlay"]), so their handlers
  // in explorer-map.js (wireToolbar / syncToolbarChips) keep firing unchanged —
  // no re-wiring needed for them, and no map.js edit.
  var phenomenaDD = wireDropdown('phenomena-btn', 'phenomena-menu', 'phenomena-wrap');
  var phenPanelBtn = document.getElementById('phenomena-panel-btn');
  if (phenPanelBtn) {
    phenPanelBtn.addEventListener('click', function () {
      if (typeof switchSidebarPanel === 'function') switchSidebarPanel('phenomena');
      if (phenomenaDD) phenomenaDD.close();
    });
  }

  // ---- View ▾ — rows-by / spotlight / reset ----
  function syncViewChips() {
    var g = (typeof state !== 'undefined') ? state.group : 'sector';
    document.querySelectorAll('#view-menu .view-chip[data-rowsby]').forEach(function (c) {
      c.classList.toggle('active', c.dataset.rowsby === g);
    });
  }
  var viewDD = wireDropdown('view-btn', 'view-menu', 'view-wrap', syncViewChips);

  // rows-by chips — set the grouping, re-sync, re-render (no map.js edit)
  document.querySelectorAll('#view-menu .view-chip[data-rowsby]').forEach(function (c) {
    c.addEventListener('click', function () {
      state.group = c.dataset.rowsby;
      if (typeof syncToolbarChips === 'function') syncToolbarChips();
      syncViewChips();
      if (typeof writeHash === 'function') writeHash();
      if (typeof renderMap === 'function') renderMap();
    });
  });

  // Opening the spotlight panel navigates away — close the View menu after.
  var spotBtn = document.getElementById('spotlight-btn');
  if (spotBtn) spotBtn.addEventListener('click', function () { if (viewDD) viewDD.close(); });

  // reset-layers sets group back to sector (handler in map.js); re-sync chips.
  var resetBtn = document.getElementById('btn-reset-layers');
  if (resetBtn) resetBtn.addEventListener('click', function () { setTimeout(syncViewChips, 0); });

  // Initial chip state once the boot sequence has set state.group.
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', function () { setTimeout(syncViewChips, 0); });
  } else {
    setTimeout(syncViewChips, 0);
  }
})();
