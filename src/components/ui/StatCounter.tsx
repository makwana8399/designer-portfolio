"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stat } from "@/content/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Decorative fill — the reference site's stat bars read as "near capacity"
// indicators rather than a literal percentage of anything, so this is fixed
// rather than computed from the stat value.
const FILL_PERCENT = 82;

export function StatCounter({ stat }: { stat: Stat }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };
    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: stat.value,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => setValue(Math.floor(counter.value)),
        });
        gsap.fromTo(
          barRef.current,
          { width: "0%" },
          { width: `${FILL_PERCENT}%`, duration: 1.2, ease: "power2.out" },
        );
      },
    });
    return () => trigger.kill();
  }, [stat.value]);

  return (
    <div ref={wrapperRef}>
      {/* Mobile: compact "◆ 10+ YEARS" pill, matching the reference — the
          label/number-with-fill-bar layout below reads as a desktop-only
          "system readout" flourish, not something that holds up shrunk into
          a small corner block. */}
      <div className="flex items-center gap-1.5 lg:hidden">
        <span className="font-display text-sm text-foreground">
          {value}
          {stat.suffix}
        </span>
        <span className="text-[9px] uppercase tracking-[0.15em] text-dim">
          {stat.shortLabel ?? stat.label}
        </span>
      </div>

      {/* Desktop: unchanged — label above, number + fill bar below. */}
      <div className="hidden flex-col gap-1.5 lg:flex">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.15em] text-dim">{stat.label}</span>
          <span className="font-mono text-xs text-foreground">
            {value}
            {stat.suffix}
          </span>
        </div>
        <div className="h-px w-2/3 bg-border">
          <div ref={barRef} className="h-px bg-accent" style={{ width: "0%" }} />
        </div>
      </div>
    </div>
  );
}
