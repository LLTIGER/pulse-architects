'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { Sun, Moon, Phone, Menu, X } from 'lucide-react'
import CartButton from '@/components/ecommerce/CartButton'
import CartDrawer from '@/components/ecommerce/CartDrawer'

// Navigation links for Pulse Architects
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Categories', href: '/categories' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
]

const Header: React.FC = () => {
  const [sticky, setSticky] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const sideMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
      setNavbarOpen(false)
    }
  }

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleScroll])

  const isHomepage = pathname === '/'

  if (!mounted) {
    return null
  }

  return (
    <header className={`fixed h-24 py-1 z-50 w-full bg-transparent transition-all duration-300 lg:px-0 px-4 ${sticky ? "top-3" : "top-0"}`}>
      <nav className={`container mx-auto max-w-8xl flex items-center justify-between py-4 duration-300 ${sticky ? "shadow-lg bg-white dark:bg-dark rounded-full top-5 px-4 " : "shadow-none top-0"}`}>
        <div className='flex justify-between items-center gap-2 w-full'>
          <div>
            <Link href='/'>
              <div className="flex items-center">
                <Image
                  src={'/images/header/logo.svg'}
                  alt='Pulse Architects'
                  width={40}
                  height={40}
                  className={`block dark:hidden mr-3 ${isHomepage && !sticky ? 'brightness-0 invert' : ''}`}
                  unoptimized={true}
                />
                <Image
                  src={'/images/header/dark-logo.svg'}
                  alt='Pulse Architects'
                  width={40}
                  height={40}
                  className="hidden dark:block mr-3"
                  unoptimized={true}
                />
                <span className={`text-2xl font-bold ${isHomepage ? sticky ? "text-dark dark:text-white" : "text-white" : "text-dark dark:text-white"}`}>
                  Pulse Architects
                </span>
              </div>
            </Link>
          </div>
          <div className='flex items-center gap-2 sm:gap-6'>
            <CartButton />
            <button
              className='hover:cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun
                size={24}
                className={`dark:hidden block ${isHomepage
                  ? sticky
                    ? 'text-dark'
                    : 'text-white'
                  : 'text-dark'
                  }`}
              />
              <Moon
                size={24}
                className='dark:block hidden text-white'
              />
            </button>
            <div className={`hidden md:block`}>
              <Link href='tel:+1-555-3374467' className={`text-base text-inherit flex items-center gap-2 border-r pr-6 transition-colors ${isHomepage
                ? sticky
                  ? 'text-dark dark:text-white hover:text-primary border-gray-300 dark:border-gray-600'
                  : 'text-white hover:text-primary border-white/30'
                : 'text-dark dark:text-white hover:text-primary border-gray-300 dark:border-gray-600'
                }`}
              >
                <Phone size={20} />
                +1-555-DESIGN
              </Link>
            </div>
            <div>
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className={`flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border transition-all duration-300 ${isHomepage
                  ? sticky
                    ? 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 border-gray-900 dark:border-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100 border-white'
                  : 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 border-gray-900 dark:border-white'
                  }`}
                aria-label='Toggle mobile menu'>
                <Menu size={24} />
                <span className='hidden sm:block'>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {
        navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )
      }

      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full bg-dark shadow-lg transition-transform duration-300 max-w-2xl ${navbarOpen ? 'translate-x-0' : 'translate-x-full'} z-50 px-8 sm:px-20 overflow-auto relative`}
      >
        {/* Background Vector Image */}
        <div className="absolute right-0 top-0 opacity-20">
          <Image
            src="/images/testimonial/Vector.png"
            alt="background"
            width={400}
            height={600}
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="">
            <div className='flex items-center justify-start py-10'>
              <button
                onClick={() => setNavbarOpen(false)}
                aria-label='Close mobile menu'
                className='bg-white p-3 rounded-full hover:bg-gray-100 transition-colors'>
                <X size={24} className='text-black' />
              </button>
            </div>
            <nav className='flex flex-col items-start gap-4'>
              <ul className='w-full space-y-4'>
                {navLinks.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      onClick={() => setNavbarOpen(false)}
                      className={`block text-2xl font-medium text-white hover:text-primary transition-colors py-2 ${pathname === item.href ? 'text-primary' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8'>
                  <Link href="/auth/login" className='py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full border border-primary font-semibold hover:bg-primary/90 transition-colors'>
                    Sign In
                  </Link>
                  <Link href="/contact" className='py-4 px-8 bg-transparent border border-primary text-base leading-4 block w-fit text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors'>
                    Get Quote
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='flex flex-col gap-1 my-16 text-white'>
            <p className='text-base sm:text-xm font-normal text-white/40'>
              Contact
            </p>
            <Link href="mailto:chicco007@PulseArchitects.com" className='text-base sm:text-xm font-medium text-inherit hover:text-primary'>
              chicco007@PulseArchitects.com
            </Link>
            <Link href="tel:+33612776498" className='text-base sm:text-xm font-medium text-inherit hover:text-primary'>
              +33 6 12 77 64 98
            </Link>
          </div>
        </div>
      </div>
      
      <CartDrawer />
    </header>
  )
}

export default Header