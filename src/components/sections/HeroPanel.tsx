"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { siteConfig } from "@/content/site";

export function HeroPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-ghost", { opacity: 0, y: 24, duration: 0.7 })
        .from(".hero-tagline", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4");

      // Slow white beam sweeping up/down across the ghost heading —
      // mix-blend-screen makes the dim text flash bright wherever the beam
      // currently overlaps it.
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { top: "-15%" },
          {
            top: "100%",
            duration: 5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.2,
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="dot-grid relative flex h-full flex-col justify-start gap-1 px-4 pb-2 pt-2 sm:gap-1 sm:px-8 sm:pb-2 sm:pt-2 lg:gap-16 lg:pb-10 lg:pt-16"
    >
      <div
        ref={beamRef}
        aria-hidden
        className="pointer-events-none absolute -left-12 h-16 w-[60%] blur-2xl mix-blend-screen sm:h-24 sm:w-[70%]"
        style={{
          background: "radial-gradient(closest-side, rgba(255,255,255,0.9), transparent 75%)",
        }}
      />

      {/* Solid, readable white below lg: — the huge dim "ghost" treatment
          (text-foreground/20 at viewport-scaled size) only reads as a
          background texture on a wide desktop screen; scaled down onto a
          phone it's just large, low-contrast, hard-to-read text, which is
          the opposite of the reference's crisp mobile heading. */}
      <h1 className="hero-ghost font-display pointer-events-none relative ml-0 mt-0 select-none text-2xl leading-[1.15] tracking-wide text-foreground sm:ml-0 sm:mt-0 sm:text-2xl lg:-ml-4 lg:mt-10 lg:text-6xl lg:text-foreground/20">
        {siteConfig.role.split(" ")[0]}
        <br />
        {siteConfig.role.split(" ").slice(1).join(" ")}
      </h1>

      <div className="hero-tagline mt-0 max-w-[180px] sm:mt-0 sm:max-w-[180px] lg:mt-10 lg:max-w-xs">
        <p className="label-tag mb-1 text-[9px] uppercase tracking-[0.3em] text-dim sm:mb-1 sm:text-[9px] lg:mb-2 lg:text-xs">
          Info_Log
        </p>
        <p className="text-[10px] uppercase leading-relaxed tracking-[0.1em] text-muted sm:text-[10px] lg:text-sm">
          {siteConfig.tagline}
        </p>
      </div>
    </div>
  );
}
