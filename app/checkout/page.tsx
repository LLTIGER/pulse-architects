import { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import { CheckoutContent } from './components/CheckoutContent'

export const metadata: Metadata = {
  title: 'Checkout - Pulse Architects',
  description: 'Complete your purchase of architectural plans and blueprints.',
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Checkout
            </h1>
            <p className="text-dark/60 dark:text-white/60">
              Complete your purchase to download your architectural plans.
            </p>
          </div>

          <Suspense fallback={<CheckoutSkeleton />}>
            <CheckoutContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form skeleton */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3" />
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}