"use client";

import { usePathname } from "next/navigation";

// Full-viewport color-wash — recolors the monochrome portrait/grain/UI to
// match the selected accent theme (see globals.css .theme-wash). Skipped on
// the projects pages: it's a `mix-blend-mode: color` overlay stacked above
// <main>, so it blends with (and, at the default white accent, desaturates)
// everything underneath it, real photos included. There's no per-image way
// to opt out of that — z-index inside <main> can't help, since <main>'s own
// stacking context already sits below this overlay's, so nothing inside it
// can out-rank this overlay no matter its internal z-index. Dropping the
// overlay for these two routes was the tradeoff made instead of a portal
// (or similar) rewrite: those pages lose the accent-tint-on-theme-swatch
// effect, but their look already comes mostly from explicit Tailwind
// classes rather than this blend, and it's what lets the real project
// photos there show their true color.
export function ThemeWash() {
  const pathname = usePathname();
  if (pathname?.startsWith("/projects")) return null;

  return <div aria-hidden className="theme-wash pointer-events-none fixed inset-0 z-20" />;
}
