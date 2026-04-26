// src/presentation/components/home-page/__tests__/SearchInfo.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HomePageLabels } from "../../../../domain/constants/home.page.labels"
import SearchInfo from "../SearchInfo"

describe("SearchInfo Component", () => {
  it("should render the correct amount of products with the results label", () => {
    const amount = 24
    render(<SearchInfo productsAmount={amount} />)

    const resultsRegex = new RegExp(`${amount}.*${HomePageLabels?.RESULTS}`, "i")
    expect(screen.getByText(resultsRegex)).toBeInTheDocument()
  })

  it("should display the filter label from constants", () => {
    render(<SearchInfo productsAmount={0} />)

    expect(screen.getByText(HomePageLabels?.FILTER)).toBeInTheDocument()
  })

  it("should apply the correct CSS classes for layout", () => {
    const { container } = render(<SearchInfo productsAmount={10} />)

    expect(container.firstChild).toHaveClass("search-info")

    expect(container.querySelector(".results-count")).toBeInTheDocument()
    expect(container.querySelector(".filter-label")).toBeInTheDocument()
  })
})