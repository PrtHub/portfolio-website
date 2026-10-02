/**
 * Every string on the page lives here.
 *
 * Values wrapped in [BRACKETS] are deliberate placeholders carried over from the
 * design — swap them once and they update everywhere they appear.
 *
 * Text that mixes cases (`iOS`) is stored exactly as it should render: nothing
 * uses a CSS `uppercase` transform, which would flatten it to `IOS`.
 */

import type { CurrencyCode } from "./currency";

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
  { label: "CONSULTING", href: "/consulting", external: false },
  { label: "HIRE", href: "/hire", external: false },
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

/* ------------------------------------------------------------- consulting */

/**
 * Paid office hours.
 *
 * Each price is set per currency rather than converted from one base. Round
 * numbers read better than the output of an exchange rate, and the figures do
 * not drift when the rate moves. Review them together when you change any.
 *
 * TODO: set `bookingUrl` to your Topmate (or Cal.com) profile, then give each
 * offer the direct link to that service. Until then every button points at the
 * profile page, which still works — it just costs the visitor one extra click.
 */
export const bookingUrl = "https://topmate.io/";

export type Offer = {
  title: string;
  minutes: number;
  prices: Record<CurrencyCode, number>;
  summary: string;
  href: string;
};

export const consulting = {
  eyebrow: "CONSULTING",
  headlineLead: "Half an hour with someone who has shipped — ",
  headlineTrail: "instead of another month guessing.",
  intro:
    "I build and grow iOS apps on my own, with no team and no ad budget. If you are stuck on scope, a launch, or why nobody is finding your app, book the slot that fits and bring the specifics.",
  offers: [
    {
      title: "Quick question",
      minutes: 15,
      prices: { USD: 20, INR: 1500, EUR: 19, GBP: 16 },
      summary:
        "One problem, one straight answer. Bring the thing you have been circling for a week — a scope call, a rejection, a pricing decision — and leave having decided it.",
      href: bookingUrl,
    },
    {
      title: "Shipping solo",
      minutes: 30,
      prices: { USD: 40, INR: 3000, EUR: 37, GBP: 32 },
      summary:
        "How to cut an app down to something one person can finish, and what the first year really looks like without a team or a runway. For people about to start, or stuck halfway.",
      href: bookingUrl,
    },
    {
      title: "App Store teardown",
      minutes: 30,
      prices: { USD: 45, INR: 3500, EUR: 42, GBP: 36 },
      summary:
        "Your listing pulled apart live: screenshots, title and subtitle, the keyword field, the first three lines anyone actually reads. You leave knowing what to change and in what order.",
      href: bookingUrl,
    },
    {
      title: "App SEO, built once",
      minutes: 60,
      prices: { USD: 120, INR: 9500, EUR: 110, GBP: 95 },
      summary:
        "The two searches that matter — the App Store and Google. Which terms you can realistically win, how the listing and the pages have to be built to win them, and why it keeps bringing installs long after you stop touching it. You leave with a written plan, not notes.",
      href: bookingUrl,
    },
  ] as readonly Offer[],
  guarantee:
    "If you do not leave with something you can act on, say so and I will refund the call.",
  limits:
    "I am not your person for Android, backend architecture at scale, or raising money. If that is what you need I will say so in the first five minutes rather than take the fee.",
} as const;

/* -------------------------------------------------------------- hire me */

/**
 * Done-for-you engagements — a different sale from the office hours on
 * /consulting. These are scoped conversations rather than a slot in a
 * calendar, so the call to action is email, not a booking link.
 *
 * TODO: the figures below are starting points, not researched rates. Set them
 * against how long each actually takes you before the page goes live.
 */
export type Engagement = {
  title: string;
  summary: string;
  /** Omitted when the work has to be scoped before it can be priced. */
  from?: Record<CurrencyCode, number>;
};

export const hire = {
  eyebrow: "WORK WITH ME",
  headlineLead: "No account manager, no handoffs — ",
  headlineTrail: "one person from scope to the App Store.",
  intro:
    "Some things are faster to hand over than to learn. I take on one or two of these at a time, so the honest answer is sometimes not yet.",
  engagements: [
    {
      title: "App Store listing",
      summary:
        "The whole listing delivered ready to upload: every screenshot rendered from the same scripted pipeline I use for my own apps, plus title, subtitle, keyword field and description.",
      from: { USD: 400, INR: 30000, EUR: 370, GBP: 320 },
    },
    {
      title: "Search setup",
      summary:
        "Built, not advised. The web pages and their structure, the internal linking, the App Store side wired to match, and the measurement that tells you whether it worked.",
      from: { USD: 1000, INR: 75000, EUR: 920, GBP: 800 },
    },
    {
      title: "The app itself",
      summary:
        "Scoped, designed, built and shipped to the App Store by one person. Small apps only — the kind I make for myself. Tell me what it does and I will tell you honestly whether I am the right fit.",
    },
  ] as readonly Engagement[],
  cta: "Start a conversation",
  quotedLabel: "Quoted",
} as const;
