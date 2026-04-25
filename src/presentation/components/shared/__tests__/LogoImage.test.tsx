

// src/presentation/components/shared/__tests__/LogoImage.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LogoImage from "../LogoImage"

describe('LogoImage Component', () => {
  it('should render the logo image with correct alt text', () => {
    render(<LogoImage />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'MBST logo icon');
    expect(img).toHaveAttribute('src', expect.stringContaining('logo.png'));
  });
});