// src/presentation/pages/HomePage.tsx

import { Suspense } from "react"
import { HomePageLabels } from "../../domain/constants/home.page.labels"
import { ErrorBoundary } from "react-error-boundary"
import ProductList from "../components/home-page/ProductList"
import { useHomePageLogic } from "./useHomePage"

/**
 * Main landing page component that serves as the product catalog.
 * * This page implements a "Search-as-you-type" pattern with debouncing, 
 * leveraging React 19's asynchronous rendering capabilities.
 * 
 * Key features:
 * 
 * -Logic decoupling via `useHomePageLogic` custom hook.
 * 
 * -Non-blocking UI using `Suspense` for product fetching.
 * 
 * -Robust error handling through `ErrorBoundary`.
 * 
 * -Accessibility-ready search interface with ARIA labels and clear functionality.
 * 
 * @returns {JSX.Element} The rendered Home Page view.
 */
export default function HomePage() {
   const {
    searchQuery,
    productsPromise,
    handleSearchChange,
    clearSearch,
  } = useHomePageLogic();

  return (
    <section>
      <section className="search-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={HomePageLabels?.INPUT_PLACEHOLDER}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label={HomePageLabels?.INPUT_ARIA_LABEL}
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => clearSearch()}
              aria-label={HomePageLabels?.BUTTON_ARIA_LABEL}
            >
              ×
            </button>
          )}
        </div>
        <ErrorBoundary fallback={<div className="error-state">{HomePageLabels?.ERROR_LOADING_PRODUCTS}</div>}>
          <Suspense fallback={<div className="loading-state">{HomePageLabels?.LOADING}</div>}>
            <ProductList productsPromise={productsPromise} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </section >
  )
}