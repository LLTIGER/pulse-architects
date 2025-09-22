'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface HomelyHeroProps {
  className?: string;
  location?: string;
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  features?: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

export const HomelyHero: React.FC<HomelyHeroProps> = ({
  className,
  location = "Palm Springs, CA",
  title,
  description,
  primaryButtonText = "Get in touch",
  primaryButtonHref = "/contact",
  secondaryButtonText = "View Details",
  secondaryButtonHref = "#details",
  heroImageSrc = "/images/hero/architectural-hero.jpg",
  heroImageAlt = "Modern Architecture",
  features = [
    { icon: "🏠", label: "Bedrooms", value: "4" },
    { icon: "🚿", label: "Bathrooms", value: "4" },
    { icon: "🚗", label: "Parking", value: "2 spaces" },
    { icon: "💰", label: "Price", value: "$2,750,000" }
  ]
}) => {
  return (
    <section className={cn('!py-0', className)}>
      <div className="bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 overflow-hidden relative">
        
        {/* Main Content Container */}
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68">
          
          {/* Hero Text Content */}
          <div className="relative text-white dark:text-dark text-center md:text-start z-10">
            {/* Location */}
            <p className="text-inherit text-xm font-medium mb-4">
              {location}
            </p>
            
            {/* Main Title */}
            <h1 className="text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6">
              {title}
            </h1>
            
            {/* Description */}
            {description && (
              <p className="text-inherit text-lg md:max-w-45p mb-8 leading-relaxed">
                {description}
              </p>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-4">
              <Link href={primaryButtonHref}>
                <Button 
                  variant="primary" 
                  size="default"
                  className="btn-homely-primary"
                >
                  {primaryButtonText}
                </Button>
              </Link>
              
              <Link href={secondaryButtonHref}>
                <Button 
                  variant="secondary" 
                  size="default"
                  className="btn-homely-secondary"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image (Desktop) */}
          <div className="hidden md:block absolute -top-2 -right-68">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              width={1082}
              height={1016}
              priority={true}
              className="object-cover w-auto h-auto"
            />
          </div>
        </div>
        
        {/* Features Section */}
        <div className="md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col sm:items-center gap-3">
                {/* Feature Icon */}
                <div className="text-2xl">
                  {feature.icon}
                </div>
                
                {/* Feature Content */}
                {feature.label === "Price" ? (
                  <>
                    <p className="text-2xl sm:text-3xl font-medium text-inherit">
                      {feature.value}
                    </p>
                    <p className="text-sm sm:text-base font-normal text-black/50 dark:text-white/50">
                      For selling price
                    </p>
                  </>
                ) : (
                  <p className="text-sm sm:text-base font-normal text-inherit">
                    {feature.value} {feature.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomelyHero;