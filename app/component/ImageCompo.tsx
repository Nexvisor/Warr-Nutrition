"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackClassName?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function ImageCompo({
  src,
  alt,
  width = 500,
  height = 300,
  className,
  fallbackClassName,
  fill = false,
  priority = false,
  sizes,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {(isLoading || hasError) && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded-md",
            fallbackClassName
          )}
          style={{
            width: fill ? "100%" : width,
            height: fill ? "100%" : height,
          }}
        />
      )}

      {!hasError && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      )}
    </div>
  );
}
