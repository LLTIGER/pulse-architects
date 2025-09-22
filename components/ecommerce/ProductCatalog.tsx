'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { ArchitecturalGallery, type ArchitecturalPlan } from '@/components/gallery/ArchitecturalGallery';
import { 
  LayersIcon,
  SearchIcon,
} from 'lucide-react';

export interface FilterCategory {
  id: string;
  name: string;
  options: Array<{
    id: string;
    label: string;
    count: number;
  }>;
}

export interface ProductCatalogFilters {
  category?: string;
  style?: string;
  minBedrooms?: number;
  maxBedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  page?: number;
}

export interface ProductCatalogProps {
  filters?: ProductCatalogFilters;
  onPlanSelect?: (plan: ArchitecturalPlan) => void;
  onAddToCart?: (planId: string) => void;
  onToggleWishlist?: (planId: string) => void;
  className?: string;
}

interface PlanResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  images: {
    thumbnail: string;
    fullSize: string;
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    floors: number;
    garage: boolean;
    style: string;
  };
  price: string;
  isPremium: boolean;
  isNew: boolean;
  downloads: number;
  likes: number;
  rating: number;
  createdAt: string;
}

interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PlansApiResponse {
  plans: PlanResponse[];
  pagination: PaginationResponse;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  filters = {},
  onPlanSelect,
  onAddToCart,
  onToggleWishlist,
  className,
}) => {
  const [plans, setPlans] = useState<ArchitecturalPlan[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [localFilters, setLocalFilters] = useState(filters);

  // Fetch plans data
  const fetchPlans = useCallback(async (currentFilters: ProductCatalogFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
      // Add filters to params
      if (currentFilters.category) params.set('category', currentFilters.category);
      if (currentFilters.style) params.set('style', currentFilters.style);
      if (currentFilters.minBedrooms) params.set('minBedrooms', currentFilters.minBedrooms.toString());
      if (currentFilters.maxBedrooms) params.set('maxBedrooms', currentFilters.maxBedrooms.toString());
      if (currentFilters.minPrice) params.set('minPrice', currentFilters.minPrice.toString());
      if (currentFilters.maxPrice) params.set('maxPrice', currentFilters.maxPrice.toString());
      if (currentFilters.search) params.set('search', currentFilters.search);
      if (currentFilters.sortBy) params.set('sortBy', currentFilters.sortBy);
      if (currentFilters.page) params.set('page', currentFilters.page.toString());
      
      const response = await fetch(`/api/plans?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      
      const data: PlansApiResponse = await response.json();
      
      // Transform API response to ArchitecturalPlan format
      const transformedPlans: ArchitecturalPlan[] = data.plans.map(plan => ({
        id: plan.id,
        title: plan.title,
        description: plan.description,
        images: {
          thumbnail: plan.images.thumbnail,
          fullSize: plan.images.fullSize
        },
        category: plan.category,
        tags: plan.tags,
        specifications: plan.specifications,
        price: plan.price,
        isPremium: plan.isPremium,
        isNew: plan.isNew,
        downloads: plan.downloads,
        likes: plan.likes,
        rating: plan.rating,
        aspectRatio: 'square' as const,
        createdAt: plan.createdAt
      }));
      
      setPlans(transformedPlans);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when filters change
  useEffect(() => {
    fetchPlans(localFilters);
  }, [fetchPlans, localFilters]);

  // Handle search
  const handleSearch = useCallback((searchValue: string) => {
    setSearchTerm(searchValue);
    setLocalFilters(prev => ({
      ...prev,
      search: searchValue,
      page: 1 // Reset to first page on new search
    }));
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sortBy: string) => {
    setLocalFilters(prev => ({
      ...prev,
      sortBy,
      page: 1
    }));
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    setLocalFilters(prev => ({
      ...prev,
      page
    }));
  }, []);

  if (loading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="h-8 bg-muted rounded animate-pulse w-64" />
          <div className="h-10 bg-muted rounded animate-pulse w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-muted rounded-lg animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
              <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-16', className)}>
        <LayersIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Failed to load plans</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => fetchPlans(localFilters)} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search architectural plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={localFilters.sortBy || 'newest'}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
          
          <Button
            variant="outline"
            onClick={() => handleSearch(searchTerm)}
            disabled={loading}
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {pagination ? `${pagination.total} plans found` : `${plans.length} plans`}
          {localFilters.search && ` for "${localFilters.search}"`}
        </p>
        
        {pagination && pagination.totalPages > 1 && (
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </span>
        )}
      </div>

      {/* Plans Gallery */}
      {plans.length > 0 ? (
        <ArchitecturalGallery
          plans={plans}
          onPlanSelect={onPlanSelect}
          onPlanLike={onToggleWishlist}
          onPlanDownload={onAddToCart}
          showFilters={false}
        />
      ) : (
        <div className="text-center py-16">
          <LayersIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No plans found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {localFilters.search
              ? `No plans match your search for "${localFilters.search}". Try different keywords.`
              : 'No architectural plans are currently available. Check back later!'
            }
          </p>
          {localFilters.search && (
            <Button 
              onClick={() => handleSearch('')} 
              variant="outline"
            >
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPreviousPage || loading}
          >
            Previous
          </Button>
          
          <span className="px-4 py-2 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage || loading}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export { ProductCatalog };