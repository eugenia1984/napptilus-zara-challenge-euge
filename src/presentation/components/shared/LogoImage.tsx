// src/presentation/components/shared/LogoImages.tsx

import logoIcon from "../../../assets/logo.png"

/**
 * Atomic component that renders the application's brand identity logo.
 * 
 * It encapsulates the official logo asset, ensuring consistent dimensions and 
 * accessibility across the navigation header.
 */
export default function LogoImage() {
  return <img src={logoIcon} alt="MBST logo icon" width={74} height={24} />
}