// src/presentation/components/shared/LinkButton.tsx

import { Link } from "react-router-dom"
import type { LinkButtonModel } from "../../../domain/models/interfaces"

/**
 * A link component styled as a button for navigation actions.
 * 
 * Used for secondary actions like "Continue Shopping".
 * 
 * Follows the brand's minimal visual identity.
 * 
 * @param {LinkButtonModel} props - Component properties.
 * @example
 * ```tsx
 * <LinkButton text="Continue" to="/home" />
 * ```
 */
export default function LinkButton({ text, to, ariaLabel }: LinkButtonModel) {
  return (
    <Link to={to} className="link-btn" aria-label={ariaLabel}>
      {text}
    </Link>
  )
}