import type { CSSProperties } from "react";

import { consulting } from "@/lib/content";

import { PriceTag } from "./price-tag";

export function OfferList() {
  return (
    <ol className="mt-16 border-t border-rule md:mt-20">
      {consulting.offers.map((offer, index) => (
        <li
          key={offer.title}
          className="rise group border-b border-rule"
          style={{ "--rise-delay": `${220 + index * 80}ms` } as CSSProperties}
        >
          <div className="grid gap-x-6 gap-y-4 py-8 md:grid-cols-[4rem_1fr_auto] md:py-10">
            <p className="hidden font-mono text-[11px] tracking-[0.1em] text-mute md:block">
              {String(index + 1).padStart(2, "0")}
            </p>

            <div className="max-w-[58ch]">
              <h2 className="font-display text-[clamp(1.5rem,2.3vw,2rem)] font-normal leading-none tracking-[-0.01em] text-ink">
                {offer.title}
              </h2>
              <p className="mt-4 font-display text-[15px] leading-[1.6] text-soft">
                {offer.summary}
              </p>
              <a
                href={offer.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block border-b border-ink pb-1.5 font-mono text-[12px] tracking-[0.04em] text-ink transition-opacity duration-300 hover:opacity-60"
              >
                Book this
              </a>
            </div>

            {/* Sits above the copy on narrow screens, hard right on wide ones. */}
            <p className="order-first font-mono text-[12px] text-mute md:order-none md:text-right">
              {offer.minutes} min · <PriceTag offer={offer} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
