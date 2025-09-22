import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded" />
              <span className="text-xl font-bold">Pulse Architects</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/catalog" className="text-foreground hover:text-primary">
                Browse Plans
              </Link>
              <Link href="/categories" className="text-foreground hover:text-primary">
                Categories
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary">
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="text-foreground hover:text-primary"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Premium 
                <span className="text-primary"> Architectural Plans</span> 
                for Your Dream Project
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover thousands of professional house designs, blueprints, and architectural plans. 
                From modern homes to commercial buildings, find the perfect design for your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/catalog" 
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 text-center font-medium"
                >
                  Browse Plans
                </Link>
                <Link 
                  href="/custom-request" 
                  className="border border-border px-8 py-4 rounded-lg hover:bg-accent text-center font-medium"
                >
                  Request Custom Design
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary rounded-lg" />
                  </div>
                  <p className="text-muted-foreground">Hero Image Placeholder</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Will be replaced with architectural showcase
                  </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Pulse Architects?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional architectural plans with instant download and comprehensive documentation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold">Professional Quality</h3>
              <p className="text-muted-foreground">
                All plans are created by licensed architects and comply with building codes.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold">Instant Download</h3>
              <p className="text-muted-foreground">
                Get your plans immediately after purchase with secure digital delivery.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold">Complete Documentation</h3>
              <p className="text-muted-foreground">
                Floor plans, elevations, sections, and construction details included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-6 w-6 bg-primary rounded" />
              <span className="font-bold">Pulse Architects</span>
            </div>
            <p className="text-muted-foreground">
              © 2025 Pulse Architects. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}