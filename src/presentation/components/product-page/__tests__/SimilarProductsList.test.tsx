// src/presentation/components/product-page/__tests__/SimilarProductsList.test.tsx

import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import { createRef } from "react"
import SimilarProductsList from "../SimilarProductsList"
import { ProductPageLabels } from "../../../../domain/constants/product.page.labels"
import type { ProductDetail } from "../../../../domain/models/interfaces"


describe("SimilarProductsList Component", () => {
  const mockProduct: ProductDetail = {
    id: "main-prod-id",
    brand: "Apple",
    name: "iPhone 15 Pro",
    basePrice: 1200,
    imageUrl: "/main.jpg",
    description: "Main product description",
    colorOptions: [],
    storageOptions: [],
    specs: {},
    similarProducts: [
      { 
        id: "1", 
        name: "Similar 1", 
        brand: "Brand A", 
        basePrice: 100, 
        imageUrl: "/img1.jpg" 
      },
      { 
        id: "2", 
        name: "Similar 2", 
        brand: "Brand B", 
        basePrice: 200, 
        imageUrl: "/img2.jpg" 
      }
    ]
  }

  const mockRefs = {
    similarGridRef: createRef<HTMLDivElement>(),
    thumbRef: createRef<HTMLDivElement>()
  }

  it("should render the section title correctly", () => {
    render(
      <BrowserRouter>
        <SimilarProductsList product={mockProduct} {...mockRefs} />
      </BrowserRouter>
    )

    const title = screen.getByText(ProductPageLabels?.SIMILAR_PRODUCTS)
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe("H2")
  })

  it("should render the correct number of ProductCard components", () => {
    render(
      <BrowserRouter>
        <SimilarProductsList product={mockProduct} {...mockRefs} />
      </BrowserRouter>
    )
    const productCards = screen.getAllByRole("link")
    expect(productCards).toHaveLength(mockProduct.similarProducts.length)
  })

  it("should attach the provided refs to the DOM elements", () => {
    render(
      <BrowserRouter>
        <SimilarProductsList product={mockProduct} {...mockRefs} />
      </BrowserRouter>
    )

    expect(mockRefs.similarGridRef.current).toBeInstanceOf(HTMLDivElement)
    expect(mockRefs.thumbRef.current).toBeInstanceOf(HTMLDivElement)
    expect(mockRefs.similarGridRef.current).toHaveClass("similar-grid")
  })

  it("should render the custom scroll indicator container", () => {
    const { container } = render(
      <BrowserRouter>
        <SimilarProductsList product={mockProduct} {...mockRefs} />
      </BrowserRouter>
    )

    const indicator = container.querySelector(".similar-indicator")
    const thumb = container.querySelector(".similar-indicator-thumb")

    expect(indicator).toBeInTheDocument()
    expect(thumb).toBeInTheDocument()
  })
})