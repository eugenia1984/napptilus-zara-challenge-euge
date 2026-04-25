// src/test/setup.ts

import "@testing-library/jest-dom"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// Cleans the virtual DOM after each test to prevent state collisions
afterEach(() => {
  cleanup();
});