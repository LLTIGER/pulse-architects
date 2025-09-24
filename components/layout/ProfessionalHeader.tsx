'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Browse Plans', href: '/catalog' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
]

const ProfessionalHeader: React.FC = () => {
  const [sticky, setSticky] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  const sideMenuRef = useRef<HTMLDivElement>(null)

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

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className={`fixed h-24 py-1 z-50 w-full bg-transparent transition-all duration-300 lg:px-0 px-4 ${sticky ? "top-3" : "top-0"}`}>
      <nav className={`container mx-auto max-w-7xl flex items-center justify-between py-4 duration-300 ${sticky ? "shadow-lg bg-white dark:bg-gray-900 rounded-full top-5 px-4" : "shadow-none top-0"}`}>
        <div className='flex justify-between items-center gap-2 w-full'>
          {/* Logo */}
          <div>
            <Link href='/' className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className={`text-xl font-bold ${isHomepage ? (sticky ? "text-gray-900 dark:text-white" : "text-white") : "text-gray-900 dark:text-white"}`}>
                Pulse Architects
              </span>
            </Link>
          </div>

          {/* Right side controls */}
          <div className='flex items-center gap-2 sm:gap-6'>
            {/* Theme toggle */}
            <button
              className='hover:cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              onClick={toggleTheme}
            >
              {isDark ? (
                <Sun 
                  size={24} 
                  className="text-yellow-500" 
                />
              ) : (
                <Moon 
                  size={24} 
                  className={`${isHomepage ? (sticky ? 'text-gray-900' : 'text-white') : 'text-gray-900'}`} 
                />
              )}
            </button>

            {/* Contact info */}
            <div className={`hidden md:block`}>
              <Link 
                href='tel:+1-212-456-789' 
                className={`text-base flex items-center gap-2 border-r pr-6 transition-colors ${
                  isHomepage
                    ? sticky
                      ? 'text-gray-900 dark:text-white hover:text-blue-600 border-gray-300 dark:border-gray-600'
                      : 'text-white hover:text-blue-300 border-white/30'
                    : 'text-gray-900 dark:text-white hover:text-blue-600 border-gray-300 dark:border-gray-600'
                }`}
              >
                <Phone size={20} />
                +1-212-456-789
              </Link>
            </div>

            {/* Menu button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className={`flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border transition-all duration-300 ${
                isHomepage
                  ? sticky
                    ? 'text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 border-gray-900 dark:border-white'
                    : 'text-gray-900 bg-white hover:bg-gray-100 border-white'
                  : 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 border-gray-900 dark:border-white'
              }`}
              aria-label='Toggle mobile menu'
            >
              <Menu size={24} />
              <span className='hidden sm:block'>Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {navbarOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
      )}

      {/* Slide-out menu */}
      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full bg-gray-900 dark:bg-gray-800 shadow-lg transition-transform duration-300 max-w-2xl ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50 px-8 sm:px-20 overflow-auto`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Close button */}
            <div className='flex items-center justify-start py-10'>
              <button
                onClick={() => setNavbarOpen(false)}
                aria-label='Close mobile menu'
                className='bg-white p-3 rounded-full hover:bg-gray-100 transition-colors'
              >
                <X size={24} className="text-black" />
              </button>
            </div>

            {/* Navigation */}
            <nav className='flex flex-col items-start gap-4'>
              <ul className='w-full space-y-4'>
                {navLinks.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      onClick={() => setNavbarOpen(false)}
                      className={`block text-2xl font-medium text-white hover:text-blue-400 transition-colors py-2 ${
                        pathname === item.href ? 'text-blue-400' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                
                {/* Auth buttons */}
                <li className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8'>
                  <Link 
                    href="/auth/login" 
                    className='py-4 px-8 bg-blue-600 text-base leading-4 block w-fit text-white rounded-full border border-blue-600 font-semibold hover:bg-blue-700 transition-colors'
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className='py-4 px-8 bg-transparent border border-blue-600 text-base leading-4 block w-fit text-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors'
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact info */}
          <div className='flex flex-col gap-1 my-16 text-white'>
            <p className='text-base font-normal text-white/60'>
              Contact
            </p>
            <Link 
              href="mailto:chicco007@PulseArchitects.com" 
              className='text-base font-medium text-inherit hover:text-blue-400 transition-colors'
            >
              chicco007@PulseArchitects.com
            </Link>
            <Link 
              href="tel:+33612776498" 
              className='text-base font-medium text-inherit hover:text-blue-400 transition-colors'
            >
              +33 6 12 77 64 98
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ProfessionalHeader