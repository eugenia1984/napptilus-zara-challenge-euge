// src/presentation/components/cart-page/CartTitle.tsx

import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import type { CartTitleProps } from "../../../domain/models/interfaces"

/**
 * Component that displays the main heading for the shopping cart page.
 * * It combines a localized title with a dynamic counter showing the number 
 * of items selected.
 * 
 * @param {CartTitleProps} props - Component properties.
 * @example
 * ```tsx
 * <CartTitle cartCount={3} />
 * ```
 */
export default function CartTitle({ cartCount }: CartTitleProps) {
  return (
    <h2 className="cart-title">
      {CartPageLabels.TITLE} <span>({cartCount})</span>
    </h2>
  )
}