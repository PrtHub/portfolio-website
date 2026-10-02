export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP";

export type Currency = {
  code: CurrencyCode;
  /** Locale used only to pick the symbol and digit grouping. */
  locale: string;
};

/**
 * The currency shown when the visitor's region is unknown, and the one the
 * page renders on the server. Chosen because the audience is global.
 */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export const currencies: readonly Currency[] = [
  { code: "USD", locale: "en-US" },
  { code: "INR", locale: "en-IN" },
  { code: "EUR", locale: "en-IE" },
  { code: "GBP", locale: "en-GB" },
];

/** Regions that are not on the default. Everything else falls through to USD. */
const REGION_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  GB: "GBP",
  ...Object.fromEntries(
    // Eurozone.
    "AT BE CY DE EE ES FI FR GR HR IE IT LT LU LV MT NL PT SI SK"
      .split(" ")
      .map((code) => [code, "EUR" as CurrencyCode]),
  ),
};

/**
 * Runs synchronously in <head>, before the first paint, so prices are never
 * seen in one currency and then swapped — which on a pricing page reads as a
 * bait and switch. With no match it does nothing and the default stands.
 */
export const currencyInitScript = `try{var m=${JSON.stringify(REGION_CURRENCY)};
var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";
var x=l.match(/-([A-Za-z]{2})$/);var r=x?x[1].toUpperCase():"";
if(!r){var z=Intl.DateTimeFormat().resolvedOptions().timeZone||"";if(z==="Asia/Kolkata"||z==="Asia/Calcutta")r="IN"}
var c=m[r];if(c)document.documentElement.dataset.currency=c}catch(e){}`
  .split("\n")
  .join("");

export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}
