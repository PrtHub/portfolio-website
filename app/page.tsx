import { AppList } from "@/components/app-list";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";

/**
 * Header and footer live in the root layout; this page is the home content
 * only. Everything here is a Server Component.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <AppList />
    </>
  );
}
