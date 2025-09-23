import ProfessionalHeader from '@/components/layout/ProfessionalHeader'
import ArchitecturalHero from '@/components/layout/ArchitecturalHero'
import CategoryGrid from '@/components/layout/CategoryGrid'
import FeaturedPlans from '@/components/layout/FeaturedPlans'
import ProfessionalFooter from '@/components/layout/ProfessionalFooter'
import { Shield, Download, FileText, Users, Award, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <ProfessionalHeader />

      {/* Hero Section */}
      <ArchitecturalHero />

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose 
              <span className="text-blue-600 dark:text-blue-400"> Pulse Architects?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional architectural plans with instant download, comprehensive documentation, and unmatched quality standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Professional Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All plans are created by licensed architects and comply with international building codes and safety standards.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Instant Download</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get your plans immediately after purchase with secure digital delivery and lifetime access to updates.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Complete Documentation</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Floor plans, elevations, sections, construction details, and material specifications all included.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                24/7 customer support and consultation with our team of experienced architects and designers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Award-Winning Designs</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our plans have won multiple architectural awards and have been featured in leading design publications.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Most plans are delivered within minutes of purchase, with custom modifications available within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <FeaturedPlans />

      {/* Categories */}
      <CategoryGrid />

      {/* Footer */}
      <ProfessionalFooter />
    </div>
  )
}