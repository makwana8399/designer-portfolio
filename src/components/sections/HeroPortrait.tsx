"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PortraitModel } from "@/components/three/PortraitModel";
import { PortraitEffects } from "@/components/three/PortraitEffects";

export function HeroPortrait() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PortraitModel />
          <PortraitEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}
