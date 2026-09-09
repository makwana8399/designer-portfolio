"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  performanceProfiles,
  useSettings,
  type PerformanceTier,
} from "./SettingsContext";

const tiers = Object.keys(performanceProfiles) as PerformanceTier[];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillSize = useRef({ w: 0, h: 0 });
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const { performanceTier, setPerformanceTier } = useSettings();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.floor(counter.value)),
      onComplete: () => setLoaded(true),
    });
    return () => {
      tween.kill();
    };
  }, []);

  // Magnetic floating ENTER button: once loaded, the pill tracks the cursor
  // via gsap.quickTo (smoothed, not a hard snap) instead of sitting fixed in
  // place — it's positioned `absolute` inside the already-fullscreen
  // container rather than `fixed`, since the container's backdrop-blur
  // establishes a containing block that would otherwise break a nested
  // `fixed` element's viewport-relative coordinates.
  useEffect(() => {
    if (!loaded || !pillRef.current || !containerRef.current) return;
    const el = pillRef.current;
    // Center against the overlay's own measured rect, not window.innerWidth/
    // innerHeight — those can disagree with the actual rendered box on some
    // mobile browsers (dynamic toolbars changing the viewport, etc.), which
    // is what was reading as "a little off to the right."
    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    pillSize.current = { w: rect.width, h: rect.height };

    quickX.current = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
    quickY.current = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });

    gsap.set(el, {
      x: containerRect.width / 2 - rect.width / 2,
      y: containerRect.height / 2 - rect.height / 2,
      opacity: 1,
    });

    const handleMove = (event: MouseEvent) => {
      quickX.current?.(event.clientX - containerRect.left - pillSize.current.w / 2);
      quickY.current?.(event.clientY - containerRect.top - pillSize.current.h / 2);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [loaded]);

  const handleEnter = () => {
    if (!loaded || entered) return;
    setEntered(true);
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });
  };

  if (entered) return null;

  return (
    // Click anywhere on the loading screen to enter once ready — the
    // performance tier buttons stop propagation so picking a tier doesn't
    // also dismiss the loader.
    <div
      ref={containerRef}
      onClick={handleEnter}
      className={`fixed inset-0 z-[100] overflow-hidden bg-background/20 backdrop-blur-3xl ${loaded ? "cursor-pointer" : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10"
      />

      <div className="absolute right-6 top-6 text-right sm:right-10 sm:top-8">
        <span className="font-display text-3xl leading-none text-foreground sm:text-5xl">
          {progress}%
        </span>
      </div>

      <div
        ref={pillRef}
        className="pointer-events-auto absolute left-0 top-0 opacity-0"
      >
        {/* Mobile: plain "CLICK | TO ENTER" text over the blurred backdrop,
            no pill. sm:/lg: keep the original solid white pill unchanged. */}
        <button
          onClick={handleEnter}
          className="font-mono text-xs uppercase tracking-[0.2em] transition-transform hover:scale-105 sm:rounded-full sm:bg-white sm:px-6 sm:py-3 sm:text-black"
        >
          <span className="flex items-center gap-4 sm:hidden">
            <span className="font-display text-5xl uppercase leading-none text-foreground">
              Click
            </span>
            <span aria-hidden className="h-11 w-px bg-white/25" />
            <span className="text-xs tracking-[0.3em] text-muted">To Enter</span>
          </span>
          <span className="hidden sm:inline">Enter</span>
        </button>
      </div>

      <div className="absolute bottom-6 right-6 flex w-[min(90vw,360px)] flex-col items-end gap-2 sm:right-10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          <span
            className={`h-1.5 w-1.5 rounded-full ${loaded ? "bg-foreground" : "animate-pulse bg-dim"}`}
          />
          <span>{loaded ? "System_Ready" : "Initializing_Engine"}</span>
        </div>
        {/* Proportional fill, not a binary loading/loaded snap — the white
            fill's width tracks `progress` directly, so 10% reads as a sliver
            and 50% as half, like a level filling rather than a state flip. */}
        <div className="relative h-12 w-full overflow-hidden rounded-sm border border-border">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div className="relative z-10 flex h-full items-center justify-center font-mono text-sm uppercase tracking-[0.2em] text-white mix-blend-difference">
            {loaded ? "Loaded" : `Loading ${progress}%`}
          </div>
        </div>
      </div>

      {/* On a phone, this bottom-left block and the loading bar's bottom-
          right block (w-[min(90vw,360px)], right-6) are wide enough to
          collide. Stacking this one above the loading bar (bottom-28,
          right-6) instead only applies below sm: — sm:/lg: restore the
          original opposite-corner layout untouched, since neither block is
          wide enough at that width to actually overlap. */}
      <div className="absolute bottom-28 right-6 text-right font-mono text-xs sm:bottom-6 sm:left-10 sm:right-auto sm:text-left">
        <p className="mb-2 text-dim uppercase tracking-[0.2em]">Performance Tier</p>
        <div className="flex gap-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={(event) => {
                event.stopPropagation();
                setPerformanceTier(tier);
              }}
              className={`rounded px-3 py-1.5 uppercase transition-colors ${
                performanceTier === tier
                  ? "bg-white text-black"
                  : "border border-border text-dim"
              }`}
            >
              {performanceProfiles[tier].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
