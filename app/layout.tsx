import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui/container";
import { profile, seo, siteUrl } from "@/lib/content";
import { currencyInitScript } from "@/lib/currency";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const fullTitle = `${profile.name} — ${seo.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: fullTitle,
    template: `%s · ${profile.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: fullTitle,
    description: seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: profile.handle,
    creator: profile.handle,
    title: fullTitle,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Both run before the first paint, so neither the theme nor the
            prices are ever seen in one state and then swapped. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: currencyInitScript }} />
      </head>
      <body className="min-h-full">
        <Container className="flex min-h-svh flex-col pt-16 md:pt-[72px]">
          <SiteHeader />
          {children}
          <SiteFooter />
        </Container>
      </body>
    </html>
  );
}
