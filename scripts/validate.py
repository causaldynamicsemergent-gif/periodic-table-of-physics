#!/usr/bin/env python3
"""
validate.py — the data-integrity tripwire for the Periodic Table of Physics repo.

What this does:
  1. Loads the schema (schema/Map_v15_3_schema.json).
  2. Loads the consolidated dataset (data/Map_v34_consolidated.json).
  3. Validates the dataset against the schema.
  4. Distinguishes two kinds of errors:
       (a) Known legacy errors — 4 pre-firewall 'constrains'-subtype carryovers.
           These are tolerated; documented in PROJECT_STATE_v34_MVP_complete.md.
       (b) New errors — anything else. CI fails on these.

If anything other than the 4 legacy 'constrains' errors appears,
this script exits with code 1 and GitHub will flag the commit.
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

SCHEMA_PATH = Path("schema/Map_v15_3_schema.json")
DATA_PATH = Path("data/Map_v34_consolidated.json")

# Legacy error tolerance: pre-firewall 'constrains' subtype carryover.
# Documented in PROJECT_STATE_v34_MVP_complete.md.
KNOWN_LEGACY_ERROR_COUNT = 4
KNOWN_LEGACY_SIGNATURE = "'constrains' is not one of"

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

    validator = Draft202012Validator(schema)
    errors = list(validator.iter_errors(data))

    # Partition into legacy vs new
    legacy = [e for e in errors if KNOWN_LEGACY_SIGNATURE in e.message]
    new = [e for e in errors if KNOWN_LEGACY_SIGNATURE not in e.message]

    # Header
    print("=" * 60)
    print(f"Validation report: {DATA_PATH.name}")
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

    # New errors — these are the ones that fail CI
    print(f"\nNew schema errors: {len(new)}")
    if new:
        for i, e in enumerate(new[:20], 1):
            path = " → ".join(str(p) for p in e.absolute_path) or "(root)"
            print(f"  {i}. at {path}")
            print(f"     {e.message[:200]}")
        if len(new) > 20:
            print(f"  ... and {len(new) - 20} more")

    # Decide pass/fail
    print()
    if new:
        print("FAIL — new schema errors detected. Fix before merging.")
        return 1

    if len(legacy) > KNOWN_LEGACY_ERROR_COUNT:
        print("FAIL — more legacy errors than expected. Did new constrains edges land?")
        return 1

    print("PASS — dataset validates cleanly (legacy errors within tolerance).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
