# Portfolio

Single-page portfolio for an independent iOS developer. Next.js 16 (App Router), React 19,
Tailwind CSS v4. Light and dark, no client-side JavaScript of its own.

## Getting started

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Editing the content

Every string on the page lives in [`lib/content.ts`](lib/content.ts) — the headline, the header,
the app list and the footer. Nothing is hard-coded in the components.

No placeholders are left — every value in `profile` is real. The email address is deliberately
not rendered as text anywhere: the header link reads `EMAIL` and the footer link reads
`Wanna talk?`, both pointing at `profile.email` through `mailto:`.

An app with no `href` renders as a plain, unlinked row — that is how `Miko`, `Kept` and `Repast`
sit in the list until they ship. Their `summary` and `pointers` are placeholders; the three live
apps carry copy condensed from their App Store listings.

To refresh a shipped app's details, read its listing straight from Apple:

```bash
curl -s 'https://itunes.apple.com/lookup?id=6760940713&country=us' | python -m json.tool
```

Set `NEXT_PUBLIC_SITE_URL` to your deployed origin so canonical URLs, the sitemap and Open Graph
tags resolve against the right domain.

## Adding an app

Append an entry to `apps` in `lib/content.ts` and add a matching accent colour to **both** theme
blocks in `app/globals.css`:

```ts
{
  name: "Ember",
  tagline: "READING TIMER",
  status: "In progress",
  summary: "One sentence, shown when the row opens.",
  pointers: ["SESSION TIMER", "OFFLINE", "WIDGET"], // exactly three
  accent: "--dot-ember",
}
```

```css
:root                              { --dot-ember: #9a5b2f; }  /* light */
@media (prefers-color-scheme: dark) { :root { --dot-ember: #e09a63; } }
```

The row number is derived from the array order, so there is nothing else to renumber.

## Structure

```
app/
  layout.tsx            fonts, metadata, viewport
  page.tsx              header + headline + list + footer
  globals.css           theme tokens, base styles, entrance animation
  opengraph-image.tsx   generated 1200x630 social card
  icon.svg              favicon (adapts to the colour scheme)
  robots.ts, sitemap.ts
components/
  site-header.tsx, hero.tsx, app-list.tsx, site-footer.tsx
  ui/container.tsx
lib/
  content.ts            all copy and data
  utils.ts              class-name helper
```

## Row disclosure

Hovering a row opens a panel with the app's `summary` and its three `pointers`. It is pure CSS —
the panel is a grid track transitioned from `0fr` to `1fr`, which animates to an unknown height
without JavaScript measuring anything. See `.disclosure` in `app/globals.css`.

Behaviour by input:

| Input                    | Behaviour                                              |
| ------------------------ | ------------------------------------------------------ |
| Mouse                    | opens on hover, 460ms out / 320ms back                  |
| Keyboard                 | opens on `:focus-within` when the row is a link         |
| Touch (`hover: none`)    | always open — there is nothing to hover                 |
| `prefers-reduced-motion` | opens instantly, no tween                               |

Because the panel is clipped rather than removed, its text stays in the accessibility tree and is
read out in document order. One gap worth knowing: the three rows with no `href` are not
focusable, so a sighted keyboard-only user cannot open those panels — the name, tagline and status
stay visible either way, and the panel is supplementary.

## SEO

| Piece                  | Where                                                      |
| ---------------------- | ---------------------------------------------------------- |
| Title, description, OG | `metadata` in `app/layout.tsx`, sourced from `seo`          |
| Social card            | `app/opengraph-image.tsx`, generated at build (1200×630)    |
| Structured data        | `lib/schema.ts`, injected by `components/json-ld.tsx`       |
| Crawling               | `app/robots.ts`, `app/sitemap.ts`                           |

**Set `NEXT_PUBLIC_SITE_URL` before deploying.** Everything above resolves against it. Without it
the build falls back to `VERCEL_PROJECT_PRODUCTION_URL`, and failing that to `localhost:3000` —
which would publish a canonical tag pointing at localhost.

The JSON-LD graph describes a `Person`, the `WebSite`, and one `MobileApplication` per shipped app.
Two deliberate omissions:

- **Unreleased apps are excluded.** There is no listing to corroborate them.
- **No `aggregateRating`.** The App Store ratings are real, but Google requires structured data to
  match what the page shows, and the page shows no ratings. Adding them would risk a manual action.

Validate changes with the [Rich Results Test](https://search.google.com/test/rich-results) or the
[Schema Markup Validator](https://validator.schema.org/) once the site is public.

## Notes

- **Client JavaScript.** `components/theme-toggle.tsx` is the only Client Component — 581 bytes
  gzipped in its own chunk. Everything else is a Server Component. The toggle holds no React
  state (it reads the active theme from the DOM when clicked), so there is nothing to mismatch
  on hydration.
- **Theming.** `@theme inline` maps each Tailwind colour utility onto a CSS variable, so light and
  dark are palettes in `app/globals.css` and nothing else. The page follows the operating system
  by default; the header toggle writes `data-theme` on `<html>`, which overrides it and persists
  in `localStorage`. An inline script in `<head>` (`lib/theme.ts`) re-applies a stored choice
  before the first paint so it never flashes the wrong theme. With JavaScript off, the
  `prefers-color-scheme` rules still work — only the toggle stops.
- **Type.** Newsreader for display and italics, JetBrains Mono for labels — both self-hosted
  through `next/font`. No CSS `uppercase` transforms anywhere, so `iOS` stays `iOS`.
- **Animation.** A staggered entrance on load, disabled under `prefers-reduced-motion`.
- **Contrast.** Every text/background pair clears WCAG AA in both themes.
