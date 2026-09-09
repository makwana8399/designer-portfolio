"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { devLabsUrl, navItems, socialLinks } from "@/content/site";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useSettings } from "./SettingsContext";

export function NavSwitcher() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, setSettingsOpen } = useSettings();
  const current = navItems.find((item) => item.href === pathname) ?? navItems[0];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {menuOpen && (
        <div className="w-60 rounded-t-lg border border-b-0 border-border bg-black/95 p-5 font-mono text-sm shadow-[0_0_24px_-8px_var(--accent)] backdrop-blur sm:w-72 lg:w-80">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center">
              <span className="mr-2.5 h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <div>
                <p className="font-display text-lg font-bold tracking-wide text-foreground">Menu</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-dim">Navigation</p>
              </div>
            </div>
            <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[10px] text-accent">
              DIR
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded border border-border px-2.5 py-1.5 font-bold text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-dim">•</span>
                <ScrambleText text={link.label} active={menuOpen} />
              </a>
            ))}
          </div>

          <a
            href={devLabsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex items-center justify-between rounded border border-border px-3 py-2 font-bold uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Dev Labs <span aria-hidden>↗</span>
          </a>

          <div className="flex flex-col gap-1.5">
            {[...navItems]
              .reverse()
              .filter((item) => item.href !== pathname)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group/item flex items-center justify-between rounded border-l-2 border-transparent px-3 py-2 font-bold uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  <span>
                    <span className="label-tag mr-2 text-dim">{item.index}</span>
                    {item.label}
                  </span>
                  <span className="text-dim transition-colors group-hover/item:text-accent">•</span>
                </Link>
              ))}
          </div>
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setSettingsOpen(false);
          setMenuOpen(!menuOpen);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setSettingsOpen(false);
            setMenuOpen(!menuOpen);
          }
        }}
        aria-label="Toggle navigation menu"
        className={`group flex w-60 cursor-pointer items-center justify-between gap-2 border border-border bg-black/90 py-3 pl-4 pr-3 font-mono text-sm uppercase tracking-[0.2em] shadow-[0_0_24px_-8px_var(--accent)] transition-all hover:scale-[1.01] hover:border-accent sm:w-72 sm:pl-6 sm:text-base lg:w-80 ${
          menuOpen ? "rounded-b-lg" : "rounded-lg"
        }`}
      >
        <span className="flex items-center">
          <span className="mr-2.5 h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="label-tag mr-2 text-dim">{current.index}</span>
          <span className="font-bold text-foreground">{current.label}</span>
        </span>
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-black transition-transform group-hover:rotate-90 sm:h-10 sm:w-10"
        >
          <span className="text-base">{menuOpen ? "✕" : "▦"}</span>
        </span>
      </div>
    </div>
  );
}
