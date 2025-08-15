export function formatPriceCents(
  cents: number,
  locale: string = "de-DE",
  currency: string = "EUR"
) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    cents / 100
  );
}
