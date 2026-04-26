// src/presentation/components/shared/__tests__/Layout.tsx

import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import { AppPaths } from "../../../../domain/constants/paths"
import Layout from "../Layout"

describe("Layout Component", () => {
  it("should render the logo with a link to the home page", () => {
    render(
      <MemoryRouter initialEntries={[AppPaths.HOME]}>
        <Layout />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole("link", { name: /mbst home page/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", AppPaths.HOME);

    expect(screen.getByRole("img", { name: /MBST brand logo/i })).toBeInTheDocument();
  });

  it("should show the cart link and icon when NOT on the cart page", () => {
    render(
      <MemoryRouter initialEntries={[AppPaths.HOME]}>
        <Layout />
      </MemoryRouter>
    );

    const cartLink = screen.getByRole("link", { name: /cart page with 0 items/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", AppPaths.CART);
    expect(screen.getByAltText(/bag icon/i)).toBeInTheDocument();
  });

  it("should NOT render the cart icon when the current path is the cart page", () => {
    render(
      <MemoryRouter initialEntries={[AppPaths.CART]}>
        <Layout />
      </MemoryRouter>
    );

    const cartLink = screen.queryByRole("link", { name: /cart page with/i });
    expect(cartLink).not.toBeInTheDocument();
  });
});