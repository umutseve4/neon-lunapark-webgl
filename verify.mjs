#!/usr/bin/env node
// Gate for neon-lunapark-webgl.
//
// Every check below corresponds to a sentence the README states as fact.
// The point is not to prove the scene looks good, which no script can do.
// The point is that a claim cannot survive in the README after the code
// stops backing it up.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync('index.html', 'utf8');
const readme = readFileSync('README.md', 'utf8');
const size = statSync('index.html').size;

let failed = 0;
let passed = 0;

function check(name, ok, detail) {
  if (ok) {
    passed += 1;
    console.log('  ok    ' + name);
  } else {
    failed += 1;
    console.log('  FAIL  ' + name + (detail ? '  ' + detail : ''));
  }
}

function section(title) {
  console.log('\n' + title);
}

section('single file contract');

check('index.html is under the 96 KB ceiling', size < 98304, 'measured ' + size + ' bytes');

const badge = readme.match(/index\.html-([0-9%A-Fa-f.,]+)%20bytes/);
check('the README carries a byte count badge', badge !== null);
if (badge) {
  const claimed = badge[1].replace(/%2C/gi, '').replace(/[.,]/g, '');
  check(
    'the badge byte count equals the real byte count',
    claimed === String(size),
    'README says ' + claimed + ', the file is ' + size
  );
}

function walk(dir, out) {
  out = out || [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const binaries = walk('.').filter((f) => /\.(png|jpe?g|gif|webp|glb|gltf|fbx|obj|mp3|ogg|wav|mp4)$/i.test(f));
check('no image, model or audio file in the repository', binaries.length === 0, binaries.join(' '));

check('the page references no external image or stylesheet', !/<(img|link[^>]+stylesheet)/i.test(html));
check('the page loads nothing over plain http', !html.includes('http://'));
check('the page references no asset file by name', !/\.(png|jpe?g|glb|gltf|mp3|ogg|wav)\b/i.test(html));

section('dependency');

check('the Three.js version is pinned', html.includes('three@0.169.0'));
check('Three.js arrives through an ES module importmap', /type=["']importmap["']/i.test(html));

section('the claims this README makes in code');

const claims = [
  ['textures are drawn at run time (CanvasTexture)', /CanvasTexture/],
  ['the track is a closed curve (CatmullRomCurve3)', /CatmullRomCurve3/],
  ['the sky is a shader (ShaderMaterial)', /ShaderMaterial/],
  ['post processing runs bloom (UnrealBloomPass)', /UnrealBloomPass/],
  ['post processing runs through EffectComposer', /EffectComposer/],
  ['a lost WebGL context is caught', /webglcontextlost/i],
  ['a mode change is announced (aria-live)', /aria-live/i],
  ['reduced motion is respected', /prefers-reduced-motion/i]
];

for (const entry of claims) {
  check(entry[0], entry[1].test(html));
}

section('honesty');

const badgeUrls = [...readme.matchAll(/img\.shields\.io\/badge\/([^"')\s]+)/g)].map((m) => m[1]);
check(
  'no badge publishes a frame rate',
  !badgeUrls.some((u) => /fps/i.test(u)),
  'a frame rate cannot be re-measured by CI, so it must not be worn as a badge'
);

check(
  'no badge publishes a test count this gate cannot produce',
  !badgeUrls.some((u) => /test[^-]*-[0-9]/i.test(u))
);

console.log('\n' + passed + ' passed, ' + failed + ' failed');

if (failed > 0) {
  process.exit(1);
}
