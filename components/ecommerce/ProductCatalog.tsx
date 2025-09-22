'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ArchitecturalGallery, type ArchitecturalPlan } from '@/components/gallery/ArchitecturalGallery';
import { 
  FilterIcon, 
  XIcon, 
  ChevronDownIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  TrendingUpIcon,
  TagIcon,
  HomeIcon,
  LayersIcon,
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

export interface ProductCatalogProps {
  plans: ArchitecturalPlan[];
  categories: FilterCategory[];
  onPlanSelect?: (plan: ArchitecturalPlan) => void;
  onAddToCart?: (planId: string) => void;
  onToggleWishlist?: (planId: string) => void;
  className?: string;
}

interface ActiveFilters {
  [categoryId: string]: string[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  plans,
  categories,
  onPlanSelect,
  onAddToCart,
  onToggleWishlist,
  className,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map(cat => cat.id))
  );

  // Calculate price range from plans
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = plans.map(plan => parseFloat(plan.price.replace(/[^0-9.]/g, '')));
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [plans]);

  // Filter plans based on active filters
  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      // Price filter
      const planPrice = parseFloat(plan.price.replace(/[^0-9.]/g, ''));
      if (planPrice < priceRange[0] || planPrice > priceRange[1]) {
        return false;
      }

      // Category filters
      for (const [categoryId, selectedOptions] of Object.entries(activeFilters)) {
        if (selectedOptions.length === 0) continue;

        const categoryMatches = selectedOptions.some(option => {
          switch (categoryId) {
            case 'style':
              return plan.specifications.style === option;
            case 'bedrooms':
              return plan.specifications.bedrooms?.toString() === option;
            case 'bathrooms':
              return plan.specifications.bathrooms?.toString() === option;
            case 'floors':
              return plan.specifications.floors?.toString() === option;
            case 'category':
              return plan.category === option;
            case 'tags':
              return plan.tags.includes(option);
            case 'type':
              if (option === 'premium') return plan.isPremium;
              if (option === 'new') return plan.isNew;
              return true;
            default:
              return true;
          }
        });

        if (!categoryMatches) return false;
      }

      return true;
    });
  }, [plans, activeFilters, priceRange]);

  // Handle filter changes
  const handleFilterChange = useCallback((categoryId: string, optionId: string, checked: boolean) => {
    setActiveFilters(prev => {
      const current = prev[categoryId] || [];
      const updated = checked
        ? [...current, optionId]
        : current.filter(id => id !== optionId);
      
      return {
        ...prev,
        [categoryId]: updated,
      };
    });
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setActiveFilters({});
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Toggle category expansion
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).reduce((count, options) => count + options.length, 0);
  }, [activeFilters]);

  return (
    <div className={cn('flex flex-col lg:flex-row gap-8', className)}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
          <ChevronDownIcon 
            className={cn(
              'h-4 w-4 transition-transform',
              showFilters && 'rotate-180'
            )} 
          />
        </Button>
      </div>

      {/* Filters Sidebar */}
      <div className={cn(
        'w-full lg:w-80 flex-shrink-0',
        'lg:block',
        showFilters ? 'block' : 'hidden'
      )}>
        <Card className="sticky top-8">
          <CardHeader 
            title="Filters"
            action={
              activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary-600"
                >
                  Clear All
                </Button>
              )
            }
          />
          
          <CardContent className="space-y-6">
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-medium text-neutral-900 dark:text-white">
                Price Range
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="absolute w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Filter Categories */}
            {categories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const selectedOptions = activeFilters[category.id] || [];

              return (
                <div key={category.id} className="space-y-3">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="font-medium text-neutral-900 dark:text-white">
                      {category.name}
                      {selectedOptions.length > 0 && (
                        <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          {selectedOptions.length}
                        </span>
                      )}
                    </h3>
                    <ChevronDownIcon 
                      className={cn(
                        'h-4 w-4 transition-transform text-neutral-400',
                        isExpanded && 'rotate-180'
                      )} 
                    />
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {category.options.map((option) => {
                        const isSelected = selectedOptions.includes(option.id);
                        
                        return (
                          <label
                            key={option.id}
                            className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800"
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleFilterChange(category.id, option.id, e.target.checked)}
                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                              />
                              <span className="ml-3 text-sm text-neutral-700 dark:text-neutral-300">
                                {option.label}
                              </span>
                            </div>
                            <span className="text-xs text-neutral-400">
                              {option.count}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Filters */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
                Quick Filters
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'new', label: 'New Plans', icon: StarIcon },
                  { id: 'premium', label: 'Premium', icon: TrendingUpIcon },
                  { id: 'popular', label: 'Popular', icon: HomeIcon },
                ].map((filter) => {
                  const Icon = filter.icon;
                  const isActive = activeFilters['type']?.includes(filter.id);
                  
                  return (
                    <Button
                      key={filter.id}
                      variant={isActive ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('type', filter.id, !isActive)}
                      className="text-xs"
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Architectural Plans
            </h2>
            <p className="text-neutral-500 mt-1">
              {filteredPlans.length} plans available
            </p>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-neutral-500">Active filters:</span>
              {Object.entries(activeFilters).map(([categoryId, options]) =>
                options.map(option => {
                  const category = categories.find(cat => cat.id === categoryId);
                  const optionLabel = category?.options.find(opt => opt.id === option)?.label || option;
                  
                  return (
                    <Button
                      key={`${categoryId}-${option}`}
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange(categoryId, option, false)}
                      className="text-xs"
                    >
                      {optionLabel}
                      <XIcon className="h-3 w-3 ml-1" />
                    </Button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Gallery */}
        <ArchitecturalGallery
          plans={filteredPlans}
          onPlanSelect={onPlanSelect}
          onPlanLike={onToggleWishlist}
          onPlanDownload={onAddToCart}
          showFilters={false}
        />

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-16">
            <LayersIcon className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              No plans match your criteria
            </h3>
            <p className="text-neutral-500 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to find the perfect architectural plan for your project.
            </p>
            <Button onClick={clearFilters} variant="primary">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { ProductCatalog };