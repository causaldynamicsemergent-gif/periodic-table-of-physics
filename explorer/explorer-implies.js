// =============================================================
//   explorer-implies.js
//
//   Sub-PR E3 — renders the if_real_implies trees on the 14 carrier
//   nodes (open-frontiers and totality-approaches). The carrier
//   structure in v95:
//
//     14 carriers
//       ├─ 23 resolutions  (each: { condition, condition_citations,
//       │                            implications: [...] })
//       └─ 24 implications (each: { kind, target, description,
//                                   derivation_citations,
//                                   [quantitative_scale] })
//
//   In v95 four of the five schema-defined `kind` values appear in
//   the data:
//
//     • new_FC            (17 cases, 9 with quantitative_scale)
//                          target = null; the structural story is
//                          carried by the description prose
//     • forced_edge       (3 cases, 2 with quantitative_scale)
//                          target = { from, to, subtype }, where
//                          from / to are formal-classification ids
//     • new_axis          (2 cases, 0 with quantitative_scale)
//                          target = string (formal-classification id)
//     • promotes_subtype  (2 cases, 1 with quantitative_scale)
//                          target = string (cell id; the owning FC
//                          is resolved via DATA.cell_id_to_fc_id)
//     • new_cell          (0 cases in v95; defensive guard included)
//
//   One public export:
//
//     renderIfRealImpliesSection(node)
//         Returns a complete <div class="sidebar-section"> or empty
//         string when node has no if_real_implies. Consumed by
//         renderFrontierCard and renderTotalityCard in
//         explorer-discourse.js, inserted between the carrier qs
//         callout and the rest of the card's edge sections.
//
//   Quantitative_scale rendering is delegated to renderQS /
//   renderQSCitations from explorer-qs.js (sub-PR E4). The 12
//   implication-level qs entries (kind=energy_scale leptogenesis
//   M_1 ≳ 10^9 GeV, kind=mass cc-frontier 10^120, etc.) light up
//   through the same component every other qs surface uses.
//
//   The cell-id pill for promotes_subtype reuses
//   renderResolvesTargetPill from explorer-resolves.js — it already
//   does cell-id → fc-id resolution via DATA.cell_id_to_fc_id and
//   emits the [data-fc-cell-jump] deep link with the cell's content
//   as label. Cleanest reuse.
//
//   Vocabulary discipline (PHYSICIST_FACING_VOCABULARY.md §3, §4,
//   §6): no schema field names appear in UI text. The kind enum
//   values render as physicist-natural labels ("Forces new formal
//   classification", "Forces relation", "Promotes cell"). The
//   resolution-slug field (e.g., "leptogenesis-via-heavy-neutrino-
//   decay") is omitted entirely; the condition prose carries the
//   physicist-facing handle. "if_real_implies", "resolution",
//   "implication", "kind", "target", "condition_citations",
//   "derivation_citations" never appear as labels or tooltips.
//
//   The edge-subtype string on forced_edge targets ("derives-from",
//   "specializes") is rendered verbatim with light pill styling.
//   These are project edge-type names that match what the reader
//   already sees in the cross-classification edge list elsewhere
//   in the explorer; they're physicist-natural in context.
// =============================================================

// =============================================================
//   Kind labels — the physicist-facing phrase for each schema kind.
//   The new_cell entry is defensive; v95 has zero new_cell
//   implications, but the schema admits it.
// =============================================================
const IMPLIES_KIND_LABELS = {
  'new_FC':           'Forces new formal classification',
  'new_axis':         'Forces new axis',
  'forced_edge':      'Forces relation',
  'promotes_subtype': 'Promotes cell',
  'new_cell':         'Forces new cell',
};

// =============================================================
//   Citations list for the implies surface — small block with the
//   same chrome as the resolves citation list, so the visual
//   weight matches across the two Phase B+C surfaces.
// =============================================================
function renderImpliesCitations(citations) {
  if (!citations || !citations.length) return '';
  return `<div class="dc-implies-citations">${citations.map(c =>
    `<div class="dc-implies-citation">${esc(c)}</div>`
  ).join('')}</div>`;
}

// =============================================================
//   Target rendering — branches on imp.kind because each kind has
//   a different target shape (null / FC id / cell id / edge triple).
//
//   Returns the HTML fragment that follows the kind label on the
//   implication row's head line; empty string when target is absent
//   (the new_FC case, where the description carries the story).
// =============================================================
function renderImplicationTarget(imp) {
  const kind   = imp.kind;
  const target = imp.target;

  if (kind === 'new_FC') {
    // Target is null by schema and v95 convention; nothing to render.
    return '';
  }

  if (kind === 'new_axis') {
    // Target is a formal-classification id — the host classification
    // the new axis would be added to. Render as an FC pill (clickable,
    // walks to the FC card).
    if (typeof target === 'string' && typeof renderFCPill === 'function') {
      return renderFCPill(target);
    }
    return target ? `<span class="dx-fc-pill dx-fc-pill-unknown">${esc(String(target))}</span>` : '';
  }

  if (kind === 'forced_edge') {
    // Target is { from, to, subtype } where from / to are FC ids.
    // Render as a three-pill row: from-pill → [subtype label] → to-pill.
    if (!target || typeof target !== 'object') return '';
    const fromPill = (typeof renderFCPill === 'function')
      ? renderFCPill(target.from)
      : `<span class="dx-fc-pill dx-fc-pill-unknown">${esc(String(target.from || ''))}</span>`;
    const toPill = (typeof renderFCPill === 'function')
      ? renderFCPill(target.to)
      : `<span class="dx-fc-pill dx-fc-pill-unknown">${esc(String(target.to || ''))}</span>`;
    const subtype = target.subtype
      ? `<span class="dc-implies-edge-subtype">${esc(target.subtype)}</span>`
      : '';
    return `<span class="dc-implies-edge-triplet">${fromPill}${subtype}${toPill}</span>`;
  }

  if (kind === 'promotes_subtype') {
    // Target is a cell id. renderResolvesTargetPill from
    // explorer-resolves.js already does the cell-id → fc-id
    // resolution and emits the [data-fc-cell-jump] deep link
    // with the cell's content as label — exact reuse.
    if (typeof target === 'string' && typeof renderResolvesTargetPill === 'function') {
      return renderResolvesTargetPill(target);
    }
    return target ? `<span class="dx-cell-pill">${esc(String(target))}</span>` : '';
  }

  if (kind === 'new_cell') {
    // Defensive — schema admits it but v95 has zero. If a target
    // ever materialises here, render best-effort as either a cell
    // pill (string) or a fallback prose chip (object/dict).
    if (typeof target === 'string' && typeof renderResolvesTargetPill === 'function') {
      return renderResolvesTargetPill(target);
    }
    return '';
  }

  // Unknown kind — render the raw target as a chip so the gap is
  // visible to the next author rather than silently swallowed.
  if (target && typeof target === 'string') {
    return `<span class="dx-disc-pill dx-disc-pill-unknown">${esc(target)}</span>`;
  }
  return '';
}

// =============================================================
//   One implication row.
//
//   Layout:
//     head:    [kind-label pill]   [target rendering (kind-specific)]
//     body:    description prose
//     qs:      renderQS callout (12 of 24 implications)
//     qsCites: renderQSCitations(compact=true)
//     dCites:  derivation_citations list (always)
// =============================================================
function renderImplicationRow(imp) {
  const kind      = imp.kind || '';
  const kindLabel = IMPLIES_KIND_LABELS[kind] || kind;
  const kindClass = `dc-implies-kind dc-implies-kind-${esc(String(kind).replace(/_/g, '-'))}`;

  const kindPill   = `<span class="${kindClass}">${esc(kindLabel)}</span>`;
  const targetHtml = renderImplicationTarget(imp);

  const desc = imp.description
    ? `<div class="dc-implies-desc">${formatPara(imp.description)}</div>`
    : '';

  // quantitative_scale block — present on 12 of 24 implications.
  // Uses the inline renderQS atom from explorer-qs.js, wrapped in
  // the dc-implies-qs container so this surface's chrome can be
  // styled independently of the cell-direct / prediction / sensitivity
  // surfaces that also consume renderQS.
  let qsBlock = '';
  if (imp.quantitative_scale && typeof renderQS === 'function') {
    const qsValue = renderQS(imp.quantitative_scale, {});
    const qsCites = (typeof renderQSCitations === 'function')
      ? renderQSCitations(imp.quantitative_scale.citations, { compact: true })
      : '';
    if (qsValue) {
      qsBlock = `
        <div class="dc-implies-qs">
          <div class="dc-implies-qs-value">${qsValue}</div>
          ${qsCites}
        </div>
      `;
    }
  }

  const derivationCites = renderImpliesCitations(imp.derivation_citations);

  return `
    <div class="dc-implies-imp">
      <div class="dc-implies-imp-head">
        ${kindPill}
        ${targetHtml}
      </div>
      ${desc}
      ${qsBlock}
      ${derivationCites}
    </div>
  `;
}

// =============================================================
//   One resolution group.
//
//   Header: italic "If <condition prose>" — verbatim condition text
//   (load-bearing per the project's no-paraphrase rule).
//   Body:   the condition_citations list, then each implication row.
//
//   The resolution-slug field (e.g., "leptogenesis-via-heavy-
//   neutrino-decay") is intentionally not rendered — it's a schema-
//   internal identifier and per the vocabulary discipline shouldn't
//   surface in UI text. The condition prose is the physicist-facing
//   handle.
// =============================================================
function renderResolutionGroup(res) {
  const conditionProse = res.condition
    ? `<div class="dc-implies-condition">${formatPara(res.condition)}</div>`
    : '';
  const conditionCites = renderImpliesCitations(res.condition_citations);
  const implications = (res.implications || []).map(renderImplicationRow).join('');
  return `
    <div class="dc-implies-resolution">
      ${conditionProse}
      ${conditionCites}
      <div class="dc-implies-imp-list">${implications}</div>
    </div>
  `;
}

// =============================================================
//   Public export: renderIfRealImpliesSection(node)
//
//   Returns a complete <div class="sidebar-section"> for the
//   carrier's full if_real_implies tree, or empty string when the
//   node has no if_real_implies. Section heading counts the total
//   implications across all resolutions (matches the count-pill
//   convention used by the resolves / discourse-edge sections).
// =============================================================
function renderIfRealImpliesSection(node) {
  if (!node || !node.if_real_implies || !node.if_real_implies.length) return '';
  const resolutions = node.if_real_implies;
  let impCount = 0;
  for (const r of resolutions) {
    impCount += (r.implications || []).length;
  }
  const groups = resolutions.map(renderResolutionGroup).join('');
  return `
    <div class="sidebar-section">
      <h3>If real, implies… <span class="dx-section-ct">· ${impCount}</span></h3>
      <div class="sec-sub">Structural consequences forced if this open question resolves as documented. Each conditional names a scenario; each consequence below it is what that scenario would force on the rest of the map.</div>
      <div class="dc-implies-list">${groups}</div>
    </div>
  `;
}
