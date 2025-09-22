'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  placeholder?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  blur?: boolean;
  quality?: number;
  progressive?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback,
  placeholder,
  rootMargin = '50px',
  threshold = 0.1,
  onLoad,
  onError,
  aspectRatio,
  objectFit = 'cover',
  blur = true,
  quality = 75,
  progressive = true,
  className,
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Generate optimized image URLs based on viewport and quality settings
  const generateOptimizedSrc = useCallback((originalSrc: string, width?: number) => {
    // If using Cloudinary or similar service, add optimization parameters
    if (originalSrc.includes('cloudinary.com')) {
      const baseUrl = originalSrc.split('/upload/')[0] + '/upload/';
      const imagePath = originalSrc.split('/upload/')[1];
      
      const transformations = [
        `q_${quality}`,
        width ? `w_${width}` : '',
        'f_auto',
        progressive ? 'fl_progressive' : '',
      ].filter(Boolean).join(',');

      return `${baseUrl}${transformations}/${imagePath}`;
    }

    // If using Next.js Image optimization
    if (typeof window !== 'undefined' && originalSrc.startsWith('/')) {
      const params = new URLSearchParams({
        url: originalSrc,
        w: width?.toString() || '800',
        q: quality.toString(),
      });
      return `/_next/image?${params.toString()}`;
    }

    return originalSrc;
  }, [quality, progressive]);

  // Set up intersection observer
  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootMargin, threshold]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !currentSrc) {
      // Get container width for optimization
      const containerWidth = imgRef.current?.getBoundingClientRect().width;
      const optimizedSrc = generateOptimizedSrc(src, containerWidth);
      setCurrentSrc(optimizedSrc);
    }
  }, [isInView, src, currentSrc, generateOptimizedSrc]);

  // Handle image load
  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(event);
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
    }
    onError?.(event);
  }, [fallback, currentSrc, onError]);

  // Default placeholder component
  const defaultPlaceholder = (
    <div className={cn(
      'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800',
      blur && 'backdrop-blur-sm',
      aspectRatio && `aspect-[${aspectRatio}]`
    )}>
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-neutral-300 dark:bg-neutral-600 rounded-lg" />
      </div>
    </div>
  );

  // Error fallback component
  const errorFallback = (
    <div className={cn(
      'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400',
      aspectRatio && `aspect-[${aspectRatio}]`
    )}>
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-2 bg-neutral-300 dark:bg-neutral-600 rounded-lg opacity-50" />
        <span className="text-xs">Failed to load</span>
      </div>
    </div>
  );

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      style={style}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0">
          {placeholder || defaultPlaceholder}
        </div>
      )}

      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0">
          {errorFallback}
        </div>
      )}

      {/* Actual image */}
      {currentSrc && (
        <img
          {...props}
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down',
            !isLoaded && 'opacity-0',
            isLoaded && 'opacity-100',
            blur && !isLoaded && 'blur-sm'
          )}
          style={{
            ...style,
            aspectRatio: aspectRatio ? aspectRatio.replace(':', '/') : undefined,
          }}
        />
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Progressive image component that loads multiple quality levels
export interface ProgressiveImageProps extends LazyImageProps {
  lowQualitySrc?: string;
  mediumQualitySrc?: string;
  highQualitySrc?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  lowQualitySrc,
  mediumQualitySrc,
  highQualitySrc,
  ...props
}) => {
  const [currentStage, setCurrentStage] = useState<'low' | 'medium' | 'high'>('low');
  const [loadedStages, setLoadedStages] = useState<Set<string>>(new Set());

  // Image sources in order of quality
  const imageSources = {
    low: lowQualitySrc || src,
    medium: mediumQualitySrc || src,
    high: highQualitySrc || src,
  };

  // Load next quality level when current is loaded
  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    setLoadedStages(prev => new Set(prev).add(img.src));

    // Progress to next stage
    if (currentStage === 'low' && mediumQualitySrc) {
      setCurrentStage('medium');
    } else if (currentStage === 'medium' && highQualitySrc) {
      setCurrentStage('high');
    }

    props.onLoad?.(event);
  }, [currentStage, mediumQualitySrc, highQualitySrc, props]);

  return (
    <div className="relative">
      {/* Low quality image (loads first) */}
      {lowQualitySrc && (
        <LazyImage
          {...props}
          src={imageSources.low}
          onLoad={handleLoad}
          className={cn(
            props.className,
            currentStage !== 'low' && loadedStages.has(imageSources.medium) && 'opacity-0'
          )}
          blur={true}
        />
      )}

      {/* Medium quality image */}
      {mediumQualitySrc && currentStage !== 'low' && (
        <LazyImage
          {...props}
          src={imageSources.medium}
          onLoad={handleLoad}
          className={cn(
            'absolute inset-0',
            props.className,
            currentStage !== 'medium' && loadedStages.has(imageSources.high) && 'opacity-0'
          )}
        />
      )}

      {/* High quality image */}
      {highQualitySrc && currentStage === 'high' && (
        <LazyImage
          {...props}
          src={imageSources.high}
          onLoad={handleLoad}
          className={cn('absolute inset-0', props.className)}
        />
      )}

      {/* Fallback to single image if no progressive sources */}
      {!lowQualitySrc && !mediumQualitySrc && !highQualitySrc && (
        <LazyImage {...props} src={src} onLoad={handleLoad} />
      )}
    </div>
  );
};

export { LazyImage, ProgressiveImage };