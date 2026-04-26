// src/presentation/components/product-page/ProductOptions.tsx

import { ProductPageLabels } from "../../../domain/constants/product.page.labels"
import type { ProductOptionsModel } from "../../../domain/models/interfaces"

/**
 * Component that renders selection controls for product variants.
 * 
 * Allows the user to choose between different storage capacities and colors.
 * It displays visual feedback for the currently selected options and
 * accessibility labels for screen readers.
 * 
 * @param {ProductOptionsModel} props - Component properties.
 * @returns {JSX.Element} The options selector interface.
 */
export default function ProductOptions({
  product,
  selectedStorage,
  setSelectedStorage,
  selectedColor,
  setSelectedColor
}: ProductOptionsModel) {

  return (
    <div className="product-options">
      <div className="option-group">
        <span className="option-label">{ProductPageLabels?.CHOOSE_STORAGE}</span>
        <div className="storage-options">
          {product.storageOptions.map((storage) => (
            <button
              key={storage.capacity}
              className={`storage-btn ${selectedStorage?.capacity === storage.capacity ? "selected" : ""}`}
              onClick={() => setSelectedStorage(storage)}
              aria-pressed={selectedStorage?.capacity === storage.capacity}
              aria-label={`Select storage ${storage.capacity}`}
            >
              {storage.capacity}
            </button>
          ))}
        </div>
      </div>

      <div className="option-group">
        <span className="option-label">{ProductPageLabels?.CHOOSE_COLOR}</span>
        <div className="color-options">
          {product.colorOptions.map((color) => (
            <button
              key={color.hexCode}
              className={`color-btn ${selectedColor?.hexCode === color.hexCode ? "selected" : ""}`}
              style={{ backgroundColor: color.hexCode }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color.name}`}
              aria-pressed={selectedColor?.hexCode === color.hexCode}
            />
          ))}
        </div>
        <span className="selected-color-name">{selectedColor?.name || "\u00A0"}</span>
      </div>
    </div>
  )
}