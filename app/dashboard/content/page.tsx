'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { 
  ArrowLeft,
  Eye,
  Check,
  X,
  Clock,
  Filter,
  Search
} from 'lucide-react'

interface ImageContent {
  id: string
  title: string
  cloudinaryUrl: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  uploadedAt: string
  uploadedBy: {
    name: string
    email: string
  }
  category: string
  width: number
  height: number
  fileSize: number
}

const ContentManagementPage: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [images, setImages] = useState<ImageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/images', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateImageStatus = async (imageId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/admin/images/${imageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        setImages(prev => 
          prev.map(img => 
            img.id === imageId ? { ...img, status } : img
          )
        )
      }
    } catch (error) {
      console.error('Failed to update image status:', error)
    }
  }

  const filteredImages = images.filter(image => {
    const matchesFilter = filter === 'ALL' || image.status === filter
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.uploadedBy.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'APPROVED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />
      case 'APPROVED': return <Check className="w-4 h-4" />
      case 'REJECTED': return <X className="w-4 h-4" />
      default: return null
    }
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Content Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Review and approve uploaded content
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title or uploader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-6 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Total: <strong>{images.length}</strong>
            </span>
            <span className="text-yellow-600 dark:text-yellow-400">
              Pending: <strong>{images.filter(img => img.status === 'PENDING').length}</strong>
            </span>
            <span className="text-green-600 dark:text-green-400">
              Approved: <strong>{images.filter(img => img.status === 'APPROVED').length}</strong>
            </span>
            <span className="text-red-600 dark:text-red-400">
              Rejected: <strong>{images.filter(img => img.status === 'REJECTED').length}</strong>
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Image */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                <img
                  src={image.cloudinaryUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(image.status)}`}>
                    {getStatusIcon(image.status)}
                    {image.status}
                  </span>
                </div>
                <button className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  By {image.uploadedBy.name}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div>{image.width} × {image.height}</div>
                  <div>{(image.fileSize / 1024 / 1024).toFixed(1)} MB</div>
                  <div>{new Date(image.uploadedAt).toLocaleDateString()}</div>
                </div>

                {/* Actions */}
                {image.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateImageStatus(image.id, 'APPROVED')}
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => updateImageStatus(image.id, 'REJECTED')}
                      className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No content found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm 
                ? `No images match your search "${searchTerm}"`
                : 'No images uploaded yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentManagementPage