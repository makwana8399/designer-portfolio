import Link from "next/link";

export function AboutClosingCTA() {
  return (
    <div>
      <p className="mb-2 text-sm text-muted">If you need to turn your</p>
      <h2 className="font-display mb-6 text-4xl leading-[0.95] sm:text-6xl">
        IDEAS INTO SHIPPED AGENTS
      </h2>
      <p className="mb-10 max-w-lg text-sm leading-relaxed text-muted">
        with the right mix of curiosity, production discipline, and a bias
        toward autonomous systems that actually run, Mrunal is the engineer
        who will take your idea to something live.
      </p>
      <Link
        href="/contact"
        className="inline-block rounded border border-border px-8 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        Contact
      </Link>
    </div>
  );
}
