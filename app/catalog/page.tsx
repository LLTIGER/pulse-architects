import { Metadata } from 'next'
import { Suspense } from 'react'
import { CatalogContent } from './components/CatalogContent'

export const metadata: Metadata = {
  title: 'Architectural Plans Catalog',
  description: 'Browse our complete collection of premium architectural plans, house designs, and blueprints.',
}

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Architectural Plans Catalog
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover premium house designs and blueprints for your next project
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductSkeleton />}>
          <CatalogContent />
        </Suspense>
      </main>
    </div>
  )
}

// Loading skeletons

function ProductSkeleton() {
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