// src/presentation/components/shared/ErrorMessage.tsx

import type { ErrorMessageProps } from "../../../domain/models/interfaces"

/**
 * Shared component for displaying error feedback across the application.
 * 
 * This component is primarily intended to be used as a fallback UI 
 * for `ErrorBoundary` components, providing a consistent look and feel 
 * for failed data fetching or application crashes.
 * 
 * @param {ErrorMessageProps} props - Component properties.
 * 
 * @returns {JSX.Element} A semantic error message container.
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-state" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}