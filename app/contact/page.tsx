import { Metadata } from 'next'
import { Home, Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us | Pulse Architects',
  description: 'Get in touch with Pulse Architects for custom designs, support, or questions about our architectural plans.',
}

export default function ContactPage() {
  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
      <div className='mb-16'>
        <div className='flex gap-2.5 items-center justify-center mb-3'>
          <span>
            <Home
              size={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-badge dark:text-white/90'>
            Contact us
          </p>
        </div>
        <div className='text-center'>
          <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
            Have questions? Ready to help!
          </h3>
          <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
            Looking for your dream architectural plans or ready to build? Our expert team offers
            personalized guidance and design expertise tailored to you.
          </p>
        </div>
      </div>
      {/* form */}
      <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
          <div className='relative w-fit'>
            <Image
              src={'/images/contactUs/contactUs.jpg'}
              alt='architectural office'
              width={497}
              height={535}
              className='rounded-2xl brightness-50 h-full'
              unoptimized={true}
            />
            <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
              <h5 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>
                Contact information
              </h5>
              <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                Ready to find your dream architectural plans or build your custom home? We're here
                to help!
              </p>
            </div>
            <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
              <Link href={'tel:+33612776498'} className='w-fit'>
                <div className='flex items-center gap-4 group w-fit'>
                  <Phone size={32} />
                  <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                    +33 6 12 77 64 98
                  </p>
                </div>
              </Link>
              <Link href={'mailto:chicco007@PulseArchitects.com'} className='w-fit'>
                <div className='flex items-center gap-4 group w-fit'>
                  <Mail size={32} />
                  <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                    chicco007@PulseArchitects.com
                  </p>
                </div>
              </Link>
              <div className='flex items-center gap-4'>
                <MapPin size={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                  3 Avenue Jacques Prévert, 77200 Torcy, France
                </p>
              </div>
            </div>
          </div>
          <div className='flex-1/2'>
            <form>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    placeholder='Name*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-gray-800 text-black dark:text-white'
                  />
                  <input
                    type='tel'
                    name='mobile'
                    id='mobile'
                    autoComplete='mobile'
                    placeholder='Phone number*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-gray-800 text-black dark:text-white'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  placeholder='Email address*'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-white dark:bg-gray-800 text-black dark:text-white'
                />
                <textarea
                  rows={8}
                  cols={50}
                  name='message'
                  id='message'
                  placeholder='Write here your message'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-white dark:bg-gray-800 text-black dark:text-white'></textarea>
                <button className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300'>
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}