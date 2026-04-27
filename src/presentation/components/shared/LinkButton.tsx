// src/presentation/components/shared/LinkButton.tsx

import { Link } from "react-router-dom"
import type { LinkButtonProps } from "../../../domain/models/interfaces"

/**
 * A link component styled as a button for navigation actions.
 * 
 * Used for secondary actions like "Continue Shopping".
 * 
 * Follows the brand's minimal visual identity.
 * 
 * @param {LinkButtonProps} props - Component properties.
 * @example
 * ```tsx
 * <LinkButton text="Continue" to="/home" />
 * ```
 */
export default function LinkButton({ text, to, ariaLabel, className }: LinkButtonProps) {
  return (
    <Link to={to} className={className ?? "link-btn"} aria-label={ariaLabel}>
      {text}
    </Link>
  )
}