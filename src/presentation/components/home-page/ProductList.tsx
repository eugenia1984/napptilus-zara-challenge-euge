// src/presentation/components/home-page/ProductList.tsx

import { use } from "react"
import { HomePageLabels } from "../../../domain/constants/home.page.labels"
import SearchInfo from "./SearchInfo"
import ProductCard from "./ProductCard"
import type { ProductListProps } from "../../../domain/models/interfaces"

/**
 * Component that resolves a product promise and renders a responsive grid.
 * 
 * This component utilizes the React 19 `use()` hook to unwrap the products promise.
 * 
 * It must be wrapped in a `Suspense` boundary by the parent component.
 * 
 * Handles the empty state automatically if no products are returned.
 * 
 * @param {ProductListProps} props - Component properties containing the products promise.
 */
export default function ProductList({ productsPromise }: ProductListProps) {
  const products = use(productsPromise);

  if (products.length === 0) {
    return <div className="empty-state">{HomePageLabels?.NO_PRODUCTS}</div>
  }

  return (
    <>
      <SearchInfo productsAmount={products.length} />
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </>
  )
}