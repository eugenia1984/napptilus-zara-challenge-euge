// src/presentation/components/shared/__tests__/ErrorMessage.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ErrorMessage from "../ErrorMessage"

describe("ErrorMessage Component", () => {
  const testMsg = "An unexpected error occurred";

  it("should render the provided error message", () => {
    render(<ErrorMessage message={testMsg} />);
    expect(screen.getByText(testMsg)).toBeInTheDocument();
  });

  it("should have the 'error-state' CSS class for consistent styling", () => {
    const { container } = render(<ErrorMessage message={testMsg} />);
    expect(container.firstChild).toHaveClass("error-state");
  });

  it("should have a 'role=alert' to notify screen readers of the error", () => {
    render(<ErrorMessage message={testMsg} />);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });
});