"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Eye, Download, Heart, Filter, Grid, List } from 'lucide-react'

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')

  const categories = [
    { id: 'all', name: 'All Projects', count: 48 },
    { id: 'residential', name: 'Residential', count: 24 },
    { id: 'commercial', name: 'Commercial', count: 12 },
    { id: 'luxury', name: 'Luxury Villas', count: 8 },
    { id: 'modern', name: 'Modern', count: 16 },
    { id: 'traditional', name: 'Traditional', count: 12 }
  ]

  const galleryItems = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      category: 'luxury',
      type: 'residential',
      image: '/images/about/service1.jpg',
      description: '5,200 sq ft modern villa with panoramic views',
      tags: ['Modern', 'Luxury', '5BR', 'Pool'],
      views: 1234,
      downloads: 89,
      likes: 156
    },
    {
      id: 2,
      title: 'Contemporary Family Home',
      category: 'residential',
      type: 'residential',
      image: '/images/about/service2.jpg',
      description: '3,800 sq ft family home with open concept design',
      tags: ['Contemporary', 'Family', '4BR', 'Garden'],
      views: 987,
      downloads: 64,
      likes: 123
    },
    {
      id: 3,
      title: 'Traditional Colonial Estate',
      category: 'traditional',
      type: 'residential',
      image: '/images/about/service3.jpg',
      description: '6,100 sq ft colonial estate with classic elegance',
      tags: ['Traditional', 'Colonial', '6BR', 'Estate'],
      views: 1456,
      downloads: 102,
      likes: 189
    },
    {
      id: 4,
      title: 'Commercial Office Complex',
      category: 'commercial',
      type: 'commercial',
      image: '/images/about/service4.jpg',
      description: '50,000 sq ft office complex with sustainable design',
      tags: ['Commercial', 'Office', 'Sustainable', 'LEED'],
      views: 2145,
      downloads: 234,
      likes: 267
    },
    {
      id: 5,
      title: 'Minimalist Urban Loft',
      category: 'modern',
      type: 'residential',
      image: '/images/about/service5.jpg',
      description: '2,100 sq ft loft with industrial modern aesthetic',
      tags: ['Modern', 'Loft', '2BR', 'Urban'],
      views: 856,
      downloads: 45,
      likes: 98
    },
    {
      id: 6,
      title: 'Mediterranean Villa',
      category: 'luxury',
      type: 'residential',
      image: '/images/about/service6.jpg',
      description: '4,900 sq ft Mediterranean villa with courtyard',
      tags: ['Mediterranean', 'Villa', '5BR', 'Courtyard'],
      views: 1789,
      downloads: 134,
      likes: 223
    }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className='min-h-screen pt-24'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-dark dark:text-white mb-8 leading-tight'>
            Architectural{' '}
            <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
              Gallery
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-dark/60 dark:text-white/60 max-w-4xl mx-auto mb-12'>
            Explore our portfolio of exceptional architectural designs spanning residential, 
            commercial, and luxury projects from around the world.
          </p>
          <div className='flex items-center justify-center gap-4 text-sm text-dark/60 dark:text-white/60'>
            <span className='flex items-center gap-2'>
              <Eye className='w-4 h-4' />
              50K+ Views
            </span>
            <span className='flex items-center gap-2'>
              <Download className='w-4 h-4' />
              2K+ Downloads
            </span>
            <span className='flex items-center gap-2'>
              <Heart className='w-4 h-4' />
              5K+ Likes
            </span>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className='py-12 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            {/* Category Filters */}
            <div className='flex flex-wrap items-center gap-3'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-white/10 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-dark/60 dark:text-white/60'>
                View:
              </span>
              <div className='flex items-center bg-gray-100 dark:bg-white/10 rounded-full p-1'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-dark text-primary shadow-sm'
                      : 'text-dark/60 dark:text-white/60'
                  }`}
                >
                  <Grid className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'masonry'
                      ? 'bg-white dark:bg-dark text-primary shadow-sm'
                      : 'text-dark/60 dark:text-white/60'
                  }`}
                >
                  <List className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'columns-1 md:columns-2 lg:columns-3'
          }`}>
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
              >
                <div className='relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-dark'>
                  {/* Image */}
                  <div className='relative overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={viewMode === 'masonry' ? 300 + (index % 3) * 100 : 300}
                      className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
                      unoptimized={true}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    
                    {/* Overlay Actions */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center gap-3'>
                        <Link
                          href={`/gallery/${item.id}`}
                          className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300'
                        >
                          <Eye className='w-5 h-5' />
                        </Link>
                        <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300'>
                          <Heart className='w-5 h-5' />
                        </button>
                        <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300'>
                          <Download className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full'>
                        {item.category.toUpperCase()}
                      </span>
                      <div className='flex items-center gap-4 text-xs text-dark/60 dark:text-white/60'>
                        <span className='flex items-center gap-1'>
                          <Eye className='w-3 h-3' />
                          {item.views.toLocaleString()}
                        </span>
                        <span className='flex items-center gap-1'>
                          <Download className='w-3 h-3' />
                          {item.downloads}
                        </span>
                      </div>
                    </div>

                    <h3 className='text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary transition-colors duration-300'>
                      {item.title}
                    </h3>
                    
                    <p className='text-dark/60 dark:text-white/60 mb-4 leading-relaxed'>
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className='px-2 py-1 bg-gray-100 dark:bg-white/10 text-xs text-dark dark:text-white rounded'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/gallery/${item.id}`}
                      className='inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300'
                    >
                      View Details
                      <ArrowRight className='w-4 h-4' />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className='text-center mt-16'>
            <button className='btn-homely-secondary'>
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-b from-primary/5 via-skyblue/10 to-lightskyblue/5 dark:from-primary/10 dark:via-skyblue/5 dark:to-lightskyblue/10'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
            Inspired by Our Work?
          </h2>
          <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto mb-12'>
            Browse our complete collection of architectural plans or get in touch to discuss your custom project.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link 
              href='/catalog'
              className='btn-homely-primary'
            >
              Browse All Plans
            </Link>
            <Link 
              href='/contact'
              className='btn-homely-secondary'
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GalleryPage