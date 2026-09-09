"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillSectors, stats } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experienceStat = stats.find((s) => s.label.includes("Yrs")) ?? stats[stats.length - 1];

export function SkillsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".sector-card", {
        opacity: 0,
        y: 8,
        duration: 0.7,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 95%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <p className="mb-2 text-sm text-muted">Having more than</p>
      <h2 className="font-display mb-2 text-4xl leading-[0.95] sm:text-6xl">
        {experienceStat.value}
        {experienceStat.suffix} YEAR{experienceStat.value === 1 ? "" : "S"} OF
        <br />
        HANDS-ON EXPERIENCE
      </h2>
      <p className="mb-10 max-w-lg text-sm text-muted">
        he has acquired a variety of technologies that includes:
      </p>

      <div className="flex flex-col gap-8">
        {skillSectors.map((sector) => (
          <div key={sector.id}>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-dim">
              <span className="text-dim">Sector_{sector.id}</span>{" "}
              <span className="text-foreground">{sector.label}</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {sector.skills.map((skill) => (
                <div
                  key={skill}
                  className="sector-card flex items-center gap-2 rounded border border-border px-3 py-2.5 text-xs uppercase tracking-[0.1em] text-muted"
                >
                  <span aria-hidden className="text-[10px] text-dim">
                    ===
                  </span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
