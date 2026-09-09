import { siteConfig } from "@/content/site";

// Drop middle initials (e.g. "J.") from the header display — full legal name
// still lives in siteConfig.name for the page title, footer, and alt text.
const nameParts = siteConfig.name.split(" ").filter((part) => !/^[A-Z]\.?$/.test(part));
const [firstWord, ...rest] = nameParts;
const lastWord = rest.join(" ") || firstWord;
const year = new Date().getFullYear();

export function IdentityHeader() {
  return (
    <div className="pointer-events-none fixed left-6 top-6 z-30 font-mono text-[11px] leading-relaxed sm:text-sm">
      <p className="flex items-center gap-2">
        {firstWord}
        <span aria-hidden className="inline-block h-3.5 w-px bg-dim" />
        Portfolio
      </p>
      <p className="flex items-center gap-2">
        {lastWord}
        <span aria-hidden className="inline-block h-3.5 w-px bg-dim" />
        {year}
      </p>
    </div>
  );
}
