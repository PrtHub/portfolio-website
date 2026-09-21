import { apps, profile, seo, siteUrl } from "./content";

/**
 * schema.org graph for the page.
 *
 * Only claims that the page itself shows, or that the linked App Store listing
 * confirms, go in here — Google requires structured data to agree with visible
 * content. That is why there is no `aggregateRating`: the ratings are real, but
 * the page does not display them, so emitting them would be a violation.
 */
export function buildJsonLd() {
  const personId = `${siteUrl}/#person`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    jobTitle: profile.jobTitle,
    description: seo.description,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    sameAs: [profile.socialUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.locality,
      addressCountry: profile.country,
    },
    knowsAbout: ["iOS development", "Swift", "SwiftUI", "Product design", "App Store optimisation"],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${profile.name} — ${seo.title}`,
    description: seo.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };

  // Unreleased apps are left out: there is no listing to corroborate them.
  const applications = apps
    .filter((app) => app.href)
    .map((app) => ({
      "@type": "MobileApplication",
      name: app.name,
      alternateName: `${app.name} — ${app.tagline}`,
      description: app.summary,
      applicationCategory: app.category,
      operatingSystem: "iOS",
      url: app.href,
      softwareVersion: app.version,
      author: { "@id": personId },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, ...applications],
  };
}
