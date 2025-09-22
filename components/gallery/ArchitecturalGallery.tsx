'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { GalleryCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ImageViewer } from '@/components/ui/ImageViewer';
import { 
  GridIcon, 
  ListIcon, 
  FilterIcon, 
  SearchIcon,
  HeartIcon,
  DownloadIcon,
  EyeIcon,
  LayersIcon,
} from 'lucide-react';

export interface ArchitecturalPlan {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: {
    thumbnail: string;
    fullSize: string;
    blueprint?: string;
    elevation?: string;
    floorPlan?: string;
    render3D?: string;
  };
  specifications: {
    bedrooms?: number;
    bathrooms?: number;
    area?: string;
    floors?: number;
    garage?: boolean;
    style?: string;
  };
  price: string;
  isPremium: boolean;
  isNew: boolean;
  downloads: number;
  likes: number;
  rating: number;
  architect?: string;
  createdAt: string;
}

interface ArchitecturalGalleryProps {
  plans: ArchitecturalPlan[];
  viewMode?: 'grid' | 'list';
  showFilters?: boolean;
  allowSelection?: boolean;
  onPlanSelect?: (plan: ArchitecturalPlan) => void;
  onPlanLike?: (planId: string) => void;
  onPlanDownload?: (planId: string) => void;
  className?: string;
}

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'popular' | 'rating';
type FilterOption = {
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  style?: string;
  priceRange?: [number, number];
  isPremium?: boolean;
};

const ArchitecturalGallery: React.FC<ArchitecturalGalleryProps> = ({
  plans,
  viewMode: initialViewMode = 'grid',
  showFilters = true,
  allowSelection = true,
  onPlanSelect,
  onPlanLike,
  onPlanDownload,
  className,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode);
  const [selectedPlan, setSelectedPlan] = useState<ArchitecturalPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters] = useState<FilterOption>({});
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedPlans, setLikedPlans] = useState<Set<string>>(new Set());

  // Filter and sort plans
  const filteredAndSortedPlans = useMemo(() => {
    let filtered = plans.filter(plan => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchFields = [
          plan.title,
          plan.description,
          plan.category,
          plan.architect,
          ...plan.tags,
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(query)) return false;
      }

      // Category filter
      if (filters.category && plan.category !== filters.category) return false;

      // Specifications filters
      if (filters.bedrooms && plan.specifications.bedrooms !== filters.bedrooms) return false;
      if (filters.bathrooms && plan.specifications.bathrooms !== filters.bathrooms) return false;
      if (filters.style && plan.specifications.style !== filters.style) return false;
      if (filters.isPremium !== undefined && plan.isPremium !== filters.isPremium) return false;

      return true;
    });

    // Sort plans
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [plans, searchQuery, sortBy, filters]);

  // Handle plan selection
  const handlePlanClick = useCallback((plan: ArchitecturalPlan) => {
    setSelectedPlan(plan);
    if (allowSelection && onPlanSelect) {
      onPlanSelect(plan);
    }
  }, [allowSelection, onPlanSelect]);

  // Handle image viewing
  const handleImageClick = useCallback((plan: ArchitecturalPlan, imageType: string = 'fullSize') => {
    const images = Object.entries(plan.images).filter(([key, value]) => value && key !== 'thumbnail');
    const imageIndex = images.findIndex(([key]) => key === imageType);
    setCurrentImageIndex(imageIndex >= 0 ? imageIndex : 0);
    setSelectedPlan(plan);
    setShowImageViewer(true);
  }, []);

  // Handle like toggle
  const handleLike = useCallback((planId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedPlans = new Set(likedPlans);
    if (likedPlans.has(planId)) {
      newLikedPlans.delete(planId);
    } else {
      newLikedPlans.add(planId);
    }
    setLikedPlans(newLikedPlans);
    onPlanLike?.(planId);
  }, [likedPlans, onPlanLike]);

  // Handle download
  const handleDownload = useCallback((planId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onPlanDownload?.(planId);
  }, [onPlanDownload]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search architectural plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'dark:border-neutral-800 dark:bg-neutral-900 dark:text-white'
            )}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className={cn(
              'px-3 py-2 border border-neutral-200 rounded-lg text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'dark:border-neutral-800 dark:bg-neutral-900 dark:text-white'
            )}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* View Mode Toggle */}
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
              className="rounded-l-none"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-neutral-500">
        Showing {filteredAndSortedPlans.length} of {plans.length} plans
      </div>

      {/* Gallery */}
      {viewMode === 'grid' ? (
        <div className={cn(
          'grid gap-6',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        )}>
          {filteredAndSortedPlans.map((plan) => (
            <GalleryCard
              key={plan.id}
              image={{
                src: plan.images.thumbnail,
                alt: plan.title,
                aspectRatio: 'plan',
              }}
              title={plan.title}
              subtitle={plan.specifications.area ? `${plan.specifications.area} • ${plan.specifications.bedrooms}BR/${plan.specifications.bathrooms}BA` : undefined}
              tags={plan.tags.slice(0, 3)}
              price={plan.price}
              onImageClick={() => handleImageClick(plan)}
              onCardClick={() => handlePlanClick(plan)}
              badges={[
                ...(plan.isPremium ? [{ text: 'Premium', variant: 'primary' as const }] : []),
                ...(plan.isNew ? [{ text: 'New', variant: 'success' as const }] : []),
              ]}
              overlay={
                <div className="flex items-center space-x-2">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => handleLike(plan.id, e)}
                  >
                    <HeartIcon 
                      className={cn(
                        'h-4 w-4',
                        likedPlans.has(plan.id) ? 'fill-red-500 text-red-500' : 'text-white'
                      )} 
                    />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => handleImageClick(plan)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => handleDownload(plan.id, e)}
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'flex items-center gap-6 p-6 bg-white rounded-xl border border-neutral-200',
                'hover:shadow-lg transition-shadow cursor-pointer',
                'dark:bg-neutral-900 dark:border-neutral-800'
              )}
              onClick={() => handlePlanClick(plan)}
            >
              {/* Thumbnail */}
              <div className="w-32 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                <img
                  src={plan.images.thumbnail}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
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
                      {plan.architect && (
                        <span>by {plan.architect}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary-600">
                      {plan.price}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleLike(plan.id, e)}
                      >
                        <HeartIcon 
                          className={cn(
                            'h-4 w-4',
                            likedPlans.has(plan.id) ? 'fill-red-500 text-red-500' : ''
                          )} 
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDownload(plan.id, e)}
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Viewer Modal */}
      {showImageViewer && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <ImageViewer
            src={Object.values(selectedPlan.images)[currentImageIndex + 1]} // Skip thumbnail
            alt={selectedPlan.title}
            title={selectedPlan.title}
            description={selectedPlan.description}
            onClose={() => setShowImageViewer(false)}
            allowDownload={true}
            metadata={{
              type: Object.keys(selectedPlan.images)[currentImageIndex + 1],
              category: selectedPlan.category,
            }}
          />
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedPlans.length === 0 && (
        <div className="text-center py-12">
          <LayersIcon className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            No plans found
          </h3>
          <p className="text-neutral-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export { ArchitecturalGallery };
