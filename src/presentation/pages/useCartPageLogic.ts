// src/presentation/pages/useCartPageLogic.ts

import { useCart } from "../../infrastructure/context/CartContext";

/**
 * Custom hook that encapsulates the business logic for the Cart Page.
 *
 * This hook acts as a **domain-specific adapter** for the global Cart Context.
 * By isolating the cart access here, the `CartPage` remains decoupled from the
 * underlying state management implementation (Context API), facilitating
 * easier refactoring or testing.
 *
 * ### Features:
 *
 * -**State Extraction**: Retrieves the current list of items and pre-calculated total price.
 *
 * -**Action Delegation**: Exposes standardized handlers for item removal.
 *
 * @returns {Object} Logic state and handlers:
 *
 * -`cartItems`: Array of products currently in the cart.
 *
 * -`handleRemoveFromCart`: Function to remove a specific item by its unique configuration.
 *
 * -`cartTotalPrice`: The aggregated cost of all items in the cart.
 */
const useCartPageLogic = () => {
  const { cartItems, handleRemoveFromCart, cartTotalPrice } = useCart();

  return {
    cartItems,
    handleRemoveFromCart,
    cartTotalPrice,
  } as const;
};

export default useCartPageLogic;
