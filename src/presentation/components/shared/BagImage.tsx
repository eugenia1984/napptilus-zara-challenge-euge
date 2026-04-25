// src/presentation/components/shared/BagImage.tsx

import bagIcon from "../../../assets/bag-icon.png"

/**
 * Atomic component that renders the shopping bag icon.
 * * * It encapsulates the bag asset and ensures consistent sizing and accessibility 
 * across the header and other navigation elements.
 */
export default function BagImage() {
  return <img src={bagIcon} alt="bag icon" width={18} height={18} /> 
}