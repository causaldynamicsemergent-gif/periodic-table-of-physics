// =============================================================
//   explorer-qs.js
//
//   Sub-PR E4 — the reusable quantitative_scale callout component.
//
//   Three surfaces are exposed:
//
//     • renderQS(qs, opts)
//         The inline atomic form. Returns one HTML fragment:
//         optional prefix label + optional bound-direction symbol +
//         KaTeX-rendered value + units. No border, no citations.
//         Used by every dense surface — cell-direct values inside the
//         Description section, prediction-level chips below pred-text
//         in both the cell-pred and FC-pred loops, the resolves-edge
//         sensitivity line (with prefix "Reach: "), the competing-
//         predictions block's predicted_value cells, the bears-on edge
//         row (when an edge carries quantitative_scale).
//
//     • renderQSCallout(qs, opts)
//         The block / sidebar-section form. Returns a full
//         <div class="sidebar-section"> with an <h3> header
//         (opts.heading), the inline form wrapped in a prominent
//         bordered card, and the citations expanded underneath.
//         Used only on the carrier surface — open-frontier and
//         totality-approach discourse cards where the qs entry IS the
//         carrier's headline numerical commitment (Planck scale on
//         qg-frontier, 10^120 on cc-frontier, 1/4 on bh-thermodynamics,
//         the Kolmogorov -5/3 exponent on turbulence, etc.).
//
//     • renderQSCitations(citations, opts)
//         Citations list helper. Used by renderQSCallout for the
//         expanded form, and by any inline caller that wants the
//         qs.citations rendered alongside the value (cell-direct on
//         the cell card uses this in compact mode).
//
//   The component absorbs and replaces the minimal-inline `formatQS`
//   that shipped in `explorer-resolves.js` (sub-PR E2). Two upgrades
//   relative to that implementation:
//
//     (1) units === "dimensionless" is suppressed regardless of kind.
//         The v95 dataset has at least one entry (su5-gut-rep-content
//         gauge-coupling-unification α_GUT ≈ 0.04) where kind=coupling
//         carries the literal string units="dimensionless"; the E2
//         formatQS only suppressed the units fragment when kind itself
//         was "dimensionless" or "sigma_deviation", letting the
//         literal "dimensionless" leak into display.
//
//     (2) Class names switch from dc-resolves-prefix / -bd / -units to
//         generic qs-prefix / qs-bd / qs-units. Visual treatment is
//         identical (see update-e4.css); the names just stop lying
//         about which surface is doing the rendering.
//
//   Vocabulary discipline (PHYSICIST_FACING_VOCABULARY.md §3, §4):
//   no schema field names appear in UI text. "kind", "log10",
//   "uncertainty", "bound_direction", and "quantitative_scale" never
//   surface as labels or tooltips. The value display alone tells the
//   physicist what's being shown: value + units carries the dimension
//   (energy_scale via "GeV", time via "yr", coupling via "e²/h" or
//   nothing for the kind=coupling units=dimensionless case);
//   bound-direction symbols (≳ ≲ = ~) lead the value when uncertainty
//   is null; log10 values render as 10^value via KaTeX; asymmetric
//   uncertainty renders as value^{+high}_{-low} via KaTeX.
// =============================================================

// =============================================================
//   Bound-direction symbol shown inline next to the value when
//   uncertainty is null (Rule 34). When uncertainty is non-null the
//   "± σ" notation (or asymmetric form) carries the direction
//   implicitly and the symbol is suppressed. The "two-sided" case
//   suppresses the "=" symbol — the value alone reads as exact.
// =============================================================
const QS_BD_SYMBOL = {
  'lower':       '≳',
  'upper':       '≲',
  'two-sided':   '=',
  'unspecified': '~',
};

// =============================================================
//   renderQS — the inline atomic form.
//
//   Inputs:
//     qs    = { kind, value, [log10], [units], uncertainty,
//               [bound_direction], [citations] }
//             — full schema-v19 record. citations is read by
//               renderQSCitations callers, not by renderQS itself.
//     opts  = {
//               prefix?: 'Reach: '  // optional inline label
//             }
//
//   Returns: HTML string (escaped); empty string when qs missing or
//            malformed.
// =============================================================
function renderQS(qs, opts) {
  if (!qs || typeof qs !== 'object') return '';
  if (qs.value === undefined || qs.value === null) return '';
  opts = opts || {};
  const kind  = qs.kind || '';
  const value = qs.value;
  const log10 = !!qs.log10;
  const units = qs.units || '';
  const unc   = qs.uncertainty;
  const bd    = qs.bound_direction;

  // --- Build the value-display fragment ---
  // sigma_deviation: render as "Nσ" with no separate units fragment.
  // log10: render as 10^{value} via KaTeX, with the exponent carrying
  //   any uncertainty (the source-value-phrase convention in the
  //   dataset puts uncertainty on the log10 exponent).
  // everything else: plain value, optionally with ± σ or asymmetric form.
  let valueHtml;

  if (kind === 'sigma_deviation') {
    valueHtml = `${esc(String(value))}σ`;
  } else if (log10) {
    let exponent;
    if (unc && typeof unc === 'object' && 'low' in unc && 'high' in unc) {
      exponent = `${value}^{+${unc.high}}_{-${unc.low}}`;
    } else if (typeof unc === 'number') {
      exponent = `${value} \\pm ${unc}`;
    } else {
      exponent = String(value);
    }
    const tex = `10^{${exponent}}`;
    valueHtml = renderTexInline(tex);
  } else {
    // Plain numeric value, possibly with scalar ± σ or asymmetric form.
    if (unc && typeof unc === 'object' && 'low' in unc && 'high' in unc) {
      const tex = `${value}^{+${unc.high}}_{-${unc.low}}`;
      valueHtml = renderTexInline(tex);
    } else if (unc != null && typeof unc !== 'object') {
      valueHtml = esc(`${value} ± ${unc}`);
    } else {
      valueHtml = esc(String(value));
    }
  }

  // --- Bound-direction symbol ---
  // Leads the value, but only when uncertainty is null (Rule 34) and
  // the symbol carries meaning (two-sided is suppressed; the value
  // alone reads as exact).
  let bdPrefix = '';
  if (unc == null && bd && bd !== 'two-sided' && QS_BD_SYMBOL[bd]) {
    bdPrefix = `<span class="qs-bd">${QS_BD_SYMBOL[bd]}</span> `;
  }

  // --- Units fragment ---
  // sigma_deviation renders units as "σ" inline above; no separate
  // fragment. kind=dimensionless and kind=ratio carry no units by
  // convention; the literal string "dimensionless" is also suppressed
  // regardless of kind (handles the su5 α_GUT case where kind=coupling
  // and units="dimensionless").
  let unitsHtml = '';
  if (units
      && units !== 'dimensionless'
      && kind !== 'sigma_deviation'
      && kind !== 'dimensionless') {
    unitsHtml = ` <span class="qs-units">${esc(units)}</span>`;
  }

  // --- Optional prefix label ---
  // The caller passes a verbatim string ("Reach: ", etc.). The CSS for
  // qs-prefix applies text-transform: uppercase and letter-spacing;
  // the JS just renders the label as-is.
  const prefix = opts.prefix
    ? `<span class="qs-prefix">${esc(opts.prefix)}</span>`
    : '';

  return `${prefix}${bdPrefix}${valueHtml}${unitsHtml}`;
}

// =============================================================
//   renderTexInline — KaTeX inline render with graceful fallback.
//
//   The KaTeX runtime is loaded synchronously in the HTML head (see
//   Map_v34_explorer.html line ~1384), so window.katex is reliably
//   available by the time any sidebar renderer runs. Fallback is
//   <code>tex</code> for the degenerate case where the CDN failed.
// =============================================================
function renderTexInline(tex) {
  if (typeof window !== 'undefined' && window.katex) {
    try {
      return window.katex.renderToString(tex, { throwOnError: false });
    } catch (_e) {
      return `<code>${esc(tex)}</code>`;
    }
  }
  return `<code>${esc(tex)}</code>`;
}

// =============================================================
//   renderQSCitations — citations list helper.
//
//   Inputs:
//     citations = array of citation prose strings (per §4 admissibility,
//                 each citation typically includes the source-value
//                 phrase that grounds the qs value in the literature).
//     opts      = {
//                   compact?: false  // when true, render as a small
//                                    // inline-list block with leading
//                                    // bullets, mono font 10.5px;
//                                    // when false (default), each
//                                    // citation gets its own line in a
//                                    // dedicated block.
//                 }
//
//   Returns: HTML string; empty string when citations missing or empty.
// =============================================================
function renderQSCitations(citations, opts) {
  if (!citations || !citations.length) return '';
  opts = opts || {};
  const cls = opts.compact ? 'qs-citations qs-citations-compact' : 'qs-citations';
  return `<div class="${cls}">${citations.map(c =>
    `<div class="qs-citation">${esc(c)}</div>`
  ).join('')}</div>`;
}

// =============================================================
//   renderQSCallout — the block / sidebar-section form.
//
//   Used only on the carrier surface (renderFrontierCard and
//   renderTotalityCard in explorer-discourse.js) where the qs entry
//   is the carrier's headline numerical commitment. Other surfaces
//   (cell-direct, prediction-level, sensitivity, bears-on) use the
//   inline form renderQS instead.
//
//   Inputs:
//     qs    = full quantitative_scale record (see renderQS above)
//     opts  = {
//               heading?: 'Characteristic scale'  // sidebar section title
//             }
//
//   Returns: HTML string for a complete <div class="sidebar-section">.
//            Empty string when qs missing.
// =============================================================
function renderQSCallout(qs, opts) {
  if (!qs || typeof qs !== 'object') return '';
  opts = opts || {};
  const heading = opts.heading || 'Characteristic scale';
  return `
    <div class="sidebar-section">
      <h3>${esc(heading)}</h3>
      <div class="qs-callout">
        <div class="qs-callout-value">${renderQS(qs, {})}</div>
        ${renderQSCitations(qs.citations, {})}
      </div>
    </div>
  `;
}
