"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

const pills = [
  { label: "Availability", value: siteConfig.availability.replace(/_/g, " ") },
  { label: "Rendering", value: "WEBGL / THREE.JS" },
  { label: "Core_ID", value: siteConfig.role },
];

export function StatusMarquee() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-30 flex justify-end px-1 sm:px-2">
      {/* pl-32/max-w-50vw (unchanged from sm: up, so tablet/desktop render
          exactly as before) doesn't leave a phone-size screen wide enough:
          a box that starts that far left runs straight into IdentityHeader
          (top-left) — text from both would overlap. Mobile narrows the box
          instead of padding around inside it, so its own left edge clears
          IdentityHeader with room to spare, and needs almost no internal
          padding since it's no longer trying to out-run a wide box. */}
      <div className="max-w-[46vw] overflow-hidden pl-2 sm:max-w-[50vw] sm:pl-40">
        <div className="animate-marquee inline-flex gap-2 whitespace-nowrap">
          {[...pills, ...pills].map((pill, i) => (
            <span
              key={`${pill.label}-${i}`}
              className="inline-flex items-center gap-1.5 px-1.5 py-1 text-[11px] uppercase tracking-[0.12em]"
            >
              <span className="text-dim">{pill.label}</span>
              <span className="text-foreground">{pill.value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
