# Pending Inputs — Waiting On You

Nothing below blocks the site from running (`npm run dev` works right now).
This is the checklist of what's still needed.

## 1. Resume → content — DONE (2026-08-21)

Populated from `Harshil_Makwana_Resume.pdf` (copied into
`public/resume.pdf`, linked from the Contact section's "Download Resume"
button): `siteConfig` (name, role, tagline, bio, email, location, timezone),
`stats`, `experience[]` (new Experience section added, nav renumbered 01–05),
`skills[]`, and `projects[]`.

**Please verify these two things pulled from the resume:**
- **LinkedIn handle** — currently set to `linkedin.com/in/harshil8399`
  in `src/content/site.ts`.
- **Availability status** — set to `OPEN_FOR_OFFERS` by default; the resume's
  most recent internship listed runs through Jul 2026, so confirm this still
  reflects where things stand.

## 1b. Home hero 3D object — third attempt in place, please check

Home hero renders a 3D object again, behind the ghost heading in the left
panel on `/`. History:
1. Point-cloud built from the 2D portrait PNG — rejected, didn't look right.
2. Your first `.glb` (Tripo3D-generated bust, ~40MB, 735K verts, full PBR
   textures) — rejected ("didn't look good"). Inspecting it afterward:
   it was lit with plain directional lights only, which renders PBR
   metallic/roughness materials flat and dull with no environment to
   reflect — the likely root cause. That file has been deleted.
3. Current: you supplied `public/models/face-clean.glb` (clean Blender
   sculpt, no textures, 43K verts, 1.9MB, double-sided) — swapped in as
   `PortraitModel.tsx`'s source. Lighting now uses `drei`'s `<Environment
   preset="studio">` for image-based reflections plus two directional
   lights, so the untextured clay-grey material should actually pick up
   form and shading instead of looking flat. Same rotate-toward-cursor +
   idle sway behavior as before.

Please run `npm run dev` and check `/` — if this still doesn't look right,
specifics on *what's* off (too dark/bright, wrong angle, rotation feels
off, size wrong, material too flat/shiny) will get to a fix much faster
than another blind guess.

## 2. Images

- Hero/about photo or graphic (currently: none — purely typographic hero,
  same as before; send a headshot/graphic if you want one added)
- Project thumbnails for `public/images/projects/` — still the 3 placeholder
  SVGs (`placeholder-1.svg` = RAG Chatbot Suite, `placeholder-2.svg` =
  Sentiment Analysis API, `placeholder-3.svg` = Autonomous Content Agent).
  Real images/screenshots can be `.png`/`.jpg`/`.webp`, just update the
  `image` path for each project in `src/content/site.ts`.
- Favicon — still the default Next.js icon. Send a square logo/mark (or say
  "just use initials HM") for a custom one.
- OG/social share image — not set up yet.

## 3. Links & identity

- LinkedIn confirmed: `linkedin.com/in/harshil8399`
- GitHub confirmed: `github.com/makwana8399`
- Upwork / Twitter / other profiles — not on the resume, not added; send URLs
  if you want them in the nav/footer
- `autonomous-content-agent` project has no public link (client/internal
  work) — send one if you have a case study or demo, otherwise it's fine as-is
- "Dev Labs" nav item currently points at your GitHub profile as a
  placeholder — send a real experiments-page URL if you build one, or say
  "remove it"
- Phone number from the resume (`+91-7990780309`) is stored in
  `siteConfig.phone` but **not displayed anywhere on the site**. Confirm if
  you want it public (e.g. in Contact) or leave it unused.

## 4. Fonts

Currently using placeholder Google Fonts (JetBrains Mono for technical/label
text, Space Grotesk for headlines) loaded via `next/font/google` in
`src/app/layout.tsx`. If you have specific fonts in mind (or want to license/
supply font files), I'll switch to `next/font/local`.

## 5. Audio engine (optional feature)

The "Global Config" panel already has a working On/Off toggle and a track
selector UI, but no audio files are wired in (`audioTracks` in
`src/content/site.ts` all have empty `src`). Options:
- Send 2–3 royalty-free ambient/lo-fi/synthwave tracks to drop into `public/audio/`
- Ask me to source royalty-free tracks
- Drop the feature entirely (say so and I'll remove the panel section)

## 6. Deployment

Not deployed yet. Once content is in place: push to GitHub, connect to
Vercel, add a custom domain if you have one.

---

## Housekeeping notes (for me / future sessions)

- Project lives at `D:\designer-portfolio`.
- Stack, structure, and full status are tracked in `PLAN.md` in this same folder.
- `npm run build` and `npm run dev` both verified clean.
- Resume source file: `public/resume.pdf` for the site's download link.
