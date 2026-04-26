// src/presentation/components/home-page/__tests__/ProductCard.tests.tsx;

import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import ProductCard from "../ProductCard"
import { SharedLabels } from "../../../../domain/constants/shared.labels"

describe("ProductCard Component", () => {
  const mockProduct = {
    id: "test-id-123",
    brand: "Apple",
    name: "iPhone 15",
    basePrice: 999,
    imageUrl: "https://example.com/iphone.jpg"
  }

  it("should render product information correctly", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )

    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()

    const priceRegex = new RegExp(`${mockProduct.basePrice}.*${SharedLabels?.EUR}`, "i")
    expect(screen.getByText(priceRegex)).toBeInTheDocument()
  })

  it("should have a link pointing to the correct product detail page", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`)
  })

  it("should render the product image with correct alt text and dimensions", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )

    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", mockProduct.imageUrl)
    expect(img).toHaveAttribute("alt", mockProduct.name)
    expect(img).toHaveAttribute("width", "10")
    expect(img).toHaveAttribute("height", "10")
  })

  it("should apply the correct CSS classes for styling", () => {
    const { container } = render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )

    expect(container.firstChild).toHaveClass("product-card")
    const img = screen.getByRole("img")
    expect(img).toHaveClass("product-image")
  })
})