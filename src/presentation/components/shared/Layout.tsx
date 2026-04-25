// src/presentation/components/shared/Layout.tsx

import { Outlet, Link, useLocation } from "react-router-dom"
import { AppPaths } from "../../../domain/constants/paths"
import logoIcon from "../../../assets/logo.png"
import bagIcon from "../../../assets/bag-icon.png"

export default function Layout() {
  const location = useLocation();
  const isCartPage = location.pathname === AppPaths.CART;
  // TODO: change from context
  const cardTotalItems = 0;

  return (
    <div className="container">
      <header className="header">
        <Link to={AppPaths.HOME} className="header-logo" aria-label="MBST home page">
          <img src={logoIcon} alt="MBST logo icon" />
        </Link>
        {!isCartPage && (
          <div className="header-cart">
            <Link to={AppPaths.CART} aria-label={`Cart page with ${cardTotalItems} items`}>
             <img src={bagIcon} alt="bag icon" /> {cardTotalItems}
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