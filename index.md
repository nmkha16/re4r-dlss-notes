---
layout: page
title: Patch notes
---

RE4 DLSS is an REFramework plugin for **Resident Evil 4 (2023)**. It runs NVIDIA DLSS inside the engine, at the
step where the game upscales, so the UI stays sharp at native resolution. It also offers optional DLSS Frame
Generation with NVIDIA Reflex.

Newest version first. Versions: [v0.3.4](#v034) · [v0.3.3](#v033) · [v0.3.2](#v032) · [v0.3.1](#v031) ·
[v0.3.0](#v030) · [v0.2.1](#v021) · [v0.2.0](#v020) · [v0.1.5](#v015) · [v0.1.4](#v014) · [v0.1.3](#v013) ·
[v0.1.2](#v012) · [v0.1.1](#v011) · [v0.1.0](#v010)

## v0.3.4

*Upcoming, in testing*

**Changed**
- Scope lenses and cutscene textures use the game's FSR 2 again by default (`IntegratedAllViews=0`), as in
  v0.1.4. DLSS on the scope views cost noticeably more fps than FSR 2 while aiming. Your `re4dlss.ini` is updated
  once (settings version 10; the old file is kept as `re4dlss.ini.v9.bak`). Set `IntegratedAllViews=1` under
  `[Integrated]` to get DLSS on scopes again.
- Lower CPU cost per frame: the mod reads the game's memory far fewer times each frame.
- Much less memory reserved at the main menu when some other graphics mods are installed (with one such setup it
  could reach several GB, a risk of out-of-memory crashes on PCs with a small page file).

**Known issues**
- Heavy frame drops with the bio scope: the game draws the scope as extra views, separate from the main screen
  (the bio scope uses two: 512x512 and 1024x1024), and upscales each one on its own. With `IntegratedAllViews=1`,
  DLSS runs on every one of those views as well as the main screen: three DLSS passes per frame while the bio
  scope is up, which costs more than the game's FSR 2 on the scope views, and starting DLSS for them can cause a
  hitch. Fix: in `reframework\data\re4dlss\re4dlss.ini`, set `IntegratedAllViews=0` under `[Integrated]` (the
  default from this version), so the scope views use the game's FSR 2 and only the main screen gets DLSS. Then
  open the REFramework menu (Insert), turn on Scope Tweaks and enable interlaced rendering for the scope, which
  lowers the cost of drawing it.
- REFramework D2D crashes the game with frame generation on: it only has room for 4 screen buffers, and frame
  generation uses 6. A patched build of REFramework D2D that sizes them by the real count is available.

## v0.3.3

*2026-11-04*

**Changed**
- With `AllowUnknownSwapchainHooks=1`, frame generation also works next to more overlays and mods: the game's
  screen is recognised by its window and GPU, and Windows' own graphics library gets a second hook. Other frame
  generation tools (OptiScaler, DLSS Enabler) are refused instead of conflicting.
- The log lists every DLL loaded into the game that isn't part of Windows, one per line, to help find
  conflicting mods.

**Fixed**
- An error with dlssg_for_sm86 at high multipliers: the number of generated frames is always capped at what the
  card supports.

## v0.3.2

*2026-11-04*

**New**
- `AllowUnknownSwapchainHooks` (under `[FrameGen]`, default 0): lets frame generation run on top of another mod
  that hooked the game's screen setup first. When frame generation is blocked, the log names that mod. Untested
  with most mods: it may crash or show a black screen.

**Changed**
- Settings version 9: older `re4dlss.ini` files are updated once with your values kept (old file kept as `.v7.bak`
  or `.v8.bak`).

## v0.3.1

*2026-11-03*

**New**
- Works with MFG Unlocker (as `winmm.dll` next to `re4.exe`) as well as dlssg_for_sm86, for frame generation on
  RTX 20/30 cards and higher multipliers. Use only one of them.
- 5x and 6x multipliers where the frame generation runtime offers them.

**Changed**
- A 16:9 image centred on a taller or wider screen (for example 2560x1440 on 2560x1600) now gets integrated DLSS
  and frame generation, with the black bars kept out of the generated frames.
- ReShade (under any file name) is allowed with frame generation.
- The panel's RTX 50 note only shows when the card can't do the chosen multiplier.
- The first line of `re4dlss.log` names the version.

## v0.3.0

*2026-11-03*

**New**
- DLSS Frame Generation (optional, off by default): tick **Enable frame generation** in the panel and restart the
  game. 2x on RTX 40, up to 4x on RTX 50; RTX 20/30 through dlssg_for_sm86. Needs the Streamline files in
  `reframework\plugins\re4dlss_fg`.
- NVIDIA Reflex (Off, On, On + Boost); always at least On while frames are generated.
- The HUD is kept out of the generated frames, so it doesn't smear.
- Panel sections for DLSS Super Resolution and DLSS Frame Generation (on/off, multiplier, Reflex).

## v0.2.1

*2026-11-02*

**Changed**
- Settings version 8: `Sharpness` is set to 0 once in existing files (other values kept, old file kept as
  `.v7.bak`).
- When DLSS can't run, the panel says why in plain words (missing or misplaced `nvngx_dlss.dll`, old driver, no RTX
  GPU), and the mod stays idle for the session.
- Less memory used once integrated DLSS runs.

**Fixed**
- DLAA in the character model viewer: correct camera jitter on every model.
- Integrated DLSS now also starts when FSR 2 is switched on in the game's settings after starting the game.

## v0.2.0

*2026-11-01*

**New**
- Integrated DLSS (the new default): the engine gets its own DLSS step in place of FSR 2. The game's FSR 2 doesn't
  run at all, and DLSS takes its inputs straight from the engine. The older method stays available with
  `IntegratedDLSS=0`.
- Scope lenses and cutscene textures get DLSS too (`IntegratedAllViews=1`), with `BioScopeFix` keeping the bio
  scope from smearing.
- DLAA in the character model viewer, where the game uses plain TAA instead of its upscaler.
- Sharpness slider (AMD's RCAS, the sharpening FSR 2 uses).

**Changed**
- `re4dlss.ini` is grouped into sections by method (settings version 7; old single-section files are kept as
  `.v6.bak`).

## v0.1.5

*2026-11-01*

**Changed**
- Lower CPU cost in busy scenes.
- The panel shows "No FSR 2 running here" in the main menu and the model viewer, where the game doesn't upscale.

## v0.1.4

*2026-10-30*

**Changed**
- FSR 2's sharpening now runs on the DLSS image by default, since the image is soft without it and it costs no
  extra CPU. Older settings files are switched to `KeepFSR2Sharpening=1` once; set it to 0 for the softer, slightly
  faster look.

## v0.1.3

*2026-10-29*

**Fixed**
- DLSS sometimes never started.

**Changed**
- Lower CPU cost.
- The panel tells you to set Upscaling to FSR 2 in the game's menu.

## v0.1.2

*2026-10-29*

**Changed**
- The game's own FSR 2 passes are skipped while DLSS runs, so they cost nothing.
- Lower overhead overall; the performance log is optional (off by default, a panel checkbox).
- Preset E (the older CNN model) in the panel; the panel warns when a preset is missing from your
  `nvngx_dlss.dll`.

**Fixed**
- A possible frozen image with `KeepFSR2Sharpening=0`.

## v0.1.1

*2026-10-28*

**Fixed**
- Heavy slowdowns in cutscenes that render a second view.

**Changed**
- DLSS only on the main screen; scope lenses and cutscene textures keep FSR 2.
- Much lower CPU cost in busy scenes.
- Keeps working with updated D3D12 runtimes.
- Panel: DLSS mode (Ultra Performance to DLAA) and preset.

## v0.1.0

*2026-10-28*

- First release: DLSS in place of the game's built-in FSR 2, with the UI drawn after upscaling at native
  resolution, and an in-game settings panel.
