import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: "square" | "video" | "auto";
}

/**
 * Optimized Image Component with:
 * - Lazy loading
 * - Fallback support
 * - Loading state
 * - Error handling
 * - Aspect ratio control
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  fallbackSrc = "/images/placeholders/product-placeholder.webp",
  aspectRatio = "square",
}: OptimizedImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto",
  }[aspectRatio];

  const imageSrc = imageError ? fallbackSrc : src;

  return (
    <div className={cn("relative overflow-hidden bg-muted", aspectRatioClass, className)}>
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted/50" />
      )}

      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default OptimizedImage;
