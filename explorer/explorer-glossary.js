'use strict';
// =============================================================
//   Periodic Table of Physics — modular build
//   File: explorer-glossary.js  (Update C — glossary panel)
//
//   Holds: the glossary-panel renderer plus its local indexes,
//   selection state, and click-handler wiring. Surfaces the 22
//   glossary entries (the dataset's own organising vocabulary —
//   architecture / regime content / open frontier / structural-
//   reason categories / discharge status / etc.) that were
//   previously embedded in the canonical JSON but unrendered.
//
//   Reads: data.js (state / DATA / esc / formatPara / writeHash /
//   termToSlug); also called from sidebar.js (renderPanel switch,
//   clearSelection, switchSidebarPanel) and html (quick-bar button +
//   Browse-menu tab).
//
//   Load order in HTML: data → map → sidebar → phenomena →
//   discourse → glossary → inline init(). Loaded after the
//   discourse module so renderPanel's existing case-handlers
//   for non-glossary panels can be unaware of this one.
// =============================================================

// =============================================================
//   Module-local indexes (populated by buildGlossaryIndexes after
//   augmentDataset has run and DATA.glossary is available)
// =============================================================
var GLOSSARY_ENTRIES = [];     // entries in dataset order, with a `_slug` field added
var GLOSSARY_CATEGORIES = [];  // categories sorted by `order` ascending, each with `entries: [...]` filled in
var GLOSSARY_BY_SLUG = {};     // slug -> entry
var GLOSSARY_BY_TERM_LC = {};  // lowercased term or alias -> entry (for `related` lookups)

function buildGlossaryIndexes() {
  GLOSSARY_ENTRIES = [];
  GLOSSARY_CATEGORIES = [];
  GLOSSARY_BY_SLUG = {};
  GLOSSARY_BY_TERM_LC = {};
  if (!DATA || !DATA.glossary || !Array.isArray(DATA.glossary.entries)) return;

  // Annotate each entry with a slug, build by-slug + by-term lookups
  for (const e of DATA.glossary.entries) {
    const slug = termToSlug(e.term);
    const entry = { ...e, _slug: slug };
    GLOSSARY_ENTRIES.push(entry);
    GLOSSARY_BY_SLUG[slug] = entry;
    GLOSSARY_BY_TERM_LC[String(e.term).toLowerCase()] = entry;
    for (const a of (e.aliases || [])) {
      GLOSSARY_BY_TERM_LC[String(a).toLowerCase()] = entry;
    }
  }

  // Build category groups in `order` ascending; only include categories
  // that actually have at least one entry (defensive against future
  // dataset additions that declare a category but author no entries yet).
  const cats = Array.isArray(DATA.glossary.categories) ? DATA.glossary.categories.slice() : [];
  cats.sort((a, b) => (a.order || 0) - (b.order || 0));
  const seenIds = new Set();
  for (const c of cats) {
    const matches = GLOSSARY_ENTRIES.filter(e => e.category === c.id);
    if (!matches.length) continue;
    seenIds.add(c.id);
    GLOSSARY_CATEGORIES.push({ ...c, entries: matches });
  }
  // Defensive: if any entry references a category not in the canonical
  // list, include those entries under a synthesised "Uncategorised" group
  // at the end rather than dropping them silently.
  const orphans = GLOSSARY_ENTRIES.filter(e => !seenIds.has(e.category));
  if (orphans.length) {
    GLOSSARY_CATEGORIES.push({ id: '_uncategorised', label: 'Uncategorised', order: 999, entries: orphans });
  }
}

// =============================================================
//   Slug helpers (lookup by term-or-alias goes through the
//   case-insensitive term index so `related` strings work
//   verbatim from the source data)
// =============================================================
function lookupGlossaryEntry(termOrSlug) {
  if (!termOrSlug) return null;
  const s = String(termOrSlug);
  if (GLOSSARY_BY_SLUG[s]) return GLOSSARY_BY_SLUG[s];
  const lc = s.toLowerCase();
  if (GLOSSARY_BY_TERM_LC[lc]) return GLOSSARY_BY_TERM_LC[lc];
  // Last-ditch: try slugifying it as if it were a term
  const asSlug = termToSlug(s);
  return GLOSSARY_BY_SLUG[asSlug] || null;
}

// =============================================================
//   Selection (within the glossary panel — does not affect FC,
//   cell, or discourse-node selection)
// =============================================================
function selectGlossaryTerm(slugOrTerm) {
  const entry = lookupGlossaryEntry(slugOrTerm);
  if (!entry) return;
  state.activePanel = 'glossary';
  state.selectedGlossaryTerm = entry._slug;
  // Clear other selections so the panel is reachable cleanly from any
  // prior state. Mirrors switchSidebarPanel's behavior.
  state.selectedFC = null;
  state.selectedCell = null;
  if (typeof clearDiscourseSelection === 'function') clearDiscourseSelection();
  if (typeof clearCrossClassEdgeSelection === 'function') clearCrossClassEdgeSelection(); // Update C
  writeHash();
  renderSidebarGlossary(state.glossaryFilter || '');
  // Scroll the focused entry into view
  scrollGlossaryEntryIntoView(entry._slug);
  if (typeof syncSidebarQuickBar === 'function') syncSidebarQuickBar();
}

function clearGlossarySelection() {
  state.selectedGlossaryTerm = null;
}

function scrollGlossaryEntryIntoView(slug) {
  const el = document.querySelector(`.glossary-entry[data-glossary-slug="${slug}"]`);
  if (!el) return;
  // Use scrollIntoView with a smooth behavior; the sidebar-inner is the
  // scroll container, not the document, so this needs to scope to that
  // element. The default behaviour walks up to find the nearest scrollable
  // ancestor, which is exactly sidebar-inner here.
  try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  catch (e) { el.scrollIntoView(); }
}

// =============================================================
//   Panel renderer
// =============================================================
function renderSidebarGlossary(filter) {
  const inner = document.getElementById('sidebar-inner');
  if (!inner) return;
  state.glossaryFilter = (filter == null) ? (state.glossaryFilter || '') : filter;
  const q = (state.glossaryFilter || '').toLowerCase().trim();

  // Filter entries — match on term, any alias, or definition substring.
  // The filter applies within each category group so the grouping
  // remains visible (just with smaller groups).
  function matches(entry) {
    if (!q) return true;
    if (String(entry.term || '').toLowerCase().includes(q)) return true;
    for (const a of (entry.aliases || [])) {
      if (String(a).toLowerCase().includes(q)) return true;
    }
    if (String(entry.definition || '').toLowerCase().includes(q)) return true;
    if (String(entry.why_it_matters || '').toLowerCase().includes(q)) return true;
    return false;
  }

  const groups = GLOSSARY_CATEGORIES.map(c => ({
    ...c,
    matched: c.entries.filter(matches),
  })).filter(g => g.matched.length > 0);

  const totalShown = groups.reduce((s, g) => s + g.matched.length, 0);
  const totalAll = GLOSSARY_ENTRIES.length;

  const searchBar = `
    <div class="sb-classif-search">
      <input type="search" id="glossary-search-input" placeholder="filter by term, alias, or definition…" value="${esc(state.glossaryFilter || '')}" autocomplete="off" spellcheck="false">
    </div>
  `;

  let body;
  if (groups.length === 0) {
    body = `<div class="dx-edge-empty">no glossary entries match "<em>${esc(filter || '')}</em>"</div>`;
  } else {
    body = groups.map(g => renderGlossaryGroup(g)).join('');
  }

  inner.innerHTML = `
    <div class="sidebar-section">
      <h3>Glossary <span class="dx-section-ct">· ${totalAll}</span></h3>
      <div class="sec-sub">The ${totalAll} terms used to describe how the map is organised. ${q ? `Showing <strong>${totalShown}</strong> matching.` : 'Click any related-term pill to jump.'}</div>
      ${searchBar}
      ${body}
    </div>
  `;

  // Wire the search input
  const searchEl = document.getElementById('glossary-search-input');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.glossaryFilter = searchEl.value;
      renderSidebarGlossary(searchEl.value);
      const next = document.getElementById('glossary-search-input');
      if (next) {
        next.focus();
        const v = next.value; next.value = ''; next.value = v;
      }
    });
    // Don't auto-focus if a specific entry was selected (e.g. via deep-link
    // or related-pill click) — preserve focus on the user's last action.
    if (!state.selectedGlossaryTerm) {
      setTimeout(() => searchEl.focus(), 0);
    }
  }

  // Wire related-term pills (clicks navigate to the linked entry,
  // setting selection so it scrolls into view)
  inner.querySelectorAll('[data-glossary-jump]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      selectGlossaryTerm(el.dataset.glossaryJump);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectGlossaryTerm(el.dataset.glossaryJump);
      }
    });
  });

  // If an entry is selected (from hash routing or a prior selectGlossaryTerm
  // call), scroll it into view on this render too.
  if (state.selectedGlossaryTerm) {
    // Defer until the DOM settles
    setTimeout(() => scrollGlossaryEntryIntoView(state.selectedGlossaryTerm), 0);
  }
}

function renderGlossaryGroup(group) {
  return `
    <div class="glossary-group">
      <div class="dx-browse-group-head">${esc(group.label)} <span class="dx-browse-group-ct">(${group.matched.length})</span></div>
      ${group.matched.map(renderGlossaryEntry).join('')}
    </div>
  `;
}

function renderGlossaryEntry(entry) {
  const focused = (state.selectedGlossaryTerm === entry._slug);
  const aliases = (entry.aliases || []).filter(a => a && a !== entry.term);
  const aliasLine = aliases.length
    ? `<div class="glossary-aliases">also: ${aliases.map(esc).join(', ')}</div>`
    : '';

  const def = entry.definition
    ? `<div class="glossary-field">
         <div class="glossary-field-label">Definition</div>
         <div class="glossary-field-body">${formatPara(entry.definition)}</div>
       </div>` : '';
  const why = entry.why_it_matters
    ? `<div class="glossary-field">
         <div class="glossary-field-label">Why it matters</div>
         <div class="glossary-field-body">${formatPara(entry.why_it_matters)}</div>
       </div>` : '';
  const ex = entry.example
    ? `<div class="glossary-field">
         <div class="glossary-field-label">Example</div>
         <div class="glossary-field-body">${formatPara(entry.example)}</div>
       </div>` : '';

  let related = '';
  if (Array.isArray(entry.related) && entry.related.length) {
    const pills = entry.related.map(termLabel => {
      const target = lookupGlossaryEntry(termLabel);
      if (target) {
        return `<span class="glossary-related-pill" data-glossary-jump="${esc(target._slug)}" role="button" tabindex="0">${esc(termLabel)}</span>`;
      }
      // Term not in glossary — show as inert text rather than dropping it
      return `<span class="glossary-related-pill inert" title="not a glossary entry">${esc(termLabel)}</span>`;
    }).join('');
    related = `
      <div class="glossary-field">
        <div class="glossary-field-label">Related</div>
        <div class="glossary-related-row">${pills}</div>
      </div>`;
  }

  return `
    <div class="glossary-entry${focused ? ' focused' : ''}" data-glossary-slug="${esc(entry._slug)}">
      <div class="glossary-term-row">
        <span class="glossary-term">${esc(entry.term)}</span>
      </div>
      ${aliasLine}
      ${def}
      ${why}
      ${ex}
      ${related}
    </div>
  `;
}