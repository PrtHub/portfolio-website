import type { Offer } from "@/lib/content";
import { currencies, formatMoney } from "@/lib/currency";

/**
 * Renders the price in every supported currency and lets CSS reveal the one
 * matching `data-currency` on <html>. Doing it this way keeps the page
 * statically rendered and means the figure never changes after paint.
 */
export function PriceTag({ offer }: { offer: Offer }) {
  return (
    <>
      {currencies.map((currency) => (
        <span key={currency.code} data-price={currency.code}>
          {formatMoney(offer.prices[currency.code], currency)}
        </span>
      ))}
    </>
  );
}
