// src/presentation/components/home-page/ProductCard.tsx

import { Link } from "react-router-dom"
import type { ProductCardProps } from "../../../domain/models/interfaces"
import Image from "../shared/Image"
import { SharedLabels } from "../../../domain/constants/shared.labels";

/**
 * ProductCard component that displays a summary of a product in the catalog.
 * 
 * This component acts as a high-level navigational element, wrapping the entire 
 * card in a link to the product's detail page. It follows a minimal design 
 * pattern suitable for luxury or high-fashion e-commerce.
 * 
 * @param {ProductCardProps} props - The component props containing the product data.
 * @param {ProductListItem} props.product - The specific product information to display.
 * @example
 * ```tsx
 * const mockProduct = {
 * id: "1",
 * brand: "Brand Name",
 * name: "Product Name",
 * basePrice: 100,
 * imageUrl: "/path/to/image.jpg"
 * }
 * <ProductCard product={mockProduct} />
 * ```
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          width={10}
          height={10}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <div className="product-details">
          <span className="product-brand">{product.brand}</span>
          <span className="product-name">{product.name}</span>
        </div>
        <span className="product-price">{product.basePrice} {SharedLabels?.EUR}</span>
      </div>
    </Link>
  );
}