import { navLinks, profile } from "@/lib/content";

import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="rise flex items-start justify-between gap-8">
      <div>
        <p className="font-display text-[22px] leading-none tracking-[-0.01em] text-ink">
          {profile.name}
        </p>
        <p className="mt-3 font-mono text-[11px] leading-[1.7] tracking-[0.18em] text-mute">
          {profile.role}
        </p>
      </div>

      <div className="flex items-center gap-7 pt-1.5">
        <nav aria-label="Primary" className="flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="font-mono text-[10px] tracking-[0.22em] text-mute transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
