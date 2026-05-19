# Step 4 — Deployment guide (lightweight v4 — fetches data from the repo)

## What changed in this build

The explorer no longer carries the dataset inside it. Instead it fetches `data/Map_v34_consolidated.json` from the repo at runtime, transforms it in-browser, and renders. This solves three things at once:

- **The HTML file dropped from 1.5 MB to 98 KB.** It can now be uploaded to any Claude conversation as a normal-size text file without eating context.
- **The data is no longer "snapshotted" inside the HTML.** Whatever's currently committed at `/data/Map_v34_consolidated.json` is what every visitor sees. Update the data file, the live site reflects it on next page load — no rebuild step needed.
- **The architecture matches the Step 1 plan.** The plan called for `data/` to be the canonical source of truth. The explorer now actually treats it that way.

## File to upload

There's only **one file** to deploy:

- **`Map_v34_explorer.html`** — 98 KB. Single self-contained HTML/CSS/JS file.

The deployment guide itself (`DEPLOYMENT_step4.md`) is also in the outputs folder for your reference, but it doesn't need to live in the repo.

## How the data lookup works

When the explorer loads, it tries three URLs in order until one returns a valid JSON file:

1. `./Map_v34_consolidated.json` — a sibling file next to the HTML. Lets you run fully self-contained locally if you ever want.
2. `../data/Map_v34_consolidated.json` — relative path one level up. **This is the path that resolves correctly when served from GitHub Pages** (the HTML lives at `/explorer/Map_v34_explorer.html`, the data lives at `/data/Map_v34_consolidated.json`).
3. `https://raw.githubusercontent.com/causaldynamicsemergent-gif/periodic-table-of-physics/main/data/Map_v34_consolidated.json` — final fallback for opening the HTML from a local filesystem.

You don't need to do anything to set this up — the data file is already committed where the explorer expects to find it.

## Deploy to GitHub Pages

1. Open `https://github.com/causaldynamicsemergent-gif/periodic-table-of-physics/tree/main/explorer`
2. **Add file → Upload files** (top-right)
3. Drag `Map_v34_explorer.html` in. GitHub will prompt to replace the 1.5 MB version with this 98 KB version.
4. Commit message: `Step 4 (v4): lightweight explorer that fetches data/Map_v34_consolidated.json at runtime — drops file size from 1.5 MB to 98 KB`
5. **Commit changes**

Live URL is unchanged:

```
https://causaldynamicsemergent-gif.github.io/periodic-table-of-physics/explorer/Map_v34_explorer.html
```

In about 60 seconds after the commit, the new version is live. On first visit the browser will fetch both the HTML (~98 KB) and the data file (~1.5 MB) — but the data file gets cached by the browser, so subsequent loads are near-instant.

## What you should see when it loads

While fetching the data file (usually under a second on broadband), the sidebar shows a brief "Loading dataset…" line. Then the full periodic table renders and the sidebar shows the legend default state. If the fetch fails, the sidebar shows an explicit error message with a retry button.

The Claude preview pane in *this* chat may or may not render the data depending on iframe sandbox restrictions — GitHub raw serves CORS-friendly headers, so it generally works, but if you see the error message in the preview, that's expected and not a real bug. The deployed version on github.io will work normally.

## Smoke test — once deployed

1. Open the live URL.
2. The periodic table renders. 13 sector rows, 30 tiles, MGr with ⚠5, CAO with ⚠1, all the symbols.
3. Open browser DevTools → Network tab → reload — confirm one request to `../data/Map_v34_consolidated.json` (or to the raw URL), 200 OK, ~1.5 MB.
4. Click Browse ▾ → search "modified gravity" → click → sidebar fills with MGr details, map stays in view.
5. Drag the splitter. Zoom buttons in top-left. All as before.

## Caveats that still stand

- **19 of 30 classifications use synthesized descriptions.** When the canonical `Map_v34_consolidated.json` is updated to include full prose for those 19, the live explorer will pick them up automatically — no rebuild needed.
- **Falsification sector tagging** follows live data (the PBH-LIGO falsification is under `compact-astrophysical-objects` / Astrophysics sector, not "EM phenomena" as the spec doc lists).
- **The ↻ refresh button in the header** is now somewhat redundant — the data is already fetched live. It mostly serves as a connectivity check.

## Going forward

Future steps in this project should follow the same pattern: the canonical data lives in `/data/`, the rendering layer fetches it. The build pipeline only needs to run when the *rendering* changes, not when the data changes. The MCP server, GitHub Pages, and this fetch-at-runtime explorer form one connected system around the same source of truth.

That's it.
