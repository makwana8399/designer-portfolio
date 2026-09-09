import { siteConfig, socialLinks } from "@/content/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function ContactPage() {
  return (
    <>
      <Breadcrumb current="Contact" />

      <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-32 text-center">
        <h1 className="font-display sr-only">Contact</h1>

        <span className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted">
          Wanna Say Hello?
        </span>

        <div className="w-full max-w-3xl border-t border-border" />

        <a
          href={`mailto:${siteConfig.email}`}
          className="font-display break-all text-3xl text-foreground transition-colors hover:text-accent sm:text-5xl"
        >
          {siteConfig.email}
        </a>

        <div className="w-full max-w-3xl border-t border-border" />

        <a
          href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
          className="font-display text-2xl text-foreground transition-colors hover:text-accent sm:text-4xl"
        >
          {siteConfig.phone}
        </a>

        <div className="w-full max-w-3xl border-t border-border" />

        <a
          href={siteConfig.resumeUrl}
          download
          className="rounded border border-border px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Download Resume
        </a>

        <p className="text-xs text-dim">
          © {new Date().getFullYear()} {siteConfig.name.toLowerCase().replace(/\s+/g, "")}.dev
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
