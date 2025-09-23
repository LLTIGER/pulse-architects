import Link from 'next/link'
import { ArrowRight, Bed, Bath, Maximize, Download, Star } from 'lucide-react'

interface PlanCardProps {
  plan: {
    id: string
    name: string
    category: string
    price: number
    bedrooms?: number
    bathrooms?: number
    area: number
    imageUrl?: string
    slug: string
    rating?: number
    downloads?: number
    featured?: boolean
  }
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const { 
    name, 
    category, 
    price, 
    bedrooms, 
    bathrooms, 
    area, 
    slug, 
    imageUrl,
    rating = 4.8,
    downloads = 0,
    featured = false
  } = plan

  return (
    <div className="relative">
      <div className='relative rounded-2xl border border-gray-200 dark:border-gray-700 group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-white dark:bg-gray-800'>
        {featured && (
          <div className="absolute -top-3 left-4 z-10">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              FEATURED
            </span>
          </div>
        )}
        
        <div className='overflow-hidden rounded-t-2xl relative'>
          <Link href={`/catalog/${slug}`}>
            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-8 0H3m2 0h6M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Architectural Plan</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          </Link>
          <div className='absolute top-6 right-6 p-3 bg-white dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg'>
            <ArrowRight size={20} className='text-blue-600' />
          </div>
          
          {/* Rating badge */}
          <div className="absolute top-6 left-6 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{rating}</span>
          </div>
        </div>
        
        <div className='p-6'>
          <div className='flex flex-col gap-4 mb-6'>
            <div>
              <Link href={`/catalog/${slug}`}>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2'>
                  {name}
                </h3>
              </Link>
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400 mt-1'>
                {category}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  ${price.toLocaleString()}
                </span>
                {downloads > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Download size={12} />
                    {downloads}
                  </span>
                )}
              </div>
              <button className='text-sm font-medium text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors'>
                View Details
              </button>
            </div>
          </div>
          
          {/* Plan details */}
          <div className='flex items-center divide-x divide-gray-200 dark:divide-gray-700'>
            {bedrooms && (
              <div className='flex flex-col items-center gap-2 pr-4 xs:pr-6 flex-1'>
                <Bed size={20} className="text-gray-400" />
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {bedrooms} Bed{bedrooms !== 1 ? 's' : ''}
                </p>
              </div>
            )}
            
            {bathrooms && (
              <div className='flex flex-col items-center gap-2 px-4 xs:px-6 flex-1'>
                <Bath size={20} className="text-gray-400" />
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {bathrooms} Bath{bathrooms !== 1 ? 's' : ''}
                </p>
              </div>
            )}
            
            <div className='flex flex-col items-center gap-2 pl-4 xs:pl-6 flex-1'>
              <Maximize size={20} className="text-gray-400" />
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                {area.toLocaleString()} sq ft
              </p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            <Link 
              href={`/catalog/${slug}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-medium transition-colors"
            >
              View Plan
            </Link>
            <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanCard