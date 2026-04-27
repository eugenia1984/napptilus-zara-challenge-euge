// src/presentation/components/cart-page/CartItem.tsx

import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import { SharedLabels } from "../../../domain/constants/shared.labels"
import type { CartItemProps } from "../../../domain/models/interfaces"
import { formatPrice } from "../../../utils/formatPrice";

/**
 * Individual item component for the shopping cart list.
 * 
 * - Displays product image, technical specifications (storage, color), quantity, and price.
 * 
 * - Provides a removal action via the `handleRemoveFromCart` callback.
 * 
 * - Optimized for accessibility with descriptive ARIA labels for the delete action.
 * 
 * @param {CartItemProps} props - Component properties including the item data, removal handler and index.
 */
export default function CartItem({ item, handleRemoveFromCart, index }: CartItemProps) {
  const { productId, color, storage, imageUrl, name, quantity, price } = item;

  return (
    <div key={`${productId}-${color}-${storage}-${index}`} className="cart-item">
      <div className="cart-item-image-container">
        <img src={imageUrl} alt={name} className="cart-item-image" />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-info">
          <span className="cart-item-name">{name}</span>
          <span className="cart-item-option">
            {storage} | {color}{quantity > 1 ? ` | x${quantity}` : ""}
          </span>
          <span className="cart-item-price">{formatPrice(price)} {SharedLabels?.EUR}</span>
        </div>

        <button
          className="cart-item-remove"
          onClick={() => handleRemoveFromCart(productId, color, storage)}
          aria-label={`Remove ${name} in color ${color} with ${storage} from cart`}
        >
          {CartPageLabels?.DELETE}
        </button>
      </div>
    </div>
  )
}