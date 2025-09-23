import Hero from '@/components/home/Hero'
import EverythingAboutSection from '@/components/home/EverythingAboutSection'
import PropertyCategoriesSection from '@/components/home/PropertyCategoriesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import LuxuryDesignSection from '@/components/home/LuxuryDesignSection'
import AboutHomesSection from '@/components/home/AboutHomesSection'
import { Shield, Download, FileText, Users, Award, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Property Categories Section */}
      <PropertyCategoriesSection />

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-5 max-w-8xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6">
              Why Choose 
              <span className="text-primary"> Pulse Architects?</span>
            </h2>
            <p className="text-xm text-dark/60 dark:text-white/60 max-w-3xl mx-auto">
              Professional architectural plans with instant download, comprehensive documentation, and unmatched quality standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Professional Quality</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                All plans are created by licensed architects and comply with international building codes and safety standards.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Instant Download</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                Get your plans immediately after purchase with secure digital delivery and lifetime access to updates.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Complete Documentation</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                Floor plans, elevations, sections, construction details, and material specifications all included.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Expert Support</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                24/7 customer support and consultation with our team of experienced architects and designers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Award-Winning Designs</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                Our plans have won multiple architectural awards and have been featured in leading design publications.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Fast Delivery</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                Most plans are delivered within minutes of purchase, with custom modifications available within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Design Section */}
      <LuxuryDesignSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Preview Section */}
      <BlogPreviewSection />

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-skyblue via-lightskyblue to-white/10 dark:to-dark/10">
        <div className="container mx-auto px-5 max-w-8xl text-center">
          <h2 className="text-4xl md:text-52 font-semibold text-white dark:text-dark mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xm text-white/80 dark:text-dark/80 max-w-2xl mx-auto mb-8">
            Browse our extensive collection of premium architectural plans and find the perfect design for your next project.
          </p>
          <div className='flex flex-col xs:flex-row justify-center gap-4'>
            <button className='btn-homely-primary'>
              Browse Catalog
            </button>
            <button className='btn-homely-secondary'>
              Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Everything About Pulse Architects Section */}
      <EverythingAboutSection />

      {/* About Our Homes Section */}
      <AboutHomesSection />
    </div>
  )
}