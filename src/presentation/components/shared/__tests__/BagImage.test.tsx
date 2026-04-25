// src/presentation/components/shared/__tests__/BagImage.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BagImage from "../BagImage"

describe('BagImage Component', () => {
  it('should render the bag icon', () => {
    render(<BagImage />);
    
    const img = screen.getByAltText(/bag icon/i);
    expect(img).toBeInTheDocument();
  });
});