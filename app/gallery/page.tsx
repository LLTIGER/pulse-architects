"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Eye, Download, Heart, Grid, List } from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  cloudinaryUrl: string
  category: string
  uploadedAt: string
  uploadedBy: {
    name: string
  }
  width: number
  height: number
  fileSize: number
}

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery/images')
      if (response.ok) {
        const data = await response.json()
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Failed to fetch gallery images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (imageId: string, license: 'PREVIEW' | 'STANDARD' | 'COMMERCIAL' | 'EXTENDED' = 'PREVIEW') => {
    try {
      const token = localStorage.getItem('auth_token')
      const headers: HeadersInit = {}
      
      // Add auth header if user is logged in
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`/api/download/${imageId}?license=${license}`, {
        method: 'GET',
        headers
      })

      if (response.ok) {
        // Get the filename from the Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition')
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
          : `image-${imageId}.jpg`

        // Create blob and download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Download failed')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed. Please try again.')
    }
  }

  const categories = [
    { id: 'all', name: 'All Projects', count: images.length },
    { id: 'ARCHITECTURAL_PLAN', name: 'Architectural Plans', count: images.filter(img => img.category === 'ARCHITECTURAL_PLAN').length },
    { id: 'RESIDENTIAL', name: 'Residential', count: images.filter(img => img.category === 'RESIDENTIAL').length },
    { id: 'COMMERCIAL', name: 'Commercial', count: images.filter(img => img.category === 'COMMERCIAL').length },
    { id: 'LUXURY', name: 'Luxury', count: images.filter(img => img.category === 'LUXURY').length }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory)

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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No images found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No approved images in this category yet.
              </p>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'columns-1 md:columns-2 lg:columns-3'
            }`}>
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
                >
                <div className='relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-dark'>
                  {/* Image */}
                  <div className='relative overflow-hidden'>
                    <Image
                      src={image.cloudinaryUrl}
                      alt={image.title}
                      width={image.width}
                      height={image.height}
                      className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
                      unoptimized={true}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    
                    {/* Overlay Actions */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center gap-3'>
                        <Link
                          href={`/gallery/${image.id}`}
                          className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300'
                        >
                          <Eye className='w-5 h-5' />
                        </Link>
                        <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300'>
                          <Heart className='w-5 h-5' />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault()
                            handleDownload(image.id, 'PREVIEW')
                          }}
                          className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300'
                        >
                          <Download className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full'>
                        {image.category}
                      </span>
                      <div className='flex items-center gap-4 text-xs text-dark/60 dark:text-white/60'>
                        <span className='flex items-center gap-1'>
                          <Eye className='w-3 h-3' />
                          {image.width} × {image.height}
                        </span>
                        <span className='flex items-center gap-1'>
                          <Download className='w-3 h-3' />
                          {(image.fileSize / 1024 / 1024).toFixed(1)}MB
                        </span>
                      </div>
                    </div>

                    <h3 className='text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary transition-colors duration-300'>
                      {image.title}
                    </h3>
                    
                    <p className='text-dark/60 dark:text-white/60 mb-4 leading-relaxed'>
                      By {image.uploadedBy.name} • {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/gallery/${image.id}`}
                        className='inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300'
                      >
                        View Details
                        <ArrowRight className='w-4 h-4' />
                      </Link>
                      
                      <Link
                        href={`/purchase/checkout?imageId=${image.id}&license=STANDARD`}
                        className='btn-homely-primary text-sm px-4 py-2'
                      >
                        Buy License
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

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