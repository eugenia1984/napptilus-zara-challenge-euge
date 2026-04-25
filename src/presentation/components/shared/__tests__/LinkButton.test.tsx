// src/presentation/components/shared/__tests__/LinkButton.test.tsx

import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import LinkButton from "../LinkButton"

describe("LinkButton Component", () => {
  const mockProps = {
    text: "Go Home",
    to: "/home"
  }

  it("should render the link with the correct text and destination", () => {
    render(
      <BrowserRouter>
        <LinkButton {...mockProps} />
      </BrowserRouter>
    )

    const link = screen.getByRole("link", { name: /go home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", mockProps.to)
  })

  it("should apply the correct CSS class", () => {
    render(
      <BrowserRouter>
        <LinkButton {...mockProps} />
      </BrowserRouter>
    )

    const link = screen.getByRole("link")
    expect(link).toHaveClass("link-btn")
  })

  it("should use aria-label for accessibility if provided", () => {
    const customLabel = "Back to shopping gallery"
    render(
      <BrowserRouter>
        <LinkButton {...mockProps} ariaLabel={customLabel} />
      </BrowserRouter>
    )

    expect(screen.getByLabelText(customLabel)).toBeInTheDocument()
  })
})