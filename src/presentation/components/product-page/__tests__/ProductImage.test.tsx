// src/presentation/components/product-page/__tests__/ProductImage.tests.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProductImage from "../ProductImage"

describe("ProductImage Component", () => {
  const mockProps = {
    srcImage: "https://test-url.com/product.png",
    altImage: "Product Test Alt"
  }

  it("should render the image with the correct src and alt attributes", () => {
    render(<ProductImage {...mockProps} />)

    const img = screen.getByRole("img")

    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", mockProps.srcImage)
    expect(img).toHaveAttribute("alt", mockProps.altImage)
  })

  it("should have the correct CSS class for styling", () => {
    render(<ProductImage {...mockProps} />)

    const img = screen.getByRole("img")

    expect(img).toHaveClass("product-detail-image")
  })

  it("should be wrapped in a container with the specific layout class", () => {
    const { container } = render(<ProductImage {...mockProps} />)

    const wrapper = container.querySelector(".product-image-section")

    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toContainElement(screen.getByRole("img"))
  })
})