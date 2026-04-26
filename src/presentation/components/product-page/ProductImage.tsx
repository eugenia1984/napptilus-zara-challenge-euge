// src/presentation/components/product-page/ProductImageSection.tsx

import type { ProductImageModel } from "../../../domain/models/interfaces"
import Image from "../shared/Image"

/**
 * Component that renders the main image section of the product detail page.
 * 
 * It encapsulates the product's visual representation, ensuring 
 * consistent styling and accessibility via alternative text.
 * 
 * @param {ProductImageModel} props - Component properties.
 * @param {string} props.srcImage - The source URL of the product image.
 * @param {string} props.altImage - Descriptive text for the image (accessibility).
 * 
 * @returns {JSX.Element} A container with the rendered product image.
 * 
 * @example
 * <ProductImageSection 
 * srcImage="https://api.com/image.jpg" 
 * altImage="iPhone 15 Pro" 
 * />
 */
export default function ProductImage({ srcImage, altImage }: ProductImageModel) {
  return (
    <div className="product-image-section">
      <Image src={srcImage} alt={altImage} className="product-detail-image" />
    </div>
  )
}