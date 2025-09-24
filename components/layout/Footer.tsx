import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const Footer = () => {
  const architecturalLinks = [
    { label: 'Modern Homes', href: '/catalog?category=modern' },
    { label: 'Traditional Designs', href: '/catalog?category=traditional' },
    { label: 'Contemporary Plans', href: '/catalog?category=contemporary' },
    { label: 'Luxury Villas', href: '/catalog?category=luxury' }
  ]

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Categories', href: '/categories' }
  ]

  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
        {/* Newsletter Section */}
        <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <p className="text-white text-sm lg:max-w-1/5">
            Stay updated with the latest architectural trends,
            new plan releases, and exclusive design insights.
          </p>
          <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-3">
            <div className="flex gap-2 lg:order-1 order-2">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0 focus:ring-2 focus:ring-primary" 
              />
              <button className="text-black bg-white py-4 px-8 font-semibold rounded-full hover:bg-primary hover:text-white duration-300 hover:cursor-pointer">
                Subscribe
              </button>
            </div>
            <p className="text-white/40 text-sm lg:max-w-[45%] order-1 lg:order-2">
              By subscribing, you agree to receive our promotional emails. You can unsubscribe at any time.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" aria-label="Follow us on Twitter">
              <Twitter size={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#" aria-label="Follow us on Facebook">
              <Facebook size={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#" aria-label="Follow us on Instagram">
              <Instagram size={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#" aria-label="Connect on LinkedIn">
              <Linkedin size={24} className="text-white hover:text-primary duration-300" />
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-12 sm:gap-10 gap-y-6">
            <div className="md:col-span-7 col-span-12">
              <h2 className="text-white leading-[1.2] text-3xl md:text-4xl font-medium mb-6 lg:max-w-3/4">
                Ready to build your dream home? 
                Contact us today.
              </h2>
              <p className="text-white/60 mb-6 text-lg leading-relaxed">
                Transform your vision into reality with our premium architectural plans 
                and professional design services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/contact" 
                  className="bg-primary text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-black duration-300 hover:cursor-pointer inline-block text-center"
                >
                  Get In Touch
                </Link>
                <Link 
                  href="/catalog" 
                  className="bg-transparent border border-white text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-black duration-300 hover:cursor-pointer inline-block text-center"
                >
                  Browse Plans
                </Link>
              </div>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-white/80">
                  <Phone size={20} className="text-primary" />
                  <span className="text-sm">+33 6 12 77 64 98</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail size={20} className="text-primary" />
                  <span className="text-sm">chicco007@PulseArchitects.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 sm:col-span-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-sm">3 Avenue Jacques Prévert, 77200 Torcy, France</span>
                </div>
              </div>
            </div>
            
            {/* Architectural Plans Links */}
            <div className="md:col-span-3 sm:col-span-6 col-span-12">
              <h3 className="text-white font-semibold mb-4 text-lg">Plan Categories</h3>
              <div className="flex flex-col gap-4 w-fit">
                {architecturalLinks.map((item, index) => (
                  <div key={index}>
                    <Link href={item.href} className="text-white/40 text-base hover:text-white transition-colors duration-300">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Company Links */}
            <div className="md:col-span-2 sm:col-span-6 col-span-12">
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <div className="flex flex-col gap-4 w-fit">
                {companyLinks.map((item, index) => (
                  <div key={index}>
                    <Link href={item.href} className="text-white/40 text-base hover:text-white transition-colors duration-300">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6">
          <p className="text-white/40 text-sm">
            ©2025 Pulse Architects - Premium Architectural Plans & Design Services
          </p>
          <div className="flex gap-8 items-center">
            <Link href="#" className="text-white/40 hover:text-primary text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/40 hover:text-primary text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/40 hover:text-primary text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer