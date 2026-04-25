// src/presentation/components/shared/Layout.tsx

import { Outlet, Link, useLocation } from "react-router-dom"
import { AppPaths } from "../../../domain/constants/paths"
import LogoImage from "./LogoImage"
import BagImage from "./BagImage"

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
  const location = useLocation();
  const isCartPage = location.pathname === AppPaths.CART;
  // TODO: change from context
  const cardTotalItems = 0;

  return (
    <div className="container">
      <header className="header">
        <Link to={AppPaths.HOME} className="header-logo" aria-label="MBST home page">
          <LogoImage />
        </Link>
        {!isCartPage && (
          <div className="header-cart">
            <Link to={AppPaths.CART} aria-label={`Cart page with ${cardTotalItems} items`}>
             <BagImage /> {cardTotalItems}
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