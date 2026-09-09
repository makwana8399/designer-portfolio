"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 75;
const framePath = (i: number) => `/image-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

// Canvas-based "live photo": scrubs through a pre-rendered frame sequence
// tied to scroll position instead of playing on a timer. Frame 1 shows at
// rest; scrolling down through the nearest [data-frame-range] ancestor
// advances toward the last frame and holds there; scrolling back up runs
// the same frames in reverse, back to frame 1.
export function ScrollFrameSequence({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
  };

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      if (i === 1) {
        img.onload = () => draw(0);
      }
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * Math.min(window.devicePixelRatio || 1, 2);
      canvas.height = rect.height * Math.min(window.devicePixelRatio || 1, 2);
      draw(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);

    // closest() only finds a true DOM ancestor — falls back to a global
    // lookup for the mobile About header, which renders outside the page's
    // own tree (see AboutMobileHeader) so its `position: fixed` isn't
    // broken by PageTransition's containing block.
    const rangeEl =
      canvas.closest<HTMLElement>("[data-frame-range]") ??
      document.querySelector<HTMLElement>("[data-frame-range]");

    const st = ScrollTrigger.create({
      trigger: rangeEl ?? canvas,
      start: "top 112",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (FRAME_COUNT - 1));
        if (index !== currentFrameRef.current) {
          currentFrameRef.current = index;
          draw(index);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
