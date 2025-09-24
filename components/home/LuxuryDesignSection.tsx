"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LuxuryDesignSection: React.FC = () => {
  return (
    <section className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='container max-w-8xl mx-auto px-5'>
        {/* Rounded Rectangle Container - 20% wider for better composition */}
        <div className='relative w-full max-w-8xl mx-auto min-h-[84vh] flex flex-col rounded-3xl overflow-hidden'>
          {/* Main Content Area with Background */}
          <div className='relative flex-1 flex items-center justify-center'>
            {/* Background Image */}
            <div className='absolute inset-0'>
              <Image
                src='/images/luxury-design-background-optimized.jpg'
                alt='Luxury architectural design background'
                fill
                className='object-cover'
                priority
              />
              {/* Dark overlay for better text readability */}
              <div className='absolute inset-0 bg-black/60' />
            </div>
            
            {/* Content */}
            <div className='relative z-10 text-center text-white px-8 py-16'>
              <h2 className='text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight'>
                Enter a realm where{' '}
                <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
                  exquisite design
                </span>{' '}
                and timeless luxury comes together
              </h2>
              
              <p className='text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed'>
                Where architectural mastery meets unparalleled elegance in every detail
              </p>
              
              <Link 
                href='/contact'
                className='inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1'
              >
                Get In Touch
              </Link>
            </div>
          </div>
          
          {/* Scrolling Text Strip - Inside Rectangle at Bottom */}
          <div className='bg-primary py-4 overflow-hidden'>
            <div className='animate-scroll whitespace-nowrap'>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Browse thousands of premium architectural plans in prime locations at exceptional prices
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Get a free architectural consultation
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Custom design your dream home
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Award-winning designs by licensed architects
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Instant download with lifetime access
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Professional quality guaranteed
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Browse thousands of premium architectural plans in prime locations at exceptional prices
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Get a free architectural consultation
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Custom design your dream home
              </span>
              <span className='inline-block text-white font-semibold text-lg px-8'>
                Award-winning designs by licensed architects
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default LuxuryDesignSection