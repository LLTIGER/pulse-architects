import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

const LuxuryDesignSection: React.FC = () => {
  return (
    <section className='py-20 md:py-28 bg-gradient-to-br from-primary/5 via-skyblue/10 to-lightskyblue/5 dark:from-primary/10 dark:via-skyblue/5 dark:to-lightskyblue/10'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='order-2 lg:order-1'>
            <div className='flex gap-2.5 items-center mb-6'>
              <Home size={20} className='text-primary' />
              <p className='text-base font-semibold text-black/75 dark:text-white/75'>
                Premium Design
              </p>
            </div>
            <h2 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-6 leading-10 sm:leading-14'>
              Enter a realm where exquisite design and timeless luxury comes together
            </h2>
            <p className='text-lg font-normal tracking-tight text-black/60 dark:text-white/60 leading-relaxed mb-8'>
              Our architectural plans represent the pinnacle of luxury design, where every line, 
              every space, and every detail is crafted to create homes that transcend the ordinary. 
              Experience the perfect fusion of aesthetic beauty and functional excellence.
            </p>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-6 h-6 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-black dark:text-white mb-2'>
                    Timeless Elegance
                  </h3>
                  <p className='text-black/60 dark:text-white/60 text-sm'>
                    Classic design principles that never go out of style
                  </p>
                </div>
              </div>
              
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-6 h-6 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-black dark:text-white mb-2'>
                    Premium Materials
                  </h3>
                  <p className='text-black/60 dark:text-white/60 text-sm'>
                    Specifications for the finest building materials and finishes
                  </p>
                </div>
              </div>
              
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-6 h-6 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-black dark:text-white mb-2'>
                    Masterful Craftsmanship
                  </h3>
                  <p className='text-black/60 dark:text-white/60 text-sm'>
                    Detailed specifications ensuring exceptional build quality
                  </p>
                </div>
              </div>
              
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-6 h-6 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-black dark:text-white mb-2'>
                    Custom Adaptations
                  </h3>
                  <p className='text-black/60 dark:text-white/60 text-sm'>
                    Personalized modifications to suit your unique vision
                  </p>
                </div>
              </div>
            </div>
            
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link 
                href='/catalog'
                className='inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300'
              >
                Explore Luxury Plans
                <ArrowRight size={20} />
              </Link>
              <Link 
                href='/contact'
                className='inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300'
              >
                Custom Design Consultation
              </Link>
            </div>
          </div>
          
          <div className='order-1 lg:order-2'>
            <div className='relative'>
              <Image
                src='/images/luxury/luxury-design.jpg'
                alt='Exquisite luxury architectural design'
                width={600}
                height={500}
                className='rounded-2xl w-full h-auto shadow-3xl'
                unoptimized={true}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl' />
              <div className='absolute bottom-6 left-6 text-white'>
                <h3 className='text-2xl font-medium mb-2'>Luxury Villa Design</h3>
                <p className='text-sm opacity-90'>Premium architectural excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LuxuryDesignSection