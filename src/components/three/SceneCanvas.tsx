"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { performanceProfiles, useSettings } from "@/components/layout/SettingsContext";

// Fixed, full-viewport background canvas. Sits behind page content (z-index
// handled by the parent wrapper) and reacts to the performance-tier setting.
export function SceneCanvas() {
  const { performanceTier } = useSettings();
  const profile = performanceProfiles[performanceTier];

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={profile.dpr}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleField count={profile.particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
