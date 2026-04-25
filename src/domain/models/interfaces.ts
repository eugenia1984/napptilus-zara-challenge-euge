// src/domain/models/interfaces.ts

/**
 * Interface for the CartTitle component props.
 * - cartCount: The total number of items currently in the shopping cart.
 */
export interface CartTitleProps {
  cartCount: number;
}

/**
 * Interface for the CartItem component props.
 */
export interface CartItemModel {
  productId: string;
  color: string;
  storage: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: string;
}

/**
 * Interface for the CartItem component props.
 * Includes: the item data, removal handler and index
 */
export interface CartItemProps {
  item: CartItemModel;
  handleRemoveFromCart: () => void;
  index: number;
}

/**
 * Interface for the CartTotal component props.
 */
export interface CartTotalModel {
  cartTotalPrice: number;
}