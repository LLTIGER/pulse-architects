'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Shield, 
  Download, 
  Check, 
  CreditCard,
  Lock,
} from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface GalleryImage {
  id: string
  title: string
  cloudinaryUrl: string
  category: string
  width: number
  height: number
  fileSize: number
  uploadedBy: {
    name: string
  }
}

const LICENSE_TYPES = {
  PREVIEW: {
    name: 'Preview License',
    price: 0,
    description: 'Watermarked preview for evaluation',
    features: ['Watermarked image', 'Low resolution', 'For evaluation only'],
    color: 'bg-blue-500'
  },
  STANDARD: {
    name: 'Standard License',
    price: 29.99,
    description: 'High-quality download for personal use',
    features: ['Full resolution', 'Personal use only', 'No watermark', 'Lifetime access'],
    color: 'bg-green-500'
  },
  COMMERCIAL: {
    name: 'Commercial License',
    price: 99.99,
    description: 'Commercial use with full rights',
    features: ['Full resolution', 'Commercial use allowed', 'No watermark', 'Lifetime access', 'Client projects'],
    color: 'bg-purple-500'
  },
  EXTENDED: {
    name: 'Extended License',
    price: 199.99,
    description: 'Unlimited commercial use and modifications',
    features: ['Full resolution', 'Unlimited commercial use', 'Resale allowed', 'Modifications allowed', 'No attribution required'],
    color: 'bg-orange-500'
  }
}

const CheckoutPage: React.FC = () => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const imageId = searchParams.get('imageId')
  const licenseType = searchParams.get('license') as keyof typeof LICENSE_TYPES || 'STANDARD'
  
  const [image, setImage] = useState<GalleryImage | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/auth/login?returnUrl=${encodeURIComponent(window.location.href)}`)
    }
  }, [user, loading, router])

  useEffect(() => {
    if (imageId) {
      fetchImage()
    }
  }, [imageId])

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/gallery/images`)
      if (response.ok) {
        const data = await response.json()
        const foundImage = data.images.find((img: GalleryImage) => img.id === imageId)
        if (foundImage) {
          setImage(foundImage)
        } else {
          router.push('/gallery')
        }
      }
    } catch (error) {
      console.error('Failed to fetch image:', error)
      router.push('/gallery')
    } finally {
      setImageLoading(false)
    }
  }

  const handleCheckout = async () => {
    if (!user || !image) return

    setProcessing(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          imageId: image.id,
          licenseType,
          returnUrl: window.location.origin
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Handle free preview downloads
      if (data.isFree) {
        router.push(`/gallery/${image.id}?download=preview`)
        return
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId
        })

        if (error) {
          console.error('Stripe redirect error:', error)
          alert('Payment redirect failed. Please try again.')
        }
      }

    } catch (error) {
      console.error('Checkout error:', error)
      alert(error instanceof Error ? error.message : 'Checkout failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading || imageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Image not found</h1>
          <Link href="/gallery" className="btn-homely-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  const selectedLicense = LICENSE_TYPES[licenseType]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/gallery/${image.id}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Image
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Purchase License
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Secure checkout powered by Stripe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Image Preview
            </h2>
            <div className="relative rounded-lg overflow-hidden mb-4">
              <Image
                src={image.cloudinaryUrl}
                alt={image.title}
                width={image.width}
                height={image.height}
                className="w-full object-cover"
                unoptimized={true}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {image.title}
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Category: <span className="font-medium">{image.category}</span></p>
              <p>Resolution: <span className="font-medium">{image.width} × {image.height}</span></p>
              <p>File Size: <span className="font-medium">{(image.fileSize / 1024 / 1024).toFixed(1)}MB</span></p>
              <p>By: <span className="font-medium">{image.uploadedBy.name}</span></p>
            </div>
          </div>

          {/* License Selection & Checkout */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              License Details
            </h2>

            {/* Selected License */}
            <div className={`${selectedLicense.color} rounded-lg p-4 text-white mb-6`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{selectedLicense.name}</h3>
                <div className="text-2xl font-bold">
                  {selectedLicense.price === 0 ? 'FREE' : `$${selectedLicense.price}`}
                </div>
              </div>
              <p className="text-white/90 text-sm mb-3">{selectedLicense.description}</p>
              <ul className="space-y-1">
                {selectedLicense.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* License Comparison */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Other license options:
              </h4>
              <div className="space-y-2">
                {Object.entries(LICENSE_TYPES).map(([key, license]) => {
                  if (key === licenseType) return null
                  return (
                    <Link
                      key={key}
                      href={`/purchase/checkout?imageId=${image.id}&license=${key}`}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary transition-colors duration-300"
                    >
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {license.name}
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {license.description}
                        </p>
                      </div>
                      <span className="font-bold text-primary">
                        {license.price === 0 ? 'FREE' : `$${license.price}`}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Security & Trust */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
              <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-1" />
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Stripe Powered
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Instant Download
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={processing}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                processing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : `${selectedLicense.color} hover:opacity-90 transform hover:scale-105`
              }`}
            >
              {processing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : selectedLicense.price === 0 ? (
                <div className="flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Preview
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Purchase for ${selectedLicense.price}
                </div>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              By purchasing, you agree to our Terms of Service and License Agreement
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage