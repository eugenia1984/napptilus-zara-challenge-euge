// src/presentation/components/shared/PrimaryButton.tsx
import type { PrimaryButtonProps } from "../../../domain/models/interfaces"

/**
 * A common primary button that follows the brand's visual identity.
 * 
 * Supports custom labels for enhanced accessibility when the visible text
 * is not descriptive enough.
 * 
 * @param {PrimaryButtonProps} props - Component properties.
 * 
 * @example
 * ```tsx
 * // Normal use
 * <PrimaryButton text="Pay" /> 
 * // Enhanced accessibility use
 * <PrimaryButton text="Pay" ariaLabel="Proceed to checkout and pay" />
 * 
 */
export default function PrimaryButton({ text, ariaLabel }: PrimaryButtonProps) {
  return (
    <button className="primary-btn" type="button" aria-label={ariaLabel}>
      {text}
    </button>
  )
}