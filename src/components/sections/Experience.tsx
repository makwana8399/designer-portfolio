"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".experience-reveal", {
        opacity: 0,
        y: 10,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 95%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <p className="mb-10 text-xs uppercase tracking-[0.2em] text-dim">Work History</p>

      <div className="flex flex-col gap-14">
        {experience.map((item) => (
          <div
            key={`${item.company}-${item.role}`}
            className="experience-reveal border-l border-border pl-6"
          >
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl text-foreground">{item.role}</h3>
              <span className="text-xs uppercase tracking-[0.15em] text-accent">
                {item.start} – {item.end}
              </span>
            </div>
            <p className="mb-4 text-xs uppercase tracking-[0.15em] text-dim">
              {item.company} — {item.location}
            </p>
            <ul className="flex flex-col gap-2">
              {item.highlights.map((point, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed text-muted before:mr-2 before:text-dim before:content-['—']"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
