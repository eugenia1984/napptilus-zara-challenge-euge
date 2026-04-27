// src/presentation/pages/ProductPage.tsx

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useProductPageLogic } from "./useProductPageLogic"
import LinkButton from "../components/shared/LinkButton"
import { AppPaths } from "../../domain/constants/paths"
import { SharedLabels } from "../../domain/constants/shared.labels"
import { ProductPageLabels } from "../../domain/constants/product.page.labels"
import ProductDetailContent from "../components/product-page/ProductDetailContent"
import Loader from "../components/shared/Loader"
import ErrorMessage from "../components/shared/ErrorMessage"

/**
 * ProductPage component that manages the lifecycle and display of product details.
 * 
 * It serves as a high-level orchestrator that connects the URL parameters with 
 * the business logic and the asynchronous rendering UI.
 * 
 * Key technical implementations:
 * 
 * -**Separation of Concerns**: Business logic and state management are encapsulated in `useProductPageLogic`.
 * 
 * -**Declarative Data Fetching**: Leverages React 19 `Suspense` and `ErrorBoundary` to manage 
 * asynchronous states (loading/error) without manual flag handling.
 * 
 * -**Component Composition**: Uses `ProductDetailContent` as a specialized child to consume 
 * the product promise via the `use()` hook pattern.
 * 
 * -**Navigation**: Provides a standardized back-navigation entry point using the shared design system.
 * 
 * @returns {JSX.Element} The structured product page with navigation and async content loading.
 */
export default function ProductPage() {
  const logic = useProductPageLogic()

  return (
    <div className="product-page">
      <LinkButton
        text={SharedLabels?.BACK}
        to={AppPaths?.HOME}
        className="back-link"
        ariaLabel={ProductPageLabels?.BACK_BUTTON_ARIA_LABEL}
      />

      <ErrorBoundary fallback={<ErrorMessage message={ProductPageLabels?.ERROR_LOADING_PRODUCT} />}>
        <Suspense fallback={<Loader message={ProductPageLabels?.LOADING_PRODUCTS} />}>
          <ProductDetailContent {...logic} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}