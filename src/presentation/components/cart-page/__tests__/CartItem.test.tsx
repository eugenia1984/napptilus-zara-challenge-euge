// src/presentation/components/cart-page/__tests__/CartItem.test.tsx

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import CartItem from "../CartItem"

describe("CartItem Component", () => {
  const mockItem = {
    brand: "Samsung",
    productId: "SMG-A05S",
    color: "#000000",
    storage: "64 GB",
    imageUrl: "http://example.com/image.webp",
    name: "Samsung Galaxy A05s",
    quantity: 2,
    price: 119,
  };

  const mockOnRemove = vi.fn();

  it("should render item details correctly", () => {
    render(<CartItem item={mockItem} handleRemoveFromCart={mockOnRemove} index={1} />);

    // Check name, price and options
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockItem.price}`, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockItem.storage, "i"))).toBeInTheDocument();

    // Check quantity
    expect(screen.getByText(/\| x2/i)).toBeInTheDocument();
  });

  it("should display the image with correct alt text for accessibility", () => {
    render(<CartItem item={mockItem} handleRemoveFromCart={mockOnRemove} index={1} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockItem.imageUrl);
    expect(image).toHaveAttribute("alt", `${mockItem.name}`);
  });

  it("should call onRemove with correct parameters when delete button is clicked", () => {
    render(<CartItem item={mockItem} handleRemoveFromCart={mockOnRemove} index={1} />);

    const deleteButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(deleteButton);

    expect(mockOnRemove).toHaveBeenCalledWith(
      mockItem.productId,
      mockItem.color,
      mockItem.storage
    );
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("should not show quantity multiplier if quantity is 1", () => {
    const singleItem = { ...mockItem, quantity: 1 };
    render(<CartItem item={singleItem} handleRemoveFromCart={mockOnRemove} index={1} />);

    expect(screen.queryByText(/x1/i)).not.toBeInTheDocument();
  });
});