import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Home } from 'lucide-react'

const PropertyCategoriesSection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Vectors */}
      <div className="absolute left-0 top-0">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
        />
      </div>

      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-10">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Home className="text-2xl text-primary" />
              Categories
            </p>
            <h2 className="lg:text-52 text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white">
              Explore best properties with expert services.
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              Discover a diverse range of premium properties, from luxurious apartments to spacious villas, tailored to your needs
            </p>
            <Link 
              href="/catalog"
              className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300"
            >
              View properties
            </Link>
          </div>

          {/* Right Column - Large Property Card */}
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/catalog?category=residential">
                <Image
                  src="/images/categories/villas.jpg"
                  alt="Residential Homes"
                  width={680}
                  height={386}
                  className="w-full object-cover"
                />
              </Link>
              <Link
                href="/catalog?category=residential"
                className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500"
              >
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <ArrowRight size={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Residential Homes</h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Left - Luxury Villas */}
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/catalog?category=villa">
                <Image
                  src="/images/categories/luxury-villa.jpg"
                  alt="Luxury Villas"
                  width={680}
                  height={386}
                  className="w-full object-cover"
                />
              </Link>
              <Link
                href="/catalog?category=villa"
                className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500"
              >
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <ArrowRight size={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Luxury villas</h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Right Small - Apartments */}
          <div className="lg:col-span-3 col-span-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/catalog?category=apartment">
                <Image
                  src="/images/categories/appartment.jpg"
                  alt="Apartments"
                  width={320}
                  height={386}
                  className="w-full object-cover"
                />
              </Link>
              <Link
                href="/catalog?category=apartment"
                className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500"
              >
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <ArrowRight size={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Apartment</h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Right Small - Office Spaces */}
          <div className="lg:col-span-3 col-span-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/catalog?category=office">
                <Image
                  src="/images/categories/office.jpg"
                  alt="Office Spaces"
                  width={320}
                  height={386}
                  className="w-full object-cover"
                />
              </Link>
              <Link
                href="/catalog?category=office"
                className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500"
              >
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <ArrowRight size={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Office Spaces</h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyCategoriesSection