// src/presentation/components/product-page/__tests__/ProductOptions.test.tsx

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import ProductOptions from "../ProductOptions"
import type { ProductDetail } from "../../../../domain/models/interfaces"

describe("ProductOptions Component", () => {
  const mockProduct: ProductDetail = {
    id: "iphone-15",
    brand: "Apple",
    name: "iPhone 15 Pro",
    basePrice: 1000,
    imageUrl: "/main.jpg",
    description: "Flagship",
    similarProducts: [],
    specs: {},
    storageOptions: [
      { capacity: "256GB", price: 0 },
      { capacity: "512GB", price: 150 }
    ],
    colorOptions: [
      { name: "Titanium Blue", hexCode: "#2e3b4e", imageUrl: "/blue.jpg" },
      { name: "Titanium White", hexCode: "#f5f5f7", imageUrl: "/white.jpg" }
    ]
  }

  const mockSetStorage = vi.fn()
  const mockSetColor = vi.fn()

  it("should render storage and color options from the product data", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedStorage={null}
        setSelectedStorage={mockSetStorage}
        selectedColor={null}
        setSelectedColor={mockSetColor}
      />
    )

    expect(screen.getByText("256GB")).toBeInTheDocument()
    expect(screen.getByText("512GB")).toBeInTheDocument()

    // CORRECCIÓN: Usar los nombres que están en mockProduct
    expect(screen.getByLabelText(/Select color Titanium Blue/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Select color Titanium White/i)).toBeInTheDocument()
  })

  it("should call setSelectedStorage when a storage button is clicked", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedStorage={null}
        setSelectedStorage={mockSetStorage}
        selectedColor={null}
        setSelectedColor={mockSetColor}
      />
    )

    fireEvent.click(screen.getByText("512GB"))
    expect(mockSetStorage).toHaveBeenCalledWith(mockProduct.storageOptions[1])
  })

  it("should call setSelectedColor when a color button is clicked", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedStorage={null}
        setSelectedStorage={mockSetStorage}
        selectedColor={null}
        setSelectedColor={mockSetColor}
      />
    )

    // CORRECCIÓN: Usar un color que sí exista en el mock (Titanium White es el índice 1)
    fireEvent.click(screen.getByLabelText(/Select color Titanium White/i))
    expect(mockSetColor).toHaveBeenCalledWith(mockProduct.colorOptions[1])
  })

  it("should highlight the selected options with the 'selected' class", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedStorage={mockProduct.storageOptions[0]}
        setSelectedStorage={mockSetStorage}
        selectedColor={mockProduct.colorOptions[0]}
        setSelectedColor={mockSetColor}
      />
    )

    expect(screen.getByText("256GB")).toHaveClass("selected")
    // CORRECCIÓN: Usar el nombre del color seleccionado (Titanium Blue)
    expect(screen.getByLabelText(/Select color Titanium Blue/i)).toHaveClass("selected")
  })
})