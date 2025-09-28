import React from 'react';
import { HomelyHero } from '@/components/sections/HomelyHero';
import { Button } from '@/components/ui/Button';

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Homely Hero Section */}
      <HomelyHero
        location="Palm Springs, CA"
        title="Modern Architectural Excellence"
        description="Discover our collection of award-winning residential designs that blend innovation with timeless elegance. Each plan is crafted to maximize space, light, and functionality."
        primaryButtonText="Explore Plans"
        primaryButtonHref="/catalog"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
        features={[
          { icon: "🏠", label: "Bedrooms", value: "4" },
          { icon: "🚿", label: "Bathrooms", value: "4" },
          { icon: "🚗", label: "Parking", value: "2 spaces" },
          { icon: "💰", label: "Starting at", value: "$2,750,000" }
        ]}
      />

      {/* Design System Showcase */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-40 md:text-52 font-bold text-dark dark:text-white mb-6">
              Homely Design System Integration
            </h2>
            <p className="text-xm text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Experience our enhanced design system that combines the modern aesthetics of Homely 
              with our architectural platform functionality.
            </p>
          </div>

          {/* Button Variants Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-b from-skyblue via-lightskyblue to-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Homely Buttons</h3>
              <div className="space-y-4">
                <Button variant="primary" size="default">
                  Primary Button
                </Button>
                <Button variant="secondary" size="default">
                  Secondary Button
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold text-dark dark:text-white mb-6">Design System</h3>
              <div className="space-y-4">
                <Button variant="design-primary" size="default">
                  Design Primary
                </Button>
                <Button variant="premium" size="default">
                  Premium Style
                </Button>
              </div>
            </div>

            <div className="bg-neutral-900 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Glass Effects</h3>
              <div className="space-y-4">
                <Button variant="glass" size="default">
                  Glass Button
                </Button>
                <Button variant="outline" size="default">
                  Outline Style
                </Button>
              </div>
            </div>
          </div>

          {/* Typography Showcase */}
          <div className="bg-gradient-to-r from-primary-50 to-skyblue-50 dark:from-neutral-900 dark:to-neutral-800 p-12 rounded-3xl">
            <h3 className="text-52 font-bold text-dark dark:text-white mb-8">
              Typography Scale
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-9xl font-semibold text-primary-500 mb-4">Aa</p>
                <p className="text-xm text-neutral-600 dark:text-neutral-400">
                  Bricolage Grotesque font family with Homely sizing system
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-40 font-bold text-dark dark:text-white">
                  Heading 40px
                </p>
                <p className="text-xm text-neutral-600 dark:text-neutral-400">
                  Body text using Homely's text-xm (1.125rem) with perfect line height
                </p>
                <p className="text-sm text-neutral-500">
                  Small text for supporting information
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}