'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';
import { 
  ZoomInIcon, 
  ZoomOutIcon, 
  RotateCcwIcon, 
  DownloadIcon, 
  XIcon,
  MaximizeIcon,
  MinimizeIcon,
  MoveIcon,
} from 'lucide-react';

export interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
  onClose?: () => void;
  showControls?: boolean;
  allowDownload?: boolean;
  maxZoom?: number;
  minZoom?: number;
  title?: string;
  description?: string;
  metadata?: {
    dimensions?: string;
    fileSize?: string;
    type?: string;
    category?: string;
  };
}

const ImageViewer = forwardRef<HTMLDivElement, ImageViewerProps>(
  ({ 
    src, 
    alt, 
    className,
    onClose,
    showControls = true,
    allowDownload = true,
    maxZoom = 5,
    minZoom = 0.5,
    title,
    description,
    metadata,
    ...props 
  }, ref) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Reset position when scale changes
    useEffect(() => {
      if (scale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }, [scale]);

    // Handle zoom functions
    const zoomIn = () => {
      setScale(prev => Math.min(prev * 1.5, maxZoom));
    };

    const zoomOut = () => {
      setScale(prev => Math.max(prev / 1.5, minZoom));
    };

    const resetZoom = () => {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    };

    const fitToScreen = () => {
      if (containerRef.current && imageRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const image = imageRef.current;
        
        const scaleX = container.width / image.naturalWidth;
        const scaleY = container.height / image.naturalHeight;
        const newScale = Math.min(scaleX, scaleY, 1);
        
        setScale(newScale);
        setPosition({ x: 0, y: 0 });
      }
    };

    // Handle mouse events for dragging
    const handleMouseDown = (e: React.MouseEvent) => {
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging && scale > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Handle wheel zoom
    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(prev => Math.min(Math.max(prev * delta, minZoom), maxZoom));
    };

    // Handle download
    const handleDownload = async () => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = title || 'architectural-plan';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            if (isFullscreen) {
              toggleFullscreen();
            } else {
              onClose?.();
            }
            break;
          case '+':
          case '=':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
          case 'f':
            e.preventDefault();
            fitToScreen();
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, onClose]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-full w-full bg-neutral-900 overflow-hidden',
          'flex flex-col',
          className
        )}
        {...props}
      >
        {/* Header */}
        {(title || description || onClose) && (
          <div className="relative z-10 flex items-center justify-between p-4 bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-800">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 className="text-lg font-semibold text-white truncate">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-neutral-400 truncate">
                  {description}
                </p>
              )}
            </div>
            
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="ml-4 text-white hover:bg-neutral-800"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        {/* Image Container */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <div className="text-center">
                <p className="text-lg font-medium">Failed to load image</p>
                <p className="text-sm">Please try again later</p>
              </div>
            </div>
          )}

          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className={cn(
              'max-w-none transition-transform duration-200 ease-out',
              isDragging ? 'transition-none' : '',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: 'center center',
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            draggable={false}
          />
        </div>

        {/* Controls */}
        {showControls && imageLoaded && (
          <div className="relative z-10 flex items-center justify-between p-4 bg-neutral-900/90 backdrop-blur-sm border-t border-neutral-800">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= minZoom}
                className="text-white hover:bg-neutral-800"
              >
                <ZoomOutIcon className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-neutral-400 min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= maxZoom}
                className="text-white hover:bg-neutral-800"
              >
                <ZoomInIcon className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={resetZoom}
                className="text-white hover:bg-neutral-800"
              >
                <RotateCcwIcon className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={fitToScreen}
                className="text-white hover:bg-neutral-800"
              >
                <MoveIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Metadata */}
            {metadata && (
              <div className="hidden md:flex items-center space-x-4 text-xs text-neutral-400">
                {metadata.dimensions && (
                  <span>{metadata.dimensions}</span>
                )}
                {metadata.fileSize && (
                  <span>{metadata.fileSize}</span>
                )}
                {metadata.type && (
                  <span className="uppercase">{metadata.type}</span>
                )}
              </div>
            )}

            {/* Action Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-neutral-800"
              >
                {isFullscreen ? (
                  <MinimizeIcon className="h-4 w-4" />
                ) : (
                  <MaximizeIcon className="h-4 w-4" />
                )}
              </Button>
              
              {allowDownload && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-white hover:bg-neutral-800"
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Keyboard shortcuts help */}
        <div className="absolute bottom-4 left-4 text-xs text-neutral-500 space-y-1 opacity-0 hover:opacity-100 transition-opacity">
          <div>+/- Zoom • 0 Reset • F Fit • ESC Close</div>
        </div>
      </div>
    );
  }
);

ImageViewer.displayName = 'ImageViewer';

export { ImageViewer };