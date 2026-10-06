import Link from "next/link";
import { siteConfig } from "@/content/site";

export function AboutClosingCTA() {
  return (
    <div>
      <p className="mb-2 text-sm text-muted">If you need to turn your</p>
      <h2 className="font-display mb-6 text-4xl leading-[0.95] sm:text-6xl">
        IDEAS INTO SHIPPED AGENTS
      </h2>
      <p className="mb-10 max-w-lg text-sm leading-relaxed text-muted">
        with the right mix of curiosity, production discipline, and a bias
        toward autonomous systems that actually run, Harshil is the engineer
        who will take your idea to something live.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/contact"
          className="inline-block rounded border border-border px-8 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Contact
        </Link>
        <a
          href={siteConfig.upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded border border-accent/40 bg-accent/10 px-8 py-4 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:border-accent hover:bg-accent/20"
        >
          Hire on Upwork <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}
