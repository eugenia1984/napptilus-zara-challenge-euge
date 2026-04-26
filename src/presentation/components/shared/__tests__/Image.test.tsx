// src/presentation/components/shared/__tests__/Image.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Image from "../Image"

describe("Image Component", () => {
  const mockProps = {
    src: "test-image.jpg",
    alt: "Test alt text",
    width: 200,
    height: 100,
  }

  it("should render with all required attributes correctly", () => {
    render(<Image {...mockProps} />)

    const img = screen.getByRole("img")

    expect(img).toHaveAttribute("src", mockProps.src)
    expect(img).toHaveAttribute("alt", mockProps.alt)
    expect(img).toHaveAttribute("width", "200")
    expect(img).toHaveAttribute("height", "100")
  })

  it("should always have lazy loading for performance optimization", () => {
    render(<Image {...mockProps} />)

    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("loading", "lazy")
  })

  it("should include a custom className if provided", () => {
    render(<Image {...mockProps} className="responsive-img" />)

    const img = screen.getByRole("img")
    expect(img).toHaveClass("responsive-img")
  })
})