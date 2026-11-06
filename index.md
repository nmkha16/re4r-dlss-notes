---
layout: default
title: Patch notes
---

# Patch notes

RE4 DLSS is an REFramework plugin for **Resident Evil 4 (2023)**. It runs NVIDIA DLSS inside the engine, at the
step where the game upscales, so the UI stays sharp at native resolution. It also offers optional DLSS Frame
Generation with NVIDIA Reflex.

**Download:** [RE4 DLSS on Nexus Mods](https://www.nexusmods.com/residentevil42023/mods/7795)

Newest version first. Versions: [v0.3.4](#v034) · [v0.3.3](#v033) · [v0.3.2](#v032) · [v0.3.1](#v031) ·
[v0.3.0](#v030) · [v0.2.1](#v021) · [v0.2.0](#v020) · [v0.1.5](#v015) · [v0.1.4](#v014) · [v0.1.3](#v013) ·
[v0.1.2](#v012) · [v0.1.1](#v011) · [v0.1.0](#v010)

## v0.3.4

*2026-11-06*

**Install / update:** extract this zip into the RE4 game folder and replace the existing files when asked. Your settings are kept, except the two changes listed under *Settings update*. New install? See the [README](https://www.nexusmods.com/residentevil42023/mods/7795).

### What's new

### Scopes (extra views)
- **FSR 2 or DLSS for scopes, switched live:** the panel's **Extra-view upscaler (F10)** picks the game's FSR 2 or DLSS for scope lenses and cutscene textures. It applies immediately (no restart), **F10** switches it in game, and the choice is saved. While **F9** runs the game's FSR 2, the choice is greyed out: every view, scopes included, uses FSR 2 then.
- **FSR 2 is the default for scopes again:** it costs less GPU time while a scope is up, and a user with an RTX 4070 Ti Super reported heavy stutter when aiming with DLSS on scopes. Pick DLSS for a sharper normal scope.
- **Normal scope with DLSS skips the game's FSR 2 setup:** the game rebuilds its FSR 2 resources every time a scope is raised. With DLSS chosen, the mod skips that rebuild from the second raise of each scope on (the first raise still builds it while the mod learns the scope's camera). A scope that is up when you switch to FSR 2 or press F9 finishes on DLSS and gets FSR 2 on its next raise.
- **The bio scope always uses the game's FSR 2:** the game renders the bio scope without camera jitter, so DLSS can't rebuild detail there (grass and foliage looked blurrier than with FSR 2) and would cost two extra DLSS runs. The mod now leaves it to the game's FSR 2 even with DLSS chosen. The jumping, blurry detail some saw with DLSS on the bio scope is gone with it.
- **BioScopeFix stays on:** it still clears the main screen's DLSS history while the bio scope is up, which stops the heavy blur when sweeping the bio scope over foliage. It costs no fps.
- **Extra-view preset:** with DLSS on scopes, a new **Extra-view preset** dropdown gives scopes their own DLSS model, for example the lighter E (CNN) on RTX 20/30 cards, while the main screen keeps its own preset. *Same as main* is the default.
- **REFramework's Scope Interlaced Rendering:** with it on, the game draws the normal scope at half size, half of it each frame and without jitter. DLSS can't use that (it combs and shimmers), so the mod keeps such a scope on FSR 2. Turn Scope Interlaced Rendering off for DLSS on the normal scope.
- The experimental Bilinear scope mode is gone.

### NVIDIA Reflex (with frame generation)
- **Reflex now follows NVIDIA's guidelines:** its sleep and timing markers run on the game's main thread, right before the game reads input, instead of after each frame is shown. Your input is read as late as possible, and DLSS frame generation now sees the game's real logic time, which should lower input latency and even out frame pacing. It moves to the main thread by itself a few seconds into the game (`Reflex now on the game's main thread` in the log) and back during loading. `ReflexOnGameThread=0` under `[FrameGen]` keeps the old behaviour. The latency gain has not been measured yet.
- With frame generation, keep the game's own V-Sync off and use V-Sync from the NVIDIA settings instead: the log now says when the game presents with its own V-Sync on.

### Frame generation next to other mods
- **`AllowUnknownSwapchainHooks` is now on by default:** frame generation also starts when another DLL (an overlay such as RTSS, or a wrapper other than ReShade or MFG Unlocker) hooks the game's display setup in front of the mod. Set it to `0` under `[FrameGen]` to keep frame generation off in that case. Other frame generation tools (OptiScaler, DLSS Enabler) still turn it off.

### Performance and stability
- **Less CPU work per frame:** the mod reads the game's memory far less often on the render thread: about 25-30 reads per frame for the main screen instead of about 110, and 1 per scope view on FSR 2 instead of 12.
- **Less memory reserved at the menus:** with some other D3D12 mods installed, the mod could reserve many GB of memory at the menus before DLSS took over, a risk of out-of-memory crashes on PCs with a small page file. It now only commits what it uses.

### Panel
- The extra-view upscaler and preset sit together, and the sharpness slider has its own label.
- With frame generation on, choosing Reflex **On** no longer saves Off.

### Log
- The second line of `re4dlss.log` says whether the game looks like the Steam release. Only the Steam release is supported; the mod runs the same either way.
- When a scope stays on FSR 2 with DLSS chosen, the log says why, once per view.

### Settings update
On first start, `re4dlss.ini` is updated once to settings version 11. Your values are kept and the old file is saved next to it (for example `re4dlss.ini.v10.bak`), with two exceptions:
- `IntegratedAllViews` is set to `0`: scopes start on the game's FSR 2. Press **F10** or use the panel to go back to DLSS.
- `AllowUnknownSwapchainHooks` is set to `1`.
New settings: `ReflexOnGameThread` (1) and `ExtraViewPreset` (-1, the same as the main preset).

**Tested on:** an RTX 3060 at 1920x1080 with DLSS 310.9.1, frame generation 2x to 6x with MFG Unlocker, normal and bio scopes on FSR 2 and DLSS, live switching with F9 and F10.

### Known issues
- **REFramework D2D plugin:** the released `reframework-d2d.dll` (needed by scripts such as *Damage Numbers*) crashes the game within seconds while frame generation is on. A fixed build of the plugin is available with the mod; otherwise remove `reframework\plugins\reframework-d2d.dll`, `reframework\autorun\reframework-d2d.lua` and the scripts that use it, or turn frame generation off.
- **Bio scope thermal noise:** the bio scope's grainy thermal look is part of the game's effect and stays, also with the game's Film Grain off.
- **One frame without generated frames** can happen when the inventory opens.

**Having a problem?** Send `reframework\data\re4dlss\re4dlss.log` from your game folder right after it happens, since the log is reset every time the game starts. If the game crashes with frame generation, copy the log first, then set `FrameGen=0` under `[FrameGen]` in `reframework\data\re4dlss\re4dlss.ini`.

## v0.3.3

*2026-11-04*

### Changed
- With `AllowUnknownSwapchainHooks=1`, frame generation also works next to more overlays and mods: the game's
  screen is recognised by its window and GPU, and Windows' own graphics library gets a second hook. Other frame
  generation tools (OptiScaler, DLSS Enabler) are refused instead of conflicting.
- The log lists every DLL loaded into the game that isn't part of Windows, one per line, to help find
  conflicting mods.

### Fixed
- An error with dlssg_for_sm86 at high multipliers: the number of generated frames is always capped at what the
  card supports.

## v0.3.2

*2026-11-04*

### New
- `AllowUnknownSwapchainHooks` (under `[FrameGen]`, default 0): lets frame generation run on top of another mod
  that hooked the game's screen setup first. When frame generation is blocked, the log names that mod. Untested
  with most mods: it may crash or show a black screen.

### Changed
- Settings version 9: older `re4dlss.ini` files are updated once with your values kept (old file kept as `.v7.bak`
  or `.v8.bak`).

## v0.3.1

*2026-11-03*

### New
- Works with MFG Unlocker (as `winmm.dll` next to `re4.exe`) as well as dlssg_for_sm86, for frame generation on
  RTX 20/30 cards and higher multipliers. Use only one of them.
- 5x and 6x multipliers where the frame generation runtime offers them.

### Changed
- A 16:9 image centred on a taller or wider screen (for example 2560x1440 on 2560x1600) now gets integrated DLSS
  and frame generation, with the black bars kept out of the generated frames.
- ReShade (under any file name) is allowed with frame generation.
- The panel's RTX 50 note only shows when the card can't do the chosen multiplier.
- The first line of `re4dlss.log` names the version.

## v0.3.0

*2026-11-03*

### New
- DLSS Frame Generation (optional, off by default): tick **Enable frame generation** in the panel and restart the
  game. 2x on RTX 40, up to 4x on RTX 50; RTX 20/30 through dlssg_for_sm86. Needs the Streamline files in
  `reframework\plugins\re4dlss_fg`.
- NVIDIA Reflex (Off, On, On + Boost); always at least On while frames are generated.
- The HUD is kept out of the generated frames, so it doesn't smear.
- Panel sections for DLSS Super Resolution and DLSS Frame Generation (on/off, multiplier, Reflex).

## v0.2.1

*2026-11-02*

### Changed
- Settings version 8: `Sharpness` is set to 0 once in existing files (other values kept, old file kept as
  `.v7.bak`).
- When DLSS can't run, the panel says why in plain words (missing or misplaced `nvngx_dlss.dll`, old driver, no RTX
  GPU), and the mod stays idle for the session.
- Less memory used once integrated DLSS runs.

### Fixed
- DLAA in the character model viewer: correct camera jitter on every model.
- Integrated DLSS now also starts when FSR 2 is switched on in the game's settings after starting the game.

## v0.2.0

*2026-11-01*

### New
- Integrated DLSS (the new default): the engine gets its own DLSS step in place of FSR 2. The game's FSR 2 doesn't
  run at all, and DLSS takes its inputs straight from the engine. The older method stays available with
  `IntegratedDLSS=0`.
- Scope lenses and cutscene textures get DLSS too (`IntegratedAllViews=1`), with `BioScopeFix` keeping the bio
  scope from smearing.
- DLAA in the character model viewer, where the game uses plain TAA instead of its upscaler.
- Sharpness slider (AMD's RCAS, the sharpening FSR 2 uses).

### Changed
- `re4dlss.ini` is grouped into sections by method (settings version 7; old single-section files are kept as
  `.v6.bak`).

## v0.1.5

*2026-11-01*

### Changed
- Lower CPU cost in busy scenes.
- The panel shows "No FSR 2 running here" in the main menu and the model viewer, where the game doesn't upscale.

## v0.1.4

*2026-10-30*

### Changed
- FSR 2's sharpening now runs on the DLSS image by default, since the image is soft without it and it costs no
  extra CPU. Older settings files are switched to `KeepFSR2Sharpening=1` once; set it to 0 for the softer, slightly
  faster look.

## v0.1.3

*2026-10-29*

### Fixed
- DLSS sometimes never started.

### Changed
- Lower CPU cost.
- The panel tells you to set Upscaling to FSR 2 in the game's menu.

## v0.1.2

*2026-10-29*

### Changed
- The game's own FSR 2 passes are skipped while DLSS runs, so they cost nothing.
- Lower overhead overall; the performance log is optional (off by default, a panel checkbox).
- Preset E (the older CNN model) in the panel; the panel warns when a preset is missing from your
  `nvngx_dlss.dll`.

### Fixed
- A possible frozen image with `KeepFSR2Sharpening=0`.

## v0.1.1

*2026-10-28*

### Fixed
- Heavy slowdowns in cutscenes that render a second view.

### Changed
- DLSS only on the main screen; scope lenses and cutscene textures keep FSR 2.
- Much lower CPU cost in busy scenes.
- Keeps working with updated D3D12 runtimes.
- Panel: DLSS mode (Ultra Performance to DLAA) and preset.

## v0.1.0

*2026-10-28*

- First release: DLSS in place of the game's built-in FSR 2, with the UI drawn after upscaling at native
  resolution, and an in-game settings panel.
