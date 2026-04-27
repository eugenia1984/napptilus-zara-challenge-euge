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
 * brand logo and the dynamic shopping cart indicator.
 * 
 * ### Technical Implementation:
 * 
 * -**Global State Integration**: Consumes `CartContext` to display real-time item counts.
 * 
 * -**Route Awareness**: Utilizes `useIsCartPage` custom hook to conditionally hide the 
 * cart icon, preventing redundant navigation when already on the Cart view.
 * 
 * -**Content Injection**: Uses React Router's `<Outlet />` to render child route components.
 * 
 * -**Accessibility**: Implements dynamic ARIA labels for the cart link to inform 
 * screen readers about the current quantity of items.
 * 
 * @returns {JSX.Element} The structured application shell with a global header and main content area.
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