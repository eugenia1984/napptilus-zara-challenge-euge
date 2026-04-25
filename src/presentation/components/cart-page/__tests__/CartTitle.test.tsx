// src/presentation/components/cart-page/__tests__/CartTitle.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { CartPageLabels } from "../../../../domain/constants/cart.page.labels"
import CartTitle from "../CartTitle"


describe('CartTitle Component', () => {
  it('should render the correct title from constants', () => {
    render(<CartTitle cartCount={0} />);

    expect(screen.getByText(new RegExp(CartPageLabels.TITLE, 'i'))).toBeInTheDocument();
  });

  it('should display the correct item count', () => {
    const mockCount = 5;
    render(<CartTitle cartCount={mockCount} />);

    const countElement = screen.getByText(`(${mockCount})`);
    expect(countElement).toBeInTheDocument();

    expect(countElement.tagName).toBe('SPAN');
  });

  it('should update when the cartCount prop changes', () => {
    const { rerender } = render(<CartTitle cartCount={1} />);
    expect(screen.getByText('(1)')).toBeInTheDocument();

    rerender(<CartTitle cartCount={10} />);
    expect(screen.getByText('(10)')).toBeInTheDocument();
  });
});