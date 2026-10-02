import { apps, consulting, hire, profile, seo, siteUrl } from "./content";
import { currencies } from "./currency";

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

/** Structured data for the consulting page. Prices match what the page prints. */
export function buildConsultingJsonLd() {
  const personId = `${siteUrl}/#person`;
  const url = `${siteUrl}/consulting`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}#service`,
        name: `${profile.name} — iOS consulting`,
        url,
        description: consulting.intro,
        provider: { "@id": personId },
        areaServed: "Worldwide",
        availableLanguage: "en",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Office hours",
          itemListElement: consulting.offers.map((offer) => ({
            "@type": "Offer",
            name: offer.title,
            description: offer.summary,
            url: offer.href,
            // One specification per currency, matching what the page prints.
            priceSpecification: currencies.map((currency) => ({
              "@type": "UnitPriceSpecification",
              price: offer.prices[currency.code],
              priceCurrency: currency.code,
            })),
            itemOffered: {
              "@type": "Service",
              name: offer.title,
              serviceType: "Consulting call",
              provider: { "@id": personId },
            },
          })),
        },
      },
    ],
  };
}


/** Structured data for the hire page. Only priced engagements carry an offer. */
export function buildHireJsonLd() {
  const personId = `${siteUrl}/#person`;
  const url = `${siteUrl}/hire`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}#service`,
        name: `${profile.name} — iOS development`,
        url,
        description: hire.intro,
        provider: { "@id": personId },
        areaServed: "Worldwide",
        availableLanguage: "en",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Project work",
          itemListElement: hire.engagements.map((engagement) => ({
            "@type": "Offer",
            name: engagement.title,
            description: engagement.summary,
            url,
            ...(engagement.from
              ? {
                  priceSpecification: currencies.map((currency) => ({
                    "@type": "UnitPriceSpecification",
                    price: engagement.from![currency.code],
                    priceCurrency: currency.code,
                    // The figure is a floor, not the final quote.
                    valueAddedTaxIncluded: false,
                    minPrice: engagement.from![currency.code],
                  })),
                }
              : {}),
            itemOffered: {
              "@type": "Service",
              name: engagement.title,
              serviceType: "iOS development",
              provider: { "@id": personId },
            },
          })),
        },
      },
    ],
  };
}
