// src/presentation/components/home-page/__tests__/SearchForm.test.tsx

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import SearchForm from "../SearchForm"

describe("SearchForm Component", () => {
  const defaultProps = {
    searchQuery: "",
    onSearchChange: vi.fn(),
    onClear: vi.fn()
  }

  it("should render the input with the correct placeholder", () => {
    render(<SearchForm {...defaultProps} />)

    const input = screen.getByRole("searchbox")
    expect(input).toBeInTheDocument()
  })

  it("should call onSearchChange when the user types", () => {
    render(<SearchForm {...defaultProps} />)

    const input = screen.getByRole("searchbox")
    fireEvent.change(input, { target: { value: "Zara" } })

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("Zara")
  })

  it("should show the clear button only when searchQuery is not empty", () => {
    const { rerender } = render(<SearchForm {...defaultProps} />)

    expect(screen.queryByRole("button")).not.toBeInTheDocument()

    rerender(<SearchForm {...defaultProps} searchQuery="Shoes" />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("should call onClear when the clear button is clicked", () => {
    render(<SearchForm {...defaultProps} searchQuery="Has text" />)

    const clearButton = screen.getByRole("button")
    fireEvent.click(clearButton)

    expect(defaultProps.onClear).toHaveBeenCalledTimes(1)
  })

  it("should prevent default form submission", () => {
    render(<SearchForm {...defaultProps} />)

    const form = screen.getByRole("search")
    const event = fireEvent.submit(form)

    expect(event).toBe(false)
  })
})