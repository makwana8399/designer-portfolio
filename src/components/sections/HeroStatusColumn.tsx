"use client";

import { useEffect, useState } from "react";
import { siteConfig, statusWords, stats } from "@/content/site";
import { StatCounter } from "@/components/ui/StatCounter";
import { performanceProfiles, useSettings } from "@/components/layout/SettingsContext";

export function HeroStatusColumn() {
  const [statusIdx, setStatusIdx] = useState(0);
  const [fps, setFps] = useState(120);
  const { performanceTier } = useSettings();

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIdx((i) => (i + 1) % statusWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = { high: 140, medium: 90, saver: 55 }[performanceTier];
    const id = setInterval(() => {
      setFps(target + Math.floor(Math.random() * 12 - 6));
    }, 1500);
    return () => clearInterval(id);
  }, [performanceTier]);

  return (
    // The 14vw rightward shift (and the vertical nudge below it) only make
    // sense once HeroPanel and this column actually sit side by side (lg:
    // two-column grid) — below that they stack and the parent grid's
    // content-end already pins this whole block to the bottom-right corner,
    // so no extra transform is needed there.
    <div className="flex h-full flex-col justify-center py-0 lg:translate-x-[14vw] lg:py-2">
      <div className="max-w-[240px]">
        {/* Developer-stats eyebrow/status line and the debug technical
            readout below are desktop flourishes — the reference's mobile
            view only shows the years/projects numbers, kept clean. */}
        <p className="mb-1 hidden text-[8px] uppercase tracking-[0.25em] text-dim lg:block">
          Developer Stats
        </p>
        <p className="mb-5 hidden items-center gap-2 font-mono text-[10px] lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {statusWords[statusIdx]}
        </p>

        <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-stretch lg:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 lg:block">
              {/* Straight-line divider between the mobile stat pills
                  (e.g. "15+ Projects | 1+ Experience") — desktop stacks
                  these vertically instead, so it stays hidden there. */}
              {i > 0 && <span aria-hidden className="h-4 w-px shrink-0 bg-border lg:hidden" />}
              <StatCounter stat={stat} />
            </div>
          ))}
        </div>

        <div className="mt-6 hidden flex-col gap-1 font-mono text-[9px] text-dim lg:flex">
          <p>
            <span className="text-muted">&gt;</span> ACTIVE_STACK: {siteConfig.activeStack}
          </p>
          <p>
            <span className="text-muted">&gt;</span> AVAILABILITY_TYPE: {siteConfig.availabilityType}
          </p>
          <p>
            <span className="text-muted">&gt;</span> STATUS: {siteConfig.availability}
          </p>
          <p>
            <span className="text-muted">&gt;</span> SYSTEM_PERF: [{performanceProfiles[performanceTier].label.toUpperCase()}]{" "}
            {fps} FPS @ {performanceProfiles[performanceTier].dpr.toFixed(1)} DPR
          </p>
        </div>
      </div>

      <div />
    </div>
  );
}
