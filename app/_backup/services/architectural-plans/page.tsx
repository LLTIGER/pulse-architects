"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Download, Eye, CheckCircle, Layers, Home, Mountain, Square, Triangle, Box, Map } from 'lucide-react'

const ArchitecturalPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('topographic')

  const planTypes = [
    {
      id: 'topographic',
      title: 'Topographic Views',
      icon: Mountain,
      description: 'Detailed site surveys showing existing terrain, elevations, utilities, and environmental features that affect your building design.',
      features: [
        'Existing terrain mapping',
        'Utility locations and connections',
        'Drainage patterns and water flow',
        'Property boundaries and setbacks',
        'Environmental considerations',
        'Access roads and pathways'
      ],
      image: '/images/services/topographic-plan.jpg'
    },
    {
      id: 'threed',
      title: '3D Dimensional Views',
      icon: Box,
      description: 'Comprehensive three-dimensional renderings that bring your architectural vision to life with realistic materials and lighting.',
      features: [
        'Photorealistic exterior renderings',
        'Interior space visualizations',
        'Material and texture details',
        'Lighting and shadow studies',
        'Landscaping integration',
        'Multiple angle perspectives'
      ],
      image: '/images/services/3d-rendering.jpg'
    },
    {
      id: 'floor',
      title: 'Floor Plans (Level 1 & 2)',
      icon: Layers,
      description: 'Detailed floor layouts for each level showing room arrangements, dimensions, traffic flow, and functional relationships.',
      features: [
        'Precise room dimensions and layouts',
        'Door and window placements',
        'Traffic flow optimization',
        'Furniture placement guides',
        'Electrical and plumbing locations',
        'Storage and utility spaces'
      ],
      image: '/images/services/floor-plans.jpg'
    },
    {
      id: 'roof',
      title: 'Roof Plans',
      icon: Triangle,
      description: 'Complete roofing systems including structural elements, drainage, ventilation, and integration with building systems.',
      features: [
        'Roof structure and framing',
        'Drainage systems and gutters',
        'Ventilation and HVAC integration',
        'Skylight and chimney details',
        'Material specifications',
        'Load calculations and support'
      ],
      image: '/images/services/roof-plans.jpg'
    },
    {
      id: 'foundation',
      title: 'Foundation Plans',
      icon: Square,
      description: 'Structural foundation designs ensuring stability, proper drainage, and integration with utility systems.',
      features: [
        'Foundation type and sizing',
        'Soil conditions and requirements',
        'Drainage and waterproofing',
        'Utility penetrations and access',
        'Structural load distribution',
        'Construction specifications'
      ],
      image: '/images/services/foundation-plans.jpg'
    },
    {
      id: 'elevation',
      title: 'Elevation Plans (Front & Side Views)',
      icon: Home,
      description: 'Detailed exterior elevations showing architectural character, materials, and design elements from all angles.',
      features: [
        'Front, rear, and side elevations',
        'Material specifications and details',
        'Window and door specifications',
        'Architectural features and trim',
        'Color and finish selections',
        'Landscaping integration'
      ],
      image: '/images/services/elevation-plans.jpg'
    }
  ]

  const selectedPlanData = planTypes.find(plan => plan.id === selectedPlan) || planTypes[0]
  const SelectedIcon = selectedPlanData.icon

  return (
    <div className='min-h-screen pt-24 bg-white dark:bg-black'>
      {/* Back Navigation */}
      <div className='container max-w-8xl mx-auto px-5 py-6'>
        <Link 
          href='/services' 
          className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Services
        </Link>
      </div>

      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-dark dark:text-white mb-8 leading-tight'>
            Architectural{' '}
            <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
              Plans
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-dark/60 dark:text-white/60 max-w-4xl mx-auto mb-12'>
            Comprehensive architectural planning services delivering detailed blueprints 
            from foundation to rooftop, ensuring every aspect of your vision is perfectly realized.
          </p>
          <div className='flex items-center justify-center gap-8 text-sm text-dark/60 dark:text-white/60'>
            <span className='flex items-center gap-2'>
              <CheckCircle className='w-4 h-4 text-primary' />
              Complete Plan Sets
            </span>
            <span className='flex items-center gap-2'>
              <CheckCircle className='w-4 h-4 text-primary' />
              Professional Standards
            </span>
            <span className='flex items-center gap-2'>
              <CheckCircle className='w-4 h-4 text-primary' />
              Building Code Compliant
            </span>
          </div>
        </div>
      </section>

      {/* Plan Types Navigation */}
      <section className='py-12 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            {planTypes.map((plan) => {
              const Icon = plan.icon
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-white/10 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  <Icon className='w-5 h-5' />
                  <span className='hidden sm:block'>{plan.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Selected Plan Details */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            {/* Content */}
            <div>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center'>
                  <SelectedIcon className='w-8 h-8 text-primary' />
                </div>
                <div>
                  <h2 className='text-3xl font-bold text-dark dark:text-white'>
                    {selectedPlanData.title}
                  </h2>
                  <p className='text-primary font-medium'>Professional Architectural Plans</p>
                </div>
              </div>
              
              <p className='text-xl text-dark/70 dark:text-white/70 mb-8 leading-relaxed'>
                {selectedPlanData.description}
              </p>

              <div className='mb-8'>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  What's Included:
                </h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {selectedPlanData.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-3'>
                      <CheckCircle className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-dark/80 dark:text-white/80'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/contact' className='btn-homely-primary'>
                  Request Quote
                </Link>
                <Link href='/gallery' className='btn-homely-secondary'>
                  View Examples
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className='relative'>
              <div className='relative h-[500px] rounded-2xl overflow-hidden shadow-2xl'>
                <Image
                  src={selectedPlanData.image}
                  alt={selectedPlanData.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                <div className='absolute bottom-6 left-6 right-6'>
                  <h4 className='text-white font-bold text-lg mb-2'>
                    {selectedPlanData.title}
                  </h4>
                  <p className='text-white/80 text-sm'>
                    Professional architectural planning and design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Plan Package */}
      <section className='py-24 bg-gray-50 dark:bg-dark'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Complete Plan Package
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              When you order architectural plans from Pulse Architects, you receive a comprehensive 
              package covering every aspect of your project from ground up.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {planTypes.map((plan, index) => {
              const Icon = plan.icon
              return (
                <div key={plan.id} className='bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 dark:border-white/10'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center'>
                      <Icon className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-dark dark:text-white'>
                        {plan.title}
                      </h3>
                      <span className='text-sm text-primary font-medium'>
                        Step {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <p className='text-dark/70 dark:text-white/70 mb-6'>
                    {plan.description}
                  </p>

                  <div className='space-y-2'>
                    {plan.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className='flex items-center gap-2 text-sm text-dark/60 dark:text-white/60'>
                        <div className='w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0' />
                        {feature}
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <p className='text-xs text-primary font-medium'>
                        +{plan.features.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Our Planning Process
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              From initial consultation to final delivery, we ensure every detail is 
              carefully planned and professionally executed.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {[
              {
                step: '01',
                title: 'Site Analysis',
                description: 'Comprehensive site survey including topographic mapping, utility locations, and environmental factors.'
              },
              {
                step: '02',
                title: 'Design Development',
                description: 'Creating floor plans, elevations, and 3D visualizations based on your requirements and site conditions.'
              },
              {
                step: '03',
                title: 'Technical Drawings',
                description: 'Detailed construction drawings including foundation, structural, roof, and system integration plans.'
              },
              {
                step: '04',
                title: 'Final Delivery',
                description: 'Complete plan package with all necessary documentation for permits, construction, and project management.'
              }
            ].map((process, index) => (
              <div key={index} className='text-center'>
                <div className='w-20 h-20 bg-gradient-to-br from-primary to-skyblue rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-white font-bold text-lg'>{process.step}</span>
                </div>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  {process.title}
                </h3>
                <p className='text-dark/60 dark:text-white/60'>
                  {process.description}
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
            Get professional architectural plans that bring your vision to life. 
            Contact us today for a consultation and detailed quote.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact' className='btn-homely-primary'>
              Start Your Project
            </Link>
            <Link href='/services' className='btn-homely-secondary'>
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArchitecturalPlansPage