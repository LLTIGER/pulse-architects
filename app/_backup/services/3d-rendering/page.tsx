"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play, Eye, Maximize, Sun, Moon, Home, Building, Camera, Video, RotateCcw, Palette, Lightbulb } from 'lucide-react'

const ThreeDRenderingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('exterior')
  const [selectedRender, setSelectedRender] = useState(0)

  const renderCategories = [
    {
      id: 'exterior',
      title: 'Exterior Renderings',
      icon: Home,
      description: 'Photorealistic exterior visualizations showcasing architectural design, materials, and landscaping integration.'
    },
    {
      id: 'interior',
      title: 'Interior Visualizations',
      icon: Building,
      description: 'Detailed interior renderings with realistic lighting, furniture, and material finishes.'
    },
    {
      id: 'lighting',
      title: 'Lighting Studies',
      icon: Lightbulb,
      description: 'Advanced lighting analysis showing natural and artificial light interaction throughout different times of day.'
    },
    {
      id: 'materials',
      title: 'Material Studies',
      icon: Palette,
      description: 'Detailed material and texture visualization helping clients make informed design decisions.'
    }
  ]

  const renderExamples = {
    exterior: [
      {
        id: 1,
        title: 'Modern Luxury Villa - Daytime',
        description: 'Photorealistic exterior rendering showcasing contemporary architecture with natural lighting and landscaping.',
        image: '/images/renders/exterior-villa-day.jpg',
        type: 'Daytime Rendering',
        resolution: '4K Ultra HD',
        features: ['Natural Lighting', 'Landscaping', 'Material Details', 'Environmental Context']
      },
      {
        id: 2,
        title: 'Contemporary Home - Evening',
        description: 'Stunning evening visualization highlighting interior lighting and architectural features.',
        image: '/images/renders/exterior-home-evening.jpg',
        type: 'Evening Rendering',
        resolution: '4K Ultra HD',
        features: ['Interior Lighting', 'Ambient Glow', 'Shadow Studies', 'Night Atmosphere']
      },
      {
        id: 3,
        title: 'Commercial Building - Aerial View',
        description: 'Bird\'s eye perspective showing building integration with surrounding environment.',
        image: '/images/renders/exterior-commercial-aerial.jpg',
        type: 'Aerial Rendering',
        resolution: '4K Ultra HD',
        features: ['Aerial Perspective', 'Context Integration', 'Traffic Flow', 'Urban Planning']
      }
    ],
    interior: [
      {
        id: 4,
        title: 'Living Room - Natural Light',
        description: 'Elegant living space with natural lighting streaming through large windows.',
        image: '/images/renders/interior-living-natural.jpg',
        type: 'Interior Rendering',
        resolution: '4K Ultra HD',
        features: ['Natural Lighting', 'Furniture Layout', 'Material Textures', 'Space Flow']
      },
      {
        id: 5,
        title: 'Master Kitchen - Evening',
        description: 'Luxury kitchen design with warm artificial lighting and premium finishes.',
        image: '/images/renders/interior-kitchen-evening.jpg',
        type: 'Interior Rendering',
        resolution: '4K Ultra HD',
        features: ['Task Lighting', 'Premium Materials', 'Appliance Integration', 'Color Harmony']
      },
      {
        id: 6,
        title: 'Bedroom Suite - Morning Light',
        description: 'Serene master bedroom with soft morning light and sophisticated design.',
        image: '/images/renders/interior-bedroom-morning.jpg',
        type: 'Interior Rendering',
        resolution: '4K Ultra HD',
        features: ['Soft Lighting', 'Textile Details', 'Spatial Comfort', 'Privacy Solutions']
      }
    ],
    lighting: [
      {
        id: 7,
        title: 'Daylight Analysis - Living Space',
        description: 'Comprehensive daylight study showing natural light penetration throughout the day.',
        image: '/images/renders/lighting-daylight-study.jpg',
        type: 'Lighting Study',
        resolution: '4K Ultra HD',
        features: ['Solar Analysis', 'Shadow Mapping', 'Glare Assessment', 'Energy Efficiency']
      },
      {
        id: 8,
        title: 'Artificial Lighting - Evening Ambiance',
        description: 'Strategic artificial lighting design creating perfect evening atmosphere.',
        image: '/images/renders/lighting-artificial-evening.jpg',
        type: 'Lighting Study',
        resolution: '4K Ultra HD',
        features: ['LED Integration', 'Mood Lighting', 'Task Illumination', 'Control Systems']
      }
    ],
    materials: [
      {
        id: 9,
        title: 'Material Comparison - Exterior Finishes',
        description: 'Side-by-side comparison of different exterior material options.',
        image: '/images/renders/materials-exterior-comparison.jpg',
        type: 'Material Study',
        resolution: '4K Ultra HD',
        features: ['Material Samples', 'Weather Resistance', 'Aesthetic Options', 'Cost Analysis']
      },
      {
        id: 10,
        title: 'Interior Finishes - Texture Studies',
        description: 'Detailed texture and finish visualization for interior spaces.',
        image: '/images/renders/materials-interior-textures.jpg',
        type: 'Material Study',
        resolution: '4K Ultra HD',
        features: ['Texture Details', 'Color Variations', 'Durability Factors', 'Maintenance Requirements']
      }
    ]
  }

  const currentRenders = renderExamples[selectedCategory as keyof typeof renderExamples] || renderExamples.exterior
  const currentRender = currentRenders[selectedRender] || currentRenders[0]

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
            3D Rendering &{' '}
            <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
              Visualization
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-dark/60 dark:text-white/60 max-w-4xl mx-auto mb-12'>
            Bring your architectural vision to life with photorealistic 3D renderings, 
            immersive 360° experiences, and detailed lighting studies that showcase every design element.
          </p>
          <div className='flex items-center justify-center gap-8 text-sm text-dark/60 dark:text-white/60'>
            <span className='flex items-center gap-2'>
              <Camera className='w-4 h-4' />
              Photorealistic Quality
            </span>
            <span className='flex items-center gap-2'>
              <Video className='w-4 h-4' />
              360° Virtual Tours
            </span>
            <span className='flex items-center gap-2'>
              <RotateCcw className='w-4 h-4' />
              Interactive Experiences
            </span>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className='py-12 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {renderCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedRender(0)
                  }}
                  className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 dark:bg-white/5 text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className='w-8 h-8 mb-4' />
                  <h3 className='font-bold text-lg mb-2'>{category.title}</h3>
                  <p className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-dark/60 dark:text-white/60'}`}>
                    {category.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Render Display */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Main Image */}
            <div className='lg:col-span-2'>
              <div className='relative h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-6'>
                <Image
                  src={currentRender.image}
                  alt={currentRender.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                
                {/* Play Button for 360° Experience */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110'>
                    <RotateCcw className='w-8 h-8' />
                  </button>
                </div>

                <div className='absolute bottom-6 left-6 right-6'>
                  <div className='flex items-center gap-3 mb-2'>
                    <span className='px-3 py-1 bg-primary rounded-full text-white text-sm font-medium'>
                      {currentRender.type}
                    </span>
                    <span className='px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm'>
                      {currentRender.resolution}
                    </span>
                  </div>
                  <h3 className='text-white font-bold text-xl mb-2'>
                    {currentRender.title}
                  </h3>
                  <p className='text-white/80'>
                    {currentRender.description}
                  </p>
                </div>
              </div>

              {/* Render Navigation */}
              <div className='flex gap-4 overflow-x-auto pb-4'>
                {currentRenders.map((render, index) => (
                  <button
                    key={render.id}
                    onClick={() => setSelectedRender(index)}
                    className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedRender === index 
                        ? 'ring-4 ring-primary transform scale-105' 
                        : 'hover:transform hover:scale-102 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={render.image}
                      alt={render.title}
                      fill
                      className='object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Sidebar */}
            <div className='space-y-8'>
              {/* Features */}
              <div className='bg-gray-50 dark:bg-white/5 rounded-2xl p-6'>
                <h4 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  Key Features
                </h4>
                <div className='space-y-3'>
                  {currentRender.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center'>
                        <div className='w-2 h-2 bg-primary rounded-full' />
                      </div>
                      <span className='text-dark/80 dark:text-white/80'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 360° Virtual Tour */}
              <div className='bg-gradient-to-br from-primary/10 to-skyblue/10 rounded-2xl p-6 border border-primary/20'>
                <div className='flex items-center gap-3 mb-4'>
                  <Video className='w-6 h-6 text-primary' />
                  <h4 className='text-xl font-bold text-dark dark:text-white'>
                    360° Virtual Tour
                  </h4>
                </div>
                <p className='text-dark/70 dark:text-white/70 mb-6'>
                  Experience this space in full 360-degree immersive virtual reality. Navigate through 
                  every room and see the design from every angle.
                </p>
                <button className='w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2'>
                  <Play className='w-5 h-5' />
                  Launch Virtual Tour
                </button>
              </div>

              {/* Lighting Controls */}
              <div className='bg-white dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-white/10'>
                <h4 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  Lighting Options
                </h4>
                <div className='space-y-4'>
                  <button className='w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors'>
                    <div className='flex items-center gap-3'>
                      <Sun className='w-5 h-5 text-yellow-500' />
                      <span className='text-dark dark:text-white'>Daylight</span>
                    </div>
                    <div className='w-8 h-4 bg-primary rounded-full relative'>
                      <div className='absolute right-0 top-0 w-4 h-4 bg-white rounded-full shadow' />
                    </div>
                  </button>
                  <button className='w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors'>
                    <div className='flex items-center gap-3'>
                      <Moon className='w-5 h-5 text-blue-500' />
                      <span className='text-dark dark:text-white'>Evening</span>
                    </div>
                    <div className='w-8 h-4 bg-gray-300 rounded-full relative'>
                      <div className='absolute left-0 top-0 w-4 h-4 bg-white rounded-full shadow' />
                    </div>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className='space-y-3'>
                <Link href='/contact' className='btn-homely-primary w-full text-center'>
                  Request Custom Rendering
                </Link>
                <Link href='/gallery' className='btn-homely-secondary w-full text-center'>
                  View More Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className='py-24 bg-gray-50 dark:bg-dark'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Complete Visualization Services
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              From initial concept to final presentation, we provide comprehensive 3D visualization 
              services that bring your architectural designs to life.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Photorealistic Renderings',
                description: 'High-quality static renderings with realistic materials, lighting, and environmental context.',
                features: ['4K Ultra HD Quality', 'Multiple Angles', 'Material Studies', 'Lighting Analysis'],
                icon: Camera
              },
              {
                title: '360° Virtual Tours',
                description: 'Immersive virtual reality experiences allowing clients to walk through and explore spaces.',
                features: ['Full 360° Navigation', 'Interactive Hotspots', 'Multiple Viewpoints', 'VR Compatible'],
                icon: Video
              },
              {
                title: 'Animation & Walkthroughs',
                description: 'Dynamic video presentations showcasing design flow, functionality, and spatial relationships.',
                features: ['HD Video Quality', 'Smooth Transitions', 'Cinematic Effects', 'Narrative Flow'],
                icon: Play
              }
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className='bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 dark:border-white/10'>
                  <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6'>
                    <Icon className='w-8 h-8 text-primary' />
                  </div>
                  <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                    {service.title}
                  </h3>
                  <p className='text-dark/70 dark:text-white/70 mb-6'>
                    {service.description}
                  </p>
                  <div className='space-y-2'>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className='flex items-center gap-2 text-sm text-dark/60 dark:text-white/60'>
                        <div className='w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0' />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-b from-primary/5 via-skyblue/10 to-lightskyblue/5 dark:from-primary/10 dark:via-skyblue/5 dark:to-lightskyblue/10'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
            Experience Your Design Before It's Built
          </h2>
          <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto mb-12'>
            Our advanced 3D visualization services help you make informed decisions, 
            present your vision to stakeholders, and ensure perfect execution.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact' className='btn-homely-primary'>
              Get Started Today
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

export default ThreeDRenderingPage