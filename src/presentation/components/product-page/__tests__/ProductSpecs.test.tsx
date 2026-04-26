// src/presentation/components/product-page/__tests__/ProductSpecs.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProductSpecs from "../ProductSpecs"
import type { ProductDetail } from "../../../../domain/models/interfaces"
import { ProductPageLabels } from "../../../../domain/constants/product.page.labels"


describe("ProductSpecs Component", () => {

  const mockProduct: ProductDetail = {
    id: "test-123",
    name: "iPhone 15 Pro",
    brand: "Apple",
    basePrice: 999,
    imageUrl: "/test.jpg",
    description: "Latest flagship model",
    colorOptions: [],
    storageOptions: [],
    similarProducts: [],
    specs: {
      Screen: "6.7 inch OLED",
      Battery: "4441 mAh"
    }
  }

  it("should render mandatory fields: brand and description", () => {
    render(<ProductSpecs {...mockProduct} />)

    expect(screen.getByText(ProductPageLabels?.BRAND)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  })

  it("should render dynamic specs from the entries object", () => {
    render(<ProductSpecs {...mockProduct} />)

    expect(screen.getByText("Screen")).toBeInTheDocument()
    expect(screen.getByText("6.7 inch OLED")).toBeInTheDocument()
  })

  it("should handle missing specs gracefully using default assignment", () => {
    const productWithoutSpecs: ProductDetail = {
      ...mockProduct,
      specs: undefined as unknown as Record<string, string> 
    }

    render(<ProductSpecs {...productWithoutSpecs} />)
    
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument()
    const listItems = screen.getAllByRole("listitem")
    expect(listItems.length).toBe(2) // Brand and Description
  })
})