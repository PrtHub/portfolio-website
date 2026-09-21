import { buildJsonLd } from "@/lib/schema";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` closes the script-injection hole the Next.js JSON-LD guide warns about.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildJsonLd()).replace(/</g, "\u003c"),
      }}
    />
  );
}
