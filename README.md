# PROFILE | MOTION ENGINE | VERTASCAN — Offline Standalone Builder

This package contains the complete existing PROFILE app source, with its embedded humanoid GLB and relaxed-arm animation behavior, plus the source and build scripts needed to bundle Three.js into the HTML.

## Build (one-time internet access required)
1. Install **Node.js LTS** if necessary.
2. On Windows, double-click `BUILD_WINDOWS.bat`. On macOS/Linux, run `sh BUILD_MAC_LINUX.sh`.
3. The builder downloads exact Three.js **0.160.0** and esbuild **0.25.12** versions, then bundles them with the app into **PROFILE_OFFLINE_STANDALONE.html**.
4. Copy only `PROFILE_OFFLINE_STANDALONE.html` to an offline computer. Open directly in a current Chrome or Edge browser. It no longer needs CDN URLs at runtime.

**This distributed ZIP is a source/builder package, not the already-built offline HTML.** The build could not be executed here because dependency download was unavailable. After initial `npm install`, subsequent builds can usually run without internet as long as `node_modules` remains installed.

The input application includes a ~22 MB embedded GLB; the bundled file will be larger. This does not certify material, animation, auto-bind, or export behavior in all browsers.

## Quick checks
After build, disconnect from internet. Open the generated HTML, press Enter Studio, load Demo Rig, and verify PBR appearance, arm pose, timeline playback, GLB export and re-import. Use DevTools Network tab to ensure no requests occur.
