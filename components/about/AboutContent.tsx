import React from 'react'
import Image from 'next/image'
import { Users, Award, Target, Clock } from 'lucide-react'

const AboutContent: React.FC = () => {
  const stats = [
    { label: 'Years of Experience', value: '25+', icon: Clock },
    { label: 'Architectural Plans', value: '5,000+', icon: Target },
    { label: 'Licensed Architects', value: '50+', icon: Users },
    { label: 'Awards Won', value: '100+', icon: Award },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Principal Architect',
      experience: 'AIA Licensed, 20+ years experience',
      image: '/images/team/team1.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Design Director',
      experience: 'NCARB Certified, 18+ years experience',
      image: '/images/team/team2.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Sustainable Design Lead',
      experience: 'LEED AP, 15+ years experience',
      image: '/images/team/team3.jpg'
    }
  ]

  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pb-14 md:pb-28'>
      {/* Mission Section */}
      <section className='mb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='relative'>
            <Image
              src='/images/about/mission.jpg'
              alt='Pulse Architects Mission'
              width={600}
              height={400}
              className='rounded-2xl w-full h-auto'
              unoptimized={true}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl' />
            <div className='absolute bottom-6 left-6 text-white'>
              <h3 className='text-2xl font-medium mb-2'>Our Mission</h3>
              <p className='text-sm opacity-90'>Designing exceptional spaces for life</p>
            </div>
          </div>
          <div>
            <h2 className='text-3xl font-medium tracking-tight text-black dark:text-white mb-6'>
              Transforming visions into architectural reality
            </h2>
            <p className='text-base text-black/60 dark:text-white/60 mb-6 leading-relaxed'>
              For over 25 years, Pulse Architects has been the trusted source for premium 
              architectural plans. We combine innovative design with practical functionality 
              to create blueprints that inspire and endure.
            </p>
            <p className='text-base text-black/60 dark:text-white/60 mb-8 leading-relaxed'>
              Every plan in our collection is meticulously designed by licensed architects 
              who understand the importance of both form and function. We're committed to 
              helping builders, developers, and homeowners bring their vision to life with confidence.
            </p>
            <div className='flex items-center gap-4'>
              <div className='flex'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className='w-5 h-5 text-primary fill-current' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <span className='text-sm text-black/50 dark:text-white/50'>
                4.9/5 from 10,000+ satisfied customers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='mb-20 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 md:p-12'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Icon className='w-8 h-8 text-primary' />
                </div>
                <div className='text-3xl font-bold text-black dark:text-white mb-2'>{stat.value}</div>
                <div className='text-black/60 dark:text-white/60 text-sm'>{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className='mb-20'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-medium tracking-tight text-black dark:text-white mb-4'>
            Why Choose Pulse Architects?
          </h2>
          <p className='text-base text-black/60 dark:text-white/60 max-w-2xl mx-auto'>
            We set the standard for architectural plan quality, service, and innovation. 
            Here's what makes us different.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              title: 'Licensed Professionals',
              description: 'All our plans are designed by licensed architects with decades of experience.',
              image: '/images/about/service1.jpg'
            },
            {
              title: 'Code Compliant',
              description: 'Every plan meets current building codes ensuring smooth approval processes.',
              image: '/images/about/service2.jpg'
            },
            {
              title: 'Comprehensive Documentation',
              description: 'Complete sets include everything needed for construction.',
              image: '/images/about/service3.jpg'
            },
            {
              title: 'Instant Download',
              description: 'Get your plans immediately with secure digital delivery.',
              image: '/images/about/service4.jpg'
            },
            {
              title: 'Custom Modifications',
              description: 'Our team can modify plans or create completely custom designs.',
              image: '/images/about/service5.jpg'
            },
            {
              title: 'Expert Support',
              description: '24/7 customer support from our architectural professionals.',
              image: '/images/about/service6.jpg'
            }
          ].map((service, index) => (
            <div key={index} className='border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow duration-300'>
              <div className='aspect-video overflow-hidden'>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={225}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                  unoptimized={true}
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-medium text-black dark:text-white mb-3'>
                  {service.title}
                </h3>
                <p className='text-black/60 dark:text-white/60 text-sm'>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className='mb-20'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-medium tracking-tight text-black dark:text-white mb-4'>
            Meet Our Leadership Team
          </h2>
          <p className='text-base text-black/60 dark:text-white/60 max-w-2xl mx-auto'>
            Our experienced team of architects and designers brings decades of expertise 
            to every project.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {team.map((member, index) => (
            <div key={index} className='text-center group'>
              <div className='relative mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300'
                  unoptimized={true}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              <h3 className='text-xl font-medium text-black dark:text-white mb-2'>
                {member.name}
              </h3>
              <p className='text-primary font-medium mb-2'>{member.role}</p>
              <p className='text-sm text-black/60 dark:text-white/60'>{member.experience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-primary rounded-2xl p-8 md:p-12 text-center text-white'>
        <h2 className='text-3xl font-bold mb-4'>
          Ready to Start Your Project?
        </h2>
        <p className='text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
          Join thousands of satisfied customers who have brought their vision to life 
          with our premium architectural plans.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='px-8 py-4 rounded-full bg-white text-primary text-base font-semibold hover:bg-gray-100 transition-colors duration-300'>
            Browse Plans
          </button>
          <button className='px-8 py-4 rounded-full border border-white text-white text-base font-semibold hover:bg-white hover:text-primary transition-all duration-300'>
            Get Custom Quote
          </button>
        </div>
      </section>
    </div>
  )
}

export default AboutContent