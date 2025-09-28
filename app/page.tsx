'use client'
import Hero from '@/components/home/Hero'
import EverythingAboutSection from '@/components/home/EverythingAboutSection'
import PropertyCategoriesSection from '@/components/home/PropertyCategoriesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import LuxuryDesignSection from '@/components/home/LuxuryDesignSection'
import AboutHomesSection from '@/components/home/AboutHomesSection'
import { Shield, Download, FileText, Users, Award, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const tFeatures = useTranslations('features')
  const tCta = useTranslations('cta')
  
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
              {tFeatures('title')}
              <span className="text-primary"> {tFeatures('titleHighlight')}</span>
            </h2>
            <p className="text-xm text-dark/60 dark:text-white/60 max-w-3xl mx-auto">
              {tFeatures('description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{tFeatures('quality.title')}</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                {tFeatures('quality.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{tFeatures('instant.title')}</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                {tFeatures('instant.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{tFeatures('documentation.title')}</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                {tFeatures('documentation.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{tFeatures('support.title')}</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                {tFeatures('support.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{tFeatures('awards.title')}</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                {tFeatures('awards.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-8 rounded-2xl shadow-3xl hover:shadow-auth transition-shadow duration-300 border border-gray-100 dark:border-white/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{tFeatures('delivery.title')}</h3>
              <p className="text-dark/60 dark:text-white/60 leading-relaxed">
                {tFeatures('delivery.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Preview Section */}
      <BlogPreviewSection />

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-skyblue via-lightskyblue to-white/10 dark:to-dark/10">
        <div className="container mx-auto px-5 max-w-8xl text-center">
          <h2 className="text-4xl md:text-52 font-semibold text-white dark:text-dark mb-6">
            {tCta('title')}
          </h2>
          <p className="text-xm text-white/80 dark:text-dark/80 max-w-2xl mx-auto mb-8">
            {tCta('description')}
          </p>
          <div className='flex flex-col xs:flex-row justify-center gap-4'>
            <button className='btn-homely-primary'>
              {tCta('browseCatalog')}
            </button>
            <button className='btn-homely-secondary'>
              {tCta('getQuote')}
            </button>
          </div>
        </div>
      </section>

      {/* Everything About Pulse Architects Section */}
      <EverythingAboutSection />

      {/* About Our Homes Section */}
      <AboutHomesSection />

      {/* Luxury Design Section */}
      <LuxuryDesignSection />
    </div>
  )
}