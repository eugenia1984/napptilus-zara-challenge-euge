// src/presentation/components/product-page/ProductSpecs.tsx

import { ProductPageLabels } from "../../../domain/constants/product.page.labels"
import type { ProductDetail } from "../../../domain/models/interfaces"


/**
 * Component that displays a detailed list of product specifications.
 * 
 * It merges general information (brand, description) with a dynamic 
 * technical specifications list provided by the API.
 * 
 * @param {ProductDetail} props - The product data to display.
 * 
 * @returns {JSX.Element} A semantic list of technical specifications.
 */
export default function ProductSpecs({ brand, description, specs = {} }: ProductDetail) {
  const technicalSpecs = Object.entries(specs ?? {});
  
  return (
    <div className="product-specs-section">
      <h2 className="section-title">{ProductPageLabels?.SPECIFICATIONS}</h2>
      <ul className="specs-list">
        <li className="spec-item">
          <span className="spec-name">{ProductPageLabels?.BRAND}</span>
          <span className="spec-value">{brand}</span>
        </li>
        <li className="spec-item">
          <span className="spec-name">{ProductPageLabels?.DESCRIPTION}</span>
          <span className="spec-value">{description}</span>
        </li>
        {technicalSpecs.map(([key, value]) => (
          <li key={key} className="spec-item">
            <span className="spec-name">{key}</span>
            <span className="spec-value">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}