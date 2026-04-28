// src/presentation/pages/useHomePageLogic.ts

import { useMemo, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { getProducts } from "../../application/flows/getProductsFlow"

/**
 * Custom hook that orchestrates the business logic for the Home Page catalog.
 * 
 * It manages the lifecycle of product fetching by integrating search state, 
 * input debouncing, and optimized promise memorization for React 19.
 * 
 * ### Key Technical Responsibilities:
 * 
 * -**State Management**: Controls the raw search input and provides handlers for updates and resets.
 * 
 * -**Performance Optimization**: Implements a 300ms debounce to prevent excessive API calls during typing.
 * 
 * -**React 19 Compatibility**: Memoizes the `productsPromise` based on the debounced query, 
 * ensuring that `Suspense` and the `use()` hook only trigger new fetches when the query actually changes.
 * 
 * -**Data Orchestration**: Interacts with the `getProducts` application flow to retrieve catalog data.
 * 
 * @returns {Object} Logic state and memoized actions:
 * 
 * -`searchQuery`: The current value of the search input.
 * 
 * -`productsPromise`: A stable promise containing the filtered product list.
 * 
 * -`handleSearchChange`: Callback to update the search query.
 * 
 * -`clearSearch`: Callback to reset the search state.
 */
export const useHomePageLogic = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const productsPromise = useMemo(
    () => getProducts(debouncedSearchQuery || undefined, 20),
    [debouncedSearchQuery],
  );

  const clearSearch = () => setSearchQuery("");

  const handleSearchChange = (value: string) => setSearchQuery(value);

  return {
    searchQuery,
    productsPromise,
    handleSearchChange,
    clearSearch,
  } as const;
};
