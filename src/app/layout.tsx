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
const seoTitle = "Mrunal Patel — AI Automation & Web Development in Surat";
const seoDescription =
  "Freelance AI engineer based in Surat, Gujarat building AI automation systems, AI agents, WhatsApp/chatbot automation, and web development for businesses — from Meta Ads lead-qualification bots to AI-powered warehouse optimization. Ranked Top 5 of 850+ nationally at Intel's AI for Manufacturing Program. Available for remote and Surat-based projects.";

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
