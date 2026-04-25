// src/presentation/components/cart-page/CartPayButton.tsx

import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import PrimaryButton from "../shared/PrimaryButton"

/**
 * Call-to-Action component that will triggers the checkout process (pending implementation).
 * 
 * This is the primary button on the Cart Page. It follows the brand's 
 * visual identity for high-emphasis actions.
 * 
 * Uses localized labels from `CartPageLabels` to ensure multi-language 
 * support readiness.
 * 
 * @example
 * ```tsx
 * <CartPayButton />
 * ```
 */
export default function CartPayButton() {
  return (
    <PrimaryButton text={CartPageLabels?.PAY}/>
  )
}