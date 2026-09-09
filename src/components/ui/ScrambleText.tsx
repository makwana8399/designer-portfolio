"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Decrypt/scramble text-reveal effect — resolves to `text` character by
// character from random glyphs. Runs once whenever `active` flips to true.
export function ScrambleText({
  text,
  active,
  className = "",
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    frame.current = 0;
    const totalFrames = text.length * 3;

    const tick = () => {
      frame.current += 1;
      const revealCount = Math.floor((frame.current / totalFrames) * text.length);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);

      if (frame.current < totalFrames) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, text]);

  return <span className={className}>{display}</span>;
}
