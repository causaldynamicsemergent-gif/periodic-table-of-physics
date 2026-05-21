#!/usr/bin/env python3
"""Build worker.js by injecting the v40 dataset into the skeleton.

The skeleton has a line `// __DATA_INJECTION_POINT__` which we replace
with `const DATA = { ...full data JSON... };`. JSON is also valid JS
object-literal syntax (when the JSON is well-formed and uses only
standard types — which our schema enforces), so we inline directly.
"""
import json, sys, pathlib

WORK = pathlib.Path(__file__).resolve().parent
skeleton = (WORK / "worker_skeleton.js").read_text(encoding="utf-8")
data_text = (WORK / "data.json").read_text(encoding="utf-8")

# Sanity: data_text must be valid JSON
json.loads(data_text)

# Sanity: marker must appear exactly once
marker = "// __DATA_INJECTION_POINT__"
assert skeleton.count(marker) == 1, f"marker count = {skeleton.count(marker)}"

# JSON is a subset of JS literal syntax. The only characters that are valid
# in JSON strings but problematic in JS source are U+2028 (LINE SEPARATOR)
# and U+2029 (PARAGRAPH SEPARATOR), which JSON.stringify leaves unescaped
# but JS source treats as line terminators inside string literals. We
# pre-emptively replace them with their \u-escapes.
for bad, esc in [("\u2028", "\\u2028"), ("\u2029", "\\u2029")]:
    if bad in data_text:
        # Need to be careful: only replace bytes inside string literals.
        # Simpler approach: re-serialize via json.dumps with ensure_ascii=False
        # but then escape these two. Since we already loaded the JSON, do this:
        obj = json.loads(data_text)
        data_text = json.dumps(obj, ensure_ascii=False)
        data_text = data_text.replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
        break

injected = f"const DATA = {data_text};"
worker = skeleton.replace(marker, injected)

out = WORK / "worker.js"
out.write_text(worker, encoding="utf-8")
print(f"Wrote {out} ({out.stat().st_size:,} bytes, {len(worker.splitlines()):,} lines)")
