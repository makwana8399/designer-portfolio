"use client";

import { usePathname } from "next/navigation";
import { ScrollFrameSequence } from "@/components/ui/ScrollFrameSequence";
import { siteConfig } from "@/content/site";

// Mobile-only version of the About page's name + photo. The page's own grid
// (about/page.tsx) stacks photo/content/name into separate short rows on
// mobile — each too short for `position: sticky` to hold for more than a
// few pixels, since sticky can only stick for as long as its own row/parent
// is tall. `position: fixed` doesn't have that limitation (it's relative to
// the viewport, not any particular row), so it's used here instead to keep
// the name and photo visible for the whole scroll, matching the reference.
//
// This has to live outside PageTransition's children (a sibling of <main>
// in layout.tsx, same as ProjectMarquee) — that wrapper always carries
// `will-change: filter`, which creates a new containing block for any
// `position: fixed` descendant, and an element rendered inside the page's
// own tree would silently just scroll away with the page instead of
// actually staying fixed. Desktop keeps the existing in-grid sticky
// version in about/page.tsx (hidden here via lg:hidden below); this
// component is the mobile-only counterpart, hidden there.
export function AboutMobileHeader() {
  const pathname = usePathname();
  if (pathname !== "/about") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-0 flex flex-col items-end gap-3 px-6 lg:hidden">
      <h1 className="font-display text-4xl uppercase leading-[0.85] text-white/90">
        Meet {siteConfig.firstName}
      </h1>
      <div className="relative aspect-[3/5] w-28 opacity-70">
        <ScrollFrameSequence className="h-full w-full" />
      </div>
    </div>
  );
}
