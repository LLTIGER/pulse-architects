'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { GalleryCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { VirtualizedGallery } from '@/components/performance/VirtualizedGallery';
import { type ArchitecturalPlan } from '@/components/gallery/ArchitecturalGallery';
import { 
  GridIcon, 
  ListIcon, 
  Smartphone,
  TabletIcon,
  MonitorIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';

export interface ResponsiveGalleryProps {
  plans: ArchitecturalPlan[];
  onPlanSelect?: (plan: ArchitecturalPlan) => void;
  onPlanLike?: (planId: string) => void;
  className?: string;
  enableVirtualization?: boolean;
  adaptiveLoading?: boolean;
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'wide';
type ViewMode = 'grid' | 'list' | 'cards';

const ResponsiveGallery: React.FC<ResponsiveGalleryProps> = ({
  plans,
  onPlanSelect,
  onPlanLike,
  className,
  enableVirtualization = true,
  adaptiveLoading = true,
}) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive breakpoints
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
    wide: 1536,
  };

  // Detect viewport size
  useEffect(() => {
    const updateViewportSize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.mobile) {
        setViewportSize('mobile');
      } else if (width < breakpoints.tablet) {
        setViewportSize('tablet');
      } else if (width < breakpoints.wide) {
        setViewportSize('desktop');
      } else {
        setViewportSize('wide');
      }
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  // Adaptive items per page based on viewport
  useEffect(() => {
    const itemCounts = {
      mobile: 6,
      tablet: 8,
      desktop: 12,
      wide: 16,
    };
    setItemsPerPage(itemCounts[viewportSize]);
  }, [viewportSize]);

  // Adaptive view mode for mobile
  useEffect(() => {
    if (viewportSize === 'mobile' && viewMode === 'grid') {
      setViewMode('cards');
    }
  }, [viewportSize, viewMode]);

  // Grid configuration
  const gridConfig = useMemo(() => {
    const configs = {
      mobile: {
        columns: 'grid-cols-1',
        gap: 'gap-4',
        itemHeight: 320,
        itemWidth: 280,
      },
      tablet: {
        columns: 'grid-cols-2',
        gap: 'gap-6',
        itemHeight: 300,
        itemWidth: 260,
      },
      desktop: {
        columns: 'grid-cols-3 xl:grid-cols-4',
        gap: 'gap-6',
        itemHeight: 280,
        itemWidth: 250,
      },
      wide: {
        columns: 'grid-cols-4 2xl:grid-cols-5',
        gap: 'gap-8',
        itemHeight: 280,
        itemWidth: 250,
      },
    };
    return configs[viewportSize];
  }, [viewportSize]);

  // Paginated plans
  const paginatedPlans = useMemo(() => {
    if (!adaptiveLoading) return plans;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return plans.slice(0, endIndex); // Progressive loading
  }, [plans, currentPage, itemsPerPage, adaptiveLoading]);

  // Load more functionality
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreItems = paginatedPlans.length < plans.length;

  // Render view mode controls
  const renderViewModeControls = () => {
    if (viewportSize === 'mobile') {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Mobile View
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
          >
            <SlidersHorizontalIcon className="h-4 w-4" />
            <span>Options</span>
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            {viewportSize === 'tablet' && <TabletIcon className="h-4 w-4" />}
            {(viewportSize === 'desktop' || viewportSize === 'wide') && <MonitorIcon className="h-4 w-4" />}
            <span>{viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)} View</span>
          </div>
          
          <div className="text-sm text-neutral-500">
            Showing {paginatedPlans.length} of {plans.length} plans
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex border border-neutral-200 rounded-lg dark:border-neutral-800">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none border-x border-neutral-200 dark:border-neutral-800"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="rounded-l-none"
            >
              <GridIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Render gallery content
  const renderGalleryContent = () => {
    if (enableVirtualization && plans.length > 50 && viewMode === 'grid') {
      return (
        <div className="h-[600px]">
          <VirtualizedGallery
            items={paginatedPlans}
            itemHeight={gridConfig.itemHeight}
            itemWidth={gridConfig.itemWidth}
            gap={24}
            onItemClick={onPlanSelect}
            onItemLike={onPlanLike}
          />
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className="space-y-4">
          {paginatedPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'flex gap-4 p-4 bg-white rounded-xl border border-neutral-200',
                'hover:shadow-lg transition-shadow cursor-pointer',
                'dark:bg-neutral-900 dark:border-neutral-800',
                viewportSize === 'mobile' && 'flex-col'
              )}
              onClick={() => onPlanSelect?.(plan)}
            >
              {/* Thumbnail */}
              <div className={cn(
                'rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0',
                viewportSize === 'mobile' ? 'w-full h-48' : 'w-32 h-24'
              )}>
                <img
                  src={plan.images.thumbnail}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  'flex justify-between',
                  viewportSize === 'mobile' && 'flex-col space-y-2'
                )}>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                      {plan.specifications.area && (
                        <span>{plan.specifications.area}</span>
                      )}
                      {plan.specifications.bedrooms && (
                        <span>{plan.specifications.bedrooms} Bedrooms</span>
                      )}
                      {plan.specifications.bathrooms && (
                        <span>{plan.specifications.bathrooms} Bathrooms</span>
                      )}
                    </div>
                  </div>

                  <div className={cn(
                    'text-right',
                    viewportSize === 'mobile' && 'text-left flex items-center justify-between'
                  )}>
                    <div className="text-lg font-semibold text-primary-600">
                      {plan.price}
                    </div>
                    {viewportSize !== 'mobile' && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm">
                          Like
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Grid and Cards view
    return (
      <div className={cn(
        'grid',
        viewMode === 'cards' && viewportSize === 'mobile' 
          ? 'grid-cols-1 gap-4'
          : gridConfig.columns,
        gridConfig.gap
      )}>
        {paginatedPlans.map((plan) => (
          <GalleryCard
            key={plan.id}
            image={{
              src: plan.images.thumbnail,
              alt: plan.title,
              aspectRatio: viewportSize === 'mobile' ? 'elevation' : 'plan',
            }}
            title={plan.title}
            subtitle={
              plan.specifications.area 
                ? `${plan.specifications.area} • ${plan.specifications.bedrooms}BR/${plan.specifications.bathrooms}BA`
                : undefined
            }
            tags={plan.tags.slice(0, viewportSize === 'mobile' ? 2 : 3)}
            price={plan.price}
            onCardClick={() => onPlanSelect?.(plan)}
            badges={[
              ...(plan.isPremium ? [{ text: 'Premium', variant: 'primary' as const }] : []),
              ...(plan.isNew ? [{ text: 'New', variant: 'success' as const }] : []),
            ]}
            className={cn(
              viewportSize === 'mobile' && viewMode === 'cards' && 'max-w-sm mx-auto'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Controls */}
      <div className="space-y-4">
        {renderViewModeControls()}
      </div>

      {/* Gallery Content */}
      {renderGalleryContent()}

      {/* Load More / Pagination */}
      {adaptiveLoading && hasMoreItems && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="px-8"
          >
            Load More Plans ({plans.length - paginatedPlans.length} remaining)
          </Button>
        </div>
      )}

      {/* Mobile-specific features */}
      {viewportSize === 'mobile' && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button
            variant="premium"
            size="lg"
            className="rounded-full shadow-xl"
          >
            <GridIcon className="h-5 w-5 mr-2" />
            Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export { ResponsiveGallery };