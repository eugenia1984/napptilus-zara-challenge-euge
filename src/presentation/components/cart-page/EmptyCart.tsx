// src/presentation/components/cart-page/EmptyCart.tsx

import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import { AppPaths } from "../../../domain/constants/paths"
import LinkButton from "../shared/LinkButton"

/**
 * Component rendered when the shopping cart has no items.
 * 
 * It provides a clear feedback message to the user and a call-to-action 
 * to return to the home page and continue shopping.
 * 
 * @returns {JSX.Element} A section containing the empty state message and navigation.
 */
export default function EmptyCart() {
  return (
    <section className="cart-empty">
      <h2 className="cart-title">{CartPageLabels?.TITLE}</h2>
      <div className="cart-empty-actions">
        <LinkButton
          to={AppPaths?.HOME}
          text={CartPageLabels?.CONTINUE_SHOPPING}
          className="cart-empty-btn"
          ariaLabel={CartPageLabels?.CONTINUE_SHOPPING_ARIA_LABEL}
        />
      </div>
    </section>
  );
}