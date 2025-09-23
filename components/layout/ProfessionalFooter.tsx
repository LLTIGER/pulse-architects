import Link from "next/link"
import { Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = [
  { label: 'Browse Plans', href: '/catalog' },
  { label: 'Categories', href: '/categories' },
  { label: 'Custom Design', href: '/custom-request' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Help Center', href: '/help' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' }
]

const ProfessionalFooter = () => {
  return (
    <footer className="relative z-10 bg-gray-900 dark:bg-black">
      <div className="container mx-auto max-w-7xl pt-16 px-4 sm:px-6 lg:px-0">
        
        {/* Newsletter section */}
        <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-16 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <div className="lg:max-w-md">
            <h3 className="text-white text-2xl font-bold mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm">
              Get the latest architectural plans, design trends, and exclusive offers delivered to your inbox.
            </p>
          </div>
          
          <div className="flex lg:flex-row flex-col items-center lg:gap-4 gap-3">
            <div className="flex gap-2 lg:order-1 order-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="rounded-full py-4 px-6 bg-white/10 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all w-64"
              />
              <button className="text-gray-900 bg-white py-4 px-8 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-xs lg:max-w-48 order-1 lg:order-2 text-center lg:text-left">
              By subscribing, you agree to our privacy policy. Unsubscribe at any time.
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter size={20} className="text-white" />
              </div>
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={20} className="text-white" />
              </div>
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram size={20} className="text-white" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-12 gap-8">
            
            {/* Company info */}
            <div className="lg:col-span-5 md:col-span-6 col-span-12">
              <div className="mb-8">
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm" />
                  </div>
                  <span className="text-2xl font-bold text-white">Pulse Architects</span>
                </Link>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Professional architectural plans for residential, commercial, and industrial projects. 
                  Licensed architects delivering quality designs that meet building codes and exceed expectations.
                </p>
              </div>
              
              {/* Contact info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={20} className="text-blue-400" />
                  <span>hello@pulsearchitects.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={20} className="text-blue-400" />
                  <span>+1-212-456-7890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={20} className="text-blue-400" />
                  <span>123 Architecture Ave, Design City, DC 12345</span>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className="inline-block mt-8 bg-blue-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-blue-700 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
            
            {/* Quick links */}
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
              <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
              <div className="flex flex-col gap-4">
                {footerLinks.slice(0, 4).map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Support links */}
            <div className="lg:col-span-2 md:col-span-3 sm:col-span-6 col-span-12">
              <h4 className="text-white font-semibold text-lg mb-6">Support</h4>
              <div className="flex flex-col gap-4">
                {footerLinks.slice(4, 8).map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Services */}
            <div className="lg:col-span-2 md:col-span-12 col-span-12">
              <h4 className="text-white font-semibold text-lg mb-6">Services</h4>
              <div className="flex flex-col gap-4">
                <Link href="/catalog?category=residential" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                  Residential Plans
                </Link>
                <Link href="/catalog?category=commercial" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                  Commercial Design
                </Link>
                <Link href="/custom-request" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                  Custom Architecture
                </Link>
                <Link href="/consultation" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                  Design Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-8 gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 Pulse Architects. All rights reserved. Designed with precision and passion.
          </p>
          <div className="flex gap-8 items-center">
            <Link href="/terms" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ProfessionalFooter