'use client'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react'

interface UploadedFile {
  file: File
  preview: string
  uploading: boolean
  uploaded: boolean
  error?: string
}

const UploadPage: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
      uploaded: false
    }))
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10
  })

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const uploadFiles = async () => {
    if (!user || !isAdmin) return

    setUploading(true)
    
    for (let i = 0; i < files.length; i++) {
      if (files[i].uploaded) continue

      setFiles(prev => {
        const newFiles = [...prev]
        newFiles[i].uploading = true
        return newFiles
      })

      try {
        const formData = new FormData()
        formData.append('file', files[i].file)
        formData.append('userId', user.id)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: formData
        })

        if (response.ok) {
          setFiles(prev => {
            const newFiles = [...prev]
            newFiles[i].uploading = false
            newFiles[i].uploaded = true
            return newFiles
          })
        } else {
          const errorData = await response.json()
          setFiles(prev => {
            const newFiles = [...prev]
            newFiles[i].uploading = false
            newFiles[i].error = errorData.error || 'Upload failed'
            return newFiles
          })
        }
      } catch (error) {
        setFiles(prev => {
          const newFiles = [...prev]
          newFiles[i].uploading = false
          newFiles[i].error = 'Network error'
          return newFiles
        })
      }
    }

    setUploading(false)
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Upload Images
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Upload architectural plans and images to the gallery
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 dark:border-gray-600 hover:border-primary'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
              {isDragActive ? (
                <p className="text-lg text-primary font-medium">
                  Drop the files here...
                </p>
              ) : (
                <>
                  <p className="text-lg text-gray-900 dark:text-white font-medium mb-2">
                    Drag & drop images here, or click to select
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Supports: JPG, PNG, WebP (max 10MB each, up to 10 files)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* File Preview */}
        {files.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Selected Files ({files.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((fileData, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={fileData.preview}
                      alt={fileData.file.name}
                      className="w-full h-full object-cover"
                    />
                    {!fileData.uploaded && !fileData.uploading && (
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {fileData.file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(fileData.file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                    {fileData.uploading && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-xs text-primary">Uploading...</span>
                      </div>
                    )}
                    {fileData.uploaded && (
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 dark:text-green-400">Uploaded</span>
                      </div>
                    )}
                    {fileData.error && (
                      <div className="flex items-center gap-2 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-600 dark:text-red-400">{fileData.error}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={uploadFiles}
              disabled={uploading || files.every(f => f.uploaded)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  Upload Files
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage