// src/presentation/pages/__tests__/ProductPage.test.tsx

import { render, screen, act } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, it, expect, vi, beforeEach } from "vitest"
import ProductPage from "../ProductPage"
import { CartProvider } from "../../../infrastructure/context/CartContext"
import { SharedLabels } from "../../../domain/constants/shared.labels"
import { ProductPageLabels } from "../../../domain/constants/product.page.labels"
import mockProductData from "../../../__mocks__/getProductById.json"

// Mock the API flow
vi.mock("../../../application/flows/getProductByIdFlow", () => ({
  getProductById: vi.fn(() => Promise.resolve(mockProductData)),
}))

function renderProductPage(id = "SMG-A05S") {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  )
}

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the back navigation link", async () => {
    await act(async () => {
      renderProductPage()
    })

    const backLink = screen.getByRole("link", {
      name: ProductPageLabels?.BACK_BUTTON_ARIA_LABEL as string,
    })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveTextContent(SharedLabels?.BACK as string)
  })

  it("should render the product name after loading", async () => {
    await act(async () => {
      renderProductPage()
    })

    expect(
      await screen.findByText(mockProductData.name),
    ).toBeInTheDocument()
  })

  it("should render the product image", async () => {
    await act(async () => {
      renderProductPage()
    })

    const productImage = await screen.findByAltText(mockProductData.name)
    expect(productImage).toBeInTheDocument()
  })

  it("should render storage options", async () => {
    await act(async () => {
      renderProductPage()
    })

    for (const storage of mockProductData.storageOptions) {
      expect(
        await screen.findByText(storage.capacity),
      ).toBeInTheDocument()
    }
  })

  it("should render color option buttons", async () => {
    await act(async () => {
      renderProductPage()
    })

    for (const color of mockProductData.colorOptions) {
      expect(
        await screen.findByLabelText(`Select color ${color.name}`),
      ).toBeInTheDocument()
    }
  })

  it("should render the specifications section", async () => {
    await act(async () => {
      renderProductPage()
    })

    expect(
      await screen.findByText(ProductPageLabels?.SPECIFICATIONS as string),
    ).toBeInTheDocument()
  })

  it("should render the similar products section", async () => {
    await act(async () => {
      renderProductPage()
    })

    expect(
      await screen.findByText(ProductPageLabels?.SIMILAR_PRODUCTS as string),
    ).toBeInTheDocument()
  })
})
