// src/presentation/components/product-page/ProductHeader.tsx

import { SharedLabels } from "../../../domain/constants/shared.labels";
import type { ProductHeaderModel } from "../../../domain/models/interfaces";

/**
 * Component that displays the main heading of the product detail.
 * 
 * It renders the product name in an H1 for SEO and accessibility, 
 * along with the formatted price using shared localization labels.
 * 
 * @param {ProductHeaderModel} props - Component properties.
 * @param {string} props.productName - The full name of the product.
 * @param {number | string} props.productPrice - The current price to be displayed.
 * 
 * @returns {JSX.Element} The rendered header section.
 */
export default function ProductHeader({productName, productPrice}:ProductHeaderModel) {
  return (
    <div className="product-detail-header">
      <h1 className="product-detail-name">{productName}</h1>
      <span className="product-detail-price">{productPrice} {SharedLabels?.EUR}</span>
    </div>
  )
}