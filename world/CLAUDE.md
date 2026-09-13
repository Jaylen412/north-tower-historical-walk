# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running

```bash
python3 run-tour.py     # serves world/ on 127.0.0.1 at a random port and opens a browser
```

There is no build step, no package manager, no bundler, and no test framework. `world/index.html`
cannot be opened with `file://` — it uses ES modules and an import map, so the static server is
required. Changes to files under `world/` take effect on browser reload; restarting the Python
server is only needed if files are added.

Verification is manual, in-browser. `world/app.js` exposes `window.tourDiagnostics()` — a read-only
snapshot of `{room, started, panelMode, visited, position, checkpoints, colliders, drawCalls,
triangles, webgl}` — for automated or console checks without mutating the scene.

## Architecture

A single-page WebGL walkthrough of three interpretive interiors (lobby, office, restaurant) plus an
elevator transition, built directly on vendored three.js r180. Everything is hand-authored
primitives and canvas-generated textures; there are no external model or image assets other than
`world/lobby-2000.png`.

- `world/index.html` — the entire DOM up front. Every overlay (welcome, location banner, crosshair,
  interact prompt, minimap, elevator ride, modal panel, error box) is a static element toggled via
  the `hidden` attribute. `app.js` looks elements up by id through the `$` helper and never creates
  chrome dynamically, so new UI means adding markup here first.
- `world/app.js` (~134 very long lines) — the whole application: content data, scene construction,
  input, UI state, and the render loop.
- `world/controller-menu.js` — the only extracted module: converts gamepad axes/D-pad into
  repeat-delayed menu directions plus a scroll value.
- `world/three.module.js`, `three.core.js`, `Reflector.js`, `RoomEnvironment.js` — vendored three.js
  and its stock addons. Treat as third-party; do not edit. `"three"` resolves through the import map
  in `index.html`.

### Key structures in app.js

- `checkpoints` — the eight historical stops, each with `room`, world `x`/`z`, prose, a discussion
  `question`, an accuracy caveat `fact`, and a `source` key into the `sources` URL map. This array
  is the single source of truth: markers, the guide list, the minimap, progress count, and L1/R1
  cycling all derive from it. The "8" in progress strings and modulo arithmetic is hardcoded in
  several places, so changing the count means updating those too.
- `mats` / `texture(kind)` — shared materials built once at module load; `texture()` paints marble,
  carpet, and wood procedurally onto 512px canvases using the deterministic `seeded()` PRNG, so the
  world renders identically every run.
- Geometry helpers `box`, `cylinder`, `lineTube`, `label`, `plant`, `archPier`, `roomShell`,
  `upperWindows`, `core`, `city`, `lights`, `chair`, `desk`, `table` — all add into the module-level
  `world` group. `box(..., solid=true)` is also the collision system: it pushes an AABB (padded by
  .32) onto `obstacles`, which `canMove()` tests. There is no physics beyond these rectangles plus a
  ±30 bounds check.
- `setRoom(next, spawn)` — the room lifecycle. Disposes geometry from the old scene, rebuilds
  `scene`/`world`, resets `obstacles`/`markers`/`reflection`, calls the room builder
  (`lobby|office|restaurant|elevator`), re-creates checkpoint markers, repositions the camera, and
  updates the location banner. Rooms are fully rebuilt on every transition — nothing is cached.
- `frame(now)` — one `requestAnimationFrame` loop handling gamepad polling, edge-detected button
  presses against `prevButtons`, movement, look, marker animation, the timed elevator ride, minimap
  redraw, and render. Gamepad indices follow the standard mapping: 0 ×, 1 ○, 3 △, 4/5 L1/R1, 9
  Options, 10 L3, 12–15 D-pad.
- Panels — `openPanel(mode, eyebrow, html)` writes `innerHTML` into `#panelBody` and sets
  `panelMode`; each opener (`showCheckpoint`, `guide`, `settingsPanel`, `elevatorMenu`) then wires
  its own `onclick` handlers onto the freshly injected `data-cp` / `data-room` buttons. `panelMode`
  gates world input and controller routing, so anything that opens a panel must go through these
  functions.
- Persistence — visited checkpoint ids and `settings` (speed, sensitivity, invert, quality) are
  saved to `localStorage` under `north-tower-tour-v1` by `save()`. `applyQuality()` is the only
  place pixel ratio, shadows, and the lobby `Reflector` are toggled, and it calls `save()`.

Input has three parallel paths that must stay in sync when controls change: keyboard/pointer
listeners near the bottom of `app.js`, the `[data-move]` touch buttons, and the gamepad branches
inside `frame` / `menuControls`.

## Content conventions

This is an educational historical interpretation, and the framing is deliberate. `READ-ME.MD` (note
the non-standard filename) documents the scope limits, and the tone carries into the code: every
checkpoint pairs its narrative with an explicit `fact` disclaiming what is approximate, room notes
say "interpretive"/"illustrative", and claims link to 9/11 Memorial & Museum sources via the
`sources` map. Keep new copy in that register — sourced where factual, caveated where interpretive,
focused on everyday life rather than the attacks. There is no attack simulation and none should be
added.

`world/style.css` is a single compact, near-minified file with literal color values (no custom
properties); `.controller-focus` marks the controller-highlighted element inside panels. Its
`@import` of Google Fonts is the only network request the tour makes besides the source links.
