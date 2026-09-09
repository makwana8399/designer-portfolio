import Image from "next/image";

// Duotone photo treatment, matching the reference's grainy engraved-portrait
// look. Works with the placeholder SVG now — swap the `src` for a real photo
// later and the same filter pipeline applies.
//
// "dot-grid" = halftone dots (used for the Home hero's line-art avatar)
// "scanline" = horizontal scanline/glitch bands (used for the About photo)
export function PortraitFrame({
  src,
  alt,
  className = "",
  variant = "dot-grid",
}: {
  src: string;
  alt: string;
  className?: string;
  variant?: "dot-grid" | "scanline";
}) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={src.endsWith(".svg")}
        className="object-cover grayscale contrast-125 brightness-90"
      />
      {variant === "dot-grid" ? (
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      ) : (
        <div className="scanlines pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" />
      )}
    </div>
  );
}
