import { headline } from "@/lib/content";

export function Hero() {
  return (
    <h1
      className="rise mt-16 max-w-[800px] font-display text-[clamp(2.125rem,4.6vw,3.625rem)] font-normal leading-[1.18] tracking-[-0.015em] text-ink md:mt-20"
      style={{ "--rise-delay": "90ms" } as React.CSSProperties}
    >
      {headline.lead}
      <em className="italic text-soft">{headline.trail}</em>
    </h1>
  );
}
