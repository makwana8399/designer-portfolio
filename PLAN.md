# Portfolio Build Plan

Reference inspiration: https://www.saifullah.dev (design/motion language only — no
code, assets, or copy were copied; see the original research notes in this
conversation for the full breakdown of what was observed there).

Goal: same category of experience — dark, "system console" aesthetic, live
WebGL background, GSAP scroll choreography, boot sequence, settings panel —
built fresh, with your own content, images, and copy.

## Confirmed tech stack (in use)

- **Next.js 16** (App Router, TypeScript, Turbopack) — `create-next-app`
- **React 19**
- **Tailwind CSS v4** (CSS-based `@theme`, no `tailwind.config.js`)
- **Three.js + React Three Fiber + drei** — WebGL background (`ParticleField`)
- **GSAP + ScrollTrigger + @gsap/react (`useGSAP`)** — entrance & scroll animations
- **next/font/google** — placeholder fonts (JetBrains Mono + Space Grotesk),
  swappable for custom/self-hosted fonts via `next/font/local`
- **Vercel** — intended deploy target (not yet deployed)

## Project structure

```
src/
  app/
    layout.tsx        # global chrome: preloader, 3D bg, nav, settings panel, footer
    page.tsx           # home: Hero, About, Projects, Contact
    globals.css         # design tokens (colors, fonts) via Tailwind v4 @theme
  content/
    site.ts             # SINGLE SOURCE OF TRUTH for all copy/data — edit this file
    types.ts             # TypeScript types for content.ts
  components/
    layout/              # Nav, Footer, Preloader, SettingsPanel, SettingsContext
    sections/             # Hero, About, Experience, Projects, Contact (page sections)
    three/                 # SceneCanvas (R3F wrapper), ParticleField (bg effect)
    ui/                     # StatCounter, ProjectCard, SocialLinks, LocalClock
public/
  images/projects/          # placeholder SVGs — replace with real project images
```

## Status

- [x] Project scaffolded (Next.js + TS + Tailwind v4)
- [x] Three.js / React Three Fiber / GSAP / @gsap/react installed
- [x] Design tokens set up (dark theme, accent color, two placeholder fonts)
- [x] Boot/preloader sequence ("INITIALIZING_ENGINE 0% → 100%")
- [x] Global Config settings panel: theme tag, audio-engine toggle (UI wired,
      no audio files yet), performance-tier toggle (**functional** — actually
      changes 3D particle count + canvas DPR)
- [x] Nav with numbered sections + social links + Dev Labs link
- [x] Hero with GSAP entrance timeline + animated stat counters
- [x] About with scroll-reveal + skills list
- [x] Projects grid with scroll-reveal + placeholder cards/images
- [x] Contact section with live local-time readout + social links
- [x] Live WebGL particle background, reacts to performance tier
- [x] Production build verified (`npm run build` — clean, 0 errors)
- [x] Dev server smoke-tested (`npm run dev` — 200 OK, no console/runtime errors)
- [x] Real content from resume (2026-08-21) — name, role, bio, stats,
      experience, skills, and 3 real projects now in `src/content/site.ts`;
      new Experience section added; resume PDF served at `/resume.pdf` with
      a working download button in Contact. Two items need your confirmation
      before calling this fully done — see TODO.md §1.
- [ ] Real images (see TODO.md)
- [ ] Real fonts, if you want to move off the placeholder Google fonts
- [ ] Audio files, if you want the audio-engine toggle to actually play something
- [ ] Deploy to Vercel + custom domain

## How content flows

Everything text/data-driven lives in **`src/content/site.ts`**. Once the resume
is available, that single file gets updated (name, role, bio, stats, experience,
skills, projects, social links, email) and it propagates through every
component automatically — no component code needs to change for a content
update.

## Next steps (waiting on you — see TODO.md for the full checklist)

1. ~~Attach resume~~ — done (2026-08-21). Confirm the LinkedIn handle and
   availability status flagged in TODO.md §1.
2. Send real project images/screenshots (or say "placeholders are fine for
   now") → drop into `public/images/projects/`.
3. Confirm/send: Upwork/Twitter links if wanted, a real Dev Labs URL (or say
   remove it), whether the phone number should be shown anywhere.
4. Decide whether to keep the audio-engine feature; if yes, provide (or approve
   me sourcing) royalty-free ambient tracks.
5. Decide on custom fonts vs. keeping the current placeholder pair.
6. When ready, I'll wire up deployment to Vercel.
