// src/presentation/pages/__tests__/useProductPageLogic.test.ts

import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useProductPageLogic } from "../useProductPageLogic"

// Mock react-router-dom useParams
const mockId = { id: "SMG-A05S" }
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(() => mockId),
}))

// Mock the API flow
vi.mock("../../../application/flows/getProductByIdFlow", () => ({
  getProductById: vi.fn(() =>
    Promise.resolve({ id: "SMG-A05S", name: "Galaxy A05s" }),
  ),
}))

describe("useProductPageLogic", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return a productPromise based on the URL id", () => {
    const { result } = renderHook(() => useProductPageLogic())

    expect(result.current.productPromise).toBeInstanceOf(Promise)
  })

  it("should return the id from URL params", () => {
    const { result } = renderHook(() => useProductPageLogic())

    expect(result.current.id).toBe("SMG-A05S")
  })

  it("should initialize selectedColor as null", () => {
    const { result } = renderHook(() => useProductPageLogic())

    expect(result.current.selectedColor).toBeNull()
  })

  it("should initialize selectedStorage as null", () => {
    const { result } = renderHook(() => useProductPageLogic())

    expect(result.current.selectedStorage).toBeNull()
  })

  it("should allow setting selectedColor via setSelectedColor", () => {
    const { result } = renderHook(() => useProductPageLogic())

    const mockColor = {
      name: "Black",
      hexCode: "#000000",
      imageUrl: "/black.jpg",
    }

    act(() => {
      result.current.setSelectedColor(mockColor)
    })

    expect(result.current.selectedColor).toEqual(mockColor)
  })

  it("should allow setting selectedStorage via setSelectedStorage", () => {
    const { result } = renderHook(() => useProductPageLogic())

    const mockStorage = { capacity: "128 GB", price: 200 }

    act(() => {
      result.current.setSelectedStorage(mockStorage)
    })

    expect(result.current.selectedStorage).toEqual(mockStorage)
  })
})
