import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  HomeIcon, 
  BuildingIcon, 
  Building2Icon, 
  CastleIcon,
  TreesIcon,
  WavesIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Plan Categories',
  description: 'Explore our architectural plan categories including residential, commercial, and specialty designs.',
}

const categories = [
  {
    id: 'residential',
    name: 'Residential Plans',
    description: 'House plans, apartments, and residential developments',
    icon: HomeIcon,
    count: 2845,
    featured: true,
    subcategories: ['Single Family', 'Multi-Family', 'Tiny Homes', 'Luxury Estates']
  },
  {
    id: 'commercial',
    name: 'Commercial Buildings',
    description: 'Office buildings, retail spaces, and commercial complexes',
    icon: BuildingIcon,
    count: 1256,
    featured: true,
    subcategories: ['Office Buildings', 'Retail', 'Restaurants', 'Hotels']
  },
  {
    id: 'institutional',
    name: 'Institutional',
    description: 'Schools, hospitals, government buildings, and public spaces',
    icon: Building2Icon,
    count: 678,
    featured: false,
    subcategories: ['Schools', 'Healthcare', 'Government', 'Religious']
  },
  {
    id: 'historic',
    name: 'Historic & Traditional',
    description: 'Period-accurate designs and historic reproductions',
    icon: CastleIcon,
    count: 423,
    featured: false,
    subcategories: ['Victorian', 'Colonial', 'Craftsman', 'Art Deco']
  },
  {
    id: 'sustainable',
    name: 'Sustainable Design',
    description: 'Eco-friendly and energy-efficient architectural plans',
    icon: TreesIcon,
    count: 891,
    featured: true,
    subcategories: ['Net Zero', 'Passive House', 'LEED', 'Green Roofs']
  },
  {
    id: 'waterfront',
    name: 'Waterfront & Coastal',
    description: 'Plans designed for coastal and waterfront locations',
    icon: WavesIcon,
    count: 334,
    featured: false,
    subcategories: ['Beach Houses', 'Lake Homes', 'Marina', 'Flood Resistant']
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Plan Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive collection of architectural plans organized by category. 
              From residential homes to commercial buildings, find the perfect design for your project.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.filter(cat => cat.featured).map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} plans
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-foreground mb-2">Popular subcategories:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub) => (
                          <span 
                            key={sub}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Browse {category.name}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-200">
                  <div className="p-6 flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} plans available
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Browse →
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of licensed architects can create custom plans tailored to your specific needs. 
              Get a personalized design that matches your vision and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Request Custom Design
              </Button>
              <Button variant="outline" size="lg">
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}