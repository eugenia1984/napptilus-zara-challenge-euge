// src/presentation/components/shared/__tests__/Loader.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Loader from "../Loader"

describe("Loader Component", () => {
  it("should render the provided loading message", () => {
    const testMessage = "Fetching data...";
    render(<Loader message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("should have the correct CSS class", () => {
    const { container } = render(<Loader message="Loading" />);
    expect(container.firstChild).toHaveClass("loading-state");
  });
});