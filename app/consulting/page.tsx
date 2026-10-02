import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { OfferList } from "@/components/offer-list";
import { consulting, profile } from "@/lib/content";
import { buildConsultingJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Paid office hours with Pritam, an indie iOS developer who ships and grows apps solo. App SEO, App Store teardowns, launch advice and scoping.",
  alternates: { canonical: "/consulting" },
  openGraph: {
    type: "profile",
    url: "/consulting",
    title: `Consulting · ${profile.name}`,
    description:
      "App SEO, App Store teardowns and launch advice — 15 to 60 minutes with an indie iOS developer.",
  },
};

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function ConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping `<` closes the script-injection hole the Next.js guide warns about.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildConsultingJsonLd()).replace(/</g, "\u003c"),
        }}
      />

      <p className="rise mt-16 font-mono text-[11px] tracking-[0.18em] text-mute md:mt-20">
        {consulting.eyebrow}
      </p>

      <h1
        className="rise mt-6 max-w-[800px] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.015em] text-ink"
        style={delay(80)}
      >
        {consulting.headlineLead}
        <em className="italic text-soft">{consulting.headlineTrail}</em>
      </h1>

      <p
        className="rise mt-8 max-w-[62ch] font-display text-[16px] leading-[1.6] text-soft"
        style={delay(150)}
      >
        {consulting.intro}
      </p>

      <OfferList />

      <div className="rise mt-12 flex flex-col gap-4 md:mt-14" style={delay(500)}>
        <p className="max-w-[62ch] font-display text-[15px] italic leading-[1.6] text-soft">
          {consulting.guarantee}
        </p>
        <p className="max-w-[62ch] font-display text-[15px] leading-[1.6] text-mute">
          {consulting.limits}
        </p>
      </div>
    </>
  );
}
