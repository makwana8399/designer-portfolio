"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MODEL_PATH = "/models/original-face-optimized.glb";

// Apparent size in its container — scales the already-recentered, unit-sized
// model. Tune this directly; camera FOV is left alone.
const MODEL_SCALE = 1.35;

// Lighting: low ambient + one raking key light for a real light/shadow
// split (~half the face lit, half toward black), so the dot-screen effect
// has actual falloff to draw instead of a uniformly-dotted silhouette.
// Camera sits at [0, 0, 4.2] looking at the origin (view axis ≈ +Z); this
// light position is ~78° off that axis — mostly from the side, not head-on.
const AMBIENT_INTENSITY = 0.16;
const KEY_LIGHT_POSITION: [number, number, number] = [4.5, 1.5, 1];
const KEY_LIGHT_INTENSITY = 1.2;

// Mouse-follow rotation. The mesh's own authored facing isn't dead-center at
// world rotation.y = 0 — 0 read as turned to the right, -0.3 read as
// crooked the other way — so NEUTRAL_YAW is the calibration knob for "looks
// straight at rest" and needs eyeballing against the actual render. Cursor
// motion is deliberately subtle (a small nudge left/right of that rest
// pose), not a wide swing.
const NEUTRAL_YAW = -1.4;
const MAX_YAW = THREE.MathUtils.degToRad(14);
const MAX_PITCH = THREE.MathUtils.degToRad(8);
const FOLLOW_SPEED = 4.5; // higher = snappier, lower = softer lag

// Idle look: once the cursor has been still for IDLE_DELAY ms, the head
// slowly turns to look left, then right (a rotation, not a translation),
// easing in over IDLE_FADE ms so it never snaps on — and eases back out the
// instant the cursor moves again.
const IDLE_SWAY_AMPLITUDE = THREE.MathUtils.degToRad(12);
const IDLE_SWAY_SPEED = 0.5; // radians/sec
const IDLE_DELAY = 500;
const IDLE_FADE = 500;

// Plain clay-style materials, keyed by keywords matched against each mesh's
// name. This particular asset is a single fused mesh, so everything falls
// through to CLAY_PARTS.default — the keyword branches exist for when a
// segmented model (separate eyes/hair/etc. meshes) is used instead.
const CLAY_PARTS: Record<string, { color: string; roughness: number }> = {
  default: { color: "#f2eee2", roughness: 0.5 },
  eye: { color: "#2b2a28", roughness: 0.25 },
  hair: { color: "#b8b0a0", roughness: 0.75 },
  teeth: { color: "#efece2", roughness: 0.4 },
  cloth: { color: "#9a958a", roughness: 0.8 },
};

function pickClayPart(meshName: string) {
  const name = meshName.toLowerCase();
  if (name.includes("eye")) return CLAY_PARTS.eye;
  if (name.includes("hair")) return CLAY_PARTS.hair;
  if (name.includes("tooth") || name.includes("teeth")) return CLAY_PARTS.teeth;
  if (name.includes("cloth") || name.includes("shirt") || name.includes("collar")) {
    return CLAY_PARTS.cloth;
  }
  return CLAY_PARTS.default;
}

function disposeMaterial(material: THREE.Material) {
  if (material instanceof THREE.MeshStandardMaterial) {
    material.map?.dispose();
    material.normalMap?.dispose();
    material.roughnessMap?.dispose();
    material.metalnessMap?.dispose();
    material.aoMap?.dispose();
    material.emissiveMap?.dispose();
  }
  material.dispose();
}

export function PortraitModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  // Raw pointer target in -1..1, decoupled from R3F's own event system so
  // it keeps tracking even though the Canvas wrapper is pointer-events-none,
  // and resets to neutral when the cursor leaves the window instead of
  // freezing at the last position.
  const pointerTarget = useRef({ x: 0, y: 0 });
  const lastMoveRef = useRef(0);

  useEffect(() => {
    lastMoveRef.current = performance.now();
    const handleMove = (event: MouseEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = (event.clientY / window.innerHeight) * 2 - 1;
      lastMoveRef.current = performance.now();
    };
    const handleLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const model = useMemo(() => {
    const cloned = scene.clone(true);

    // Force matrices current before measuring — a freshly cloned object
    // isn't guaranteed to have an up-to-date matrixWorld yet, and computing
    // the box against stale matrices is exactly how a model ends up looking
    // centered in code but not on screen.
    cloned.updateMatrixWorld(true);

    // 1. Measure the untouched clone's own bounding box — don't assume the
    //    GLB's origin is already centered on the subject.
    const box = new THREE.Box3().setFromObject(cloned, true);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // 2. Scale first, so the center offset below is expressed in the same
    //    (post-scale) units as everything else in the scene.
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (maxDim > 0 ? 1 / maxDim : 1) * MODEL_SCALE;
    cloned.scale.setScalar(scale);

    // 3. Offset by the measured center (scaled) so the bounding box's
    //    midpoint — not necessarily the GLB's local origin — lands at the
    //    group's origin, keeping the model visually centered regardless of
    //    how the source file was authored.
    cloned.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    );

    // 4. Strip every mesh's baked/textured material and replace it with a
    //    plain clay-style MeshStandardMaterial — no map, normalMap,
    //    roughnessMap, or metalnessMap from the source file.
    const meshNames: string[] = [];
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        meshNames.push(child.name || "(unnamed)");

        const oldMaterial = child.material;
        if (Array.isArray(oldMaterial)) {
          oldMaterial.forEach(disposeMaterial);
        } else if (oldMaterial) {
          disposeMaterial(oldMaterial);
        }

        const { color, roughness } = pickClayPart(child.name || "");
        child.material = new THREE.MeshStandardMaterial({
          color,
          roughness,
          metalness: 0,
          side: THREE.DoubleSide,
        });
      }
    });
    console.log("[PortraitModel] clay material applied to meshes:", meshNames);

    return cloned;
  }, [scene]);

  useEffect(() => {
    return () => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
    };
  }, [model]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const idleMs = performance.now() - lastMoveRef.current;
    const idleAmount = THREE.MathUtils.clamp((idleMs - IDLE_DELAY) / IDLE_FADE, 0, 1);
    const idleSway =
      Math.sin(state.clock.elapsedTime * IDLE_SWAY_SPEED) * IDLE_SWAY_AMPLITUDE * idleAmount;

    const targetYaw = NEUTRAL_YAW + pointerTarget.current.x * MAX_YAW + idleSway;
    const targetPitch = -pointerTarget.current.y * MAX_PITCH;

    // Frame-rate-independent exponential smoothing (soft "following" lag).
    const damp = 1 - Math.exp(-FOLLOW_SPEED * delta);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetYaw,
      damp,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetPitch,
      damp,
    );
  });

  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} />
      <directionalLight position={KEY_LIGHT_POSITION} intensity={KEY_LIGHT_INTENSITY} />
      <group ref={groupRef} rotation={[0, NEUTRAL_YAW, 0]}>
        <primitive object={model} />
      </group>
    </>
  );
}

useGLTF.preload(MODEL_PATH);
