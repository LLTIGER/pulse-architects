'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building, Palette, FileCheck, Users, Award, Lightbulb, Download, Zap, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

const ServicesPage: React.FC = () => {
  const tHero = useTranslations('services.hero')
  
  const mainServices = [
    {
      icon: Building,
      title: 'Architectural Plans',
      description: 'Premium architectural plans designed by licensed professionals for residential and commercial projects.',
      features: [
        'Detailed floor plans and elevations',
        'Structural drawings and specifications', 
        'Code-compliant designs',
        'Multiple file formats (PDF, DWG, RVT)'
      ],
      image: '/images/services/architectural-plans.jpg',
      link: '/services/architectural-plans'
    },
    {
      icon: Palette,
      title: '3D Renders & Visualizations',
      description: 'High-quality 3D renders and visual representations to help clients visualize their projects.',
      features: [
        'Photorealistic exterior renders',
        'Interior visualization and walkthroughs',
        'Material and lighting studies',
        'Virtual reality presentations'
      ],
      image: '/images/services/3d-renders.jpg', 
      link: '/services/3d-rendering'
    },
    {
      icon: FileCheck,
      title: 'Building Permits & Certificates',
      description: 'Complete permit application services and building certificates to ensure regulatory compliance.',
      features: [
        'Building permit applications',
        'Zoning compliance verification',
        'Environmental impact assessments',
        'Safety and fire code certifications'
      ],
      image: '/images/services/permits.jpg',
      link: '/services/building-permits'
    }
  ]

  const additionalServices = [
    {
      icon: Users,
      title: 'Consultation Services',
      description: 'Expert architectural consultation for custom projects and modifications.'
    },
    {
      icon: Award,
      title: 'Design Awards Program',
      description: 'Submit your projects for architectural design awards and recognition.'
    },
    {
      icon: Lightbulb,
      title: 'Sustainable Design',
      description: 'Green building certifications and sustainable architecture solutions.'
    },
    {
      icon: Download,
      title: 'Digital Asset Library',
      description: 'Access to extensive library of architectural components and materials.'
    },
    {
      icon: Zap,
      title: 'Fast-Track Services',
      description: 'Expedited design and delivery for time-sensitive projects.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Comprehensive quality checks and professional liability coverage.'
    }
  ]

  return (
    <div className='min-h-screen pt-24'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-dark dark:text-white mb-8 leading-tight'>
            {tHero('title')}{' '}
            <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
              {tHero('titleHighlight')}
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-dark/60 dark:text-white/60 max-w-4xl mx-auto mb-12'>
            {tHero('description')}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link 
              href='/catalog'
              className='btn-homely-primary'
            >
              {tHero('browsePlans')}
            </Link>
            <Link 
              href='/contact'
              className='btn-homely-secondary'
            >
              {tHero('getConsultation')}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Our Core Services
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              We specialize in three main areas that cover all aspects of architectural design and construction compliance.
            </p>
          </div>

          <div className='space-y-24'>
            {mainServices.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                    <div className='flex items-center gap-4 mb-6'>
                      <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center'>
                        <Icon className='w-8 h-8 text-primary' />
                      </div>
                      <h3 className='text-3xl font-bold text-dark dark:text-white'>
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className='text-lg text-dark/60 dark:text-white/60 mb-8 leading-relaxed'>
                      {service.description}
                    </p>
                    
                    <div className='mb-8'>
                      <h4 className='text-xl font-semibold text-dark dark:text-white mb-4'>
                        What's Included:
                      </h4>
                      <ul className='space-y-3'>
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className='flex items-start gap-3'>
                            <div className='w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                              <ArrowRight className='w-3 h-3 text-primary' />
                            </div>
                            <span className='text-dark/70 dark:text-white/70'>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      href={service.link}
                      className='inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300'
                    >
                      Learn More
                      <ArrowRight className='w-5 h-5' />
                    </Link>
                  </div>
                  
                  <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                    <div className='relative rounded-2xl overflow-hidden shadow-3xl'>
                      <Image
                        src='/images/about/service1.jpg'
                        alt={service.title}
                        width={600}
                        height={450}
                        className='w-full h-96 object-cover'
                        unoptimized={true}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className='py-24 bg-gray-50 dark:bg-dark'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Additional Services
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              Comprehensive support services to ensure your project's success from concept to completion.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              
              return (
                <div key={index} className='bg-white dark:bg-black p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/10'>
                  <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6'>
                    <Icon className='w-8 h-8 text-primary' />
                  </div>
                  
                  <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                    {service.title}
                  </h3>
                  
                  <p className='text-dark/60 dark:text-white/60 leading-relaxed mb-6'>
                    {service.description}
                  </p>
                  
                  <Link 
                    href='/contact'
                    className='inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300'
                  >
                    Learn More
                    <ArrowRight className='w-4 h-4' />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Our Process
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              We follow a proven process to deliver exceptional results for every project.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {[
              { step: '01', title: 'Consultation', description: 'Initial meeting to understand your requirements and vision.' },
              { step: '02', title: 'Design', description: 'Create detailed plans and specifications tailored to your needs.' },
              { step: '03', title: 'Review', description: 'Collaborate on revisions and refinements until perfect.' },
              { step: '04', title: 'Delivery', description: 'Final delivery of all files, permits, and documentation.' }
            ].map((phase, index) => (
              <div key={index} className='text-center'>
                <div className='w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6'>
                  {phase.step}
                </div>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  {phase.title}
                </h3>
                <p className='text-dark/60 dark:text-white/60'>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-b from-primary/5 via-skyblue/10 to-lightskyblue/5 dark:from-primary/10 dark:via-skyblue/5 dark:to-lightskyblue/10'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
            Ready to Start Your Project?
          </h2>
          <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto mb-12'>
            Contact us today to discuss your architectural needs and get a personalized quote for your project.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link 
              href='/contact'
              className='btn-homely-primary'
            >
              Get Started Today
            </Link>
            <Link 
              href='/catalog'
              className='btn-homely-secondary'
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage