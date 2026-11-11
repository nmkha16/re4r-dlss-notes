---
layout: default
title: Patch notes
---

# Patch notes

RE4 DLSS is an REFramework plugin for **Resident Evil 4 (2023)**. It runs NVIDIA DLSS inside the engine, at the
step where the game upscales, so the UI stays sharp at native resolution. It also offers optional DLSS Frame
Generation with NVIDIA Reflex.

**Download:** [RE4 DLSS on Nexus Mods](https://www.nexusmods.com/residentevil42023/mods/7795)

Newest version first. Versions: [v0.4.2](#v042) · [v0.4.1](#v041) · [v0.4.0](#v040) · [v0.3.5](#v035) ·
[v0.3.4](#v034) · [v0.3.3](#v033) · [v0.3.2](#v032) · [v0.3.1](#v031) · [v0.3.0](#v030) · [v0.2.1](#v021) ·
[v0.2.0](#v020) · [v0.1.5](#v015) · [v0.1.4](#v014) · [v0.1.3](#v013) · [v0.1.2](#v012) · [v0.1.1](#v011) ·
[v0.1.0](#v010)

## v0.4.2

*2026-11-11*

**Install / update:** extract this zip into the RE4 game folder and replace the existing files when asked. Your settings are kept, and the new settings start at their defaults. New install? See the [README](https://www.nexusmods.com/residentevil42023/mods/7795).

### What's new

### DLSS Super Resolution
- **New: Ultra Quality (77%).** A new step between Quality (67%) and DLAA (100%) in **DLSS mode**: sharper than Quality, faster than DLAA. The game's own menu only goes up to Quality; the mod now sets the render resolution itself.
- **New: Custom.** Pick **Custom** in **DLSS mode** and a **Resolution** slider appears: any render resolution from 33% to 100% of your screen (100% = DLAA). It applies when you let go of the slider, with a short hitch while the game resizes. Your choice is kept.
- The DLSS line at the top of the panel shows the percentage while Ultra Quality or Custom is on, for example **DLSS 77%: 1478x831 -> 1920x1080**.

### Scopes
- **Much less stutter when raising the bio scope.** With DLSS on the bio scope, every raise set up DLSS again for the scope's two pictures, which froze the game for a moment. The mod now reuses that setup, so only the first raise after starting the game does it. The normal scope gets the same fix.
- **Scope textures are kept.** Each raise also made the game create the scope's render textures again. The mod now keeps them between raises so the game can reuse them, with FSR 2 or DLSS on the scopes. This uses some video memory; they are freed when you change resolution. To turn it off, set `ScopeTextureRetention=0` under `[Advanced]` in `reframework\data\re4dlss\re4dlss.ini`.
- The panel's **Bio scope upscaler** now notes that it includes the scope lag fix, with FSR 2 or DLSS.

### Panel
- **Clearer mode names.** The **Mode** line now reads **full** (the normal state) or **compatibility**. Compatibility mode is the fallback when the mod can't fully hook the game (another game version, or another mod that changes the game): DLSS still upscales, but frame generation, DLSS 5 and Sharpness are off, and the line says so. It replaces "integrated DLSS" and "FSR 2 replacement".
- **Scope settings** (Scopes upscaler, Bio scope upscaler, Scopes preset) are now in a **Scope** section that opens and closes, like the groups on the DLSS 5 page.
- **Sharpness** has a short note under it, and its tooltip says it works in full mode only.

**Tested on:** an RTX 3060 at 1920x1080 with frame generation through MFG Unlocker: Ultra Quality (1478x831), Custom at 50% and 60%, and every existing mode; compatibility mode with `IntegratedDLSS=0`. Bio scope with DLSS: the longest frame when raising it went from about 130 ms to 50-60 ms after the first raise.

### Known issues
- **Ultra Quality and Custom** run DLSS in its Quality mode at your resolution, since this DLSS version has no Ultra Quality mode of its own. The image is upscaled from the resolution you picked as expected; only the mode name DLSS reports differs.
- **Scopes still cost some speed:** raising one still takes one slower frame while the game sets up the scope's picture, and the frame rate stays lower while a scope is up (for example 69 to 57 fps on an RTX 3060), since the game draws the scope's view as well.
- **DLSS 5 filters the main screen only:** not the picture inside scopes, cutscene textures or the character model viewer.
- **REFramework D2D plugin:** the released `reframework-d2d.dll` crashes the game within seconds while frame generation is on. A fixed build of the plugin is available with the mod; otherwise remove it, or turn frame generation off.
- **One frame without generated frames** can happen when the inventory opens.
- **Dynamic frame gen** on the RTX 3060 with MFG Unlocker settles on whole multipliers only (1x, 2x, 3x, 6x), and V-Sync forced in the NVIDIA settings makes it ignore the target.

**Having a problem?** Send `reframework\data\re4dlss\re4dlss.log` from your game folder right after it happens, since the log is reset every time the game starts. If the panel says **Mode: compatibility**, the log says why. If the game crashes with frame generation, copy the log first, then set `FrameGen=0` under `[FrameGen]` in `reframework\data\re4dlss\re4dlss.ini`.

## v0.4.1

*2026-11-08*

**Install / update:** extract this zip into the RE4 game folder and replace the existing files when asked. Your settings are kept, and the new settings start at their defaults. New install? See the [README](https://www.nexusmods.com/residentevil42023/mods/7795).

### What's new

### DLSS 5
- **"After post-processing" now works with HDR output.** In v0.4.0, with HDR on, DLSS 5 couldn't find the game's finished picture and fell back to *before post-processing* (the panel said "post-processed image not found"). It now runs after post-processing in an HDR mode, and the panel says **after post-processing (HDR)**. DLSS 5 still doesn't touch the HUD (health, ammo, prompts): it runs before the game draws it.
- **Fixed: "After post-processing" didn't work at native resolution (DLAA).** DLSS 5's effect was lost, or it fell back to *before post-processing*. It now works at native resolution too.
- **Also fixed for 10-bit SDR.** On screens that report 10-bit colour, the game can output a 10-bit picture even with HDR off, and v0.4.0 fell back to *before post-processing* there too. It now works, and the panel says **after post-processing (10-bit output)**.
- Tested with HDR on a virtual HDR display, not yet on a real HDR screen: reports from HDR players are very welcome.

### Frame generation
- **New: Dynamic frame gen (experimental).** Under the frame multiplier, **Dynamic frame gen** lets NVIDIA's DLSS frame generation pick how many frames to generate for each rendered frame (up to 6x) to reach **Target fps** (0 = your screen's refresh rate), with Reflex capping the frame rate at the target. The multiplier isn't used then, even at Off. It shows when your setup can generate more than 2x. For it to work well:
  - turn V-Sync off and use G-Sync, and remove any other fps cap (the NVIDIA Max Frame Rate setting, RTSS): the Target fps slider is the cap
  - it's best on high refresh rate screens (240 Hz and up)
  - where the driver has no dynamic mode, frame generation uses NVIDIA's Auto mode with your multiplier instead
- With HDR output, frame generation works as before, without the HUD-free image.

### Scopes
- **New: Bio scope upscaler.** The bio (infrared) scope can now use DLSS too (panel: **Bio scope upscaler**, FSR 2 by default). The game renders it without the camera jitter DLSS works best with, so DLSS has less to work with there and costs two extra DLSS runs while the scope is up. When DLSS is chosen, the panel says so under the setting.
- **F10 is gone:** scope upscalers are switched from the panel only.

### Other
- The log names the screen output's format at start-up (`screen output: ... format N`), which shows at a glance whether the game runs in HDR.

**Tested on:** an RTX 3060 at 1920x1080 with frame generation through MFG Unlocker (2x to 6x), ReShade loaded; DLSS 5 after post-processing in SDR (DLAA and Quality) and with HDR on a virtual HDR display. Not tested yet: dynamic frame generation on RTX 40/50 cards, and DLSS 5 on a real HDR screen.

### Known issues
- **Dynamic frame gen** on the RTX 3060 with MFG Unlocker settles on whole multipliers only (1x, 2x, 3x, 6x), and V-Sync forced in the NVIDIA settings makes it ignore the target.
- **DLSS 5 filters the main screen only:** not the picture inside scopes, cutscene textures or the character model viewer.
- **REFramework D2D plugin:** the released `reframework-d2d.dll` crashes the game within seconds while frame generation is on. A fixed build of the plugin is available with the mod; otherwise remove it, or turn frame generation off.
- **One frame without generated frames** can happen when the inventory opens.

**Having a problem?** Send `reframework\data\re4dlss\re4dlss.log` from your game folder right after it happens, since the log is reset every time the game starts. If the game crashes with frame generation, copy the log first, then set `FrameGen=0` under `[FrameGen]` in `reframework\data\re4dlss\re4dlss.ini`.

## v0.4.0

*2026-11-07*

**Install / update:** extract this zip into the RE4 game folder and replace the existing files when asked. Your settings are kept: the settings file gets a new `[DLSS5]` section once, and the old file is saved next to it as `re4dlss.ini.v12.bak`. New install? See the [README](https://www.nexusmods.com/residentevil42023/mods/7795).

### What's new

### DLSS 5 (experimental)
- **New: NVIDIA DLSS 5 (DLSS Neural Rendering), built into the mod.** It reworks lighting, materials and skin. It's off by default: tick **Enable DLSS 5** on the panel's DLSS 5 page, or press **F11** in game.
- **You need `nvngx_dlssnr.dll`.** It is not included, and NVIDIA has no public download for it; community DLSS 5 loaders ship it. Only use a copy from a source you trust. Put it in `reframework\plugins\re4dlss_nr\` (create the folder) or next to `re4.exe`.
- **Works with frame generation, ReShade and overlays.** DLSS 5 runs inside the mod, with no extra swapchain or Present hooks. The HUD is never filtered, and frame generation gets the filtered image.
- **Runs:** *After post-processing (before HUD)*, the default, filters the game's finished picture right before the HUD is drawn: that is the look DLSS 5 was trained on, and the strongest. *Before post-processing (at upscaling)* runs right after DLSS, so the game's bloom, grading and tone mapping soften it. With HDR output it falls back to before post-processing by itself.
- **Settings:** Style (Default, Natural, Cinematic; Cinematic by default), Model preset and Intensity, plus:
  - **Look:** Local tone, Local structure, Skin (0 to 2), Auto mask, Effect boost and Color strength (0 keeps the game's colours).
  - **Resolution** (50% to 100%): lower is much faster. Only DLSS 5's change is upscaled, so the image's own detail stays at full resolution.
  - **Multi Layers** (1x to 5x): DLSS 5 runs again on its own result for a stronger effect. Each layer costs the full GPU time again, so it is meant for RTX 50 cards.
  - **Reset DLSS 5 settings** puts every DLSS 5 setting back to its default.
- **New: per-area strength.** How strong DLSS 5 is on the **Sky**, on what is **Near** and what is **Far** (distances in meters from the game's camera, blended in between), on **Characters** as the game itself marks them, and on **Hair** (the game's own hair mask, likely needs the Hair Strands option). All at 1 changes nothing. **Debug → Show the area mask** shows where each strength applies.
- **Debug → Show only DLSS 5's change** turns the picture grey wherever DLSS 5 changed nothing, to see where and how strongly it acts.
- **Cost:** DLSS 5 is heavy on cards before RTX 50: about 57 ms of GPU time per frame at 1920x1080 on an RTX 3060. Intensity 0 does **not** make it cheaper; a lower Resolution does. The panel shows the measured GPU time.

### Panel
- **New: a summary at the top.** One line shows the DLSS mode, the resolutions, the preset, frame generation and Reflex latency; a second line shows DLSS 5 and its GPU time. The latency is the time from the game starting a frame to the GPU finishing it, averaged from Reflex's report. It's not the full click-to-screen time. It appears while frame generation runs with **Reflex timing** on *Game main thread* (the default): on the render thread, Reflex's report would leave out the game logic. It is only read while the menu is open.
- **Two pages:** **DLSS** (Super Resolution and Frame Generation) and **DLSS 5**, with Tools below both. The last page you opened is remembered. Hover a setting for an explanation.
- **Renamed:** *Extra-view upscaler* and *Extra-view preset* are now **Scopes upscaler** and **Scopes preset**. They work as before: they set the normal scope's picture and cutscene textures, and the bio scope keeps the game's FSR 2.

**Tested on:** an RTX 3060 at 1920x1080 with DLSS 310.9.1 and frame generation 2x; DLSS 5 before and after post-processing, in gameplay, cutscenes, menus and scopes; per-area strength with sky, near, far and characters. Not tested yet: Multi Layers above 1x (it needs an RTX 50 card to be playable), Hair with the game's Hair Strands option off, and HDR output with DLSS 5. Reports from RTX 50 owners are very welcome.

### Known issues
- **DLSS 5 filters the main screen only:** not the picture inside scopes, cutscene textures or the character model viewer. Per-area strength treats a scope's picture as one surface (the lens), so characters seen through a scope don't get their own strength.
- **REFramework D2D plugin:** the released `reframework-d2d.dll` (needed by scripts such as *Damage Numbers*) crashes the game within seconds while frame generation is on. A fixed build of the plugin is available with the mod; otherwise remove `reframework\plugins\reframework-d2d.dll`, `reframework\autorun\reframework-d2d.lua` and the scripts that use it, or turn frame generation off.
- **One frame without generated frames** can happen when the inventory opens.

**Having a problem?** Send `reframework\data\re4dlss\re4dlss.log` from your game folder right after it happens, since the log is reset every time the game starts. If DLSS 5 doesn't start, the panel's DLSS 5 line says why. If the game crashes with frame generation, copy the log first, then set `FrameGen=0` under `[FrameGen]` in `reframework\data\re4dlss\re4dlss.ini`.

## v0.3.5

*2026-11-07*

**Install / update:** extract this zip into the RE4 game folder and replace the existing files when asked. Your settings are kept: there is no settings update in this version. New install? See the [README](https://www.nexusmods.com/residentevil42023/mods/7795).

### What's new

### Smoother frame generation with Reflex on the game's main thread
- **Fixed: frame generation could get choppier in v0.3.4.** With Reflex on the game's main thread (the default since v0.3.4), the mod checks that every shown frame is matched with the right game frame. That check took the game's normal timing in gameplay (finishing a frame ahead while the GPU is busy) for a lost frame, after comparing it with the menus. It then skipped a real frame, the frames were matched one off, and Reflex switched back and forth between threads several times. You could feel it as stutter and lower fps lows.
  - In a test on an RTX 3060, once v0.3.4's check misfired, the 1% low fps dropped from about 50 to 38 and the worst frames rose to about 36 ms. The fixed check ran for minutes on the main thread without a single skip.
  - If you set `ReflexOnGameThread=0` because v0.3.4 felt choppy, try it on again.
- **New: Reflex timing in the panel.** Under *NVIDIA Reflex*, **Reflex timing** picks **Game main thread** (the default) or **Render thread** (how v0.3.3 and older ran it). It applies right away and is saved. The line below it shows where Reflex runs right now: on the main thread it only moves there once the game's frames are confirmed to match, a few seconds into the game.

### Sharpening
- **Fixed: sparkling highlights with sharpness above 0.** Small bright spots (sparks, wet or metal surfaces, specular glints) could turn into very bright flickering pixels, more so above about 0.35. The sharpening now keeps every pixel close to the brightness around it. Edges still get sharper across the whole slider.

### Frame generation next to other mods
- **Fixed: "Streamline's Present could not be hooked: frame generation stays off"** when another mod (for example a RenoDX ReShade add-on) had taken over the game's present step on Streamline's swapchain. The mod now hooks Streamline's own function behind it, so both keep working.
  - With `AllowUnknownSwapchainHooks=1` (the default) and Streamline's own function not found, the mod hooks the other mod's function instead, unless that function also handles other calls.

### Log
- A few one-time lines while DLSS starts, so a problem at start-up shows the step it stopped at.
- With the performance log on, a new line every 5 seconds gives the 1% low fps, the worst frame time and where Reflex runs.

**Tested on:** an RTX 3060 at 1920x1080 with DLSS 310.9.1 and frame generation 4x and 6x with MFG Unlocker; Reflex on the main thread and the render thread, switched live; sharpness from 0 to 1. The fix for other mods taking over the present step has not been seen in a real log yet: logs from setups with RenoDX add-ons are very welcome.

### Known issues
- **REFramework D2D plugin:** the released `reframework-d2d.dll` (needed by scripts such as *Damage Numbers*) crashes the game within seconds while frame generation is on. A fixed build of the plugin is available with the mod; otherwise remove `reframework\plugins\reframework-d2d.dll`, `reframework\autorun\reframework-d2d.lua` and the scripts that use it, or turn frame generation off.
- **One frame without generated frames** can happen when the inventory opens.

**Having a problem?** Send `reframework\data\re4dlss\re4dlss.log` from your game folder right after it happens, since the log is reset every time the game starts. If the game crashes with frame generation, copy the log first, then set `FrameGen=0` under `[FrameGen]` in `reframework\data\re4dlss\re4dlss.ini`.

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
- **Reflex now does its whole job.** Reflex cuts input lag in two ways: it keeps finished frames from piling up waiting for the GPU, and it delays the start of each new frame until just before it is needed, so the game reads your input as late as possible.
  - **Before (v0.3.3 and older), only the first half worked.** The mod ran Reflex's wait on the render thread, right after each frame was shown. That still stopped frames from queuing up for the GPU, much like the driver's Low Latency Mode. But by then the game's main thread had already read your input and started simulating the next frame, so the wait could not hold it back: input stayed about a frame older than needed. Reflex's timing markers were also on the wrong thread, so Reflex and DLSS frame generation saw zero time for the game's logic, which weakened Reflex's own timing and frame generation's pacing.
  - **Now:** the wait and the game-logic markers run on the game's main thread, right before it reads input, as NVIDIA's guidelines describe; the render and present markers stay on the render thread. Input is read as late as possible, and Reflex and frame generation get real timings. Expect lower input latency, typically up to about one more base frame when the GPU is the limit, and steadier frame pacing with frame generation.
  - It moves to the main thread by itself a few seconds into the game (`Reflex now on the game's main thread` in the log) and back during loading. `ReflexOnGameThread=0` under `[FrameGen]` keeps the old behaviour. The latency gain has not been measured yet: PC Latency numbers from the NVIDIA overlay with `ReflexOnGameThread` at 1 and 0 are very welcome.
- With frame generation, keep the game's own V-Sync off and use V-Sync from the NVIDIA settings instead: the log now says when the game presents with its own V-Sync on.

### Frame generation next to other mods
- **`AllowUnknownSwapchainHooks` is now on by default:** frame generation also starts when another DLL (an overlay such as RTSS, or a wrapper other than ReShade or MFG Unlocker) hooks the game's display setup in front of the mod. Set it to `0` under `[FrameGen]` to keep frame generation off in that case. Other frame generation tools (OptiScaler, DLSS Enabler) still turn it off.

### Performance and stability
- **Less CPU work per frame:** the mod reads the game's memory far less often on the render thread: about 25-30 reads per frame for the main screen (DLSS) instead of about 110, about 25 per scope view on DLSS instead of 60, and 1 per scope view on FSR 2 instead of 12.
- **Less memory reserved at the menus:** with some other D3D12 mods installed, the mod could reserve many GB of memory at the menus before DLSS took over, a risk of out-of-memory crashes on PCs with a small page file. It now only commits what it uses.

### Panel
- The extra-view upscaler and preset sit together, and the sharpness slider has its own label.
- With frame generation on, choosing Reflex **On** no longer saves Off.

### Log
- When a scope stays on FSR 2 with DLSS chosen, the log says why, once per view.

### Settings update
On first start, `re4dlss.ini` is updated once to settings version 11. Your values are kept and the old file is saved next to it (for example `re4dlss.ini.v10.bak`), with two exceptions:
- `IntegratedAllViews` is set to `0`: scopes start on the game's FSR 2. Press **F10** or use the panel to go back to DLSS.
- `AllowUnknownSwapchainHooks` is set to `1`.
New settings: `ReflexOnGameThread` (1) and `ExtraViewPreset` (-1, the same as the main preset).

**Tested on:** an RTX 3060 at 1920x1080 with DLSS 310.9.1, frame generation 2x to 6x with MFG Unlocker, normal and bio scopes on FSR 2 and DLSS, live switching with F9 and F10.

### Known issues
- **REFramework D2D plugin:** the released `reframework-d2d.dll` (needed by scripts such as *Damage Numbers*) crashes the game within seconds while frame generation is on. A fixed build of the plugin is available with the mod; otherwise remove `reframework\plugins\reframework-d2d.dll`, `reframework\autorun\reframework-d2d.lua` and the scripts that use it, or turn frame generation off.
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
