# PROFILE | MOTION ENGINE — Offline GitHub Review Build

This source package contains the latest PROFILE VIS application and the **Operator Manual V2**. The application is currently **NOT COMPILED**. Run the builder once on a network-connected computer with Node.js 20+ to download pinned Three.js and esbuild dependencies and embed them into `dist/index.html`.

## Windows
Run `BUILD_WINDOWS.bat`.

## macOS / Linux
Run `sh BUILD_MAC_LINUX.sh`.

## Result
- `dist/index.html` — intended self-contained browser app with Three.js runtime, controls, importers, GLB exporter, PBR scene and embedded humanoid.
- `dist/operator-manual.html` — self-contained illustrated operator manual.
- `dist/.nojekyll` — disables Jekyll processing on GitHub Pages.

Upload **all three dist files** to the GitHub repository root. GitHub Pages: Settings → Pages → Deploy from `main` / root.

## Offline verification
After compilation, copy the `dist` directory to a disconnected PC; open `index.html` in Chrome/Edge, disable Wi-Fi and use DevTools Network → Offline. Confirm the initial model, controls, PBR, manual, custom GLB import, binding and export work. The static build verification does not replace this live test. `file://` restrictions may affect certain browser APIs; hosting compiled assets on GitHub Pages still works online, and tests under a local HTTP server can distinguish browser security restrictions from missing dependencies.

## Important limitations
The builder eliminates Three.js **network dependencies**, but does not certify anatomical fit, physical simulation, exact skin weighting, motion quality, or cross-engine GLB compatibility. Performance and deformation must be evaluated using known models with independent reference results. The locked embedded model is an in-app reference, not cryptographic asset protection.
