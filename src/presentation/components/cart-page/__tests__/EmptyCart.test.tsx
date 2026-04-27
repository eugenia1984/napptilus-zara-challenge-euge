// src/presentation/components/cart-page/__tests__/EmptyCart.test.tsx

import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import EmptyCart from "../EmptyCart"
import { CartPageLabels } from "../../../../domain/constants/cart.page.labels"


describe("EmptyCart Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <EmptyCart />
      </BrowserRouter>
    );

  it("should render the main cart title", () => {
    renderComponent();
    const title = screen.getByText(CartPageLabels?.TITLE);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H2");
  });

  it("should render the 'Continue Shopping' button with correct text", () => {
    renderComponent();
    const linkAction = screen.getByRole("link", {
      name: CartPageLabels?.CONTINUE_SHOPPING_ARIA_LABEL,
    });
    
    expect(linkAction).toBeInTheDocument();
    expect(linkAction).toHaveTextContent(CartPageLabels?.CONTINUE_SHOPPING);
  });

  it("should have the correct CSS class for layout styling", () => {
    const { container } = renderComponent();
    const section = container.querySelector("section");
    expect(section).toHaveClass("cart-empty");
  });
});