// src/presentation/components/cart-page/__tests__/CartPayButton.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import CartPayButton from "../CartPayButton"
import { CartPageLabels } from "../../../../domain/constants/cart.page.labels"

describe("CartPayButton Component", () => {
  it("should render the primary button with the localized pay label", () => {
    render(<CartPayButton />)

    const button = screen.getByRole("button", {
      name: new RegExp(CartPageLabels?.PAY, "i"),
    })

    expect(button).toBeInTheDocument()
  })

  it("should ensure the underlying button is a primary action", () => {
    render(<CartPayButton />)

    const button = screen.getByRole("button")

    expect(button).toHaveClass("primary-btn")
  })
})