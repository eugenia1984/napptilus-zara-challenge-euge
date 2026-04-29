// src/presentation/components/home-page/SearchInfo.tsx

import { HomePageLabels } from "../../../domain/constants/home.page.labels"
import type { SearchInfoProps } from "../../../domain/models/interfaces"

/**
 * Component that displays metadata about the current product search.
 * 
 * It shows the total number of results found and a generic filter label,
 * helping the user understand the context of the product grid.
 * 
 * @param {SearchInfoProps} props - The properties for the component.
 * @param {number} props.productsAmount - The number of products currently filtered/displayed.
 * 
 * @example
 * ```tsx
 * <SearchInfo productsAmount={12} />
 * ```
 */
export default function SearchInfo({productsAmount}:SearchInfoProps) {
  return (
    <div className="search-info">
      <div className="results-count">
        {productsAmount} {HomePageLabels?.RESULTS}
      </div>
    </div>
  )
}