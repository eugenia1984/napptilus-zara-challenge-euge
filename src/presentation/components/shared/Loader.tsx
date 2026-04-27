// src/presentation/components/shared/Loader.tsx

import type { LoaderProps } from "../../../domain/models/interfaces"

/**
 * Shared component for displaying a loading state.
 * 
 * Optimized for use within React `Suspense` fallbacks.
 * 
 * @param {LoaderProps} props - Component properties.
 * 
 * @returns {JSX.Element} A structured div with a loading message.
 */
export default function Loader({ message }: LoaderProps) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      {message}
    </div>
  );
}