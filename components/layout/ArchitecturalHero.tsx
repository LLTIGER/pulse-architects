import Link from 'next/link'
import { Building2, Ruler, Download, Users } from 'lucide-react'

const ArchitecturalHero: React.FC = () => {
  return (
    <section className='!py-0'>
      <div className='bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-800 dark:via-blue-700 dark:to-indigo-800 overflow-hidden relative min-h-screen'>
        <div className='container max-w-7xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68'>
          <div className='relative text-white text-center md:text-start z-10'>
            <p className='text-blue-100 text-sm font-medium uppercase tracking-wider'>
              Professional Architectural Plans
            </p>
            <h1 className='text-white text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight md:max-w-4xl mt-4 mb-8 leading-tight'>
              Design Your
              <span className="block">Dream Space</span>
            </h1>
            <p className='text-blue-100 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed'>
              Discover thousands of professionally designed architectural plans. From modern homes to commercial buildings, find the perfect blueprint for your next construction project.
            </p>
            <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-4'>
              <Link 
                href="/catalog" 
                className='px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-center'
              >
                Browse Plans
              </Link>
              <Link
                href="/custom-request" 
                className='px-8 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold rounded-full text-center'
              >
                Custom Design
              </Link>
            </div>
          </div>
          
          {/* Hero illustration placeholder - will be replaced with actual architectural showcase */}
          <div className='hidden md:block absolute -top-2 -right-68 xl:-right-32'>
            <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <Building2 size={64} className="mx-auto mb-4" />
                  <p className="text-lg font-medium">Architectural Showcase</p>
                  <p className="text-sm">3D Building Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className='md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-gray-900 py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24 shadow-2xl'>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:flex gap-8 md:gap-16 text-center md:text-left dark:text-white text-gray-900'>
            <div className='flex flex-col sm:items-center md:items-start gap-3'>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Building2 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className='text-2xl font-bold text-inherit'>500+</p>
                <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
                  House Plans
                </p>
              </div>
            </div>
            
            <div className='flex flex-col sm:items-center md:items-start gap-3'>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Ruler size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className='text-2xl font-bold text-inherit'>50+</p>
                <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
                  Commercial Plans
                </p>
              </div>
            </div>
            
            <div className='flex flex-col sm:items-center md:items-start gap-3'>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Download size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className='text-2xl font-bold text-inherit'>10k+</p>
                <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
                  Downloads
                </p>
              </div>
            </div>
            
            <div className='flex flex-col sm:items-center md:items-start gap-3'>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <Users size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className='text-2xl font-bold text-inherit'>2k+</p>
                <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}

export default ArchitecturalHero