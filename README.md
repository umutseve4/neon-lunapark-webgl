<p align="center">
  <img src="https://github.com/user-attachments/assets/d972e640-f52b-41cc-b513-d1ac4eae463d" alt="Neon Lunapark in Festival mode: the ferris wheel, the carousel, the neon arch and the lit coaster track" width="900">
</p>

<h1 align="center">Neon Lunapark</h1>

<p align="center">
  Double click one HTML file and a miniature funfair lights up for the night.<br>
  No install, no server, not a single downloaded image or model file.
</p>

<p align="center">
  <a href="https://umutseve4.github.io/neon-lunapark-webgl/"><b>Open the live demo</b></a>
  &nbsp;.&nbsp; straight in the browser, nothing to download
</p>

<p align="center">
  <a href="index.html"><img src="https://img.shields.io/badge/index.html-64%2C472%20bytes-FF4D4F?style=flat-square" alt="One file, 64,472 bytes"></a>
  <img src="https://img.shields.io/badge/build%20dependencies-0-FF4D4F?style=flat-square" alt="Zero build dependencies">
  <img src="https://img.shields.io/badge/asset%20files-0-FF4D4F?style=flat-square" alt="Zero asset files">
  <a href="https://github.com/umutseve4/neon-lunapark-webgl/actions/workflows/verify.yml"><img src="https://github.com/umutseve4/neon-lunapark-webgl/actions/workflows/verify.yml/badge.svg" alt="verify"></a>
</p>

---

## What happens in the first 30 seconds

A four car train runs a closed loop of track and leans into the bends. The ferris wheel turns slowly, its cabins hanging plumb the whole way round. The carousel horses glide up and down. The ticket booth, the game stand and the food stand light their signs. The camera drifts around the scene on its own, and you can take it over with the mouse whenever you want.

Three buttons rebuild the atmosphere from scratch:

| Mode | What changes |
|---|---|
| **Day** | Pale blue sky, warm sun, hard shadows, the neon goes out |
| **Night** | Deep blue sky, stars, moonlight, restrained glow |
| **Festival** | Purple and magenta sky, saturated colour, strong bloom, quickened light |

The frame above is Festival mode. The transitions are not cuts. The sky, the fog, the light colours and the bloom values all soften into each other.

## How to open it

Fastest route: [**open the live version in the browser**](https://umutseve4.github.io/neon-lunapark-webgl/). Nothing to download.

If you would rather run it locally:

```
1. download index.html
2. double click it
```

There is no third step. No build, no `npm install`, no local server. The file works over `file://`.

## Controls

| Input | What it does |
|---|---|
| Drag | Rotate the scene |
| Wheel | Zoom in and out |
| `1` `2` `3` | Day / Night / Festival |
| `Space` | Pause and resume the automatic camera tour |
| `Left` `Right` | Turn the camera by hand |
| `+` `-` | Zoom |

A few seconds after you let go of the mouse, the automatic tour takes over again by itself.

## What was actually measured

The session the frame above came from. Chrome, desktop, `file://` protocol, Festival mode:

| Measurement | Value |
|---|---|
| Frame rate | 60 FPS |
| Scene complexity | 84,774 triangles |
| File size | 64,472 bytes |
| Network requests other than Three.js | 0 |

Those are numbers from one machine on one day, not a promise about yours. There used to be a `60 FPS` badge at the top of this file and it is gone on purpose. A badge reads as a standing guarantee, and a frame rate cannot be re-measured by CI on every commit. The file size can be, so that is the one number still carried as a badge. `verify.mjs` reads the digits back out of the badge URL and compares them against the real byte count, which means the badge cannot drift away from the file.

## How it is built

**Zero assets.** There is not one `.glb`, `.png` or `.jpg` in the repository. Every body comes from a box, a cylinder, a torus, a sphere or a `TubeGeometry`. Every texture is drawn onto a `<canvas>` at run time and turned into a `CanvasTexture`, including the lettering on the signs.

**The track is a curve.** The route is defined as a closed `CatmullRomCurve3`. The train position and its lean into the bends are derived every frame from the tangent and normal frame of that curve. Nothing is animated by hand.

**The sky is a shader.** A `ShaderMaterial` gradient on an inward facing sphere, with `fog: false` and `renderOrder: -1`. Post processing is `EffectComposer` plus `UnrealBloomPass` plus ACES filmic tone mapping.

**It defends itself.** A quality tier chosen from device power, a `devicePixelRatio` cap, reduced shadow and bloom resolution, an automatic quality downgrade when the frame rate drops, and a point light budget of 4. `webglcontextlost` is caught and the context is rebuilt.

**It works from the keyboard.** Every control is reachable by key, the buttons sit on a 44 px touch target, a mode change is announced through `aria-live`, and `prefers-reduced-motion` is respected.

Dependency: Three.js 0.169.0, loaded from a CDN through an ES module `importmap`. No bundler, no package manager, no build step.

## What CI checks

`verify.mjs` runs on every push and every pull request. It asserts that

- `index.html` exists and stays under the 96 KB ceiling,
- the byte count in the badge equals the real byte count,
- the repository holds no image, model or audio file,
- the page references no external image or stylesheet and nothing over plain `http://`,
- the Three.js version is pinned to `three@0.169.0` and arrives through an `importmap`,
- the things this README names in code are really in the file: `CanvasTexture`, `CatmullRomCurve3`, `ShaderMaterial`, `UnrealBloomPass`, `EffectComposer`, the `webglcontextlost` handler, `aria-live` and `prefers-reduced-motion`,
- no badge in this README publishes a frame rate.

The workflow then requests the live address and fails if it does not return HTTP 200, for as long as this README links to it.

## Limits

- Three.js comes from a CDN, so the first open needs a connection. After that it is served from the browser cache.
- WebGL is required. On much older devices the quality tier drops.
- Not tested on mobile. The quality tier targets mobile, but no measurement was taken there.
- No sound.
- The 84,774 triangle count and the 60 FPS figure come from a single session and are not re-measured by CI.

## Where this goes next

1. **A crowd.** Pedestrian figures walking between the stands, queueing, boarding the train.
2. **Procedural sound.** Track clatter, a carousel melody and a doppler shifted train pass built from Web Audio oscillators. No audio file, so the zero asset rule survives.
3. **A ride along camera.** Clamp the camera to the front car for a first person run of the track, a second experience out of the same curve data.

---

MIT, see [LICENSE](LICENSE). &nbsp;.&nbsp; Made by **Opus 5**.
