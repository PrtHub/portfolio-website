import type { CSSProperties } from "react";

import type { App } from "@/lib/content";
import { apps, statusLabel } from "@/lib/content";

/** Shared between the linked and unlinked variants of a row. */
const ROW_LAYOUT =
  "grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-2 py-6 md:grid-cols-[4rem_1fr_auto] md:gap-x-6 md:gap-y-0 md:py-7";

/** Lines the detail panel up with the app name rather than the dot or the index. */
const DETAIL_INDENT = "ps-7 md:ps-[115px]";

function RowHeader({ app, position }: { app: App; position: number }) {
  return (
    <>
      <p className="hidden font-mono text-[11px] tracking-[0.1em] text-mute md:block">
        {String(position).padStart(2, "0")}
      </p>

      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
        <span
          aria-hidden
          className="size-[7px] shrink-0 self-center rounded-full transition-transform duration-500 group-hover:scale-125"
          style={{ backgroundColor: `var(${app.accent})` }}
        />
        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-none tracking-[-0.01em] text-ink">
          {app.name}
        </h2>
        {/* Always its own line on narrow screens so every row wraps identically. */}
        <p className="basis-full ps-7 font-mono text-[11px] tracking-[0.16em] text-mute md:basis-auto md:ps-0">
          {app.tagline}
        </p>
      </div>

      <p className="text-right font-mono text-[12px] text-mute transition-colors duration-500 group-hover:text-ink">
        {statusLabel(app)}
      </p>
    </>
  );
}

function RowDetail({ app }: { app: App }) {
  return (
    <div className="disclosure">
      <div>
        <div className={`disclosure-body pb-6 md:pb-7 ${DETAIL_INDENT}`}>
          <p className="max-w-[58ch] font-display text-[15px] leading-[1.6] text-soft">
            {app.summary}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
            {app.pointers.map((pointer) => (
              <li
                key={pointer}
                className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.14em] text-mute"
              >
                <span
                  aria-hidden
                  className="size-[3px] shrink-0 rounded-full"
                  style={{ backgroundColor: `var(${app.accent})` }}
                />
                {pointer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AppList() {
  return (
    <ol className="mt-20 border-t border-rule md:mt-24">
      {apps.map((app, index) => (
        <li
          key={app.name}
          className="app-row rise group border-b border-rule"
          style={{ "--rise-delay": `${220 + index * 70}ms` } as CSSProperties}
        >
          {app.href ? (
            <a href={app.href} target="_blank" rel="noreferrer" className={ROW_LAYOUT}>
              <RowHeader app={app} position={index + 1} />
            </a>
          ) : (
            <div className={ROW_LAYOUT}>
              <RowHeader app={app} position={index + 1} />
            </div>
          )}

          <RowDetail app={app} />
        </li>
      ))}
    </ol>
  );
}
