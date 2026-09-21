import type { CSSProperties } from "react";

import { emailHref, footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer
      className="rise mt-auto flex flex-col gap-8 pb-16 pt-20 sm:flex-row sm:items-end sm:justify-between md:pb-20 md:pt-28"
      style={{ "--rise-delay": "660ms" } as CSSProperties}
    >
      <p className="whitespace-nowrap font-display text-[15px] italic leading-[1.5] text-mute">
        {footer.note}
      </p>

      <div className="flex items-end gap-10 sm:gap-14">
        <p className="font-mono text-[11px] tracking-[0.14em] text-mute">
          {footer.city}
        </p>
        <a
          href={emailHref}
          className="border-b border-ink pb-1.5 font-mono text-[12px] tracking-[0.04em] text-ink transition-opacity duration-300 hover:opacity-60"
        >
          {footer.contactLabel}
        </a>
      </div>
    </footer>
  );
}
