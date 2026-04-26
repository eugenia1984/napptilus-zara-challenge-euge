// src/presentation/pages/useHomePageLogic.ts

import { useMemo, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { getProducts } from "../../application/flows/getProductsFlow"

/**
 * Custom hook to manage the business logic of the Home Page.
 * Handles search state, debouncing, and product promise memorization.
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
  };
};
