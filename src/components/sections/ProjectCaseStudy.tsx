"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

export function ProjectCaseStudy({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLAnchorElement>(null);
  const nextCursorRef = useRef<HTMLDivElement>(null);
  const nextPillSizeRef = useRef({ w: 0, h: 0 });
  const nextQuickX = useRef<gsap.QuickToFunc | null>(null);
  const nextQuickY = useRef<gsap.QuickToFunc | null>(null);
  const [nextHovering, setNextHovering] = useState(false);

  // Same cursor-following "view project" pill as the projects list, styled
  // and animated like the Preloader's ENTER button — magnetic, smoothed
  // follow via gsap.quickTo rather than an instant snap. Hover state toggles
  // visibility (React); position follows the mouse imperatively.
  useEffect(() => {
    const el = nextProjectRef.current;
    const label = nextCursorRef.current;
    if (!el || !label) return;
    const rect = label.getBoundingClientRect();
    nextPillSizeRef.current = { w: rect.width, h: rect.height };
    nextQuickX.current = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3" });
    nextQuickY.current = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3" });
    const onMouseMove = (e: MouseEvent) => {
      const elRect = el.getBoundingClientRect();
      const x = e.clientX - elRect.left - nextPillSizeRef.current.w / 2;
      const y = e.clientY - elRect.top - nextPillSizeRef.current.h - 14;
      nextQuickX.current?.(x);
      nextQuickY.current?.(y);
    };
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, []);

  useGSAP(
    () => {
      gsap.from(".case-study-fade", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const meta = [
    { label: "Project_Type", value: project.projectType },
    { label: "Entry_Year", value: project.entryYear },
    { label: "Target_Platform", value: project.targetPlatform },
    { label: "Primary_Role", value: project.primaryRole },
  ];

  return (
    // case-study-page: scopes a mobile-only paragraph color override (see
    // globals.css) — this page wants body copy dimmed gray against white
    // headings, not the site-wide "all paragraphs white on mobile" rule.
    <div ref={containerRef} className="case-study-page px-6 pb-28 pt-6 sm:px-10 lg:pt-24 lg:px-16">
      {/* Mobile: a "← Projects" pill sits alone up top, then an in-flow,
          truncated breadcrumb, then the title — all stacked, normal
          document flow, nothing fixed. That sidesteps the collision the
          old fixed-breadcrumb approach kept having with IdentityHeader:
          nothing here is positioned independently of anything else, so
          there's nothing for it to run into. The global <Breadcrumb> is
          hidden on mobile for this page specifically (hideOnMobile, see
          the page component) since this replaces it there. Desktop (lg:)
          is unchanged — small square icon button beside the title, same
          row, and the original fixed Breadcrumb up top. */}
      <div className="case-study-fade mb-10 flex flex-col items-end lg:flex-row lg:gap-4 lg:items-center">
        {/* Gaps are now two independent margins (mb-20 here, mb-2 on the
            path line below) instead of one shared flex `gap` — that's what
            lets button→path and path→heading be different sizes; a shared
            gap can only ever apply the same amount everywhere. */}
        <Link
          href="/projects"
          aria-label="Back to projects"
          className="order-1 mb-20 flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent lg:order-none lg:mb-0 lg:h-9 lg:w-9 lg:shrink-0 lg:justify-center lg:gap-0 lg:rounded lg:p-0 lg:text-base lg:normal-case lg:tracking-normal"
        >
          <span aria-hidden>&larr;</span>
          <span className="lg:hidden">Projects</span>
        </Link>

        <p className="order-2 mb-4 w-full truncate text-left font-mono text-[10px] uppercase tracking-[0.2em] text-dim lg:mb-0 lg:hidden">
          Home / Projects / {project.title}
        </p>

        {/* max-w-[220px] forces most titles to wrap across two lines at
            this bigger mobile size instead of running near-full-width on
            one. lg:max-w-none restores the original unconstrained width. */}
        <h1 className="order-3 w-full max-w-[220px] self-start text-left font-display text-4xl leading-none sm:max-w-none sm:text-6xl lg:order-none lg:w-auto lg:self-auto">
          {project.title}
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="case-study-fade">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">Project Overview</p>
          <p className="max-w-xl text-sm leading-relaxed text-muted">{project.description}</p>
        </div>

        <div className="case-study-fade flex flex-col gap-6 font-mono text-xs">
          <div className="grid grid-cols-2 gap-4">
            {meta.map((m) => (
              <div key={m.label}>
                <p className="mb-1 text-dim uppercase tracking-[0.15em]">{m.label}</p>
                <p className="text-foreground">{m.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-2 text-dim uppercase tracking-[0.15em]">Deployed_Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-dim uppercase tracking-[0.15em]">Color_Palette</p>
            <div className="flex gap-2">
              {project.colorPalette.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-6 w-6 rounded border border-border-strong"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sits right above the hero shot — scrolls with the page (not fixed
          to the viewport), so it's only visible next to the image, not
          hanging around the whole time you're reading the page. */}
      <div className="case-study-fade mt-[4.5rem] overflow-hidden border-y border-border py-2">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-xs uppercase tracking-wide text-white sm:text-sm"
            >
              {project.title}
            </span>
          ))}
        </div>
      </div>

      {/* Walkthrough intro: overview copy on the left, a page index on the
          right listing the three sections below. */}
      <div className="case-study-fade mt-24 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display mb-4 text-3xl leading-none sm:text-5xl">
            Project Walkthrough
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            A closer look at the finer details of this case study. Explore the core
            features, thoughtful design decisions, and interactive moments that shape the
            user experience.
          </p>
        </div>

        <div className="font-mono text-xs">
          <p className="mb-3 text-dim uppercase tracking-[0.2em]">[ Page_Index ]</p>
          <ul className="flex flex-col gap-2 text-muted">
            <li>01 // The Challenge</li>
            <li>02 // Interactive Gallery</li>
            <li>03 // The Solution</li>
          </ul>
        </div>
      </div>

      {/* 01 — The Challenge: text left, one supporting image right. */}
      <div className="case-study-fade mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">01 // The Challenge</p>
          <h3 className="font-display mb-4 text-lg sm:text-xl">The Challenge</h3>
          <p className="text-sm leading-relaxed text-muted">{project.challenge}</p>
        </div>
        <div
          className={`relative overflow-hidden rounded border border-border bg-surface ${
            project.media[0].portrait ? "aspect-[3/4]" : "aspect-[2.1/1]"
          }`}
        >
          <Image
            src={project.media[0].src}
            alt={project.media[0].alt}
            fill
            unoptimized={project.media[0].src.endsWith(".svg")}
            className={project.media[0].portrait ? "object-contain" : "object-cover"}
          />
          {project.media[0].isPlaceholder && (
            <span className="absolute bottom-3 left-3 rounded border border-border-strong bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-dim">
              Demo Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* 02 — Interactive Gallery: the project's media set, scrolling
          smoothly and continuously (duplicated once for a seamless loop),
          sized close to the solution shot below rather than as thumbnails. */}
      <div className="case-study-fade mt-24">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-dim">
          02 // Interactive Gallery
        </p>
        <div className="overflow-hidden">
          <div className="animate-marquee-slow flex w-max gap-6">
            {(() => {
              const galleryMedia = project.media.filter((item) => !item.excludeFromGallery);
              return [...galleryMedia, ...galleryMedia];
            })().map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="relative aspect-[2.1/1] w-[22rem] shrink-0 overflow-hidden rounded border border-border bg-surface sm:w-[30rem] lg:w-[34rem]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized={item.src.endsWith(".svg")}
                  className="object-cover"
                />
                {item.isPlaceholder && (
                  <span className="absolute bottom-3 left-3 rounded border border-border-strong bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-dim">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 03 — The Solution: text on the left, one image on the right. */}
      <div className="case-study-fade mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">03 // The Solution</p>
          <h3 className="font-display mb-4 text-lg sm:text-xl">The Solution</h3>
          <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
        </div>
        <div
          className={`relative mx-auto w-full overflow-hidden rounded border border-border bg-surface ${
            (project.media[1] ?? project.media[0]).portrait
              ? "aspect-[3/4] max-w-sm"
              : "aspect-[2.1/1]"
          }`}
        >
          <Image
            src={(project.media[1] ?? project.media[0]).src}
            alt={(project.media[1] ?? project.media[0]).alt}
            fill
            unoptimized={(project.media[1] ?? project.media[0]).src.endsWith(".svg")}
            className={
              (project.media[1] ?? project.media[0]).portrait ? "object-contain p-3" : "object-cover"
            }
          />
          {(project.media[1] ?? project.media[0]).isPlaceholder && (
            <span className="absolute bottom-3 left-3 rounded border border-border-strong bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-dim">
              Demo Coming Soon
            </span>
          )}
        </div>
      </div>

      <div className="case-study-fade mt-24 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-dim">Key_Contributions</p>
        <p className="text-sm leading-relaxed text-muted">{project.contributions}</p>
      </div>

      <Link
        ref={nextProjectRef}
        href={`/projects/${nextProject.id}`}
        onMouseEnter={() => setNextHovering(true)}
        onMouseLeave={() => setNextHovering(false)}
        className="case-study-fade group relative mt-28 flex items-center justify-between border-t border-border pt-8"
      >
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">Next_Project</p>
          <p className="font-display text-3xl transition-colors group-hover:text-accent sm:text-5xl">
            {nextProject.title}
          </p>
        </div>
        <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">
          &rarr;
        </span>

        <div
          ref={nextCursorRef}
          className={`pointer-events-none absolute left-0 top-0 z-10 w-32 overflow-hidden whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-opacity duration-150 ${
            nextHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="animate-marquee flex w-max items-center gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-1.5">
                View Project <span aria-hidden>→</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
