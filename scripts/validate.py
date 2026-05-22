#!/usr/bin/env python3
"""
validate.py — the data-integrity tripwire for the Periodic Table of Physics repo.

What this does:
  1. Loads the schema (schema/Map_v18_schema.json).
  2. Loads the consolidated dataset (data/Map_v34_consolidated.json).
  3. Validates the dataset against the schema.
  4. Runs the v16 validator-side rules 19-23 (Predictive Layer Phase A) on the
     loaded data. Four are hard errors; rule 22 (axis_mapping recommended on
     established bijection / categorically-equivalent edges) is warning-level.
  5. Runs the v17 validator-side rules 24-26 (Predictive Layer Phase B) on the
     loaded data. All three are hard errors. See MAP_v17_schema_spec_extension.md §5.
  6. Runs the v18 validator-side rules 27-33 (Predictive Layer Phase C) on the
     loaded data. All seven are hard errors. See MAP_v18_schema_spec_extension.md §6.
  7. Distinguishes three classes of finding:
       (a) Known legacy errors — 4 pre-firewall 'constrains'-subtype carryovers.
           Tolerated; documented in PROJECT_INFRASTRUCTURE.md §2.
       (b) New errors — any schema error not matching the legacy signature,
           plus any validator-side rule 19/20/21/23/24/25/26/27/28/29/30/31/32/33
           finding. CI fails on these.
       (c) Warnings — validator-side rule 22 findings. Reported but do NOT
           fail CI. Intentionally warning-only so the v15.3 → v16 bump doesn't
           break the tripwire on day one before the Step 5 ADE-clique
           authoring sweep populates axis_mapping on the relevant edges.

If anything other than the 4 legacy 'constrains' errors or rule-22 warnings
appears, this script exits with code 1 and GitHub will flag the commit.
"""

import json
import sys
from pathlib import Path

try:
    from jsonschema import Draft202012Validator
except ImportError:
    print("ERROR: jsonschema not installed. Run: pip install jsonschema")
    sys.exit(2)

# --- configuration -----------------------------------------------------------

SCHEMA_PATH = Path("schema/Map_v18_schema.json")
DATA_PATH = Path("data/Map_v34_consolidated.json")

# Legacy error tolerance: pre-firewall 'constrains' subtype carryover.
# Documented in PROJECT_INFRASTRUCTURE.md §2.
KNOWN_LEGACY_ERROR_COUNT = 4
KNOWN_LEGACY_SIGNATURE = "'constrains' is not one of"

# Rule 20 — applicable subtypes for forcing edges.
RULE_20_FORCING_SUBTYPES = {"bijection", "categorically-equivalent", "derives-from"}

# Rule 22 — subtypes where axis_mapping is recommended.
RULE_22_RECOMMENDED_SUBTYPES = {"bijection", "categorically-equivalent"}

# Rule 24 / §3.1 — the two node types that carry if_real_implies.
IF_REAL_IMPLIES_CARRIER_TYPES = {"open-frontier", "totality-approach"}

# Rule 30 — node types permitted as resolves-edge targets (the cell-id case is
# handled separately by cross-checking against the cell_ids index).
RULE_30_RESOLVES_TARGET_NODE_TYPES = {"open-frontier", "totality-approach"}

# Rules 31, 32 — quantitative_scale kind partitions per v18 spec §2.
# Spec §5.2 lists `coupling` among the kinds requiring units; the note under
# §5.3 explains the convention (couplings are typically unitless but the units
# string is permitted to record a normalization choice).
QS_KINDS_REQUIRING_UNITS = {"energy_scale", "mass", "length", "time", "coupling"}
QS_KINDS_FORBIDDING_UNITS = {"ratio", "dimensionless", "sigma_deviation"}
QS_KINDS_FORBIDDING_LOG10 = {"dimensionless", "sigma_deviation"}


# --- helpers -----------------------------------------------------------------

def _cell_label(fc_id: str, cell_index: int, cell: dict) -> str:
    """Render a cell location identifier for error messages."""
    cell_id = cell.get("cell_id")
    if cell_id:
        return f"nodes[{fc_id}].cells[{cell_index}] (cell_id={cell_id})"
    return f"nodes[{fc_id}].cells[{cell_index}]"


def _build_indices(data: dict) -> tuple[dict, dict, list]:
    """Build lookup indices reused across the v16 validator-side rules.

    Returns:
        edges_by_id:   {edge_id: edge_dict}
        fcs_by_id:     {fc_node_id: fc_node_dict} for formal-classification nodes
        cells_indexed: [(host_fc_id, cell_index, cell_dict), ...] for every cell
    """
    edges_by_id = {e["id"]: e for e in data.get("edges", []) if isinstance(e, dict) and "id" in e}

    fcs_by_id = {
        n["id"]: n
        for n in data.get("nodes", [])
        if isinstance(n, dict) and n.get("type") == "formal-classification" and "id" in n
    }

    cells_indexed = []
    for n in data.get("nodes", []):
        if isinstance(n, dict) and n.get("type") == "formal-classification":
            fc_id = n.get("id")
            for i, cell in enumerate(n.get("cells") or []):
                if isinstance(cell, dict):
                    cells_indexed.append((fc_id, i, cell))

    return edges_by_id, fcs_by_id, cells_indexed


def _build_v17_indices(data: dict, cells_indexed: list) -> tuple[set, dict, list]:
    """Build v17-specific lookup indices.

    Returns:
        cell_ids:           set of every cell_id string declared on any cell
                            (used by Rule 24 to resolve promotes_subtype targets,
                            and reused by Rule 30 to resolve resolves-edge targets).
        carriers_by_node:   {carrier_id: if_real_implies_list} for v17 carrier
                            nodes (open-frontier and totality-approach). Carriers
                            without an if_real_implies field are omitted.
        carriers_flat:      [(carrier_id, entry_idx, entry_dict, impl_idx, impl_dict),
                            ...] — one row per implication, for per-implication rules.
    """
    cell_ids = {
        cell["cell_id"]
        for _, _, cell in cells_indexed
        if isinstance(cell.get("cell_id"), str) and cell.get("cell_id")
    }

    carriers_by_node: dict = {}
    carriers_flat: list = []
    for n in data.get("nodes", []):
        if not isinstance(n, dict):
            continue
        if n.get("type") not in IF_REAL_IMPLIES_CARRIER_TYPES:
            continue
        carrier_id = n.get("id")
        entries = n.get("if_real_implies")
        if not entries:
            continue
        carriers_by_node[carrier_id] = entries
        for e_idx, entry in enumerate(entries):
            if not isinstance(entry, dict):
                continue
            for i_idx, impl in enumerate(entry.get("implications") or []):
                if isinstance(impl, dict):
                    carriers_flat.append((carrier_id, e_idx, entry, i_idx, impl))

    return cell_ids, carriers_by_node, carriers_flat


def _build_v18_indices(data: dict) -> tuple[dict, list]:
    """Build v18-specific lookup indices.

    Returns:
        nodes_by_id:  {node_id: node_dict} for every node, of any type. Used by
                      Rule 29 (resolves edge source must be experimental-program)
                      and Rule 30 (resolves edge target type-check on the node
                      branch).
        qs_entries:   [(context_str, quantitative_scale_dict), ...] — every
                      quantitative_scale entry discovered in the dataset, paired
                      with a human-readable JSON-pointer-ish location for error
                      messages. Used by Rules 31, 32, 33. Surfaces traversed:
                          - node.quantitative_scale (any node; §5.1 restricts to
                            carrier types at JSON-Schema level, but the validator
                            walks all nodes for defense-in-depth)
                          - cell.quantitative_scale
                          - prediction.quantitative_scale (both FC-level
                            predictive_yield[] and cell-level predictions[])
                          - if_real_implies entry.implications[].quantitative_scale
                          - edge.quantitative_scale (§5.7 restricts to bears-on)
                          - resolves edge.sensitivity (a quantitative_scale by $ref)
                          - resolves edge.predictions_per_program[].predicted_value
                            (a quantitative_scale by $ref)
    """
    nodes_by_id = {
        n["id"]: n
        for n in data.get("nodes", [])
        if isinstance(n, dict) and "id" in n
    }

    qs_entries: list = []

    def _push(ctx: str, value) -> None:
        if isinstance(value, dict):
            qs_entries.append((ctx, value))

    for n in data.get("nodes", []):
        if not isinstance(n, dict):
            continue
        n_id = n.get("id", "?")
        _push(f"nodes[{n_id}].quantitative_scale", n.get("quantitative_scale"))

        # Cells (only present on formal-classification nodes per the schema,
        # but the walk is type-agnostic — absent fields are silently skipped).
        for i, cell in enumerate(n.get("cells") or []):
            if not isinstance(cell, dict):
                continue
            _push(f"nodes[{n_id}].cells[{i}].quantitative_scale", cell.get("quantitative_scale"))
            for j, pred in enumerate(cell.get("predictions") or []):
                if isinstance(pred, dict):
                    _push(
                        f"nodes[{n_id}].cells[{i}].predictions[{j}].quantitative_scale",
                        pred.get("quantitative_scale"),
                    )

        # FC-level predictive_yield.
        for j, pred in enumerate(n.get("predictive_yield") or []):
            if isinstance(pred, dict):
                _push(
                    f"nodes[{n_id}].predictive_yield[{j}].quantitative_scale",
                    pred.get("quantitative_scale"),
                )

        # if_real_implies entry.implications[].
        for e_idx, entry in enumerate(n.get("if_real_implies") or []):
            if not isinstance(entry, dict):
                continue
            for i_idx, impl in enumerate(entry.get("implications") or []):
                if isinstance(impl, dict):
                    _push(
                        f"nodes[{n_id}].if_real_implies[{e_idx}]"
                        f".implications[{i_idx}].quantitative_scale",
                        impl.get("quantitative_scale"),
                    )

    for e in data.get("edges", []):
        if not isinstance(e, dict):
            continue
        e_id = e.get("id", "?")
        # bears-on edge-level quantitative_scale (and any non-resolves edge that
        # accidentally carries one — JSON Schema §5.7 will flag it, but the
        # validator still applies the kind/units/log10/citation checks).
        _push(f"edges[{e_id}].quantitative_scale", e.get("quantitative_scale"))

        if e.get("type") == "resolves":
            _push(f"edges[{e_id}].sensitivity", e.get("sensitivity"))
            for k, ppp in enumerate(e.get("predictions_per_program") or []):
                if isinstance(ppp, dict):
                    _push(
                        f"edges[{e_id}].predictions_per_program[{k}].predicted_value",
                        ppp.get("predicted_value"),
                    )

    return nodes_by_id, qs_entries


# --- validator-side rules (v16) ----------------------------------------------

def check_rule_19_forced_by_edge_resolution(edges_by_id: dict, cells_indexed: list) -> list[str]:
    """Rule 19. For every cell with forced_by present, every forced_by[].edge_id
    MUST match the id of some edge. Failure: hard error."""
    errors = []
    for fc_id, idx, cell in cells_indexed:
        forced_by = cell.get("forced_by")
        if not forced_by:
            continue
        for k, entry in enumerate(forced_by):
            if not isinstance(entry, dict):
                continue  # JSON Schema catches non-object entries
            edge_id = entry.get("edge_id")
            if not edge_id:
                continue  # JSON Schema catches missing edge_id
            if edge_id not in edges_by_id:
                errors.append(
                    f"Rule 19: {_cell_label(fc_id, idx, cell)} "
                    f"forced_by[{k}].edge_id '{edge_id}' does not resolve to any edge."
                )
    return errors


def check_rule_20_forced_by_applicable_subtype(edges_by_id: dict, cells_indexed: list) -> list[str]:
    """Rule 20. Every referenced forcing edge MUST have type='cross-classification'
    and subtype ∈ {bijection, categorically-equivalent, derives-from}. The
    'specializes' and 'composition' subtypes do not force cells. Failure: hard error."""
    errors = []
    for fc_id, idx, cell in cells_indexed:
        for k, entry in enumerate(cell.get("forced_by") or []):
            if not isinstance(entry, dict):
                continue
            edge_id = entry.get("edge_id")
            if not edge_id or edge_id not in edges_by_id:
                continue  # Rule 19 catches resolution failures
            edge = edges_by_id[edge_id]
            edge_type = edge.get("type")
            edge_subtype = edge.get("subtype")
            if edge_type != "cross-classification":
                errors.append(
                    f"Rule 20: {_cell_label(fc_id, idx, cell)} "
                    f"forced_by[{k}].edge_id '{edge_id}' has type='{edge_type}'; "
                    f"forcing edges must have type='cross-classification'."
                )
            elif edge_subtype not in RULE_20_FORCING_SUBTYPES:
                errors.append(
                    f"Rule 20: {_cell_label(fc_id, idx, cell)} "
                    f"forced_by[{k}].edge_id '{edge_id}' has subtype='{edge_subtype}'; "
                    f"forcing edges must have subtype ∈ "
                    f"{{bijection, categorically-equivalent, derives-from}}."
                )
    return errors


def check_rule_21_forced_by_host_classification(edges_by_id: dict, cells_indexed: list) -> list[str]:
    """Rule 21. For every forced_by[].edge_id on a cell hosted by FC F, the
    referenced edge's from or to MUST equal F.id. Failure: hard error."""
    errors = []
    for fc_id, idx, cell in cells_indexed:
        for k, entry in enumerate(cell.get("forced_by") or []):
            if not isinstance(entry, dict):
                continue
            edge_id = entry.get("edge_id")
            if not edge_id or edge_id not in edges_by_id:
                continue  # Rule 19 catches resolution failures
            edge = edges_by_id[edge_id]
            edge_from = edge.get("from")
            edge_to = edge.get("to")
            if edge_from != fc_id and edge_to != fc_id:
                errors.append(
                    f"Rule 21: {_cell_label(fc_id, idx, cell)} "
                    f"forced_by[{k}].edge_id '{edge_id}' connects "
                    f"'{edge_from}' ↔ '{edge_to}', neither matching host "
                    f"classification '{fc_id}'."
                )
    return errors


def check_rule_22_axis_mapping_recommended(edges: list) -> list[str]:
    """Rule 22. Cross-classification edges with subtype ∈ {bijection,
    categorically-equivalent} and status='established' (or status absent —
    'established' is the default) SHOULD carry axis_mapping. Failure: WARNING.

    Warning-only so the v15.3 → v16 bump doesn't break CI before Step 5's
    ADE-clique authoring sweep populates axis_mapping on these edges."""
    warnings = []
    for edge in edges:
        if not isinstance(edge, dict):
            continue
        if edge.get("type") != "cross-classification":
            continue
        if edge.get("subtype") not in RULE_22_RECOMMENDED_SUBTYPES:
            continue
        if edge.get("status", "established") != "established":
            continue
        if edge.get("axis_mapping"):
            continue
        warnings.append(
            f"Rule 22: edge '{edge.get('id')}' "
            f"(subtype={edge.get('subtype')}, status=established, "
            f"{edge.get('from')} → {edge.get('to')}) lacks axis_mapping."
        )
    return warnings


def check_rule_23_axis_mapping_axis_resolution(edges: list, fcs_by_id: dict) -> list[str]:
    """Rule 23. For every axis_mapping[] entry on an edge from F1 to F2,
    from_axis MUST appear as the 'name' of some entry in F1.classification_axes;
    to_axis MUST appear similarly in F2.classification_axes. Failure: hard error."""
    errors = []
    for edge in edges:
        if not isinstance(edge, dict):
            continue
        axis_mapping = edge.get("axis_mapping")
        if not axis_mapping:
            continue
        edge_id = edge.get("id")
        from_id = edge.get("from")
        to_id = edge.get("to")
        from_fc = fcs_by_id.get(from_id)
        to_fc = fcs_by_id.get(to_id)
        from_axis_names = {
            ax.get("name")
            for ax in (from_fc.get("classification_axes", []) if from_fc else [])
            if isinstance(ax, dict)
        }
        to_axis_names = {
            ax.get("name")
            for ax in (to_fc.get("classification_axes", []) if to_fc else [])
            if isinstance(ax, dict)
        }
        for k, mapping in enumerate(axis_mapping):
            if not isinstance(mapping, dict):
                continue
            from_axis = mapping.get("from_axis")
            to_axis = mapping.get("to_axis")
            # from_axis check
            if from_fc is None:
                errors.append(
                    f"Rule 23: edge '{edge_id}' axis_mapping[{k}].from_axis "
                    f"'{from_axis}' cannot be resolved — source node '{from_id}' "
                    f"is not a formal-classification."
                )
            elif from_axis and from_axis not in from_axis_names:
                errors.append(
                    f"Rule 23: edge '{edge_id}' axis_mapping[{k}].from_axis "
                    f"'{from_axis}' does not match any axis name in source FC "
                    f"'{from_id}'. Available: {sorted(n for n in from_axis_names if n)}."
                )
            # to_axis check
            if to_fc is None:
                errors.append(
                    f"Rule 23: edge '{edge_id}' axis_mapping[{k}].to_axis "
                    f"'{to_axis}' cannot be resolved — target node '{to_id}' "
                    f"is not a formal-classification."
                )
            elif to_axis and to_axis not in to_axis_names:
                errors.append(
                    f"Rule 23: edge '{edge_id}' axis_mapping[{k}].to_axis "
                    f"'{to_axis}' does not match any axis name in target FC "
                    f"'{to_id}'. Available: {sorted(n for n in to_axis_names if n)}."
                )
    return errors


# --- validator-side rules (v17) ----------------------------------------------

def check_rule_24_if_real_implies_target_resolution(
    fcs_by_id: dict, edges_by_id: dict, cell_ids: set, carriers_flat: list
) -> list[str]:
    """Rule 24. For each if_real_implies[].implications[] entry, target must
    resolve correctly per kind:
      - new_cell, new_axis      → existing formal-classification id (string)
      - forced_edge             → target.from and target.to are FC ids
      - promotes_subtype        → existing edge id OR existing cell_id (string)
      - new_FC                  → null
    Failure: hard error.

    Note: JSON-Schema rules §3.2-§3.4 enforce the shape (null / string / object);
    this rule adds the cross-record id-resolution check that JSON Schema cannot
    express. The new_FC null check is defense-in-depth — §3.2 enforces it too.
    """
    errors = []
    fc_id_set = set(fcs_by_id.keys())
    for carrier_id, e_idx, _entry, i_idx, impl in carriers_flat:
        kind = impl.get("kind")
        target = impl.get("target")
        ctx = f"nodes[{carrier_id}].if_real_implies[{e_idx}].implications[{i_idx}]"

        if kind in ("new_cell", "new_axis"):
            if not isinstance(target, str) or target not in fc_id_set:
                errors.append(
                    f"Rule 24: {ctx} kind={kind} requires target to be an existing "
                    f"formal-classification id; got {target!r}."
                )

        elif kind == "forced_edge":
            if not isinstance(target, dict):
                continue  # JSON-Schema §3.4 catches non-object targets
            t_from = target.get("from")
            t_to = target.get("to")
            if t_from not in fc_id_set:
                errors.append(
                    f"Rule 24: {ctx} forced_edge target.from={t_from!r} does not "
                    f"resolve to an existing formal-classification id."
                )
            if t_to not in fc_id_set:
                errors.append(
                    f"Rule 24: {ctx} forced_edge target.to={t_to!r} does not "
                    f"resolve to an existing formal-classification id."
                )

        elif kind == "promotes_subtype":
            if not isinstance(target, str):
                continue  # JSON-Schema §3.3 catches non-string targets
            if target not in edges_by_id and target not in cell_ids:
                errors.append(
                    f"Rule 24: {ctx} promotes_subtype target={target!r} does not "
                    f"match any existing edge id or cell_id."
                )

        elif kind == "new_FC":
            if target is not None:
                # JSON-Schema §3.2 also catches this; included here for defense-in-depth.
                errors.append(
                    f"Rule 24: {ctx} new_FC requires target=null; got {target!r}."
                )
    return errors


def check_rule_25_resolution_uniqueness(carriers_by_node: dict) -> list[str]:
    """Rule 25. Within a single carrier's if_real_implies array, two entries
    with the same `resolution` value are forbidden. Uniqueness is enforced
    only within a single carrier — the same `resolution` value may appear on
    different carriers. Failure: hard error."""
    errors = []
    for carrier_id, entries in carriers_by_node.items():
        seen: dict = {}
        for e_idx, entry in enumerate(entries):
            if not isinstance(entry, dict):
                continue
            res = entry.get("resolution")
            if res is None:
                continue  # JSON Schema catches missing 'resolution'
            if res in seen:
                errors.append(
                    f"Rule 25: nodes[{carrier_id}].if_real_implies — "
                    f"resolution={res!r} appears at indices {seen[res]} and {e_idx}; "
                    f"must be unique within a carrier."
                )
            else:
                seen[res] = e_idx
    return errors


def check_rule_26_forced_edge_self_edge_restriction(carriers_flat: list) -> list[str]:
    """Rule 26. A forced_edge implication with target.from == target.to is only
    permitted with subtype='specializes' (matching v16's closure-constraint
    self-edge convention introduced for SM structurally-excluded cells). For
    any other subtype, target.from and target.to must be distinct FC ids.
    Failure: hard error."""
    errors = []
    for carrier_id, e_idx, _entry, i_idx, impl in carriers_flat:
        if impl.get("kind") != "forced_edge":
            continue
        target = impl.get("target")
        if not isinstance(target, dict):
            continue  # Rule 24 / JSON Schema §3.4 catches shape issues
        t_from = target.get("from")
        t_to = target.get("to")
        if t_from is None or t_to is None or t_from != t_to:
            continue
        if target.get("subtype") != "specializes":
            ctx = f"nodes[{carrier_id}].if_real_implies[{e_idx}].implications[{i_idx}]"
            errors.append(
                f"Rule 26: {ctx} forced_edge self-edge ({t_from} == {t_to}) "
                f"requires subtype='specializes'; got {target.get('subtype')!r}."
            )
    return errors


# --- validator-side rules (v18) ----------------------------------------------

def check_rule_27_predictions_per_program_non_empty(edges: list) -> list[str]:
    """Rule 27. For each edge with type='resolves':
      - if predictions_per_program is an empty array, exclusion_only MUST be
        present and equal to true;
      - if predictions_per_program is non-empty, exclusion_only is either
        absent or false.
    Operationalizes scope memo §3's 'either non-empty with cited per-program
    values, or an explicit note that the experiment is exclusion-only with
    citation.' Failure: hard error."""
    errors = []
    for e in edges:
        if not isinstance(e, dict) or e.get("type") != "resolves":
            continue
        e_id = e.get("id", "?")
        ppp = e.get("predictions_per_program")
        if not isinstance(ppp, list):
            # JSON Schema §5.6 catches missing / non-list predictions_per_program.
            continue
        eo = e.get("exclusion_only")
        if len(ppp) == 0:
            if eo is not True:
                errors.append(
                    f"Rule 27: edges[{e_id}] predictions_per_program is empty "
                    f"but exclusion_only is not true (got exclusion_only={eo!r}). "
                    f"Empty predictions_per_program requires exclusion_only=true "
                    f"with citation."
                )
        else:
            if eo is True:
                errors.append(
                    f"Rule 27: edges[{e_id}] has non-empty predictions_per_program "
                    f"({len(ppp)} entries) but exclusion_only=true. The two are "
                    f"mutually exclusive: predictions_per_program is the "
                    f"discriminating-prediction surface; exclusion_only marks "
                    f"experiments that do not discriminate."
                )
    return errors


def check_rule_28_predictions_per_program_citation_presence(edges: list) -> list[str]:
    """Rule 28. For each entry in a resolves edge's predictions_per_program[]:
    the entry's citations array MUST be non-empty, AND the embedded
    predicted_value's citations array MUST be non-empty. Failure: hard error.

    Both are also enforced by minItems: 1 in the relevant $defs; this rule
    provides defense-in-depth and produces clearer messages for authors."""
    errors = []
    for e in edges:
        if not isinstance(e, dict) or e.get("type") != "resolves":
            continue
        e_id = e.get("id", "?")
        for k, ppp in enumerate(e.get("predictions_per_program") or []):
            if not isinstance(ppp, dict):
                continue  # JSON Schema catches non-object entries
            ctx = f"edges[{e_id}].predictions_per_program[{k}]"
            cits = ppp.get("citations")
            if not isinstance(cits, list) or len(cits) == 0:
                errors.append(
                    f"Rule 28: {ctx} has empty/missing citations array; "
                    f"per-program predictions require ≥1 citation to the "
                    f"program-internal calculation."
                )
            pv = ppp.get("predicted_value")
            if isinstance(pv, dict):
                pv_cits = pv.get("citations")
                if not isinstance(pv_cits, list) or len(pv_cits) == 0:
                    errors.append(
                        f"Rule 28: {ctx}.predicted_value has empty/missing "
                        f"citations array; the predicted numerical value "
                        f"requires ≥1 citation."
                    )
    return errors


def check_rule_29_resolves_source_type(edges: list, nodes_by_id: dict) -> list[str]:
    """Rule 29. For each edge with type='resolves', the node referenced by
    edge.from MUST have type='experimental-program'. Failure: hard error."""
    errors = []
    for e in edges:
        if not isinstance(e, dict) or e.get("type") != "resolves":
            continue
        e_id = e.get("id", "?")
        src_id = e.get("from")
        src = nodes_by_id.get(src_id)
        if src is None:
            errors.append(
                f"Rule 29: edges[{e_id}] from={src_id!r} does not resolve to any "
                f"node in the dataset."
            )
        elif src.get("type") != "experimental-program":
            errors.append(
                f"Rule 29: edges[{e_id}] from={src_id!r} has type="
                f"{src.get('type')!r}; resolves edges require source type="
                f"'experimental-program'."
            )
    return errors


def check_rule_30_resolves_target_type(
    edges: list, nodes_by_id: dict, cell_ids: set
) -> list[str]:
    """Rule 30. For each edge with type='resolves', edge.to MUST resolve to one
    of: (a) a cell id in some formal-classification node's cells[] array;
    (b) an open-frontier node id; (c) a totality-approach node id. Targets
    resolving to architectures, regime-content nodes, candidate-foundational
    programs, formal-classification nodes as wholes, or other experimental-
    program nodes are forbidden. Failure: hard error."""
    errors = []
    for e in edges:
        if not isinstance(e, dict) or e.get("type") != "resolves":
            continue
        e_id = e.get("id", "?")
        tgt = e.get("to")
        if tgt in cell_ids:
            continue  # case (a): cell-id target
        node = nodes_by_id.get(tgt)
        if node is None:
            errors.append(
                f"Rule 30: edges[{e_id}] to={tgt!r} does not resolve to any cell "
                f"id or node id in the dataset."
            )
            continue
        node_type = node.get("type")
        if node_type not in RULE_30_RESOLVES_TARGET_NODE_TYPES:
            errors.append(
                f"Rule 30: edges[{e_id}] to={tgt!r} resolves to a node of type "
                f"{node_type!r}; resolves edges target cell ids, open-frontier "
                f"nodes, or totality-approach nodes only."
            )
    return errors


def check_rule_31_quantitative_scale_units_conformance(qs_entries: list) -> list[str]:
    """Rule 31. For each quantitative_scale entry: if kind ∈ {energy_scale,
    mass, length, time, coupling} then units MUST be present and a non-empty
    string. If kind ∈ {ratio, dimensionless, sigma_deviation} then units MUST
    be absent. Failure: hard error.

    Redundant with JSON-Schema §5.2 + §5.3; provides defense-in-depth and
    clearer per-entry context for authors."""
    errors = []
    for ctx, qs in qs_entries:
        kind = qs.get("kind")
        if kind in QS_KINDS_REQUIRING_UNITS:
            if "units" not in qs:
                errors.append(
                    f"Rule 31: {ctx} kind={kind!r} requires the units field "
                    f"to be present (non-empty string)."
                )
            else:
                units = qs.get("units")
                if not isinstance(units, str) or not units.strip():
                    errors.append(
                        f"Rule 31: {ctx} kind={kind!r} requires units to be a "
                        f"non-empty string; got {units!r}."
                    )
        elif kind in QS_KINDS_FORBIDDING_UNITS:
            if "units" in qs:
                errors.append(
                    f"Rule 31: {ctx} kind={kind!r} forbids the units field; "
                    f"got units={qs.get('units')!r}."
                )
    return errors


def check_rule_32_quantitative_scale_log10_conformance(qs_entries: list) -> list[str]:
    """Rule 32. For each quantitative_scale entry: if kind ∈ {dimensionless,
    sigma_deviation} then log10 MUST be absent. log10 is permitted on the six
    kinds where order-of-magnitude framing is meaningful (ratio, energy_scale,
    mass, length, time, coupling). Failure: hard error.

    Redundant with JSON-Schema §5.4; provides defense-in-depth."""
    errors = []
    for ctx, qs in qs_entries:
        kind = qs.get("kind")
        if kind in QS_KINDS_FORBIDDING_LOG10 and "log10" in qs:
            errors.append(
                f"Rule 32: {ctx} kind={kind!r} forbids the log10 field; "
                f"got log10={qs.get('log10')!r}."
            )
    return errors


def check_rule_33_quantitative_scale_citation_presence(qs_entries: list) -> list[str]:
    """Rule 33. For each quantitative_scale entry (on any surface — node, cell,
    prediction, edge, if_real_implies implication, resolves.sensitivity, or
    predictions_per_program[].predicted_value), the citations array MUST be
    non-empty. Failure: hard error.

    Redundant with minItems: 1 in §2's $def; provides defense-in-depth and
    flags author-supplied entries that omit the field entirely."""
    errors = []
    for ctx, qs in qs_entries:
        cits = qs.get("citations")
        if not isinstance(cits, list) or len(cits) == 0:
            errors.append(
                f"Rule 33: {ctx} has empty/missing citations array; every "
                f"quantitative_scale entry requires ≥1 citation per the §4 "
                f"admissibility test."
            )
    return errors


def run_validator_side_rules(data: dict) -> tuple[list[str], list[str]]:
    """Run all v16 + v17 + v18 validator-side rules. Returns (errors, warnings)."""
    edges_by_id, fcs_by_id, cells_indexed = _build_indices(data)
    cell_ids, carriers_by_node, carriers_flat = _build_v17_indices(data, cells_indexed)
    nodes_by_id, qs_entries = _build_v18_indices(data)
    edges = data.get("edges", [])

    errors: list[str] = []
    # v16 rules
    errors.extend(check_rule_19_forced_by_edge_resolution(edges_by_id, cells_indexed))
    errors.extend(check_rule_20_forced_by_applicable_subtype(edges_by_id, cells_indexed))
    errors.extend(check_rule_21_forced_by_host_classification(edges_by_id, cells_indexed))
    errors.extend(check_rule_23_axis_mapping_axis_resolution(edges, fcs_by_id))
    # v17 rules
    errors.extend(check_rule_24_if_real_implies_target_resolution(
        fcs_by_id, edges_by_id, cell_ids, carriers_flat
    ))
    errors.extend(check_rule_25_resolution_uniqueness(carriers_by_node))
    errors.extend(check_rule_26_forced_edge_self_edge_restriction(carriers_flat))
    # v18 rules
    errors.extend(check_rule_27_predictions_per_program_non_empty(edges))
    errors.extend(check_rule_28_predictions_per_program_citation_presence(edges))
    errors.extend(check_rule_29_resolves_source_type(edges, nodes_by_id))
    errors.extend(check_rule_30_resolves_target_type(edges, nodes_by_id, cell_ids))
    errors.extend(check_rule_31_quantitative_scale_units_conformance(qs_entries))
    errors.extend(check_rule_32_quantitative_scale_log10_conformance(qs_entries))
    errors.extend(check_rule_33_quantitative_scale_citation_presence(qs_entries))

    warnings: list[str] = []
    warnings.extend(check_rule_22_axis_mapping_recommended(edges))

    return errors, warnings


# --- run ---------------------------------------------------------------------

def main() -> int:
    if not SCHEMA_PATH.exists():
        print(f"ERROR: schema file not found at {SCHEMA_PATH}")
        return 2
    if not DATA_PATH.exists():
        print(f"ERROR: data file not found at {DATA_PATH}")
        return 2

    schema = json.loads(SCHEMA_PATH.read_text())
    data = json.loads(DATA_PATH.read_text())

    # 1. JSON Schema validation
    validator = Draft202012Validator(schema)
    schema_errors = list(validator.iter_errors(data))

    # Partition schema errors into legacy vs new
    legacy = [e for e in schema_errors if KNOWN_LEGACY_SIGNATURE in e.message]
    new_schema = [e for e in schema_errors if KNOWN_LEGACY_SIGNATURE not in e.message]

    # 2. Validator-side rules (19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33 errors; 22 warning)
    rule_errors, rule_warnings = run_validator_side_rules(data)

    # Header
    print("=" * 60)
    print(f"Validation report: {DATA_PATH.name}")
    print(f"  Schema:     {SCHEMA_PATH.name}")
    print(f"  Nodes:      {len(data.get('nodes', []))}")
    print(f"  Edges:      {len(data.get('edges', []))}")
    print(f"  Families:   {len(data.get('families', []))}")
    print("=" * 60)

    # Legacy summary
    print(f"\nLegacy errors (constrains-subtype carryover): {len(legacy)}")
    if len(legacy) > KNOWN_LEGACY_ERROR_COUNT:
        print(
            f"  WARNING: expected at most {KNOWN_LEGACY_ERROR_COUNT}, "
            f"got {len(legacy)}. New constrains errors are appearing — investigate."
        )

    # New schema errors — fail CI
    print(f"\nNew schema errors: {len(new_schema)}")
    if new_schema:
        for i, e in enumerate(new_schema[:20], 1):
            path = " → ".join(str(p) for p in e.absolute_path) or "(root)"
            print(f"  {i}. at {path}")
            print(f"     {e.message[:200]}")
        if len(new_schema) > 20:
            print(f"  ... and {len(new_schema) - 20} more")

    # Validator-side rule errors — fail CI
    print(
        f"\nValidator-side rule errors "
        f"(rules 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33): "
        f"{len(rule_errors)}"
    )
    if rule_errors:
        for i, msg in enumerate(rule_errors[:20], 1):
            print(f"  {i}. {msg}")
        if len(rule_errors) > 20:
            print(f"  ... and {len(rule_errors) - 20} more")

    # Validator-side rule warnings — do NOT fail CI
    print(f"\nValidator-side warnings (rule 22, axis_mapping recommended): {len(rule_warnings)}")
    if rule_warnings:
        for i, msg in enumerate(rule_warnings[:20], 1):
            print(f"  {i}. {msg}")
        if len(rule_warnings) > 20:
            print(f"  ... and {len(rule_warnings) - 20} more")

    # Decide pass/fail
    print()
    fatal = bool(new_schema) or bool(rule_errors) or len(legacy) > KNOWN_LEGACY_ERROR_COUNT

    if new_schema:
        print("FAIL — new schema errors detected. Fix before merging.")
    if rule_errors:
        print("FAIL — validator-side rule errors detected. Fix before merging.")
    if len(legacy) > KNOWN_LEGACY_ERROR_COUNT:
        print("FAIL — more legacy errors than expected. Did new constrains edges land?")

    if fatal:
        return 1

    tail = (
        f" ({len(rule_warnings)} warning{'s' if len(rule_warnings) != 1 else ''})"
        if rule_warnings else ""
    )
    print(f"PASS — dataset validates cleanly (legacy errors within tolerance){tail}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
