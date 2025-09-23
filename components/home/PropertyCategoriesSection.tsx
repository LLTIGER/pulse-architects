import Link from 'next/link'
import Image from 'next/image'

const PropertyCategoriesSection = () => {
  const propertyTypes = [
    {
      id: 1,
      title: 'Villa',
      image: '/images/categories/villas.jpg',
      description: 'Luxury villas with premium amenities',
      link: '/catalog?category=villa'
    },
    {
      id: 2,
      title: 'Apartments',
      image: '/images/categories/appartment.jpg',
      description: 'Modern apartment complexes',
      link: '/catalog?category=apartment'
    },
    {
      id: 3,
      title: 'Office Space',
      image: '/images/categories/office.jpg',
      description: 'Commercial office buildings',
      link: '/catalog?category=office'
    },
    {
      id: 4,
      title: 'Residential',
      image: '/images/categories/luxury-villa.jpg',
      description: 'Family homes and residences',
      link: '/catalog?category=residential'
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark/50">
      <div className="container mx-auto px-5 max-w-8xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6">
            Explore Best 
            <span className="text-primary"> Properties</span> with Expert Services
          </h2>
          <p className="text-xm text-dark/60 dark:text-white/60 max-w-3xl mx-auto mb-8">
            Discover our comprehensive collection of architectural plans across different property types, 
            each designed with precision and attention to detail.
          </p>
          <Link href="/catalog">
            <button className="btn-homely-primary">
              View Properties
            </button>
          </Link>
        </div>

        {/* Property Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {propertyTypes.map((property) => (
            <Link 
              key={property.id} 
              href={property.link}
              className="group block"
            >
              <div className="bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-3xl hover:shadow-auth transition-all duration-300 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {property.title}
                  </h3>
                  <p className="text-sm text-dark/60 dark:text-white/60">
                    {property.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertyCategoriesSection