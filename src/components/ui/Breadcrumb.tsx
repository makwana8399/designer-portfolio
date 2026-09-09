import Link from "next/link";

export function Breadcrumb({
  current,
  trail = [],
  hideOnMobile = false,
}: {
  current: string;
  // Optional intermediate segments between Home and the current page, e.g.
  // [{ label: "Projects", href: "/projects" }] for a project detail page's
  // "Home / Projects / Project Name" trail.
  trail?: { label: string; href: string }[];
  // The project detail page builds its own in-flow, truncated breadcrumb
  // right above its title instead (see ProjectCaseStudy) — avoids this
  // fixed version's collision risk with IdentityHeader entirely, rather
  // than just capping its width. Every other page keeps this one.
  hideOnMobile?: boolean;
}) {
  return (
    // max-w-[50vw] on mobile keeps this from spreading left far enough to
    // collide with IdentityHeader (top-left) — a long "current" value (a
    // project title, say) had nothing stopping it from growing all the way
    // across; it wraps to more lines here instead. sm:max-w-none restores
    // the original unconstrained width from tablet up.
    <div
      className={`fixed right-6 top-6 z-20 max-w-[50vw] pr-14 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-dim sm:max-w-none sm:pr-0 ${
        hideOnMobile ? "hidden lg:block" : ""
      }`}
    >
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {trail.map((step) => (
        <span key={step.href}>
          {" "}
          / <Link href={step.href} className="hover:text-foreground">
            {step.label}
          </Link>
        </span>
      ))}{" "}
      / <span className="text-foreground">{current}</span>
    </div>
  );
}
