// src/presentation/pages/CartPage.tsx

import { Link } from "react-router-dom"
import { CartPageLabels } from "../../domain/constants/cart.page.labels"
import { AppPaths } from "../../domain/constants/paths"
import CartItem from "../components/cart-page/CartItem"
import CartTitle from "../components/cart-page/CartTitle"
import CartTotal from "../components/cart-page/CartTotal"
import CartPayButton from "../components/cart-page/CartPayButton"

export default function CartPage() {
  // TODO: mock till integration
  const cartItems = [
    {
      productId: 'SMG-A05S',
      color: '#000000',
      storage: '64 GB',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A05S-black.webp',
      name: 'Black',
      quantity: 2,
      price: '119'
    }
  ];
  const handleRemoveFromCart = () => { };
  const cartTotalPrice = 100;

  return (
    <section className="cart-page">
      <CartTitle cartCount={cartItems.length} />
      <section className="cart-items-list">
        {cartItems.map((item, index) => (
          < CartItem item={item} handleRemoveFromCart={handleRemoveFromCart} index={index} key={item.productId} />
        ))}
      </section>
      <section className="cart-summary">
        <CartTotal cartTotalPrice={cartTotalPrice}/>
        <div className="cart-actions-row">
          <Link to={AppPaths.HOME} className="cart-continue-btn">{CartPageLabels.CONTINUE_SHOPPING}</Link>
          <div className="cart-total-pay">
            <CartTotal cartTotalPrice={cartTotalPrice}/>
            <CartPayButton />
          </div>
        </div>
      </section>
    </section>
  )
}