'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Filter, 
  Home, 
  Building, 
  Warehouse, 
  TreePine, 
  Briefcase, 
  Building2,
  Search,
  X
} from 'lucide-react'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const categories = [
  { id: 'residential', name: 'Residential', icon: Home },
  { id: 'commercial', name: 'Commercial', icon: Building },
  { id: 'industrial', name: 'Industrial', icon: Warehouse },
  { id: 'office', name: 'Office', icon: Briefcase },
  { id: 'landscape', name: 'Landscape', icon: TreePine },
  { id: 'mixed-use', name: 'Mixed-Use', icon: Building2 }
]

const styles = [
  'Modern',
  'Traditional',
  'Contemporary',
  'Colonial',
  'Craftsman',
  'Mediterranean',
  'Victorian',
  'Ranch',
  'Farmhouse',
  'Industrial'
]

const priceRanges = [
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: '$1,000 - $2,500', min: 1000, max: 2500 },
  { label: '$2,500 - $5,000', min: 2500, max: 5000 },
  { label: '$5,000 - $10,000', min: 5000, max: 10000 },
  { label: 'Over $10,000', min: 10000, max: 999999 }
]

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value && value !== '') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Reset to page 1 when filters change
    params.delete('page')
    
    router.push(`/catalog?${params.toString()}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters('search', searchQuery)
  }

  const clearAllFilters = () => {
    router.push('/catalog')
    setSearchQuery('')
  }

  const activeFiltersCount = Array.from(searchParams.entries()).length

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-white dark:bg-gray-800 
        shadow-lg lg:shadow-none border-r border-gray-200 dark:border-gray-700 
        transform transition-transform duration-300 z-50 lg:z-0 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter size={20} />
              Filters
            </h3>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Clear filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="w-full mb-6 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters ({activeFiltersCount})
            </button>
          )}

          {/* Search */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Search Plans
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, style..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Category
            </label>
            <div className="space-y-2">
              {categories.map((category) => {
                const IconComponent = category.icon
                const isActive = searchParams.get('category') === category.id
                
                return (
                  <button
                    key={category.id}
                    onClick={() => updateFilters('category', isActive ? null : category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <IconComponent size={18} />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Style */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Architectural Style
            </label>
            <select
              value={searchParams.get('style') || ''}
              onChange={(e) => updateFilters('style', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Styles</option>
              {styles.map((style) => (
                <option key={style} value={style.toLowerCase()}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Bedrooms
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={searchParams.get('minBedrooms') || ''}
                onChange={(e) => updateFilters('minBedrooms', e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Min</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
              <select
                value={searchParams.get('maxBedrooms') || ''}
                onChange={(e) => updateFilters('maxBedrooms', e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Max</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Price Range
            </label>
            <div className="space-y-2">
              {priceRanges.map((range) => {
                const isActive = 
                  searchParams.get('minPrice') === range.min.toString() && 
                  searchParams.get('maxPrice') === range.max.toString()
                
                return (
                  <button
                    key={range.label}
                    onClick={() => {
                      if (isActive) {
                        updateFilters('minPrice', null)
                        updateFilters('maxPrice', null)
                      } else {
                        updateFilters('minPrice', range.min.toString())
                        updateFilters('maxPrice', range.max.toString())
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {range.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Sort By
            </label>
            <select
              value={searchParams.get('sortBy') || 'newest'}
              onChange={(e) => updateFilters('sortBy', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar