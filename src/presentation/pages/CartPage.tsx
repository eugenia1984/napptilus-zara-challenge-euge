// src/presentation/pages/CartPage.tsx

import { CartPageLabels } from "../../domain/constants/cart.page.labels"
import { AppPaths } from "../../domain/constants/paths"
import CartItem from "../components/cart-page/CartItem"
import CartTitle from "../components/cart-page/CartTitle"
import CartTotal from "../components/cart-page/CartTotal"
import CartPayButton from "../components/cart-page/CartPayButton"
import LinkButton from "../components/shared/LinkButton"
import useCartPageLogic from "./useCartPageLogic"
import EmptyCart from "../components/cart-page/EmptyCart"

/**
 * CartPage component that serves as the main view for the shopping cart.
 * 
 * This page orchestrates the display of added products, total price calculations, 
 * and the empty state interface. It follows the container-component pattern by 
 * delegating business logic to the `useCartPageLogic` hook.
 * 
 * Key technical implementations:
 * 
 * -**Conditional Rendering**: Switches between the `EmptyCart` component and the 
 * detailed list based on the cart's length.
 * 
 * -**State Management Integration**: Consumes the global cart state through a 
 * specialized logic hook to handle item removal and price updates.
 * 
 * - **Modular UI**: Composed of specialized sub-components (`CartItem`, `CartTotal`, 
 * `CartPayButton`) to ensure high maintainability and focused responsibilities.
 * 
 * @returns {JSX.Element} The rendered shopping cart page or the empty state view.
 */
export default function CartPage() {
  const {
    cartItems,
    handleRemoveFromCart,
    cartTotalPrice
  } = useCartPageLogic();

  if (cartItems.length === 0) {
    return (
      <EmptyCart />
    );
  }

  return (
    <>
      <title>{cartItems.length > 0 ? `(${cartItems.length}) Your Cart | MBST` : "Your Cart | MBST"}</title>
      <meta name="robots" content="noindex, nofollow" />
      <section className="cart-page">
        <CartTitle cartCount={cartItems.length} />
        <section className="cart-items-list">
          {cartItems.map((item, index) => (
            < CartItem
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              index={index}
              key={`${item.productId}-${item.color}-${item.storage}`}
            />
          ))}
        </section>
        <section className="cart-summary">
          <CartTotal cartTotalPrice={cartTotalPrice} />
          <div className="cart-actions-row">
            <LinkButton text={CartPageLabels?.CONTINUE_SHOPPING} to={AppPaths.HOME} />
            <div className="cart-total-pay">
              <CartTotal cartTotalPrice={cartTotalPrice} />
              <CartPayButton />
            </div>
          </div>
        </section>
      </section>
    </>
  )
}