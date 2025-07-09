/**
 * Format currency.
 *
 * @param value
 * @param currency
 * @param locale
 * @returns
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
