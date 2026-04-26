// src/presentation/components/cart-page/CartTotal.tsx
 
import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import { SharedLabels } from "../../../domain/constants/shared.labels"
import type { CartTotalModel } from "../../../domain/models/interfaces"

/**
 * Component that displays the total accumulated price of the shopping cart.
 * 
 * Uses localized labels for the "Total" text and currency suffix.
 *
 * @param {CartTotalModel} props - Component properties.
 * @example
 * ```tsx
 * <CartTotal cartTotalPrice={238} />
 * ```
 */
export default function CartTotal({cartTotalPrice}: CartTotalModel) {
  return (
    <div className="cart-total">
      <span>{CartPageLabels?.TOTAL}</span>
      <span>{cartTotalPrice} {SharedLabels?.EUR}</span>
    </div>
  )
}