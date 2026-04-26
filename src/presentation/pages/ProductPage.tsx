// src/presentation/pages/ProductPage.tsx

import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import type { ColorOption, ProductDetail, StorageOption } from "../../domain/models/interfaces"
import { useCart } from "../../infrastructure/context/CartContext"
import { getProductById } from "../../application/flows/getProductByIdFow"
import LinkButton from "../components/shared/LinkButton"
import { AppPaths } from "../../domain/constants/paths"
import { SharedLabels } from "../../domain/constants/shared.labels"
import { ProductPageLabels } from "../../domain/constants/product.page.labels"
import ProductImage from "../components/product-page/ProductImage"
import ProductHeader from "../components/product-page/ProductHeader"
import SimilarProductsList from "../components/product-page/SimilarProductsList"
import ProductSpecs from "../components/product-page/ProductSpecs"
import ProductOptions from "../components/product-page/ProductOptions"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);

  const { addToCart } = useCart();
  const similarGridRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return

      try {
        setLoading(true)
        setError(null)
        const data = await getProductById(id)
        setProduct(data)

        if (data.colorOptions?.length > 0) setSelectedColor(data.colorOptions[0])
        if (data.storageOptions?.length > 0) setSelectedStorage(data.storageOptions[0])

      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const grid = similarGridRef.current;
    const thumb = thumbRef.current;
    if (!grid || !thumb) return;

    const updateThumb = () => {
      const { scrollLeft, scrollWidth, clientWidth } = grid;
      if (scrollWidth <= clientWidth) {
        thumb.style.display = "none";
        return;
      }
      thumb.style.display = "block";
      const thumbWidthPct = (clientWidth / scrollWidth) * 100;
      const thumbLeftPct = (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbWidthPct);
      thumb.style.width = `${thumbWidthPct}%`;
      thumb.style.left = `${thumbLeftPct}%`;
    };

    grid.addEventListener("scroll", updateThumb);
    updateThumb();
    return () => grid.removeEventListener("scroll", updateThumb);
  }, [product]);

  if (loading) return <div className="loading-state">{ProductPageLabels?.LOADING_PRODUCTS}</div>;
  if (error || !product) return <div className="error-state">{error || "Product not found."}</div>;

  const currentImage = selectedColor?.imageUrl || product.colorOptions?.[0]?.imageUrl || product.imageUrl;
  const currentPrice = product.basePrice + (selectedStorage?.price || 0);
  const canAddToCart = selectedColor && selectedStorage;

  return (
    <div className="product-page">
      <LinkButton
        text={SharedLabels?.BACK}
        to={AppPaths?.HOME}
        className="back-link"
        ariaLabel={ProductPageLabels?.BACK_BUTTON_ARIA_LABEL}
      />
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
              if (product && selectedColor && selectedStorage) {
                addToCart({
                  productId: product.id,
                  name: product.name,
                  brand: product.brand,
                  imageUrl: currentImage,
                  color: selectedColor.name,
                  storage: selectedStorage.capacity,
                  price: product.basePrice + selectedStorage.price,
                  quantity: 1
                });
              }
            }}
          >
            {SharedLabels?.ADD}
          </button>
        </div>
      </div>
      <ProductSpecs {...product} />
      {product.similarProducts.length > 0 && (
        < SimilarProductsList
          similarGridRef={similarGridRef}
          thumbRef={thumbRef}
          product={product}
        />
      )}
    </div>
  )
}