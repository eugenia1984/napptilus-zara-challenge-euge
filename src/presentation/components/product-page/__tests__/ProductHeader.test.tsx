// src/presentation/components/product-page/__tests__/ProductHeader.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProductHeader from "../ProductHeader"
import { SharedLabels } from "../../../../domain/constants/shared.labels"


describe("ProductHeader Component", () => {
  const mockProps = {
    productName: "iPhone 15 Pro",
    productPrice: 999
  }

  it("should render the product name as an h1 heading", () => {
    render(<ProductHeader {...mockProps} />)

    const heading = screen.getByRole("heading", { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(mockProps.productName)
    expect(heading).toHaveClass("product-detail-name")
  })

  it("should display the price correctly formatted with the currency label", () => {
    render(<ProductHeader {...mockProps} />)

    const priceSpan = screen.getByText(new RegExp(`${mockProps.productPrice}`, "i"))
    const currencyLabel = SharedLabels?.EUR

    expect(priceSpan).toBeInTheDocument()
    expect(priceSpan).toHaveTextContent(`${mockProps.productPrice} ${currencyLabel}`)
    expect(priceSpan).toHaveClass("product-detail-price")
  })

  it("should maintain the correct layout class", () => {
    const { container } = render(<ProductHeader {...mockProps} />)

    const wrapper = container.querySelector(".product-detail-header")

    expect(wrapper).toBeInTheDocument()
  })
})