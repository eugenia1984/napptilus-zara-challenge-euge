import { useEffect, useState } from "react"
import { HomePageLabels } from "../../domain/constants/home.page.labels"
import type { ProductListItem } from "../../domain/models/interfaces"
import ProductCard from "../components/home-page/ProductCard"
import SearchInfo from "../components/home-page/SearchInfo"
import { useDebounce } from "../hooks/useDebounce"
import { getProducts } from "../../application/flows/getProductsFlow"

export default function HomePage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts(debouncedSearchQuery || undefined, 20);
        setProducts(data);
      } catch (err) {
        setError(`${HomePageLabels?.ERROR_LOADING_PRODUCTS}`);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [debouncedSearchQuery]);


  return (
    <section>
      <section className="search-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={HomePageLabels?.INPUT_PLACEHOLDER}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={HomePageLabels?.INPUT_ARIA_LABEL}
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label={HomePageLabels?.BUTTON_ARIA_LABEL}
            >
              ×
            </button>
          )}
        </div>

        <SearchInfo productsAmount={products.length}/>

        {loading ? (
          <div className="loading-state">{HomePageLabels?.LOADING}</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : products.length === 0 ? (
          <div className="empty-state">{HomePageLabels?.NO_PRODUCTS}</div>
        ) : (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
        )}
      </section>
    </section >
  )
}