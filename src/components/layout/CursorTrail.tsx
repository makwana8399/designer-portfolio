"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number;
}

const TRAIL_MS = 450;

// Hand-drawn-looking white line that trails the cursor and fades out —
// mirrors the scribble/trail effect seen throughout the reference site.
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const draw = () => {
      const now = performance.now();
      pointsRef.current = pointsRef.current.filter((p) => now - p.t < TRAIL_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const age = (now - p1.t) / TRAIL_MS;
        const opacity = Math.max(0, 1 - age);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        ctx.lineWidth = Math.max(0.5, 1.6 * (1 - age));
        ctx.lineCap = "round";
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[45]" />;
}
