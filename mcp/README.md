# MCP worker — source of truth

This directory holds the source code for the Cloudflare Worker that serves the
Map of Physics dataset over the Model Context Protocol (MCP). It closes the gap
noted in `PROJECT_INFRASTRUCTURE.md` §3, which says the deployed `worker.js`
"should also be committed to the GitHub repo under `/mcp/worker.js` so the
source code is version-controlled."

## Live deployment

- **URL:** `https://map-of-physics.eddie-8e5.workers.dev`
- **Currently serving:** v40 data / v17 schema / Phase B / server version 3.1.0
- **Tool count:** 29

To check the deployment is healthy, GET the URL. The banner should match this
file's `worker.js` header.

## Contents

| File | Purpose |
|---|---|
| `worker.js` | The bundled worker — skeleton + embedded v40 data. This is what gets pasted into the Cloudflare dashboard editor. ~1.5 MB, ~23k lines. **Build artifact**: do not hand-edit. |
| `worker_skeleton.js` | The hand-edited source. ~50 KB. **This is what you edit.** |
| `build_worker.py` | The build script that injects the data file into the skeleton to produce `worker.js`. |

The data file itself is **not** in this directory. The canonical data lives at
`/data/Map_v34_consolidated.json` (single source of truth, validator-gated by
CI). The build script reads it from there.

## Rebuild flow

When the dataset, schema, or tool surface changes, the worker needs to be
rebuilt and redeployed. A new Claude session should be able to do this end-to-
end from the files in this directory + the canonical data file. The steps:

1. **Edit `worker_skeleton.js`** to add / change tool handlers, fix bugs, etc.
   Update the header's `VERSION HISTORY` and the `COUNTS` block.
2. **Fetch the canonical data file** from
   `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json`
   and save it as `data.json` in the same directory as `build_worker.py`.
3. **Run the build:** `python3 build_worker.py`. Output is `worker.js` next
   to the script.
4. **Smoke-test** by invoking the worker locally with mock `Request` objects
   (Node ≥18 has `Request` / `Response` / `fetch` globally). A reusable test
   harness covering every tool handler should be checked in alongside this
   README in a future pass; for now, see the inline tests run during the
   Phase B build (transcript referenced in `PREDICTIVE_LAYER_PHASE_B_HANDOFF.md`).
5. **Deploy** per `PROJECT_INFRASTRUCTURE.md` §3: log into Cloudflare, find
   the worker named `map-of-physics`, click "Edit code", paste the contents
   of `worker.js`, click "Save and Deploy". Verify by GET-ing the worker URL
   in a browser.
6. **Commit** the updated `worker.js`, `worker_skeleton.js`, and (if changed)
   `build_worker.py` back to this directory.

The data file is 1.49 MB which exceeds the GitHub blob fallback size limit;
fetch via raw CDN or via the MCP server itself.

## Tool surface

The 29 tools are documented in each handler's case in `worker_skeleton.js`'s
`tools/list` response. The shape and authority for additions:

- Phase A (v16) added 3 tools (`find_forced_cells`, `get_forcing_constraint`,
  `get_axis_mapping`) and extended `find_cells`. Authority:
  `MAP_v16_schema_spec_extension.md`.
- Phase B (v17) added 1 tool (`find_signal_implications`) and extended
  `find_loose_ends`. Authority: `MAP_v17_schema_spec_extension.md`.
- Phase C (queued) will add `quantitative_scale` and `resolves` machinery.
  Authority will be `MAP_v18_schema_spec_extension.md` when written.

New tools should be added in the same pattern: add the handler function, add
the routing case in the dispatch switch, add the tool descriptor in the
`tools/list` response. Update `server_info`'s `tool_count`, the version in
the header, and the banner string in the GET handler.

## Spec compliance notes

- v16 spec §"When absent" (constructive_status): an absent field is NOT a
  synonym for `indeterminate`. `find_forced_cells` and `find_cells` filters
  do not match cells with no field; `server_info` reports
  `constructive_status_absent_cells` separately so cell accounting is
  transparent (realized + forbidden + conjectured + indeterminate + absent
  = total_cells).
- v17 spec §3 conditional rules on `if_real_implies` `target` shape per
  `kind` are enforced by the schema (`Map_v17_schema.json`) and the
  validator (`scripts/validate.py` Rules 24–26). The worker is read-only
  and does not re-enforce them.

## Why bundle the data into the worker?

Cloudflare Workers cannot read files from a Git repo at runtime. They have
two options for static data: bundle it into the worker source (what we do) or
fetch it from R2 / KV / an external URL on each request. Bundling keeps the
hot path zero-latency (data is in memory at worker startup, indexes are built
once per isolate) and avoids egress costs. The trade-off is that every data
update requires a rebuild + redeploy, which is the documented flow above.
