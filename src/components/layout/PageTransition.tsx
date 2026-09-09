"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Runs on every route change (not the initial load): the incoming page
// mounts already blurred (set in a layout effect, so it paints blurred on
// the very first frame instead of flashing sharp then snapping blurry),
// then eases smoothly back into focus while a thin accent line fills
// across the footer — one continuous fade-in, no sharp/blur pop.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [blurred, setBlurred] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [barVisible, setBarVisible] = useState(false);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setBlurred(true);
    setBarVisible(true);
    setBarWidth(0);
  }, [pathname]);

  useEffect(() => {
    if (!blurred) return;

    const startFill = requestAnimationFrame(() => setBarWidth(100));
    const settle = setTimeout(() => setBlurred(false), 550);
    const hideBar = setTimeout(() => {
      setBarVisible(false);
      setBarWidth(0);
    }, 750);

    return () => {
      cancelAnimationFrame(startFill);
      clearTimeout(settle);
      clearTimeout(hideBar);
    };
  }, [blurred, pathname]);

  return (
    <>
      <div
        style={{ willChange: "filter, opacity" }}
        className={`transition-[filter,opacity] duration-700 ease-out ${
          blurred ? "opacity-60 blur-lg" : "opacity-100 blur-0"
        }`}
      >
        {children}
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[2px] bg-white/5">
        <div
          className={`h-full bg-accent transition-[width,opacity] ease-out ${
            barVisible ? "duration-700 opacity-100" : "duration-300 opacity-0"
          }`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </>
  );
}
