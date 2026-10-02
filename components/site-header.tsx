import Link from "next/link";

import { navLinks, profile } from "@/lib/content";

import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  // Stacks on narrow screens: three nav labels plus the toggle will not share
  // a row with the name below ~640px.
  return (
    <header className="rise flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div>
        <Link
          href="/"
          className="font-display text-[22px] leading-none tracking-[-0.01em] text-ink transition-opacity duration-300 hover:opacity-70"
        >
          {profile.name}
        </Link>
        <p className="mt-3 font-mono text-[11px] leading-[1.7] tracking-[0.18em] text-mute">
          {profile.role}
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-7 sm:pt-1.5">
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-7">
          {navLinks.map((link) => {
            const className =
              "font-mono text-[10px] tracking-[0.22em] text-mute transition-colors duration-300 hover:text-ink";

            // Internal routes go through Link for prefetching; the rest are
            // an external profile and a mailto, which Link cannot help with.
            return link.href.startsWith("/") ? (
              <Link key={link.label} href={link.href} className={className}>
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={className}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
