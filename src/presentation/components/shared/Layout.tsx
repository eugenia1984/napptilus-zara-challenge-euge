// src/presentation/components/shared/Layout.tsx

import { Outlet, Link } from "react-router-dom"
import { AppPaths } from "../../../domain/constants/paths"
import bagIcon from "../../../assets/bag-icon.png"
import logoIcon from "../../../assets/logo.png"
import Image from "./Image"
import { SharedLabels } from "../../../domain/constants/shared.labels"
import { useIsCartPage } from "../../hooks/useIsCartPage"
import { useCart } from "../../../infrastructure/context/CartContext"

/**
 * Main Layout component that serves as the application's master template.
 *  
 * This component provides a persistent header and a responsive container for the 
 * application's views. It manages the global navigation shell, including the 
 * brand logo and the conditional shopping cart indicator.
 * 
 * * Key responsibilities:
 * 
 * -Provides a consistent header across all application pages.
 * 
 * -Manages conditional rendering of the cart icon based on the current route.
 * 
 * -Implements accessibility through semantic HTML and ARIA labels.
 */
export default function Layout() {
  const isCartPage = useIsCartPage();
  const { cartItems } = useCart();

  return (
    <div className="container">
      <header className="header">
        <Link to={AppPaths.HOME} className="header-logo" aria-label={SharedLabels?.HOME_PAGE_ICON_ARIA_LABEL}>
          <Image
            src={logoIcon}
            alt={SharedLabels?.ALT_LOGO}
            width={74}
            height={24}
          />
        </Link>
        {!isCartPage && (
          <div className="header-cart">
            <Link to={AppPaths.CART} aria-label={`Go to Cart page with ${cartItems.length} items`}>
              <Image
                src={bagIcon}
                alt={SharedLabels?.ALT_BAG_ICON}
                width={18}
                height={18} /> {cartItems.length}
            </Link>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}