import { HeroPanel } from "@/components/sections/HeroPanel";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { HeroStatusColumn } from "@/components/sections/HeroStatusColumn";

export default function Home() {
  return (
    // pb-28 on mobile reserves room for the fixed bottom-right NavSwitcher
    // pill — content-end pins the hero text to the very bottom of this
    // section otherwise, and that pill floats on top of it regardless
    // (fixed position, not part of this flow), so without real clearance
    // here they collide. lg:pb-6 restores the exact original value there.
    <section className="relative h-screen overflow-hidden px-6 pb-36 pt-20 sm:px-8 lg:pb-6">
      {/* Centered on the whole viewport, not just the left card — crosses
          both columns like the reference's bust, which straddles the
          divider rather than sitting inside one panel. Faded out past ~58%
          width so it can never bleed into the stats text on the right,
          however far right that text is pushed — but that's only true once
          the grid actually has two side-by-side columns (lg:). Below that,
          HeroPanel/HeroStatusColumn stack instead of sitting side by side,
          so the same mask would just fade half the face off for no reason —
          full, unmasked portrait on mobile/tablet. */}
      <div
        className="absolute inset-0 z-0 -translate-y-10 sm:-translate-y-16 lg:[mask-image:linear-gradient(to_right,black_0%,black_50%,transparent_62%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_50%,transparent_62%)]"
      >
        <HeroPortrait />
      </div>
      {/* Mobile: content-end + justify-items-end pins the (single, stacked)
          column of text to the bottom-right corner instead of the default
          top-of-flow position, which is what was overlapping the centered
          face — matches the reference's mobile layout, where all the text
          lives in one small block clear of the portrait. Both reset back to
          their defaults at lg:, where the two-column side-by-side layout
          takes over and this alignment doesn't apply to anything.
          translate-y-14 nudges the whole already-positioned block down a
          bit further, clear of the face — a transform, applied AFTER
          content-end has done its layout, so (unlike margin/padding on
          something inside the block) it isn't cancelled out by content-end
          re-anchoring the bottom edge; it shifts the whole rigid group as
          one unit, so nothing inside it can overlap anything else inside
          it either. pb-36 above gives it the room to move into without
          running into the fixed NavSwitcher pill at the very bottom. */}
      <div className="relative z-10 mx-auto grid h-full max-w-7xl content-end justify-items-end gap-0 text-right lg:translate-y-0 lg:content-normal lg:justify-items-stretch lg:gap-8 lg:text-left lg:grid-cols-2 translate-y-12">
        <div className="relative overflow-hidden rounded-sm">
          <HeroPanel />
        </div>
        <div className="px-2 py-0 sm:px-4 lg:py-6">
          <HeroStatusColumn />
        </div>
      </div>
    </section>
  );
}
