"use client";

import { useEffect, useRef } from "react";

const LAG = 0.045; // lower = slower/laggier position follow
const IDLE_MS = 300; // how long the cursor sits still before the glow fades out
const OPACITY_LAG = 0.08; // lower = slower fade in/out

// Square-grid background whose nearest squares glow white as the cursor
// drifts past — heavily lerp-smoothed so the glow feels like slow, gentle
// motion rather than snapping straight to the pointer, and it fades out
// whenever the cursor stops moving instead of sitting there permanently lit.
export function GridField() {
  const spotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const opacity = useRef(0);
  const lastMove = useRef(0);

  useEffect(() => {
    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { ...target.current };
    lastMove.current = performance.now();

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      lastMove.current = performance.now();
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LAG;
      current.current.y += (target.current.y - current.current.y) * LAG;

      const idle = performance.now() - lastMove.current;
      const targetOpacity = idle > IDLE_MS ? 0 : 1;
      opacity.current += (targetOpacity - opacity.current) * OPACITY_LAG;

      if (spotRef.current) {
        spotRef.current.style.setProperty("--cx", `${current.current.x}px`);
        spotRef.current.style.setProperty("--cy", `${current.current.y}px`);
        spotRef.current.style.opacity = opacity.current.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="square-grid pointer-events-none fixed inset-0 z-[2]" />
      <div
        ref={spotRef}
        aria-hidden
        className="grid-spotlight pointer-events-none fixed inset-0 z-[2]"
        style={{ opacity: 0 }}
      />
    </>
  );
}
