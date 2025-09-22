'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { GalleryCard } from '@/components/ui/Card';
import { type ArchitecturalPlan } from '@/components/gallery/ArchitecturalGallery';

export interface VirtualizedGalleryProps {
  items: ArchitecturalPlan[];
  itemHeight?: number;
  itemWidth?: number;
  gap?: number;
  overscan?: number;
  onItemClick?: (item: ArchitecturalPlan) => void;
  onItemLike?: (itemId: string) => void;
  className?: string;
}

interface VirtualItem {
  index: number;
  item: ArchitecturalPlan;
  x: number;
  y: number;
  width: number;
  height: number;
}

const VirtualizedGallery: React.FC<VirtualizedGalleryProps> = ({
  items,
  itemHeight = 300,
  itemWidth = 280,
  gap = 24,
  overscan = 5,
  onItemClick,
  onItemLike,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Calculate layout
  const layout = useMemo(() => {
    if (containerSize.width === 0) return { items: [], totalHeight: 0, columnsCount: 0 };

    const availableWidth = containerSize.width - gap;
    const columnsCount = Math.max(1, Math.floor(availableWidth / (itemWidth + gap)));
    const actualItemWidth = Math.min(itemWidth, (availableWidth - (columnsCount - 1) * gap) / columnsCount);
    
    const virtualItems: VirtualItem[] = [];
    
    items.forEach((item, index) => {
      const column = index % columnsCount;
      const row = Math.floor(index / columnsCount);
      
      virtualItems.push({
        index,
        item,
        x: column * (actualItemWidth + gap),
        y: row * (itemHeight + gap),
        width: actualItemWidth,
        height: itemHeight,
      });
    });

    const totalRows = Math.ceil(items.length / columnsCount);
    const totalHeight = totalRows * (itemHeight + gap) - gap;

    return {
      items: virtualItems,
      totalHeight,
      columnsCount,
    };
  }, [items, containerSize.width, itemWidth, itemHeight, gap]);

  // Calculate visible items
  const visibleItems = useMemo(() => {
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + containerSize.height;
    
    return layout.items.filter((item) => {
      const itemTop = item.y;
      const itemBottom = item.y + item.height;
      
      // Add overscan
      const overscanTop = viewportTop - overscan * itemHeight;
      const overscanBottom = viewportBottom + overscan * itemHeight;
      
      return itemBottom >= overscanTop && itemTop <= overscanBottom;
    });
  }, [layout.items, scrollTop, containerSize.height, itemHeight, overscan]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
    setIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set scrolling to false after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  // Handle resize
  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  // Set up resize observer
  useEffect(() => {
    updateContainerSize();

    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateContainerSize]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-auto',
        'scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent',
        'dark:scrollbar-thumb-neutral-600',
        className
      )}
      onScroll={handleScroll}
    >
      {/* Virtual container */}
      <div
        style={{
          height: layout.totalHeight,
          position: 'relative',
        }}
      >
        {/* Visible items */}
        {visibleItems.map((virtualItem) => (
          <div
            key={virtualItem.item.id}
            style={{
              position: 'absolute',
              left: virtualItem.x,
              top: virtualItem.y,
              width: virtualItem.width,
              height: virtualItem.height,
            }}
          >
            <GalleryCard
              image={{
                src: virtualItem.item.images.thumbnail,
                alt: virtualItem.item.title,
                aspectRatio: 'plan',
              }}
              title={virtualItem.item.title}
              subtitle={
                virtualItem.item.specifications.area 
                  ? `${virtualItem.item.specifications.area} • ${virtualItem.item.specifications.bedrooms}BR/${virtualItem.item.specifications.bathrooms}BA`
                  : undefined
              }
              tags={virtualItem.item.tags.slice(0, 3)}
              price={virtualItem.item.price}
              onCardClick={() => onItemClick?.(virtualItem.item)}
              onImageClick={() => onItemClick?.(virtualItem.item)}
              badges={[
                ...(virtualItem.item.isPremium ? [{ text: 'Premium', variant: 'primary' as const }] : []),
                ...(virtualItem.item.isNew ? [{ text: 'New', variant: 'success' as const }] : []),
              ]}
              className={cn(
                'h-full transition-opacity duration-200',
                isScrolling && 'opacity-80'
              )}
            />
          </div>
        ))}
      </div>

      {/* Loading indicator for scroll */}
      {isScrolling && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg dark:bg-neutral-900/90">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export { VirtualizedGallery };