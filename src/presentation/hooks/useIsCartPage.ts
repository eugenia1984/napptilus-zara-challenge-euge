// src/presentation/hook/useIsCartPage.tsx

import { useLocation } from "react-router-dom"
import { AppPaths } from "../../domain/constants/paths"

/**
 * A utility hook to determine if the user is currently on the Cart Page.
 * 
 * This is a generic path-checker hook used to toggle UI elements 
 * like the header cart icon.
 * 
 * @returns {boolean} True if the current pathname matches the cart path.
 */
export const useIsCartPage = (): boolean => {
  const { pathname } = useLocation();

  return pathname === AppPaths.CART;
}