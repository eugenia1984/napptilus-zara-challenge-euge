// src/presentation/components/cart-page/__tests__/CartTotal.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import CartTotal from "../CartTotal"
import { CartPageLabels } from "../../../../domain/constants/cart.page.labels"
import { SharedLabels } from "../../../../domain/constants/shared.labels"

describe("CartTotal Component", () => {
  it("should render the total label and the price correctly", () => {
    const mockPrice = 450;
    render(<CartTotal cartTotalPrice={mockPrice} />);

    expect(screen.getByText(CartPageLabels?.TOTAL)).toBeInTheDocument();

    const totalAmount = screen.getByText(new RegExp(`${mockPrice}.*${SharedLabels?.EUR}`, "i"));
    expect(totalAmount).toBeInTheDocument();
  });

  it("should display zero when the price is 0", () => {
    render(<CartTotal cartTotalPrice={0} />);

    expect(screen.getByText(new RegExp(`0.*${SharedLabels?.EUR}`, "i"))).toBeInTheDocument();
  });

  it("should have the correct CSS class for styling", () => {
    const { container } = render(<CartTotal cartTotalPrice={100} />);

    expect(container.firstChild).toHaveClass("cart-total");
  });
});