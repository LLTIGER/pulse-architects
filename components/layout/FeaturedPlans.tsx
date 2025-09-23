import Link from 'next/link'
import PlanCard from '../ecommerce/PlanCard'

// Mock data for featured plans - this will be replaced with real data from your database
const featuredPlans = [
  {
    id: '1',
    name: 'Modern Minimalist Villa',
    category: 'Residential',
    price: 4750,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    slug: 'modern-minimalist-villa',
    rating: 4.9,
    downloads: 234,
    featured: true,
    imageUrl: undefined // Will use placeholder
  },
  {
    id: '2',
    name: 'Contemporary Office Complex',
    category: 'Commercial',
    price: 12500,
    bedrooms: undefined,
    bathrooms: 8,
    area: 15000,
    slug: 'contemporary-office-complex',
    rating: 4.8,
    downloads: 156,
    featured: true
  },
  {
    id: '3',
    name: 'Luxury Family Estate',
    category: 'Residential',
    price: 8900,
    bedrooms: 6,
    bathrooms: 5,
    area: 5500,
    slug: 'luxury-family-estate',
    rating: 4.9,
    downloads: 298,
    featured: true
  },
  {
    id: '4',
    name: 'Eco-Friendly Townhouse',
    category: 'Residential',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    slug: 'eco-friendly-townhouse',
    rating: 4.7,
    downloads: 187,
    featured: true
  }
]

const FeaturedPlans: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Featured Plans
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Most Popular
            <span className="text-blue-600 dark:text-blue-400"> Designs</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our top-rated architectural plans, chosen by thousands of builders, architects, and homeowners worldwide.
          </p>
        </div>

        {/* Featured plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Stats section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Total Plans</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Downloads</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2k+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Link 
            href="/catalog"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Browse All Plans</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            New plans added weekly • Professional quality guaranteed
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPlans