import type { CurrencyCode } from "@/lib/currency";
import { currencies, formatMoney } from "@/lib/currency";

/**
 * Renders an amount in every supported currency and lets CSS reveal the one
 * matching `data-currency` on <html>. Doing it this way keeps the page
 * statically rendered and means the figure never changes after paint.
 */
export function PriceTag({ prices }: { prices: Record<CurrencyCode, number> }) {
  return (
    <>
      {currencies.map((currency) => (
        <span key={currency.code} data-price={currency.code}>
          {formatMoney(prices[currency.code], currency)}
        </span>
      ))}
    </>
  );
}
