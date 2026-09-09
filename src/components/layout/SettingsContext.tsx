"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { audioTracks, themeSwatches } from "@/content/site";

export type PerformanceTier = "high" | "medium" | "saver";

export const performanceProfiles: Record<
  PerformanceTier,
  { label: string; dpr: number; particleCount: number }
> = {
  high: { label: "High", dpr: 1.5, particleCount: 1200 },
  medium: { label: "Medium", dpr: 1, particleCount: 600 },
  saver: { label: "Saver", dpr: 1, particleCount: 150 },
};

interface SettingsState {
  performanceTier: PerformanceTier;
  setPerformanceTier: (tier: PerformanceTier) => void;
  audioOn: boolean;
  toggleAudio: () => void;
  audioTrackId: string;
  setAudioTrackId: (id: string) => void;
  themeId: string;
  setThemeId: (id: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

const SettingsContext = createContext<SettingsState | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>("high");
  const [audioOn, setAudioOn] = useState(false);
  const [audioTrackId, setAudioTrackId] = useState(audioTracks[0]?.id ?? "");
  const [themeId, setThemeId] = useState(themeSwatches[0]?.id ?? "mono");
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const swatch = themeSwatches.find((s) => s.id === themeId);
    if (swatch) {
      document.documentElement.style.setProperty("--accent", swatch.color);
    }
  }, [themeId]);

  const value = useMemo(
    () => ({
      performanceTier,
      setPerformanceTier,
      audioOn,
      toggleAudio: () => setAudioOn((v) => !v),
      audioTrackId,
      setAudioTrackId,
      themeId,
      setThemeId,
      menuOpen,
      setMenuOpen,
      settingsOpen,
      setSettingsOpen,
    }),
    [performanceTier, audioOn, audioTrackId, themeId, menuOpen, settingsOpen],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
