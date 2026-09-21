/**
 * Every string on the page lives here.
 *
 * Values wrapped in [BRACKETS] are deliberate placeholders carried over from the
 * design — swap them once and they update everywhere they appear.
 *
 * Text that mixes cases (`iOS`) is stored exactly as it should render: nothing
 * uses a CSS `uppercase` transform, which would flatten it to `IOS`.
 */

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in production; the Vercel fallback
 * keeps canonical, OG and sitemap URLs correct on a deploy that forgets to.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const profile = {
  name: "Pritam",
  /** Shown under the name. `jobTitle` is the spelled-out version for metadata. */
  role: "INDIE DEVELOPER",
  jobTitle: "Independent iOS Developer",
  email: "pritamfinds@gmail.com",
  socialUrl: "https://x.com/iPritamX",
  handle: "@iPritamX",
  /** `city` is the footer label; `locality`/`country` feed structured data. */
  city: "KOLKATA, INDIA",
  locality: "Kolkata",
  country: "IN",
} as const;

export const emailHref = `mailto:${profile.email}`;

export const seo = {
  title: "Small iOS apps, made one at a time",
  description:
    "Pritam is an indie iOS developer in Kolkata, India — maker of CleanLabel, ARC and Pip. Design, code and everything after.",
  keywords: [
    "indie iOS developer",
    "independent iOS developer",
    "indie apps",
    "Swift",
    "product design",
    "solo founder",
  ],
} as const;

export const headline = {
  lead: "Small iOS apps, made one at a time — ",
  trail: "design, code and everything after.",
} as const;

export const navLinks = [
  { label: "TWITTER", href: profile.socialUrl, external: true },
  { label: "EMAIL", href: emailHref, external: false },
] as const;

export type App = {
  name: string;
  tagline: string;
  /** Right-hand label. Joined with `version` when the app has shipped. */
  state: string;
  version?: string;
  /** App Store primary category — structured data only. */
  category?: string;
  /** One sentence, revealed when the row opens. */
  summary: string;
  /** Three short highlights shown under the summary. */
  pointers: readonly [string, string, string];
  /** CSS custom property holding this app's accent, defined per theme in globals.css. */
  accent: string;
  /** Omitted while an app has no public listing yet — the row then renders unlinked. */
  href?: string;
};

/** The one place the state and version are joined, so they cannot drift apart. */
export function statusLabel(app: App): string {
  return app.version ? `${app.state} · ${app.version}` : app.state;
}

/**
 * The three shipped apps carry copy condensed from their live App Store
 * listings. Miko, Kept and Repast are not listed yet, so their `summary` and
 * `pointers` are first-draft placeholders — rewrite them before those ship.
 */

export const apps: readonly App[] = [
  {
    name: "CleanLabel",
    tagline: "AI FOOD SCANNER",
    state: "Live",
    version: "1.2.5",
    category: "Health & Fitness",
    summary:
      "Photograph the ingredient list on the back of a package. It is read in seconds and graded across four levels against your own diet, allergies and goals — no barcode, no database lookup.",
    pointers: ["READS THE PRINTED LABEL", "FOUR-LEVEL GRADING", "NO ACCOUNT"],
    accent: "--dot-cleanlabel",
    href: "https://apps.apple.com/us/app/cleanlabel-ai-food-scanner/id6760940713",
  },
  {
    name: "ARC",
    tagline: "CIRCADIAN RHYTHM & SLEEP",
    state: "Live",
    version: "2.0",
    category: "Health & Fitness",
    summary:
      "Works out when your energy peaks and when it drops, then plans light, caffeine and wind-down around it — and re-times the rest of the day when things do not go to plan.",
    pointers: ["CALCULATED CAFFEINE CUTOFF", "LEARNS YOUR DIP", "NO WEARABLE"],
    accent: "--dot-arc",
    href: "https://apps.apple.com/us/app/circadian-rhythm-sleep-arc/id6758214892",
  },
  {
    name: "Pip",
    tagline: "DAILY 3 HABIT TRACKER",
    state: "Live",
    version: "1.0.6",
    category: "Productivity",
    summary:
      "Three things, written down and locked in before ten. Each one is checked off with a photo of the finished work — miss a single one and the streak goes back to zero.",
    pointers: ["ON-DEVICE PHOTO PROOF", "NO STREAK FREEZES", "LIVE ACTIVITY"],
    accent: "--dot-pip",
    href: "https://apps.apple.com/us/app/daily-3-habit-tracker-pip/id6782576366",
  },
  {
    name: "Miko",
    tagline: "SKINCARE ROUTINE",
    state: "In review",
    summary:
      "Builds a morning and evening routine out of what is already on your shelf, and flags what should not be layered.",
    pointers: ["AM / PM ROUTINES", "INGREDIENT CONFLICTS", "SHELF TRACKING"],
    accent: "--dot-miko",
  },
  {
    name: "Kept",
    tagline: "PRIVATE JOURNAL & DIARY",
    state: "In progress",
    summary:
      "A journal that never leaves the device. Write it, lock it behind Face ID, keep the whole archive local.",
    pointers: ["ON-DEVICE ONLY", "FACE ID LOCK", "DAILY PROMPTS"],
    accent: "--dot-kept",
  },
  {
    name: "Repast",
    tagline: "KETO MEAL PLANS",
    state: "Coming soon",
    summary:
      "Weekly keto plans with the macros already worked out, and a shopping list that follows from the plan.",
    pointers: ["WEEKLY PLANS", "MACRO TARGETS", "SHOPPING LIST"],
    accent: "--dot-repast",
  },
];

export const footer = {
  note: "Another one is always in the making.",
  city: profile.city,
  /** The address itself stays out of the markup; only this label is shown. */
  contactLabel: "Wanna talk?",
} as const;
