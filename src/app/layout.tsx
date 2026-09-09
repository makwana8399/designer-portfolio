import type { Metadata } from "next";
import { Anton, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/content/site";
import { SettingsProvider } from "@/components/layout/SettingsContext";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Preloader } from "@/components/layout/Preloader";
import { IdentityHeader } from "@/components/layout/IdentityHeader";
import { ContactTimeBlock } from "@/components/layout/ContactTimeBlock";
import { AboutMobileHeader } from "@/components/layout/AboutMobileHeader";
import { NavSwitcher } from "@/components/layout/NavSwitcher";
import { PageTransition } from "@/components/layout/PageTransition";
import { GridField } from "@/components/layout/GridField";
import { SettingsPanel } from "@/components/layout/SettingsPanel";
import { StatusMarquee } from "@/components/layout/StatusMarquee";
import { CursorTrail } from "@/components/layout/CursorTrail";
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

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.bio,
  metadataBase: new URL("https://example.com"), // TODO(user): real domain once deployed
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.bio,
  },
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
        <SettingsProvider>
          <Preloader />
          <SceneCanvas />
          <GridField />
          <div aria-hidden className="theme-wash pointer-events-none fixed inset-0 z-20" />
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
