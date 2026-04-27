// src/presentation/components/shared/__tests__/Layout.tsx

import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import { AppPaths } from "../../../../domain/constants/paths"
import Layout from "../Layout"
import { CartProvider } from "../../../../infrastructure/context/CartContext"

describe("Layout Component", () => {
  it("should render the logo with a link to the home page", () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={[AppPaths.HOME]}>
          <Layout />
        </MemoryRouter>
      </CartProvider>

    );

    const homeLink = screen.getByRole("link", { name: /mbst home page/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", AppPaths.HOME);

    expect(screen.getByRole("img", { name: /MBST brand logo/i })).toBeInTheDocument();
  });

  it("should show the cart link and icon when NOT on the cart page", () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={[AppPaths.HOME]}>
          <Layout />
        </MemoryRouter>
      </CartProvider>
    );

    const cartLink = screen.getByRole("link", { name: /cart page with 0 items/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", AppPaths.CART);
    expect(screen.getByAltText(/bag icon/i)).toBeInTheDocument();
  });

  it("should NOT render the cart icon when the current path is the cart page", () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={[AppPaths.CART]}>
          <Layout />
        </MemoryRouter>
      </CartProvider>
    );

    const cartLink = screen.queryByRole("link", { name: /cart page with/i });
    expect(cartLink).not.toBeInTheDocument();
  });
});