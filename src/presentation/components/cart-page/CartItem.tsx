// src/presentation/components/cart-page/CartItem.tsx

import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import type { CartItemProps } from "../../../domain/models/interfaces"

/**
 * Individual item component for the shopping cart list.
 * * Displays product image, technical specifications (storage, color), 
 * quantity, and price.
 * * Provides a removal action via the `handleRemoveFromCart` callback.
 * * Optimized for accessibility with descriptive ARIA labels for the delete action.
 * 
 * @param {CartItemProps} props - Component properties including the item data, removal handler and index.
 */
export default function CartItem({ item, handleRemoveFromCart, index }: CartItemProps) {
  return (
    <div key={`${item.productId}-${item.color}-${item.storage}-${index}`} className="cart-item">
      <div className="cart-item-image-container">
        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-info">
          <span className="cart-item-name">{item.name}</span>
          <span className="cart-item-option">
            {item.storage} | {item.color}{item.quantity > 1 ? ` | x${item.quantity}` : ''}
          </span>
          <span className="cart-item-price">{item.price} {CartPageLabels.EUR}</span>
        </div>

        <button
          className="cart-item-remove"
          onClick={() => handleRemoveFromCart()}
          aria-label={`Remove ${item.name} in ${item.color} ${item.storage} from cart`}
        >
          {CartPageLabels.DELETE}
        </button>
      </div>
    </div>
  )
}