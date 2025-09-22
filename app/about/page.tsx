import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  AwardIcon, 
  UsersIcon, 
  BuildingIcon, 
  ClockIcon,
  CheckCircleIcon,
  StarIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Pulse Architects and our mission to provide premium architectural plans and design services.',
}

const stats = [
  { label: 'Plans Available', value: '5,000+', icon: BuildingIcon },
  { label: 'Years of Experience', value: '25+', icon: ClockIcon },
  { label: 'Licensed Architects', value: '50+', icon: UsersIcon },
  { label: 'Awards Won', value: '100+', icon: AwardIcon },
]

const features = [
  {
    title: 'Licensed Professionals',
    description: 'All our plans are designed by licensed architects with decades of experience in residential and commercial design.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Code Compliant',
    description: 'Every plan meets current building codes and standards, ensuring smooth approval and construction processes.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Comprehensive Documentation',
    description: 'Complete sets include floor plans, elevations, sections, details, and specifications needed for construction.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Instant Download',
    description: 'Get your plans immediately after purchase with secure digital delivery and lifetime access.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Custom Modifications',
    description: 'Need changes? Our team can modify existing plans or create completely custom designs for your project.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Expert Support',
    description: '24/7 customer support from our team of architectural professionals to help with any questions.',
    icon: CheckCircleIcon,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Designing Dreams into Reality
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              For over 25 years, Pulse Architects has been the trusted source for premium 
              architectural plans. We combine innovative design with practical functionality 
              to create blueprints that inspire and endure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Browse Our Plans
              </Button>
              <Button variant="outline" size="lg">
                Request Custom Design
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We believe that exceptional architecture should be accessible to everyone. 
                  Our mission is to democratize great design by providing professionally 
                  crafted architectural plans that combine aesthetic excellence with 
                  practical functionality.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Every plan in our collection is meticulously designed by licensed 
                  architects who understand the importance of both form and function. 
                  We're committed to helping builders, developers, and homeowners 
                  bring their vision to life with confidence.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    4.9/5 from 10,000+ satisfied customers
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <BuildingIcon className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Mission Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Pulse Architects?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We set the standard for architectural plan quality, service, and innovation. 
              Here's what makes us different.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 h-full">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced team of architects and designers brings decades of expertise 
              to every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Sarah Johnson', role: 'Principal Architect', experience: '20+ years' },
              { name: 'Michael Chen', role: 'Design Director', experience: '18+ years' },
              { name: 'Emily Rodriguez', role: 'Sustainable Design Lead', experience: '15+ years' },
            ].map((member) => (
              <Card key={member.name} className="text-center p-6">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.experience} experience</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have brought their vision to life 
            with our premium architectural plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Browse Plans
            </Button>
            <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}