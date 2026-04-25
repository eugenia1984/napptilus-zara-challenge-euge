import { useState } from "react";
import { HomePageLabels } from "../../domain/constants/home.page.labels";
import type { ProductListItem } from "../../domain/models/interfaces";

export default function HomePage() {
   const [products, setProducts] = useState<ProductListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

        <div className="search-info">
          <div className="results-count">
            {products.length} {HomePageLabels?.RESULTS}
          </div>
          <div className="filter-label">
            {HomePageLabels?.FILTER}
          </div>
        </div>

      </section>
    </section >
  )
}