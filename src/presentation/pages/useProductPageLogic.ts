// src/presentation/pages/useProductPageLogic.ts

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../application/flows/getProductByIdFlow";
import type {
  ColorOption,
  StorageOption,
} from "../../domain/models/interfaces";

/**
 * Custom hook that manages the business logic and state for the Product Detail Page.
 *
 * This hook implements the **React 19 Suspense pattern** by exposing a memoized
 * promise that can be unwrapped by child components using the `use()` hook.
 *
 * @returns An object containing:
 *
 * -`productPromise`: A memoized promise that fetches product data based on the URL ID.
 *
 * -`selectedColor`: The currently selected color variant object.
 *
 * -`setSelectedColor`: State setter for the color selection.
 *
 * -`selectedStorage`: The currently selected storage variant object.
 *
 * -`setSelectedStorage`: State setter for the storage selection.
 *
 * - `id`: product id.
 *
 * @example
 * const { productPromise, selectedColor, setSelectedColor } = useProductPageLogic();
 */
export const useProductPageLogic = () => {
  const { id } = useParams<{ id: string }>();

  // Promise memorization of product (React 19 Suspense pattern)
  const productPromise = useMemo(() => {
    if (!id) return Promise.reject(new Error("No product ID provided"));

    return getProductById(id);
  }, [id]);

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedColor(null);
    setSelectedStorage(null);
  }, [id]);

  return {
    productPromise,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    id,
  };
};
