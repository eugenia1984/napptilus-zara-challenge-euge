// src/presentation/components/home-page/__tests__/ProductList.test.tsx

import { render, screen, act } from "@testing-library/react"
import { Suspense } from "react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import ProductList from "../ProductList"
import { HomePageLabels } from "../../../../domain/constants/home.page.labels"

describe("ProductList Component", () => {
  const mockProducts = [
    {
      id: "1",
      brand: "Brand A",
      name: "Product A",
      basePrice: 100,
      imageUrl: "url-a"
    },
    {
      id: "2",
      brand: "Brand B",
      name: "Product B",
      basePrice: 200,
      imageUrl: "url-b"
    }
  ]

  it("should render the list of products when the promise resolves", async () => {
    const productsPromise = Promise.resolve(mockProducts)

    // React v19, Suspense inside act
    await act(async () => {
      render(
        <MemoryRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList productsPromise={productsPromise} />
          </Suspense>
        </MemoryRouter>
      )
    })

    expect(await screen.findByText(/product a/i)).toBeInTheDocument()
    expect(await screen.findByText(/product b/i)).toBeInTheDocument()

    const resultsRegex = new RegExp(`2.*${HomePageLabels?.RESULTS}`, "i")
    expect(screen.getByText(resultsRegex)).toBeInTheDocument()
  })

  it("should render the empty state when no products are found", async () => {
    const emptyPromise = Promise.resolve([])

    await act(async () => {
      render(
        <MemoryRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList productsPromise={emptyPromise} />
          </Suspense>
        </MemoryRouter>
      )
    })

    const emptyMessage = await screen.findByText(HomePageLabels?.NO_PRODUCTS as string)
    expect(emptyMessage).toBeInTheDocument()

    const productLinks = screen.queryAllByRole("link")
    expect(productLinks.length).toBe(0)
  })
})