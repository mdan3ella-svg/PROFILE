# PROFILE | MOTION ENGINE · Engineering Evaluation Release

Contains the patched source HTML, original supplied humanoid/scorpion GLBs, operator manual and a reproducible **fully offline single-file builder**. The supplied `index.html` is a hosted evaluation and **still requires internet** for Three.js until the offline build is run. The offline build is not included precompiled because npm dependencies could not be retrieved in this environment.

## Run hosted evaluation
Upload `index.html`, `operator-manual.html`, `.nojekyll`, and the `assets/` directory together to GitHub Pages. Or run `python -m http.server 8000` and visit http://localhost:8000.

## Generate the genuinely offline single HTML
On a computer with Node.js 20+, connect to the internet once to install **pinned** toolchain packages, then run:

```
npm install
npm run check
npm run build:offline
```

The output `offline/PROFILE_MOTION_ENGINE_OFFLINE.html` embeds the original 16 MB humanoid GLB, 15 MB scorpion GLB, the operator manual, and the bundled Three.js engine/addons. It requires no CDN, no server and no network after building. It can be opened using `file://`. The resulting HTML can be larger than GitHub's per-file limits; for GitHub Pages use the split assets layout instead.

## Scope / qualification
Syntax and GLB container integrity are mechanically checked. Six-leg IK controls, body-part weight mappings, animated GLB round trip and ergonomics require hands-on browser QA with imported models and target-engine testing. This is **not a certified product** and makes no claim of 5A+ industrial certification. The original `operator-manual.html` describes a workflow, not proof of functional compliance.

## Known limitations
- Generated rig joint locations are estimated using geometry heuristics; rigid scorpion shell paint groups exist but exact pivots cannot be inferred reliably from named meshes alone.
- A single tail mesh still requires authored mechanical splits for true rigid segments.
- Generic FBX skin adoption is incomplete. Imported GLB animation compatibility should be tested in each target engine.
- The single-file build's base64 decoding has a transient memory cost proportional to the 31 MB of assets. For constrained devices, use the hosted multi-file edition.
