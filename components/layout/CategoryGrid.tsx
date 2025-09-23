import Link from 'next/link'
import { Building2, Home, Building, Warehouse, TreePine, Briefcase } from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  planCount: number
  icon: string
  slug: string
  featured?: boolean
}

const categoryIcons = {
  residential: Home,
  commercial: Building,
  industrial: Warehouse,
  landscape: TreePine,
  office: Briefcase,
  mixed: Building2
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Residential Plans',
    description: 'Modern homes, traditional houses, and luxury residences',
    planCount: 245,
    icon: 'residential',
    slug: 'residential',
    featured: true
  },
  {
    id: '2',
    name: 'Commercial Buildings',
    description: 'Office buildings, retail spaces, and mixed-use developments',
    planCount: 89,
    icon: 'commercial',
    slug: 'commercial'
  },
  {
    id: '3',
    name: 'Industrial Facilities',
    description: 'Warehouses, factories, and manufacturing facilities',
    planCount: 34,
    icon: 'industrial',
    slug: 'industrial'
  },
  {
    id: '4',
    name: 'Office Spaces',
    description: 'Modern offices, co-working spaces, and corporate headquarters',
    planCount: 67,
    icon: 'office',
    slug: 'office'
  },
  {
    id: '5',
    name: 'Landscape Design',
    description: 'Garden layouts, park designs, and outdoor spaces',
    planCount: 45,
    icon: 'landscape',
    slug: 'landscape'
  },
  {
    id: '6',
    name: 'Mixed-Use',
    description: 'Combined residential and commercial developments',
    planCount: 28,
    icon: 'mixed',
    slug: 'mixed-use'
  }
]

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Our
            <span className="text-blue-600 dark:text-blue-400"> Categories</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From residential homes to commercial complexes, find the perfect architectural plan for your project type.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons]
            
            return (
              <Link 
                key={category.id}
                href={`/catalog?category=${category.slug}`}
                className="group"
              >
                <div className={`relative p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  category.featured 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' 
                    : 'bg-white dark:bg-gray-800 hover:shadow-blue-500/10'
                }`}>
                  {category.featured && (
                    <div className="absolute -top-3 -right-3">
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    category.featured 
                      ? 'bg-white/20' 
                      : 'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50'
                  } transition-colors duration-300`}>
                    <IconComponent 
                      size={32} 
                      className={
                        category.featured 
                          ? 'text-white' 
                          : 'text-blue-600 dark:text-blue-400'
                      } 
                    />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-3 ${
                    category.featured 
                      ? 'text-white' 
                      : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  } transition-colors duration-300`}>
                    {category.name}
                  </h3>
                  
                  <p className={`text-base mb-6 leading-relaxed ${
                    category.featured 
                      ? 'text-blue-100' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-medium ${
                      category.featured 
                        ? 'text-blue-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {category.planCount} plans available
                    </div>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      category.featured 
                        ? 'bg-white/20 group-hover:bg-white/30' 
                        : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-600 group-hover:text-white'
                    }`}>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/categories"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid