// src/presentation/pages/__tests__/CartPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi, beforeEach } from "vitest"
import CartPage from "../CartPage"
import { CartPageLabels } from "../../../domain/constants/cart.page.labels"
import type { CartItemModel } from "../../../domain/models/interfaces"

// Shared mock state
const mockCartItems: CartItemModel[] = []
const mockHandleRemoveFromCart = vi.fn()
const mockCartTotalPrice = 0

vi.mock("../../../infrastructure/context/CartContext", () => ({
  useCart: () => ({
    cartItems: mockCartItems,
    handleRemoveFromCart: mockHandleRemoveFromCart,
    addToCart: vi.fn(),
    cartTotalItems: mockCartItems.length,
    cartTotalPrice: mockCartTotalPrice,
  }),
}))

function renderCartPage() {
  return render(
    <MemoryRouter initialEntries={["/cart"]}>
      <CartPage />
    </MemoryRouter>,
  )
}

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCartItems.length = 0
  })

  describe("Empty Cart State", () => {
    it("should render the empty cart view when no items exist", () => {
      renderCartPage()

      expect(
        screen.getByText(CartPageLabels?.TITLE as string),
      ).toBeInTheDocument()

      expect(
        screen.getByText(CartPageLabels?.CONTINUE_SHOPPING as string),
      ).toBeInTheDocument()
    })

    it("should render a link back to the home page", () => {
      renderCartPage()

      const homeLink = screen.getByRole("link", {
        name: CartPageLabels?.CONTINUE_SHOPPING_ARIA_LABEL as string,
      })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute("href", "/")
    })
  })

  describe("Cart With Items", () => {
    beforeEach(() => {
      mockCartItems.push(
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
        {
          productId: "APL-IP15",
          name: "iPhone 15",
          brand: "Apple",
          imageUrl: "http://example.com/iphone.webp",
          color: "Blue",
          storage: "256 GB",
          price: 999,
          quantity: 2,
        },
      )
    })

    it("should render all cart items", () => {
      renderCartPage()

      expect(screen.getByText("Galaxy A05s")).toBeInTheDocument()
      expect(screen.getByText("iPhone 15")).toBeInTheDocument()
    })

    it("should display the cart title with item count", () => {
      renderCartPage()

      expect(screen.getByText("(2)")).toBeInTheDocument()
    })

    it("should render a delete button for each item", () => {
      renderCartPage()

      const deleteButtons = screen.getAllByText(
        CartPageLabels?.DELETE as string,
      )
      expect(deleteButtons).toHaveLength(2)
    })

    it("should call handleRemoveFromCart when delete is clicked", () => {
      renderCartPage()

      const deleteButtons = screen.getAllByText(
        CartPageLabels?.DELETE as string,
      )
      fireEvent.click(deleteButtons[0])

      expect(mockHandleRemoveFromCart).toHaveBeenCalledWith(
        "SMG-A05S",
        "Black",
        "64 GB",
      )
    })

    it("should render the 'Continue shopping' link", () => {
      renderCartPage()

      expect(
        screen.getByText(CartPageLabels?.CONTINUE_SHOPPING as string),
      ).toBeInTheDocument()
    })

    it("should render the Pay button", () => {
      renderCartPage()

      expect(
        screen.getByText(CartPageLabels?.PAY as string),
      ).toBeInTheDocument()
    })
  })
})
