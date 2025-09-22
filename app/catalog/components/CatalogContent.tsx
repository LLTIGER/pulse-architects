import { Suspense } from 'react'
import { ProductCatalog } from '@/components/ecommerce/ProductCatalog'
import { CategoryNavigation } from '@/components/navigation/CategoryNavigation'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  planCount?: number
  children?: Category[]
}

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

async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/categories?includeCount=true`, {
      cache: 'force-cache',
      next: { revalidate: 900 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function CatalogContent({ searchParams }: CatalogContentProps) {
  const categories = await fetchCategories()

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
        <CategoryNavigation categories={categories} />
      </section>

      {/* Product Catalog */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {searchParams?.category 
              ? `${categories.find(c => c.slug === searchParams.category)?.name || 'Category'} Plans`
              : 'All Architectural Plans'
            }
          </h2>
          {searchParams?.search && (
            <p className="text-muted-foreground">
              Search results for "{searchParams.search}"
            </p>
          )}
        </div>
        
        <Suspense fallback={<ProductCatalogSkeleton />}>
          <ProductCatalog 
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
      </section>
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