export interface SocialLink {
  label: string;
  url: string;
}

export interface Stat {
  label: string;
  // Short form for the compact mobile stat pill (e.g. "PROJECTS" instead of
  // "AI Workflows Shipped") — falls back to `label` if omitted.
  shortLabel?: string;
  value: number;
  suffix?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface SkillSector {
  id: string;
  label: string;
  skills: string[];
}

export interface ProjectMedia {
  src: string;
  alt: string;
  isPlaceholder?: boolean;
  // Tall/portrait source (e.g. a printed invoice or phone screenshot) —
  // rendered with a taller container and object-contain instead of the
  // default wide object-cover crop, so nothing gets cut off.
  portrait?: boolean;
  // Skip this item in the Interactive Gallery marquee — for media (like a
  // portrait shot) that reads fine standing alone in the Challenge/Solution
  // slot but gets cropped illegibly at the gallery's wide aspect ratio.
  excludeFromGallery?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  year: string;
  // Case-study detail page fields
  projectType: string;
  entryYear: string;
  targetPlatform: string;
  primaryRole: string;
  technologies: string[];
  colorPalette: string[];
  contributions: string;
  media: ProjectMedia[];
  // Project Walkthrough section, on the case-study page
  challenge: string;
  solution: string;
}

export interface AudioTrack {
  id: string;
  label: string;
  genre: string;
  src: string;
}

export interface NavItem {
  index: string;
  label: string;
  href: string;
}

export interface ThemeSwatch {
  id: string;
  label: string;
  color: string;
}
