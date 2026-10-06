import type { Metadata } from "next";
import { Anton, JetBrains_Mono } from "next/font/google";
import { siteConfig, siteUrl } from "@/content/site";
import { SettingsProvider } from "@/components/layout/SettingsContext";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Preloader } from "@/components/layout/Preloader";
import { IdentityHeader } from "@/components/layout/IdentityHeader";
import { ContactTimeBlock } from "@/components/layout/ContactTimeBlock";
import { AboutMobileHeader } from "@/components/layout/AboutMobileHeader";
import { ThemeWash } from "@/components/layout/ThemeWash";
import { NavSwitcher } from "@/components/layout/NavSwitcher";
import { PageTransition } from "@/components/layout/PageTransition";
import { GridField } from "@/components/layout/GridField";
import { SettingsPanel } from "@/components/layout/SettingsPanel";
import { StatusMarquee } from "@/components/layout/StatusMarquee";
import { CursorTrail } from "@/components/layout/CursorTrail";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

// Placeholder typefaces — swap for custom/self-hosted fonts later via
// next/font/local. See TODO.md → "Fonts" for instructions.
const technical = JetBrains_Mono({
  variable: "--font-technical",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const headline = Anton({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: "400",
});

// Keyword-targeted for "AI automation Surat" / "AI system development" /
// "web development Surat" style freelance searches — see the SEO plan for
// why these specific phrases and Surat-first framing were chosen.
const seoTitle = "Harshil Makwana — Generative AI & Agentic Systems Engineer in Surat";
const seoDescription =
  "Computer Engineering graduate based in Surat, Gujarat building LLM-powered autonomous agents, RAG pipelines, and generative AI systems with 1+ year hands-on experience across three internships — shipping 10+ production AI workflows and 5+ live public projects. SAP Code Unnati certified. Available for remote and Surat-based projects.";

export const metadata: Metadata = {
  title: {
    default: seoTitle,
    template: `%s | ${siteConfig.name} — AI Automation, Surat`,
  },
  description: seoDescription,
  metadataBase: new URL(siteUrl),
  keywords: [
    "AI automation Surat",
    "AI agent development Surat",
    "AI system development",
    "web development Surat",
    "WhatsApp bot developer",
    "workflow automation n8n",
    "freelance AI engineer India",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: siteConfig.name,
    title: seoTitle,
    description: seoDescription,
    // TODO(user): add /public/og-image.png (1200x630) once you have a
    // designed share preview — omitted for now rather than pointing at a
    // file that doesn't exist yet, which would show a broken image on share.
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
  },
  // No manual `icons` field — favicon.ico, icon.png, and apple-icon.png in
  // src/app/ are Next.js's file-based icon convention and get auto-wired
  // into the page <head> without needing an explicit config here.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${technical.variable} ${headline.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <StructuredData />
        <SettingsProvider>
          <Preloader />
          <SceneCanvas />
          <GridField />
          <ThemeWash />
          <CursorTrail />
          <IdentityHeader />
          <StatusMarquee />
          <ContactTimeBlock />
          <AboutMobileHeader />
          <main className="relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <NavSwitcher />
          <SettingsPanel />
        </SettingsProvider>
      </body>
    </html>
  );
}
