"use client";

import { useEffect, useRef } from "react";

// Thin vertical progress rail, rendered fixed to the left edge (matches the
// reference's projects list). The projects page itself never scrolls — its
// reel does, endlessly — so the thumb tracks that reel's own loop position
// (0–100 repeating) via a "reel-progress" event instead of page scroll.
export function ScrollRail() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onReelProgress = (e: Event) => {
      const pct = (e as CustomEvent<number>).detail;
      if (thumbRef.current) {
        thumbRef.current.style.top = `${pct * 100}%`;
      }
    };
    window.addEventListener("reel-progress", onReelProgress);
    return () => {
      window.removeEventListener("reel-progress", onReelProgress);
    };
  }, []);

  return (
    <div className="fixed left-6 top-1/2 z-20 hidden h-40 w-px -translate-y-1/2 bg-border sm:block">
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-dim">00</span>
      <div ref={thumbRef} className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-dim">100</span>
    </div>
  );
}
