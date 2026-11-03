# PROFILE | Reference-calibrated Scorpion Auto-Rig

Contains the supplied 43-part scorpion model under `assets/scorpion.glb`. Upload `index.html` and `assets/scorpion.glb` to the GitHub Pages repository, preserving paths. The original humanoid model may remain at `assets/humanoid.glb`.

Open SCORPION DEMO or import your model, select RIG → SCORPION REFERENCE, adjust paired sliders/numeric fields, click BUILD CALIBRATED SCORPION RIG. The reference guide was measured from the uploaded scorpion(3).glb (X=5.55442518, Y=3.48266103, Z=5.04545397 model units). Tail landmarks follow a measured curve. Mechanical parts use whole-shell one-bone binding. The inferred bone ownership of unnamed GLB meshes must be inspected and corrected using the bone editor.

This build still uses CDN Three.js. Source passes JavaScript syntax checks; complete browser, animation, and roundtrip validation is NOT certified.
