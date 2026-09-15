import { siteConfig, siteUrl, socialLinks } from "@/content/site";

// Person + ProfessionalService JSON-LD, linked via @graph — this is what
// tells Google "this is a person AND a Surat-based service business" so
// local/service searches (see the SEO plan) can surface rich results
// instead of just a plain blue link.
export function StructuredData() {
  const sameAs = socialLinks
    .filter((link) => link.url !== "#")
    .map((link) => link.url);

  const address = {
    "@type": "PostalAddress",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        url: siteUrl,
        email: siteConfig.email,
        address,
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${siteConfig.name} — AI Automation & Web Development`,
        url: siteUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address,
        areaServed: ["Surat", "Gujarat", "India", "Remote"],
        founder: { "@id": `${siteUrl}/#person` },
        makesOffer: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation Systems" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent & Chatbot Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workflow Automation (n8n)" } },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
