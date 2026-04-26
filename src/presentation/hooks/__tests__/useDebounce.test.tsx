// src/presentation/hooks/__tests__/useDebounce.test.ts

import { useState } from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { useDebounce } from "../useDebounce"

const TestComponent = ({ delay = 400 }: { delay?: number }) => {
  const [value, setValue] = useState("initial")
  const debouncedValue = useDebounce(value, delay)

  return (
    <>
      <span data-testid="debounced">{debouncedValue}</span>
      <button onClick={() => setValue("updated")}>update</button>
    </>
  )
}

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns initial value immediately", () => {
    render(<TestComponent />)
    expect(screen.getByTestId("debounced")).toHaveTextContent("initial")
  })
})