// src/presentation/pages/HomePage.tsx

import { Suspense } from "react"
import { HomePageLabels } from "../../domain/constants/home.page.labels"
import { ErrorBoundary } from "react-error-boundary"
import ProductList from "../components/home-page/ProductList"
import { useHomePageLogic } from "./useHomePage"
import SearchForm from "../components/home-page/SearchForm"
import Loader from "../components/shared/Loader"
import ErrorMessage from "../components/shared/ErrorMessage"

/**
 * HomePage component that acts as the main orchestrator for the product catalog.
 * 
 * It manages the coordination between the search interface and the asynchronous 
 * product display, utilizing a decoupled logic architecture.
 * 
 * Key technical implementations:
 * 
 * -**State Management**: Delegated to `useHomePageLogic` for cleaner presentation.
 * 
 * -**Async Pattern**: Uses React 19 `Suspense` for non-blocking product streaming.
 * 
 * -**Fault Tolerance**: Wrapped in an `ErrorBoundary` to catch and display UI-friendly errors.
 * 
 * -**Component Composition**: Orchestrates `SearchForm` and `ProductList` as independent units.
 * 
 * @returns {JSX.Element} The structured landing page with search and product grid.
 */
export default function HomePage() {
  const {
    searchQuery,
    productsPromise,
    handleSearchChange,
    clearSearch,
  } = useHomePageLogic();

  return (
    <>
      <title>MBST | Explore our Mobile Catalog</title>
      <meta name="description" content="Discover the latest smartphones with the best prices." />
      <section className="search-section">
        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClear={clearSearch}
        />
        <ErrorBoundary fallback={<ErrorMessage message={HomePageLabels?.ERROR_LOADING_PRODUCTS} />}>
          <Suspense fallback={<Loader message={HomePageLabels?.LOADING} />}>
            <ProductList productsPromise={productsPromise} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </ >
  )
}