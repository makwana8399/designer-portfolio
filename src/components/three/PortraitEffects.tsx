"use client";

import { EffectComposer, DotScreen, Bloom, Vignette } from "@react-three/postprocessing";

// Tune the dot-screen pattern here — density (scale) and orientation (angle,
// radians) are independent of the model/lighting setup in PortraitModel.
// Base value was 0.6 (too coarse at the model's on-screen size); this is
// 3x that. Try 1.2 (2x) if it's now too fine, or 2.4 (4x) if still chunky.
const DOT_SCALE = 1.8;
const DOT_ANGLE = Math.PI * 0.5;

const BLOOM_INTENSITY = 0.35;
const BLOOM_LUMINANCE_THRESHOLD = 0.7;

const VIGNETTE_DARKNESS = 0.9;
const VIGNETTE_OFFSET = 0.3;

export function PortraitEffects() {
  return (
    <EffectComposer>
      <DotScreen angle={DOT_ANGLE} scale={DOT_SCALE} />
      <Bloom
        intensity={BLOOM_INTENSITY}
        luminanceThreshold={BLOOM_LUMINANCE_THRESHOLD}
        mipmapBlur
      />
      <Vignette eskil={false} offset={VIGNETTE_OFFSET} darkness={VIGNETTE_DARKNESS} />
    </EffectComposer>
  );
}
