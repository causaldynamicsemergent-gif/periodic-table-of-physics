#!/usr/bin/env python3
"""
validate.py — the data-integrity tripwire for the Periodic Table of Physics repo.

What this does:
  1. Loads the schema (schema/Map_v17_schema.json).
  2. Loads the consolidated dataset (data/Map_v34_consolidated.json).
  3. Validates the dataset against the schema.
  4. Runs the v16 validator-side rules 19-23 (Predictive Layer Phase A) on the
     loaded data. Four are hard errors; rule 22 (axis_mapping recommended on
     established bijection / categorically-equivalent edges) is warning-level.
  5. Runs the v17 validator-side rules 24-26 (Predictive Layer Phase B) on the
     loaded data. All three are hard errors. See MAP_v17_schema_spec_extension.md §5.
  6. Distinguishes three classes of finding:
       (a) Known legacy errors — 4 pre-firewall 'constrains'-subtype carryovers.
           Tolerated; documented in PROJECT_INFRASTRUCTURE.md §2.
       (b) New errors — any schema error not matching the legacy signature,
           plus any validator-side rule 19/20/21/23/24/25/26 finding. CI fails
           on these.
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

SCHEMA_PATH = Path("schema/Map_v17_schema.json")
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
                            (used by Rule 24 to resolve promotes_subtype targets).
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


def run_validator_side_rules(data: dict) -> tuple[list[str], list[str]]:
    """Run all v16 + v17 validator-side rules. Returns (errors, warnings)."""
    edges_by_id, fcs_by_id, cells_indexed = _build_indices(data)
    cell_ids, carriers_by_node, carriers_flat = _build_v17_indices(data, cells_indexed)
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

    # 2. Validator-side rules (19, 20, 21, 23, 24, 25, 26 errors; 22 warning)
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
    print(f"\nValidator-side rule errors (rules 19, 20, 21, 23, 24, 25, 26): {len(rule_errors)}")
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
