// src/presentation/components/home-page/SearchForm.tsx

import { HomePageLabels } from "../../../domain/constants/home.page.labels"
import type { SearchFormModel } from "../../../domain/models/interfaces"

/**
 * SearchForm component that provides a semantic search interface for product filtering.
 * 
 * This component implements an accessible form with a specialized search input 
 * and a clear-action button. It prevents default form submission to support 
 * modern reactive search patterns.
 * 
 * @param {SearchFormModel} props - The properties for the component.
 * @param {string} props.searchQuery - The current value of the search input.
 * @param {Function} props.onSearchChange - Callback triggered on every keystroke to update the search state.
 * @param {Function} props.onClear - Callback to reset the search query and return to the initial state.
 * 
 * @returns {JSX.Element} A semantic `<form role="search">` containing the search controls.
 * 
 * @example
 * <SearchForm 
 * searchQuery={query} 
 * onSearchChange={handleSearch} 
 * onClear={() => setQuery("")} 
 * />
 */
export default function SearchForm({
  searchQuery,
  onSearchChange,
  onClear
}: SearchFormModel) {

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="search-input-wrapper"
    >
      <input
        type="search"
        autoComplete="off"
        spellCheck="false"
        className="search-input"
        placeholder={HomePageLabels?.INPUT_PLACEHOLDER}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={HomePageLabels?.INPUT_ARIA_LABEL}
        name="search-product"
        id="search-product"
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear"
          onClick={onClear}
          aria-label={HomePageLabels?.BUTTON_ARIA_LABEL}
        >
          ×
        </button>
      )}
    </form>
  )
}