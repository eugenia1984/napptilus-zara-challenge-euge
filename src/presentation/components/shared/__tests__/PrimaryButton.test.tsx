// src/presentation/components/shared/__tests__/PrimaryButton.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import PrimaryButton from "../PrimaryButton"

describe("PrimaryButton Component", () => {
  it("should render the button with the provided text", () => {
    const buttonText = "Click Me"
    render(<PrimaryButton text={buttonText} />)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent(buttonText)
  })

  it("should apply the correct CSS class", () => {
    render(<PrimaryButton text="Test" />)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("primary-btn")
  })

  it("should use the aria-label when provided for accessibility", () => {
    const label = "Custom Accessibility Label"
    render(<PrimaryButton text="Pay" ariaLabel={label} />)

    const button = screen.getByLabelText(label)
    expect(button).toBeInTheDocument()
  })

  it("should not have an aria-label attribute if none is provided", () => {
    render(<PrimaryButton text="No Label" />)

    const button = screen.getByRole("button")
    expect(button).not.toHaveAttribute("aria-label")
  })

  it("should be of type 'button' by default", () => {
    render(<PrimaryButton text="Submit" />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("type", "button")
  })
})