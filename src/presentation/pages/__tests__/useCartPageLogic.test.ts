// src/presentation/pages/__tests__/useCartPageLogic.test.ts

import { renderHook } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import useCartPageLogic from "../useCartPageLogic"

const mockCartItems = [
  {
    productId: "SMG-A05S",
    name: "Galaxy A05s",
    brand: "Samsung",
    imageUrl: "http://example.com/phone.webp",
    color: "Black",
    storage: "64 GB",
    price: 119,
    quantity: 1,
  },
]

const mockHandleRemoveFromCart = vi.fn()

vi.mock("../../../infrastructure/context/CartContext", () => ({
  useCart: () => ({
    cartItems: mockCartItems,
    handleRemoveFromCart: mockHandleRemoveFromCart,
    addToCart: vi.fn(),
    cartTotalItems: 1,
    cartTotalPrice: 119,
  }),
}))

describe("useCartPageLogic", () => {
  it("should return cartItems from the context", () => {
    const { result } = renderHook(() => useCartPageLogic())

    expect(result.current.cartItems).toEqual(mockCartItems)
    expect(result.current.cartItems).toHaveLength(1)
  })

  it("should return handleRemoveFromCart from the context", () => {
    const { result } = renderHook(() => useCartPageLogic())

    expect(result.current.handleRemoveFromCart).toBeDefined()
    expect(typeof result.current.handleRemoveFromCart).toBe("function")
  })

  it("should return cartTotalPrice from the context", () => {
    const { result } = renderHook(() => useCartPageLogic())

    expect(result.current.cartTotalPrice).toBe(119)
  })

  it("should act as a stable adapter — no extra properties exposed", () => {
    const { result } = renderHook(() => useCartPageLogic())

    const keys = Object.keys(result.current)
    expect(keys).toEqual(
      expect.arrayContaining([
        "cartItems",
        "handleRemoveFromCart",
        "cartTotalPrice",
      ]),
    )
    expect(keys).toHaveLength(3)
  })
})
