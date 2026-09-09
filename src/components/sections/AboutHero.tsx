"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { siteConfig } from "@/content/site";

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-copy", { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="about-copy max-w-xl">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">{siteConfig.eyebrow}</p>
      <h2 className="font-display mb-4 text-2xl leading-tight text-white/90 sm:text-4xl">
        {siteConfig.role}
      </h2>
      <p className="text-sm leading-relaxed text-muted">{siteConfig.bio}</p>
    </div>
  );
}
