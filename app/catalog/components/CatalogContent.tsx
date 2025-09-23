'use client'

import { useState, Suspense } from 'react'
import { Filter, Grid3X3, List } from 'lucide-react'
import FilterSidebar from '@/components/catalog/FilterSidebar'
import { ProductCatalog } from '@/components/ecommerce/ProductCatalog'

interface CatalogContentProps {
  searchParams?: {
    category?: string
    style?: string
    minBedrooms?: string
    maxBedrooms?: string
    minPrice?: string
    maxPrice?: string
    search?: string
    sortBy?: string
    page?: string
  }
}

export function CatalogContent({ searchParams }: CatalogContentProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const getActiveFiltersCount = () => {
    if (!searchParams) return 0
    return Object.values(searchParams).filter(value => value && value !== '').length
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="flex gap-8">
      {/* Filter Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <FilterSidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile filter trigger and view controls */}
        <div className="flex items-center justify-between mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter size={20} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Results count */}
            <div className="text-gray-600 dark:text-gray-400">
              {searchParams?.search && (
                <p className="text-sm">
                  Search results for <span className="font-medium">"{searchParams.search}"</span>
                </p>
              )}
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Grid3X3 size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <List size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<ProductCatalogSkeleton />}>
          <ProductCatalog 
            viewMode={viewMode}
            filters={{
              category: searchParams?.category,
              style: searchParams?.style,
              minBedrooms: searchParams?.minBedrooms ? parseInt(searchParams.minBedrooms) : undefined,
              maxBedrooms: searchParams?.maxBedrooms ? parseInt(searchParams.maxBedrooms) : undefined,
              minPrice: searchParams?.minPrice ? parseFloat(searchParams.minPrice) : undefined,
              maxPrice: searchParams?.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
              search: searchParams?.search,
              sortBy: searchParams?.sortBy || 'newest',
              page: searchParams?.page ? parseInt(searchParams.page) : 1
            }}
          />
        </Suspense>
      </div>

      {/* Mobile filter sidebar */}
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  )
}

function ProductCatalogSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filter bar skeleton */}
      <div className="h-12 bg-muted rounded animate-pulse" />
      
      {/* Product grid skeleton */}
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
  )
}