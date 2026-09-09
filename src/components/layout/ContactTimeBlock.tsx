"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";

export function ContactTimeBlock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: siteConfig.timezone,
          }).format(new Date()),
        );
      } catch {
        setTime(
          new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(
            new Date(),
          ),
        );
      }
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    // Hidden on true phone widths — even the narrower mobile nav pill still
    // shares this same bottom row from the right, and there isn't room for
    // both an email address and a pill on a ~360-390px screen without them
    // colliding. Matches the reference's mobile view, which doesn't show
    // this block either.
    <div className="fixed bottom-6 left-6 z-30 hidden gap-10 font-mono text-xs sm:flex">
      <div>
        <p className="mb-1 text-dim">Wanna Say Hello?</p>
        <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:text-accent">
          {siteConfig.email}
        </a>
      </div>
      <div className="hidden sm:block">
        <p className="mb-1 text-dim">Local Time</p>
        <p className="text-foreground">
          {siteConfig.location.split(",")[0]} {time ?? "--:--"}
        </p>
      </div>
    </div>
  );
}
