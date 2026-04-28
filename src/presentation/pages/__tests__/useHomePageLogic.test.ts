// src/presentation/pages/__tests__/useHomePageLogic.test.ts

import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useHomePageLogic } from "../useHomePage"

// Mock the API flow
vi.mock("../../../application/flows/getProductsFlow", () => ({
  getProducts: vi.fn(() => Promise.resolve([])),
}))

// Mock useDebounce to return the value immediately (no delay)
vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: vi.fn((value: string) => value),
}))

describe("useHomePageLogic", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return an empty search query on mount", () => {
    const { result } = renderHook(() => useHomePageLogic())

    expect(result.current.searchQuery).toBe("")
  })

  it("should return a productsPromise", () => {
    const { result } = renderHook(() => useHomePageLogic())

    expect(result.current.productsPromise).toBeInstanceOf(Promise)
  })

  it("should update searchQuery when handleSearchChange is called", () => {
    const { result } = renderHook(() => useHomePageLogic())

    act(() => {
      result.current.handleSearchChange("Samsung")
    })

    expect(result.current.searchQuery).toBe("Samsung")
  })

  it("should reset searchQuery when clearSearch is called", () => {
    const { result } = renderHook(() => useHomePageLogic())

    act(() => {
      result.current.handleSearchChange("Apple")
    })
    expect(result.current.searchQuery).toBe("Apple")

    act(() => {
      result.current.clearSearch()
    })
    expect(result.current.searchQuery).toBe("")
  })

  it("should return a new productsPromise reference when the query changes", () => {
    const { result, rerender } = renderHook(() => useHomePageLogic())

    const firstPromise = result.current.productsPromise

    act(() => {
      result.current.handleSearchChange("Xiaomi")
    })

    rerender()

    const secondPromise = result.current.productsPromise
    expect(secondPromise).not.toBe(firstPromise)
  })
})
