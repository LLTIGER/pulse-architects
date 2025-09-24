"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, FileText, File, Archive, Eye, Calendar, User, Shield, Clock, Filter, Search } from 'lucide-react'

const DownloadsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Downloads', count: 24 },
    { id: 'plans', name: 'Architectural Plans', count: 12 },
    { id: 'documents', name: 'Documents', count: 6 },
    { id: 'resources', name: 'Resources', count: 4 },
    { id: 'templates', name: 'Templates', count: 2 }
  ]

  const downloadItems = [
    {
      id: 1,
      title: 'Modern Villa Complete Set',
      category: 'plans',
      type: 'Architectural Plans',
      description: 'Complete architectural plans including floor plans, elevations, sections, and construction details for a modern luxury villa.',
      fileSize: '15.2 MB',
      fileType: 'ZIP',
      downloads: 1234,
      uploadDate: '2025-09-15',
      preview: '/images/downloads/modern-villa-preview.jpg',
      files: [
        'Floor Plans (PDF, DWG)',
        'Elevations (PDF, DWG)', 
        'Sections (PDF, DWG)',
        'Construction Details',
        '3D Models (RVT)',
        'Material Specifications'
      ],
      license: 'Single Use',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Building Code Compliance Checklist',
      category: 'documents',
      type: 'Document',
      description: 'Comprehensive checklist for ensuring your architectural plans meet local building codes and regulations.',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloads: 892,
      uploadDate: '2025-09-10',
      preview: '/images/downloads/compliance-preview.jpg',
      files: [
        'Compliance Checklist (PDF)',
        'Code Reference Guide',
        'Common Violations Guide'
      ],
      license: 'Free Use',
      price: 'Free'
    },
    {
      id: 3,
      title: 'Sustainable Design Guidelines',
      category: 'resources',
      type: 'Resource Guide',
      description: 'Complete guide to sustainable architecture practices, green building materials, and energy-efficient design strategies.',
      fileSize: '8.7 MB',
      fileType: 'PDF',
      downloads: 567,
      uploadDate: '2025-09-08',
      preview: '/images/downloads/sustainable-preview.jpg',
      files: [
        'Sustainable Design Guide (PDF)',
        'Material Selection Guide',
        'Energy Calculation Templates',
        'LEED Checklist'
      ],
      license: 'Educational Use',
      price: 'Free'
    },
    {
      id: 4,
      title: 'CAD Drawing Templates',
      category: 'templates',
      type: 'CAD Templates',
      description: 'Professional CAD drawing templates with standard layers, title blocks, and drawing conventions.',
      fileSize: '12.4 MB',
      fileType: 'DWG',
      downloads: 432,
      uploadDate: '2025-09-05',
      preview: '/images/downloads/cad-templates-preview.jpg',
      files: [
        'Floor Plan Template',
        'Elevation Template',
        'Section Template',
        'Detail Template',
        'Title Blocks',
        'Standard Symbols Library'
      ],
      license: 'Commercial Use',
      price: '$19.99'
    },
    {
      id: 5,
      title: 'Contemporary House Plans Collection',
      category: 'plans',
      type: 'Architectural Plans',
      description: 'Collection of 5 contemporary house designs ranging from 1,800 to 3,500 square feet.',
      fileSize: '45.3 MB',
      fileType: 'ZIP',
      downloads: 789,
      uploadDate: '2025-09-01',
      preview: '/images/downloads/contemporary-collection-preview.jpg',
      files: [
        '5 Complete House Plans',
        'Floor Plans & Elevations',
        'Construction Details',
        'Material Lists',
        'Site Planning Guidelines'
      ],
      license: 'Multiple Use',
      price: '$149.99'
    },
    {
      id: 6,
      title: 'Project Management Templates',
      category: 'documents',
      type: 'Business Templates',
      description: 'Essential project management templates for architectural firms including contracts, schedules, and checklists.',
      fileSize: '5.8 MB',
      fileType: 'DOCX',
      downloads: 345,
      uploadDate: '2025-08-28',
      preview: '/images/downloads/project-mgmt-preview.jpg',
      files: [
        'Client Contract Templates',
        'Project Schedule Templates',
        'Quality Control Checklists',
        'Budget Tracking Sheets'
      ],
      license: 'Business Use',
      price: '$39.99'
    }
  ]

  const filteredItems = downloadItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <FileText className='w-8 h-8 text-red-500' />
      case 'ZIP':
        return <Archive className='w-8 h-8 text-blue-500' />
      case 'DWG':
        return <File className='w-8 h-8 text-green-500' />
      case 'DOCX':
        return <FileText className='w-8 h-8 text-blue-600' />
      default:
        return <File className='w-8 h-8 text-gray-500' />
    }
  }

  return (
    <div className='min-h-screen pt-24'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-dark dark:text-white mb-8 leading-tight'>
            Download{' '}
            <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
              Center
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-dark/60 dark:text-white/60 max-w-4xl mx-auto mb-12'>
            Access our comprehensive library of architectural plans, documents, templates, 
            and resources to accelerate your design and construction projects.
          </p>
          <div className='flex items-center justify-center gap-6 text-sm text-dark/60 dark:text-white/60'>
            <span className='flex items-center gap-2'>
              <Download className='w-4 h-4' />
              10K+ Downloads
            </span>
            <span className='flex items-center gap-2'>
              <Shield className='w-4 h-4' />
              Secure Downloads
            </span>
            <span className='flex items-center gap-2'>
              <Clock className='w-4 h-4' />
              Updated Weekly
            </span>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='py-12 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            {/* Search Bar */}
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark/40 dark:text-white/40' />
              <input
                type='text'
                placeholder='Search downloads...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/10 border border-transparent rounded-full text-dark dark:text-white placeholder-dark/60 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-white/20 transition-all duration-300'
              />
            </div>

            {/* Category Filters */}
            <div className='flex flex-wrap items-center gap-3'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-white/10 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className='group bg-white dark:bg-dark rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/10 overflow-hidden'
              >
                <div className='p-8'>
                  {/* Header */}
                  <div className='flex items-start justify-between mb-6'>
                    <div className='flex items-start gap-4'>
                      <div className='flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-white/10 rounded-xl flex items-center justify-center'>
                        {getFileIcon(item.fileType)}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary transition-colors duration-300'>
                          {item.title}
                        </h3>
                        <div className='flex items-center gap-4 text-sm text-dark/60 dark:text-white/60'>
                          <span className='px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold'>
                            {item.type}
                          </span>
                          <span>{item.fileSize}</span>
                          <span>{item.fileType}</span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-lg font-bold text-primary mb-1'>
                        {item.price}
                      </div>
                      <div className='text-xs text-dark/60 dark:text-white/60'>
                        {item.license}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-dark/70 dark:text-white/70 mb-6 leading-relaxed'>
                    {item.description}
                  </p>

                  {/* File List */}
                  <div className='mb-6'>
                    <h4 className='text-sm font-semibold text-dark dark:text-white mb-3'>
                      Included Files:
                    </h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      {item.files.map((file, index) => (
                        <div key={index} className='flex items-center gap-2 text-sm text-dark/60 dark:text-white/60'>
                          <div className='w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0' />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className='flex items-center justify-between mb-6 pt-6 border-t border-gray-200 dark:border-white/10'>
                    <div className='flex items-center gap-4 text-sm text-dark/60 dark:text-white/60'>
                      <span className='flex items-center gap-1'>
                        <Download className='w-4 h-4' />
                        {item.downloads.toLocaleString()}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex items-center gap-3'>
                    <button className='flex-1 bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2'>
                      <Download className='w-5 h-5' />
                      Download
                    </button>
                    <button className='w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-dark/60 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-300'>
                      <Eye className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className='text-center py-16'>
              <div className='w-24 h-24 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Search className='w-12 h-12 text-dark/40 dark:text-white/40' />
              </div>
              <h3 className='text-xl font-semibold text-dark dark:text-white mb-2'>
                No downloads found
              </h3>
              <p className='text-dark/60 dark:text-white/60 mb-6'>
                Try adjusting your search criteria or browse all categories.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className='btn-homely-primary'
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className='py-24 bg-gray-50 dark:bg-dark'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Featured Resources
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              Essential downloads for architects, builders, and design professionals.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Starter Plan Bundle',
                description: '10 essential architectural plans perfect for beginning architects',
                icon: Archive,
                downloads: '2.1K',
                type: 'Bundle'
              },
              {
                title: 'CAD Standards Guide',
                description: 'Professional CAD drawing standards and best practices',
                icon: FileText,
                downloads: '1.8K',
                type: 'Guide'
              },
              {
                title: 'Building Code Handbook',
                description: 'Comprehensive building code reference for all major jurisdictions',
                icon: File,
                downloads: '3.2K',
                type: 'Reference'
              }
            ].map((resource, index) => {
              const Icon = resource.icon
              return (
                <div key={index} className='bg-white dark:bg-black p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 dark:border-white/10'>
                  <div className='w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <Icon className='w-10 h-10 text-primary' />
                  </div>
                  <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                    {resource.title}
                  </h3>
                  <p className='text-dark/60 dark:text-white/60 mb-6'>
                    {resource.description}
                  </p>
                  <div className='flex items-center justify-between mb-6'>
                    <span className='px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full'>
                      {resource.type}
                    </span>
                    <span className='text-sm text-dark/60 dark:text-white/60'>
                      {resource.downloads} downloads
                    </span>
                  </div>
                  <button className='w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300'>
                    Download Now
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-b from-primary/5 via-skyblue/10 to-lightskyblue/5 dark:from-primary/10 dark:via-skyblue/5 dark:to-lightskyblue/10'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
            Need Something Custom?
          </h2>
          <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto mb-12'>
            Can't find what you're looking for? Contact us to create custom plans, 
            documents, or resources tailored to your specific needs.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link 
              href='/contact'
              className='btn-homely-primary'
            >
              Request Custom Plans
            </Link>
            <Link 
              href='/services'
              className='btn-homely-secondary'
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DownloadsPage