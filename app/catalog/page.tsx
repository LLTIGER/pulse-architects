import { Metadata } from 'next'
import { Suspense } from 'react'
import ProfessionalHeader from '@/components/layout/ProfessionalHeader'
import ProfessionalFooter from '@/components/layout/ProfessionalFooter'
import { CatalogContent } from './components/CatalogContent'

export const metadata: Metadata = {
  title: 'Architectural Plans Catalog',
  description: 'Browse our complete collection of premium architectural plans, house designs, and blueprints.',
}

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <ProfessionalHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Architectural Plans
              <span className="block text-blue-200">Catalog</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our complete collection of premium architectural plans, house designs, and blueprints. 
              From modern homes to commercial buildings, find the perfect design for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <Suspense fallback={<ProductSkeleton />}>
          <CatalogContent />
        </Suspense>
      </main>

      {/* Footer */}
      <ProfessionalFooter />
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