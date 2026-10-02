import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { HireList } from "@/components/hire-list";
import { hire, profile } from "@/lib/content";
import { buildHireJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Hire me",
  description:
    "Done-for-you iOS work from Pritam, an indie developer who ships and grows apps solo: App Store listings, search setup, and small apps built end to end.",
  alternates: { canonical: "/hire" },
  openGraph: {
    type: "profile",
    url: "/hire",
    title: `Hire me · ${profile.name}`,
    description:
      "App Store listings, search setup, and small iOS apps built end to end by one person.",
  },
};

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function HirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping `<` closes the script-injection hole the Next.js guide warns about.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHireJsonLd()).replace(/</g, "\u003c"),
        }}
      />

      <p className="rise mt-16 font-mono text-[11px] tracking-[0.18em] text-mute md:mt-20">
        {hire.eyebrow}
      </p>

      <h1
        className="rise mt-6 max-w-[800px] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.015em] text-ink"
        style={delay(80)}
      >
        {hire.headlineLead}
        <em className="italic text-soft">{hire.headlineTrail}</em>
      </h1>

      <p
        className="rise mt-8 max-w-[62ch] font-display text-[16px] leading-[1.6] text-soft"
        style={delay(150)}
      >
        {hire.intro}
      </p>

      <HireList />
    </>
  );
}
