import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building, Users, Award, Lightbulb } from 'lucide-react'

const AboutHomesSection: React.FC = () => {
  const features = [
    {
      icon: Building,
      title: 'Architectural Excellence',
      description: 'Every plan is crafted by licensed architects with decades of experience in residential and commercial design.'
    },
    {
      icon: Users,
      title: 'Client-Centered Design',
      description: 'We prioritize your lifestyle needs, creating spaces that enhance how you live, work, and connect.'
    },
    {
      icon: Award,
      title: 'Award-Winning Quality',
      description: 'Our designs have been recognized with multiple architectural awards and featured in leading publications.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Sustainability',
      description: 'Forward-thinking designs that incorporate the latest in sustainable building practices and smart home technology.'
    }
  ]

  return (
    <section className='bg-black dark:bg-gray-900 py-20 md:py-28'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20'>
          <div>
            <div className='flex gap-2.5 items-center mb-6'>
              <Building size={20} className='text-primary' />
              <p className='text-base font-semibold text-white/75'>
                Our Philosophy
              </p>
            </div>
            <h2 className='text-4xl sm:text-52 font-medium tracking-tighter text-white mb-6 leading-10 sm:leading-14'>
              Everything about our architectural plans
            </h2>
            <p className='text-lg font-normal tracking-tight text-white/60 leading-relaxed mb-8'>
              At Pulse Architects, we believe that great architecture goes beyond beautiful facades. 
              Our plans are comprehensive blueprints for living, designed to enhance every aspect of 
              your daily experience while standing the test of time.
            </p>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
              <div>
                <h3 className='text-3xl font-bold text-primary mb-2'>25+</h3>
                <p className='text-white/80 font-medium'>Years of Experience</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold text-primary mb-2'>5,000+</h3>
                <p className='text-white/80 font-medium'>Architectural Plans</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold text-primary mb-2'>50+</h3>
                <p className='text-white/80 font-medium'>Licensed Architects</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold text-primary mb-2'>100+</h3>
                <p className='text-white/80 font-medium'>Design Awards</p>
              </div>
            </div>
            
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link 
                href='/about'
                className='inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300'
              >
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
              <Link 
                href='/catalog'
                className='inline-flex items-center gap-3 px-8 py-4 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300'
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
          
          <div className='relative'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Image
                  src='/images/about/architecture1.jpg'
                  alt='Modern architectural design'
                  width={300}
                  height={400}
                  className='rounded-2xl w-full h-80 object-cover'
                  unoptimized={true}
                />
              </div>
              <div className='mt-8'>
                <Image
                  src='/images/about/architecture2.jpg'
                  alt='Luxury home design'
                  width={300}
                  height={400}
                  className='rounded-2xl w-full h-80 object-cover'
                  unoptimized={true}
                />
              </div>
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl' />
          </div>
        </div>
        
        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className='text-center group'>
                <div className='w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300'>
                  <Icon className='w-10 h-10 text-primary' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-4 group-hover:text-primary transition-colors duration-300'>
                  {feature.title}
                </h3>
                <p className='text-white/60 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
        
        {/* Call to Action */}
        <div className='text-center mt-16 pt-16 border-t border-white/10'>
          <h3 className='text-2xl font-medium text-white mb-4'>
            Ready to start your architectural journey?
          </h3>
          <p className='text-white/60 mb-8 max-w-2xl mx-auto'>
            Discover our comprehensive collection of architectural plans and find the perfect design 
            for your next project. From cozy cottages to grand estates, we have the perfect plan for you.
          </p>
          <Link 
            href='/catalog'
            className='inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300'
          >
            Explore All Plans
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutHomesSection