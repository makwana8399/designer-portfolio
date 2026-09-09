"use client";

import { audioTracks, themeSwatches } from "@/content/site";
import {
  performanceProfiles,
  useSettings,
  type PerformanceTier,
} from "./SettingsContext";

const tiers = Object.keys(performanceProfiles) as PerformanceTier[];

export function SettingsPanel() {
  const {
    settingsOpen,
    setSettingsOpen,
    setMenuOpen,
    performanceTier,
    setPerformanceTier,
    audioOn,
    toggleAudio,
    audioTrackId,
    setAudioTrackId,
    themeId,
    setThemeId,
  } = useSettings();

  return (
    <div className="fixed right-6 top-24 z-40 flex flex-col items-end font-mono text-xs">
      <button
        onClick={() => {
          setMenuOpen(false);
          setSettingsOpen(!settingsOpen);
        }}
        aria-label="Toggle settings"
        className="flex h-9 w-9 items-center justify-center rounded border border-border bg-black/80 text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <span aria-hidden>⚙</span>
      </button>

      {settingsOpen && (
        <div className="mt-3 w-60 rounded border border-border bg-black/95 p-5 backdrop-blur sm:w-72 lg:w-80">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="font-display text-lg tracking-wide text-foreground">System</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-dim">Global Config</p>
            </div>
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-dim">
              SET
            </span>
          </div>

          {/* [01] Core Theme */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-muted">
                <span className="label-tag mr-1 text-dim">01</span> Core Theme
              </p>
              <span className="text-[10px] text-dim">V_1.0</span>
            </div>
            <div className="flex gap-2">
              {themeSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setThemeId(swatch.id)}
                  aria-label={swatch.label}
                  style={{ backgroundColor: swatch.color }}
                  className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    themeId === swatch.id ? "border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* [02] Audio Engine */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-muted">
                <span className="label-tag mr-1 text-dim">02</span> Audio Engine
              </p>
              <button
                onClick={toggleAudio}
                className={`rounded px-2 py-0.5 text-[10px] uppercase ${
                  audioOn ? "bg-white text-black" : "border border-border text-dim"
                }`}
              >
                {audioOn ? "On" : "Off"}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {audioTracks.map((track) => {
                const active = track.id === audioTrackId;
                return (
                  <button
                    key={track.id}
                    onClick={() => setAudioTrackId(track.id)}
                    className={`flex items-center justify-between rounded px-3 py-2 text-left transition-colors ${
                      active ? "bg-surface" : "hover:bg-surface/50"
                    }`}
                  >
                    <span>
                      <span className="block text-foreground">{track.label}</span>
                      <span className="block text-[10px] uppercase tracking-[0.1em] text-dim">
                        {track.genre}
                      </span>
                    </span>
                    {active && audioOn && <span className="text-accent">♪</span>}
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-[10px] text-dim">
              No audio files wired in yet — see TODO.md.
            </p>
          </div>

          {/* [03] Performance Tier */}
          <div className="mb-2">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-muted">
                <span className="label-tag mr-1 text-dim">03</span> Performance Tier
              </p>
              <span className="text-[10px] text-dim">SYS</span>
            </div>
            <div className="flex gap-2">
              {tiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setPerformanceTier(tier)}
                  className={`flex-1 rounded px-2 py-1.5 uppercase transition-colors ${
                    performanceTier === tier
                      ? "bg-white text-black"
                      : "border border-border text-dim hover:text-foreground"
                  }`}
                >
                  {performanceProfiles[tier].label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            System Active
          </div>
        </div>
      )}
    </div>
  );
}
