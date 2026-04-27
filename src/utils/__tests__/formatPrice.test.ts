// src/application/utils/__tests__/formatPrice.ts

import { describe, it, expect } from "vitest"
import { formatPrice } from "../formatPrice"

describe("formatPrice utility (German formatting for strict dots)", () => {
  it("should force a dot separator in four-digit numbers", () => {
    const input = 1174;
    const result = formatPrice(input);

    expect(result).toBe("1.174");
  });

  it("should format large numbers with multiple dot separators", () => {
    const input = 1000500;
    const result = formatPrice(input);

    expect(result).toBe("1.000.500");
  });

  it("should return '0' as a string when input is 0", () => {
    const result = formatPrice(0);
    expect(result).toBe("0");
  });

  it("should handle negative numbers with proper dot placement", () => {
    const input = -2500;
    const result = formatPrice(input);

    expect(result).toBe("-2.500");
  });

  it("should round decimal values to the nearest integer", () => {
    const input = 1174.8;
    const result = formatPrice(input);

    expect(result).toBe("1.175");
  });
});
