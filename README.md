# PROFILE | MOTION ENGINE | VERTASCAN — GitHub Pages evaluation build

## Publish
1. Create or open your PROFILE repository.
2. Upload `index.html`, `.nojekyll` and `README.md` to the repository root.
3. GitHub Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Open the Pages URL. Hard refresh (Ctrl+Shift+R) after every deployment.

## Requirements and limitations
- Requires internet to fetch Three.js modules from unpkg CDN; it is NOT an offline app.
- The embedded humanoid reference remains inside the HTML; repository visitors can inspect/extract it. This is not DRM.
- Rig fitting, skin binding, bone-axis articulation, visual PBR quality, animation clips and export all require manual browser evaluation with each custom GLB.
- No browser-level end-to-end rig deformation or GLB roundtrip certification is claimed.

## Smoke-test checklist
- Load Demo Rig / Reference; confirm model and imported textures render.
- Import custom humanoid GLB, build rig, wait until binding completes; check regression and bind audit.
- Test arm_L and arm_R independently using FK, test IK, verify neutral reset.
- Test weight overlay ON/OFF, verify source PBR appearance is restored.
- Create two keys, play, export GLB, reimport externally and verify clip channels and texture appearance.
- Open browser DevTools Console for detailed exceptions.

## Repairs in this edition
- Keep imported vertex color attribute in GLB export, instead of deleting it.
- Do not create synthetic color attributes on imported skinned GLBs.
- Correct anatomical wrist-hand descendant lookup for forearm controls.
- Respect cancellation immediately after automatic weight calculation.
- Verify GLB animation channels rather than only the animation array.
- Expose runtime/unhandled promise errors in the app status area.
