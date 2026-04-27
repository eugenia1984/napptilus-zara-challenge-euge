// src/presentation/components/shared/Image.tsx

import type { ImageProps } from "../../../domain/models/interfaces"

/**
 * Base Image component to standardize all assets across the app.
 * 
 * It provides a consistent way to handle dimensions and accessibility.
 * 
 * @param {ImageProps} props - Component properties.
 */
export default function Image({ src, alt, width, height, className }: ImageProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className} 
      loading="lazy" 
    />
  )
}