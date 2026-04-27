// src/application/utils/formatPrice.ts

/**
 * Formats a numeric price into a localized string with thousand separators.
 * 
 * Uses 'de-DE' locale to strictly enforce the dot separator even for 
 * four-digit numbers (e.g., 1174 -> "1.174"), bypassing the Spanish 
 * grammatical rule that omits the dot in numbers below 10.000.
 * 
 * @param price - The numeric value to format.
 * 
 * @returns A formatted string with dots as thousand separators.
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: "always", 
  }).format(price);
};