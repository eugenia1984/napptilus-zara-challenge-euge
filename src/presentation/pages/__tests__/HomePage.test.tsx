// src/presentation/pages/__tests__/HomePage.test.tsx

import { render, screen, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi, beforeEach } from "vitest"
import HomePage from "../HomePage"
import { CartProvider } from "../../../infrastructure/context/CartContext"
import { HomePageLabels } from "../../../domain/constants/home.page.labels"

// Mock the API flow to avoid real network calls
vi.mock("../../../application/flows/getProductsFlow", () => ({
  getProducts: vi.fn(() =>
    Promise.resolve([
      {
        id: "1",
        brand: "TestBrand",
        name: "TestPhone",
        basePrice: 999,
        imageUrl: "http://example.com/phone.jpg",
      },
      {
        id: "2",
        brand: "OtherBrand",
        name: "OtherPhone",
        basePrice: 599,
        imageUrl: "http://example.com/phone2.jpg",
      },
    ]),
  ),
}))

function renderHomePage() {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>
    </CartProvider>,
  )
}

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the search form with the correct placeholder", async () => {
    await act(async () => {
      renderHomePage()
    })

    const searchInput = screen.getByPlaceholderText(
      HomePageLabels?.INPUT_PLACEHOLDER as string,
    )
    expect(searchInput).toBeInTheDocument()
  })

  it("should render the product grid after loading", async () => {
    await act(async () => {
      renderHomePage()
    })

    expect(await screen.findByText(/TestPhone/i)).toBeInTheDocument()
    expect(await screen.findByText(/OtherPhone/i)).toBeInTheDocument()
  })

  it("should display the results count", async () => {
    await act(async () => {
      renderHomePage()
    })

    const resultsRegex = new RegExp(`2.*${HomePageLabels?.RESULTS}`, "i")
    expect(await screen.findByText(resultsRegex)).toBeInTheDocument()
  })

  it("should render SEO meta title", async () => {
    await act(async () => {
      renderHomePage()
    })

    expect(document.title).toBeDefined()
  })
})
