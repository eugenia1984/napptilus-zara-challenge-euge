// src/presentation/hook/__tests__/useIsCartPage.tests.tsx

import { renderHook } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import { useIsCartPage } from "../useIsCartPage"
import { AppPaths } from "../../../domain/constants/paths"

describe("useIsCartPage Hook", () => {
  it("should return true when the current path is the cart path", () => {
    const { result } = renderHook(() => useIsCartPage(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[AppPaths.CART]}>
          {children}
        </MemoryRouter>
      )
    })

    expect(result.current).toBe(true)
  })

  it("should return false when the current path is not the cart path", () => {
    const { result } = renderHook(() => useIsCartPage(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/any-other-path"]}>
          {children}
        </MemoryRouter>
      )
    })

    expect(result.current).toBe(false)
  })
})