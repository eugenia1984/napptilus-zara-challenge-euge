// src/presentation/components/cart-page/__tests__/CartPayButton.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import CartPayButton from "../CartPayButton"
import { CartPageLabels } from "../../../../domain/constants/cart.page.labels"

describe('CartPayButton Component', () => {
  it('should render correctly with the payment label', () => {
    render(<CartPayButton />);

    const button = screen.getByRole('button', { name: new RegExp(CartPageLabels.PAY, 'i') });
    expect(button).toBeInTheDocument();
  });

  it('should have the correct CSS class for global styling', () => {
    render(<CartPayButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('cart-pay-btn');
  });

  it('should be of type "button" to prevent accidental form submissions', () => {
    render(<CartPayButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});