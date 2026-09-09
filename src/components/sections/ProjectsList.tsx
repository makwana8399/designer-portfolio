"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/site";

const COUNT = projects.length;
// Rendered copies of the list stacked back-to-back. Needs to be enough that
// (COPIES - 1) * one-copy-height comfortably exceeds the viewport height —
// with only 2 copies, a tall viewport could scroll past the end of what's
// actually rendered right at the wrap point (nothing there for an instant),
// which reads as a sudden jump rather than a loop. 6 is cheap to render
// (a handful of rows) and leaves a large safety margin for any screen size.
const COPIES = 6;

// An endless reel, not a list with a top/bottom: the track renders the
// project rows several times back-to-back and its scroll offset is wrapped
// modulo one copy's height every frame, so scrolling (or dragging, on
// touch) past the last project glides straight into the first again — same
// going up, with no stop at either end. Only active while the cursor is
// over it; move off and the rest of the page (which itself never scrolls
// here) is inert.
export function ProjectsList() {
  const introRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const listHeightRef = useRef(0);
  const offsetRef = useRef(0);
  const targetRef = useRef(0);
  const dragStartYRef = useRef<number | null>(null);
  const dragStartOffsetRef = useRef(0);
  const pillSizeRef = useRef({ w: 0, h: 0 });
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(
    () => {
      gsap.from(introRef.current, { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" });
      gsap.from(".project-row", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: introRef },
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      listHeightRef.current = track.scrollHeight / COPIES;
    };
    measure();

    const wrap = (value: number) => {
      const h = listHeightRef.current;
      if (h <= 0) return value;
      return ((value % h) + h) % h;
    };

    // offsetRef/targetRef accumulate forever, unwrapped — they're the real
    // distance scrolled. wrap() is applied only at render time, to the
    // value actually used for translateY. Wrapping the tracked state itself
    // (as an earlier version did) made it snap back near the loop seam:
    // once target crossed into the next copy but offset hadn't caught up,
    // their difference would jump by roughly a full list-height for one
    // frame, reading as a stutter right "at the end."
    let rafId = requestAnimationFrame(function tick() {
      const gap = targetRef.current - offsetRef.current;
      offsetRef.current += gap * 0.15;
      const h = listHeightRef.current;
      const visualOffset = wrap(offsetRef.current);
      const tilt = Math.max(-5, Math.min(5, gap * 0.05));
      track.style.transform = `translateY(${-visualOffset}px) rotateX(${tilt}deg)`;
      window.dispatchEvent(
        new CustomEvent("reel-progress", { detail: h > 0 ? visualOffset / h : 0 }),
      );
      rafId = requestAnimationFrame(tick);
    });

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += e.deltaY;
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });

    const onTouchStart = (e: TouchEvent) => {
      dragStartYRef.current = e.touches[0].clientY;
      dragStartOffsetRef.current = targetRef.current;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragStartYRef.current === null) return;
      e.preventDefault();
      const delta = dragStartYRef.current - e.touches[0].clientY;
      targetRef.current = dragStartOffsetRef.current + delta;
    };
    const onTouchEnd = () => {
      dragStartYRef.current = null;
    };
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    // "View project" pill that follows the cursor — same magnetic, smoothed
    // follow (gsap.quickTo, not an instant snap) as the Preloader's ENTER
    // button. Visibility is handled declaratively (onMouseEnter/onMouseLeave
    // on each row, below); this listener only updates its target position.
    const label = cursorLabelRef.current;
    if (label) {
      const rect = label.getBoundingClientRect();
      pillSizeRef.current = { w: rect.width, h: rect.height };
      quickX.current = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3" });
      quickY.current = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3" });
    }
    const onMouseMove = (e: MouseEvent) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left - pillSizeRef.current.w / 2;
      const y = e.clientY - rect.top - pillSizeRef.current.h - 14;
      quickX.current?.(x);
      quickY.current?.(y);
    };
    viewport.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile: a normal scrolling page of big project cards — title,
          tags, description, then a large image — matching the reference's
          mobile layout, which drops the endless-reel treatment entirely
          rather than trying to shrink it. Desktop (lg:) uses the reel below
          instead; this block is hidden there. */}
      <div className="lg:hidden">
        <h1 className="font-display mb-6 text-right text-6xl uppercase leading-none">Projects</h1>

        <div className="flex flex-col gap-16 pb-16">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group block">
              <h2 className="font-display mb-3 text-3xl uppercase leading-none">
                {project.title}
              </h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted">{project.description}</p>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={project.image.endsWith(".svg")}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: the endless reel, unchanged. */}
      <div ref={introRef} className="mx-auto hidden h-full min-h-0 w-[70%] flex-col lg:flex">
      <h1 className="font-display mb-8 shrink-0 text-right text-6xl leading-none sm:text-8xl">
        Projects
      </h1>

      <div
        ref={viewportRef}
        className="relative min-h-0 flex-1 touch-none select-none overflow-hidden"
        style={{
          perspective: "1200px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div ref={trackRef} className="flex flex-col">
          {Array.from({ length: COPIES }, () => projects)
            .flat()
            .map((project, i) => (
            <Link
              key={`${project.id}-${i}`}
              href={`/projects/${project.id}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="project-row group relative grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-b border-border py-5 -mt-px"
            >
              <span className="hidden font-mono text-[10px] text-dim sm:block">
                {String((i % COUNT) + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="font-display mb-1.5 text-2xl leading-none sm:text-4xl">
                  {project.title}
                </h2>
                <div className="mb-1.5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-[8px] uppercase tracking-[0.15em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="max-w-md text-xs leading-relaxed text-muted">{project.description}</p>
              </div>

              <div className="relative hidden aspect-video w-28 overflow-hidden rounded border border-border sm:block">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={project.image.endsWith(".svg")}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Glass "view project" pill that follows the cursor (magnetic
            gsap.quickTo motion), with its text scrolling continuously inside
            via the shared marquee keyframe — position/visibility driven
            imperatively in the effect above (mousemove is too frequent for
            React state). */}
        <div
          ref={cursorLabelRef}
          className={`pointer-events-none absolute left-0 top-0 z-10 w-32 overflow-hidden whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-opacity duration-150 ${
            isHovering ? "opacity-100" : "opacity-0"
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
      </div>
      </div>
    </>
  );
}
