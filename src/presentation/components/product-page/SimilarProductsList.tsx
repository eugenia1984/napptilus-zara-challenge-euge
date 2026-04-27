// src/presentation/components/product-page/SimilarProductsList.tsx

import { ProductPageLabels } from "../../../domain/constants/product.page.labels"
import type { SimilarProductsListProps } from "../../../domain/models/interfaces"
import ProductCard from "../home-page/ProductCard"

/**
 * Component that displays a horizontal list of similar products.
 * 
 * It includes a custom scroll indicator (thumb) whose logic is managed 
 * via refs provided by the parent component.
 * 
 * @param {SimilarProductsListProps} props - Component properties.
 * 
 * @returns {JSX.Element} The rendered similar products section.
 */
export default function SimilarProductsList({ product, similarGridRef, thumbRef }: SimilarProductsListProps) {

  return (
    <div className="similar-products-section">
      <h2 className="section-title">{ProductPageLabels?.SIMILAR_PRODUCTS}</h2>
      <div className="product-grid similar-grid" ref={similarGridRef}>
        {product.similarProducts.map((similar, index) => (
          <ProductCard key={`${similar.id}-${index}`} product={similar} />
        ))}
      </div>
      <div className="similar-indicator">
        <div className="similar-indicator-thumb" ref={thumbRef} />
      </div>
    </div>
  )
}