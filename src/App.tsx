// src/App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./presentation/components/shared/Layout"
import HomePage from "./presentation/pages/HomePage"
import ProductPage from "./presentation/pages/ProductPage"
import CartPage from "./presentation/pages/CartPage"
import { AppPaths } from "./domain/constants/paths"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPaths.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={AppPaths.PRODUCT} element={<ProductPage />} />
          <Route path={AppPaths.CART} element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App