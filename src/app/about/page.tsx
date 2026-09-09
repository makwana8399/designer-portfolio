import { AboutHero } from "@/components/sections/AboutHero";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { Experience } from "@/components/sections/Experience";
import { AboutClosingCTA } from "@/components/sections/AboutClosingCTA";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ScrollFrameSequence } from "@/components/ui/ScrollFrameSequence";
import { siteConfig } from "@/content/site";

export default function AboutPage() {
  return (
    <>
      <Breadcrumb current="About" />

      {/* Photo (left) and name (right) are sticky within this grid, so they
          stay pinned in place while only the middle content column scrolls —
          both release once the grid ends, right before the closing CTA.
          data-frame-range marks the scrub range for ScrollFrameSequence: frame
          1 at the top, advancing to the last frame by the bottom, reversing
          on scroll-up. */}
      {/* pt-80 on mobile clears AboutMobileHeader (fixed, ~top-20 + its own
          height) so the page starts below it at rest — matching it visible
          in full alongside the bio text initially, only scrolling up and
          over it (as a background layer) once you actually scroll. lg:pt-32
          restores the exact original value there, where the header isn't
          used at all (hidden lg:hidden equivalent — see the photo/name
          divs below). */}
      <div
        data-frame-range
        className="grid gap-10 px-6 pt-80 sm:px-10 lg:grid-cols-[260px_1fr_320px] lg:gap-12 lg:pt-32"
      >
        {/* Both hidden below lg: — AboutMobileHeader (fixed, rendered in
            the root layout) is the mobile equivalent of these two; see it
            for why sticky doesn't work for this on a single-column mobile
            layout in the first place. */}
        <div className="relative hidden aspect-[3/5] w-36 sm:w-52 lg:sticky lg:top-28 lg:block lg:w-full lg:self-start">
          <ScrollFrameSequence className="h-full w-full" />
        </div>

        <div className="flex flex-col gap-16 pb-16">
          <AboutHero />
          <SkillsGrid />
          <Experience />
          <AboutClosingCTA />
        </div>

        <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start lg:text-right">
          <h1 className="font-display whitespace-nowrap text-4xl uppercase leading-[0.85] text-white/90 sm:text-5xl">
            Meet {siteConfig.firstName}
          </h1>
        </div>
      </div>
    </>
  );
}
