import { AppList } from "@/components/app-list";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui/container";

/**
 * The whole page is Server Components: none of it contributes application code to
 * the client bundle, only the framework runtime Next.js loads for every route.
 * Light and dark are handled by `prefers-color-scheme` in `globals.css`.
 */
export default function HomePage() {
  return (
    <Container className="flex min-h-svh flex-col pt-16 md:pt-[72px]">
      <JsonLd />
      <SiteHeader />
      <Hero />
      <AppList />
      <SiteFooter />
    </Container>
  );
}
