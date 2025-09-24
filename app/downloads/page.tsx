"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, File, FileCheck, Clock, CheckCircle, AlertCircle, Search, Filter, Eye, Star, User } from 'lucide-react'

// This would typically come from the user's order/session
const mockOrderData = {
  orderNumber: 'PA-2024-0001',
  customerName: 'John Doe',
  purchaseDate: '2024-01-15',
  totalAmount: 299.99,
  items: [
    {
      id: 1,
      title: 'Modern Luxury Villa - Complete Plans',
      planId: 'MLV001',
      licenseType: 'Commercial',
      downloadLimit: 5,
      downloadCount: 2,
      expiryDate: '2025-01-15'
    },
    {
      id: 2,
      title: 'Contemporary Family Home - Floor Plans',
      planId: 'CFH002', 
      licenseType: 'Single Use',
      downloadLimit: 3,
      downloadCount: 0,
      expiryDate: '2025-01-15'
    }
  ]
}

const DownloadsPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [downloadHistory, setDownloadHistory] = useState<any[]>([])

  // Mock download files for a plan
  const getDownloadFiles = (planId: string) => {
    return [
      {
        id: 1,
        name: 'Floor Plans - Level 1',
        type: 'PDF',
        size: '2.4 MB',
        description: 'Detailed first floor layout with dimensions',
        downloadUrl: '#',
        lastModified: '2024-01-10'
      },
      {
        id: 2,
        name: 'Floor Plans - Level 2', 
        type: 'PDF',
        size: '1.8 MB',
        description: 'Second floor layout and room specifications',
        downloadUrl: '#',
        lastModified: '2024-01-10'
      },
      {
        id: 3,
        name: 'Elevations - Front & Rear',
        type: 'DWG',
        size: '5.2 MB',
        description: 'AutoCAD elevation drawings',
        downloadUrl: '#',
        lastModified: '2024-01-10'
      },
      {
        id: 4,
        name: 'Construction Details',
        type: 'PDF',
        size: '3.1 MB',
        description: 'Detailed construction specifications',
        downloadUrl: '#',
        lastModified: '2024-01-10'
      },
      {
        id: 5,
        name: '3D Model Files',
        type: 'SKP',
        size: '12.8 MB', 
        description: 'SketchUp 3D model for visualization',
        downloadUrl: '#',
        lastModified: '2024-01-10'
      }
    ]
  }

  const handleDownload = (fileId: number, fileName: string, planId: string) => {
    // In real app, this would trigger actual download and update database
    const newDownload = {
      id: Date.now(),
      fileName,
      planId,
      downloadDate: new Date().toISOString(),
      fileSize: '2.4 MB'
    }
    setDownloadHistory(prev => [newDownload, ...prev])
    
    // Update download count for the plan item
    // This would be handled server-side in real implementation
  }

  const getFileIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf': return '📄'
      case 'dwg': return '📐'
      case 'skp': return '🏠'
      default: return '📁'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className='min-h-screen pt-24 bg-gray-50 dark:bg-gray-900'>
      {/* Header Section */}
      <section className='py-12 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center'>
              <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-dark dark:text-white'>
                Download Center
              </h1>
              <p className='text-dark/60 dark:text-white/60'>
                Access your purchased architectural plans and files
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className='bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <p className='text-sm text-dark/60 dark:text-white/60 mb-1'>Order Number</p>
                <p className='font-semibold text-dark dark:text-white'>{mockOrderData.orderNumber}</p>
              </div>
              <div>
                <p className='text-sm text-dark/60 dark:text-white/60 mb-1'>Customer</p>
                <p className='font-semibold text-dark dark:text-white'>{mockOrderData.customerName}</p>
              </div>
              <div>
                <p className='text-sm text-dark/60 dark:text-white/60 mb-1'>Purchase Date</p>
                <p className='font-semibold text-dark dark:text-white'>{formatDate(mockOrderData.purchaseDate)}</p>
              </div>
              <div>
                <p className='text-sm text-dark/60 dark:text-white/60 mb-1'>Total Amount</p>
                <p className='font-semibold text-primary'>${mockOrderData.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-12'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Purchased Plans List */}
            <div className='lg:col-span-2'>
              <h2 className='text-2xl font-bold text-dark dark:text-white mb-6'>
                Your Purchased Plans
              </h2>
              
              <div className='space-y-4'>
                {mockOrderData.items.map((item) => (
                  <div key={item.id} className='bg-white dark:bg-black rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-white/10'>
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='text-xl font-bold text-dark dark:text-white mb-2'>
                          {item.title}
                        </h3>
                        <div className='flex flex-wrap gap-3 text-sm'>
                          <span className='px-3 py-1 bg-primary/10 text-primary rounded-full'>
                            {item.licenseType} License
                          </span>
                          <span className='px-3 py-1 bg-gray-100 dark:bg-white/10 text-dark dark:text-white rounded-full'>
                            Downloads: {item.downloadCount}/{item.downloadLimit}
                          </span>
                          <span className='px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full'>
                            Expires: {formatDate(item.expiryDate)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPlan(selectedPlan === item.planId ? null : item.planId)}
                        className='btn-homely-primary'
                      >
                        {selectedPlan === item.planId ? 'Hide Files' : 'View Files'}
                      </button>
                    </div>

                    {/* Download Files */}
                    {selectedPlan === item.planId && (
                      <div className='mt-6 pt-6 border-t border-gray-200 dark:border-white/10'>
                        <h4 className='font-semibold text-dark dark:text-white mb-4'>
                          Available Download Files
                        </h4>
                        <div className='grid gap-3'>
                          {getDownloadFiles(item.planId).map((file) => (
                            <div key={file.id} className='flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10'>
                              <div className='flex items-center gap-4'>
                                <span className='text-2xl'>{getFileIcon(file.type)}</span>
                                <div>
                                  <p className='font-semibold text-dark dark:text-white'>
                                    {file.name}
                                  </p>
                                  <p className='text-sm text-dark/60 dark:text-white/60'>
                                    {file.description}
                                  </p>
                                  <p className='text-xs text-dark/40 dark:text-white/40'>
                                    {file.type} • {file.size} • Modified {formatDate(file.lastModified)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDownload(file.id, file.name, item.planId)}
                                className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                                disabled={item.downloadCount >= item.downloadLimit}
                              >
                                <Download className='w-4 h-4' />
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Download History */}
              <div className='bg-white dark:bg-black rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-white/10'>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  Recent Downloads
                </h3>
                {downloadHistory.length === 0 ? (
                  <p className='text-dark/60 dark:text-white/60 text-center py-8'>
                    No downloads yet
                  </p>
                ) : (
                  <div className='space-y-3'>
                    {downloadHistory.slice(0, 5).map((download) => (
                      <div key={download.id} className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg'>
                        <Download className='w-4 h-4 text-primary flex-shrink-0' />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-dark dark:text-white text-sm truncate'>
                            {download.fileName}
                          </p>
                          <p className='text-xs text-dark/60 dark:text-white/60'>
                            {formatDate(download.downloadDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Support */}
              <div className='bg-white dark:bg-black rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-white/10'>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  Need Help?
                </h3>
                <p className='text-dark/60 dark:text-white/60 mb-4'>
                  Having trouble with your downloads? Our support team is here to help.
                </p>
                <div className='space-y-2'>
                  <Link href='/contact' className='block text-primary hover:text-primary/80 font-medium'>
                    Contact Support
                  </Link>
                  <Link href='/help' className='block text-primary hover:text-primary/80 font-medium'>
                    Download FAQ
                  </Link>
                  <Link href='/licenses' className='block text-primary hover:text-primary/80 font-medium'>
                    License Terms
                  </Link>
                </div>
              </div>

              {/* Back to Catalog */}
              <div className='bg-gradient-to-r from-primary/10 to-skyblue/10 rounded-2xl p-6 border border-primary/20'>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-2'>
                  Need More Plans?
                </h3>
                <p className='text-dark/60 dark:text-white/60 mb-4'>
                  Browse our complete collection of architectural designs.
                </p>
                <Link href='/catalog' className='btn-homely-primary w-full'>
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DownloadsPage