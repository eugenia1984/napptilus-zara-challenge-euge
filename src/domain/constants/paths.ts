// src/domain/constants/paths.ts

/**
 * Application route constants used for navigation across the system.
 * Centralizing paths here ensures type safety and prevents hardcoded strings.
 *
 * - HOME: '/'. Main landing page displaying the product listing.
 * - CART: '/cart'. Shopping cart view where users can manage selected items.
 * - PRODUCT: '/product/:id'. Product technical specification page.
 * Note: Requires a dynamic `:id` parameter to fetch specific device data.
 */
export const AppPaths = {
  HOME: "/",
  CART: "/cart",
  PRODUCT: "/product/:id",
} as const;
