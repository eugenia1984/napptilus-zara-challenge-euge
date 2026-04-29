// src/presentation/components/product-page/ProductDetailContent.tsx

import { use, useEffect, useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import type { ProductDetailContentModel } from "../../../domain/models/interfaces"
import { useCart } from "../../../infrastructure/context/CartContext"
import ProductImage from "./ProductImage"
import ProductHeader from "./ProductHeader"
import ProductOptions from "./ProductOptions"
import ProductSpecs from "./ProductSpecs"
import SimilarProductsList from "./SimilarProductsList"
import { SharedLabels } from "../../../domain/constants/shared.labels"
import { AppPaths } from "../../../domain/constants/paths"

/**
 * Component that renders the core content of the product detail page.
 * 
 * This component utilizes the **React 19 `use()` hook** to unwrap the product data 
 * from a provided promise. It manages the synchronization of initial variant 
 * selections and orchestrates the layout for images, options, and specifications.
 * 
 * Features:
 * 
 * -**Auto-selection**: Automatically selects the first color and storage options on load.
 * 
 * -**Dynamic Pricing**: Calculates total price based on base price + storage selection.
 * 
 * -**Scroll Management**: Implements custom scrollbar logic for the similar products grid.
 * 
 * @param {Props} props - The component properties.
 * @returns {JSX.Element} The rendered product details, options, and similar items.
 */
export default function ProductDetailContent({
  productPromise,
  selectedColor,
  setSelectedColor,
  selectedStorage,
  setSelectedStorage
}: ProductDetailContentModel) {
  const product = use(productPromise)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const similarGridRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (product) {
      if (!selectedColor && product.colorOptions.length > 0) {
        setSelectedColor(product.colorOptions[0])
      }
      if (!selectedStorage && product.storageOptions.length > 0) {
        setSelectedStorage(product.storageOptions[0])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id])

  // Scrollbar for similar products
  useEffect(() => {
    const grid = similarGridRef.current
    const thumb = thumbRef.current
    if (!grid || !thumb) return

    const updateThumb = () => {
      const { scrollLeft, scrollWidth, clientWidth } = grid
      if (scrollWidth <= clientWidth) {
        thumb.style.display = "none"
        return
      }
      thumb.style.display = "block"
      const thumbWidthPct = (clientWidth / scrollWidth) * 100
      const thumbLeftPct = (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbWidthPct)
      thumb.style.width = `${thumbWidthPct}%`
      thumb.style.left = `${thumbLeftPct}%`
    }

    grid.addEventListener("scroll", updateThumb)
    updateThumb()
    return () => grid.removeEventListener("scroll", updateThumb)
  }, [product])

  // Scroll when product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const currentImage = useMemo(() => {
    if (selectedColor?.imageUrl) {
      return selectedColor.imageUrl;
    }

    if (product.colorOptions.length > 0) {
      return product.colorOptions[0].imageUrl;
    }

    return product.imageUrl;
  }, [selectedColor, product]);

  const currentPrice = useMemo(() => {
    return product.basePrice + (selectedStorage?.price || 0);
  }, [product.basePrice, selectedStorage]);

  const canAddToCart = selectedColor && selectedStorage

  return (
    <>
      <title>{`${product.name} | MBST Store`}</title>
      <meta name="description" content={product.description} />
      <meta property="og:title" content={product.name} />
      <meta property="og:image" content={product.imageUrl} />
      <div className="product-detail-layout">
        <ProductImage srcImage={currentImage} altImage={product.name} />
        <div className="product-info-section">
          <ProductHeader productName={product.name} productPrice={currentPrice} />
          <ProductOptions
            product={product}
            selectedStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <button
            className="add-to-cart-btn"
            disabled={!canAddToCart}
            onClick={() => {
              if (selectedColor && selectedStorage) {
                addToCart({
                  productId: product.id,
                  name: product.name,
                  brand: product.brand,
                  imageUrl: currentImage,
                  color: selectedColor.name,
                  storage: selectedStorage.capacity,
                  price: currentPrice,
                  quantity: 1
                })
                navigate(AppPaths?.CART)
              }
            }}
          >
            {SharedLabels?.ADD}
          </button>
        </div>
      </div>
      <ProductSpecs {...product} />
      {product.similarProducts.length > 0 && (
        <SimilarProductsList
          similarGridRef={similarGridRef}
          thumbRef={thumbRef}
          product={product}
        />
      )}
    </>
  )
}