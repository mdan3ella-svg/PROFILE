# Disconnected browser acceptance protocol

1. After BUILD, confirm `npm run verify` reports all PASS.
2. Disconnect the computer from the network, reopen `dist/index.html`, and confirm the 3D viewport initializes with no requests to an internet URL.
3. Open the embedded humanoid reference. Confirm its metallic/roughness materials and textures render.
4. Open the Operator Manual from the application. Search chapters and view vector diagrams.
5. Import a small sample GLB and a known rigid/organic rig; capture skeleton joint counts and binding timing.
6. Compare shoulder FK X lift, left/right symmetry, elbow bends and restoration at zero rotation.
7. Test IK targets, animated playback, keys, bounce/cycle and GLB export.
8. Open the exported GLB in an **independent** viewer and confirm skinned mesh, animation clips, material textures, and poses.
9. Record failures, browser version, OS/GPU and sample input file. Do not label the release production certified without independent reference testing.
